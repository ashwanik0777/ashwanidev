import React from "react";
import { Link } from "react-router-dom";

const LeadershipCard = ({ name, title, image, description }) => {
  const safeName = name || "Dean";
  const safeTitle = title || "Dean";
  const safeImage =
    image ||
    "https://ui-avatars.com/api/?name=Dean&background=0D8ABC&color=fff&size=300";
  const safeDescription =
    description ||
    "Dean's message will be updated soon. Please check back later.";

  return (
    <section className="py-12 sm:py-16 ">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
          Dean's <span className="text-blue-800">Message</span>
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full bg-white rounded-3xl shadow-xl border border-blue-200 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          <img
            src={safeImage}
            alt={safeName}
            className="w-60 h-56 sm:w-48 sm:h-64 md:w-[220px] md:h-[300px] object-cover rounded-xl shadow-md"
          />
          <div className="text-center md:text-left">
            <Link to="/academics/faculty/2"><h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900">
              {safeName}
            </h3></Link>
            <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3">
              {safeTitle}
            </p>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line text-justify">
              {safeDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCard;
