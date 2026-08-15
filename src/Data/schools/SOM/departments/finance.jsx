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
        id: "dual-degree-bba-mba",
        title: "Dual Degree BBA + MBA (with Exit Option)",
        level: "UG/PG Integrated",
        duration: "4-5 Years",
        intake: "60 Students",
        description: "Integrated 5-year business administration degree providing foundational managerial acumen with exit option at BBA (Hons.) and advanced MBA specializations in Finance, Marketing, HR, and Operations.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Dual Degree Integration",
            "BBA Exit Option",
            "Cross-Disciplinary Electives",
            "Corporate Summer Internship"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk"
            }
        ]
    },
    {
        id: "bcom-honours",
        title: "B.Com. (Honours)",
        level: "UG",
        duration: "3-4 Years",
        intake: "60 Students",
        description: "Comprehensive financial accounting, corporate taxation, auditing standards, banking laws, business analytics, and cost management under the National Education Policy (NEP).",
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-600 to-teal-700",
        highlights: [
            "Corporate Accounting & Tax",
            "Auditing & Assurance",
            "Financial Management",
            "NEP Multidisciplinary Framework"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk"
            },
            {
                session: "Syllabus (NEP)",
                url: "https://drive.google.com/uc?export=download&id=11AuSp3jVB6PldyzPxO7fHzeV4CzHgVKk"
            }
        ]
    },
    {
        id: "master-business-administration",
        title: "MBA (Master of Business Administration)",
        level: "PG",
        duration: "2 Years",
        intake: "120 Students",
        description: "Flagship postgraduate management program offering dual specializations in Finance, Marketing, Human Resource Management, Operations & Supply Chain, and Information Technology.",
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-orange-700",
        highlights: [
            "Dual Specializations",
            "Harvard Case Methodology",
            "Corporate Mentorship",
            "Live Consulting Projects"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf"
            },
            {
                session: "Course Outline",
                url: "https://drive.google.com/uc?export=download&id=1Met6fLCQvyyqx0CPqdXQuB_0mZyf6m2e"
            }
        ]
    },
    {
        id: "mba-executive",
        title: "MBA (Executive)",
        level: "PG (Executive)",
        duration: "2 Years",
        intake: "30 Students",
        description: "Intensive weekend executive management program tailored for working professionals, corporate executives, and entrepreneurs focusing on strategic leadership and global business transformation.",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
        gradient: "from-slate-700 to-zinc-900",
        highlights: [
            "Weekend Delivery Format",
            "Strategic Decision Making",
            "C-Suite Leadership Modules",
            "Executive Industry Capstone"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf"
            },
            {
                session: "Course Outline",
                url: "https://drive.google.com/uc?export=download&id=1Met6fLCQvyyqx0CPqdXQuB_0mZyf6m2e"
            }
        ]
    },
    {
        id: "mba-business-analytics",
        title: "MBA (Business Analytics & Data Science)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Techno-managerial curriculum integrating predictive modeling, machine learning for business, big data visualization (Tableau/PowerBI), quantitative marketing, and fintech analytics.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-600 to-purple-700",
        highlights: [
            "Predictive & Prescriptive Analytics",
            "Python & R for Decision Science",
            "Data Visualization & Dashboards",
            "FinTech & Marketing Models"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=13B-SpaRwiOt2T1K-pZgzL7wpzCk8gpNf"
            },
            {
                session: "Course Outline",
                url: "https://drive.google.com/uc?export=download&id=1Met6fLCQvyyqx0CPqdXQuB_0mZyf6m2e"
            }
        ]
    },
    {
        id: "phd-business-management",
        title: "Ph.D. in Business Management",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Rigorous doctoral research program cultivating original scholarship in organizational behavior, corporate governance, strategic finance, consumer psychology, and supply chain dynamics.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-700 to-slate-900",
        highlights: [
            "Advanced Research Methodologies",
            "Quantitative & Qualitative Analysis",
            "Peer-Reviewed Journal Publishing",
            "Ph.D. Dissertation Defense"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1mHI20aIaPwmhpPN_JcksIHxxJy0laUiq",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1mHI20aIaPwmhpPN_JcksIHxxJy0laUiq"
            },
            {
                session: "Course Outline",
                url: "https://drive.google.com/uc?export=download&id=1Met6fLCQvyyqx0CPqdXQuB_0mZyf6m2e"
            }
        ]
    }
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
