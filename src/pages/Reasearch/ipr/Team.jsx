import React from 'react';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

const peopleList = [
  {
    name: 'Dr. Shakti Sahi',
    department: 'School of Biotechnology, GBU',
    designation: 'Nodal Officer'
  },
  {
    name: 'Dr. Bhupendra Chaudhary',
    department: 'School of Biotechnology, GBU',
    designation: 'Member (Biotechnology Stream)'
  },
  {
    name: 'Dr. Tanvi Vats',
    department: 'Department of Applied Chemistry, GBU',
    designation: 'Member (Science Stream)'
  },
  {
    name: 'Dr. Santosh Tiwari',
    department: 'Department of Law, GBU',
    designation: 'Member (Law Discipline)'
  },
  {
    name: 'Dr. Rakesh Srivastava',
    department: 'Department of Management, GBU',
    designation: 'Member (HRD)'
  },
  {
    name: 'Dr. Vinay Kumar Litoria',
    department: 'Director CRC',
    designation: 'Member (Placement Cell)'
  },
  {
    name: 'Dr. Radhey Lal',
    department: 'Joint Director & Incharge Patent Information Center CST, U.P.',
    designation: 'External Member'
  },
  {
    name: 'Ms. Sangeeta Nagar',
    department: 'Scientist E, PFC, TIFAC, New Delhi',
    designation: 'External Member'
  }
];

export default function Team() {
  return (
    <SearchableWrapper>
      <div className="bg-white rounded-2xl p-4 sm:p-8 lg:p-10 border border-gray-100 shadow-sm">
        <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-1">
          List Of People
        </h2>
        <div className="h-1 w-16 sm:w-20 bg-amber-500 rounded-full mb-6 sm:mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {peopleList.map((person, index) => (
            <div
              key={index}
              className="bg-slate-50/80 rounded-xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="bg-slate-100 px-4 sm:px-5 py-2.5 sm:py-3 border-b border-gray-200">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {person.name}
                </h3>
              </div>
              <div className="p-4 sm:p-5 space-y-1">
                <div className="text-xs sm:text-sm font-semibold text-blue-700">
                  {person.department}
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {person.designation}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SearchableWrapper>
  );
}
