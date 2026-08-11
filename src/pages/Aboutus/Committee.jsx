import React, { useState, useMemo } from "react";
import {
  ShieldAlert,
  Users,
  Award,
  BookOpen,
  Search,
  ChevronRight,
  Phone,
  Mail,
  FileText,
  AlertTriangle,
  UserCheck,
  Building,
  Sparkles,
  HeartHandshake,
  CheckCircle,
  ExternalLink,
  Info,
  Scale,
  GraduationCap,
  Leaf,
  FileDown,
  Compass,
  Briefcase
} from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// Official PDF & Office Notices from GBU Legacy Site
const officialOrders = [
  {
    title: "Office Order - Chief Wardens (M/F), Wardens & Non Resident Wardens",
    date: "27-09-2025",
    link: "https://www.gbu.ac.in/Content/gbudata/General/OfficeOrder-Wardens-ChiefWardens.pdf",
    badge: "Office Order"
  },
  {
    title: "IIC Council @ GBU (Institution's Innovation Council)",
    date: "Official Notice",
    link: "https://www.gbu.ac.in/Content/gbudata/General/IIC_Council.pdf",
    badge: "IIC Council"
  },
  {
    title: "Research and Development Committee (RDC) Policy & Guidelines",
    date: "RDC Notice",
    link: "https://www.gbu.ac.in/Content/gbudata/General/RDC.pdf",
    badge: "RDC Guidelines"
  }
];

// Committee Categories
const committeeCategories = [
  { id: "all", label: "All Committees" },
  { id: "statutory", label: "Statutory & Equity Cells" },
  { id: "welfare", label: "Student Welfare & Grievances" },
  { id: "academic", label: "Academic & Research" },
  { id: "institutional", label: "Institutional & Strategic" }
];

