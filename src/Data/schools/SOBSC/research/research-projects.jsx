/**
 * SOBSC — Research Projects
 */
import { Award, DollarSign, Users, CheckCircle, Clock, Target } from "lucide-react";

export const researchProjectsData = {
  schoolCode: "SOBSC",
  schoolName: "School of Buddhist Studies & Civilization",
  hero: {
    title: "Research Initiatives in Buddhist Studies",
    description: "Our research projects explore Buddhist philosophy, textual heritage, meditation science, and archaeological preservation funded by prestigious academic bodies.",
  },
  stats: [
    { icon: Award, value: 25, label: "Active Projects", color: "text-yellow-600" },
    { icon: DollarSign, value: "₹2Cr+", label: "Total Funding", color: "text-orange-600" },
    { icon: Users, value: 30, label: "Researchers Involved", color: "text-amber-600" },
    { icon: CheckCircle, value: 12, label: "Completed Projects", color: "text-red-600" },
  ],
  ongoingProjects: [
    { tag: "Philosophy", status: "Active", gradient: "from-yellow-50 to-orange-100", title: "Buddhist Ethics and Environmental Sustainability", description: "Exploring how Buddhist ethical principles (Ahiṃsā, interdependence, Middle Way) can inform contemporary environmental policy and sustainable development practices.", duration: "2023-2026", team: "4 researchers", fundingAgency: "UGC", grant: "₹25L", pi: "Dr. C.V. Sivasai", department: "Buddhist Philosophy", progress: "50%" },
    { tag: "Textual", status: "Active", gradient: "from-orange-50 to-amber-100", title: "Critical Edition of Abhidharmakośabhāṣya", description: "Preparing a critical edition with English translation and annotations of Vasubandhu's Abhidharmakośabhāṣya based on multiple Sanskrit and Chinese recensions.", duration: "2024-2027", team: "3 researchers", fundingAgency: "ICSSR", grant: "₹20L", pi: "Dr. Arvind Kumar Singh", department: "Buddhist Philosophy", progress: "25%" },
    { tag: "Meditation", status: "Active", gradient: "from-amber-50 to-yellow-100", title: "Scientific Study of Vipassana Meditation Effects on Mental Health", description: "Collaborative research project studying the neurological and psychological effects of Vipassana meditation on stress, anxiety, and depression using EEG and psychometric assessments.", duration: "2024-2026", team: "5 researchers", fundingAgency: "UGC", grant: "₹18L", pi: "Dr. Priyadarsini Mitra", department: "Meditation Studies", progress: "30%" },
  ],
  projectCategories: [
    { icon: Award, bg: "bg-yellow-100", iconColor: "text-yellow-600", title: "Government Funded", items: [{ label: "UGC Projects", value: 8 }, { label: "ICSSR Projects", value: 4 }, { label: "ICCR Projects", value: 3 }], totalFunding: "₹1.2Cr" },
    { icon: Target, bg: "bg-orange-100", iconColor: "text-orange-600", title: "International Collaboration", items: [{ label: "Japanese University Partners", value: 2 }, { label: "Thai University Partners", value: 2 }, { label: "European Partners", value: 1 }], totalFunding: "₹45L" },
    { icon: Clock, bg: "bg-amber-100", iconColor: "text-amber-600", title: "Institutional Projects", items: [{ label: "University Funded", value: 5 }, { label: "Faculty Research", value: 8 }], totalFunding: "₹35L" },
  ],
  completedProjects: [
    { icon: CheckCircle, title: "Digital Documentation of Buddhist Heritage Sites in UP", description: "Comprehensive digital documentation of Buddhist archaeological sites in Uttar Pradesh using photogrammetry, GIS mapping, and 3D scanning.", duration: "2020-2023", funding: "₹15L", pi: "Dr. Priyadarsini Mitra", publications: 5, impact: "Digital archive of 12 Buddhist sites created" },
    { icon: CheckCircle, title: "Annotated Translation of Milindapañha", description: "English translation with critical annotations and cross-references of Milindapañha (Questions of King Milinda).", duration: "2019-2022", funding: "₹10L", pi: "Dr. Manish T. Meshram", publications: 3, impact: "Published by university press, used as textbook" },
  ],
  upcomingProjects: [
    { status: "Planning Phase", icon: Clock, title: "AI-Powered Buddhist Text Analysis Platform", description: "Development of machine learning tools for automated analysis, classification, and translation of Buddhist canonical texts in Pali and Sanskrit.", start: "2026", funding: "₹30L", duration: "3 years" },
    { status: "Proposal Submitted", icon: Clock, title: "Buddhist Approaches to Conflict Resolution", description: "Research on applying Buddhist principles of non-violence and compassion to contemporary conflict resolution and peacebuilding.", start: "2026", funding: "₹15L", duration: "2 years" },
  ],
  impactPublications: [
    { label: "Journal Publications", value: 45, bg: "bg-yellow-50", color: "text-yellow-600", note: "Peer-reviewed publications" },
    { label: "Conference Papers", value: 65, bg: "bg-orange-50", color: "text-orange-600", note: "International conferences" },
    { label: "Books Authored", value: 15, bg: "bg-amber-50", color: "text-amber-600", note: "Monographs and edited volumes" },
    { label: "Translations Published", value: 8, bg: "bg-red-50", color: "text-red-600", note: "Buddhist text translations" },
  ],
  impactSocial: [
    { color: "border-yellow-500", title: "Mental Health & Well-being", description: "Meditation programs developed by our faculty have reached 500+ participants, demonstrating significant improvements in stress management." },
    { color: "border-orange-500", title: "Heritage Preservation", description: "Digital documentation projects have created comprehensive archives of 12 Buddhist archaeological sites in UP for future preservation." },
    { color: "border-amber-500", title: "Interfaith Dialogue", description: "Research on Buddhist ethics has contributed to interfaith dialogue platforms promoting peace and mutual understanding." },
    { color: "border-red-500", title: "International Collaboration", description: "Collaborative projects with universities in Japan, Thailand, and Sri Lanka have fostered academic exchange and joint publications." },
  ],
  contactDetails: [
    { icon: Award, color: "text-yellow-400", title: "Research Office", email: "research.sobsc@gbu.ac.in", phone: "+91-120-234-9901" },
    { icon: DollarSign, color: "text-orange-400", title: "Funding Support", email: "funding.sobsc@gbu.ac.in", phone: "+91-120-234-9902" },
    { icon: Users, color: "text-amber-400", title: "Collaboration", email: "collab.sobsc@gbu.ac.in", phone: "+91-120-234-9903" },
  ],
};
