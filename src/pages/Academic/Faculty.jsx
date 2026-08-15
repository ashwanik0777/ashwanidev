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

const VITE_HOST = import.meta.env.VITE_HOST;
import { fetchFacultyPublicList } from '../../services/facultyDashboardService';

const getInitials = (name) => {
  if (!name) return 'F';
  const skip = ['dr.', 'dr', 'prof.', 'prof', 'mr.', 'mr', 'ms.', 'ms', 'mrs.', 'mrs', 'shri', 'smt.', 'smt'];
  const parts = name.split(/\s+/).filter(w => !skip.includes(w.toLowerCase()));
  if (parts.length === 0) return 'F';
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getImageUrl = (url, image, name) => {
  if (!url) {
    if (image) return `${VITE_HOST}/media/${image}`;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(getInitials(name || 'Faculty'))}&background=0D8ABC&color=fff&size=150`;
  }

  // Resolve Google Drive URLs
  let resolvedUrl = url;
  if (typeof url === 'string') {
    const matchFile = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (matchFile && matchFile[1]) {
      resolvedUrl = `https://lh3.googleusercontent.com/d/${matchFile[1]}`;
    } else {
      const matchOpen = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (matchOpen && matchOpen[1] && url.includes('drive.google.com')) {
        resolvedUrl = `https://lh3.googleusercontent.com/d/${matchOpen[1]}`;
      }
    }
  }

  if (resolvedUrl.startsWith('http') || resolvedUrl.startsWith('data:')) return resolvedUrl;
  return `${VITE_HOST}${resolvedUrl.startsWith('/') ? '' : '/'}${resolvedUrl}`;
};

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
  const [selectedQualification, setSelectedQualification] = useState('All');
  const [selectedSchool, setSelectedSchool] = useState('All Schools');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedDepartment, selectedExperience, selectedQualification, selectedSchool]);

  const { id } = useParams();

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

        setJoinData({
          title: 'Join Our Faculty',
          description: 'We are always looking for passionate educators and researchers to join our academic community. Explore career opportunities and become part of an institution dedicated to excellence.',
          button1_text: 'View Open Positions',
          url1: '#',
          button2_text: 'Learn About Benefits',
          url2: '#'
        });

        console.log('✅ Fetched all faculty data.');
      } catch (err) {
        console.error('❌ Failed to fetch:', err);
        setFacultyMembers([]);
      }
    };
    fetchAllData();
  }, []);

  const schools = SCHOOL_FILTERS;

  const departments = [
    "All Departments",
    ...Array.from(
      new Set(SCHOOL_DEPARTMENTS.map((dept) => dept.name).filter(Boolean))
    ),
  ];

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

  const experienceRanges = [
    'All',
    '0-5 years',
    '6-10 years',
    '11-15 years',
    '16+ years'
  ];

  const qualifications = [
    'All',
    'PhD',
    'M.Tech',
    'M.Sc',
    'MBA',
    'B.Tech'
  ];

  const getDesignationPriority = (designation) => {
    const desc = (designation || "").toLowerCase();
    if (desc.includes("assistant professor")) return 3;
    if (desc.includes("associate professor")) return 2;
    if (desc.includes("professor")) return 1;
    if (desc.includes("faculty")) return 4;
    return 5;
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

    const matchesQualification = selectedQualification === 'All' || faculty.qualification === selectedQualification;

    return matchesSearch && matchesDepartment && matchesSchool && matchesExperience && matchesQualification;
  }).sort(sortFaculty);

  const clearFilters = () => {
    setSelectedDepartment('All Departments');
    setSelectedExperience('All');
    setSelectedQualification('All');
    setSelectedSchool('All Schools');
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
              title={directoryStats?.title || 'Faculty Directory'}
              subtitle={directoryStats?.description || 'Meet our faculty who are leaders in their fields.'}
              bgTheme={3} // Pick your theme number (1–10)
            />

            {/* Statistics */}
           {/* <StatsCard stats={stats} /> */}

            {/* Search + Filters */}
            <section className="py-3 w-full bg-gray-50">
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-15 space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search faculty by name, department, specialization, or research area..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 border-solid rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {(selectedDepartment !== 'All Departments' || selectedExperience !== 'All' || selectedQualification !== 'All' || selectedSchool !== 'All Schools' || searchTerm) && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Clear All</span>
                    </button>
                  )}

                  <div className="bg-white p-6 rounded-lg border border-gray-200 border-solid space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">School</label>
                        <select
                          value={selectedSchool}
                          onChange={(e) => setSelectedSchool(e.target.value)}
                          className="w-full border border-gray-300 border-solid rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                          {schools.map(school => (
                            <option key={school} value={school}>{school}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <select
                          value={selectedDepartment}
                          onChange={(e) => setSelectedDepartment(e.target.value)}
                          className="w-full border border-gray-300 border-solid rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                          {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <select
                          value={selectedExperience}
                          onChange={(e) => setSelectedExperience(e.target.value)}
                          className="w-full border border-gray-300 border-solid rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                          {experienceRanges.map(range => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Qualification</label>
                        <select
                          value={selectedQualification}
                          onChange={(e) => setSelectedQualification(e.target.value)}
                          className="w-full border border-gray-300 border-solid rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                        >
                          {qualifications.map(qual => (
                            <option key={qual} value={qual}>{qual}</option>
                          ))}
                        </select>
                      </div>

                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    Showing {filteredFaculty.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredFaculty.length)} of {filteredFaculty.length} matched (out of {facultyMembers.length} total)
                  </div>
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
                              src={getImageUrl(faculty.image_url, faculty.image, faculty.name)}
                              alt={faculty.name}
                              className="w-20 h-20 rounded-full object-cover border-3 border-blue-100 group-hover:border-blue-400 transition-colors shadow-sm flex-shrink-0"
                              onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(getInitials(faculty.name))}&background=0D8ABC&color=fff&size=150`; }}
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

            {/* Call to Action */}
            {joinData && (
              <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                  <h2 className="text-4xl font-bold text-gray-800 mb-6">{joinData.title}</h2>
                  <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">{joinData.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={joinData.url1}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
                    >
                      {joinData.button1_text}
                    </a>
                    <a
                      href={joinData.url2}
                      target="_blank"
                      rel="noreferrer"
                      className="border border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      {joinData.button2_text}
                    </a>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </SimpleLayout>
    </SearchableWrapper>
  );
};

export default Faculty;
