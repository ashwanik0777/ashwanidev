import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Users,
  Award,
  Cpu,
  Leaf,
  Rocket,
  Calendar,
  ExternalLink,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import { coeGreenSkillsAiData } from "../../Data/schools/SOVS/about/coe-green-skills-ai.js";

const iconMap = {
  Users: Users,
  Handshake: Award,
  Award: Award,
  Calendar: Calendar,
  Cpu: Cpu,
  Leaf: Leaf,
  Rocket: Rocket,
};

const CoeGreenSkillsAi = () => {
  const data = coeGreenSkillsAiData;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const gallery = data.gallery || [];

  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null ? (prev > 0 ? prev - 1 : gallery.length - 1) : 0
      );
    },
    [gallery.length]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null ? (prev < gallery.length - 1 ? prev + 1 : 0) : 0
      );
    },
    [gallery.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setLightboxIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, handlePrev, handleNext]);

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 text-slate-900 pb-10">
        {/* Hero Banner */}
        <BannerSection
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          bgTheme={data.hero.bgTheme}
        />

        {/* Clean Key Stats Bar (No overlap / cut-off) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {data.stats.map((st, i) => {
              const IconComp = iconMap[st.icon] || Award;
              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-200/90 flex items-center gap-3 sm:gap-4"
                >
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-2xl font-extrabold text-emerald-950">
                      {st.number}
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {st.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FOUNDING PARTNERS & LOGO SHOWCASE                                         */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
              Partners & Enablers
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Collaborating Organizations
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 items-stretch">
            {data.partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all border border-slate-200/90 flex flex-col items-center justify-center text-center group"
              >
                <div className="h-16 w-full flex items-center justify-center mb-3">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-h-14 max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-800 leading-tight">
                  {partner.name}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INAUGURATION DETAILS & DIGNITARIES                                        */}
        {/* ========================================================================= */}
        <section className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Inauguration
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                {data.inauguration.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {data.inauguration.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-slate-100">
              {data.inauguration.dignitaries.map((dig, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-100/60"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-sm">
                    {dig.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {dig.name}
                    </h4>
                    <p className="text-xs text-emerald-700 font-semibold">
                      {dig.role}
                    </p>
                    <p className="text-xs text-slate-500">
                      {dig.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CORE FOCUS AREAS & OBJECTIVES                                             */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
              Focus Areas & Objectives
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Core Training & Innovation Pillars
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.pillars.map((pillar) => {
              const IconComp = iconMap[pillar.icon] || Cpu;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${pillar.accent} text-white flex items-center justify-center mb-5 shadow`}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {pillar.title}
                    </h3>
                    <ul className="space-y-3">
                      {pillar.points.map((pt, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CLEAN PHOTO GALLERY (With Smooth Lightbox Navigation)                     */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 bg-slate-100/70 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
                Gallery
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Event & Ceremony Moments
              </h2>
              <div className="w-16 h-1 bg-emerald-600 mx-auto mt-2.5 rounded-full" />
            </div>

            {/* Photos Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {gallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className="group relative h-48 sm:h-60 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer bg-slate-900 border border-slate-200"
                >
                  <img
                    src={item.src}
                    alt="Centre Moment"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-md">
                      <Eye className="w-5 h-5 text-emerald-700" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Smooth Lightbox Modal with Next / Prev Navigation */}
        <AnimatePresence>
          {lightboxIndex !== null && gallery[lightboxIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Close Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(null);
                }}
                className="absolute top-4 right-4 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev Button */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                aria-label="Previous Photo"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-xl hover:scale-110 active:scale-95"
                aria-label="Next Photo"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Central Image Container with Smooth Animation */}
              <div
                className="relative max-w-6xl max-h-[85vh] flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={gallery[lightboxIndex].src}
                    src={gallery[lightboxIndex].src}
                    alt={`Moment ${lightboxIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-[82vh] max-w-full rounded-2xl object-contain shadow-2xl"
                  />
                </AnimatePresence>
              </div>

              {/* Photo Counter Pill */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs sm:text-sm font-semibold tracking-wider shadow">
                {lightboxIndex + 1} / {gallery.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* MEDIA COVERAGE (Concise)                                                  */}
        {/* ========================================================================= */}
        <section className="py-6 sm:py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider">
              Press & Media
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Media Coverage
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mt-2.5 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.mediaCoverage.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-slate-200 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide block mb-2">
                    {item.source}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {item.headline}
                  </h4>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                  Read Article <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default CoeGreenSkillsAi;
