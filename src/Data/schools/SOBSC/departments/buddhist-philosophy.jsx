/**
 * SOBSC — Department of Buddhist Philosophy & Ethics
 * School of Buddhist Studies & Civilization
 */
import { BookOpen, Users, Award, Lightbulb, GraduationCap, Heart, Globe, Brain } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBSC",
  departmentId: "buddhist-philosophy",
  heroProps: {
    title: "Department of Buddhist Philosophy & Ethics",
    highlight: "Buddhist Philosophy & Ethics",
    subtitle:
      "Exploring the profound philosophical traditions of Buddhism and their ethical applications for building a compassionate and peaceful society.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Brain,
        bg: "bg-gradient-to-br from-yellow-500 to-orange-600",
        subtitle: "Buddhist Philosophy",
        description:
          "Study of the Four Noble Truths, Dependent Origination, Madhyamaka, Yogācāra, and Abhidharma traditions",
      },
      {
        icon: Heart,
        bg: "bg-gradient-to-br from-orange-500 to-red-600",
        subtitle: "Buddhist Ethics",
        description:
          "Exploration of Śīla, Karuṇā (compassion), Mettā (loving-kindness), and their contemporary applications",
      },
      {
        icon: Globe,
        bg: "bg-gradient-to-br from-amber-500 to-yellow-600",
        subtitle: "Comparative Studies",
        description:
          "Comparative analysis of Buddhist philosophy with Western and Indian philosophical traditions",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Head, Buddhist Philosophy & Ethics",
    image: "https://faculty.gbu.ac.in/uploads/photos/6820d450b7965_sivasai%20photo.jpg",
    name: "Dr. Chintala Venkata Sivasai",
    designation: "Head of Department (Assistant Professor)",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Buddhist Philosophy & Ethics at the School of Buddhist Studies & Civilization, Gautam Buddha University. Our department is dedicated to the systematic study and research of Buddhist philosophical thought and its ethical dimensions.",
      "Buddhist philosophy offers profound insights into the nature of reality, consciousness, and human experience. Our programs are designed to provide students with a deep understanding of core Buddhist doctrines — the Four Noble Truths, the Eightfold Path, Dependent Origination, the concept of Śūnyatā (emptiness), and the Bodhisattva ideal — while also exploring their relevance to contemporary challenges.",
      "We emphasize both theoretical scholarship and practical application. Our students engage with primary texts in Pali and Sanskrit, participate in meditation retreats, and explore how Buddhist ethical principles can address modern issues such as environmental sustainability, social justice, mental health, and conflict resolution.",
      "With a diverse international student community from over 10 countries, our department provides a unique cross-cultural perspective on Buddhist studies. I invite you to join our academic community and contribute to the ongoing dialogue between ancient wisdom and modern scholarship.",
      "Dr. Chintala Venkata Sivasai\nHead, Department of Buddhist Philosophy & Ethics",
    ],
    contact: {
      name: "Dr. Chintala Venkata Sivasai",
      designation: "Head of Department",
      email: "sivasai@gbu.ac.in",
      phone: "0120-234-9902",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "Established in 2011, our department provides comprehensive education in Buddhist philosophy, ethics, and their contemporary applications.",
    stats: [
      { icon: Users, numberText: "130+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "11+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "50+", title: "Research Papers", subtitle: "Published" },
      { icon: Globe, numberText: "10+", title: "Countries", subtitle: "Represented" },
    ],
    highlights: [
      {
        title: "Global Academic Community",
        description:
          "With more than 90% international students from over 10 countries, our department offers a truly global perspective on Buddhist studies. Students from Myanmar, Thailand, Sri Lanka, Vietnam, Korea, Japan, and other nations bring diverse Buddhist traditions to the classroom.",
        dotColor: "#F59E0B",
      },
      {
        title: "Research Excellence",
        description:
          "Our faculty members are distinguished scholars who have published extensively in peer-reviewed journals and authored books on Buddhist philosophy, ethics, comparative religion, and textual studies. Research areas span from Abhidharma analysis to applied Buddhist ethics.",
        dotColor: "#EF4444",
      },
      {
        title: "Practical Integration",
        description:
          "We integrate theoretical study with practical engagement through regular Vipassana meditation retreats, field visits to Buddhist heritage sites, and participation in international Buddhist conferences and cultural exchanges.",
        dotColor: "#8B5CF6",
      },
    ],
    vision:
      "To be a globally recognized department of Buddhist philosophy that produces scholars, researchers, and thought leaders who contribute to peace, harmony, and ethical living.",
    missionPoints: [
      "Provide rigorous academic training in Buddhist philosophy and ethics",
      "Foster critical thinking and scholarly research in Buddhist studies",
      "Promote interfaith dialogue and comparative philosophical study",
      "Apply Buddhist ethical principles to contemporary global challenges",
      "Build international academic networks for Buddhist scholarship",
    ],
  },
  programsData: [
    {
      title: "M.A. Buddhist Studies",
      duration: "2 Years",
      intake: "40 Students",
      description:
        "A comprehensive postgraduate program covering Buddhist philosophy, ethics, history, languages, and meditation studies with emphasis on primary text engagement.",
      image:
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80",
      gradient: "from-yellow-500 to-orange-600",
      highlights: [
        "Buddhist Philosophy & Ethics",
        "Pali & Sanskrit Languages",
        "Buddhist History & Civilization",
        "Meditation & Mindfulness Studies",
        "Buddhist Art & Architecture",
        "Comparative Religion",
        "Research Methodology",
        "Dissertation",
      ],
    },
    {
      title: "M.Phil Buddhist Studies",
      duration: "2 Years",
      intake: "15 Students",
      description:
        "An advanced research-oriented program for scholars seeking deeper engagement with Buddhist philosophical texts and traditions.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-red-600",
      highlights: [
        "Advanced Buddhist Philosophy",
        "Research Methodology",
        "Textual Criticism",
        "Comparative Buddhist Traditions",
        "Seminar Presentations",
        "Thesis Research",
      ],
    },
    {
      title: "Ph.D. Buddhist Studies",
      duration: "3-5 Years",
      intake: "10 Students",
      description:
        "Doctoral program focused on original research in Buddhist philosophy, ethics, languages, history, or applied Buddhist studies.",
      image:
        "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-yellow-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "International Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "Thesis Defense",
      ],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Chintala Venkata Sivasai",
      position: "Assistant Professor (Head)",
      specialization: "Buddhist Philosophy, Abhidharma Studies, Buddhist Ethics",
      email: "sivasai@gbu.ac.in",
      achievements: "Ph.D., M.A. Buddhist Studies; Published extensively on Theravāda Abhidharma",
      image: "https://faculty.gbu.ac.in/uploads/photos/6820d450b7965_sivasai%20photo.jpg",
      color: "from-yellow-500 to-orange-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Chandrashekhar Paswan",
      position: "Assistant Professor",
      specialization: "Buddhist History, Comparative Religion, Indian Philosophy",
      email: "chandrashekhar@gbu.ac.in",
      achievements: "Ph.D.; Research focus on Buddhist social philosophy and Ambedkarite Buddhist movement",
      image: "https://faculty.gbu.ac.in/uploads/photos/66053c7fcc9ee_chandrashekhar.jpg",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Dr. Arvind Kumar Singh",
      position: "Assistant Professor",
      specialization: "Buddhist Philosophy, Madhyamaka Studies, Buddhist Logic",
      email: "arvind.singh@gbu.ac.in",
      achievements: "Ph.D.; Expertise in Nāgārjuna's Madhyamaka philosophy and Buddhist epistemology",
      image: "https://faculty.gbu.ac.in/uploads/photos/67c148e692499_arving%20singh.JPG",
      color: "from-amber-500 to-yellow-600",
    },
    {
      name: "Dr. Priyadarsini Mitra",
      position: "Assistant Professor",
      specialization: "Buddhist Art, Cultural Studies, Buddhist Heritage Conservation",
      email: "priyadarsini@gbu.ac.in",
      achievements: "Ph.D.; Research on Buddhist iconography and heritage preservation",
      image: "https://faculty.gbu.ac.in/uploads/photos/66053d094c80d_priyadarsini.jpg",
      color: "from-red-500 to-pink-600",
    },
  ],
  facultyStats: {
    text: "Our department has 11+ experienced faculty members with expertise across all areas of Buddhist studies.",
    stats: [
      {
        icon: BookOpen,
        numberText: "100+",
        subtitle: "Research Papers",
        bg: "bg-yellow-50",
        color: "text-yellow-600",
      },
      {
        icon: Award,
        numberText: "15+",
        subtitle: "Books Authored",
        bg: "bg-orange-50",
        color: "text-orange-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "12+",
        subtitle: "Avg Experience",
        bg: "bg-red-50",
        color: "text-red-600",
      },
    ],
  },
  researchStats: [
    { numberText: "25+", subtitle: "Research Projects" },
    { numberText: "₹2Cr+", subtitle: "Research Funding" },
    { numberText: "100+", subtitle: "Publications" },
    { numberText: "10+", subtitle: "Countries Represented" },
  ],
  topAchievers: [
    {
      name: "Ven. Ashin Nyanissara",
      year: "M.A. Buddhist Studies 2023",
      achievement:
        "Selected for Ph.D. at Nalanda University, Published paper in Journal of Buddhist Ethics",
      image:
        "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop",
      skills: ["Buddhist Philosophy", "Pali Language", "Meditation", "Academic Writing"],
    },
    {
      name: "Tenzin Dorjee",
      year: "Ph.D. Buddhist Studies 2024",
      achievement: "UGC-NET/JRF Qualified, International research fellowship in Japan",
      image:
        "https://images.unsplash.com/photo-1646415753793-dcfda1dfeee3?w=600&auto=format&fit=crop",
      skills: ["Tibetan Buddhism", "Sanskrit", "Comparative Philosophy", "Research"],
    },
    {
      name: "Nguyen Thi Mai",
      year: "M.A. Buddhist Studies 2024",
      achievement: "Scholarship at International Buddhist College, Thailand",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      skills: ["Vietnamese Buddhism", "Meditation", "Buddhist Literature", "Translation"],
    },
  ],
  achievements: [
    {
      title: "International Student Body",
      description: "90%+ international students from 10+ countries",
      icon: Globe,
      color: "text-yellow-600",
    },
    {
      title: "Research Publications",
      description: "100+ papers in peer-reviewed journals and conferences",
      icon: BookOpen,
      color: "text-orange-600",
    },
    {
      title: "Vipassana Programs",
      description: "Regular residential meditation retreats for students and public",
      icon: Heart,
      color: "text-red-600",
    },
    {
      title: "Academic Fellowships",
      description: "Students awarded UGC-NET, JRF, and international fellowships",
      icon: GraduationCap,
      color: "text-amber-600",
    },
  ],
};

export const departmentData = {
  schoolCode: "SOBSC",
  schoolName: "School of Buddhist Studies & Civilization",
  name: "Buddhist Philosophy & Ethics",
  heading: "Buddhist Philosophy & Ethics",
  subheading: "Department of Buddhist Philosophy & Ethics, School of Buddhist Studies & Civilization",
  overview: "The Department of Buddhist Philosophy & Ethics at School of Buddhist Studies & Civilization, Gautam Buddha University is dedicated to the systematic study, research, and teaching of Buddhist philosophical thought, ethical principles, and their applications in contemporary society. The department offers M.A., M.Phil., and Ph.D. programs.",
  programs: ["M.A. Buddhist Studies", "M.Phil. Buddhist Studies", "Ph.D. Buddhist Studies"],
  labs: ["Buddhist Studies Research Library", "Digital Manuscript Archive", "Meditation Hall"],
  achievements: ["90%+ International Students from 10+ Countries", "100+ Research Publications", "Regular Vipassana Retreats"],
};
