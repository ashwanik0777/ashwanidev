import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Users,
  Calendar,
  Trophy,
  Star,
  Shield,
  HeartHandshake,
  Award,
  Sparkles,
} from "lucide-react";
import { clubsData } from "../../components/clubs/data/clubsData";
import HeroBanner from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const collegeClubs = [
  {
    id: "nss",
    name: "National Service Scheme (NSS)",
    tagline: "Not Me But You",
    category: "University-Level",
    banner: "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg",
    logo: "https://cdn-prod.mybharats.in/events/68e8e4a314007137094.jpg",
    memberCount: "500+",
    description: "The National Service Scheme (NSS) is a Government-sponsored public service program under the Ministry of Youth Affairs & Sports, Govt. of India. It focuses on developing personality through community service.",
    achievements: [
      "Organized annual blood donation camps, saving 200+ lives",
      "Adopted 5 local villages for literacy and hygiene drives",
      "Conducted regular tree plantation and plastic-free drives",
    ],
    path: "/campus-life/NSS",
    icon: HeartHandshake,
    accentColor: "from-blue-600 to-indigo-600",
    shadowColor: "shadow-blue-100"
  },
  {
    id: "ncc",
    name: "National Cadet Corps (NCC)",
    tagline: "Unity and Discipline",
    category: "University-Level",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7BC9F675ckr5_llRggB3_0cSorpQxZfJ4CB0fKnrw7vNg18AjXuuLZXb&s=10",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_7BC9F675ckr5_llRggB3_0cSorpQxZfJ4CB0fKnrw7vNg18AjXuuLZXb&s=10",
    memberCount: "300+",
    description: "The National Cadet Corps is the youth wing of the Indian Armed Forces. It operates as a tri-services organization, comprising the Army, the Navy and the Air Wing, dedicated to grooming disciplined citizens.",
    achievements: [
      "Cadets selected for the prestigious Republic Day Parade (RDC) in New Delhi",
      "Conducted extensive disaster response simulation drills",
      "Won best drill battalion at the state-level camp",
    ],
    path: "/campus-life/NCC",
    icon: Shield,
    accentColor: "from-red-600 to-orange-600",
    shadowColor: "shadow-red-100"
  }
];

const ClubsMain = () => {
  const [schoolClubs, setSchoolClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setSchoolClubs(clubsData);
    setLoading(false);
  }, []);

  const getCategoryColor = (category) => {
    switch (category) {
      case "Technical":
        return "bg-blue-600 hover:bg-blue-700";
      case "Cultural":
        return "bg-purple-600 hover:bg-purple-700";
      case "Literary":
        return "bg-amber-600 hover:bg-amber-700";
      case "Environmental":
        return "bg-emerald-600 hover:bg-emerald-700";
      case "Media":
        return "bg-pink-600 hover:bg-pink-700";
      case "Wellness":
        return "bg-teal-600 hover:bg-teal-700";
      case "Sports":
        return "bg-orange-600 hover:bg-orange-700";
      case "Social":
        return "bg-rose-600 hover:bg-rose-700";
      case "University-Level":
        return "bg-gradient-to-r from-red-600 to-orange-600 hover:opacity-90";
      default:
        return "bg-slate-600 hover:bg-slate-700";
    }
  };

  const filteredSchoolClubs = schoolClubs.filter(
    (club) => selectedCategory === "All" || club.category === selectedCategory
  );

  const statsData = [
    {
      icon: Users,
      numberText: "13+",
      title: "Cultural & Tech Clubs",
      iconColor: "#2563eb",
    },
    {
      icon: Trophy,
      numberText: "50+",
      title: "National Awards",
      iconColor: "#eab308",
    },
    {
      icon: Calendar,
      numberText: "100+",
      title: "Events This Year",
      iconColor: "#16a34a",
    },
    {
      icon: Sparkles,
      numberText: "1000+",
      title: "Active Volunteers",
      iconColor: "#ec4899",
    },
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 pb-20">
        <HeroBanner
          title="Student Clubs & Societies"
          subtitle="Explore Gautam Buddha University's student-led cultural, technical, literary, environmental, wellness, sports, and media societies."
          bgTheme={6}
        />

        <StatsCard stats={statsData} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          {/* University Level Clubs */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                University-Level Organizations
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {collegeClubs.map((club) => {
                const IconComponent = club.icon;
                return (
                  <div
                    key={club.id}
                    className={`bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col ${club.shadowColor}`}
                  >
                    <div className="h-60 relative overflow-hidden bg-slate-900">
                      <img
                        src={club.banner}
                        alt={club.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
                      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${club.accentColor}`}>
                          {club.category}
                        </span>
                        <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
                          <Users className="w-4 h-4 text-white" />
                          <span>{club.memberCount} Members</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-xl bg-gradient-to-br ${club.accentColor} text-white shrink-0`}>
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 leading-tight">
                            {club.name}
                          </h3>
                        </div>
                        <p className="text-sm font-medium text-slate-400 italic mb-4">"{club.tagline}"</p>
                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          {club.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-1.5">
                            <Trophy className="w-4 h-4 text-yellow-500" /> Key Highlights & Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {club.achievements.map((ach, idx) => (
                              <li key={idx} className="flex items-start text-xs text-slate-600 gap-2">
                                <Star className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Link to={club.path}>
                        <button className={`w-full py-3 px-6 rounded-xl text-white font-semibold flex items-center justify-center gap-2 bg-gradient-to-r ${club.accentColor} hover:opacity-90 transition-opacity`}>
                          Enter Portal Page
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* School Level Clubs & Societies */}
          <div>
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-slate-800 flex items-center justify-center gap-2">
                Clubs & Societies
              </h2>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center items-center gap-2 mb-10 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm max-w-4xl mx-auto">
              {["All", "Cultural", "Technical", "Literary", "Environmental", "Wellness", "Sports", "Social", "Media"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-slate-900 text-white shadow-md shadow-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800 mb-4"></div>
                <p className="text-slate-500">Loading school-level clubs...</p>
              </div>
            ) : filteredSchoolClubs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSchoolClubs.map((club) => (
                  <div
                    key={club.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={club.banner || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"}
                        alt={club.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${getCategoryColor(club.category)}`}>
                          {club.category}
                        </span>
                      </div>
                      {club.schoolCode && (
                        <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider">
                          {club.schoolCode}
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                          {club.name}
                        </h3>
                        <p className="text-xs font-medium text-slate-400 mb-3 truncate">{club.tagline}</p>
                        <p className="text-slate-600 text-sm line-clamp-3 mb-4">
                          {club.description}
                        </p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <p className="text-slate-400 font-medium">No clubs found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ClubsMain;
