/**
 * SOL — School of Law, Justice & Governance
 * Central export file for all school-specific data and configuration.
 */

import { Gavel } from "lucide-react";

export const SCHOOL_CODE = "SOL";
export const SCHOOL_NAME = "School of Law, Justice & Governance";
export const SCHOOL_SHORT = "SOL";

// Home page sections config
export { sectionsConfig } from "./home.jsx";

// Contact info (used by Contact page)
export const contactInfo = {
  address: "Academic Block E, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-7002",
  email: "sol.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOL/",
  dean: "Dr. Krishna Kant Dwivedi",
};

// About page data
export const aboutData = {
  mission: "To produce competent legal professionals committed to justice, ethics, and good governance through comprehensive legal education, interdisciplinary research, and clinical legal training.",
  vision: "To be a premier centre of legal education and research in India, recognized for academic excellence, innovative pedagogy, strong ethical values, and meaningful contributions to justice and governance.",
  established: "2008",
};

// Department pages meta (used by Navbar and routing)
// SOL operates as a single unified school, not divided into multiple departments
export const departmentPages = [
  { id: "law-governance", name: "School of Law, Justice & Governance", path: "departments/law-governance" },
];

// Research page meta
export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
  { id: "training-consultancy", name: "Training & Consultancy", path: "training-consultancy" },
  { id: "patents", name: "Patents", path: "patents" },
];

export const schoolCard = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk75RFQPIldQiGk1kAwU7bEURFQV0ORVlqyg&s",
  label: SCHOOL_NAME,
  description:
    "Shaping future legal minds through comprehensive programs in constitutional law, corporate law, criminal law, and public policy.",
  path: "/schools/SOL",
  features: ["Constitutional Law", "Corporate Law", "Criminal Law", "Public Policy"],
};

export const admissionsKey = "Law";
export const admissionsLabel = "Law, Justice & Governance";
export const admissionsShortLabel = "Law";
export const admissions = {
  icon: Gavel,
  color: "from-red-600 to-red-800",
  image: "photo-1589829545856-d10d557cf95f",
  programs: {
    Undergraduate: [
      {
        name: "B.A. LL.B. (Hons.)",
        specializations: ["Constitutional Law", "Criminal Law", "Corporate Law", "International Law"],
        duration: "5 years (Integrated)",
        seats: 120,
        eligibility: "10+2 from any recognized board",
        highlights: ["BCI Approved", "Moot Court Training", "Legal Aid Clinic", "Court Internships"],
      },
    ],
    Postgraduate: [
      {
        name: "LL.M. (1-Year Full Time)",
        specializations: ["Constitutional Law", "Corporate Law", "Criminal Law", "International Law"],
        duration: "1 year",
        seats: 40,
        eligibility: "LL.B. degree from recognized university",
        highlights: ["Specialized curriculum", "Research opportunities", "Judicial services preparation"],
      },
      {
        name: "LL.M. (2-Year Weekend Programme)",
        specializations: ["Constitutional Law", "Corporate Law"],
        duration: "2 years",
        seats: 40,
        eligibility: "LL.B. degree, designed for working professionals",
        highlights: ["Weekend classes", "Flexible schedule", "Industry-focused curriculum"],
      },
    ],
    Doctoral: [
      {
        name: "Ph.D. in Law",
        specializations: ["Constitutional Law", "Criminal Law", "Corporate Law", "Cyber Law", "International Law"],
        duration: "3-5 years",
        seats: 15,
        eligibility: "LL.M. with NET/JRF or equivalent",
        highlights: ["Independent research", "Conference presentations", "Publication support"],
      },
    ],
  },
};

export const courseApplicationsKey = "Law";
export const courseApplicationsLabel = "Law";
export const courseApplications = [
  { course: "B.A. LL.B. (Hons.)", applications: 800, approved: 120, pending: 25, rejected: 15 },
  { course: "LL.M. (1-Year)", applications: 200, approved: 40, pending: 10, rejected: 5 },
  { course: "LL.M. (Weekend)", applications: 150, approved: 40, pending: 8, rejected: 3 },
  { course: "Ph.D. in Law", applications: 50, approved: 15, pending: 5, rejected: 2 },
];

export const schoolBadge = { bg: "bg-red-200", text: "text-red-800" };
export const researchCenters = [];
