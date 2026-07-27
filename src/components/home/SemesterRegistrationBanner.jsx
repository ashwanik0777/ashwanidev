import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SemesterRegistrationBanner = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-6 border-y border-indigo-100 relative overflow-hidden">
      {/* Background decorative blob */}
      <div className="absolute top-0 right-0 -mr-20 -mt-10 w-64 h-64 bg-indigo-200/30 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0 bg-indigo-600 text-white p-3 rounded-2xl shadow-lg shadow-indigo-200/50 transform -rotate-3">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Semester Registration Open</h3>
              <p className="text-sm text-slate-600 mt-1">
                Complete your enrollment and fee payment for the upcoming semester.
              </p>
            </div>
          </div>
          
          <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/semester-registration" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 transition-all duration-200 whitespace-nowrap"
            >
              Start Registration
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SemesterRegistrationBanner;
