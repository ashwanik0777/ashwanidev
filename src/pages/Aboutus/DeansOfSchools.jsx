import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, UserCheck, Award, User, Briefcase, Crown } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const leadership = [
  {
    role: "Hon'ble Chancellor",
    name: "Shri Yogi Adityanath Ji",
    designation: "Hon'ble Chief Minister, UP & Chancellor, GBU",
    image: "/assets/Yogiji.jpg",
    objectPos: "object-top"
  },
  {
    role: "Vice Chancellor",
    name: "Prof. Rana Pratap Singh",
    designation: "Vice Chancellor, Gautam Buddha University",
    image: "/assets/prof.jpeg",
    objectPos: "object-top"
  }
];

const coordinatingDeans = [
  {
    title: "Dean Academics",
    name: "Prof. Rajeev Varshney",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/R.jpg",
    icon: <GraduationCap className="w-6 h-6 text-blue-600" />
  },
  {
    title: "Dean Student Affairs (I/C)",
    name: "Dr. Sushil Kumar",
    image: "https://faculty.gbu.ac.in/uploads/photos/660532af762d9_sushil.kumar.jpg",
    icon: <UserCheck className="w-6 h-6 text-indigo-600" />
  },
  {
    title: "Dean (I/C) Planning & Research",
    name: "Prof. S. Dhanalakshmi",
    image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
    icon: <Award className="w-6 h-6 text-emerald-600" />
  }
];

const deansList = [
  {
    schoolCode: "SOHSS",
    schoolName: "School of Humanities & Social Sciences",
    deanName: "Prof. Modho Govind",
    designation: "Dean, School of Humanities & Social Sciences",
    image: "https://faculty.gbu.ac.in/uploads/photos/69b1734dae066_Prof.%20Madhav%20Govind.jpg",
    link: "/schools/SOHSS"
  },
  {
    schoolCode: "SOBSC",
    schoolName: "School of Buddhist Studies & Civilization",
    deanName: "Prof. Rajeev Varshney",
    designation: "Dean, School of Buddhist Studies and Civilization",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/R.jpg",
    link: "/schools/SOBSC"
  },
  {
    schoolCode: "SOBT",
    schoolName: "School of Biotechnology",
    deanName: "Prof. S. Dhanalakshmi",
    designation: "Dean, School of Biotechnology",
    image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
    link: "/schools/SOBT"
  },
  {
    schoolCode: "SOVS",
    schoolName: "School of Vocational Studies & Applied Sciences",
    deanName: "Prof. Chander Kumar Singh",
    designation: "Dean, School of Vocational Studies and Applied Sciences",
    image: "https://i1.rgstatic.net/ii/profile.image/337623269822466-1457507069206_Q512/Chander-Singh.jpg",
    link: "/schools/SOVS"
  },
  {
    schoolCode: "SOM",
    schoolName: "School of Management",
    deanName: "Dr. Indu Uprety",
    designation: "Dean (I/C), School of Management",
    image: "https://faculty.gbu.ac.in/uploads/photos/6605384ccc2da_induu%20(1).jpg",
    link: "/schools/SOM"
  },
  {
    schoolCode: "SOL",
    schoolName: "School of Law, Justice & Governance",
    deanName: "Dr. Krishna Kant Dwivedi",
    designation: "Dean (I/C), School of Law, Justice and Governance",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/krishankant.jpg",
    link: "/schools/SOL"
  },
  {
    schoolCode: "SOE",
    schoolName: "School of Engineering",
    deanName: "Dr. Kirti Pal",
    designation: "Dean (I/C), School of Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/660531da1be80_kirti.pal.jpg",
    link: "/schools/SOE"
  },
  {
    schoolCode: "SOICT",
    schoolName: "School of Information & Communication Technology",
    deanName: "Dr. Arpit Bhardwaj",
    designation: "Dean (I/C), School of Information & Communication Technology",
    image: "https://www.gbu.ac.in/USICT/media/img/arpit%20bhardwaj.jpg",
    link: "/schools/SOICT"
  }
];

