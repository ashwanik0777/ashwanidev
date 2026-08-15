import { BookOpen, Users, Award, Lightbulb, GraduationCap, Tv, Radio, Camera, Megaphone } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "mass-communication",
  heroProps: {
    title: "Department of Mass Communication & Media Studies",
    highlight: "Mass Communication & Media Studies",
    subtitle:
      "Shaping the future of journalism, digital media, and strategic communication. Preparing media professionals who are ethical, innovative, and globally aware.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1504711434969-e33886168d6c?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Tv,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Journalism & Reporting",
        description:
          "Print, broadcast, and digital journalism with emphasis on investigative reporting and media ethics",
      },
      {
        icon: Camera,
        bg: "bg-gradient-to-br from-violet-500 to-violet-600",
        subtitle: "Digital Media & Production",
        description:
          "Video production, social media management, content creation, and multimedia storytelling",
      },
      {
        icon: Megaphone,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        subtitle: "Advertising & Public Relations",
        description:
          "Strategic communication, brand management, advertising campaigns, and corporate communication",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Mass Communication & Media Studies",
    image: "https://faculty.gbu.ac.in/uploads/photos/65fe7d554e4af_bandana.jpg",
    name: "Prof. Bandana Pandey",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Mass Communication & Media Studies at the School of Humanities & Social Sciences, Gautam Buddha University! In today's rapidly evolving media landscape, our department is committed to preparing students who are not just skilled communicators but also ethical and responsible media professionals.",
      "Our programs are designed to provide a strong theoretical foundation coupled with extensive practical training in journalism, digital media, advertising, public relations, and linguistics. We have well-equipped media labs, recording studios, and editing suites that provide students with hands-on experience in media production.",
      "Our faculty members bring a wealth of academic expertise and industry experience. They are actively engaged in research on media ethics, digital communication, political communication, and the evolving media ecosystem in India and globally.",
      "We regularly organize media workshops, film screenings, guest lectures by eminent journalists and media professionals, and industrial visits to leading media houses. Our students have interned with and been placed at reputed media organizations across the country.",
      "Join us in this exciting journey of exploring the power of media and communication in shaping public discourse and building a more informed society.",
    ],
    contact: {
      name: "Prof. Bandana Pandey",
      designation: "Head of Department - Mass Communication & Media Studies",
      email: "bandana.pandey@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Mass Communication & Media Studies offers cutting-edge programs in journalism, digital media, advertising, public relations, and linguistics, preparing students for dynamic careers in the media industry.",
    stats: [
      { icon: Users, numberText: "120+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "5+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "40+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "Comprehensive Media Training",
        description:
          "Our programs cover the entire spectrum of media and communication, from traditional print and broadcast journalism to digital media, social media management, and multimedia content creation. Students gain hands-on experience with professional media equipment and software.",
        dotColor: "#3b82f6",
      },
      {
        title: "Industry-Ready Curriculum",
        description:
          "Our curriculum is designed in consultation with media industry professionals to ensure relevance and employability. Students complete internships at leading media houses, advertising agencies, and PR firms as an integral part of their training.",
        dotColor: "#8b5cf6",
      },
      {
        title: "Ethics & Responsibility",
        description:
          "We place strong emphasis on media ethics, responsible journalism, and the role of media in democratic society. Our graduates are trained to be not just skilled communicators but also ethical and socially conscious media professionals.",
        dotColor: "#06b6d4",
      },
    ],
    vision:
      "To be a leading center for media education and research, producing ethical, innovative, and globally competitive media professionals who contribute to informed and democratic public discourse.",
    missionPoints: [
      "Provide quality education in journalism, mass communication, and media studies",
      "Foster ethical and responsible media practice among students",
      "Promote research in digital media, communication studies, and linguistics",
      "Build strong industry partnerships for practical training and placements",
      "Encourage innovative storytelling and multimedia content creation",
    ],
  },
  programsData: [
    {
        id: "ba-hons-jmc",
        title: "B.A. (Hons.) in Journalism & Mass Communication",
        level: "UG",
        duration: "3-4 Years",
        intake: "60 Students",
        description: "Hands-on training in print journalism, TV news broadcasting, digital content production, media ethics, and photography.",
        image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80",
        gradient: "from-red-500 to-pink-600",
        highlights: [
            "Broadcast News Studio",
            "Digital Media Production",
            "Photojournalism",
            "Audio-Video Editing"
        ],
        syllabusUrl: "/schools/sohss/BAJMC_NEP.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/sohss/BAJMC_NEP.pdf"
            },
            {
                session: "Course Structure NEP",
                url: "/schools/sohss/BAJMC_NEP.pdf"
            }
        ]
    },
    {
        id: "ma-mass-communication",
        title: "M.A. (Mass Communication)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Advanced media research, advertising, public relations, cinema studies, corporate communications, and documentary production.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
        gradient: "from-pink-600 to-rose-700",
        highlights: [
            "Media Research Methods",
            "PR & Corporate Communications",
            "Documentary Film Making",
            "Media Management"
        ],
        syllabusUrl: "/schools/sohss/MMC.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/sohss/MMC.pdf"
            }
        ]
    },
    {
        id: "ma-journalism-mass-comm",
        title: "MA in Journalism & Mass Communication",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Professional training in investigative journalism, data journalism, newsroom management, and multi-platform publishing.",
        image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-rose-600 to-red-700",
        highlights: [
            "Investigative Reporting",
            "Data Journalism",
            "Broadcast Production",
            "Newsroom Leadership"
        ],
        syllabusUrl: "/schools/sohss/MJMC-CStr.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/sohss/MJMC-CStr.pdf"
            }
        ]
    }
],
  facultyMembers: [
    {
      name: "Prof. Bandana Pandey",
      position: "Professor and HoD",
      specialization: "Mass Communication, Media Studies, Development Communication",
      email: "bandana.pandey@gbu.ac.in",
      achievements: "Ph.D: Mass Communication",
      image: "https://faculty.gbu.ac.in/uploads/photos/65fe7d554e4af_bandana.jpg",
      color: "from-blue-500 to-blue-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Vineet Kumar",
      position: "Assistant Professor",
      specialization: "Digital Media, Journalism, Political Communication",
      email: "vineet.kumar@gbu.ac.in",
      achievements: "Ph.D: Journalism",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-violet-500 to-violet-600",
    },
  ],
  facultyStats: {
    text: "Our department has 3+ experienced faculty members combining academic expertise with media industry experience.",
    stats: [
      {
        icon: BookOpen,
        numberText: "40+",
        subtitle: "Publications",
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        icon: Award,
        numberText: "5+",
        subtitle: "Awards",
        bg: "bg-violet-50",
        color: "text-violet-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-cyan-50",
        color: "text-cyan-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "12+",
        subtitle: "Avg Experience",
        bg: "bg-indigo-50",
        color: "text-indigo-600",
      },
    ],
  },
  researchStats: [
    { numberText: "5+", subtitle: "Research Projects" },
    { numberText: "₹15L+", subtitle: "Research Funding" },
    { numberText: "40+", subtitle: "Publications" },
    { numberText: "10+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Sakshi Gupta",
      year: "M.A. Mass Communication 2024",
      achievement: "Placed at NDTV, Best Media Project Award",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      skills: ["Broadcast Journalism", "Digital Media", "Video Editing", "Reporting"],
    },
    {
      name: "Rahul Tiwari",
      year: "B.A. (Hons.) JMC 2024",
      achievement: "National Press Award for Student Journalism",
      image: "https://randomuser.me/api/portraits/men/25.jpg",
      skills: ["Print Journalism", "Photography", "Content Writing", "Social Media"],
    },
    {
      name: "Neha Patel",
      year: "M.A. Journalism 2024",
      achievement: "Interned at Times of India, Published investigative feature",
      image: "https://randomuser.me/api/portraits/women/48.jpg",
      skills: ["Investigative Reporting", "Data Journalism", "Media Ethics", "Writing"],
    },
  ],
  achievements: [
    {
      title: "Media Placements",
      description: "Students placed at leading media houses including NDTV, Times, and Aaj Tak",
      icon: Tv,
      color: "text-blue-600",
    },
    {
      title: "Research Publications",
      description: "40+ research papers in national and international communication journals",
      icon: BookOpen,
      color: "text-violet-600",
    },
    {
      title: "Industry Workshops",
      description: "Regular workshops and masterclasses by eminent journalists and media professionals",
      icon: Radio,
      color: "text-cyan-600",
    },
    {
      title: "Student Productions",
      description: "Award-winning student documentaries and media productions at national level",
      icon: Camera,
      color: "text-indigo-600",
    },
  ],
};
