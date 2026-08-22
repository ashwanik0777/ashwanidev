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
        id: "psychology-mental-health",
        title: "Psychology & Mental Health",
        level: "Diploma / Certificate",
        duration: "1 Year",
        intake: "30 Students",
        description: "Applied foundations of mental well-being, stress coping mechanisms, psychological first aid, and community counselling.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80",
        gradient: "from-teal-500 to-cyan-600",
        highlights: [
            "Mental Health Foundations",
            "Stress Management",
            "Psychological First Aid",
            "Community Outreach"
        ],
        syllabusUrl: "https://drive.google.com/file/d/106YadFHMdm93pf5VnGChgGRV3BcXRUuX/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/106YadFHMdm93pf5VnGChgGRV3BcXRUuX/preview"
            }
        ]
    },
    {
        id: "ba-bsc-applied-psychology-research",
        title: "B.A. / B.Sc. (Hons.) with Research in Applied Psychology",
        level: "UG",
        duration: "4 Years",
        intake: "60 Students",
        description: "NEP-aligned undergraduate degree with research focus in cognitive neuroscience, behavioral statistics, and developmental psychology.",
        image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
        gradient: "from-cyan-600 to-blue-600",
        highlights: [
            "Cognitive Neuroscience",
            "Psychometric Testing",
            "Behavioral Statistics",
            "Undergraduate Thesis"
        ],
        syllabusUrl: "https://drive.google.com/file/d/15jvbG5aqNUyvR7UujQOx84EX5lbuSEEN/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/15jvbG5aqNUyvR7UujQOx84EX5lbuSEEN/preview"
            }
        ]
    },
    {
        id: "ma-msc-applied-psychology",
        title: "M.A. / M.Sc. (Applied Psychology)",
        level: "PG",
        duration: "2 Years",
        intake: "40 Students",
        description: "Postgraduate specialization in clinical assessment, organizational behavior, neuropsychology, and therapeutic interventions.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
        gradient: "from-blue-600 to-indigo-700",
        highlights: [
            "Clinical Assessment",
            "Organizational Behavior",
            "Neuropsychology",
            "Hospital Internship"
        ],
        syllabusUrl: "https://drive.google.com/file/d/14NE3m3SynuKELCA7KQnc1qwwQ8k8LdZn/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/14NE3m3SynuKELCA7KQnc1qwwQ8k8LdZn/preview"
            }
        ]
    },
    {
        id: "mphil-clinical-psychology",
        title: "M. Phil. (Clinical Psychology)",
        level: "M.Phil / Pre-Doc",
        duration: "2 Years",
        intake: "12 Students",
        description: "RCI-recognized professional clinical psychology training with supervised clinical postings, psychodiagnostics, and psychotherapy.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80",
        gradient: "from-purple-600 to-pink-700",
        highlights: [
            "RCI Recognized Track",
            "Supervised Clinical Postings",
            "Psychodiagnostics",
            "Psychotherapy Practice"
        ],
        syllabusUrl: "https://drive.google.com/file/d/1qfZu8aB-zNS-T-s9WeIk7k_auh6d0v5f/preview",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/file/d/1qfZu8aB-zNS-T-s9WeIk7k_auh6d0v5f/preview"
            }
        ]
    }
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
