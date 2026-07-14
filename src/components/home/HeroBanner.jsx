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

  const fullTitle = bannerData?.title || "Welcome to Gautam Buddha University";

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
      {/* Main welcome section */}
      <div className="relative h-[82.4vh] w-full flex flex-col justify-center overflow-hidden">
        {/* Background video or image */}
        {bannerData.video?.endsWith(".mp4") ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full z-0 video-responsive -mt-18"
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Content - Improved mobile responsiveness with animated entrance */}
        <div className="relative z-20 text-white w-full px-4 sm:px-6 lg:px-10 pb-16 sm:pb-24">
          <div className="max-w-4xl mx-auto lg:mx-0">
            {/* Title with Typing Effect */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 text-center sm:text-left capitalize leading-tight select-none">
              {typedTitle}
              {!isTitleDone && (
                <span className="inline-block w-[3px] h-[0.9em] bg-blue-400 ml-1 animate-blink align-middle" />
              )}
            </h1>

            {/* Description Fades In after Title types */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isTitleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-center sm:text-left max-w-2xl mx-auto sm:mx-0 leading-relaxed font-medium"
            >
              {bannerData.content}
            </motion.p>

            {/* Buttons Cascade In after Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center sm:justify-start gap-2 sm:gap-4"
            >
              {bannerData.button1_text && bannerData.button1_url && (
                <a
                  href={bannerData.button1_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-400 text-green-600 bg-green-200 hover:bg-green-300 hover:text-green-700 hover:border-green-500 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 text-center text-xs sm:text-sm md:text-base"
                >
                  {bannerData.button1_text}
                </a>
              )}
              {bannerData.button2_text && bannerData.button2_url && (
                <a
                  href={bannerData.button2_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-400 text-blue-600 bg-blue-200 hover:bg-blue-300 hover:text-blue-700 hover:border-blue-500 font-semibold py-2.5 px-5 sm:py-3 sm:px-6 rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-center text-xs sm:text-sm md:text-base"
                >
                  {bannerData.button2_text}
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker - Mobile optimized */}
      <div
        role="region"
        aria-label="Latest announcements"
        className="bg-blue-800 text-white overflow-hidden relative py-2 "
        style={{ height: "auto", minHeight: "40px" }}
      >
        <div
          className="inline-block absolute whitespace-nowrap animate-scroll text-sm sm:text-base"
          style={{
            animation: "scrollText 15s linear infinite", // Slower on mobile
            zIndex: 0,
          }}
        >
          Admissions open for 2026-27 academic session | Admissions open for 2026-27 academic session | Admissions open for 2026-27 academic session
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