import axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import apiClient from "./apiClient";

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ── Public (unauthenticated) registration endpoints ── */

export const sendRegistrationOtp = async ({ email }) => {
  const res = await client.post("/faculty-registration/send-otp", { email });
  return res.data;
};

export const verifyRegistrationOtp = async ({ email, otp }) => {
  const res = await client.post("/faculty-registration/verify-otp", { email, otp });
  return res.data;
};

export const submitFacultyRegistration = async (formData) => {
  const res = await client.post("/faculty-registration/register", formData);
  return res.data;
};

/* ── Admin (authenticated) registration management endpoints ── */

export const listFacultyRegistrationRequests = async (params) => {
  const res = await apiClient.get("/admin/faculty-registration-requests", { params });
  return res.data?.data;
};

export const approveFacultyRegistration = async (id) => {
  const res = await apiClient.post(`/admin/faculty-registration-requests/${id}/approve`);
  return res.data?.data;
};

export const rejectFacultyRegistration = async (id, reason) => {
  const res = await apiClient.post(`/admin/faculty-registration-requests/${id}/reject`, { reason });
  return res.data?.data;
};
