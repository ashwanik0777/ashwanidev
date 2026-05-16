/**
 * SOBT — COE Bioinformatics
 * School of Biotechnology
 * Full data module following the Coedt pattern
 */
export const coeBioinformaticsData = {
  schoolCode: "SOBT",
  schoolName: "School of Biotechnology",
  hero: {
    title: "Centre of Excellence in Bioinformatics",
    subtitle: "Decoding Life Sciences Through Computational Innovation",
    bgTheme: 7,
  },
  about: {
    visionTitle: "Our Vision",
    visionDescription: [
      "To be a national leader in bioinformatics research and education, bridging the gap between biological data and meaningful discoveries.",
      "The COE in Bioinformatics is committed to training next-generation computational biologists who can harness the power of big data to address challenges in healthcare, agriculture, and environmental sustainability.",
    ],
    missionTitle: "Our Mission",
    missionPoints: [
      "Advance genomic and proteomic data analysis capabilities",
      "Develop computational tools and databases for biological research",
      "Train students in modern bioinformatics techniques and programming",
      "Foster interdisciplinary collaborations between biology and computer science",
      "Promote open-source bioinformatics resource development",
    ],
    storyTitle: "Our Story",
    storyText:
      "The Centre of Excellence in Bioinformatics was established to integrate cutting-edge computational techniques with biological research. Born from the growing need to analyze massive genomic datasets, the centre has evolved into a hub for computational biology research, NGS data analysis, and AI-driven drug discovery at Gautam Buddha University.",
    whatWeDoTitle: "What We Do",
    whatWeDoText:
      "We provide advanced computational infrastructure for genome sequencing, structural bioinformatics, molecular docking simulations, and machine learning-based biological data analysis. Our centre supports research in genomics, transcriptomics, proteomics, and systems biology.",
    commitmentTitle: "Our Commitment",
    commitmentText:
      "We are dedicated to democratizing bioinformatics education, making advanced computational tools accessible to researchers, and contributing to India's biotech innovation ecosystem through high-impact research and skilled manpower development.",
    photos: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    ],
  },
  mentors: [
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
      name: "Prof. S. Dhanalakshmi",
      role: "Dean, School of Biotechnology",
      qualifications: "Ph.D. in Biotechnology",
      expertise: "Life Sciences, Academic Leadership, Biotechnology Research, Curriculum Development",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/660536ae760c3_deepali.jpg",
      name: "Dr. Deepali Singh",
      role: "Centre Coordinator — COE Bioinformatics",
      qualifications: "Ph.D. in Bioinformatics",
      expertise: "Computational Biology, Genome Analysis, Structural Bioinformatics, Drug Design",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/660535a7c46a1_gunjangarg.jpg",
      name: "Dr. Gunjan Garg",
      role: "Co-Coordinator — COE Bioinformatics",
      qualifications: "Ph.D. in Genomics & Bioinformatics",
      expertise: "Genomics, NGS Data Analysis, Transcriptomics, Machine Learning in Biology",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/660535f24a586_bhupendra.jpg",
      name: "Dr. Bhupendra Chaudhary",
      role: "Faculty Member — COE Bioinformatics",
      qualifications: "Ph.D. in Molecular Biology",
      expertise: "Genetic Engineering, Molecular Cloning, Genome Assembly, Plant Genomics",
      linkedin: "#",
    },
    {
      type: "GBU",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
      name: "Dr. Rekha Puria",
      role: "Faculty Member — COE Bioinformatics",
      qualifications: "Ph.D. in Molecular Biology",
      expertise: "Gene Regulation, Yeast Genetics, Functional Genomics, Systems Biology",
      linkedin: "#",
    },
  ],
  partners: [
    {
      name: "National Centre for Biological Sciences (NCBS)",
      type: "Research Partner",
      description:
        "Collaboration on structural biology data sharing and computational modeling of protein structures for drug discovery.",
      image: "https://picsum.photos/200?11",
      year: "2021",
    },
    {
      name: "DBT — Dept. of Biotechnology, Govt. of India",
      type: "Funding Partner",
      description:
        "Financial support for bioinformatics infrastructure development, research projects, and student fellowships under DBT-sponsored programmes.",
      image: "https://picsum.photos/200?12",
      year: "2019",
    },
    {
      name: "CSIR-IGIB (Institute of Genomics & Integrative Biology)",
      type: "Research Partner",
      description:
        "Joint research initiatives in genomic data analysis, rare disease genetics, and population genomics studies.",
      image: "https://picsum.photos/200?13",
      year: "2022",
    },
  ],
  projects: [
    {
      name: "Genome Assembly Pipeline",
      description:
        "Development of an automated bioinformatics pipeline for de novo genome assembly and annotation of non-model organisms using Next-Generation Sequencing data.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
      category: "Genomics",
      year: "2024",
      status: "Ongoing",
      technologies: ["Python", "Galaxy", "HPC"],
    },
    {
      name: "AI-Powered Drug Target Identification",
      description:
        "Using deep learning models to identify potential drug targets from proteomic and transcriptomic data for tropical diseases prevalent in India.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
      category: "Drug Discovery",
      year: "2024",
      status: "Ongoing",
      technologies: ["TensorFlow", "PyMOL", "AutoDock"],
    },
    {
      name: "Metagenomic Diversity Study",
      description:
        "Characterization of microbial diversity in soil samples from the Indo-Gangetic plain using 16S rRNA amplicon sequencing and shotgun metagenomics.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
      category: "Metagenomics",
      year: "2023",
      status: "Completed",
      technologies: ["QIIME2", "R", "BLAST"],
    },
    {
      name: "Cancer Biomarker Discovery",
      description:
        "Integrative analysis of multi-omics data (genomics, proteomics, metabolomics) to identify novel biomarkers for early cancer detection.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      category: "Molecular Medicine",
      year: "2024",
      status: "Ongoing",
      technologies: ["R/Bioconductor", "Python", "Machine Learning"],
    },
    {
      name: "Biological Database Development",
      description:
        "Building an open-access database of Indian medicinal plant genomes with functional annotations, chemical compound libraries, and pharmacological data.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80",
      category: "Database",
      year: "2023",
      status: "Completed",
      technologies: ["MySQL", "Django", "REST API"],
    },
  ],
  course: {
    sectionTitle: "Courses & Training Programs",
    sectionSubtitle: "Build expertise in computational biology and bioinformatics",
    imageSrc: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Bioinformatics Workshop",
    badgeText: "POPULAR",
    courseTitle: "Certificate Course in Bioinformatics & Computational Biology",
    courseDescription:
      "Comprehensive training covering sequence analysis, genome assembly, molecular docking, phylogenetics, and machine learning applications in biology. Ideal for life science students and researchers.",
    duration: "8 Weeks",
    price: "₹15,000",
    eligibility: "B.Sc/M.Sc in Life Sciences, Biotech, or related fields",
    startDate: "August 2025",
    venue: "COE Bioinformatics, School of Biotechnology, GBU, Greater Noida",
    highlights: [
      "Hands-on Linux & Python for Bioinformatics",
      "NGS Data Analysis & RNA-Seq",
      "Molecular Docking & Virtual Screening",
      "Phylogenetic Analysis & Evolutionary Biology",
      "Machine Learning for Biological Data",
      "Industry Guest Lectures",
      "Certificate on Completion",
      "Placement Assistance",
    ],
    syllabusLink: "",
  },
  facilities: [
    {
      title: "High-Performance Computing Cluster",
      description:
        "64-core HPC cluster with 512 GB RAM for large-scale genomic computations, molecular dynamics simulations, and deep learning model training.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "NGS Data Analysis Suite",
      description:
        "Dedicated workspace with Galaxy Server, QIIME2, and custom pipelines for Next-Generation Sequencing data processing and visualization.",
      image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Molecular Modeling & Docking Lab",
      description:
        "Advanced workstations with PyMOL, AutoDock Vina, Schrödinger Suite, and GROMACS for protein structure visualization and drug design simulations.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Computational Biology Training Room",
      description:
        "30-seat lab equipped with Linux workstations, projector, and collaborative tools for bioinformatics courses and workshops.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Database & Web Development Lab",
      description:
        "Dedicated space for building and maintaining biological databases, web tools, and REST APIs for data sharing and visualization.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
    },
  ],
  talks: [
    {
      title: "AI Revolution in Drug Discovery",
      speaker: "Dr. Deepali Singh",
      dateTime: "15th March 2025 · 11 AM",
      venue: "Seminar Hall, SOBT, GBU",
      description:
        "How artificial intelligence and machine learning are transforming the drug discovery pipeline — from target identification to lead optimization.",
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
    {
      title: "Genomics in Precision Medicine",
      speaker: "Dr. Gunjan Garg",
      dateTime: "5th January 2025 · 2 PM",
      venue: "Conference Room, SOBT, GBU",
      description:
        "Exploring how whole-genome sequencing and pharmacogenomics are enabling personalized treatment approaches for complex diseases.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
    {
      title: "Building Bioinformatics Pipelines with Snakemake",
      speaker: "Dr. Bhupendra Chaudhary",
      dateTime: "20th November 2024 · 10 AM",
      venue: "COE Bioinformatics Lab, GBU",
      description:
        "Hands-on workshop on designing reproducible bioinformatics workflows using Snakemake for NGS data processing.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      youtubeLink: "",
    },
  ],
  mediaItems: [
    {
      title: "GBU Bioinformatics Centre Receives DBT Funding",
      date: "2024-09-15",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80",
      description:
        "The COE Bioinformatics at GBU received significant funding from the Department of Biotechnology for expanding computational infrastructure.",
      link: "",
    },
    {
      title: "National Workshop on Computational Genomics at GBU",
      date: "2024-06-10",
      image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=600&q=80",
      description:
        "A 5-day national-level workshop on computational genomics and NGS data analysis attracted 100+ participants from across India.",
      link: "",
    },
    {
      title: "GBU Faculty Publish in Nature Communications",
      date: "2024-03-20",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
      description:
        "Dr. Deepali Singh and team published a breakthrough study on AI-driven biomarker discovery in Nature Communications.",
      link: "",
    },
    {
      title: "Bioinformatics Certificate Course Attracts 200+ Applicants",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80",
      description:
        "The 8-week certificate course in bioinformatics received overwhelming response with over 200 applications from across the country.",
      link: "",
    },
  ],
};
