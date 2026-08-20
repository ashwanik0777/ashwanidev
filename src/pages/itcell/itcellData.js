import {
  Target,
  Rocket,
  CheckCircle,
  ShieldCheck,
  Search,
  MonitorCheck,
  FileText,
  Activity,
  Globe
} from "lucide-react";

export const responsibilities = [
  {
    title: "Website Assessment & Improvement",
    icon: Search,
  },
  {
    title: "Modern Development & Specifications",
    icon: FileText,
  },
  {
    title: "Compliance & Standards",
    icon: CheckCircle,
  },
  {
    title: "Advanced Website Security",
    icon: ShieldCheck,
  },
  {
    title: "Performance Monitoring",
    icon: Activity,
  },
  {
    title: "Seamless Integration",
    icon: Globe,
  },
  {
    title: "Reporting & Updates",
    icon: MonitorCheck,
  }
];

export const currentProgress = [
  {
    title: "Faculty Registration Portal",
    status: "Completed",
    description: "Smart Campus faculty registration system with automated approval workflows",
    progress: 100,
  },
  {
    title: "Multi-School Platform Integration",
    status: "In Progress",
    description: "Integrating and wiring APIs/data for 8 major schools of Gautam Buddha University",
    progress: 85,
  },
  {
    title: "Club Management System",
    status: "In Progress",
    description: "Dynamic campus club directory and administrative management controls",
    progress: 40,
  },
  {
    title: "Departmental Academic Portals",
    status: "Completed",
    description: "Customized course structures, programs, and curriculum systems per department",
    progress: 100,
  },
];

export const visionMission = {
  vision: {
    title: "Our Vision",
    icon: Target,
    content: "To digitally transform GBU by automating key processes, improving transparency, and enhancing user experience through scalable, secure, and smart solutions. We aim to establish GBU as a pioneer in digital campus innovation and tech-driven academic governance."
  },
  mission: {
    title: "Our Mission",
    icon: Rocket,
    content: "To create an emotionally intelligent, AI-powered, and sustainable smart campus. We develop student-centric digital portals, streamline administrative workflows, and empower the university community through modern software engineering."
  }
};

export const itcellDescription = {
  title: "What is IT Cell?",
  subtitle: "The IT Cell is GBU's dedicated innovation hub focused on transforming the university experience through cutting-edge technology and human-centered design.",
  quote: "We are not just building tools, we are transforming how a university works, lives, and evolves."
};

export const additionalStudentMembers = [
  {
    id: "mayank-prabhakar",
    name: "Mayank Prabhakar",
    role: "Web Developer",
    designation: "Intern & Trainer, Digital Automation Cell",
    department: "B.Tech CSE",
    image: "/assets/students/Mayank Prabhakar.png",
    email: "255ucs033@gbu.ac.in",
    linkedin: "https://www.linkedin.com/in/i-mayank-prabhakar-/",
    portfolio: "https://mayank-prabhakar.me/",
    bio: "Core contributor to the GBU Smart Campus initiative, working on university web platforms and digital solutions. Involved in feature development, AI-assisted implementation, testing, optimization, and deployment of web-based systems.",
    skills: ["HTML/CSS", "React", "Node.js", "MySQL", "PHP"],
    teamType: "student",
    sortOrder: 1,
    isActive: true,
  },
];
