import { Building, Ruler, Droplets, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOE",
  departmentId: "civil",
  heroProps: {
    title: "Department of Civil Engineering",
    highlight: "Civil Engineering",
    subtitle:
      "Building the Infrastructure of Tomorrow — Excellence in structural, geotechnical, environmental, and transportation engineering.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Building,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Structural Engineering",
        description: "Earthquake engineering, bridge design, and smart structures",
      },
      {
        icon: Droplets,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        subtitle: "Environmental Engineering",
        description: "Water treatment, waste management, and sustainability",
      },
      {
        icon: Ruler,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Transportation",
        description: "Highway design, traffic engineering, and pavement technology",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Civil Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Shobha Ram",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Civil Engineering at the School of Engineering, Gautam Buddha University. Civil Engineering is the oldest and most diverse engineering discipline, and our department is committed to preparing engineers who can design and manage infrastructure for a sustainable future.",
      "We offer B.Tech, M.Tech, and Ph.D programs with specializations in Structural, Environmental, Geotechnical, Transportation, and Construction Management. Our labs are equipped with modern testing and surveying equipment.",
      "Our faculty are engaged in cutting-edge research on earthquake-resistant design, IoT-based structural monitoring, green building, and water quality management. We maintain industry partnerships with L&T, NHAI, and CPWD.",
      "Join us in building a better world through engineering excellence.",
    ],
    contact: {
      name: "Dr. Shobha Ram",
      designation: "Head of Department - Civil Engineering",
      email: "hod.civil@gbu.ac.in",
      phone: "0120-234-9912",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Civil Engineering prepares engineers for infrastructure development, urban planning, and sustainable construction.",
    stats: [
      { icon: Users, numberText: "200+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "13+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "8+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "2+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Comprehensive Programs",
        description:
          "B.Tech, M.Tech in 5 specializations, and Ph.D programs covering all major civil engineering domains with field visits and industry internships.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research Excellence",
        description:
          "Active research in earthquake engineering, smart structures, green building, BIM, and environmental conservation with DST and HUDCO funding.",
        dotColor: "#06b6d4",
      },
      {
        title: "Industry Connect",
        description:
          "Strong relationships with L&T Construction, NHAI, CPWD, and state PWD departments for placements, internships, and live projects.",
        dotColor: "#6366f1",
      },
    ],
    vision:
      "To be a leading center of excellence in civil engineering education, research, and sustainable infrastructure development.",
    missionPoints: [
      "Provide quality education in civil engineering and allied fields",
      "Conduct impactful research in structural, environmental, and geotechnical engineering",
      "Foster sustainable construction practices and green building technologies",
      "Build strong industry-academia partnerships for student development",
      "Contribute to national infrastructure development through skilled engineers",
    ],
  },
  programsData: [
    {
        id: "btech-civil-engg",
        title: "B.Tech (Civil Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Core curriculum in structural mechanics, survey engineering, soil mechanics, environmental engineering, and hydraulics.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-500 to-teal-600",
        highlights: [
            "Structural Mechanics & Design",
            "Geotechnical Engineering",
            "Transportation & Highways",
            "Surveying & GIS"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1w9JFOjXlgh7tUemeCkHMs4GdH7ffltvj",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1w9JFOjXlgh7tUemeCkHMs4GdH7ffltvj"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1w9JFOjXlgh7tUemeCkHMs4GdH7ffltvj"
            }
        ]
    },
    {
        id: "mtech-civil-general",
        title: "M.Tech. (Civil Engineering)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced study of advanced structural analysis, environmental hydrology, foundation design, and construction planning.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-emerald-700",
        highlights: [
            "Advanced Structural Analysis",
            "Hydrologic Systems",
            "Foundation Design",
            "Master Thesis"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v"
            }
        ]
    },
    {
        id: "mtech-environmental-engg",
        title: "M.Tech. (Environmental Engineering)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Focuses on wastewater treatment plant design, air quality modeling, environmental impact assessment (EIA), and solid waste.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-700",
        highlights: [
            "Wastewater Plant Engineering",
            "Air Quality Modeling",
            "EIA & Environmental Auditing",
            "Solid Waste Systems"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI"
            }
        ]
    },
    {
        id: "mtech-structural-engg",
        title: "M.Tech. (Structural Engineering)",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Specialized postgraduate program in earthquake-resistant design, prestressed concrete, steel structures, and FEM modeling.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Earthquake Resilient Design",
            "Prestressed Concrete",
            "FEM Structural Modeling",
            "Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1fG3-xe3hVly3MRg4_1f_-hcYijWpi79v"
            }
        ]
    },
    {
        id: "mtech-transportation-engg",
        title: "M.Tech. (Transportation Engineering)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced highway geometric design, traffic flow theory, pavement management systems, and urban transit planning.",
        image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-600 to-teal-800",
        highlights: [
            "Pavement Analysis & Design",
            "Traffic Flow Modeling",
            "Intelligent Transportation (ITS)",
            "Urban Transit"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1Vkc8CMaQQIVvoYM0F75sL4Mu_g7P_cOI",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1Vkc8CMaQQIVvoYM0F75sL4Mu_g7P_cOI"
            }
        ]
    },
    {
        id: "mtech-construction-mgmt",
        title: "M.Tech. (Construction Management)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Covers project scheduling (Primavera/MS Project), construction economics, contract administration, and BIM workflows.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-orange-700",
        highlights: [
            "Project Scheduling & BIM",
            "Construction Finance & Contracts",
            "Safety Engineering",
            "Site Management"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI"
            }
        ]
    },
    {
        id: "mtech-geotechnical-engg",
        title: "M.Tech. (Geotechnical and Geoenvironmental Engineering)",
        level: "PG",
        duration: "2 Years",
        intake: "20 Students",
        description: "Advanced soil dynamics, slope stability, deep foundations, tunneling mechanics, and containment landfill design.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-cyan-700",
        highlights: [
            "Deep Foundation Engineering",
            "Slope Stability & Tunneling",
            "Soil Dynamics",
            "Geoenvironmental Barriers"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI"
            }
        ]
    },
    {
        id: "phd-civil-engg",
        title: "Ph.D. (Civil Engg.)",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Doctoral research program promoting original innovations in structural dynamics, water resources, GIS, and smart materials.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-700",
        highlights: [
            "Doctoral Coursework",
            "Heavy Structures Lab",
            "Journal Publications",
            "Defense"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1dA6bQVyU_7OE7-ZpxI8kajyAuMFKJVEI"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 13+ faculty members with expertise across all civil engineering domains.",
    stats: [
      { icon: BookOpen, numberText: "50+", subtitle: "Research Papers", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: Award, numberText: "4+", subtitle: "Awards", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-cyan-50", color: "text-cyan-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-purple-50", color: "text-purple-600" },
    ],
  },
  researchStats: [
    { numberText: "8+", subtitle: "Research Projects" },
    { numberText: "₹1Cr+", subtitle: "Research Funding" },
    { numberText: "50+", subtitle: "Publications" },
    { numberText: "2+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Priya Singh",
      year: "B.Tech CE 2024",
      achievement: "Placed at L&T Construction, GATE qualified",
      image: "https://randomuser.me/api/portraits/women/60.jpg",
      skills: ["Structural Design", "STAAD Pro", "AutoCAD", "Project Management"],
    },
    {
      name: "Arun Pratap",
      year: "M.Tech Structural 2024",
      achievement: "Published 3 papers, placed at NHAI",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      skills: ["Earthquake Engineering", "FEM", "BIM", "Research"],
    },
  ],
  achievements: [
    {
      title: "HUDCO Research Grant",
      description: "Funded research on earthquake-resistant low-cost housing",
      icon: Award,
      color: "text-blue-600",
    },
    {
      title: "ASCE Student Chapter",
      description: "Active chapter organizing national bridge design competitions",
      icon: BookOpen,
      color: "text-indigo-600",
    },
    {
      title: "Industry MoU",
      description: "MoU with L&T Construction for internships and joint research",
      icon: Lightbulb,
      color: "text-cyan-600",
    },
    {
      title: "Government Placements",
      description: "Students placed at NHAI, CPWD, and state PWD departments",
      icon: GraduationCap,
      color: "text-purple-600",
    },
  ],
};
