import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

export default function IprCourses() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Intellectual Property Rights, Biosafety and Bioethics
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <div className="space-y-6 text-gray-700 text-base leading-relaxed">
            <p>
              <strong>A. </strong> School of Biotechnology offers a 03 Credit course on <strong>'Intellectual Property Rights, Biosafety and Bioethics'</strong> in the 9th semester of Integrated B.Tech.-M.Tech. (Biotechnology) and 3rd Semester of M.Tech. (Biotechnology) programs. The objectives of this course are:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>
                To provide basic knowledge on intellectual property rights and their implications in biological research and product development.
              </li>
              <li>
                To become familiar with India’s IPR Policy.
              </li>
              <li>
                To learn biosafety and risk assessment of products derived from biotechnology and regulation of such products.
              </li>
              <li>
                To become familiar with ethical issues in biological research.
              </li>
            </ul>

            <p className="pt-4">
              <strong>B. </strong> School of Vocational Studies and Applied Sciences offers a 02 Credit course on <strong>'Patent Law and IPR issues'</strong> in the 3rd semester of M.Sc. Applied Chemistry and another 02 Credit course on <strong>'Intellectual Property Rights'</strong> in B.Sc. Physical Sciences. The objectives of these courses are:
            </p>

            <ul className="list-disc pl-6 space-y-2">
              <li>To apprise the students about the multifaceted dimensions of IP issues.</li>
              <li>To introduce them to the basic aspects of Intellectual Property and various rights associated with them.</li>
              <li>To create an awareness about the maintenance and protection of IP.</li>
              <li>To give them a knowhow of India’s IP policy and its placement among different international treaties.</li>
            </ul>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
}
