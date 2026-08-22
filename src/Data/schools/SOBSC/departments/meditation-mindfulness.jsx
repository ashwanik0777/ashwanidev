/**
 * SOBSC — Department of Meditation & Mindfulness Studies
 */
import { BookOpen, Users, Award, GraduationCap, Globe, Heart } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOBSC",
  departmentId: "meditation",
  heroProps: {
    title: "Department of Meditation & Mindfulness Studies",
    highlight: "Meditation & Mindfulness Studies",
    subtitle: "Integrating Vipassana meditation, mindfulness practices, and their scientific study for holistic well-being.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage: "https://images.unsplash.com/photo-1474418397713-6b7f0c1f1d3b?auto=format&fit=crop&w=1920&q=80",
    features: [
      { icon: Heart, bg: "bg-gradient-to-br from-yellow-500 to-orange-600", subtitle: "Vipassana Meditation", description: "Traditional Buddhist meditation techniques including Ānāpānasati and body scanning" },
      { icon: BookOpen, bg: "bg-gradient-to-br from-orange-500 to-red-600", subtitle: "Mindfulness Science", description: "Scientific research on the neurological and psychological effects of meditation" },
      { icon: Globe, bg: "bg-gradient-to-br from-amber-500 to-yellow-600", subtitle: "Applied Practices", description: "Mindfulness-based interventions for healthcare, education, and stress management" },
    ],
  },
  hodProps: {
    title: "From the Desk of Coordinator",
    image: "https://faculty.gbu.ac.in/uploads/photos/66053d094c80d_priyadarsini.jpg",
    name: "Dr. Priyadarsini Mitra",
    designation: "Coordinator (Assistant Professor)",
    messageParagraphs: [
      "Welcome to the Department of Meditation & Mindfulness Studies.",
      "Our department uniquely combines the ancient wisdom of Buddhist meditation traditions with modern scientific research on contemplative practices. We offer both theoretical understanding and intensive practical training.",
      "Students experience regular meditation retreats, learn various Buddhist meditation techniques, and study the growing body of scientific literature on the benefits of mindfulness.",
      "Dr. Priyadarsini Mitra, Coordinator",
    ],
    contact: { name: "Dr. Priyadarsini Mitra", designation: "Coordinator", email: "priyadarsini@gbu.ac.in", phone: "0120-234-9906" },
  },
  aboutProps: {
    heading: "About the Department",
    subheading: "Bridging ancient contemplative traditions with modern scientific understanding.",
    stats: [
      { icon: Users, numberText: "40+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "5+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "20+", title: "Research Papers", subtitle: "Published" },
      { icon: Heart, numberText: "50+", title: "Retreats", subtitle: "Conducted" },
    ],
    highlights: [
      { title: "Meditation Practice", description: "Regular Vipassana retreats, daily group meditation sessions, and intensive practice programs.", dotColor: "#F59E0B" },
      { title: "Scientific Research", description: "Study of meditation's effects on brain function, stress, anxiety, and overall well-being.", dotColor: "#EF4444" },
      { title: "Applied Mindfulness", description: "Programs applying mindfulness in healthcare, education, workplace, and community settings.", dotColor: "#8B5CF6" },
    ],
    vision: "To be a premier center integrating Buddhist meditation traditions with modern mindfulness science.",
    missionPoints: ["Provide authentic meditation training", "Conduct scientific meditation research", "Train mindfulness facilitators", "Develop community well-being programs", "Promote peace through contemplative practices"],
  },
  programsData: [
    { title: "Vipassana Meditation Training", duration: "Certificate (6 months)", intake: "30 Students", description: "Intensive certificate program in traditional Vipassana meditation techniques.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80", gradient: "from-yellow-500 to-orange-600", highlights: ["Ānāpānasati", "Body Scanning", "Walking Meditation", "Noble Silence Practice"], syllabus: [] },
    { title: "Mindfulness & Well-being", duration: "1 Year Diploma", intake: "25 Students", description: "Program combining mindfulness theory with practical applications in health and education.", image: "https://images.unsplash.com/photo-1474418397713-6b7f0c1f1d3b?auto=format&fit=crop&w=400&q=80", gradient: "from-orange-500 to-red-600", highlights: ["Mindfulness-Based Stress Reduction", "Applied Buddhist Practices", "Wellness Coaching", "Research Methods"], syllabus: [] },
    { title: "Applied Buddhist Practices", duration: "Short-term Course", intake: "50 Students", description: "Short courses exploring practical applications of Buddhist teachings in daily life.", image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80", gradient: "from-amber-500 to-yellow-600", highlights: ["Compassion Meditation", "Mindful Leadership", "Conflict Resolution", "Emotional Intelligence"], syllabus: [] },
  ],
  facultyMembers: [
    { name: "Dr. Priyadarsini Mitra", position: "Assistant Professor", specialization: "Meditation Studies, Buddhist Art, Cultural Studies", email: "priyadarsini@gbu.ac.in", achievements: "Ph.D.; Research on Buddhist contemplative traditions", image: "https://faculty.gbu.ac.in/uploads/photos/66053d094c80d_priyadarsini.jpg", color: "from-yellow-500 to-orange-600", extraIcon: Award },
    { name: "Dr. Chandrashekhar Paswan", position: "Assistant Professor", specialization: "Buddhist History, Applied Buddhist Ethics", email: "chandrashekhar@gbu.ac.in", achievements: "Ph.D.; Research on Buddhist social philosophy", image: "https://faculty.gbu.ac.in/uploads/photos/66053c7fcc9ee_chandrashekhar.jpg", color: "from-orange-500 to-red-600" },
  ],
  facultyStats: { text: "Faculty with expertise in both traditional meditation and modern scientific approaches.", stats: [
    { icon: BookOpen, numberText: "40+", subtitle: "Research Papers", bg: "bg-yellow-50", color: "text-yellow-600" },
    { icon: Award, numberText: "50+", subtitle: "Retreats Led", bg: "bg-orange-50", color: "text-orange-600" },
    { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-amber-50", color: "text-amber-600" },
    { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-red-50", color: "text-red-600" },
  ]},
  researchStats: [
    { numberText: "10+", subtitle: "Research Projects" },
    { numberText: "₹30L+", subtitle: "Research Funding" },
    { numberText: "40+", subtitle: "Publications" },
    { numberText: "50+", subtitle: "Retreats Conducted" },
  ],
  topAchievers: [
    { name: "Ven. Sumedha", year: "Certificate 2024", achievement: "Established community meditation centre in Sri Lanka", image: "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop", skills: ["Vipassana", "Teaching", "Community Building"] },
  ],
  achievements: [
    { title: "Vipassana Programs", description: "Regular 5-day and 10-day residential retreats", icon: Heart, color: "text-yellow-600" },
    { title: "Well-being Research", description: "Scientific studies on meditation benefits", icon: BookOpen, color: "text-orange-600" },
    { title: "Community Impact", description: "Mindfulness programs reaching 500+ participants", icon: Globe, color: "text-red-600" },
    { title: "International Training", description: "Meditation teachers trained from 5+ countries", icon: GraduationCap, color: "text-amber-600" },
  ],
};
