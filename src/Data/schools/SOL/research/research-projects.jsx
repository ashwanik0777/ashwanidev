import {
  Award,
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react";

export const researchProjectsData = {
  schoolCode: "SOL",
  schoolName: "School of Law, Justice & Governance",
  hero: {
    title: "Legal Research Initiatives",
    description:
      "Our research projects address pressing socio-legal challenges — from the impact of emerging technologies on the legal system to access-to-justice reforms — funded by prestigious bodies such as UGC, ICSSR, and the Bar Council of India.",
  },
  stats: [
    { icon: Award, value: 8, label: "Active Projects", color: "text-red-700" },
    { icon: DollarSign, value: "₹1.2Cr", label: "Total Funding", color: "text-rose-700" },
    { icon: Users, value: 22, label: "Researchers Involved", color: "text-amber-700" },
    { icon: CheckCircle, value: 5, label: "Completed Projects", color: "text-stone-700" },
  ],
  ongoingProjects: [
    {
      tag: "AI & Law",
      status: "Active",
      gradient: "from-red-50 to-rose-100",
      title: "Impact of Artificial Intelligence on the Indian Legal System",
      description:
        "A comprehensive study examining how artificial intelligence is reshaping legal practice, judicial decision-making, and regulatory frameworks in India. The project investigates AI-powered legal analytics, automated contract review, predictive policing, and the ethical and constitutional implications of algorithmic adjudication in Indian courts.",
      duration: "2024-2027",
      team: "4 researchers",
      fundingAgency: "UGC",
      grant: "₹15 Lakh",
      pi: "Dr. Akshay Kumar Singh",
      department: "Department of Law",
      progress: "40%",
    },
    {
      tag: "Access to Justice",
      status: "Active",
      gradient: "from-rose-50 to-pink-100",
      title: "Effectiveness of Legal Aid Services in Western Uttar Pradesh",
      description:
        "An empirical investigation into the functioning and efficacy of legal aid services provided under the Legal Services Authorities Act in the districts of Western UP. The project examines awareness levels among beneficiaries, quality of representation, barriers faced by marginalized communities, and recommends policy interventions for strengthening the legal aid delivery mechanism.",
      duration: "2023-2026",
      team: "3 researchers",
      fundingAgency: "ICSSR",
      grant: "₹12 Lakh",
      pi: "Dr. Satish Chandra",
      department: "Department of Law",
      progress: "60%",
    },
    {
      tag: "Data Privacy",
      status: "Active",
      gradient: "from-amber-50 to-orange-100",
      title: "Data Protection and Right to Privacy in Digital India",
      description:
        "A doctrinal and comparative study analysing the Digital Personal Data Protection Act, 2023, in light of the Supreme Court's landmark Puttaswamy judgment. The research evaluates data fiduciary obligations, consent frameworks, cross-border data flows, and the adequacy of the Indian data protection regime vis-à-vis GDPR and other international standards.",
      duration: "2024-2027",
      team: "3 researchers",
      fundingAgency: "UGC",
      grant: "₹10 Lakh",
      pi: "Dr. Priyanka Singh",
      department: "Department of Law",
      progress: "30%",
    },
  ],
  projectCategories: [
    {
      icon: Award,
      bg: "bg-red-100",
      iconColor: "text-red-700",
      title: "Government & Statutory Body Funded",
      items: [
        { label: "UGC Projects", value: 4 },
        { label: "ICSSR Projects", value: 2 },
        { label: "Bar Council of India", value: 1 },
        { label: "Ministry of Law & Justice", value: 1 },
      ],
      totalFunding: "₹78 Lakh",
    },
    {
      icon: Target,
      bg: "bg-rose-100",
      iconColor: "text-rose-700",
      title: "University & Institutional Research",
      items: [
        { label: "GBU Internal Fund", value: 3 },
        { label: "Seed Grant Projects", value: 2 },
        { label: "Faculty Development Grants", value: 2 },
        { label: "Inter-School Collaborative", value: 1 },
      ],
      totalFunding: "₹25 Lakh",
    },
    {
      icon: Clock,
      bg: "bg-amber-100",
      iconColor: "text-amber-700",
      title: "Collaborative & Policy Research",
      items: [
        { label: "NLU Joint Research", value: 2 },
        { label: "High Court Collaboration", value: 1 },
        { label: "NGO Partnership Projects", value: 2 },
        { label: "Law Commission Referrals", value: 1 },
      ],
      totalFunding: "₹18 Lakh",
    },
  ],
  completedProjects: [
    {
      icon: CheckCircle,
      title: "Gender Justice and Domestic Violence Laws in Rural India",
      description:
        "An extensive empirical study examining the implementation of the Protection of Women from Domestic Violence Act, 2005, across five districts of Uttar Pradesh. The research assessed awareness, complaint mechanisms, protection officer effectiveness, and judicial outcomes.",
      duration: "2021-2024",
      funding: "₹8 Lakh",
      pi: "Dr. Poonam Verma",
      publications: 6,
      impact: "Policy recommendations submitted to National Commission for Women; findings cited in District Legal Services Authority reports",
    },
    {
      icon: CheckCircle,
      title: "Corporate Social Responsibility Compliance under Companies Act, 2013",
      description:
        "A doctrinal and empirical study evaluating CSR compliance patterns among listed companies in India, examining the adequacy of regulatory oversight, Section 135 mandates, and the impact of CSR spending on community development.",
      duration: "2020-2023",
      funding: "₹6 Lakh",
      pi: "Dr. Mamta Sharma",
      publications: 4,
      impact: "Research adopted by NFCG for corporate governance training modules; 2 papers published in A-category law journals",
    },
  ],
  upcomingProjects: [
    {
      status: "Proposal Submitted",
      icon: Clock,
      title: "Juvenile Justice Reform and Rehabilitation in Uttar Pradesh",
      description:
        "A proposed empirical study on the functioning of Juvenile Justice Boards, observation homes, and rehabilitation mechanisms under the JJ Act, 2015, in select districts of UP.",
      start: "2026",
      funding: "₹14 Lakh",
      duration: "3 years",
    },
    {
      status: "Under Review",
      icon: Clock,
      title: "Regulation of FinTech and Digital Lending Platforms in India",
      description:
        "A research proposal examining the regulatory gaps in the rapidly growing FinTech ecosystem, including digital lending apps, cryptocurrency regulation, and consumer protection challenges.",
      start: "2026",
      funding: "₹11 Lakh",
      duration: "3 years",
    },
  ],
  impactPublications: [
    {
      label: "SCOPUS-Indexed Publications",
      value: 32,
      bg: "bg-red-50",
      color: "text-red-700",
      note: "High-impact legal research publications",
    },
    {
      label: "UGC-CARE Listed Journals",
      value: 48,
      bg: "bg-rose-50",
      color: "text-rose-700",
      note: "National peer-reviewed law journals",
    },
    {
      label: "Conference Papers",
      value: 65,
      bg: "bg-amber-50",
      color: "text-amber-700",
      note: "National and international seminar presentations",
    },
    {
      label: "Books & Monographs",
      value: 8,
      bg: "bg-stone-50",
      color: "text-stone-700",
      note: "Authored and edited legal publications",
    },
  ],
  impactSocial: [
    {
      color: "border-red-500",
      title: "Legal Aid & Access to Justice",
      description:
        "Research findings on legal aid effectiveness adopted by District Legal Services Authority, Greater Noida, leading to improved outreach programmes benefiting 2,000+ beneficiaries in Western UP.",
    },
    {
      color: "border-rose-500",
      title: "Domestic Violence Awareness",
      description:
        "Gender justice research translated into community awareness workshops conducted in 15 villages, training 200+ women on their legal rights under the Domestic Violence Act.",
    },
    {
      color: "border-amber-500",
      title: "Cyber Safety Education",
      description:
        "Cyber law research team conducted digital literacy and cyber safety workshops for 1,500+ college students and 500+ senior citizens across Gautam Buddh Nagar.",
    },
    {
      color: "border-stone-500",
      title: "Policy Recommendations",
      description:
        "Three research-based policy briefs submitted to the Law Commission of India and NITI Aayog on criminal justice reform, data protection, and juvenile rehabilitation.",
    },
  ],
  contactDetails: [
    {
      icon: Award,
      color: "text-red-400",
      title: "Research Office — SOL",
      email: "research.sol@gbu.ac.in",
      phone: "+91-120-2344200",
    },
    {
      icon: DollarSign,
      color: "text-rose-400",
      title: "Grants & Funding Support",
      email: "grants.sol@gbu.ac.in",
      phone: "+91-120-2344203",
    },
    {
      icon: Users,
      color: "text-amber-400",
      title: "Collaborations & Partnerships",
      email: "collaborations.sol@gbu.ac.in",
      phone: "+91-120-2344204",
    },
  ],
};
