import React from "react";
import {
  Download,
  FileCheck,
  Calendar,
} from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import { pastPlacementReports } from "../../Data/placementData";

const PlacementStatistics = () => {
  return (
    <SearchableWrapper>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Past Placement Reports Archive
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="bg-slate-50/80 rounded-3xl p-6 lg:p-8 border border-slate-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <FileCheck className="w-6 h-6 text-blue-600" />
                Annual Placement Reports (2010 – 2023)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pastPlacementReports.map((report, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2.5 py-1 bg-blue-600 text-white font-bold text-xs rounded-lg flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {report.year}
                      </span>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-4 leading-snug">
                      {report.title}
                    </h4>
                  </div>

                  <a
                    href={report.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 font-semibold rounded-xl transition-all duration-200 text-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download PDF Report
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default PlacementStatistics;
