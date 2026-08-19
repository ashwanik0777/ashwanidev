import { Wrench, BookOpen, Award, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "vocational-studies",
  heroProps: {
    title: "Department of Vocational Studies",
    highlight: "Vocational & Skill-Based Education",
    subtitle:
      "Empowering workforce readiness through industry-aligned vocational training, technical skill development, and experiential learning.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Skill Initiatives" },
    backgroundImage:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Wrench,
        bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
        subtitle: "Skill Certification",
        description: "National skill qualification framework aligned vocational courses",
      },
      {
        icon: BookOpen,
        bg: "bg-gradient-to-br from-teal-500 to-emerald-600",
        subtitle: "Industry Partnerships",
        description: "Hands-on industrial training and workplace skill modules",
      },
      {
        icon: Award,
        bg: "bg-gradient-to-br from-purple-500 to-pink-600",
        subtitle: "Career Readiness",
        description: "Fostering employment readiness and technical competence",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of Head, Department of Vocational Studies",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Head of Department",
    designation: "Department of Vocational Studies",
    messageParagraphs: [
      "Welcome to the Department of Vocational Studies at the School of Vocational Studies & Applied Sciences, Gautam Buddha University.",
      "Our mandate is to bridge higher education with skill-based vocational training, preparing students for diverse industry roles, entrepreneurship, and specialized technical careers.",
    ],
    contact: {
      name: "Department Office",
      designation: "Department of Vocational Studies",
      email: "sovs.office@gbu.ac.in",
      phone: "0120-2344341",
    },
  },
  programsData: [
    {
      title: "B.Voc. & Skill Certification Programmes",
      duration: "3 Years / Flexible",
      intake: "30 Students",
      description:
        "Vocational bachelor degree programmes and short-term skill development certifications.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-indigo-600",
      highlights: [
        "Workplace Training", "Skill Certification", "Industry Exposure", "Vocational Excellence"
      ],
      syllabus: [],
    },
  ],
};
