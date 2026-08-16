import { Zap, Sun, Cpu, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "applied-physics",
  heroProps: {
    title: "Department of Applied Physics",
    highlight: "Applied Physics",
    subtitle:
      "Illuminating physics engineering and material technology — High-quality training in thin film devices, semiconducting materials, and solid state physics since 2012.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Zap,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Solid State Physics",
        description: "Semiconductor physics, conducting polymers, and electronic devices",
      },
      {
        icon: Sun,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Solar Energy Materials",
        description: "Thin film solar cells, photovoltaics, and clean energy materials",
      },
      {
        icon: Cpu,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Thin Film Tech",
        description: "Fabrication, vacuum coating, deposition, and device modeling",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Applied Physics",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Ashish Kumar",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Applied Physics at the School of Vocational Studies & Applied Sciences, Gautam Buddha University. Physics is the bedrock of modern technology, and our goal is to translate physical principles into industrial systems.",
      "We offer B.Sc. (Hons) Physics, M.Sc. in Applied Physics, and Ph.D. programs. Our curriculum balances core theories like quantum mechanics, classical physics, and electromagnetism with applied courses in materials science, thin film technology, electronics, and nanotechnology.",
      "Our faculty members conduct active research in solid state physics, thin-film devices, and energy materials, with funded projects from DST and CSIR. Our students gain hands-on training in vacuum deposition systems and optical characterization labs.",
      "Join us in exploring the physical laws and building the materials of tomorrow.",
    ],
    contact: {
      name: "Dr. Ashish Kumar",
      designation: "Head of Department - Applied Physics",
      email: "ashishk@gbu.ac.in",
      phone: "0120-234-4345",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Applied Physics provides a rigorous physics foundation combined with practical expertise in materials fabrication, vacuum systems, and computational device simulation.",
    stats: [
      { icon: Users, numberText: "110+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "4+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "4+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "50+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Materials Science Focus",
        description:
          "Strong research and laboratory focus on nanostructured materials, conducting polymers, and gas sensing thin film devices.",
        dotColor: "#d97706",
      },
      {
        title: "Vacuum Deposition Lab",
        description:
          "Practical training in thin film fabrication using vacuum thermal evaporators, spin coaters, and sputtering systems.",
        dotColor: "#ea580c",
      },
      {
        title: "Computational Physics",
        description:
          "Training in computational physics tools and software for solid state modeling and simulation of physical processes.",
        dotColor: "#dc2626",
      },
    ],
    vision:
      "To be an outstanding center for physics education and materials research, pioneering semiconductor thin films and renewable energy technologies.",
    missionPoints: [
      "Deliver high-quality academic instruction in core and applied physics branches",
      "Perform research in semiconducting thin films, nanostructures, and energy storage",
      "Train students in vacuum systems, thin-film deposition, and spectral characterization",
      "Develop research collaborations with national labs and solar energy industries",
    ],
  },
  programsData: [
    {
        id: "bsc-physical-sciences",
        title: "B.Sc. Physical Sciences",
        level: "UG",
        duration: "3-4 Years",
        intake: "50 Students",
        description: "Foundational undergraduate curriculum spanning classical mechanics, electromagnetism, wave optics, modern physics, and experimental laboratory methods.",
        image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-600 to-indigo-700",
        highlights: [
            "Classical & Quantum Mechanics",
            "Electromagnetic Theory",
            "Wave Optics & Lasers",
            "Modern Physics Labs"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1j1BCmZe04ibF3aB6J7Tb2-ZkzBuqIJ0Q/preview",
        syllabus: [
            {
                session: "Course Structure and Syllabus",
                url: "https://drive.google.com/file/d/1j1BCmZe04ibF3aB6J7Tb2-ZkzBuqIJ0Q/preview"
            }
        ]
    },
    {
        id: "bsc-hons-physics-research",
        title: "B.Sc. (Hons.) Physics / with Research",
        level: "UG",
        duration: "4 Years",
        intake: "40 Students",
        description: "NEP-aligned honors physics degree emphasizing solid state physics, nuclear physics, quantum mechanics, and dedicated undergraduate research.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
        gradient: "from-indigo-600 to-blue-700",
        highlights: [
            "Solid State Physics",
            "Nuclear & Particle Physics",
            "Computational Physics",
            "Honors Research Project"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1j1BCmZe04ibF3aB6J7Tb2-ZkzBuqIJ0Q/preview",
        syllabus: [
            {
                session: "Course Structure and Syllabus",
                url: "https://drive.google.com/file/d/1j1BCmZe04ibF3aB6J7Tb2-ZkzBuqIJ0Q/preview"
            }
        ]
    },
    {
        id: "msc-physics-specializations",
        title: "M.Sc. Physics (Astrophysics, Energy Studies, Photonics, Quantum)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Advanced post-graduate degree offering cutting-edge specializations in Astrophysics, Solar & Renewable Energy Studies, Photonics, and Quantum Information.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-600 to-blue-700",
        highlights: [
            "Astrophysics & Cosmology",
            "Energy Studies & Solar Cells",
            "Photonics & Lasers",
            "Quantum Computing & Info"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1tWVEoifehX7MEQbA6LUksu9Pn925Td89/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1tWVEoifehX7MEQbA6LUksu9Pn925Td89/preview"
            }
        ]
    },
    {
        id: "msc-physics-batch",
        title: "M.Sc. Physics (Batch 2024-26)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "CBCS curriculum covering electrodynamics, statistical mechanics, advanced quantum mechanics, materials characterization, and master thesis.",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-teal-700",
        highlights: [
            "Advanced Quantum Mechanics",
            "Electrodynamics",
            "Statistical Physics",
            "Master Thesis Project"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1tWVEoifehX7MEQbA6LUksu9Pn925Td89/preview",
        syllabus: [
            {
                session: "Course Structure and Syllabus",
                url: "https://drive.google.com/file/d/1tWVEoifehX7MEQbA6LUksu9Pn925Td89/preview"
            }
        ]
    },
    {
        id: "phd-applied-physics",
        title: "Ph.D. (Physics)",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "15 Students",
        description: "Doctoral research program promoting innovations in condensed matter physics, plasma diagnostics, thin films, nanomaterials, and optoelectronics.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-700 to-slate-900",
        highlights: [
            "Condensed Matter Lab",
            "Thin Film Deposition",
            "Peer-Reviewed Publications",
            "Ph.D. Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1byH_FnKZo8W_ldQFaqgUkRtO-y0iWmdk/preview",
        syllabus: [
            {
                session: "Course Structure and Syllabus",
                url: "https://drive.google.com/file/d/1byH_FnKZo8W_ldQFaqgUkRtO-y0iWmdk/preview"
            }
        ]
    }
],
  facultyStats: {
    text: "Our department has 4 dedicated faculty members with research expertise in thin films, solar energy materials, sensor devices, and condensed matter physics.",
    stats: [
      { icon: BookOpen, numberText: "50+", subtitle: "Research Papers", bg: "bg-amber-50", color: "text-amber-600" },
      { icon: Award, numberText: "2+", subtitle: "Research Projects", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-red-50", color: "text-red-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "14+", subtitle: "Avg Experience", bg: "bg-rose-50", color: "text-rose-600" },
    ],
  },
  researchStats: [
    { numberText: "2+", subtitle: "Research Projects" },
    { numberText: "₹20L+", subtitle: "Research Funding" },
    { numberText: "50+", subtitle: "Publications" },
    { numberText: "10+", subtitle: "PhDs Awarded" },
  ],
  topAchievers: [
    {
      name: "Rohit Verma",
      year: "M.Sc 2024",
      achievement: "Accepted for Ph.D. with fully funded scholarship at Nanyang Technological University (NTU), Singapore",
      image: "https://randomuser.me/api/portraits/men/51.jpg",
      skills: ["Thin Films", "Solar Cells", "Nanotechnology"],
    },
    {
      name: "Megha Gupta",
      year: "B.Sc 2023",
      achievement: "Cleared IIT-JAM with AIR 110, currently at IIT Delhi",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      skills: ["Quantum Mechanics", "Electromagnetism", "Electronics"],
    },
  ],
  achievements: [
    {
      title: "DST Nanomission Funded Project",
      year: "2024",
      description: "Faculty secured a major project for development of nanostructured gas sensors.",
    },
    {
      title: "Granted Patents in Energy Materials",
      year: "2023",
      description: "Granted a national patent for novel polymer electrolyte formulations for lithium batteries.",
    },
  ],
};
