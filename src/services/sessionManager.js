import axios from "axios";
import { backendBaseUrl } from "../config/apiConfig";
import { clearPortalSession, getPortalSession, setPortalSession } from "../utils/portalSession";

/*
 * Central access-token lifecycle handling.
 *
 * The access token issued by the backend is short lived (JWT_ACCESS_EXPIRES_IN,
 * 15m by default). Portal dashboards used to send it verbatim forever, so any
 * save attempted after the token aged out failed with
 * "Invalid or expired token". Everything below keeps a single in-flight refresh
 * per tab and transparently retries the original request once.
 */

// Refresh a bit before the real expiry so a request never lands on a token that
// dies while it is in flight.
const EXPIRY_SKEW_MS = 60 * 1000;

const refreshClient = axios.create({
  baseURL: `${backendBaseUrl}/api/auth`,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

let inFlightRefresh = null;

const isExpiringSoon = (token) => {
  try {
    const payloadSegment = String(token || "").split(".")[1];
    if (!payloadSegment) return true;
    const payload = JSON.parse(atob(payloadSegment));
    if (!payload?.exp) return true;
    return Date.now() >= Number(payload.exp) * 1000 - EXPIRY_SKEW_MS;
  } catch {
    return true;
  }
};

/** Exchange the stored refresh token for a fresh access token. */
export const refreshAccessToken = async () => {
  if (inFlightRefresh) return inFlightRefresh;

  const session = getPortalSession();
  if (!session?.refreshToken) return null;

  inFlightRefresh = (async () => {
    try {
      const response = await refreshClient.post("/refresh", {
        refreshToken: session.refreshToken,
      });
      const accessToken = response?.data?.data?.accessToken;
      if (!accessToken) return null;

      // Re-read the session so a parallel login/logout is not clobbered.
      const latest = getPortalSession() || session;
      setPortalSession({ ...latest, accessToken });
      return accessToken;
    } catch {
      return null;
    } finally {
      inFlightRefresh = null;
    }
  })();

  return inFlightRefresh;
};

/**
 * Access token that is guaranteed to be usable right now, refreshing first when
 * the current one is expired or about to expire. Returns null when the session
 * cannot be renewed.
 */
export const getValidAccessToken = async () => {
  const session = getPortalSession();
  if (!session?.accessToken) return null;
  if (!isExpiringSoon(session.accessToken)) return session.accessToken;
  return refreshAccessToken();
};

/** Drop the dead session and send the user back to the login screen. */
export const handleSessionExpired = () => {
  clearPortalSession();
  if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
    window.location.assign("/login?session=expired");
  }
};

/**
 * Wires refresh-before-send + retry-once-on-401 into an axios instance.
 * Requests made without a stored session (public pages) pass through untouched.
 */
export const attachAuthInterceptors = (instance) => {
  instance.interceptors.request.use(async (config) => {
    if (config.skipAuth) return config;

    const token = await getValidAccessToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const config = error?.config;
      const status = error?.response?.status;

      if (status !== 401 || !config || config._retriedAfterRefresh || config.skipAuth) {
        return Promise.reject(error);
      }

      // Only a logged-in caller can recover; public 401s bubble up as-is.
      if (!getPortalSession()?.refreshToken) {
        return Promise.reject(error);
      }

      config._retriedAfterRefresh = true;
      const token = await refreshAccessToken();

      if (!token) {
        handleSessionExpired();
        return Promise.reject(error);
      }

      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
      return instance(config);
    },
  );

  return instance;
};

/**
 * Keeps the access token warm while a dashboard sits idle, so returning to the
 * tab after a few minutes does not bounce the user to /login.
 */
export const startSessionKeepAlive = () => {
  const tick = () => {
    const session = getPortalSession();
    if (!session?.refreshToken) return;
    if (isExpiringSoon(session.accessToken)) refreshAccessToken();
  };

  const intervalId = setInterval(tick, 60 * 1000);
  const onFocus = () => tick();

  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", onFocus);
  tick();

  return () => {
    clearInterval(intervalId);
    window.removeEventListener("focus", onFocus);
    document.removeEventListener("visibilitychange", onFocus);
  };
};
