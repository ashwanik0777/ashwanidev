import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

const IPRObjectives = () => {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-10">
        {/* About Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            About
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <ul className="space-y-4 text-gray-700 text-base leading-relaxed list-disc pl-5">
            <li className="text-justify">
              Gautam Buddha University was established in the year 2008 by the Uttar Pradesh Act (9) of 2002. The University is recognized by the University Grants Commission of India under section 2(f) of UGC Act 1956 and approved by UGC under section 12-B. The University had initiated research activities since its inception with the help of qualified faculty members and ambitious students. The University aspires to conduct R&D in diverse areas aiming to cover the full spectrum, from fundamental and theoretical studies, through research of relevance to business and industry with practice-based studies in Science, Engineering, Management, and allied areas.
            </li>
            <li className="text-justify">
              The focus of the University in promoting interdisciplinary research is to bring together experts from a variety of disciplines to identify challenges and deliver practical solutions. University also guides and encourages the faculty members to propose new research projects and ideas to carry out innovative research, apply for externally funded research projects to different national and international funding agencies, and also in helping the researchers in filing the Intellectual Properties (IPs) generated and protecting their rights.
            </li>
            <li className="text-justify">
              Intellectual Property Rights given to the inventor(s) to control the use of his/her new creations or inventions for a limited period of time are vital for the socio-economic prosperity of the nation. These rights help in promoting creativity and inventiveness through dissemination of new knowledge or products and encourage fair competition.
            </li>
          </ul>
        </div>

        {/* Objectives Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Objectives
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Considering the requirement, an IPR Cell has been established at Gautam Buddha University in association with Council of Science and Technology (CST), Uttar Pradesh promoting and disseminating issues related to IPR through following objectives:
          </p>

          <div className="bg-slate-50 border-l-4 border-amber-500 p-6 rounded-r-xl">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Training, Awareness & Protection of IPRs
            </h3>
            <ul className="space-y-3 text-gray-700 text-base leading-relaxed list-disc pl-5">
              <li>
                To create awareness amongst potential researchers of the University (students/faculty members) on basics of IPRs, especially patents & copyrights.
              </li>
              <li>
                To encourage the students & faculty members to carry out patent searches in-house and/or at PIC and to fine-tune their research objectives.
              </li>
              <li>
                To conduct workshops and seminars on IP-related issues and contemporary topics of discussion.
              </li>
              <li>
                To motivate the innovators promoting to generate new ideas and further guiding in alliance with University Incubation Center.
              </li>
              <li>
                To facilitate the filing of IPs through their timely clearance and forwarding to the Patent Office.
              </li>
              <li>
                To bridge between the University and Patent Information Centre, CST, UP.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default IPRObjectives;
