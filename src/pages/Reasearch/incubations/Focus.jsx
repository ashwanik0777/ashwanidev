import React from "react";
import { motion } from "framer-motion";
import { Target, Lightbulb } from "lucide-react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Focus = () => {
  const cards = [
    {
      image: "https://www.gburif.org/Screenshot%202024-06-11%20at%204.14.25%E2%80%AFAM.png",
      title: "Focus Areas",
      icon: <Target className="w-8 h-8 text-indigo-600" />,
      description: "The functional areas are not limited to IoT, AI, Robotics, Microsystems, Data Analytics, High Frequency Applications, Integrated Circuits, PCB based Solutions, Sensor Network, Neural Computing, IT/ITES, Telecom, Mobile VAS, Gaming and Animation, Reliability, Internet/Web, Media and Entertainment.",
    },
    {
      image: "https://www.gburif.org/noida-08november2010-gautam-htphoto-university-noida-greater_a63589a4-2b9a-11e8-8732-87a46da2a8cc.jpg",
      title: "Objective",
      icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
      description: "To provide mentors for skill up ideas. Example can be an AI based Electromagnetic Shielding device problem. One mentor from Electronics Circuits, One from HF Electronics, one from Mechanical and one from Computer Science knowledge tank will be potential mentors.",
    },
  ];

  return (
    <SearchableWrapper>
      <section className="bg-slate-50 py-20 px-4 sm:px-10 md:px-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Focus & Objective
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'; }}
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all duration-300"></div>
                </div>
                
                <div className="p-8 relative">
                  <div className="absolute -top-10 right-8 bg-white p-4 rounded-2xl shadow-lg border border-slate-50">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 pr-16">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SearchableWrapper>
  );
};

export default Focus;
