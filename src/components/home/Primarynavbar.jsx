import React, { useState } from "react";
import {
  Send,
  Info,
  CreditCard,
  User,
  Phone,
  LogIn,
  Map,
  Menu,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const Primarynavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SearchableWrapper>    

    <nav
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white text-sm shadow"
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="w-full py-2 px-6 xl:px-16 flex justify-between items-center">
        {/* Mobile menu button */}
        <div className="xl:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
            aria-label="Open quick links menu"
          >
            <Menu size={18} />
            <span className="font-semibold text-xs uppercase tracking-wider">Quick Links</span>
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden xl:flex w-full justify-between">
          {/* Left links */}
          <div className="flex flex-wrap gap-4 items-center">
            <Link to="/tender" className="flex items-center gap-1 hover:underline">
              <Send size={14} /> Tenders
            </Link>
            <Link to="/recruitments" className="flex items-center gap-1 hover:underline">
              <Send size={14} /> Recruitments
            </Link>

            <Link to="/booking" className="hover:underline">Booking</Link>
            

          
            <Link to="/rti" className="flex items-center gap-1 hover:underline">
              <Info size={14} /> RTI
            </Link>
          </div>

          {/* Right links */}
          <div className="flex flex-wrap gap-4 items-center">
            <a href="https://csms.gbu.ac.in/" className="flex items-center gap-1 hover:underline">
              <CreditCard size={14} /> Online Fee Payment
            </a>
            <a href="https://gbu.samarth.ac.in/" className="flex items-center gap-1 hover:underline">
              <User size={14} /> Student Portal
            </a>
            <a href="https://gbu.samarth.ac.in/" className="flex items-center gap-1 hover:underline">
              <LogIn size={14} /> Faculty Login
            </a>

            <a href="https://gbu.samarth.ac.in/" className="flex items-center gap-1 hover:underline">
              <LogIn size={14} /> Admin Login
            </a>
            <a href="/contactDirectory" className="flex items-center gap-1 hover:underline">
              <Map size={14} /> Directory
            </a>


         

              <Link
                to="/contactUs"
                className="flex items-center gap-1 hover:underline"
              >
                <Phone size={14} /> Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile slide-in sidebar and overlay */}
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          />

          {/* Sidebar */}
          <div
            className={`absolute left-0 top-0 bg-white w-72 h-full p-6 overflow-y-auto text-slate-800 shadow-2xl transition-transform duration-300 ease-in-out ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <img
                  src="/assets/logo.svg"
                  alt="GBU Logo"
                  className="h-9 w-auto"
                />
               
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-150 hover:text-slate-800 transition"
                aria-label="Close sidebar"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 text-sm font-medium">
              {/* Quick Links */}
              <div>
                <p className="text-slate-400 uppercase tracking-wider text-[10px] font-bold mb-3 px-3">Quick Links</p>
                <div className="space-y-1">
                  <a
                    href="/tender"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Send size={15} className="text-blue-500" />
                    <span>Tenders</span>
                  </a>
                  <a
                    href="/recruitments"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Send size={15} className="text-blue-500" />
                    <span>Recruitments</span>
                  </a>
                  <a
                    href="/booking"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <CreditCard size={15} className="text-blue-500" />
                    <span>Booking</span>
                  </a>
                  <a
                    href="/rti"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Info size={15} className="text-blue-500" />
                    <span>RTI</span>
                  </a>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Portals */}
              <div>
                <p className="text-slate-400 uppercase tracking-wider text-[10px] font-bold mb-3 px-3">Portals</p>
                <div className="space-y-1">
                  <a
                    href="https://csms.gbu.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <CreditCard size={15} className="text-blue-500" />
                    <span>Online Fee Payment</span>
                  </a>
                  <a
                    href="https://gbu.samarth.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <User size={15} className="text-blue-500" />
                    <span>Student Portal</span>
                  </a>
                  <a
                    href="https://gbu.samarth.ac.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <LogIn size={15} className="text-blue-500" />
                    <span>Employee Login</span>
                  </a>
                  <a
                    href="/contactDirectory"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Map size={15} className="text-blue-500" />
                    <span>Directory</span>
                  </a>
                  <Link
                    to="/contactUs"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                  >
                    <Phone size={15} className="text-blue-500" />
                    <span>Contact Us</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>  

    </SearchableWrapper>
  );
};

export default Primarynavbar;
