import React, { useState } from "react";
import StatsCard from "../../../components/StatsCard.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";

import { FolderOpen, DollarSign, Settings, Building2, Search, Filter, ChevronLeft, ChevronRight, Calendar, User, Building } from "lucide-react";
import { SCHOOL_BADGES } from "../../../Data/schools";

const FundedProjects = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const getStatusColor = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-100 text-green-800 border-green-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Final Phase":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusDot = (status) => {
    switch (status) {
      case "Ongoing":
        return "bg-green-500";
      case "Completed":
        return "bg-blue-500";
      case "Final Phase":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  const fundedProjects = [
    {
      id: 1,
      school: "Biotechnology",
      title: "Molecular Investigation of Multidrug-Resistant (MDR) Pathogenic Bacterial Isolates",
      pi: "School of Biotechnology Research Team",
      fundingAgency: "Indian Council of Medical Research (ICMR)",
      amount: "₹1.10 Crore",
      duration: "3 years (2023-2026)",
      status: "Ongoing",
      category: "Biotechnology",
      description: "Major grant dedicated to investigating antibiotic resistance mechanisms, genomic profiles, and novel therapeutic targets in clinical MDR pathogens.",
    },
    {
      id: 2,
      school: "Biotechnology",
      title: "Characterization and Virulence Profiling of Pseudomonas Aeruginosa Clinical Strains",
      pi: "Microbiology & Molecular Biology Lab",
      fundingAgency: "Indian Council of Medical Research (ICMR)",
      amount: "₹75.0 Lakhs",
      duration: "3 years (2022-2025)",
      status: "Ongoing",
      category: "Biotechnology",
      description: "Research focusing on quorum sensing inhibition and novel bio-actives against opportunistic Pseudomonas infections.",
    },
    {
      id: 3,
      school: "Biotechnology",
      title: "Genomic Approaches for Crop Protection Against Fusarium Wilt in Solanum Melongena",
      pi: "Plant Biotechnology Cell",
      fundingAgency: "DST - Science & Engineering Research Board (SERB)",
      amount: "₹61.5 Lakhs",
      duration: "3 years (2023-2026)",
      status: "Ongoing",
      category: "AgriBiotech",
      description: "Identification of resistant gene markers and epigenetic regulators to enhance fungal disease resilience in eggplants.",
    },
    {
      id: 4,
      school: "Information & Communication Technology",
      title: "AI & Satellite Image Processing for Land-Use and Environmental Monitoring",
      pi: "SOICT Data Sensing Lab",
      fundingAgency: "Indian Space Research Organisation (ISRO)",
      amount: "₹48.5 Lakhs",
      duration: "2 years (2023-2025)",
      status: "Ongoing",
      category: "Artificial Intelligence",
      description: "Automated land cover classification and urban growth modeling using high-resolution multispectral ISRO satellite imagery.",
    },
    {
      id: 5,
      title: "Design of Intelligent Microgrid Controls for Hybrid Solar-Wind Energy Systems",
      school: "Engineering",
      pi: "Department of Electrical Engineering",
      fundingAgency: "Ministry of New and Renewable Energy (MNRE)",
      amount: "₹52.1 Lakhs",
      duration: "3 years (2022-2025)",
      status: "Final Phase",
      category: "Energy Systems",
      description: "Development of intelligent grid controllers for optimal real-time integration of solar and wind energy into regional power distribution.",
    },
    {
      id: 6,
      school: "Vocational Studies & Applied Sciences",
      title: "Nano-structured Coating Materials for High-Temperature Thermal Protection",
      pi: "Applied Chemistry & Nanomaterials Group",
      fundingAgency: "Defense Research and Development Organisation (DRDO)",
      amount: "₹68.0 Lakhs",
      duration: "3 years (2021-2024)",
      status: "Completed",
      category: "Nanotechnology",
      description: "Synthesis and thermal evaluation of advanced refractory ceramic nanocomposites for defense applications.",
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(fundedProjects.length / itemsPerPage);

  const filteredProjects = fundedProjects.filter((project) => {
    return (
      (selectedSchool === "" || project.school === selectedSchool) &&
      (selectedCategory === "" || project.category === selectedCategory) &&
      (selectedStatus === "" || project.status === selectedStatus) &&
      (searchTerm === "" || project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const schools = Object.keys(SCHOOL_BADGES);

  const statsData = [
    {
      icon: FolderOpen,
      number: 75,
      numberText: "75+",
      title: "Total Research Projects",
      iconColor: "#2563eb", // blue-600
    },
    {
      icon: DollarSign,
      numberText: "₹12.5+ Cr",
      title: "Total Project Grants",
      iconColor: "#16a34a", // green-600
    },
    {
      icon: Settings,
      number: 32,
      title: "Active Funded Projects",
      iconColor: "#0891b2", // cyan-600
    },
    {
      icon: Building2,
      number: 14,
      title: "Premier Funding Bodies",
      iconColor: "#facc15", // yellow-500
    },
  ];



  return (
    <SearchableWrapper>
      <div>
        <div className="text-center mt-20">
          <h1 className="text-4xl pb-1 font-semibold text-black/70">Funded Projects</h1>
        </div>

        <StatsCard stats={statsData} />
        <div className="px-4 sm:px-8 lg:px-16 pb-10">
          {/* Filters Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <Filter size={20} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filter Projects</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                  <option value="Climate Research">Climate Research</option>
                  <option value="Biotechnology">Biotechnology</option>
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
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Final Phase">Final Phase</option>
                </select>
              </div>

              {/* Search Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Search</label>
                <div className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-300"
                  />
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{paginatedProjects.length}</span> of{" "}
                <span className="font-medium text-gray-900">{filteredProjects.length}</span> projects
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-blue-200 p-5 sm:p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: 'both'
                  }}
                >
                  {/* Gradient Background Effect */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-2xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* School Badge */}
                  <div className="inline-block sm:absolute sm:top-3 sm:right-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-md transform group-hover:scale-105 transition-transform duration-300 mb-3 sm:mb-0">
                    {project.school}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mt-5 lg:pr-20 leading-tight group-hover:text-blue-700 transition-colors duration-300">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Project Details */}
                    <div className="space-y-3 mb-6">
                      {/* Principal Investigator */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <User size={16} className="text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Principal Investigator</p>
                          <p className="text-sm text-gray-900 font-medium">{project.pi}</p>
                        </div>
                      </div>

                      {/* Funding Agency */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Building size={16} className="text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 font-medium">Funding Agency</p>
                          <p className="text-sm text-gray-900 font-medium">{project.fundingAgency}</p>
                        </div>
                      </div>

                      {/* Amount & Duration */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <DollarSign size={16} className="text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Amount</p>
                            <p className="text-sm text-gray-900 font-bold">{project.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Calendar size={16} className="text-orange-600" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Duration</p>
                            <p className="text-sm text-gray-900 font-medium">{project.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status & Category */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${getStatusDot(project.status)}`}></div>
                          {project.status}
                        </span>
                      </div>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-2 flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-xl transition-all duration-200 ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-xl font-medium text-sm transition-all duration-200 ${currentPage === index + 1
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-xl transition-all duration-200 ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default FundedProjects;
