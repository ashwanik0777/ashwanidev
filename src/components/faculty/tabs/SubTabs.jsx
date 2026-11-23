import React from "react";

/**
 * Sub-tab switcher inside a profile tab (e.g. Research Projects / Research Group).
 * The parent passes only the sub-tabs that have data; with one or none left
 * there is nothing to switch between, so no switcher is shown.
 * `tabs`: [{ id, label, icon }]
 */
const SubTabs = ({ tabs, active, onChange }) => {
  if (tabs.length < 2) return null;
  return (
    <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2 sm:gap-4 border-b border-gray-200" role="tablist">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const selected = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(tab.id)}
            className={`flex cursor-pointer items-center border-b-2 sm:border-b-4 pb-2 sm:pb-2.5 text-base sm:text-xl lg:text-2xl font-bold transition-colors duration-200 ${
              selected ? "border-blue-600 text-blue-600" : "border-transparent text-gray-700 hover:text-blue-600"
            }`}
          >
            <Icon className={`mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 shrink-0 ${selected ? "text-blue-600" : "text-gray-400"}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SubTabs;
