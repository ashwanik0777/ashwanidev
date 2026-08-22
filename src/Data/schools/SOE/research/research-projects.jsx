import {
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

export const researchProjectsData = {
  schoolCode: "SOE",
  schoolName: "School of Engineering",
  hero: {
    title: "Research Projects at SOE",
    description:
      "Our faculty are leading impactful projects funded by DST, AICTE, DRDO, and industry partners across mechanical, civil, electrical, and interdisciplinary engineering domains.",
  },
  stats: [
    { icon: Award, value: 18, label: "Active Projects", color: "text-blue-600" },
    { icon: DollarSign, value: "₹4.2 Cr", label: "Total Funding", color: "text-green-600" },
    { icon: Users, value: 65, label: "Researchers Involved", color: "text-purple-600" },
    { icon: CheckCircle, value: 12, label: "Completed Projects", color: "text-orange-600" },
  ],
  ongoingProjects: [
    {
      tag: "Energy",
      status: "Active",
      gradient: "from-blue-50 to-indigo-100",
      title: "Design & Optimization of Solar Thermal Energy Storage System",
      description:
        "Development of phase-change material based thermal energy storage system for concentrated solar power plants to enable round-the-clock power generation.",
      duration: "2023-2026",
      team: "7 researchers",
      fundingAgency: "DST-SERB",
      grant: "₹45 Lakhs",
      pi: "Prof. R.S. Mishra",
      department: "Mechanical",
      progress: "58%",
    },
    {
      tag: "IoT/SHM",
      status: "Active",
      gradient: "from-green-50 to-emerald-100",
      title: "IoT-Based Real-Time Structural Health Monitoring of Bridges",
      description:
        "Development of wireless sensor network for continuous monitoring of bridge structural integrity including vibration, strain, and temperature parameters.",
      duration: "2023-2025",
      team: "6 researchers",
      fundingAgency: "AICTE-RPS",
      grant: "₹25 Lakhs",
      pi: "Dr. Prashant Garg",
      department: "Civil",
      progress: "46%",
    },
    {
      tag: "EV/AI",
      status: "Active",
      gradient: "from-purple-50 to-pink-100",
      title: "AI-Driven EV Battery Management System",
      description:
        "Development of machine learning algorithms for state-of-charge estimation, remaining useful life prediction, and thermal management of lithium-ion battery packs.",
      duration: "2024-2027",
      team: "8 researchers",
      fundingAgency: "DST-SERB (ECRA)",
      grant: "₹35 Lakhs",
      pi: "Dr. O.V. Singh",
      department: "Electrical",
      progress: "32%",
    },
    {
      tag: "Housing",
      status: "Active",
      gradient: "from-orange-50 to-amber-100",
      title: "Earthquake-Resistant Low-Cost Housing",
      description:
        "Research on bamboo-reinforced concrete and ferrocement techniques for affordable earthquake-resistant housing in seismic zone III and IV areas.",
      duration: "2023-2025",
      team: "5 researchers",
      fundingAgency: "HUDCO",
      grant: "₹20 Lakhs",
      pi: "Dr. Neha Sharma",
      department: "Civil",
      progress: "54%",
    },
    {
      tag: "Smart Grid",
      status: "Active",
      gradient: "from-teal-50 to-cyan-100",
      title: "Smart Grid Integration of Solar PV with Battery Storage",
      description:
        "Development of power electronic converters and control strategies for seamless integration of rooftop solar PV with battery storage into the smart grid.",
      duration: "2023-2025",
      team: "6 researchers",
      fundingAgency: "MNRE",
      grant: "₹22 Lakhs",
      pi: "Dr. Pankaj Swarnkar",
      department: "Electrical",
      progress: "61%",
    },
    {
      tag: "Environment",
      status: "Active",
      gradient: "from-slate-50 to-gray-100",
      title: "Water Quality Monitoring Using IoT Sensor Network",
      description:
        "IoT-based real-time water quality monitoring of Yamuna River tributaries using low-cost sensors and cloud analytics platform.",
      duration: "2024-2026",
      team: "5 researchers",
      fundingAgency: "AICTE-MODROBS",
      grant: "₹15 Lakhs",
      pi: "Dr. Arvind Dewangan",
      department: "Civil",
      progress: "28%",
    },
  ],
  projectCategories: [
    {
      icon: Award,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Government Funded",
      items: [
        { label: "SERB Projects", value: 6 },
        { label: "DST Projects", value: 4 },
        { label: "AICTE Projects", value: 5 },
        { label: "MNRE Projects", value: 3 },
      ],
      totalFunding: "₹2.6 Cr",
    },
    {
      icon: Target,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Industry Collaboration",
      items: [
        { label: "PSU Partnerships", value: 4 },
        { label: "Industrial R&D", value: 3 },
        { label: "Testing Labs", value: 2 },
        { label: "Consultancy", value: 5 },
      ],
      totalFunding: "₹1.1 Cr",
    },
    {
      icon: Clock,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      title: "International Collaboration",
      items: [
        { label: "MoU Projects", value: 2 },
        { label: "Joint Workshops", value: 3 },
        { label: "Faculty Exchange", value: 2 },
        { label: "Student Mobility", value: 4 },
      ],
      totalFunding: "₹0.5 Cr",
    },
  ],
  completedProjects: [
    {
      icon: CheckCircle,
      title: "Nanofluid-Based Heat Transfer Enhancement in Heat Exchangers",
      description:
        "Experimental and numerical study of heat transfer enhancement using alumina and copper oxide nanofluids in shell-and-tube and plate heat exchangers.",
      duration: "2022-2024",
      funding: "₹18 Lakhs",
      pi: "Dr. Manish Kumar",
      publications: 9,
      impact: "Adopted by two thermal labs, 1 patent filed",
    },
    {
      icon: CheckCircle,
      title: "Additive Manufacturing of Ti-6Al-4V for Biomedical Implants",
      description:
        "Selective Laser Melting (SLM) of titanium alloys for custom biomedical implants with optimized microstructure and mechanical properties.",
      duration: "2022-2024",
      funding: "₹30 Lakhs",
      pi: "Dr. Sunil Kumar",
      publications: 7,
      impact: "Clinical prototypes developed with partner hospital",
    },
  ],
  upcomingProjects: [
    {
      status: "Proposal Submitted",
      icon: Clock,
      title: "Autonomous Drone for Infrastructure Inspection",
      description:
        "AI-enabled drone platform for bridge and building inspection with automated crack detection.",
      start: "2026",
      funding: "₹1.2 Cr",
      duration: "3 years",
    },
    {
      status: "Under Review",
      icon: Clock,
      title: "AI-Based Traffic Management for Smart Cities",
      description:
        "Adaptive traffic signal control with predictive congestion analytics for NCR corridor.",
      start: "2026",
      funding: "₹90 Lakhs",
      duration: "2.5 years",
    },
    {
      status: "Planning Phase",
      icon: Clock,
      title: "Green Hydrogen Pilot",
      description:
        "Pilot plant for green hydrogen generation and storage for campus microgrid.",
      start: "2027",
      funding: "₹2.0 Cr",
      duration: "4 years",
    },
  ],
  impactPublications: [
    {
      label: "Journal Publications",
      value: 48,
      bg: "bg-blue-50",
      color: "text-blue-600",
      note: "SCIE/Scopus indexed journals",
    },
    {
      label: "Conference Papers",
      value: 92,
      bg: "bg-green-50",
      color: "text-green-600",
      note: "National and international conferences",
    },
    {
      label: "Patents Filed",
      value: 11,
      bg: "bg-purple-50",
      color: "text-purple-600",
      note: "Filed in energy and civil tech",
    },
    {
      label: "Technology Transfers",
      value: 6,
      bg: "bg-orange-50",
      color: "text-orange-600",
      note: "Industry partnerships and pilots",
    },
  ],
  impactSocial: [
    {
      color: "border-blue-500",
      title: "Infrastructure Safety",
      description:
        "Bridge monitoring pilots improved early fault detection and maintenance planning.",
    },
    {
      color: "border-green-500",
      title: "Energy Efficiency",
      description:
        "Thermal storage research helped reduce peak power usage in labs.",
    },
    {
      color: "border-purple-500",
      title: "Sustainable Materials",
      description:
        "Low-cost housing research supports safer constructions in seismic zones.",
    },
    {
      color: "border-orange-500",
      title: "Clean Water",
      description:
        "IoT water monitoring enables faster response to contamination events.",
    },
  ],
  contactDetails: [
    {
      icon: Award,
      color: "text-blue-400",
      title: "Research Office",
      email: "research.soe@gbu.ac.in",
      phone: "+91 120 234 5678",
    },
    {
      icon: DollarSign,
      color: "text-green-400",
      title: "Funding Support",
      email: "funding.soe@gbu.ac.in",
      phone: "+91 120 234 5679",
    },
    {
      icon: Users,
      color: "text-purple-400",
      title: "Industry Relations",
      email: "industry.soe@gbu.ac.in",
      phone: "+91 120 234 5680",
    },
  ],
};
