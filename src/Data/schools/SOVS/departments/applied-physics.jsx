import { Zap, Sun, Cpu } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "applied-physics",
  heroProps: {
    title: "Department of Physics",
    highlight: "Department of Applied Physics | SoVSAS",
    subtitle:
      "A beacon of innovation, exploration, and academic excellence — Offering undergraduate, postgraduate, and doctoral courses in physics, optics, nanomaterials, and solid state physics.",
    primaryButton: { label: "Explore Programmes" },
    secondaryButton: { label: "Department Labs" },
    backgroundImage:
      "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Zap,
        bg: "bg-gradient-to-br from-amber-500 to-amber-600",
        subtitle: "Solid State Physics",
        description: "Semiconductor physics, conducting polymers, and electronic device physics",
      },
      {
        icon: Sun,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Solar Energy Materials",
        description: "Thin film solar cells, photovoltaics, and clean energy materials research",
      },
      {
        icon: Cpu,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Thin Film Technology",
        description: "Fabrication, vacuum coating, deposition, and material device modeling",
      },
    ],
  },
  hodProps: {
    title: "Message from Head, Applied Physics",
    image: "https://faculty.gbu.ac.in/../uploads/photos/68e21a221fdd9_mausumi.jpeg",
    name: "Dr. Mausumi Pohit",
    designation: "Head of Department, Applied Physics",
    messageParagraphs: [
      "At the Department of Physics, Gautam Buddha University, we strive to be a beacon of innovation, exploration, and academic excellence. Our programs are thoughtfully designed to inspire curious minds and nurture future-ready scientists, offering undergraduate, postgraduate, and doctoral courses that seamlessly combine theoretical rigor with hands-on experience. Our department is proud to have a team of passionate educators and world-class researchers who guide students in their academic and research journeys. Equipped with state-of-the-art laboratories and modern facilities, we provide a stimulating environment where ideas come to life and meaningful discoveries are made. Through our research initiatives and collaborations with global institutions and industries, we are committed to addressing real-world challenges and contributing to global scientific progress. Whether you are a student eager to unlock your potential, a researcher seeking collaboration, or someone captivated by the wonders of physics, we invite you to join our vibrant and inclusive community. Together, let us explore, innovate, and shape the future of science and technology.",
    ],
    contact: {
      name: "Dr. Mausumi Pohit",
      designation: "Head of Department - Applied Physics",
      email: "mausumi.pohit@gbu.ac.in",
      phone: "0120-2344341",
    },
  },
  programsData: [
    {
      id: "bsc-physical-sciences",
      title: "B.Sc. Physical Sciences",
      level: "Undergraduate",
      duration: "3-4 Years",
      intake: "40 Students",
      description: "Broad foundational program integrating physics principles, chemical dynamics, mathematical techniques, and computational science.",
      image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-600 to-blue-700",
      highlights: [
        "Mechanics & Electromagnetism",
        "Optics & Modern Physics",
        "Chemical Dynamics",
        "Laboratory Instrumentation",
      ],
      syllabusUrl: "/courses/sovs/applied-physics/bsc-physical-sciences-structure-syllabus-2023.pdf",
      syllabus: [
        {
          session: "Course Structure & Syllabus",
          url: "/courses/sovs/applied-physics/bsc-physical-sciences-structure-syllabus-2023.pdf"
        }
      ],
    },
    {
      id: "bsc-hons-physics-research",
      title: "B.Sc. (Hons.) Physics / with Research",
      level: "Undergraduate",
      duration: "3-4 Years",
      intake: "40 Students",
      description: "NEP-aligned honours degree focusing on quantum theory, solid state physics, nuclear physics, and research-based laboratory projects.",
      image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-600 to-indigo-700",
      highlights: [
        "Quantum Mechanics",
        "Solid State Physics",
        "Nuclear & Particle Physics",
        "Honors Research Project",
      ],
      syllabusUrl: "/courses/sovs/applied-physics/bsc-hons-physics-structure-syllabus.pdf",
      syllabus: [
        {
          session: "Course Structure & Syllabus",
          url: "/courses/sovs/applied-physics/bsc-hons-physics-structure-syllabus.pdf"
        }
      ],
    },
    {
      id: "msc-physics-specializations",
      title: "M.Sc. Physics (Astrophysics, Energy Studies, Photonics, Quantum)",
      level: "Postgraduate",
      duration: "2 Years",
      intake: "40 Students",
      description: "Advanced post-graduate degree offering cutting-edge specializations in Astrophysics, Solar & Renewable Energy Studies, Photonics, and Quantum Information.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-600 to-blue-700",
      highlights: [
        "Astrophysics & Cosmology",
        "Energy Studies & Solar Cells",
        "Photonics & Lasers",
        "Quantum Computing & Info",
      ],
      syllabusUrl: "/courses/sovs/applied-physics/msc-physics-astrophysics-structure.pdf",
      syllabus: [
        {
          session: "Astrophysics Structure",
          url: "/courses/sovs/applied-physics/msc-physics-astrophysics-structure.pdf"
        },
        {
          session: "Energy Studies Structure",
          url: "/courses/sovs/applied-physics/msc-physics-energy-studies-structure.pdf"
        },
        {
          session: "Photonics Structure",
          url: "/courses/sovs/applied-physics/msc-physics-photonics-structure.pdf"
        },
        {
          session: "Quantum Information Structure",
          url: "/courses/sovs/applied-physics/msc-physics-quantum-structure.pdf"
        }
      ],
    },
    {
      id: "msc-physics-batch",
      title: "M.Sc. Physics",
      level: "Postgraduate",
      duration: "2 Years",
      intake: "30 Students",
      description: "CBCS curriculum covering electrodynamics, statistical mechanics, advanced quantum mechanics, materials characterization, and master thesis.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-600 to-teal-700",
      highlights: [
        "Advanced Quantum Mechanics",
        "Electrodynamics",
        "Statistical Physics",
        "Master Thesis Project",
      ],
      syllabusUrl: "/courses/sovs/applied-physics/msc-physics-cbcs-syllabus-2024-26.pdf",
      syllabus: [
        {
          session: "CBCS Syllabus (2024-26)",
          url: "/courses/sovs/applied-physics/msc-physics-cbcs-syllabus-2024-26.pdf"
        }
      ],
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
        "Ph.D. Defense",
      ],
      syllabusUrl: "/courses/sovs/applied-physics/phd-physics-structure-syllabus-2023.pdf",
      syllabus: [
        {
          session: "Course Structure & Syllabus",
          url: "/courses/sovs/applied-physics/phd-physics-structure-syllabus-2023.pdf"
        },
        {
          session: "About Department",
          url: "/courses/sovs/applied-physics/physics-about-department.pdf"
        },
        {
          session: "Department Academics",
          url: "/courses/sovs/applied-physics/physics-academics.pdf"
        },
        {
          session: "Admission Booklet",
          url: "/courses/sovs/applied-physics/physics-admission-booklet-2023-24.pdf"
        }
      ],
    },
  ],
};
