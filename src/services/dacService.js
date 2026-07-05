import apiClient from "./apiClient";

const unwrap = (response) => {
  const payload = response?.data;
  if (payload?.data && typeof payload.data === "object") return payload.data;
  if (payload && typeof payload === "object") return payload;
  return null;
};

const normalizeDacMember = (item) => ({
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
  skills: Array.isArray(item?.skills) ? item.skills : [],
  teamType: String(item?.teamType || "student").trim(),
  sortOrder: Number(item?.sortOrder ?? 0),
  isActive: Boolean(item?.isActive ?? true),
  localId: String(item?.id || item?.localId || `dac-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
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

export const listDacMembers = async () => {
  const response = await apiClient.get("/dac/team");
  const payload = unwrap(response);
  const faculty = Array.isArray(payload?.faculty) ? payload.faculty.map(normalizeDacMember) : [];
  const student = Array.isArray(payload?.student) ? payload.student.map(normalizeDacMember) : [];
  const all = Array.isArray(payload?.all) ? payload.all.map(normalizeDacMember) : [];
  return { faculty, student, all };
};

export const createDacMember = async (member) => {
  const response = await apiClient.post("/dac/team", toRequestPayload(member));
  const payload = unwrap(response);
  return normalizeDacMember(payload);
};

export const updateDacMember = async (id, member) => {
  const response = await apiClient.put(`/dac/team/${id}`, toRequestPayload(member));
  const payload = unwrap(response);
  return normalizeDacMember(payload);
};

export const deleteDacMember = async (id) => {
  await apiClient.delete(`/dac/team/${id}`);
  return id;
};
