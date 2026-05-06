/**
 * SOICT — School of Information & Communication Technology
 * Central export file for all school-specific data and configuration.
 */

export const SCHOOL_CODE = "SOICT";
export const SCHOOL_NAME = "School of Information & Communication Technology";
export const SCHOOL_SHORT = "SOICT";

// Home page sections config
export { sectionsConfig } from "./home.jsx";

// Contact info (used by Contact page)
export const contactInfo = {
  address: "Academic Block A, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9988",
  email: "soict.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/USICT/",
  dean: "Prof. (Dr.) Rajeev Malhotra",
};

// About page data
export const aboutData = {
  mission: "To develop globally competitive IT professionals through quality education, research, and innovation.",
  vision: "To be a world-class center of excellence in information and communication technology education and research.",
  established: "2008",
};

// Department pages meta (used by Navbar and routing)
export const departmentPages = [
  { id: "cse", name: "Computer Science & Engineering", path: "departments/cse" },
  { id: "it", name: "Information Technology", path: "departments/it" },
  { id: "ece", name: "Electronics & Communication Engineering", path: "departments/ece" },
  // { id: "cyber-security", name: "Cyber Security", path: "departments/cyber-security" },
  // { id: "coedt", name: "COEDT", path: "departments/coedt" },
  // { id: "raem", name: "RAEM", path: "departments/raem" },
];

// Research page meta
export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
  { id: "training-consultancy", name: "Training & Consultancy", path: "training-consultancy" },
  { id: "patents", name: "Patents", path: "patents" },
];
