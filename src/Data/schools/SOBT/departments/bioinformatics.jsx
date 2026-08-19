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
      "Greetings!",
      "Welcome to the Department of Bioinformatics and Computational Biology at the School of Biotechnology, Gautam Buddha University! In the era of big data and genomics, bioinformatics has emerged as one of the most critical disciplines bridging biology, computer science, and statistics.",
      "Our department equips students with the computational tools and analytical skills needed to extract meaningful insights from vast biological datasets. We focus on hands-on training in genome sequencing analysis, protein structure prediction, molecular simulation, and AI-driven drug design.",
      "Our faculty members are actively involved in research collaborations with leading national and international institutions. We encourage our students to participate in conferences, publish their findings, and engage with the broader scientific community.",
      "We look forward to shaping the future of data-driven biology with our students. Please reach out if you have any questions.",
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
      title: "M.Sc Bioinformatics & Genomics",
      duration: "2 Years",
      intake: "20 Students",
      description:
        "Postgraduate program combining biology with computational tools for genomic data analysis, drug design, and systems biology.",
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
      syllabusUrl: "https://drive.google.com/file/d/13tLAb-fKH4N4e6ejfj2904ilXmqsojcB/preview",
      syllabus: [],
    },
    {
      title: "Ph.D. in Bioinformatics",
      duration: "3-5 Years",
      intake: "5 Students",
      description:
        "Doctoral program focused on computational approaches to solve biological problems.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-cyan-500 to-cyan-600",
      highlights: [
        "Independent Research",
        "Advanced Algorithms",
        "Deep Learning in Biology",
        "Publication Track",
        "Conference Participation",
        "International Collaboration",
        "Teaching Assistantship",
        "Thesis Defense",
      ],
      syllabusUrl: "https://drive.google.com/file/d/14yy7SDczdwj_GNQhLRF3b_k4YaMjHnJZ/preview",
      syllabus: [],
    },
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
