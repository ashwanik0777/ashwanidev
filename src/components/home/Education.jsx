import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeData from '../../Data/home.json';

import aiLab from '../../assets/coe/aiLab.jpg'; 
import drone from '../../assets/coe/drone.avif';
import cyber from '../../assets/coe/cyber.webp';
import biotech from '../../assets/coe/biotech.webp';
import ccc from '../../assets/coe/ccc.jpg';
import smart from '../../assets/coe/smart.webp';
import material from '../../assets/coe/material.jpg';

const BASE = (import.meta.env.VITE_HOST || '').replace(/\/$/, '');

const categoryMap = {
  'Centers of Excellence': 'centers of excellence',
  'Research Labs': 'research labs',
  'Infrastructure': 'infrastructure',
};

const gradientMap = {
  'centers of excellence': 'from-purple-600 to-blue-600',
  'research labs': 'from-green-500 to-emerald-600',
  'infrastructure': 'from-indigo-600 to-purple-700',
};

const iconMap = {
  'centers of excellence': '🤖',
  'research labs': '🧪',
  'infrastructure': '🏢',
};

const manualImageMap = {
  "Artificial Intelligence Center": aiLab,
  "Drone Technology Hub":drone,
  "Cybersecurity Institute":cyber ,
  "Bioinformatics Lab": biotech,
  "High Performance Computing Center": ccc,
  "Smart Campus Network":smart,
  "Materials Research Facility": material,

};


const linkMap = {
  'centers of excellence': '/research/research-centers',
  'research labs': '/research/research-centers',
  'infrastructure': '/campus-life/hero',
};

export default function ExcellenceSection() {
  const [activeTab, setActiveTab] = useState('Centers of Excellence');
  const [groupedData, setGroupedData] = useState({
    'Centers of Excellence': [],
    'Research Labs': [],
    'Infrastructure': [],
  });

  useEffect(() => {
    const json = homeData?.sections?.excellence_in_education || [];

    const grouped = {
      'Centers of Excellence': [],
      'Research Labs': [],
      'Infrastructure': [],
    };

    json.forEach(item => {
      const category = item.category?.toLowerCase().trim();

      for (const [label, key] of Object.entries(categoryMap)) {
        if (category === key.toLowerCase().trim()) {
          grouped[label].push({
            ...item,
            gradient: gradientMap[key] || 'from-gray-500 to-gray-600',
            icon: iconMap[key] || '📌',
            link: linkMap[key] || '/campus-life/hero',
          });
          break;
        }
      }
    });

    setGroupedData(grouped);
  }, []);

  const tabs = Object.keys(categoryMap);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return "https://via.placeholder.com/600x400?text=No+Image";
    return imgPath.includes("http")
      ? imgPath
      : imgPath.startsWith("/")
        ? imgPath
      : `${BASE}/${imgPath.startsWith("media") ? "" : "media/"}${imgPath}`;
  };

  return (
    <div className="relative bg-gray-50 overflow-hidden">
      <div className="relative z-10 px-6 md:px-20 py-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-indigo-800 via-purple-700 to-blue-600 bg-clip-text text-transparent mb-4 tracking-tight">
            Excellence in Education
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg mt-6 max-w-2xl mx-auto">
            Discover our world-class facilities and cutting-edge research infrastructure
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-2 border border-gray-200 shadow-lg">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-semibold text-sm rounded-xl transform hover:scale-105 transition-transform duration-100 ${activeTab === tab
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {(groupedData[activeTab] || []).map((item, index) => (
            <Link
              to={item.link}
              key={`${activeTab}-${index}`}
              className="group relative bg-white backdrop-blur-xl rounded-3xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transform hover:scale-102 transition-all duration-150 block"
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-5 rounded-3xl`}></div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={manualImageMap[item.title] || getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className={`absolute inset-0 opacity-60`}></div>
                <div className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
              </div>

              <div className="text-center p-6 relative">
                <h3 className="font-bold text-xl text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.content_text}
                </p>
                <div className={`h-1 bg-gradient-to-r ${item.gradient} mt-4 rounded-full`}></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore Button */}
        <div className="text-center mt-12">
          <Link to={linkMap[activeTab.toLowerCase().trim()] || '/campus-life/hero'}>
            <button className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 group overflow-hidden animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping"></div>
              <span className="relative z-10 flex items-center gap-2">
                Explore {activeTab}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-30 bg-white animate-ping group-active:animate-pulse"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
