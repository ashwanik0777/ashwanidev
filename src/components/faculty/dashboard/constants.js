export const FACULTY_SIDEBAR_SECTIONS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "personal-details", label: "Personal Details" },
  { id: "qualifications", label: "Qualifications" },
  { id: "certifications", label: "Certifications" },
  { id: "teaching", label: "Teaching" },
  { id: "administration", label: "Administration" },
  { id: "research-projects", label: "Research Projects" },
  { id: "publications", label: "Publications" },
  { id: "talks", label: "Invited Talks" },
  { id: "awards", label: "Awards" },
  { id: "other", label: "Other" }
];

export const inputClass =
  "w-full rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-stone-700";

export const deepClone = (value) => JSON.parse(JSON.stringify(value));

export const parseCommaList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
