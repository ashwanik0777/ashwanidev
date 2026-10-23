import apiClient from './apiClient';

// Faculty maintenance grievance workflow — /api/v1/grievances/maintenance
const BASE = '/grievances/maintenance';
const UPLOAD_TIMEOUT = 60000;

const toFormData = (fields, file) => {
  const formData = new FormData();
  Object.entries(fields).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') formData.append(key, value);
  });
  if (file) formData.append('attachment', file);
  return formData;
};

const unwrap = (response) => response.data?.data;

export const getMaintenanceMeta = () => apiClient.get(`${BASE}/meta`).then(unwrap);

export const submitMaintenanceTicket = (fields, file) =>
  apiClient
    .post(`${BASE}/tickets`, toFormData(fields, file), {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: UPLOAD_TIMEOUT,
    })
    .then(unwrap);

export const getMyMaintenanceTickets = () => apiClient.get(`${BASE}/tickets/mine`).then(unwrap);

export const listMaintenanceTickets = (params) =>
  apiClient.get(`${BASE}/tickets`, { params }).then((response) => ({
    items: response.data?.data || [],
    pagination: response.data?.pagination || { total: 0, page: 1, pages: 1 },
  }));

// params: optional { date: 'YYYY-MM-DD' } or { month: 'YYYY-MM' } (submission date)
export const getMaintenanceStats = (params) => apiClient.get(`${BASE}/stats`, { params }).then(unwrap);

export const getMaintenanceTicket = (ticketId) => apiClient.get(`${BASE}/tickets/${encodeURIComponent(ticketId)}`).then(unwrap);

export const performMaintenanceAction = (ticketId, action, fields, file) =>
  apiClient
    .post(`${BASE}/tickets/${encodeURIComponent(ticketId)}/actions/${action}`, toFormData(fields, file), {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: UPLOAD_TIMEOUT,
    })
    .then(unwrap);

// Attachments need the auth header, so fetch as a blob and open via an object URL.
export const openMaintenanceAttachment = async (ticketId, fileId) => {
  const response = await apiClient.get(
    `${BASE}/tickets/${encodeURIComponent(ticketId)}/files/${fileId}`,
    { responseType: 'blob', timeout: UPLOAD_TIMEOUT }
  );
  const url = URL.createObjectURL(response.data);
  window.open(url, '_blank', 'noopener');
  setTimeout(() => URL.revokeObjectURL(url), 60000);
};

export const listMaintenanceVendors = (trade) => apiClient.get(`${BASE}/vendors`, { params: { trade } }).then(unwrap);

export const getMaintenanceStaffProfile = () => apiClient.get(`${BASE}/me`).then(unwrap);

export const getMaintenanceNotifications = () => apiClient.get(`${BASE}/notifications`).then(unwrap);

export const markMaintenanceNotificationsRead = (ids) => apiClient.post(`${BASE}/notifications/read`, { ids });

// Whether new complaints are accepted (super admin ON/OFF switch)
export const getMaintenanceModuleStatus = () => apiClient.get(`${BASE}/module-status`).then(unwrap);

// Super admin configuration
export const setMaintenanceModuleEnabled = (enabled) =>
  apiClient.put(`${BASE}/admin/module`, { module_enabled: enabled }).then(unwrap);
export const getMaintenanceConfig = () => apiClient.get(`${BASE}/admin/config`).then(unwrap);
export const setMaintenanceCategoryActive = (categoryKey, isActive) =>
  apiClient.put(`${BASE}/admin/categories/${categoryKey}`, { is_active: isActive }).then(unwrap);
export const createMaintenanceLocation = (payload) => apiClient.post(`${BASE}/admin/locations`, payload).then(unwrap);
export const updateMaintenanceLocation = (id, payload) => apiClient.put(`${BASE}/admin/locations/${id}`, payload).then(unwrap);
export const updateMaintenanceRoutingRule = (id, payload) => apiClient.put(`${BASE}/admin/routing-rules/${id}`, payload).then(unwrap);
export const addMaintenanceHoliday = (payload) => apiClient.post(`${BASE}/admin/holidays`, payload).then(unwrap);
export const removeMaintenanceHoliday = (date) => apiClient.delete(`${BASE}/admin/holidays/${date}`);

export const getApiErrorMessage = (error, fallback = 'Something went wrong') =>
  error?.response?.data?.message || error?.message || fallback;
