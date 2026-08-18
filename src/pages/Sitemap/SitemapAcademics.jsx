import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, GraduationCap, Calendar, BookOpen, Award, Users, Globe, FileText, CalendarRange } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const ACADEMIC_LINKS = [
  { title: "Schools & Departments", path: "/academics/schools", icon: GraduationCap, desc: "Explore 8 specialized academic schools and departments." },
  { title: "Academic Calendar & Regulations", path: "/academics/academic-calendar", icon: Calendar, desc: "Session schedules, exam dates, and academic timelines." },
  { title: "List of Holidays", path: "/academics/list-of-holidays", icon: CalendarRange, desc: "Official university gazetted holidays, restricted days, and vacation breaks." },
  { title: "CBCS Curriculum Framework", path: "/academics/cbcs-framework", icon: BookOpen, desc: "Choice Based Credit System and 10-point grading scheme." },
  { title: "Faculty Directory", path: "/academics/faculty", icon: Users, desc: "Directory of distinguished faculty members across disciplines." },
  { title: "International Collaboration", path: "/academics/international-collaboration", icon: Globe, desc: "Global MoUs, student exchanges, and joint research programs." },
  { title: "National Academic Depository (NAD)", path: "/academics/national-academic-depository", icon: FileText, desc: "Digital repository for academic degrees and certificates." },
  { title: "Annual Reports", path: "/academics/annual-reports", icon: FileText, desc: "Annual academic reports, institutional quality audits, and publications." },
];

const SitemapAcademics = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 font-sans py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="flex items-center hover:text-blue-600 transition-colors">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="font-medium text-gray-900">Academics</span>
          </nav>

          <div className="text-center mb-10">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3.5 py-1 rounded-full uppercase tracking-wider">
              Academic Section
            </span>
            <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-3">Academics Overview</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore academic schools, curricula, faculty directories, official calendars, and holiday schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMIC_LINKS.map((item) => {
              const IconComp = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    <span>Visit Page</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default SitemapAcademics;
