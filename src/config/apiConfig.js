const trimTrailingSlash = (value) => String(value || "").replace(/\/+$/, "");

const stripApiPrefix = (value) => trimTrailingSlash(value).replace(/\/api\/v1\/?$/, "");

let envApiBaseUrl = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL || "");
let envBackendBaseUrl = stripApiPrefix(import.meta.env.VITE_BACKEND_BASE_URL || "");

if (typeof window !== "undefined") {
  const hostname = window.location.hostname;
  if (hostname !== "localhost" && hostname !== "127.0.0.1") {
    if (envApiBaseUrl.includes("localhost")) {
      envApiBaseUrl = envApiBaseUrl.replace("localhost", hostname);
    } else if (envApiBaseUrl.includes("127.0.0.1")) {
      envApiBaseUrl = envApiBaseUrl.replace("127.0.0.1", hostname);
    }
    
    if (envBackendBaseUrl.includes("localhost")) {
      envBackendBaseUrl = envBackendBaseUrl.replace("localhost", hostname);
    } else if (envBackendBaseUrl.includes("127.0.0.1")) {
      envBackendBaseUrl = envBackendBaseUrl.replace("127.0.0.1", hostname);
    }
  }
}

export const backendBaseUrl = envBackendBaseUrl || stripApiPrefix(envApiBaseUrl);
export const apiBaseUrl = envApiBaseUrl || (backendBaseUrl ? `${backendBaseUrl}/api/v1` : "/api/v1");
