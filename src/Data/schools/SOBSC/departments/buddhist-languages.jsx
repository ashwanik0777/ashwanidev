/**
 * SOBSC — Department of Buddhist Languages & Literature
 */
import { BookOpen, Users, Award, GraduationCap, Globe, Heart } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBSC",
  departmentId: "languages",
  heroProps: {
    title: "Department of Buddhist Languages & Literature",
    highlight: "Buddhist Languages & Literature",
    subtitle: "Studying Pali, Sanskrit, and Buddhist literary traditions to unlock the wisdom of primary texts.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80",
    features: [
      { icon: BookOpen, bg: "bg-gradient-to-br from-orange-500 to-yellow-600", subtitle: "Pali & Sanskrit", description: "Training in the classical languages of the Buddhist canon" },
      { icon: Globe, bg: "bg-gradient-to-br from-yellow-500 to-amber-600", subtitle: "Textual Studies", description: "Critical study of canonical texts, commentaries, and sub-commentaries" },
      { icon: Heart, bg: "bg-gradient-to-br from-amber-500 to-orange-600", subtitle: "Buddhist Literature", description: "Jātaka tales, Avadāna literature, and devotional poetry" },
    ],
  },
  hodProps: {
    title: "From the Desk of Coordinator",
    image: "https://faculty.gbu.ac.in/uploads/photos/661d144021f36_Passport%20photo.jpg",
    name: "Dr. Manish T. Meshram",
    designation: "Coordinator (Assistant Professor)",
    messageParagraphs: [
      "Welcome to the Department of Buddhist Languages & Literature. Language is the gateway to understanding Buddhist tradition.",
      "Our department offers rigorous training in Pali and Sanskrit, enabling students to engage directly with Buddhist canonical texts.",
      "Dr. Manish T. Meshram, Coordinator",
    ],
    contact: { name: "Dr. Manish T. Meshram", designation: "Coordinator", email: "manish.meshram@gbu.ac.in", phone: "0120-234-9905" },
  },
  aboutProps: {
    heading: "About the Department",
    subheading: "Comprehensive training in Buddhist canonical languages and literary heritage.",
    stats: [
      { icon: Users, numberText: "50+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "8+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "30+", title: "Research Papers", subtitle: "Published" },
      { icon: Globe, numberText: "8+", title: "Countries", subtitle: "Represented" },
    ],
    highlights: [
      { title: "Classical Language Training", description: "Structured Pali & Sanskrit courses from beginner to advanced levels.", dotColor: "#F59E0B" },
      { title: "Textual Scholarship", description: "Critical analysis, philology, paleography, and epigraphy methods.", dotColor: "#EF4444" },
      { title: "Digital Humanities", description: "Computational linguistics and manuscript digitization tools.", dotColor: "#8B5CF6" },
    ],
    vision: "To preserve the linguistic heritage of Buddhism and produce scholars for primary text engagement.",
    missionPoints: ["Rigorous training in Pali & Sanskrit", "Critical textual scholarship", "Digital tools for language learning", "International collaboration", "Academic career preparation"],
  },
  programsData: [
    { title: "M.A. Buddhist Studies (Language Focus)", duration: "2 Years", intake: "20 Students", description: "Specialized focus on Pali and Sanskrit language training.", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80", gradient: "from-orange-500 to-yellow-600", highlights: ["Pali Grammar", "Sanskrit for Buddhist Studies", "Canonical Literature", "Translation Methods"], syllabus: [] },
    { title: "Ph.D. Buddhist Languages", duration: "3-5 Years", intake: "5 Students", description: "Original research in Buddhist philology and textual criticism.", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80", gradient: "from-amber-500 to-orange-600", highlights: ["Textual Criticism", "Comparative Philology", "Digital Text Analysis", "Thesis Defense"], syllabus: [] },
  ],
  facultyMembers: [
    { name: "Dr. Manish T. Meshram", position: "Assistant Professor", specialization: "Pali Language, Buddhist Canon", email: "manish.meshram@gbu.ac.in", achievements: "Ph.D.; Pali canonical literature expert", image: "https://faculty.gbu.ac.in/uploads/photos/661d144021f36_Passport%20photo.jpg", color: "from-orange-500 to-yellow-600", extraIcon: Award },
    { name: "Dr. Gyanaditya Shakya", position: "Assistant Professor", specialization: "Sanskrit Buddhist Literature, Mahāyāna Studies", email: "gyanaditya@gbu.ac.in", achievements: "Ph.D.; Mahāyāna sūtra literature research", image: "https://ui-avatars.com/api/?name=Gyanaditya+Shakya&size=300&background=F59E0B&color=fff", color: "from-yellow-500 to-amber-600" },
    { name: "Mr. Vikram Singh Yadav", position: "Assistant Professor (On Contract)", specialization: "Buddhist Studies, Hindi-Buddhist Literature", email: "vikram.yadav@gbu.ac.in", achievements: "M.A.; Teaching and literary analysis", image: "https://faculty.gbu.ac.in/uploads/photos/66053d4f8054f_vikram.singh.jpg", color: "from-amber-500 to-orange-600" },
  ],
  facultyStats: { text: "Faculty with deep expertise in Buddhist canonical languages.", stats: [
    { icon: BookOpen, numberText: "60+", subtitle: "Research Papers", bg: "bg-orange-50", color: "text-orange-600" },
    { icon: Award, numberText: "10+", subtitle: "Books/Translations", bg: "bg-yellow-50", color: "text-yellow-600" },
    { icon: GraduationCap, custom: "PhD", numberText: "90%", subtitle: "PhD Faculty", bg: "bg-amber-50", color: "text-amber-600" },
    { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-red-50", color: "text-red-600" },
  ]},
  researchStats: [
    { numberText: "15+", subtitle: "Research Projects" },
    { numberText: "₹50L+", subtitle: "Research Funding" },
    { numberText: "60+", subtitle: "Publications" },
    { numberText: "5+", subtitle: "Text Translations" },
  ],
  topAchievers: [
    { name: "Bhikkhu Dhammajoti", year: "M.A. 2023", achievement: "Published Pali translation, Ph.D. at University of Delhi", image: "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop", skills: ["Pali", "Canonical Studies", "Translation"] },
  ],
  achievements: [
    { title: "Language Preservation", description: "Active Pali & Sanskrit programs", icon: BookOpen, color: "text-orange-600" },
    { title: "Text Translations", description: "5+ Buddhist texts published", icon: Award, color: "text-yellow-600" },
    { title: "International Students", description: "Students from 8+ countries", icon: Globe, color: "text-red-600" },
    { title: "Digital Archive", description: "Digital manuscript repository contributions", icon: GraduationCap, color: "text-amber-600" },
  ],
};
