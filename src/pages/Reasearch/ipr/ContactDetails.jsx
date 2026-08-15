import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

export default function ContactDetails() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-100 shadow-sm space-y-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Contact Details
          </h2>
          <div className="h-1 w-20 bg-amber-500 rounded-full mb-6"></div>

          <div className="max-w-2xl bg-slate-50 border border-gray-200 rounded-xl overflow-hidden shadow-xs">
            <div className="bg-slate-100 px-5 py-3 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Dr. Shakti Sahi</h3>
            </div>

            <div className="p-6 space-y-3 text-base text-gray-700">
              <div className="text-lg font-semibold text-blue-700 mb-2">
                Nodal Officer
              </div>

              <p>
                <strong>Address : </strong> IPR Cell, Gautam Buddha University, Greater Noida- 201310
              </p>

              <p>
                <strong>Email : </strong>
                <a href="mailto:iprcell@gbu.ac.in" className="text-blue-600 hover:underline">
                  iprcell@gbu.ac.in
                </a>
              </p>

              <p>
                <strong>Phone No. : </strong> -
              </p>
            </div>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
}
