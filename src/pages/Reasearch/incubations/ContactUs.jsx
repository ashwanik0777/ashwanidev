import React from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";

const ContactUs = () => {
  return (
    <SearchableWrapper>
      <section className="bg-slate-50/50 py-6 sm:py-10 px-2 sm:px-6 border-t border-slate-200/60" id="contact">
        <div className="max-w-2xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Contact Us
            </h2>
            <div className="h-1 w-12 sm:w-16 bg-amber-500 mt-1.5 sm:mt-2"></div>
          </div>

          {/* Compact Contact Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-slate-200/90 shadow-2xs">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 sm:mb-5">
              Incubation Center
            </h3>

            <div className="space-y-3.5 sm:space-y-4 text-slate-700 text-xs sm:text-base mb-6 sm:mb-8">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">E-mail: </span>
                  <a href="mailto:incubator@gbu.ac.in" className="text-indigo-600 hover:underline break-all sm:break-normal">
                    incubator@gbu.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">E-mail: </span>
                  <a href="mailto:gburif@gbu.ac.in" className="text-indigo-600 hover:underline break-all sm:break-normal">
                    gburif@gbu.ac.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-900">Phone: </span>
                  <span>+91-0120-2344209/6170/4275</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span>GBU Campus, Gr Noida-201312, UP, India</span>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 sm:pt-6 border-t border-slate-100">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-3">
                Important Links of Social Media platforms:
              </h4>

              <div className="flex gap-2.5 sm:gap-3 items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61550062356818"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href="https://twitter.com/GBU_Incubation"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                >
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href="https://instagram.com/gbu_incubation_centre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/company/gbu-incubation-centre"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                >
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default ContactUs;