// Complete Official Committee Data Extracted from GBU Portal
const committeesList = [
  {
    id: "sc-st-cell",
    category: "statutory",
    name: "SC / ST Committee & Cell",
    badge: "Equal Opportunity",
    icon: HeartHandshake,
    color: "from-purple-600 to-indigo-700",
    bgColor: "bg-purple-50/70 border-purple-100",
    description:
      "The Scheduled Caste (SC) and Scheduled Tribes (ST) Cell in the institute promotes the special interest of students in the reserved category and provides dedicated guidance in areas where students experience academic or administrative difficulties.",
    chairperson: "Dr. Chandrasekhar Paswan",
    chairpersonRole: "Chairperson, SC/ST Cell",
    members: [
      { name: "Dr. Chandrasekhar Paswan", role: "Chairperson" },
      { name: "Dr. Neeta Singh", role: "Member" },
      { name: "Dr. Pankaj Deep", role: "Member" },
      { name: "Dr. Chandrabhanu Bharas", role: "Member" },
      { name: "Dr. Diwakar Garwa", role: "Member" }
    ]
  },
  {
    id: "minority-cell",
    category: "statutory",
    name: "Minority Cell",
    badge: "Diversity Protection",
    icon: ShieldAlert,
    color: "from-emerald-600 to-teal-700",
    bgColor: "bg-emerald-50/70 border-emerald-100",
    description:
      "The Minority Cell is committed to providing an environment that supports diversity and respects everyone regardless of color, religious belief, or culture, ensuring protection of minorities as per the provisions of the Constitution of India.",
    chairperson: "Dr. M.A. Ansari",
    chairpersonRole: "Chairperson, Minority Cell",
    members: [
      { name: "Dr. M.A. Ansari", role: "Chairperson" },
      { name: "Dr. Imteyaz Qamar", role: "Member" },
      { name: "Dr. Samar Raqshin", role: "Member" },
      { name: "Dr. Obaidul Ghaffar", role: "Member" }
    ]
  },
  {
    id: "anti-ragging",
    category: "statutory",
    name: "Anti-Ragging Committee",
    badge: "Zero Tolerance",
    icon: Scale,
    color: "from-red-600 to-amber-600",
    bgColor: "bg-red-50/70 border-red-100",
    description:
      "Monitors measures taken by the university for the prevention of ragging, investigates specific instances and complaints, and recommends immediate disciplinary action or legal punishment against individuals indulging in ragging.",
    chairperson: "Dr. Rama Sharma",
    chairpersonRole: "Chairperson, Anti-Ragging Committee",
    members: [
      { name: "Dr. Rama Sharma", role: "Chairperson" },
      { name: "Dr. Jai Prakash Muyal", role: "Vice-Chairperson" },
      { name: "Dr. Nidhi Singh", role: "Member" },
      { name: "Dr. Mausumi Pohit", role: "Member" },
      { name: "Dr. Mamta Sharma", role: "Member" },
      { name: "Dr. Pankaj Deep", role: "Member" },
      { name: "Dr. DharamVir Mangal", role: "Member" },
      { name: "Dr. Raju Pal", role: "Member" },
      { name: "Dr. Samar Raqshin", role: "Member" },
      { name: "Dr. Obaidul Ghaffar", role: "Member" },
      { name: "Mr. Vikram Singh Yadav", role: "Member" }
    ]
  },
  {
    id: "obc-committee",
    category: "statutory",
    name: "Other Backward Class (OBC) Committee",
    badge: "Empowerment Cell",
    icon: Users,
    color: "from-blue-600 to-cyan-600",
    bgColor: "bg-blue-50/70 border-blue-100",
    description:
      "Committed to providing an empowering environment that educates, enlightens, and supports OBC category students and staff, facilitating full access to welfare schemes extended by the Government and university.",
    chairperson: "Dr. Deepali Singh",
    chairpersonRole: "Chairperson, OBC Committee",
    members: [
      { name: "Dr. Deepali Singh", role: "Chairperson" },
      { name: "Dr. Gyanaditya Shakya", role: "Member" },
      { name: "Dr. Alpa Yadav", role: "Member" },
      { name: "Dr. Navin Kumar", role: "Member" }
    ]
  },
  {
    id: "icc",
    category: "statutory",
    name: "Internal Complaint Committee (ICC)",
    badge: "POSH Mandate",
    icon: UserCheck,
    color: "from-rose-600 to-pink-700",
    bgColor: "bg-rose-50/70 border-rose-100",
    description:
      "Constituted in compliance with UGC Regulations and POSH Act 2013 to address complaints of sexual harassment, gender discrimination, and ensure a safe campus working environment for women.",
    chairperson: "Prof. Harsh Bala Sharma",
    chairpersonRole: "Presiding Officer (Ip College for Women, D.U)",
    members: [
      { name: "Prof. Harsh Bala Sharma", role: "Presiding Officer (Indraprastha College for Women, D.U)" },
      { name: "Dr. Poonam Verma", role: "Member (SoLJ&G)" },
      { name: "Dr. Santosh Kumar Tiwari", role: "Member (SoLJ&G)" },
      { name: "Dr. Shrutee Kanwar", role: "Member (SoHSS)" },
      { name: "Smt. K Anita", role: "Member (Technical Superintendent)" },
      { name: "Sh. Virendra Pratap Singh", role: "Member (Sr. Office Assistant)" }
    ]
  },
  {
    id: "grievance-committee",
    category: "welfare",
    name: "Grievance Redressal Committee",
    badge: "Transparency",
    icon: AlertTriangle,
    color: "from-amber-600 to-orange-600",
    bgColor: "bg-amber-50/70 border-amber-100",
    description:
      "Ensures complete transparency across all institutional activities and provides a proper mechanism for students to seek redressal of grievances relating to academic or administrative matters at the institute level.",
    chairperson: "Registrar, GBU",
    chairpersonRole: "Ex-Officio Heading Officer",
    members: [
      { name: "Registrar, GBU", role: "Key Executive Member" },
      { name: "Dean, Academics", role: "Academic Representative" },
      { name: "Dean, Student Welfare", role: "Student Affairs Representative" },
      { name: "Dean of Respective Schools", role: "School Domain Experts" }
    ]
  },
  {
    id: "nep-committee",
    category: "academic",
    name: "NEP Implementation Committee",
    badge: "National Education Policy",
    icon: GraduationCap,
    color: "from-indigo-600 to-blue-700",
    bgColor: "bg-indigo-50/70 border-indigo-100",
    description:
      "Oversees the seamless adoption and execution of National Education Policy (NEP) guidelines, multidisciplinary course structures, credit transfer frameworks, and skill integration across GBU degree programs.",
    chairperson: "Dean Academics",
    chairpersonRole: "Chairperson, NEP Committee",
    members: [
      { name: "Dean Academics", role: "Chairperson" },
      { name: "Dean (I/C) Student Welfare", role: "Member" },
      { name: "Chairperson Exams", role: "Member" },
      { name: "Chairperson Admissions", role: "Member" },
      { name: "University Research Coordinator", role: "Member" }
    ]
  },
  {
    id: "idp-committee",
    category: "institutional",
    name: "Institutional Development Plans Committee",
    badge: "Infrastructure & Growth",
    icon: Building,
    color: "from-slate-700 to-gray-900",
    bgColor: "bg-slate-50 border-slate-200",
    description:
      "Formulates long-term strategic plans, campus infrastructure expansions, resource allocation, and quality enhancement roadmaps for Gautam Buddha University.",
    chairperson: "All Deans / Incharge Deans",
    chairpersonRole: "Joint Executive Leadership",
    members: [
      { name: "All Deans / Incharge Deans", role: "Chairperson Council" },
      { name: "Director (Works)", role: "Coordinator" },
      { name: "All Additional Directors (Works)", role: "Members" }
    ]
  },
  {
    id: "ug-internship-committee",
    category: "academic",
    name: "Internship / Research Internship for UG Students Committee",
    badge: "Career & Research",
    icon: Briefcase,
    color: "from-teal-600 to-emerald-700",
    bgColor: "bg-teal-50/70 border-teal-100",
    description:
      "Facilitates industry internships, research fellowships, project placements, and corporate training opportunities for undergraduate students across all university schools.",
    chairperson: "Prof. Shweta Anand",
    chairpersonRole: "Chairperson & Senior Professor",
    members: [
      { name: "Prof. Shweta Anand", role: "Chairperson (Professor)" },
      { name: "Dr. Kirti Pal", role: "Member (Associate Professor)" },
      { name: "Dr. Akshay Kumar Singh", role: "Member (Assistant Professor)" },
      { name: "Dr. Vinay Kumar Litoria", role: "Coordinator (Director Corporate Relations)" }
    ]
  },
  {
    id: "rdc-committee",
    category: "academic",
    name: "Research and Development Committee (RDC)",
    badge: "R&D Advisory",
    icon: BookOpen,
    color: "from-violet-600 to-purple-800",
    bgColor: "bg-purple-50/70 border-purple-100",
    description:
      "Drives interdisciplinary research, sponsored project grants, publications, patent filings, and technology transfer activities in accordance with national research guidelines.",
    chairperson: "Research & Development Cell",
    chairpersonRole: "University R&D Directorate",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/General/RDC.pdf",
    members: [
      { name: "Dean Planning & Research", role: "Head of Directorate" },
      { name: "School Research Coordinators", role: "Domain Representatives" },
      { name: "External Scientific Advisors", role: "Advisory Panel" }
    ]
  },
  {
    id: "viksit-bharat-committee",
    category: "institutional",
    name: "Viksit Bharat @ 2047 Committee",
    badge: "Vision 2047",
    icon: Compass,
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-50/70 border-amber-100",
    description:
      "Leads university-wide youth engagements, innovative ideas submission, workshops, and strategic roadmaps aligned with the Government of India's 'Viksit Bharat @ 2047' vision.",
    chairperson: "Dr. Neeti Rana",
    chairpersonRole: "Chairperson (Associate Professor, SoM)",
    members: [
      { name: "Dr. Neeti Rana", role: "Chairperson (SoM)" },
      { name: "Dr. Rajesh Mishra", role: "Member (SoICT)" },
      { name: "Dr. Imtiyaz Qamar", role: "Member (SoBT)" },
      { name: "Dr. Nirmita Malhotra", role: "Member (SoE)" },
      { name: "Dr. Anand Pratap Singh", role: "Member (SoHSS)" }
    ]
  }
];

