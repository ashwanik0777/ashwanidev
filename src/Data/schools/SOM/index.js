/**
 * SOM — School of Management
 * Central export file for all school-specific data and configuration.
 */

import { Briefcase } from "lucide-react";

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

export const schoolCard = {
  imageUrl: "https://www.onlineresultportal.com/images/university/gautam-buddha-university.jpg",
  label: SCHOOL_NAME,
  description:
    "Developing business leaders through innovative MBA programs, entrepreneurship studies, and strategic management education.",
  path: "/schools/SOM",
  features: ["MBA Programs", "Entrepreneurship", "Finance", "Marketing"],
};

export const admissionsKey = "Management";
export const admissionsLabel = "Management";
export const admissionsShortLabel = "Mgmt";
export const admissions = {
  icon: Briefcase,
  color: "from-purple-600 to-indigo-600",
  image: "photo-1507003211169-0a1dd7228f2d",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Business Administration (BBA)",
        specializations: ["Finance", "Marketing", "HR", "Operations"],
        duration: "3 years",
        seats: 100,
        eligibility: "12th from any stream",
        highlights: ["Industry internships", "Case study method", "Leadership development"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Business Administration (MBA)",
        specializations: ["Finance", "Marketing", "HR", "Operations", "International Business"],
        duration: "2 years",
        seats: 120,
        eligibility: "Bachelor's degree with entrance exam",
        highlights: ["Industry visits", "Global exposure", "100% placement record"],
      },
    ],
    Doctoral: [
      {
        name: "Doctor of Philosophy (Ph.D) in Management",
        specializations: ["Strategic Management", "Finance", "Marketing"],
        duration: "3-5 years",
        seats: 15,
        eligibility: "MBA/M.Com with research aptitude",
        highlights: ["Research grants", "International conferences", "Publication support"],
      },
    ],
  },
};

export const courseApplicationsKey = "Management";
export const courseApplicationsLabel = "Management";
export const courseApplications = [
  { course: "MBA", applications: 280, approved: 120, pending: 25, rejected: 10 },
  { course: "BBA", applications: 170, approved: 80, pending: 15, rejected: 5 },
];

export const schoolBadge = { bg: "bg-orange-200", text: "text-orange-800" };
export const researchCenters = [
  {
    id: 103,
    name: "Center for Business & Entrepreneurship",
    shortName: "Business Innovation Lab",
    description:
      "Research in entrepreneurship, finance, marketing strategy, and operations management.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    location: "Academic Block F",
    head: "Dr. Alok Mehra",
    established: "2017",
    facilities: ["Business Simulation Lab", "Startup Incubator"],
    researchAreas: ["Entrepreneurship", "Finance", "Marketing", "Operations"],
    school: admissionsLabel,
  },
];
