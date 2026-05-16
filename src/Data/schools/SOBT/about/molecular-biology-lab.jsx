/**
 * SOBT — Molecular Biology Lab
 * School of Biotechnology
 * Full data module following the Coedt pattern
 */
export const molecularBiologyLabData = {
  schoolCode: "SOBT",
  schoolName: "School of Biotechnology",
  hero: {
    title: "Molecular Biology Laboratory",
    subtitle: "Unraveling the Molecular Secrets of Life",
    bgTheme: 3,
  },
  about: {
    visionTitle: "Our Vision",
    visionDescription: [
      "To be a state-of-the-art molecular biology research facility that empowers students and researchers to conduct pioneering work in genetics, gene therapy, and molecular diagnostics.",
      "Our lab serves as the backbone of experimental research at the School of Biotechnology, providing cutting-edge instrumentation and a collaborative environment for discovery.",
    ],
    missionTitle: "Our Mission",
    missionPoints: [
      "Provide hands-on training in advanced molecular biology techniques",
      "Support cutting-edge research in genetic engineering and gene therapy",
      "Develop molecular diagnostic tools for healthcare applications",
      "Foster a culture of scientific rigor and reproducible research",
      "Enable interdisciplinary collaborations across departments",
    ],
    storyTitle: "Our Story",
    storyText:
      "The Molecular Biology Laboratory was established alongside the School of Biotechnology to provide an advanced experimental facility for students and researchers. Starting with basic molecular biology equipment, the lab has grown into a comprehensive research facility equipped with PCR machines, real-time PCR systems, gel documentation systems, cell culture facilities, and spectrophotometers. Today, it supports research in areas ranging from genetic engineering to cancer biology.",
    whatWeDoTitle: "What We Do",
    whatWeDoText:
      "Our lab supports a wide range of molecular biology experiments including DNA/RNA isolation, PCR amplification, molecular cloning, gene expression analysis, protein purification, western blotting, cell culture, and transfection. We provide training for both coursework and independent research projects.",
    commitmentTitle: "Our Commitment",
    commitmentText:
      "We are committed to maintaining the highest standards of laboratory safety, equipment maintenance, and research ethics. Our goal is to ensure every student and researcher has access to the tools and support they need to conduct world-class molecular biology research.",
    photos: [
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=800&q=80",
    ],
  },
  mentors: [
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/660535f24a586_bhupendra.jpg",
      name: "Dr. Bhupendra Chaudhary",
      role: "Lab In-Charge",
      qualifications: "Ph.D. in Molecular Biology & Genetic Engineering",
      expertise: "Molecular Cloning, Gene Expression, Plant Genomics, Genetic Engineering, Genome Assembly",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/661c94d134e30_BBanerjee_Pic.jpg",
      name: "Dr. Bhaswati Banerjee",
      role: "Co-In-Charge — Molecular Biology Lab",
      qualifications: "Ph.D. in Molecular Cell Biology",
      expertise: "Cell Biology, Gene Expression, Molecular Diagnostics, Cancer Biology, Western Blotting",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/6881e837d0124_Dr-Shalini.jpg",
      name: "Dr. Shalini Rai",
      role: "Faculty — Molecular Biology Lab",
      qualifications: "Ph.D. in Molecular Biology",
      expertise: "Cancer Biology, Molecular Diagnostics, Drug Discovery, Cell Culture, PCR",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/68c9104d2a52d_Prof.%20R.jpg",
      name: "Prof. Rajeev Varshney",
      role: "Senior Advisor",
      qualifications: "Ph.D. in Biotechnology",
      expertise: "Molecular Biology, Enzymology, Protein Chemistry, Biochemistry",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
      name: "Dr. Rekha Puria",
      role: "Faculty — Molecular Biology Lab",
      qualifications: "Ph.D. in Molecular Biology",
      expertise: "Gene Regulation, Yeast Genetics, Functional Genomics, Molecular Cloning",
      linkedin: "#",
    },
  ],
  partners: [
    {
      name: "CSIR-CDRI (Central Drug Research Institute)",
      type: "Research Partner",
      description:
        "Collaborative research on drug target validation, molecular screening, and structure-activity relationship studies.",
      image: "https://picsum.photos/200?21",
      year: "2020",
    },
    {
      name: "ICMR (Indian Council of Medical Research)",
      type: "Funding Partner",
      description:
        "Research funding for molecular diagnostics development and infectious disease studies at the laboratory.",
      image: "https://picsum.photos/200?22",
      year: "2021",
    },
    {
      name: "Bharat Test House",
      type: "Industry Partner",
      description:
        "Industry collaboration for applied biotechnology testing, quality assurance, and molecular assay development.",
      image: "https://picsum.photos/200?23",
      year: "2023",
    },
  ],
  projects: [
    {
      name: "CRISPR Gene Editing for Crop Improvement",
      description:
        "Using CRISPR-Cas9 gene editing technology to develop drought-resistant and high-yield crop varieties for sustainable agriculture.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      category: "Genetic Engineering",
      year: "2024",
      status: "Ongoing",
      technologies: ["CRISPR-Cas9", "Plant Cell Culture", "PCR"],
    },
    {
      name: "Rapid Dengue Diagnostic Kit",
      description:
        "Development of a point-of-care molecular diagnostic kit for rapid detection of dengue virus using RT-PCR and lateral flow assay technology.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      category: "Molecular Diagnostics",
      year: "2024",
      status: "Prototype",
      technologies: ["RT-PCR", "ELISA", "Lateral Flow"],
    },
    {
      name: "Anti-Cancer Compound Screening",
      description:
        "High-throughput screening of natural and synthetic compounds for anti-cancer activity using cell culture models and molecular assays.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
      category: "Drug Discovery",
      year: "2023",
      status: "Ongoing",
      technologies: ["Cell Culture", "MTT Assay", "Western Blot"],
    },
    {
      name: "Recombinant Protein Expression System",
      description:
        "Establishing an E. coli-based recombinant protein expression and purification platform for producing therapeutic proteins and enzymes.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      category: "Protein Engineering",
      year: "2023",
      status: "Completed",
      technologies: ["E. coli Expression", "IPTG Induction", "Chromatography"],
    },
    {
      name: "Epigenetic Markers in Breast Cancer",
      description:
        "Investigating DNA methylation patterns and histone modifications as potential biomarkers for early breast cancer detection.",
      image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=600&q=80",
      category: "Cancer Biology",
      year: "2024",
      status: "Ongoing",
      technologies: ["Bisulfite Sequencing", "ChIP", "qPCR"],
    },
  ],
  course: {
    sectionTitle: "Training Programs",
    sectionSubtitle: "Hands-on laboratory training for aspiring molecular biologists",
    imageSrc: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Molecular Biology Workshop",
    badgeText: "HANDS-ON",
    courseTitle: "Advanced Molecular Biology Techniques — Hands-on Workshop",
    courseDescription:
      "Intensive practical training covering DNA/RNA extraction, PCR, cloning, protein expression, cell culture, western blotting, and CRISPR gene editing. Designed for M.Sc and Ph.D students.",
    duration: "2 Weeks (60 Hours)",
    price: "₹8,000",
    eligibility: "B.Sc/M.Sc in Life Sciences, Biotechnology, or Microbiology",
    startDate: "July 2025",
    venue: "Molecular Biology Lab, SOBT, GBU, Greater Noida",
    highlights: [
      "DNA/RNA Isolation & Quantification",
      "PCR, RT-PCR & Real-Time PCR",
      "Molecular Cloning & Transformation",
      "Western Blotting & ELISA",
      "Cell Culture & Transfection",
      "CRISPR Gene Editing (Demo)",
      "Lab Safety & GLP Training",
      "Certificate on Completion",
    ],
    syllabusLink: "",
  },
  facilities: [
    {
      title: "PCR & Real-Time PCR Suite",
      description:
        "Equipped with gradient thermal cyclers and a Bio-Rad CFX96 real-time PCR system for gene expression analysis and pathogen detection.",
      image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Cell Culture & Tissue Culture Facility",
      description:
        "Class II biological safety cabinets, CO₂ incubators, and inverted microscopes for mammalian and plant cell culture research.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Gel Electrophoresis & Documentation Lab",
      description:
        "Agarose and PAGE electrophoresis systems with UV transilluminator and digital gel documentation for DNA, RNA, and protein analysis.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Protein Purification & Analysis Station",
      description:
        "FPLC system, ultracentrifuge, and spectrophotometers for protein isolation, purification, and characterization studies.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Biosafety Level 2 (BSL-2) Section",
      description:
        "Dedicated containment area for handling pathogenic organisms, recombinant DNA work, and clinical sample processing with HEPA filtration.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
    },
  ],
  talks: [
    {
      title: "CRISPR Revolution: From Lab to Clinic",
      speaker: "Dr. Bhupendra Chaudhary",
      dateTime: "22nd February 2025 · 11 AM",
      venue: "Seminar Hall, SOBT, GBU",
      description:
        "An overview of CRISPR gene editing technology and its applications from laboratory research to clinical gene therapy trials.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
    {
      title: "Molecular Diagnostics in Infectious Diseases",
      speaker: "Dr. Bhaswati Banerjee",
      dateTime: "10th December 2024 · 2 PM",
      venue: "Conference Room, SOBT, GBU",
      description:
        "How molecular techniques like RT-PCR, LAMP, and CRISPR-based diagnostics are transforming infectious disease detection and surveillance.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
    {
      title: "Protein Engineering for Therapeutics",
      speaker: "Prof. Rajeev Varshney",
      dateTime: "5th October 2024 · 10 AM",
      venue: "Molecular Biology Lab, GBU",
      description:
        "Workshop on recombinant protein expression, directed evolution, and antibody engineering for therapeutic applications.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
  ],
  mediaItems: [
    {
      title: "GBU Molecular Biology Lab Receives ICMR Funding",
      date: "2024-11-10",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      description:
        "The Molecular Biology Lab received ₹50 lakh from ICMR for developing a rapid diagnostic kit for dengue virus detection.",
      link: "",
    },
    {
      title: "Students Develop CRISPR-Based Crop Varieties",
      date: "2024-08-20",
      image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=600&q=80",
      description:
        "M.Tech students successfully demonstrated CRISPR-Cas9 gene editing in rice for drought tolerance as part of their thesis project.",
      link: "",
    },
    {
      title: "National Workshop on Advanced Molecular Techniques",
      date: "2024-07-05",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      description:
        "A 5-day hands-on workshop on RT-PCR, Western Blotting, and Cell Culture attracted 80+ participants from institutions across North India.",
      link: "",
    },
    {
      title: "Research Paper Published in Journal of Molecular Biology",
      date: "2024-04-15",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      description:
        "Dr. Bhupendra Chaudhary's team published a paper on novel gene regulatory mechanisms in Journal of Molecular Biology (IF: 6.0).",
      link: "",
    },
  ],
};
