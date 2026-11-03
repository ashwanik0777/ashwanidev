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

/* ── Build query string from filter params ── */
const buildFilterQuery = ({ from, to, days } = {}) => {
  const params = new URLSearchParams();
  if (from) params.set("from", from);
  if (to) params.set("to", to);
  if (days !== undefined && days !== null && !from && !to) params.set("days", String(days));
  return params.toString();
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
 * @param {Object} filters - { from?, to?, days? }
 */
export const fetchVisitorTimeline = async (filters = {}) => {
  const qs = buildFilterQuery(filters);
  const res = await apiClient.get(`/analytics/timeline${qs ? `?${qs}` : ""}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch device breakdown (admin only).
 */
export const fetchDeviceBreakdown = async (filters = {}) => {
  const qs = buildFilterQuery(filters);
  const res = await apiClient.get(`/analytics/devices${qs ? `?${qs}` : ""}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch browser breakdown (admin only).
 */
export const fetchBrowserBreakdown = async (filters = {}) => {
  const qs = buildFilterQuery(filters);
  const res = await apiClient.get(`/analytics/browsers${qs ? `?${qs}` : ""}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch OS breakdown (admin only).
 */
export const fetchOsBreakdown = async (filters = {}) => {
  const qs = buildFilterQuery(filters);
  const res = await apiClient.get(`/analytics/os${qs ? `?${qs}` : ""}`);
  return res?.data?.data?.data || [];
};

/**
 * Fetch top visited pages (admin only).
 * @param {Object} filters - { from?, to?, days?, limit?, offset?, search? }
 * @returns {{ data: Array, total: number }}
 */
export const fetchTopPages = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (filters.days !== undefined && !filters.from && !filters.to) params.set("days", String(filters.days));
  if (filters.limit) params.set("limit", String(filters.limit));
  if (filters.offset) params.set("offset", String(filters.offset));
  if (filters.search) params.set("search", filters.search);
  const qs = params.toString();
  const res = await apiClient.get(`/analytics/pages${qs ? `?${qs}` : ""}`);
  const resData = res?.data?.data || {};
  return {
    data: resData.data || [],
    total: resData.total || 0,
  };
};
