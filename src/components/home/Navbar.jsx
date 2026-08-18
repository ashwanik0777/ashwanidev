import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  GraduationCap,
  FileText,
  BookOpen,
  Home,
  Camera,
  Briefcase,
  Users,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import SearchBar from "../Searchbar/searchbar";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

// Navigation configuration data
const NAVIGATION_CONFIG = [
  {
    key: "about",
    label: "About Us",
    icon: User,
    baseRoute: "/about-us",
    items: [
      { slug: "About Gbu", label: "About GBU" },
      { slug: "chancellor-message", label: "Chancellor Message" },
      { slug: "vice-chancellor-message", label: "Vice Chancellor Message" },
      { slug: "strategic-perspective", label: "GBU: A Strategic Perspective" },
      { slug: "organization", label: "Organization" },
      { slug: "governing-bodies", label: "Governing Bodies" },
      { slug: "regulatory-bodies", label: "Regulatory Bodies" },
      { slug: "committee", label: "Committees" },
      { slug: "act", label: "GBU Act, Statute & Ordinance" },
      { slug: "policies", label: "Policies" },
      { slug: "mandatory-disclosures", label: "Mandatory Disclosures" },
      { slug: "rti", label: "Right to Information (RTI)", overridePath: "/rti" },
      { slug: "guidelines", label: "Guidelines / GO" },
    ],
  },
  {
    key: "academics",
    label: "Academics",
    icon: GraduationCap,
    baseRoute: "/academics",
    items: [
      { slug: "schools", label: "Schools & Departments" },
      { slug: "faculty", label: "Faculty Directory" },
      { slug: "academic-calendar", label: "Academic Calendar & Regulations" },
      { slug: "list-of-holidays", label: "List of Holidays" },
      { slug: "cbcs-framework", label: "CBCS Curriculum Framework" },
      { slug: "centers-of-excellence", label: "Centers of Excellence" },
      { slug: "international-collaboration", label: "International Collaboration" },
      { slug: "national-academic-depository", label: "National Academic Depository (NAD)" },
      { slug: "annual-reports", label: "Annual Reports" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    icon: FileText,
    directPath: "https://gbuadm.samarth.edu.in/",
  },
  {
    key: "research",
    label: "Research",
    icon: BookOpen,
    baseRoute: "/research",
    items: [
      { slug: "research-centers", label: "Center of Excellence and Labs" },
      { slug: "publications", label: "Publications" },
      { slug: "incubation", label: "GBU Incubation Centre" },
      { slug: "institution-innovation", label: "Institution and Innovation" },
      { slug: "ipr-cell", label: "IPR Cell" },
    ],
  },
  {
    key: "campus",
    label: "Campus Life",
    icon: Home,
    baseRoute: "/campus-life",
    items: [
      { slug: "hero", label: "Overview" },
      { slug: "https://hostels.gbu.ac.in/", label: "Hostels", isExternal: true },
      { slug: "sports-fitness", label: "Sports" },
      { slug: "clubs-societies", label: "Clubs and Societies" },
      { slug: "meditation-center", label: "Meditation Centre" },
      {
        slug: "NSS",
        label: "National Service Scheme (NSS)",
      },
      {
        slug: "NCC",
        label: "National Cadet Corps (NCC)",
      },
    ],
  },
  {
    key: "announcements",
    label: "Announcements",
    icon: Camera,
    baseRoute: "/announcements",
    items: [
      { slug: "news-notifications", label: "News & Updates" },
      { slug: "event-calendar", label: "Upcoming Events" },
      { slug: "notices", label: "Notices & Circular" },
      { slug: "media-gallery", label: "Media Gallery" },
      { slug: "newsletter", label: "Newsletter" },
    ],
  },
  {
    key: "placements",
    label: "Placements",
    icon: Briefcase,
    directPath: "/placements",
  },
  {
    key: "alumni",
    label: "Alumni",
    icon: Users,
    directPath: "/alumni",
  },
];

// Custom hooks for navbar functionality
const useScrollDetection = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isScrolled;
};

const useDropdownMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRefs = useRef(new Map());
  const timeoutRef = useRef(null);

  const handleMouseEnter = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuKey);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 120);
  };

  const toggleMenu = (menuKey) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(prev => prev === menuKey ? null : menuKey);
  };

  const closeMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideMenu = Array.from(menuRefs.current.values())
        .some(ref => ref?.contains(event.target));

      if (!isInsideMenu) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return {
    activeMenu,
    handleMouseEnter,
    handleMouseLeave,
    toggleMenu,
    closeMenu,
    menuRefs,
  };
};

const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState(new Set());

  const toggle = () => setIsOpen(prev => !prev);
  const close = () => setIsOpen(false);

  const toggleSubmenu = (menuKey) => {
    setExpandedSubmenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuKey)) {
        newSet.delete(menuKey);
      } else {
        newSet.add(menuKey);
      }
      return newSet;
    });
  };

  return {
    isOpen,
    toggle,
    close,
    expandedSubmenus,
    toggleSubmenu,
  };
};

// UI Components
const MenuIcon = ({ icon: Icon, size = 16 }) => <Icon size={size} />;

