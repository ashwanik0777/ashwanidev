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
      title: "B.Tech Civil Engineering",
      duration: "4 Years",
      intake: "55 Students",
      description:
        "Comprehensive program covering structural, geotechnical, environmental, and transportation engineering.",
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Structural Analysis", "Concrete Technology", "Soil Mechanics", "Surveying",
        "Environmental Engineering", "Transportation", "BIM", "Site Visit",
      ],
      syllabusUrl: "/schools/civil/Syllabus_CivilEngg_April23.pdf",
      syllabus: [
        {
                session: "2023-24",
                url: "/schools/civil/Syllabus_CivilEngg_April23.pdf"
        }
],
    },
    {
      title: "M.Tech Structural Engineering",
      duration: "2 Years",
      intake: "12 Students",
      description:
        "Advanced study in structural analysis, earthquake engineering, bridge design, and BIM technology.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "Advanced Structural Analysis", "Earthquake Engineering", "Bridge Design",
        "BIM Technology", "Pre-Stressed Concrete", "FEM", "Research Thesis", "Industry Project",
      ],
      syllabusUrl: "/schools/civil/M.Tech_StructuralEngg_CStr_May2023.pdf",
      syllabus: [
        {
                session: "2023-24",
                url: "/schools/civil/M.Tech_StructuralEngg_CStr_May2023.pdf"
        }
],
    },
    {
      title: "M.Tech Environmental Engineering",
      duration: "2 Years",
      intake: "10 Students",
      description:
        "Specialization in water treatment, waste management, air pollution control, and environmental impact assessment.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-500 to-cyan-600",
      highlights: [
        "Water Treatment", "Waste Management", "Air Pollution Control", "EIA",
        "Wastewater Engineering", "Solid Waste", "Research Project", "Field Work",
      ],
      syllabusUrl: "/schools/civil/Mtech_Geotechnical_GeoEnvrtEnggCStr_May2023.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. in Civil Engineering",
      duration: "3-5 Years",
      intake: "8 Students",
      description:
        "Research in structural, geotechnical, environmental, and smart infrastructure engineering.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Independent Research", "Advanced Coursework", "Journal Publications",
        "Conference Presentations", "Teaching Assistantship", "Industry Collaboration",
        "Patent Filing", "Thesis Defense",
      ],
      syllabusUrl: "/schools/civil/CourseStr_CivilEngg_April23.pdf",
      syllabus: [],
    },
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
