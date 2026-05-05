/**
 * SOL — School of Law, Justice & Governance
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOL";
export const SCHOOL_NAME = "School of Law, Justice & Governance";
export const SCHOOL_SHORT = "SOL";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block E, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9903",
  email: "sol.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOL/",
  dean: "",
};

export const aboutData = {
  mission: "To produce competent legal professionals committed to justice, ethics, and governance.",
  vision: "To be a premier center for legal education fostering social justice and good governance.",
  established: "2008",
};

export const departmentPages = [
  { id: "law", name: "Law", path: "departments/law" },
  { id: "governance", name: "Governance & Public Policy", path: "departments/governance" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
