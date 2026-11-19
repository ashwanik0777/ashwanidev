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
  aboutProps: null,
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
      syllabusUrl: "/courses/soe/civil/btech-civil-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (April 2023)",
          url: "/courses/soe/civil/btech-civil-structure-2023.pdf"
        },
        {
          session: "Syllabus (April 2023)",
          url: "/courses/soe/civil/btech-civil-syllabus-2023.pdf"
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
        "Master Dissertation"
      ],
      syllabusUrl: "/courses/soe/civil/mtech-civil-structural-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (May 2023)",
          url: "/courses/soe/civil/mtech-civil-structural-structure-2023.pdf"
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
        "Urban Transit Planning"
      ],
      syllabusUrl: "/courses/soe/civil/mtech-civil-transportation-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (May 2023)",
          url: "/courses/soe/civil/mtech-civil-transportation-structure-2023.pdf"
        }
      ]
    },
    {
      id: "mtech-construction-mgmt",
      title: "M.Tech. (Construction Technology and Management)",
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
      syllabusUrl: "/courses/soe/civil/mtech-civil-construction-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (May 2023)",
          url: "/courses/soe/civil/mtech-civil-construction-structure-2023.pdf"
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
      syllabusUrl: "/courses/soe/civil/mtech-civil-geotechnical-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (May 2023)",
          url: "/courses/soe/civil/mtech-civil-geotechnical-structure-2023.pdf"
        }
      ]
    },
    {
      id: "barch-program",
      title: "Bachelor of Architecture (B.Arch.)",
      level: "UG",
      duration: "5 Years",
      intake: "40 Students",
      description: "Council of Architecture (COA) approved program covering architectural design, building construction, climate-responsive design, and urban planning.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-600 to-blue-700",
      highlights: [
        "Architectural Studio Design",
        "Sustainable Building Systems",
        "Heritage Conservation",
        "COA Approved Scheme"
      ],
      syllabusUrl: "/courses/soe/architecture/barch-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (2023 Scheme)",
          url: "/courses/soe/architecture/barch-structure-2023.pdf"
        }
      ]
    },
    {
      id: "bdes-interior-program",
      title: "Bachelor of Design (Interior Design)",
      level: "UG",
      duration: "4 Years",
      intake: "30 Students",
      description: "Professional undergraduate curriculum in spatial design, furniture styling, ergonomic interiors, lighting, and acoustic planning.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-600 to-pink-600",
      highlights: [
        "Spatial Planning & Interiors",
        "Furniture & Ergonomics",
        "Lighting & Acoustic Systems",
        "Interior Materials"
      ],
      syllabusUrl: "/courses/soe/architecture/bdes-interior-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (2023 Scheme)",
          url: "/courses/soe/architecture/bdes-interior-structure-2023.pdf"
        }
      ]
    },
    {
      id: "mplan-murp-program",
      title: "Master of Urban and Regional Planning (M.Plan / MURP)",
      level: "PG",
      duration: "2 Years",
      intake: "20 Students",
      description: "Postgraduate degree preparing urban planning specialists for smart cities, regional economic development, transport networks, and environmental policies.",
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-600 to-emerald-700",
      highlights: [
        "Smart City Development",
        "GIS & Urban Analysis",
        "Regional Infrastructure",
        "Master Thesis"
      ],
      syllabusUrl: "/courses/soe/architecture/mplan-murp-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (2023 Scheme)",
          url: "/courses/soe/architecture/mplan-murp-structure-2023.pdf"
        }
      ]
    },
    {
      id: "phd-civil-engg",
      title: "Ph.D. in Civil Engineering",
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
      syllabusUrl: "/courses/soe/civil/btech-civil-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/soe/civil/btech-civil-structure-2023.pdf"
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
  researchStats: null,
  topAchievers: null,
  achievements: null,
};
