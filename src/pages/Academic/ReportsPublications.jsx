import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  Calendar,
  Eye,
  BookOpen,
  TrendingUp,
  Users
} from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from "../../components/TabsData.jsx"; 

// Static high-fidelity data representing GBU's actual Reports & Publications
const GBU_REPORTS_HERO = {
  title: "Reports & Publications",
  description: "Explore Gautam Buddha University's official publications, institutional quality audits, national rankings, and financial transparency statements.",
  sub_title: "Institutional Quality & Academic Excellence",
  sub_description: "We maintain the highest standards of transparency, academic rigor, and quality assurance in all our operations.",
  reprts_count: 25,
  accreditation_count: 5,
  acheivements_counts: 12
};

const GBU_REPORTS_LIST = [
  {
    id: "1",
    card_title: "NIRF 2026 Overall Category Submission",
    category: "Accreditation",
    card_desc: "Official institutional data submitted to the National Institutional Ranking Framework (NIRF) under the Ministry of Education for the year 2026, covering teaching, research, graduation outcomes, and outreach.",
    date: "2026-02-15",
    downloads: 1420,
    pages: 52,
    file_size_mb: "2.4",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "2",
    card_title: "Annual Quality Assurance Report (AQAR) 2023-24",
    category: "Accreditation",
    card_desc: "Comprehensive quality audit report compiled by the Internal Quality Assurance Cell (IQAC) and submitted to the National Assessment and Accreditation Council (NAAC), outlining institutional progress and benchmark compliance.",
    date: "2024-12-20",
    downloads: 950,
    pages: 124,
    file_size_mb: "5.8",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "3",
    card_title: "GBU Annual Academic & Administrative Report 2024-25",
    category: "Institutional",
    card_desc: "The official university-wide yearly report highlighting key academic breakthroughs, research publications, international conferences, infrastructure expansions, and school-wise progress reports.",
    date: "2025-06-30",
    downloads: 2100,
    pages: 180,
    file_size_mb: "8.2",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "4",
    card_title: "Audited Balance Sheet & Financial Statements 2024-25",
    category: "Finance",
    card_desc: "The independent auditor's report, balance sheets, income and expenditure ledger statements, and source-of-funds disclosures, demonstrating financial transparency and fiduciary responsibility.",
    date: "2025-09-10",
    downloads: 410,
    pages: 38,
    file_size_mb: "1.9",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "5",
    card_title: "GBU Campus Newsletter 'Bodhivaani' - Summer 2025",
    category: "Student",
    card_desc: "A quarterly student-run newsletter capturing campus life highlights, cultural fest successes, student club events, poetry, and creative writing contributions from across the university.",
    date: "2025-07-15",
    downloads: 1850,
    pages: 24,
    file_size_mb: "3.5",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "6",
    card_title: "NIRF 2026 Management Category Submission",
    category: "Accreditation",
    card_desc: "Official data submitted to NIRF for the School of Management (SOM) for the 2026 ranking cycle, highlighting corporate placements, management research papers, and executive training records.",
    date: "2026-02-15",
    downloads: 680,
    pages: 28,
    file_size_mb: "1.6",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "7",
    card_title: "Annual Sports Festival 'Shaurya' Compilation 2025",
    category: "Student",
    card_desc: "The official review and athletic digest of the national-level inter-university sports festival, highlighting team records, individual athletic honors, and participating institutions.",
    date: "2025-03-25",
    downloads: 1250,
    pages: 42,
    file_size_mb: "4.1",
    file: "https://www.gbu.ac.in/"
  },
  {
    id: "8",
    card_title: "Academic Ordinances & General Regulations Handbook",
    category: "Institutional",
    card_desc: "The primary regulatory handbook containing all GBU ordinances governing credit-accumulation structures, examination policies, attendance criteria, disciplinary rules, and hostel management guides.",
    date: "2025-05-10",
    downloads: 3200,
    pages: 160,
    file_size_mb: "6.4",
    file: "https://www.gbu.ac.in/"
  }
];

const ReportsPublications = () => {
  const [hero, setHero] = useState(GBU_REPORTS_HERO);
  const [reports, setReports] = useState(GBU_REPORTS_LIST);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const BASE = import.meta.env.VITE_HOST?.replace(/\/$/, '') || '';

  const categories = ['All', 'Institutional', 'Accreditation', 'Finance', 'Student'];

  const getCategoryColor = (category) => {
    switch (category.toLowerCase()) {
      case 'institutional':
        return 'bg-blue-100 text-blue-800';
      case 'accreditation':
        return 'bg-green-100 text-green-800';
      case 'finance':
        return 'bg-purple-100 text-purple-800';
      case 'student':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesCategory =
      selectedCategory === 'All' ||
      report.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      report.card_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.card_desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // ✅ Convert categories to ButtonGroup buttons
  const categoryButtons = categories.map(category => ({
    id: category,
    label: category
  }));

  return (
    <SearchableWrapper>
      <>
        {/* Hero Section */}
        <BannerSection
          title={hero.title}
          subtitle={hero.description}
          bgTheme={6} 
        />

        {/* Stats */}
        <StatsCard
          stats={[
            {
              number: hero.reprts_count,
              numberText: `${hero.reprts_count}+`,
              title: "Institutional Reports",
              subtitle: "Published annually for transparency and progress",
              icon: TrendingUp,
              iconColor: "#2563eb", 
            },
            {
              number: hero.accreditation_count,
              numberText: `${hero.accreditation_count}`,
              title: "National Accreditations",
              subtitle: "Recognized by top accreditation bodies",
              icon: FileText,
              iconColor: "#16a34a", 
            },
            {
              number: hero.acheivements_counts,
              numberText: `${hero.acheivements_counts}+`,
              title: "Student Achievements",
              subtitle: "Awards and recognitions in various fields",
              icon: Users,
              iconColor: "#7e22ce", 
            },
          ]}
        />

        {/* Report List */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{hero.title}</h2>
              <p className="text-xl text-gray-600">{hero.description}</p>
            </div>

            {/* ✅ Updated Category Filters with ButtonGroup */}
            <div className="flex flex-col justify-center text-center items-center gap-3 mb-8">
              <ButtonGroup
                buttons={categoryButtons}
                onClick={setSelectedCategory}
                activeButton={selectedCategory}
                size="md"
                theme="primary"
                rounded="full"
                animated={true}
                gap={true}
              />

              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mx-20 px-4 py-2 w-3/5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm"
                style={{ minWidth: 200 }}
              />
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-10 gap-8">
              {filteredReports.map((report, index) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{report.card_title}</h3>
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                              report.category
                            )}`}
                          >
                            {report.category}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{report.card_desc}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {new Date(report.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{report.downloads.toLocaleString()} downloads</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{report.pages} pages</span>
                      </div>
                      <div className="text-gray-500 font-medium">
                        PDF • {report.file_size_mb} MB
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                    <Link
                      to={`/reports/${report.id}`}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                    >
                      View Details
                    </Link>
                    <a
                      href={report.file.startsWith('http') ? report.file : `${BASE}/${report.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    </SearchableWrapper>
  );
};

export default ReportsPublications;
