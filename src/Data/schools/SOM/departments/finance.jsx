import { DollarSign, TrendingUp, BookOpen, Award, Users, Building } from "lucide-react";

/**
 * SOM — Finance Specialization
 * School of Management
 */
export const departmentLayoutData = {
  schoolCode: "SOM",
  departmentId: "finance",
  heroProps: {
    title: "Finance Specialization",
    highlight: "Finance",
    subtitle:
      "Comprehensive knowledge in financial management, capital markets, banking, corporate finance, and investment analysis at School of Management, GBU.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Placement" },
    backgroundImage:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: DollarSign,
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        subtitle: "Financial Management",
        description: "Corporate finance, derivatives, portfolio management, and financial modeling",
      },
      {
        icon: TrendingUp,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Capital Markets",
        description: "Security analysis, investment management, and capital market operations",
      },
      {
        icon: Building,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Banking & Insurance",
        description: "Banking operations, microfinance, risk management, and public finance",
      },
    ],
  },
  hodProps: {
    title: "Area Chairperson — Finance",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Ajay Kumar Kansal",
    designation: "Area Chairperson (Finance), Associate Professor",
    messageParagraphs: [
      "The Finance specialization at SOM equips students with comprehensive knowledge in financial management, capital markets, banking, and corporate finance.",
      "Students develop expertise through courses covering financial derivatives, international financial management, tax planning & management, security analysis & portfolio management, wealth & investment management, corporate valuation & restructuring, financial modeling, microfinance, risk management, and public finance.",
      "Our curriculum is designed with industry relevance in mind. Students benefit from industrial visits to RBI and National Stock Exchange, investor awareness programmes, and interactions with financial industry professionals.",
    ],
    contact: {
      name: "Dr. Ajay Kumar Kansal",
      designation: "Area Chairperson - Finance",
      email: "ajay.kansal@gbu.ac.in",
      phone: "0120-2346144",
    },
  },
  aboutProps: {
    heading: "About Finance Specialization",
    subheading: "Developing financial professionals with strong analytical and decision-making skills.",
    stats: [
      { icon: Users, numberText: "100+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Finance" },
      { icon: Award, numberText: "10+", title: "Electives", subtitle: "Offered" },
    ],
    highlights: [
      {
        title: "Industry Exposure",
        description: "Industrial visits to Reserve Bank of India and National Stock Exchange. SEBI and Investor Awareness Programmes, and Market ka Eklavya initiatives.",
        dotColor: "#10b981",
      },
      {
        title: "Placement Success",
        description: "Students placed at Axis Bank, S&P Global, Bank of Baroda, Reliance Money, India Infoline, and Anand Rathi in finance roles.",
        dotColor: "#3b82f6",
      },
    ],
    vision: "To develop finance professionals with strong analytical capabilities and ethical values for the dynamic financial services industry.",
    missionPoints: [
      "Provide in-depth knowledge of financial markets and corporate finance",
      "Develop analytical and quantitative skills for financial decision-making",
      "Foster practical exposure through RBI/NSE visits and industry projects",
      "Prepare students for careers in banking, investment management, and consulting",
    ],
  },
  programsData: [
    {
      title: "MBA — Finance Specialization",
      duration: "2 Years",
      intake: "Dual Specialization",
      description: "Finance as major specialization with courses in derivatives, portfolio management, corporate valuation, and financial modeling.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-500 to-green-600",
      highlights: [
        "Financial Derivatives", "Portfolio Management", "Corporate Valuation",
        "Financial Modeling", "International Finance", "Tax Planning",
        "Risk Management", "Microfinance",
      ],
    },
  ],
  facultyStats: {
    text: "Finance faculty includes experts in capital markets, corporate finance, and financial analysis.",
    stats: [
      { numberText: "3+", subtitle: "Finance Faculty" },
      { numberText: "10+", subtitle: "Elective Courses" },
    ],
  },
  researchStats: [
    { numberText: "20+", subtitle: "Publications" },
    { numberText: "5+", subtitle: "Funded Projects" },
  ],
  topAchievers: [],
  achievements: [
    { title: "Industrial Visit to RBI", year: "2025", description: "Students gained insight into RBI operations and monetary policy frameworks." },
    { title: "Investor Awareness Programme", year: "2025", description: "Market education and investor awareness session under 'Market ka Eklavya' initiative." },
    { title: "NSE Industrial Visit", year: "2024", description: "MBA students visited National Stock Exchange to understand capital market operations." },
  ],
};
