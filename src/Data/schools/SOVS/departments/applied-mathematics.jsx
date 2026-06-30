import { Binary, Calculator, TrendingUp, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "applied-mathematics",
  heroProps: {
    title: "Department of Applied Mathematics",
    highlight: "Applied Mathematics",
    subtitle:
      "Nurturing analytical thinkers and computational experts — Quality education in scientific computing, mathematical modeling, and optimization since 2012.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Binary,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Scientific Computing",
        description: "Numerical analysis, simulation, and high-performance computation",
      },
      {
        icon: Calculator,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Mathematical Modeling",
        description: "Formulating models for biological, financial, and physical systems",
      },
      {
        icon: TrendingUp,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Operations Research",
        description: "Optimization, data analysis, and decision theory",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Applied Mathematics",
    image: "https://faculty.gbu.ac.in/uploads/photos/660538aada591_apsingh.jpg", // placeholder
    name: "Dr. Pratiksha Saxena",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Applied Mathematics at the School of Vocational Studies & Applied Sciences, Gautam Buddha University. Mathematics is the language of science and the backbone of technology, and our department aims to make it highly applicable to real-world challenges.",
      "We offer B.Sc. (Hons) Mathematics, M.Sc. in Applied Mathematics, and Ph.D. programs. The curriculum is carefully designed to include numerical methods, computing tools, statistical analysis, and operations research alongside pure mathematical concepts.",
      "Our faculty members have diverse research expertise in biomathematics, optimization, modeling, and fluid dynamics. We encourage our students to think critically and apply mathematical solutions to industrial, engineering, and financial problems.",
      "Explore our academic options and join us in advancing quantitative knowledge.",
    ],
    contact: {
      name: "Dr. Pratiksha Saxena",
      designation: "Head of Department - Applied Mathematics",
      email: "pratiksha@gbu.ac.in",
      phone: "0120-234-4353",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Applied Mathematics focuses on equipping students with deep analytical skills and computational tools necessary for modern industrial and scientific roles.",
    stats: [
      { icon: Users, numberText: "120+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "4+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "5+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "40+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Computational Focus",
        description:
          "Curriculum emphasizes programming languages (Python, MATLAB) and mathematical software (SPSS, Mathematica) for practical data analysis and scientific computing.",
        dotColor: "#6366f1",
      },
      {
        title: "Interdisciplinary Research",
        description:
          "Active research in biomathematics, epidemiology, network optimization, and fluid dynamics collaborating with biology and engineering schools.",
        dotColor: "#3b82f6",
      },
      {
        title: "Strong Foundations",
        description:
          "Core mathematical training coupled with applied topics guarantees graduates succeed in academia, software development, data science, and analytics.",
        dotColor: "#14b8a6",
      },
    ],
    vision:
      "To be a premier hub for mathematical education and research that transforms quantitative knowledge into solutions for scientific and societal challenges.",
    missionPoints: [
      "Deliver rigorous academic programs combining pure and applied mathematics",
      "Train students in computer-based mathematical modeling and simulation",
      "Foster interdisciplinary research in optimization, biomathematics, and statistics",
      "Prepare graduates for successful careers in research, teaching, and data analytics",
    ],
  },
  programsData: [
    {
      title: "B.Sc. (Hons.) Mathematics",
      duration: "3 Years",
      intake: "60 Students",
      description:
        "Undergraduate honors program providing a strong base in calculus, algebra, mechanics, differential equations, and computational methods.",
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "Advanced Calculus",
        "Linear Algebra & Group Theory",
        "Numerical Analysis",
        "Differential Equations",
        "Operations Research",
        "Python Programming for Math",
        "Mini Projects",
      ],
    },
    {
      title: "M.Sc. Applied Mathematics",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Postgraduate program specializing in advanced numerical computation, mathematical modeling, scientific computing, and statistical methods.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Mathematical Modeling",
        "Advanced Numerical Methods",
        "Fluid Dynamics",
        "Integral Equations & Calculus of Variations",
        "Probability & Statistics",
        "MATLAB & Scientific Computing Lab",
        "Dissertation",
      ],
    },
    {
      title: "Ph.D. Applied Mathematics",
      duration: "3-5 Years",
      intake: "5 Students",
      description:
        "Doctoral research program in biomathematics, optimization techniques, fluid mechanics, network design, and computational mathematical modeling.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Independent Research",
        "Advanced Optimization Theory",
        "Mathematical Biology",
        "Research Methodology Course",
        "Journal Publications",
        "Thesis Defense",
      ],
    },
  ],
  facultyStats: {
    text: "Our department has 4 dedicated faculty members specializing in biomathematics, operations research, optimization, and scientific computing.",
    stats: [
      { icon: BookOpen, numberText: "40+", subtitle: "Research Papers", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: Award, numberText: "2+", subtitle: "Research Projects", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-amber-50", color: "text-amber-600" },
    ],
  },
  researchStats: [
    { numberText: "2+", subtitle: "Research Projects" },
    { numberText: "₹10L+", subtitle: "Research Funding" },
    { numberText: "40+", subtitle: "Publications" },
    { numberText: "8+", subtitle: "PhDs Awarded" },
  ],
  topAchievers: [
    {
      name: "Dinesh Kumar",
      year: "M.Sc 2024",
      achievement: "Qualified CSIR-NET JRF with All India Rank (AIR) 42",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      skills: ["Real Analysis", "Numerical Methods", "Optimization"],
    },
    {
      name: "Sneha Goel",
      year: "B.Sc 2023",
      achievement: "Placed as Data Analyst at a major consulting firm in Gurgaon",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      skills: ["Python", "Statistics", "Operations Research"],
    },
  ],
  achievements: [
    {
      title: "National Conference on Mathematical Modeling",
      year: "2025",
      description: "Hosted a successful national conference with over 150 participants from leading institutions.",
    },
    {
      title: "DST-SERB Project Completion",
      year: "2023",
      description: "Successfully completed a funded research project on mathematical modeling of epidemiological systems.",
    },
  ],
};
