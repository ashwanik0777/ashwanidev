// dacData.js
import { 
  Settings, 
  GraduationCap, 
  Brain, 
  Leaf, 
  Shield, 
  Target, 
  Rocket,
  Monitor,
  BookOpen,
  Bot,
  TreePine
} from "lucide-react";

export const corePillars = [
  {
    title: "Automation Across Departments",
    description: "Streamlining processes across all university departments with intelligent automation",
    icon: Settings,
  },
  {
    title: "Personalized Student Learning",
    description: "AI-driven personalized learning experiences tailored to each student's needs",
    icon: GraduationCap,
  },
  {
    title: "Emotionally Intelligent Experience",
    description: "Human-centered design that understands and responds to user emotions",
    icon: Brain,
  },
  {
    title: "Environmental Intelligence",
    description: "Smart environmental monitoring and sustainable campus management",
    icon: Leaf,
  },
  {
    title: "Smart Detection & Campus Security",
    description: "Advanced security systems with intelligent threat detection",
    icon: Shield,
  },
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

export const dacFeatures = [
  {
    icon: Monitor,
    title: "Digital GBU",
    description: "Complete digital transformation"
  },
  {
    icon: BookOpen,
    title: "NEP 2020 Alignment",
    description: "Aligned with education policy"
  },
  {
    icon: Bot,
    title: "AI + Human Design",
    description: "Intelligent automation with human touch"
  },
  {
    icon: TreePine,
    title: "Green Campus",
    description: "Sustainable technology solutions"
  }
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

export const dacDescription = {
  title: "What is DAC?",
  subtitle: "The Digital Automation Cell (DAC) is GBU's dedicated innovation hub focused on transforming the university experience through cutting-edge technology and human-centered design.",
  quote: "We are not just building tools, we are transforming how a university works, lives, and evolves."
};