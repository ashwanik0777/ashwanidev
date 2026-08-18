/**
 * SOM — Research Areas & Profile
 * School of Management
 */
export const researchAreaData = {
  schoolCode: "SOM",
  schoolName: "School of Management",
  heading: "Research Areas — SOM",
  subheading:
    "Explore the research focus areas of the School of Management at Gautam Buddha University.",
  hero: {
    title: "Research Area and Profile",
    subtitle:
      "Our research ecosystem spans cutting-edge domains in management, finance, business analytics, and entrepreneurship, fostering innovation that addresses real-world business challenges.",
  },
  stats: [
    { iconName: "BookOpen", color: "text-blue-600", number: "30+", label: "Active Research Projects" },
    { iconName: "Users", color: "text-indigo-600", number: 18, label: "Research Faculty" },
    { iconName: "Award", color: "text-green-600", number: "120+", label: "Publications" },
    { iconName: "TrendingUp", color: "text-purple-600", number: "₹1.5Cr+", label: "Research & Consultancy Funding" },
  ],
  domains: [
    {
      iconName: "TrendingUp",
      color: "text-green-600",
      bg: "from-green-50 to-emerald-100",
      title: "Finance and Economics",
      tagline: "Capital Markets & Valuation",
      points: [
        { title: "Financial Derivatives & Valuation", desc: "Modeling risk, derivatives, and corporate assets" },
        { title: "Banking & Microfinance", desc: "Financial inclusion and central banking operations" },
        { title: "Wealth & Investment Management", desc: "Portfolio management and security analysis" },
      ],
      faculty: "Dr. Ajay Kumar Kansal, Dr. Satish K Mittal, Dr. Naveen Kumar",
      projects: "8",
      funding: "₹35 Lakhs",
    },
    {
      iconName: "Users",
      color: "text-blue-600",
      bg: "from-blue-50 to-indigo-100",
      title: "Human Resource Management",
      tagline: "Organizational Behavior & Change",
      points: [
        { title: "Organizational Change & Development", desc: "Fostering leadership, team building, and performance" },
        { title: "Cross-Cultural & Diversity Management", desc: "Understanding global workforce dynamics and inclusivity" },
        { title: "Competency Mapping & Performance", desc: "Designing strategic performance evaluation models" },
      ],
      faculty: "Dr. Neeti Rana, Dr. Monika Bhati, Dr. Lovy Sarikwal, Dr. Kavita Singh",
      projects: "7",
      funding: "₹25 Lakhs",
    },
    {
      iconName: "Award",
      color: "text-purple-600",
      bg: "from-purple-50 to-pink-100",
      title: "Marketing & International Business",
      tagline: "Consumer Behavior & Strategy",
      points: [
        { title: "Digital Marketing & Analytics", desc: "Tracking consumer trends and brand engagement online" },
        { title: "Consumer Behaviour & CRM", desc: "Understanding decision-making and building customer loyalty" },
        { title: "International Business Strategy", desc: "Global trade patterns and cross-border expansion" },
      ],
      faculty: "Dr. Subhojit Banerjee, Dr. Varsha Dixit",
      projects: "5",
      funding: "₹20 Lakhs",
    },
    {
      iconName: "Zap",
      color: "text-orange-600",
      bg: "from-orange-50 to-amber-100",
      title: "Operations & Decision Science",
      tagline: "Supply Chain Optimization",
      points: [
        { title: "Supply Chain & Quality Management", desc: "Optimization using Six Sigma and lean practices" },
        { title: "Quantitative Decision Analytics", desc: "Statistical applications and reliability theory in business" },
        { title: "Project & Production Planning", desc: "Scheduling, resource allocation, and operations control" },
      ],
      faculty: "Dr. Indu Uprety, Dr. Dinesh Kumar Sharma",
      projects: "6",
      funding: "₹30 Lakhs",
    },
    {
      iconName: "Brain",
      color: "text-indigo-600",
      bg: "from-indigo-50 to-purple-100",
      title: "Strategy & Entrepreneurship",
      tagline: "Venture Creation & Governance",
      points: [
        { title: "Business Model Innovation", desc: "Developing frameworks for competitive advantages" },
        { title: "Startup & Venture Capital", desc: "Researching the entrepreneurial ecosystem and funding" },
        { title: "Sustainable Business Practices", desc: "Corporate governance and social responsibility" },
      ],
      faculty: "Prof. Shweta Anand, Dr. Samar Raqshin",
      projects: "4",
      funding: "₹20 Lakhs",
    },
    {
      iconName: "Database",
      color: "text-teal-600",
      bg: "from-teal-50 to-cyan-100",
      title: "Business Analytics & Data Science",
      tagline: "Predictive Modeling",
      points: [
        { title: "AI/ML Applications in Business", desc: "Harnessing machine learning for data-driven decisions" },
        { title: "Predictive Analytics & Forecasting", desc: "Statistical forecasting and database warehousing" },
        { title: "IBM Association Initiatives", desc: "Applying advanced analytical platforms and Python" },
      ],
      faculty: "Dr. Ombir Singh, Dr. Rakesh Kumar Srivastava",
      projects: "5",
      funding: "₹20 Lakhs",
    },
  ],
  funding: [
    { title: "ICSSR", subtitle: "Social Science Research", amount: "₹45 Lakhs", bg: "bg-blue-50", color: "text-blue-600" },
    { title: "DST", subtitle: "Technology & Business Initiatives", amount: "₹35 Lakhs", bg: "bg-green-50", color: "text-green-600" },
    { title: "AICTE", subtitle: "Faculty Development & Projects", amount: "₹25 Lakhs", bg: "bg-red-50", color: "text-red-600" },
    { title: "Industry Consulting", subtitle: "Corporate consultancy assignments", amount: "₹45 Lakhs", bg: "bg-purple-50", color: "text-purple-600" },
  ],
  collaborations: [
    { title: "IBM India", desc: "Collaboration for MBA Business Analytics & Data Science program", extra: "Lab access & joint courses", border: "border-blue-500" },
    { title: "ICSSR", desc: "Funding for advanced research methodology courses", extra: "Annual grants & sponsorships", border: "border-green-500" },
    { title: "National Stock Exchange", desc: "Capital market education & awareness campaigns", extra: "Student industrial visits & certifications", border: "border-purple-500" },
  ],
  quickLinks: [
    { title: "Research Projects", desc: "Active and completed projects", href: "/schools/SOM/research-projects", iconName: "BookOpen", color: "text-blue-600" },
    { title: "Research Scholars", desc: "Our PhD community", href: "/schools/SOM/research-scholars", iconName: "Users", color: "text-green-600" },
    { title: "Patents", desc: "Innovation and IP", href: "https://drive.google.com/file/d/1H8BAACetPCdtyqN9woixpD6bSAgx09vx/preview", iconName: "Award", color: "text-purple-600" },
    { title: "Training & Consultancy", desc: "Industry engagement", href: "/schools/SOM/training-consultancy", iconName: "TrendingUp", color: "text-orange-600" },
  ],
};
