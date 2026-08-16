import { Globe, Scale, Shield, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "political-science",
  heroProps: {
    title: "Department of Political Science & International Relations",
    highlight: "Political Science & International Relations",
    subtitle:
      "Understanding Power, Governance & Global Affairs — Excellence in Indian politics, international relations, foreign policy, and Central Asian studies.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "International Relations",
        description: "Foreign policy analysis, diplomacy, and Central Asian studies",
      },
      {
        icon: Scale,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Governance & Policy",
        description: "Democratic governance, public policy, and human rights",
      },
      {
        icon: Shield,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Non-Conventional Security",
        description: "Security studies, conflict resolution, and strategic affairs",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Political Science & International Relations",
    image: "https://faculty.gbu.ac.in/uploads/photos/660538e7c2b09_pankaj.jpg",
    name: "Dr. Pankaj Deep",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Political Science & International Relations at the School of Humanities & Social Sciences, Gautam Buddha University. Our department is dedicated to nurturing critical thinkers who can engage with complex political and global issues.",
      "We offer B.A. (Hons.), M.A., and Ph.D. programs with a strong focus on Indian politics, international relations, foreign policy, Central Asian studies, governance, and human rights. Our curriculum combines theoretical depth with contemporary relevance.",
      "Our faculty members are actively engaged in research on non-conventional security, Indian foreign policy, Central Asian geopolitics, and governance reforms. We encourage students to participate in national and international seminars, model United Nations, and policy discussions.",
      "Join us in exploring the fascinating world of politics, governance, and international affairs.",
    ],
    contact: {
      name: "Dr. Pankaj Deep",
      designation: "Head of Department - Political Science & International Relations",
      email: "hod.polsci@gbu.ac.in",
      phone: "0120-234-9950",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Political Science & International Relations prepares students for careers in governance, diplomacy, civil services, journalism, and policy research.",
    stats: [
      { icon: Users, numberText: "120+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "4+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "6+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "40+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Comprehensive Programs",
        description:
          "B.A. (Hons.), M.A. Political Science, M.A. Political Science & International Relations, and Ph.D. programs covering Indian politics, global affairs, and strategic studies.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research Excellence",
        description:
          "Active research in Central Asian studies, Indian foreign policy, non-conventional security, human rights, and governance with publications in national and international journals.",
        dotColor: "#6366f1",
      },
      {
        title: "Career Readiness",
        description:
          "Strong focus on civil services preparation, diplomatic studies, and policy research with seminars, workshops, and exposure to governance institutions.",
        dotColor: "#8b5cf6",
      },
    ],
    vision:
      "To be a leading center of excellence in political science education, international relations research, and governance studies that produces responsible global citizens.",
    missionPoints: [
      "Provide quality education in political science and international relations",
      "Conduct impactful research on governance, foreign policy, and security studies",
      "Prepare students for civil services, diplomacy, and policy-making careers",
      "Foster critical thinking and analytical skills for understanding complex political issues",
      "Promote awareness of human rights, democratic values, and global citizenship",
    ],
  },
  programsData: [
    {
        id: "ba-hons-ma-political-science",
        title: "B.A. (Hons.) / M.A. Political Science",
        level: "UG/PG",
        duration: "3-5 Years",
        intake: "40 Students",
        description: "Comprehensive study of political theory, comparative politics, Indian constitution, public policy, and international relations.",
        image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Political Thought",
            "Constitutional Framework",
            "International Systems",
            "Public Policy Analysis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/14H0UXYQHTjkozp7UIMVbCl1gjDaoZR7C/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/14H0UXYQHTjkozp7UIMVbCl1gjDaoZR7C/preview"
            }
        ]
    },
    {
        id: "ma-political-science-ir",
        title: "M.A. (Political Science and International Relations)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced analysis of global geopolitics, diplomatic strategies, security studies, foreign policies, and conflict resolution.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-600 to-purple-700",
        highlights: [
            "Global Geopolitics",
            "Diplomatic History",
            "Foreign Policy Analysis",
            "Master Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1nZpjQW0rg1L4-N9Wl1wa6fqOrVa-0QPv/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1nZpjQW0rg1L4-N9Wl1wa6fqOrVa-0QPv/preview"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 4+ dedicated faculty members with expertise in Indian politics, international relations, and governance.",
    stats: [
      { icon: BookOpen, numberText: "40+", subtitle: "Research Papers", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: Award, numberText: "3+", subtitle: "Awards", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-purple-50", color: "text-purple-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-emerald-50", color: "text-emerald-600" },
    ],
  },
  researchStats: [
    { numberText: "6+", subtitle: "Research Projects" },
    { numberText: "₹30L+", subtitle: "Research Funding" },
    { numberText: "40+", subtitle: "Publications" },
    { numberText: "10+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Shikha Yadav",
      year: "M.A. Political Science 2023",
      achievement: "Cleared UPSC Prelims, NET qualified",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      skills: ["Indian Politics", "International Relations", "Policy Analysis", "Research"],
    },
    {
      name: "Amit Kumar",
      year: "Ph.D. Political Science 2024",
      achievement: "Published 4 papers in international journals",
      image: "https://randomuser.me/api/portraits/men/28.jpg",
      skills: ["Central Asian Studies", "Foreign Policy", "Security Studies", "Academic Writing"],
    },
  ],
  achievements: [
    {
      title: "International Conference on Central Asian Studies",
      year: "2023",
      description: "Organized a major international conference on Central Asian geopolitics and India's role",
    },
    {
      title: "UPSC Success",
      year: "2023",
      description: "Multiple students cleared UPSC Prelims and UGC-NET examinations",
    },
    {
      title: "MoU with ICCR",
      year: "2022",
      description: "Collaboration with Indian Council for Cultural Relations for diplomatic studies",
    },
    {
      title: "Model United Nations",
      year: "2024",
      description: "Hosted inter-university MUN conference with participation from 20+ universities",
    },
  ],
};
