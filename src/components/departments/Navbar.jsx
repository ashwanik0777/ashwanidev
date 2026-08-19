import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, Menu, X } from "lucide-react";
import { resolveSchool } from "../../Data/schoolsMeta";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenMenus, setMobileOpenMenus] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [departmentItems, setDepartmentItems] = useState([]);
  const menuRefs = useRef({});

  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);
  const shortCode = pathParts[0] === "schools" && pathParts[1] ? pathParts[1] : undefined;
  
  const school = resolveSchool(shortCode);
  const activeSchool = school?.code || shortCode || "SOICT";
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = (menuKey) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenMenu(menuKey);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenMenu(null);
    }, 120);
  };

  const toggleMenu = (menuKey) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setOpenMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  const toggleMobileMenu = (menuKey) => {
    setMobileOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const handleClickOutside = (event) => {
    const isClickInsideAnyMenu = Object.values(menuRefs.current).some((ref) =>
      ref?.contains(event.target)
    );
    if (!isClickInsideAnyMenu) {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isActive = true;

    const loadDepartments = async () => {
      try {
        const resolvedSchool = resolveSchool(activeSchool);
        const canonicalCode = resolvedSchool?.code || activeSchool.toUpperCase();
        const module = await import(`../../Data/schools/${canonicalCode}/home.jsx`);
        const sections = Array.isArray(module.sectionsConfig)
          ? module.sectionsConfig
          : [];
        const departmentsSection = sections.find(
          (section) => section?.componentName === "DepartmentsSection"
        );
        const departments = Array.isArray(departmentsSection?.props?.departments)
          ? departmentsSection.props.departments
          : [];

        const items = departments
          .map((dept) => ({
            label: dept?.name || "",
            href: dept?.link || `/schools/${activeSchool}`,
          }))
          .filter((item) => item.label);

        if (isActive) {
          setDepartmentItems(items);
        }
      } catch {
        if (isActive) {
          setDepartmentItems([]);
        }
      }
    };

    loadDepartments();

    return () => {
      isActive = false;
    };
  }, [activeSchool]);

  const currentSchoolCode = (school?.code || activeSchool || "SOICT").toUpperCase();

  const routes = {
    home: `/schools/${activeSchool}`,
    faculty: `/schools/${activeSchool}/faculty`,

    about: {
      dean: `/schools/${activeSchool}/about/dean`,
      coeidrone: `/schools/${activeSchool}/departments/coedt`,
      cyber: `/schools/${activeSchool}/departments/cyber-security`,
      coeiraem: `/schools/${activeSchool}/departments/raem`,
      board: `/schools/${activeSchool}/about/board`,
      staff: `/schools/${activeSchool}/about/staff`,
      labs: `/schools/${activeSchool}/about/labs`,
      activities: `/schools/${activeSchool}/about/activities`,
    },
    departments: {
      cse: `/schools/${activeSchool}/departments/cse`,
      it: `/schools/${activeSchool}/departments/it`,
      ece: `/schools/${activeSchool}/departments/ece`,
    },
    placement: `/schools/${activeSchool}/placement`,
    research: {
      profile: `/schools/${activeSchool}/research-area`,
      consultancy: `/schools/${activeSchool}/training-consultancy`,
      scholars: `/schools/${activeSchool}/research-scholars`,
      projects: `/schools/${activeSchool}/research-projects`,
      grants: `/schools/${activeSchool}/research-grants`,
      patents: `/schools/${activeSchool}/patents`,
      books: `/schools/${activeSchool}/books`,
    },
    contact: `/schools/${activeSchool}/contact`,
  };

  // Build About Us dropdown items based on the active school
  const getAboutItems = () => {
    const schoolCode = (school?.code || activeSchool || "SOICT").toUpperCase();
    
    if (schoolCode === "SOBT") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        // { label: "SOBT COE Bioinformatics", href: `/schools/${activeSchool}/departments/coe-bioinformatics` },
        // { label: "SOBT Molecular Biology Lab", href: `/schools/${activeSchool}/departments/molecular-biology-lab` },
        // { label: "SOBT Research Cell", href: `/schools/${activeSchool}/departments/research-cell` },
        { label: "SOBT Board of Studies", href: routes.about.board },
        { label: "SOBT Staff Members", href: routes.about.staff },
        { label: "SOBT Laboratories", href: routes.about.labs },
        { label: "SOBT Activities", href: routes.about.activities },
      ];
    }

    if (schoolCode === "SOE") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        // { label: "SOE Advanced Computing Center", href: `/schools/${activeSchool}/departments/advanced-computing-center` },
        // { label: "SOE Engineering Design Lab", href: `/schools/${activeSchool}/departments/engineering-design-lab` },
        // { label: "SOE Innovation & Research Cell", href: `/schools/${activeSchool}/departments/innovation-research-cell` },
        { label: "SOE Board of Studies", href: routes.about.board },
        // { label: "SOE Staff Members", href: routes.about.staff },
        { label: "SOE Laboratories", href: routes.about.labs },
        { label: "SOE Activities", href: routes.about.activities },
      ];
    }

    if (schoolCode === "SOBSC") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        // { label: "SBSC Centre for Buddhist Studies", href: `/schools/${activeSchool}/departments/centre-buddhist-studies` },
        // { label: "SBSC Pali & Sanskrit Studies Cell", href: `/schools/${activeSchool}/departments/pali-sanskrit-studies` },
        // { label: "SBSC Buddhist Heritage & Archaeology Unit", href: `/schools/${activeSchool}/departments/heritage-archaeology` },
        // { label: "SBSC Meditation & Mindfulness Centre", href: `/schools/${activeSchool}/departments/meditation-mindfulness-centre` },
        { label: "SBSC Board of Studies", href: routes.about.board },
        // { label: "SBSC Staff Members", href: routes.about.staff },
        { label: "SBSC Activities", href: routes.about.activities },
      ];
    }

    if (schoolCode === "SOL") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        { label: "SLJG Moot Court Cell", href: `/schools/${activeSchool}/departments/moot-court-cell` },
        { label: "SLJG Legal Aid Clinic", href: `/schools/${activeSchool}/departments/legal-aid-clinic` },
        { label: "SLJG Centre for Constitutional Law & Governance", href: `/schools/${activeSchool}/departments/constitutional-governance` },
        { label: "SLJG Centre for Cyber Law & Digital Rights", href: `/schools/${activeSchool}/departments/cyber-law-centre` },
        { label: "SLJG Board of Studies", href: routes.about.board },
        { label: "SLJG Staff Members", href: routes.about.staff },
        { label: "SLJG Activities", href: routes.about.activities },
      ];
    }
    
    if (schoolCode === "SOM") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        { label: "SOM Board of Studies", href: routes.about.board },
        { label: "SOM Staff Members", href: routes.about.staff },
        { label: "SOM Activities", href: routes.about.activities },
      ];
    }

    if (schoolCode === "SOHSS") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        { label: "SOHSS Board of Studies", href: routes.about.board },
        { label: "SOHSS Staff Members", href: routes.about.staff },
        { label: "SOHSS Activities", href: routes.about.activities },
      ];
    }

    if (schoolCode === "SOVS") {
      return [
        { label: "Dean's Message", href: routes.about.dean },
        { label: "SOVS Board of Studies", href: routes.about.board },
        { label: "SOVS Staff Members", href: routes.about.staff },
        { label: "SOVS Laboratories", href: routes.about.labs },
        { label: "SOVS Activities", href: routes.about.activities },
      ];
    }

    // Default SOICT items
    return [
      { label: "Dean's Message", href: routes.about.dean },
      { label: "COE Drone Technologies (CEDT)", href: routes.about.coeidrone },
      { label: "Cyber Security Lab", href: routes.about.cyber },
      { label: "COE RAEM", href: routes.about.coeiraem },
      { label: "Board of Studies", href: routes.about.board },
      { label: "Staff Members", href: routes.about.staff },
      { label: "Laboratories", href: routes.about.labs },
      { label: "Activities", href: routes.about.activities },
    ];
  };

  // Build Research dropdown items based on the active school
  const getResearchItems = () => {
    const schoolCode = (school?.code || activeSchool || "SOICT").toUpperCase();

    if (schoolCode === "SOBSC") {
      return [
        { label: "Research Area and Profile", href: routes.research.profile },
        { label: "Training and Consultancy", href: routes.research.consultancy },
        { label: "Research Scholars", href: routes.research.scholars },
        { label: "Research Publications", href: routes.research.projects },
        { label: "Research Grants", href: routes.research.grants },
        { label: "Patents", href: routes.research.patents },
        { label: "Books", href: routes.research.books },
      ];
    }

    if (schoolCode === "SOBT" || schoolCode === "SOE") {
      return [
        { label: "Research Area and Profile", href: routes.research.profile },
        // { label: "Training and Consultancy", href: routes.research.consultancy },
        { label: "Research Scholars", href: routes.research.scholars },
        { label: "Research Publications", href: routes.research.projects },
        { label: "Research Grants", href: routes.research.grants },
        { label: "Patents", href: routes.research.patents },
        { label: "Books", href: routes.research.books },
      ];
    }

    return [
      { label: "Research Area and Profile", href: routes.research.profile },
      { label: "Training and Consultancy", href: routes.research.consultancy },
      { label: "Research Scholars", href: routes.research.scholars },
      { label: "Research Projects", href: routes.research.projects },
      { label: "Patents", href: routes.research.patents },
      { label: "Books", href: routes.research.books },
    ];
  };

  const dropdownMenus = [
    {
      key: "about",
      label: "About Us",
      items: getAboutItems(),
    },
    {
      key: "departments",
      label: "Departments & Academic Programs",
      items: departmentItems.length
        ? departmentItems
        : [
            {
              label: "Department of Computer Science and Engineering",
              href: routes.departments.cse,
            },
            {
              label: "Department of Information Technology",
              href: routes.departments.it,
            },
            {
              label: "Department of Electronic & Communication",
              href: routes.departments.ece,
            },
          ],
    },
    {
      key: "research",
      label: "Research",
      items: getResearchItems(),
    },
  ];

  const navVariants = {
    initial: { y: -50, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -5,
      scale: 0.98,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.15 },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.25,
        ease: "easeOut",
        staggerChildren: 0.05,
      },
    },
  };

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.nav
      className={`fixed top-8.5 sm:top-9 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-100"
          : "bg-white shadow"
      } px-4 sm:px-8 md:px-16 flex items-center justify-between`}
      variants={navVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className="flex items-center space-x-3 cursor-pointer shrink-0"
        onClick={() => (window.location.href = "/")}
        variants={logoVariants}
        whileHover="hover"
      >
        <motion.img
          src="/assets/logo.svg"
          alt="USICT Logo"
          className="w-40 sm:w-56 md:w-64 h-10 sm:h-14 object-contain mr-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 0.9 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        />
      </motion.div>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Desktop Nav */}
      <motion.ul
        className="hidden md:flex flex-wrap justify-center gap-6 text-sm text-gray-700 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Link
            to={routes.home}
            className="hover:text-purple-700 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
        </motion.li>
        <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Link
            to={routes.faculty}
            className="hover:text-purple-700 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Faculty
          </Link>
        </motion.li>

        {dropdownMenus.map(({ key, label, items }) => (
          <motion.li
            key={key}
            className="relative"
            ref={(el) => (menuRefs.current[key] = el)}
            onMouseEnter={() => handleMouseEnter(key)}
            onMouseLeave={handleMouseLeave}
            aria-haspopup="true"
            aria-expanded={openMenu === key}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              onClick={() => toggleMenu(key)}
              className={`flex items-center gap-1 cursor-pointer transition-all duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-700 after:transition-all after:duration-300 ${
                openMenu === key
                  ? "text-purple-700 after:w-full"
                  : "hover:text-purple-700 hover:after:w-full"
              }`}
              whileTap={{ scale: 0.98 }}
            >
              {label}
              <motion.div
                animate={{ rotate: openMenu === key ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={14} />
              </motion.div>
            </motion.button>
            <AnimatePresence>
              {openMenu === key && (
                <motion.ul
                  className="absolute top-full left-0 mt-2 min-w-[260px] max-w-sm w-auto bg-white/95 backdrop-blur-lg shadow-xl rounded-xl border border-gray-200 p-2 z-50 whitespace-nowrap"
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {items.map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <Link
                        to={item.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 rounded-lg transition-all duration-200 transform hover:translate-x-1"
                        onClick={() => setOpenMenu(null)}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </motion.li>
        ))}
        {currentSchoolCode !== "SOE" && currentSchoolCode !== "SOBSC" && (
          <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <Link
              to={routes.placement}
              className="hover:text-purple-700 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
            >
              Placement
            </Link>
          </motion.li>
        )}
        <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Link
            to={routes.contact}
            className="hover:text-purple-700 transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-purple-700 after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact us
          </Link>
        </motion.li>

        <motion.li whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
          <Link
            to="/login"
            className="items-center rounded-lg border border-slate-300 bg-slate-50 px-4 py-1.5 text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
          >
            Login
          </Link>
        </motion.li>
        <motion.li
          className="flex items-center gap-1 cursor-pointer hover:text-purple-700 transition-colors duration-200"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        ></motion.li>
      </motion.ul>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg border-b border-gray-200 md:hidden z-50 px-4 py-4 overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.ul className="flex flex-col gap-2 text-sm text-gray-700">
              <motion.li variants={mobileItemVariants}>
                <Link
                  to={routes.home}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-3 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200 block"
                >
                  Home
                </Link>
              </motion.li>
              <motion.li variants={mobileItemVariants}>
                <Link
                  to={routes.faculty}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-3 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200 block"
                >
                  Faculty
                </Link>
              </motion.li>
              {dropdownMenus.map(({ key, label, items }) => (
                <motion.li key={key} variants={mobileItemVariants}>
                  <motion.button
                    onClick={() => toggleMobileMenu(key)}
                    className="w-full flex justify-between items-center py-3 px-3 text-left hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{label}</span>
                    <motion.div
                      animate={{ rotate: mobileOpenMenus[key] ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {mobileOpenMenus[key] && (
                      <motion.ul
                        className="pl-6 flex flex-col gap-1 mt-2 overflow-hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {items.map((item, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <Link
                              to={item.href}
                              className="block py-2 px-3 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setMobileOpenMenus({});
                              }}
                            >
                              {item.label}
                            </Link>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
              <motion.li
                className="flex items-center gap-2 py-3 px-3 cursor-pointer hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                variants={mobileItemVariants}
                whileTap={{ scale: 0.98 }}
              >
                <Search size={16} />
                Search
              </motion.li>

              <motion.li variants={mobileItemVariants}>
                <Link
                  to="/login"
                  className="block py-3 px-3 font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              </motion.li>
              <motion.li variants={mobileItemVariants}>
                <Link
                  to={routes.contact}
                  className="block py-3 px-3 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact us
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
