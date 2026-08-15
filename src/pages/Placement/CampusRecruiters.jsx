import { useState } from "react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const CampusRecruiters = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const companies = {
    "it-tech": [
      {
        name: "TCS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
        fallbackLogo: "/company_logos/tcs.svg",
        description: "IT & Technology Services",
      },
      {
        name: "Infosys",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
        fallbackLogo: "/company_logos/infosys.svg",
        description: "Global Technology Services",
      },
      {
        name: "Wipro",
        logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
        fallbackLogo: "/company_logos/wipro.svg",
        description: "Digital Transformation & Cloud",
      },
      {
        name: "IBM",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        fallbackLogo: "/company_logos/ibm.svg",
        description: "Cloud & Artificial Intelligence",
      },
    ],
    core: [
      {
        name: "L&T",
        logo: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Larsen%2BToubro_logo.svg",
        fallbackLogo: "/company_logos/lnt.svg",
        description: "Engineering & Infrastructure",
      },
      {
        name: "BHEL",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/BHEL_logo.svg",
        fallbackLogo: "/company_logos/bhel.svg",
        description: "Power & Industrial Manufacturing",
      },
      {
        name: "ONGC",
        logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/ONGC_Logo.svg",
        fallbackLogo: "/company_logos/ongc.svg",
        description: "Energy & Natural Gas Corporation",
      },
    ],
    consulting: [
      {
        name: "Deloitte",
        logo: "https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg",
        fallbackLogo: "/company_logos/deloitte.svg",
        description: "Consulting & Financial Services",
      },
      {
        name: "EY",
        logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/EY_logo_2019.svg",
        fallbackLogo: "/company_logos/ey.svg",
        description: "Advisory & Assurance Services",
      },
      {
        name: "KPMG",
        logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/KPMG_logo.svg",
        fallbackLogo: "/company_logos/kpmg.svg",
        description: "Audit & Risk Advisory",
      },
    ],
    government: [
      {
        name: "DRDO",
        logo: "https://upload.wikimedia.org/wikipedia/commons/8/87/DRDO_logo.png",
        fallbackLogo: "/company_logos/drdo.svg",
        description: "Defence Research & Development",
      },
      {
        name: "ISRO",
        logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg",
        fallbackLogo: "/company_logos/isro.svg",
        description: "Space Research Organization",
      },
      {
        name: "BARC",
        logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Bhabha_Atomic_Research_Centre_Logo.png",
        fallbackLogo: "/company_logos/barc.svg",
        description: "Atomic Research Centre",
      },
    ],
  };

  const categories = [
    {
      id: "all",
      name: "All Partners",
      count: Object.values(companies).flat().length,
    },
    { id: "it-tech", name: "IT & Tech", count: companies["it-tech"].length },
    { id: "core", name: "Core Engineering", count: companies.core.length },
    {
      id: "consulting",
      name: "Consulting & Finance",
      count: companies.consulting.length,
    },
    {
      id: "government",
      name: "Government & PSUs",
      count: companies.government.length,
    },
  ];

  const getDisplayCompanies = () => {
    if (selectedCategory === "all") {
      return Object.values(companies).flat();
    }
    return companies[selectedCategory] || [];
  };

  return (
    <SearchableWrapper>
      <div className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Our Esteemed Corporate Partners
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200"
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getDisplayCompanies().map((company, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="w-full h-24 bg-white border border-slate-100 rounded-xl p-3 flex items-center justify-center mb-4 overflow-hidden">
                  <img
                    src={company.logo}
                    alt={`${company.name} official logo`}
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      if (company.fallbackLogo && e.target.src !== window.location.origin + company.fallbackLogo) {
                        e.target.src = company.fallbackLogo;
                      }
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {company.name}
                  </h3>
                  <p className="text-gray-500 text-xs">
                    {company.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default CampusRecruiters;
