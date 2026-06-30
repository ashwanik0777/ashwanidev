import { Library, BookOpen, Database, Users, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "library-information-science",
  heroProps: {
    title: "Department of Library & Information Science",
    highlight: "Library & Information Science",
    subtitle:
      "Organizing Knowledge, Empowering Minds — Excellence in library management, digital archiving, information technology, and cataloging.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Library,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Library Management",
        description: "Administration of modern physical and digital libraries",
      },
      {
        icon: Database,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Digital Archiving",
        description: "Information organization, metadata creation, and database management",
      },
      {
        icon: BookOpen,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Information Science",
        description: "Information dissemination, user studies, and reference services",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Coordinator, Library & Information Science",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Vinod Kumar Shanwal",
    designation: "Coordinator",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Library & Information Science at the School of Humanities & Social Sciences, Gautam Buddha University. Established to cater to the growing demand for information professionals, our department is dedicated to training skilled librarians and information managers.",
      "We offer Bachelor of Library and Information Science (B.Lib.I.Sc.), Master of Library and Information Science (M.Lib.I.Sc.), and Ph.D. programs. The curriculum is designed in line with modern practices, focusing on digital libraries, information retrieval, indexing, cataloging, and database management.",
      "Our students gain hands-on experience through internships and practical sessions in GBU's central library (Bodhisattva Dr. Bhim Rao Ambedkar Pustakalaya), which houses over 60,000 books and extensive digital resources.",
      "We invite you to explore our programs and build a successful career in the rapidly evolving domain of library and information science.",
    ],
    contact: {
      name: "Dr. Vinod Kumar Shanwal",
      designation: "Coordinator - Library & Information Science",
      email: "lis@gbu.ac.in",
      phone: "0120-234-4223",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Library & Information Science prepares information professionals with expertise in both traditional library systems and advanced digital archiving solutions.",
    stats: [
      { icon: Users, numberText: "40+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "2+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "2+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "10+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Hands-on Library Training",
        description:
          "Mandatory internships and practical sessions at GBU's central library, one of the region's largest academic libraries.",
        dotColor: "#14b8a6",
      },
      {
        title: "Modern Curriculum",
        description:
          "Courses cover digital library design, institutional repositories, search engine optimization, and metadata schemas.",
        dotColor: "#3b82f6",
      },
      {
        title: "Information Technology Integration",
        description:
          "Strong emphasis on library automation software like Koha, DSpace, and various database management tools.",
        dotColor: "#6366f1",
      },
    ],
    vision:
      "To be a center of excellence in library and information science education that produces competent, ethical, and technologically proficient information professionals.",
    missionPoints: [
      "Provide quality education in library administration and information systems",
      "Train students in cataloging, classification, and metadata creation",
      "Develop proficiency in library automation and digital archiving software",
      "Conduct research on modern trends in library and information science",
      "Promote lifelong learning, information literacy, and ethical access to knowledge",
    ],
  },
  programsData: [
    {
      title: "B.Lib.I.Sc. (Bachelor of Library and Information Science)",
      duration: "1 Year",
      intake: "30 Students",
      description:
        "Undergraduate professional program introducing students to library administration, cataloging, classification, and basic information technology applications.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Library & Society",
        "Library Classification (Theory & Practice)",
        "Library Cataloging (Theory & Practice)",
        "Information Sources & Services",
        "Library Management",
        "ICT in Libraries",
        "Internship Program",
      ],
    },
    {
      title: "M.Lib.I.Sc. (Master of Library and Information Science)",
      duration: "1 Year",
      intake: "25 Students",
      description:
        "Postgraduate professional program focusing on digital library development, information systems management, indexing, and research methodology.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Information Retrieval Systems",
        "Digital Library & E-Resource Management",
        "Research Methods",
        "Information Technology Application",
        "Indexing Systems",
        "Academic Library System",
        "Professional Dissertation",
        "Field Visit & Report",
      ],
    },
    {
      title: "Ph.D. Library & Information Science",
      duration: "3-5 Years",
      intake: "4 Students",
      description:
        "Doctoral research program in digital preservation, user studies, bibliometrics, information behavior, and open-access initiatives.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "Advanced Research Methods",
        "Literature Review & Seminar",
        "Thesis Development",
        "Bibliometric Analysis",
        "Information Science Theory",
        "Scholarly Communication",
        "Journal Publications",
      ],
    },
  ],
  facultyStats: {
    text: "Our department has dedicated faculty members with expertise in information retrieval, library automation, and digital archiving.",
    stats: [
      { icon: BookOpen, numberText: "10+", subtitle: "Research Papers", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: Award, numberText: "2+", subtitle: "Projects", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-amber-50", color: "text-amber-600" },
    ],
  },
  researchStats: [
    { numberText: "2+", subtitle: "Research Projects" },
    { numberText: "₹5L+", subtitle: "Research Funding" },
    { numberText: "10+", subtitle: "Publications" },
    { numberText: "5+", subtitle: "Collaborating Libraries" },
  ],
  topAchievers: [
    {
      name: "Amit Sharma",
      year: "M.Lib.I.Sc 2024",
      achievement: "Appointed as Assistant Librarian at a national institute, managing digital archives",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      skills: ["Digital Archiving", "Koha", "Metadata", "Cataloging"],
    },
    {
      name: "Priya Patel",
      year: "B.Lib.I.Sc 2023",
      achievement: "Qualified UGC NET in Library and Information Science",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      skills: ["Information Retrieval", "Cataloging", "Reference Services"],
    },
  ],
  achievements: [
    {
      title: "Central Library Integration",
      year: "2024",
      description: "Successfully established direct practical training cycles for all LIS students in the Bodhisattva central library",
    },
    {
      title: "National Seminar on Digital Libraries",
      year: "2024",
      description: "Hosted a successful national seminar on future developments in open-source library automation and Koha deployment",
    },
    {
      title: "100% Internship Placement",
      year: "2023",
      description: "Achieved 100% placement of students in internship programs across reputed institutions in Delhi NCR",
    },
  ],
};
