import React from "react";
import PlacementBrochure from "./PlacementBrochure";
import InternshipProgrammes from "./InternshipProgrammes";
import PlacementStatistics from "./PlacementStatistics";
import CampusRecruiters from "./CampusRecruiters";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import BannerSection from "../../components/HeroBanner";
import { crcInfo } from "../../Data/placementData";
import {
  Mail,
  Phone,
  MapPin,
  FileText,
  UserCheck,
  Building,
  Download,
  ExternalLink,
} from "lucide-react";

function Placement_home() {
  return (
    <SearchableWrapper>
      <BannerSection
        title="Corporate Relations Cell (CRC)"
        bgTheme={11}
      />

      <div className="bg-white py-10 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Welcome & Director Contact */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-200 flex flex-col lg:flex-row items-center gap-8">
            <div className="w-full lg:w-1/3 flex flex-col items-center text-center">
              <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white ring-2 ring-blue-600 shadow-sm bg-slate-100 mb-4">
                <img
                  src={crcInfo.director.image}
                  alt={crcInfo.director.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/Faculty/Vinay_kumar_litoria.jpeg";
                  }}
                />
              </div>

              <h3 className="text-xl font-bold text-slate-900">{crcInfo.director.name}</h3>
              <p className="text-blue-700 font-semibold text-sm mb-4">{crcInfo.director.designation}</p>

              <div className="space-y-2 text-xs text-slate-600 w-full max-w-xs text-left bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{crcInfo.director.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`tel:${crcInfo.director.phone}`} className="hover:underline text-slate-800 font-medium">
                    {crcInfo.director.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <a href={`mailto:${crcInfo.director.email}`} className="hover:underline text-blue-600 font-medium">
                    {crcInfo.director.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-2">
                Corporate Relations Cell Overview
              </h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-4" />
              <p className="text-slate-700 leading-relaxed text-base">
                {crcInfo.welcomeMessage}
              </p>
            </div>
          </div>

          {/* Quick Action Portals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
              <div>
                <div className="w-11 h-11 bg-blue-50 text-blue-700 ring-1 ring-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                  <Building className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">For Recruiters</h3>
              </div>
              <a
                href={crcInfo.forms.recruiterInterestForm}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors mt-4"
              >
                <ExternalLink className="w-4 h-4" />
                Recruiter Interest Form
              </a>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
              <div>
                <div className="w-11 h-11 bg-blue-50 text-blue-700 ring-1 ring-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">For Students</h3>
              </div>
              <a
                href={crcInfo.forms.studentPlacementForm}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors mt-4"
              >
                <ExternalLink className="w-4 h-4" />
                Student Registration Form
              </a>
            </div>

            <div className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md">
              <div>
                <div className="w-11 h-11 bg-blue-50 text-blue-700 ring-1 ring-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Placement Policy</h3>
              </div>
              <a
                href={crcInfo.guidelinesPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors mt-4"
              >
                <Download className="w-4 h-4" />
                Download Policy PDF
              </a>
            </div>
          </div>

        </div>
      </div>

      <PlacementBrochure />
      <InternshipProgrammes />
      <PlacementStatistics />
      <CampusRecruiters />
    </SearchableWrapper>
  );
}

export default Placement_home;
