import React from "react";
import Focus from "./Focus";
import Services from "./Services";
import StartupsCarousel from "./StartupsCarousel";
import { Lightbulb } from "lucide-react";
import StartUp from "./StartUp";

import Team from "./Team";
import EventSlider from "./EventSlider";
import ContactUs from "./ContactUs";
// import IncubationNav from "./IncubationNav";

import BannerSection from "../../../components/HeroBanner.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";

const Incubation = () => {
  return (
    <SearchableWrapper>
      <div>
        {/* Banner Section */}
        <BannerSection
          title="Incubation Center"
          subtitle="Transforming research into real-world solutions through innovation and entrepreneurship"
          bgTheme={5} // Pick any theme (1 to 10) as per your design
        />

        {/* About Section */}
        <div className="bg-white py-16 lg:px-40 sm:px-10 md:px-20 border-b border-gray-100">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              About Us
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">

            <div className="md:w-1/2 text-center md:text-left">

              <p className="text-gray-700 text-base sm:text-lg mb-4">
                GBU started setting up its Incubation Centre in year 2018 which
                got StartinUP (Govt of Uttar Pradesh) recognition in year 2023 in
                the name of GBURIF (GBU Research and Innovation Foundation). Later
                on GBU got shortlisted for ATAL Incubation Centre subsequent to
                the application and presentation to ATAL Mission of NITI AAYOG.
                Then it was renamed as per the directions of Niti Aayog as AIC-GBU
                Incubation Centre.
              </p>
              <p className="text-gray-700 text-base sm:text-lg mb-4">
                The AIC-GBU Incubation Center primarily aims to support startups,
                encourage entrepreneurhip, and early stage businesses by providing
                available resources, mentorship, and infrastructure to help them
                grow and succeed. The incubation Centre support technological
                facilities and advises, network linkages, co-working spaces, lab
                facilities, mentoring, advisory support and initial growth funds
                (mainly from AIC grant to the university).
              </p>
            </div>

            <div className="relative md:w-1/2 w-full mt-8 md:mt-0 group">
              <div className="absolute inset-0 bg-indigo-600/10 rounded-2xl transform translate-x-4 translate-y-4 transition-transform group-hover:translate-x-2 group-hover:translate-y-2"></div>
              <img
                src="https://www.gburif.org/images/intro-carousel/dsf8939-b-copy.jpg"
                alt="Library"
                className="relative rounded-2xl shadow-lg w-full object-cover z-10 grayscale-[20%] transition-all duration-300 group-hover:grayscale-0"
              />
              <div className="absolute -bottom-6 -right-6 z-20 bg-slate-900 text-white text-center px-6 py-4 rounded-xl shadow-xl">
                <div className="text-2xl sm:text-3xl font-bold text-indigo-400">15+</div>
                <div>Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>

        <Focus />

        <Services />

        <Team />
        <StartupsCarousel />

        <StartUp />

        <div className="text-center py-20 bg-slate-50 border-t border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">Have an innovative idea?</h3>
          <p className="text-slate-600 max-w-2xl mx-auto mb-8 text-lg">
            Join the GBU Incubation Center and turn your vision into a successful startup. We provide mentorship, infrastructure, and funding support.
          </p>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSc2dX1NwPluJ1A1-2cHY39ck3CYhrdCskgIQZUxCj981eDwew/viewform"
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium rounded-xl shadow-md hover:shadow-xl transform transition-all duration-200">
            <Lightbulb size={24} className="w-6 h-6" />
            Submit Your Idea
          </a>
        </div>

        <EventSlider />

        <ContactUs />

      </div>
    </SearchableWrapper>
  );
};

export default Incubation;
