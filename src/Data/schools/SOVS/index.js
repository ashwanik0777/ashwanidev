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
  address: "Academic Block H, Gautam Buddha University, Yamuna Expressway, Greater Noida, Gautam Budh Nagar, UP 201312",
  phone: "0120-2344345",
  email: "sovs.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/school/sovs",
  dean: "Prof. Chander Kumar Singh",
};

export const aboutData = {
  mission: "To impart high-quality education in applied sciences and vocational fields, bridging the gap between scientific theory and industrial application while fostering innovation, skill development, and research-driven solutions.",
  vision: "To be a center of excellence in vocational studies and applied sciences, producing skilled, industry-ready professionals and researchers who contribute to technological advancement and sustainable development.",
  established: "2012",
};

export const departmentPages = [
  { id: "applied-mathematics", name: "Department of Applied Mathematics", path: "departments/applied-mathematics" },
  { id: "applied-chemistry", name: "Department of Applied Chemistry", path: "departments/applied-chemistry" },
  { id: "applied-physics", name: "Department of Applied Physics", path: "departments/applied-physics" },
  { id: "environmental-science", name: "Department of Environmental Sciences", path: "departments/environmental-science" },
  { id: "food-processing-technology", name: "Department of Food Processing and Technology", path: "departments/food-processing-technology" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
  { id: "training-consultancy", name: "Training & Consultancy", path: "training-consultancy" },
  { id: "patents", name: "Patents", path: "patents" },
];

export const schoolCard = {
  imageUrl: "https://i.ytimg.com/vi/IfisxZvHfFs/maxresdefault.jpg",
  label: SCHOOL_NAME,
  description:
    "Fostering scientific innovation and vocational competence through advanced labs and research in mathematics, physics, chemistry, environmental science, and food technology.",
  path: "/schools/SOVS",
  features: ["Applied Sciences", "Food Technology", "Environmental Research", "Vocational Training"],
};

export const admissionsKey = "Vocational";
export const admissionsLabel = "Vocational Studies & Applied Sciences";
export const admissionsShortLabel = "SOVS";
export const admissions = {
  icon: Building,
  color: "from-teal-600 to-emerald-600",
  image: "photo-1560472354-b33ff0c44a43",
  programs: {
    Undergraduate: [
      {
        name: "B.Sc. (Hons.) Mathematics / Physics / Chemistry",
        specializations: ["Applied Mathematics", "Materials Science", "Polymer Chemistry"],
        duration: "3 years",
        seats: 120,
        eligibility: "12th Science with minimum 50% marks (45% for SC/ST)",
        highlights: ["Rigorous foundations", "Modern science labs", "Pre-research projects"],
      },
      {
        name: "B.Tech. (Food Processing & Technology)",
        specializations: ["Food Engineering", "Quality Control", "Product Development"],
        duration: "4 years",
        seats: 60,
        eligibility: "12th PCM/PCB with minimum 50% marks",
        highlights: ["In-plant training", "Food testing labs", "Entrepreneurial support"],
      },
      {
        name: "B.Voc. (Food Processing)",
        specializations: ["Food Preservation", "Packaging Technology"],
        duration: "3 years",
        seats: 50,
        eligibility: "12th from any stream with minimum 45% marks",
        highlights: ["NSQF aligned", "Skill-based curriculum", "Multiple exit options"],
      },
    ],
    Postgraduate: [
      {
        name: "M.Sc. (Applied Mathematics / Physics / Chemistry)",
        specializations: ["Scientific Computing", "Solid State Physics", "Green Chemistry"],
        duration: "2 years",
        seats: 90,
        eligibility: "B.Sc. in relevant discipline with minimum 50% marks",
        highlights: ["Advanced research focus", "Computational labs", "Dissertation project"],
      },
      {
        name: "M.Sc. (Environmental Sciences)",
        specializations: ["Environmental Geochemistry", "Waste Management", "EIA & GIS"],
        duration: "2 years",
        seats: 30,
        eligibility: "B.Sc. in any science stream with minimum 50% marks",
        highlights: ["Field studies", "EIA hands-on training", "Lab analytics"],
      },
      {
        name: "M.Tech. (Food Processing & Technology)",
        specializations: ["Food Safety & Quality", "Bio-Process Engineering"],
        duration: "2 years",
        seats: 18,
        eligibility: "B.Tech. Food Tech / Biotech / Agricultural Eng. or M.Sc. Chemistry/Biology",
        highlights: ["Industrial internship", "Product development focus", "Advanced research"],
      },
    ],
    Doctoral: [
      {
        name: "Ph.D.",
        specializations: ["Applied Physics", "Applied Chemistry", "Applied Mathematics", "Environmental Sciences", "Food Processing & Technology"],
        duration: "3-5 years",
        seats: 25,
        eligibility: "Master's in relevant discipline with minimum 55% marks and GBU-ET/NET/GATE",
        highlights: ["High-impact research", "State-of-the-art research labs", "Conference grants"],
      },
    ],
  },
};

export const courseApplicationsKey = "Vocational";
export const courseApplicationsLabel = "Vocational Studies & Applied Sciences";
export const courseApplications = [
  { course: "B.Tech. (Food Tech)", applications: 140, approved: 60, pending: 15, rejected: 5 },
  { course: "B.Sc. (Hons.) Mathematics", applications: 180, approved: 60, pending: 20, rejected: 8 },
  { course: "M.Sc. (Physics)", applications: 120, approved: 30, pending: 10, rejected: 2 },
  { course: "M.Sc. (Environmental Sci)", applications: 90, approved: 30, pending: 12, rejected: 3 },
];

export const schoolBadge = { bg: "bg-teal-100", text: "text-teal-800" };
export const researchCenters = [
  {
    id: 201,
    name: "Environmental Science Research Lab",
    shortName: "ESR Lab",
    description:
      "Environmental monitoring, climate change impact studies, water remediation research, and sustainable development solutions.",
    image:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop",
    location: "Academic Block H, Ground Floor",
    head: "Dr. Bhaswati Banerjee",
    established: "2014",
    facilities: ["Air Quality Monitoring", "Heavy Metal Testing AAS", "GIS Mapping Station", "Ecology Lab"],
    researchAreas: ["Water Quality", "Soil Remediation", "Environmental Impact Assessment", "Climate Adaptation"],
    school: admissionsLabel,
  },
  {
    id: 202,
    name: "Food Processing & Analysis Lab",
    shortName: "Food Tech Lab",
    description:
      "Advanced research on food safety, preservation techniques, bio-processing, and novel product formulation.",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=500&h=300&fit=crop",
    location: "Academic Block H, Second Floor",
    head: "Dr. Mohd. Tashfeen Ashraf",
    established: "2015",
    facilities: ["HPLC Analysis", "Food Packaging Tester", "Spray Dryer", "Microbial Incubator"],
    researchAreas: ["Functional Foods", "Food safety & shelf life", "Waste utilization", "Nutraceuticals"],
    school: admissionsLabel,
  },
  {
    id: 203,
    name: "Materials Science & Thin Film Lab",
    shortName: "Thin Film Lab",
    description:
      "Synthesizing nanostructured materials, polymer-composites, and thin-film devices for energy storage and electronic applications.",
    image:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=500&h=300&fit=crop",
    location: "Academic Block H, First Floor",
    head: "Dr. Vivek Kumar Shukla",
    established: "2013",
    facilities: ["Thermal Evaporator", "UV-Vis Spectrophotometer", "Spin Coater", "Muffle Furnace"],
    researchAreas: ["Semiconducting Thin Films", "Conducting Polymers", "EV Battery Materials", "Gas Sensors"],
    school: admissionsLabel,
  },
];
