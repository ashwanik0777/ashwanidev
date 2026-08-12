import React from "react";
import { FileText, Download, ExternalLink, ShieldCheck, CheckCircle2 } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const guidelinesData = [
  {
    sno: 1,
    title: "UGC Guidelines on Plagiarism",
    category: "Academic Integrity & Research",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/General/UGC_PublicNoticeDraftUGCRegulations_2Jan2018.pdf",
    format: "PDF Document"
  },
  {
    sno: 2,
    title: "Fellowship for GATE Qualified Students",
    category: "Student Financial Aid & Scholarships",
    pdfLink: "https://www.gbu.ac.in/Content/gbudata/General/GATE_Notice_9May2014.tif",
    format: "Notice Document"
  }
];

const Guidelines = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 pb-20">
        {/* Banner Section - No subtitle or description */}
        <BannerSection
          title="Guidelines"
          subtitle=""
          bgTheme={9}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Header Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-200 mb-8 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Official Guidelines & Government Orders (GO)
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  Gautam Buddha University Regulatory Notices & Orders
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-semibold shrink-0">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Official Regulatory Directives</span>
            </span>
          </div>

          {/* Guidelines Table Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-900 text-slate-100 uppercase tracking-wider text-xs font-semibold">
                    <th className="px-4 sm:px-6 py-4 text-center w-16">S.No.</th>
                    <th className="px-4 sm:px-6 py-4">Description / Subject</th>
                    <th className="px-4 sm:px-6 py-4 hidden sm:table-cell">Category</th>
                    <th className="px-4 sm:px-6 py-4 text-center w-36 sm:w-44">Action / Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium bg-white">
                  {guidelinesData.map((item) => (
                    <tr
                      key={item.sno}
                      className="hover:bg-amber-50/50 transition-colors duration-150"
                    >
                      <td className="px-4 sm:px-6 py-4 text-center font-bold text-amber-700">
                        {item.sno}
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="font-bold text-slate-900 text-sm sm:text-base">
                          {item.title}
                        </div>
                        <span className="inline-block sm:hidden text-[11px] font-medium text-slate-500 mt-0.5">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium border border-slate-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 text-center">
                        <a
                          href={item.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
                        >
                          <span>View Document</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Guidelines;
