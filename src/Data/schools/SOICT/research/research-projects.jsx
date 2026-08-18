import {
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

export const researchProjectsData = {
  schoolCode: "SOICT",
  schoolName: "School of Information & Communication Technology",
  hero: {
    title: "Transformative Research Initiatives",
    description:
      "Our research projects span cutting-edge technologies and address real-world challenges, funded by prestigious government agencies and industry partners.",
  },
  stats: [
    { icon: Award, value: 75, label: "Active Projects", color: "text-blue-600" },
    { icon: DollarSign, value: "₹45Cr", label: "Total Funding", color: "text-green-600" },
    { icon: Users, value: 120, label: "Researchers Involved", color: "text-purple-600" },
    { icon: CheckCircle, value: 45, label: "Completed Projects", color: "text-orange-600" },
  ],
  ongoingProjects: [
    {
      tag: "AI/ML",
      status: "Active",
      gradient: "from-blue-50 to-indigo-100",
      title: "AI-Powered Smart Healthcare Monitoring System",
      description:
        "Development of an intelligent healthcare monitoring system using IoT sensors, machine learning algorithms, and real-time data analytics for early disease detection and patient monitoring in rural healthcare settings.",
      duration: "2023-2026",
      team: "8 researchers",
      fundingAgency: "SERB",
      grant: "₹2.5 Cr",
      pi: "Dr. Rajesh Kumar",
      department: "CSE",
      progress: "65%",
    },
    {
      tag: "5G/6G",
      status: "Active",
      gradient: "from-green-50 to-emerald-100",
      title: "Next-Generation Wireless Communication for Smart Cities",
      description:
        "Research and development of advanced 5G/6G communication protocols, massive MIMO systems, and network optimization algorithms for smart city infrastructure including traffic management, environmental monitoring, and public safety.",
      duration: "2024-2027",
      team: "12 researchers",
      fundingAgency: "DST",
      grant: "₹3.2 Cr",
      pi: "Dr. Meera Krishnan",
      department: "ECE",
      progress: "35%",
    },
    {
      tag: "Cybersecurity",
      status: "Active",
      gradient: "from-purple-50 to-pink-100",
      title: "Quantum-Resistant Cryptography for Critical Infrastructure",
      description:
        "Development of post-quantum cryptographic algorithms and protocols to secure critical infrastructure against quantum computing threats. Focus on banking, power grids, and government communication systems.",
      duration: "2023-2025",
      team: "6 researchers",
      fundingAgency: "DRDO",
      grant: "₹1.8 Cr",
      pi: "Dr. Amit Patel",
      department: "CSE",
      progress: "80%",
    },
  ],
  projectCategories: [
    {
      icon: Award,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Government Funded",
      items: [
        { label: "SERB Projects", value: 15 },
        { label: "DST Projects", value: 12 },
        { label: "DRDO Projects", value: 8 },
        { label: "CSIR Projects", value: 6 },
      ],
      totalFunding: "₹28 Cr",
    },
    {
      icon: Target,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Industry Collaboration",
      items: [
        { label: "TCS Partnership", value: 8 },
        { label: "Infosys Projects", value: 6 },
        { label: "Intel Collaboration", value: 4 },
        { label: "Qualcomm Projects", value: 3 },
      ],
      totalFunding: "₹12 Cr",
    },
    {
      icon: Clock,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "International Projects",
      items: [
        { label: "EU Horizon Projects", value: 3 },
        { label: "NSF Collaboration", value: 2 },
        { label: "JSPS Fellowship", value: 2 },
        { label: "Newton Fund", value: 1 },
      ],
      totalFunding: "₹5 Cr",
    },
  ],
  completedProjects: [
    {
      icon: CheckCircle,
      title: "Blockchain-based Supply Chain Management System",
      description:
        "Developed a comprehensive blockchain solution for transparent and secure supply chain tracking with focus on pharmaceutical and food industries.",
      duration: "2021-2024",
      funding: "₹1.5 Cr",
      pi: "Dr. Vikram Singh",
      publications: 12,
      impact: "Technology transferred to 3 companies, 2 patents filed",
    },
    {
      icon: CheckCircle,
      title: "Energy-Efficient VLSI Design for IoT Devices",
      description:
        "Research on ultra-low power VLSI circuits and system design methodologies for battery-operated IoT sensors and wearable devices.",
      duration: "2020-2023",
      funding: "₹2.2 Cr",
      pi: "Dr. Suresh Reddy",
      publications: 15,
      impact: "90% power reduction achieved, licensed to semiconductor company",
    },
  ],
  upcomingProjects: [
    {
      status: "Planning Phase",
      icon: Clock,
      title: "Quantum Machine Learning Research Center",
      description:
        "Establishment of a dedicated research center for quantum computing and machine learning convergence.",
      start: "2025",
      funding: "₹10 Cr",
      duration: "5 years",
    },
    {
      status: "Proposal Submitted",
      icon: Clock,
      title: "Autonomous Vehicle Safety Systems",
      description:
        "Development of AI-powered safety systems for autonomous vehicles with focus on Indian traffic conditions.",
      start: "2025",
      funding: "₹4.5 Cr",
      duration: "4 years",
    },
    {
      status: "Under Review",
      icon: Clock,
      title: "Sustainable Computing Infrastructure",
      description:
        "Research on green computing technologies and sustainable data center architectures for reduced carbon footprint.",
      start: "2025",
      funding: "₹3.8 Cr",
      duration: "3 years",
    },
  ],
  impactPublications: [
    {
      label: "IEEE Journal Publications",
      value: 85,
      bg: "bg-blue-50",
      color: "text-blue-600",
      note: "High-impact journal publications",
    },
    {
      label: "Conference Papers",
      value: 145,
      bg: "bg-green-50",
      color: "text-green-600",
      note: "International conference presentations",
    },
    {
      label: "Patents Filed",
      value: 28,
      bg: "bg-purple-50",
      color: "text-purple-600",
      note: "National and international patents",
    },
    {
      label: "Technology Transfers",
      value: 12,
      bg: "bg-orange-50",
      color: "text-orange-600",
      note: "Successful industry collaborations",
    },
  ],
  impactSocial: [
    {
      color: "border-blue-500",
      title: "Healthcare Innovation",
      description:
        "AI-powered diagnostic tools developed by our team are being used in 15+ rural healthcare centers, improving early disease detection by 40%.",
    },
    {
      color: "border-green-500",
      title: "Smart Agriculture",
      description:
        "IoT-based crop monitoring systems have helped 500+ farmers increase crop yield by 25% while reducing water consumption by 30%.",
    },
    {
      color: "border-purple-500",
      title: "Education Technology",
      description:
        "Personalized learning platforms developed for K-12 education are being used by 10,000+ students across 50 schools.",
    },
    {
      color: "border-orange-500",
      title: "Environmental Monitoring",
      description:
        "Air quality monitoring network deployed in 3 cities provides real-time pollution data to local authorities and citizens.",
    },
  ],
  contactDetails: [
    {
      icon: Award,
      color: "text-blue-400",
      title: "USICT Research Office",
      email: "dean.usict@gbu.ac.in",
      phone: "+91-120-2344321",
    },
    {
      icon: DollarSign,
      color: "text-green-400",
      title: "Research & Development Cell",
      email: "research@gbu.ac.in",
      phone: "+91-120-2344300",
    },
    {
      icon: Users,
      color: "text-purple-400",
      title: "Corporate Relations Cell",
      email: "crc@gbu.ac.in",
      phone: "+91-120-2344350",
    },
  ],
};
