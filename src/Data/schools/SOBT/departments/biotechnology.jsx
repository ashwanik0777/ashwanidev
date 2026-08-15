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
      title: "Integrated B.Tech–M.Tech Biotechnology",
      duration: "5 Years",
      intake: "40 Students",
      description:
        "A comprehensive dual-degree program combining undergraduate and postgraduate studies in Biotechnology with specializations in Genetic Engineering and Bioinformatics.",
      image:
        "https://images.unsplash.com/photo-1581091012184-5c0c9b4f5f5f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-500 to-green-600",
      highlights: [
        "Molecular Biology",
        "Genetic Engineering",
        "Bioinformatics",
        "Biochemistry",
        "Immunology",
        "Fermentation Technology",
        "Research Project",
        "Industry Internship",
      ],
      syllabusUrl: "/schools/biotechnology/CStr_IntBTechMTech-2023onwards.pdf",
      syllabus: [
        {
                session: "2020-21",
                url: "/schools/biotechnology/Course_Struture_MTech_2020_onwards.pdf"
        }
],
    },
    {
      title: "M.Sc Biotechnology (DBT Sponsored)",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "DBT-sponsored postgraduate program with focus on research and innovation in biotechnology.",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-emerald-600",
      highlights: [
        "Advanced Molecular Biology",
        "Genomics & Proteomics",
        "Bioprocess Technology",
        "Bioinformatics Tools",
        "Research Methodology",
        "Lab Rotations",
        "Dissertation Project",
        "Industry Exposure",
      ],
      syllabusUrl: "/schools/biotechnology/Course_Struture_M.Sc._Biotech.pdf",
    syllabus: [],
    },
    {
      title: "M.Tech Biotechnology",
      duration: "2 Years",
      intake: "25 Students",
      description:
        "Advanced postgraduate program focusing on applied biotechnology, genetic engineering, and bioinformatics with industry-relevant specializations.",
      image:
        "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Genetic Engineering",
        "Bioprocess Engineering",
        "Bioinformatics",
        "Industrial Biotechnology",
        "Environmental Biotechnology",
        "Advanced Instrumentation",
        "Research Thesis",
        "Industrial Training",
      ],
      syllabusUrl: "/schools/biotechnology/Course_Struture_MTech_2020_onwards.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. in Biotechnology",
      duration: "3-5 Years",
      intake: "10 Students",
      description:
        "Doctoral program focused on advanced research in diverse areas of biotechnology.",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Publications",
        "Industry Collaborations",
        "Teaching Assistantship",
        "International Exposure",
        "Patent Filing",
        "Thesis Defense",
      ],
      syllabusUrl: "/schools/biotechnology/Course_Structure_PHD_2020_onwards.pdf",
      syllabus: [
        {
                session: "2020-21",
                url: "/schools/bioinformatics/Course_Structure_PHD_2020_onwards.pdf"
        }
],
    },
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
