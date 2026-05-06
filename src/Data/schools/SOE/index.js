/**
 * SOE — School of Engineering
 * Central export file for all school-specific data and configuration.
 */

import { Cpu } from "lucide-react";

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

export const schoolCard = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU89cU4dCM-KXWNc_7tD7_VrF45IcfZGDgFQ&s",
  label: SCHOOL_NAME,
  description:
    "Excellence in mechanical, civil, electrical, and chemical engineering with focus on sustainable technology and innovation.",
  path: "/schools/SOE",
  features: ["Mechanical", "Civil", "Electrical", "Chemical"],
};

export const admissionsKey = "Engineering";
export const admissionsLabel = "Engineering";
export const admissionsShortLabel = "Engg";
export const admissions = {
  icon: Cpu,
  color: "from-blue-600 to-blue-800",
  image: "photo-1581091226825-a6a2a5aee158",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Technology (B.Tech)",
        specializations: ["Computer Science", "Electronics", "Mechanical", "Civil", "Chemical"],
        duration: "4 years",
        seats: 240,
        eligibility: "12th with PCM, JEE Main",
        highlights: ["Industry partnerships", "Internship guaranteed", "Placement assistance"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Technology (M.Tech)",
        specializations: ["AI & ML", "VLSI Design", "Structural Engineering"],
        duration: "2 years",
        seats: 60,
        eligibility: "B.Tech with valid GATE score",
        highlights: ["Research opportunities", "Industry exposure", "Advanced labs"],
      },
    ],
    Doctoral: [
      {
        name: "Doctor of Philosophy (Ph.D)",
        specializations: ["Various Engineering Disciplines"],
        duration: "3-5 years",
        seats: 20,
        eligibility: "M.Tech/M.E with research experience",
        highlights: ["Research fellowship", "Publication support", "Conference funding"],
      },
    ],
  },
};

export const courseApplicationsKey = "Engineering";
export const courseApplicationsLabel = "Engineering";
export const courseApplications = [
  { course: "B.Tech CSE", applications: 450, approved: 180, pending: 50, rejected: 20 },
  { course: "B.Tech ECE", applications: 320, approved: 150, pending: 30, rejected: 15 },
  { course: "M.Tech CSE", applications: 180, approved: 80, pending: 15, rejected: 8 },
];

export const schoolBadge = { bg: "bg-indigo-200", text: "text-indigo-800" };
export const researchCenters = [
  {
    id: 3,
    name: "Renewable Energy Research Institute",
    shortName: "RERI",
    description:
      "Sustainable energy solutions including solar, wind, and energy storage technologies.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&h=300&fit=crop",
    location: "Green Technology Campus",
    head: "Dr. Amit Patel",
    established: "2019",
    facilities: ["Solar Testing Lab", "Wind Tunnel", "Battery Testing", "Smart Grid Lab"],
    researchAreas: ["Photovoltaics", "Energy Storage", "Smart Grids", "Fuel Cells"],
    school: admissionsLabel,
  },
  {
    id: 4,
    name: "Materials Science & Engineering Lab",
    shortName: "MSE Lab",
    description:
      "Advanced materials research for aerospace, automotive, and electronics industries.",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=500&h=300&fit=crop",
    location: "Engineering Block C",
    head: "Dr. Sanjay Gupta",
    established: "2017",
    facilities: ["XRD Lab", "SEM/TEM", "Mechanical Testing", "Thin Film Lab"],
    researchAreas: ["Nanomaterials", "Composites", "Smart Materials", "Biomaterials"],
    school: admissionsLabel,
  },
];
