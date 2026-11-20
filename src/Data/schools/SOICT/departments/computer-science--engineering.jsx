import { Code, Cpu, Database, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOICT",
  departmentId: "cse",
  heroProps: {
    title: "Department of Computer Science & Engineering",
    highlight: "Computer Science & Engineering",
    subtitle:
      "Pioneering innovation in technology education. Empowering students to become tomorrow's digital leaders and problem solvers.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Code,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Software Development",
        description:
          "Full-stack development, mobile apps, and cutting-edge software solutions",
      },
      {
        icon: Cpu,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "AI & Machine Learning",
        description:
          "Artificial intelligence, deep learning, and intelligent systems research",
      },
      {
        icon: Database,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Data Science",
        description:
          "Big data analytics, cloud computing, and database management systems",
      }
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, CSE",
    image: "/assets/schools/Arun_Solanki.jpeg",
    name: "Dr. Arun Solanki",
    designation: "Head of Department",
    messageParagraphs: [
      "Welcome to the Department of Computer Science and Engineering! CSE continues to be at the forefront of innovation, shaping almost every discipline through technologies such as Artificial Intelligence, cloud computing, big data analytics, cybersecurity, smart systems, and social networks. Our department provides students with opportunities to explore emerging technologies and build skills for fast-growing career fields.",
      "We are committed to delivering high-quality technical education through effective teaching-learning practices, innovative teaching methodologies, and continuous improvement in student learning and outcomes. We regularly organize Student Development Programs, training programs, conferences, seminars, webinars, workshops, and expert lectures to enhance the technical and professional skills of our students.",
      "At the Department of Computer Science and Engineering, we strive to create an environment that encourages learning, exploration, and innovation while preparing students to meet the evolving demands of academia and industry.",
    ],
    contact: {
      name: "Dr. Arun Solanki",
      designation: "Head of Department - CSE",
      email: "arunk@gbu.ac.in",
      phone: "0120-2346080 (Ext.6080)",
    },
  },
  aboutProps: null,
    programsData: [
    {
      id: "btech-cse",
      title: "B.Tech Computer Science & Engineering",
      level: "UG",
      duration: "4 Years",
      intake: "120 Students",
      description: "Core computing curriculum encompassing data structures, operating systems, cloud systems, compiler design, and full-stack software development.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Data Structures & Algorithms",
        "Operating Systems",
        "DBMS & Cloud Computing",
        "Full-Stack Development"
      ],
      syllabusUrl: "/courses/soict/cse/btech-cse-structure-2026-30.pdf",
      syllabus: [
        { session: "2026-30", url: "/courses/soict/cse/btech-cse-structure-2026-30.pdf" },
        { session: "2025-29 (Structure)", url: "/courses/soict/cse/btech-cse-structure-2025-29.pdf" },
        { session: "2025-29 (Syllabus)", url: "/courses/soict/cse/btech-cse-syllabus-2025-29.pdf" },
        { session: "2024-28", url: "/courses/soict/cse/btech-cse-structure-2024-28.pdf" },
        { session: "2023-27", url: "/courses/soict/cse/btech-cse-structure-2023-27.pdf" },
        { session: "2022-26", url: "/courses/soict/cse/btech-cse-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-cse-structure-2021-25.pdf" },
        { session: "2020-24", url: "/courses/soict/cse/btech-cse-structure-2020-24.pdf" },
        { session: "2019-23", url: "/courses/soict/cse/btech-cse-structure-2019-23.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-cse-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-ai",
      title: "B.Tech CSE (Artificial Intelligence)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Advanced undergraduate track focused on machine intelligence, deep neural networks, natural language processing, and computer vision systems.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Deep Learning & Neural Nets",
        "Natural Language Processing",
        "Computer Vision",
        "Reinforcement Learning"
      ],
      syllabusUrl: "/courses/soict/cse/btech-ai-structure-2026-30.pdf",
      syllabus: [
        { session: "2026-30", url: "/courses/soict/cse/btech-ai-structure-2026-30.pdf" },
        { session: "2025-29 (Structure)", url: "/courses/soict/cse/btech-ai-structure-2025-29.pdf" },
        { session: "2025-29 (Syllabus)", url: "/courses/soict/cse/btech-ai-syllabus-2025.pdf" },
        { session: "2024-28", url: "/courses/soict/cse/btech-ai-structure-2024-28.pdf" },
        { session: "2023-27", url: "/courses/soict/cse/btech-ai-structure-2023-27.pdf" },
        { session: "2022-26", url: "/courses/soict/cse/btech-ai-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-ai-structure-2021-25.pdf" },
        { session: "2020-24", url: "/courses/soict/cse/btech-ai-structure-2020-24.pdf" },
        { session: "2019-23", url: "/courses/soict/cse/btech-ai-structure-2019-23.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-ai-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-usfs",
      title: "B.Tech CSE (Self Finance Scheme)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Undergraduate computer engineering curriculum offered under the university self-finance scheme covering core computing, software engineering, and applied systems.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80",
      gradient: "from-slate-600 to-slate-800",
      highlights: [
        "Core Computer Science",
        "Self Finance Track",
        "Algorithms & Systems",
        "Software Projects"
      ],
      syllabusUrl: "/courses/soict/cse/btech-self-finance-structure-2022-26.pdf",
      syllabus: [
        { session: "2022-26", url: "/courses/soict/cse/btech-self-finance-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-self-finance-structure-2021-25.pdf" },
        { session: "2020-24", url: "/courses/soict/cse/btech-self-finance-structure-2020-24.pdf" },
        { session: "2019-23", url: "/courses/soict/cse/btech-self-finance-structure-2019-23.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-self-finance-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-cyber",
      title: "B.Tech CSE (Cyber Security)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Specialized engineering program covering ethical hacking, network defense architectures, cryptography, and digital forensics.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-500 to-red-600",
      highlights: [
        "Ethical Hacking",
        "Network Defense",
        "Cryptography & PKI",
        "Digital Forensics"
      ],
      syllabusUrl: "/courses/soict/cse/btech-cyber-structure-2024-28.pdf",
      syllabus: [
        { session: "2024-28", url: "/courses/soict/cse/btech-cyber-structure-2024-28.pdf" },
        { session: "2023-27", url: "/courses/soict/cse/btech-cyber-structure-2023-27.pdf" },
        { session: "2022-26", url: "/courses/soict/cse/btech-cyber-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-cyber-structure-2021-25.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-cyber-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-ds",
      title: "B.Tech CSE (Data Science)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Mathematical computing, statistical modeling, big data pipelines, distributed computing, and visual data engineering.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Data Engineering",
        "Big Data Analytics",
        "Statistical Modeling",
        "Predictive Modeling"
      ],
      syllabusUrl: "/courses/soict/cse/btech-ds-structure-2024-28.pdf",
      syllabus: [
        { session: "2024-28", url: "/courses/soict/cse/btech-ds-structure-2024-28.pdf" },
        { session: "2023-27", url: "/courses/soict/cse/btech-ds-structure-2023-27.pdf" },
        { session: "2022-26", url: "/courses/soict/cse/btech-ds-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-ds-structure-2021-25.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-ds-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-ml",
      title: "B.Tech CSE (Machine Learning)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Dedicated curriculum focused on machine learning models, statistical inference, data preprocessing, and predictive intelligence.",
      image: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Supervised & Unsupervised ML",
        "Predictive Modeling",
        "Feature Engineering",
        "MLOps & Deployment"
      ],
      syllabusUrl: "/courses/soict/cse/btech-ml-structure-2024-28.pdf",
      syllabus: [
        { session: "2024-28", url: "/courses/soict/cse/btech-ml-structure-2024-28.pdf" },
        { session: "2023-27", url: "/courses/soict/cse/btech-ml-structure-2023-27.pdf" },
        { session: "2022-26", url: "/courses/soict/cse/btech-ml-structure-2022-26.pdf" },
        { session: "2021-25", url: "/courses/soict/cse/btech-ml-structure-2021-25.pdf" },
        { session: "2024 Syllabus", url: "/courses/soict/cse/btech-ml-syllabus-2024.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/btech-ml-syllabus-2023.pdf" }
      ]
    },
    {
      id: "btech-cse-iot",
      title: "B.Tech CSE (Internet of Things)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Undergraduate engineering program focusing on smart devices, sensor interfacing, embedded microcontrollers, IoT cloud platforms, and wireless sensor networks.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-teal-600",
      highlights: [
        "Sensors & Actuators",
        "Embedded IoT Systems",
        "IoT Cloud Platforms",
        "Wireless Sensor Networks"
      ],
      syllabusUrl: "/courses/soict/cse/btech-iot-structure-2021-25.pdf",
      syllabus: [
        { session: "2021-25", url: "/courses/soict/cse/btech-iot-structure-2021-25.pdf" }
      ]
    },
    {
      id: "int-btech-mtech-cse",
      title: "Integrated B.Tech-M.Tech CSE",
      level: "Integrated",
      duration: "5 Years",
      intake: "30 Students",
      description: "Five-year integrated dual degree program combining core undergraduate computer science with specialized postgraduate coursework and research thesis.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-600 to-indigo-700",
      highlights: [
        "Dual Degree in 5 Years",
        "Integrated Research Track",
        "Advanced Electives",
        "Master Thesis Project"
      ],
      syllabusUrl: "/courses/soict/cse/int-btech-mtech-structure-2026-31.pdf",
      syllabus: [
        { session: "2026-31", url: "/courses/soict/cse/int-btech-mtech-structure-2026-31.pdf" },
        { session: "2025-30 (Structure)", url: "/courses/soict/cse/int-btech-mtech-structure-2025-30.pdf" },
        { session: "2025-30 (Syllabus)", url: "/courses/soict/cse/int-btech-mtech-syllabus-2025.pdf" },
        { session: "2024-29", url: "/courses/soict/cse/int-btech-mtech-structure-2024-29.pdf" },
        { session: "2023-28", url: "/courses/soict/cse/int-btech-mtech-structure-2023-28.pdf" },
        { session: "2022-27", url: "/courses/soict/cse/int-btech-mtech-structure-2022-27.pdf" },
        { session: "2021-26", url: "/courses/soict/cse/int-btech-mtech-structure-2021-26.pdf" },
        { session: "2020-25", url: "/courses/soict/cse/int-btech-mtech-structure-2020-25.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/int-btech-mtech-syllabus-2023.pdf" }
      ]
    },
    {
      id: "int-btech-mtech-ict",
      title: "5 Year Integrated B.Tech.-M.Tech. (ICT)",
      level: "Integrated",
      duration: "5 Years",
      intake: "30 Students",
      description: "Dual-degree program in Information and Communication Technology combining core computer science, telecommunications, and advanced master level research.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-600 to-blue-700",
      highlights: [
        "Dual Degree Award",
        "ICT Research Labs",
        "Advanced Communications",
        "Master Thesis"
      ],
      syllabusUrl: "/courses/soict/cse/int-btech-mtech-ai-structure-2023.pdf",
      syllabus: [
        { session: "Approved Scheme", url: "/courses/soict/cse/int-btech-mtech-ai-structure-2023.pdf" }
      ]
    },
    {
      id: "mtech-cse-ai",
      title: "M.Tech CSE (Artificial Intelligence & Robotics)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Postgraduate specialization focusing on autonomous robotics, reinforcement learning, computer vision, kinematics, and intelligent industrial automation.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-600 to-indigo-700",
      highlights: [
        "Autonomous Robotics",
        "Reinforcement Learning",
        "Motion Planning",
        "Computer Vision"
      ],
      syllabusUrl: "/courses/soict/cse/mtech-ai-robotics-structure-2026-28.pdf",
      syllabus: [
        { session: "2026-28", url: "/courses/soict/cse/mtech-ai-robotics-structure-2026-28.pdf" },
        { session: "2025-27", url: "/courses/soict/cse/mtech-ai-robotics-structure-2025-27.pdf" },
        { session: "2024-26", url: "/courses/soict/cse/mtech-ai-robotics-structure-2024-26.pdf" },
        { session: "Syllabus Batch 2025-27", url: "/courses/soict/cse/mtech-ai-robotics-syllabus-2025.pdf" }
      ]
    },
    {
      id: "mtech-cse-ds",
      title: "M.Tech CSE (Data Science)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Advanced master program specializing in big data ecosystems, predictive modeling, deep statistical analysis, and large-scale data engineering.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-600 to-cyan-700",
      highlights: [
        "Big Data Analytics",
        "Statistical Machine Learning",
        "Distributed Systems",
        "Data Mining"
      ],
      syllabusUrl: "/courses/soict/cse/mtech-ds-structure-2024-26.pdf",
      syllabus: [
        { session: "2024-26", url: "/courses/soict/cse/mtech-ds-structure-2024-26.pdf" },
        { session: "2022-24", url: "/courses/soict/cse/mtech-ds-structure-2022-24.pdf" },
        { session: "Syllabus 2025", url: "/courses/soict/cse/mtech-ds-syllabus-2025.pdf" },
        { session: "June 2023 Scheme", url: "/courses/soict/cse/mtech-ds-syllabus-2023.pdf" }
      ]
    },
    {
      id: "mtech-cse-se",
      title: "M.Tech CSE (Software Engineering)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Advanced software architectures, formal verification, agile engineering management, cloud native microservices, and DevOps pipelines.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-600 to-teal-700",
      highlights: [
        "Software Architecture",
        "Microservices & Cloud",
        "Agile Methodologies",
        "Software Verification"
      ],
      syllabusUrl: "/courses/soict/cse/mtech-cse-structure-2024-26.pdf",
      syllabus: [
        { session: "2024-26", url: "/courses/soict/cse/mtech-cse-structure-2024-26.pdf" },
        { session: "Syllabus Batch 2025", url: "/courses/soict/cse/mtech-cse-syllabus-2025.pdf" }
      ]
    },
    {
      id: "mtech-cse-wp",
      title: "M.Tech CSE (Working Professionals)",
      level: "PG",
      duration: "2 Years",
      intake: "30 Students",
      description: "Flexible, high-impact evening and weekend hybrid master's degree crafted specifically for employed software engineers and technology leaders.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80",
      gradient: "from-slate-700 to-slate-800",
      highlights: [
        "Flexible Weekend Classes",
        "Industry Aligned",
        "Applied Industry Thesis",
        "Cloud & DevOps Focus"
      ],
      syllabusUrl: "/courses/soict/cse/mtech-working-prof-structure-2026.pdf",
      syllabus: [
        { session: "2026-28 Structure", url: "/courses/soict/cse/mtech-working-prof-structure-2026.pdf" },
        { session: "Detailed Syllabus", url: "/courses/soict/cse/mtech-working-prof-syllabus.pdf" }
      ]
    },
    {
      id: "phd-cse",
      title: "Ph.D. in Computer Science & Engineering",
      level: "Doctoral",
      duration: "3-5 Years",
      intake: "15 Students",
      description: "Premier research doctorate aimed at producing groundbreaking contributions in computing, artificial intelligence, security, and algorithmic complexity.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-700 to-indigo-900",
      highlights: [
        "Independent Research",
        "High-Impact Publications",
        "Conference Grants",
        "Thesis Defense"
      ],
      syllabusUrl: "/courses/soict/cse/phd-structure.pdf",
      syllabus: [
        { session: "Current Scheme", url: "/courses/soict/cse/phd-structure.pdf" }
      ]
    }
  ],
  facultyMembers: [
    {
      name: "Dr. Arpit Bhardwaj",
      position: "Associate Professor and Dean(I/C)",
      specialization: "Machine Learning, Deep Learning, EEG Signal, Genetic Programming",
      email: "arpit.bhardwaj@gbu.ac.in",
      achievements:
        "Ph.D: Computer Science, IIT Indore, M.Tech: SGSITS Indore, B.Tech: SDITS Khandwa",
      image:
        "https://faculty.gbu.ac.in/uploads/photos/6735c61d170ee_WhatsApp%20Image%202024-11-14%20at%203.12.33%20PM.jpeg",
      color: "from-blue-500 to-blue-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Arun Solanki",
      position: "Assistant Professor",
      specialization: "Artificial Intelligence, Machine Learning, Deep Learning, NLP",
      email: "asolanki@gbu.ac.in",
      achievements:
        "PhD(2014), Computer Science and Engineering, Gautam Buddha University, Greater Noida",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c6a617c08be_cropped-arun.jpg",
      color: "from-purple-500 to-purple-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Anurag Singh Baghel",
      position: "Assistant Professor",
      specialization:
        "Artificial Intelligence, Soft Computing, Optimization Techniques, Algorithm Design, Embedded Systems",
      email: "asb@gbu.ac.in",
      achievements: "D.Phil(2010), University of Allahabad, Prayagraj",
      image: "https://faculty.gbu.ac.in/uploads/photos/66052f4f5757a_asb.jpg",
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Dr. Gaurav Kumar",
      position: "Assistant Professor",
      specialization:
        "Recommendation Systems, Machine learning, Decision Support Systems, Sentiment Analysis, Cyber Scams",
      email: "gaurav.kumar@gbu.ac.in",
      achievements:
        "B.Tech (Guru Gobind Singh University), M.Tech and PhD (Jawaharlal Nehru University)",
      image:
        "https://faculty.gbu.ac.in/uploads/photos/6721e9346dac1_Photo-removebg-preview.png",
      color: "from-green-500 to-green-600",
    }
  ],
  facultyStats: {
    text: "Our department has 45+ experienced faculty members with expertise across all areas of computer science.",
    stats: [
      {
        icon: BookOpen,
        numberText: "500+",
        subtitle: "Research Papers",
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        icon: Award,
        numberText: "50+",
        subtitle: "Awards",
        bg: "bg-green-50",
        color: "text-green-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-purple-0",
        color: "bg-purple-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "15+",
        subtitle: "Avg Experience",
        bg: "bg-orange-50",
        color: "bg-orange-600",
      }
    ],
  },
  researchStats: [],
  topAchievers: [
    {
      name: "Aarushi Sangal",
      rollNo: "235UAI001",
      year: "B.Tech CSE (AI) | Pre-Final Year",
      achievement:
        "Second Position & ₹3,00,000 Cash Prize at FinShield Hackathon 2025, IIT Hyderabad",
      image: "/assets/students/Aarushi Sangal.png",
      skills: ["Artificial Intelligence", "Computer Science", "Hackathons"],
    },
    {
      name: "Mayank Prabhakar",
      rollNo: "255UCS033",
      year: "B.Tech CSE | 2nd Year",
      achievement:
        "Selected as Google Gemini Student Ambassador, representing Gautam Buddha University to drive AI awareness, learning, and student engagement.",
      image: "/assets/students/Mayank Prabhakar.png",
      skills: ["Artificial Intelligence", "Community Building", "Technology", "Leadership"],
    },
    {
      name: "Krishna Kumar Jha",
      rollNo: "225UCD007",
      year: "B.Tech CSE",
      achievement:
        "Selected as an AI/ML Intern at DGIS, Indian Army, Ministry of Defence, gaining valuable experience in Artificial Intelligence and Machine Learning.",
      image: "/assets/students/Krishna.png",
      skills: ["Artificial Intelligence", "Machine Learning", "Technical Skills"],
    },
    {
      name: "Prachi Saroj",
      year: "B.Tech Artificial Intelligence",
      achievement:
        "Placed at Physics Wallah (PW) through campus placement, marking a significant career achievement.",
      image: "/assets/students/Prachi Saroj.png",
      skills: ["Artificial Intelligence", "Placement", "Physics Wallah"],
    },
    {
      name: "Ananya Pandey",
      year: "B.Tech CSE",
      achievement:
        "Placed at Pratinidhi.ai as a Software Engineer with a package of ₹12 LPA.",
      image: "/assets/students/ananaya.png",
      skills: ["Software Engineering", "Placement", "Pratinidhi.ai", "₹12 LPA"],
    },
  ],
  achievements: [
    {
      title: "ACM Student Chapter",
      description: "Active ACM chapter with 300+ CSE students",
      icon: Award,
      color: "text-blue-600",
    },
    {
      title: "Research Publications",
      description: "200+ papers in top-tier CS conferences and journals",
      icon: BookOpen,
      color: "text-indigo-600",
    },
    {
      title: "Industry Collaborations",
      description: "MoUs with Google, Microsoft, and IBM for projects & training",
      icon: Lightbulb,
      color: "text-purple-600",
    },
    {
      title: "Placement Record",
      description: "98% placements in FAANG & top product companies",
      icon: GraduationCap,
      color: "text-emerald-600",
    }
  ],
};
