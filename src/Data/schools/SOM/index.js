/**
 * SOM — School of Management
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOM";
export const SCHOOL_NAME = "School of Management";
export const SCHOOL_SHORT = "SOM";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block F, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9904",
  email: "som.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOM/",
  dean: "",
};

export const aboutData = {
  mission: "To develop business leaders with ethical values and global perspective through excellence in management education.",
  vision: "To be a nationally recognized management school producing industry-ready professionals.",
  established: "2008",
};

export const departmentPages = [
  { id: "management", name: "Management Studies", path: "departments/management" },
  { id: "finance", name: "Finance & Banking", path: "departments/finance" },
  { id: "marketing", name: "Marketing", path: "departments/marketing" },
  { id: "hr", name: "Human Resource Management", path: "departments/hr" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
