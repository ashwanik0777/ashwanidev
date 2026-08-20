import React from "react";
import { Mail, CircleCheck, Clock } from "lucide-react";
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
      <div className="relative bg-slate-900 text-white py-8 sm:py-12 md:py-14 px-4">
        <div className="relative max-w-6xl mx-auto text-center">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
          >
            IT Cell
          </motion.h1>
          <p className="text-base sm:text-lg md:text-xl mb-3 sm:mb-4 opacity-90">
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
      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 md:py-10">
        {/* Vision & Mission */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-8 sm:mb-10"
        >
          <Card className="bg-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-blue-800 flex items-center gap-2 sm:gap-3">
                <visionMission.vision.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                {visionMission.vision.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {visionMission.vision.content}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-emerald-800 flex items-center gap-2 sm:gap-3">
                <visionMission.mission.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                {visionMission.mission.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {visionMission.mission.content}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <Card className="mb-8 sm:mb-10 bg-indigo-50 border-indigo-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl text-indigo-800 mb-2">
                {itcellDescription.title}
              </CardTitle>
              <CardDescription className="text-base text-gray-700 max-w-3xl mx-auto">
                {itcellDescription.subtitle}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <blockquote className="text-lg italic text-indigo-700 font-medium">
                  "{itcellDescription.quote}"
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <RoadmapTimeline />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
            Responsibilities of the Committee
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responsibilities.slice(0, 6).map((resp, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 group flex items-center gap-3.5"
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
            <div className="mt-6 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 rounded-2xl border border-blue-100/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
                {React.createElement(responsibilities[6].icon, { className: "w-5 h-5" })}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {responsibilities[6].title}
              </h3>
            </div>
          )}
        </motion.div>


        <section className="mb-8 sm:mb-10">
          <div className="mb-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">People Behind IT Cell</h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Faculty mentors and student builders driving real campus transformation.
            </p>
          </div>
          <TeamSection />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-[1.2fr_auto] md:items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Join IT Cell Team</h3>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
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
