import axios from "axios";
import { apiBaseUrl } from "../config/apiConfig";
import apiClient from "./apiClient";

const publicClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

/* ── Public ── */
export const fetchTickerNotices = async () => {
  const res = await publicClient.get("/ticker-notices");
  return res.data?.data || [];
};

/* ── Admin ── */
export const fetchAllTickerNotices = async () => {
  const res = await apiClient.get("/admin/ticker-notices");
  return res.data?.data || [];
};

export const createTickerNotice = async (data) => {
  const res = await apiClient.post("/admin/ticker-notices", data);
  return res.data?.data;
};

export const updateTickerNotice = async (id, data) => {
  const res = await apiClient.put(`/admin/ticker-notices/${id}`, data);
  return res.data?.data;
};

export const deleteTickerNotice = async (id) => {
  const res = await apiClient.delete(`/admin/ticker-notices/${id}`);
  return res.data;
};
