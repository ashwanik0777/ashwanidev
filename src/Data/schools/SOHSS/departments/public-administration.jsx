import { Landmark, FileText, ShieldCheck, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "public-administration",
  heroProps: {
    title: "Department of Public Administration, Governance & Policy Research",
    highlight: "Public Administration & Governance",
    subtitle:
      "Shaping Governance & Public Policy — Excellence in public administration, e-governance, administrative law, and rural development studies.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Landmark,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Governance Studies",
        description: "Democratic governance, local self-governance, and institutional reforms",
      },
      {
        icon: FileText,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Public Policy",
        description: "Policy analysis, policy-making processes, and development administration",
      },
      {
        icon: ShieldCheck,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Administrative Law",
        description: "Administrative law, e-governance, and regulatory frameworks",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Public Administration & Governance",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Vivek Kumar Mishra",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Public Administration, Governance & Policy Research at the School of Humanities & Social Sciences, Gautam Buddha University. Our department is committed to nurturing future administrators, policy analysts, and governance professionals.",
      "We offer M.A. in Public Administration and Ph.D. programs focused on public policy, governance, administrative law, local self-governance, e-governance, and rural development. Our interdisciplinary approach integrates insights from political science, law, economics, and sociology.",
      "Our faculty members, some of whom are shared with the Department of Political Science, bring diverse expertise in governance reform, development administration, and policy research. We actively collaborate with government agencies and research organizations.",
      "We aim to produce competent public administrators and policy researchers who can contribute to good governance and effective public service delivery in India.",
    ],
    contact: {
      name: "Dr. Vivek Kumar Mishra",
      designation: "Head of Department - Public Administration & Governance",
      email: "hod.pubadmin@gbu.ac.in",
      phone: "0120-234-9951",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Public Administration, Governance & Policy Research prepares students for careers in civil services, public policy, governance, and development administration.",
    stats: [
      { icon: Users, numberText: "30+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "2+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "3+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "15+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Interdisciplinary Approach",
        description:
          "Programs integrate public administration with political science, law, economics, and sociology for a holistic understanding of governance and public policy.",
        dotColor: "#f59e0b",
      },
      {
        title: "Civil Services Focus",
        description:
          "Strong emphasis on preparing students for UPSC, state PCS, and other competitive examinations with dedicated mentoring and mock sessions.",
        dotColor: "#f97316",
      },
      {
        title: "Governance Research",
        description:
          "Active research in e-governance, local self-governance, development administration, and rural development with field-based studies.",
        dotColor: "#ef4444",
      },
    ],
    vision:
      "To be a distinguished center for public administration education and governance research that contributes to effective and accountable public service delivery.",
    missionPoints: [
      "Provide quality education in public administration and governance studies",
      "Conduct research on governance reforms, e-governance, and development administration",
      "Prepare students for civil services and public sector careers",
      "Foster understanding of democratic governance and local self-governance",
      "Promote ethical values and commitment to public service",
    ],
  },
  programsData: [
    {
      title: "M.A. Public Administration",
      duration: "2 Years",
      intake: "25 Students",
      description:
        "Comprehensive master's program covering public administration, governance, public policy, administrative law, and development administration.",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Administrative Theory", "Public Policy", "Governance", "Administrative Law",
        "E-Governance", "Rural Development", "Research Methods", "Dissertation",
      ],
      syllabusUrl: "https://drive.google.com/file/d/132qnJdehhm8VuMa_sCzkkp_6v62ghy2m/preview",
      syllabus: [],
    },
    {
      title: "Ph.D. Public Administration",
      duration: "3-5 Years",
      intake: "6 Students",
      description:
        "Doctoral research in public administration, governance, policy analysis, e-governance, and local self-governance.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Independent Research", "Advanced Coursework", "Journal Publications",
        "Conference Presentations", "Field Research", "Policy Analysis",
        "Teaching Assistantship", "Thesis Defense",
      ],
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 2+ faculty members with expertise in public administration, governance, and policy research, with shared faculty from the Political Science department.",
    stats: [
      { icon: BookOpen, numberText: "15+", subtitle: "Research Papers", bg: "bg-amber-50", color: "text-amber-600" },
      { icon: Award, numberText: "2+", subtitle: "Awards", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-red-50", color: "text-red-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "15+", subtitle: "Avg Experience", bg: "bg-yellow-50", color: "text-yellow-600" },
    ],
  },
  researchStats: [
    { numberText: "3+", subtitle: "Research Projects" },
    { numberText: "₹10L+", subtitle: "Research Funding" },
    { numberText: "15+", subtitle: "Publications" },
    { numberText: "5+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Ankita Mishra",
      year: "M.A. Public Administration 2023",
      achievement: "Cleared UPSC Prelims, selected for state civil services",
      image: "https://randomuser.me/api/portraits/women/38.jpg",
      skills: ["Public Policy", "Governance", "Administrative Law", "Current Affairs"],
    },
    {
      name: "Suresh Yadav",
      year: "Ph.D. Public Administration 2024",
      achievement: "Published research on e-governance in rural India",
      image: "https://randomuser.me/api/portraits/men/42.jpg",
      skills: ["E-Governance", "Rural Development", "Research Methodology", "Policy Analysis"],
    },
  ],
  achievements: [
    {
      title: "Governance Workshop Series",
      year: "2023",
      description: "Conducted a series of workshops on good governance and e-governance with government officials",
    },
    {
      title: "Civil Services Mentoring Program",
      year: "2022",
      description: "Launched dedicated mentoring program for UPSC and state PCS aspirants",
    },
    {
      title: "Field Research on Local Governance",
      year: "2024",
      description: "Completed field study on Panchayati Raj institutions in Uttar Pradesh",
    },
    {
      title: "Policy Research Paper",
      year: "2023",
      description: "Faculty research on e-governance cited in government policy documents",
    },
  ],
};
