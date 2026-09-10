import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  X,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ArrowUpDown,
  CornerDownLeft,
  MapPin,
  SearchX,
  Hash,
  FileText,
  Globe,
  MoveRight,
} from "lucide-react";
import SEARCH_INDEX from "../../Data/searchIndex";

/**
 * NAVIGATION_CONFIG — used for top-level navigation search results.
 */
const NAVIGATION_CONFIG = [
  {
    key: "about",
    label: "About Us",
    baseRoute: "/about-us",
    items: [
      { slug: "about-gbu", label: "About GBU" },
      { slug: "chancellor-message", label: "Chancellor Message" },
      { slug: "vice-chancellor-message", label: "Vice Chancellor Message" },
      { slug: "strategic-perspective", label: "GBU: A Strategic Perspective" },
      { slug: "policies", label: "Policies" },
      { slug: "mandatory-disclosures", label: "Mandatory Disclosures" },
      { slug: "rti", label: "Right to Information (RTI)", overridePath: "/rti" },
      { slug: "guidelines", label: "Guidelines / GO" },
    ],
  },
  {
    key: "academics",
    label: "Academics",
    baseRoute: "/academics",
    items: [
      { slug: "schools", label: "Schools & Departments" },
      { slug: "faculty", label: "Faculty Directory" },
      { slug: "academic-calendar", label: "Academic Calendar & Regulations" },
      { slug: "list-of-holidays", label: "List of Holidays" },
      { slug: "cbcs-framework", label: "CBCS Curriculum Framework" },
      { slug: "national-academic-depository", label: "National Academic Depository (NAD)" },
      { slug: "annual-reports", label: "Annual Reports" },
    ],
  },
  {
    key: "admissions",
    label: "Admissions",
    directPath: "https://gbuadm.samarth.edu.in/",
  },
  {
    key: "research",
    label: "Research",
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
    baseRoute: "/campus-life",
    items: [
      { slug: "hero", label: "Overview" },
      { slug: "hostel-facilities", label: "Hostels" },
      { slug: "sports-fitness", label: "Sports" },
      { slug: "clubs-societies", label: "Clubs and Societies" },
      { slug: "meditation-center", label: "Meditation Centre" },
      { slug: "NSS", label: "National Service Scheme (NSS)" },
      { slug: "NCC", label: "National Cadet Corps (NCC)" },
    ],
  },
  {
    key: "announcements",
    label: "Announcements",
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
    directPath: "/placements",
  },
  {
    key: "alumni",
    label: "Alumni",
    directPath: "/alumni",
  },
];

/**
 * Score a search result based on match quality.
 * Higher score = better match = shown first.
 */
const scoreMatch = (text, query) => {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  if (lowerText === lowerQuery) return 100;
  if (lowerText.startsWith(lowerQuery)) return 80;

  // Check if all words in query appear in text
  const queryWords = lowerQuery.split(/\s+/).filter(Boolean);
  const allWordsMatch = queryWords.length > 1 && queryWords.every(w => lowerText.includes(w));
  if (allWordsMatch) return 70;

  if (lowerText.includes(lowerQuery)) return 60;

  return 0;
};

/**
 * Get a short text excerpt around the matched query.
 */
const getExcerpt = (text, query) => {
  const cleanText = text.replace(/\s+/g, ' ').trim();
  const idx = cleanText.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return cleanText.substring(0, 80) + (cleanText.length > 80 ? "..." : "");
  const start = Math.max(0, idx - 40);
  const end = Math.min(cleanText.length, idx + query.length + 40);
  let excerpt = cleanText.substring(start, end);
  if (start > 0) excerpt = "..." + excerpt;
  if (end < cleanText.length) excerpt = excerpt + "...";
  return excerpt;
};

/**
 * Find the nearest heading text for a DOM element.
 */
const findNearestHeading = (element) => {
  const headingTags = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];

  // Check if element itself is a heading
  if (headingTags.includes(element.tagName)) {
    return element.textContent.trim();
  }

  // Walk up looking for a heading sibling
  let current = element;
  while (current && current.parentElement) {
    // Check previous siblings
    let sibling = current.previousElementSibling;
    while (sibling) {
      if (headingTags.includes(sibling.tagName)) {
        return sibling.textContent.trim();
      }
      sibling = sibling.previousElementSibling;
    }

    // Check parent for headings
    const parentHeading = current.parentElement.querySelector('h1, h2, h3, h4, h5, h6');
    if (parentHeading && parentHeading !== element) {
      return parentHeading.textContent.trim();
    }

    current = current.parentElement;

    // Don't go above the main content area
    if (current.tagName === 'MAIN' || current.tagName === 'BODY' || current.classList?.contains('App')) {
      break;
    }
  }

  return null;
};

