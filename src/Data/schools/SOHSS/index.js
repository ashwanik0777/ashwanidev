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
  address: "Academic Block G, Gautam Buddha University, Yamuna Expressway, Greater Noida, Gautam Budh Nagar, UP 201312",
  phone: "0120-2344223",
  email: "deanhss@gbu.ac.in",
  website: "https://www.gbu.ac.in/school/soh",
  dean: "Prof. Madhav Govind",
};

export const aboutData = {
  mission: "To nurture critical thinking, creativity, and social responsibility through humanities and social sciences education, fostering interdisciplinary understanding of social complexities with emphasis on Indian cultural values and Buddhist ethics.",
  vision: "To be a center of academic excellence fostering humanistic values and social innovation, creating a community of intellectuals endowed with character, creativity, competence, and commitment.",
  established: "2009",
};

export const departmentPages = [
  { id: "english", name: "English & Modern European Languages", path: "departments/english" },
  { id: "indian-languages", name: "Indian Languages & Literature", path: "departments/indian-languages" },
  { id: "mass-communication", name: "Mass Communication & Media Studies", path: "departments/mass-communication" },
  { id: "economics", name: "Economics, Planning & Development", path: "departments/economics" },
  { id: "education-training", name: "Education & Training", path: "departments/education-training" },
  { id: "history-civilization", name: "History & Civilization", path: "departments/history-civilization" },
  { id: "political-science", name: "Political Science & International Relations", path: "departments/political-science" },
  { id: "psychology", name: "Psychology & Mental Health", path: "departments/psychology" },
  { id: "public-administration", name: "Public Administration, Governance & Policy Research", path: "departments/public-administration" },
  { id: "social-work", name: "Social Work", path: "departments/social-work" },
  { id: "sociology", name: "Sociology", path: "departments/sociology" },
  { id: "library-information-science", name: "Library & Information Science", path: "departments/library-information-science" },
];

export const researchPages = [
  { id: "research-area", name: "Research Areas", path: "research-area" },
  { id: "research-projects", name: "Research Projects", path: "research-projects" },
  { id: "research-scholars", name: "Research Scholars", path: "research-scholars" },
  { id: "training-consultancy", name: "Training & Consultancy", path: "training-consultancy" },
  { id: "patents", name: "Patents", path: "patents" },
];

export const schoolCard = {
  imageUrl: "https://media.licdn.com/dms/image/v2/D5622AQFpyFIVNc2KUQ/feedshare-shrink_800/feedshare-shrink_800/0/1724330956316?e=2147483647&v=beta&t=gqRLezCyDV6YOCaEF_zZ6dej78YCHqgR5LWnrBE9HwQ",
  label: SCHOOL_NAME,
  description:
    "Exploring human culture, society, and behavior through interdisciplinary approaches in psychology, sociology, literature, political science, education, and media studies.",
  path: "/schools/SOHSS",
  features: ["Psychology", "Sociology", "English", "Political Science", "Education", "Mass Communication"],
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
        name: "Bachelor of Arts (BA Hons.)",
        specializations: ["English", "Hindi", "Sanskrit", "Economics", "History", "Political Science", "Applied Psychology"],
        duration: "3 years",
        seats: 400,
        eligibility: "12th from any stream",
        highlights: ["Research projects", "Cultural activities", "Fieldwork", "Skill development"],
      },
      {
        name: "Bachelor of Education (B.Ed.)",
        specializations: ["Teaching Methodology", "Educational Psychology"],
        duration: "2 years",
        seats: 50,
        eligibility: "Graduation in relevant field",
        highlights: ["Practice teaching", "School internships", "NEP 2020 curriculum"],
      },
      {
        name: "BSW (Bachelor of Social Work)",
        specializations: ["Community Development", "Social Policy"],
        duration: "3 years",
        seats: 40,
        eligibility: "12th from any stream",
        highlights: ["Fieldwork", "Community engagement", "NGO internships"],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Arts (MA)",
        specializations: ["English", "Hindi", "Urdu", "Economics", "History", "Political Science", "Sociology", "Applied Psychology", "Education", "Mass Communication", "Journalism"],
        duration: "2 years",
        seats: 300,
        eligibility: "Bachelor's in relevant field",
        highlights: ["Research methodology", "Thesis writing", "Academic excellence"],
      },
      {
        name: "M.Phil. Clinical Psychology",
        specializations: ["Clinical Psychology"],
        duration: "2 years",
        seats: 12,
        eligibility: "M.A./M.Sc. Psychology with RCI eligibility",
        highlights: ["Clinical training", "OPD practice", "Supervised therapy"],
      },
      {
        name: "MSW (Master of Social Work)",
        specializations: ["Community Development", "Social Policy"],
        duration: "2 years",
        seats: 30,
        eligibility: "Graduation in any discipline",
        highlights: ["Fieldwork", "Research", "Community practice"],
      },
    ],
    Doctoral: [
      {
        name: "Ph.D.",
        specializations: ["English", "Hindi", "Psychology", "Sociology", "Political Science", "Education", "Economics", "History", "Social Work", "Mass Communication"],
        duration: "3-5 years",
        seats: 80,
        eligibility: "Master's in relevant field with NET/JRF",
        highlights: ["Independent research", "Publications", "Conference participation"],
      },
    ],
  },
};

export const courseApplicationsKey = "Humanities";
export const courseApplicationsLabel = "Humanities & Social Sciences";
export const courseApplications = [
  { course: "BA (English)", applications: 180, approved: 60, pending: 25, rejected: 8 },
  { course: "MA (Psychology)", applications: 120, approved: 30, pending: 15, rejected: 5 },
  { course: "B.Ed.", applications: 150, approved: 50, pending: 20, rejected: 6 },
  { course: "MSW", applications: 90, approved: 30, pending: 10, rejected: 4 },
];

export const schoolBadge = { bg: "bg-pink-200", text: "text-pink-800" };
export const researchCenters = [
  {
    id: 104,
    name: "Center for Hindu Studies",
    shortName: "Hindu Studies Center",
    description:
      "Interdisciplinary center for research in Hindu philosophy, Indian knowledge systems, and cultural heritage.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&h=300&fit=crop",
    location: "Academic Block G",
    head: "Faculty Coordinator",
    established: "2020",
    facilities: ["Seminar Hall", "Research Library", "Digital Archive"],
    researchAreas: ["Hindu Philosophy", "Indian Knowledge Systems", "Cultural Heritage", "Vedic Studies"],
    school: admissionsLabel,
  },
  {
    id: 105,
    name: "Center for Human Rights",
    shortName: "Human Rights Center",
    description:
      "Research center focused on human rights issues, social justice, constitutional rights, and international human rights law.",
    image:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=500&h=300&fit=crop",
    location: "Academic Block G",
    head: "Faculty Coordinator",
    established: "2018",
    facilities: ["Conference Room", "Legal Resource Center", "Documentation Unit"],
    researchAreas: ["Human Rights", "Social Justice", "Constitutional Law", "International Law"],
    school: admissionsLabel,
  },
];
