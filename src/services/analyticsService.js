import apiClient from "./apiClient";

/**
 * Track a page visit (called from Footer on every navigation).
 */
export const trackPageVisit = async (path, referrer = "") => {
  try {
    await apiClient.post("/analytics/track", { path, referrer });
  } catch {
    // Silently ignore tracking errors
  }
};

/**
 * Fetch overview stats (admin only).
 */
export const fetchAnalyticsOverview = async () => {
  const res = await apiClient.get("/analytics/overview");
  return res?.data?.data || {};
};

/**
 * Fetch daily visitor timeline (admin only).
 */
export const fetchVisitorTimeline = async (days = 30) => {
  const res = await apiClient.get(`/analytics/timeline?days=${days}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch device breakdown (admin only).
 */
export const fetchDeviceBreakdown = async (days = 30) => {
  const res = await apiClient.get(`/analytics/devices?days=${days}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch browser breakdown (admin only).
 */
export const fetchBrowserBreakdown = async (days = 30) => {
  const res = await apiClient.get(`/analytics/browsers?days=${days}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch OS breakdown (admin only).
 */
export const fetchOsBreakdown = async (days = 30) => {
  const res = await apiClient.get(`/analytics/os?days=${days}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch top visited pages (admin only).
 */
export const fetchTopPages = async (days = 30, limit = 20) => {
  const res = await apiClient.get(`/analytics/pages?days=${days}&limit=${limit}`);
  return res?.data?.data?.data || [];
};
