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
    <div className="mb-8 flex flex-wrap items-center gap-4" role="tablist">
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
            className={`flex cursor-pointer items-center border-b-4 pb-2 text-xl font-bold transition-colors duration-200 sm:text-2xl ${
              selected ? "border-blue-600 text-blue-600" : "border-transparent text-gray-900 hover:text-blue-600"
            }`}
          >
            <Icon className={`mr-2 h-6 w-6 ${selected ? "text-blue-600" : "text-gray-400"}`} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default SubTabs;
