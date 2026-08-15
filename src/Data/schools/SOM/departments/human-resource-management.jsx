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
