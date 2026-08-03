import React from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, Building2, Globe2 } from "lucide-react";
import { motion } from "framer-motion";
import SocialIcons from "./SocialIcons";
import GoogleMap from "./GoogleMap";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const CONTACT_INFO = {
  address: {
    title: "University Campus",
    icon: Building2,
    lines: [
      "Gautam Buddha University",
      "Yamuna Expressway, Greater Noida",
      "Gautam Budh Nagar, UP - 201312"
    ]
  },
  communication: [
    { label: "Reception", value: "0120-234-4200", type: "phone", link: "tel:01202344200" },
    { label: "Admissions", value: "0120-234-4211", type: "phone", link: "tel:01202344211" },
    { label: "General Query", value: "info@gbu.ac.in", type: "email", link: "mailto:info@gbu.ac.in" },
    { label: "Admissions", value: "admissions@gbu.ac.in", type: "email", link: "mailto:admissions@gbu.ac.in" }
  ],
  hours: [
    { days: "Monday - Friday", time: "9:00 AM - 5:30 PM", status: "open" },
    { days: "Saturday - Sunday", time: "Closed", status: "closed" }
  ]
};

const ContactBanner = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-[#F8FAFC] selection:bg-blue-200 font-inter">
        
        {/* Custom Premium Hero Section */}
        <div className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-[#F8FAFC] to-purple-100/40"></div>
            <motion.div 
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 blur-[100px]" 
            />
            <motion.div 
              animate={{ x: [0, -30, 0], y: [0, 50, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-[100px]" 
            />
          </div>

          <div className="container mx-auto px-6 max-w-7xl relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-medium text-slate-600 mb-8"
            >
              <Globe2 className="w-4 h-4 text-blue-500" />
              We are always here to help you
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 font-outfit"
            >
              Let's stay <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">connected.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 font-inter leading-relaxed max-w-3xl mx-auto"
            >
              Reach out to Gautam Buddha University. Whether you have questions about admissions, campus life, or academics, our administration is ready to provide the answers you need.
            </motion.p>
          </div>
        </div>

        {/* Highly Organized Contact Information Section */}
        <div className="container mx-auto px-6 max-w-7xl relative z-20 pb-20">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Campus Address Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-outfit">Visit Campus</h3>
              <div className="space-y-2 text-slate-600 font-medium">
                {CONTACT_INFO.address.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </motion.div>

            {/* Communication Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-outfit">Contact Support</h3>
              <div className="space-y-4">
                {CONTACT_INFO.communication.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <span className="text-slate-500 text-sm">{item.label}</span>
                    <a href={item.link} className="text-slate-800 font-semibold hover:text-blue-600 transition-colors flex items-center gap-2">
                      {item.type === 'phone' ? <Phone className="w-3 h-3 text-slate-400 group-hover:text-blue-500" /> : <Mail className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />}
                      {item.value}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Operating Hours Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 font-outfit">Operating Hours</h3>
              <div className="space-y-4">
                {CONTACT_INFO.hours.map((hour, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0 last:pb-0">
                    <span className="text-slate-600 font-medium">{hour.days}</span>
                    <span className={`font-semibold ${hour.status === 'open' ? 'text-slate-900' : 'text-red-500'}`}>
                      {hour.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>

        {/* Map & Social Section */}
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Left text & social */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="lg:w-1/3"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 font-outfit leading-tight">
                  Visit our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Beautiful Campus</span>
                </h2>
                <p className="text-slate-600 mb-10 text-lg leading-relaxed font-inter">
                  Experience our sprawling 511-acre lush green campus, featuring state-of-the-art infrastructure and a serene environment perfect for learning.
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm">
                  <h4 className="text-lg font-bold text-slate-900 mb-4 font-outfit flex items-center gap-2">
                    Connect Digitally <ArrowRight className="w-4 h-4 text-blue-500" />
                  </h4>
                  <SocialIcons />
                </div>
              </motion.div>

              {/* Right Map */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:w-2/3 w-full"
              >
                <div className="h-[450px] lg:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl ring-4 ring-slate-50 relative group">
                  <div className="absolute inset-0 bg-slate-100 animate-pulse z-0" />
                  <div className="relative z-10 w-full h-full transition-transform duration-700 group-hover:scale-105">
                     <GoogleMap />
                  </div>
                  {/* Subtle glass overlay on map */}
                  <div className="absolute bottom-6 right-6 z-20 pointer-events-none hidden md:block">
                    <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-white/50 text-sm font-medium text-slate-700 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-red-500" />
                      View on Google Maps
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

      </div>
    </SearchableWrapper>
  );
};

export default ContactBanner;
