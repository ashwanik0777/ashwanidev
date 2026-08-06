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
    description: "To assess the existing University website and identify areas for improvement in terms of design, functionality, performance, accessibility, and security.",
    icon: Search,
  },
  {
    title: "Modern Development & Specifications",
    description: "To prepare detailed requirements and specifications for the development of a modern, responsive, interactive, and user-centric website.",
    icon: FileText,
  },
  {
    title: "Compliance & Standards",
    description: "To ensure compliance with applicable Government of India guidelines, web accessibility standards, cybersecurity norms, and industry best practices.",
    icon: CheckCircle,
  },
  {
    title: "Advanced Website Security",
    description: "To recommend, implement, and oversee advanced website security measures, including SSL/TLS encryption, secure authentication, protection against cyber threats (SQLi, XSS, CSRF, malware), data backup, disaster recovery, and periodic security audits.",
    icon: ShieldCheck,
  },
  {
    title: "Performance Monitoring",
    description: "To monitor website performance, availability, uptime, scalability, and security on a regular basis and recommend corrective measures wherever necessary.",
    icon: Activity,
  },
  {
    title: "Seamless Integration",
    description: "To ensure seamless integration of the website with institutional services, online applications, notifications, ERP systems, and other digital platforms of the University if required.",
    icon: Globe,
  },
  {
    title: "Reporting & Updates",
    description: "To submit periodic progress reports, recommendations, and implementation status reports to the Competent Authority. (Note: This order supersedes all previous orders issued in this reference).",
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
    content: "To digitally transform GBU by automating key processes, improving transparency, and enhancing user experience through scalable, secure, and smart solutions."
  },
  mission: {
    title: "Our Mission",
    icon: Rocket,
    content: "To create an emotionally intelligent, AI-powered, and sustainable smart campus."
  }
};

export const itcellDescription = {
  title: "What is IT Cell?",
  subtitle: "The IT Cell is GBU's dedicated innovation hub focused on transforming the university experience through cutting-edge technology and human-centered design.",
  quote: "We are not just building tools, we are transforming how a university works, lives, and evolves."
};