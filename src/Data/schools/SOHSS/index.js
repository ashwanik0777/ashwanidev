/**
 * SOHSS — School of Humanities & Social Sciences
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOHSS";
export const SCHOOL_NAME = "School of Humanities & Social Sciences";
export const SCHOOL_SHORT = "SOHSS";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block G, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9905",
  email: "sohss.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOHSS/",
  dean: "",
};

export const aboutData = {
  mission: "To nurture critical thinking, creativity, and social responsibility through humanities and social sciences education.",
  vision: "To be a center of academic excellence fostering humanistic values and social innovation.",
  established: "2009",
};

export const departmentPages = [
  { id: "english", name: "English", path: "departments/english" },
  { id: "hindi", name: "Hindi", path: "departments/hindi" },
  { id: "economics", name: "Economics", path: "departments/economics" },
  { id: "social-work", name: "Social Work", path: "departments/social-work" },
  { id: "political-science", name: "Political Science", path: "departments/political-science" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
