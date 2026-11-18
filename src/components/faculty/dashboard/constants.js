import {
  Activity,
  Award,
  BookOpen,
  FileText,
  FlaskConical,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  ShieldCheck,
  Settings,
  Trophy,
  User,
  UserRound,
  Wrench,
} from "lucide-react";

// Listed in sidebar group order (the phone layout shows them as one flat row).
export const FACULTY_SIDEBAR_SECTIONS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "personal-details", label: "Personal Details" },
  { id: "qualifications", label: "Qualifications" },
  { id: "certifications", label: "Certifications" },
  { id: "other", label: "Other Information" },
  { id: "teaching", label: "Teaching" },
  { id: "administration", label: "Administration" },
  { id: "research-projects", label: "Research Projects" },
  { id: "publications", label: "Publications" },
  { id: "talks", label: "Invited Talks" },
  { id: "awards", label: "Awards" },
  { id: "grievance", label: "Grievance" },
];

// Sidebar groups and the sections under each. A group with one section shows as a plain item;
// sections in no group (grievance) are listed on their own below the groups.
export const FACULTY_NAV_GROUPS = [
  { id: "overview", label: "Dashboard", icon: LayoutDashboard, sections: ["dashboard"] },
  { id: "profile", label: "Profile", icon: UserRound, sections: ["personal-details", "qualifications", "certifications", "other"] },
  { id: "teaching", label: "Teaching & Service", icon: BookOpen, sections: ["teaching", "administration"] },
  { id: "research", label: "Research", icon: FlaskConical, sections: ["research-projects", "publications"] },
  { id: "recognition", label: "Recognition", icon: Trophy, sections: ["talks", "awards"] },
];

// Extra sidebar sections based on grievance_role (injected dynamically).
// Maintenance complaints are handled by JEs; the Director (maintenance portal)
// replaced the Dean's management screen, and HOD / VC have read-only views.
export const HOD_EXTRA_SECTIONS = [
  { id: "grievance-overview", label: "Maintenance Complaints (Dept)" },
];

export const VC_EXTRA_SECTIONS = [
  { id: "grievance-overview", label: "Maintenance Complaints Overview" },
];

export const SECTION_ICONS = {
  "dashboard": LayoutDashboard,
  "personal-details": User,
  "qualifications": GraduationCap,
  "certifications": ShieldCheck,
  "teaching": BookOpen,
  "administration": Settings,
  "research-projects": FolderOpen,
  "publications": FileText,
  "talks": Activity,
  "awards": Award,
  "other": MessageSquare,
  "grievance": Wrench,
  "grievance-overview": Wrench,
};

// Heading shown at the top of each section.
export const SECTION_TITLES = {
  "dashboard": "Dashboard",
  "personal-details": "Personal Details",
  "qualifications": "Qualifications & Experience",
  "certifications": "Certifications & FDPs",
  "teaching": "Teaching",
  "administration": "Administration",
  "research-projects": "Research Projects & Group",
  "publications": "Publications & Patents",
  "talks": "Invited Talks",
  "awards": "Awards & Outreach",
  "other": "Other Information",
  "grievance": "Grievance & Maintenance",
  "grievance-overview": "Maintenance Complaints",
};

export const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6";

export const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500";

export const primaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-400 hover:bg-slate-50";

export const deepClone = (value) => JSON.parse(JSON.stringify(value));

export const parseCommaList = (value) =>
  value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
