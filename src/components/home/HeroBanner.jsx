import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import homeData from "../../Data/home.json";

export default function WelcomePage() {
  const bannerData = homeData?.sections?.banner?.[0] || null;
  const BASE = (import.meta.env.VITE_HOST || "").replace(/\/$/, "");

  const resolveAssetUrl = (path) => {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    if (path.startsWith("/")) return path;
    const cleanPath = path.replace(/^\/+/, "");
    if (BASE) {
      return `${BASE}/${cleanPath.startsWith("media/") ? cleanPath : `media/${cleanPath}`}`;
    }
    return `/${cleanPath}`;
  };

  const [typedTitle, setTypedTitle] = useState("");
  const [isTitleDone, setIsTitleDone] = useState(false);

  const rawTitle = bannerData?.title || "Welcome to Gautam Buddha University";
  const fullTitle = rawTitle.replace(/Welcome to /i, "Welcome to\n");

  useEffect(() => {
    if (!bannerData) return;
    
    // Initial short delay to let the background load and capture attention
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      let currentText = "";
      
      const typingInterval = setInterval(() => {
        if (currentIndex < fullTitle.length) {
          currentText += fullTitle[currentIndex];
          setTypedTitle(currentText);
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTitleDone(true);
        }
      }, 50); // Nice, deliberate, and smooth character typing speed (50ms)
      
      return () => clearInterval(typingInterval);
    }, 400);

    return () => clearTimeout(startTimeout);
  }, [fullTitle, bannerData]);

  if (!bannerData) return null;

  const videoSrc = resolveAssetUrl(bannerData.video);

  return (
    <>
      {/* Scrolling Ticker - Placed on top right after header */}
      <div
        role="region"
        aria-label="Latest announcements"
        className="bg-blue-800 text-white overflow-hidden relative py-2.5 z-20 shadow-md"
        style={{ height: "auto", minHeight: "40px" }}
      >
        <div
          className="inline-flex items-center absolute whitespace-nowrap animate-scroll text-sm sm:text-base px-4"
          style={{
            animation: "scrollText 15s linear infinite",
            zIndex: 0,
          }}
        >
          <span className="flex items-center gap-1.5 bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] sm:text-xs font-bold uppercase px-2.5 py-0.5 rounded-full shadow-[0_2px_10px_rgba(225,29,72,0.4)] border border-red-400/50 tracking-wider mr-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            NEW
          </span>
          <span className="font-medium tracking-wide">
            ADMISSION OPEN 2026-27/Fifth Phase : Counseling-cum-admission scheduled on 4th August 2026
          </span>
        </div>
      </div>

      {/* Main welcome section */}
      <div className="relative min-h-[480px] h-[65vh] sm:h-[80vh] w-full flex flex-col justify-center overflow-hidden">
        {/* Background video or image */}
        {bannerData.video?.endsWith(".mp4") ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full z-0 video-responsive -mt-24 xl:-mt-21"
            poster={bannerData.poster_image}
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={videoSrc}
            alt="Banner"
            className="absolute inset-0 w-full h-full z-0 video-responsive"
            loading="eager"
          />
        )}

        {/* Light overlay for maximum video visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10 z-10" />

        {/* Content - Clean typography without glassmorphism */}
        <div className="relative z-20 text-white w-full px-4 sm:px-6 lg:px-12 pb-8 sm:pb-20 pt-16 sm:pt-24">
          <div className="max-w-5xl mx-auto sm:mx-0">

            {/* Title with Typing Effect & White/GBU Theme */}
            <h1 className="mb-3 sm:mb-5 text-center sm:text-left select-none leading-tight filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              {typedTitle.includes("\n") ? (
                <>
                  <span className="block text-lg sm:text-2xl md:text-3xl font-semibold text-white tracking-widest uppercase mb-1">
                    {typedTitle.split("\n")[0]}
                  </span>
                  <span className="block text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-50 to-sky-200 bg-clip-text text-transparent tracking-tight leading-tight">
                    {typedTitle.split("\n")[1]}
                    {!isTitleDone && (
                      <span className="inline-block w-[3.5px] h-[0.8em] bg-blue-400 ml-1.5 animate-blink align-baseline" />
                    )}
                  </span>
                </>
              ) : (
                <span className="block text-xl sm:text-3xl font-semibold text-white tracking-widest uppercase">
                  {typedTitle}
                  {!isTitleDone && (
                    <span className="inline-block w-[3.5px] h-[0.8em] bg-blue-400 ml-1.5 animate-blink align-baseline" />
                  )}
                </span>
              )}
            </h1>

            {/* Tagline Description */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isTitleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-sm sm:text-lg md:text-xl mb-6 sm:mb-8 text-center sm:text-left max-w-2xl leading-relaxed font-medium text-white drop-shadow-md"
            >
              {bannerData.content}
            </motion.p>

            {/* CTA Buttons - Compact horizontal row on mobile viewports */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="flex flex-row items-center justify-center sm:justify-start gap-2.5 sm:gap-4 flex-wrap"
            >
              {bannerData.button1_text && bannerData.button1_url && (
                <a
                  href={bannerData.button1_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-400 text-green-700 bg-green-200/90 hover:bg-green-300 font-semibold py-1.5 px-3.5 sm:py-3 sm:px-6 rounded-xl shadow-md focus:outline-none transition-all duration-300 text-center text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  {bannerData.button1_text}
                </a>
              )}
              {bannerData.button2_text && bannerData.button2_url && (
                <a
                  href={bannerData.button2_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-400 text-blue-700 bg-blue-200/90 hover:bg-blue-300 font-semibold py-1.5 px-3.5 sm:py-3 sm:px-6 rounded-xl shadow-md focus:outline-none transition-all duration-300 text-center text-xs sm:text-sm md:text-base whitespace-nowrap"
                >
                  {bannerData.button2_text}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>


      <style jsx>{`
        .video-responsive {
          object-fit: cover;
          object-position: center center;
        }

        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }

        @keyframes scrollText {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        /* Mobile Portrait (≤640px) */
        @media (max-width: 640px) and (orientation: portrait) {
          .video-responsive {
            object-fit: cover;
            object-position: center top;
            width: 100vw !important;
            height: 100vh !important;
          }
          
          @keyframes scrollText {
            0% {
              transform: translateX(100vw);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        }
        
        /* Mobile Landscape (≤640px) */
        @media (max-width: 640px) and (orientation: landscape) {
          .video-responsive {
            object-fit: cover;
            object-position: center center;
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        
        /* Tablet Portrait (641px-1024px) */
        @media (min-width: 641px) and (max-width: 1024px) and (orientation: portrait) {
          .video-responsive {
            object-fit: cover;
            object-position: center top;
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        
        /* Tablet Landscape (641px-1024px) */
        @media (min-width: 641px) and (max-width: 1024px) and (orientation: landscape) {
          .video-responsive {
            object-fit: cover;
            object-position: center center;
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        
        /* Desktop/Laptop (≥1025px) - Fit without scroll */
        @media (min-width: 1025px) {
          .video-responsive {
            object-fit: cover;
            object-position: center center;
            width: 100vw !important;
            height: 100vh !important;
          }
          
          /* Ensure container doesn't exceed viewport */
          .relative {
            max-height: 100vh;
          }
        }
        
        /* Extra wide screens */
        @media (min-width: 1920px) {
          .video-responsive {
            object-fit: cover;
            object-position: center center;
          }
        }
        
        /* Handle very wide aspect ratios */
        @media (min-aspect-ratio: 16/9) {
          .video-responsive {
            object-fit: cover;
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        
        /* Handle very tall aspect ratios */
        @media (max-aspect-ratio: 9/16) {
          .video-responsive {
            object-fit: cover;
            width: 100vw !important;
            height: 100vh !important;
          }
        }
        
        /* Prevent any overflow on any device */
        body, html {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}