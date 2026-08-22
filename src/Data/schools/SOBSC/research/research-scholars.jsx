/**
 * SOBSC — Research Scholars
 */
import { Award, BookOpen, GraduationCap, Mail, Star, Users } from "lucide-react";

export const researchScholarsData = {
  schoolCode: "SOBSC",
  schoolName: "School of Buddhist Studies & Civilization",
  hero: {
    title: "Our Research Community",
    subtitle: "Meet the dedicated Ph.D. scholars and research associates advancing Buddhist studies at SOBSC.",
    bgTheme: 3,
  },
  stats: [
    { icon: GraduationCap, color: "text-yellow-600", count: 15, label: "Ph.D. Scholars" },
    { icon: Users, color: "text-orange-600", count: 5, label: "Research Associates" },
    { icon: Award, color: "text-amber-600", count: 8, label: "Graduated Scholars" },
    { icon: Star, color: "text-red-600", count: 4, label: "Fellowship Awardees" },
  ],
  scholars: [
    { initials: "VT", name: "Ven. Thich Minh Hieu", designation: "Senior Research Scholar", department: "Buddhist Philosophy", area: "Yogācāra Philosophy & Consciousness Studies", supervisorTitle: "Supervisor", supervisor: "Dr. C.V. Sivasai", publicationsTitle: "Publications", publications: "4 international journals", achievementTitle: "Notable Achievement", achievement: "Best Paper Award at Asian Buddhist Conference 2024", bg: "from-yellow-100 to-yellow-200", avatarColor: "bg-yellow-600", textColor: "text-yellow-600" },
    { initials: "SK", name: "Sumedha Kumari", designation: "Junior Research Fellow", department: "Buddhist Languages", area: "Pali Canonical Literature & Translation Studies", supervisorTitle: "Supervisor", supervisor: "Dr. Manish T. Meshram", publicationsTitle: "Publications", publications: "3 research papers", achievementTitle: "Notable Achievement", achievement: "Published translation of Dhammapada commentary", bg: "from-orange-100 to-orange-200", avatarColor: "bg-orange-600", textColor: "text-orange-600" },
    { initials: "AP", name: "Arun Prasad", designation: "Research Associate", department: "Buddhist Heritage", area: "Buddhist Archaeological Heritage & Digital Documentation", supervisorTitle: "Supervisor", supervisor: "Dr. Priyadarsini Mitra", publicationsTitle: "Publications", publications: "2 journal papers", achievementTitle: "Notable Achievement", achievement: "Led field documentation at Sanchi Buddhist site", bg: "from-amber-100 to-amber-200", avatarColor: "bg-amber-600", textColor: "text-amber-600" },
  ],
  departments: [
    { name: "Buddhist Philosophy", desc: "Ethics, Abhidharma, Comparative Studies", count: 8, bg: "bg-yellow-50", color: "text-yellow-600" },
    { name: "Buddhist Languages", desc: "Pali, Sanskrit, Textual Studies", count: 4, bg: "bg-orange-50", color: "text-orange-600" },
    { name: "Meditation Studies", desc: "Vipassana, Mindfulness Research", count: 2, bg: "bg-amber-50", color: "text-amber-600" },
    { name: "Heritage & Archaeology", desc: "Buddhist Art, Sites, Conservation", count: 1, bg: "bg-red-50", color: "text-red-600" },
  ],
  fellowships: [
    { name: "Junior Research Fellowship (JRF)", detail: "Funded by UGC for meritorious scholars.", note: "Applied through NET/JRF exam.", border: "border-yellow-600" },
    { name: "Senior Research Fellowship (SRF)", detail: "Awarded for advanced stage scholars.", note: "Upgraded after review.", border: "border-orange-600" },
    { name: "ICCR Scholarship", detail: "Scholarships for international Buddhist studies scholars.", note: "For international students.", border: "border-amber-600" },
  ],
  achievements: [
    { icon: Award, color: "text-yellow-600", title: "Best Paper Award", desc: "Scholar won Best Paper at Asian Buddhist Conference 2024.", date: "March 2024", bg: "from-yellow-100 to-yellow-200" },
    { icon: Star, color: "text-orange-600", title: "International Fellowship", desc: "Scholar awarded research fellowship at Ryukoku University, Japan.", date: "Jan 2024", bg: "from-orange-100 to-orange-200" },
    { icon: BookOpen, color: "text-amber-600", title: "Text Translation Published", desc: "Published annotated translation of Dhammapada commentary.", date: "2023", bg: "from-amber-100 to-amber-200" },
  ],
  timeline: [
    { title: "Application Opens", desc: "Applications open from 1st April each year.", color: "text-yellow-600" },
    { title: "Entrance Test", desc: "Entrance exam scheduled in May.", color: "text-orange-600" },
    { title: "Interviews", desc: "Shortlisted candidates interviewed in June.", color: "text-amber-600" },
  ],
  fee: { application: "INR 500 (non-refundable)", annual: "INR 25,000 per year (approx.)" },
  contacts: [
    { icon: Mail, color: "text-yellow-600", title: "General Enquiry", email: "sobsc.office@gbu.ac.in", phone: "+91-120-234-9901" },
    { icon: Mail, color: "text-orange-600", title: "Ph.D. Admissions", email: "admissions.sobsc@gbu.ac.in", phone: "+91-120-234-9902" },
    { icon: Mail, color: "text-amber-600", title: "Research Office", email: "research.sobsc@gbu.ac.in", phone: "+91-120-234-9903" },
  ],
};
