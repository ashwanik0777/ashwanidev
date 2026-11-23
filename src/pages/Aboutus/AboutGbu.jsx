import React, { useState, useEffect } from 'react';
import { useUniversityStats } from "../../hooks/useUniversityStats";
import { Link } from 'react-router-dom';
import { LIBRARY_INFO, LIBRARY_PAGE, LIBRARY_STATS } from '../../Data/libraryData';
import {
  Lightbulb,
  Users,
  BookOpen,
  Award,
  ChevronDown,
  Check,
  GraduationCap,
  Star,
  Building,
  Leaf,
  Droplets,
  Sun,
  Flower,
  User,
  Zap,
  TreePine,
  Dumbbell,
  Target,
  Trophy,
  Globe,
  Heart,
  Sparkles,
  ArrowRight,
  Play,
  Eye,
  Compass,
  Shield,
  Cpu,
  Briefcase,
  Scale,
  Palette,
  Flame,
  Book,
  Library,
  Mic,
  Monitor,
  Microscope,
  Wifi,
  Home,
  Utensils,
  Clock,
  CreditCard,
  Activity,
  Smile,
  Calendar,
  UserCheck,
  MapPin,
  Phone,
  Mail,
  Download,
  ExternalLink
} from "lucide-react";

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// Enhanced Button component with animations
const Button = ({ children, className = "", size = "md", variant = "primary", ...props }) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg font-semibold"
  };

  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md",
    secondary: "bg-white text-gray-900 border-2 border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg",
    outline: "bg-white text-blue-700 border border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600",
    ghost: "bg-transparent text-white border-2 border-white hover:bg-white hover:text-gray-900"
  };

  return (
    <button
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${sizeClasses[size]} ${variantClasses[variant] || variantClasses.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Enhanced Card component with hover effects
const Card = ({ children, className = "", hover = true, ...props }) => (
  <div
    className={`bg-white rounded-2xl shadow-sm border border-slate-200 transition-all duration-300 ${hover ? "hover:-translate-y-1 hover:border-blue-200 hover:shadow-md" : ""} ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Enhanced CardContent component
const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

// Badge component with glow effect
const Badge = ({ children, className = "", color = "blue", ...props }) => {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    green: "bg-green-100 text-green-700 border-green-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
    orange: "bg-orange-100 text-orange-700 border-orange-200",
    red: "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-300 ${colorClasses[color]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

// Dynamic data structure (backend-ready)
const aboutData = {
  hero: {
    title: "About Gautam Buddha University",
    subtitle: "An Ultimate Destination for Higher Learning",
    backgroundImage: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },

  // Values are injected from the university-stats source at render time; only
  // the icons and colours are configured here. See buildStatistics() below.
  statisticsMeta: [
    { icon: MapPin, statKey: "acres_campus", title: "Acres Campus", iconColor: "#2563eb" },
    { icon: Users, statKey: "students", title: "Students", iconColor: "#2563eb" },
    { icon: Award, statKey: "faculty_members", title: "Faculty Members", iconColor: "#2563eb" },
    { icon: BookOpen, statKey: "programs", title: "Programs", iconColor: "#2563eb" },
  ],

  overview: {
    title: "About Gautam Buddha University",
    description: "Gautam Buddha University, established in 2008 by the Government of Uttar Pradesh, stands as a beacon of educational excellence. With UGC recognition and AIU membership, our university is committed to providing world-class multidisciplinary education that combines traditional values with modern innovation across diverse academic fields.",
    image: "/assets/GBU.png"
  },

  vision: {
    icon: "Eye",
    title: "Our Vision",
    description: "A globally acclaimed integrated academic and research institution that creates a vibrant community of intellectuals and entrepreneurs endowed with Character, Creativity, Competence and Commitment, who can inspire meaningful transformations to ensure holistic growth and development of the society."
  },

  mission: {
    icon: "Target",
    title: "Our Mission",
    subtitle: "The Mission of University is expressed through the following goals:",
    points: [
      "To generate a community of scholars who can manage continuity and change.",
      "To seek and incorporate the best practices in teaching and learning from around the world.",
      "To inculcate in the learners due appreciation for ethical, ecological & economic issues of knowledge.",
      "To provide knowledge based scientific solutions to satisfy the need of society and industry.",
      "To ensure an academic environment that guarantees avenues for all historically excluded sections of the society."
    ]
  },

  governance: [
    {
      icon: "Users",
      title: "Chancellor",
      subtitle: "Chief Minister of UP",
      link: "/about-us/chancellor-message"
    },
    {
      icon: "Award",
      title: "Vice Chancellor",
      subtitle: "Academic Leadership",
      link: "/about-us/vice-chancellor-message"
    },
    {
      icon: "GraduationCap",
      title: "Deans of Schools",
      subtitle: "Academic Departments",
      link: "/organization"
    },
    {
      icon: "BookOpen",
      title: "Registrar",
      subtitle: "Administrative Affairs",
      link: "/about-us/registrar"
    }
  ],

  schools: [
    {
      name: "School of Engineering",
      icon: "Cpu",
      summary: "Technology-led UG/PG courses",
      link: "/schools/SOE"
    },
    {
      name: "School of ICT",
      icon: "Monitor",
      summary: "Computing & Information Technology",
      link: "/schools/SOICT"
    },
    {
      name: "School of Management",
      icon: "Briefcase",
      summary: "Business & Management Studies",
      link: "/schools/SOM"
    },
    {
      name: "School of Biotechnology",
      icon: "Microscope",
      summary: "Life Sciences & Research",
      link: "/schools/SOBT"
    },
    {
      name: "School of Law",
      icon: "Scale",
      summary: "Legal Studies & Practice",
      link: "/schools/SOL"
    },
    {
      name: "School of Vocational Studies & Applied Sciences",
      icon: "Building",
      summary: "Design & Planning",
      link: "/schools/SOVS"
    },
    {
      name: "School of Buddhist Studies",
      icon: "Flame",
      summary: "Philosophy & Spirituality",
      link: "/schools/SOBSC"
    },
    {
      name: "School of Humanities",
      icon: "Book",
      summary: "Liberal Arts & Literature",
      link: "/schools/SOHSS"
    }
  ],

  facilities: [
    {
      title: "Central Library",
      icon: "Library",
      summary: "Digital collections & research facilities",
      link: "/campus-life/library"
    },
    {
      title: "Modern Auditoriums",
      icon: "Mic",
      summary: "Advanced audio-visual systems",
      link: "/booking"
    },
    {
      title: "Smart Classrooms",
      icon: "Monitor",
      summary: "Technology-enabled learning spaces",
      link: "/academic/schools"
    },
    {
      title: "Research Labs",
      icon: "Microscope",
      summary: "State-of-the-art equipment",
      link: "/research/research-centers"
    },
    {
      title: "Computer Centers",
      icon: "Cpu",
      summary: "High-speed connectivity",
      link: "/it-cell"
    },
    {
      title: "Conference Halls",
      icon: "Building",
      summary: "Professional meeting spaces",
      link: "/booking"
    }
  ],

  hostelFeatures: [
    { text: "18 On-Campus Hostels (11 Boys', 6 Girls' & Married Scholar Hostel)", icon: "Home" },
    { text: "Online Hostel Management System (OHMS)", icon: "Monitor" },
    { text: "Single Occupancy Furnished Rooms & Wi-Fi", icon: "Wifi" },
    { text: "Hygienic Dining Halls & Mess Facilities", icon: "Utensils" },
    { text: "Gymnasium, Indoor Games & Sports Facilities", icon: "Dumbbell" },
    { text: "24×7 Security, CCTV & Medical Support", icon: "Shield" }
  ],

  greenFeatures: [
    { title: "Rainwater Harvesting", icon: "Droplets" },
    { title: "Solar-Powered Lighting", icon: "Sun" },
    { title: "Botanical Gardens", icon: "Flower" },
    { title: "Pedestrian Pathways", icon: "User" },
    { title: "Sustainable Design", icon: "Leaf" },
    { title: "Green Architecture", icon: "TreePine" }
  ],

  sportsFeatures: [
    { title: "47-Acre Sports Zone", icon: "Target", description: "Comprehensive outdoor facilities" },
    { title: "Multi-Sport Facilities", icon: "Dumbbell", description: "Cricket, Football, Squash, Gym" },
    { title: "World Class Indoor Stadium", icon: "Trophy", description: "State of Arts Indoor Multi-Sports" }
  ],

  researchStats: [
    { value: 3500, suffix: "+", label: "Publications", color: "blue" },
    { value: 82, suffix: "", label: "Ph.D.s Awarded", color: "green" },
    { label: "DST, CSIR", sublabel: "Sponsored Research", color: "purple" },
    { label: "AI, Cyber", sublabel: "Centers of Excellence", color: "orange" }
  ],

  studentLife: [
    {
      title: "30+ Clubs & Societies",
      icon: "Users",
      link: "/campus-life/clubs-societies"
    },
    {
      title: "NSS/NCC Programs",
      icon: "Award",
      link: "/campus-life/NSS"
    },
    {
      title: "Tech & Cultural Fests",
      icon: "Sparkles",
      link: "/announcements/event"
    },
    {
      title: "Campus Amenities",
      icon: "Home",
      link: "/campus-life/hostel-facilities"
    }
  ]

};

// Icon mapping for dynamic icon rendering
const iconMap = {
  MapPin, Users, Award, BookOpen, Star, Eye, Target, GraduationCap, Cpu, Monitor, Briefcase,
  Microscope, Scale, Building, Flame, Book, Library, Mic, Home, Wifi, Shield, Utensils,
  Heart, CreditCard, Droplets, Sun, Flower, User, Leaf, TreePine, Dumbbell, Trophy,
  Sparkles, ChevronDown, Check, Globe, ArrowRight, Play, Compass, Zap, Activity, Smile,
  Calendar, UserCheck, Phone, Mail, Download, ExternalLink
};

/** Pairs the icon/colour config with the current university-wide figures. */
const buildStatistics = (stats) =>
  aboutData.statisticsMeta.map((meta) => {
    const value = stats[meta.statKey] ?? "";
    const numeric = Number(String(value).replace(/[^0-9.]/g, ""));
    // StatsCard animates a plain number and prints numberText verbatim, so a
    // value carrying a "+"/"%" suffix has to go through numberText.
    const isPlainNumber = /^\d+$/.test(String(value).trim());
    return {
      icon: meta.icon,
      title: meta.title,
      iconColor: meta.iconColor,
      ...(isPlainNumber ? { number: numeric } : { numberText: String(value) }),
    };
  });

const AboutGbu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const universityStats = useUniversityStats();
  const statistics = buildStatistics(universityStats);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const renderIcon = (iconName, className = "w-6 h-6") => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  return (
    <SearchableWrapper>
      {/* justify-all: every paragraph and list item on this page is justified, headings are not (see index.css) */}
      <div className="min-h-screen bg-white justify-all">
        {/* Hero Section */}
        <BannerSection
          title={aboutData.hero.title}
          subtitle={aboutData.hero.subtitle}
          bgTheme={11}
        />

        {/* Statistics Section */}
        <StatsCard stats={statistics} />
        {/* Overview Section */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            {/* Side by side, the image stretches to the height of the text, so neither leaves an empty band */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:items-stretch">
              <div className="order-2 md:order-1">
                <div className="relative h-72 md:h-full md:min-h-80">
                  <img
                    src={aboutData.overview.image}
                    alt="Gautam Buddha University Campus"
                    className="absolute inset-0 rounded-2xl shadow-md ring-1 ring-slate-200 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2 md:flex md:flex-col md:justify-center">
                <Badge color="blue" className="mb-4">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Est. 2008
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 leading-tight">
                  {aboutData.overview.title}
                </h2>
                <p className="justify-text text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                  {aboutData.overview.description}
                </p>
                <Link to="/aboutUs/learnGBU">
                  <Button className="group">
                    Learn More
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Vision is one short statement and Mission a list of goals, so from 1280px Vision takes a
                third of the row and Mission two thirds. Below that a third is too narrow for justified
                text (wide gaps between words), so the two cards stack at full width. */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:gap-8 items-stretch">
              {/* Vision Card */}
              <div className="xl:col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md p-6 sm:p-8 flex flex-col justify-center group">
                <div>
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 flex items-center justify-center shrink-0">
                      {renderIcon(aboutData.vision.icon, "w-6 h-6")}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {aboutData.vision.title}
                    </h3>
                  </div>
                  {/* Justified from 640px up (gaps between words stay under 1em at every width). On phones
                      the column is too narrow for this text's long words, so it stays left-aligned there,
                      as on the Chancellor and VC message pages. In the 1280px+ column the taller line
                      spacing fills the card. */}
                  <p className="text-left sm:text-justify text-slate-600 text-sm sm:text-base leading-relaxed xl:leading-[1.9] font-normal">
                    {aboutData.vision.description}
                  </p>
                </div>
              </div>

              {/* Mission Card */}
              <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md p-6 sm:p-8 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center space-x-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600 flex items-center justify-center shrink-0">
                      {renderIcon(aboutData.mission.icon, "w-6 h-6")}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                      {aboutData.mission.title}
                    </h3>
                  </div>
                  {aboutData.mission.subtitle && (
                    <p className="text-slate-500 text-xs sm:text-sm font-medium italic mb-4 pb-2 border-b border-slate-100/80">
                      {aboutData.mission.subtitle}
                    </p>
                  )}
                  <ul className="space-y-3">
                    {aboutData.mission.points.map((point, index) => (
                      <li key={index} className="flex items-start group/item">
                        <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100 flex items-center justify-center shrink-0 mt-0.5 mr-3">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="justify-text text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Governance Section */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900">
                Governance & Organizational Leadership
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.governance.map((leader, index) => (
                <Link key={index} to={leader.link} className="block">
                  <Card className="text-center group h-full cursor-pointer">
                    <CardContent className="p-6">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3.5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                          {renderIcon(leader.icon, "w-7 h-7")}
                        </div>
                      </div>
                      <h3 className="font-semibold text-slate-900 text-lg mb-1 transition-colors group-hover:text-blue-700">{leader.title}</h3>
                      <p className="text-gray-600 text-sm">{leader.subtitle}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Schools Section */}
        <section className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-900">
                Academic Schools & Programs
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {aboutData.schools.map((school, index) => (
                <Link key={index} to={school.link} className="block">
                  <Card className="group cursor-pointer h-32 flex flex-col justify-center">
                    <CardContent className="p-4 text-center flex flex-col items-center justify-center">
                      <div className="mb-2.5 flex justify-center">
                        <div className="p-2.5 rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                          {renderIcon(school.icon, "w-5 h-5")}
                        </div>
                      </div>

                      <h3 className={`font-bold text-slate-900 leading-tight transition-colors group-hover:text-blue-700 ${school.name.length > 22 ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}`}>
                        {school.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Central Library — a short section from the Library page (same data, src/Data/libraryData.js) */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
              <div className="lg:col-span-5 group">
                <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-80 overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white">
                  <img
                    src="/assets/campusimg/library.jpg"
                    alt="Students studying in the GBU Central Library"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                <Badge color="blue" className="self-start">
                  <Library className="w-4 h-4 mr-2" />
                  Central Library
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900 leading-tight">
                  {LIBRARY_INFO.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {LIBRARY_INFO.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {LIBRARY_STATS.map((stat) => (
                    <div
                      key={stat.value}
                      className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-center transition hover:border-blue-200 hover:bg-white hover:shadow-sm"
                    >
                      <div className="text-lg sm:text-xl font-extrabold text-blue-900">{stat.label}</div>
                      <div className="mt-0.5 text-[11px] sm:text-xs text-slate-500 leading-snug">{stat.value}</div>
                    </div>
                  ))}
                </div>

                <div>
                  <Link to={LIBRARY_PAGE}>
                    <Button className="group">
                      Explore the Library
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hostel Section */}
        <section className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* The photo grid stretches to the height of the feature list beside it */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center md:items-stretch">
              <div className="space-y-4">
                <Badge color="blue" className="mb-1">
                  <Home className="w-4 h-4 mr-2" />
                  Residential Life
                </Badge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-blue-900 mb-4 leading-tight">
                  Hostel & Residential Experience
                </h2>

                <div className="space-y-2.5">
                  {aboutData.hostelFeatures.map((feature, index) => (
                    <div key={index} className="group flex items-center p-3 bg-white rounded-xl border border-slate-200 transition hover:border-blue-200 hover:bg-blue-50/40 hover:shadow-sm">
                      <div className="p-2 rounded-full mr-3 shrink-0 bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600">
                        {renderIcon(feature.icon, "w-4 h-4")}
                      </div>
                      <span className="text-xs sm:text-sm lg:text-base text-slate-800 font-semibold leading-snug">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:h-full">
                <div className="flex flex-col gap-3 pb-4 md:h-full">
                  <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-200 group bg-white h-32 sm:h-40 md:h-auto md:flex-1 md:min-h-32">
                    <img
                      src="/assets/hostels.jpg"
                      alt="GBU Hostel Building Overview"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-200 group bg-white h-32 sm:h-40 md:h-auto md:flex-1 md:min-h-32">
                    <img
                      src="/assets/hostel 1.jpg"
                      alt="GBU Hostel Residence Block"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 pt-4 md:h-full">
                  <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-200 group bg-white h-32 sm:h-40 md:h-auto md:flex-1 md:min-h-32">
                    <img
                      src="/assets/hostel 2.jpg"
                      alt="GBU Hostel Landscape & Greenery"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl shadow-sm border border-slate-200 group bg-white h-32 sm:h-40 md:h-auto md:flex-1 md:min-h-32">
                    <img
                      src="/assets/hostel2.jpg"
                      alt="GBU Student Residential Complex"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meditation & Wellness Section — image left, text right, open layout like the Hostel section.
            The image fills its column (it was a fixed 352px square, leaving a wide empty band). */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
              <div className="lg:col-span-5 group">
                <div className="relative h-64 sm:h-80 lg:h-full lg:min-h-80 overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white">
                  <img
                    src="/assets/meditation.jpg"
                    alt="Meditation dome at Gautam Buddha University"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-900 tracking-tight leading-tight">
                  Meditation & Wellness Center
                </h2>

                <div className="flex gap-8">
                  {[
                    { icon: "Activity", label: "Yoga" },
                    { icon: "Smile", label: "Meditation" },
                    { icon: "Leaf", label: "Wellness" }
                  ].map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="p-2.5 bg-blue-50 text-blue-700 ring-1 ring-blue-100 rounded-full mb-2 mx-auto w-10 h-10 flex items-center justify-center">
                        {renderIcon(item.icon, "w-5 h-5")}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>

                <p className="justify-text text-sm sm:text-base text-slate-600 leading-relaxed">
                  Our dedicated wellness center offers yoga sessions, mindfulness practices,
                  and spiritual guidance to nurture the holistic development of our students.
                  Experience tranquility in our serene meditation dome.
                </p>

                <div>
                  <Link to="/campus-life/meditation-center">
                    <Button className="group/btn gap-2">
                      Explore Wellness Programs
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sports & Recreation — Zigzag Item 1 (Content Left, Image Right) */}
        <section className="py-6 sm:py-8 bg-slate-50 border-y border-slate-100 text-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
              {/* Content on Left */}
              <div className="lg:col-span-7 space-y-5 lg:flex lg:flex-col lg:justify-center">
                <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs font-bold border border-blue-200">
                  <Trophy className="w-3.5 h-3.5 text-blue-600" />
                  <span>Olympic-Standard Athletics</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
                  Sports & Recreation
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  GBU boasts a sprawling 47-acre outdoor sports zone alongside the international-standard Eklavya Indoor Stadium, promoting athletic excellence, physical fitness, and competitive team spirit.
                </p>

                {/* 3 Sports Features in Clean Responsive Grid */}
                <div className="grid sm:grid-cols-3 gap-3.5 pt-1">
                  {aboutData.sportsFeatures.map((sport, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-2xl bg-white hover:bg-blue-50/60 border border-slate-200/90 hover:border-blue-200 transition-all duration-300 shadow-sm hover:shadow group"
                    >
                      <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700 w-fit mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                        {renderIcon(sport.icon, "w-5 h-5")}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-700 transition-colors">
                        {sport.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-snug">
                        {sport.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to="/campus-life/sports-fitness">
                    <Button
                      variant="primary"
                      size="md"
                      className="group shadow-sm hover:shadow-md"
                    >
                      Explore Sports Programs
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Image on Right */}
              <div className="lg:col-span-5 relative group">
                <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white h-72 sm:h-88 lg:h-full lg:min-h-88">
                  <img
                    src="/assets/campusimg/gbu-cricket-stadium.jpg"
                    alt="GBU Cricket Stadium and Sports Arena"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Glassmorphism Badge */}
                <div className="absolute -bottom-3 -left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">47-Acre Sports Zone</div>
                    <div className="text-[11px] text-slate-500 font-medium">Olympic Standard Stadium</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Student Life & Community — Zigzag Item 2 (Image Left, Content Right) */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-stretch">
              {/* Image on Left (Zigzag) */}
              <div className="lg:col-span-5 relative group order-2 lg:order-1">
                <div className="relative overflow-hidden rounded-2xl shadow-md border border-slate-200 bg-white h-72 sm:h-88 lg:h-full lg:min-h-88">
                  <img
                    src="/assets/clubs/clubs.jpg"
                    alt="GBU Student Clubs and Cultural Life"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating Glassmorphism Badge */}
                <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-3 z-10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">30+ Active Societies</div>
                    <div className="text-[11px] text-slate-500 font-medium">Cultural, Tech & Leadership</div>
                  </div>
                </div>
              </div>

              {/* Content on Right (Zigzag) */}
              <div className="lg:col-span-7 space-y-5 order-1 lg:order-2 lg:flex lg:flex-col lg:justify-center">
                <div className="self-start inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-bold border border-indigo-200">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Campus Life & Community</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-950 tracking-tight leading-tight">
                  Student Life & Community
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Beyond the classrooms, campus life at GBU thrives with student-led passion, cultural expressions, nationwide competitions, and inclusive residential camaraderie.
                </p>

                {/* 4 Interactive Activity Cards in 2x2 Grid */}
                <div className="grid sm:grid-cols-2 gap-3.5 pt-1">
                  {aboutData.studentLife.map((activity, index) => (
                    <Link
                      key={index}
                      to={activity.link}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 border border-slate-200/80 hover:border-indigo-200 transition-all duration-300 flex items-center gap-3.5 group cursor-pointer shadow-none hover:shadow-sm"
                    >
                      <div className="p-3 rounded-xl bg-indigo-100/70 text-indigo-700 shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        {renderIcon(activity.icon, "w-5 h-5")}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-indigo-700 transition-colors flex items-center justify-between">
                          <span>{activity.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to="/campus-life/clubs-societies">
                    <Button
                      variant="outline"
                      size="md"
                      className="group"
                    >
                      Explore All Societies
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default AboutGbu;
