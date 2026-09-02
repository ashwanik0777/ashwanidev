import axios from 'axios';

const getApiBase = () => {
  const host = window.location.hostname;
  const port = '3000';
  return `http://${host}:${port}/api/v1`;
};

export const checkUploadStatus = async () => {
  const res = await axios.get(`${getApiBase()}/upload/status`);
  return res.data?.data || { configured: false };
};

export const uploadImage = async (file, folder = 'gbu-website/general') => {
  const formData = new FormData();
  formData.append('image', file);

  const token =
    localStorage.getItem('portal_access_token') ||
    sessionStorage.getItem('portal_access_token');

  const res = await axios.post(
    `${getApiBase()}/upload/image?folder=${encodeURIComponent(folder)}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    }
  );
  return res.data?.data; // { url, publicId }
};
