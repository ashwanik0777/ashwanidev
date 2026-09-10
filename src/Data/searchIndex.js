/**
 * Static Search Index for GBU Website
 * 
 * This index enables cross-page search — results from ALL pages show up
 * regardless of which page the user is currently on.
 * 
 * Each entry has:
 * - label: Display name shown in search results
 * - keywords: Array of lowercase search terms that match this entry
 * - path: Route path to navigate to (can include #hash for section scroll)
 * - category: Grouping category for search results
 * - description: Short description shown below the label
 */

const SEARCH_INDEX = [
  // ==================== HOME ====================
  {
    label: "Home",
    keywords: ["home", "main", "gbu", "gautam buddha university", "homepage", "landing"],
    path: "/",
    category: "General",
    description: "GBU Homepage — Gautam Buddha University"
  },

  // ==================== ABOUT US ====================
  {
    label: "About GBU",
    keywords: ["about", "gbu", "university", "gautam buddha", "about us", "introduction", "overview"],
    path: "/about-us/about-gbu",
    category: "About Us",
    description: "Learn about Gautam Buddha University"
  },
  {
    label: "Chancellor Message",
    keywords: ["chancellor", "message", "chancellor message", "hon'ble chancellor", "governor"],
    path: "/about-us/chancellor-message",
    category: "About Us",
    description: "Message from the Hon'ble Chancellor"
  },
  {
    label: "Vice Chancellor Message",
    keywords: ["vice chancellor", "vc", "message", "vice-chancellor", "vc message"],
    path: "/about-us/vice-chancellor-message",
    category: "About Us",
    description: "Message from the Vice Chancellor"
  },
  {
    label: "GBU: A Strategic Perspective",
    keywords: ["strategic", "perspective", "vision", "mission", "strategy", "strategic perspective"],
    path: "/about-us/strategic-perspective",
    category: "About Us",
    description: "Strategic vision and perspective of GBU"
  },
  {
    label: "Organization",
    keywords: ["organization", "structure", "deans", "officials", "administration", "organogram"],
    path: "/about-us/organization",
    category: "About Us",
    description: "Organizational structure and Deans of Schools"
  },
  {
    label: "Governing Bodies",
    keywords: ["governing", "bodies", "governance", "board", "executive council", "court"],
    path: "/about-us/governing-bodies",
    category: "About Us",
    description: "Governing bodies of the university"
  },
  {
    label: "Regulatory Bodies",
    keywords: ["regulatory", "bodies", "ugc", "aicte", "bci", "regulation"],
    path: "/about-us/regulatory-bodies",
    category: "About Us",
    description: "Regulatory bodies associated with GBU"
  },
  {
    label: "Committees",
    keywords: ["committee", "committees", "advisory", "standing committee"],
    path: "/about-us/committee",
    category: "About Us",
    description: "Various committees of the university"
  },
  {
    label: "GBU Act, Statute & Ordinance",
    keywords: ["act", "statute", "ordinance", "law", "gbu act", "regulation"],
    path: "/about-us/act",
    category: "About Us",
    description: "GBU Act, Statutes, and Ordinances"
  },
  {
    label: "Policies",
    keywords: ["policies", "policy", "rules", "regulations", "anti-ragging", "sexual harassment"],
    path: "/about-us/policies",
    category: "About Us",
    description: "University policies and rules"
  },
  {
    label: "Mandatory Disclosures",
    keywords: ["mandatory", "disclosures", "disclosure", "transparency", "nirf"],
    path: "/about-us/mandatory-disclosures",
    category: "About Us",
    description: "Mandatory disclosures as per regulations"
  },
  {
    label: "Right to Information (RTI)",
    keywords: ["rti", "right to information", "information", "transparency", "public information"],
    path: "/rti",
    category: "About Us",
    description: "RTI — Right to Information portal"
  },
  {
    label: "Guidelines / GO",
    keywords: ["guidelines", "go", "government order", "instructions", "circulars"],
    path: "/about-us/guidelines",
    category: "About Us",
    description: "Guidelines and Government Orders"
  },
  {
    label: "Registrar",
    keywords: ["registrar", "administration", "registrar office"],
    path: "/about-us/registrar",
    category: "About Us",
    description: "Office of the Registrar"
  },

  // ==================== ACADEMICS ====================
  {
    label: "Schools & Departments",
    keywords: ["schools", "departments", "school", "department", "faculty", "ict", "usict", "law", "management", "biotechnology", "buddhist", "engineering", "humanities", "vocational"],
    path: "/academics/schools",
    category: "Academics",
    description: "All Schools and Departments of GBU"
  },
  {
    label: "Faculty Directory",
    keywords: ["faculty", "professor", "teacher", "staff", "directory", "faculty directory", "professors"],
    path: "/academics/faculty",
    category: "Academics",
    description: "Search and browse university faculty members"
  },
  {
    label: "Academic Calendar & Regulations",
    keywords: ["academic calendar", "calendar", "semester", "exam", "examination", "schedule", "regulations", "academic"],
    path: "/academics/academic-calendar",
    category: "Academics",
    description: "Academic calendar, exam schedules, and regulations"
  },
  {
    label: "List of Holidays",
    keywords: ["holidays", "holiday", "leave", "vacation", "off days", "gazetted", "list of holidays"],
    path: "/academics/list-of-holidays",
    category: "Academics",
    description: "Official list of holidays for the academic year"
  },
  {
    label: "CBCS Curriculum Framework",
    keywords: ["cbcs", "curriculum", "framework", "choice based", "credit system", "syllabus"],
    path: "/academics/cbcs-framework",
    category: "Academics",
    description: "Choice Based Credit System curriculum framework"
  },
  {
    label: "National Academic Depository (NAD)",
    keywords: ["nad", "national academic depository", "depository", "certificates", "degree verification", "digilocker"],
    path: "/academics/national-academic-depository",
    category: "Academics",
    description: "NAD — Digital repository of academic certificates"
  },
  {
    label: "Annual Reports",
    keywords: ["annual reports", "reports", "publications", "yearly report", "annual"],
    path: "/academics/annual-reports",
    category: "Academics",
    description: "University annual reports and publications"
  },
  {
    label: "International Collaboration",
    keywords: ["international", "collaboration", "mou", "partnership", "global", "foreign", "exchange"],
    path: "/academics/international-collaboration",
    category: "Academics",
    description: "International collaborations and MOUs"
  },

  // ==================== ADMISSIONS ====================
  {
    label: "Admissions Portal",
    keywords: ["admission", "admissions", "apply", "entrance", "registration", "samarth", "admission form", "new admission"],
    path: "https://gbuadm.samarth.edu.in/",
    category: "Admissions",
    description: "Online Admissions Portal (Samarth)"
  },

  // ==================== RESEARCH ====================
  {
    label: "Center of Excellence and Labs",
    keywords: ["research centers", "center of excellence", "labs", "laboratory", "research labs", "centres"],
    path: "/research/research-centers",
    category: "Research",
    description: "Research centers and laboratories"
  },
  {
    label: "Publications",
    keywords: ["publications", "research papers", "journals", "articles", "papers", "published"],
    path: "/research/publications",
    category: "Research",
    description: "Research publications and papers"
  },
  {
    label: "GBU Incubation Centre",
    keywords: ["incubation", "startup", "start-up", "entrepreneurship", "innovation", "incubation centre", "business"],
    path: "/research/incubation",
    category: "Research",
    description: "GBU Incubation Centre for startups"
  },
  {
    label: "Institution and Innovation",
    keywords: ["institution", "innovation", "iic", "innovation council", "creative"],
    path: "/research/institution-innovation",
    category: "Research",
    description: "Institution Innovation Council (IIC)"
  },
  {
    label: "IPR Cell",
    keywords: ["ipr", "intellectual property", "patent", "copyright", "trademark", "ipr cell"],
    path: "/research/ipr-cell",
    category: "Research",
    description: "Intellectual Property Rights Cell"
  },

  // ==================== CAMPUS LIFE ====================
  {
    label: "Campus Life Overview",
    keywords: ["campus", "campus life", "overview", "life at gbu", "student life", "campus tour"],
    path: "/campus-life/hero",
    category: "Campus Life",
    description: "Overview of campus life at GBU"
  },
  {
    label: "Hostels",
    keywords: ["hostel", "hostels", "hostel facilities", "accommodation", "rooms", "mess", "dining", "boys hostel", "girls hostel"],
    path: "/campus-life/hostel-facilities",
    category: "Campus Life",
    description: "Hostel facilities and accommodation"
  },
  {
    label: "Sports & Fitness",
    keywords: ["sports", "fitness", "games", "athletics", "cricket", "football", "gymnasium", "sports facilities", "cultural"],
    path: "/campus-life/sports-fitness",
    category: "Campus Life",
    description: "Sports facilities and cultural activities"
  },
  {
    label: "Clubs and Societies",
    keywords: ["clubs", "societies", "club", "society", "cultural", "technical", "literary", "robotics", "coding", "dance", "music", "drama"],
    path: "/campus-life/clubs-societies",
    category: "Campus Life",
    description: "Student clubs and societies"
  },
  {
    label: "Meditation Centre",
    keywords: ["meditation", "meditation center", "yoga", "mindfulness", "wellness", "spiritual"],
    path: "/campus-life/meditation-center",
    category: "Campus Life",
    description: "Meditation and wellness centre"
  },
  {
    label: "National Service Scheme (NSS)",
    keywords: ["nss", "national service scheme", "social service", "community", "volunteer", "nss activities"],
    path: "/campus-life/NSS",
    category: "Campus Life",
    description: "NSS — Community service and volunteer activities"
  },
  {
    label: "National Cadet Corps (NCC)",
    keywords: ["ncc", "national cadet corps", "cadet", "army", "military", "defense", "ncc activities"],
    path: "/campus-life/NCC",
    category: "Campus Life",
    description: "NCC — National Cadet Corps wing"
  },
  {
    label: "Library",
    keywords: ["library", "books", "e-resources", "reading", "digital library", "journals", "study"],
    path: "/campus-life/library",
    category: "Campus Life",
    description: "University library and e-resources"
  },

  // ==================== ANNOUNCEMENTS ====================
  {
    label: "News & Updates",
    keywords: ["news", "updates", "notifications", "latest news", "announcements", "news updates"],
    path: "/announcements/news-notifications",
    category: "Announcements",
    description: "Latest news and university updates"
  },
  {
    label: "Upcoming Events",
    keywords: ["events", "upcoming events", "event calendar", "conference", "seminar", "workshop", "fest", "convocation"],
    path: "/announcements/event-calendar",
    category: "Announcements",
    description: "Upcoming events and event calendar"
  },
  {
    label: "Notices & Circular",
    keywords: ["notices", "circular", "notice board", "official notice", "notification", "order"],
    path: "/announcements/notices",
    category: "Announcements",
    description: "Official notices and circulars"
  },
  {
    label: "Media Gallery",
    keywords: ["media", "gallery", "photos", "images", "video", "media gallery", "pictures"],
    path: "/announcements/media-gallery",
    category: "Announcements",
    description: "Photo and video gallery"
  },
  {
    label: "Newsletter",
    keywords: ["newsletter", "magazine", "bulletin", "edition", "publication"],
    path: "/announcements/newsletter",
    category: "Announcements",
    description: "University newsletters and bulletins"
  },

  // ==================== PLACEMENTS ====================
  {
    label: "Placements",
    keywords: ["placement", "placements", "job", "career", "recruitment", "campus placement", "packages", "salary", "companies", "hiring"],
    path: "/placements",
    category: "Placements",
    description: "Placement cell and campus recruitment"
  },

  // ==================== ALUMNI ====================
  {
    label: "Alumni",
    keywords: ["alumni", "alumni network", "graduates", "former students", "alumni association", "alumni portal"],
    path: "/alumni",
    category: "Alumni",
    description: "Alumni network and association"
  },

  // ==================== UTILITY & SERVICES ====================
  {
    label: "IT Cell",
    keywords: ["it cell", "information technology", "it services", "computer", "network", "internet", "wifi", "email"],
    path: "/it-cell",
    category: "Services",
    description: "IT Cell — Technology services and support"
  },
  {
    label: "Contact Us",
    keywords: ["contact", "contact us", "phone", "email", "address", "reach us", "enquiry", "helpline"],
    path: "/contactUs",
    category: "Services",
    description: "Contact information and enquiry"
  },
  {
    label: "Contact Directory",
    keywords: ["directory", "contact directory", "phone directory", "staff contacts", "telephone"],
    path: "/contactDirectory",
    category: "Services",
    description: "Staff and department contact directory"
  },
  {
    label: "Facility Booking",
    keywords: ["booking", "facility", "hall booking", "auditorium", "seminar hall", "room booking", "venue"],
    path: "/booking",
    category: "Services",
    description: "Book university facilities and venues"
  },
  {
    label: "Tenders",
    keywords: ["tender", "tenders", "procurement", "bid", "contract", "quotation", "tender notice"],
    path: "/tender",
    category: "Services",
    description: "Active tenders and procurement notices"
  },
  {
    label: "Recruitments",
    keywords: ["recruitment", "recruitments", "jobs", "vacancy", "career", "hiring", "openings", "faculty recruitment", "non-teaching"],
    path: "/recruitments",
    category: "Services",
    description: "Job openings and recruitment notices"
  },
  {
    label: "Sitemap",
    keywords: ["sitemap", "site map", "all pages", "navigation"],
    path: "/sitemap",
    category: "Services",
    description: "Complete sitemap of the website"
  },
  {
    label: "Privacy Policy",
    keywords: ["privacy", "privacy policy", "data protection", "cookies"],
    path: "/privacy-policy",
    category: "Legal",
    description: "Privacy policy and data protection"
  },
  {
    label: "Terms of Use",
    keywords: ["terms", "terms of use", "conditions", "disclaimer"],
    path: "/terms-of-use",
    category: "Legal",
    description: "Terms and conditions of use"
  },
];

export default SEARCH_INDEX;
