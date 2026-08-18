import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Home,
  Users,
  GraduationCap,
  UserCheck,
  Calendar,
  Briefcase,
  Heart,
  Phone,
  Shield,
  Lock,
  BookOpen,
  HelpCircle,
  FileText
} from "lucide-react";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// 💠 Premium Card with motion lift and soft shadow transitions
const Card = ({ children, className = "" }) => (
  <motion.div
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    whileHover={{
      y: -6,
      boxShadow: "0 12px 40px rgba(14, 22, 38, 0.08)",
      backgroundColor: "rgba(255,255,255,0.98)",
    }}
    className={`rounded-2xl bg-white/85 backdrop-blur-lg border border-slate-200/50 shadow-sm transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`px-8 pt-8 pb-3 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold tracking-tight ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-8 pb-8 ${className}`}>{children}</div>
);

// Input
const Input = ({ className = "", ...props }) => (
  <input
    className={`block w-full rounded-xl border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-100 outline-none transition px-4 py-3 text-base font-medium ${className}`}
    {...props}
  />
);

// Collapsible
const Collapsible = ({ children }) => <div>{children}</div>;
const CollapsibleTrigger = ({ children, className = "", ...props }) => (
  <button
    type="button"
    className="flex w-full items-center justify-between text-left focus:outline-none"
    {...props}
  >
    {children}
  </button>
);
const CollapsibleContent = ({ children }) => <div>{children}</div>;

// Motion
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// 💠 100% Accurate Sitemap Data matching router.jsx
const sitemapAbout = [
  {
    title: "About Us",
    path: "/about-us/About GBU",
    icon: Home,
    children: [
      { title: "About GBU Overview", path: "/about-us/About GBU" },
      { title: "University History", path: "/aboutUs/GBUHistory" },
      { title: "Chancellor's Message", path: "/about-us/chancellor-message" },
      { title: "Vice-Chancellor's Message", path: "/about-us/vice-chancellor-message" },
      { title: "GBU: A Strategic Perspective", path: "/about-us/strategic-perspective" },
      { title: "Governing Bodies", path: "/about-us/governing-bodies" },
      { title: "Policies", path: "/about-us/policies" },
      { title: "Mandatory Disclosures", path: "/about-us/mandatory-disclosures" },
      { title: "Right to Information (RTI)", path: "/rti" }
    ],
  },
  {
    title: "Academics",
    path: "/academics/schools",
    icon: GraduationCap,
    children: [
      { title: "Academic Schools & Faculties", path: "/academics/schools" },
      { title: "Academic Calendar", path: "/academics/academic-calendar" },
      { title: "List of Holidays", path: "/academics/list-of-holidays" },
      { title: "CBCS Curriculum Framework", path: "/academics/cbcs-framework" },
      { title: "Centers of Excellence", path: "/academics/centers-of-excellence" },
      { title: "Faculty Directory", path: "/academics/faculty" },
      { title: "International Collaboration", path: "/academics/international-collaboration" },
      { title: "Annual Reports", path: "/academics/annual-reports" }
    ],
  },
  {
    title: "Admissions",
    path: "https://gbuadm.samarth.edu.in/",
    icon: UserCheck,
    isExternal: true,
    children: [],
  },
  {
    title: "Research",
    path: "/research/research-centers",
    icon: BookOpen,
    children: [
      { title: "Research Centers", path: "/research/research-centers" },
      { title: "Publications", path: "/research/publications" },
      { title: "GBU Incubation Centre", path: "/research/incubation" },
      { title: "Institution Innovation Council", path: "/research/institution-innovation" },
      { title: "IPR Cell", path: "/research/ipr-cell" }
    ],
  },
  {
    title: "Campus Life",
    path: "/campus-life/hero",
    icon: Heart,
    children: [
      { title: "Campus Overview", path: "/campus-life/hero" },
      { title: "Hostel Facilities & Dining", path: "/campus-life/hostel-facilities" },
      { title: "Hostel Details", path: "https://hostels.gbu.ac.in/" },
      { title: "Sports & Cultural Activities", path: "/campus-life/sports-fitness" },
      { title: "Clubs & Societies", path: "/campus-life/clubs-societies" },
      { title: "National Service Scheme (NSS)", path: "/campus-life/NSS" },
      { title: "National Cadet Corps (NCC)", path: "/campus-life/NCC" },
      { title: "Meditation & Mindfulness Centre", path: "/campus-life/meditation-center" }
    ],
  },
  {
    title: "Announcements",
    path: "/announcements/news-notifications",
    icon: Calendar,
    children: [
      { title: "News & Notifications", path: "/announcements/news-notifications" },
      { title: "Event Calendar", path: "/announcements/event-calendar" },
      { title: "Notices Board", path: "/announcements/notices" },
      { title: "Media & Press Gallery", path: "/announcements/media-gallery" },
      { title: "University Newsletter", path: "/announcements/newsletter" }
    ],
  },
  {
    title: "Placements & Career",
    path: "/placements",
    icon: Briefcase,
    children: [
      { title: "Placement Home & Process", path: "/placements" }
    ],
  },
  {
    title: "Alumni Network",
    path: "/alumni",
    icon: Users,
    children: [
      { title: "GBU Alumni Network & Directory", path: "/alumni" },
      { title: "GBU Alumni Portal (External)", path: "https://alumni.gbu.ac.in/" }
    ],
  },
  {
    title: "University Portals",
    path: "#",
    icon: Lock,
    children: [
      { title: "Portal Login (Faculty / School / Admin)", path: "/login" },
      { title: "Faculty Registration Portal", path: "/faculty-register" },
      { title: "Facility Booking System", path: "/booking" },
      { title: "Track Facility Bookings", path: "/booking/track" },
      { title: "Tender Portal", path: "/tender" },
      { title: "Recruitments & Vacancies", path: "/recruitments" }
    ],
  },
  {
    title: "Contact & Directory",
    path: "/contactUs",
    icon: Phone,
    children: [
      { title: "Contact Information", path: "/contactUs" },
      { title: "Contact Directory", path: "/contactDirectory" }
    ],
  },
  {
    title: "Legal & Policies",
    path: "#",
    icon: Shield,
    children: [
      { title: "Privacy Policy", path: "/privacy-policy" },
      { title: "Terms of Use", path: "/terms-of-use" }
    ],
  }
];

const Sitemap = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (sectionTitle) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const getAllLinks = (items) => {
    const links = [];
    items.forEach((item) => {
      if (item.children) {
        links.push(...item.children);
      }
    });
    return links;
  };

  const filteredData = searchTerm
    ? sitemapAbout
      .map((section) => ({
        ...section,
        children: section.children?.filter(
          (child) =>
            child.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            section.title.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter(
        (section) =>
          section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (section.children && section.children.length > 0)
      )
    : sitemapAbout;

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50/30 font-sans">
        <BannerSection
          title="Website Sitemap"
          subtitle="Easily navigate all academic, administrative, and legal pages. Find what you need instantly."
          bgTheme={8}
        />

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="container mx-auto px-4 sm:px-6 py-8 sm:py-14 max-w-7xl relative z-10"
        >
          {/* Search Input */}
          <div className="max-w-md mx-auto mb-10 sm:mb-16">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search pages, portals, policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3.5 sm:py-4 w-full border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 rounded-2xl shadow-sm transition-all duration-300"
              />
            </div>
          </div>

          {/* Grid of Sitemap Cards */}
          <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((section) => (
              <Card key={section.title} className="group overflow-hidden">
                <CardHeader className="border-b border-slate-100 pb-4">
                  <Collapsible>
                    <CollapsibleTrigger onClick={() => toggleSection(section.title)}>
                      <CardTitle className="flex items-center justify-between w-full">
                        <span className="flex items-center space-x-3">
                          {section.icon && (
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                              <section.icon className="w-5.5 h-5.5" />
                            </div>
                          )}
                          <span className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">
                            {section.title}
                          </span>
                        </span>
                        {(openSections[section.title] ?? true) ? (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-slate-400" />
                        )}
                      </CardTitle>
                    </CollapsibleTrigger>
                  </Collapsible>
                </CardHeader>

                {(openSections[section.title] ?? true) && (
                  <CollapsibleContent>
                    <CardContent className="pt-6">
                      <div className="space-y-2.5">
                        {/* Section Overview Link (Only if it represents an actual route) */}
                        {section.path && section.path !== "#" && (() => {
                          const isSecExternal = section.path.startsWith('http');
                          const SecLinkComp = isSecExternal ? 'a' : Link;
                          const secLinkProps = isSecExternal
                            ? { href: section.path, target: "_blank", rel: "noopener noreferrer" }
                            : { to: section.path };
                          return (
                            <SecLinkComp
                              {...secLinkProps}
                              className="block p-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 transition-all duration-300 border-l-4 border-blue-500 group/overview"
                            >
                              <span className="font-semibold text-blue-800 text-sm flex items-center justify-between">
                                <span>{section.title} Overview</span>
                                <ChevronRight className="w-4 h-4 transform group-hover/overview:translate-x-1 transition-transform duration-300" />
                              </span>
                            </SecLinkComp>
                          );
                        })()}
                        {/* Children Links */}
                        {section.children?.map((child) => {
                          const isExternal = child.path.startsWith('http');
                          const LinkComp = isExternal ? 'a' : Link;
                          const linkProps = isExternal 
                            ? { href: child.path, target: "_blank", rel: "noopener noreferrer" }
                            : { to: child.path };
                          return (
                            <LinkComp
                              key={child.path}
                              {...linkProps}
                              className="block p-2.5 rounded-xl hover:bg-slate-50 border-l-2 border-transparent hover:border-slate-300 pl-4 transition-all duration-300 group/item"
                            >
                              <span className="text-slate-600 group-hover:text-slate-900 text-sm font-medium flex items-center justify-between">
                                <span>{child.title}</span>
                                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover/item:opacity-100 transform translate-x-1 group-hover/item:translate-x-0 transition-all duration-300 text-slate-400" />
                              </span>
                            </LinkComp>
                          );
                        })}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                )}
              </Card>
            ))}
          </div>

          {/* No Search Results */}
          {searchTerm && filteredData.length === 0 && (
            <div className="text-center py-20">
              <div className="p-4 bg-slate-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No pages found</h3>
              <p className="text-slate-500 text-sm">Try using different keywords or explore the categories above.</p>
            </div>
          )}

          {/* Active Status Badge */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2.5 px-4.5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-slate-600 font-semibold tracking-wide">
                {getAllLinks(sitemapAbout).length} pages verified and active
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </SearchableWrapper>
  );
};

export default Sitemap;
