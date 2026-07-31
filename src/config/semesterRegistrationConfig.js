const trimSlash = (v) => String(v || '').replace(/\/+$/, '');

export const semesterAuthApiUrl = trimSlash(import.meta.env.VITE_SEMESTER_AUTH_API_URL || '');
export const semesterDataApiUrl = trimSlash(import.meta.env.VITE_SEMESTER_DATA_API_URL || '');
export const isMockMode = !semesterAuthApiUrl && !semesterDataApiUrl;
