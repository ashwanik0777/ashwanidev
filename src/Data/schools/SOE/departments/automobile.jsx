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
        id: "btech-mechanical-engg",
        title: "B.Tech (Mechanical Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "Comprehensive study of thermodynamics, solid mechanics, fluid machinery, manufacturing processes, and machine design.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-orange-600",
        highlights: [
            "Thermodynamics & Heat Transfer",
            "Machine Design & CAD",
            "Manufacturing Technologies",
            "Fluid Mechanics"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview"
            }
        ]
    },
    {
        id: "btech-me-automobile-minor",
        title: "B.Tech Mechanical Engineering with minor (Automobile and Industrial Engineering)",
        level: "UG",
        duration: "4 Years",
        intake: "30 Students",
        description: "Specialized mechanical track in automotive chassis engineering, IC engines, vehicle aerodynamics, and operations research.",
        image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
        gradient: "from-red-500 to-orange-600",
        highlights: [
            "Automotive Chassis & Engines",
            "Industrial Operations Research",
            "Vehicle Dynamics",
            "Quality Control"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1s9XPZwupSDUFdiff2dQSBoAJn4QP89UZ/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1s9XPZwupSDUFdiff2dQSBoAJn4QP89UZ/preview"
            }
        ]
    },
    {
        id: "btech-me-mechatronics-minor",
        title: "B.Tech Mechanical Engineering with minor (Mechatronics and Automation)",
        level: "UG",
        duration: "4 Years",
        intake: "30 Students",
        description: "Interdisciplinary minor merging microcontrollers, pneumatic/hydraulic actuators, PLC systems, and robotic cells.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
        gradient: "from-orange-500 to-amber-600",
        highlights: [
            "PLC & Pneumatics",
            "Sensors & Actuators",
            "Robotic Cells",
            "Embedded Mechatronics"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview"
            }
        ]
    },
    {
        id: "mtech-me-streams",
        title: "M.Tech. (Manufacturing Engg, Design Engg., Thermal Engg.)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced postgraduate modules in FEA analysis, computational fluid dynamics (CFD), additive manufacturing, and thermal design.",
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-600 to-red-700",
        highlights: [
            "Finite Element Analysis (FEA)",
            "Computational Fluid Dynamics",
            "Additive Manufacturing",
            "Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o/preview"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/file/d/1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o/preview"
            }
        ]
    },
    {
        id: "mtech-me-working-prof",
        title: "M.Tech in Mechanical Engineering (Weekend Program for Working Professionals)",
        level: "PG (Working Exec)",
        duration: "3 Years",
        intake: "30 Students",
        description: "Flexible weekend postgraduate degree providing industrial engineers with advanced design and manufacturing tools.",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-slate-600 to-slate-800",
        highlights: [
            "Weekend Timetable",
            "Applied Industrial Projects",
            "CAD/CAM & FEA",
            "Executive Degree"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1AvtHXvJl-axg52LdpYXIt05eprE2jz2L/preview"
            }
        ]
    },
    {
        id: "phd-mechanical-engg",
        title: "Ph.D. (Mechanical Engg.)",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Doctoral research program promoting original contributions in thermal sciences, nanomaterials, renewable energy, and CAD/CAM.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-orange-600 to-amber-700",
        highlights: [
            "Doctoral Coursework",
            "Thermal & Materials Research",
            "Indexed Journal Publications",
            "Ph.D. Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1I8EGGiF-TBLELUy2wXcgUVCekO0P9jNL/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1I8EGGiF-TBLELUy2wXcgUVCekO0P9jNL/preview"
            }
        ]
    }
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
