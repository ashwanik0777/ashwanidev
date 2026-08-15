import { Users, Network, HeartPulse, BookOpen, Award, Lightbulb, GraduationCap, Globe } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "sociology",
  heroProps: {
    title: "Department of Sociology",
    highlight: "Sociology",
    subtitle:
      "Understanding Society & Social Change — Excellence in social processes, social inclusion, health & society, development sociology, and gender studies since 2011.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Network,
        bg: "bg-gradient-to-br from-sky-500 to-sky-600",
        subtitle: "Social Processes",
        description: "Social stratification, social movements, and institutional change",
      },
      {
        icon: HeartPulse,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Health & Society",
        description: "Medical sociology, public health, and well-being studies",
      },
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-violet-500 to-violet-600",
        subtitle: "Development Sociology",
        description: "Rural sociology, urbanization, gender studies, and social inclusion",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Sociology",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Prof. Madhav Govind",
    designation: "Dean & Professor, Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Sociology at the School of Humanities & Social Sciences, Gautam Buddha University. Established in 2011, our department is committed to fostering a deep understanding of social structures, processes, and transformations in contemporary society.",
      "We offer M.A. in Sociology and Ph.D. programs with a strong emphasis on social inclusion, health & society, development sociology, gender studies, and rural sociology. Our curriculum combines rigorous sociological theory with empirical research methods.",
      "Our faculty members are engaged in cutting-edge research on social processes, marginalized communities, health disparities, and development issues. We encourage students to undertake fieldwork and engage with communities to develop practical sociological understanding.",
      "Join us in exploring the complexities of human society and contributing to a more just and inclusive world.",
    ],
    contact: {
      name: "Prof. Madhav Govind",
      designation: "Dean & Professor, Head of Department - Sociology",
      email: "hod.sociology@gbu.ac.in",
      phone: "0120-234-9954",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2011, the Department of Sociology provides rigorous training in sociological theory, research methods, and applied sociology with focus on social inclusion and development.",
    stats: [
      { icon: Users, numberText: "50+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "2+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "5+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "35+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Strong Theoretical Foundation",
        description:
          "Comprehensive coverage of classical and contemporary sociological theories, research methodology, and statistical analysis for understanding social phenomena.",
        dotColor: "#0ea5e9",
      },
      {
        title: "Research on Social Inclusion",
        description:
          "Active research on caste, class, gender, and social exclusion with field-based studies in rural and urban communities across India.",
        dotColor: "#10b981",
      },
      {
        title: "Interdisciplinary Engagement",
        description:
          "Integration with political science, economics, psychology, and social work for a holistic understanding of social issues and policy interventions.",
        dotColor: "#8b5cf6",
      },
    ],
    vision:
      "To be a leading center for sociological education and research that contributes to understanding and addressing social inequalities and promoting inclusive development.",
    missionPoints: [
      "Provide quality education in sociology with emphasis on critical thinking",
      "Conduct impactful research on social inclusion, health, and development",
      "Foster understanding of social structures, processes, and inequalities",
      "Prepare students for careers in research, teaching, civil services, and development sector",
      "Promote social awareness and commitment to inclusive society",
    ],
  },
  programsData: [
    {
        id: "ma-sociology",
        title: "M.A. (Sociology)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Sociological theorists, methodology of social research, sociology of Indian society, gender, caste, and globalization studies.",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-600 to-indigo-700",
        highlights: [
            "Classical Sociological Theories",
            "Qualitative Research Methods",
            "Sociology of Development",
            "Master Dissertation"
        ],
        syllabusUrl: "/schools/sohss/Dept_Sociology_May2023.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/sohss/Dept_Sociology_May2023.pdf"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 2+ faculty members including the Dean of the school, with expertise in social processes, development sociology, and health studies.",
    stats: [
      { icon: BookOpen, numberText: "35+", subtitle: "Research Papers", bg: "bg-sky-50", color: "text-sky-600" },
      { icon: Award, numberText: "3+", subtitle: "Awards", bg: "bg-emerald-50", color: "text-emerald-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-violet-50", color: "text-violet-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "20+", subtitle: "Avg Experience", bg: "bg-blue-50", color: "text-blue-600" },
    ],
  },
  researchStats: [
    { numberText: "5+", subtitle: "Research Projects" },
    { numberText: "₹20L+", subtitle: "Research Funding" },
    { numberText: "35+", subtitle: "Publications" },
    { numberText: "8+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Meera Kumari",
      year: "M.A. Sociology 2023",
      achievement: "UGC-NET qualified, pursuing Ph.D. at JNU",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      skills: ["Social Research", "Gender Studies", "Qualitative Methods", "Academic Writing"],
    },
    {
      name: "Ravi Shankar",
      year: "Ph.D. Sociology 2024",
      achievement: "Published 5 papers, received ICSSR fellowship",
      image: "https://randomuser.me/api/portraits/men/48.jpg",
      skills: ["Development Sociology", "Ethnography", "Rural Studies", "Statistical Analysis"],
    },
  ],
  achievements: [
    {
      title: "ICSSR Research Grant",
      year: "2023",
      description: "Faculty received ICSSR grant for research on social inclusion and marginalized communities in UP",
    },
    {
      title: "National Sociology Conference",
      year: "2022",
      description: "Hosted national conference on 'Social Processes and Change in Contemporary India' with 150+ participants",
    },
    {
      title: "Field Research Initiative",
      year: "2024",
      description: "Launched comprehensive field research program studying rural communities in Gautam Buddh Nagar district",
    },
    {
      title: "UGC-NET Success",
      year: "2023",
      description: "Multiple students qualified UGC-NET/JRF in Sociology, demonstrating academic excellence",
    },
  ],
};
