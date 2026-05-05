/**
 * SOBT — School of Biotechnology
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOBT";
export const SCHOOL_NAME = "School of Biotechnology";
export const SCHOOL_SHORT = "SOBT";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block B, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9900",
  email: "sobt.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOBT/",
  dean: "",
};

export const aboutData = {
  mission: "To foster excellence in biotechnology education, research, and innovation for societal benefit.",
  vision: "To be a premier institution in biotechnology contributing to sustainable development.",
  established: "2008",
};

export const departmentPages = [
  { id: "biotechnology", name: "Biotechnology", path: "departments/biotechnology" },
  { id: "bioinformatics", name: "Bioinformatics", path: "departments/bioinformatics" },
  { id: "microbiology", name: "Microbiology", path: "departments/microbiology" },
  { id: "food-technology", name: "Food Technology", path: "departments/food-technology" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
