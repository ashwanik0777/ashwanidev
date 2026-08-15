import React, { useState } from 'react';
import {
  FileText, Calendar, Download, ExternalLink, Award, Building,
  Globe, Lightbulb, Target, Sparkles, CheckCircle2, Video, Search,
  Filter, Shield, Eye, Compass, Trophy, Code, Brain, Rocket, UserCheck
} from 'lucide-react';

import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';
import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";

const stats = [
  {
    icon: Award,
    numberText: "9232",
    title: "Certificate No.",
    subtitle: "Registered Member",
    iconColor: "#eab308",
  },
  {
    icon: Building,
    numberText: "U-0514",
    title: "IASHE Code",
    subtitle: "GBU Registration",
    iconColor: "#3b82f6",
  },
  {
    icon: Globe,
    numberText: "2700+",
    title: "IIC Network",
    subtitle: "HEIs Across India",
    iconColor: "#10b981",
  },
  {
    icon: FileText,
    numberText: "30+",
    title: "Official Reports",
    subtitle: "Events & Workshops",
    iconColor: "#9333ea",
  },
];

const focusAreas = [
  {
    title: "Vibrant Local Innovation Ecosystem",
    description: "Create a dynamic, functional local innovation environment across all university schools.",
    icon: Sparkles
  },
  {
    title: "Start-up Supporting Mechanism",
    description: "Comprehensive mechanism to mentor, incubate, and fund student & faculty startups in HEIs.",
    icon: Rocket
  },
  {
    title: "Atal Ranking Preparation",
    description: "Prepare the institute for Atal Ranking of Institutions on Innovation Achievements Framework (ARIIA).",
    icon: Trophy
  },
  {
    title: "Idea Scouting & Pre-Incubation",
    description: "Establish a functional ecosystem for scouting ideas and pre-incubation of innovative prototypes.",
    icon: Search
  },
  {
    title: "Cognitive Ability Development",
    description: "Develop better cognitive ability, creative thinking, and problem-solving skills among students.",
    icon: Brain
  }
];

const functions = [
  "Conduct various Innovation, IPR and entrepreneurship-related activities prescribed by MIC in time bound fashion.",
  "Identify and reward innovations and share success stories across the institution.",
  "Organize periodic workshops/seminars/interactions with entrepreneurs, investors, professionals and create a mentor pool for student innovators.",
  "Network with peers and national entrepreneurship development organizations.",
  "Create an Institution's Innovation portal to highlight innovative projects carried out by institution's faculty and students.",
  "Organize Hackathons, idea competition, mini-challenges etc. with the involvement of industries."
];

