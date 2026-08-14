import React from 'react';
import {
  FileText,
  Award,
  ShieldCheck,
  ExternalLink,
  Building2,
  FileCheck2
} from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const mandatoryDisclosuresData = [
  {
    sno: 1,
    title: "AICTE approved Courses",
    category: "Approval & Recognition",
    icon: ShieldCheck,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/AICTE_approved_courses.pdf"
      }
    ]
  },
  {
    sno: 2,
    title: "Approved Letter by UGC under Section 12 B",
    category: "UGC Approvals",
    icon: FileCheck2,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/UGC_12BCertificate_28June19.pdf"
      }
    ]
  },
  {
    sno: 3,
    title: "Approved Letter by UGC under Section 2(f)",
    category: "UGC Approvals",
    icon: FileCheck2,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/UGC-GBU%202f.pdf"
      }
    ]
  },
  {
    sno: 4,
    title: "NAAC accredition with B+ Grade",
    category: "Accreditation",
    icon: Award,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/NAAC%20Certificate_31Dec18.jpg"
      }
    ]
  },
  {
    sno: 5,
    title: "Recognition Order from National Council for Teacher Education",
    category: "Council Recognition",
    icon: Building2,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/Deppt_Education_NCT_17May2017.pdf"
      }
    ]
  },
  {
    sno: 6,
    title: "ISO Manual and Certificate",
    category: "Certifications",
    icon: Award,
    links: [
      {
        label: "Quality Manual",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/Certificate.pdf"
      },
      {
        label: "Certificate",
        url: "https://www.gbu.ac.in/Content/gbudata/approval/Quality_Manual.pdf"
      }
    ]
  },
  {
    sno: 7,
    title: "MoU between GBU and NSDC for introducing Skill Development Programmes in University",
    category: "MoUs & Collaborations",
    icon: FileText,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/General/MOU_NSDC_DOC_1July15.pdf"
      }
    ]
  },
  {
    sno: 8,
    title: "Certificate for Educational Society Registration",
    category: "Society Registration",
    icon: ShieldCheck,
    links: [
      {
        label: "View Document",
        url: "https://www.gbu.ac.in/Content/gbudata/General/GBU_SocietyRegistration.pdf"
      }
    ]
  }
];

const Disclosures = () => {
  return (
    <SearchableWrapper>
      <>
        {/* Hero Banner Section */}
        <BannerSection
          title="Mandatory Disclosures"
          subtitle="Statutory Approvals, Recognition Orders, MoUs, and Official Compliance Documents"
          bgTheme={9}
        />

        {/* Mandatory Disclosures Table Section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 via-teal-50/40 to-slate-100 min-h-screen">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            
            {/* Table View */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-teal-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-slate-100 text-xs sm:text-sm uppercase font-semibold tracking-wider">
                      <th scope="col" className="py-4 px-6 text-center w-16">S.No.</th>
                      <th scope="col" className="py-4 px-6">Description</th>
                      <th scope="col" className="py-4 px-6 text-center w-56 sm:w-64">Download Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700 text-sm font-medium">
                    {mandatoryDisclosuresData.map((item) => (
                      <tr
                        key={item.sno}
                        className="hover:bg-teal-50/60 transition-colors duration-150 group"
                      >
                        {/* S.No */}
                        <td className="py-5 px-6 text-center font-bold text-teal-700 group-hover:text-teal-900">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 group-hover:bg-teal-100 border border-teal-200">
                            {item.sno}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="py-5 px-6">
                          <div className="flex items-start gap-3">
                            <div className="p-2 rounded-lg bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors mt-0.5 hidden sm:block">
                              <item.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="text-base font-semibold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                                {item.title}
                              </h3>
                              <span className="inline-block mt-1 text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                                {item.category}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Links */}
                        <td className="py-5 px-6 text-center">
                          <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                            {item.links.map((link, lIdx) => (
                              <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 w-full sm:w-auto"
                              >
                                <span>{link.label}</span>
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </section>
      </>
    </SearchableWrapper>
  );
};

export default Disclosures;

