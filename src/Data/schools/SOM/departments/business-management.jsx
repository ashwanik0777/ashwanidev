import { Briefcase, Users, BookOpen, Award, Lightbulb, GraduationCap, TrendingUp, Building } from "lucide-react";

/**
 * SOM — Department of Business Management
 * School of Management
 */
export const departmentLayoutData = {
  schoolCode: "SOM",
  departmentId: "business-management",
  heroProps: {
    title: "Department of Business Management",
    highlight: "Business Management",
    subtitle:
      "Developing business leaders through innovative management education, blending theoretical knowledge with practical industry exposure at Gautam Buddha University.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Briefcase,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "MBA Programs",
        description:
          "Full-time MBA, Executive MBA, BBA+MBA Dual Degree, and MBA in Business Analytics & Data Science",
      },
      {
        icon: TrendingUp,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Finance & Analytics",
        description:
          "Financial management, capital markets, business analytics, and data-driven decision making",
      },
      {
        icon: Users,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "HRM & Marketing",
        description:
          "Human resource management, marketing strategy, consumer behaviour, and organizational development",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Dean, SOM",
    image: "https://faculty.gbu.ac.in/../uploads/photos/6605384ccc2da_induu (1).jpg",
    name: "Dr. Indu Uprety",
    designation: "Dean (I/C) & Associate Professor",
    messageParagraphs: [
      "Welcome to the School of Management (SOM) at Gautam Buddha University.",
      "Our school commenced its first batch of MBA in August 2008 with 120 students and has since grown with an integrated focus on exploring and creating new avenues for young aspirants through strategic collaborations with institutions and enterprises of national and international repute.",
      "GBUSM has state of the art classroom and computing facilities, supported by an extensive library of books, journals, films and databases, and a meditation centre. All academic programmes of GBU are fully residential. The serene and pollution-free campus, with extensive sports and co-curricular facilities, is well equipped to meet all the essential requirements of the residents.",
      "The curriculum of all its academic activities has international and cross cultural focus. The teaching pedagogy at SOM blends lectures, experience sharing, case-based learning, and analytical problem solving. We offer a wide range of programs including MBA, Dual Degree BBA+MBA, B.Com (Honours), M.Com, MBA (Executive), MBA (Business Analytics & Data Science), and Doctoral Programme.",
      "Our faculty members are accomplished scholars who bring a rich blend of academic expertise and industry experience. The Corporate Resource Center (CRC) ensures strong industry connections through summer internships, final placements, and pre-placement training.",
      "I invite you to explore our programs and become part of a vibrant community that values curiosity, integrity, and excellence in management education.",
    ],
    contact: {
      name: "Dr. Indu Uprety",
      designation: "Dean (I/C), School of Management",
      email: "indu.uprety@gbu.ac.in",
      phone: "0120-2346144",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2008, the Department of Business Management is the primary academic department under the School of Management at Gautam Buddha University.",
    stats: [
      { icon: Users, numberText: "500+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "17+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "12+", title: "Research Projects", subtitle: "Active" },
      { icon: Lightbulb, numberText: "50+", title: "Scholars", subtitle: "Ph.D." },
    ],
    highlights: [
      {
        title: "Multi-Disciplinary Management Education",
        description:
          "The department offers comprehensive programs across MBA, BBA+MBA (Dual Degree), B.Com (Hons), M.Com, MBA (Executive), MBA BADS, and Ph.D. The teaching pedagogy blends lectures, experience sharing, case-based learning, and analytical problem solving.",
        dotColor: "#f59e0b",
      },
      {
        title: "Industry Collaborations & Placements",
        description:
          "The Corporate Resource Center (CRC) ensures strong industry connections through summer internships from the 2nd semester, final placements, and pre-placement training. Recruiters include Adani, Coca Cola, Bank of Baroda, Axis Bank, S&P Global, BHEL, and Hero Motors.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research & Conferences",
        description:
          "Faculty and scholars are actively engaged in research across Finance, HRM, Marketing, Operations, Strategy, and Business Analytics. The school hosts ICSSR-sponsored programs, international conferences (ICBITSS, ICIRASMT), and FDP workshops.",
        dotColor: "#8b5cf6",
      },
    ],
    vision:
      "To be a nationally recognized management school producing industry-ready professionals endowed with character, creativity, competence, and commitment.",
    missionPoints: [
      "Develop business leaders with ethical values and global perspective",
      "Foster innovation and research-driven culture in management education",
      "Build strategic collaborations with institutions and enterprises of national and international repute",
      "Prepare confident, industry-ready managers through case-based learning and analytical problem solving",
      "Promote cross-cultural and international focus in all academic activities",
    ],
  },
  programsData: [
    {
      title: "MBA (Full-Time)",
      duration: "2 Years (4 Semesters)",
      intake: "120 Students",
      description:
        "Flagship MBA program with specializations in Finance, HRM, Marketing, Operations, Strategy, and Business Analytics. Includes summer internships from 2nd semester.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Finance", "HRM", "Marketing", "Operations",
        "Strategy", "Business Analytics", "Summer Internship", "Industry Projects",
      ],
      syllabus: [],
    },
    {
      title: "Dual Degree BBA+MBA (with exit option)",
      duration: "5 Years",
      intake: "60 Students",
      description:
        "Integrated dual degree program building strong foundations in business management. Students have the option to exit after BBA.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Business Fundamentals", "Finance", "Marketing", "HRM",
        "Operations", "Strategy", "Exit after BBA", "Industry Exposure",
      ],
      syllabus: [],
    },
    {
      title: "B.Com (Honours)",
      duration: "3 Years",
      intake: "60 Students",
      description:
        "Undergraduate commerce program with a strong base in accounting, taxation, financial management, and business economics.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-500 to-green-600",
      highlights: [
        "Accounting", "Taxation", "Financial Management", "Business Law",
        "Economics", "Corporate Governance", "Auditing", "Business Statistics",
      ],
      syllabus: [],
    },
    {
      title: "MBA (Business Analytics & Data Science)",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Analytics-focused MBA in association with IBM. Covers predictive analytics, data mining, AI/ML applications, and Python programming for business.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Predictive Analytics", "Data Mining", "AI/ML in Business", "Python",
        "Business Intelligence", "Big Data", "IBM Partnership", "Data Visualization",
      ],
      syllabus: [],
    },
    {
      title: "Ph.D. (Business Management)",
      duration: "3-5 Years",
      intake: "15 Students",
      description:
        "Doctoral research program across all functional areas of management including Finance, Marketing, HRM, Operations, and Strategy.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "Independent Research", "Finance Research", "Marketing Research", "HRM Research",
        "Operations Research", "Conference Publications", "UGC-NET/JRF", "Thesis Defense",
      ],
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our 17+ faculty members bring rich academic expertise and industry experience across Finance, HRM, Marketing, Operations, Strategy, and Analytics.",
    stats: [
      { numberText: "17+", subtitle: "Faculty Members" },
      { numberText: "6", subtitle: "Research Areas" },
      { numberText: "50+", subtitle: "Publications" },
    ],
  },
  researchStats: [
    { numberText: "50+", subtitle: "Publications" },
    { numberText: "12+", subtitle: "Funded Projects" },
    { numberText: "50+", subtitle: "Ph.D. Scholars" },
  ],
  topAchievers: [],
  achievements: [
    {
      title: "Ranked 5th in CSR-B School Survey 2024",
      year: "2024",
      description: "Ranked 5th among government B-schools in the CSR-B School Survey 2024.",
    },
    {
      title: "NAAC B+ Grade Accreditation",
      year: "2024",
      description: "Gautam Buddha University received NAAC B+ grade accreditation.",
    },
    {
      title: "ICSSR Sponsored AI Research Methodology Course",
      year: "2024",
      description: "10-day ICSSR-sponsored course on Integration of AI in Research for management scholars.",
    },
    {
      title: "International Conferences ICBITSS-2 & ICIRASMT",
      year: "2022",
      description: "Successfully hosted two international conferences on business innovation, technology, and social science.",
    },
  ],
};
