import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CalendarDays, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BannerSection from "../../components/HeroBanner";

const ConferenceCard = ({ title, details, date, index }) => {
  const [expanded, setExpanded] = useState(false);
  const previewLength = 140;
  const isLong = details.length > previewLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50/50 to-indigo-50/30 backdrop-blur-sm border border-gray-200/60 border-solid rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-indigo-200">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Simplified floating decoration */}
        <motion.div
          className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />

        <div className="relative p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <motion.div
              className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Briefcase className="w-6 h-6 text-white" />
            </motion.div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-indigo-700 transition-colors duration-300">
                {title}
              </h3>

              <div className="flex items-center gap-2 mt-3 text-sm font-medium text-gray-600 group-hover:opacity-100 transition-opacity duration-300">
                <CalendarDays className="w-4 h-4 text-indigo-500" />
                <span>{date}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="text-gray-700 leading-relaxed">
            <AnimatePresence mode="wait">
              {expanded || !isLong ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="space-y-3"
                >
                  {details.split(". ").map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4, ease: "easeOut" }}
                      className="text-sm"
                    >
                      {sentence.trim().endsWith(".")
                        ? sentence.trim()
                        : sentence.trim() + "."}
                    </motion.p>
                  ))}
                </motion.div>
              ) : (
                <motion.p
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-sm"
                >
                  {details.substring(0, previewLength).trim()}...
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Expand button */}
          {isLong && (
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="group/btn inline-flex items-center gap-2 text-indigo-600 font-semibold text-sm hover:text-indigo-700 focus:outline-none transition-colors duration-200"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{expanded ? "Show Less" : "Read More"}</span>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* Bottom accent line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          style={{ originX: 0 }}
        />
      </div>
    </motion.div>
  );
};

const Conferences = ({ conferenceData, heading, subheading }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 relative overflow-hidden">
      {/* Optimized background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-indigo-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            rotate: [360, 270, 180, 90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <BannerSection
        title={heading}
        subtitle={subheading}
        bgTheme={9}
      />

      <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 sm:py-16 max-w-7xl mx-auto">
        {/* Conference Grid */}
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-12"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                ease: "easeOut",
              },
            },
          }}
        >
          {conferenceData.map((conf, index) => (
            <ConferenceCard
              key={index}
              title={conf.title}
              details={conf.details}
              date={conf.date}
              index={index}
            />
          ))}
        </motion.div>

        {/* Footer accent */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-block w-2 h-2 bg-indigo-600 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

const App = () => {
  const { shortCode } = useParams();
  const [activitiesData, setActivitiesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/about/activities.jsx`);
        setActivitiesData(module.activitiesData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/about/activities.jsx");
          setActivitiesData(fallback.activitiesData);
        } catch {
          setActivitiesData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!activitiesData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Activities data not available.</div>;
  }

  return (
    <Conferences
      conferenceData={activitiesData.activities}
      heading={activitiesData.heading}
      subheading={activitiesData.subheading}
    />
  );
};

export default App;
