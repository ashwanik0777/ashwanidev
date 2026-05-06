import React, { useState } from "react";

import { BookOpen, Users, DollarSign, Award } from "lucide-react";

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import { RESEARCH_CENTERS, SCHOOL_BADGES } from "../../Data/schools";

const ResearchCenters = () => {
  const centers = RESEARCH_CENTERS;

  const schools = Object.keys(SCHOOL_BADGES);

  const [selectedSchool, setSelectedSchool] = useState("all");
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const technologies = [
    ...new Set(centers.flatMap((center) => center.researchAreas)),
  ];

  const filteredCenters = centers.filter((center) => {
    const matchesSchool =
      selectedSchool === "all" || center.school === selectedSchool;
    const matchesTechnology =
      selectedTechnology === "all" ||
      center.researchAreas.includes(selectedTechnology);
    const matchesSearch = center.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSchool && matchesTechnology && matchesSearch;
  });

  const statsData = [
    {
      icon: BookOpen,
      number: 20,
      title: "Research Centers",
      iconColor: "#2563eb", // blue-600
    },
    {
      icon: Users,
      number: 150,
      title: "Research Faculty",
      iconColor: "#16a34a", // green-600
    },
    {
      icon: DollarSign,
      numberText: "₹50Cr+",
      title: "Research Funding",
      iconColor: "#0891b2", // cyan-600
    },
    {
      icon: Award,
      number: 300,
      title: "Active Projects",
      iconColor: "#eab308", // yellow-500
    },
  ];


  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Hero Section */}
        <BannerSection
          title="Center of Excellence & Laboratories"
          subtitle="World-class research facilities driving innovation across disciplines"
          bgTheme={2}
        />

        {/* Stats */}
        <StatsCard stats={statsData} />
        {/* Filters */}
        <div className="max-w-6xl mx-auto mt-10 px-4">
          <div className="flex flex-wrap gap-4 items-center ">
            {/* School Filter */}
            <div className="flex flex-col ">

              <select
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
              >
                <option value="all">All Schools</option>
                {schools.map((school, idx) => (
                  <option key={idx} value={school}>
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div className="flex flex-col">

              <select
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTechnology}
                onChange={(e) => setSelectedTechnology(e.target.value)}
              >
                <option value="all">All Technologies</option>
                {technologies.map((tech, idx) => (
                  <option key={idx} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col flex-grow min-w-[200px]">

              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {filteredCenters.length > 0 ? (
              filteredCenters.map((center) => (
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

                  <div className="text-sm text-gray-700 mb-4 space-y-1">
                    <p>
                      <span className="font-semibold text-blue-600">Head:</span>{" "}
                      {center.head}
                    </p>
                    <p>
                      <span className="font-semibold text-blue-600">
                        Location:
                      </span>{" "}
                      {center.location}
                    </p>
                  </div>

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

                  <div className="mt-auto flex gap-3">
                    <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md w-full hover:bg-blue-700">
                      Visit Lab
                    </button>
                    <button className="border border-blue-600 text-blue-600 text-sm px-4 py-2 rounded-md w-full hover:bg-blue-50">
                      Contact
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-2">
                No research centers found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default ResearchCenters;
