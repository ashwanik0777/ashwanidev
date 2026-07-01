import React, { useState } from 'react';
import { Calendar, Clock, BookOpen, FileText, Download, Bell, Search, ArrowRight } from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from '../../components/TabsData.jsx';

// Static high-fidelity data representing GBU's actual Academic Calendar and Regulations
const GBU_STATS = [
  {
    icon_class: "calendar",
    ssemester_count: 2,
    icon_text: "Semesters (Odd & Even)",
    icon_color: "#2563eb"
  },
  {
    icon_class: "clock",
    teaching_days: 180,
    icon_text: "Minimum Teaching Days",
    icon_color: "#16a34a"
  },
  {
    icon_class: "book",
    examination_periods: 4,
    icon_text: "Exam Cycles (Mid & End Sem)",
    icon_color: "#7c3aed"
  },
  {
    icon_class: "file",
    academic_regulations: 6,
    icon_text: "Academic Ordinances",
    icon_color: "#f97316"
  }
];

const GBU_EVENTS = [
  // ODD SEMESTER 2025-2026
  {
    id: "odd-reg-senior",
    title: "Registration & Fee Submission (2nd Year & Onwards)",
    description: "Fee deposition and course registration for senior batches of all schools (SOICT, SOBT, SOM, etc.).",
    date: "2025-07-28",
    category: "admission",
    status: "completed"
  },
  {
    id: "odd-class-senior",
    title: "Commencement of Classes (2nd Year & Onwards)",
    description: "Start of regular classroom teaching, laboratory work, and seminar schedules for senior students.",
    date: "2025-07-30",
    category: "academic",
    status: "completed"
  },
  {
    id: "odd-reg-freshers",
    title: "Registration & Fee Deposition (1st Year/Freshers)",
    description: "On-campus document verification, hostel allocation, and registration for newly admitted students.",
    date: "2025-08-04",
    category: "admission",
    status: "completed"
  },
  {
    id: "odd-class-freshers",
    title: "Commencement of Classes & Induction (1st Year)",
    description: "Orientation program and commencement of classes for first-year undergraduate and postgraduate programs.",
    date: "2025-08-08",
    category: "academic",
    status: "completed"
  },
  {
    id: "odd-mid-sem",
    title: "Mid-Semester Examinations (Odd Semester)",
    description: "Continuous internal assessment examinations for all years and programs of studies.",
    date: "2025-10-06",
    category: "exam",
    status: "completed"
  },
  {
    id: "odd-end-sem-theory",
    title: "End-Semester Theory Examinations (Odd Semester)",
    description: "Final semester-end theory examinations for all odd semester courses.",
    date: "2025-12-08",
    category: "exam",
    status: "completed"
  },
  {
    id: "odd-winter-vacation",
    title: "Winter Vacation for Students & Faculty",
    description: "Academic recess after the completion of odd semester examinations and evaluation.",
    date: "2025-12-22",
    category: "holiday",
    status: "completed"
  },
  // EVEN SEMESTER 2025-2026
  {
    id: "even-reg",
    title: "Even Semester Registration & Fee Submission",
    description: "Course registration and academic fees deposition for the Even Semester (all batches).",
    date: "2026-01-05",
    category: "admission",
    status: "completed"
  },
  {
    id: "even-classes",
    title: "Commencement of Classes (Even Semester)",
    description: "Start of regular classroom lectures and laboratory schedules for the Even Semester.",
    date: "2026-01-07",
    category: "academic",
    status: "completed"
  },
  {
    id: "even-mid-sem",
    title: "Mid-Semester Examinations (Even Semester)",
    description: "Mid-term examination cycle to evaluate student progress in the Even Semester.",
    date: "2026-03-14",
    category: "exam",
    status: "completed"
  },
  {
    id: "even-end-sem",
    title: "End-Semester Examinations (Even Semester)",
    description: "Final end-semester theory and practical examinations for the Even Semester courses.",
    date: "2026-05-13",
    category: "exam",
    status: "completed"
  },
  {
    id: "even-summer-recess",
    title: "Commencement of Summer Vacation",
    description: "Summer vacation recess for students and faculty following the Even Semester exams.",
    date: "2026-06-01",
    category: "holiday",
    status: "completed"
  },
  // ADMISSION CYCLE 2026-2027
  {
    id: "adm-last-date",
    title: "Last Date for Online Admission Form Submission",
    description: "Final deadline for online applications for various UG, PG, and Doctoral programs at GBU.",
    date: "2026-06-30",
    category: "admission",
    status: "upcoming"
  },
  {
    id: "adm-admit-card",
    title: "Issue of Admit Cards for GBU-ET 2026",
    description: "Online release of hall tickets and admit cards for the entrance exam on the GBU portal.",
    date: "2026-07-07",
    category: "admission",
    status: "upcoming"
  },
  {
    id: "adm-entrance-exam",
    title: "GBU Entrance Test (GBU-ET 2026)",
    description: "Conduct of the national-level entrance test for admissions into engineering, biotechnology, law, and other courses.",
    date: "2026-07-12",
    category: "exam",
    status: "upcoming"
  },
  {
    id: "adm-result",
    title: "GBU-ET 2026 Result Declaration",
    description: "Announcement of entrance exam results, merit lists, and rank cards on the official website.",
    date: "2026-07-18",
    category: "admission",
    status: "upcoming"
  },
  {
    id: "adm-counseling",
    title: "Commencement of Counseling & Admissions",
    description: "Offline counseling sessions, document verification, and seat allocation at GBU campus.",
    date: "2026-07-28",
    category: "admission",
    status: "upcoming"
  }
];

