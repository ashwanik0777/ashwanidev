import React from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Users,
  BarChart,
  Activity,
  Calendar,
} from "lucide-react";
import StatsCard from "../StatsCard";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const Card = ({ className = "", children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`rounded-2xl border border-slate-100 shadow-md bg-white hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

const CardContent = ({ className = "", children }) => (
  <div className={`px-4 py-4 sm:px-6 sm:py-6 ${className}`}>{children}</div>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "md",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none cursor-pointer";
  const variants = {
    default: "bg-slate-900 text-white hover:bg-slate-800 shadow-md hover:scale-102",
    outline: "border border-slate-200 text-slate-700 bg-white hover:bg-slate-50",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <button
      className={`${base} ${variants[variant] || variants.default} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const NSSSocialMedia = ({ nssData }) => {
  const defaultHandles = [
    {
      platform: "Facebook",
      handle: "@gbunss",
      followers: "2.5K+",
      link: "https://www.facebook.com/gbunss/",
      description: "Official event updates, community drives, and social impact stories.",
      color: "bg-blue-600",
      icon: Facebook,
    },
    {
      platform: "Instagram",
      handle: "@gbu.nss",
      followers: "3.2K+",
      link: "https://www.instagram.com/gbu.nss",
      description: "Visual photo stories and volunteer highlights from NSS GBU.",
      color: "bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600",
      icon: Instagram,
    },
    {
      platform: "Twitter / X",
      handle: "@gbunss",
      followers: "1.2K+",
      link: "https://x.com/gbunss",
      description: "Real-time news, announcements, and Ministry of Youth Affairs updates.",
      color: "bg-slate-950",
      icon: Twitter,
    },
    {
      platform: "LinkedIn",
      handle: "@gbunsstest",
      followers: "1.8K+",
      link: "https://www.linkedin.com/company/gbunsstest/",
      description: "Professional networking, leadership recognitions, and annual reports.",
      color: "bg-sky-700",
      icon: Linkedin,
    },
  ];

  const dbSocial = nssData?.content?.socialMedia || {};
  const socialHandles = defaultHandles.map(handle => {
    const key = handle.platform.toLowerCase().replace(/[^a-z]/g, "");
    if (dbSocial[key]) {
      return {
        ...handle,
        link: dbSocial[key],
      };
    }
    return handle;
  });

  const socialImpactStats = [
    {
      icon: Users,
      numberText: "8,700+",
      title: "Total Followers",
      iconColor: "#2563eb",
    },
    {
      icon: BarChart,
      numberText: "25,000+",
      title: "Monthly Reach",
      iconColor: "#16a34a",
    },
    {
      icon: Activity,
      numberText: "4.2%",
      title: "Engagement Rate",
      iconColor: "#f59e0b",
    },
    {
      icon: Calendar,
      numberText: "24+",
      title: "Posts This Month",
      iconColor: "#9333ea",
    },
  ];

  return (
    <SearchableWrapper>
      <div className="space-y-12 px-4 sm:px-6 lg:px-12 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            NSS GBU Social Media Hub
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Connect with Gautam Buddha University National Service Scheme across official platforms.
          </p>
        </motion.div>

        {/* Engagement Statistics */}
        <StatsCard stats={socialImpactStats} />

        {/* Social Media Handles Grid */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Follow Our Official Handles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialHandles.map((handle, index) => {
              const Icon = handle.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                >
                  <CardContent className="p-6 text-center flex flex-col items-center h-full justify-between">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-16 h-16 ${handle.color} rounded-2xl flex items-center justify-center mb-4 shadow-md text-white`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-1">
                        {handle.platform}
                      </h4>
                      <p className="text-sm font-semibold text-blue-600 mb-6">{handle.handle}</p>
                    </div>
                    <Button
                      className="w-full mt-auto"
                      onClick={() => window.open(handle.link, "_blank")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Connect on {handle.platform}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default NSSSocialMedia;
