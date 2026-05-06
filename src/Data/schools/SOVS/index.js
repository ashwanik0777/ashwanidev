/**
 * SOVS — School of Vocational Studies & Applied Sciences
 * Central export file for all school-specific data and configuration.
 */

import { Building } from "lucide-react";

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

export const schoolCard = {
  imageUrl: "https://images.shiksha.com/mediadata/images/1742534877phpTHlfCW.jpeg",
  label: SCHOOL_NAME,
  description:
    "Providing practical skills and industry-ready training through hands-on programs designed for immediate career readiness.",
  path: "/schools/SOVS",
  features: ["Skill Development", "Industry Training", "Certification", "Placement"],
};

export const admissionsKey = "Vocational Training";
export const admissionsLabel = "Vocational Studies & Applied Sciences";
export const admissionsShortLabel = "Vocational";
export const admissions = {
  icon: Building,
  color: "from-gray-600 to-gray-800",
  image: "photo-1560472354-b33ff0c44a43",
  programs: {
    Undergraduate: [
      {
        name: "Diploma in Various Trades",
        specializations: ["Electrical", "Mechanical", "Electronics", "Computer Applications"],
        duration: "1-2 years",
        seats: 200,
        eligibility: "10th/12th as per course",
        highlights: ["Hands-on training", "Industry certification", "Job placement"],
      },
    ],
    Postgraduate: [],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "Vocational Training";
export const courseApplicationsLabel = "Vocational Studies & Applied Sciences";
export const courseApplications = [
  { course: "Diploma (Electrical)", applications: 110, approved: 55, pending: 12, rejected: 4 },
  { course: "Diploma (Computer Apps)", applications: 95, approved: 48, pending: 10, rejected: 3 },
];

export const schoolBadge = { bg: "bg-teal-200", text: "text-teal-800" };
export const researchCenters = [
  {
    id: 6,
    name: "Environmental Science Research Lab",
    shortName: "ESR Lab",
    description:
      "Environmental monitoring, climate change research, and sustainable development solutions.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
    location: "Environmental Sciences Building",
    head: "Dr. Kavita Mehta",
    established: "2016",
    facilities: ["Air Quality Lab", "Water Testing", "GIS Lab", "Climate Chamber"],
    researchAreas: ["Climate Change", "Pollution Control", "Remote Sensing", "Green Chemistry"],
    school: admissionsLabel,
  },
];
