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
