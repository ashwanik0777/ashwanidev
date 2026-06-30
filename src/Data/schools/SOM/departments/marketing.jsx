import { ShoppingCart, Users, BookOpen, Award, TrendingUp, Globe } from "lucide-react";

/**
 * SOM — Marketing Specialization
 * School of Management
 */
export const departmentLayoutData = {
  schoolCode: "SOM",
  departmentId: "marketing",
  heroProps: {
    title: "Marketing Specialization",
    highlight: "Marketing",
    subtitle:
      "Preparing professionals for careers in sales management, brand strategy, digital marketing, consumer insights, and international marketing.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Placement" },
    backgroundImage:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: ShoppingCart,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Sales & Distribution",
        description: "Sales management, distribution channels, and retail strategy",
      },
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Digital Marketing",
        description: "Digital campaigns, marketing analytics, and consumer behaviour",
      },
      {
        icon: TrendingUp,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Brand Management",
        description: "Brand positioning, advertising, CRM, and international marketing",
      },
    ],
  },
  hodProps: {
    title: "Area Chairperson — Marketing",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Subhojit Banerjee",
    designation: "Area Chairperson (Marketing) & Placement In-charge",
    messageParagraphs: [
      "The Marketing specialization prepares students for careers in sales management, brand strategy, digital marketing, and consumer insights.",
      "Our curriculum covers sales & distribution management, advertising & sales promotion, marketing of services, customer relationship management, consumer behaviour, marketing analytics, and international marketing.",
      "Students benefit from case-based learning, industry projects, and real-world marketing challenges. Our graduates are placed at top companies including Coca Cola, MagicBricks, Meesho, and other marketing-driven organizations.",
    ],
    contact: {
      name: "Dr. Subhojit Banerjee",
      designation: "Area Chairperson - Marketing & Placement In-charge",
      email: "subhojit.banerjee@gbu.ac.in",
      phone: "0120-2346144",
    },
  },
  aboutProps: {
    heading: "About Marketing Specialization",
    subheading: "Developing marketing professionals with strategic thinking and analytical skills.",
    stats: [
      { icon: Users, numberText: "80+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "2+", title: "Faculty", subtitle: "Marketing" },
      { icon: Award, numberText: "8+", title: "Electives", subtitle: "Offered" },
    ],
    highlights: [
      {
        title: "Case-Based Learning",
        description: "Marketing education through real-world case studies, industry projects, and competitive marketing simulations that build practical decision-making skills.",
        dotColor: "#ef4444",
      },
      {
        title: "Industry Connections",
        description: "Students placed at Coca Cola, MagicBricks, Meesho, and other marketing-driven companies. Active participation in national marketing competitions.",
        dotColor: "#3b82f6",
      },
    ],
    vision: "To develop marketing leaders who can drive business growth through innovative, ethical, and consumer-centric strategies.",
    missionPoints: [
      "Provide comprehensive knowledge of marketing concepts and strategies",
      "Develop digital marketing and analytics competencies",
      "Foster consumer behaviour research and market analysis skills",
      "Build brand management and communication expertise",
    ],
  },
  programsData: [
    {
      title: "MBA — Marketing Specialization",
      duration: "2 Years",
      intake: "Dual Specialization",
      description: "Marketing as major specialization with courses in consumer behaviour, brand management, digital marketing, CRM, and international marketing.",
      image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-500 to-red-600",
      highlights: [
        "Consumer Behaviour", "Brand Management", "Digital Marketing",
        "Sales & Distribution", "Advertising", "CRM",
        "Marketing Analytics", "International Marketing",
      ],
    },
  ],
  facultyStats: {
    text: "Marketing faculty includes experts in consumer research, brand strategy, and digital marketing.",
    stats: [
      { numberText: "2+", subtitle: "Marketing Faculty" },
      { numberText: "8+", subtitle: "Elective Courses" },
    ],
  },
  researchStats: [
    { numberText: "15+", subtitle: "Publications" },
    { numberText: "3+", subtitle: "Research Projects" },
  ],
  topAchievers: [],
  achievements: [
    { title: "Dr. Subhojit Banerjee — Placement In-charge", year: "2024", description: "Dr. Banerjee serves as both Area Chairperson (Marketing) and Placement In-charge for SOM." },
    { title: "Case Study Competitions", year: "2024", description: "SOM students actively participate in national marketing case study competitions." },
  ],
};
