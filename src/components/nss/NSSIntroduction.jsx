import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Award, Heart, Target, Globe, Zap, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";
import StatsCard from "../StatsCard";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-2xl shadow-lg border border-slate-100 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-6 pt-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const NSSIntroduction = ({ nssData }) => {
  const missionText = nssData?.overview || `The National Service Scheme (NSS) at Gautam Buddha University is a Government-sponsored public service program under the Ministry of Youth Affairs & Sports, Govt. of India. Guided by the motto "NOT ME BUT YOU", NSS provides an open platform for students to participate in community service, foster civic responsibility, and develop essential leadership skills while actively contributing to nation-building.`;
  const registerUrl = "https://nss-dash.onlinegbu.com/register";
  const loginUrl = "https://nss-dash.onlinegbu.com/login";

  const statsData = [
    {
      icon: Users,
      numberText: "500+",
      title: "Active Volunteers",
      subtitle: "Dedicated Students",
      iconColor: "#2563eb",
    },
    {
      icon: CheckCircle,
      numberText: "10+",
      title: "Projects Completed",
      subtitle: "High Impact Drives",
      iconColor: "#16a34a",
    },
    {
      icon: Globe,
      numberText: "8",
      title: "University Schools",
      subtitle: "Campus-wide Reach",
      iconColor: "#9333ea",
    },
    {
      icon: Award,
      numberText: "10+",
      title: "Years of Service",
      subtitle: "Nation Building",
      iconColor: "#f97316",
    },
  ];

  const whyJoinPillars = [
    {
      icon: Users,
      title: "Community Service",
      description: "Engage in meaningful community service projects that create positive impact in society and help build a better nation.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50 text-blue-600"
    },
    {
      icon: Zap,
      title: "Leadership Development",
      description: "Develop leadership skills and gain valuable experience in organizing and managing real-world projects that benefit local communities.",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50 text-amber-600"
    },
    {
      icon: Award,
      title: "Official Recognition",
      description: "Receive official certificates and national recognition for your service to the nation from university and government authorities.",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50 text-purple-600"
    }
  ];

  const objectives = [
    {
      icon: Target,
      title: "Community Development",
      description: "Engage in literacy, environmental protection, blood donation, and health awareness drives in adopted villages."
    },
    {
      icon: Users,
      title: "Social Consciousness",
      description: "Develop empathy, civic responsibility, and a deep understanding of societal challenges among student youth."
    },
    {
      icon: Globe,
      title: "National Integration",
      description: "Foster unity, cultural harmony, and inclusive development across diverse communities and academic schools."
    },
    {
      icon: Heart,
      title: "Character & Leadership",
      description: "Cultivate selfless service, crisis response preparedness, and ethical leadership through hands-on service learning."
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5
      }
    })
  };

  return (
    <SearchableWrapper>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="space-y-12 px-4 sm:px-6 lg:px-12 mx-auto max-w-7xl"
      >
        {/* Hero Mission Statement Card */}
        <motion.div variants={fadeInUp}>
          <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-3xl">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500 text-slate-950 mb-4">
                  Official NSS GBU Cell
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight">
                  National Service Scheme <span className="text-amber-400">(NSS GBU)</span>
                </h2>
                <p className="text-base md:text-lg text-blue-200 font-medium mb-6">
                  राष्ट्रीय सेवा योजना - गौतम बुद्ध विश्वविद्यालय
                </p>
                <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8">
                  {missionText}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href={registerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                  >
                    Start Volunteer Registration <ArrowRight size={18} />
                  </a>
                  <a
                    href={loginUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold backdrop-blur-sm transition-all"
                  >
                    Volunteer Login <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              {/* Official NSS Wheel Emblem Logo */}
              <div className="shrink-0 self-center md:self-auto">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQskMRga2F9mYN9FclMItZ1uhC-XCXkCDM6NuH1ryD_EGqplR1XrarhOZpafQ2V-WPvBs&usqp=CAU"
                  alt="Official NSS Logo"
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain bg-white rounded-full p-2.5 shadow-2xl border-4 border-amber-400/80"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real Statistics Card Component */}
        <motion.div variants={fadeInUp}>
          <StatsCard stats={statsData} fadeInUp={fadeInUp} />
        </motion.div>

        {/* Why Join NSS Section (Directly from nss-dash.onlinegbu.com/#about) */}
        <motion.div variants={fadeInUp} className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Why Join NSS GBU?</h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed">
              The National Service Scheme provides unprecedented opportunities for students to participate in community service, develop character, and gain national recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyJoinPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col"
                >
                  <div>
                    <div className={`w-16 h-16 rounded-2xl ${pillar.bgColor} flex items-center justify-center mb-6 shadow-sm`}>
                      <IconComp size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{pillar.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Objectives Section */}
        <motion.div variants={fadeInUp} className="space-y-8">
          <h2 className="text-3xl font-extrabold text-center text-slate-900">Key Objectives & Focus Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-md hover:shadow-lg transition-all">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-50 p-3 rounded-2xl shrink-0">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{objective.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{objective.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action Card */}
        <motion.div variants={fadeInUp}>
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Ready to Serve the Nation?</h2>
            <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              Join thousands of GBU students who are making a positive difference through the National Service Scheme. Start your volunteer journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 rounded-xl font-extrabold text-base transition-all shadow-lg hover:scale-105 inline-flex items-center gap-2"
              >
                Register Now <ArrowRight size={18} />
              </a>
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-base backdrop-blur-sm transition-all inline-flex items-center gap-2"
              >
                Volunteer Portal <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </SearchableWrapper>
  );
};

export default NSSIntroduction;
