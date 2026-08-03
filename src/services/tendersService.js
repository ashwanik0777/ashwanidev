import apiClient from "./apiClient";

const unwrap = (response) => {
  const payload = response?.data;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (payload?.data && typeof payload.data === "object") return payload.data;
  if (payload && typeof payload === "object") return payload;
  return null;
};

const normalizeTender = (item) => ({
  id: item?.id ?? "",
  title: String(item?.title || "").trim(),
  description: String(item?.description || "").trim(),
  referenceNo: String(item?.referenceNo || item?.reference_no || "").trim(),
  category: String(item?.category || "").trim(),
  tenderType: String(item?.tenderType || item?.tender_type || "RFP").trim(),
  publishedDate: String(item?.publishedDate || item?.published_date || "").slice(0, 10),
  closingDate: String(item?.closingDate || item?.closing_date || "").slice(0, 10),
  documentUrl: String(item?.documentUrl || item?.document_url || "").trim(),
  status: String(item?.status || "current").trim(),
  localId: String(item?.id || item?.localId || `tender-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
});

const toRequestPayload = (tender) => ({
  title: String(tender?.title || "").trim(),
  description: String(tender?.description || "").trim(),
  referenceNo: String(tender?.referenceNo || "").trim(),
  category: String(tender?.category || "").trim(),
  tenderType: String(tender?.tenderType || "RFP").trim(),
  publishedDate: String(tender?.publishedDate || "").slice(0, 10),
  closingDate: String(tender?.closingDate || "").slice(0, 10),
  documentUrl: String(tender?.documentUrl || "").trim(),
});

export const listTenders = async () => {
  const response = await apiClient.get("/tenders");
  const payload = unwrap(response);
  // GET /tenders answers with { items, current, archived, meta } — reading it as
  // a bare array made this always return [], so the page fell back to defaults.
  const list = Array.isArray(payload) ? payload : payload?.items;
  return (Array.isArray(list) ? list : []).map(normalizeTender);
};

export const createTender = async (tender) => {
  const response = await apiClient.post("/tenders", toRequestPayload(tender));
  const payload = unwrap(response);
  return normalizeTender(payload);
};

export const updateTender = async (id, tender) => {
  const response = await apiClient.put(`/tenders/${id}`, toRequestPayload(tender));
  const payload = unwrap(response);
  return normalizeTender(payload);
};

export const deleteTender = async (id) => {
  await apiClient.delete(`/tenders/${id}`);
  return id;
};
