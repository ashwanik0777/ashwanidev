import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SimpleLayout from '../../components/faculty/SimpleLayout';
import { Link, useParams } from 'react-router-dom';
import TabContent from '../../components/faculty/TabContent';
import { Mail, Phone, Globe, Award, BookOpen, Users, Search, X } from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import { SCHOOL_FILTERS, SCHOOL_DEPARTMENTS, SCHOOL_DIRECTORY } from "../../Data/schools";

import { resolveFacultyImage, getFacultyInitials } from '../../utils/imageUtils';
import { fetchFacultyPublicList } from '../../services/facultyDashboardService';


const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [directoryStats, setDirectoryStats] = useState({
    faculty_members: 0,
    phd_qualified: 0,
    Research_publications: 0,
    collaborations_count: 0
  });
  const [joinData, setJoinData] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState('All Schools');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedExperience, selectedSchool]);

  const { id, shortCode } = useParams();

  // When accessed via /schools/:shortCode/faculty, auto-lock the school filter
  const isSchoolScoped = Boolean(shortCode);
  const schoolScopedName = isSchoolScoped
    ? SCHOOL_DIRECTORY.find(
        (s) => s.code.toLowerCase() === shortCode.toLowerCase() ||
               s.short?.toLowerCase() === shortCode.toLowerCase()
      )?.name || shortCode.toUpperCase()
    : null;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const data = await fetchFacultyPublicList({ limit: 1000 });
        const allMembers = data?.items || [];
        
        setFacultyMembers(allMembers);

        // Derive stats from members
        const phdCount = allMembers.filter(m => String(m.education || '').toLowerCase().includes('phd')).length;
        const totalPubs = allMembers.reduce((sum, m) => sum + (Number(m.publications) || 0), 0);
        
        setDirectoryStats({
          title: 'Faculty Directory',
          description: 'Meet our faculty who are leaders in their fields.',
          faculty_members: allMembers.length,
          phd_qualified: allMembers.length > 0 ? Math.round((phdCount / allMembers.length) * 100) : 0,
          Research_publications: totalPubs,
          collaborations_count: 15 // Mock default
        });


        console.log('✅ Fetched all faculty data.');
      } catch (err) {
        console.error('❌ Failed to fetch:', err);
        setFacultyMembers([]);
      }
    };
    fetchAllData();
  }, []);

  const schools = isSchoolScoped ? [schoolScopedName] : SCHOOL_FILTERS;

  // When school-scoped, lock the school filter
  useEffect(() => {
    if (isSchoolScoped && schoolScopedName) {
      setSelectedSchool(schoolScopedName);
    }
  }, [isSchoolScoped, schoolScopedName]);

  const normalizeSchoolName = (value) => {
    if (!value) return "";
    const normalized = String(value).trim().toLowerCase();
    const match = SCHOOL_DIRECTORY.find(
      (school) =>
        school.code.toLowerCase() === normalized ||
        school.name.toLowerCase() === normalized ||
        school.short.toLowerCase() === normalized
    );
    return match ? match.name : String(value).trim();
  };

  // Determine the active school name for department filtering
  const activeSchoolName = isSchoolScoped ? schoolScopedName : selectedSchool;

  // Filter departments by the selected/scoped school
  const departments = (() => {
    if (activeSchoolName && activeSchoolName !== 'All Schools') {
      const schoolDepts = SCHOOL_DEPARTMENTS
        .filter((dept) => dept.schoolName === activeSchoolName)
        .map((dept) => dept.name)
        .filter(Boolean);
      return ["All Departments", ...Array.from(new Set(schoolDepts))];
    }
    // Show all departments when no school is selected
    return [
      "All Departments",
      ...Array.from(new Set(SCHOOL_DEPARTMENTS.map((dept) => dept.name).filter(Boolean))),
    ];
  })();

  // Reset department when school changes and selected department is not in the new list
  useEffect(() => {
    if (selectedDepartment !== 'All Departments' && !departments.includes(selectedDepartment)) {
      setSelectedDepartment('All Departments');
    }
  }, [activeSchoolName]);

  const experienceRanges = [
    'All',
    '0-5 years',
    '6-10 years',
    '11-15 years',
    '16+ years'
  ];

  const getDesignationPriority = (designation) => {
    const desc = (designation || "").toLowerCase();
    
    // 1. Dean / Professor and Dean
    if (desc.includes("dean")) return 1;
    
    // 3. Recognizing / Visiting Professor
    if (desc.includes("visiting") || desc.includes("recognising") || desc.includes("recognizing") || desc.includes("recognised")) return 3;
    
    // 4. Adjunct Professor
    if (desc.includes("adjunct")) return 4;
    
    // 5. Associate Professor
    if (desc.includes("associate") && desc.includes("prof")) return 5;
    
    // 6. Assistant Professor
    if (desc.includes("assistant") && desc.includes("prof")) return 6;
    
    // 2. Plain Professor (Catch-all for 'professor' after other modifiers are checked)
    if (desc.includes("prof")) return 2;
    
    // 7. OCFD
    if (desc.includes("ocfd")) return 7;
    
    // 8. Other Faculty
    if (desc.includes("faculty")) return 8;
    
    return 9;
  };

  const sortFaculty = (a, b) => {
    const pA = getDesignationPriority(a.designation || a.title);
    const pB = getDesignationPriority(b.designation || b.title);
    if (pA !== pB) return pA - pB;
    const expA = parseInt(a.experience_years || a.experience) || 0;
    const expB = parseInt(b.experience_years || b.experience) || 0;
    return expB - expA;
  };

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch =
      (faculty.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.designation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.specialization || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.department || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faculty.researchAreas?.some?.(area =>
        area.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? false);

    const matchesDepartment = selectedDepartment === 'All Departments' || faculty.department === selectedDepartment;
    const matchesSchool =
      selectedSchool === "All Schools" ||
      normalizeSchoolName(faculty.school) === selectedSchool;

    const matchesExperience = selectedExperience === 'All' ||
      (selectedExperience === '0-5 years' && faculty.experience_years <= 5) ||
      (selectedExperience === '6-10 years' && faculty.experience_years >= 6 && faculty.experience_years <= 10) ||
      (selectedExperience === '11-15 years' && faculty.experience_years >= 11 && faculty.experience_years <= 15) ||
      (selectedExperience === '16+ years' && faculty.experience_years >= 16);

    return matchesSearch && matchesDepartment && matchesSchool && matchesExperience;
  }).sort(sortFaculty);

  const clearFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedExperience('All');
    if (!isSchoolScoped) {
      setSelectedSchool('All Schools');
    }
    setSearchTerm('');
  };

  const selectedFaculty = facultyMembers.find(faculty => faculty.id == id);

  const stats = [
    {
      icon: Users,
      number: directoryStats?.faculty_members || 0,
      numberText: `${directoryStats?.faculty_members || 0}+`,
      title: "Faculty Members",
      iconColor: "#2563eb", // blue-600
    },
    {
      icon: Award,
      number: directoryStats?.phd_qualified || 0,
      numberText: `${directoryStats?.phd_qualified || 0}%`,
      title: "PhD Qualified",
      iconColor: "#16a34a", // green-600
    },
    {
      icon: BookOpen,
      number: directoryStats?.Research_publications || 0,
      title: "Research Publications",
      numberText: `${directoryStats?.Research_publications || 0}+`,
      iconColor: "#7e22ce", // purple-600
    },
    {
      icon: Globe,
      number: directoryStats?.collaborations_count || 0,
      numberText: `${directoryStats?.collaborations_count || 0}+`,
      title: "International Collaborations",
      iconColor: "#ea580c", // orange-600
    },
  ];


  return (
    <SearchableWrapper>
      <SimpleLayout>
        {id ? (
          selectedFaculty ? (
            <section className="py-12">
              <TabContent activeTab="overview" profile={selectedFaculty} />
            </section>
          ) : (
            <section className="py-12 text-center">
              <p className="text-gray-600">Loading faculty profile...</p>
            </section>
          )
        ) : (
          <>
            {/* Hero Section */}
            <BannerSection
              title={isSchoolScoped ? `${(shortCode || '').toUpperCase()} — Faculty` : (directoryStats?.title || 'Faculty Directory')}
              bgTheme={3}
            />

            {/* Statistics */}
           {/* <StatsCard stats={stats} /> */}

            {/* Search + Filters — Single Row */}
            <section className="py-4 w-full bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm px-4 py-3">
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                    {/* Search */}
                    <div className="relative flex-grow min-w-0">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search by name, specialization..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    {/* Divider (desktop) */}
                    <div className="hidden lg:block w-px h-8 bg-gray-200 flex-shrink-0" />

                    {/* Filters — inline */}
                    <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                      {!isSchoolScoped && (
                        <select
                          value={selectedSchool}
                          onChange={(e) => setSelectedSchool(e.target.value)}
                          className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                        >
                          {schools.map(school => (
                            <option key={school} value={school}>{school}</option>
                          ))}
                        </select>
                      )}
                      <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                      >
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                      <select
                        value={selectedExperience}
                        onChange={(e) => setSelectedExperience(e.target.value)}
                        className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors cursor-pointer"
                      >
                        <option value="All">Experience</option>
                        {experienceRanges.filter(r => r !== 'All').map(range => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      {/* Clear Filters */}
                      {(selectedDepartment !== 'All Departments' || selectedExperience !== 'All' || (!isSchoolScoped && selectedSchool !== 'All Schools') || searchTerm) && (
                        <button
                          onClick={clearFilters}
                          className="flex items-center gap-1.5 text-red-600 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span className="font-medium text-sm">Clear</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results Count */}
                <div className="px-1 flex justify-between items-center text-sm text-gray-500">
                  <span>
                    Showing <strong className="text-gray-700">{filteredFaculty.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredFaculty.length)}</strong> of <strong className="text-gray-700">{filteredFaculty.length}</strong> results
                  </span>
                </div>
              </div>
            </section>

            {/* Faculty Grid */}
            <section className="pt-4 pb-16 bg-gray-50">
              <div className="container mx-auto px-4">
                {filteredFaculty.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No faculty members found matching your criteria.</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {(() => {
                      const totalPages = Math.max(1, Math.ceil(filteredFaculty.length / itemsPerPage));
                      const paginatedFaculty = filteredFaculty.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
                      
                      return (
                        <>
                          {paginatedFaculty.map((faculty, index) => (
                            <Link
                              to={`/academics/faculty/${faculty.id}`}
                              key={faculty.id}
                        className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer flex flex-col h-full border border-gray-100"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        {/* Top accent bar */}
                        <div className="h-1.5 bg-blue-600 w-full" />
                        <div className="p-6 flex flex-col flex-grow">
                          {/* Photo + Name row */}
                          <div className="flex items-start gap-4 mb-4">
                            <img
                              src={resolveFacultyImage(faculty.image_url, faculty.image, faculty.name, faculty.email)}
                              alt={faculty.name}
                              className="w-20 h-20 rounded-full object-cover border-3 border-blue-100 group-hover:border-blue-400 transition-colors shadow-sm flex-shrink-0"
                              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getFacultyInitials(faculty.name))}&background=0D8ABC&color=fff&size=150`; }}
                            />
                            <div className="min-w-0">
                              <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">{faculty.name}</h3>
                              <p className="text-blue-600 font-semibold text-sm mt-1">{faculty.designation}</p>
                            </div>
                          </div>

                          {/* Department & School */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-start gap-2">
                              <Award className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-gray-600 leading-snug line-clamp-2">{normalizeSchoolName(faculty.school)}</p>
                            </div>
                          </div>

                          {/* Specialization */}
                          {faculty.specialization && (
                            <div className="bg-gray-50 rounded-lg px-3 py-2.5 mb-4">
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Specialization</p>
                              <p className="text-sm text-gray-800 line-clamp-2">{faculty.specialization}</p>
                            </div>
                          )}

                          {/* Spacer */}
                          <div className="flex-grow" />

                          {/* View Profile link */}
                          <div className="pt-3 border-t border-gray-100">
                            <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
                              View Profile →
                            </span>
                          </div>
                        </div>
                            </Link>
                          ))}
                        </>
                      );
                    })()}
                  </div>
                )}

                {/* Pagination */}
                {Math.ceil(filteredFaculty.length / itemsPerPage) > 1 && (
                  <div className="mt-12 flex justify-center items-center space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center space-x-1 hidden sm:flex">
                      {[...Array(Math.ceil(filteredFaculty.length / itemsPerPage))].map((_, i) => {
                        const pageNum = i + 1;
                        const totalPages = Math.ceil(filteredFaculty.length / itemsPerPage);
                        const isClose = Math.abs(pageNum - currentPage) <= 2;
                        const isEnd = pageNum === 1 || pageNum === totalPages;
                        
                        if (!isClose && !isEnd) {
                          if (pageNum === 2 || pageNum === totalPages - 1) return <span key={i} className="px-2 text-gray-400">...</span>;
                          return null;
                        }
                        
                        return (
                          <button
                            key={i}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                              currentPage === pageNum 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredFaculty.length / itemsPerPage)))}
                      disabled={currentPage === Math.ceil(filteredFaculty.length / itemsPerPage)}
                      className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </section>
          </>
        )}
      </SimpleLayout>
    </SearchableWrapper>
  );
};

export default Faculty;
