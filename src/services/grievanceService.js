import apiClient from './apiClient';

export const getModuleStatus = () => apiClient.get('/grievances/module-status');
export const submitGrievance = (formData) => apiClient.post('/grievances/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getMyGrievances = () => apiClient.get('/grievances/my');
export const getMyGrievanceDetail = (ticketId) => apiClient.get(`/grievances/my/${ticketId}`);
export const getCategories = () => apiClient.get('/grievances/categories');
export const getManagedGrievances = (params) => apiClient.get('/grievances/manage/', { params });
export const getManagementStats = () => apiClient.get('/grievances/manage/stats');
export const getManagedGrievanceDetail = (ticketId) => apiClient.get(`/grievances/manage/${ticketId}`);
export const updateGrievanceStatus = (ticketId, data) => apiClient.put(`/grievances/manage/${ticketId}/status`, data);
export const exportGrievances = () => apiClient.get('/grievances/manage/export', { responseType: 'blob' });
export const getGrievanceSettings = () => apiClient.get('/grievances/settings/');
export const toggleModule = () => apiClient.put('/grievances/settings/toggle-module');
export const toggleStudentModule = () => apiClient.put('/grievances/settings/toggle-student');
