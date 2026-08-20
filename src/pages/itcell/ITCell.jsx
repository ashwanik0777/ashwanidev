import React from "react";
import { Mail, CircleCheck, Clock, Sparkles, Quote } from "lucide-react";
import TeamSection from "../../components/itcell/TeamSection";
import ApplicationForm from "../../components/itcell/ApplicationForm";
import RoadmapTimeline from "../../components/itcell/RoadmapTimeline";
import { motion } from "framer-motion";
import {
  responsibilities,
  currentProgress,
  visionMission,
  itcellDescription,
} from "./itcellData";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{
      y: -4,
      transition: { duration: 0.2, ease: "easeOut" },
    }}
    className={cn(
      "relative rounded-xl bg-white text-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100",
      className,
    )}
    {...props}
  >
    {props.children}
  </motion.div>
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className={cn("flex flex-col space-y-1.5 p-4 sm:p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg sm:text-xl font-semibold leading-tight tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
    className={cn("p-4 sm:p-6 pt-0", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

function Badge({ className, children }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-blue-600 text-white px-2.5 py-0.5 text-xs font-medium",
        className,
      )}
    >
      {children}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const ITCell = () => {
  React.useEffect(() => {
    document.title = "IT Cell - MyGBU Smart Campus";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", "Explore the initiatives, team, and progress of GBU's IT Cell transforming university operations through AI and automation.");
      document.querySelector('meta[property="og:description"]')?.setAttribute("content", "Explore the initiatives, team, and progress of GBU's IT Cell transforming university operations through AI and automation.");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Explore the initiatives, team, and progress of GBU's IT Cell transforming university operations through AI and automation.";
      document.getElementsByTagName("head")[0].appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Header Section */}
      <div className="relative bg-slate-900 text-white py-6 sm:py-8 md:py-10 px-4">
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3"
          >
            IT Cell
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl mb-3 opacity-90">
            Building practical automation for Smart GBU
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Automation</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">AI Workflows</span>
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1">Campus Systems</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-5 sm:py-6">
        {/* Vision & Mission */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-5 sm:mb-6"
        >
          {/* Vision Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                <visionMission.vision.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {visionMission.vision.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {visionMission.vision.content}
              </p>
            </div>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <visionMission.mission.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {visionMission.mission.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {visionMission.mission.content}
              </p>
            </div>
          </div>
        </motion.div>

        {/* What is IT Cell Feature Card */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-5 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
              {itcellDescription.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed mb-4">
              {itcellDescription.subtitle}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <Quote className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm sm:text-base italic font-medium text-slate-700 leading-relaxed">
                "{itcellDescription.quote}"
              </p>
            </div>
          </div>
        </motion.div>

        <RoadmapTimeline />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-5 sm:mb-6"
        >
          <h2 className="text-2xl sm:text-3xl font-normal text-center mb-4 sm:mb-5 text-gray-800">
            Responsibilities of the Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {responsibilities.slice(0, 6).map((resp, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 group flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                  <resp.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {resp.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Featured 7th Responsibility Card */}
          {responsibilities[6] && (
            <div className="mt-4 sm:mt-5 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 rounded-2xl border border-blue-100/80 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                {React.createElement(responsibilities[6].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {responsibilities[6].title}
              </h3>
            </div>
          )}
        </motion.div>


        <section className="mb-5 sm:mb-6">
          <div className="mb-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">People Behind IT Cell</h2>
          </div>
          <TeamSection />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1.2fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Join IT Cell Team</h3>
              <p className="mt-2 text-sm text-slate-600 ">
                If you are passionate about web development, AI systems, product design, or automation, apply to contribute to real university systems.
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                <Mail className="h-4 w-4" /> itcell@gbu.ac.in
              </p>
            </div>

            <div className="justify-self-start md:justify-self-end">
              <ApplicationForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ITCell;
