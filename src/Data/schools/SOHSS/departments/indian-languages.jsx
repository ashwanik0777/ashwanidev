import { BookOpen, Users, Award, Lightbulb, GraduationCap, Languages, ScrollText, Feather } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "indian-languages",
  heroProps: {
    title: "Department of Indian Languages & Literature",
    highlight: "Indian Languages & Literature",
    subtitle:
      "Preserving and promoting India's rich literary heritage through the study of Hindi, Urdu, and Sanskrit languages, literature, translation, and folklore traditions.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: ScrollText,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Hindi Literature",
        description:
          "Classical and modern Hindi literature, literary criticism, and creative writing in Hindi",
      },
      {
        icon: Languages,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Sanskrit & Urdu Studies",
        description:
          "Ancient Sanskrit texts, Urdu poetry and prose, and comparative literary traditions",
      },
      {
        icon: Feather,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Translation & Folklore",
        description:
          "Translation studies across Indian languages, folklore research, and cultural documentation",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Indian Languages & Literature",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Diwakar Garwa",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Indian Languages & Literature at the School of Humanities & Social Sciences, Gautam Buddha University! Our department is dedicated to preserving, promoting, and advancing India's rich literary and linguistic heritage.",
      "We offer comprehensive programs in Hindi, Sanskrit, and Urdu that cover classical and modern literary traditions, language pedagogy, translation studies, and folklore research. Our curriculum blends traditional literary scholarship with contemporary approaches to language and cultural studies.",
      "Our faculty members are distinguished scholars with expertise in diverse areas of Indian languages and literature. They are committed to mentoring students, conducting impactful research, and contributing to the preservation of India's linguistic diversity.",
      "The department organizes regular literary events, kavi sammelans, seminars, and workshops that celebrate the richness of Indian literary traditions. We encourage students to engage with living literary cultures and develop their creative and scholarly potential.",
      "We invite you to join us in this meaningful journey of exploring India's linguistic and literary heritage while preparing for rewarding careers in education, media, publishing, translation, and cultural studies.",
    ],
    contact: {
      name: "Dr. Diwakar Garwa",
      designation: "Head of Department - Indian Languages & Literature",
      email: "diwakar.garwa@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Indian Languages & Literature is dedicated to the study, preservation, and promotion of India's diverse linguistic and literary traditions through rigorous academic programs and innovative research.",
    stats: [
      { icon: Users, numberText: "150+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "4+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "8+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "50+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "Rich Literary Heritage",
        description:
          "Our department covers the entire spectrum of Indian literary traditions from ancient Sanskrit texts to modern Hindi and Urdu literature. Students engage with diverse literary genres, movements, and critical perspectives across multiple languages.",
        dotColor: "#f97316",
      },
      {
        title: "Translation & Cultural Studies",
        description:
          "We emphasize translation studies as a bridge between India's diverse linguistic communities. Our programs prepare students for careers in literary translation, cultural documentation, and cross-cultural communication.",
        dotColor: "#10b981",
      },
      {
        title: "Folklore & Oral Traditions",
        description:
          "The department actively engages in the study and documentation of India's rich folklore traditions, oral narratives, and cultural practices. Students participate in fieldwork and ethnographic research to preserve endangered cultural heritage.",
        dotColor: "#a855f7",
      },
    ],
    vision:
      "To be a distinguished center for the study and promotion of Indian languages and literature, contributing to the preservation and advancement of India's rich linguistic and cultural heritage.",
    missionPoints: [
      "Provide quality education in Hindi, Sanskrit, and Urdu languages and literatures",
      "Promote research in Indian literary traditions, folklore, and cultural studies",
      "Foster translation studies and cross-linguistic understanding",
      "Preserve and document endangered linguistic and cultural heritage",
      "Develop language pedagogy and communication skills in Indian languages",
    ],
  },
  programsData: [
    {
      title: "B.A. (Hons.) Hindi",
      duration: "3 Years",
      intake: "60 Students",
      description:
        "A comprehensive undergraduate program covering classical and modern Hindi literature, literary criticism, creative writing, and Hindi language pedagogy.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Classical Hindi Literature",
        "Modern Hindi Fiction",
        "Hindi Poetry",
        "Literary Criticism",
        "Creative Writing",
        "Hindi Grammar",
        "Translation Studies",
        "Journalism in Hindi",
      ],
      syllabus: [],
    },
    {
      title: "M.A. Hindi",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "An advanced postgraduate program exploring Hindi literary theory, comparative literature, and specialized areas of Hindi studies with research orientation.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Hindi Literary Theory",
        "Comparative Literature",
        "Medieval Hindi Literature",
        "Modern Hindi Drama",
        "Research Methodology",
        "Folklore Studies",
        "Applied Hindi",
        "Dissertation",
      ],
      syllabus: [],
    },
    {
      title: "B.A. (Hons.) Sanskrit",
      duration: "3 Years",
      intake: "30 Students",
      description:
        "An undergraduate program covering classical Sanskrit texts, Vedic literature, Sanskrit grammar, and the rich philosophical and literary traditions of ancient India.",
      image:
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-emerald-600",
      highlights: [
        "Vedic Literature",
        "Sanskrit Grammar",
        "Classical Sanskrit Poetry",
        "Sanskrit Drama",
        "Indian Philosophy",
        "Manuscript Studies",
        "Epigraphy",
        "Translation",
      ],
      syllabus: [],
    },
    {
      title: "M.A. Urdu",
      duration: "2 Years",
      intake: "20 Students",
      description:
        "A postgraduate program exploring Urdu poetry, prose, literary criticism, and the rich cultural traditions of Urdu language and literature.",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Urdu Poetry (Ghazal, Nazm)",
        "Urdu Prose & Fiction",
        "Literary Criticism",
        "Urdu Journalism",
        "Translation Studies",
        "Cultural Studies",
        "Script & Calligraphy",
        "Dissertation",
      ],
      syllabus: [],
    },
    {
      title: "Ph.D. Hindi",
      duration: "3-5 Years",
      intake: "10 Students",
      description:
        "A doctoral program for advanced research in Hindi literature, linguistics, and related interdisciplinary areas under expert faculty supervision.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-500 to-red-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "National Seminars",
        "Interdisciplinary Studies",
        "Thesis Defense",
      ],
      syllabus: [],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Diwakar Garwa",
      position: "Assistant Professor",
      specialization: "Hindi Literature, Folklore Studies, Cultural Studies",
      email: "diwakar.garwa@gbu.ac.in",
      achievements: "Ph.D: Hindi",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-orange-500 to-orange-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Muhammad Asif",
      position: "Assistant Professor",
      specialization: "Urdu Literature, Urdu Poetry, Translation Studies",
      email: "muhammad.asif@gbu.ac.in",
      achievements: "Ph.D: Urdu",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Dr. Renu Yadav",
      position: "Assistant Professor",
      specialization: "Hindi Literature, Modern Hindi Fiction, Gender Studies",
      email: "renu.yadav@gbu.ac.in",
      achievements: "Ph.D: Hindi Literature",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Dr. Vibhavari",
      position: "Assistant Professor",
      specialization: "Sanskrit, Vedic Studies, Indian Philosophy",
      email: "vibhavari@gbu.ac.in",
      achievements: "Ph.D: Sanskrit",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-amber-500 to-amber-600",
    },
  ],
  facultyStats: {
    text: "Our department has 4+ dedicated faculty members specializing in Hindi, Urdu, Sanskrit languages and their literary traditions.",
    stats: [
      {
        icon: BookOpen,
        numberText: "50+",
        subtitle: "Publications",
        bg: "bg-orange-50",
        color: "text-orange-600",
      },
      {
        icon: Award,
        numberText: "8+",
        subtitle: "Awards",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "8+",
        subtitle: "Avg Experience",
        bg: "bg-purple-50",
        color: "text-purple-600",
      },
    ],
  },
  researchStats: [
    { numberText: "8+", subtitle: "Research Projects" },
    { numberText: "₹25L+", subtitle: "Research Funding" },
    { numberText: "50+", subtitle: "Publications" },
    { numberText: "12+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Ananya Singh",
      year: "M.A. Hindi 2024",
      achievement: "UGC NET Qualified, Published research in Hindi Sahitya Journal",
      image: "https://randomuser.me/api/portraits/women/28.jpg",
      skills: ["Hindi Literature", "Creative Writing", "Translation", "Research"],
    },
    {
      name: "Mohammad Faiz",
      year: "M.A. Urdu 2024",
      achievement: "Best Paper Award at National Urdu Seminar, Published 2 research papers",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      skills: ["Urdu Poetry", "Literary Criticism", "Translation", "Academic Writing"],
    },
    {
      name: "Kavita Devi",
      year: "B.A. (Hons.) Hindi 2024",
      achievement: "Gold Medalist, Selected for M.A. at JNU",
      image: "https://randomuser.me/api/portraits/women/42.jpg",
      skills: ["Hindi Fiction", "Creative Writing", "Journalism", "Public Speaking"],
    },
  ],
  achievements: [
    {
      title: "Literary Contributions",
      description: "Faculty and students regularly publish in prestigious Hindi and Urdu literary journals",
      icon: BookOpen,
      color: "text-orange-600",
    },
    {
      title: "Cultural Preservation",
      description: "Active folklore documentation and cultural heritage preservation projects",
      icon: ScrollText,
      color: "text-emerald-600",
    },
    {
      title: "Translation Excellence",
      description: "Notable contributions to literary translation across Indian languages",
      icon: Languages,
      color: "text-purple-600",
    },
    {
      title: "Academic Achievement",
      description: "Students consistently qualify UGC NET and secure academic positions",
      icon: GraduationCap,
      color: "text-amber-600",
    },
  ],
};
