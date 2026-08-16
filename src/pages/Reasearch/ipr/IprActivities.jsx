import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

export default function IprActivities() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Activities
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            {/* 2022-23 */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">2022-23</h3>
              <div className="space-y-3 pl-2">
                <p className="font-semibold text-slate-900">
                  1. Workshop on "Intellectual Property Rights (IPR): Patents & Designs Filings" on 30th September 2022
                </p>
                <p className="text-justify text-gray-700">
                  An online workshop on "Intellectual Property Rights (IPR): Patents & Designs Filings" was held on Friday, 30th September 2022 from 12:00pm-1:00 pm. This IPR workshop was organized by Intellectual Property Rights Cell (IPR Cell), Gautam Buddha University in association with Rajiv Gandhi National Institute Of Intellectual Property Management, Nagpur as part of the National IP Awareness Mission (NIPAM), Govt. of India.
                </p>
                <p className="text-justify text-gray-700">
                  The expert lecture was given by Mrs Pooja Vishal Maulikar, Examiner of Patents and Designs, Rajiv Gandhi National Institute Of Intellectual Property Management, Nagpur O/o CGPDTM, DPIIT, Ministry of Commerce & Industry - Govt. of India. The talk was focused on different types of Intellectual Properties and their relevance in today's globalization. The speaker also familiarized the participants with the process of filing the IPs, specifically the patents and copyrights. The role of Indian Patent office, its structure, processing of application, fee etc were also highlighted.
                </p>
                <p className="text-justify text-gray-700">
                  The workshop was held on CISCO-Webex platform. About 288 participants including faculties, students, and other professional from Gautam Buddha University and other institutes/universities attended the workshop.
                </p>
                <p className="text-justify text-gray-700 font-medium italic">
                  The workshop was coordinated by the IPR cell members Dr. Santosh Kumar Tiwari and Dr. Shakti Sahi.
                </p>
              </div>
            </div>

            {/* 2020-21 */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-3">2020-21</h3>
              <div className="pl-2">
                <p>
                  1. <a
                    href="https://gbu.ac.in/Conferences/IPR_worshopBrochure_20Feb2020.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-semibold underline"
                  >
                    Workshop on Intellectual Property Rights (IPR) on 5th March 2020 (Download Brochure)
                  </a>
                </p>
              </div>
            </div>

            {/* Previous Years */}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <h3 className="text-xl font-bold text-gray-900">2019-20</h3>
              <h3 className="text-xl font-bold text-gray-900">2018-19</h3>
              <h3 className="text-xl font-bold text-gray-900">2017-18</h3>
            </div>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
}
