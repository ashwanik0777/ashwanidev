import React from 'react';
import { BookOpen, Download } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';
import { brochuresData, crcInfo } from '../../Data/placementData';

function PlacementBrochure() {
  return (
    <SearchableWrapper>
      <div className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Placement & School Brochures
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brochuresData.map((brochure) => (
              <div
                key={brochure.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col justify-between"
              >
                <div className={`p-6 bg-gradient-to-br ${brochure.bgGradient} text-white`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider">
                      {brochure.year}
                    </span>
                    <BookOpen className="w-6 h-6 opacity-80" />
                  </div>
                  <h4 className="font-bold text-lg leading-snug line-clamp-2 min-h-[3.25rem]">
                    {brochure.title}
                  </h4>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <p className="text-xs font-medium text-gray-500 mb-5 uppercase tracking-wider">
                    {brochure.school}
                  </p>

                  <a
                    href={brochure.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-semibold rounded-xl transition-colors duration-200 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure (PDF)
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
}

export default PlacementBrochure;