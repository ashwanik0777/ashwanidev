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
        description: "Comprehensive 5-year integrated dual degree covering recombinant DNA technology, bioprocess engineering, and bio-management.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-500 to-teal-600",
        highlights: [
            "Recombinant DNA Technology",
            "Bioprocess & Fermentation",
            "Bio-Management",
            "Master Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/168U9Gk5mqRcByV8O9qyQODPIh7VBCk4h/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/168U9Gk5mqRcByV8O9qyQODPIh7VBCk4h/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1U5BbVtFrzd2xHoJKtqEu9aMsvTzH_yfF/preview"
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
        syllabusUrl: "https://drive.google.com/file/d/18ZYqxtOkFUz4icRfGjzOWF_kxkjpxoEB/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/18ZYqxtOkFUz4icRfGjzOWF_kxkjpxoEB/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/17K1nNYwhzlpSHzXpkln0J56xa9_ybq21/preview"
            }
        ]
    },
    {
        id: "bsc-forensic-science",
        title: "B.Sc. (Hons.) Forensic Science",
        level: "UG",
        duration: "3-4 Years",
        intake: "40 Students",
        description: "Forensic analysis, crime scene documentation, toxicology, digital forensics, DNA profiling, and legal evidence procedures.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-500 to-indigo-600",
        highlights: [
            "Crime Scene Management",
            "Forensic Toxicology",
            "DNA Fingerprinting",
            "Ballistics Analysis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1j1kIPZ49ONP0XwCVFp5CtLYeQsPfKpy7/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1j1kIPZ49ONP0XwCVFp5CtLYeQsPfKpy7/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1sr_N6lvLGhZxBdohX3r_hEwlGeI3zqqh/preview"
            }
        ]
    },
    {
        id: "int-btech-mtech-legacy",
        title: "Integrated B.Tech.-M.Tech./MBA (Legacy Batch)",
        level: "Dual Degree",
        duration: "5 Years",
        intake: "30 Students",
        description: "Curriculum scheme for integrated biotechnology batches enrolled up to 2018.",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-amber-600",
        highlights: [
            "Cellular Biology",
            "Enzyme Technology",
            "Industrial Microbiology",
            "Management Modules"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1uVhh7bF2DZimaLTWgjXrEw1g5sDBiD6i/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1uVhh7bF2DZimaLTWgjXrEw1g5sDBiD6i/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1NN3dMwfyXmSv66_oncZc7Vz0r6eVbAD7/preview"
            }
        ]
    },
    {
        id: "bsc-biotech-research",
        title: "B.Sc. Biotechnology (Hons.) with Research",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "NEP-aligned undergraduate curriculum with intensive lab research in biochemistry, genetics, and cell cultures.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-500 to-cyan-600",
        highlights: [
            "Molecular Genetics",
            "Cell Culture Techniques",
            "Enzymology",
            "Undergraduate Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1-FfhhLnvcQofA-iUEDDQq95fmF5RxkYz/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1-FfhhLnvcQofA-iUEDDQq95fmF5RxkYz/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1TEmZFDNYz2r_0MrMwlD6cmltNHhL56_-/preview"
            }
        ]
    },
    {
        id: "msc-molecular-medicine",
        title: "M.Sc. Molecular Medicine",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Focuses on translational medicine, disease pathophysiology, genetic therapeutics, and modern clinical diagnostics.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
        gradient: "from-rose-500 to-pink-600",
        highlights: [
            "Molecular Diagnostics",
            "Immunotherapy",
            "Cancer Biology",
            "Pharmacogenomics"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1_dT3tkjtyeI1Atp252t4XJJYZFbdwARc/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1_dT3tkjtyeI1Atp252t4XJJYZFbdwARc/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1ugEi25KJquo0ljR2C_NaOpHIkMTaasMU/preview"
            }
        ]
    },
    {
        id: "msc-bioinformatics-genomics",
        title: "M.Sc. Bioinformatics & Genomics",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Computational genomics, NGS data analysis, structural bioinformatics, Python scripting, and drug modeling.",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-500 to-indigo-600",
        highlights: [
            "Next-Gen Sequencing (NGS)",
            "Structural Bioinformatics",
            "Molecular Docking",
            "Python for Biology"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1_oOHFzQQRsNCwuLf85ekR-I54vHv_xZ8/preview",
        syllabus: [
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1_oOHFzQQRsNCwuLf85ekR-I54vHv_xZ8/preview"
            }
        ]
    },
    {
        id: "msc-microbiology",
        title: "M.Sc. Microbiology",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced study of industrial fermentation, virology, immunology, antimicrobial resistance, and microbial genetics.",
        image: "https://images.unsplash.com/photo-1583912267670-6575ad36248b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-orange-600",
        highlights: [
            "Medical Microbiology",
            "Industrial Fermentation",
            "Virology & Immunology",
            "Environmental Microbiology"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1-Kbgx_fmnMLas4VkUOQ_BkCnxWMzZ6aS/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1-Kbgx_fmnMLas4VkUOQ_BkCnxWMzZ6aS/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/17IiKSC-CPyy5odfCQPl6nNwNviVCsruC/preview"
            }
        ]
    },
    {
        id: "msc-life-sciences-specialization",
        title: "M.Sc. Life Sciences (Specializations)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Integrated life science study covering Molecular Medicine, Genomics & Bioinformatics, and Systems Medicine.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-emerald-700",
        highlights: [
            "Molecular Pathology",
            "Genomic Analysis",
            "Systems Physiology",
            "Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1CQgvpOxXYvxLr9hdGWI_j1v9t2Ic46y7/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1CQgvpOxXYvxLr9hdGWI_j1v9t2Ic46y7/preview"
            }
        ]
    },
    {
        id: "mtech-biotech",
        title: "M.Tech. Biotechnology",
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
        syllabusUrl: "https://drive.google.com/file/d/1kcRCRDZPaaDriBC6G4lYRSyvrT1UcpHz/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1kcRCRDZPaaDriBC6G4lYRSyvrT1UcpHz/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1EwInpN0KnU7G6QpYiOOHNmZCDyWlXVTJ/preview"
            }
        ]
    },
    {
        id: "msc-biotech",
        title: "M.Sc. Biotechnology",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Advanced curriculum covering plant and animal biotechnology, genetic engineering, biostatistics, and cellular therapeutics.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-600 to-teal-700",
        highlights: [
            "Genetic Engineering",
            "Plant & Animal Biotech",
            "Immunotechnology",
            "Research Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1k6Dz0cT00dDtwVxRPgMZkxXowU1I5-E_/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1k6Dz0cT00dDtwVxRPgMZkxXowU1I5-E_/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1FTrWGOO5tuPChsyT3FLCT-QVMe1Ebeej/preview"
            }
        ]
    },
    {
        id: "int-msc-phd-lifesciences",
        title: "Integrated M.Sc.-Ph.D. Life Sciences & Systems Medicine",
        level: "Doctoral",
        duration: "5 Years",
        intake: "15 Students",
        description: "Direct doctoral research pathway bridging master's level modules with comprehensive Ph.D. dissertation research.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
        gradient: "from-violet-600 to-purple-700",
        highlights: [
            "Integrated Doctoral Track",
            "Systems Medicine",
            "Translational Lab Research",
            "Ph.D. Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1ymkmWlwk9vTlzqx6D0sX0ziouguMx6Vf/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1ymkmWlwk9vTlzqx6D0sX0ziouguMx6Vf/preview"
            }
        ]
    },
    {
        id: "phd-biotech",
        title: "Ph.D. in Biotechnology",
        level: "Doctoral",
        duration: "3-5 Years",
        intake: "20 Students",
        description: "Doctoral research program promoting original scientific discovery in industrial microbiology, molecular medicine, and agriculture.",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-green-600 to-teal-800",
        highlights: [
            "Independent Research",
            "Indexed Journal Publications",
            "Instrument Access",
            "Doctoral Defense"
        ],
        syllabusUrl: "https://drive.google.com/file/d/16yXxSyi1j5Ljfp6S62RQGtCEWs7-rr1F/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/16yXxSyi1j5Ljfp6S62RQGtCEWs7-rr1F/preview"
            },
            {
                session: "Course Content",
                url: "https://drive.google.com/file/d/1EnerWHqQYlO3qicAubmPNmHhvFuf7r22/preview"
            }
        ]
    },
    {
        id: "msc-research-biotech",
        title: "M.Sc. (Research) in Biotechnology (1 Year)",
        level: "PG",
        duration: "1 Year",
        intake: "15 Students",
        description: "Intensive 1-year research-centric master's program dedicated to full-time laboratory investigation and thesis writing.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-600 to-cyan-700",
        highlights: [
            "1-Year Intensive Track",
            "Dedicated Lab Project",
            "Research Methodology",
            "Thesis Publication"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1EUS9qw9vzUF71PGY5VyYjLrVahJxJkxo/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1EUS9qw9vzUF71PGY5VyYjLrVahJxJkxo/preview"
            }
        ]
    },
    {
        id: "msc-life-sciences-bioinfo",
        title: "M.Sc. Life Sciences (Bioinformatics & Systems Medicine)",
        level: "PG",
        duration: "2 Years",
        intake: "25 Students",
        description: "Postgraduate degree emphasizing systems biology modeling, molecular genetics, and computational drug discovery.",
        image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Systems Biology",
            "Computational Modeling",
            "Genomics Analysis",
            "Master Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1wdFLSNtEh-ey7m9H_qqHk5mAeginKq6i/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1wdFLSNtEh-ey7m9H_qqHk5mAeginKq6i/preview"
            }
        ]
    },
    {
        id: "msc-nuclear-medicine",
        title: "M.Sc. Nuclear Medicine",
        level: "PG",
        duration: "2 Years",
        intake: "15 Students",
        description: "Clinical postgraduate program in radiopharmacy, radiation safety, instrumentation, and PET/SPECT imaging workflows.",
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-violet-700",
        highlights: [
            "Radiopharmacy",
            "PET/SPECT Imaging",
            "Radiation Dosimetry",
            "Clinical Internship"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1I5sqQ8XIbI7JNPKN8BizxmKAUTCq22wy/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1I5sqQ8XIbI7JNPKN8BizxmKAUTCq22wy/preview"
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
