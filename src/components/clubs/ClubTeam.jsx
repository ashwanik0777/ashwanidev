import React, { useState } from 'react';
import { Mail, User, GraduationCap, Crown, Users, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SearchableWrapper from '../Searchbar/SearchableWrapper';

const Card = ({ className = '', children, ...props }) => (
  <motion.div
    className={`bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    whileHover={{ y: -4 }}
    {...props}
  >
    {children}
  </motion.div>
);

const Badge = ({ className = '', variant = 'default', children }) => {
  let base = "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  let color =
    variant === "secondary"
      ? "bg-purple-50 text-purple-700 border border-purple-100"
      : variant === "outline"
      ? "border border-blue-200 text-blue-600 bg-blue-50/50"
      : "bg-blue-600 text-white shadow-sm shadow-blue-100";

  return <span className={`${base} ${color} ${className}`}>{children}</span>;
};

// Reusable fallback image component
const FallbackAvatar = ({ src, alt, className }) => {
  const [hasError, setHasError] = useState(false);

  return hasError || !src ? (
    <div className={`bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-200 ${className}`}>
      <User className="w-1/2 h-1/2" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

const ClubTeam = ({ club }) => {
  if (!club || !club.team) {
    return (
      <div className="flex items-center justify-center min-h-64 text-gray-500">
        <p>Team information not available</p>
      </div>
    );
  }

  const officeBearers = [
    club.team.president ? { ...club.team.president, role: 'President' } : null,
    club.team.vicePresident ? { ...club.team.vicePresident, role: 'Vice President' } : null,
    club.team.secretary ? { ...club.team.secretary, role: 'Secretary' } : null,
    club.team.treasurer ? { ...club.team.treasurer, role: 'Treasurer' } : null,
  ].filter(member => member && member.name);

  const getFacultyCoordinators = () => {
    if (!club.team.facultyCoordinator) return [];
    if (Array.isArray(club.team.facultyCoordinator)) {
      return club.team.facultyCoordinator.filter(Boolean);
    }
    return [club.team.facultyCoordinator];
  };

  const facultyCoordinators = getFacultyCoordinators();

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SearchableWrapper>
      <div className="space-y-16 py-8 px-4 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            Meet Our Leadership & Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* Faculty Coordinator Section */}
        {facultyCoordinators.length > 0 && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center space-y-8">
            <h3 className="text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-600" />
              Faculty Guidance
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {facultyCoordinators.map((faculty, idx) => (
                <div 
                  key={idx} 
                  className="max-w-xl w-full bg-gradient-to-br from-white to-blue-50/20 rounded-3xl border border-slate-100 p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 text-left hover:shadow-2xl transition-shadow duration-300"
                >
                  <FallbackAvatar
                    src={faculty.photo || faculty.image}
                    alt={faculty.name}
                    className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow-md shrink-0"
                  />
                  <div className="space-y-2 min-w-0 flex-1">
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {faculty.role || 'Faculty Advisor'}
                    </span>
                    <h3 className="text-xl font-bold text-slate-800 leading-tight mt-1 truncate">{faculty.name}</h3>
                    <p className="text-sm font-semibold text-slate-600 truncate">{faculty.department || 'Gautam Buddha University'}</p>
                    {faculty.email && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                        <Mail className="w-3.5 h-3.5" />
                        <span className="truncate">{faculty.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Office Bearers Section */}
        {officeBearers.length > 0 && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 flex items-center justify-center gap-2">
              <Crown className="w-7 h-7 text-purple-600" />
              Executive Council
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {officeBearers.map((member, idx) => (
                <Card key={idx} className="p-6 flex flex-col items-center text-center justify-between min-h-64">
                  <div className="flex flex-col items-center w-full">
                    <FallbackAvatar
                      src={member.photo || member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-100 shadow-sm mb-4 shrink-0"
                    />
                    <Badge 
                      variant={member.role === 'President' || member.role === 'Vice President' ? 'default' : 'secondary'}
                      className="mb-2"
                    >
                      {member.role}
                    </Badge>
                    <h4 className="text-lg font-bold text-slate-800 leading-snug line-clamp-1 w-full">{member.name}</h4>
                    <p className="text-xs text-slate-500 font-medium mt-1 truncate max-w-[200px] w-full">{member.department || 'Gautam Buddha University'}</p>
                  </div>
                  {member.email && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-4 border-t border-slate-50 pt-3 w-full justify-center">
                      <Mail className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate max-w-[150px]">{member.email}</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Core Team Members Section */}
        {club.team.members && club.team.members.length > 0 && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-slate-800 flex items-center justify-center gap-2">
              <Users className="w-7 h-7 text-indigo-600" />
              Core Team Members
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {club.team.members.map((member, idx) => (
                <Card key={idx} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <FallbackAvatar
                    src={member.photo || member.image}
                    alt={member.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-800 truncate text-sm">{member.name}</h4>
                    <p className="text-xs text-slate-500 font-semibold truncate mt-0.5">{member.role || 'Member'}</p>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{member.department}</p>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact CTA */}
        {club.team.secretary && (
          <motion.div variants={fadeIn} initial="hidden" animate="visible">
            <Card className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 border border-blue-100/60 text-slate-800 p-8 text-center max-w-2xl mx-auto">
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Get in Touch</h3>
              <p className="text-slate-650 mb-4 max-w-md mx-auto text-sm leading-relaxed">
                Have questions or want to collaborate with our club? Reach out directly to our committee!
              </p>
              <div className="text-xs text-slate-500 font-medium">
                Contact Secretary: <span className="font-bold text-slate-700">{club.team.secretary.name}</span>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Empty State */}
        {facultyCoordinators.length === 0 && officeBearers.length === 0 && 
         (!club.team.members || club.team.members.length === 0) && (
          <Card className="bg-slate-50 border border-slate-100 p-12 text-center">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700 mb-2">
              Team Information Coming Soon
            </h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              We're currently updating our executive profiles. Please check back later!
            </p>
          </Card>
        )}
      </div>
    </SearchableWrapper>
  );
};

export default ClubTeam;
