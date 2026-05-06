/**
 * SOL — School of Law, Justice & Governance
 * Central export file for all school-specific data and configuration.
 */

import { Gavel } from "lucide-react";

export const SCHOOL_CODE = "SOL";
export const SCHOOL_NAME = "School of Law, Justice & Governance";
export const SCHOOL_SHORT = "SOL";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block E, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9903",
  email: "sol.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOL/",
  dean: "",
};

export const aboutData = {
  mission: "To produce competent legal professionals committed to justice, ethics, and governance.",
  vision: "To be a premier center for legal education fostering social justice and good governance.",
  established: "2008",
};

export const departmentPages = [
  { id: "law", name: "Law", path: "departments/law" },
  { id: "governance", name: "Governance & Public Policy", path: "departments/governance" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];

export const schoolCard = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk75RFQPIldQiGk1kAwU7bEURFQV0ORVlqyg&s",
  label: SCHOOL_NAME,
  description:
    "Shaping future legal minds through comprehensive programs in constitutional law, international law, and public policy.",
  path: "/schools/SOL",
  features: ["Constitutional Law", "International Law", "Public Policy", "Legal Research"],
};

export const admissionsKey = "Law";
export const admissionsLabel = "Law, Justice and Governance";
export const admissionsShortLabel = "Law";
export const admissions = {
  icon: Gavel,
  color: "from-red-600 to-red-800",
  image: "photo-1589829545856-d10d557cf95f",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Laws (LLB)",
        specializations: ["Corporate Law", "Criminal Law", "Constitutional Law"],
        duration: "3 years",
        seats: 80,
        eligibility: "Bachelor's degree in any discipline",
        highlights: ["Moot court competitions", "Legal aid clinic", "Internship program"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Laws (LLM)",
        specializations: ["International Law", "IP Law", "Environmental Law"],
        duration: "1 year",
        seats: 40,
        eligibility: "LLB degree",
        highlights: ["Specialized curriculum", "Research opportunities", "Bar preparation"],
      },
    ],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "Law";
export const courseApplicationsLabel = "Law";
export const courseApplications = [
  { course: "LLB", applications: 200, approved: 100, pending: 15, rejected: 8 },
  { course: "LLM", applications: 120, approved: 60, pending: 10, rejected: 5 },
];

export const schoolBadge = { bg: "bg-red-200", text: "text-red-800" };
export const researchCenters = [
  {
    id: 102,
    name: "Center for Law, Governance & Policy",
    shortName: "Legal Research Center",
    description:
      "Policy, constitutional law, and governance research with community legal outreach.",
    image:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=300&fit=crop",
    location: "Academic Block E",
    head: "Dr. Meera Singh",
    established: "2015",
    facilities: ["Moot Court", "Legal Aid Cell", "Policy Archive"],
    researchAreas: ["Constitutional Law", "Governance", "Public Policy"],
    school: admissionsLabel,
  },
];
