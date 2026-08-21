import React from "react";
import {
  Layers,
  Database,
  RefreshCw,
  Bug,
  Wrench,
  Rocket,
  Calendar
} from "lucide-react";
import { motion } from "framer-motion";

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Badge ---
const Badge = ({ className, children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={cn(
      "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-md transition",
      className
    )}
  >
    {children}
  </motion.div>
);

// --- Card ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{
      scale: 1.02,
      y: -2,
      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    }}
    whileTap={{
      scale: 0.99,
      y: 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
    className={cn(
      "relative rounded-xl bg-white border border-slate-100 p-8 md:p-10 shadow-xl transition-all duration-300",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl md:text-2xl font-bold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("mt-4", className)} {...props} />
));
CardContent.displayName = "CardContent";

// --- Timeline ---
const RoadmapTimeline = () => {
  const timelineData = [
    {
      dateRange: "1 June 2025 – 15 August 2025",
      milestone: "Phase 1: Project Initiation & Core Architecture",
      status: "completed",
      description:
        "Initiated the modernization project. Designed the initial HTML/CSS wireframes, established the primary navigation structures, and completed the fundamental responsive layout design.",
      icon: <Layers className="w-6 h-6 text-emerald-600" />,
    },
    {
      dateRange: "1 February 2026 – 8 May 2026",
      milestone: "Phase 2: Database & Dashboard Ecosystem",
      status: "completed",
      description:
        "Designed the robust database schema and developed backend REST APIs. Created the comprehensive security layer alongside three fully functional dashboards: Super Admin, School Content, and Faculty Profiles.",
      icon: <Database className="w-6 h-6 text-emerald-600" />,
    },
    {
      dateRange: "1 June 2026 – 20 July 2026",
      milestone: "Phase 3: Dynamic Schools & Content Integration",
      status: "completed",
      description:
        "Implemented dynamic content management systems for all university schools. Populated academic data, integrated the automated Faculty Registration system, and refined overall UI aesthetics.",
      icon: <RefreshCw className="w-6 h-6 text-emerald-600" />,
    },
    {
      dateRange: "20 July 2026 – 30 July 2026",
      milestone: "Phase 4: Rigorous Testing & Debugging",
      status: "completed",
      description:
        "Exhaustive validation of all dashboard panels. Performed full-stack API endpoint integration testing, cross-browser compatibility audits, and responsive layout debugging.",
      icon: <Bug className="w-6 h-6 text-emerald-600" />,
    },
    {
      dateRange: "1 August 2026 – 20 August 2026",
      milestone: "Phase 5: Content Optimization & Final Tuning",
      status: "completed",
      description:
        "Executed final features updates based on feedback. Performed data entry, adding/removing custom modules, refined SEO tags, and completed the deployment checklist.",
      icon: <Wrench className="w-6 h-6 text-emerald-600" />,
    },
    {
      dateRange: "23 August 2026",
      milestone: "Phase 6: Official Production Launch",
      status: "in-progress",
      description:
        "Deploying the fully modernized GBU Smart Portal to the live university servers. Officially launching the platform for all students, faculty, and administration.",
      icon: <Rocket className="w-6 h-6 text-purple-600" />,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 border border-emerald-250";
      case "in-progress":
        return "bg-blue-100 text-blue-700 border border-blue-250 animate-pulse";
      case "planned":
        return "bg-indigo-100 text-indigo-700 border border-indigo-200";
      case "upcoming":
        return "bg-orange-100 text-orange-700 border border-orange-200";
      case "future":
        return "bg-purple-100 text-purple-700 border border-purple-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "planned":
        return "Planned";
      case "upcoming":
        return "Upcoming";
      case "future":
        return "Launching";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="my-8 sm:my-12 relative px-4 md:px-0">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-2 text-slate-800 tracking-tight">
        IT Cell Progress Timeline
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline track */}
        <div className="absolute left-8 top-2 bottom-2 w-0.5 bg-gradient-to-b from-emerald-400 via-blue-400 to-purple-500 hidden md:block"></div>

        <div className="space-y-6 sm:space-y-8 relative">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            >
              {/* Timeline indicator node */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.15 }}
                className={cn(
                  "absolute left-6 w-4.5 h-4.5 bg-white border-4 rounded-full hidden md:block z-10",
                  item.status === "completed" ? "border-emerald-500" :
                  item.status === "in-progress" ? "border-blue-500 animate-ping-slow" :
                  "border-slate-300"
                )}
                style={{ top: "2.25rem" }}
              ></motion.div>

              <Card className="ml-0 md:ml-16">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <motion.div
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center shrink-0"
                      >
                        {item.icon}
                      </motion.div>
                      <div>
                        <CardTitle className="text-slate-900 text-lg md:text-xl font-bold leading-snug">
                          {item.milestone}
                        </CardTitle>
                        <p className="text-blue-600 font-semibold text-sm mt-1.5 flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" /> {item.dateRange}
                        </p>
                      </div>
                    </div>
                    <Badge className={cn(getStatusColor(item.status), "self-start sm:self-center shrink-0")}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-sm md:text-base pl-0 sm:pl-16">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapTimeline;
