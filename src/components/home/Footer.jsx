import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer
      className="bg-[#0e1626] text-white px-6 md:px-20 py-10"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and About */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <img
              src="/assets/logo1.png"
              alt="GBU Logo"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">Gautam Buddha University</h2>
              <p className="text-sm text-gray-300">
                Greater Noida, Uttar Pradesh
              </p>
            </div>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Gautam Buddha University, Greater Noida, is committed to providing
            world-class education and fostering innovation for a better
            tomorrow.
          </p>
         <div
      className="flex gap-5 mt-4 text-[22px]"
      aria-label="Social media links"
    >
       <a
    href="http://mail.gbu.ac.in/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Email"
  >
    <Mail
      strokeWidth={1.5}
      className="text-gray-600 transition-all duration-300  hover:scale-110 cursor-pointer"
    />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/gbugrnoida.dic/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebook"
  >
    <Facebook
      strokeWidth={1.5}
      className="text-[#1877F2]/80 transition-all duration-300 hover:text-[#1877F2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(24,119,242,0.35)] cursor-pointer"
    />
  </a>

  {/* X (Twitter) */}
  <a
    href="https://x.com/gbugrnoida"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="X"
  >
    <Twitter
      strokeWidth={1.5}
      className=" transition-all duration-300  hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(0,0,0,0.35)] cursor-pointer"
    />
  </a>

  {/* YouTube */}
  <a
    href="https://www.youtube.com/channel/UCOfkhzLuMRTfqSKMFr9LBCA"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="YouTube"
  >
    <Youtube
      strokeWidth={1.5}
      className="text-[#FF0000]/80 transition-all duration-300 hover:text-[#FF0000] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.35)] cursor-pointer"
    />
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/gbugrnoida/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
  >
    <Instagram
      strokeWidth={1.5}
      className="text-[#E4405F]/80 transition-all duration-300 hover:text-[#E4405F] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(228,64,95,0.35)] cursor-pointer"
    />
  </a>

  {/* LinkedIn */}
  <a
    href="https://www.linkedin.com/school/gautam-buddha-university/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <Linkedin
      strokeWidth={1.5}
      className="text-[#0A66C2]/80 transition-all duration-300 hover:text-[#0A66C2] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.35)] cursor-pointer"
    />
  </a>
    </div>
        </div>

        {/* Quick Links */}
        <nav aria-label="Quick links">
          <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "About GBU", path: "/about-us/About GBU" },
              { name: "Admissions", path: "/admissions/admission-process" },
              { name: "Academic Programs", path: "/admissions/courses-offered" },
              { name: "Research", path: "/research/research-centers" },
              { name: "Campus Life", path: "/campus-life/hero" },
              { name: "Placements", path: "/placements" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded transition-colors duration-300"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Important Links */}
        <nav aria-label="Important links">
          <h3 className="font-semibold text-lg mb-3">Important Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              { name: "Login Portal", path: "/login" },
              { name: "Online Fee Payment", path: "https://csms.gbu.ac.in/", isExternal: true },
              { name: "Library", path: "https://library.gbu.ac.in/", isExternal: true },
              { name: "Hostels", path: "https://hostels.gbu.ac.in/", isExternal: true },
              { name: "Examination", path: "https://exams.gbu.ac.in/", isExternal: true },
              { name: "Alumni", path: "https://alumni.gbu.ac.in/", isExternal: true },
            ].map((link) => (
              <li key={link.name}>
                {link.isExternal ? (
                  <a
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    to={link.path}
                    className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <section aria-label="Contact information">
          <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
          <address className="not-italic text-gray-300 text-sm">
            <strong>Address:</strong>
            <br />
            Gautam Buddha University
            <br />
            Greater Noida, Uttar Pradesh
            <br />
            PIN: 201312
          </address>
          <p className="mt-2 text-sm text-gray-300">
            <strong>Phone:</strong>{" "}
            <a
              href="tel:+911202344000"
              className="hover:text-orange-500"
            >
              +91-120-234-4000
            </a>
            <br />
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@gbu.ac.in"
              className="hover:text-orange-500"
            >
              info@gbu.ac.in
            </a>
          </p>
          <div className="mt-4">
            <label
              htmlFor="newsletter-email"
              className="font-semibold text-sm block mb-1"
            >
              Subscribe to Newsletter
            </label>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 text-white bg-[#1a202c] rounded-l-md outline-none focus:ring-2 focus:ring-orange-500"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="bg-orange-600 text-white px-4 rounded-r-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400 flex flex-col md:flex-row justify-between">
        <p>Copyright © 2026 GBU | All Rights Reserved</p>
        <div>
          <p>
            Designed and developed by{" "}
            <Link to="/it-cell" className="hover:text-white font-semibold">
              IT Cell
            </Link>{" "}
            and supported by{" "}
            <Link to="https://ccc.gbu.ac.in/" className="hover:text-white font-semibold">
              CCC
            </Link>
          </p>
        </div>
        <div className="flex gap-4 mt-2 md:mt-0">
          {[
            { name: "Privacy Policy", path: "/privacy-policy" },
            { name: "Terms of Use", path: "/terms-of-use" },
            { name: "Sitemap", path: "/sitemap" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded text-gray-400 transition-colors duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
