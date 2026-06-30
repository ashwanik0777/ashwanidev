import { Users, BookOpen, Award, Heart, Briefcase, Shield } from "lucide-react";

/**
 * SOM — Human Resource Management Specialization
 * School of Management
 */
export const departmentLayoutData = {
  schoolCode: "SOM",
  departmentId: "human-resource-management",
  heroProps: {
    title: "HRM Specialization",
    highlight: "Human Resource Management",
    subtitle:
      "Developing HR professionals skilled in organizational development, talent management, performance systems, and strategic HRM at School of Management, GBU.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Placement" },
    backgroundImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Users,
        bg: "bg-gradient-to-br from-violet-500 to-violet-600",
        subtitle: "Talent Management",
        description: "Recruitment, selection, competency mapping, and performance management systems",
      },
      {
        icon: Heart,
        bg: "bg-gradient-to-br from-pink-500 to-pink-600",
        subtitle: "Organizational Development",
        description: "Change management, leadership, team building, and industrial psychology",
      },
      {
        icon: Shield,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Industrial Relations",
        description: "Labour laws, compensation management, diversity management, and international HRM",
      },
    ],
  },
  hodProps: {
    title: "Area Chairperson — HRM",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Neeti Rana",
    designation: "Associate Professor & Area Chairperson (HRM)",
    messageParagraphs: [
      "The HRM specialization develops professionals skilled in organizational change and development, cross-cultural management, performance management and competency mapping.",
      "Our curriculum covers training and development, diversity management, compensation management, industrial psychology, leadership and team building, recruitment and selection, international HRM, and industrial relations & labour laws.",
      "The program emphasizes both strategic and operational aspects of HR management. Our HR Conclave and industry interaction sessions provide excellent exposure to current HR trends and practices.",
    ],
    contact: {
      name: "Dr. Neeti Rana",
      designation: "Area Chairperson - HRM",
      email: "neeti@gbu.ac.in",
      phone: "0120-2346144",
    },
  },
  aboutProps: {
    heading: "About HRM Specialization",
    subheading: "Building HR leaders who can drive organizational transformation and employee engagement.",
    stats: [
      { icon: Users, numberText: "60+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "4+", title: "Faculty", subtitle: "HRM" },
      { icon: Award, numberText: "8+", title: "Electives", subtitle: "Offered" },
    ],
    highlights: [
      {
        title: "HR Conclaves & Workshops",
        description: "Regular HR conclaves featuring industry leaders, HR practitioners, and academics discussing evolving trends in human resource management, talent acquisition, and workforce transformation.",
        dotColor: "#8b5cf6",
      },
      {
        title: "Research in OB & HRM",
        description: "Faculty and scholars publish in international journals on HPWP, OCB, psychological capital, diversity management, and organizational behaviour topics.",
        dotColor: "#ec4899",
      },
    ],
    vision: "To develop HR leaders who can drive organizational excellence through people management, ethical practices, and strategic thinking.",
    missionPoints: [
      "Provide comprehensive knowledge of HR functions and organizational behaviour",
      "Develop competencies in talent management and performance systems",
      "Foster understanding of labour laws and industrial relations",
      "Build leadership, team building, and change management skills",
    ],
  },
  programsData: [
    {
      title: "MBA — HRM Specialization",
      duration: "2 Years",
      intake: "Dual Specialization",
      description: "HRM as major specialization covering organizational behaviour, talent management, performance systems, leadership, employment law, and strategic HRM.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80",
      gradient: "from-violet-500 to-violet-600",
      highlights: [
        "Organizational Development", "Talent Management", "Performance Management",
        "Compensation Design", "Industrial Relations", "Leadership",
        "Training & Development", "International HRM",
      ],
    },
  ],
  facultyStats: {
    text: "HRM faculty includes experts in organizational behaviour, industrial psychology, and cross-cultural management.",
    stats: [
      { numberText: "4+", subtitle: "HRM Faculty" },
      { numberText: "8+", subtitle: "Elective Courses" },
    ],
  },
  researchStats: [
    { numberText: "25+", subtitle: "Publications" },
    { numberText: "4+", subtitle: "Research Projects" },
  ],
  topAchievers: [],
  achievements: [
    { title: "HR Conclave — Changing Landscape of HR", year: "2024", description: "HR conclave featuring industry leaders discussing evolving trends in HRM, talent acquisition, and workforce transformation." },
    { title: "Research on HPWP & OCB", year: "2024", description: "Faculty and scholars actively publishing on High Performance Work Practices and Organizational Citizenship Behaviour." },
  ],
};
