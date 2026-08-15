import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trees, Sun, Droplet, Bike, RefreshCw, Leaf, Sparkles, Award } from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_ECO_INTRO = {
  description: "Gautam Buddha University is dedicated to fostering a sustainable future. Set within a sprawling 511-acre green campus, GBU operates as a thriving ecological sanctuary. We continuously implement solar grids, optimize water resources through harvesting, recycle waste, and preserve native bio-diversity to achieve a near carbon-neutral ecosystem."
};

const GBU_ECO_STATS = [
  { id: 1, icon: Trees, value: "20,000+", title: "Planted Trees", color: "text-green-600 bg-green-50" },
  { id: 2, icon: Sun, value: "1.5 MW", title: "Solar Power Grid", color: "text-amber-600 bg-amber-50" },
  { id: 3, icon: Droplet, value: "100%", title: "Rainwater Harvest", color: "text-blue-600 bg-blue-50" },
  { id: 4, icon: Bike, value: "Zero Em.", title: "Bicycle Campus", color: "text-sky-600 bg-sky-50" }
];

const GBU_ECO_INITIATIVES = [
  {
    id: 1,
    image: "/assets/completegbu.webp",
    title: "Solar Energy Projects",
    description: "Wide-scale installation of rooftop solar photovoltaic panels across academic blocks, research modules, and hostel rooftops, significantly cutting energy bills.",
    impact_value: "40% Grid Red.",
    impact_label: "Reduction in conventional grid electricity consumption campus-wide",
    icon: Sun,
    accent: "amber"
  },
  {
    id: 2,
    image: "/assets/about.jpg",
    title: "Water Abundance Projects",
    description: "Integrated rainwater harvesting structures across all primary structures replenishing aquifers, and a Sewage Treatment Plant (STP) recycling water for horticulture.",
    impact_value: "10M+ Liters",
    impact_label: "Liters of sewage & rainwater recycled and utilized for gardening annually",
    icon: Droplet,
    accent: "blue"
  }
];

const EcoCampus = () => {
  const [stats] = useState(GBU_ECO_STATS);

  return (
    <SearchableWrapper>
      <section id="eco-campus" className="py-16 bg-gradient-to-b from-green-50/70 to-white relative overflow-hidden font-sans text-left">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">

          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight"
            >
              Eco-Friendly Campus
            </motion.h2>
          </div>

          {/* Environmental Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center mb-4 ${stat.color}`}>
                  {React.createElement(stat.icon, { size: 20 })}
                </div>
                <div className="text-2xl font-black text-slate-950 mb-1">{stat.value}</div>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.title}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default EcoCampus;
