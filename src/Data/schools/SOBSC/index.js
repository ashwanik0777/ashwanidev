/**
 * SOBSC — School of Buddhist Studies & Civilization
 * Central export file for all school-specific data and configuration.
 */

import { Brain } from "lucide-react";

export const SCHOOL_CODE = "SOBSC";
export const SCHOOL_NAME = "School of Buddhist Studies & Civilization";
export const SCHOOL_SHORT = "SOBSC";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block C, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9901",
  email: "sobsc.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOBSC/",
  dean: "",
};

export const aboutData = {
  mission: "To promote Buddhist philosophy, culture, and civilization through academic excellence and research.",
  vision: "To be a global center for Buddhist studies fostering peace, harmony, and intellectual growth.",
  established: "2008",
};

export const departmentPages = [
  { id: "buddhist-studies", name: "Buddhist Studies", path: "departments/buddhist-studies" },
  { id: "pali-languages", name: "Pali & Languages", path: "departments/pali-languages" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];

export const schoolCard = {
  imageUrl: "https://raw.githubusercontent.com/vishal-pandey/content-gbusite/master/slider/5.jpg",
  label: SCHOOL_NAME,
  description:
    "Preserving ancient wisdom while exploring contemporary applications of Buddhist philosophy, meditation, and cultural studies.",
  path: "/schools/SOBSC",
  features: ["Philosophy", "Meditation", "Cultural Studies", "Ancient Texts"],
};

export const admissionsKey = "Buddhist Studies";
export const admissionsLabel = "Buddhist Studies & Civilization";
export const admissionsShortLabel = "Buddhist";
export const admissions = {
  icon: Brain,
  color: "from-orange-600 to-amber-600",
  image: "photo-1506905925346-21bda4d32df4",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor in Buddhist Studies",
        specializations: ["Buddhist Philosophy", "Meditation Studies", "Buddhist Literature"],
        duration: "3 years",
        seats: 40,
        eligibility: "12th from any stream",
        highlights: ["Meditation practice", "Philosophy seminars", "Cultural studies"],
      },
    ],
    Postgraduate: [],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "Buddhist Studies";
export const courseApplicationsLabel = "Buddhist Studies";
export const courseApplications = [
  { course: "B.A. Buddhist Studies", applications: 90, approved: 35, pending: 12, rejected: 3 },
  { course: "M.A. Buddhist Studies", applications: 60, approved: 25, pending: 8, rejected: 2 },
];

export const schoolBadge = { bg: "bg-yellow-200", text: "text-yellow-800" };
export const researchCenters = [
  {
    id: 101,
    name: "Center for Buddhist Philosophy & Culture",
    shortName: "Buddhist Studies Center",
    description:
      "Interdisciplinary research in Buddhist philosophy, cultural heritage, and meditation practices.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    location: "Academic Block C",
    head: "Dr. Ananda Joshi",
    established: "2016",
    facilities: ["Meditation Hall", "Manuscript Archive", "Digital Library"],
    researchAreas: ["Buddhist Philosophy", "Cultural Studies", "Meditation"],
    school: admissionsLabel,
  },
];
