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
        id: "ba-ma-history",
        title: "B.A. and M.A. (History)",
        level: "UG/PG",
        duration: "3-5 Years",
        intake: "40 Students",
        description: "Ancient, medieval, and modern Indian history, world civilizations, historiography, epigraphy, and archival studies.",
        image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-orange-700",
        highlights: [
            "Indian Historiography",
            "Epigraphy & Numismatics",
            "World Civilizations",
            "Archival Research"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV"
            }
        ]
    },
    {
        id: "ma-hindu-studies",
        title: "M.A. in Hindu Studies",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Systematic exploration of Vedic literature, Darshana systems, Upanishadic thought, Sanskrit source texts, and cultural traditions.",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
        gradient: "from-orange-500 to-yellow-600",
        highlights: [
            "Vedic & Upanishadic Texts",
            "Six Darshanas",
            "Sanskrit Hermeneutics",
            "Cultural Heritage"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV"
            },
            {
                session: "Detailed Syllabus",
                url: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV"
            }
        ]
    },
    {
        id: "ma-human-rights",
        title: "M.A. in Human Rights",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "International human rights jurisprudence, constitutional safeguards, refugee laws, humanitarian interventions, and civil liberties.",
        image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-slate-700",
        highlights: [
            "Human Rights Jurisprudence",
            "UN Human Rights System",
            "Refugee & Humanitarian Law",
            "Fieldwork Project"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=16JZ-lU2TrLhH9a77hDNjAKwIAs7kTCmV"
            }
        ]
    },
    {
        id: "mlibisc-library-science",
        title: "M.Lib.I.Sc. (Master of Library and Information Science)",
        level: "PG",
        duration: "1-2 Years",
        intake: "30 Students",
        description: "Digital library architectures, metadata standards, information retrieval systems, research metrics, and database indexing.",
        image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-600 to-teal-700",
        highlights: [
            "Digital Library Software",
            "Knowledge Organization (DDC/UDC)",
            "Information Retrieval",
            "Central Library Practicum"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1iWt9pq8CfeZ7n5qiN4UAUBgfSOgHUp3y",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1iWt9pq8CfeZ7n5qiN4UAUBgfSOgHUp3y"
            }
        ]
    }
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
