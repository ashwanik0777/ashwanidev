import {
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

export const researchProjectsData = {
  schoolCode: "SOBT",
  schoolName: "School of Biotechnology",
  hero: {
    title: "Transformative Research Initiatives — SOBT",
    description:
      "Our research projects span cutting-edge biotechnology domains addressing real-world challenges in healthcare, agriculture, and environment, funded by prestigious agencies like DBT, DST, and CSIR.",
  },
  stats: [
    { icon: Award, value: 25, label: "Active Projects", color: "text-green-600" },
    { icon: DollarSign, value: "₹5Cr+", label: "Total Funding", color: "text-emerald-600" },
    { icon: Users, value: 60, label: "Researchers Involved", color: "text-teal-600" },
    { icon: CheckCircle, value: 15, label: "Completed Projects", color: "text-blue-600" },
  ],
  ongoingProjects: [
    {
      tag: "Genomics",
      status: "Active",
      gradient: "from-green-50 to-emerald-100",
      title: "CRISPR-Based Gene Editing for Disease Resistance in Rice",
      description:
        "Development of CRISPR-Cas9 mediated genome editing tools for creating blast-resistant rice varieties. The project focuses on precise gene modifications to enhance crop resilience and food security in South Asia.",
      duration: "2023-2026",
      team: "6 researchers",
      fundingAgency: "DBT",
      grant: "₹1.2 Cr",
      pi: "Dr. Bhupendra Chaudhary",
      department: "Biotechnology",
      progress: "55%",
    },
    {
      tag: "Drug Discovery",
      status: "Active",
      gradient: "from-blue-50 to-cyan-100",
      title: "AI-Driven Drug Repurposing for Neglected Tropical Diseases",
      description:
        "Application of machine learning and molecular docking approaches to identify existing drugs that can be repurposed for treating neglected tropical diseases. Integration of computational biology with wet-lab validation.",
      duration: "2024-2027",
      team: "5 researchers",
      fundingAgency: "DST",
      grant: "₹0.8 Cr",
      pi: "Dr. Deepali Singh",
      department: "Bioinformatics",
      progress: "30%",
    },
    {
      tag: "Environment",
      status: "Active",
      gradient: "from-teal-50 to-green-100",
      title: "Microbial Bioremediation of Heavy Metal Contaminated Soil",
      description:
        "Isolation and characterization of heavy metal tolerant microorganisms from industrial waste sites for developing cost-effective bioremediation strategies. Focus on phytoremediation coupled with microbial consortia.",
      duration: "2023-2025",
      team: "4 researchers",
      fundingAgency: "CSIR",
      grant: "₹0.5 Cr",
      pi: "Dr. Barkha Singhal",
      department: "Microbiology",
      progress: "70%",
    },
  ],
  projectCategories: [
    {
      icon: Award,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Government Funded",
      items: [
        { label: "DBT Projects", value: 8 },
        { label: "DST Projects", value: 5 },
        { label: "CSIR Projects", value: 4 },
        { label: "ICMR Projects", value: 3 },
      ],
      totalFunding: "₹3.5 Cr",
    },
    {
      icon: Target,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      title: "Industry Collaboration",
      items: [
        { label: "Biocon Partnership", value: 2 },
        { label: "Cipla Projects", value: 1 },
        { label: "CSIR Lab Collaboration", value: 3 },
        { label: "Bharat BioTech", value: 1 },
      ],
      totalFunding: "₹1.0 Cr",
    },
    {
      icon: Clock,
      bg: "bg-teal-100",
      iconColor: "text-teal-600",
      title: "International Projects",
      items: [
        { label: "Indo-US Biotech Projects", value: 1 },
        { label: "Indo-EU Collaboration", value: 1 },
        { label: "TWAS Fellowship", value: 2 },
      ],
      totalFunding: "₹0.5 Cr",
    },
  ],
  completedProjects: [
    {
      icon: CheckCircle,
      title: "Development of Diagnostic Kit for Dengue Virus Detection",
      description:
        "Developed a rapid, PCR-based diagnostic kit for early detection of dengue virus serotypes with 98% sensitivity and specificity.",
      duration: "2020-2023",
      funding: "₹0.6 Cr",
      pi: "Dr. Shalini Rai",
      publications: 8,
      impact: "Technology transferred to diagnostic company, 1 patent filed",
    },
    {
      icon: CheckCircle,
      title: "Metagenomics Analysis of Yamuna River Microbiome",
      description:
        "Comprehensive metagenomic profiling of microbial communities in Yamuna river at various pollution levels for developing biomonitoring strategies.",
      duration: "2019-2022",
      funding: "₹0.4 Cr",
      pi: "Dr. Barkha Singhal",
      publications: 6,
      impact: "Database created for environmental monitoring, used by 3 institutions",
    },
  ],
  upcomingProjects: [
    {
      status: "Planning Phase",
      icon: Clock,
      title: "Centre for Precision Medicine in Biotechnology",
      description:
        "Establishment of a dedicated centre integrating genomics, proteomics, and bioinformatics for personalized medicine approaches.",
      start: "2025",
      funding: "₹3 Cr",
      duration: "5 years",
    },
    {
      status: "Proposal Submitted",
      icon: Clock,
      title: "Nano-Biotechnology for Targeted Drug Delivery",
      description:
        "Development of nanoparticle-based drug delivery systems for cancer treatment using biodegradable polymeric nanocarriers.",
      start: "2025",
      funding: "₹1.5 Cr",
      duration: "3 years",
    },
  ],
  impactPublications: [
    {
      label: "SCI Journal Publications",
      value: 120,
      bg: "bg-green-50",
      color: "text-green-600",
      note: "High-impact journal publications",
    },
    {
      label: "Conference Papers",
      value: 85,
      bg: "bg-blue-50",
      color: "text-blue-600",
      note: "International conference presentations",
    },
    {
      label: "Patents Filed",
      value: 8,
      bg: "bg-purple-50",
      color: "text-purple-600",
      note: "National and international patents",
    },
    {
      label: "Book Chapters",
      value: 25,
      bg: "bg-teal-50",
      color: "text-teal-600",
      note: "Published in international edited books",
    },
  ],
  impactSocial: [
    {
      color: "border-green-500",
      title: "Agricultural Innovation",
      description:
        "CRISPR-edited crop varieties developed by our team are being tested in field trials, showing 30% improved disease resistance.",
    },
    {
      color: "border-blue-500",
      title: "Healthcare Diagnostics",
      description:
        "Rapid diagnostic kits developed for infectious diseases are being used in 10+ rural health centers for early detection.",
    },
    {
      color: "border-purple-500",
      title: "Environmental Remediation",
      description:
        "Bioremediation protocols have been deployed at 3 industrial sites, achieving 60% reduction in heavy metal contamination.",
    },
    {
      color: "border-teal-500",
      title: "Skill Development",
      description:
        "Training programs in molecular biology techniques have benefited 500+ students from neighboring institutions.",
    },
  ],
  contactDetails: [
    {
      icon: Award,
      color: "text-green-400",
      title: "Research Office — SOBT",
      email: "research.sobt@gbu.ac.in",
      phone: "+91-120-234-9900",
    },
    {
      icon: DollarSign,
      color: "text-emerald-400",
      title: "Funding Support",
      email: "funding.sobt@gbu.ac.in",
      phone: "+91-120-234-9901",
    },
    {
      icon: Users,
      color: "text-teal-400",
      title: "Industry Relations",
      email: "industry.sobt@gbu.ac.in",
      phone: "+91-120-234-9902",
    },
  ],
};
