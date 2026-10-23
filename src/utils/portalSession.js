const PORTAL_SESSION_KEY = "portal_auth_session";

const safeParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getPortalSession = () => {
  const raw = localStorage.getItem(PORTAL_SESSION_KEY);
  if (!raw) return null;
  const parsed = safeParse(raw);
  if (!parsed?.accessToken || !parsed?.user?.role) return null;
  return parsed;
};

export const setPortalSession = (session) => {
  localStorage.setItem(PORTAL_SESSION_KEY, JSON.stringify(session));
};

export const clearPortalSession = () => {
  localStorage.removeItem(PORTAL_SESSION_KEY);
};

export const getGrievanceRole = () => {
  const session = getPortalSession();
  if (!session?.accessToken) return null;
  try {
    const payload = JSON.parse(atob(session.accessToken.split('.')[1]));
    return payload.grievanceRole || null;
  } catch {
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) return true;
    const payload = JSON.parse(atob(payloadSegment));
    if (!payload?.exp) return true;
    return Date.now() >= Number(payload.exp) * 1000;
  } catch {
    return true;
  }
};

// JE, vendor, senior officer and director share the maintenance portal; each sees only their own screen.
export const MAINTENANCE_ROLES = ["je", "vendor", "senior_officer", "director"];

export const getRoleHomeRoute = (role) => {
  if (role === "faculty") return "/faculty-portal/dashboard";
  if (role === "school") return "/school-portal/dashboard";
  if (role === "super_admin") return "/admin-portal/dashboard";
  if (MAINTENANCE_ROLES.includes(role)) return "/maintenance-portal/dashboard";
  // if (role === "student") return "/semester-registration"; // disabled with semester registration
  return "/login";
};

// Roles allowed on a portal path, or null for unrestricted paths.
export const allowedRolesForPath = (pathname) => {
  if (pathname.startsWith("/faculty-portal")) return ["faculty"];
  if (pathname.startsWith("/school-portal")) return ["school"];
  if (pathname.startsWith("/admin-portal")) return ["super_admin"];
  if (pathname.startsWith("/maintenance-portal")) return MAINTENANCE_ROLES;
  // if (pathname.startsWith("/semester-registration")) return ["student"]; // disabled with semester registration
  return null;
};
