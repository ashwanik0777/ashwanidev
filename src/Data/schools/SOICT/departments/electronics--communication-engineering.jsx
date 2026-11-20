import {
  Cpu,
  Radio,
  Waves,
  Satellite,
  Users,
  Award,
  BookOpen,
  Lightbulb,
  GraduationCap,
  Shield,
  Globe,
} from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOICT",
  departmentId: "ece",
  heroProps: {
    title: "Department of Electronics & Communication Engineering",
    highlight: "Electronics & Communication Engineering",
    subtitle:
      "Shaping the future of communications and electronics through innovation, research, and academic excellence.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1581090700227-4c4c1a7b8f17?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Cpu,
        bg: "bg-gradient-to-br from-pink-500 to-pink-600",
        title: "Embedded Systems",
        description: "Designing smart embedded solutions for diverse applications.",
      },
      {
        icon: Radio,
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        title: "Communication Systems",
        description: "Wireless, satellite, and optical communication research.",
      },
      {
        icon: Waves,
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        title: "Signal Processing",
        description: "Advanced signal processing, VLSI design, and IoT integration.",
      }
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, ECE",
    image: "/assets/schools/vidushii.jpg",
    name: "Dr. Vidushi Sharma",
    designation: "Head of Department",
    messageParagraphs: [
      "I warmly welcome you to the Department of Electronics and Communication Engineering, Gautam Buddha University. Over all these years, we have made progress in imparting technical education to our students and bringing them at par with the ever-expanding horizons of Electronics and Communication Engineering and its application areas. At the undergraduate level, we offer four-year B. Tech. Programme, and four-year B. Tech. (Engineering Design) Programme. At the postgraduate level, we offer three areas of specialization for two-year M. Tech. Programmes: (i) Wireless Communication and Networks, (ii) VLSI Design, (iii) Railway Signalling Telecommunication and RAMS. We also offer Ph.D. Programmes for full time and working professionals in all areas where research is being currently conducted by our faculty members.",
      "The Electronics and Communication Engineering department has always placed prime emphasis on excellence in teaching and research. Faculty members have very good academic credentials and are highly motivated towards imparting the best of education, as well as pioneering research and development. Our courses are frequently updated in terms of depth as well as the subjects themselves, so that our students always remain on the forefront of technological advancement. Well-equipped laboratories and encouragement to pursue research have increased our students' productivity in terms of placements, higher studies, and research contributions. It has been observed that student research contribution has increased tremendously during the last few years. We regularly organize seminars, workshops, conferences, faculty development programmes, skill enhancement programmes, expert talks, invited lectures, etc., that benefit our students as well as the staff members of our school.",
    ],
    contact: {
      name: "Dr. Vidushi Sharma",
      designation: "Head of Department - ECE",
      email: "vidushi@gbu.ac.in",
      phone: "0120-2346080 (Ext.6080)",
    },
  },
  aboutProps: null,
    programsData: [
    {
      id: "btech-ece",
      title: "B.Tech Electronics & Communication Engineering",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Core program covering semiconductor devices, analog/digital communication, signal processing, RF design, and embedded systems.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Signals & Systems",
        "Digital Signal Processing",
        "Microcontrollers & Embedded Systems",
        "RF & Microwave Design"
      ],
      syllabusUrl: "/courses/soict/ece/btech-ece-structure-2026-30.pdf",
      syllabus: [
        { session: "2026-30", url: "/courses/soict/ece/btech-ece-structure-2026-30.pdf" },
        { session: "2025-29", url: "/courses/soict/ece/btech-ece-structure-2025-29.pdf" },
        { session: "2024-28", url: "/courses/soict/ece/btech-ece-structure-2024-28.pdf" },
        { session: "Syllabus 2026-30", url: "/courses/soict/ece/btech-ece-ai-syllabus-2026-30.pdf" },
        { session: "Syllabus 2025-29", url: "/courses/soict/ece/btech-ece-ai-syllabus-2025-29.pdf" }
      ]
    },
    {
      id: "btech-ece-aiml",
      title: "B.Tech ECE (AI & Machine Learning)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Interdisciplinary degree merging hardware edge computing, IoT sensor architectures, and machine learning accelerators.",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Edge AI & TinyML",
        "Embedded Neural Networks",
        "Hardware Accelerators",
        "Robotics & Automation"
      ],
      syllabusUrl: "/courses/soict/ece/btech-ece-aiml-structure-2026-30.pdf",
      syllabus: [
        { session: "2026-30", url: "/courses/soict/ece/btech-ece-aiml-structure-2026-30.pdf" },
        { session: "2025-29", url: "/courses/soict/ece/btech-ece-aiml-structure-2025-29.pdf" },
        { session: "2024-28", url: "/courses/soict/ece/btech-ece-aiml-structure-2024-28.pdf" },
        { session: "Syllabus 2026-30", url: "/courses/soict/ece/btech-ece-aiml-syllabus-2026-30.pdf" },
        { session: "Syllabus 2025-29", url: "/courses/soict/ece/btech-ece-aiml-syllabus-2025-29.pdf" }
      ]
    },
    {
      id: "btech-ece-vlsi",
      title: "B.Tech ECE (VLSI Design & Embedded Systems)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Dedicated specialization covering semiconductor physics, FPGA design, CMOS digital integrated circuits, and SoC verification.",
      image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "CMOS Circuit Design",
        "Verilog/VHDL & FPGA",
        "SoC Verification",
        "Semiconductor Fabrication"
      ],
      syllabusUrl: "/courses/soict/ece/btech-ece-vlsi-structure-2026-30.pdf",
      syllabus: [
        { session: "2026-30", url: "/courses/soict/ece/btech-ece-vlsi-structure-2026-30.pdf" },
        { session: "2025-29", url: "/courses/soict/ece/btech-ece-vlsi-structure-2025-29.pdf" },
        { session: "2024-28", url: "/courses/soict/ece/btech-ece-vlsi-structure-2024-28.pdf" }
      ]
    },
    {
      id: "int-btech-mtech-ece",
      title: "Integrated B.Tech.-M.Tech. (ECE)",
      level: "Integrated",
      duration: "5 Years",
      intake: "30 Students",
      description: "Comprehensive 5-year integrated dual degree providing seamless progression into advanced telecommunication systems and VLSI research.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Integrated Dual Degree",
        "Wireless Communication Lab",
        "VLSI Research",
        "Master Thesis"
      ],
      syllabusUrl: "/courses/soict/ece/int-btech-mtech-structure-2022-27.pdf",
      syllabus: [
        { session: "2022-27", url: "/courses/soict/ece/int-btech-mtech-structure-2022-27.pdf" }
      ]
    },
    {
      id: "mtech-ece-wireless",
      title: "M.Tech ECE (Wireless Communication & Networks)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Cutting-edge curriculum covering 5G/6G systems, optical communications, MIMO architectures, and software-defined networks.",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-600 to-blue-700",
      highlights: [
        "5G & Beyond Wireless Networks",
        "MIMO & Beamforming",
        "Optical Communications",
        "Network Simulation Labs"
      ],
      syllabusUrl: "/courses/soict/ece/mtech-ece-wcn-structure-2026-28.pdf",
      syllabus: [
        { session: "2026-28", url: "/courses/soict/ece/mtech-ece-wcn-structure-2026-28.pdf" }
      ]
    },
    {
      id: "mtech-ece-vlsi",
      title: "M.Tech ECE (VLSI Design)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Comprehensive microelectronics curriculum encompassing low-power design, analog IC layout, physical design, and ASIC flow.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-600 to-pink-700",
      highlights: [
        "Analog & Mixed-Signal ICs",
        "Digital ASIC Implementation",
        "Cadence / Synopsys EDA Tools",
        "VLSI Testing & Fault Modeling"
      ],
      syllabusUrl: "/courses/soict/ece/mtech-ece-vlsi-structure-2026-28.pdf",
      syllabus: [
        { session: "2026-28", url: "/courses/soict/ece/mtech-ece-vlsi-structure-2026-28.pdf" }
      ]
    },
    {
      id: "mtech-ece-iot",
      title: "M.Tech ECE (IoT and Robotics)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Advanced master specialization in Internet of Things hardware architectures, robotic actuation, sensor networks, and edge automation.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-600 to-cyan-700",
      highlights: [
        "IoT Hardware Design",
        "Robotics & Actuation",
        "Sensor Integration",
        "Edge Microcontrollers"
      ],
      syllabusUrl: "/courses/soict/ece/mtech-ece-iot-structure-2026-28.pdf",
      syllabus: [
        { session: "2026-28", url: "/courses/soict/ece/mtech-ece-iot-structure-2026-28.pdf" }
      ]
    },
    {
      id: "mtech-ece-railway",
      title: "M.Tech ECE (Railway Signaling, Telecom & RAMS)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Specialized postgraduate program covering modern train control, interlocking systems, railway telecom, and RAMS safety standards.",
      image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-600 to-teal-700",
      highlights: [
        "Railway Interlocking Systems",
        "RAMS Safety Standards",
        "Train Control & SCADA",
        "Rail Telecommunication"
      ],
      syllabusUrl: "/courses/soict/ece/mtech-ece-wcn-structure-2026-28.pdf",
      syllabus: [
        { session: "Master Scheme", url: "/courses/soict/ece/mtech-ece-wcn-structure-2026-28.pdf" }
      ]
    },
    {
      id: "phd-ece",
      title: "Ph.D. in Electronics & Communication",
      level: "Doctoral",
      duration: "3-5 Years",
      intake: "10 Students",
      description: "Doctoral research program promoting original scientific contributions in communications, microelectronics, and signal processing.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-600 to-emerald-700",
      highlights: [
        "Doctoral Research",
        "Peer-Reviewed Journal Publications",
        "Specialized Labs",
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
      name: "Dr. Mangal Das",
      position: "Assistant Professor",
      specialization: "Semiconductor Fabrication Nanotechnology Robotics AI/ML",
      email: "mangal.das@gbu.ac.in",
      achievements: "Indian Institute of Technology Indore",
      image: "https://faculty.gbu.ac.in/uploads/photos/676049327abf5_Mangal_Das_2024-min.JPG",
      color: "from-pink-500 to-pink-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Navaid Zafar Rizvi",
      position: "Assistant Professor",
      specialization:
        "Machine Intelligence for ICs, MEMS/VLSI Design, Antenna & Microwave Techniques & RF Technology, Microsystems Fabrication",
      email: "navaid@gbu.ac.in",
      achievements:
        "PhD , M.S- Inf. & Comm. Engg. (TUD-Darmstadt, Germany), M.S- Microsystems Engg. (HFU, Germany)",
      image: "https://faculty.gbu.ac.in/uploads/photos/66066a93789f0_navaid-rizvi.jpg",
      color: "from-yellow-500 to-yellow-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Priyanka Goyal",
      position: "Assistant Professor",
      specialization:
        "Field of teaching- Basic electronics, Analog Communication, Network Analysis and Synthesis, VHDL, Verilog, Low Power VLSI, Automation and Physical Design, Principles",
      email: "priyankag@gbu.ac.in",
      achievements: "PhD (2018) in Optoelectronics and VLSI (On-chip optical interconnects)",
      image: "https://faculty.gbu.ac.in/uploads/photos/66052fa591258_priyankag.jpg",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Dr. Rajesh Mishra",
      position: "Assistant Professor",
      specialization: "Networks, Signal Processing, Communication Systems, Reliability Engineering, RAMS",
      email: "rmishra@gbu.ac.in",
      achievements: "B.E. (Electronics Engineering), M. Tech. & Ph.D. (IIT Kharagpur)",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c341c729a98_rajesh%20photo.jpg",
      color: "from-orange-500 to-orange-600",
    }
  ],
  facultyStats: {
    text: "Our department boasts 40+ dedicated faculty members contributing to diverse domains of ECE.",
    stats: [
      {
        icon: BookOpen,
        value: "400+",
        label: "Research Papers",
        bg: "bg-pink-50",
        color: "text-pink-600",
      },
      {
        icon: Award,
        value: "40+",
        label: "Awards",
        bg: "bg-yellow-50",
        color: "text-yellow-600",
      },
      {
        icon: null,
        custom: "PhD",
        value: "95%",
        label: "PhD Faculty",
        bg: "bg-green-50",
        color: "bg-green-600",
      },
      {
        icon: null,
        custom: "Exp",
        value: "12+",
        label: "Avg Experience",
        bg: "bg-orange-50",
        color: "bg-orange-600",
      }
    ],
  },
  researchAreas: [],
  researchStats: [],
  topAchievers: [],
  achievements: [],
};
