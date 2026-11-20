import { Building2, Compass, Palette, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOE",
  departmentId: "architecture",
  heroProps: {
    title: "Department of Architecture & Regional Planning",
    highlight: "Architecture & Regional Planning",
    subtitle:
      "Shaping Sustainable Built Environments — Excellence in architectural design, sustainable planning, interior design, and smart city infrastructure.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Building2,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Architectural Design",
        description: "Sustainable building systems, vernacular architecture, and Council of Architecture (COA) standards",
      },
      {
        icon: Compass,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Urban & Regional Planning",
        description: "Smart city infrastructure, transit-oriented development, and regional GIS modeling",
      },
      {
        icon: Palette,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Interior & Spatial Design",
        description: "Ergonomics, acoustic architecture, adaptive reuse, and environmental lighting",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Coordinator, Architecture & Regional Planning",
    image: "https://faculty.gbu.ac.in/uploads/photos/6605308e35d32_nirmitamehrotra.jpg",
    name: "Ar. Nirmita Mehrotra",
    designation: "Assistant Professor & In-charge",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Architecture and Regional Planning at the School of Engineering, Gautam Buddha University. Architecture is the bridge between art, science, and society, shaping the spaces in which humanity lives, works, and thrives.",
      "Our department offers Council of Architecture (COA) recognized programs including Bachelor of Architecture (B.Arch.), Bachelor of Design (B.Des Interior Design), Master of Urban & Regional Planning (M.Plan/MURP), and Ph.D. in Architecture & Regional Planning. Our studio-centric pedagogy equips students with strong theoretical understanding, hand-drawn detailing, parametric digital modeling, and site execution skills.",
      "We emphasize sustainable and climate-responsive architecture, heritage conservation, smart city planning, and resilient regional habitats. Our students regularly participate in national design competitions, NASA conventions, and collaborative planning workshops.",
      "I welcome you to join our vibrant creative community and design the sustainable habitats of tomorrow.",
    ],
    contact: {
      name: "Ar. Nirmita Mehrotra",
      designation: "Assistant Professor & In-charge - Architecture & Regional Planning",
      email: "nirmita.mehrotra@gbu.ac.in",
      phone: "0120-2346043",
    },
  },
  aboutProps: null,
  programsData: [
    {
      id: "barch-program",
      title: "Bachelor in Architecture (B. Arch.)",
      level: "UG",
      duration: "5 Years",
      intake: "40 Students",
      description: "Council of Architecture (COA) approved professional degree covering architectural design studios, construction technology, structural systems, climatology, and professional practice.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-600 to-blue-700",
      highlights: [
        "Architectural Design Studios",
        "COA Approved Curriculum",
        "Climate Responsive Architecture",
        "Professional Internship & Thesis"
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
      description: "Professional undergraduate curriculum in spatial interior planning, furniture ergonomics, acoustic styling, sustainable interior materials, and modern lighting systems.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-600 to-pink-600",
      highlights: [
        "Spatial Planning & Ergonomics",
        "Furniture & Material Styling",
        "Lighting & Acoustic Systems",
        "Interior Design Studio"
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
      description: "Postgraduate degree preparing planning professionals in smart city development, regional GIS analysis, transportation networks, environmental policy, and urban governance.",
      image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-600 to-emerald-700",
      highlights: [
        "Smart City Planning",
        "Regional GIS Spatial Modeling",
        "Urban Transport Systems",
        "Master Planning Thesis"
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
      id: "phd-architecture-planning",
      title: "Ph.D. in Architecture & Regional Planning",
      level: "Doctoral",
      duration: "3-5 Years",
      intake: "10 Students",
      description: "Doctoral research program advancing original scholarship in sustainable architecture, urban conservation, climate resilience, and smart habitat technologies.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-600 to-indigo-800",
      highlights: [
        "Advanced Doctoral Research",
        "Sustainable Built Environment",
        "Indexed Publications",
        "Doctoral Defense"
      ],
      syllabusUrl: "/courses/soe/architecture/barch-structure-2023.pdf",
      syllabus: [
        {
          session: "Doctoral Coursework",
          url: "/courses/soe/architecture/barch-structure-2023.pdf"
        }
      ]
    }
  ],
  facultyStats: {
    text: "Our department has experienced faculty members in architectural design, regional planning, and interior architecture.",
    stats: [
      { icon: BookOpen, numberText: "30+", subtitle: "Research Papers", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: Award, numberText: "5+", subtitle: "Design Awards", bg: "bg-purple-50", color: "text-purple-600" },
      { icon: GraduationCap, custom: "COA", numberText: "100%", subtitle: "COA Registered", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-teal-50", color: "text-teal-600" },
    ],
  },
  researchStats: null,
  topAchievers: null,
  achievements: null,
};