const administrativeOfficers = [
  {
    role: "Registrar (I/c) & Director Works",
    name: "Prof. Chander Kumar Singh",
    image: "https://i1.rgstatic.net/ii/profile.image/337623269822466-1457507069206_Q512/Chander-Singh.jpg"
  },
  {
    role: "Finance Officer",
    name: "Smt. Anita Singh",
    image: "https://ui-avatars.com/api/?name=Anita+Singh&background=0284c7&color=fff&size=300"
  },
  {
    role: "Deputy Registrar",
    name: "Prof. Uttam Kumar",
    image: "https://ui-avatars.com/api/?name=Uttam+Kumar&background=0284c7&color=fff&size=300"
  },
  {
    role: "Assistant Registrar (Academics)",
    name: "Dr. C. S. Paswan",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/chandrashekhar.jpg"
  },
  {
    role: "Accounts Officer",
    name: "Dr. Sandeep Kumar Dwivedi",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/AO.jpg"
  },
  {
    role: "Assistant Registrar (Examination)",
    name: "Dr. Vikram Karuna",
    image: "https://www.gbu.ac.in/Content/gbudata/Employee/img/Dr.%20Vikram%20Karuna.jpg"
  }
];

const DeansOfSchools = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50/50 pb-16">
        {/* Banner Section */}
        <BannerSection
          title="Organization"
          subtitle="Gautam Buddha University Administrative & Academic Leadership"
          bgTheme={1}
        />

        {/* 1. Leadership Section (Chancellor & Vice Chancellor) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-amber-100 to-blue-100 rounded-full">
              <Crown className="w-6 h-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">University Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leadership.map((leader, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6 flex flex-col items-center text-center group justify-between"
              >
                <div className="flex flex-col items-center text-center w-full">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className={`w-32 h-32 rounded-full object-cover ${leader.objectPos || 'object-top'} mb-4 border-4 border-blue-100 group-hover:border-blue-300 transition-colors shadow-sm`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(leader.name)}&background=0284c7&color=fff&size=300`;
                    }}
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-amber-700 font-semibold text-xs mb-1 uppercase tracking-wider">
                    {leader.role}
                  </p>
                  <p className="text-gray-500 font-medium text-xs">
                    {leader.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Coordinating Deans Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-full">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Coordinating Deans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coordinatingDeans.map((dean, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6 flex flex-col items-center text-center group"
              >
                <img
                  src={dean.image}
                  alt={dean.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100 group-hover:border-blue-300 transition-colors"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dean.name)}&background=0284c7&color=fff&size=300`;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {dean.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm">
                  {dean.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3. School's Deans Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">School's Deans</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {deansList.map((dean, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6 flex flex-col items-center text-center group justify-between"
              >
                <div className="flex flex-col items-center text-center w-full">
                  <img
                    src={dean.image}
                    alt={dean.deanName}
                    className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dean.deanName)}&background=0284c7&color=fff&size=300`;
                    }}
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                    {dean.deanName}
                  </h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3">
                    {dean.designation}
                  </p>
                </div>
                <div className="w-full flex flex-col items-center pt-3 border-t border-gray-100">
                  <Link
                    to={dean.link}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <span>Visit School</span>
                    <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Administration Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Administration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {administrativeOfficers.map((officer, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 p-6 flex flex-col items-center text-center group"
              >
                <img
                  src={officer.image}
                  alt={officer.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-100 group-hover:border-blue-200 transition-colors"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(officer.name)}&background=0284c7&color=fff&size=300`;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-blue-600 transition-colors">
                  {officer.name}
                </h3>
                <p className="text-blue-600 font-semibold text-sm">
                  {officer.role}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SearchableWrapper>
  );
};

export default DeansOfSchools;