const Committee = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalCommittee, setActiveModalCommittee] = useState(null);

  const filteredCommittees = useMemo(() => {
    return committeesList.filter((c) => {
      const matchesCategory =
        selectedCategory === "all" || c.category === selectedCategory;
      const matchesQuery =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.chairperson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/60 pb-20">
        {/* Hero Banner */}
        <BannerSection
          title="Committees & Statutory Cells"
          subtitle="Gautam Buddha University Administrative, Academic & Equity Bodies"
          bgTheme={9}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">

          {/* Official Orders & Notifications Download Cards */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-100 rounded-xl text-blue-700">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Official Orders & PDF Notifications
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  Important university office orders and council notifications
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {officialOrders.map((order, idx) => (
                <a
                  key={idx}
                  href={order.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
                      {order.badge}
                    </span>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors shrink-0" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                    {order.title}
                  </h3>
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                    <span>{order.date}</span>
                    <span className="text-blue-600 font-bold group-hover:underline inline-flex items-center gap-1">
                      Download PDF <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Search & Category Filter Section */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 mb-10">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search committees, faculty members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center lg:justify-end">
                {committeeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Committees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCommittees.map((item) => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 p-6 sm:p-8 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-2xl bg-gradient-to-r ${item.color} text-white shadow-md shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100 inline-block mb-1">
                            {item.badge}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Chairperson Badge */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider block">
                          Heading Officer / Chairperson
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">
                          {item.chairperson}
                        </h4>
                        <p className="text-xs text-blue-600 font-medium">
                          {item.chairpersonRole}
                        </p>
                      </div>
                    </div>

                    {/* Committee Members Quick Preview */}
                    <div className="mb-6">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                        Committee Members ({item.members.length}):
                      </span>
                      <div className="space-y-1.5">
                        {item.members.slice(0, 4).map((m, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs text-gray-600 bg-slate-50 px-3 py-1.5 rounded-lg">
                            <span className="font-semibold text-gray-800">{m.name}</span>
                            <span className="text-blue-600 text-[11px] font-medium">{m.role}</span>
                          </div>
                        ))}
                        {item.members.length > 4 && (
                          <p className="text-[11px] text-gray-400 italic pt-1 text-center">
                            +{item.members.length - 4} more members
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                    {item.pdfLink ? (
                      <a
                        href={item.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        View PDF Document
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">Official GBU Committee</span>
                    )}

                    <button
                      onClick={() => setActiveModalCommittee(item)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1 shadow-sm shrink-0"
                    >
                      <span>View Full List</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredCommittees.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-gray-800">No Committees Found</h3>
              <p className="text-sm text-gray-500 mt-1">
                Try searching with different keywords or selecting "All Committees".
              </p>
            </div>
          )}
        </div>

        {/* Modal for Full Committee Composition */}
        {activeModalCommittee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl w-full p-6 sm:p-8 relative overflow-hidden max-h-[90vh] flex flex-col">
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-gray-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block mb-1">
                    {activeModalCommittee.badge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {activeModalCommittee.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Official Committee Constitution & Members Directory
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalCommittee(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="py-6 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3">
                    Full Committee Members:
                  </h4>
                  <div className="overflow-x-auto rounded-2xl border border-gray-200">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-gray-100 text-gray-700 font-bold uppercase tracking-wider">
                        <tr>
                          <th className="px-4 py-3">Member Name</th>
                          <th className="px-4 py-3">Assigned Role</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 bg-white text-gray-700">
                        {activeModalCommittee.members.map((m, idx) => (
                          <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                            <td className="px-4 py-3 font-semibold text-gray-900">{m.name}</td>
                            <td className="px-4 py-3 text-blue-600 font-semibold">{m.role}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-100 text-xs text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">About This Committee:</p>
                  <p className="leading-relaxed text-gray-600">{activeModalCommittee.description}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button
                  onClick={() => setActiveModalCommittee(null)}
                  className="px-6 py-2.5 bg-gray-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SearchableWrapper>
  );
};

export default Committee;
