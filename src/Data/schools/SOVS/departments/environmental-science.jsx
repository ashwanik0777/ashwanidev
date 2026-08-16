import { Globe, Leaf, Compass, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "environmental-science",
  heroProps: {
    title: "Department of Environmental Sciences",
    highlight: "Environmental Sciences",
    subtitle:
      "Advancing environmental conservation and sustainable resource management — High-impact research in pollution control, geochemistry, and environmental impact assessment since 2012.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        subtitle: "Global Ecology",
        description: "Climate change impact modeling, ecosystem analysis, and biodiversity mapping",
      },
      {
        icon: Leaf,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Pollution Control",
        description: "Water purification, heavy metal remediation, and soil conservation",
      },
      {
        icon: Compass,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "EIA & GIS Studies",
        description: "Environmental Impact Assessment, GIS modeling, and environmental policies",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Environmental Sciences",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Bhaswati Banerjee",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Environmental Sciences at the School of Vocational Studies & Applied Sciences, Gautam Buddha University. Our department is committed to studying, understanding, and solving the critical environmental challenges of our times.",
      "We offer M.Sc. in Environmental Sciences and Ph.D. programs. The curriculum is interdisciplinary, integrating chemistry, biology, geology, and policy studies to prepare students for roles in environmental consulting, policy planning, and conservation research.",
      "Our faculty members have research expertise in heavy metal geochemistry, environmental biotechnology, air pollution monitoring, and GIS-based modeling. We collaborate with government bodies and conservation agencies for field studies.",
      "We invite you to join us in our commitment to environmental sustainability.",
    ],
    contact: {
      name: "Dr. Bhaswati Banerjee",
      designation: "Head of Department - Environmental Sciences",
      email: "bhaswati@gbu.ac.in",
      phone: "0120-234-4223",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Environmental Sciences provides advanced academic training and field research opportunities in eco-conservation, environmental monitoring, GIS, and waste management.",
    stats: [
      { icon: Users, numberText: "60+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "5+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "45+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Field-Based Studies",
        description:
          "Mandatory field excursions, water testing campaigns, and visits to wildlife sanctuaries, water treatment plants, and mining sites.",
        dotColor: "#22c55e",
      },
      {
        title: "GIS & Remote Sensing",
        description:
          "Practical training in geographic information systems (GIS) and remote sensing tools for landscape and climate analysis.",
        dotColor: "#10b981",
      },
      {
        title: "Environmental Impact Assessment",
        description:
          "Comprehensive training in writing and evaluating Environmental Impact Assessment (EIA) reports for industrial projects.",
        dotColor: "#14b8a6",
      },
    ],
    vision:
      "To be a distinguished center for environmental education, promoting eco-conservation and green technologies for a sustainable planet.",
    missionPoints: [
      "Deliver rigorous postgraduate and doctoral programs in environmental science",
      "Perform research on pollution control, water remediation, and GIS-based mapping",
      "Train students in environmental monitoring, EIA reporting, and conservation planning",
      "Raise public environmental awareness through community outreach programs",
    ],
  },
  programsData: [
    {
        id: "msc-environmental-science",
        title: "M.Sc. Environmental Science",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Postgraduate modules covering ecology, environmental toxicology, remote sensing/GIS, environmental impact assessment (EIA), and waste management.",
        image: "https://images.unsplash.com/photo-1500829243541-74b677fecc30?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-700",
        highlights: [
            "EIA & Environmental Auditing",
            "Pollution Control Technologies",
            "GIS & Satellite Remote Sensing",
            "Field Research Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1Wt9HfW96ur5QXIuJ2vaMwUKQ5TXR7rG1/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1Wt9HfW96ur5QXIuJ2vaMwUKQ5TXR7rG1/preview"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/file/d/1Wt9HfW96ur5QXIuJ2vaMwUKQ5TXR7rG1/preview"
            }
        ]
    },
    {
        id: "msc-geology",
        title: "M.Sc. Geology",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Geological exploration, structural geology, hydrogeology, mineralogy, petrology, stratigraphic analysis, and geophysical prospecting.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-stone-700",
        highlights: [
            "Structural Geology & Tectonics",
            "Hydrogeology & Groundwater",
            "Mineral Exploration",
            "Geological Field Camps"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1Wt9HfW96ur5QXIuJ2vaMwUKQ5TXR7rG1/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1Wt9HfW96ur5QXIuJ2vaMwUKQ5TXR7rG1/preview"
            }
        ]
    },
    {
        id: "phd-environmental-sciences",
        title: "Ph.D. in Environmental Sciences",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "12 Students",
        description: "Doctoral research focused on climate change mitigation, bioremediation, wastewater treatment, ecotoxicology, and environmental policies.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-700 to-green-900",
        highlights: [
            "Doctoral Coursework",
            "Bioremediation Labs",
            "Climate Impact Studies",
            "Ph.D. Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1BFyoZ8fPUps7z5QT774dx0ayWsRvx-kG/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1BFyoZ8fPUps7z5QT774dx0ayWsRvx-kG/preview"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/file/d/1BFyoZ8fPUps7z5QT774dx0ayWsRvx-kG/preview"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 3 dedicated faculty members with research expertise in heavy metal geochemistry, biodiversity studies, and environmental biotechnology.",
    stats: [
      { icon: BookOpen, numberText: "45+", subtitle: "Research Papers", bg: "bg-green-50", color: "text-green-600" },
      { icon: Award, numberText: "2+", subtitle: "Research Projects", bg: "bg-emerald-50", color: "text-emerald-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "12+", subtitle: "Avg Experience", bg: "bg-amber-50", color: "text-amber-600" },
    ],
  },
  researchStats: [
    { numberText: "2+", subtitle: "Research Projects" },
    { numberText: "₹15L+", subtitle: "Research Funding" },
    { numberText: "45+", subtitle: "Publications" },
    { numberText: "6+", subtitle: "PhDs Awarded" },
  ],
  topAchievers: [
    {
      name: "Anjali Sharma",
      year: "M.Sc 2023",
      achievement: "Placed as Environmental Consultant at Ernst & Young (EY), Mumbai",
      image: "https://randomuser.me/api/portraits/women/53.jpg",
      skills: ["EIA", "Carbon Footprinting", "GIS"],
    },
    {
      name: "Rohit Kumar",
      year: "M.Sc 2024",
      achievement: "Qualified UGC-NET Lectureship in Environmental Sciences",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      skills: ["Ecology", "EIA", "Environmental Chemistry"],
    },
  ],
  achievements: [
    {
      title: "Collaborative Study on Yamuna Water Quality",
      year: "2024",
      description: "Conducted a comprehensive water quality study on the Yamuna river basin, resulting in three publications.",
    },
    {
      title: "Establishment of GIS Lab",
      year: "2023",
      description: "Established a dedicated workstation for GIS modeling and landscape analysis within the department.",
    },
  ],
};
