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

const GBU_ECO_IMPACTS = [
  {
    id: 1,
    icon: Sun,
    title: "Renewable Power",
    description: "Solar energy is fed directly into the campus mini-grid, illuminating hostels, classrooms, and peripheral street lamps."
  },
  {
    id: 2,
    icon: Droplet,
    title: "Zero Waste Water",
    description: "Recycled greywater from the in-house STP is reused to nourish green zones and landscaped parks."
  },
  {
    id: 3,
    icon: RefreshCw,
    title: "Solid Waste Composting",
    description: "Leaves and dry biomass are converted to premium organic manure inside composting units for organic farming."
  },
  {
    id: 4,
    icon: Trees,
    title: "Rich Bio-diversity Hub",
    description: "Home to native flora, migratory birds, peacocks, and various wildlife species thriving in protected dense woodlands."
  }
];

const EcoCampus = () => {
  const [intro] = useState(GBU_ECO_INTRO);
  const [stats] = useState(GBU_ECO_STATS);
  const [initiatives] = useState(GBU_ECO_INITIATIVES);
  const [impacts] = useState(GBU_ECO_IMPACTS);

  return (
    <SearchableWrapper>
      <section id="eco-campus" className="py-24 bg-gradient-to-b from-green-50/70 to-white relative overflow-hidden font-sans text-left">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider mb-4 border border-green-100"
            >
              <Leaf size={13} />
              <span>Sustainability Initiatives</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              Eco-Friendly Campus
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 text-lg leading-relaxed font-normal"
            >
              {intro.description}
            </motion.p>
          </div>

          {/* Environmental Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
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

          {/* Sustainability Initiatives */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {initiatives.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 md:grid-cols-12"
              >
                <div className="h-56 md:h-auto md:col-span-5 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white">
                    {React.createElement(item.icon, { size: 18 })}
                  </div>
                </div>
                <div className="p-8 md:col-span-7 flex flex-col justify-between text-left">
                  <div>
                    <h3 className="text-xl font-bold text-slate-950 mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{item.description}</p>
                  </div>
                  <div className={`p-4 rounded-xl text-xs font-semibold ${
                    item.accent === 'amber' ? 'bg-amber-50 text-amber-800' : 'bg-blue-50 text-blue-800'
                  }`}>
                    <div className="font-bold text-sm mb-1">{item.impact_value}</div>
                    <div className="opacity-95 leading-normal">{item.impact_label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Environmental Impact Infographics */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-slate-900 mb-10 text-center flex items-center justify-center gap-2">
              <span>Campus Green Impact</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {impacts.map((impact) => (
                <div key={impact.id} className="text-center flex flex-col items-center">
                  <div className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 shadow-md shadow-green-500/10">
                    {React.createElement(impact.icon, { size: 22 })}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">{impact.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-[220px]">{impact.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center flex justify-center">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-50 border border-green-200/50 text-green-700 text-xs font-bold uppercase tracking-wider">
                <Award size={15} />
                <span>Green Campus Gold Rating Target</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default EcoCampus;
