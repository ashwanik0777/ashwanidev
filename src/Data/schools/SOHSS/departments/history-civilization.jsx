import { BookOpen, Users, Award, Lightbulb, GraduationCap, Landmark, Map, Scroll, Castle } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "history-civilization",
  heroProps: {
    title: "Department of History & Civilization",
    highlight: "History & Civilization",
    subtitle:
      "Exploring the vast tapestry of human civilization through rigorous historical inquiry. Understanding the past to shape a better future through critical analysis of cultures, societies, and events.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1461360228754-6e81c478b882?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Landmark,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Ancient & Medieval History",
        description:
          "Ancient Indian civilizations, medieval kingdoms, cultural traditions, and socio-political transformations",
      },
      {
        icon: Map,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Modern & World History",
        description:
          "Colonial and post-colonial India, modern world history, nationalism, and global political movements",
      },
      {
        icon: Castle,
        bg: "bg-gradient-to-br from-rose-500 to-rose-600",
        subtitle: "Culture, Heritage & Archaeology",
        description:
          "Cultural heritage studies, archaeological methods, museum studies, and heritage conservation",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, History & Civilization",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Rakesh Kumar Srivastava",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of History & Civilization at the School of Humanities & Social Sciences, Gautam Buddha University! Established in 2019, our department is a young and dynamic center dedicated to the study of human civilizations, historical processes, and cultural heritage.",
      "Our department offers comprehensive programs that cover the entire spectrum of historical inquiry — from ancient Indian civilizations and medieval kingdoms to modern nation-states and contemporary global history. We emphasize critical thinking, archival research, and interdisciplinary approaches to understanding the past.",
      "Our faculty members are dedicated scholars with expertise in diverse areas of Indian and world history, archaeology, and cultural studies. They are committed to mentoring students, conducting original research, and contributing to historical scholarship.",
      "We organize regular seminars, historical walks, heritage visits, and guest lectures by eminent historians. Students are encouraged to engage with primary sources, visit archaeological sites, and develop their research skills through hands-on projects.",
      "We invite you to join us in this intellectually stimulating journey of exploring the rich heritage of human civilization and developing the critical perspectives needed to understand our complex world.",
    ],
    contact: {
      name: "Dr. Rakesh Kumar Srivastava",
      designation: "Head of Department - History & Civilization",
      email: "rakeshk.srivastava@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2019, the Department of History & Civilization is dedicated to the study of human civilizations, cultural heritage, and historical processes through rigorous academic programs and interdisciplinary research.",
    stats: [
      { icon: Users, numberText: "100+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "4+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "25+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "Comprehensive Historical Studies",
        description:
          "Our programs cover ancient, medieval, and modern Indian history alongside world history, providing students with a comprehensive understanding of historical processes, civilizational developments, and socio-political transformations across time and space.",
        dotColor: "#f59e0b",
      },
      {
        title: "Heritage & Archaeological Studies",
        description:
          "We emphasize the study of cultural heritage, archaeological methods, and heritage conservation. Students engage with material culture through field visits to archaeological sites, museums, and heritage monuments in the NCR region and beyond.",
        dotColor: "#14b8a6",
      },
      {
        title: "Interdisciplinary Approach",
        description:
          "The department promotes interdisciplinary engagement with fields such as archaeology, cultural studies, art history, and political science. This broad approach enriches historical understanding and prepares students for diverse career paths.",
        dotColor: "#f43f5e",
      },
    ],
    vision:
      "To be a distinguished center for historical studies and cultural heritage research, fostering critical understanding of human civilizations and contributing to the preservation and promotion of cultural heritage.",
    missionPoints: [
      "Provide quality education in Indian and world history",
      "Promote research in ancient, medieval, and modern history",
      "Foster appreciation for cultural heritage and archaeological studies",
      "Develop critical thinking and analytical skills through historical inquiry",
      "Encourage interdisciplinary approaches to understanding civilizations",
    ],
  },
  programsData: [
    {
      title: "B.A. (Hons.) History",
      duration: "3 Years",
      intake: "60 Students",
      description:
        "A comprehensive undergraduate program covering ancient, medieval, and modern Indian history alongside world history, with emphasis on critical analysis, source evaluation, and historical methodology.",
      image:
        "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Ancient India",
        "Medieval India",
        "Modern India",
        "World History",
        "Indian Art & Architecture",
        "Historical Methods",
        "Archaeology Basics",
        "Heritage Studies",
      ],
    },
    {
      title: "M.A. History",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "An advanced postgraduate program exploring specialized areas of Indian and world history with emphasis on historiography, research methodology, and archival studies.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Historiography",
        "Archival Studies",
        "Cultural History",
        "Economic History",
        "Political History",
        "Research Methodology",
        "Museum Studies",
        "Dissertation",
      ],
    },
    {
      title: "Ph.D. History",
      duration: "3-5 Years",
      intake: "6 Students",
      description:
        "A doctoral program for advanced research in Indian and world history, archaeology, and cultural studies under expert faculty supervision.",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
      gradient: "from-rose-500 to-rose-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "Archival Research",
        "Field Studies",
        "Thesis Defense",
      ],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Rakesh Kumar Srivastava",
      position: "Assistant Professor and HoD",
      specialization: "Modern Indian History, Nationalism, Social Movements",
      email: "rakeshk.srivastava@gbu.ac.in",
      achievements: "Ph.D: History",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-amber-500 to-amber-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Ritika Joshi",
      position: "Assistant Professor",
      specialization: "Ancient Indian History, Archaeology, Art & Architecture",
      email: "ritika.joshi@gbu.ac.in",
      achievements: "Ph.D: Ancient History",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-teal-500 to-teal-600",
    },
  ],
  facultyStats: {
    text: "Our department has 3+ dedicated faculty members specializing in diverse areas of Indian and world history, archaeology, and cultural heritage.",
    stats: [
      {
        icon: BookOpen,
        numberText: "25+",
        subtitle: "Publications",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
      {
        icon: Award,
        numberText: "4+",
        subtitle: "Awards",
        bg: "bg-teal-50",
        color: "text-teal-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-rose-50",
        color: "text-rose-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "8+",
        subtitle: "Avg Experience",
        bg: "bg-indigo-50",
        color: "text-indigo-600",
      },
    ],
  },
  researchStats: [
    { numberText: "4+", subtitle: "Research Projects" },
    { numberText: "₹10L+", subtitle: "Research Funding" },
    { numberText: "25+", subtitle: "Publications" },
    { numberText: "8+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Prachi Gupta",
      year: "M.A. History 2024",
      achievement: "UGC NET Qualified, Selected for Ph.D. at JNU",
      image: "https://randomuser.me/api/portraits/women/31.jpg",
      skills: ["Modern History", "Archival Research", "Academic Writing", "Source Analysis"],
    },
    {
      name: "Deepak Verma",
      year: "B.A. (Hons.) History 2024",
      achievement: "Gold Medalist, Selected for UPSC Civil Services Preparation",
      image: "https://randomuser.me/api/portraits/men/41.jpg",
      skills: ["Indian History", "World History", "Critical Analysis", "Essay Writing"],
    },
    {
      name: "Shruti Yadav",
      year: "M.A. History 2024",
      achievement: "Best Paper Award at National History Congress, Published in ICHR Journal",
      image: "https://randomuser.me/api/portraits/women/46.jpg",
      skills: ["Cultural History", "Heritage Studies", "Research Methodology", "Historiography"],
    },
  ],
  achievements: [
    {
      title: "Academic Excellence",
      description: "Students regularly qualify UGC NET and secure admissions at top universities",
      icon: GraduationCap,
      color: "text-amber-600",
    },
    {
      title: "Heritage Research",
      description: "Active research on cultural heritage, archaeology, and historical sites in the NCR region",
      icon: Landmark,
      color: "text-teal-600",
    },
    {
      title: "Publication Record",
      description: "25+ research publications in reputed history journals since establishment in 2019",
      icon: BookOpen,
      color: "text-rose-600",
    },
    {
      title: "UPSC Success",
      description: "Multiple students selected for UPSC and state civil services examinations",
      icon: Award,
      color: "text-indigo-600",
    },
  ],
};
