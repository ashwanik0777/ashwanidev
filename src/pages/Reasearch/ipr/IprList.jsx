import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

export default function IprList() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-10">
        {/* Patents [GRANTED] */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Patents [GRANTED]
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <div className="space-y-3 text-gray-700 text-base leading-relaxed bg-slate-50 p-5 rounded-xl border-l-4 border-emerald-500">
            <p>
              <strong>US Patent: </strong>Polysaccharide agents and methods of their use for removing solids from water. Inventors: Rajani Srinivasan, Anuradha Mishra, John McKinney.
            </p>
            <p>
              <strong>Assignee: </strong>THE TEXAS A&M UNIVERSITY SYSTEM. A part of the technology has been licensed by a Company Pristana LLC headed by Mr. John McKinney of Company Columbia Biogas, California.
            </p>
          </div>
        </div>

        {/* Patent [FILED] */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Patent [FILED]
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-base leading-relaxed">
            <li>
              <strong>Bhupendra Chaudhary,</strong> Sakshi Arora and Dhananjay Pandey (2018) Method of plant phenotype alteration via target-mimicry based diminution of miRNA167. India Patent Application No. 201811032478 A, 30 August 2018
            </li>
            <li>
              <strong>Vikrant Nain</strong> and Suman (2017) Sequences and procedures for high throughput assembly of TALE nucleases/TALE fusion proteins. (Patent Application No. 201711009831) 2017
            </li>
            <li>
              <strong>Bhupendra Chaudhary</strong> and Dhananjay Pandey (2017) Bioengineering of Cotton for Increased Floral Inception and Fiber Initiation. India Patent Application No. 201711026325 A, 04 August 2017
            </li>
            <li>
              <strong>Bhupendra Chaudhary</strong> and Dhananjay Pandey (2017) Method for enhanced tetrahydrofolate production by deregulation of allosteric inhibition of dihydroneopterin aldolase (DHNA). India Patent Application No. 201711000033 A, 05 January 2017
            </li>
            <li>
              <strong>Bhupendra Chaudhary</strong> and Dhananjay Pandey (2016) Methods of Producing Early Flowering and Enhanced Agronomic Traits in Plants. India Patent Application No. 201611036458 A, 28 October 2016
            </li>
            <li>
              <strong>Shakti Sahi and Vikrant Nain</strong> (2013) Methods and compositions for expression, purification, activation and enzyme assay of Leucyl amino peptidases (27/DEL/2013)
            </li>
            <li>
              <strong>Vikrant Nain and Shakti Sahi</strong> (2013) A synthetic gene encoding Plasmodium falciparum leucyl aminopeptidase PfA-M17 and uses thereof (28/DEL/2013)
            </li>
          </ul>
        </div>

        {/* Copyrights */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Copyrights
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <ul className="list-disc pl-6 space-y-3 text-gray-700 text-base leading-relaxed">
            <li>
              Saxena Pratiksha, Lokesh Sharma, Copyright of QSIM, L-53455/2013.
            </li>
            <li>
              Saxena Pratiksha, Tulsi Kushwaha, Copyright of SIMIN, L-53456/2013.
            </li>
            <li>
              Saxena Pratiksha, Abhinav Chaudhary, Sanchit Kumar, Satyavan Singh, Copyright of TRANSSIM, L-58410/2014.
            </li>
            <li>
              Pratiksha Saxena, Bhavya Nidhi Vats, L-62664/2015.
            </li>
            <li>
              Pratiksha Saxena, Neha Khanna, Copyright of SIMFEED, L-72258/2018.
            </li>
          </ul>
        </div>
      </div>
    </SearchableWrapper>
  );
}
