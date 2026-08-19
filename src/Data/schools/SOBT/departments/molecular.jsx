import { Microscope, FlaskConical, HeartPulse, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBT",
  departmentId: "molecular",
  heroProps: {
    title: "Department of Molecular Medicine & Microbial Biotechnology",
    highlight: "Molecular Medicine",
    subtitle:
      "Bridging molecular science with medical applications. Advancing healthcare through disease biology, drug discovery, and microbial biotechnology.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: HeartPulse,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Molecular Medicine",
        description:
          "Cancer biology, molecular diagnostics, immunotherapy, and personalized medicine",
      },
      {
        icon: Microscope,
        bg: "bg-gradient-to-br from-pink-500 to-pink-600",
        subtitle: "Microbial Biotechnology",
        description:
          "Industrial microbiology, fermentation technology, and bioremediation",
      },
      {
        icon: FlaskConical,
        bg: "bg-gradient-to-br from-rose-500 to-rose-600",
        subtitle: "Drug Discovery",
        description:
          "Pharmacogenomics, drug design, and therapeutic development",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Faculty, Molecular Medicine",
    image: "https://faculty.gbu.ac.in/uploads/photos/6881e837d0124_Dr-Shalini.jpg",
    name: "Dr. Shalini Rai",
    designation: "Assistant Professor & Coordinator",
    messageParagraphs: [
      "Welcome to the Department of Molecular Medicine & Microbial Biotechnology at the School of Biotechnology, Gautam Buddha University! Our department represents the convergence of modern molecular biology with medical sciences and microbial applications.",
      "We focus on understanding the molecular basis of diseases, developing diagnostic tools, and exploring microbial resources for industrial and environmental applications. Our programs are designed to train students in cutting-edge techniques of molecular biology, immunology, and microbial biotechnology.",
      "Our faculty members are actively engaged in research on cancer biology, infectious diseases, drug discovery, environmental microbiology, and bioremediation. We maintain collaborations with leading research institutions and industry partners.",
      "We encourage our students to engage in hands-on research from their early academic years. Our graduates have successfully joined pharmaceutical companies, research laboratories, and academic institutions worldwide.",
    ],
    contact: {
      name: "Dr. Shalini Rai",
      designation: "Coordinator - Molecular Medicine",
      email: "shalini.rai@gbu.ac.in",
      phone: "0120-234-9903",
    },
  },
  aboutProps: null,
  programsData: [
    {
      title: "M.Sc Molecular Medicine",
      duration: "2 Years",
      intake: "25 Students",
      description:
        "Postgraduate program focusing on molecular mechanisms of diseases, diagnostics, drug discovery, and personalized medicine approaches.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Human Molecular Biology",
        "Cancer Biology",
        "Immunology & Immunotherapy",
        "Pharmacogenomics",
        "Molecular Diagnostics",
        "Drug Design & Discovery",
        "Clinical Research",
        "Research Dissertation",
      ],
      syllabusUrl: "https://drive.google.com/file/d/1rwFl8A40JqHjTmxvMus3PJ0e_sabS-aC/preview",
      syllabus: [],
    },
    {
      title: "M.Sc Microbial Biotechnology",
      duration: "2 Years",
      intake: "20 Students",
      description:
        "Postgraduate program focusing on microbial applications in industry, healthcare, and environmental management.",
      image:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=400&q=80",
      gradient: "from-pink-500 to-pink-600",
      highlights: [
        "Microbial Physiology",
        "Industrial Microbiology",
        "Environmental Microbiology",
        "Fermentation Technology",
        "Metagenomics",
        "Bioprocess Engineering",
        "Quality Control",
        "Research Project",
      ],
      syllabusUrl: "https://drive.google.com/file/d/17hLso0pXo2YDf0pYdXiQyK7VgaVYrV9W/preview",
      syllabus: [],
    },
    {
      title: "Ph.D. in Molecular Biology / Microbiology",
      duration: "3-5 Years",
      intake: "8 Students",
      description:
        "Doctoral program for advanced research in molecular medicine, cancer biology, microbial biotechnology, and related areas.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-rose-500 to-rose-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Publications",
        "Industry Collaborations",
        "Patent Filing",
        "International Exposure",
        "Teaching Assistantship",
        "Thesis Defense",
      ],
      syllabusUrl: "https://drive.google.com/file/d/14yy7SDczdwj_GNQhLRF3b_k4YaMjHnJZ/preview",
      syllabus: [],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Shalini Rai",
      position: "Assistant Professor & Coordinator",
      specialization: "Cancer Biology, Molecular Diagnostics, Drug Discovery",
      email: "shalini.rai@gbu.ac.in",
      achievements: "Ph.D: Molecular Biology",
      image: "https://faculty.gbu.ac.in/uploads/photos/6881e837d0124_Dr-Shalini.jpg",
      color: "from-purple-500 to-purple-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Bhaswati Banerjee",
      position: "Assistant Professor",
      specialization: "Molecular Medicine, Immunology, Cell Biology",
      email: "bhaswati.banerjee@gbu.ac.in",
      achievements: "Ph.D: Molecular Medicine",
      image: "https://faculty.gbu.ac.in/uploads/photos/661c94d134e30_BBanerjee_Pic.jpg",
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Dr. Barkha Singhal",
      position: "Assistant Professor",
      specialization: "Environmental Microbiology, Bioremediation, Waste Management",
      email: "barkha.singhal@gbu.ac.in",
      achievements: "Ph.D: Microbiology",
      image: "https://faculty.gbu.ac.in/uploads/photos/6605368841650_barkha.jpg",
      color: "from-rose-500 to-rose-600",
    },
  ],
  facultyStats: {
    text: "Our department has 10+ experienced faculty members with expertise across molecular medicine and microbial biotechnology.",
    stats: [
      {
        icon: BookOpen,
        numberText: "100+",
        subtitle: "Research Papers",
        bg: "bg-purple-50",
        color: "text-purple-600",
      },
      {
        icon: Award,
        numberText: "8+",
        subtitle: "Awards",
        bg: "bg-pink-50",
        color: "text-pink-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-rose-50",
        color: "text-rose-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-red-50",
        color: "text-red-600",
      },
    ],
  },
  researchStats: null,
  topAchievers: null,
  achievements: null,
};
