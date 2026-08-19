import apiClient from "./apiClient";
import { additionalStudentMembers } from "../pages/itcell/itcellData";

const unwrap = (response) => {
  const payload = response?.data;
  if (payload?.data && typeof payload.data === "object") return payload.data;
  if (payload && typeof payload === "object") return payload;
  return null;
};

const normalizeItcellMember = (item) => ({
  id: item?.id ?? "",
  name: String(item?.name || "").trim(),
  role: String(item?.role || "").trim(),
  department: String(item?.department || "").trim(),
  designation: String(item?.designation || "").trim(),
  image: String(item?.image || "").trim(),
  email: String(item?.email || "").trim(),
  linkedin: String(item?.linkedin || "").trim(),
  portfolio: String(item?.portfolio || "").trim(),
  bio: String(item?.bio || "").trim(),
  skills: Array.isArray(item?.skills)
    ? item.skills
    : typeof item?.skills === "string"
      ? item.skills.split(",").map((s) => s.trim()).filter(Boolean)
      : [],
  teamType: String(item?.teamType || "student").trim(),
  sortOrder: Number(item?.sortOrder ?? 0),
  isActive: Boolean(item?.isActive ?? true),
  localId: String(item?.id || item?.localId || `itcell-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
});

const toRequestPayload = (member) => ({
  name: String(member?.name || "").trim(),
  role: String(member?.role || "").trim(),
  department: String(member?.department || "").trim(),
  designation: String(member?.designation || "").trim(),
  image: String(member?.image || "").trim(),
  email: String(member?.email || "").trim(),
  linkedin: String(member?.linkedin || "").trim(),
  portfolio: String(member?.portfolio || "").trim(),
  bio: String(member?.bio || "").trim(),
  skills: Array.isArray(member?.skills) ? member.skills : [],
  teamType: String(member?.teamType || "student").trim(),
  sortOrder: Number(member?.sortOrder ?? 0),
  isActive: Boolean(member?.isActive ?? true),
});

export const listItcellMembers = async () => {
  try {
    const response = await apiClient.get("/itcell/team");
    const payload = unwrap(response);
    let faculty = Array.isArray(payload?.faculty) ? payload.faculty.map(normalizeItcellMember) : [];
    let student = Array.isArray(payload?.student) ? payload.student.map(normalizeItcellMember) : [];

    (additionalStudentMembers || []).forEach((extra) => {
      const norm = normalizeItcellMember(extra);
      if (!student.some((s) => s.name.toLowerCase() === norm.name.toLowerCase())) {
        student.push(norm);
      }
    });

    const all = [...faculty, ...student];
    return { faculty, student, all };
  } catch (error) {
    console.warn("Using local student data due to network warning:", error);
    const student = (additionalStudentMembers || []).map(normalizeItcellMember);
    return { faculty: [], student, all: student };
  }
};

export const createItcellMember = async (member) => {
  const response = await apiClient.post("/itcell/team", toRequestPayload(member));
  const payload = unwrap(response);
  return normalizeItcellMember(payload);
};

export const updateItcellMember = async (id, member) => {
  const response = await apiClient.put(`/itcell/team/${id}`, toRequestPayload(member));
  const payload = unwrap(response);
  return normalizeItcellMember(payload);
};

export const deleteItcellMember = async (id) => {
  await apiClient.delete(`/itcell/team/${id}`);
  return id;
};
