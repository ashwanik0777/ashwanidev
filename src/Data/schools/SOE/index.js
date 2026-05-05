/**
 * SOE — School of Engineering
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOE";
export const SCHOOL_NAME = "School of Engineering";
export const SCHOOL_SHORT = "SOE";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block D, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9902",
  email: "soe.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOE/",
  dean: "",
};

export const aboutData = {
  mission: "To produce skilled engineers and innovators through cutting-edge education and industry collaboration.",
  vision: "To be a leading engineering school driving technological advancement and societal progress.",
  established: "2008",
};

export const departmentPages = [
  { id: "mechanical", name: "Mechanical Engineering", path: "departments/mechanical" },
  { id: "civil", name: "Civil Engineering", path: "departments/civil" },
  { id: "electrical", name: "Electrical Engineering", path: "departments/electrical" },
  { id: "automobile", name: "Automobile Engineering", path: "departments/automobile" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
