import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trees, Building2, BookOpen, Trophy, Globe, Sparkles } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_STATS = [
  {
    id: 1,
    icon: Trees,
    value: "511 Acres",
    title: "Lush Green Campus",
    color: "from-green-500/10 to-emerald-500/10 border-green-500/20 text-green-600"
  },
  {
    id: 2,
    icon: Building2,
    value: "18",
    title: "Single-Seated Hostels",
    color: "from-blue-500/10 to-indigo-500/10 border-blue-500/20 text-blue-600"
  },
  {
    id: 3,
    icon: BookOpen,
    value: "2.5L+",
    title: "Library Book Collection",
    color: "from-purple-500/10 to-pink-500/10 border-purple-500/20 text-purple-600"
  },
  {
    id: 4,
    icon: Trophy,
    value: "3,000+",
    title: "Stadium Seating Capacity",
    color: "from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600"
  },
  {
    id: 5,
    icon: Globe,
    value: "15+",
    title: "Countries Represented",
    color: "from-sky-500/10 to-cyan-500/10 border-sky-500/20 text-sky-600"
  }
];

const CampusStats = () => {
  const [stats] = useState(GBU_STATS);

  return (
    <SearchableWrapper>
      <div className="py-16 bg-slate-50 relative overflow-hidden font-sans border-y border-slate-100">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-extrabold text-slate-900 flex items-center justify-center gap-2 tracking-tight">
              <span>Campus Life Statistics</span>
            </h3>
            <p className="text-slate-500 text-sm mt-2">A quick numeric glance at our campus infrastructure and diversity.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.03] text-center flex flex-col items-center justify-center relative overflow-hidden group`}
              >
                {/* Background soft glow gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-4 border border-slate-100/80 transition-all duration-300 group-hover:scale-110 group-hover:bg-white`}>
                    <stat.icon size={22} className="transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-black text-slate-900 mb-1 tracking-tight">{stat.value}</div>
                  <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default CampusStats;
