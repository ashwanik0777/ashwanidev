import apiClient from "./apiClient";

/*
 * Recruitment persistence for the admin dashboard.
 *
 * The dashboard used to keep recruitment postings in localStorage only, so
 * nothing an administrator added ever reached the public Recruitments page —
 * that page reads GET /recruitments from the database. Everything here talks to
 * the same records the website renders.
 *
 * The admin editor and the public page use slightly different field names
 * (`ref`/`date`/`categoryType`/`label` vs `referenceNo`/`closingDate`/
 * `category`/`tabId`); the mappers below are the single place that translates.
 */

const unwrap = (response) => response?.data?.data ?? null;

const toDateOnly = (value) => (value ? String(value).slice(0, 10) : "");

/** API record -> the shape the admin editor and public page consume. */
export const normalizeRecruitment = (item) => ({
  id: item?.id ?? "",
  title: String(item?.title || "").trim(),
  description: String(item?.description || "").trim(),
  ref: String(item?.referenceNo || item?.reference_no || "").trim(),
  label: String(item?.tabId || item?.tab_id || item?.referenceNo || "Recruitment").trim(),
  tabId: String(item?.tabId || item?.tab_id || "").trim(),
  categoryType: String(item?.category || "others").trim(),
  date: toDateOnly(item?.closingDate || item?.closing_date || item?.publishedDate),
  publishedDate: toDateOnly(item?.publishedDate || item?.published_date),
  closingDate: toDateOnly(item?.closingDate || item?.closing_date),
  year: String(item?.year || "").trim(),
  status: String(item?.status || "current").trim(),
  documents: (Array.isArray(item?.documents) ? item.documents : []).map((doc, index) => ({
    id: doc?.id ?? `${item?.id || "rec"}-doc-${index + 1}`,
    name: String(doc?.name || "Document").trim(),
    description: String(doc?.description || "").trim(),
    url: String(doc?.url || doc?.fileUrl || doc?.file_url || "").trim(),
    documentType: String(doc?.documentType || doc?.document_type || "notice").trim(),
    sortOrder: Number(doc?.sortOrder ?? doc?.sort_order ?? index + 1),
  })),
});

/** Admin editor form -> API request body. */
export const toRecruitmentPayload = (form) => ({
  title: String(form?.title || "").trim(),
  description: String(form?.description || "").trim(),
  referenceNo: String(form?.ref || form?.referenceNo || "").trim(),
  category: String(form?.categoryType || form?.category || "others").trim(),
  tabId: String(form?.label || form?.tabId || "").trim(),
  closingDate: toDateOnly(form?.date || form?.closingDate),
  publishedDate: toDateOnly(form?.publishedDate),
  year: String(form?.year || "").trim(),
  documents: (Array.isArray(form?.documents) ? form.documents : []).map((doc, index) => ({
    name: String(doc?.name || "").trim(),
    description: String(doc?.description || "").trim(),
    url: String(doc?.url || "").trim(),
    documentType: String(doc?.documentType || "notice").trim(),
    sortOrder: Number(doc?.sortOrder ?? index + 1),
  })),
});

export const listRecruitments = async ({ page = 1, limit = 100 } = {}) => {
  const response = await apiClient.get("/recruitments", { params: { page, limit, grouped: false } });
  const payload = unwrap(response) || {};
  return {
    items: (Array.isArray(payload.items) ? payload.items : []).map(normalizeRecruitment),
    meta: payload.meta || { page, limit, total: 0, pages: 1 },
  };
};

export const createRecruitment = async (form) => {
  const response = await apiClient.post("/recruitments", toRecruitmentPayload(form));
  return normalizeRecruitment(unwrap(response));
};

export const updateRecruitment = async (id, form) => {
  const response = await apiClient.put(`/recruitments/${id}`, toRecruitmentPayload(form));
  return normalizeRecruitment(unwrap(response));
};

export const deleteRecruitment = async (id) => {
  await apiClient.delete(`/recruitments/${id}`);
  return id;
};

/**
 * Regroups a flat list into the { categories, archived } shape the dashboard and
 * the public Recruitments page both render.
 */
export const toRecruitmentDashboardShape = (items) => {
  const CATEGORY_META = {
    teaching: { title: "Teaching", icon: "GraduationCap" },
    "non-teaching": { title: "Non-Teaching", icon: "Users" },
    "project-research": { title: "Project / Research", icon: "FlaskConical" },
    others: { title: "Others", icon: "BriefcaseBusiness" },
  };

  const current = items.filter((item) => item.status !== "archived");
  const archivedItems = items.filter((item) => item.status === "archived");

  const categoriesMap = current.reduce((acc, item) => {
    const key = item.categoryType || "others";
    if (!acc[key]) {
      const meta = CATEGORY_META[key] || CATEGORY_META.others;
      acc[key] = { type: key, title: meta.title, icon: meta.icon, tabs: [] };
    }
    acc[key].tabs.push(item);
    return acc;
  }, {});

  // Archived postings are grouped by year on the public page.
  const archivedByYear = archivedItems.reduce((acc, item) => {
    const year = item.year || (item.closingDate ? item.closingDate.slice(0, 4) : "Unknown");
    if (!acc[year]) acc[year] = { id: `archived-${year}`, year, items: [] };
    acc[year].items.push(item);
    return acc;
  }, {});

  return {
    categories: Object.values(categoriesMap),
    archived: Object.values(archivedByYear).sort((a, b) => String(b.year).localeCompare(String(a.year))),
  };
};
