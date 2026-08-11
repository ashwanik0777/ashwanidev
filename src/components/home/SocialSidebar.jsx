import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Mail,
} from "lucide-react";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/gbugrnoida.dic/",
    icon: Facebook,
    color: "#1877F2",
    darkColor: "#0d5bbf",
  },
  {
    name: "X",
    href: "https://x.com/gbugrnoida",
    icon: Twitter,
    color: "#14171A",
    darkColor: "#000000",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/gbugrnoida/",
    icon: Instagram,
    color: "#E4405F",
    darkColor: "#c13050",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCOfkhzLuMRTfqSKMFr9LBCA",
    icon: Youtube,
    color: "#FF0000",
    darkColor: "#cc0000",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/school/gautam-buddha-university/",
    icon: Linkedin,
    color: "#0A66C2",
    darkColor: "#084d94",
  },
  {
    name: "Mail",
    href: "http://mail.gbu.ac.in/",
    icon: Mail,
    color: "#6366f1",
    darkColor: "#4338ca",
  },
];

export default function SocialSidebar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed left-0 top-1/2 -translate-y-1/2 z-50 transition-all duration-700 ease-out hidden md:block ${
        visible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="flex flex-col rounded-r-xl overflow-hidden shadow-[3px_0_18px_rgba(0,0,0,0.1)] bg-white/95 backdrop-blur-sm">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="group relative flex items-center justify-center w-10 h-10 transition-all duration-300 overflow-hidden"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 transition-all duration-300 scale-0 group-hover:scale-100 origin-center rounded-full"
                style={{ backgroundColor: item.darkColor }}
              />

              {/* Icon: brand color by default, white on hover */}
              <Icon
                className="relative z-10 w-4 h-4 transition-all duration-300 group-hover:scale-110"
                strokeWidth={2}
              />

              {/* Tooltip */}
              <span
                className="absolute left-full ml-2 px-2.5 py-1 rounded-md text-[11px] font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-x-1 group-hover:translate-x-0 shadow-lg"
                style={{ backgroundColor: item.darkColor }}
              >
                {item.name}
              </span>

              <style>{`
                .group:hover .social-icon-${item.name} {
                  color: white !important;
                }
              `}</style>
            </a>
          );
        })}
      </div>

      {/* Inline styles for icon colors */}
      <style>{`
        ${socialLinks.map((item) => `
          a[aria-label="${item.name}"] svg {
            color: ${item.color};
          }
          a[aria-label="${item.name}"]:hover svg {
            color: #ffffff !important;
          }
        `).join('')}
      `}</style>
    </div>
  );
}
