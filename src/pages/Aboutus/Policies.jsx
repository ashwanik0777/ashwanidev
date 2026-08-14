import React from 'react';
import { FileText, ShieldCheck, Building2, Layers } from 'lucide-react';

import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import BannerSection from "../../components/HeroBanner.jsx";

const Policies = () => {
  const policyStatement = `The procedure and policies for maintaing and utilizing physical and support facilities are as per the rules and regulations issued by the Govt. from time to time. First of all the estimates are prepared as per the norms and then it is sent for the financial and administrative approval of competent authority. After the approval, the tenders are floated through wide publicity in newspapers and E tenders. After this, the work is awarded to the lowest firm. After the time completion, new tenders are again floated and the same procedures are followed again. The different facilities are utilized by the students/faculty/staff and the families of faculty staff being the residential campus. From time to time new facilities are added as per the requirements. The policies are made by different internal committees and the recommendations are sent for the approval.`;

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
        {/* Hero Section */}
        <BannerSection
          title="Procedure & Policies"
          subtitle="Maintaining & Utilizing Physical and Support Facilities"
          bgTheme={1}
        />

        {/* Content Section */}
        <section className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-teal-100 p-6 sm:p-10 transition-all duration-300">
              
              {/* Header Badge */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-teal-50 text-teal-700 rounded-2xl border border-teal-100 shadow-sm">
                  <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
                    Institutional Maintenance & Facility Guidelines
                  </h2>
                  <p className="text-xs sm:text-sm text-teal-700 font-semibold mt-0.5">
                    Official University Compliance Statement
                  </p>
                </div>
              </div>

              <hr className="border-slate-100 mb-6" />

              {/* Policy Body */}
              <div className="prose max-w-none">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed sm:leading-loose text-justify font-medium">
                  {policyStatement}
                </p>
              </div>

              {/* Structured Key Principles */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <ShieldCheck className="w-5 h-5 text-teal-600 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Government Norms</h4>
                  <p className="text-xs text-slate-600">Estimates and approvals per Govt. rules</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <FileText className="w-5 h-5 text-teal-600 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">E-Tendering</h4>
                  <p className="text-xs text-slate-600">Wide publicity & transparent tendering</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                  <Layers className="w-5 h-5 text-teal-600 mx-auto mb-2" />
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">Committee Review</h4>
                  <p className="text-xs text-slate-600">Internal committee recommendations</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default Policies;
