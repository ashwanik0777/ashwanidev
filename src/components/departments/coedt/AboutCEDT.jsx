import React from "react";
import { motion } from "framer-motion";
import { Compass, Sparkles, Rocket } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* About Us Banner & Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-blue-600" />
            KEEP DOCKING YOUR ASPIRATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight">
            About Us
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
        </motion.div>

        {/* Content Layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          
          {/* About Us Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between bg-white p-7 sm:p-8 rounded-2xl border border-blue-100 shadow-xl shadow-blue-900/5 hover:border-blue-300 transition-all"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  Centre of Excellence – Drone Technology
                </h3>
              </div>
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-blue-950">
                  The Centre of Excellence - Drone Technology is a joint initiative of Gautam Buddha University, Industry partner Omnipresent Robot Tech, and IASC SSC (Organization under the aegis of MSDE, Gov. of India).
                </p>
                <p>
                  It provides a platform where experts, professionals, and researchers in drone technology can share their expertise on design, innovations, utilization, research, and applications.
                </p>
                <p>
                  It is a battalion of drone learners, enthusiasts, designers, and pilots. The Centre is fully functional in the division of design & manufacturing, skill development, pilot training, App development, testing, research, and development activities.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Our Story Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-between bg-white p-7 sm:p-8 rounded-2xl border border-blue-100 shadow-xl shadow-blue-900/5 hover:border-blue-300 transition-all"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-xl bg-blue-600 text-white shadow-md">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">
                  Our Story
                </h3>
              </div>
              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p className="font-semibold text-blue-950">
                  The Centre of Excellence - Drone Technology seeks to part of the Nation's dream of becoming a drone hub by 2030. Set up in early 2022, the Centre uses research, education, and viable measures to address challenges and advancement of flying Robots.
                </p>
                <p>
                  The centre initially segmented into for drone pilot and operations training, drone data processing and analysis and app development, drone designing and manufacturing, and drone testing and repair.
                </p>
                <p>
                  Just in few months of its inception the CEDT which is partnered with Omnipresent Robot Tech and IASC SSC, initiated the implementations in developing various kinds of drones to avail sky-space to be utilized for various government, industrial, civic and health bodies.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
