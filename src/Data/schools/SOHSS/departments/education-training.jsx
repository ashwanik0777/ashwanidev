import { BookOpen, Users, Award, Lightbulb, GraduationCap, School, Brain, HeartHandshake, BookOpenCheck } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOHSS",
  departmentId: "education-training",
  heroProps: {
    title: "Department of Education & Training",
    highlight: "Education & Training",
    subtitle:
      "Shaping the educators of tomorrow through innovative pedagogy, NEP 2020 alignment, and inclusive education practices. Building a strong foundation for teacher education and educational research.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: School,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Teacher Education",
        description:
          "Comprehensive B.Ed. and integrated teacher education programs aligned with NEP 2020 framework",
      },
      {
        icon: Brain,
        bg: "bg-gradient-to-br from-purple-500 to-purple-600",
        subtitle: "Educational Psychology",
        description:
          "Child development, learning theories, educational psychology, and counseling for holistic student growth",
      },
      {
        icon: HeartHandshake,
        bg: "bg-gradient-to-br from-green-500 to-green-600",
        subtitle: "Inclusive Education",
        description:
          "Special education, inclusive pedagogy, and equitable education practices for diverse learners",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Education & Training",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Rakesh Kr. Srivastava",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Education & Training at the School of Humanities & Social Sciences, Gautam Buddha University! Education is the most powerful instrument of social transformation, and our department is dedicated to preparing teachers and educators who can lead this transformation.",
      "Our department offers a diverse portfolio of programs including B.Ed., Integrated Teacher Education Programs (ITEP), Bachelor of Physical Education & Sports (BPES), and M.A. Education, all aligned with the National Education Policy 2020. We emphasize experiential learning, reflective practice, and innovative pedagogy.",
      "Our faculty members are accomplished scholars in education, educational psychology, curriculum development, and inclusive education. They bring a blend of theoretical expertise and practical classroom experience that enriches our academic programs.",
      "We maintain strong connections with schools and educational institutions for teaching practice, internships, and collaborative research. Our students benefit from hands-on classroom experiences, micro-teaching sessions, and exposure to diverse educational settings.",
      "We believe in nurturing educators who are not just subject matter experts but also empathetic, inclusive, and committed to the holistic development of every learner. Join us in this noble mission of transforming education.",
    ],
    contact: {
      name: "Dr. Rakesh Kr. Srivastava",
      designation: "Head of Department - Education & Training",
      email: "rakesh.srivastava@gbu.ac.in",
      phone: "0120-234-9901",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Education & Training is committed to excellence in teacher education, educational research, and curriculum development, preparing future educators aligned with NEP 2020 vision.",
    stats: [
      { icon: Users, numberText: "200+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "6+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "8+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "45+", title: "Publications", subtitle: "In Journals" },
    ],
    highlights: [
      {
        title: "NEP 2020 Aligned Programs",
        description:
          "Our programs are designed in alignment with the National Education Policy 2020, emphasizing multidisciplinary education, experiential learning, and competency-based curricula. The Integrated Teacher Education Program (ITEP) is a flagship offering under the new policy framework.",
        dotColor: "#3b82f6",
      },
      {
        title: "Practical Classroom Training",
        description:
          "We emphasize hands-on teaching practice through micro-teaching, simulated teaching, and extended school internships. Students gain real classroom experience in diverse educational settings including government schools, private institutions, and inclusive education centers.",
        dotColor: "#a855f7",
      },
      {
        title: "Inclusive & Special Education",
        description:
          "The department is committed to promoting inclusive education practices. Our programs prepare teachers to work effectively with diverse learners, including students with special needs, through specialized coursework and practical exposure.",
        dotColor: "#22c55e",
      },
    ],
    vision:
      "To be a premier center for teacher education and educational research, producing competent, reflective, and compassionate educators who contribute to building an equitable and quality education system.",
    missionPoints: [
      "Provide quality teacher education aligned with NEP 2020 framework",
      "Foster research in educational psychology, curriculum development, and pedagogy",
      "Promote inclusive education and special education practices",
      "Develop reflective and innovative teaching professionals",
      "Build partnerships with schools and educational institutions for practical training",
    ],
  },
  programsData: [
    {
      title: "B.Ed.",
      duration: "2 Years",
      intake: "50 Students",
      description:
        "A professional teacher education program preparing graduates for teaching in secondary and senior secondary schools with emphasis on pedagogy, classroom management, and educational technology.",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Pedagogy of School Subjects",
        "Educational Psychology",
        "Classroom Management",
        "Educational Technology",
        "Assessment & Evaluation",
        "Inclusive Education",
        "Teaching Practice",
        "School Internship",
      ],
      syllabusUrl: "/schools/education-training/BeD_Prog.pdf",
      syllabus: [],
    },
    {
      title: "B.Sc B.Ed./B.Com. B.Ed./B.A. B.Ed. ITEP",
      duration: "4 Years",
      intake: "50 Students",
      description:
        "Integrated Teacher Education Programs aligned with NEP 2020, combining subject expertise with professional teacher preparation in a four-year dual-degree framework.",
      image:
        "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-500 to-purple-600",
      highlights: [
        "Subject Specialization",
        "Foundation of Education",
        "Pedagogy & Methods",
        "Educational Psychology",
        "School Internship",
        "Community Engagement",
        "ICT in Education",
        "Action Research",
      ],
      syllabusUrl: "/schools/education-training/ITEP_CourseStructure.pdf",
      syllabus: [],
    },
    {
      title: "BPES (Bachelor of Physical Education & Sports)",
      duration: "3 Years",
      intake: "30 Students",
      description:
        "A comprehensive undergraduate program in physical education and sports science, preparing students for careers in sports coaching, fitness training, and physical education teaching.",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80",
      gradient: "from-green-500 to-green-600",
      highlights: [
        "Sports Science",
        "Physical Fitness",
        "Coaching Methods",
        "Sports Psychology",
        "Kinesiology",
        "Health Education",
        "Sports Management",
        "Practical Training",
      ],
      syllabusUrl: "/schools/education-training/BPES_CStr_May2023.pdf",
    syllabus: [],
    },
    {
      title: "M.A. Education",
      duration: "2 Years",
      intake: "25 Students",
      description:
        "An advanced postgraduate program exploring educational theory, research methodology, curriculum development, and specialized areas of education studies.",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-500 to-amber-600",
      highlights: [
        "Philosophy of Education",
        "Educational Research",
        "Curriculum Development",
        "Comparative Education",
        "Educational Administration",
        "Teacher Education",
        "Special Education",
        "Dissertation",
      ],
      syllabusUrl: "/schools/education-training/CStr-Education-25.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. Education",
      duration: "3-5 Years",
      intake: "8 Students",
      description:
        "A doctoral program for advanced research in education, pedagogy, curriculum studies, and related interdisciplinary areas under expert faculty supervision.",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=400&q=80",
      gradient: "from-rose-500 to-rose-600",
      highlights: [
        "Independent Research",
        "Advanced Coursework",
        "Conference Presentations",
        "Journal Publications",
        "Teaching Assistantship",
        "Policy Research",
        "Interdisciplinary Studies",
        "Thesis Defense",
      ],
      syllabusUrl: "/schools/education-training/Structure_-PhD.pdf",
      syllabus: [],
    },
  ],
  facultyMembers: [
    {
      name: "Dr. Rakesh Kr. Srivastava",
      position: "Assistant Professor and HoD",
      specialization: "Teacher Education, Curriculum Development, Educational Administration",
      email: "rakesh.srivastava@gbu.ac.in",
      achievements: "Ph.D: Education",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-blue-500 to-blue-600",
      extraIcon: Award,
    },
    {
      name: "Dr. Vinod Kumar Shanwal",
      position: "Associate Professor",
      specialization: "Educational Psychology, Emotional Intelligence, Counseling",
      email: "vinod.shanwal@gbu.ac.in",
      achievements: "Ph.D: Psychology",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Dr. Shrutee Kanwar",
      position: "Assistant Professor",
      specialization: "Science Education, Educational Technology, ICT in Education",
      email: "shrutee.kanwar@gbu.ac.in",
      achievements: "Ph.D: Education",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Dr. Mamta Rani",
      position: "Assistant Professor",
      specialization: "Inclusive Education, Special Education, Child Development",
      email: "mamta.rani@gbu.ac.in",
      achievements: "Ph.D: Education",
      image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
      color: "from-amber-500 to-amber-600",
    },
  ],
  facultyStats: {
    text: "Our department has 6+ experienced faculty members specializing in teacher education, educational psychology, and curriculum development.",
    stats: [
      {
        icon: BookOpen,
        numberText: "45+",
        subtitle: "Publications",
        bg: "bg-blue-50",
        color: "text-blue-600",
      },
      {
        icon: Award,
        numberText: "8+",
        subtitle: "Awards",
        bg: "bg-purple-50",
        color: "text-purple-600",
      },
      {
        icon: GraduationCap,
        custom: "PhD",
        numberText: "100%",
        subtitle: "PhD Faculty",
        bg: "bg-green-50",
        color: "text-green-600",
      },
      {
        icon: GraduationCap,
        custom: "Exp",
        numberText: "10+",
        subtitle: "Avg Experience",
        bg: "bg-amber-50",
        color: "text-amber-600",
      },
    ],
  },
  researchStats: [
    { numberText: "8+", subtitle: "Research Projects" },
    { numberText: "₹30L+", subtitle: "Research Funding" },
    { numberText: "45+", subtitle: "Publications" },
    { numberText: "15+", subtitle: "Conference Papers" },
  ],
  topAchievers: [
    {
      name: "Pooja Sharma",
      year: "B.Ed. 2024",
      achievement: "Placed as PGT at Kendriya Vidyalaya, CTET Qualified with distinction",
      image: "https://randomuser.me/api/portraits/women/29.jpg",
      skills: ["Pedagogy", "Classroom Management", "Educational Technology", "Assessment"],
    },
    {
      name: "Amit Kumar",
      year: "M.A. Education 2024",
      achievement: "UGC NET Qualified, Published 2 research papers on NEP 2020",
      image: "https://randomuser.me/api/portraits/men/38.jpg",
      skills: ["Educational Research", "Curriculum Studies", "Policy Analysis", "Academic Writing"],
    },
    {
      name: "Ritu Singh",
      year: "B.A. B.Ed. ITEP 2024",
      achievement: "Best Student Teacher Award, Innovative Teaching Practice Recognition",
      image: "https://randomuser.me/api/portraits/women/52.jpg",
      skills: ["Inclusive Education", "ICT Integration", "Creative Teaching", "Action Research"],
    },
  ],
  achievements: [
    {
      title: "NEP 2020 Pioneer",
      description: "Among the first departments to launch ITEP programs aligned with NEP 2020",
      icon: School,
      color: "text-blue-600",
    },
    {
      title: "Teacher Training",
      description: "200+ trained teachers placed across government and private schools",
      icon: GraduationCap,
      color: "text-purple-600",
    },
    {
      title: "Research Output",
      description: "45+ publications in education and pedagogy journals",
      icon: BookOpen,
      color: "text-green-600",
    },
    {
      title: "Inclusive Practices",
      description: "Active programs for inclusive education and special needs teacher training",
      icon: HeartHandshake,
      color: "text-amber-600",
    },
  ],
};
