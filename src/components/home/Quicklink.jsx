import React from "react";
import { Link } from "react-router-dom";
import {
  School,
  Users,
  ClipboardList,
  BookOpen,
  Award,
  Briefcase,
  ExternalLink,
  ArrowRight,
  Link as LinkIcon
} from "lucide-react";
import homeData from "../../Data/home.json";

// --- Utility ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- Dynamic Icon Component ---
const IconComponent = ({ name, className, style }) => {
  switch (name) {
    case "school":
      return <School className={className} style={style} />;
    case "users":
      return <Users className={className} style={style} />;
    case "clipboard":
      return <ClipboardList className={className} style={style} />;
    case "book":
      return <BookOpen className={className} style={style} />;
    case "award":
      return <Award className={className} style={style} />;
    case "briefcase":
      return <Briefcase className={className} style={style} />;
    default:
      return <LinkIcon className={className} style={style} />;
  }
};

// --- Default Quick Links configuration with premium icons and themes ---
const defaultQuickLinks = [
  {
    title: "Schools",
    desc: "Explore our diverse academic departments & research centers",
    iconName: "school",
    color: "from-emerald-500 to-teal-500",
    iconColor: "#10b981",
    link: "/academics/schools",
  },
  {
    title: "Faculty",
    desc: "Connect with our distinguished academic scholars & mentors",
    iconName: "users",
    color: "from-blue-500 to-indigo-500",
    iconColor: "#2563eb",
    link: "/academics/faculty",
  },
  {
    title: "Exam",
    desc: "Schedules, circulars, results, and academic guidelines",
    iconName: "clipboard",
    color: "from-amber-500 to-orange-500",
    iconColor: "#f59e0b",
    link: "https://exams.gbu.ac.in/",
    external: true,
  },
  {
    title: "Library",
    desc: "Access our vast digital libraries & global research resources",
    iconName: "book",
    color: "from-indigo-500 to-violet-500",
    iconColor: "#6366f1",
    link: "https://library.gbu.ac.in/",
    external: true,
  },
  {
    title: "Time Table",
    desc: "View and download your academic schedule and class timetables",
    iconName: "award",
    color: "from-rose-500 to-pink-500",
    iconColor: "#f43f5e",
    link: "https://www.gbu.ac.in/academics/timetables",
  },
];

export default function QuickLinks() {
  const quickAccessItems = Array.isArray(homeData?.sections?.quick_access)
    ? homeData.sections.quick_access
    : [];

  // Helper to resolve icon, color, and iconColor based on title
  const getIconAndColor = (title) => {
    const t = (title || "").toLowerCase();
    if (t.includes("school") || t.includes("department")) {
      return { iconName: "school", color: "from-emerald-500 to-teal-500", iconColor: "#10b981" };
    }
    if (t.includes("faculty") || t.includes("teacher") || t.includes("profile")) {
      return { iconName: "users", color: "from-blue-500 to-indigo-500", iconColor: "#2563eb" };
    }
    if (t.includes("exam") || t.includes("result") || t.includes("circular") || t.includes("test")) {
      return { iconName: "clipboard", color: "from-amber-500 to-orange-500", iconColor: "#f59e0b" };
    }
    if (t.includes("library") || t.includes("book") || t.includes("digital")) {
      return { iconName: "book", color: "from-indigo-500 to-violet-500", iconColor: "#6366f1" };
    }
    if (t.includes("nss") || t.includes("ncc") || t.includes("sport") || t.includes("award") || t.includes("cultural")) {
      return { iconName: "award", color: "from-rose-500 to-pink-500", iconColor: "#f43f5e" };
    }
    if (t.includes("placement") || t.includes("recruit") || t.includes("career") || t.includes("job")) {
      return { iconName: "briefcase", color: "from-violet-500 to-purple-500", iconColor: "#8b5cf6" };
    }
    return { iconName: "link", color: "from-slate-500 to-slate-600", iconColor: "#64748b" };
  };

  const normalizedQuickLinks = quickAccessItems.length
    ? quickAccessItems.map((item) => {
        const theme = getIconAndColor(item.title);
        return {
          title: item.title || "Quick Link",
          iconName: theme.iconName,
          color: theme.color,
          iconColor: theme.iconColor,
          link: item.url || "/",
          external: /^https?:\/\//i.test(item.url || ""),
        };
      })
    : defaultQuickLinks;

  return (
    <section
      className="relative py-10 md:py-14 bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 overflow-hidden"
      role="region"
      aria-labelledby="quick-access-heading"
    >
      {/* Subtle decorative background glow */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-blue-50 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header section */}
        <div className="text-center mb-10 flex flex-col items-center">
          {/* <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100/60 mb-3">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Essential Links</span>
          </div> */}
          
          <h2
            id="quick-access-heading"
            className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight leading-none"
          >
            Quick Access
          </h2>
          {/* <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mt-4 rounded-full" /> */}
        
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {normalizedQuickLinks.map((item, idx) => {
            const Card = (
              <div className={cn(
                "group relative bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-100 hover:border-slate-200/80 shadow-sm hover:shadow-lg",
                "hover:-translate-y-1 focus:-translate-y-1 focus:outline-none transition-all duration-300 ease-out flex items-center gap-4 overflow-hidden"
              )}>
                {/* Hover spotlight background effect */}
                <div className={cn(
                  "absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br pointer-events-none",
                  item.color
                )} />

                {/* Icon Container */}
                <div className="relative p-2.5 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm overflow-hidden">
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: item.iconColor }} />
                  <IconComponent name={item.iconName} className="h-5 w-5 relative z-10" style={{ color: item.iconColor }} />
                </div>

                {/* Title */}
                <h3 className="text-sm sm:text-base font-bold text-slate-800 group-hover:text-blue-700 transition-colors duration-300 flex-grow leading-tight">
                  {item.title}
                </h3>
                
                {/* Redirect Icon */}
                <div className="text-slate-400 group-hover:text-blue-600 transition-colors duration-300 shrink-0">
                  {item.external ? (
                    <ExternalLink className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </div>
              </div>
            );

            return item.external ? (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full focus:outline-none"
              >
                {Card}
              </a>
            ) : (
              <Link key={idx} to={item.link} className="block h-full focus:outline-none">
                {Card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
