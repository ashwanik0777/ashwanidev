import { BookOpen, Users, Award, Lightbulb, GraduationCap, PenTool, Globe, Languages } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "english",
  heroProps: {
    title: "Department of English & Modern European Languages",
    highlight: "English & Modern European Languages",
    subtitle:
      "Fostering excellence in literary studies, communicative English, and professional writing. Shaping critical thinkers and articulate communicators for a globalized world.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: BookOpen,
        bg: "bg-gradient-to-br from-rose-500 to-rose-600",
        subtitle: "Literary Criticism",
        description:
          "Postcolonial studies, comparative literature, and critical theory across literary traditions",
      },
      {
        icon: PenTool,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Creative & Professional Writing",
        description:
          "Creative writing workshops, professional communication, and technical writing skills",
      },
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Translation & Linguistics",
        description:
          "Translation studies, language pedagogy, and applied linguistics for cross-cultural communication",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, English & Modern European Languages",
    image: "https://faculty.gbu.ac.in/uploads/photos/66082c2240fe9_huidromsumitra.jpg",
    name: "Dr. Sumitra Huidrom",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of English & Modern European Languages at the School of Humanities & Social Sciences, Gautam Buddha University! Our department is committed to nurturing critical thinking, creative expression, and effective communication skills among our students.",
      "We offer a vibrant academic environment where students engage with diverse literary traditions spanning British, American, Indian, and postcolonial literatures. Our curriculum integrates classical and contemporary approaches to literary studies with modern perspectives on language, culture, and communication.",
      "Our faculty members are accomplished scholars and researchers who bring a wealth of expertise in areas such as literary criticism, creative writing, translation studies, comparative literature, and linguistics. They are dedicated to mentoring students and fostering a culture of intellectual inquiry.",
      "The department regularly organizes literary festivals, seminars, workshops, and guest lectures by eminent writers and scholars. We encourage students to participate in national and international conferences, publish their research, and develop their creative potential.",
      "We believe in holistic education that prepares our graduates for diverse career paths in academia, media, publishing, corporate communication, and the creative industries. Join us in this enriching journey of literary exploration and personal growth.",
    ],
    contact: {
      name: "Dr. Sumitra Huidrom",
      designation: "Head of Department - English & Modern European Languages",
      email: "sumitra.huidrom@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of English & Modern European Languages fosters excellence in literary studies, communicative English, and cross-cultural understanding through rigorous academic programs and innovative research.",
    stats: [
      { icon: Users, numberText: "200+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "7+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "10+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "80+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "Literary Excellence",
        description:
          "Our department offers comprehensive programs covering British, American, Indian, and world literatures. We emphasize literary criticism, postcolonial studies, and comparative literature to provide students with a deep understanding of diverse literary traditions.",
        dotColor: "#f43f5e",
      },
      {
        title: "Creative Writing & Translation",
        description:
          "We foster creative expression through dedicated workshops in fiction, poetry, and non-fiction writing. Our translation studies program bridges linguistic and cultural divides, preparing students for careers in publishing and cross-cultural communication.",
        dotColor: "#f59e0b",
      },
      {
        title: "Language Pedagogy & Communication",
        description:
          "Our programs integrate communicative English, professional writing, and language pedagogy. Students develop skills in corporate communication, academic writing, and teaching methodologies that are highly valued in today's professional landscape.",
        dotColor: "#6366f1",
      },
    ],
    vision:
      "To be a premier center for English literary studies, creative expression, and cross-cultural understanding, producing graduates who are articulate, critical, and culturally aware global citizens.",
    missionPoints: [
      "Provide quality education in English literature and language studies",
      "Foster critical thinking and creative expression among students",
      "Promote research in postcolonial studies, comparative literature, and linguistics",
      "Develop professional communication and writing skills",
      "Encourage cross-cultural understanding through translation and language pedagogy",
    ],
  },
  programsData: [
    {
        id: "ba-english",
        title: "B.A. (English)",
        level: "UG",
        duration: "3-4 Years",
        intake: "60 Students",
        description: "British, American, and Indian English literature, literary criticism, phonetics, creative writing, and communicative rhetoric.",
        image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-indigo-600",
        highlights: [
            "British & World Literature",
            "Literary Theory & Criticism",
            "Creative Writing",
            "Phonetics & Linguistics"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1VgI85NJK_f84r3brsKGcDxQfFEb-Z_0N/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1VgI85NJK_f84r3brsKGcDxQfFEb-Z_0N/preview"
            }
        ]
    },
    {
        id: "ma-english",
        title: "M.A. (English)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Postcolonial studies, gender and literature, European classical literature, semiotics, critical theory, and master dissertation.",
        image: "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-600 to-purple-700",
        highlights: [
            "Postcolonial Theories",
            "Critical & Cultural Theory",
            "Translation Studies",
            "Master Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/13WwZwiLfrMWj1D3G5cZClMT6mOVPlA2M/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/13WwZwiLfrMWj1D3G5cZClMT6mOVPlA2M/preview"
            }
        ]
    },
    {
        id: "ma-linguistics",
        title: "M.A. Linguistics",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Morphology, syntax, acoustic phonetics, sociolinguistics, computational language processing, and language acquisition.",
        image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-indigo-600",
        highlights: [
            "Syntactic Structures",
            "Phonology & Phonetics",
            "Sociolinguistics",
            "Language Documentation"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1I40DUkVAsrRdc7Uz07VdixrDnDUK4I6x/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1I40DUkVAsrRdc7Uz07VdixrDnDUK4I6x/preview"
            }
        ]
    },
    {
        id: "phd-english",
        title: "Ph.D. English",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "10 Students",
        description: "Doctoral research program promoting original scholarship in literary theory, comparative literature, and cultural studies.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-slate-700 to-slate-900",
        highlights: [
            "Doctoral Coursework",
            "Seminars & Peer Reviews",
            "Indexed Journal Publications",
            "Ph.D. Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1nEsrcvLTZNOjoiQBt96Es1v-bet2jSJH/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1nEsrcvLTZNOjoiQBt96Es1v-bet2jSJH/preview"
            }
        ]
    }
],
  facultyMembers: [
    {
      name: "Dr. Sumitra Huidrom",
      position: "Assistant Professor and HoD",
      specialization: "Postcolonial Literature, Gender Studies, Northeast Indian Literature",
      email: "sumitra.huidrom@gbu.ac.in",
      achievements: "Ph.D: English Literature",
      image: "https://faculty.gbu.ac.in/uploads/photos/66082c2240fe9_huidromsumitra.jpg",
      color: "from-rose-500 to-rose-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Bipasha Som Gune",
      position: "Assistant Professor",
      specialization: "British Literature, Cultural Studies, Film Studies",
      email: "bipasha.somgune@gbu.ac.in",
      achievements: "Ph.D: English",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Dr. Manjri Suman",
      position: "Assistant Professor",
      specialization: "Indian Writing in English, Women's Writing, Postcolonial Theory",
      email: "manjri.suman@gbu.ac.in",
      achievements: "Ph.D: English Literature",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Dr. Obaidul Ghaffar",
      position: "Assistant Professor",
      specialization: "Linguistics, Applied Linguistics, ELT",
      email: "obaidul.ghaffar@gbu.ac.in",
      achievements: "Ph.D: Linguistics",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-teal-500 to-teal-600",
    },
  ],
  facultyStats: {
    text: "Our department has 7+ dedicated faculty members specializing in diverse areas of English literature, linguistics, and language studies.",
    stats: [
      {
        icon: BookOpen,
        numberText: "80+",
        subtitle: "Publications",
        bg: "bg-rose-50",
        color: "text-rose-600",
      },
      {
        icon: Award,
        numberText: "10+",
        subtitle: "Awards",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-indigo-50",
        color: "text-indigo-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-teal-50",
        color: "text-teal-600",
      },
    ],
  },
  researchStats: [
    { numberText: "10+", subtitle: "Research Projects" },
    { numberText: "₹50L+", subtitle: "Research Funding" },
    { numberText: "80+", subtitle: "Publications" },
    { numberText: "15+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Priya Sharma",
      year: "M.A. English 2024",
      achievement: "UGC NET Qualified, Published in International Journal of Literary Studies",
      image: "https://randomuser.me/api/portraits/women/33.jpg",
      skills: ["Literary Criticism", "Creative Writing", "Research", "Translation"],
    },
    {
      name: "Arjun Verma",
      year: "B.A. (Hons.) English 2024",
      achievement: "Best Paper Award at National Literature Conference",
      image: "https://randomuser.me/api/portraits/men/34.jpg",
      skills: ["Postcolonial Studies", "Academic Writing", "Public Speaking", "Editing"],
    },
    {
      name: "Meera Iyer",
      year: "Ph.D. English 2024",
      achievement: "Published 4 research papers, International Conference Presenter",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      skills: ["Comparative Literature", "Gender Studies", "Translation Studies", "Pedagogy"],
    },
  ],
  achievements: [
    {
      title: "Literary Excellence",
      description: "Students consistently qualify UGC NET and secure positions in academia",
      icon: Award,
      color: "text-rose-600",
    },
    {
      title: "Research Output",
      description: "80+ publications in reputed national and international journals",
      icon: BookOpen,
      color: "text-amber-600",
    },
    {
      title: "Creative Pursuits",
      description: "Annual literary festival and creative writing workshops attract national participation",
      icon: PenTool,
      color: "text-indigo-600",
    },
    {
      title: "Global Exposure",
      description: "Faculty and students regularly present at international conferences",
      icon: Globe,
      color: "text-teal-600",
    },
  ],
};
