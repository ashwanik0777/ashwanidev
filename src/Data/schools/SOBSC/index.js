/**
 * SOBSC — School of Buddhist Studies & Civilization
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOBSC";
export const SCHOOL_NAME = "School of Buddhist Studies & Civilization";
export const SCHOOL_SHORT = "SOBSC";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block C, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9901",
  email: "sobsc.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOBSC/",
  dean: "",
};

export const aboutData = {
  mission: "To promote Buddhist philosophy, culture, and civilization through academic excellence and research.",
  vision: "To be a global center for Buddhist studies fostering peace, harmony, and intellectual growth.",
  established: "2008",
};

export const departmentPages = [
  { id: "buddhist-studies", name: "Buddhist Studies", path: "departments/buddhist-studies" },
  { id: "pali-languages", name: "Pali & Languages", path: "departments/pali-languages" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
