/**
 * SOBT — School of Biotechnology
 * Central export file for all school-specific data and configuration.
 */

import { Microscope } from "lucide-react";

export const SCHOOL_CODE = "SOBT";
export const SCHOOL_NAME = "School of Biotechnology";
export const SCHOOL_SHORT = "SOBT";

export { sectionsConfig } from "./home.jsx";

export const contactInfo = {
  address: "Academic Block B, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9900",
  email: "sobt.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOBT/",
  dean: "",
};

export const aboutData = {
  mission: "To foster excellence in biotechnology education, research, and innovation for societal benefit.",
  vision: "To be a premier institution in biotechnology contributing to sustainable development.",
  established: "2008",
};

export const departmentPages = [
  { id: "biotechnology", name: "Biotechnology", path: "departments/biotechnology" },
  { id: "bioinformatics", name: "Bioinformatics", path: "departments/bioinformatics" },
  { id: "microbiology", name: "Microbiology", path: "departments/microbiology" },
  { id: "food-technology", name: "Food Technology", path: "departments/food-technology" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
];

export const schoolCard = {
  imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoLwvVWxxxBLWiAC0R019yjKPhFJzb5TuFg&s",
  label: SCHOOL_NAME,
  description:
    "Advancing life sciences through molecular biology, genetic engineering, and biomedical research with state-of-the-art laboratories.",
  path: "/schools/SOBT",
  features: ["Genetic Engineering", "Molecular Biology", "Bioinformatics", "Drug Discovery"],
};

export const admissionsKey = "Biotechnology";
export const admissionsLabel = "Biotechnology";
export const admissionsShortLabel = "Biotech";
export const admissions = {
  icon: Microscope,
  color: "from-emerald-600 to-green-700",
  image: "photo-1582719471384-894fbb16e074",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Science in Biotechnology",
        specializations: ["Medical Biotech", "Agricultural Biotech", "Industrial Biotech"],
        duration: "3 years",
        seats: 60,
        eligibility: "12th with PCB",
        highlights: ["Advanced laboratories", "Research projects", "Industry collaboration"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Science in Biotechnology",
        specializations: ["Molecular Biology", "Bioinformatics", "Pharmacology"],
        duration: "2 years",
        seats: 30,
        eligibility: "B.Sc in Life Sciences",
        highlights: ["Research opportunities", "Industry internships", "Publication support"],
      },
    ],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "Biotechnology";
export const courseApplicationsLabel = "Biotechnology";
export const courseApplications = [
  { course: "B.Sc Biotech", applications: 150, approved: 90, pending: 20, rejected: 5 },
  { course: "M.Sc Biotech", applications: 120, approved: 70, pending: 10, rejected: 3 },
];

export const schoolBadge = { bg: "bg-green-200", text: "text-green-800" };
export const researchCenters = [
  {
    id: 2,
    name: "Biotechnology Research Centre",
    shortName: "BioTech Center",
    description:
      "Cutting-edge biotechnology research focusing on healthcare, pharmaceuticals, and agricultural applications.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&h=300&fit=crop",
    location: "Life Sciences Building",
    head: "Dr. Priya Sharma",
    established: "2018",
    facilities: ["Cell Culture Lab", "Genomics Lab", "Protein Lab", "Biosafety Level 2"],
    researchAreas: ["Gene Therapy", "Drug Discovery", "Bioprocessing", "Synthetic Biology"],
    school: admissionsLabel,
  },
];
