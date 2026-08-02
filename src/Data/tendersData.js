export const TENDERS_STORAGE_KEY = "gbu_tenders_data";

export const DEFAULT_TENDERS = [
  {
    id: 1,
    title: "Cancellation of e-BID",
    description: "Cancellation of e-BID",
    closingDate: "2025-08-04",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=2114572845_Notice%20%282%29.pdf",
  },
  {
    id: 2,
    title: "EOI from Consultant and firm for Moisture Testing, Seepage mapping in the roof slab, wash rooms, walls, foundations etc.",
    description: "EOI from Consultant and firm for Moisture Testing, Seepage mapping in the roof slab, wash rooms, walls, foundations etc. and their remedies in the two storey Faculty Club Building in the campus of GBU",
    closingDate: "2026-05-04",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=1440973854_EOI-1%20%281%29.pdf",
  },
  {
    id: 3,
    title: "EOI from Consultant and firm for Providing Consultancy service for establishing of Artifician Intelligence centre",
    description: "EOI from Consultant and firm for Providing Consultancy service for establishing of Artifician Intelligence centre in faculty club building at campus of GBU.",
    closingDate: "2026-05-04",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=-608616474_EOI-2%20%281%29.pdf",
  },
  {
    id: 4,
    title: "GEM Bid Notice dated 24.05.2026",
    description: "GEM Bid Notice dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=-614183091_GeM%20Bid%20Notice%20%281%29.pdf",
  },
  {
    id: 5,
    title: "Newspaper advt. Financial Express dated 24.05.2026",
    description: "Newspaper advt. Financial Express dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=-175315928_GeM%20bid%20Advertisement%20Financial%20Express%20%28English%29.pdf",
  },
  {
    id: 6,
    title: "Newspaper Advt. Jansatta dated 24.05.2026",
    description: "Newspaper Advt. Jansatta dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "https://www.gbu.ac.in/page/GetTender?nName=118799583_GeM%20bid%20Advertisement%20Jansatta%20%28Hindi%29.pdf",
  },
];

const parseDateOnly = (dateValue) => {
  if (!dateValue) return null;
  const parsed = new Date(`${dateValue}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed;
};

const addDays = (dateValue, days) => {
  const next = new Date(dateValue);
  next.setDate(next.getDate() + days);
  return next;
};

export const getTenderAutoHideDate = (closingDate) => {
  const closing = parseDateOnly(closingDate);
  if (!closing) return null;
  return addDays(closing, 1);
};

export const isTenderActive = (tender, now = new Date()) => {
  const closing = parseDateOnly(tender?.closingDate);
  if (!closing) return false;

  const hideStart = addDays(closing, 2);
  return now < hideStart;
};

export const splitTendersByStatus = (tenders, now = new Date()) => {
  const normalized = Array.isArray(tenders) ? tenders : [];

  const current = normalized
    .filter((item) => isTenderActive(item, now))
    .sort((a, b) => String(a.closingDate || "").localeCompare(String(b.closingDate || "")));

  const archived = normalized
    .filter((item) => !isTenderActive(item, now))
    .sort((a, b) => String(b.closingDate || "").localeCompare(String(a.closingDate || "")));

  return { current, archived };
};
