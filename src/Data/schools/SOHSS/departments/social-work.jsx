import { HandHeart, Home, Users, BookOpen, Award, Lightbulb, GraduationCap, HeartHandshake } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "social-work",
  heroProps: {
    title: "Department of Social Work",
    highlight: "Social Work",
    subtitle:
      "Empowering Communities, Transforming Lives — Excellence in community development, social policy, gender studies, child welfare, and counseling since 2011.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: HandHeart,
        bg: "bg-gradient-to-br from-rose-500 to-rose-600",
        subtitle: "Community Development",
        description: "Rural development, urban community work, and grassroots empowerment",
      },
      {
        icon: Home,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Child & Family Welfare",
        description: "Child welfare, family counseling, and disability studies",
      },
      {
        icon: HeartHandshake,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Social Policy & Gender",
        description: "Social policy analysis, gender studies, and human rights advocacy",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Social Work",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Rahul Kapoor",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Social Work at the School of Humanities & Social Sciences, Gautam Buddha University. Established in 2011, our department is committed to training professional social workers who can make a meaningful difference in society.",
      "We offer BSW, MSW, and Ph.D. programs that combine classroom learning with extensive fieldwork in communities, NGOs, government agencies, and corporate social responsibility initiatives. Our curriculum covers community development, social policy, rural development, gender studies, disability studies, child welfare, and counseling.",
      "Our faculty members bring a combination of academic expertise and field experience. We maintain active partnerships with NGOs, government departments, and civil society organizations for fieldwork placements and collaborative research.",
      "Join us in the noble pursuit of social justice, empowerment, and community transformation.",
    ],
    contact: {
      name: "Dr. Rahul Kapoor",
      designation: "Head of Department - Social Work",
      email: "hod.socialwork@gbu.ac.in",
      phone: "0120-234-9953",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2011, the Department of Social Work prepares professional social workers for community development, counseling, policy research, and human rights advocacy.",
    stats: [
      { icon: Users, numberText: "80+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "4+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "25+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Extensive Fieldwork",
        description:
          "All programs include mandatory fieldwork placements in NGOs, government agencies, hospitals, and community organizations, providing hands-on professional experience.",
        dotColor: "#f43f5e",
      },
      {
        title: "Community Engagement",
        description:
          "Active community outreach programs in nearby villages and urban areas focusing on health awareness, education, women's empowerment, and child rights.",
        dotColor: "#f97316",
      },
      {
        title: "Interdisciplinary Focus",
        description:
          "Curriculum integrates social work with psychology, sociology, law, and public administration for a comprehensive understanding of social issues.",
        dotColor: "#14b8a6",
      },
    ],
    vision:
      "To be a center of excellence in social work education that produces competent, compassionate, and socially committed professionals for community transformation.",
    missionPoints: [
      "Provide quality professional education in social work with emphasis on fieldwork",
      "Conduct research on community development, social policy, and marginalized communities",
      "Train social workers in counseling, advocacy, and community organizing",
      "Foster partnerships with NGOs, government agencies, and civil society organizations",
      "Promote social justice, human rights, and inclusive development",
    ],
  },
  programsData: [
    {
      title: "BSW (Bachelor of Social Work)",
      duration: "3 Years",
      intake: "40 Students",
      description:
        "Undergraduate professional program in social work with fieldwork training in community development, child welfare, and counseling.",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=400&q=80",
      gradient: "from-rose-500 to-rose-600",
      highlights: [
        "Introduction to Social Work", "Community Organization", "Social Case Work",
        "Social Group Work", "Rural Development", "Fieldwork Practicum",
        "Human Rights", "Research Methods",
      ],
      syllabusUrl: "/schools/social-work/CStr-SocialWork-NEP.pdf",
    syllabus: [],
    },
    {
      title: "MSW (Master of Social Work)",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Advanced professional program with specializations in community development, family & child welfare, and human resource management.",
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Advanced Social Work Practice", "Social Policy", "Gender Studies",
        "Disability Studies", "Counseling Skills", "CSR Management",
        "Concurrent Fieldwork", "Block Placement",
      ],
      syllabusUrl: "/schools/social-work/CStr-SocialWork-NEP.pdf",
    syllabus: [],
    },
    {
      title: "Ph.D. Social Work",
      duration: "3-5 Years",
      intake: "6 Students",
      description:
        "Doctoral research in community development, social policy, child welfare, gender studies, and disability studies.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Independent Research", "Advanced Coursework", "Journal Publications",
        "Conference Presentations", "Community-Based Research", "Field Studies",
        "Teaching Assistantship", "Thesis Defense",
      ],
      syllabusUrl: "/schools/social-work/Structure_-PhD.pdf",
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 3+ dedicated faculty members with expertise in community development, social policy, and professional social work practice.",
    stats: [
      { icon: BookOpen, numberText: "25+", subtitle: "Research Papers", bg: "bg-rose-50", color: "text-rose-600" },
      { icon: Award, numberText: "3+", subtitle: "Awards", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-amber-50", color: "text-amber-600" },
    ],
  },
  researchStats: [
    { numberText: "4+", subtitle: "Research Projects" },
    { numberText: "₹15L+", subtitle: "Research Funding" },
    { numberText: "25+", subtitle: "Publications" },
    { numberText: "10+", subtitle: "Fieldwork Partners" },
  ],
  topAchievers: [
    {
      name: "Sunita Devi",
      year: "MSW 2023",
      achievement: "Selected for UNICEF internship, working in child rights advocacy",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      skills: ["Child Welfare", "Counseling", "Community Organization", "Advocacy"],
    },
    {
      name: "Vikram Singh",
      year: "BSW 2024",
      achievement: "Led community health awareness campaign reaching 5000+ beneficiaries",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      skills: ["Community Development", "Health Education", "Project Management", "Field Work"],
    },
  ],
  achievements: [
    {
      title: "Community Outreach Program",
      year: "2023",
      description: "Organized health and education awareness camps in 15+ villages around Greater Noida",
    },
    {
      title: "NGO Partnership Network",
      year: "2022",
      description: "Established partnerships with 10+ NGOs for student fieldwork and research collaboration",
    },
    {
      title: "Gender Sensitization Workshop",
      year: "2024",
      description: "Conducted university-wide gender sensitization workshops attended by 500+ participants",
    },
    {
      title: "Disability Awareness Campaign",
      year: "2023",
      description: "Organized disability awareness and inclusive education campaign in collaboration with state government",
    },
  ],
};
