import React from 'react';
import { 
  ExternalLink, 
  CheckCircle2, 
  Globe
} from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const NAD_HERO = {
  title: "National Academic Depository (NAD)",
  subtitle: "24x7 digital storehouse of verified academic awards, degrees, and certificates.",
  bgTheme: 1
};

const NAD_MANDATES = [
  "Operate in a fully online mode ensuring round-the-clock global accessibility.",
  "Allow lodging of Academic awards in a digital format, maintaining the integrity of access to the database and of the awards lodged in the database.",
  "Allow students to retrieve their lodged academic awards at any time without physical paper dependency.",
  "Allow employers and other authorized entities (with prior student consent) to verify the authenticity of any academic award.",
  "Maintain the highest standards of authenticity, integrity, security, and confidentiality of the national database."
];

const NationalAcademicDepository = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Banner */}
        <BannerSection
          title={NAD_HERO.title}
          subtitle={NAD_HERO.subtitle}
          bgTheme={NAD_HERO.bgTheme}
        />

        {/* About Section - Official Details */}
        <section id="about-nad" className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="mb-10">
              <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Official Information
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-3 mb-2">
                About National Academic Depository (NAD)
              </h2>
              <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-6"></div>
              
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                The vision of <strong>National Academic Depository (NAD)</strong> is born out of an initiative to provide an online store house of all academic awards. NAD is a 24x7 online store house of all academic awards viz. <strong>certificates, diplomas, degrees, mark-sheets etc.</strong> duly digitised and lodged by academic institutions / boards / eligibility assessment bodies. NAD not only ensures easy access to and retrieval of an academic award but also validates and guarantees its authenticity and safe storage.
              </p>
            </div>

            {/* Key Mandates & Objectives */}
            <div className="bg-slate-50 rounded-2xl p-6 md:p-8 border border-slate-200 mb-10 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-green-600" /> Key Mandates & Objectives of NAD:
              </h3>

              <div className="space-y-4">
                {NAD_MANDATES.map((mandate, idx) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">{mandate}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Website Action Banner */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div>
                <h3 className="text-xl font-bold mb-1">Visit Official NAD Government Website</h3>
                <p className="text-emerald-100 text-sm">Access the official Ministry of Education NAD portal for comprehensive details.</p>
              </div>
              <a
                href="https://nad.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white hover:bg-emerald-50 text-emerald-800 font-bold px-6 py-3 rounded-xl text-sm transition-all whitespace-nowrap shadow-md flex items-center gap-2"
              >
                Visit nad.gov.in <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default NationalAcademicDepository;