const officialEvents = [
  {
    title: "Debate and Discussion on 'Unlocking Nature - The Promise and Perils of Patenting Life Forms'",
    date: "14th October 2024",
    category: "IPR & Bioethics",
    description: "Organized by IPR Cell & sponsored by IIC, GBU. Debated technical, legal, and moral angles of life form research with future lawyers, scientists, and technocrats. Judged by Dr. Jaya Maitra & Dr. Bhaswati Banerjee. Concluded by Dr. Tanvi Vats.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IICReport-14October2024.pdf"
  },
  {
    title: "One Day Industrial Visit on GRC & Zonal NASA Convention",
    date: "9th September 2024",
    category: "Industrial Visit",
    description: "19 B.Arch (2nd & 3rd Year) students & 4 faculty members visited MRK GRC Surajpur, Greater Noida and participated in Zonal NASA convention at CT Institute, Jalandhar, Punjab.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/industrial%20visit%20Architecture%20and%20Regional%20Planning%20dept%20gbu.pdf"
  },
  {
    title: "Poster Making Competition on National Science Day",
    date: "28th February 2024",
    category: "Competition",
    description: "University-level competition with 60+ entries. Judged by Prof. M.R. Shenoy (Emeritus Professor, IIT Delhi). Cash prizes awarded to Shubra Dixit (1st - Rs. 5000), Anushka Devi (2nd - Rs. 3000), Bhargavi (3rd - Rs. 2000).",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_posterCompt.pdf"
  },
  {
    title: "National Awareness Programme on Intellectual Property Rights",
    date: "24th February 2024",
    category: "National Programme",
    description: "Sponsored by Council of Science and Technology (CST), UP. Chief Guest: Hon'ble VC Prof. Ravindra Kumar Sinha. Guest: Registrar Dr. Vishwas Tripathi. Focused on AI in legal research and IPR.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_NationalAwareness.pdf"
  },
  {
    title: "Workshop on Intellectual Property Rights (IPR) & IP Management for Startups",
    date: "28th August 2023",
    category: "IPR Workshop",
    description: "Sensitizing students on IP portfolios, enforcement, infringement, and international IP agencies scenario.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Report-IPR-Workshop.pdf"
  },
  {
    title: "Industry Visit of Mechanical and Electrical Engineering",
    date: "26th August 2023",
    category: "Industrial Visit",
    description: "Industrial exposure at Bharat Test House Pvt. Ltd. for Mechanical & Electrical Engineering students.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Industry_Visit_26th_August.pdf"
  },
  {
    title: "Special Assembly & Live Telecast for Chandrayaan-3 Moon Landing",
    date: "23rd August 2023",
    category: "National Celebration",
    description: "Live telecast in Main Auditorium with 2000 students and 115 faculty members witnessing ISRO's historic moon landing. VC Prof. Ravindra Kumar Sinha congratulated ISRO scientists.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/ChandrayaanLanding_celebration_23_August.pdf"
  },
  {
    title: "Industry Talk and Orientation Programme",
    date: "21-22 August 2023",
    category: "Orientation",
    description: "Orientation program introducing freshers to IIC activities, startup culture, and industry innovation linkages.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IndustryTalk_OrientationProgramme_21-22_August.pdf"
  },
  {
    title: "Independence Day Assembly & Cultural Celebrations",
    date: "15th August 2023",
    category: "Celebration",
    description: "National Flag Hoisting followed by cultural events and address by Hon'ble Vice Chancellor Prof. Ravindra Kumar Sinha.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Independence_Day_Celebration_15th%20August.pdf"
  },
  {
    title: "Startup Meet 2023",
    date: "10th August 2023",
    category: "Startup Event",
    description: "Organized by Dr. Satish K. Mittal under GBU Incubation Centre & IIC. Featured 15 participating startups, 50 students, and 15 faculty mentors with interactive pitching.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/StartUp_Meet_10th%20August.pdf"
  },
  {
    title: "STTP / Workshop on Machine Learning for Optimal Process Design & Development",
    date: "5-10 June 2023",
    category: "Training Program",
    description: "1-Week online STTP guided by Hon'ble VC Prof. R.K. Sinha. Convenors: Dr. Indu Uprety (President IIC), Dr. Dipti Singh, Dr. Nidhi Singh. Covered Python ML tools and process design.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Machine%20Learning_Process-Design-One%20Week%20Workshop_5-10_June.pdf"
  },
  {
    title: "Electrical Engineering Students Project Exhibition",
    date: "18th May 2023",
    category: "Exhibition",
    description: "Hardware & software prototype project exhibition organized by Electrical Engineering students.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Project%20Exhibition.pdf"
  },
  {
    title: "National Technology Day Celebration",
    date: "11th May 2023",
    category: "Celebration",
    description: "Organized by Techno Cultural Club featuring workshops, technical seminars, and hackathons.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/National%20Technology%20Day%20Celebration.pdf"
  },
  {
    title: "International Expert Lecture: 'Empowering Grassroot Communities Through Virtual Heritage'",
    date: "28th April 2023",
    category: "International Lecture",
    description: "Keynote by Ar. Imamur Hossain (Sonargaon University, Bangladesh, ICOMOS member). Welcomed by Dr. Indu Kirti (Dean Planning & Research) & Dr. Kirti Pal (Dean SOE).",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Empowering%20Community_28th%20April.pdf"
  },
  {
    title: "IPR Day Celebration & Design Thinking Workshop",
    date: "26th April 2023",
    category: "Workshop",
    description: "One Day Workshop on Ansys EV Simulation & Design Thinking for engineering innovation.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IPR%20DAy%20Celebration_26th%20April.pdf"
  },
  {
    title: "National Science Day Celebration & Video Showcase",
    date: "10th March 2023",
    category: "Science Day",
    description: "Interactive science drives, student project presentations, and video demonstrations.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/National%20Science%20Day.pdf",
    videoMedia: "https://www.gbu.ac.in/Content/gbudata/IIC/VID-20230310-WA0002.mp4"
  },
  {
    title: "Industrial Visit to National Small Industries Corporation (NSIC)",
    date: "Academic Session 2022-23",
    category: "Industrial Visit",
    description: "Exposure visit for university students to NSIC incubators and MSME technological facilities.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/NSIC%20Visit%20Report.pdf",
    videoMedia: "https://www.gbu.ac.in/Content/gbudata/IIC/NSIC%20Visit%20Vedio%201.mp4"
  },
  {
    title: "Workshop on Technology Readiness Level (TRL) & Innovation Assessment",
    date: "Session 2022-23",
    category: "Workshop",
    description: "Technical training on evaluating TRL levels from ideation to commercial prototype.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_TRL.pdf"
  },
  {
    title: "Problem Solving & Ideation Workshop",
    date: "28th January 2023",
    category: "Ideation",
    description: "Hands-on ideation workshop helping students transform problem statements into technical solutions.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Problem%20Solving%20and%20Ideation%20Workshop%2028%20Jan%23.pdf"
  },
  {
    title: "National Youth Day 2023",
    date: "12th January 2023",
    category: "Celebration",
    description: "Commemorating Swami Vivekananda's birth anniversary with youth innovation pledges.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/National_Youth_Day2023.pdf"
  },
  {
    title: "Industrial Visit to FunZoo Toys Industry",
    date: "Session 2022-23",
    category: "Industrial Visit",
    description: "Field study on manufacturing process design and product safety standards.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/industrial_visit_FunZooToys.pdf"
  },
  {
    title: "Workshop on Patents & Prior Art Patent Search",
    date: "19th December 2022",
    category: "IPR",
    description: "Training session on executing patent searches on Indian & international patent databases.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_PatentsatSearch_19December2022.pdf"
  },
  {
    title: "Computational Design Workshop",
    date: "19th December 2022",
    category: "Technology",
    description: "Advanced CAD & computational modeling session by international experts.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_ComputationalDesign_19Dec2022.pdf"
  },
  {
    title: "Expert Lecture on Thermal Comfort by Ar. Ritu Gulati",
    date: "13th December 2022",
    category: "Expert Lecture",
    description: "Session on climate-responsive architectural design and energy efficiency.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/ReportThermalComfort-RituGulati.pdf"
  },
  {
    title: "International Expert Lecture: 'New Tools for Urban Morphology' by Prof. Marco Maretto",
    date: "13th December 2022",
    category: "International Lecture",
    description: "Expert lecture on urban design tools and morphological analysis.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/Report_NewTools_UrbanMorphology-MarcoMaretto.pdf"
  },
  {
    title: "National Education Day & IP Awareness Lecture",
    date: "11th November 2022",
    category: "Celebration",
    description: "Expert lecture by Mr. Vivek Singh (IP Attorney) on intellectual property rights in higher education.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_NEDay.pdf"
  },
  {
    title: "Entrepreneurial Opportunities in E-Commerce by Mr. Pankaj Gupta",
    date: "2nd November 2022",
    category: "Entrepreneurship",
    description: "Session for management & engineering students on e-commerce business models.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/ExpertLecture%20Report_IIC_2Nov2022.pdf"
  },
  {
    title: "National Innovation Day - Tribute to Dr. A.P.J. Abdul Kalam",
    date: "15th October 2022",
    category: "Celebration",
    description: "University-wide innovation events commemorating Dr. APJ Abdul Kalam.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IICEvent_15thOct22.pdf"
  },
  {
    title: "Water Centric Urban Planning by Prof. K.K. Dhote",
    date: "12th October 2022",
    category: "Expert Lecture",
    description: "Online session on sustainable water management in urban development.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/IIC_WaterCentricPlanning.pdf"
  },
  {
    title: "Keynote Lecture: 'Academic R&D to Startups' by Prof. V. Ramgopal Rao",
    date: "29th September 2022",
    category: "Keynote Lecture",
    description: "Former Director of IIT Delhi addressing 2000+ students and 300+ faculty on converting academic research into commercial ventures.",
    pdfReport: "https://www.gbu.ac.in/Content/gbudata/IIC/11Nov290922.pdf"
  }
];

