import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Linkedin,
  Youtube,
  Eye,
} from "lucide-react";
import { trackVisitor } from "../../services/visitorService";
import { trackPageVisit } from "../../services/analyticsService";
import { subscribeToNewsletter } from "../../services/subscriberService";
import { MAINTENANCE_COMPLAINT_FORM_URL, TIMETABLE_URL } from "../../Data/formsData";

// Three link columns, kept about the same length (5 / 5 / 4)
const FOOTER_LINK_GROUPS = [
  {
    title: "Quick Links",
    links: [
      { name: "About GBU", path: "/about-us/about-gbu" },
      { name: "Admissions", path: "https://gbuadm.samarth.edu.in/", isExternal: true },
      { name: "Research", path: "/research/research-centers" },
      { name: "Campus Life", path: "/campus-life/hero" },
      { name: "Placements", path: "/placements" },
    ],
  },
  {
    title: "Student Services",
    links: [
      { name: "Online Fee Payment", path: "https://csms.gbu.ac.in/", isExternal: true },
      { name: "Examination", path: "https://exams.gbu.ac.in/", isExternal: true },
      { name: "Time Table", path: TIMETABLE_URL, isExternal: true },
      { name: "Library", path: "https://library.gbu.ac.in/", isExternal: true },
      { name: "Hostels", path: "https://hostels.gbu.ac.in/", isExternal: true },
    ],
  },
  {
    title: "Important Links",
    links: [
      { name: "Login Portal", path: "/login" },
      { name: "Leave/Medical Forms", path: "/forms" },
      { name: "Online Maintenance Complaint Form", path: MAINTENANCE_COMPLAINT_FORM_URL, isExternal: true },
      { name: "Alumni", path: "/alumni" },
    ],
  },
];

const footerLinkClass =
  "hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded transition-colors duration-300";

const FooterLinkColumn = ({ title, links }) => (
  <nav aria-label={title}>
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    <ul className="space-y-2 text-gray-300 text-sm">
      {links.map((link) => (
        <li key={link.name}>
          {link.isExternal ? (
            <a href={link.path} target="_blank" rel="noopener noreferrer" className={footerLinkClass}>
              {link.name}
            </a>
          ) : (
            <Link to={link.path} className={footerLinkClass}>
              {link.name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState({ loading: false, message: "", type: "" });
  const { pathname } = useLocation();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus({ loading: true, message: "", type: "" });
    try {
      await subscribeToNewsletter(email);
      setSubscribeStatus({ loading: false, message: "Successfully subscribed!", type: "success" });
      setEmail("");
      setTimeout(() => setSubscribeStatus({ loading: false, message: "", type: "" }), 3000);
    } catch (err) {
      setSubscribeStatus({ 
        loading: false, 
        message: err.response?.data?.errors?.[0]?.message || "Subscription failed. Try again.", 
        type: "error" 
      });
    }
  };
  // Track unique visitor once on mount
  useEffect(() => {
    trackVisitor().then((count) => {
      if (count > 0) setVisitorCount(count);
    });
  }, []);

  // Track page visit on every navigation (SPA route change)
  useEffect(() => {
    trackPageVisit(pathname, document.referrer);
  }, [pathname]);
  return (
    <footer
      className="bg-[#0e1626] text-white px-4 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-12"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 xl:grid-cols-[20rem_1fr_1fr_1fr_1.4fr]">
        {/* Logo and About: full row until there is room for five columns */}
        <div className="col-span-2 sm:col-span-3 xl:col-span-1">
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
          {/* 13px on phones and a fixed 20rem column on desktop keep the justified word gaps even */}
          <p className="justify-text text-gray-400 text-[13px] sm:text-sm mt-4">
            Gautam Buddha University, Greater Noida, is committed to providing
            world-class education and fostering innovation for a better
            tomorrow.
          </p>
         <div
      className="flex gap-5 mt-4 text-[22px]"
      aria-label="Social media links"
    >
       <a
    href="mailto:info@gbu.ac.in"
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
      className="text-white/80 transition-all duration-300 hover:text-white hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.35)] cursor-pointer"
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

        {/* Link columns */}
        {FOOTER_LINK_GROUPS.map((group) => (
          <FooterLinkColumn key={group.title} title={group.title} links={group.links} />
        ))}

        {/* Contact */}
        <section
          aria-label="Contact information"
          className="col-span-2 sm:col-span-3 sm:grid sm:grid-cols-3 sm:gap-x-8 xl:col-span-1 xl:block"
        >
          {/* Below xl: address, phone / email and newsletter line up under the three link columns */}
          <div className="sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:content-start xl:block">
            <h3 className="font-semibold text-lg mb-3 sm:col-span-2">Contact Us</h3>
            <address className="not-italic text-gray-300 text-sm">
              <strong>Address:</strong>
              <br />
              Gautam Buddha University
              <br />
              Greater Noida, Uttar Pradesh
              <br />
              PIN: 201312
            </address>
            <p className="mt-2 sm:mt-0 xl:mt-2 text-sm text-gray-300">
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
          </div>
          <div className="mt-4 sm:mt-0 xl:mt-4">
            <label
              htmlFor="newsletter-email"
              className="font-semibold text-sm block mb-1"
            >
              Subscribe to Newsletter
            </label>
            <form className="@container flex flex-col gap-2" onSubmit={handleSubscribe}>
              {/* Button beside the box when the column has room, under it when narrow */}
              <div className="flex flex-col gap-2 @min-[15rem]:flex-row @min-[15rem]:gap-0">
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full min-w-0 px-3 py-2 text-white bg-[#1a202c] rounded-md @min-[15rem]:rounded-r-none outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
                  required
                  disabled={subscribeStatus.loading}
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus.loading}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md @min-[15rem]:rounded-l-none hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-75 whitespace-nowrap transition-colors"
                >
                  {subscribeStatus.loading ? "Wait..." : "Subscribe"}
                </button>
              </div>
              {subscribeStatus.message && (
                <span className={`text-xs ${subscribeStatus.type === "success" ? "text-emerald-400" : "text-rose-400"}`}>
                  {subscribeStatus.message}
                </span>
              )}
            </form>
          </div>
        </section>
      </div>

      {/* Bottom Line */}
      <div className="mt-6 border-t border-gray-700 pt-4 text-sm text-gray-400 flex flex-col xl:flex-row justify-between items-center gap-3 text-center">
        <p>Copyright © 2026 GBU | All Rights Reserved</p>

        {/* Unique Visitor Counter */}
        {visitorCount > 0 && (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-gray-700 rounded-full text-xs text-gray-400 select-none" title="Unique Visitors">
            <Eye className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-semibold text-gray-300">{visitorCount.toLocaleString("en-IN")}</span>
            <span className="hidden sm:inline">Visitors</span>
          </div>
        )}

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
        <div className="flex gap-4 mt-2 xl:mt-0">
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
