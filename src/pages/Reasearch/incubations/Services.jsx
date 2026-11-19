import React, { useState } from "react";
import { motion } from "framer-motion";
import { Building2, Maximize2 } from "lucide-react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import ImageLightbox from "../../../components/ui/ImageLightbox";
import { incubationFacilities } from "../../../Data/incubationData.js";

/*
 * The facility photos are collages of several pictures, in different shapes (square, wide, tall).
 * They are laid out in columns at their own shape, so nothing is cropped, and open full screen.
 */
export default function Services() {
  const [openIndex, setOpenIndex] = useState(null);
  const [broken, setBroken] = useState({});
  const photos = incubationFacilities.map((item) => ({ src: item.image, title: item.name }));

  return (
    <SearchableWrapper>
      <div className="w-full" id="facilities">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Infrastructure
          </span>
          <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight mt-2 sm:mt-3">Facilities</h2>
          <div className="w-12 sm:w-16 h-1 bg-indigo-600 mx-auto mt-2 sm:mt-4 rounded-full"></div>
          {/* <p className="mt-2 sm:mt-4 text-slate-600 max-w-2xl mx-auto text-xs sm:text-base">
            State-of-the-art infrastructure provided by GBU Incubation Centre for startups and incubatees
          </p> */}
        </div>

        {/* Facilities: columns of whole photos */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6">
          {incubationFacilities.map((item, index) => (
            <motion.div
              key={`${item.image}-${index}`}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: (index % 3) * 0.05 }}
              className="mb-4 sm:mb-6 break-inside-avoid"
            >
              <button
                type="button"
                onClick={() => !broken[index] && setOpenIndex(index)}
                disabled={!!broken[index]}
                aria-label={`View ${item.name} full screen`}
                className="group block w-full overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:translate-y-0"
              >
                <div className="relative overflow-hidden bg-slate-100">
                  {broken[index] ? (
                    <div className="flex aspect-[4/3] items-center justify-center text-slate-400">
                      <Building2 className="w-10 h-10" />
                    </div>
                  ) : (
                    <>
                      <img
                        src={item.image}
                        alt={item.name}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                        onError={() => setBroken((prev) => ({ ...prev, [index]: true }))}
                      />
                      {/* Hover: darken a little and show the full-screen icon */}
                      <span className="absolute inset-0 flex items-center justify-center bg-slate-900/0 transition-colors duration-300 group-hover:bg-slate-900/25">
                        <span className="flex h-12 w-12 scale-90 items-center justify-center rounded-full bg-white/95 text-indigo-600 opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                          <Maximize2 className="h-5 w-5" />
                        </span>
                      </span>
                      {/* Touch screens have no hover, so a small icon stays in the corner */}
                      <span className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-indigo-600 shadow sm:hidden">
                        <Maximize2 className="h-4 w-4" />
                      </span>
                    </>
                  )}
                </div>

                <div className="px-4 py-3.5 sm:px-5 sm:py-4 text-center">
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors">{item.name}</h3>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {openIndex !== null && (
          <ImageLightbox images={photos} index={openIndex} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
        )}
      </div>
    </SearchableWrapper>
  );
}
