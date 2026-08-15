import { BookOpen, Users, Award, GraduationCap, Globe, Gavel, Scale, Shield } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOL",
  departmentId: "law-governance",
  heroProps: {
    title: "School of Law, Justice & Governance",
    highlight: "Law, Justice & Governance",
    subtitle:
      "Nurturing legal minds with a commitment to justice, ethics, and governance. Approved by the Bar Council of India, our school prepares future advocates, jurists, and policy leaders.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Gavel,
        bg: "bg-gradient-to-br from-red-600 to-red-700",
        subtitle: "Constitutional & Criminal Law",
        description:
          "In-depth study of constitutional jurisprudence, criminal law, human rights, and judicial processes",
      },
      {
        icon: Scale,
        bg: "bg-gradient-to-br from-red-700 to-red-800",
        subtitle: "Corporate & Commercial Law",
        description:
          "Comprehensive training in corporate governance, intellectual property, banking law, and trade regulations",
      },
      {
        icon: Shield,
        bg: "bg-gradient-to-br from-rose-600 to-rose-700",
        subtitle: "Legal Aid & Governance",
        description:
          "Clinical legal education through moot courts, legal aid clinics, and public policy research",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HoD, School of Law",
    image: "https://faculty.gbu.ac.in/uploads/photos/default_male.png",
    name: "Dr. Santosh Kumar Tiwari",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the School of Law, Justice & Governance at Gautam Buddha University! Our school is dedicated to producing legal professionals who are not only well-versed in the letter of the law but also deeply committed to the spirit of justice and ethical governance.",
      "Approved by the Bar Council of India (BCI), our B.A. LL.B. (Hons.) program provides a rigorous five-year integrated legal education that blends foundational arts subjects with comprehensive legal training. Our LL.M. programs offer specialization opportunities for practicing lawyers and legal scholars seeking advanced expertise.",
      "We take pride in our distinguished visiting faculty comprising sitting and retired judges of the High Court and Supreme Court, senior advocates, and eminent law professors from across India. This unique blend of academic and practitioner perspectives enriches classroom learning immensely.",
      "Our emphasis on clinical legal education — through moot court competitions, legal aid camps, client counseling sessions, and legislative drafting exercises — ensures that our students are courtroom-ready and socially conscious. We regularly organize national seminars, workshops, and guest lectures on contemporary legal issues.",
      "I invite you to explore the vibrant academic environment at SOL and join us in our mission to advance justice and good governance.",
    ],
    contact: {
      name: "Dr. Santosh Kumar Tiwari",
      designation: "Head of Department - School of Law",
      email: "hod.sol@gbu.ac.in",
      phone: "0120-234-2823",
    },
  },
  aboutProps: {
    heading: "About the School",
    subheading:
      "Established as a BCI-approved law school, the School of Law, Justice & Governance is committed to excellence in legal education, research, and advocacy for social justice.",
    stats: [
      { icon: Users, numberText: "500+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "18+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "100+", title: "Research Papers", subtitle: "Published" },
      { icon: GraduationCap, numberText: "4", title: "Programs", subtitle: "Offered" },
    ],
    highlights: [
      {
        title: "BCI Approved Law School",
        description:
          "Our B.A. LL.B. (Hons.) program is approved by the Bar Council of India, ensuring that graduates are eligible to enroll as advocates and practice law in courts across India. The curriculum meets the highest standards of legal education prescribed by BCI.",
        dotColor: "#dc2626",
      },
      {
        title: "Distinguished Visiting Faculty",
        description:
          "Our visiting faculty panel includes sitting and former High Court judges, senior advocates, and renowned law professors. Hon'ble Mr. Justice Ravi Shankar Jha, Hon'ble Mr. Justice Pradeep Kumar, Prof. A. Lakshminath, and other eminent jurists regularly engage with students.",
        dotColor: "#991b1b",
      },
      {
        title: "Clinical Legal Education",
        description:
          "Students participate in moot court competitions, legal aid clinics, client counseling workshops, and legislative drafting exercises. The school runs an active Legal Aid Cell that provides free legal assistance to underprivileged communities in the region.",
        dotColor: "#7f1d1d",
      },
    ],
    vision:
      "To be a nationally recognized center of legal education that produces competent, ethical, and socially responsible legal professionals committed to justice and good governance.",
    missionPoints: [
      "Provide quality legal education meeting BCI and UGC standards",
      "Foster critical thinking, legal reasoning, and advocacy skills",
      "Promote research in constitutional law, human rights, and governance",
      "Engage in community service through legal aid and awareness programs",
      "Develop professionals ready for judiciary, litigation, corporate law, and public policy",
    ],
  },
  programsData: [
    {
      title: "B.A. LL.B. (Hons.)",
      duration: "5 Years",
      intake: "120 Students",
      description:
        "A five-year integrated undergraduate program combining Bachelor of Arts with Bachelor of Laws, approved by the Bar Council of India. The program provides a strong foundation in humanities and comprehensive legal training.",
      image:
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-600 to-red-700",
      highlights: [
        "Constitutional Law",
        "Criminal Law & Procedure",
        "Corporate Law",
        "International Law",
        "Human Rights Law",
        "Moot Court Training",
        "Legal Aid Clinic",
        "Internship with Courts & Firms",
      ],
      syllabusUrl: "/schools/law-governance/SoLaw_Integrated_5yrBALLB_CStructure_15Dec21.pdf",
    syllabus: [],
    },
    {
      title: "LL.M. (1 Year Full-Time)",
      duration: "1 Year",
      intake: "40 Students",
      description:
        "An intensive one-year postgraduate program in law designed for law graduates seeking advanced specialization in constitutional law, criminal law, corporate law, or international law.",
      image:
        "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-700 to-red-800",
      highlights: [
        "Advanced Constitutional Law",
        "Jurisprudence & Legal Theory",
        "Research Methodology",
        "Comparative Law",
        "Intellectual Property Rights",
        "Cyber Law",
        "Dissertation",
        "Seminar Presentations",
      ],
      syllabusUrl: "/schools/law-governance/LL.M_One_Year_Programme_Course_Structure.pdf",
    syllabus: [],
    },
    {
      title: "LL.M. (2 Year Weekend Programme)",
      duration: "2 Years",
      intake: "40 Students",
      description:
        "A weekend postgraduate program designed for working legal professionals and advocates who wish to pursue advanced legal studies while continuing their practice.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
      gradient: "from-rose-600 to-rose-700",
      highlights: [
        "Weekend Classes",
        "Advanced Legal Studies",
        "Flexible Scheduling",
        "Practice-Oriented Curriculum",
        "ADR & Mediation",
        "Environmental Law",
        "Labour & Industrial Law",
        "Research Dissertation",
      ],
      syllabusUrl: "/schools/law-governance/LL.M_One_Year_Programme_Course_Structure.pdf",
    syllabus: [],
    },
    {
      title: "Ph.D. in Law",
      duration: "3-5 Years",
      intake: "15 Students",
      description:
        "A doctoral research program for scholars seeking to contribute original research in areas of constitutional law, criminal justice, corporate governance, human rights, and emerging legal challenges.",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-800 to-red-900",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "National & International Seminars",
        "Interdisciplinary Studies",
        "Thesis Defense",
      ],
      syllabusUrl: "/schools/law-governance/SoLaw_PHD_CourseStructureContent_15Dec2021.pdf",
      syllabus: [],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Santosh Kumar Tiwari",
      position: "Assistant Professor & HoD",
      specialization: "Constitutional Law, Administrative Law, Legal Philosophy",
      email: "santosh.tiwari@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_male.png",
      color: "from-red-500 to-red-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Mamta Sharma",
      position: "Assistant Professor",
      specialization: "Family Law, Women & Law, Human Rights Law",
      email: "mamta.sharma@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_female.png",
      color: "from-red-600 to-red-700",
    },
    {
      name: "Dr. Satish Chandra",
      position: "Assistant Professor",
      specialization: "Criminal Law, Criminology, Law of Evidence",
      email: "satish.chandra@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_male.png",
      color: "from-red-700 to-red-800",
    },
    {
      name: "Dr. Rama Sharma",
      position: "Assistant Professor",
      specialization: "Corporate Law, Intellectual Property Rights, Cyber Law",
      email: "rama.sharma@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_female.png",
      color: "from-rose-500 to-rose-600",
    },
    {
      name: "Dr. Poonam Verma",
      position: "Assistant Professor",
      specialization: "Labour Law, Industrial Relations, Social Security Legislation",
      email: "poonam.verma@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_female.png",
      color: "from-rose-600 to-rose-700",
    },
    {
      name: "Dr. Akshay Kumar Singh",
      position: "Assistant Professor",
      specialization: "International Law, Environmental Law, Jurisprudence",
      email: "akshay.singh@gbu.ac.in",
      achievements: "Ph.D: Law",
      image: "https://faculty.gbu.ac.in/uploads/photos/default_male.png",
      color: "from-red-500 to-red-700",
    },
  ],
  facultyStats: {
    text: "Our school has 18+ faculty members including distinguished visiting judges and professors alongside dedicated regular faculty with expertise across all domains of law.",
    stats: [
      {
        icon: BookOpen,
        numberText: "100+",
        subtitle: "Research Papers",
        bg: "bg-red-50",
        color: "text-red-600",
      },
      {
        icon: Award,
        numberText: "6",
        subtitle: "Visiting Judges",
        bg: "bg-rose-50",
        color: "text-rose-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-red-50",
        color: "text-red-700",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-rose-50",
        color: "text-rose-700",
      },
    ],
  },
  researchStats: [
    { numberText: "15+", subtitle: "Research Projects" },
    { numberText: "₹1.5Cr+", subtitle: "Research Funding" },
    { numberText: "100+", subtitle: "Publications" },
    { numberText: "50+", subtitle: "Seminars Organized" },
  ],
  topAchievers: [
    {
      name: "Ankit Verma",
      year: "B.A. LL.B. (Hons.) 2024",
      achievement: "Cleared UP Judiciary (PCS-J), Winner at National Moot Court Competition",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      skills: ["Constitutional Law", "Criminal Law", "Moot Court", "Legal Drafting"],
    },
    {
      name: "Priya Mishra",
      year: "LL.M. 2024",
      achievement: "UGC NET-JRF qualified, Published 5 research papers in SCOPUS journals",
      image: "https://randomuser.me/api/portraits/women/65.jpg",
      skills: ["Human Rights Law", "Research Methodology", "Legal Writing", "International Law"],
    },
    {
      name: "Rahul Dwivedi",
      year: "B.A. LL.B. (Hons.) 2023",
      achievement: "Placed at Cyril Amarchand Mangaldas, National Debate Champion",
      image: "https://randomuser.me/api/portraits/men/78.jpg",
      skills: ["Corporate Law", "Mergers & Acquisitions", "Contract Drafting", "Negotiation"],
    },
  ],
  achievements: [
    {
      title: "BCI Approval & Recognition",
      description: "B.A. LL.B. (Hons.) program approved by Bar Council of India with full recognition",
      icon: Shield,
      color: "text-red-600",
    },
    {
      title: "National Moot Court Excellence",
      description: "Students consistently rank among top teams at national and state-level moot court competitions",
      icon: Gavel,
      color: "text-red-700",
    },
    {
      title: "Legal Aid Outreach",
      description: "Active Legal Aid Cell conducting 50+ camps providing free legal assistance to underserved communities",
      icon: Globe,
      color: "text-rose-600",
    },
    {
      title: "Judicial & Corporate Placements",
      description: "Graduates placed in judiciary services, top law firms, corporate legal departments, and NGOs",
      icon: Scale,
      color: "text-rose-700",
    },
  ],
};

/**
 * Simple departmentData export for backward compatibility and index references.
 */
export const departmentData = {
  schoolCode: "SOL",
  schoolName: "School of Law, Justice & Governance",
  name: "Law, Justice & Governance",
  heading: "School of Law, Justice & Governance",
  subheading: "School of Law, Justice & Governance, Gautam Buddha University",
  overview:
    "The School of Law, Justice & Governance at Gautam Buddha University is a BCI-approved institution offering comprehensive legal education through its integrated B.A. LL.B. (Hons.), LL.M., and Ph.D. programs. With distinguished visiting faculty from the judiciary and a strong emphasis on moot courts, legal aid, and clinical legal education, the school prepares students for careers in litigation, judiciary, corporate law, and public policy.",
  programs: [
    "B.A. LL.B. (Hons.) — 5 Years Integrated",
    "LL.M. (1 Year Full-Time)",
    "LL.M. (2 Year Weekend Programme)",
    "Ph.D. in Law",
  ],
  labs: ["Moot Court Hall", "Legal Aid Clinic", "Law Library"],
  achievements: [
    "BCI Approved Law School",
    "National Moot Court Excellence",
    "Legal Aid Community Outreach",
    "Judicial & Corporate Placements",
  ],
};
