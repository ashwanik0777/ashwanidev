import React, { useState } from "react";
import { Eye, Download, Filter, BookOpen, FileSignature, Star, Award, Search, ChevronLeft, ChevronRight, Calendar, User, Building, LayoutGrid, Table as TableIcon } from "lucide-react";

import StatsCard from "../../../components/StatsCard.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from '../../../components/TabsData.jsx';
import { allResearchPublications } from "../../../Data/researchPublicationsData.js";

const Publications = () => {
  const [activeTab, setActiveTab] = useState("publications");
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'grid'
  const [selectedBulletin, setSelectedBulletin] = useState("");
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const officialBulletins = [
    {
      id: "b1",
      title: "GBU Research Publications (March 2026 – May 2026)",
      period: "March 2026 – May 2026",
      year: "2026",
      pdfUrl: "https://drive.google.com/file/d/1_6xHxKEKOXyzuCjkFltoixxgS_zh8uxt/view?usp=drive_web",
      publisher: "Planning & Research Division, Gautam Buddha University",
      paperCount: allResearchPublications.filter(p => p.bulletinTitle.includes("March 2026")).length,
    },
    {
      id: "b2",
      title: "GBU Research Publications (December 2025 – February 2026)",
      period: "December 2025 – February 2026",
      year: "2026",
      pdfUrl: "https://drive.google.com/file/d/1Jp80O2TjVckwozZyGKs9S4LTgjCWqKVs/view?usp=drive_web",
      publisher: "Planning & Research Division, Gautam Buddha University",
      paperCount: allResearchPublications.filter(p => p.bulletinTitle.includes("December 2025")).length,
    },
    {
      id: "b3",
      title: "GBU Research Publications (September 2025 – November 2025)",
      period: "September 2025 – November 2025",
      year: "2025",
      pdfUrl: "https://drive.google.com/file/d/1aIwv4M5dqNkesn-EdGKGZvRuK83lWSa5/view?usp=drive_web",
      publisher: "Planning & Research Division, Gautam Buddha University",
      paperCount: allResearchPublications.filter(p => p.bulletinTitle.includes("September 2025")).length,
    },
    {
      id: "b4",
      title: "GBU Research Publications (June 2025 – August 2025)",
      period: "June 2025 – August 2025",
      year: "2025",
      pdfUrl: "https://drive.google.com/file/d/1f6j9Q_s-QWaxVkXVgcNjb7ibMtj0rgbk/view?usp=drive_web",
      publisher: "Planning & Research Division, Gautam Buddha University",
      paperCount: allResearchPublications.filter(p => p.bulletinTitle.includes("June 2025")).length,
    },
    {
      id: "b5",
      title: "GBU Research Publications (January 2025 – May 2025)",
      period: "January 2025 – May 2025",
      year: "2025",
      pdfUrl: "https://drive.google.com/file/d/1vQSD1qBa3dSWYObyrgW-VK32cAmY1tI0/view?usp=drive_web",
      publisher: "Planning & Research Division, Gautam Buddha University",
      paperCount: allResearchPublications.filter(p => p.bulletinTitle.includes("January 2025")).length,
    },
  ];

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
      title: "Edge Preserving Image Smoothing Benchmark System with Deep Convolutional Neural Network",
      status: "Granted",
      year: "2020",
      type: "Australian Patent",
      patentNo: "2020102385",
      inventors: "Jaware T. H., Nayyar A., Solanki, A., Dembrani M. B., Mahapatra B., jhansi N. Z.",
      description: "Edge Preserving Image Smoothing Benchmark System with Deep Convolutional Neural Network is invented in which image smoothing is performed by retaining the edge of an image with Deep Convolutional Neural Network by the state of art filters.",
      school: "School of Information & Communication Technology",
      category: "Granted",
      filingDate: "2020"
    },
    {
      id: 2,
      title: "Techniques and Architectures for Providing and Operating an Application-Aware Database Environment",
      status: "Granted",
      year: "2020",
      type: "United States Patent (USPTO)",
      patentNo: "8956P286 (1883US1)",
      inventors: "Sharma, V.",
      description: "Novel techniques and software/hardware architectures for establishing and managing application-aware database environments with high operational efficiency.",
      school: "School of Information & Communication Technology",
      category: "Granted",
      filingDate: "2020"
    },
    {
      id: 3,
      title: "A Technique for Traffic Prediction and Congestion Control in IOT Networks using Machine Learning",
      status: "Granted",
      year: "2020",
      type: "Australian Patent",
      patentNo: "Australian Patent",
      inventors: "Sharma, S.",
      description: "Machine learning-driven traffic forecasting and congestion mitigation algorithms optimized for Internet of Things (IoT) wireless sensor networks.",
      school: "School of Information & Communication Technology",
      category: "Granted",
      filingDate: "2020"
    },
    {
      id: 4,
      title: "Voice Synthesis Mechanism through Natural Language Processing for Voice Interactive Robots",
      status: "Published",
      year: "2020",
      type: "Indian Patent",
      patentNo: "Indian Patent",
      inventors: "Sharma, S.",
      description: "A natural language processing framework enabling real-time voice synthesis and interactive dialogue for autonomous robotic systems.",
      school: "School of Information & Communication Technology",
      category: "Published",
      filingDate: "2020"
    },
    {
      id: 5,
      title: "IoT based Plant Detection using Support Vector Machine Algorithm",
      status: "Published",
      year: "2020",
      type: "Indian Patent",
      patentNo: "Indian Patent",
      inventors: "Sharma, S.",
      description: "An IoT-enabled agricultural classification system applying Support Vector Machine (SVM) algorithms for automated plant detection and health monitoring.",
      school: "School of Information & Communication Technology",
      category: "Published",
      filingDate: "2020"
    },
    {
      id: 6,
      title: "A Novel Intelligent Force Convection and Utilization of Phase Change Property of the Materials for Thermal Energy Harvesting",
      status: "Published",
      year: "2020",
      type: "Indian Patent App",
      patentNo: "201811048341",
      inventors: "Sharma, V. and Verma, G.",
      description: "Thermal energy harvesting technology leveraging forced convection dynamics and phase change materials for sustainable power conversion.",
      school: "School of Information & Communication Technology",
      category: "Published",
      filingDate: "2020"
    },
    {
      id: 7,
      title: "A Novel Dynamic Array of RF Energy Harvesters With Hybrid Storage for Wireless Sensor Network",
      status: "Published",
      year: "2020",
      type: "Indian Patent App",
      patentNo: "201811048340",
      inventors: "Sharma, V. and Verma, G.",
      description: "Dynamic RF energy harvesting array featuring hybrid energy storage architectures designed for battery-less wireless sensor nodes.",
      school: "School of Information & Communication Technology",
      category: "Published",
      filingDate: "2020"
    },
    {
      id: 8,
      title: "Automated Personality Prediction",
      status: "Filed",
      year: "2021",
      type: "Patent Journal Office, INDIA",
      patentNo: "202111001636 A",
      inventors: "Acharya, D.; Bhardwaj, H.; Sakalle, A.; Goel, S.; Biswas, K. K.; Tomar, P. and Bhardwaj, A.",
      description: "Automated personality classification system utilising computational intelligence algorithms and physiological sensor data analysis.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2021"
    },
    {
      id: 9,
      title: "Diode Bridge",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "336950-001",
      inventors: "Nayyar, A.; Rameshwer, R.; Shukla, P. K.; Krishnamurthi, R. and Tomar, P.",
      description: "Novel semiconductor diode bridge design for micro-power conversion circuit applications.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    },
    {
      id: 10,
      title: "Synthetic Gene Coding for Foki Nuclease Domain in Programmable Nucleases for Genome Editing",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "202011039103",
      inventors: "Nain, V; Suman and Tomar, P.",
      description: "Genetically engineered FokI nuclease domain sequence optimized for targeted genome editing enzymes.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    },
    {
      id: 11,
      title: "Synthetic Gene Coding for VP64 Transcription Activation Domain in Programmable Transcription Factors",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "202011039104",
      inventors: "Nain, V; Suman and Tomar, P.",
      description: "Synthetic gene construct encoding VP64 transcriptional activation domain for synthetic biology tools.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    },
    {
      id: 12,
      title: "Synthetic Gene Coding for NF-Κb P65 Activation Domain Transcription Activation Domain in Programmable Transcription Factors",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "202011039105",
      inventors: "Nain, V; Suman and Tomar, P.",
      description: "Synthetic NF-κB p65 gene domain engineered for robust programmable transcription factor activation.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    },
    {
      id: 13,
      title: "Synthetic Gene Coding for Krab Transcription Repression Domain in Programmable Transcription Repressors",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "202011039106",
      inventors: "Nain, V; Suman and Tomar, P.",
      description: "Optimized KRAB transcription repressor domain sequence for epigenome gene silencing applications.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    },
    {
      id: 14,
      title: "Synthetic Gene Coding for TET1 Catalytic Domain in Programmable Enzymes for Epigenome Editing",
      status: "Filed",
      year: "2020",
      type: "Indian Patent Application",
      patentNo: "202011039107",
      inventors: "Nain, V; Suman and Tomar, P.",
      description: "Engineered TET1 catalytic domain sequence designed for targeted DNA demethylation and epigenome editing.",
      school: "School of Information & Communication Technology",
      category: "Filed",
      filingDate: "2020"
    }
  ];

  const filteredPublications = publications.filter((pub) => {
    return (
      (!selectedBulletin || pub.bulletinTitle === selectedBulletin) &&
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
      (!selectedStatus || p.status === selectedStatus) &&
      (!searchTerm ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.inventors.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patentNo.toLowerCase().includes(searchTerm.toLowerCase()))
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
        <div className="bg-gradient-to-b from-white to-blue-50 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-black/70">
              Research Publications
            </h1>
          </div>
        </div>

        <div className="px-4 sm:px-8 lg:px-16 pt-6 pb-10">
          {/* Main Navigation Tabs */}
          <div className="mb-6">
            <ButtonGroup
              buttons={[
                { id: "publications", label: "Research Publications" },
                { id: "patents", label: "Patents" },
              ]}
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
          </div>

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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Bulletin Selection Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Official Bulletin</label>
                <select
                  value={selectedBulletin}
                  onChange={(e) => {
                    setSelectedBulletin(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300 font-medium text-blue-900"
                >
                  <option value="">All 5 Official Bulletins</option>
                  {officialBulletins.map((b) => (
                    <option key={b.id} value={b.title}>
                      {b.period} ({b.paperCount} Papers)
                    </option>
                  ))}
                </select>
              </div>

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

          {/* 5 Official Bulletins Cards Grid */}
          {activeTab === "publications" && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <BookOpen className="text-blue-600" size={20} />
                  Official GBU Research Publications Bulletins
                </h3>
                {selectedBulletin && (
                  <button
                    onClick={() => {
                      setSelectedBulletin("");
                      setCurrentPage(1);
                    }}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    ← Back to All 5 Bulletins
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {officialBulletins.map((b) => {
                  const isSelected = selectedBulletin === b.title;
                  return (
                    <div
                      key={b.id}
                      className={`p-5 rounded-2xl border transition-all duration-300 relative flex flex-col justify-between ${
                        isSelected
                          ? "bg-blue-50/90 border-blue-500 ring-2 ring-blue-300 shadow-md"
                          : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
                            {b.year} Bulletin
                          </span>
                          <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-slate-200">
                            {b.paperCount} Extracted Papers
                          </span>
                        </div>
                        <h4 className="font-bold text-gray-900 text-base leading-snug mb-2">
                          {b.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-4">{b.publisher}</p>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => {
                            setSelectedBulletin(isSelected ? "" : b.title);
                            setCurrentPage(1);
                          }}
                          className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-sm"
                              : "bg-slate-900 hover:bg-blue-700 text-white shadow-sm"
                          }`}
                        >
                          <Eye size={14} />
                          {isSelected ? "Viewing Extracted Papers" : `Explore ${b.paperCount} Papers →`}
                        </button>
                        <a
                          href={b.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-1 shadow-sm"
                          title="Download Official Bulletin PDF"
                        >
                          <Download size={14} /> PDF
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extracted Publications List (Rendered ONLY when a bulletin is selected) */}
          {activeTab === "publications" && selectedBulletin && (
            <div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50 border border-blue-200 p-4 rounded-2xl mb-6">
                <div>
                  <h4 className="font-bold text-blue-900 text-sm sm:text-base">
                    Showing {filteredPublications.length} Extracted Research Papers
                  </h4>
                  <p className="text-xs text-blue-700 mt-0.5">{selectedBulletin}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedBulletin("");
                    setCurrentPage(1);
                  }}
                  className="text-xs font-semibold bg-white text-blue-700 hover:bg-blue-100 px-3.5 py-2 rounded-xl border border-blue-200 transition-all flex items-center gap-1 shadow-sm"
                >
                  ← Back to Bulletins
                </button>
              </div>

              {viewMode === "table" ? (
                /* Publications Data View: Mobile Cards (md:hidden) & Desktop Table (hidden md:block) */
                <div className="mb-8">
                  {/* Mobile Cards (Visible on Small Screens) */}
                  <div className="block md:hidden space-y-4">
                    {currentItems.length > 0 ? (
                      currentItems.map((pub, index) => (
                        <div
                          key={pub.id}
                          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-200">
                                #{indexOfFirstItem + index + 1}
                              </span>
                              <span className="bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full truncate max-w-[200px]">
                                {pub.school}
                              </span>
                            </div>

                            <h4 className="font-bold text-gray-900 text-base leading-snug mb-2 break-words">
                              {pub.title}
                            </h4>

                            {pub.doi && (
                              <div className="mb-3 text-xs text-blue-600 font-mono break-all bg-blue-50/60 p-2 rounded-lg border border-blue-100">
                                <span className="font-sans font-semibold text-slate-500 mr-1">DOI:</span>
                                {pub.doi}
                              </div>
                            )}

                            <div className="space-y-1.5 text-xs text-gray-700 mb-4">
                              <p>
                                <strong className="text-gray-900">Authors:</strong> {pub.authors}
                              </p>
                              <p>
                                <strong className="text-gray-900">Journal:</strong> {pub.journal || "GBU Research Publication"}
                              </p>
                              <p className="text-gray-500">
                                {pub.year && `Year: ${pub.year}`}
                                {pub.volume && ` • Vol: ${pub.volume}`}
                                {pub.issue && ` • Issue: ${pub.issue}`}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 border-t border-gray-100">
                            <a
                              href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <Download size={14} /> View Bulletin PDF
                            </a>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl p-8 text-center text-gray-500 border border-gray-200">
                        No publications found matching criteria
                      </div>
                    )}
                  </div>

                  {/* Desktop Table (Hidden on Mobile, Visible on md+) */}
                  <div className="hidden md:block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-50/90 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="py-4 px-6 text-center w-12">#</th>
                            <th className="py-4 px-6 min-w-[320px]">Publication Details</th>
                            <th className="py-4 px-6 min-w-[220px]">Authors & School</th>
                            <th className="py-4 px-6 min-w-[220px]">Journal & Details</th>
                            <th className="py-4 px-6 min-w-[200px]">Bulletin Batch</th>
                            <th className="py-4 px-6 text-center min-w-[130px]">Actions</th>
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
                                      <span className="font-mono text-blue-600 break-all max-w-[240px]">{pub.doi}</span>
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
                                  <div className="flex items-center justify-center">
                                    <a
                                      href={pub.pdfUrl || (pub.doi?.startsWith("http") ? pub.doi : `https://doi.org/${pub.doi}`)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm"
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
                </div>
              ) : (
                /* Publications Grid View */
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                  {currentItems.length > 0 ? (
                    currentItems.map((pub, index) => (
                      <div
                        key={pub.id}
                        className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 p-8 overflow-hidden"
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          {pub.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{pub.authors}</p>
                        <p className="text-gray-500 text-xs">{pub.journal} • {pub.year}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16 text-gray-500">
                      No publications found
                    </div>
                  )}
                </div>
              )}
            </div>
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
          {totalPages > 1 && (activeTab === "patents" || selectedBulletin) && (
            <div className="flex justify-center items-center space-x-2 mt-6 overflow-x-auto py-2">
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
