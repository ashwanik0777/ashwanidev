import axios from "axios";
import { backendBaseUrl } from "../config/apiConfig";
import { attachAuthInterceptors } from "./sessionManager";

/*
 * Admin/School side of the announcements system.
 *
 * Announcements used to be written into the `schools.content` JSONB blob, which
 * the public pages never read — so nothing added from a dashboard appeared on
 * the website. Every kind is now a real DB row behind these endpoints, and the
 * same rows feed the public pages.
 *
 * Governance is enforced server-side:
 *   - super admin publishes anything immediately
 *   - a school publishes its own school-level items immediately
 *   - a school asking for college-level reach is queued for admin approval
 */

const adminApi = attachAuthInterceptors(
  axios.create({
    baseURL: `${backendBaseUrl}/api/v1`,
    timeout: 20000,
    headers: { "Content-Type": "application/json" },
  }),
);

/** The five announcement kinds, in the order the dashboards show them. */
export const ANNOUNCEMENT_KINDS = ["notices", "news", "events", "newsletters", "gallery"];

export const KIND_LABELS = {
  notices: "Notices",
  news: "News",
  events: "Events",
  newsletters: "Newsletters",
  gallery: "Event Gallery",
};

export const APPROVAL_STATUS = {
  PUBLISHED: "published",
  PENDING: "pending",
  REJECTED: "rejected",
};

export const LEVELS = { COLLEGE: "college", SCHOOL: "school" };

const unwrap = (response) => response?.data?.data ?? null;

export const listAnnouncements = async (kind, params = {}) => {
  const backendKind = kind === "gallery" ? "events" : kind;
  const response = await adminApi.get(`/admin/announcements/${backendKind}`, { params });
  const data = unwrap(response);
  return Array.isArray(data) ? data : [];
};

export const createAnnouncement = async (kind, payload) => {
  const backendKind = kind === "gallery" ? "events" : kind;
  const response = await adminApi.post(`/admin/announcements/${backendKind}`, payload);
  return { item: unwrap(response), message: response?.data?.message || "" };
};

export const updateAnnouncement = async (kind, id, payload) => {
  const backendKind = kind === "gallery" ? "events" : kind;
  const response = await adminApi.put(`/admin/announcements/${backendKind}/${id}`, payload);
  return { item: unwrap(response), message: response?.data?.message || "" };
};

export const deleteAnnouncement = async (kind, id) => {
  const backendKind = kind === "gallery" ? "events" : kind;
  const response = await adminApi.delete(`/admin/announcements/${backendKind}/${id}`);
  return response?.data?.message || "";
};

/** College-level submissions from schools, awaiting a super admin decision. */
export const listPendingAnnouncements = async () => {
  const response = await adminApi.get("/admin/announcements-pending");
  const data = unwrap(response);
  return Array.isArray(data) ? data : [];
};

export const approveAnnouncement = async (kind, id, note = "") => {
  const response = await adminApi.post(`/admin/announcements/${kind}/${id}/approve`, { note });
  return { item: unwrap(response), message: response?.data?.message || "" };
};

export const rejectAnnouncement = async (kind, id, note = "") => {
  const response = await adminApi.post(`/admin/announcements/${kind}/${id}/reject`, { note });
  return { item: unwrap(response), message: response?.data?.message || "" };
};
