export const TENDERS_STORAGE_KEY = "gbu_tenders_data";

export const DEFAULT_TENDERS = [
  {
    id: 1,
    title: "Cancellation of e-BID",
    description: "Cancellation of e-BID",
    closingDate: "2025-08-04",
    documentUrl: "/assets/pdf/tenders/2114572845_Notice__2_.pdf",
  },
  {
    id: 2,
    title: "EOI from Consultant and firm for Moisture Testing, Seepage mapping in the roof slab, wash rooms, walls, foundations etc.",
    description: "EOI from Consultant and firm for Moisture Testing, Seepage mapping in the roof slab, wash rooms, walls, foundations etc. and their remedies in the two storey Faculty Club Building in the campus of GBU",
    closingDate: "2026-05-04",
    documentUrl: "/assets/pdf/tenders/1440973854_EOI-1__1_.pdf",
  },
  {
    id: 3,
    title: "EOI from Consultant and firm for Providing Consultancy service for establishing of Artifician Intelligence centre",
    description: "EOI from Consultant and firm for Providing Consultancy service for establishing of Artifician Intelligence centre in faculty club building at campus of GBU.",
    closingDate: "2026-05-04",
    documentUrl: "/assets/pdf/tenders/-608616474_EOI-2__1_.pdf",
  },
  {
    id: 4,
    title: "GEM Bid Notice dated 24.05.2026",
    description: "GEM Bid Notice dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "/assets/pdf/tenders/-614183091_GeM_Bid_Notice__1_.pdf",
  },
  {
    id: 5,
    title: "Newspaper advt. Financial Express dated 24.05.2026",
    description: "Newspaper advt. Financial Express dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "/assets/pdf/tenders/-175315928_GeM_bid_Advertisement_Financial_Express__English_.pdf",
  },
  {
    id: 6,
    title: "Newspaper Advt. Jansatta dated 24.05.2026",
    description: "Newspaper Advt. Jansatta dated 24.05.2026",
    closingDate: "2026-05-25",
    documentUrl: "/assets/pdf/tenders/118799583_GeM_bid_Advertisement_Jansatta__Hindi_.pdf",
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
