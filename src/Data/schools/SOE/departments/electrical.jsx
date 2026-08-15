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
        id: "btech-ee",
        title: "B.Tech Electrical Engineering",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Power generation, smart grid distribution, control systems, and renewable energy integration.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-amber-600",
        highlights: [
            "Power Systems & High Voltage",
            "Electric Drives & Machines",
            "Smart Grids & Renewables",
            "Control Automation"
        ],
        syllabusUrl: "/schools/electrical/BTech_4Year_ElectricalEngg_May2023.pdf",
        syllabus: [
            {
                session: "2023-24",
                url: "/schools/electrical/BTech_4Year_ElectricalEngg_May2023.pdf"
            }
        ]
    },
    {
        id: "btech-ee-comp",
        title: "B.Tech Electrical & Computer Engineering",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Interdisciplinary blend of electrical hardware systems with computer architecture, networking, and robotics.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-500 to-indigo-600",
        highlights: [
            "Computer Architecture",
            "Embedded Control Systems",
            "Robotics & Cybernetics",
            "Power Electronic Hardware"
        ],
        syllabusUrl: "/schools/electrical/4yrBTech_Electrical_CompEngg_May2023.pdf",
        syllabus: [
            {
                session: "2023-24",
                url: "/schools/electrical/4yrBTech_Electrical_CompEngg_May2023.pdf"
            }
        ]
    },
    {
        id: "int-btech-mtech-ee",
        title: "Integrated B.Tech-M.Tech / MBA (Electrical)",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "30 Students",
        description: "Comprehensive 5-year integrated program leading to dual engineering or technical management qualification.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-purple-600",
        highlights: [
            "Advanced Power Electronics",
            "Energy Storage Systems",
            "Techno-Commercial Management",
            "Industry Master Thesis"
        ],
        syllabusUrl: "/schools/electrical/IntegratedBTech_MTech_MBA_May2023.pdf",
        syllabus: [
            {
                session: "2023-24",
                url: "/schools/electrical/IntegratedBTech_MTech_MBA_May2023.pdf"
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
