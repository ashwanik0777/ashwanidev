import { useState } from "react";
import { Grid, LayoutGrid } from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

// Import school placement logos from ICT
import logoSamsung from "../../assets/ICT/Placement/logo/samsung.webp";
import logoTcs from "../../assets/ICT/Placement/logo/tcs.webp";
import logoAdobe from "../../assets/ICT/Placement/logo/adobe.webp";
import logoTechMahindra from "../../assets/ICT/Placement/logo/tech.webp";
import logoMetro from "../../assets/ICT/Placement/logo/metro.webp";
import logoByjus from "../../assets/ICT/Placement/logo/byjus.webp";
import logoNagarro from "../../assets/ICT/Placement/logo/nagrro.webp";
import logoApple from "../../assets/ICT/Placement/logo/apple.webp";
import logoWhiteHat from "../../assets/ICT/Placement/logo/white.webp";
import logoHexaware from "../../assets/ICT/Placement/logo/hexaware.webp";
import logoBlinkit from "../../assets/ICT/Placement/logo/blink-it-logo.webp";
import logoToppr from "../../assets/ICT/Placement/logo/Toppr_logo.webp";
import logoWipro from "../../assets/ICT/Placement/logo/wipro.webp";
import logoScaler from "../../assets/ICT/Placement/logo/scaler.webp";
import logoChegg from "../../assets/ICT/Placement/logo/Chegg-Logo.webp";