/**
 * Search current page DOM for text content.
 * Searches headings, paragraphs, list items, table cells, and data-search elements.
 * Returns "content" type results that can be scrolled to on this page.
 */
const searchCurrentPageDOM = (searchQuery) => {
  const lowerQuery = searchQuery.toLowerCase();
  const matches = [];
  const seenTexts = new Set();

  // Selectors to search — broad enough to cover all pages, without needing SearchableWrapper
  const selectors = [
    // Elements with data-search attribute (from SearchableWrapper)
    '[data-search="true"]',
    // Common content elements
    'main h1, main h2, main h3, main h4, main h5, main h6',
    'main p',
    'main li',
    'main td, main th',
    'main span[id]',
    'main div[id]',
    'main section[id]',
    // Fallback: content area
    '.App h1, .App h2, .App h3, .App h4, .App h5, .App h6',
    '.App p',
    '.App li',
    '.App section[id]',
    '.App div[id]',
  ];

  // Elements to skip
  const skipSelectors = ['nav', 'footer', 'header', '.navbar', '.footer', '[role="navigation"]'];

  const allElements = new Set();
  selectors.forEach(sel => {
    try {
      document.querySelectorAll(sel).forEach(el => allElements.add(el));
    } catch (e) { /* ignore invalid selectors */ }
  });

  allElements.forEach((element) => {
    // Skip nav/footer/header elements
    const isInsideSkipped = skipSelectors.some(skip => element.closest(skip));
    if (isInsideSkipped) return;

    const textContent = (element.textContent || element.innerText || "").trim();

    // Skip very short or very long text
    if (textContent.length < 5 || textContent.length > 2000) return;

    if (textContent.toLowerCase().includes(lowerQuery)) {
      // Deduplicate by text content (avoid showing same text multiple times)
      const textKey = textContent.substring(0, 100).toLowerCase();
      if (seenTexts.has(textKey)) return;
      seenTexts.add(textKey);

      // Assign an ID if missing (for scrolling)
      let elementId = element.id;
      if (!elementId) {
        elementId = `search-dom-${matches.length}-${Date.now()}`;
        element.id = elementId;
      }

      const heading = findNearestHeading(element);
      const excerpt = getExcerpt(textContent, searchQuery);

      matches.push({
        label: excerpt,
        type: "content",
        category: "On This Page",
        icon: Hash,
        elementId: elementId,
        heading: heading,
        score: scoreMatch(textContent, searchQuery) + 5, // slight boost for on-page results
        description: heading ? `Section: ${heading}` : "Page Content",
      });
    }
  });

  // Limit DOM results to avoid overwhelming the list
  return matches.slice(0, 8);
};

