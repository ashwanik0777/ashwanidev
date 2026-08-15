import { Brain, Heart, Stethoscope, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "psychology",
  heroProps: {
    title: "Department of Psychology & Mental Health",
    highlight: "Psychology & Mental Health",
    subtitle:
      "Understanding the Human Mind — Excellence in clinical psychology, counseling, neuropsychology, health psychology, and psychotherapy with OPD facilities.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Brain,
        bg: "bg-gradient-to-br from-violet-500 to-violet-600",
        subtitle: "Clinical Psychology",
        description: "Psychotherapy, psychological assessment, and clinical interventions",
      },
      {
        icon: Heart,
        bg: "bg-gradient-to-br from-pink-500 to-pink-600",
        subtitle: "Counseling & Health",
        description: "Health psychology, counseling, and well-being promotion",
      },
      {
        icon: Stethoscope,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Neuropsychology",
        description: "Brain-behavior relationships, cognitive neuroscience, and rehabilitation",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Psychology & Mental Health",
    image: "https://faculty.gbu.ac.in/uploads/photos/660538aada591_apsingh.jpg",
    name: "Dr. Anand Pratap Singh",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Psychology & Mental Health at the School of Humanities & Social Sciences, Gautam Buddha University. As one of the largest departments in the school, we are committed to advancing the understanding of human behavior and promoting mental health.",
      "We offer comprehensive programs including B.A./B.Sc. (Hons.) Applied Psychology with Research, M.A./M.Sc. Applied Psychology, M.Phil. Clinical Psychology (RCI recognized), and Ph.D. in Psychology. Our department is equipped with state-of-the-art psychology labs and an active OPD providing mental health services to the community.",
      "Our 11+ faculty members are experts in clinical psychology, counseling, neuropsychology, health psychology, industrial-organizational psychology, and psychotherapy. We maintain active research collaborations and publish extensively in national and international journals.",
      "Our M.Phil. Clinical Psychology program is recognized by the Rehabilitation Council of India (RCI), making our graduates eligible for clinical practice. Join us in making a difference in the lives of individuals and communities through the science of psychology.",
    ],
    contact: {
      name: "Dr. Anand Pratap Singh",
      designation: "Head of Department - Psychology & Mental Health",
      email: "hod.psychology@gbu.ac.in",
      phone: "0120-234-9952",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Psychology & Mental Health is one of the largest departments in SOHSS, offering RCI-recognized clinical programs with dedicated OPD facilities for community mental health services.",
    stats: [
      { icon: Users, numberText: "200+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "11+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "10+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "80+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "RCI Recognized M.Phil. Program",
        description:
          "The M.Phil. Clinical Psychology program is recognized by the Rehabilitation Council of India (RCI), enabling graduates to practice as licensed clinical psychologists across India.",
        dotColor: "#8b5cf6",
      },
      {
        title: "Psychology OPD & Community Services",
        description:
          "Active Out-Patient Department providing mental health services including psychological assessment, counseling, and psychotherapy to students, staff, and the wider community.",
        dotColor: "#ec4899",
      },
      {
        title: "Comprehensive Research & Labs",
        description:
          "Well-equipped psychology labs for experimental psychology, neuropsychology, and psychometric testing. Active research in clinical, health, and industrial-organizational psychology.",
        dotColor: "#14b8a6",
      },
    ],
    vision:
      "To be a premier center for psychology education, clinical training, and mental health research that produces competent professionals committed to human well-being.",
    missionPoints: [
      "Provide quality education in applied psychology with emphasis on clinical training",
      "Conduct impactful research in clinical, health, and organizational psychology",
      "Offer mental health services through OPD and community outreach programs",
      "Train competent clinical psychologists through RCI-recognized programs",
      "Promote mental health awareness and reduce stigma through education and advocacy",
    ],
  },
  programsData: [
    {
      title: "B.A./B.Sc. (Hons.) Applied Psychology with Research",
      duration: "3-4 Years",
      intake: "40 Students",
      description:
        "Comprehensive undergraduate program in applied psychology with integrated research training, covering clinical, developmental, and social psychology.",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=400&q=80",
      gradient: "from-violet-500 to-violet-600",
      highlights: [
        "General Psychology", "Developmental Psychology", "Social Psychology",
        "Abnormal Psychology", "Cognitive Psychology", "Research Methods",
        "Psychometric Testing", "Research Project",
      ],
      syllabusUrl: "/schools/psychology/Psychology_MentalHealth_CStr_May2023.pdf",
    syllabus: [],
    },
    {
      title: "M.A./M.Sc. Applied Psychology",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Advanced program in applied psychology covering clinical assessment, counseling, industrial-organizational psychology, and research methodology.",
      image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=400&q=80",
      gradient: "from-pink-500 to-pink-600",
      highlights: [
        "Clinical Psychology", "Counseling Psychology", "Health Psychology",
        "Organizational Psychology", "Psychopathology", "Psychological Assessment",
        "Research Methodology", "Dissertation",
      ],
      syllabusUrl: "/schools/psychology/Psychology_MentalHealth_CStr_May2023.pdf",
      syllabus: [],
    },
    {
      title: "M.Phil. Clinical Psychology",
      duration: "2 Years",
      intake: "12 Students",
      description:
        "RCI-recognized professional program providing intensive clinical training in psychological assessment, psychotherapy, and rehabilitation.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Clinical Assessment", "Psychotherapy", "Neuropsychology",
        "Child & Adolescent Psychology", "Rehabilitation Psychology", "Clinical Practicum",
        "OPD Training", "Research Dissertation",
      ],
      syllabus: [],
    },
    {
      title: "Ph.D. Psychology",
      duration: "3-5 Years",
      intake: "10 Students",
      description:
        "Doctoral research in clinical, health, neuropsychology, organizational, and counseling psychology with emphasis on original contributions.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-indigo-500 to-indigo-600",
      highlights: [
        "Independent Research", "Advanced Coursework", "Journal Publications",
        "Conference Presentations", "Clinical Supervision", "Teaching Assistantship",
        "Community Outreach", "Thesis Defense",
      ],
      syllabusUrl: "/schools/psychology/Structure_-PhD.pdf",
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 11+ highly qualified faculty members with expertise across all major domains of psychology.",
    stats: [
      { icon: BookOpen, numberText: "80+", subtitle: "Research Papers", bg: "bg-violet-50", color: "text-violet-600" },
      { icon: Award, numberText: "6+", subtitle: "Awards", bg: "bg-pink-50", color: "text-pink-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "90%", subtitle: "PhD Faculty", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-indigo-50", color: "text-indigo-600" },
    ],
  },
  researchStats: [
    { numberText: "10+", subtitle: "Research Projects" },
    { numberText: "₹50L+", subtitle: "Research Funding" },
    { numberText: "80+", subtitle: "Publications" },
    { numberText: "500+", subtitle: "OPD Cases Handled" },
  ],
  topAchievers: [
    {
      name: "Priya Sharma",
      year: "M.Phil. Clinical Psychology 2024",
      achievement: "Selected for NIMHANS fellowship, published 3 papers",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      skills: ["Clinical Assessment", "CBT", "Neuropsychology", "Research"],
    },
    {
      name: "Rahul Verma",
      year: "M.A. Applied Psychology 2023",
      achievement: "UGC-NET qualified, placed at corporate wellness firm",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      skills: ["Organizational Psychology", "Counseling", "Psychometrics", "Training"],
    },
    {
      name: "Neha Gupta",
      year: "Ph.D. Psychology 2024",
      achievement: "Published 6 papers, received ICSSR research grant",
      image: "https://randomuser.me/api/portraits/women/55.jpg",
      skills: ["Health Psychology", "Research Methodology", "Statistical Analysis", "Academic Writing"],
    },
  ],
  achievements: [
    {
      title: "RCI Recognition",
      year: "2018",
      description: "M.Phil. Clinical Psychology program received recognition from the Rehabilitation Council of India",
    },
    {
      title: "Psychology OPD Establishment",
      year: "2019",
      description: "Launched Out-Patient Department providing free mental health services to the community",
    },
    {
      title: "ICSSR Funded Research",
      year: "2023",
      description: "Multiple faculty received ICSSR grants for research on mental health and social well-being",
    },
    {
      title: "National Mental Health Workshop",
      year: "2024",
      description: "Organized national workshop on integrative approaches to mental health with 200+ participants",
    },
  ],
};
