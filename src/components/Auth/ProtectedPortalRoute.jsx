import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
  allowedRolesForPath,
  clearPortalSession,
  getPortalSession,
  getRoleHomeRoute,
  isTokenExpired,
} from "../../utils/portalSession";
import { refreshAccessToken, startSessionKeepAlive } from "../../services/sessionManager";

const ProtectedPortalRoute = ({ children }) => {
  const location = useLocation();
  const session = getPortalSession();
  const accessTokenExpired = !!session?.accessToken && isTokenExpired(session.accessToken);
  const canRecover = accessTokenExpired && !!session?.refreshToken;

  // "expired" only after a refresh attempt actually failed — coming back to the
  // tab a few minutes later must not dump the user on the login page.
  const [recovery, setRecovery] = useState(canRecover ? "pending" : "idle");

  useEffect(() => {
    if (recovery !== "pending") return undefined;

    let cancelled = false;
    refreshAccessToken().then((token) => {
      // Drop a session that cannot be renewed, otherwise the login page would
      // treat it as signed in and bounce straight back here.
      if (!token) clearPortalSession();
      if (!cancelled) setRecovery(token ? "idle" : "failed");
    });

    return () => {
      cancelled = true;
    };
  }, [recovery]);

  // Keep the short-lived access token warm while the portal sits open/idle.
  useEffect(() => startSessionKeepAlive(), []);

  if (recovery === "pending") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto mb-3 h-10 w-10 animate-spin rounded-full border-b-2 border-slate-900" />
          <p className="text-sm text-slate-600">Restoring your session...</p>
        </div>
      </div>
    );
  }

  if (!session || !session.accessToken || recovery === "failed" || (accessTokenExpired && !canRecover)) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const allowedRoles = allowedRolesForPath(location.pathname);
  if (allowedRoles && !allowedRoles.includes(session?.user?.role)) {
    return <Navigate to={getRoleHomeRoute(session?.user?.role)} replace />;
  }

  return children;
};

export default ProtectedPortalRoute;
