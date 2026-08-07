import React from "react";
import {
  UserCog,
  HandCoins,
  Settings,
  Scale,
  Handshake,
  GraduationCap,
} from "lucide-react";
import { motion } from "framer-motion";
import SuccessStoriesCarousel from "./SuccessStoriesCarousel";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import StatsCard from "../../../components/StatsCard.jsx";

const StartUp = () => {
  const supportServices = [
    {
      title: "Mentorship Program",
      description: "One-on-one guidance from industry experts and successful entrepreneurs",
      icon: UserCog,
    },
    {
      title: "Funding Support",
      description: "Access to seed funding, angel investors, and venture capital networks",
      icon: HandCoins,
    },
    {
      title: "Technical Infrastructure",
      description: "State-of-the-art labs, equipment, and research facilities",
      icon: Settings,
    },
    {
      title: "Legal & IP Support",
      description: "Patent filing, trademark registration, and legal compliance assistance",
      icon: Scale,
    },
    {
      title: "Market Access",
      description: "Industry connections, customer introductions, and partnership opportunities",
      icon: Handshake,
    },
    {
      title: "Skill Development",
      description: "Workshops, training programs, and business development courses",
      icon: GraduationCap,
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  const stats = [
    { title: "Startups Incubated", numberText: "50+", iconColor: "#4f46e5" }, // indigo-600
    { title: "Funding Raised", numberText: "₹25Cr+", iconColor: "#4f46e5" },   // indigo-600
    { title: "Jobs Created", numberText: "200+", iconColor: "#4f46e5" },       // indigo-600
    { title: "Success Rate", numberText: "75%", iconColor: "#4f46e5" },        // indigo-600
  ];

  const applicationSteps = [
    { title: "Apply Online", description: "Submit your startup idea and business plan" },
    { title: "Evaluation", description: "Expert panel reviews your application" },
    { title: "Pitch Presentation", description: "Present your idea to our selection committee" },
    { title: "Incubation", description: "Begin your startup journey with our support" },
  ];

  return (
    <SearchableWrapper>
      <section className="bg-white py-20 px-4 sm:px-10 md:px-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Stats */}
          <div className="mb-24">
            <StatsCard stats={stats} />
          </div>

          {/* Support Services */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Startup Support Services
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Comprehensive ecosystem to help your startup succeed
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {supportServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  className="group bg-slate-50 border border-slate-100 rounded-2xl p-8 hover:shadow-xl hover:bg-white hover:border-indigo-100 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h5 className="text-xl font-bold mb-3 text-slate-900">
                    {service.title}
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Success Story */}
          <div className="mb-24">
            <SuccessStoriesCarousel />
          </div>

          {/* Application Process */}
          <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Startup Ecosystem
              </h3>
              <p className="text-indigo-200 text-lg mb-12 max-w-2xl mx-auto">
                A simple 4-step process to get started with the GBU Incubation Center
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {applicationSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative text-left"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-xl font-bold border-4 border-slate-800 shrink-0">
                        {index + 1}
                      </div>
                      {index < applicationSteps.length - 1 && (
                        <div className="hidden md:block h-px bg-slate-700 w-full absolute top-6 left-12 -z-10"></div>
                      )}
                    </div>
                    <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </SearchableWrapper>
  );
};

export default StartUp;
