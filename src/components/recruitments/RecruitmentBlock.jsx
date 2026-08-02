import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import RecruitmentContent from './RecruitmentContent';

const CATEGORY_HEADER_COLORS = {
  teaching: 'from-blue-800 to-blue-900',
  'non-teaching': 'from-emerald-800 to-emerald-900',
  'project-research': 'from-violet-800 to-violet-900',
  others: 'from-amber-800 to-amber-900',
};

const RecruitmentBlock = ({ title, type, icon, tabs: dynamicTabs = [] }) => {
  const Icon = icon;
  const [activeTab, setActiveTab] = useState('');

  const tabs = dynamicTabs;
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0] || null;

  useEffect(() => {
    if (tabs[0]?.id) {
      setActiveTab(tabs[0].id);
    }
  }, [type, dynamicTabs]);

  const headerGradient = CATEGORY_HEADER_COLORS[type] || CATEGORY_HEADER_COLORS.others;

  return (
    <motion.div
      className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className={`border-b border-slate-200 bg-gradient-to-r ${headerGradient} px-5 py-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/15 p-2 backdrop-blur-sm">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-wide">{title}</h2>
              <p className="text-xs text-white/60 mt-0.5">{tabs.length} position{tabs.length !== 1 ? 's' : ''} available</p>
            </div>
          </div>
          <div className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">
            {tabs.length}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5">
        {/* Tab Selector */}
        <div className="mb-4 flex min-h-[36px] items-center">
          {tabs.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && <ChevronRight className="h-3 w-3" />}
                </button>
              ))}
            </div>
          ) : tabs.length === 1 ? (
            <div className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white shadow-sm">
              {tabs[0].label}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No recruitment entries available.</p>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-grow flex flex-col">
          <RecruitmentContent tabId={activeTab} blockType={type} data={activeTabData} />
        </div>
      </div>
    </motion.div>
  );
};

export default RecruitmentBlock;
