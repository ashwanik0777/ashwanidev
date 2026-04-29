import React from 'react';

const SchoolTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-24">
      <h3 className="bg-blue-800 text-white font-semibold py-4 px-6 text-lg">
        Departments & Info
      </h3>
      <ul className="flex flex-col">
        {tabs.map((tab) => (
          <li key={tab.id} className="border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-4 transition-colors hover:bg-blue-50 focus:outline-none ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-800 font-semibold border-l-4 border-blue-800'
                  : 'text-gray-700 font-medium border-l-4 border-transparent'
              }`}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SchoolTabs;
