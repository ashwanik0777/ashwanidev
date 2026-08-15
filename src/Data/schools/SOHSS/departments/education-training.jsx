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
        id: "bed-general",
        title: "B.Ed. (Bachelors of Education)",
        level: "UG",
        duration: "2 Years",
        intake: "100 Students",
        description: "NCTE-recognized teacher training program focusing on pedagogical theory, child psychology, classroom management, and school internships.",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80",
        gradient: "from-amber-500 to-orange-600",
        highlights: [
            "Pedagogical Theory",
            "Child Psychology",
            "Classroom Internship",
            "Curriculum Design"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1rI9i1ms5Wfei_jSoU37j_FSQqwyY9yHS",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1rI9i1ms5Wfei_jSoU37j_FSQqwyY9yHS"
            }
        ]
    },
    {
        id: "itep-integrated-bed",
        title: "ITEP (B.Sc. B.Ed. / B.Com. B.Ed. / B.A. B.Ed.)",
        level: "Dual Degree",
        duration: "4 Years",
        intake: "50 Students",
        description: "Integrated Teacher Education Programme under NEP offering dual qualification in disciplinary majors and education pedagogy.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80",
        gradient: "from-emerald-500 to-teal-600",
        highlights: [
            "NEP Aligned Dual Degree",
            "Disciplinary Major + Pedagogy",
            "Hands-on School Practicum",
            "Teaching Tech Tools"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=18R1U0JDE8dDGv9ZQSp8UVvUO_9Jbu5SH",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=18R1U0JDE8dDGv9ZQSp8UVvUO_9Jbu5SH"
            }
        ]
    },
    {
        id: "bpes-sports-education",
        title: "Bachelor of Physical Education and Sports (BPES)",
        level: "UG",
        duration: "3 Years",
        intake: "50 Students",
        description: "Physical education sciences, sports physiology, athletic coaching, biomechanics, tournament administration, and fitness management.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
        gradient: "from-red-500 to-orange-600",
        highlights: [
            "Sports Physiology",
            "Athletic Coaching & Officiating",
            "Sports Biomechanics",
            "Gym & Fitness Training"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=1JlJUTJS6d9Arfe3zvmqo10OXAwSZisiK",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=1JlJUTJS6d9Arfe3zvmqo10OXAwSZisiK"
            }
        ]
    },
    {
        id: "ma-education",
        title: "M.A. (Education)",
        level: "PG",
        duration: "2 Years",
        intake: "30 Students",
        description: "Advanced study of educational philosophy, comparative systems, educational measurement, policy research, and instructional tech.",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80",
        gradient: "from-orange-500 to-amber-600",
        highlights: [
            "Educational Philosophy",
            "Measurement & Evaluation",
            "Policy Research",
            "Master Dissertation"
        ],
        syllabusUrl: "https://drive.google.com/uc?export=download&id=11HRu2q7Z6ork5RQigHBZZC8Us_zmZxaH",
        syllabus: [
            {
                session: "Course Structure",
                url: "https://drive.google.com/uc?export=download&id=11HRu2q7Z6ork5RQigHBZZC8Us_zmZxaH"
            }
        ]
    }
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
