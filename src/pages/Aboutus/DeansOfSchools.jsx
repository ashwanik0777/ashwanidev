import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const deansList = [
  {
    schoolCode: "SOICT",
    schoolName: "School of Information & Communication Technology",
    deanName: "Dr. Arpit Bhardwaj",
    designation: "Dean (I/C) - School of ICT, GBU",
    image: "https://www.gbu.ac.in/USICT/media/img/arpit%20bhardwaj.jpg",
    message: "The School of Information and Communication Technology is committed to academic excellence, innovation, and industry-ready learning. We focus on strong fundamentals, research culture, and real-world problem solving to prepare our students for global careers.",
    link: "/schools/SOICT"
  },
  {
    schoolCode: "SOE",
    schoolName: "School of Engineering",
    deanName: "Dr. Kirti Pal",
    designation: "Dean (I/C) and Associate Professor, School of Engineering",
    image: "https://faculty.gbu.ac.in/uploads/photos/660531da1be80_kirti.pal.jpg",
    message: "Welcome to the School of Engineering. We are dedicated to providing world-class engineering education and fostering high-quality research, innovation, and practical skills to shape the builders of tomorrow.",
    link: "/schools/SOE"
  },
  {
    schoolCode: "SOM",
    schoolName: "School of Management",
    deanName: "Dr. Indu Uprety",
    designation: "Dean (I/C) & Associate Professor - School of Management, GBU",
    image: "https://faculty.gbu.ac.in/uploads/photos/6605384ccc2da_induu%20(1).jpg",
    message: "The School of Management nurtures future business leaders and entrepreneurs. Our curriculum combines cutting-edge management principles with real-world applications to empower students.",
    link: "/schools/SOM"
  },
  {
    schoolCode: "SOHSS",
    schoolName: "School of Humanities & Social Sciences",
    deanName: "Prof. Madhav Govind",
    designation: "Professor & Dean — School of Humanities & Social Sciences, GBU",
    image: "https://faculty.gbu.ac.in/uploads/photos/69b1734dae066_Prof.%20Madhav%20Govind.jpg",
    message: "Welcome to the School of Humanities & Social Sciences. Our school aims to foster critical thinking, creativity, and values of humanity, understanding social developments and cultural contexts.",
    link: "/schools/SOHSS"
  },
  {
    schoolCode: "SOVS",
    schoolName: "School of Vocational Studies & Applied Sciences",
    deanName: "Prof. Chander Kumar Singh",
    designation: "Dean & Professor - School of Vocational Studies & Applied Sciences, GBU",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    message: "Our school focuses on applied sciences, vocational courses, and skill-based learning to bridge the gap between academia and industry. Welcome to a path of practical expertise.",
    link: "/schools/SOVS"
  },
  {
    schoolCode: "SOL",
    schoolName: "School of Law, Justice & Governance",
    deanName: "Dr. Krishna Kant Dwivedi",
    designation: "Dean (I/C), School of Law, Justice & Governance",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    message: "The School of Law, Justice & Governance is committed to producing competent legal professionals who are not only well-versed in the intricacies of law but are also deeply committed to the ideals of justice and ethics.",
    link: "/schools/SOL"
  },
  {
    schoolCode: "SOBSC",
    schoolName: "School of Buddhist Studies & Civilization",
    deanName: "Prof. Karam Tej Sarao",
    designation: "Dean, School of Buddhist Studies & Civilization",
    image: "https://ui-avatars.com/api/?name=Karam+Tej+Sarao&size=300&background=F59E0B&color=fff",
    message: "Welcome to the School of Buddhist Studies & Civilization. We study the rich legacy of Buddhist thoughts, history, philosophy, and their applications in modern society.",
    link: "/schools/SOBSC"
  },
  {
    schoolCode: "SOBT",
    schoolName: "School of Biotechnology",
    deanName: "Prof. S.K. Khare",
    designation: "Dean, School of Biotechnology",
    image: "https://ui-avatars.com/api/?name=S.K.+Khare&size=300&background=10B981&color=fff",
    message: "Welcome to School of Biotechnology at Gautam Buddha University. Our school is committed to providing world-class education and fostering innovation through cutting-edge research and industry collaboration.",
    link: "/schools/SOBT"
  }
];

const DeansOfSchools = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50/50 pb-20">
        {/* Banner Section */}
        <BannerSection
          title="Deans of Schools"
          subtitle="Academic Leadership of Gautam Buddha University"
          bgTheme={1}
        />

        {/* Introduction Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Academic Administration</h2>
                <p className="text-gray-600 mt-1 max-w-xl">
                  Under the leadership of our distinguished Deans, each of the eight specialized schools at GBU fosters a rich culture of academic rigor, research innovation, and multidisciplinary education.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Deans Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {deansList.map((dean, idx) => (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-100 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="sm:w-48 h-64 sm:h-auto shrink-0 relative overflow-hidden bg-gray-100">
                  <img
                    src={dean.image}
                    alt={dean.deanName}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(dean.deanName)}&background=0284c7&color=fff&size=300`;
                    }}
                  />
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-blue-900/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                    {dean.schoolCode}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {dean.deanName}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 mt-1 uppercase tracking-wider">
                      {dean.designation}
                    </p>
                    <p className="text-sm font-medium text-gray-500 mt-0.5">
                      {dean.schoolName}
                    </p>
                    
                    <div className="mt-4 border-l-2 border-blue-500 pl-3">
                      <p className="text-gray-600 text-sm italic line-clamp-4 leading-relaxed">
                        "{dean.message}"
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link
                      to={dean.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-850 transition-colors"
                    >
                      <span>Visit School Page</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default DeansOfSchools;
