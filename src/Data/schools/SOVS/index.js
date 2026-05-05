/**
 * SOVS — School of Vocational Studies & Applied Sciences
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOVS";
export const SCHOOL_NAME = "School of Vocational Studies & Applied Sciences";
export const SCHOOL_SHORT = "SOVS";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block H, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9906",
  email: "sovs.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOVS/",
  dean: "",
};

export const aboutData = {
  mission: "To bridge the gap between academic education and industry needs through vocational and applied sciences programs.",
  vision: "To be a leader in vocational education producing skilled and employable graduates.",
  established: "2012",
};

export const departmentPages = [
  { id: "applied-sciences", name: "Applied Sciences", path: "departments/applied-sciences" },
  { id: "vocational-studies", name: "Vocational Studies", path: "departments/vocational-studies" },
  { id: "paramedical", name: "Paramedical Sciences", path: "departments/paramedical" },
  { id: "yoga", name: "Yoga & Naturopathy", path: "departments/yoga" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];
