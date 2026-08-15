import { Car, Wrench, Gauge, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOE",
  departmentId: "automobile",
  heroProps: {
    title: "Department of Automobile Engineering",
    highlight: "Automobile Engineering",
    subtitle:
      "Driving the Future of Mobility & Transportation — From IC engines to electric vehicles and autonomous driving.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Car,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Vehicle Design",
        description: "Automotive design, vehicle dynamics, and chassis engineering",
      },
      {
        icon: Gauge,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Powertrain",
        description: "IC engines, EV drivetrain, biofuels, and emission control",
      },
      {
        icon: Wrench,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Manufacturing",
        description: "Auto manufacturing, CNC, 3D printing, and quality systems",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Coordinator, Automobile Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Vikas Kumar",
    designation: "Coordinator",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Automobile Engineering at the School of Engineering, Gautam Buddha University. The automotive industry is undergoing a revolution with electric vehicles, autonomous driving, and connected mobility.",
      "Our B.Tech program in Automobile Engineering covers all aspects of vehicle engineering from design and manufacturing to testing and maintenance. We have a strong focus on emerging areas like electric vehicles, hybrid powertrains, and autonomous systems.",
      "Students actively participate in SAE BAJA India, Formula Student, and Go-Kart championships, gaining hands-on experience in designing and building vehicles. We maintain partnerships with Maruti Suzuki, Tata Motors, and Hero MotoCorp.",
      "Join us in shaping the future of mobility!",
    ],
    contact: {
      name: "Dr. Vikas Kumar",
      designation: "Coordinator - Automobile Engineering",
      email: "vikas.kumar@gbu.ac.in",
      phone: "0120-234-9914",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Automobile Engineering prepares engineers for the rapidly evolving automotive and mobility industry.",
    stats: [
      { icon: Users, numberText: "100+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "3+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "4+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "1+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Hands-on Learning",
        description:
          "Students participate in SAE BAJA, Formula Student, and Go-Kart competitions, designing and fabricating actual vehicles.",
        dotColor: "#f97316",
      },
      {
        title: "EV Focus",
        description:
          "Strong emphasis on electric vehicle technology, battery systems, regenerative braking, and autonomous driving concepts.",
        dotColor: "#ef4444",
      },
      {
        title: "Industry Connect",
        description:
          "Partnerships with Maruti Suzuki, Tata Motors, Hero MotoCorp, Ashok Leyland, and ARAI for internships and placements.",
        dotColor: "#eab308",
      },
    ],
    vision:
      "To be a premier automobile engineering department driving innovation in mobility, EV technology, and sustainable transportation.",
    missionPoints: [
      "Provide quality education in automotive design and manufacturing",
      "Focus on emerging technologies like EVs, autonomous driving, and connected vehicles",
      "Encourage hands-on vehicle building through SAE and Formula Student teams",
      "Build strong industry partnerships for experiential learning",
      "Develop engineers ready for the future of mobility",
    ],
  },
  programsData: [
    {
      title: "B.Tech Automobile Engineering",
      duration: "4 Years",
      intake: "30 Students",
      description:
        "Program covering automotive design, engine technology, vehicle dynamics, EV systems, and manufacturing.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Vehicle Design", "IC Engines", "Vehicle Dynamics", "EV Systems",
        "Auto Manufacturing", "Automotive Electronics", "SAE Projects", "Industry Internship",
      ],
      syllabusUrl: "/schools/automobile/BTech_ME__AutomobileIndustrialEnggCStr_Fac.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. in Automobile Engineering",
      duration: "3-5 Years",
      intake: "5 Students",
      description:
        "Research in EV technology, alternative fuels, vehicle aerodynamics, and advanced manufacturing for the auto industry.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-500 to-red-600",
      highlights: [
        "EV Research", "Alternative Fuels", "Aerodynamics", "Advanced Manufacturing",
        "Publications", "Conference Presentations", "Patent Filing", "Thesis Defense",
      ],
      syllabusUrl: "/schools/automobile/PhD_ME_May2023.pdf",
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 3+ specialized faculty members with expertise in automotive engineering.",
    stats: [
      { icon: BookOpen, numberText: "25+", subtitle: "Research Papers", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: Award, numberText: "2+", subtitle: "Awards", bg: "bg-red-50", color: "text-red-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-amber-50", color: "text-amber-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "8+", subtitle: "Avg Experience", bg: "bg-yellow-50", color: "text-yellow-600" },
    ],
  },
  researchStats: [
    { numberText: "4+", subtitle: "Research Projects" },
    { numberText: "₹50L+", subtitle: "Research Funding" },
    { numberText: "25+", subtitle: "Publications" },
    { numberText: "1+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Rahul Sharma",
      year: "B.Tech Auto 2024",
      achievement: "Placed at Tata Motors, SAE BAJA team lead",
      image: "https://randomuser.me/api/portraits/men/40.jpg",
      skills: ["Vehicle Design", "CATIA", "Engine Tuning", "Team Leadership"],
    },
    {
      name: "Ankita Verma",
      year: "B.Tech Auto 2024",
      achievement: "Placed at Maruti Suzuki, Go-Kart team member",
      image: "https://randomuser.me/api/portraits/women/35.jpg",
      skills: ["Vehicle Dynamics", "SolidWorks", "Manufacturing", "EV Systems"],
    },
  ],
  achievements: [
    {
      title: "SAE BAJA India",
      description: "Top 20 national ranking in SAE BAJA India competition",
      icon: Award,
      color: "text-orange-600",
    },
    {
      title: "Formula Student",
      description: "Designed and built a formula car for FSI competition",
      icon: BookOpen,
      color: "text-red-600",
    },
    {
      title: "Industry Visits",
      description: "Regular plant visits to Maruti Suzuki and Hero MotoCorp facilities",
      icon: Lightbulb,
      color: "text-amber-600",
    },
    {
      title: "ARAI Collaboration",
      description: "Research partnership with Automotive Research Association of India",
      icon: GraduationCap,
      color: "text-yellow-600",
    },
  ],
};
