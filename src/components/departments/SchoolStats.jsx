"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CounterValue = ({ end, isInView }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime;
      const duration = 2000;

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = (currentTime - startTime) / duration;
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [end, isInView]);

  return <span>{count}</span>;
};

const Counter = ({ value, label, suffix = "", isInView }) => (
  <div className="flex flex-col items-center px-2 py-1 text-center">
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-2xl sm:text-3xl font-extrabold text-blue-600 tracking-tight"
    >
      <CounterValue end={value} isInView={isInView} />
      <span className="text-blue-600 ml-0.5">{suffix}</span>
    </motion.div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-xs sm:text-sm text-gray-600 font-semibold mt-1"
    >
      {label}
    </motion.div>
  </div>
);

const SchoolStats = ({ title, stats }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  return (
    <section className="py-10 bg-white" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 tracking-tight">
              {title}
            </h2>
            <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto mt-2 rounded-full" />
          </motion.div>
        )}

        {stats && stats.length > 0 ? (
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3.5 sm:p-5 rounded-2xl bg-gradient-to-b from-blue-50/60 to-gray-50 border border-blue-100/80 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
              >
                <Counter
                  value={stat.value || 0}
                  label={stat.label || "No label"}
                  suffix={stat.suffix || ""}
                  isInView={isInView}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No stats available.</p>
        )}
      </div>
    </section>
  );
};

export default SchoolStats;
