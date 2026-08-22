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
      "Greetings!",
      "Welcome to the Department of Molecular Medicine & Microbial Biotechnology at the School of Biotechnology, Gautam Buddha University! Our department represents the convergence of modern molecular biology with medical sciences and microbial applications.",
      "We focus on understanding the molecular basis of diseases, developing diagnostic tools, and exploring microbial resources for industrial and environmental applications. Our programs are designed to train students in cutting-edge techniques of molecular biology, immunology, and microbial biotechnology.",
      "Our faculty members are actively engaged in research on cancer biology, infectious diseases, drug discovery, environmental microbiology, and bioremediation. We maintain collaborations with leading research institutions and industry partners.",
      "We encourage our students to engage in hands-on research from their early academic years. Our graduates have successfully joined pharmaceutical companies, research laboratories, and academic institutions worldwide.",
      "We look forward to welcoming motivated students who are passionate about making a difference in healthcare and biotechnology.",
    ],
    contact: {
      name: "Dr. Shalini Rai",
      designation: "Coordinator - Molecular Medicine",
      email: "shalini.rai@gbu.ac.in",
      phone: "0120-234-9903",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Advancing healthcare through molecular biology and microbial sciences since 2010.",
    stats: [
      { icon: Users, numberText: "150+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "10+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "12+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "4+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Medical Biotechnology Focus",
        description:
          "Our department uniquely integrates molecular medicine with microbial biotechnology. Students gain deep understanding of disease mechanisms, molecular diagnostics, and therapeutic approaches alongside microbial applications.",
        dotColor: "#a855f7",
      },
      {
        title: "Translational Research",
        description:
          "We emphasize translational research that bridges laboratory discoveries with clinical applications. Our research outputs include diagnostic kits, drug leads, and bioremediation protocols.",
        dotColor: "#ec4899",
      },
      {
        title: "Industry & Clinical Partnerships",
        description:
          "Strong collaborations with pharmaceutical companies, hospitals, and research labs provide students with exposure to real-world problems in healthcare and environmental sciences.",
        dotColor: "#f43f5e",
      },
    ],
    vision:
      "To be a leading center for molecular medicine and microbial biotechnology education and research, contributing to global healthcare solutions.",
    missionPoints: [
      "Provide quality education in molecular medicine and microbiology",
      "Conduct impactful research in disease biology and drug discovery",
      "Develop diagnostic tools and therapeutic solutions",
      "Foster microbial biotechnology applications for industry and environment",
      "Train students for careers in pharmaceuticals, healthcare, and research",
    ],
  },
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
      syllabusUrl: "https://drive.google.com/file/d/1_dT3tkjtyeI1Atp252t4XJJYZFbdwARc/preview",
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
  researchStats: [
    { numberText: "12+", subtitle: "Research Projects" },
    { numberText: "₹2Cr+", subtitle: "Research Funding" },
    { numberText: "100+", subtitle: "Publications" },
    { numberText: "4+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Pooja Singh",
      year: "M.Sc Molecular Medicine 2024",
      achievement: "Placed at Sun Pharma, Published 4 research papers in SCI journals",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      skills: ["Cancer Biology", "Molecular Diagnostics", "PCR", "Cell Culture"],
    },
    {
      name: "Aman Gupta",
      year: "M.Sc Microbial Biotech 2024",
      achievement: "CSIR Fellowship, Research collaboration with CSIR-CDRI",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      skills: ["Fermentation", "Metagenomics", "Bioremediation", "Lab Techniques"],
    },
  ],
  achievements: [
    {
      title: "Diagnostic Kit Development",
      description: "Developed rapid diagnostic kit for dengue virus with 98% accuracy",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Research Publications",
      description: "100+ papers in top-tier medical and microbiology journals",
      icon: BookOpen,
      color: "text-pink-600",
    },
    {
      title: "Drug Discovery Leads",
      description: "4 potential drug candidates identified through computational screening",
      icon: Lightbulb,
      color: "text-rose-600",
    },
    {
      title: "Industry Partnerships",
      description: "MoUs with Sun Pharma, CSIR-CDRI, and Bharat BioTech",
      icon: GraduationCap,
      color: "text-red-600",
    },
  ],
};
