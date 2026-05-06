/**
 * SOHSS — School of Humanities & Social Sciences
 * Central export file for all school-specific data and configuration.
 */

import { Heart } from "lucide-react";

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

export const schoolCard = {
  imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQFpyFIVNc2KUQ/feedshare-shrink_800/feedshare-shrink_800/0/1724330956316?e=2147483647&v=beta&t=gqRLezCyDV6YOCaEF_zZ6dej78YCHqgR5LWnrBE9HwQ",
  label: SCHOOL_NAME,
  description:
    "Exploring human culture, society, and behavior through interdisciplinary approaches in psychology, sociology, and literature.",
  path: "/schools/SOHSS",
  features: ["Psychology", "Sociology", "Literature", "History"],
};

export const admissionsKey = "Humanities";
export const admissionsLabel = "Humanities & Social Sciences";
export const admissionsShortLabel = "HSS";
export const admissions = {
  icon: Heart,
  color: "from-pink-600 to-rose-600",
  image: "photo-1481627834876-b7833e8f5570",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Arts (BA)",
        specializations: ["English", "History", "Psychology", "Sociology"],
        duration: "3 years",
        seats: 100,
        eligibility: "12th from any stream",
        highlights: ["Research projects", "Cultural activities", "Skill development"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Arts (MA)",
        specializations: ["English Literature", "History", "Psychology"],
        duration: "2 years",
        seats: 50,
        eligibility: "Bachelor's in relevant field",
        highlights: ["Research methodology", "Thesis writing", "Academic excellence"],
      },
    ],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "Humanities";
export const courseApplicationsLabel = "Humanities & Social Sciences";
export const courseApplications = [
  { course: "BA (English)", applications: 140, approved: 70, pending: 20, rejected: 6 },
  { course: "MA (Psychology)", applications: 90, approved: 40, pending: 12, rejected: 4 },
];

export const schoolBadge = { bg: "bg-pink-200", text: "text-pink-800" };
export const researchCenters = [
  {
    id: 104,
    name: "Center for Social Research & Policy",
    shortName: "Social Research Center",
    description:
      "Research in social policy, cultural studies, and community development.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    location: "Academic Block G",
    head: "Dr. Kavita Rao",
    established: "2014",
    facilities: ["Community Lab", "Language Lab", "Digital Archive"],
    researchAreas: ["Social Policy", "Cultural Studies", "Behavioral Research"],
    school: admissionsLabel,
  },
];
