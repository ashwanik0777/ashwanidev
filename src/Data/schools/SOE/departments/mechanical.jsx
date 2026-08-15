import { Cpu, Wrench, Cog, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOE",
  departmentId: "mechanical",
  heroProps: {
    title: "Department of Mechanical Engineering",
    highlight: "Mechanical Engineering",
    subtitle:
      "Designing Machines, Driving Innovation — Empowering engineers with skills in design, manufacturing, thermal, and industrial engineering.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Cog,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Machine Design",
        description: "CAD/CAM, FEA, product design, and manufacturing processes",
      },
      {
        icon: Cpu,
        bg: "bg-gradient-to-br from-indigo-500 to-indigo-600",
        subtitle: "Thermal Engineering",
        description: "Heat transfer, IC engines, refrigeration, and energy systems",
      },
      {
        icon: Wrench,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        subtitle: "Manufacturing",
        description: "CNC machining, 3D printing, welding, and quality engineering",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Mechanical Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/6605311bb0f06_harish.jpg",
    name: "Dr. Harishchandra Thakur",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Mechanical Engineering at the School of Engineering, Gautam Buddha University. Mechanical Engineering is the backbone of the industrial world, and our department is committed to producing skilled engineers who can design, manufacture, and innovate.",
      "Our department offers B.Tech, M.Tech, and Ph.D programs with specializations in Thermal Engineering, Manufacturing, and Design Engineering. We emphasize hands-on learning through well-equipped workshops and laboratories.",
      "Our faculty members are actively involved in research areas including renewable energy, nanofluids, additive manufacturing, and tribology. We maintain strong industry connections for internships and placements.",
      "I invite you to explore our programs and be part of this journey of engineering excellence.",
    ],
    contact: {
      name: "Dr. Harishchandra Thakur",
      designation: "Head of Department - Mechanical Engineering",
      email: "hod.mech@gbu.ac.in",
      phone: "0120-234-9911",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2010, the Department of Mechanical Engineering combines theoretical excellence with practical skill development.",
    stats: [
      { icon: Users, numberText: "250+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "9+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "12+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "3+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Industry-Ready Curriculum",
        description:
          "Our programs include SolidWorks, ANSYS, CATIA, MATLAB training along with workshop practice, ensuring graduates are immediately productive in industry.",
        dotColor: "#3b82f6",
      },
      {
        title: "Research & Innovation",
        description:
          "Active research in renewable energy, thermal systems, nanofluids, additive manufacturing, and tribology with DST-SERB and AICTE funded projects.",
        dotColor: "#06b6d4",
      },
      {
        title: "Industry Partnerships",
        description:
          "Strong collaborations with Tata Motors, L&T, Maruti Suzuki for internships, industry projects, and campus placements.",
        dotColor: "#6366f1",
      },
    ],
    vision:
      "To be a center of excellence in mechanical engineering education, research, and innovation contributing to sustainable industrial development.",
    missionPoints: [
      "Provide quality education in mechanical engineering and allied fields",
      "Conduct impactful research in thermal, manufacturing, and materials engineering",
      "Foster industry-academia partnerships for experiential learning",
      "Develop engineers with creativity, critical thinking, and ethical values",
      "Contribute to sustainable engineering solutions for society",
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L"
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1s9XPZwupSDUFdiff2dQSBoAJn4QP89UZ",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1s9XPZwupSDUFdiff2dQSBoAJn4QP89UZ"
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L"
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o"
            },
            {
                session: "Syllabus",
                url: "https://drive.google.com/uc?export=download&id=1zkOHHtiF8YZWnJHWijfEM1ff2q9Kd17o"
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1AvtHXvJl-axg52LdpYXIt05eprE2jz2L"
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
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1I8EGGiF-TBLELUy2wXcgUVCekO0P9jNL",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1I8EGGiF-TBLELUy2wXcgUVCekO0P9jNL"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 9+ experienced faculty members with expertise in thermal, manufacturing, and design engineering.",
    stats: [
      { icon: BookOpen, numberText: "80+", subtitle: "Research Papers", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: Award, numberText: "5+", subtitle: "Awards", bg: "bg-indigo-50", color: "text-indigo-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-cyan-50", color: "text-cyan-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-purple-50", color: "text-purple-600" },
    ],
  },
  researchStats: [
    { numberText: "12+", subtitle: "Research Projects" },
    { numberText: "₹2Cr+", subtitle: "Research Funding" },
    { numberText: "80+", subtitle: "Publications" },
    { numberText: "3+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Rohit Kumar",
      year: "B.Tech ME 2024",
      achievement: "Placed at Tata Motors, SAE BAJA team captain",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      skills: ["SolidWorks", "ANSYS", "Manufacturing", "Team Leadership"],
    },
    {
      name: "Priya Singh",
      year: "M.Tech Thermal 2024",
      achievement: "Published 3 SCI papers, DST-INSPIRE fellowship",
      image: "https://randomuser.me/api/portraits/women/60.jpg",
      skills: ["CFD", "Heat Transfer", "MATLAB", "Research"],
    },
  ],
  achievements: [
    {
      title: "SAE BAJA India",
      description: "Top 20 national ranking in SAE BAJA India 2024",
      icon: Award,
      color: "text-blue-600",
    },
    {
      title: "DST-FIST Lab",
      description: "Advanced material testing lab funded by DST-FIST programme",
      icon: BookOpen,
      color: "text-indigo-600",
    },
    {
      title: "Industry MoU",
      description: "MoU with Tata Motors for joint research and internships",
      icon: Lightbulb,
      color: "text-cyan-600",
    },
    {
      title: "Placement Record",
      description: "80%+ placements in core mechanical & automotive companies",
      icon: GraduationCap,
      color: "text-purple-600",
    },
  ],
};
