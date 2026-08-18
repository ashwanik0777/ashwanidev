import React, { useState } from 'react';
import { FileText, ExternalLink, Calendar, Search } from 'lucide-react';
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const ANNUAL_REPORTS_LIST = [
  {
    id: "ar-1",
    title: "Annual Report 2014-15",
    period: "2014 - 2015",
    file: "https://drive.google.com/file/d/1-NMA0VLsslJt-wyKb6xZumNWcOXBEf6x/view?usp=drive_web"
  },
  {
    id: "ar-2",
    title: "Annual Report 2016-17 & 2017-18",
    period: "2016 - 2018",
    file: "https://drive.google.com/file/d/1TP5uibI1VuCOZ3B7o08VJcLeTI02ueMc/view?usp=drive_web"
  },
  {
    id: "ar-3",
    title: "Annual Report 2018-19, 2019-20 & 2020-21",
    period: "2018 - 2021",
    file: "https://drive.google.com/file/d/1H-GVoAW3kQU92Oc16rKyDz6bR-enOK1y/view?usp=drive_web"
  },
  {
    id: "ar-4",
    title: "Annual Report 2021-22",
    period: "2021 - 2022",
    file: "https://drive.google.com/file/d/1duZnaf4iPnicJR4dQ97RwL4YsiNiJFeh/view?usp=drive_web"
  },
  {
    id: "ar-5",
    title: "Annual Report 2022-23",
    period: "2022 - 2023",
    file: "https://drive.google.com/file/d/1IO2ALO-HtOxyWZAfXz9bIIgBKvp8uyqm/view?usp=drive_web"
  },
  {
    id: "ar-6",
    title: "Annual Report 2023-24",
    period: "2023 - 2024",
    file: "https://drive.google.com/file/d/16uXdaavWgULLBuvUdcZMPLWwESSXXONK/view?usp=drive_web"
  }
];

const ReportsPublications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = ANNUAL_REPORTS_LIST.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 font-sans pb-16">
        {/* Banner Section */}
        <BannerSection
          title="Annual Reports"
          subtitle="Official Yearly Academic, Research & Institutional Reports of Gautam Buddha University"
          bgTheme={6}
        />

        <div className="container mx-auto px-4 max-w-6xl pt-10">
          {/* Header & Search */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">Official Annual Reports Archive</h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                Access and download official university annual reports from 2014 onwards.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search year or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600 transition-all"
              />
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Academic Period: {report.period}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {report.title}
                  </h3>
                </div>

                <a
                  href={report.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors mt-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View File (PDF)</span>
                </a>
              </div>
            ))}
          </div>

          {filteredReports.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
              No reports found matching "{searchTerm}"
            </div>
          )}
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ReportsPublications;