const Searchbar = ({ isMobile = false, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const containerRef = useRef();
  const inputRef = useRef(null);
  const resultsRef = useRef([]);
  const searchTimeoutRef = useRef(null);

  const handleToggle = useCallback(() => {
    setOpen((prev) => !prev);
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);

    if (isMobile && onClose) {
      onClose();
    }
  }, [isMobile, onClose]);

  /**
   * Main search function — combines 3 sources:
   * 1. NAVIGATION_CONFIG (nav menu items)
   * 2. SEARCH_INDEX (static cross-page index)
   * 3. Current page DOM content (live search on visible page)
   */
  const performSearch = useCallback((searchQuery) => {
    const lowerQuery = searchQuery.toLowerCase().trim();
    if (!lowerQuery) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const allMatches = [];
    const seenPaths = new Set();
    const seenLabels = new Set();

    // 1. Search NAVIGATION_CONFIG (top-level nav items)
    NAVIGATION_CONFIG.forEach((menu) => {
      const base = menu.baseRoute || menu.directPath || "#";

      if (menu.label.toLowerCase().includes(lowerQuery)) {
        const path = base;
        if (!seenPaths.has(path)) {
          seenPaths.add(path);
          seenLabels.add(menu.label.toLowerCase());
          allMatches.push({
            label: menu.label,
            path: path,
            type: "nav",
            category: "Navigation",
            icon: ChevronRight,
            score: scoreMatch(menu.label, lowerQuery),
            description: `Go to ${menu.label}`,
          });
        }
      }

      if (menu.items) {
        menu.items.forEach((item) => {
          if (item.label.toLowerCase().includes(lowerQuery)) {
            const path = item.overridePath || `${base}/${item.slug}`;
            if (!seenPaths.has(path)) {
              seenPaths.add(path);
              seenLabels.add(item.label.toLowerCase());
              allMatches.push({
                label: item.label,
                path: path,
                type: "nav",
                category: menu.label,
                icon: ExternalLink,
                score: scoreMatch(item.label, lowerQuery),
                description: `${menu.label} → ${item.label}`,
              });
            }
          }
        });
      }
    });

    // 2. Search SEARCH_INDEX (cross-page content)
    SEARCH_INDEX.forEach((entry) => {
      if (seenPaths.has(entry.path)) return;

      let bestScore = scoreMatch(entry.label, lowerQuery);

      if (bestScore === 0) {
        for (const keyword of entry.keywords) {
          const kwScore = scoreMatch(keyword, lowerQuery);
          if (kwScore > bestScore) bestScore = kwScore;
          if (bestScore >= 80) break;
        }
      }

      if (bestScore === 0 && entry.description) {
        const descScore = scoreMatch(entry.description, lowerQuery);
        if (descScore > 0) bestScore = Math.max(descScore - 20, 10);
      }

      if (bestScore > 0) {
        seenPaths.add(entry.path);
        seenLabels.add(entry.label.toLowerCase());
        allMatches.push({
          label: entry.label,
          path: entry.path,
          type: entry.path.startsWith("http") ? "external" : "page",
          category: entry.category,
          icon: entry.path.startsWith("http") ? Globe : FileText,
          score: bestScore,
          description: entry.description || "",
        });
      }
    });

    // 3. Search current page DOM content (live, on-page results)
    try {
      const domMatches = searchCurrentPageDOM(searchQuery);
      domMatches.forEach((match) => {
        // Avoid duplicate with labels already found
        const labelKey = match.label.substring(0, 50).toLowerCase();
        if (!seenLabels.has(labelKey)) {
          seenLabels.add(labelKey);
          allMatches.push(match);
        }
      });
    } catch (e) {
      // DOM search failed silently — static results still work
    }

    // 4. Sort by score (highest first), then by type priority, then alphabetically
    allMatches.sort((a, b) => {
      // "On This Page" results get priority boost if scores are close
      const aBoost = a.category === "On This Page" ? 5 : 0;
      const bBoost = b.category === "On This Page" ? 5 : 0;
      const scoreA = a.score + aBoost;
      const scoreB = b.score + bBoost;

      if (scoreB !== scoreA) return scoreB - scoreA;

      // Type priority: content > nav > page > external
      const typePriority = { content: 4, nav: 3, page: 2, external: 1 };
      const typeDiff = (typePriority[b.type] || 0) - (typePriority[a.type] || 0);
      if (typeDiff !== 0) return typeDiff;

      return a.label.localeCompare(b.label);
    });

    setResults(allMatches.slice(0, 18));
    setIsLoading(false);
  }, []);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setQuery(value);
    setSelectedIndex(-1);

    if (!value.trim()) {
      setResults([]);
      setIsLoading(false);
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      return;
    }

    setIsLoading(true);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 150);
  }, [performSearch]);

  const handleKeyDown = useCallback((e) => {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < results.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : results.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
        break;
      case 'Escape':
        handleToggle();
        break;
    }
  }, [open, selectedIndex, results]);

  /**
   * Handle result click:
   * - "content" type: scroll to element on current page
   * - "external" type: open in new tab
   * - "nav" / "page" type: navigate to route
   */
  const handleResultClick = useCallback((item) => {
    // DOM content result — scroll to element on current page
    if (item.type === "content" && item.elementId) {
      const element = document.getElementById(item.elementId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Non-layout-shifting highlight via box-shadow
        element.classList.add("search-highlight-glow");
        setTimeout(() => {
          element.classList.remove("search-highlight-glow");
        }, 3000);
      }
    }
    // External link
    else if (item.type === "external" || (item.path && item.path.startsWith("http"))) {
      window.open(item.path, "_blank", "noopener,noreferrer");
    }
    // Internal page navigation
    else if (item.path) {
      const [routePath, hash] = item.path.split("#");
      const currentPath = location.pathname;

      if (routePath === currentPath && hash) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("search-highlight-glow");
          setTimeout(() => element.classList.remove("search-highlight-glow"), 3000);
        }
      } else {
        navigate(hash ? `${routePath}#${hash}` : routePath);
      }
    }

    // Close search
    setOpen(false);
    setQuery("");
    setResults([]);
    setSelectedIndex(-1);
  }, [navigate, location.pathname]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
        setQuery("");
        setResults([]);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Inject highlight styles — box-shadow ONLY, NO padding/margin changes!
  useEffect(() => {
    const styleId = 'search-highlight-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .search-highlight-glow {
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.4), 0 0 12px rgba(59, 130, 246, 0.2) !important;
        border-radius: 6px !important;
        transition: box-shadow 0.3s ease-in-out !important;
        animation: searchGlowPulse 3s ease-in-out forwards;
      }

      @keyframes searchGlowPulse {
        0% { box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3); }
        50% { box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3), 0 0 12px rgba(59, 130, 246, 0.15); }
        100% { box-shadow: 0 0 0 0px rgba(59, 130, 246, 0), 0 0 0px rgba(59, 130, 246, 0); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existing = document.getElementById(styleId);
      if (existing) existing.remove();
    };
  }, []);

  // Scroll selected result into view in dropdown
  useEffect(() => {
    if (selectedIndex >= 0 && resultsRef.current[selectedIndex]) {
      resultsRef.current[selectedIndex].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedIndex]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, []);

  // Group results by category for display
  const groupedResults = useMemo(() => {
    return results.reduce((acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {});
  }, [results]);

  // ==================== RENDER ====================

  if (isMobile && !open) {
    return (
      <button
        onClick={handleToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        aria-label="Open search"
      >
        <Search size={20} />
        <span>Search</span>
      </button>
    );
  }

  return (
    <div className={`relative ${isMobile ? 'w-full -top-80' : 'ml-4'}`} ref={containerRef}>
      {/* Search toggle button (desktop) */}
      {!isMobile && (
        <button
          onClick={handleToggle}
          className={`
            relative p-2 rounded-full transition-all duration-300 ease-out
            ${open
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110 ring-4 ring-blue-200'
              : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
            }
            border border-gray-200 hover:border-gray-300
            group overflow-hidden
          `}
          aria-label={open ? "Close search" : "Open search"}
          title={open ? "Close Search (Esc)" : "Open Search (Cmd/Ctrl + /)"}
          type="button"
        >
          <div className="relative z-10">
            {open ? (
              <X size={20} className="transform rotate-90 transition-all duration-300" />
            ) : (
              <Search size={20} className="transform group-hover:scale-110 transition-transform duration-300" />
            )}
          </div>

          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>

          {!open && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-30" style={{ top: '20%', left: '30%' }}></div>
              <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-30" style={{ top: '70%', right: '25%', animationDelay: '0.5s' }}></div>
            </div>
          )}
        </button>
      )}

      {/* Search modal overlay + dropdown */}
      {open && (
        <>
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleToggle}></div>

          <div className={`
            absolute z-50 bg-white/95 backdrop-blur-2xl
            border border-gray-200/50 shadow-2xl rounded-3xl
            transform transition-all duration-300 ease-out
            ${open ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-2'}
            before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/50 before:to-transparent before:pointer-events-none
            ${isMobile
              ? 'inset-x-4 top-4 w-auto'
              : 'right-0 mt-3 w-[20rem] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] xl:w-[36rem]'
            }
          `}>
            {/* Search input */}
            <div className="flex items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-t-3xl">
              <div className="relative flex-1 flex items-center">
                <div className="relative">
                  <Search size={18} className="text-gray-400 mr-3 sm:mr-4" />
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                    </div>
                  )}
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                  placeholder="Search across all pages..."
                  aria-label="Search pages or content"
                  autoComplete="off"
                />
              </div>
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-gray-200/50 rounded-full transition-all duration-200 hover:scale-105"
                aria-label="Close search"
                type="button"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            {/* Results area */}
            <div className="max-h-72 sm:max-h-80 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {/* Empty state — no query */}
              {!query && (
                <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full animate-pulse"></div>
                    </div>
                    <Sparkles className="relative mx-auto text-gray-400 animate-bounce" size={isMobile ? 28 : 32} />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">Start typing to search...</p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-4">Search across all pages — navigation, content & more</p>
                  {!isMobile && (
                    <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                      <kbd className="px-2 py-1 bg-gray-100 rounded-md border text-xs font-mono">Cmd</kbd>
                      <span>+</span>
                      <kbd className="px-2 py-1 bg-gray-100 rounded-md border text-xs font-mono">/</kbd>
                      <span>to open quickly</span>
                    </div>
                  )}
                </div>
              )}

              {/* No results state */}
              {query && results.length === 0 && !isLoading && (
                <div className="px-4 sm:px-6 py-8 sm:py-12 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full"></div>
                    </div>
                    <SearchX className="relative mx-auto text-gray-400" size={isMobile ? 28 : 32} />
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-2">No results found</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Try different keywords or check spelling</p>
                </div>
              )}

              {/* Search results grouped by category */}
              {results.length > 0 && Object.entries(groupedResults).map(([category, items]) => (
                <div key={category} className="py-2">
                  <div className="sticky top-0 px-4 sm:px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 backdrop-blur-sm border-b border-gray-100/50">
                    {category}
                  </div>
                  {items.map((item, idx) => {
                    const globalIndex = results.indexOf(item);
                    const IconComponent = item.icon;
                    const isExternal = item.type === "external" || (item.path && item.path.startsWith("http"));
                    const isOnPage = item.type === "content";

                    // Color scheme based on type
                    const colorScheme = isOnPage
                      ? { hover: 'hover:from-amber-50 hover:to-amber-100/50 hover:border-amber-400', active: 'bg-gradient-to-r from-amber-50 to-amber-100/50 border-amber-400 shadow-sm', icon: 'bg-amber-100 text-amber-600 group-hover:bg-amber-200' }
                      : item.type === "nav"
                        ? { hover: 'hover:from-blue-50 hover:to-blue-100/50 hover:border-blue-400', active: 'bg-gradient-to-r from-blue-50 to-blue-100/50 border-blue-400 shadow-sm', icon: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200' }
                        : { hover: 'hover:from-emerald-50 hover:to-emerald-100/50 hover:border-emerald-400', active: 'bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-400 shadow-sm', icon: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200' };

                    return (
                      <button
                        key={`${category}-${idx}`}
                        onClick={() => handleResultClick(item)}
                        className={`
                          w-full flex items-start px-4 sm:px-6 py-3 sm:py-4 hover:bg-gradient-to-r transition-all duration-200
                          border-l-4 border-transparent text-left group
                          ${colorScheme.hover}
                          ${selectedIndex === globalIndex ? colorScheme.active : ''}
                          hover:scale-[1.02] hover:shadow-md
                        `}
                        tabIndex={0}
                        type="button"
                        ref={el => resultsRef.current[globalIndex] = el}
                      >
                        <div className={`p-2 rounded-lg mr-3 sm:mr-4 transition-all duration-200 flex-shrink-0 ${colorScheme.icon}`}>
                          <IconComponent size={14} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="text-gray-800 text-xs sm:text-sm font-medium truncate">
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-gray-500 text-xs mt-1 truncate">
                              {item.description}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2 ml-2 sm:ml-4 flex-shrink-0">
                          {isOnPage && (
                            <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-100 px-2 py-1 rounded-full font-medium">
                              <MoveRight size={10} />
                              <span>Jump</span>
                            </div>
                          )}
                          {isExternal && (
                            <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full font-medium">
                              <Globe size={10} />
                              <span>External</span>
                            </div>
                          )}
                          {!isExternal && item.type === "page" && (
                            <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full font-medium">
                              <MoveRight size={10} />
                              <span>Go to</span>
                            </div>
                          )}
                          <ChevronRight size={12} className="text-gray-300 group-hover:text-gray-500 transition-colors" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Footer with result count + keyboard hints */}
            {results.length > 0 && (
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-100/50 bg-gradient-to-r from-gray-50/50 to-white/50 rounded-b-3xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </span>
                  </div>
                  {!isMobile && (
                    <div className="flex items-center space-x-3 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <ArrowUpDown size={12} />
                        <span>Navigate</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CornerDownLeft size={12} />
                        <span>Select</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <kbd className="px-1.5 py-0.5 bg-white rounded border text-xs">Esc</kbd>
                        <span>Close</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Searchbar;