const InstitutionInnovation = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredEvents = officialEvents.filter(ev =>
    ev.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    ev.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
    ev.date.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50/50 pb-16 sm:pb-20">
        {/* Banner Section */}
        <BannerSection
          title="Institution's Innovation Council (IIC)"
          subtitle="MoE's Innovation Cell (MIC) • Gautam Buddha University"
          bgTheme={6}
        />

        <StatsCard stats={stats} />

        {/* Tab Navigation Sticky Bar */}
        <div className="sticky top-[4.5rem] md:top-[5.5rem] z-30 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2.5">
            <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-none gap-1.5 sm:gap-2 no-scrollbar py-0.5 whitespace-nowrap">
              <button
                onClick={() => setActiveTab('about')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'about'
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>About & Focus Areas</span>
              </button>

              <button
                onClick={() => setActiveTab('events')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'events'
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Events Archive ({officialEvents.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('policy')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer ${
                  activeTab === 'policy'
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Startup Policy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          {/* TAB 1: About & Focus Areas */}
          {activeTab === 'about' && (
            <div className="bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-gray-100 shadow-sm space-y-8 sm:space-y-10">
              {/* About IIC */}
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                  About Institution's Innovation Council (IIC)
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full mb-4 sm:mb-6"></div>

                <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  <div className="p-3.5 sm:p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 font-semibold text-xs sm:text-base">
                    GBU is a proud registered member of Institution's Innovation Council (IIC) with <strong>Certificate No. 9232</strong> under <strong>IASHE Code: U-0514</strong>.
                  </div>

                  <p className="text-justify">
                    Ministry of Education (MoE), Govt. of India has established 'MoE's Innovation Cell (MIC)' to systematically foster the culture of Innovation among all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are in formative years.
                  </p>

                  <p className="text-justify">
                    MIC has envisioned encouraging creation of 'Institution's Innovation Council (IICs)' across selected HEIs. A network of IICs is established to promote innovation and entrepreneurship in the Institution through multitudinous modes leading to an innovation promotion ecosystem in the campuses. MIC has established Institution's Innovation Council in more than 2700 Institutions till December 2021.
                  </p>
                </div>
              </div>

              {/* Major Focus Areas */}
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                  Major Focus Areas
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full mb-4 sm:mb-6"></div>

                <ul className="list-disc pl-5 sm:pl-6 space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {focusAreas.map((area, idx) => (
                    <li key={idx} className="text-justify">
                      <strong>{area.title}: </strong>{area.description}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Functions of IIC */}
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                  Functions of IIC
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full mb-4 sm:mb-6"></div>

                <ul className="list-disc pl-5 sm:pl-6 space-y-2.5 sm:space-y-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {functions.map((fn, idx) => (
                    <li key={idx} className="text-justify">
                      {fn}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 2: Events & Reports Archive */}
          {activeTab === 'events' && (
            <div className="bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-gray-100 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 sm:pb-6">
                <div>
                  <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                    Official Events & Activity Reports Archive
                  </h2>
                  <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full"></div>
                </div>

                {/* Filter Input */}
                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Filter events..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Mobile Card List View (Visible on small screens < 768px) */}
              <div className="block md:hidden space-y-4">
                {filteredEvents.map((ev, idx) => (
                  <div key={idx} className="bg-slate-50 border border-gray-200 rounded-xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        #{idx + 1} • {ev.date}
                      </span>
                      <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {ev.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-gray-900 text-sm leading-snug">
                      {ev.title}
                    </h3>

                    <p className="text-gray-600 text-xs leading-relaxed">
                      {ev.description}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      {ev.pdfReport && (
                        <a
                          href={ev.pdfReport}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF Report</span>
                        </a>
                      )}
                      {ev.videoMedia && (
                        <a
                          href={ev.videoMedia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Watch Video</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View (Visible on medium+ screens >= 768px) */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse border border-gray-200">
                  <thead>
                    <tr className="bg-slate-100 border-b border-gray-200 text-gray-800 text-xs sm:text-sm font-bold">
                      <th className="p-3 border-r border-gray-200 w-12 text-center">#</th>
                      <th className="p-3 border-r border-gray-200 w-32">Date</th>
                      <th className="p-3 border-r border-gray-200">Event Title & Description</th>
                      <th className="p-3 border-r border-gray-200 w-28 text-center">Category</th>
                      <th className="p-3 w-36 text-center">Report / Document</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-700">
                    {filteredEvents.map((ev, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 border-r border-gray-200 text-center font-bold text-gray-500">{idx + 1}</td>
                        <td className="p-3 border-r border-gray-200 font-semibold text-blue-700 shrink-0">{ev.date}</td>
                        <td className="p-3 border-r border-gray-200 space-y-1">
                          <div className="font-bold text-gray-900 text-sm">{ev.title}</div>
                          <div className="text-gray-600 text-xs leading-relaxed">{ev.description}</div>
                        </td>
                        <td className="p-3 border-r border-gray-200 text-center">
                          <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded-full">
                            {ev.category}
                          </span>
                        </td>
                        <td className="p-3 text-center space-y-1">
                          {ev.pdfReport && (
                            <a
                              href={ev.pdfReport}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>PDF Report</span>
                            </a>
                          )}
                          {ev.videoMedia && (
                            <a
                              href={ev.videoMedia}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-xs block"
                            >
                              <Video className="w-3.5 h-3.5" />
                              <span>Watch Video</span>
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: Innovation & Startup Policy */}
          {activeTab === 'policy' && (
            <div className="bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-gray-100 shadow-sm space-y-6 sm:space-y-8">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
                  GBU Innovation and Startup Policy
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full mb-4 sm:mb-6"></div>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 text-justify">
                  Gautam Buddha University has formulated its comprehensive <strong>Innovation & Startup Policy (Approved March 2025)</strong> to guide faculty, students, and research scholars in intellectual property creation, prototype development, incubator support, and technology commercialization.
                </p>

                <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                      Official Policy Document (PDF)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Approved framework for innovation, pre-incubation, and startup guidelines at GBU.
                    </p>
                  </div>

                  <a
                    href="https://www.gbu.ac.in/Content/gbudata/IIC/GBU-Innovation-StartupPolicy-Mar2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Policy (PDF)</span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default InstitutionInnovation;