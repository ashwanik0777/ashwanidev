import React, { useState } from "react";
import {
  Crown,
  Users,
  Building,
  GraduationCap,
  DollarSign,
  User,
  NotebookPen,
} from "lucide-react";

import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import BannerSection from "../../components/HeroBanner.jsx";
import ButtonGroup from "../../components/TabsData.jsx";

const data = {
  executive: [
    { sno: 26, date: "11th October 2025", description: "Academic Council Meeting - 26", link: "https://www.gbu.ac.in/Programfiles/AC26.pdf" },
    { sno: 25, date: "24th April 2025", description: "Academic Council Meeting - 25", link: "https://www.gbu.ac.in/Programfiles/AC25.pdf" },
    { sno: 24, date: "18th March 2025", description: "Academic Council Meeting - 24", link: "https://www.gbu.ac.in/Programfiles/AC-24.pdf" },
    { sno: 23, date: "05th January 2024", description: "Academic Council Meeting - 23", link: "https://www.gbu.ac.in/Programfiles/AC23.pdf" },
    { sno: 22, date: "06th April 2023", description: "Academic Council Meeting - 22", link: "https://www.gbu.ac.in/Programfiles/AC22.pdf" },
    { sno: 21, date: "30th August 2022", description: "Academic Council Meeting - 21", link: "https://www.gbu.ac.in/Programfiles/AC21.pdf" },
    { sno: 20, date: "20th March 2022", description: "Academic Council Meeting - 20", link: "https://www.gbu.ac.in/Programfiles/AC20.pdf" },
    { sno: 19, date: "14th June 2021", description: "Academic Council Meeting - 19", link: "https://www.gbu.ac.in/Programfiles/AC19.pdf" },
    { sno: 18, date: "14th August 2020", description: "Academic Council Meeting - 18", link: "https://www.gbu.ac.in/Programfiles/AC18.pdf" },
    { sno: 17, date: "13th March 2019", description: "Academic Council Meeting - 17", link: "https://www.gbu.ac.in/Programfiles/AC17.pdf" },
    { sno: 16, date: "10th March 2018", description: "Academic Council Meeting - 16", link: "https://www.gbu.ac.in/Programfiles/AC16.pdf" },
    { sno: 15, date: "26th December 2016", description: "Academic Council Meeting - 15", link: "https://www.gbu.ac.in/Programfiles/AC15.pdf" },
    { sno: 14, date: "18th December 2015", description: "Academic Council Meeting - 14", link: "https://www.gbu.ac.in/Programfiles/AC14.pdf" },
    { sno: 13, date: "30th March 2015", description: "Academic Council Meeting - 13", link: "https://www.gbu.ac.in/Programfiles/AC13.pdf" },
    { sno: 12, date: "20th July 2014", description: "Academic Council Meeting - 12", link: "https://www.gbu.ac.in/Programfiles/AC12.pdf" },
    { sno: 11, date: "03rd September 2013", description: "Academic Council Meeting - 11", link: "https://www.gbu.ac.in/Programfiles/AC11.pdf" },
    { sno: 10, date: "6th July 2012", description: "Academic Council Meeting - 10", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_10_2March15.pdf" },
    { sno: 9, date: "19th November 2011", description: "Academic Council Meeting - 9", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_9_2March15.pdf" },
    { sno: 8, date: "27th April 2011", description: "Academic Council Meeting - 8", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_8_3March15.pdf" },
    { sno: 7, date: "8th February 2011", description: "Academic Council Meeting - 7", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_7_2March15.pdf" },
    { sno: 6, date: "03rd November 2010", description: "Academic Council Meeting - 6", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_6_2March15.pdf" },
    { sno: 5, date: "02nd July 2010", description: "Academic Council Meeting - 5", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_5_2March15.pdf" },
    { sno: 4, date: "6th March 2010", description: "Academic Council Meeting - 4", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_4_2March15.pdf" },
    { sno: 3, date: "23rd November 2009", description: "Academic Council Meeting - 3", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_3_2March15.pdf" },
    { sno: 2, date: "4th June 2009", description: "Academic Council Meeting - 2", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_2_2March15.pdf" },
    { sno: 1, date: "24th November 2008", description: "Academic Council Meeting - 1", link: "https://www.gbu.ac.in/Programfiles/AcademicCouncil_1_2March15.pdf" },
  ],

  boardOfManagement: [
    { sno: 36, date: "15.01.2024", description: "36th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM36.pdf" },
    { sno: 35, date: "14.06.2023", description: "35th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM35.pdf" },
    { sno: 34, date: "24.02.2023", description: "34th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM34.pdf" },
    { sno: 33, date: "06.02.2023", description: "33rd Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM33.pdf" },
    { sno: 32, date: "30.10.2022", description: "32nd Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM32.pdf" },
    { sno: 31, date: "03.10.2022", description: "31st Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM31.pdf" },
    { sno: 30, date: "20.09.2022", description: "30th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM30.pdf" },
    { sno: 29, date: "30.09.2021", description: "29th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM29.pdf" },
    { sno: 28, date: "08.07.2021", description: "28th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM28.pdf" },
    { sno: 27, date: "24.01.2021", description: "27th Meeting of the Board of Management", link: "" },
    { sno: 26, date: "27.12.2020", description: "26th Meeting of the Board of Management", link: "" },
    { sno: 25, date: "02.11.2020", description: "25th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM25.pdf" },
    { sno: 24, date: "18.12.2019", description: "24th Meeting of the Board of Management", link: "" },
    { sno: 23, date: "30.08.2019", description: "23rd Meeting of the Board of Management", link: "" },
    { sno: 22, date: "22.06.2019", description: "22nd Meeting of the Board of Management", link: "" },
    { sno: 21, date: "06.05.2017", description: "21st Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM21.pdf" },
    { sno: 20, date: "30.09.2016", description: "20th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM20.pdf" },
    { sno: 19, date: "14.06.2016", description: "19th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM19.pdf" },
    { sno: 18, date: "08.03.2016", description: "18th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM18.pdf" },
    { sno: 17, date: "11.01.2016", description: "17th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM17.pdf" },
    { sno: 16, date: "18.05.2015", description: "16th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM16.pdf" },
    { sno: 15, date: "15.10.2014", description: "15th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_15_2March15.pdf" },
    { sno: 14, date: "10.07.2012", description: "14th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_14_2March15.pdf" },
    { sno: 13, date: "27.01.2012", description: "13th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_13_2March15.pdf" },
    { sno: 12, date: "22.07.2011", description: "12th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_12_2March15.pdf" },
    { sno: 11, date: "30.04.2011", description: "11th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_11_2March15.pdf" },
    { sno: 10, date: "10.02.2011", description: "10th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_10_2March15.pdf" },
    { sno: 9, date: "04.11.2010", description: "9th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_9_2March15.pdf" },
    { sno: 8, date: "04.08.2010", description: "8th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_8_2March15.pdf" },
    { sno: 7, date: "30.04.2010", description: "7th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_7_2March15.pdf" },
    { sno: 6, date: "11.01.2010", description: "6th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_6_2March15.pdf" },
    { sno: 5, date: "24.09.2009", description: "5th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_5_2March15.pdf" },
    { sno: 4, date: "22.06.2009", description: "4th Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_4_2March15.pdf" },
    { sno: 3, date: "18.02.2009", description: "3rd Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_3_2March15.pdf" },
    { sno: 2, date: "20.09.2008", description: "2nd Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_2_2March15.pdf" },
    { sno: 1, date: "10.04.2008", description: "1st Meeting of the Board of Management", link: "https://www.gbu.ac.in/Programfiles/BOM_1_2March15.pdf" },
  ],

  boardOfGovernors: [
    { sno: 6, date: "25 June 2018", description: "Board Of Governors Meeting - VI", link: "https://www.gbu.ac.in/Programfiles/BOG-6Meeting.pdf" },
    { sno: 5, date: "18 September 2017", description: "Board Of Governors Meeting - V", link: "https://www.gbu.ac.in/Programfiles/BOG5M_25Jan18.pdf" },
    { sno: 4, date: "01 August 2015", description: "Board Of Governors Meeting - IV", link: "https://www.gbu.ac.in/Programfiles/BOG4M_25Jan18.pdf" },
    { sno: 3, date: "6 May 2011", description: "Board Of Governors Meeting - III", link: "https://www.gbu.ac.in/Programfiles/BOG_3_2March15.pdf" },
    { sno: 2, date: "10 February 2010", description: "Board Of Governors Meeting - II", link: "https://www.gbu.ac.in/Programfiles/BOG_2_2March15.pdf" },
    { sno: 1, date: "03 February 2009", description: "Board Of Governors Meeting - I", link: "https://www.gbu.ac.in/Programfiles/BOG_1_2March15.pdf" },
  ],
};

const governanceData = {
  executive: {
    title: "Academic Council",
    icon: <Crown className="w-6 h-6" />,
    members: [
      {
        name: "Prof. Rana Pratap Singh",
        role: "Chairman",
        designation: "Vice-Chancellor, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Dhananjay Singh",
        role: "Member",
        designation: "Member Secretary, Indian Council of Social Science Research, Ministry of Education, New Delhi",
      },
      {
        name: "Prof. Bhartendu K. Singh",
        role: "Member",
        designation: "Director, PDPM IITDM Jabalpur, Madhya Pradesh",
      },
      {
        name: "Prof. Rupesh Chaturvedi",
        role: "Member",
        designation: "School of Biotechnology, Jawaharlal Nehru University, New Delhi",
      },
      {
        name: "Prof. Manisha Priyam",
        role: "Member",
        designation: "Department of Education Policy, NIEPA, New Delhi",
      },
      {
        name: "Prof. Rajeev Varshney",
        role: "Member",
        designation: "Dean, Academics, Gautam Buddha University",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Member",
        designation: "Dean, School of Vocational Studies and Applied Sciences, Gautam Buddha University",
      },
      {
        name: "Prof. Modho Govind",
        role: "Member",
        designation: "Dean, School of Humanities and Social Sciences, Gautam Buddha University",
      },
      {
        name: "Prof. S. Dhanalakshmi",
        role: "Member",
        designation: "Dean, School of Biotechnology, Gautam Buddha University",
      },
      {
        name: "Prof. Rajeev Varshney",
        role: "Member",
        designation: "Dean, School of Buddhist Studies & Civilization, Gautam Buddha University",
      },
      {
        name: "Dr. Indu Uprety",
        role: "Member",
        designation: "Dean (I/c) Planning and Research, Gautam Buddha University",
      },
      {
        name: "Dr. Indu Uprety",
        role: "Member",
        designation: "Dean (I/c), School of Management, Gautam Buddha University",
      },
      {
        name: "Dr. Krishna Kant Dwivedi",
        role: "Member",
        designation: "Dean (I/c), School of Law Justice and Governance, Gautam Buddha University",
      },
      {
        name: "Dr. Kirti Pal",
        role: "Member",
        designation: "Dean (I/c), School of Engineering, Gautam Buddha University",
      },
      {
        name: "Dr. Arpit Bhardwaj",
        role: "Member",
        designation: "Dean (I/c), School of Information & Communication Technology, Gautam Buddha University",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Secretary",
        designation: "Registrar (I/c), Gautam Buddha University",
      },
    ],
  },

  boardOfManagement: {
    title: "Board of Management",
    icon: <Users className="w-6 h-6" />,
    members: [
      {
        name: "(A) Prof. Rana Pratap Singh",
        role: "Chairman",
        designation: "Vice Chancellor, Gautam Buddha University, Greater Noida",
      },
      {
        name: "(B) Dr. Biranchi Panda",
        role: "Member",
        designation: "Technical Education Nominee - Department of Mechanical Engineering, Indian Institute of Technology Guwahati, Amingaon North Guwahati, Guwahati, Assam-781039",
      },
      {
        name: "(C) 1. Prof. Ruchir Gupta",
        role: "Member",
        designation: "Education Society Nominee - Indian Institute of Technology, BHU, Varanasi",
      },
      {
        name: "(C) 2. Prof. Ravi Kumar Gangwar",
        role: "Member",
        designation: "Education Society Nominee - Indian Institute of Technology, Dhanbad",
      },
      {
        name: "(C) 3. Prof. Sapna Ratan Shah",
        role: "Member",
        designation: "Education Society Nominee - Jawaharlal Nehru University, New Delhi",
      },
      {
        name: "(D) 1. Prof. Rajeev Varshney",
        role: "Member",
        designation: "Deans (Coordinating) - Dean, Academics, Gautam Buddha University",
      },
      {
        name: "(D) 2. Prof. Bandana Pandey",
        role: "Member",
        designation: "Deans (Coordinating) - Professor, School of Humanities & Social Sciences, Gautam Buddha University",
      },
      {
        name: "(D) 3. Prof. Sanjay kumar Sharma",
        role: "Member",
        designation: "Deans (Coordinating) - Professor, School of ICT, Gautam Buddha University",
      },
      {
        name: "(E) 1. Prof. Chander Kumar Singh",
        role: "Member",
        designation: "School's Deans - Dean, School of Vocational Studies and Applied Sciences, Gautam Buddha University, Greater Noida",
      },
      {
        name: "(E) 2. Prof. S. Dhanalakshmi",
        role: "Member",
        designation: "School's Deans - Dean, School of Biotechnology, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Secretary",
        role: "Member",
        designation: "Department of Infrastructure and Industrial Development, U.P. Govt.",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Secretary",
        designation: "Registrar (I/c), Gautam Buddha University",
      },
    ],
  },

  boardOfGovernors: {
    title: "Board of Governors",
    icon: <GraduationCap className="w-6 h-6" />,
    members: [
      {
        name: "1. Chief Secretary",
        role: "Chairman",
        designation: "U.P. Government",
      },
      {
        name: "2. Vice Chancellor",
        role: "Member Secretary",
        designation: "Gautam Buddha University",
      },
      {
        name: "3. Prof. Jaimala Bishnoi",
        role: "Member",
        designation: "Education Society Nominee - Professor & Head, Department of Mathematics, Chaudhary Charan Singh University, Meerut-250001 (Uttar Pradesh)",
      },
      {
        name: "4. Prof. H.D. Charan",
        role: "Member",
        designation: "Education Society Nominee - Vice Chancellor, Bikaner Technical University, University College of Engineering & Technology, Bikaner - 334004 (Rajasthan)",
      },
      {
        name: "5. Prof. Shyam Bihari Lal",
        role: "Member",
        designation: "Education Society Nominee - Professor and Head, Department of Ancient History & Culture and Archeological, Mahatma Jyotiba Phule Rohilkhand University, Bareilly 243006, (U.P) India",
      },
      {
        name: "6. Secretary",
        role: "Member",
        designation: "Industry Development Department, U.P. Govt.",
      },
      {
        name: "7. UGC Nominee",
        role: "Member",
        designation: "University Grants Commission",
      },
      {
        name: "8. Technical Education Nominee",
        role: "Member",
        designation: "Department of Technical Education",
      },
    ],
  },
};

const UniversityGovernance = () => {
  const [activeTab, setActiveTab] = useState("executive");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dataMap = {
    executive: data.academic,
    boardOfManagement: data.boardOfManagement,
    boardOfGovernors: data.boardOfGovernors,
  };

  const fullData = dataMap[activeTab] || [];
  const totalPages = Math.ceil(fullData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = fullData.slice(startIndex, startIndex + itemsPerPage);

  const governanceButtons = Object.entries(governanceData).map(([key, data]) => ({
    id: key,
    label: data.title,
    icon: data.icon,
  }));


  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ">
        {/* Hero Section */}
        <BannerSection
          title="Governing Bodies"
          subtitle="Leadership Structure and Academic Governance"
          bgTheme={9}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Tabs Section */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-4 sm:p-8 mb-8 sm:mb-10 border border-slate-100">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8 text-center">
              University Governance
            </h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">

              <ButtonGroup
                buttons={governanceButtons}
                onClick={setActiveTab}
                activeButton={activeTab}
                theme="primary"   // ✅ pick: light, dark, primary, etc.
                size="lg"         // ✅ pick: xs, sm, md, lg, xl
                fullWidth={false}
                rounded="2xl"
                animated={true}
                gap={true}        // ✅ optional: adds spacing between buttons
              />
            </div>

            <div className="transition-all duration-500 ease-in-out">
              <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 text-center">
                <div className="p-2.5 sm:p-3 bg-gradient-to-r from-teal-100 to-indigo-100 rounded-full text-teal-700">
                  {governanceData[activeTab].icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                  {governanceData[activeTab].title}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {governanceData[activeTab].members.map((member, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block px-3 py-1 bg-teal-50 text-teal-700 font-semibold text-xs rounded-full border border-teal-100">
                          {member.role}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-2 leading-snug">
                        {member.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed break-words">
                        {member.designation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Meeting Table */}
              <div className="flex items-center justify-center mt-10 sm:mt-12 gap-3 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-gradient-to-r from-teal-100 to-indigo-100 rounded-full text-teal-700">
                  <NotebookPen className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                  Minutes of Meeting
                </h3>
              </div>

              <div className="overflow-x-auto bg-white rounded-2xl shadow-xl border border-slate-200">
                <table className="w-full text-xs sm:text-sm text-left border-collapse">
                  <thead className="bg-slate-900 text-slate-100 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    <tr>
                      <th className="px-3 sm:px-6 py-3.5 sm:py-4 text-center w-12 sm:w-16">S.No.</th>
                      <th className="px-3 sm:px-6 py-3.5 sm:py-4 whitespace-nowrap">Date of Meeting</th>
                      <th className="px-3 sm:px-6 py-3.5 sm:py-4 min-w-[180px]">Description</th>
                      <th className="px-3 sm:px-6 py-3.5 sm:py-4 text-center whitespace-nowrap w-36 sm:w-48">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                    {paginatedData.map((meeting, index) => (
                      <tr
                        key={index}
                        className="hover:bg-teal-50/60 transition duration-150"
                      >
                        <td className="px-3 sm:px-6 py-3.5 sm:py-4 text-center font-bold text-teal-700">
                          {meeting.sno || startIndex + index + 1}
                        </td>
                        <td className="px-3 sm:px-6 py-3.5 sm:py-4 text-slate-800 font-semibold whitespace-nowrap">
                          {meeting.date}
                        </td>
                        <td className="px-3 sm:px-6 py-3.5 sm:py-4 text-slate-800">
                          {meeting.description}
                        </td>
                        <td className="px-3 sm:px-6 py-3.5 sm:py-4 text-center whitespace-nowrap">
                          {meeting.link ? (
                            <a
                              href={meeting.link}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-lg shadow transition-all"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Details
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs italic">
                              Unavailable
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex flex-wrap justify-center items-center gap-2 p-4 border-t border-slate-100">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all ${currentPage === index + 1
                        ? "bg-teal-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default UniversityGovernance;
