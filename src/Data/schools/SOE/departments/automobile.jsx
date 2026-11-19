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
  aboutProps: null,
  programsData: [
    {
      id: "btech-automobile-engg",
      title: "B.Tech Automobile Engineering (with Industrial Engineering)",
      level: "UG",
      duration: "4 Years",
      intake: "60 Students",
      description: "Dedicated curriculum in vehicle dynamics, automotive chassis, powertrain design, hybrid/electric vehicles, and automated production.",
      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-500 to-orange-600",
      highlights: [
        "Vehicle Dynamics & Aerodynamics",
        "Automotive Powertrain & Chassis",
        "Electric & Hybrid Drivetrains",
        "Industrial Manufacturing & Operations"
      ],
      syllabusUrl: "/courses/soe/automobile/btech-automobile-structure.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/soe/automobile/btech-automobile-structure.pdf"
        }
      ]
    },
    {
      id: "btech-me-ev-mobility",
      title: "B.Tech Electric Vehicles & Autonomous Mobility",
      level: "UG",
      duration: "4 Years",
      intake: "30 Students",
      description: "Focuses on battery management systems (BMS), electric motor controls, charging infrastructure, and connected autonomous driving.",
      image: "https://images.unsplash.com/photo-1558441719-8b489c652756?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-500 to-blue-600",
      highlights: [
        "Battery Management Systems (BMS)",
        "Traction Inverters & Motors",
        "Charging Station Infrastructure",
        "Automotive Electronics"
      ],
      syllabusUrl: "/courses/soe/electrical/btech-ee-ev-biomedical-automation-structure-2023.pdf",
      syllabus: [
        {
          session: "Course Structure (EV Specialization)",
          url: "/courses/soe/electrical/btech-ee-ev-biomedical-automation-structure-2023.pdf"
        }
      ]
    },
    {
      id: "btech-me-mechatronics-auto",
      title: "B.Tech Mechatronics & Automotive Robotics",
      level: "UG",
      duration: "4 Years",
      intake: "30 Students",
      description: "Interdisciplinary engineering merging microcontrollers, pneumatic/hydraulic actuators, robotic weld cells, and automotive sensors.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-amber-600",
      highlights: [
        "Robotic Cells & Automation",
        "Sensors & Vehicle Telematics",
        "Embedded Automotive Mechatronics",
        "PLC & Hydraulics"
      ],
      syllabusUrl: "/courses/soe/mechanical/btech-me-mechatronics-structure.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/soe/mechanical/btech-me-mechatronics-structure.pdf"
        }
      ]
    }
  ],
  facultyStats: {
    text: "Our department has experienced faculty members specialized in automotive engineering, vehicle dynamics, and powertrain systems.",
    stats: [
      { icon: BookOpen, numberText: "40+", subtitle: "Research Papers", bg: "bg-red-50", color: "text-red-600" },
      { icon: Award, numberText: "4+", subtitle: "Awards", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-amber-50", color: "text-amber-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-red-50", color: "text-red-600" },
    ],
  },
  researchStats: null,
  topAchievers: null,
  achievements: null,
};
