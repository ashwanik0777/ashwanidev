import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, DollarSign, MapPin, Calendar, BookOpen } from "lucide-react";

export default function DroneCourseCard({
  sectionTitle = "Courses Offered",
  sectionSubtitle,
  imageSrc,
  imageAlt = "Drone Training Course",
  badgeText = "FLAGSHIP",
  courseTitle,
  courseDescription,
  duration,
  modeDetails,
  price,
  eligibility,
  startDate,
  venue,
  highlights = [],
  syllabusLink,
}) {
  return (
    <section className="py-8 sm:py-12 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 tracking-tight">
            {sectionTitle}
          </h2>
          <div className="w-20 sm:w-24 h-1.5 bg-blue-600 mx-auto mt-3 rounded-full" />
          {sectionSubtitle && (
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {sectionSubtitle}
            </p>
          )}
        </motion.div>

        {/* Course Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row bg-gradient-to-br from-white to-blue-50/40 border border-blue-100 shadow-xl rounded-2xl overflow-hidden"
        >
          {/* Image Side */}
          <div className="lg:w-5/12 w-full relative min-h-[300px] lg:min-h-full bg-gray-900">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full text-white text-xs font-extrabold tracking-wider shadow-lg bg-blue-600">
              {badgeText}
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="text-xs uppercase font-semibold text-blue-300 tracking-wider">
                Certification Program
              </span>
              <h4 className="text-lg font-bold mt-1 text-white leading-snug">
                {courseTitle}
              </h4>
            </div>
          </div>

          {/* Details Side */}
          <div className="flex flex-col p-6 sm:p-8 lg:w-7/12 gap-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-blue-900 mb-3 leading-tight">
                {courseTitle}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {courseDescription}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-sm text-center">
                <div className="flex items-center justify-center gap-1.5 text-blue-600 text-sm sm:text-base font-bold">
                  <Clock className="w-4 h-4 flex-shrink-0" />
                  <span>{duration}</span>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Duration</div>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-blue-100 shadow-sm text-center">
                <div className="flex items-center justify-center gap-1.5 text-blue-600 text-sm sm:text-base font-bold truncate">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{startDate}</span>
                </div>
                <div className="text-xs text-gray-500 font-medium mt-0.5">Start Date</div>
              </div>
            </div>

            {/* Mode & Schedule Details Banner */}
            {modeDetails && (
              <div className="bg-blue-600/10 border-l-4 border-blue-600 p-4 rounded-r-xl">
                <h5 className="font-bold text-blue-900 text-xs uppercase tracking-wide mb-1">
                  Mode & Practical Training Breakdown
                </h5>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {modeDetails}
                </p>
              </div>
            )}

            {/* Key Info List */}
            <div className="text-xs sm:text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100 space-y-2">
              <p className="flex items-start">
                <strong className="text-gray-900 min-w-[90px]">Eligibility:</strong>
                <span className="text-gray-600">{eligibility}</span>
              </p>
              <p className="flex items-start">
                <strong className="text-gray-900 min-w-[90px]">Venue:</strong>
                <span className="text-gray-600">{venue}</span>
              </p>
            </div>

            {/* Course Highlights Grid */}
            {highlights.length > 0 && (
              <div>
                <h4 className="font-bold text-blue-900 text-base mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Highlights of the Course
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-white p-4 rounded-xl border border-blue-100">
                  {highlights.map((point, index) => (
                    <div key={index} className="flex items-start text-xs sm:text-sm text-gray-700 gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus Download Button */}
            {syllabusLink && (
              <div className="mt-2">
                <a
                  href={syllabusLink}
                  download
                  className="block text-center w-full py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                >
                  Download Syllabus PDF
                </a>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
