import axios from 'axios';

/* ── API base URL ── */
const getApiBase = () =>
  import.meta.env.VITE_API_BASE_URL ||
  `http://${window.location.hostname}:3000/api/v1`;

/* ── Backend base URL (for resolving relative upload paths) ── */
const getBackendBase = () =>
  import.meta.env.VITE_BACKEND_BASE_URL ||
  `http://${window.location.hostname}:3000`;

/* ── Auth token helper ── */
const getAuthHeaders = () => {
  // The portal stores auth as JSON: { accessToken, refreshToken, user }
  // under the key "portal_auth_session"
  try {
    const raw = localStorage.getItem('portal_auth_session');
    if (raw) {
      const session = JSON.parse(raw);
      if (session?.accessToken) {
        return { Authorization: `Bearer ${session.accessToken}` };
      }
    }
  } catch { /* ignore parse errors */ }
  return {};
};

/**
 * Resolve an upload URL to its full absolute form.
 * - Absolute URLs (Cloudinary, Drive, external) → returned as-is
 * - Relative paths (/uploads/...) → prepend backend base
 */
export const resolveUploadUrl = (url) => {
  if (!url) return '';
  // Already absolute
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('data:')) return url;
  // Relative — prepend backend base
  const base = getBackendBase();
  return `${base}${url.startsWith('/') ? url : '/' + url}`;
};

/**
 * Check if storage is ready.
 */
export const checkUploadStatus = async () => {
  const res = await axios.get(`${getApiBase()}/upload/status`);
  return res.data?.data || { configured: false };
};

/**
 * Upload an image file.
 * @param {File} file - Image file to upload
 * @param {string} folder - Route-aware folder path (e.g. "schools/SOICT/clubs")
 * @param {string} [fileName] - Readable name for the file (e.g. "annual-fest_flyer")
 * @param {string} [replaceUrl] - URL of old file to delete (auto-replace)
 * @returns {{ url: string, public_id: string, width?: number, height?: number, size?: number }}
 */
export const uploadImage = async (file, folder = '', fileName = '', replaceUrl = '') => {
  const formData = new FormData();
  formData.append('image', file);

  const params = new URLSearchParams({ folder });
  if (fileName) params.set('name', fileName);
  if (replaceUrl) params.set('replace', replaceUrl);

  const res = await axios.post(
    `${getApiBase()}/upload/image?${params.toString()}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders(),
      },
    }
  );
  return res.data?.data; // { url, public_id, width, height, size, originalSize }
};

/**
 * Upload a document file (PDF, DOC, DOCX, XLS, XLSX).
 * @param {File} file - Document file to upload
 * @param {string} folder - Route-aware folder path (e.g. "announcements/notices")
 * @param {string} [fileName] - Readable name for the file (e.g. "annual-fest_brochure")
 * @param {string} [replaceUrl] - URL of old file to delete (auto-replace)
 * @returns {{ url: string, public_id: string, originalName: string, size: number }}
 */
export const uploadFile = async (file, folder = '', fileName = '', replaceUrl = '') => {
  const formData = new FormData();
  formData.append('file', file);

  const params = new URLSearchParams({ folder });
  if (fileName) params.set('name', fileName);
  if (replaceUrl) params.set('replace', replaceUrl);

  const res = await axios.post(
    `${getApiBase()}/upload/file?${params.toString()}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...getAuthHeaders(),
      },
    }
  );
  return res.data?.data; // { url, public_id, originalName, size }
};

/**
 * Delete a previously uploaded file.
 * @param {string} relativePath - The relative storage path (public_id)
 */
export const deleteUploadedFile = async (relativePath) => {
  const res = await axios.delete(`${getApiBase()}/upload/file`, {
    headers: getAuthHeaders(),
    data: { relativePath },
  });
  return res.data?.data;
};
