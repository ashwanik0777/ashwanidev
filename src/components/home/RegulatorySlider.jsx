import React from "react";

const regulatoryBodies = [
  {
    name: "UGC",
    logo: "/assets/home/UGClogo.webp",
    url: "https://www.ugc.gov.in/",
  },
  {
    name: "BCI",
    logo: "/assets/home/bcilogo.png",
    url: "https://www.barcouncilofindia.org/",
  },
  {
    name: "NCTE",
    logo: "/assets/home/NCTElogo.jpeg",
    url: "https://ncte.gov.in/",
  },
  {
    name: "CoA",
    logo: "/assets/home/COAlogo.jpeg",
    url: "https://www.coa.gov.in/",
  },
  {
    name: "RCI",
    logo: "/assets/home/RCIlogo.png",
    url: "https://rehabcouncil.nic.in/",
  },
];

export default function RegulatorySlider() {
  const items = [...regulatoryBodies, ...regulatoryBodies, ...regulatoryBodies];

  return (
    <section className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800">
          Regulatory Bodies
        </h2>
      </div>
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex items-center gap-20 md:gap-32 animate-regulatory-scroll px-8">
          {items.map((body, idx) => (
            <a
              key={`${body.name}-${idx}`}
              href={body.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 transition-all duration-300 hover:scale-110"
              title={body.name}
            >
              <img
                src={body.logo}
                alt={body.name}
                className="h-20 md:h-24 w-auto object-contain transition-all duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes regulatoryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-regulatory-scroll {
          animation: regulatoryScroll 20s linear infinite;
          width: max-content;
        }
        .animate-regulatory-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