const GBU_REGULATIONS = [
  {
    title: "Mandatory Attendance Policy",
    description: "Under GBU academic ordinances, a minimum of 75% attendance in both lectures and practicals is strictly mandatory in each course to be eligible to appear for the end-semester examinations. Deficiencies can lead to registration cancellation or summer semester repetition.",
    last_updated: "2026-05-15",
    document: "https://www.gbu.ac.in/admissions"
  },
  {
    title: "Choice Based Credit System (CBCS)",
    description: "Defines the academic framework for credit distribution across core subjects, departmental electives, open electives, and humanities. Enables student mobility and flexibility in selecting interdisciplinary courses aligned with modern professional needs.",
    last_updated: "2026-04-10",
    document: "https://www.gbu.ac.in/"
  },
  {
    title: "Examination & Evaluation Ordinance",
    description: "Governs the 10-point letter grading system (O, E, A, B, C, P, F). Outlines SGPA and CGPA calculation methodologies, rules for supplementary examinations, carry-over course registrations, and criteria for promotion to subsequent academic years.",
    last_updated: "2026-05-20",
    document: "https://www.gbu.ac.in/Examination"
  },
  {
    title: "Admission Brochure 2026-27",
    description: "The comprehensive official guide containing the complete listing of courses, eligibility criteria, GBU-ET exam patterns, fee structures (domestic/international), hostel norms, and academic policies for the 2026-27 session.",
    last_updated: "2026-05-22",
    document: "https://www.gbu.ac.in/admissions"
  },
  {
    title: "Strict Anti-Ragging Regulations",
    description: "In compliance with UGC and Supreme Court regulations, GBU maintains a zero-tolerance policy towards ragging. Contains guidelines, anti-ragging affidavit formats, campus discipline guidelines, and contact numbers for the anti-ragging squad.",
    last_updated: "2026-01-15",
    document: "https://www.gbu.ac.in/"
  },
  {
    title: "Doctoral (PhD) Ordinance",
    description: "Comprehensive regulatory policy governing Ph.D. admissions, mandatory course work duration, Research Advisory Committee (RAC) monitoring, supervisor allocation, progress report submissions, thesis evaluation, and viva-voce procedures.",
    last_updated: "2026-03-05",
    document: "https://www.gbu.ac.in/"
  }
];

const GBU_CTA = {
  title: "Academic Notifications",
  description: "To receive automatic real-time alerts on your calendar and immediate notification of critical notices issued by the Dean Academics Office, download the official GBU companion app or subscribe to the circular feed.",
  button_text: "Stay Updated",
  link: "https://www.gbu.ac.in/"
};