const DropdownMenuItem = ({ item, baseRoute, onClick }) => {
  const targetPath = item.overridePath || `${baseRoute}/${item.slug}`;
  const linkProps = item.isExternal
    ? { href: item.slug, target: "_blank", rel: "noopener noreferrer" }
    : { to: targetPath };

  const LinkComponent = item.isExternal ? 'a' : Link;

  return (
    <LinkComponent
      {...linkProps}
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      onClick={onClick}
    >
      {item.label}
    </LinkComponent>
  );
};

const DropdownMenu = ({ items, baseRoute, onItemClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 5 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 5 }}
    transition={{ duration: 0.15, ease: "easeOut" }}
    className="absolute left-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100"
  >
    {items.map((item, index) => (
      <DropdownMenuItem
        key={`${item.slug}-${index}`}
        item={item}
        baseRoute={baseRoute}
        onClick={onItemClick}
      />
    ))}
  </motion.div>
);

const DesktopMenuItem = ({ menu, isActive, onMouseEnter, onMouseLeave, onToggle, menuRef, onMenuClose }) => {
  if (menu.directPath) {
    const isExternal = menu.directPath.startsWith("http");
    return (
      <li>
        {isExternal ? (
          <a
            href={menu.directPath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-blue-600 text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
          >
            <MenuIcon icon={menu.icon} />
            {menu.label}
          </a>
        ) : (
          <Link
            to={menu.directPath}
            className="flex items-center gap-1 hover:text-blue-600 text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
          >
            <MenuIcon icon={menu.icon} />
            {menu.label}
          </Link>
        )}
      </li>
    );
  }

  return (
    <li
      className="relative"
      ref={menuRef}
      onMouseEnter={() => onMouseEnter(menu.key)}
      onMouseLeave={onMouseLeave}
      aria-haspopup="true"
    >
      <button
        onClick={() => onToggle(menu.key)}
        className="flex items-center gap-1 hover:text-blue-600 text-gray-700 px-3 py-2 text-sm font-medium transition-colors"
        aria-expanded={isActive}
      >
        <MenuIcon icon={menu.icon} />
        {menu.label}
        {isActive ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>

      <AnimatePresence>
        {isActive && (
          <DropdownMenu
            items={menu.items}
            baseRoute={menu.baseRoute}
            onItemClick={onMenuClose}
          />
        )}
      </AnimatePresence>
    </li>
  );
};

const MobileMenuItem = ({ menu, isExpanded, onToggle, onSubmenuToggle }) => {
  if (menu.directPath) {
    const isExternal = menu.directPath.startsWith("http");
    return isExternal ? (
      <a
        href={menu.directPath}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </span>
      </a>
    ) : (
      <Link
        to={menu.directPath}
        className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        onClick={onToggle}
      >
        <span className="flex items-center gap-2">
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </span>
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => onSubmenuToggle(menu.key)}
        className="w-full flex items-center justify-between px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2">
          <MenuIcon icon={menu.icon} />
          {menu.label}
        </span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="bg-gray-50">
          {menu.items.map((item, index) => (
            <DropdownMenuItem
              key={`mobile-${item.slug}-${index}`}
              item={item}
              baseRoute={menu.baseRoute}
              onClick={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Navbar Component
const Navbar = () => {
  const isScrolled = useScrollDetection();
  const { activeMenu, handleMouseEnter, handleMouseLeave, toggleMenu, closeMenu, menuRefs } = useDropdownMenu();
  const { isOpen: isMobileOpen, toggle: toggleMobile, close: closeMobile, expandedSubmenus, toggleSubmenu } = useMobileMenu();

  // Memoize navigation items to prevent unnecessary re-renders
  const navigationItems = useMemo(() => NAVIGATION_CONFIG, []);

  const setMenuRef = (menuKey, ref) => {
    if (ref) {
      menuRefs.current.set(menuKey, ref);
    } else {
      menuRefs.current.delete(menuKey);
    }
  };

  return (
    <SearchableWrapper>
      <nav
        className={`fixed top-[34px] sm:top-9 left-0 w-full z-40 bg-white transition-all duration-300 ${isScrolled ? "shadow-md" : "shadow"
          }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="px-4 sm:px-6 xl:px-12">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0" aria-label="GBU Home">
              <img
                src="/assets/logo.svg"
                alt="GBU Logo"
                className="h-10 sm:h-12 xl:h-14 w-auto max-w-[200px] sm:max-w-none"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center">
              <ul className="flex items-center space-x-1">
                {navigationItems.map((menu) => (
                  <DesktopMenuItem
                    key={menu.key}
                    menu={menu}
                    isActive={activeMenu === menu.key}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onToggle={toggleMenu}
                    menuRef={(ref) => setMenuRef(menu.key, ref)}
                    onMenuClose={closeMenu}
                  />
                ))}
              </ul>
              {/* Desktop SearchBar */}
              <SearchBar />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobile}
              className="xl:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileOpen}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileOpen && (
            <div className="xl:hidden border-t border-gray-200 max-h-[calc(85vh-4rem)] overflow-y-auto shadow-inner bg-white">
              <div className="py-3 px-1 space-y-1">
                {navigationItems.map((menu) => (
                  <MobileMenuItem
                    key={menu.key}
                    menu={menu}
                    isExpanded={expandedSubmenus.has(menu.key)}
                    onToggle={closeMobile}
                    onSubmenuToggle={toggleSubmenu}
                  />
                ))}
                {/* Mobile SearchBar */}
                <div className="pt-2 px-2">
                  <SearchBar isMobile />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </SearchableWrapper>
  );
};

export default Navbar;