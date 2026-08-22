import { Zap, Battery, CircuitBoard, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOE",
  departmentId: "electrical",
  heroProps: {
    title: "Department of Electrical Engineering",
    highlight: "Electrical Engineering",
    subtitle:
      "Powering the Future with Smart Energy Solutions — Excellence in power systems, control, electronics, and renewable energy.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Zap,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Power Systems",
        description: "Smart grid, renewable integration, and power quality",
      },
      {
        icon: Battery,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Electric Vehicles",
        description: "EV drivetrain, battery management, and charging infrastructure",
      },
      {
        icon: CircuitBoard,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        subtitle: "Control Systems",
        description: "PLC, SCADA, robotics, and industrial automation",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Electrical Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/660531910b2a4_omveer.singh.jpg",
    name: "Dr. Omveer Singh",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Electrical Engineering at the School of Engineering, Gautam Buddha University. Electrical Engineering is the cornerstone of modern civilization, powering everything from homes to industries, and our department is at the forefront of this evolution.",
      "We offer a wide range of programs including B.Tech, M.Tech with multiple specializations, integrated dual-degree, and Ph.D programs. Our curriculum is designed to cover power systems, electronics, control, instrumentation, and emerging areas like electric vehicles and renewable energy.",
      "Our faculty are actively researching in areas such as smart grid technology, AI-based battery management, power electronics, and solar energy integration. We maintain partnerships with Siemens, ABB, and Schneider Electric.",
      "I invite you to join us in shaping the future of energy and technology.",
    ],
    contact: {
      name: "Dr. Omveer Singh",
      designation: "Head of Department - Electrical Engineering",
      email: "hod.ee@gbu.ac.in",
      phone: "0120-234-9913",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Electrical Engineering offers cutting-edge programs in power, electronics, control, and renewable energy.",
    stats: [
      { icon: Users, numberText: "300+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "16+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "10+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "2+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Diverse Programs",
        description:
          "B.Tech with 5+ specialization tracks, integrated dual-degree, M.Tech in 3 specializations, and Ph.D — covering the full spectrum of electrical engineering.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research Impact",
        description:
          "Funded research in EV battery management, smart grid, solar PV integration, and power electronics with DST-SERB and MNRE support.",
        dotColor: "#8b5cf6",
      },
      {
        title: "Industry Excellence",
        description:
          "Collaborations with Siemens, ABB, Schneider Electric, NTPC, and BHEL for labs, internships, and recruitment.",
        dotColor: "#06b6d4",
      },
    ],
    vision:
      "To be a premier electrical engineering department driving innovation in power systems, renewable energy, and smart technology.",
    missionPoints: [
      "Provide quality education in electrical and electronics engineering",
      "Conduct cutting-edge research in power, control, and renewable energy",
      "Foster industry partnerships for experiential learning",
      "Develop skilled professionals for the energy and technology sector",
      "Promote entrepreneurship and innovation in electrical engineering",
    ],
  },
  programsData: [
    {
        id: "int-btech-mtech-ee",
        title: "Integrated B.Tech. + M.Tech./MBA (Electrical Engineering)",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "30 Students",
        description: "Integrated dual-degree covering power systems, advanced control, electrical drives, and managerial principles.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Power Grid Design",
            "Electrical Drives & SCADA",
            "Industrial Management",
            "Master Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1LdsudTOyOXLg2R3wuHbT4GkD8DzqEsb7/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1LdsudTOyOXLg2R3wuHbT4GkD8DzqEsb7/preview"
            }
        ]
    },
    {
        id: "btech-electrical-engg",
        title: "B.Tech (Electrical Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Core curriculum in power systems, electrical machines, power electronics, transmission networks, and microcontrollers.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-cyan-600",
        highlights: [
            "Electrical Machines",
            "Power Electronics",
            "Smart Grid Technologies",
            "Control Systems"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1quWxG8TqAWHYGySgr4_Sd_vQT1ytE-A4/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1quWxG8TqAWHYGySgr4_Sd_vQT1ytE-A4/preview"
            }
        ]
    },
    {
        id: "btech-ee-comp-engg",
        title: "B.Tech. (Electrical and Computer Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Interdisciplinary study combining electrical hardware, embedded architectures, computer networks, and software engineering.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-500 to-blue-600",
        highlights: [
            "Embedded Systems",
            "Computer Architecture",
            "Digital Electronics",
            "Network Protocols"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1R5PaVLEXKcYdEz2Ka4dR2FzgIf5e5s2W/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1R5PaVLEXKcYdEz2Ka4dR2FzgIf5e5s2W/preview"
            }
        ]
    },
    {
        id: "btech-ee-specializations",
        title: "B.Tech Electrical Engineering (Specializations in EV, AI/ML, Automation)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Specialized tracks in Industrial Automation, Electric Vehicles (EV), AI & Machine Learning, and Biomedical Engineering.",
        image: "https://images.unsplash.com/photo-1558441719-8b489c652756?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-500 to-teal-600",
        highlights: [
            "Electric Vehicle Powertrains",
            "Industrial PLC & SCADA",
            "AI & ML for Grids",
            "Biomedical Instrumentation"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1h2m3sAzpK04jQ48ZeouoT8pgDhkfN9o0/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1h2m3sAzpK04jQ48ZeouoT8pgDhkfN9o0/preview"
            }
        ]
    },
    {
        id: "btech-robotics-ai",
        title: "B.Tech. in Robotics and Artificial Intelligence",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Cutting-edge curriculum covering autonomous robotics, computer vision, kinematics, reinforcement learning, and ROS.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-indigo-600",
        highlights: [
            "Robot Kinematics & ROS",
            "Computer Vision",
            "Autonomous Navigation",
            "Sensors & Actuators"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1bezOBv5sgfXewlsmh6rTTacgnfTmnvHQ/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1bezOBv5sgfXewlsmh6rTTacgnfTmnvHQ/preview"
            }
        ]
    },
    {
        id: "btech-eee",
        title: "B.Tech. (Electrical and Electronics Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Dual focus on heavy electrical transmission systems alongside microelectronics, signal processing, and VLSI.",
        image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-teal-600",
        highlights: [
            "Analog & Digital VLSI",
            "Power Transmission",
            "Signal Processing",
            "Solid State Devices"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1elB79U25_ke1cjwLBMzvt8INmUaXHPRu/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1elB79U25_ke1cjwLBMzvt8INmUaXHPRu/preview"
            }
        ]
    },
    {
        id: "mtech-ee-inst-ctrl",
        title: "M.Tech. (Instrumentation and Control)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced industrial instrumentation, adaptive control theory, transducer design, and automated sensor networks.",
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-cyan-700",
        highlights: [
            "Industrial Transducers",
            "Optimal Control Theory",
            "DCS & PLC Automation",
            "Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1vLu2Y4wW2uobtWNZgPfohujNpor9OM0X/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1vLu2Y4wW2uobtWNZgPfohujNpor9OM0X/preview"
            }
        ]
    },
    {
        id: "mtech-ee-ctrl-robotics",
        title: "M.Tech. (Control and Robotics)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced robotic manipulator design, non-linear control systems, SLAM algorithms, and robotic vision.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-600 to-indigo-700",
        highlights: [
            "Non-Linear Control",
            "Robot Dynamics",
            "Autonomous SLAM",
            "Master Research"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1wT_2Nzrj-FVL69n71JY6EQxn9jcIoJgl/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1wT_2Nzrj-FVL69n71JY6EQxn9jcIoJgl/preview"
            }
        ]
    },
    {
        id: "mtech-ee-specializations",
        title: "M.Tech in Electrical Engineering (RES, PS, I&C, PED, C&R, ISP)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Specialized postgraduate streams in Renewable Energy, Power Systems, Power Electronics & Drives, and Signal Processing.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Renewable Energy Systems",
            "Power Electronic Converters",
            "Grid Stability Analysis",
            "DSP Processors"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1iORezwqt2sUFUzy5Ft3NWawzCjj2LyQ0/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1iORezwqt2sUFUzy5Ft3NWawzCjj2LyQ0/preview"
            }
        ]
    },
    {
        id: "mtech-ee-power-energy",
        title: "M.Tech. (Power System and Energy Management)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Focuses on modern energy auditing, deregulation, renewable integration, HVDC transmission, and smart grid security.",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-orange-700",
        highlights: [
            "Energy Auditing & Management",
            "HVDC Transmission",
            "Smart Grid Architecture",
            "Microgrids"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1WsflSaPol73VlWlVxpm0m82UUS9rqqwv/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1WsflSaPol73VlWlVxpm0m82UUS9rqqwv/preview"
            }
        ]
    },
    {
        id: "mtech-ee-working-prof",
        title: "M.Tech Electrical Engineering (Weekend Program for Working Professionals)",
        level: "PG (Working Exec)",
        duration: "3 Years",
        intake: "30 Students",
        description: "Weekend executive postgraduate program designed for industry engineers covering Power Systems, Drives, and Automation.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-slate-600 to-slate-800",
        highlights: [
            "Weekend Delivery Model",
            "Industry Project Track",
            "Power Drives & Control",
            "Executive Certification"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1X8z3HVZ7KfCqeAYMPc_Ph_IkGv3I8LMI/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1X8z3HVZ7KfCqeAYMPc_Ph_IkGv3I8LMI/preview"
            }
        ]
    },
    {
        id: "phd-electrical-engg",
        title: "Ph.D. (Electrical and Electronics Engg.)",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Doctoral research program promoting original innovations in renewable grids, high-voltage engineering, and smart sensors.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-700",
        highlights: [
            "Independent Research",
            "Journal Publications",
            "High-Voltage Labs",
            "Doctoral Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/129ZQOdUnEtJAUcan1yBFMts8HILSooY-/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/129ZQOdUnEtJAUcan1yBFMts8HILSooY-/preview"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 16+ faculty members with expertise in power, control, electronics, and renewable energy.",
    stats: [
      { icon: BookOpen, numberText: "60+", subtitle: "Research Papers", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: Award, numberText: "6+", subtitle: "Awards", bg: "bg-purple-50", color: "text-purple-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-cyan-50", color: "text-cyan-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-indigo-50", color: "text-indigo-600" },
    ],
  },
  researchStats: [
    { numberText: "10+", subtitle: "Research Projects" },
    { numberText: "₹1.5Cr+", subtitle: "Research Funding" },
    { numberText: "60+", subtitle: "Publications" },
    { numberText: "2+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Amit Verma",
      year: "B.Tech EE 2024",
      achievement: "Placed at Siemens with 18 LPA package",
      image: "https://randomuser.me/api/portraits/men/62.jpg",
      skills: ["Power Systems", "MATLAB", "PLC", "Smart Grid"],
    },
    {
      name: "Neha Gupta",
      year: "M.Tech Power Systems 2024",
      achievement: "Placed at NTPC, published 4 IEEE papers",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
      skills: ["Power Analysis", "Renewable Energy", "SCADA", "Research"],
    },
  ],
  achievements: [
    {
      title: "DST-SERB Grant",
      description: "Funded project on AI-based EV battery management system",
      icon: Award,
      color: "text-blue-600",
    },
    {
      title: "MNRE Research",
      description: "Smart grid integration of solar PV with battery storage",
      icon: BookOpen,
      color: "text-purple-600",
    },
    {
      title: "IEEE Chapter",
      description: "Active IEEE student chapter organizing national events",
      icon: Lightbulb,
      color: "text-cyan-600",
    },
    {
      title: "Industry Partnerships",
      description: "MoU with Siemens for smart grid lab equipment and training",
      icon: GraduationCap,
      color: "text-indigo-600",
    },
  ],
};
