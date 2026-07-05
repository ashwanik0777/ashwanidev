import axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import apiClient from "./apiClient";

const client = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

/* ── Public Booking Endpoints ── */

export const sendBookingOtp = async ({ email }) => {
  const res = await client.post("/bookings/send-otp", { email });
  return res.data;
};

export const verifyBookingOtp = async ({ email, otp }) => {
  const res = await client.post("/bookings/verify-otp", { email, otp });
  return res.data;
};

export const submitBooking = async (bookingData) => {
  const res = await client.post("/bookings", bookingData);
  return res.data;
};

export const listBookedDates = async (facilityId) => {
  const res = await client.get("/bookings/dates", { params: { facilityId } });
  return res.data?.data || [];
};

export const trackBooking = async (token) => {
  const res = await client.get("/bookings/track", { params: { token } });
  return res.data?.data;
};

export const listFacilityInCharge = async (facilityId) => {
  const res = await client.get(`/bookings/in-charge/${facilityId}`);
  return res.data?.data;
};

/* ── Admin Booking Management Endpoints ── */

export const listBookingRequests = async (params) => {
  const res = await apiClient.get("/bookings/admin/requests", { params });
  return res.data?.data;
};

export const approveBookingRequest = async (id) => {
  const res = await apiClient.post(`/bookings/admin/requests/${id}/approve`);
  return res.data?.data;
};

export const rejectBookingRequest = async (id, remarks) => {
  const res = await apiClient.post(`/bookings/admin/requests/${id}/reject`, { remarks });
  return res.data?.data;
};

export const listFacilityInCharges = async () => {
  const res = await apiClient.get("/bookings/admin/in-charges");
  return res.data?.data;
};

export const updateFacilityInCharge = async (facilityId, data) => {
  const res = await apiClient.post(`/bookings/admin/in-charges/${facilityId}`, data);
  return res.data?.data;
};
