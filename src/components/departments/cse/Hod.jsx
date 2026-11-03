import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading, { SECTION_GUTTER, NARROW_CONTAINER } from "../SectionHeading";

const HodMessage = ({
  title = "From the Desk of HOD",
  image = "",
  name = "Dr. John Doe",
  designation = "Head of Department",
  messageParagraphs = [],
  contact = null,
}) => {
  const [showFull, setShowFull] = useState(false);
  const visibleCount = 2;

  const toggleView = () => setShowFull((prev) => !prev);
  const visibleParagraphs = showFull
    ? messageParagraphs
    : messageParagraphs.slice(0, visibleCount);

  return (
    <section className="pt-3 sm:pt-4 min-[2560px]:pt-8 pb-3 sm:pb-4 min-[2560px]:pb-8 bg-white">
      <div className={SECTION_GUTTER}>
        <div className={NARROW_CONTAINER}>
          <SectionHeading>{title}</SectionHeading>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 min-[2560px]:gap-10 bg-blue-50/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 min-[2560px]:p-10 shadow-sm border border-blue-100"
          >
            {/* HOD Image Section */}
            <div className="flex sm:flex-col items-center sm:text-center gap-4 sm:gap-2 sm:w-44 min-[2560px]:w-72 shrink-0">
              <div className="w-20 h-20 sm:w-32 sm:h-32 min-[2560px]:w-56 min-[2560px]:h-56 rounded-full overflow-hidden shadow-md ring-4 ring-blue-100 shrink-0">
                {image ? (
                  <img
                    src={image}
                    alt={`${name} - ${designation}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg min-[2560px]:text-3xl font-bold text-blue-900 leading-tight">{name}</h3>
                <p className="text-xs sm:text-sm min-[2560px]:text-xl text-blue-600 font-medium mt-0.5 leading-snug">{designation}</p>
              </div>
            </div>

            {/* Message Box */}
            <div className="flex-1 space-y-3 min-[2560px]:space-y-5 text-slate-700 sm:border-l sm:border-blue-100 sm:pl-6 min-[2560px]:pl-10">
              {Array.isArray(messageParagraphs) && messageParagraphs.length > 0 ? (
                <>
                  {visibleParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed text-sm sm:text-base min-[2560px]:text-2xl text-justify">
                      {para}
                    </p>
                  ))}

                  {messageParagraphs.length > visibleCount && (
                    <button
                      onClick={toggleView}
                      className="px-4 py-1.5 min-[2560px]:px-6 min-[2560px]:py-2.5 text-sm min-[2560px]:text-xl font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 shadow-sm transition duration-200"
                    >
                      {showFull ? "View Less" : "View More"}
                    </button>
                  )}
                </>
              ) : (
                <p className="leading-relaxed text-base italic text-gray-500">
                  No message available.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HodMessage;
