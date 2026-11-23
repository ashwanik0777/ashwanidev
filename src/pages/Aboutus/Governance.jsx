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
    { sno: 26, date: "11th October 2025", description: "Academic Council Meeting - 26", link: "/assets/pdf/governance/AC26.pdf" },
    { sno: 25, date: "24th April 2025", description: "Academic Council Meeting - 25", link: "/assets/pdf/governance/AC25.pdf" },
    { sno: 24, date: "18th March 2025", description: "Academic Council Meeting - 24", link: "/assets/pdf/governance/AC-24.pdf" },
    { sno: 23, date: "05th January 2024", description: "Academic Council Meeting - 23", link: "/assets/pdf/governance/AC23.pdf" },
    { sno: 22, date: "06th April 2023", description: "Academic Council Meeting - 22", link: "/assets/pdf/governance/AC22.pdf" },
    { sno: 21, date: "30th August 2022", description: "Academic Council Meeting - 21", link: "/assets/pdf/governance/AC21.pdf" },
    { sno: 20, date: "20th March 2022", description: "Academic Council Meeting - 20", link: "/assets/pdf/governance/AC20.pdf" },
    { sno: 19, date: "14th June 2021", description: "Academic Council Meeting - 19", link: "/assets/pdf/governance/AC19.pdf" },
    { sno: 18, date: "14th August 2020", description: "Academic Council Meeting - 18", link: "/assets/pdf/governance/AC18.pdf" },
    { sno: 17, date: "13th March 2019", description: "Academic Council Meeting - 17", link: "/assets/pdf/governance/AC17.pdf" },
    { sno: 16, date: "10th March 2018", description: "Academic Council Meeting - 16", link: "/assets/pdf/governance/AC16.pdf" },
    { sno: 15, date: "26th December 2016", description: "Academic Council Meeting - 15", link: "/assets/pdf/governance/AC15.pdf" },
    { sno: 14, date: "18th December 2015", description: "Academic Council Meeting - 14", link: "/assets/pdf/governance/AC14.pdf" },
    { sno: 13, date: "30th March 2015", description: "Academic Council Meeting - 13", link: "/assets/pdf/governance/AC13.pdf" },
    { sno: 12, date: "20th July 2014", description: "Academic Council Meeting - 12", link: "/assets/pdf/governance/AC12.pdf" },
    { sno: 11, date: "03rd September 2013", description: "Academic Council Meeting - 11", link: "/assets/pdf/governance/AC11.pdf" },
    { sno: 10, date: "6th July 2012", description: "Academic Council Meeting - 10", link: "/assets/pdf/governance/AcademicCouncil_10_2March15.pdf" },
    { sno: 9, date: "19th November 2011", description: "Academic Council Meeting - 9", link: "/assets/pdf/governance/AcademicCouncil_9_2March15.pdf" },
    { sno: 8, date: "27th April 2011", description: "Academic Council Meeting - 8", link: "/assets/pdf/governance/AcademicCouncil_8_3March15.pdf" },
    { sno: 7, date: "8th February 2011", description: "Academic Council Meeting - 7", link: "/assets/pdf/governance/AcademicCouncil_7_2March15.pdf" },
    { sno: 6, date: "03rd November 2010", description: "Academic Council Meeting - 6", link: "/assets/pdf/governance/AcademicCouncil_6_2March15.pdf" },
    { sno: 5, date: "02nd July 2010", description: "Academic Council Meeting - 5", link: "/assets/pdf/governance/AcademicCouncil_5_2March15.pdf" },
    { sno: 4, date: "6th March 2010", description: "Academic Council Meeting - 4", link: "/assets/pdf/governance/AcademicCouncil_4_2March15.pdf" },
    { sno: 3, date: "23rd November 2009", description: "Academic Council Meeting - 3", link: "/assets/pdf/governance/AcademicCouncil_3_2March15.pdf" },
    { sno: 2, date: "4th June 2009", description: "Academic Council Meeting - 2", link: "/assets/pdf/governance/AcademicCouncil_2_2March15.pdf" },
    { sno: 1, date: "24th November 2008", description: "Academic Council Meeting - 1", link: "/assets/pdf/governance/AcademicCouncil_1_2March15.pdf" },
  ],

  boardOfManagement: [
    { sno: 36, date: "15.01.2024", description: "36th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM36.pdf" },
    { sno: 35, date: "14.06.2023", description: "35th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM35.pdf" },
    { sno: 34, date: "24.02.2023", description: "34th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM34.pdf" },
    { sno: 33, date: "06.02.2023", description: "33rd Meeting of the Board of Management", link: "/assets/pdf/governance/BOM33.pdf" },
    { sno: 32, date: "30.10.2022", description: "32nd Meeting of the Board of Management", link: "/assets/pdf/governance/BOM32.pdf" },
    { sno: 31, date: "03.10.2022", description: "31st Meeting of the Board of Management", link: "/assets/pdf/governance/BOM31.pdf" },
    { sno: 30, date: "20.09.2022", description: "30th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM30.pdf" },
    { sno: 29, date: "30.09.2021", description: "29th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM29.pdf" },
    { sno: 28, date: "08.07.2021", description: "28th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM28.pdf" },
    { sno: 27, date: "24.01.2021", description: "27th Meeting of the Board of Management", link: "" },
    { sno: 26, date: "27.12.2020", description: "26th Meeting of the Board of Management", link: "" },
    { sno: 25, date: "02.11.2020", description: "25th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM25.pdf" },
    { sno: 24, date: "18.12.2019", description: "24th Meeting of the Board of Management", link: "" },
    { sno: 23, date: "30.08.2019", description: "23rd Meeting of the Board of Management", link: "" },
    { sno: 22, date: "22.06.2019", description: "22nd Meeting of the Board of Management", link: "" },
    { sno: 21, date: "06.05.2017", description: "21st Meeting of the Board of Management", link: "/assets/pdf/governance/BOM21.pdf" },
    { sno: 20, date: "30.09.2016", description: "20th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM20.pdf" },
    { sno: 19, date: "14.06.2016", description: "19th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM19.pdf" },
    { sno: 18, date: "08.03.2016", description: "18th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM18.pdf" },
    { sno: 17, date: "11.01.2016", description: "17th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM17.pdf" },
    { sno: 16, date: "18.05.2015", description: "16th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM16.pdf" },
    { sno: 15, date: "15.10.2014", description: "15th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_15_2March15.pdf" },
    { sno: 14, date: "10.07.2012", description: "14th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_14_2March15.pdf" },
    { sno: 13, date: "27.01.2012", description: "13th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_13_2March15.pdf" },
    { sno: 12, date: "22.07.2011", description: "12th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_12_2March15.pdf" },
    { sno: 11, date: "30.04.2011", description: "11th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_11_2March15.pdf" },
    { sno: 10, date: "10.02.2011", description: "10th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_10_2March15.pdf" },
    { sno: 9, date: "04.11.2010", description: "9th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_9_2March15.pdf" },
    { sno: 8, date: "04.08.2010", description: "8th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_8_2March15.pdf" },
    { sno: 7, date: "30.04.2010", description: "7th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_7_2March15.pdf" },
    { sno: 6, date: "11.01.2010", description: "6th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_6_2March15.pdf" },
    { sno: 5, date: "24.09.2009", description: "5th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_5_2March15.pdf" },
    { sno: 4, date: "22.06.2009", description: "4th Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_4_2March15.pdf" },
    { sno: 3, date: "18.02.2009", description: "3rd Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_3_2March15.pdf" },
    { sno: 2, date: "20.09.2008", description: "2nd Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_2_2March15.pdf" },
    { sno: 1, date: "10.04.2008", description: "1st Meeting of the Board of Management", link: "/assets/pdf/governance/BOM_1_2March15.pdf" },
  ],

  boardOfGovernors: [
    { sno: 6, date: "25 June 2018", description: "Board Of Governors Meeting - VI", link: "/assets/pdf/governance/BOG-6Meeting.pdf" },
    { sno: 5, date: "18 September 2017", description: "Board Of Governors Meeting - V", link: "/assets/pdf/governance/BOG5M_25Jan18.pdf" },
    { sno: 4, date: "01 August 2015", description: "Board Of Governors Meeting - IV", link: "/assets/pdf/governance/BOG4M_25Jan18.pdf" },
    { sno: 3, date: "6 May 2011", description: "Board Of Governors Meeting - III", link: "/assets/pdf/governance/BOG_3_2March15.pdf" },
    { sno: 2, date: "10 February 2010", description: "Board Of Governors Meeting - II", link: "/assets/pdf/governance/BOG_2_2March15.pdf" },
    { sno: 1, date: "03 February 2009", description: "Board Of Governors Meeting - I", link: "/assets/pdf/governance/BOG_1_2March15.pdf" },
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
        designation: "Dean, Academics, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Modho Govind",
        role: "Member",
        designation: "Dean, School of Humanities and Social Sciences, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. S. Dhanalakshmi",
        role: "Member",
        designation: "Dean, School of Biotechnology, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Rajeev Varshney",
        role: "Member",
        designation: "Dean, School of Buddhist Studies & Civilization, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Dhananjay Singh",
        role: "Member",
        designation: "Dean (I/c) Planning and Research, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Dr. Neeti Rana",
        role: "Member",
        designation: "Dean (I/c), School of Management, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Dr. Krishna Kant Dwivedi",
        role: "Member",
        designation: "Dean (I/c), School of Law Justice and Governance, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Dr. Kirti Pal",
        role: "Member",
        designation: "Dean (I/c), School of Engineering, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Dr. Arpit Bhardwaj",
        role: "Member",
        designation: "Dean (I/c), School of Information & Communication Technology, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Member and Secretary",
        designation: "Registrar (I/c) & Dean, School of Vocational Studies and Applied Sciences, Gautam Buddha University, Greater Noida",
      },
    ],
  },

  boardOfManagement: {
    title: "Board of Management",
    icon: <Users className="w-6 h-6" />,
    members: [
      {
        name: "Prof. Rana Pratap Singh",
        role: "Chairman",
        designation: "Vice Chancellor, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Dr. Biranchi Panda",
        role: "Member",
        designation: "Technical Education Nominee - Department of Mechanical Engineering, Indian Institute of Technology Guwahati, Assam",
      },
      {
        name: "Prof. Ruchir Gupta",
        role: "Member",
        designation: "Education Society Nominee - Indian Institute of Technology, BHU, Varanasi",
      },
      {
        name: "Prof. Ravi Kumar Gangwar",
        role: "Member",
        designation: "Education Society Nominee - Indian Institute of Technology, Dhanbad",
      },
      {
        name: "Prof. Sapna Ratan Shah",
        role: "Member",
        designation: "Education Society Nominee - Jawaharlal Nehru University, New Delhi",
      },
      {
        name: "Prof. Rajeev Varshney",
        role: "Member",
        designation: "Dean, Academics, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Bandana Pandey",
        role: "Member",
        designation: "Professor, School of Humanities & Social Sciences, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Sanjay kumar Sharma",
        role: "Member",
        designation: "Professor, School of ICT, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Member",
        designation: "Dean, School of Vocational Studies and Applied Sciences, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Prof. S. Dhanalakshmi",
        role: "Member",
        designation: "Dean, School of Biotechnology, Gautam Buddha University, Greater Noida",
      },
      {
        name: "Secretary",
        role: "Member",
        designation: "Department of Infrastructure and Industrial Development, U.P. Govt.",
      },
      {
        name: "Prof. Chander Kumar Singh",
        role: "Secretary",
        designation: "Registrar (I/c), Gautam Buddha University, Greater Noida",
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
        designation: "Gautam Buddha University, Greater Noida",
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
    executive: data.executive,
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
