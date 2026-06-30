import { BookOpen, Users, Award, Lightbulb, GraduationCap, TrendingUp, BarChart3, PieChart, Building2 } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "economics",
  heroProps: {
    title: "Department of Economics, Planning & Development",
    highlight: "Economics, Planning & Development",
    subtitle:
      "Advancing economic thought, policy analysis, and development planning. Empowering students to become economists, policy makers, and development professionals.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: TrendingUp,
        bg: "bg-gradient-to-br from-sky-500 to-sky-600",
        subtitle: "Development Economics",
        description:
          "Economic growth theories, poverty analysis, development planning, and sustainable development",
      },
      {
        icon: BarChart3,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Econometrics & Analysis",
        description:
          "Quantitative methods, statistical modeling, data analysis, and economic forecasting",
      },
      {
        icon: Building2,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Indian Economy & Policy",
        description:
          "Indian economic policies, public finance, planning frameworks, and governance",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Economics, Planning & Development",
    image: "https://faculty.gbu.ac.in/uploads/photos/66053a6265876_roopali.jpg",
    name: "Dr. Roopali Srivastava",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Economics, Planning & Development at the School of Humanities & Social Sciences, Gautam Buddha University! Economics is a vital discipline that shapes our understanding of how societies allocate resources, make decisions, and pursue prosperity.",
      "Our department offers rigorous academic programs that blend theoretical foundations with applied perspectives in development economics, macroeconomics, microeconomics, econometrics, and Indian economic planning. We prepare students who can analyze complex economic problems and contribute to evidence-based policy making.",
      "Our faculty members are experienced researchers with expertise in diverse areas of economics. They are actively engaged in research on Indian economic development, public policy, international trade, and financial economics, and regularly publish in reputed journals.",
      "We organize regular seminars, workshops, guest lectures by eminent economists, and encourage students to participate in national and international economics conferences and competitions. Our programs emphasize both quantitative skills and critical analytical thinking.",
      "We invite you to join us in exploring the fascinating world of economics and developing the skills needed to address the economic challenges of our time.",
    ],
    contact: {
      name: "Dr. Roopali Srivastava",
      designation: "Head of Department - Economics, Planning & Development",
      email: "roopali.srivastava@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Economics, Planning & Development provides rigorous training in economic theory, quantitative analysis, and development planning to prepare students for careers in academia, policy, and the private sector.",
    stats: [
      { icon: Users, numberText: "100+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "6+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "30+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "Rigorous Economic Training",
        description:
          "Our programs provide a strong foundation in microeconomics, macroeconomics, econometrics, and mathematical economics. Students develop the analytical and quantitative skills essential for economic analysis and policy evaluation.",
        dotColor: "#0ea5e9",
      },
      {
        title: "Development & Planning Focus",
        description:
          "We emphasize development economics and planning as core areas of study. Students engage with issues of economic growth, poverty, inequality, and sustainable development in the Indian and global context.",
        dotColor: "#10b981",
      },
      {
        title: "Policy Research & Analysis",
        description:
          "The department encourages applied research on economic policy issues. Students and faculty contribute to policy debates through research on public finance, trade policy, monetary economics, and governance.",
        dotColor: "#f97316",
      },
    ],
    vision:
      "To be a center of excellence in economics education and research, producing graduates who can contribute to economic policy making, development planning, and sustainable growth.",
    missionPoints: [
      "Provide quality education in economics and development studies",
      "Promote research in economic theory, policy analysis, and econometrics",
      "Develop analytical and quantitative skills among students",
      "Foster understanding of Indian and global economic issues",
      "Prepare students for careers in academia, government, and the private sector",
    ],
  },
  programsData: [
    {
      title: "B.A. (Hons.) Economics",
      duration: "3 Years",
      intake: "60 Students",
      description:
        "A comprehensive undergraduate program covering microeconomics, macroeconomics, econometrics, Indian economy, and development economics with quantitative skills training.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-sky-500 to-sky-600",
      highlights: [
        "Microeconomics",
        "Macroeconomics",
        "Econometrics",
        "Indian Economy",
        "Development Economics",
        "Mathematical Economics",
        "Public Finance",
        "International Trade",
      ],
    },
    {
      title: "M.A. Economics",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "An advanced postgraduate program exploring economic theory, advanced econometrics, and specialized areas of economics with strong research orientation.",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-emerald-600",
      highlights: [
        "Advanced Microeconomics",
        "Advanced Macroeconomics",
        "Advanced Econometrics",
        "Development Planning",
        "Financial Economics",
        "Research Methodology",
        "Environmental Economics",
        "Dissertation",
      ],
    },
    {
      title: "Ph.D. Economics",
      duration: "3-5 Years",
      intake: "8 Students",
      description:
        "A doctoral program for advanced research in economics covering development, policy, finance, trade, and interdisciplinary economic studies.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "Policy Research",
        "Interdisciplinary Studies",
        "Thesis Defense",
      ],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Roopali Srivastava",
      position: "Assistant Professor and HoD",
      specialization: "Development Economics, Indian Economy, Public Finance",
      email: "roopali.srivastava@gbu.ac.in",
      achievements: "Ph.D: Economics",
      image: "https://faculty.gbu.ac.in/uploads/photos/66053a6265876_roopali.jpg",
      color: "from-sky-500 to-sky-600",
      extraIcon: Award,
    },
  ],
  facultyStats: {
    text: "Our department has 3+ dedicated faculty members specializing in development economics, econometrics, and Indian economic policy.",
    stats: [
      {
        icon: BookOpen,
        numberText: "30+",
        subtitle: "Publications",
        bg: "bg-sky-50",
        color: "text-sky-600",
      },
      {
        icon: Award,
        numberText: "6+",
        subtitle: "Awards",
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-orange-50",
        color: "text-orange-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
    ],
  },
  researchStats: [
    { numberText: "6+", subtitle: "Research Projects" },
    { numberText: "₹20L+", subtitle: "Research Funding" },
    { numberText: "30+", subtitle: "Publications" },
    { numberText: "8+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Aditya Mishra",
      year: "M.A. Economics 2024",
      achievement: "UGC NET Qualified, Selected for Ph.D. at Delhi School of Economics",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      skills: ["Econometrics", "Data Analysis", "Policy Research", "STATA"],
    },
    {
      name: "Surbhi Jain",
      year: "B.A. (Hons.) Economics 2024",
      achievement: "Gold Medalist, Placed at Deloitte as Economic Analyst",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      skills: ["Macroeconomics", "Financial Analysis", "Excel", "Research"],
    },
    {
      name: "Vikash Kumar",
      year: "Ph.D. Economics 2024",
      achievement: "Published 3 papers in ABDC-listed journals, RBI Research Fellowship",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      skills: ["Development Economics", "Panel Data Analysis", "R Programming", "Policy Analysis"],
    },
  ],
  achievements: [
    {
      title: "Research Excellence",
      description: "Faculty research published in reputed national and international economics journals",
      icon: BookOpen,
      color: "text-sky-600",
    },
    {
      title: "Policy Contributions",
      description: "Faculty members contribute to government policy discussions and planning commissions",
      icon: TrendingUp,
      color: "text-emerald-600",
    },
    {
      title: "Student Placements",
      description: "Graduates placed in banking, consulting, government, and research organizations",
      icon: Building2,
      color: "text-orange-600",
    },
    {
      title: "Academic Achievements",
      description: "Students consistently qualify UGC NET, RBI Grade B, and UPSC examinations",
      icon: GraduationCap,
      color: "text-amber-600",
    },
  ],
};
