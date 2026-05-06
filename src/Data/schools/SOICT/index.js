/**
 * SOICT — School of Information & Communication Technology
 * Central export file for all school-specific data and configuration.
 */

import { Monitor } from "lucide-react";

export const SCHOOL_CODE = "SOICT";
export const SCHOOL_NAME = "School of Information & Communication Technology";
export const SCHOOL_SHORT = "SOICT";

// Home page sections config
export { sectionsConfig } from "./home.jsx";

// Contact info (used by Contact page)
export const contactInfo = {
  address: "Academic Block A, Gautam Buddha University, Greater Noida, UP 201312",
  phone: "+91-120-234-9988",
  email: "soict.office@gbu.ac.in",
  website: "https://www.gbu.ac.in/USICT/",
  dean: "Prof. (Dr.) Rajeev Malhotra",
};

// About page data
export const aboutData = {
  mission: "To develop globally competitive IT professionals through quality education, research, and innovation.",
  vision: "To be a world-class center of excellence in information and communication technology education and research.",
  established: "2008",
};

// Department pages meta (used by Navbar and routing)
export const departmentPages = [
  { id: "cse", name: "Computer Science & Engineering", path: "departments/cse" },
  { id: "it", name: "Information Technology", path: "departments/it" },
  { id: "ece", name: "Electronics & Communication Engineering", path: "departments/ece" },
  // { id: "cyber-security", name: "Cyber Security", path: "departments/cyber-security" },
  // { id: "coedt", name: "COEDT", path: "departments/coedt" },
  // { id: "raem", name: "RAEM", path: "departments/raem" },
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
  imageUrl: "https://www.gbu.ac.in/USICT/media/img/slider/1.jpg",
  label: SCHOOL_NAME,
  description:
    "Leading innovation in computer science, AI, cybersecurity, and digital transformation with cutting-edge research facilities.",
  path: "/schools/SOICT",
  features: ["AI & ML", "Cybersecurity", "Data Science", "Software Engineering"],
};

export const admissionsKey = "Information Technology";
export const admissionsLabel = "Information & Communication Technology";
export const admissionsShortLabel = "ICT";
export const admissions = {
  icon: Monitor,
  color: "from-green-600 to-teal-600",
  image: "photo-1581092162384-8987c1d64718",
  programs: {
    Undergraduate: [
      {
        name: "Bachelor of Computer Applications (BCA)",
        specializations: ["Software Development", "Web Technologies", "Mobile Apps"],
        duration: "3 years",
        seats: 120,
        eligibility: "12th with Mathematics",
        highlights: [
          "Industry projects",
          "Internship program",
          "Skill certification",
        ],
      },
    ],
    Postgraduate: [
      {
        name: "Master of Computer Applications (MCA)",
        specializations: ["Data Science", "Cybersecurity", "Cloud Computing"],
        duration: "2 years",
        seats: 60,
        eligibility: "Bachelor's with Mathematics/Statistics",
        highlights: [
          "Industry mentorship",
          "Live projects",
          "Placement support",
        ],
      },
    ],
    Doctoral: [],
  },
};

export const courseApplicationsKey = "ICT";
export const courseApplicationsLabel = "Information & Communication Technology";
export const courseApplications = [
  { course: "BCA", applications: 280, approved: 120, pending: 25, rejected: 10 },
  { course: "MCA", applications: 200, approved: 90, pending: 20, rejected: 8 },
];

export const schoolBadge = { bg: "bg-blue-200", text: "text-blue-800" };
export const researchCenters = [
  {
    id: 1,
    name: "Centre for Artificial Intelligence & Machine Learning",
    shortName: "AI-ML Center",
    description:
      "Advanced research in AI, ML, deep learning, and neural networks with state-of-the-art computing infrastructure.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&h=300&fit=crop",
    location: "Block A, Research Complex",
    head: "Dr. Rajesh Kumar",
    established: "2020",
    facilities: ["GPU Clusters", "Quantum Simulators", "Edge Computing Lab", "Vision Lab"],
    researchAreas: ["Computer Vision", "NLP", "Robotics", "Quantum ML"],
    school: admissionsLabel,
  },
  {
    id: 5,
    name: "IoT & Cyber Security Research Centre",
    shortName: "IoT-Security Center",
    description:
      "Internet of Things and cybersecurity research for smart cities and industrial applications.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=300&fit=crop",
    location: "IT Building, Floor 3",
    head: "Dr. Neha Singh",
    established: "2021",
    facilities: ["IoT Testbed", "Security Lab", "5G Lab", "Blockchain Lab"],
    researchAreas: ["IoT Security", "Blockchain", "5G Networks", "Edge Computing"],
    school: admissionsLabel,
  },
];
