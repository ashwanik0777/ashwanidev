import {
  Code,
  Cpu,
  Database,
  Users,
  BookOpen,
  Award,
  Lightbulb,
  GraduationCap,
  Server,
  Smartphone,
  Shield,
  Brain,
  Cloud,
} from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOICT",
  departmentId: "it",
  heroProps: {
    title: "Department of Information Technology",
    highlight: "Information Technology",
    subtitle:
      "Empowering the digital era through cutting-edge education and research in Information Technology.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Server,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        title: "System Administration",
        description: "Server management and network infrastructure",
      },
      {
        icon: Smartphone,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        title: "Mobile Development",
        description: "iOS and Android application development",
      },
      {
        icon: Shield,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        title: "Cybersecurity",
        description: "Information security and risk management",
      }
      ],
  },
  hodProps: {
    title: "From the Desk of HOD, IT",
    image: "https://www.gbu.ac.in/USICT/media/img/Neeta.jpg",
    name: "Dr. Neeta Singh",
    designation: "Head of Department",
    messageParagraphs: [
      "Greeting from the Department of Information Technology!!",
      "Information technology, one of the fastest-growing technologies, has become a strategic function in every organization and lands its foot in every walk of our life. At the undergraduate level, we offer a four-year B. Tech. IT Programme and BCA. At the postgraduate level, we offer two areas of specialization for a two-year M.C.A: (i) Data Science and (ii) Artificial Intelligence. From the academic session 2022-23, the department is starting M.Tech. IT and M.Tech. Information and Cyberwarfare at the postgraduate level. We also offer Ph.D. programs in both full-time and working professional modes in all areas where our faculty members are currently conducting research.",
      "The department has well-qualified professional faculty members along with the non-teaching staff. Faculty members are not only contributing toward the holistic development of students but also work as resource persons at the national and international levels. The department has had an approved SWAYAM Local Chapter since 2020.",
      "We also encourage students to organize events, participate in various technical and co-curricular events organized by other colleges, and get involved in activities of social relevance. Furthermore, to promote co-curricular activities among students and faculty, the department has organized various events, competitions, and courses sponsored by NITTTR, DRDO, CSIR, etc. Most of our alumni find employment in companies of high repute in India and abroad."
      ],
    contact: {
      name: "Dr. Neeta Singh",
      designation: "Head of Department - IT",
      email: "neeta@gbu.ac.in",
      phone: "0120-2346080 (Ext.6080)",
    },
  },
  aboutProps: {
    heading: "Department Statistics",
    subheading: "Leading the way in IT education",
    stats: [
      { icon: Users, label: "Students", value: "700+", color: "bg-emerald-500" },
      { icon: BookOpen, label: "Faculty", value: "40+", color: "bg-teal-500" },
      { icon: Award, label: "Research Projects", value: "100+", color: "bg-cyan-500" },
      { icon: Lightbulb, label: "Patents Filed", value: "20+", color: "bg-blue-500" }
      ],
    highlights: [
      {
        title: "Excellence in IT Education",
        description:
          "Our B.Tech and M.Tech programs blend theory with practical skills to produce industry-ready graduates.",
        dotColor: "#10b981",
      },
      {
        title: "Industry-Oriented Research",
        description:
          "Active research in data analytics, cloud computing, cybersecurity, and mobile technologies.",
        dotColor: "#14b8a6",
      },
      {
        title: "Strong Industry Ties",
        description:
          "Partnerships with leading tech companies for internships, live projects, and placements.",
        dotColor: "#06b6d4",
      }
      ],
    vision:
      "To be a leading department in Information Technology education and research recognized globally.",
    missionPoints: [
      "Provide top-notch education in IT and allied areas.",
      "Promote research and innovation to solve real-world problems.",
      "Foster collaborations with industry and academia.",
      "Develop ethical IT professionals for societal development."
      ],
  },
  programsData: [
    {
        id: "bca",
        title: "Bachelor in Computer Applications (BCA)",
        level: "UG",
        duration: "3 Years",
        intake: "60 Students",
        description: "Foundational software application development, programming paradigms, web technologies, and database design.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-500 to-blue-600",
        highlights: [
            "Application Development",
            "Database Management",
            "Object-Oriented Programming",
            "Web Technologies"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1Ur4ncmac5q7M6ERxxhgUV8PTYckt9SF5",
        syllabus: [
            {
                session: "2026-29",
                url: "https://drive.google.com/uc?export=download&id=1Ur4ncmac5q7M6ERxxhgUV8PTYckt9SF5"
            },
            {
                session: "2025-28",
                url: "https://drive.google.com/uc?export=download&id=1PyjL213j0X8_uot3RVr5pk3IQImF4Isb"
            },
            {
                session: "2024-25",
                url: "/schools/it/BCA_2024-25 Session.pdf"
            },
            {
                session: "2021-24",
                url: "/schools/it/2021_24_BCA 2021-24.pdf"
            }
        ]
    },
    {
        id: "btech-it",
        title: "B.Tech Information Technology",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Core IT engineering covering computer networks, cloud infrastructure, full-stack systems, and cybersecurity.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-blue-600",
        highlights: [
            "Cloud Architecture",
            "Network Engineering",
            "Enterprise Systems",
            "Information Security"
        ],
        syllabusUrl: "/schools/it/2026_2030_B.Tech. IT .docx.pdf",
        syllabus: [
            {
                session: "2026-30",
                url: "/schools/it/2026_2030_B.Tech. IT .docx.pdf"
            },
            {
                session: "2025-29",
                url: "https://drive.google.com/uc?export=download&id=1RpWCxLdDaua2yh6G8i6wtQoGXqvOxtZ_"
            },
            {
                session: "2023-27",
                url: "/schools/it/B.Tech. IT 2023-27.pdf"
            },
            {
                session: "2021-25",
                url: "/schools/it/2021_25_B.TECH. IT 2021-25.pdf"
            }
        ]
    },
    {
        id: "btech-it-aiml",
        title: "B.Tech IT (AI & Machine Learning)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Specialized undergraduate program focusing on machine learning pipelines, neural architectures, and intelligent systems.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-purple-600",
        highlights: [
            "Machine Learning Models",
            "Deep Neural Networks",
            "Natural Language Processing",
            "Autonomous Systems"
        ],
        syllabusUrl: "/schools/it/2026_2030_B.Tech. IT .docx.pdf",
        syllabus: [
            {
                session: "Current Scheme",
                url: "/schools/it/2026_2030_B.Tech. IT .docx.pdf"
            }
        ]
    },
    {
        id: "btech-it-dsml",
        title: "B.Tech IT (Data Science & ML)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Big data storage frameworks, distributed compute engines, statistical learning, and predictive business analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-500 to-indigo-600",
        highlights: [
            "Big Data Analytics",
            "Distributed Computing",
            "Predictive Analytics",
            "Data Mining & Visualization"
        ],
        syllabusUrl: "/schools/it/2026_2030_B.Tech. IT .docx.pdf",
        syllabus: [
            {
                session: "Current Scheme",
                url: "/schools/it/2026_2030_B.Tech. IT .docx.pdf"
            }
        ]
    },
    {
        id: "mtech-it-dsml",
        title: "M.Tech IT (Data Science & ML)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced postgraduate program in enterprise AI infrastructure, big data engineering, and dissertation research.",
        image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-600 to-indigo-700",
        highlights: [
            "Enterprise ML Pipelines",
            "Advanced Data Engineering",
            "High-Performance Computing",
            "Master Thesis"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1ZuJqmGp77-dg2ZcSf4B7gv2KeAqucsgz",
        syllabus: [
            {
                session: "Master Scheme",
                url: "https://drive.google.com/uc?export=download&id=1ZuJqmGp77-dg2ZcSf4B7gv2KeAqucsgz"
            }
        ]
    },
    {
        id: "mtech-it-se",
        title: "M.Tech Software Engineering",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced study of software architecture, requirement engineering, quality metrics, agile workflows, and research dissertation.",
        image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-500 to-teal-700",
        highlights: [
            "Software Architecture",
            "Agile & DevOps Workflows",
            "Quality Assurance & Testing",
            "Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1ZuJqmGp77-dg2ZcSf4B7gv2KeAqucsgz",
        syllabus: [
            {
                session: "Master Scheme",
                url: "https://drive.google.com/uc?export=download&id=1ZuJqmGp77-dg2ZcSf4B7gv2KeAqucsgz"
            }
        ]
    },
    {
        id: "mca-ds",
        title: "MCA (Specialization: Data Science)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Professional master's specialization focused on data pipelines, business analytics, predictive modeling, and database technologies.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-500 to-indigo-600",
        highlights: [
            "Data Mining & Analytics",
            "Statistical Modeling",
            "Database Platforms",
            "Industry Project"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1_1_GjRPQaVh71lBkF-X1N_fCnOWJ5O2V",
        syllabus: [
            {
                session: "2026-28",
                url: "https://drive.google.com/uc?export=download&id=1_1_GjRPQaVh71lBkF-X1N_fCnOWJ5O2V"
            },
            {
                session: "2025-27",
                url: "https://drive.google.com/uc?export=download&id=1VX84S1jXR3JEdB97rqa9K-sbwD3OYgjw"
            },
            {
                session: "2022-23",
                url: "/schools/it/MCA DS 2022-23.pdf"
            },
            {
                session: "2021-23",
                url: "/schools/it/2021_23_MCA DS 2021-23.pdf"
            }
        ]
    },
    {
        id: "mca-ai",
        title: "MCA (Specialization: Artificial Intelligence)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Applied postgraduate curriculum covering neural network design, cognitive computing, automated pipelines, and intelligent software.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-blue-600",
        highlights: [
            "Applied AI Systems",
            "Natural Language Tools",
            "Neural Architectures",
            "Intelligent Applications"
        ],
        syllabusUrl: "/schools/it/MCA_AI 2026_28_4th.docx.docx.pdf",
        syllabus: [
            {
                session: "2026-28",
                url: "/schools/it/MCA_AI 2026_28_4th.docx.docx.pdf"
            },
            {
                session: "2025-27",
                url: "https://drive.google.com/uc?export=download&id=1p1a5d_SNyk6_e5zMJpSBrDtjBscmI6kG"
            },
            {
                session: "2024-26",
                url: "https://drive.google.com/uc?export=download&id=1gq4oAym9fiYUonnhHEkpEVcSMaCoQ7GY"
            },
            {
                session: "2021-23",
                url: "/schools/it/MCA AI 2021-23.pdf"
            }
        ]
    },
    {
        id: "phd-it",
        title: "Ph.D. in Information Technology",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "10 Students",
        description: "Doctoral research program promoting advanced inquiry into cloud architectures, network protocols, and distributed intelligence.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-500 to-teal-600",
        highlights: [
            "Doctoral Research",
            "Indexed Journal Publications",
            "Research Methodology",
            "Thesis Defense"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1iw6fCBR3g1tp-5oIbWHLYzHzpAa0h-3M",
        syllabus: [
            {
                session: "Current Scheme",
                url: "https://drive.google.com/uc?export=download&id=1iw6fCBR3g1tp-5oIbWHLYzHzpAa0h-3M"
            }
        ]
    }
],
  facultyMembers: [
    {
      name: "Dr. Neeta Singh",
      position: "Professor & Head",
      specialization:
        "Computer Networks, Wireless Networks, Mobile Computing, Wireless Technology, MANETs, VANETs, Next Generation Networks",
      email: "neeta@gbu.ac.in",
      achievements: "Ph.D. (Computer Science), M.Tech. ICT, Masters in Computers and Management, BSc.(PCM)",
      image: "https://www.gbu.ac.in/USICT/media/img/Neeta.jpg",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Prof. Sanjay Kumar Sharma",
      position: "Professor",
      specialization:
        "Information Technology, Artificial Intelligence, Nanotechnology, Research Methodology, Research & Publication Ethics",
      email: "ravikumar@gbu.ac.in",
      achievements: "Ph. D. 1993, Kurukshetra University, Kurukshetra",
      image: "https://faculty.gbu.ac.in/uploads/photos/66052fb965b32_sanjay.sharma.jpg",
      color: "from-teal-500 to-cyan-500",
    },
    {
      name: "Dr. Akash Kumar",
      position: "Associate Professor",
      specialization:
        "Battery Less Wireless Sensor Network, Internet of Things, Energy Harvesting, UAVs, Machine Learning, BlockChain",
      email: "akash.kumar@gbu.ac.in",
      achievements: "Ph.D. (IIIT-Allahabad), M.Tech. (IIIT-Allahabad), B.Tech. (UCE, RTU, Kota)",
      image:
        "https://faculty.gbu.ac.in/uploads/photos/6763ee8f77b1f_Akash%20Kumar%20(PWC2016003).jpg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Dr. Maneet Singh",
      position: "Assistant Professor",
      specialization:
        "Opinion Mining, Social Network Analysis, Computational Social Science and Machine Learning",
      email: "maneet.singh@gbu.ac.in",
      achievements: "PhD (Indian Institute of Technology Ropar)",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c1a9f10e9e1_profile_pic_ManeetSingh.jpg",
      color: "from-blue-500 to-indigo-500",
    }
      ],
  facultyStats: {
    text: "Our faculty team brings decades of experience in academics and industry.",
    stats: [
      {
        icon: BookOpen,
        value: "200+",
        label: "Research Papers",
        bg: "bg-emerald-50",
        color: "text-emerald-600",
      },
      {
        icon: Award,
        value: "25+",
        label: "Awards",
        bg: "bg-teal-50",
        color: "text-teal-600",
      },
      {
        custom: "PhD",
        value: "100%",
        label: "PhD Faculty",
        bg: "bg-cyan-50",
        color: "bg-cyan-600",
      },
      {
        custom: "Exp",
        value: "12+",
        label: "Avg Experience",
        bg: "bg-blue-50",
        color: "bg-blue-600",
      }
      ],
  },
  researchAreas: [
    {
      icon: Brain,
      title: "Data Science & Analytics",
      description: "Machine learning, big data processing, and business intelligence.",
      projects: ["Predictive Healthcare", "Financial Analytics", "Social Media Mining"],
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: Cloud,
      title: "Cloud & Distributed Systems",
      description: "Cloud-native apps, microservices, and serverless architectures.",
      projects: ["Microservices", "Serverless Apps", "Edge Computing"],
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "Mobile & IoT",
      description: "Cross-platform apps, IoT integration, and mobile security.",
      projects: ["IoT Devices", "Smart Apps", "Secure Mobile Frameworks"],
      image:
        "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Shield,
      title: "Cybersecurity & Blockchain",
      description: "Network security, cryptography, and blockchain applications.",
      projects: ["Secure Communication", "Blockchain Voting", "IoT Security"],
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-indigo-500",
    }
      ],
  researchStats: [
    { value: "50+", label: "Research Projects", bg: "bg-emerald-500/20" },
    { value: "₹5Cr+", label: "Research Funding", bg: "bg-teal-500/20" },
    { value: "200+", label: "Publications", bg: "bg-cyan-500/20" },
    { value: "10+", label: "Patents Filed", bg: "bg-blue-500/20" }
      ],
  topAchievers: [
    {
      name: "Arjun Kumar",
      year: "B.Tech IT 2024",
      achievement: "Microsoft Student Partner, Intern at Google",
      image:
        "https://images.unsplash.com/photo-1646415753793-dcfda1dfeee3?auto=format&fit=crop&w=400&q=80",
      skills: ["React", "Node.js", "Cloud", "Machine Learning"],
    },
    {
      name: "Rajeev Verma",
      year: "Ph.D. IT 2025",
      achievement: "Received DST Research Fellowship, AI Researcher",
      image:
        "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVuaXZlcnNpdHklMjBzdHVkZW50JTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
      skills: ["AI", "Deep Learning", "Python", "NLP"],
    },
    {
      name: "Megha Singh",
      year: "B.Tech IT 2025",
      achievement: "Won Smart India Hackathon, Intern at Infosys",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: ["Java", "Cloud Computing", "Cybersecurity"],
    }
      ],
  achievements: [
    {
      title: "ACM Student Chapter",
      description: "Largest ACM chapter with 300+ IT students",
      icon: Award,
      color: "text-emerald-600",
    },
    {
      title: "Open Source Projects",
      description: "200+ student-led open-source projects",
      icon: BookOpen,
      color: "text-teal-600",
    },
    {
      title: "Tech Industry Tie-Ups",
      description: "Partnerships with Google, IBM, and TCS",
      icon: Lightbulb,
      color: "text-cyan-600",
    },
    {
      title: "Placement Record",
      description: "98% placements in top IT companies",
      icon: GraduationCap,
      color: "text-blue-600",
    }
      ],
};
