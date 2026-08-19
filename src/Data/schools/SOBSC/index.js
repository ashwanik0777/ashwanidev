/**
 * SOBSC — School of Buddhist Studies & Civilization
 * Central export file for all school-specific data and configuration.
 */

import { Brain } from "lucide-react";

export const SCHOOL_CODE = "SOBSC";
export const SCHOOL_NAME = "School of Buddhist Studies & Civilization";
export const SCHOOL_SHORT = "SOBSC";

// Home page sections config
export { sectionsConfig } from "./home.jsx";

// Contact info (used by Contact page)
export const contactInfo = {
  address: "Academic Block C, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9901",
  email: "sobsc.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/SOBSC/",
  dean: "Prof. Rajeev Varshney",
};

// About page data
export const aboutData = {
  mission: "To promote Buddhist philosophy, culture, and civilization through academic excellence, interdisciplinary research, and the development of a peaceful, compassionate, and ethically aware society.",
  vision: "To be a global center of excellence in Buddhist Studies, fostering international collaboration, interdisciplinary research, and the preservation of Buddhist heritage for the benefit of humanity.",
  established: "2011",
};

// Department pages meta (used by Navbar and routing)
export const departmentPages = [
  { id: "buddhist-philosophy", name: "Buddhist Philosophy & Ethics", path: "departments/buddhist-philosophy" },
  { id: "buddhist-languages", name: "Buddhist Languages & Literature", path: "departments/buddhist-languages" },
  { id: "meditation-mindfulness", name: "Meditation & Mindfulness Studies", path: "departments/meditation-mindfulness" },
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
    Undergraduate: [],
    Postgraduate: [
      {
        name: "M.A. Buddhist Studies",
        specializations: ["Buddhist Philosophy", "Ethics", "Meditation Studies", "Buddhist Languages"],
        duration: "2 years",
        seats: 40,
        eligibility: "Graduation in any discipline",
        highlights: ["International faculty", "Vipassana retreats", "Field visits to Buddhist sites"],
      },
      {
        name: "M.Phil Buddhist Studies",
        specializations: ["Advanced Buddhist Research", "Textual Studies"],
        duration: "2 years",
        seats: 15,
        eligibility: "M.A. in Buddhist Studies or related discipline",
        highlights: ["Research-oriented", "Dissertation", "International exposure"],
      },
    ],
    Doctoral: [
      {
        name: "Ph.D. Buddhist Studies",
        specializations: ["Buddhist Philosophy", "Languages & Literature", "Meditation Science", "Heritage & Archaeology"],
        duration: "3-5 years",
        seats: 10,
        eligibility: "M.Phil./M.A. with NET/JRF",
        highlights: ["Independent research", "International conferences", "Publication support"],
      },
    ],
  },
};

export const courseApplicationsKey = "Buddhist Studies";
export const courseApplicationsLabel = "Buddhist Studies";
export const courseApplications = [
  { course: "M.A. Buddhist Studies", applications: 120, approved: 40, pending: 15, rejected: 5 },
  { course: "M.Phil. Buddhist Studies", applications: 45, approved: 15, pending: 5, rejected: 2 },
  { course: "Ph.D. Buddhist Studies", applications: 30, approved: 10, pending: 3, rejected: 1 },
];

export const schoolBadge = { bg: "bg-yellow-200", text: "text-yellow-800" };
export const researchCenters = [
  {
    id: 101,
    name: "Centre for Buddhist Studies",
    shortName: "Buddhist Studies Centre",
    description:
      "Advanced research in Buddhist philosophy, textual studies, and comparative religion with a specialized library and digital manuscript archive.",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop",
    location: "Academic Block C",
    head: "Dr. C.V. Sivasai",
    established: "2016",
    facilities: ["Buddhist Studies Library", "Digital Manuscript Archive", "Seminar Hall"],
    researchAreas: ["Buddhist Philosophy", "Textual Studies", "Comparative Religion"],
    school: admissionsLabel,
  },
  {
    id: 102,
    name: "Meditation & Mindfulness Centre",
    shortName: "Meditation Centre",
    description:
      "Dedicated centre for Vipassana meditation practice, mindfulness research, and the scientific study of contemplative traditions.",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=300&fit=crop",
    location: "Academic Block C, Meditation Wing",
    head: "Dr. Priyadarsini Mitra",
    established: "2018",
    facilities: ["Meditation Hall", "Mindfulness Research Lab", "Retreat Accommodation"],
    researchAreas: ["Vipassana Meditation", "Mindfulness Science", "Applied Well-being"],
    school: admissionsLabel,
  },
];