const AcademicCalendar = () => {
  const [events, setEvents] = useState(GBU_EVENTS);
  const [regulations, setRegulations] = useState(GBU_REGULATIONS);
  const [stats, setStats] = useState(GBU_STATS);
  const [cta, setCta] = useState(GBU_CTA);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getEventTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    switch (type) {
      case 'admission': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'break': return 'bg-green-100 text-green-800';
      case 'academic': return 'bg-purple-100 text-purple-800';
      case 'holiday': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEvents = events.filter(event =>
    (filterType === 'all' || event.category === filterType) &&
    (event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     event.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const monthYear = new Date(event.date).toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });
    acc[monthYear] = acc[monthYear] || [];
    acc[monthYear].push(event);
    return acc;
  }, {});

  const handleDownload = () => {
    window.print();
  };

  const preparedStats = stats.map((stat) => {
    let icon;
    let number = 0;
    let subtitle = "";

    switch (stat.icon_class) {
      case "calendar":
        icon = Calendar;
        number = stat.ssemester_count || 0;
        subtitle = stat.icon_text || "Semesters";
        break;
      case "clock":
        icon = Clock;
        number = stat.teaching_days || 0;
        subtitle = stat.icon_text || "Teaching Days";
        break;
      case "book":
        icon = BookOpen;
        number = stat.examination_periods || 0;
        subtitle = stat.icon_text || "Examination Periods";
        break;
      case "file":
        icon = FileText;
        number = stat.academic_regulations || 0;
        subtitle = stat.icon_text || "Academic Regulations";
        break;
      default:
        icon = null;
        number = 0;
        subtitle = "--";
    }

    return {
      icon,
      number,
      subtitle,
      iconColor: stat.icon_color || "#2563eb", 
    };
  });

  const filterButtons = [
    { id: 'all', label: 'All Events' },
    { id: 'admission', label: 'Admissions' },
    { id: 'academic', label: 'Academic Classes' },
    { id: 'exam', label: 'Examinations' },
    { id: 'holiday', label: 'Holidays & Recess' },
  ];

  return (
    <SearchableWrapper>
      <>
        <BannerSection
          title="Academic Calendar & Regulations"
          subtitle="Stay informed with important academic timelines, examination schedules, and institutional regulations governing academic life at Gautam Buddha University."
          bgTheme={5}
        />

        <StatsCard stats={preparedStats} />

        {/* Calendar Section */}
        <section className="py-14 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Academic Calendar
                </h2>
                <p className="text-lg text-gray-600 pt-2">
                  Timeline of academic milestones and events for the 2025-26 and 2026-27 sessions
                </p>
              </div>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download / Print Calendar</span>
              </button>
            </div>

            <div className='max-w-7xl mx-auto'>
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <ButtonGroup
                  buttons={filterButtons}
                  onClick={setFilterType}
                  activeButton={filterType}
                  size="md"
                  theme="primary"
                  rounded="full"
                  animated={true}
                  gap={true}
                  className="w-full overflow-x-auto py-2"
                />

                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="relative border-l-4 border-blue-600 ml-4 pl-6 space-y-12">
                {Object.entries(groupedEvents).length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No matching events found.</p>
                ) : (
                  Object.entries(groupedEvents).map(([month, events]) => (
                    <div key={month} className="relative">
                      <h3 className="text-2xl font-bold text-blue-700 mb-6 bg-gray-50 py-1 inline-block rounded-md">{month}</h3>
                      <div className="space-y-6">
                        {events.map((event, index) => (
                          <div
                            key={event.id}
                            className="relative pl-8 before:absolute before:left-[-1.9rem] before:top-2.5 before:w-4 before:h-4 before:bg-blue-600 before:rounded-full before:border-4 before:border-white animate-fade-in"
                            style={{ animationDelay: `${index * 0.05}s` }}
                          >
                            <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border border-gray-100">
                              <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <Calendar className="w-4 h-4 text-blue-600" />
                                  <span>
                                    {new Date(event.date).toLocaleDateString('en-US', {
                                      weekday: 'short',
                                      day: 'numeric',
                                      month: 'short',
                                      year: 'numeric',
                                    })}
                                  </span>
                                </div>
                                {event.category ? (
                                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEventTypeColor(event.category)}`}>
                                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                                  </span>
                                ) : (
                                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                    General
                                  </span>
                                )}
                              </div>
                              <h4 className="text-lg font-bold text-gray-800">{event.title}</h4>
                              <p className="text-gray-600 mt-1 text-sm leading-relaxed">{event.description}</p>
                              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-55 text-sm">
                                <span className={`font-medium ${event.status === 'completed' ? 'text-green-600' : 'text-orange-600'}`}>
                                  {event.status === 'completed' ? '✓ Completed' : '⏰ Upcoming'}
                                </span>
                                <Bell className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Academic Regulations Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Academic Regulations & Ordinances</h2>
              <p className="text-lg text-gray-600 pt-2">Official administrative policies, ordinances, and guidelines governing GBU academic life</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {regulations.map((reg, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 hover:shadow-md border border-gray-100 transition-all duration-300 flex flex-col justify-between"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                      <a href={reg.document} target="_blank" rel="noopener noreferrer">
                        <Download className="w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{reg.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{reg.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200/60 mt-auto">
                    <span>Last updated: {new Date(reg.last_updated).toLocaleDateString()}</span>
                    <a
                      href={reg.document}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      View Document
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stay Updated CTA Section */}
        {cta && (
          <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-blue-500/30">
                <Bell className="w-8 h-8 animate-bounce" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{cta.title}</h2>
              <p className="text-lg text-blue-200 mb-8 max-w-2xl mx-auto">{cta.description}</p>
              <a
                href={cta.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>{cta.button_text}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </section>
        )}
      </>
    </SearchableWrapper>
  );
};

export default AcademicCalendar;
