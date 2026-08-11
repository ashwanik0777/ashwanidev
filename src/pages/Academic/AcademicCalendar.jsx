import React, { useState } from 'react';
import { 
  FileText, 
  ExternalLink, 
  Calendar, 
  Search,
  Download,
  CheckCircle2,
  FileDown,
  Sparkles
} from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const ACADEMIC_CALENDARS_DATA = [
  {
    id: 1,
    year: "2026-27",
    title: "Academic Calendar 2026-27",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic%20Calendar%202026-27.pdf",
    format: "PDF Document",
    status: "Latest Session",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    isLatest: true
  },
  {
    id: 2,
    year: "2024-25",
    title: "Academic Calendar 2024-25",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic%20Calendar%202024-25.pdf",
    format: "PDF Document",
    status: "Active Session",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    isLatest: false
  },
  {
    id: 3,
    year: "2023-24",
    title: "Academic Calendar 2023-24",
    fileUrl: "https://www.gbu.ac.in/Admissions/DownloadFile?nName=17906680_6252a53d.jpgAcademic%20calander%202034-24%20.jpg",
    format: "JPG Image",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  },
  {
    id: 4,
    year: "2022-23",
    title: "Revised Academic Calendar 2022-23 for 1st Year Students",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Revised%20Academic%20Calendar%202022-23_14Sept2022.pdf",
    format: "PDF Document",
    status: "Revised (Freshers)",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    isLatest: false
  },
  {
    id: 5,
    year: "2022-23",
    title: "Academic Calendar 2022-23",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic%20Calendar%202022-23.pdf",
    format: "PDF Document",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  },
  {
    id: 6,
    year: "2021-22",
    title: "Academic Calendar 2021-22 (Revised)",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Revised_AcademicCalendar_7Dec2021.pdf",
    format: "PDF Document",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  },
  {
    id: 7,
    year: "2020-21",
    title: "Academic Calendar 2020-21",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic-Calendar-20-21.jpg",
    format: "JPG Image",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  },
  {
    id: 8,
    year: "2019-20",
    title: "Academic Calendar 2019-20 (Updated)",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic-Calendar-19-20_updated_22Aug19.jpg",
    format: "JPG Image",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  },
  {
    id: 9,
    year: "2018-19",
    title: "Academic Calendar 2018-19",
    fileUrl: "https://www.gbu.ac.in/Content/gbudata/General/Academic-Calendar-18-19.jpg",
    format: "JPG Image",
    status: "Archived",
    badgeColor: "bg-slate-100 text-slate-700 border-slate-200",
    isLatest: false
  }
];

const AcademicCalendar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCalendars = ACADEMIC_CALENDARS_DATA.filter((cal) =>
    cal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cal.year.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Banner */}
        <BannerSection
          title="Academic Calendars"
          subtitle="Academics"
          bgTheme={5}
        />

        {/* Content Container */}
        <section className="py-14 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            {/* Header Title & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Academics Repository
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  Academic Calendars Archive
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Download official academic session schedules, teaching timelines, and vacation guidelines.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search session (e.g. 2026-27)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Calendars List */}
            <div className="space-y-4">
              {filteredCalendars.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">No academic calendar found matching "{searchTerm}"</p>
                </div>
              ) : (
                filteredCalendars.map((cal) => (
                  <div
                    key={cal.id}
                    className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:shadow-md ${
                      cal.isLatest 
                        ? 'border-emerald-300 bg-gradient-to-r from-emerald-50/40 via-white to-white' 
                        : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        cal.isLatest ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <Calendar className="w-6 h-6" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${cal.badgeColor}`}>
                            {cal.status}
                          </span>
                          <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
                            {cal.format}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {cal.title}
                        </h3>
                        <p className="text-slate-500 text-xs mt-1">
                          Session Year: <strong>{cal.year}</strong> • Gautam Buddha University
                        </p>
                      </div>
                    </div>

                    <a
                      href={cal.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`font-semibold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                        cal.isLatest
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                          : 'bg-slate-900 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download / View</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                    </a>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default AcademicCalendar;