const CampusRecruiters = () => {
  const [viewMode, setViewMode] = useState("marquee"); // 'marquee' or 'grid'
  const [pausedRows, setPausedRows] = useState({
    row1: false,
    row2: false,
    row3: false,
    row4: false,
    row5: false,
    row6: false,
  });

  const toggleRowPause = (rowKey, isPaused) => {
    setPausedRows((prev) => ({ ...prev, [rowKey]: isPaused }));
  };

  const companies = [
    // 60 Total Logos (10 for each of the 6 animated rows)
    // Row 1 (0..10)
    { name: "TCS", logo: logoTcs, fallbackLogo: "/company_logos/tcs.svg" },
    { name: "Infosys", logo: "/assets/companies/infosys.jpg", fallbackLogo: "/company_logos/infosys.svg" },
    { name: "Wipro", logo: "/assets/companies/wipro.png", fallbackLogo: logoWipro },
    { name: "IBM", logo: "/assets/companies/ibm.jpg", fallbackLogo: "/company_logos/ibm.svg" },
    { name: "L&T", logo: "/company_logos/lnt.svg", fallbackLogo: "/company_logos/lnt.png" },
    { name: "BHEL", logo: "/assets/companies/bhel.svg", fallbackLogo: "/company_logos/bhel.png" },
    { name: "ONGC", logo: "/assets/companies/ongc.webp", fallbackLogo: "/company_logos/ongc.png" },
    { name: "Deloitte", logo: "/assets/companies/Deloitte.jpg", fallbackLogo: "/company_logos/deloitte.svg" },
    { name: "EY", logo: "/assets/companies/EY.webp", fallbackLogo: "/company_logos/ey.svg" },
    { name: "KPMG", logo: "/assets/companies/KPMG.png", fallbackLogo: "/company_logos/kpmg.svg" },

    // Row 2 (10..20)
    { name: "DRDO", logo: "/assets/companies/drdo.svg", fallbackLogo: "/company_logos/drdo.png" },
    { name: "ISRO", logo: "/assets/companies/isro.svg", fallbackLogo: "/company_logos/isro.png" },
    { name: "BARC", logo: "/assets/companies/barc.png", fallbackLogo: "/company_logos/barc.svg" },
    { name: "HCL", logo: "/assets/companies/png-hcl.png" },
    { name: "Oppo", logo: "/assets/companies/oppo.svg" },
    { name: "Paytm", logo: "/assets/companies/paytm.webp" },
    { name: "Justdial", logo: "/assets/companies/justdial.webp" },
    { name: "Yes Bank", logo: "/assets/companies/yes bank.webp" },
    { name: "Berger Paints", logo: "/assets/companies/berger.png" },
    { name: "Cadence", logo: "/assets/companies/cadence.jpg" },

    // Row 3 (20..30)
    { name: "Astrea IT", logo: "/assets/companies/astrea it.png" },
    { name: "Lucideus", logo: "/assets/companies/Lucidues.jpeg" },
    { name: "Arena Animation", logo: "/assets/companies/arena.webp" },
    { name: "C7S", logo: "/assets/companies/c7S.jpeg" },
    { name: "Journals UB", logo: "/assets/companies/journals ub.png" },
    { name: "Biocon", logo: "/assets/companies/Biocon.jpeg" },
    { name: "Johnson & Johnson", logo: "/assets/companies/Johnson & Johnson.png" },
    { name: "Patanjali", logo: "/assets/companies/Patanjali.png" },
    { name: "Daiichi Sankyo India", logo: "/assets/companies/Daiichi Sankyo India.png" },
    { name: "Genetix Asia", logo: "/assets/companies/Genetix Asia.png" },

    // Row 4 (30..40)
    { name: "IDS Infotech", logo: "/assets/companies/IDS Infotech.png" },
    { name: "Panacea", logo: "/assets/companies/Panacea.png" },
    { name: "Alere Medical", logo: "/assets/companies/Alere Medical.png" },
    { name: "Zydus Cadila", logo: "/assets/companies/Zydus Cadila.png" },
    { name: "Bioglobe Research Solutions", logo: "/assets/companies/Bioglobe Research Solutions.jpg" },
    { name: "Samsung", logo: logoSamsung },
    { name: "Adobe", logo: logoAdobe },
    { name: "Tech Mahindra", logo: logoTechMahindra },
    { name: "Apple", logo: logoApple },
    { name: "Nagarro", logo: logoNagarro },

    // Row 5 (40..50)
    { name: "Hexaware", logo: logoHexaware },
    { name: "Blinkit", logo: logoBlinkit },
    { name: "Byju's", logo: logoByjus },
    { name: "Scaler", logo: logoScaler },
    { name: "Chegg", logo: logoChegg },
    { name: "Toppr", logo: logoToppr },
    { name: "WhiteHat Jr", logo: logoWhiteHat },
    { name: "Metro", logo: logoMetro },
    { name: "Siemens", logo: "/assets/companies/Siemens.webp" },
    { name: "Axis Bank", logo: "/assets/companies/axis.webp" },

    // Row 6 (50..60)
    { name: "Coca-Cola", logo: "/assets/companies/coco cola.jpg" },
    { name: "Godrej", logo: "/assets/companies/godrej.webp" },
    { name: "Hero Motors", logo: "/assets/companies/hero.svg" },
    { name: "Mother Dairy", logo: "/assets/companies/mother dairy.png" },
    { name: "NDTV", logo: "/assets/companies/ndtv.png" },
    { name: "Nestle", logo: "/assets/companies/nestle.jpg" },
    { name: "Times of India", logo: "/assets/companies/times of india.png" },
    { name: "Unacademy", logo: "/assets/companies/unacademy.png" },
    { name: "Zee Media", logo: "/assets/companies/zee media.webp" },
    { name: "Swiggy", logo: "/company_logos/swiggy.svg", fallbackLogo: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg" },
  ];

  // 6 distinct rows of 10 items each
  const rows = [
    { id: "row1", direction: "left", items: companies.slice(0, 10) },
    { id: "row2", direction: "right", items: companies.slice(10, 20) },
    { id: "row3", direction: "left", items: companies.slice(20, 30) },
    { id: "row4", direction: "right", items: companies.slice(30, 40) },
    { id: "row5", direction: "left", items: companies.slice(40, 50) },
    { id: "row6", direction: "right", items: companies.slice(50, 60) },
  ];

  return (
    <SearchableWrapper>
      <style>{`
        @keyframes marqueeSlowLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeSlowRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-slow-left {
          display: flex;
          width: max-content;
          animation: marqueeSlowLeft 65s linear infinite;
        }
        .animate-marquee-slow-right {
          display: flex;
          width: max-content;
          animation: marqueeSlowRight 65s linear infinite;
        }
        .animate-marquee-slow-left.paused,
        .animate-marquee-slow-right.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div className="py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Our Esteemed Corporate Partners
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mt-4 rounded-full" />

            {/* View Mode Toggle Controls */}
            <div className="flex justify-center mt-5">
              <div className="bg-slate-100 p-1 rounded-2xl border border-slate-200 inline-flex gap-1 shadow-inner">
                <button
                  onClick={() => setViewMode("marquee")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    viewMode === "marquee"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  Animated Streams
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    viewMode === "grid"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  Full View
                </button>
              </div>
            </div>
          </div>

          {/* MODE 1: 6-Row Smooth Infinite Marquee Stream (10 logos per row) */}
          {viewMode === "marquee" && (
            <div className="space-y-4">
              {rows.map((row) => {
                const trackItems = [...row.items, ...row.items];
                const animClass = row.direction === "left" ? "animate-marquee-slow-left" : "animate-marquee-slow-right";
                const isPaused = pausedRows[row.id];

                return (
                  <div
                    key={row.id}
                    className="overflow-hidden py-1 cursor-pointer"
                    onMouseEnter={() => toggleRowPause(row.id, true)}
                    onMouseLeave={() => toggleRowPause(row.id, false)}
                  >
                    <div className={`${animClass} gap-4 ${isPaused ? "paused" : ""}`}>
                      {trackItems.map((company, idx) => (
                        <div
                          key={`${row.id}-${idx}`}
                          className="flex-shrink-0 w-40 sm:w-48 h-24 p-3 sm:p-4 bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group overflow-hidden"
                        >
                          <img
                            src={company.logo}
                            alt={company.name}
                            title={company.name}
                            className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              if (company.fallbackLogo && e.target.src !== window.location.origin + company.fallbackLogo) {
                                e.target.src = company.fallbackLogo;
                              }
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* MODE 2: Full Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 transition-all duration-500">
              {companies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center h-28 group overflow-hidden cursor-pointer"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    title={company.name}
                    className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      if (company.fallbackLogo && e.target.src !== window.location.origin + company.fallbackLogo) {
                        e.target.src = company.fallbackLogo;
                      }
                    }}
                  />
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default CampusRecruiters;
