import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, ExternalLink, ArrowRight } from "lucide-react";

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import { RESEARCH_CENTERS, SCHOOL_BADGES } from "../../Data/schools";

const ResearchCenters = () => {
  const centers = RESEARCH_CENTERS.filter((c) => !c.hidden);


  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Hero Section */}
        <BannerSection
          title="Center of Excellence & Laboratories"
          bgTheme={2}
        />

        {/* Cards */}
        <div className="max-w-6xl mx-auto mt-8 md:mt-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {centers.length > 0 ? (
              centers.map((center) => (
                <div
                  key={center.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
                >
                  <div className="relative mb-4">
                    <img
                      src={center.image}
                      alt={center.name}
                      className="w-full h-52 object-cover rounded-xl"
                    />
                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Est. {center.established}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-blue-700">
                    {center.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">{center.shortName}</p>
                  <div
                    className={`inline-block mb-2 text-xs font-semibold px-3 py-2 rounded-full ${
                      SCHOOL_BADGES[center.school]
                        ? `${SCHOOL_BADGES[center.school].bg} ${SCHOOL_BADGES[center.school].text}`
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {center.school}
                  </div>
                  <p className="text-gray-600 text-sm mb-4">
                    {center.description}
                  </p>



                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-blue-600 mb-1">
                      Key Facilities:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.facilities.map((facility, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-blue-600 mb-1">
                      Research Areas:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {center.researchAreas.map((area, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    {(center.portalLink || "").startsWith("/") ? (
                      <Link
                        to={center.portalLink}
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-full text-center hover:bg-blue-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        Visit {center.shortName ? center.shortName.split(" ")[0] : "CoE"} Portal <ArrowRight size={14} />
                      </Link>
                    ) : (
                      <a
                        href={center.portalLink || "https://gburif.org/coe.php"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg w-full text-center hover:bg-blue-700 transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        Visit {center.shortName ? center.shortName.split(" ")[0] : "CoE"} Portal <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <BookOpen className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Research Centers Found</h3>
                <p className="text-gray-500 text-sm">Official laboratory and research center profiles will appear here when added.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ResearchCenters;
