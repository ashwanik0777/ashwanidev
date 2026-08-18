import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FunctionalAreasSwiper({
  title = "Key Functional Areas",
  functionalAreas = [],
}) {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">{title}</h2>
        <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-12 md:px-14">
        {/* Navigation Arrows */}
        <button
          aria-label="Previous Slide"
          className="swiper-button-prev-functional flex absolute left-1 sm:left-2 md:-left-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-full p-2.5 sm:p-3 shadow-lg hover:bg-purple-600 hover:text-white text-purple-700 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          aria-label="Next Slide"
          className="swiper-button-next-functional flex absolute right-1 sm:right-2 md:-right-2 top-1/2 transform -translate-y-1/2 z-20 bg-white/95 backdrop-blur-md border border-gray-200 rounded-full p-2.5 sm:p-3 shadow-lg hover:bg-purple-600 hover:text-white text-purple-700 transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-functional",
              prevEl: ".swiper-button-prev-functional",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-14"
          >
            {functionalAreas.map((area, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="min-h-[390px] sm:min-h-[410px] h-full flex flex-col bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="h-44 sm:h-48 w-full bg-gray-100 overflow-hidden flex-shrink-0">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-lg text-blue-900 mb-2 leading-snug">
                      {area.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
