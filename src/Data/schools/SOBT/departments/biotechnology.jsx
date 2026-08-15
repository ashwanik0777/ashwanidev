import { Microscope, Dna, FlaskConical, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBT",
  departmentId: "biotechnology",
  heroProps: {
    title: "Department of Biotechnology",
    highlight: "Biotechnology",
    subtitle:
      "Pioneering innovation in life sciences education. Empowering students to become tomorrow's biotechnology leaders and researchers.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Dna,
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        subtitle: "Genetic Engineering",
        description:
          "Gene editing, CRISPR technology, and transgenic organism development",
      },
      {
        icon: Microscope,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Molecular Biology",
        description:
          "DNA/RNA analysis, protein chemistry, and molecular diagnostics",
      },
      {
        icon: FlaskConical,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Bioprocess Engineering",
        description:
          "Fermentation technology, downstream processing, and scale-up operations",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Biotechnology",
    image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
    name: "Dr. Rekha Puria",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Biotechnology at the School of Biotechnology, Gautam Buddha University! Biotechnology is one of the most transformative fields of modern science, with applications spanning healthcare, agriculture, environmental conservation, and industrial manufacturing.",
      "Our department offers comprehensive programs that blend rigorous theoretical education with extensive hands-on laboratory training. We emphasize research-oriented learning where students work on real-world problems under the mentorship of experienced faculty members.",
      "We regularly organize workshops, seminars, conferences, and guest lectures by eminent scientists from national and international institutions. Our faculty members are actively engaged in cutting-edge research in areas like genetic engineering, molecular medicine, bioinformatics, and environmental biotechnology.",
      "Our graduates have successfully placed in leading pharmaceutical companies, research organizations, and academic institutions. We strive to create professionals who are not only technically competent but also socially responsible.",
      "If you have any questions, please feel free to reach out. We are here to support you on your journey.",
    ],
    contact: {
      name: "Dr. Rekha Puria",
      designation: "Head of Department - Biotechnology",
      email: "rekha.puria@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2008, our department has been at the forefront of biotechnology education and research.",
    stats: [
      { icon: Users, numberText: "300+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "15+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "25+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "8+", title: "Patents Filed", subtitle: "Innovations" },
    ],
    highlights: [
      {
        title: "Excellence in Education",
        description:
          "Our department offers comprehensive undergraduate and postgraduate programs designed to meet the evolving needs of the biotechnology industry. We emphasize both theoretical foundations and practical laboratory skills.",
        dotColor: "#22c55e",
      },
      {
        title: "Research & Innovation",
        description:
          "We are actively engaged in cutting-edge research in genetic engineering, molecular medicine, bioinformatics, and environmental biotechnology. Our faculty and students regularly publish in top-tier journals.",
        dotColor: "#06b6d4",
      },
      {
        title: "Industry Partnerships",
        description:
          "Strong collaborations with leading pharma and biotech companies provide our students with internship opportunities, industry projects, and placement assistance. We maintain partnerships with Biocon, Cipla, Serum Institute, and more.",
        dotColor: "#6366f1",
      },
    ],
    vision:
      "To be a globally recognized center of excellence in biotechnology education, research, and innovation contributing to healthcare and sustainable development.",
    missionPoints: [
      "Provide quality education in biotechnology and allied fields",
      "Conduct cutting-edge research in emerging areas of life sciences",
      "Foster innovation and entrepreneurship among students",
      "Collaborate with industry and academic institutions globally",
      "Contribute to societal development through biotechnological solutions",
    ],
  },
  programsData: [
    {
        id: "int-btech-mtech-biotech",
        title: "Integrated B.Tech.- M.Tech. / MBA (Biotechnology)",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "60 Students",
        description: "Comprehensive 5-year integrated program covering recombinant DNA technology, bioprocess engineering, and biotech management.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-500 to-teal-600",
        highlights: [
            "Recombinant DNA Technology",
            "Bioprocess & Fermentation",
            "Bio-Management",
            "Master Thesis"
        ],
        syllabusUrl: "/schools/biotechnology/CStr_IntBTechMTech-2023onwards.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/CStr_IntBTechMTech-2023onwards.pdf"
            },
            {
                session: "Course Content",
                url: "/schools/biotechnology/BSc-ForensicScience-CourseContent.pdf"
            }
        ]
    },
    {
        id: "int-bsc-msc-ayurveda",
        title: "Integrated B.Sc.- M.Sc. Ayurveda Biology",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "30 Students",
        description: "Interdisciplinary study combining fundamental Ayurvedic concepts with modern biological, pharmacological, and genomic tools.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-500 to-emerald-600",
        highlights: [
            "Ayurvedic Pharmacognosy",
            "Phytochemistry",
            "Herbal Drug Standardization",
            "Systems Biology"
        ],
        syllabusUrl: "/schools/biotechnology/B.Sc-MSc-AyurvedaBiology-CCont-16apr25.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/B.Sc-MSc-AyurvedaBiology-CCont-16apr25.pdf"
            }
        ]
    },
    {
        id: "bsc-forensic-science",
        title: "B.Sc. (Hons.) Forensic Science",
        level: "UG",
        duration: "3-4 Years",
        intake: "40 Students",
        description: "Rigorous forensic education covering crime scene investigation, forensic toxicology, serology, DNA fingerprinting, and digital forensics.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-indigo-600",
        highlights: [
            "Crime Scene Investigation",
            "Forensic Toxicology",
            "DNA Profiling",
            "Forensic Ballistics"
        ],
        syllabusUrl: "/schools/biotechnology/BSc-ForensicScience-CourseContent.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/BSc-ForensicScience-CourseContent.pdf"
            }
        ]
    },
    {
        id: "bsc-biotech-research",
        title: "B.Sc. Biotechnology (Hons.) with Research",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "NEP-aligned undergraduate degree providing research immersion in molecular biology, biochemistry, enzymology, and cell cultures.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-500 to-cyan-600",
        highlights: [
            "Molecular Genetics",
            "Cell Culture Techniques",
            "Enzymology",
            "Undergraduate Research Thesis"
        ],
        syllabusUrl: "/schools/biotechnology/BSc_Biotechnology-ProgramStructure2022-26Jan26.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/BSc_Biotechnology-ProgramStructure2022-26Jan26.pdf"
            }
        ]
    },
    {
        id: "msc-molecular-medicine",
        title: "M.Sc. Molecular Medicine",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Postgraduate curriculum focusing on disease mechanisms, gene therapy, immunotherapy, and molecular diagnostic platforms.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
        gradient: "from-rose-500 to-pink-600",
        highlights: [
            "Molecular Diagnostics",
            "Immunotherapy",
            "Cancer Biology",
            "Pharmacogenomics"
        ],
        syllabusUrl: "/schools/biotechnology/Course_Struture_M.Sc._Nuclear_Medicine_Final_25426.docx.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/Course_Struture_M.Sc._Nuclear_Medicine_Final_25426.docx.pdf"
            }
        ]
    },
    {
        id: "msc-bioinformatics-genomics",
        title: "M.Sc. Bioinformatics & Genomics",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Advanced computational biology, genome sequencing analysis, structural bioinformatics, and drug design workflows.",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-indigo-600",
        highlights: [
            "Next-Generation Sequencing",
            "Structural Bioinformatics",
            "Molecular Docking",
            "Python for Genomics"
        ],
        syllabusUrl: "/schools/biotechnology/MSc_Bioinformatics_CourseContent.pdf",
        syllabus: [
            {
                session: "Course Content",
                url: "/schools/biotechnology/MSc_Bioinformatics_CourseContent.pdf"
            }
        ]
    },
    {
        id: "msc-microbiology",
        title: "M.Sc. Microbiology",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced study of industrial fermentation, virology, immunology, environmental microbiology, and antimicrobial resistance.",
        image: "https://images.unsplash.com/photo-1583912267670-6575ad36248b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-orange-600",
        highlights: [
            "Medical Microbiology",
            "Industrial Fermentation",
            "Virology & Immunology",
            "Environmental Microbiology"
        ],
        syllabusUrl: "/schools/biotechnology/MSc-Microbiology-CS-2025-27.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/MSc-Microbiology-CS-2025-27.pdf"
            }
        ]
    },
    {
        id: "mtech-biotech",
        title: "M.Tech. Biotechnology (2 Years)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Postgraduate engineering in bioreactor design, downstream purification, metabolic engineering, and synthetic biology.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-600 to-blue-700",
        highlights: [
            "Bioreactor Scale-up",
            "Downstream Processing",
            "Metabolic Engineering",
            "Master Dissertation"
        ],
        syllabusUrl: "/schools/biotechnology/CCnt_Integrated_BTech-MTech_Up_to_Batch_2018.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/CCnt_Integrated_BTech-MTech_Up_to_Batch_2018.pdf"
            }
        ]
    },
    {
        id: "msc-biotech",
        title: "M.Sc. Biotechnology (2 Years)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Advanced curriculum covering plant & animal biotechnology, genetic engineering, biostatistics, and cellular therapeutics.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-600 to-teal-700",
        highlights: [
            "Genetic Engineering",
            "Plant & Animal Biotech",
            "Immunotechnology",
            "Research Thesis"
        ],
        syllabusUrl: "/schools/biotechnology/B.Sc-MSc-AyurvedaBiology-CCont-16apr25.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/B.Sc-MSc-AyurvedaBiology-CCont-16apr25.pdf"
            }
        ]
    },
    {
        id: "msc-nuclear-medicine",
        title: "M.Sc. Nuclear Medicine",
        level: "PG",
        duration: "2 Years",
        intake: "15 Students",
        description: "Specialized clinical curriculum in radio-pharmacy, radiation physics, SPECT/PET imaging instrumentation, and radiation safety.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-violet-700",
        highlights: [
            "Radiopharmacy",
            "PET/SPECT Imaging",
            "Radiation Dosimetry",
            "Clinical Internship"
        ],
        syllabusUrl: "/schools/biotechnology/Course_Struture_M.Sc._Nuclear_Medicine_Final_25426.docx.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/Course_Struture_M.Sc._Nuclear_Medicine_Final_25426.docx.pdf"
            }
        ]
    },
    {
        id: "msc-life-sciences",
        title: "M.Sc. Life Sciences",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Specializations in Molecular Medicine, Bioinformatics & Genomics, and Systems Medicine with interdisciplinary lab modules.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-emerald-700",
        highlights: [
            "Molecular Pathology",
            "Genomic Analysis",
            "Systems Physiology",
            "Dissertation"
        ],
        syllabusUrl: "/schools/biotechnology/MSc-LifeSciences-CS-2025-27.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/MSc-LifeSciences-CS-2025-27.pdf"
            }
        ]
    },
    {
        id: "phd-biotech",
        title: "Ph.D. in Biotechnology",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "20 Students",
        description: "Doctoral research program promoting original scientific discoveries across industrial biotechnology, healthcare, and genomics.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-800",
        highlights: [
            "Independent Research",
            "Indexed Journal Publications",
            "Specialized Instrument Access",
            "Thesis Defense"
        ],
        syllabusUrl: "/schools/biotechnology/Course_Structure_PHD_2020_onwards.pdf",
        syllabus: [
            {
                session: "Course Structure",
                url: "/schools/biotechnology/Course_Structure_PHD_2020_onwards.pdf"
            }
        ]
    }
],
  facultyMembers: [
    {
      name: "Prof. S. Dhanalakshmi",
      position: "Professor and Dean",
      specialization: "Molecular Biology, Biochemistry, Enzymology",
      email: "dean.sobt@gbu.ac.in",
      achievements: "Ph.D: Life Sciences",
      image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
      color: "from-green-500 to-green-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Rekha Puria",
      position: "Assistant Professor and HoD",
      specialization: "Yeast Biology, Gene Regulation, Stress Response",
      email: "rekha.puria@gbu.ac.in",
      achievements: "Ph.D: Biotechnology",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
      color: "from-emerald-500 to-emerald-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Bhupendra Chaudhary",
      position: "Assistant Professor",
      specialization: "Plant Molecular Biology, Genetic Engineering, Genomics",
      email: "bhupendra.chaudhary@gbu.ac.in",
      achievements: "Ph.D: Plant Molecular Biology",
      image: "https://faculty.gbu.ac.in/uploads/photos/660535f24a586_bhupendra.jpg",
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Dr. Barkha Singhal",
      position: "Assistant Professor",
      specialization: "Environmental Microbiology, Bioremediation, Waste Management",
      email: "barkha.singhal@gbu.ac.in",
      achievements: "Ph.D: Microbiology",
      image: "https://faculty.gbu.ac.in/uploads/photos/6605368841650_barkha.jpg",
      color: "from-blue-500 to-blue-600",
    },
  ],
  facultyStats: {
    text: "Our department has 15+ experienced faculty members with expertise across all areas of biotechnology.",
    stats: [
      {
        icon: BookOpen,
        numberText: "200+",
        subtitle: "Research Papers",
        bg: "bg-green-50",
        color: "text-green-600",
      },
      {
        icon: Award,
        numberText: "15+",
        subtitle: "Awards",
        bg: "bg-emerald-50",
        color: "text-emerald-600",
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
        numberText: "12+",
        subtitle: "Avg Experience",
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
    ],
  },
  researchStats: [
    { numberText: "25+", subtitle: "Research Projects" },
    { numberText: "₹5Cr+", subtitle: "Research Funding" },
    { numberText: "200+", subtitle: "Publications" },
    { numberText: "8+", subtitle: "Patents Filed" },
  ],
  topAchievers: [
    {
      name: "Sneha Sharma",
      year: "M.Tech Biotech 2024",
      achievement: "Placed at Serum Institute, Published 3 research papers",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      skills: ["Molecular Biology", "Genomics", "Cell Culture", "Data Analysis"],
    },
    {
      name: "Rohit Kumar",
      year: "Int. B.Tech Biotech 2024",
      achievement: "DBT Fellowship, Interned at ICGEB New Delhi",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      skills: ["Genetic Engineering", "PCR", "Bioinformatics", "Lab Techniques"],
    },
    {
      name: "Kavya Reddy",
      year: "M.Sc Bioinformatics 2024",
      achievement: "Best Poster Award at National Conference, Placed at Syngene",
      image: "https://randomuser.me/api/portraits/women/72.jpg",
      skills: ["Computational Biology", "Python", "NGS Analysis", "Drug Design"],
    },
  ],
  achievements: [
    {
      title: "DBT Star Program",
      description: "Department recognized under DBT Star College Scheme",
      icon: Award,
      color: "text-green-600",
    },
    {
      title: "Research Publications",
      description: "200+ papers in top-tier life science journals",
      icon: BookOpen,
      color: "text-emerald-600",
    },
    {
      title: "Industry Collaborations",
      description: "MoUs with Biocon, ICGEB, NBRI for research & training",
      icon: Lightbulb,
      color: "text-teal-600",
    },
    {
      title: "Placement Record",
      description: "70%+ placements in pharma & biotech companies",
      icon: GraduationCap,
      color: "text-blue-600",
    },
  ],
};
