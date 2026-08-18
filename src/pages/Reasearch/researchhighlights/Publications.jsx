import React, { useState } from "react";
import { Eye, Download, Filter, BookOpen, FileSignature, Star, Award, Search, ChevronLeft, ChevronRight, Calendar, User, Building, LayoutGrid, Table as TableIcon } from "lucide-react";

import StatsCard from "../../../components/StatsCard.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from '../../../components/TabsData.jsx';
import { allResearchPublications } from "../../../Data/researchPublicationsData.js";

const Publications = () => {
  const [activeTab, setActiveTab] = useState("publications");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const schools = [
    "School of Information & Communication Technology",
    "School of Biotechnology",
    "School of Engineering",
    "School of Basic Sciences",
    "School of Management",
    "School of Humanities & Social Sciences",
    "Planning & Research Division",
  ];

  const types = [
    "Article",
    "Thesis",
    "Conference Paper",
    "Book Chapter",
    "Review",
    "Book",
    "Book Review",
  ];
  const statuses = ["Granted", "Filed", "Under Review", "Published"];

  const publications = allResearchPublications;

  const patents = [
    {
      id: 1,
      title: "Synthetic Gene Coding for TET1 Catalytic Domain in Programmable Enzymes for Epigenome Editing",
      inventors: "School of Biotechnology, Gautam Buddha University",
      patentNo: "IN202311048912",
      filingDate: "2023-08-14",
      status: "Published",
      category: "Biotechnology",
      school: "Biotechnology",
    },
    {
      id: 2,
      title: "Voice Synthesis Mechanism through Natural Language Processing for Voice Interactive Robots",
      inventors: "School of Information & Communication Technology (SOICT)",
      patentNo: "IN202311059231",
      filingDate: "2023-09-28",
      status: "Published",
      category: "Artificial Intelligence",
      school: "Information & Communication Technology",
    },
    {
      id: 3,
      title: "Automated Personality Prediction System Using Multimodal Behavioral Analytics",
      inventors: "Department of Computer Science & Engineering, SOICT",
      patentNo: "IN202411012345",
      filingDate: "2024-02-10",
      status: "Granted",
      category: "Computer Science",
      school: "Information & Communication Technology",
    },
  ];

  const filteredPublications = publications.filter((pub) => {
    return (
      (!selectedSchool || pub.school === selectedSchool) &&
      (!selectedCategory || pub.category === selectedCategory) &&
      (!selectedYear || pub.year === selectedYear) &&
      (!selectedType || pub.type === selectedType) &&
      (!searchTerm ||
        pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pub.authors.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const filteredPatents = patents.filter((p) => {
    return (
      (!selectedSchool || p.school === selectedSchool) &&
      (!selectedStatus || p.status === selectedStatus)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    activeTab === "publications"
      ? filteredPublications.slice(indexOfFirstItem, indexOfLastItem)
      : filteredPatents.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages =
    activeTab === "publications"
      ? Math.ceil(filteredPublications.length / itemsPerPage)
      : Math.ceil(filteredPatents.length / itemsPerPage);

  const tabButtons = [
    { id: "publications", label: "Research Publications" },
    { id: "patents", label: "Patents" },
  ];

  const statsData = [
    {
      icon: BookOpen,
      number: allResearchPublications.length,
      numberText: `${allResearchPublications.length}+`,
      title: "Total Publications",
      iconColor: "#2563eb", // blue-600
    },
    {
      icon: FileSignature,
      number: 85,
      numberText: "85+",
      title: "Patents Filed & Granted",
      iconColor: "#16a34a", // green-600
    },
    {
      icon: Star,
      number: 18.5,
      title: "Avg Impact Factor",
      iconColor: "#0891b2", // cyan-600
    },
    {
      icon: Award,
      number: 12500,
      numberText: "12,500+",
      title: "Total Citations",
      iconColor: "#facc15", // yellow-500
    },
  ];

  const cardStyle = {
    transform: 'translateY(0px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const cardHoverStyle = {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)'
  };

  return (
    <SearchableWrapper>
      <div>
        <div className="bg-gradient-to-b from-white to-blue-50">
          <div className="text-center mt-15">
            <h1 className="text-4xl font-semibold text-black/70">
              Publications & Patents
            </h1>
          </div>

          <StatsCard stats={statsData} />

        </div>

        <div className="px-4 sm:px-8 lg:px-16 pb-10">
          {/* Tabs */}
          <ButtonGroup
            buttons={tabButtons}
            onClick={(btnId) => {
              setActiveTab(btnId);
              setCurrentPage(1);
            }}
            activeButton={activeTab}
            size="lg"
            fullWidth={true}
            rounded="lg"
            theme="primary"
            animated={true}
          />

          {/* Filters & View Switch Header */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-blue-600" />
                <h2 className="text-base sm:text-lg font-semibold text-gray-900">Filter & Display Options</h2>
              </div>

              {/* View Switch Controls */}
              <div className="flex items-center bg-gray-100 p-1.5 rounded-xl border border-gray-200 w-full sm:w-auto justify-center">
                <button
                  onClick={() => setViewMode("table")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex-1 sm:flex-none justify-center ${
                    viewMode === "table"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <TableIcon size={16} /> Table View
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex-1 sm:flex-none justify-center ${
                    viewMode === "grid"
                      ? "bg-white text-blue-700 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <LayoutGrid size={16} /> Grid View
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* School Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">School</label>
                <select
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                >
                  <option value="">All Schools</option>
                  {schools.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                >
                  <option value="">All Categories</option>
                  <option value="Research Bulletin">Research Bulletin</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Energy Systems">Energy Systems</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Status</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                >
                  <option value="">All Status</option>
                  <option value="Granted">Granted</option>
                  <option value="Published">Published</option>
                  <option value="Filed">Filed</option>
                  <option value="Under Review">Under Review</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search titles, authors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publications Section */}
          {activeTab === "publications" && (
            viewMode === "table" ? (
              /* Publications Data Table */
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="py-4 px-6 text-center w-12">#</th>
                        <th className="py-4 px-6 min-w-[320px]">Publication Details</th>
                        <th className="py-4 px-6 min-w-[220px]">Authors & School</th>
                        <th className="py-4 px-6 min-w-[220px]">Journal & Details</th>
                        <th className="py-4 px-6 min-w-[200px]">Bulletin Batch</th>
                        <th className="py-4 px-6 text-center min-w-[150px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {currentItems.length > 0 ? (
                        currentItems.map((pub, index) => (
                          <tr key={pub.id} className="hover:bg-blue-50/40 transition-colors">
                            <td className="py-4 px-6 text-center font-medium text-gray-500">
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-bold text-gray-900 leading-snug mb-1">{pub.title}</p>
                              {pub.doi && (
                                <div className="flex items-center text-xs text-gray-500 gap-1 mt-1">
                                  <span className="font-semibold text-slate-400">DOI:</span>
                                  <span className="font-mono text-blue-600 truncate max-w-[240px]">{pub.doi}</span>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-800 font-medium text-xs mb-1.5 leading-relaxed">{pub.authors}</p>
                              <span className="inline-block bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                                {pub.school}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-semibold text-gray-900 text-xs leading-snug">{pub.journal || "GBU Research Publication"}</p>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {pub.year && `Year: ${pub.year}`}
                                {pub.volume && ` • Vol: ${pub.volume}`}
                                {pub.issue && ` • Issue: ${pub.issue}`}
                              </p>
                            </td>
                            <td className="py-4 px-6">
                              <span className="inline-block bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-md border border-slate-200">
                                {pub.bulletinTitle}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <a
                                  href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm"
                                >
                                  <Eye size={14} /> View
                                </a>
                                <a
                                  href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm"
                                >
                                  <Download size={14} /> PDF
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-12 text-gray-500">
                            No publications found matching criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Publications Grid View */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {currentItems.length > 0 ? (
                  currentItems.map((pub, index) => (
                    <div
                      key={pub.id}
                      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 p-8 overflow-hidden"
                      style={{
                        ...cardStyle,
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, cardHoverStyle);
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, cardStyle);
                      }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300">
                        {pub.school}
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 mt-9 pr-20 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                          {pub.title}
                        </h3>

                        <div className="mb-4">
                          <p className="text-gray-700 text-sm font-medium mb-1">Authors</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{pub.authors}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-gray-700 text-sm font-medium mb-1">Journal</p>
                            <p className="text-gray-600 text-sm">{pub.journal}</p>
                          </div>
                          <div>
                            <p className="text-gray-700 text-sm font-medium mb-1">Year & Type</p>
                            <p className="text-gray-600 text-sm">{pub.year} • {pub.type}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-100">
                            <p className="text-green-700 text-xs font-medium mb-1">Impact Factor</p>
                            <p className="text-green-800 text-lg font-bold">{pub.impact}</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-lg p-3 border border-purple-100">
                            <p className="text-purple-700 text-xs font-medium mb-1">Citations</p>
                            <p className="text-purple-800 text-lg font-bold">{pub.citations}</p>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">Quartile: {pub.quartile}</span>
                            <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded">Indexing: {pub.indexing}</span>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <p><span className="font-medium">DOI:</span> {pub.doi}</p>
                            <p><span className="font-medium">Scopus ID:</span> {pub.scopusId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                          <a
                            href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium group/btn"
                          >
                            <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                            View Document
                          </a>
                          <a
                            href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium group/btn"
                          >
                            <Download size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                            Download PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="text-gray-400 text-lg mb-2">No publications found</div>
                    <p className="text-gray-500 text-sm">Check back later for updates</p>
                  </div>
                )}
              </div>
            )
          )}

          {/* Patents Section */}
          {activeTab === "patents" && (
            viewMode === "table" ? (
              /* Patents Data Table */
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th className="py-4 px-6 text-center w-12">#</th>
                        <th className="py-4 px-6 min-w-[300px]">Patent Title & Category</th>
                        <th className="py-4 px-6 min-w-[220px]">Inventors & School</th>
                        <th className="py-4 px-6 min-w-[180px]">Patent No & Date</th>
                        <th className="py-4 px-6 text-center min-w-[140px]">Status</th>
                        <th className="py-4 px-6 text-center min-w-[150px]">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {currentItems.length > 0 ? (
                        currentItems.map((patent, index) => (
                          <tr key={patent.id} className="hover:bg-indigo-50/40 transition-colors">
                            <td className="py-4 px-6 text-center font-medium text-gray-500">
                              {indexOfFirstItem + index + 1}
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-bold text-gray-900 leading-snug mb-1">{patent.title}</p>
                              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded font-medium">{patent.category}</span>
                            </td>
                            <td className="py-4 px-6">
                              <p className="text-gray-800 font-medium text-xs mb-1.5">{patent.inventors}</p>
                              <span className="inline-block bg-indigo-100 text-indigo-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                                {patent.school}
                              </span>
                            </td>
                            <td className="py-4 px-6">
                              <p className="font-mono text-xs font-semibold text-gray-900">{patent.patentNo}</p>
                              <p className="text-xs text-gray-500">Filing: {patent.filingDate}</p>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                patent.status === "Granted"
                                  ? "bg-green-100 text-green-800 border border-green-200"
                                  : patent.status === "Filed"
                                    ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                    : patent.status === "Under Review"
                                      ? "bg-orange-100 text-orange-800 border border-orange-200"
                                      : "bg-blue-100 text-blue-800 border border-blue-200"
                              }`}>
                                {patent.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm">
                                  <Eye size={14} /> View
                                </button>
                                <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-all shadow-sm">
                                  <Download size={14} /> PDF
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-12 text-gray-500">
                            No patents found matching criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Patents Grid View */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {currentItems.length > 0 ? (
                  currentItems.map((patent, index) => (
                    <div
                      key={patent.id}
                      className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 p-8 overflow-hidden"
                      style={{
                        ...cardStyle,
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: 'both'
                      }}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, cardHoverStyle);
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, cardStyle);
                      }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-50 to-transparent rounded-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      <div className="absolute top-3 right-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300">
                        {patent.school}
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 mt-10 pr-30 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                          {patent.title}
                        </h3>

                        <div className="mb-4">
                          <p className="text-gray-700 text-sm font-medium mb-1">Inventors</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{patent.inventors}</p>
                        </div>

                        <div className="space-y-4 mb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-gray-700 text-sm font-medium mb-1">Patent Number</p>
                              <p className="text-gray-900 text-sm font-mono bg-gray-50 px-3 py-2 rounded border">{patent.patentNo}</p>
                            </div>
                            <div>
                              <p className="text-gray-700 text-sm font-medium mb-1">Filing Date</p>
                              <p className="text-gray-600 text-sm">{patent.filingDate}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-gray-700 text-sm font-medium mb-2">Status</p>
                            <span
                              className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold shadow-sm ${patent.status === "Granted"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : patent.status === "Filed"
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                  : patent.status === "Under Review"
                                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                                    : "bg-blue-100 text-blue-800 border border-blue-200"
                                }`}
                            >
                              <div className={`w-2 h-2 rounded-full mr-2 ${patent.status === "Granted" ? "bg-green-500" :
                                patent.status === "Filed" ? "bg-yellow-500" :
                                  patent.status === "Under Review" ? "bg-orange-500" : "bg-blue-500"
                                }`}></div>
                              {patent.status}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium group/btn">
                            <Eye size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                            View Details
                          </button>
                          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium group/btn">
                            <Download size={16} className="group-hover/btn:scale-110 transition-transform duration-200" />
                            Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="text-gray-400 text-lg mb-2">No patents found</div>
                    <p className="text-gray-500 text-sm">Check back later for updates</p>
                  </div>
                )}
              </div>
            )
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-700 text-white" : "bg-gray-200"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

    </SearchableWrapper>
  );
};

export default Publications;
