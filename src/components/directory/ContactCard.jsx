import React from 'react';
import { Phone, Building2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut', duration: 0.4 } },
};

const ContactCard = ({ group }) => {
  if (!group) return null;

  return (
    <motion.div
      className="bg-white border border-slate-200 rounded-3xl p-6 h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Decorative top gradient accent */}
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80" />

      {/* Header Section: Office / Category Name */}
      <div className="flex items-center gap-4 mb-5 pb-4 border-b border-slate-100">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
          <Building2 className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-900 leading-tight font-outfit">
            {group.category}
          </h3>
          <p className="text-xs font-medium text-slate-500 mt-1 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            {group.members?.length || 0} Contacts
          </p>
        </div>
      </div>

      {/* Members / Contacts List */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4 max-h-72 custom-scrollbar">
        {group.members?.map((member, idx) => {
          // Some members have multiple numbers merged by " / "
          const phoneNumbers = member.phone ? member.phone.split(' / ') : [];
          
          return (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="group/item flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors"
            >
              {/* Name & Designation */}
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800 group-hover/item:text-blue-700 transition-colors">
                  {member.name}
                </p>
                {/* Fallback if a specific location is different from category */}
                {member.location && member.location !== group.category && (
                  <p className="text-xs text-slate-500 mt-0.5">{member.location}</p>
                )}
              </div>

              {/* Phone Numbers */}
              <div className="flex flex-col gap-1.5 sm:items-end shrink-0">
                {phoneNumbers.map((phone, pIdx) => (
                  <a
                    key={pIdx}
                    href={`tel:${phone.trim()}`}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 text-xs font-semibold transition-colors"
                  >
                    <Phone className="w-3 h-3" />
                    {phone.trim()}
                  </a>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
      
    </motion.div>
  );
};

export default ContactCard;
