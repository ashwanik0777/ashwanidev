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
    image: "https://www.gbu.ac.in/USICT/media/img/Arun%20Solanki.jpeg",
    name: "Dr. Arun Solanki",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Computer Science and Engineering! The field of Computer Science and Engineering (CSE) has consistently been at the forefront of innovation, transforming the landscape of nearly every discipline by providing computing as a foundational tool for inquiry and discovery. From artificial intelligence applications, intelligent game design, and smart robots to cloud computing, big data analytics, cybersecurity, and social networks, our department offers students the opportunity to explore and excel in exciting, intellectually stimulating, and fast-growing career fields.",
      "We take immense pride in our Teaching-Learning process, which is the cornerstone of our commitment to providing a high-quality technical education. Our department employs innovative teaching aids and methodologies to continuously enhance student learning and outcomes. This commitment is reflected in our consistently excellent academic results over the years.",
      "To foster continuous growth and development, we regularly organize Student Development Programs, Short-Term Training Programs, Conferences, Seminars, Webinars, Workshops, and Expert Lecture Series aimed at enhancing both the technical and professional skills of our students. Furthermore, our Faculty Development Programs ensure that our educators remain at the cutting edge of their fields, promoting high standards in technical education.",
      "At the Department of Computer Science and Engineering, we strive to create an environment that encourages learning, exploration, and innovation. We look forward to collaborating with students, faculty, industry partners, and stakeholders to create a successful and fulfilling experience for all.",
      "If you have any questions or require further assistance, please feel free to reach out. We are here to support you on your journey.",
      "Dr. Arun Solanki Head, Department of Computer Science and Engineering",
      "Email: arunk@gbu.ac.in Phone: 0120-2346080 (Ext.6080)"
      ],
    contact: {
      name: "Dr. Arun Solanki",
      designation: "Head of Department - CSE",
      email: "arunk@gbu.ac.in",
      phone: "0120-2346080 (Ext.6080)",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 1995, our department has been at the forefront of computer science education and research for over two decades.",
    stats: [
      { icon: Users, numberText: "800+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "45+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "120+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "25+", title: "Patents Filed", subtitle: "Innovations" }
      ],
    highlights: [
      {
        title: "Excellence in Education",
        description:
          "Our department offers comprehensive undergraduate and postgraduate programs designed to meet the evolving needs of the technology industry. We emphasize both theoretical foundations and practical applications, ensuring our graduates are industry-ready.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research & Innovation",
        description:
          "We are actively engaged in cutting-edge research in artificial intelligence, machine learning, cybersecurity, software engineering, and data science. Our faculty and students regularly publish in top-tier conferences and journals.",
        dotColor: "#06b6d4",
      },
      {
        title: "Industry Partnerships",
        description:
          "Strong collaborations with leading technology companies provide our students with internship opportunities, industry projects, and placement assistance. We maintain partnerships with Google, Microsoft, Amazon, TCS, Infosys, and many more.",
        dotColor: "#6366f1",
      }
      ],
    vision:
      "To be a globally recognized center of excellence in computer science education, research, and innovation that contributes to societal development.",
    missionPoints: [
      "Provide quality education in computer science and engineering",
      "Conduct cutting-edge research in emerging technologies",
      "Foster innovation and entrepreneurship among students",
      "Collaborate with industry and academic institutions globally",
      "Contribute to societal development through technology solutions"
      ],
  },
  programsData: [
    {
        id: "btech-cse",
        title: "B.Tech Computer Science & Engineering",
        level: "UG",
        duration: "4 Years",
        intake: "120 Students",
        description: "Comprehensive undergraduate program covering fundamental and advanced computing principles with hands-on laboratory experience.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-blue-600",
        highlights: [
            "Data Structures & Algorithms",
            "Operating Systems",
            "DBMS & Cloud Systems",
            "Full-Stack Development"
        ],
        syllabusUrl: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf",
        syllabus: [
            {
                session: "2026-27",
                url: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf"
            },
            {
                session: "2025-26",
                url: "/schools/cse/BTech_CSE_2025-29.pdf"
            },
            {
                session: "2024-25",
                url: "/schools/cse/BTECH-CSE-2024-28.pdf"
            },
            {
                session: "2023-24",
                url: "/schools/cse/B.Tech_CSE_PS_2023-2027.pdf"
            }
        ]
    },
    {
        id: "btech-cse-ai",
        title: "B.Tech CSE (Artificial Intelligence)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Focused on modern AI algorithms, computer vision, natural language processing, and deep neural architectures.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-purple-600",
        highlights: [
            "Neural Networks & Deep Learning",
            "Natural Language Processing",
            "Computer Vision",
            "Reinforcement Learning"
        ],
        syllabusUrl: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf",
        syllabus: [
            {
                session: "2026-27",
                url: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf"
            },
            {
                session: "2025-26",
                url: "/schools/cse/BTech_CSE_2025-29.pdf"
            },
            {
                session: "2024-25",
                url: "/schools/cse/BTECH-CSE-2024-28.pdf"
            },
            {
                session: "2023-24",
                url: "/schools/cse/B.Tech_CSE_PS_2023-2027.pdf"
            }
        ]
    },
    {
        id: "btech-cse-cyber",
        title: "B.Tech CSE (Cyber Security)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Specialized program in network defense, ethical hacking, digital forensics, and secure coding practices.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80",
        gradient: "from-red-500 to-red-600",
        highlights: [
            "Network Security",
            "Ethical Hacking & Penetration Testing",
            "Digital Forensics",
            "Cryptography"
        ],
        syllabusUrl: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf",
        syllabus: [
            {
                session: "2026-27",
                url: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf"
            },
            {
                session: "2025-26",
                url: "/schools/cse/BTech_CSE_2025-29.pdf"
            },
            {
                session: "2024-25",
                url: "/schools/cse/BTECH-CSE-2024-28.pdf"
            },
            {
                session: "2023-24",
                url: "/schools/cse/B.Tech_CSE_PS_2023-2027.pdf"
            }
        ]
    },
    {
        id: "btech-cse-ds",
        title: "B.Tech CSE (Data Science)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Curriculum designed for big data processing, data warehousing, predictive modeling, and business analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-500 to-indigo-600",
        highlights: [
            "Big Data Architecture",
            "Statistical Modeling",
            "Data Visualization",
            "Predictive Analytics"
        ],
        syllabusUrl: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf",
        syllabus: [
            {
                session: "2026-27",
                url: "/schools/cse/Prog-Str-BTechCSE-Batch-2026-30.pdf"
            },
            {
                session: "2025-26",
                url: "/schools/cse/BTech_CSE_2025-29.pdf"
            },
            {
                session: "2024-25",
                url: "/schools/cse/BTECH-CSE-2024-28.pdf"
            },
            {
                session: "2023-24",
                url: "/schools/cse/B.Tech_CSE_PS_2023-2027.pdf"
            }
        ]
    },
    {
        id: "int-btech-mtech-cse",
        title: "Integrated B.Tech-M.Tech CSE",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "30 Students",
        description: "Continuous 5-year dual degree combining undergraduate engineering with advanced master's level research thesis.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-amber-600",
        highlights: [
            "Integrated Curriculum",
            "Master's Thesis Research",
            "High-Performance Computing",
            "Advanced Electives"
        ],
        syllabusUrl: "/schools/cse/INT-BTECH-MTECH-CSE-2024-29.pdf",
        syllabus: [
            {
                session: "2024-25",
                url: "/schools/cse/INT-BTECH-MTECH-CSE-2024-29.pdf"
            },
            {
                session: "2023-24",
                url: "/schools/cse/INT_B.TECH-MTECH_CSE_2023-2028.pdf"
            },
            {
                session: "2022-23",
                url: "/schools/cse/INT_B.TECH-MTECH_CSE_2022-2027.pdf"
            },
            {
                session: "2021-22",
                url: "/schools/cse/INT_B.TECH-MTECH_CSE_2021-2026.pdf"
            }
        ]
    },
    {
        id: "mca-program",
        title: "Master of Computer Applications (MCA)",
        level: "PG",
        duration: "2 Years",
        intake: "60 Students",
        description: "Industry-aligned postgraduate degree in modern application development, enterprise frameworks, and data systems.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-500 to-blue-600",
        highlights: [
            "Enterprise Application Frameworks",
            "Cloud Platforms",
            "Database Management",
            "Capstone Project"
        ],
        syllabusUrl: "/schools/cse/2021_23_MCA_DS_2021-23.pdf",
        syllabus: [
            {
                session: "2021-22",
                url: "/schools/cse/2021_23_MCA_DS_2021-23.pdf"
            },
            {
                session: "2020-21",
                url: "/schools/cse/MCA_2020-23.pdf"
            }
        ]
    },
    {
        id: "mtech-cse",
        title: "M.Tech Computer Science & Engineering",
        level: "PG",
        duration: "2 Years",
        intake: "60 Students",
        description: "Advanced postgraduate program with specializations in emerging technologies and research opportunities.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-purple-600",
        highlights: [
            "Artificial Intelligence",
            "Advanced Algorithms",
            "Research Methodology",
            "Master's Dissertation"
        ],
        syllabusUrl: "/schools/cse/MTech_CSE_Syllabus_WP.pdf",
        syllabus: [
            {
                session: "Current Scheme",
                url: "/schools/cse/MTech_CSE_Syllabus_WP.pdf"
            }
        ]
    },
    {
        id: "phd-cse",
        title: "Ph.D. in Computer Science & Engineering",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Doctoral research program promoting original contributions across theoretical and applied computer science.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-500 to-green-600",
        highlights: [
            "Independent Research",
            "Indexed Journal Publications",
            "Teaching Assistantship",
            "Doctoral Thesis Defense"
        ],
        syllabusUrl: "/schools/cse/PHD.pdf",
        syllabus: [
            {
                session: "Current Scheme",
                url: "/schools/cse/PHD.pdf"
            }
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
  researchStats: [
    { numberText: "80+", subtitle: "Research Projects" },
    { numberText: "₹10Cr+", subtitle: "Research Funding" },
    { numberText: "250+", subtitle: "Publications" },
    { numberText: "15+", subtitle: "Patents Filed" }
      ],
  topAchievers: [
    {
      name: "Ananya Sharma",
      year: "B.Tech CSE 2024",
      achievement:
        "Winner of Smart India Hackathon, Internship at Google, ACM Student Researcher",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: ["Full Stack Development", "React", "Node.js", "Problem Solving"],
    },
    {
      name: "Karan Mehta",
      year: "M.Tech CSE 2023",
      achievement: "Published 3 papers in AI, Patent filed for AI-based Health Monitoring",
      image:
        "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: ["Machine Learning", "Python", "Deep Learning", "Data Science"],
    },
    {
      name: "Sneha Gupta",
      year: "B.Tech CSE 2024",
      achievement: "Winner of National Coding Olympiad, Founder of EdTech Startup",
      image:
        "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      skills: ["Competitive Programming", "Java", "Startups", "UX/UI Design"],
    }
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
