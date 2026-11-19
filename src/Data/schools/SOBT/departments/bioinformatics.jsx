import { Database, Dna, Brain, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBT",
  departmentId: "bioinformatics",
  heroProps: {
    title: "Department of Bioinformatics & Computational Biology",
    highlight: "Bioinformatics",
    subtitle:
      "Integrating biology with computational science. Training the next generation of computational biologists and data-driven researchers.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Database,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Genomic Data Analysis",
        description:
          "NGS data processing, genome assembly, and variant analysis",
      },
      {
        icon: Dna,
        bg: "bg-gradient-to-br from-cyan-500 to-cyan-600",
        subtitle: "Structural Biology",
        description:
          "Protein modeling, molecular docking, and virtual screening",
      },
      {
        icon: Brain,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "AI in Biology",
        description:
          "Machine learning for drug discovery, biomarker identification",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Faculty, Bioinformatics",
    image: "https://faculty.gbu.ac.in/uploads/photos/660536ae760c3_deepali.jpg",
    name: "Dr. Deepali Singh",
    designation: "Assistant Professor & Coordinator",
    messageParagraphs: [
      "Welcome to the Department of Bioinformatics and Computational Biology at the School of Biotechnology, Gautam Buddha University! In the era of big data and genomics, bioinformatics has emerged as one of the most critical disciplines bridging biology, computer science, and statistics.",
      "Our department equips students with the computational tools and analytical skills needed to extract meaningful insights from vast biological datasets. We focus on hands-on training in genome sequencing analysis, protein structure prediction, molecular simulation, and AI-driven drug design.",
      "Our faculty members are actively involved in research collaborations with leading national and international institutions. We encourage our students to participate in conferences, publish their findings, and engage with the broader scientific community.",
    ],
    contact: {
      name: "Dr. Deepali Singh",
      designation: "Coordinator - Bioinformatics",
      email: "deepali.singh@gbu.ac.in",
      phone: "0120-234-9902",
    },
  },
  aboutProps: null,
  programsData: [
    {
      id: "msc-bioinformatics-genomics",
      title: "M.Sc. Bioinformatics & Genomics",
      level: "PG",
      duration: "2 Years",
      intake: "25 Students",
      description:
        "Postgraduate program combining biology with computational tools for genomic data analysis, NGS workflows, drug design, and systems biology.",
      image:
        "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Genomics & Proteomics",
        "Structural Bioinformatics",
        "Programming (Python, R)",
        "Machine Learning in Biology",
        "NGS Data Analysis",
        "Molecular Docking",
        "Database Design",
        "Research Dissertation",
      ],
      syllabusUrl: "/courses/sobt/bioinformatics/msc-bioinformatics-syllabus.pdf",
      syllabus: [
        {
          session: "Course Content / Syllabus",
          url: "/courses/sobt/bioinformatics/msc-bioinformatics-syllabus.pdf"
        }
      ],
    },
    {
      id: "msc-life-sciences",
      title: "M.Sc. Life Sciences",
      level: "PG",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Comprehensive postgraduate degree covering molecular medicine, genomics, cellular physiology, and modern analytical biological methods.",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-600 to-emerald-700",
      highlights: [
        "Genomics & Bioinformatics",
        "Molecular Pathology",
        "Cellular Physiology",
        "Laboratory Dissertation"
      ],
      syllabusUrl: "/courses/sobt/bioinformatics/msc-lifesciences-structure-2025-27.pdf",
      syllabus: [
        {
          session: "Course Structure (2025-27)",
          url: "/courses/sobt/bioinformatics/msc-lifesciences-structure-2025-27.pdf"
        },
        {
          session: "Course Structure (Specialization)",
          url: "/courses/sobt/bioinformatics/msc-lifesciences-structure-special.pdf"
        }
      ]
    },
    {
      id: "int-msc-phd-lifesciences",
      title: "Integrated M.Sc.- Ph.D. Life Sciences & Systems Medicine",
      level: "Doctoral",
      duration: "5 Years",
      intake: "15 Students",
      description:
        "Direct doctoral research pathway bridging master's level computational biology with comprehensive Ph.D. dissertation research.",
      image:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
      gradient: "from-violet-600 to-purple-700",
      highlights: [
        "Integrated Doctoral Track",
        "Systems Medicine",
        "Translational Lab Research",
        "Ph.D. Defense"
      ],
      syllabusUrl: "/courses/sobt/bioinformatics/int-msc-phd-lifesciences-structure.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/sobt/bioinformatics/int-msc-phd-lifesciences-structure.pdf"
        }
      ]
    },
    {
      id: "int-bsc-msc-ayurveda",
      title: "Integrated B.Sc.- M.Sc. Ayurveda Biology",
      level: "Dual Degree",
      duration: "5 Years",
      intake: "30 Students",
      description:
        "Interdisciplinary dual degree combining fundamental Ayurvedic concepts with modern biological, pharmacological, and genomic tools.",
      image:
        "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-500 to-emerald-600",
      highlights: [
        "Ayurvedic Pharmacognosy",
        "Phytochemistry",
        "Herbal Drug Standardization",
        "Systems Biology"
      ],
      syllabusUrl: "/courses/sobt/bioinformatics/int-bsc-msc-ayurveda-structure.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/sobt/bioinformatics/int-bsc-msc-ayurveda-structure.pdf"
        },
        {
          session: "Course Content",
          url: "/courses/sobt/bioinformatics/int-bsc-msc-ayurveda-syllabus.pdf"
        }
      ]
    },
    {
      id: "bsc-forensic-science",
      title: "B.Sc. (Hons.) Forensic Science",
      level: "UG",
      duration: "3-4 Years",
      intake: "40 Students",
      description:
        "Forensic analysis, crime scene documentation, toxicology, digital forensics, DNA profiling, and legal evidence procedures.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-indigo-600",
      highlights: [
        "Crime Scene Management",
        "Forensic Toxicology",
        "DNA Fingerprinting",
        "Ballistics Analysis"
      ],
      syllabusUrl: "/courses/sobt/bioinformatics/bsc-forensic-science-structure.pdf",
      syllabus: [
        {
          session: "Course Structure",
          url: "/courses/sobt/bioinformatics/bsc-forensic-science-structure.pdf"
        },
        {
          session: "Course Content",
          url: "/courses/sobt/bioinformatics/bsc-forensic-science-syllabus.pdf"
        }
      ]
    },
    {
      id: "phd-bioinformatics",
      title: "Ph.D. in Bioinformatics & Computational Biology",
      level: "Doctoral",
      duration: "3-5 Years",
      intake: "10 Students",
      description:
        "Doctoral research program promoting advanced innovations in computational biology, deep learning for proteomics, and structural pharmacology.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-500 to-cyan-600",
      highlights: [
        "Independent Research",
        "Deep Learning in Biology",
        "Publication Track",
        "Thesis Defense"
      ],
      syllabusUrl: "/courses/sobt/biotechnology/phd-biotech-structure-2020.pdf",
      syllabus: [
        {
          session: "Doctoral Coursework",
          url: "/courses/sobt/biotechnology/phd-biotech-structure-2020.pdf"
        }
      ]
    }
  ],
  facultyMembers: [
    {
      name: "Dr. Deepali Singh",
      position: "Assistant Professor & Coordinator",
      specialization: "Bioinformatics, Computational Biology, Genomics",
      email: "deepali.singh@gbu.ac.in",
      achievements: "Ph.D: Bioinformatics",
      image: "https://faculty.gbu.ac.in/uploads/photos/660536ae760c3_deepali.jpg",
      color: "from-blue-500 to-blue-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Gunjan Garg",
      position: "Assistant Professor",
      specialization: "Genomics, Plant Bioinformatics, NGS Analysis",
      email: "gunjan.garg@gbu.ac.in",
      achievements: "Ph.D: Bioinformatics & Genomics",
      image: "https://faculty.gbu.ac.in/uploads/photos/660535a7c46a1_gunjangarg.jpg",
      color: "from-cyan-500 to-cyan-600",
    },
  ],
  facultyStats: {
    text: "Our department has experienced faculty with expertise in computational biology and genomics.",
    stats: [
      {
        icon: BookOpen,
        numberText: "80+",
        subtitle: "Research Papers",
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        icon: Award,
        numberText: "5+",
        subtitle: "Awards",
        bg: "bg-cyan-50",
        color: "text-cyan-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-teal-50",
        color: "text-teal-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-green-50",
        color: "text-green-600",
      },
    ],
  },
  researchStats: null,
  topAchievers: null,
  achievements: null,
};
