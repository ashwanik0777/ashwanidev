export const SCHOOL_DASHBOARD_STORAGE_KEY = "gbu_school_dashboard_data";

export const DEFAULT_SCHOOL_DASHBOARD_DATA = {
  schoolName: "",
  schoolCode: "",
  deanName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  address: "",
  bannerImage: "",
  schoolDescription: "",
  highlights: [],
  clubs: [],
  departments: [],
  pages: [],
  announcements: [
    { id: "ann-1", text: "Admissions open for PG programs.", active: true },
    { id: "ann-2", text: "School research colloquium on Monday.", active: true }
  ],
  events: [
    {
      id: "evt-1",
      title: "Online National Article Writing Competition (GST)",
      date: "2025-06-30",
      venue: "School of Law",
      type: "Important",
      time: "11:00",
      organizer: "School of Law",
      attendees: 220,
      price: "Free",
      tags: ["Competition", "Legal Studies"],
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2NnCSPRdgMAEkEafMhZojs0fdgEv6hFY0A&s",
      imageLink: "",
      description: "Organized by School of Law, extended submission date."
    },
    {
      id: "evt-2",
      title: "AI and Data Science Research Colloquium",
      date: "2026-07-12",
      venue: "Seminar Hall - ICT",
      type: "Academic",
      time: "10:30",
      organizer: "SOICT Research Cell",
      attendees: 150,
      price: "Free",
      tags: ["AI", "Research"],
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200",
      imageLink: "",
      description: "Faculty and research scholars will present ongoing AI and data science work."
    },
    {
      id: "evt-3",
      title: "Inter-School Sports Meet",
      date: "2026-08-08",
      venue: "University Sports Complex",
      type: "Sports",
      time: "09:00",
      organizer: "Dean Student Welfare",
      attendees: 500,
      price: "Free",
      tags: ["Sports", "Campus Life"],
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200",
      imageLink: "",
      description: "Annual inter-school athletics and team sports championship."
    }
  ],
  news: [
    {
      id: "news-1",
      title: "School signs new industry MoU",
      date: "2025-04-02",
      status: "published",
      category: "Academic",
      excerpt: "New MoU signed to boost internships and joint labs.",
      content: "School has signed a strategic MoU with industry partner for internships, live projects, and joint innovation labs.",
      author: "School Office",
      department: "SOICT",
      tags: ["MoU", "Industry"],
      featured: true,
      priority: "high",
      views: 940,
      likes: 84,
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200",
      imageLink: ""
    },
    {
      id: "news-2",
      title: "Faculty secures major AI research grant",
      date: "2025-03-21",
      status: "published",
      category: "Research",
      excerpt: "Grant sanctioned for explainable AI project.",
      content: "Research team secured funding for a multi-year explainable AI project with industry relevance.",
      author: "Research Cell",
      department: "SOICT",
      tags: ["Research", "Grant"],
      featured: false,
      priority: "medium",
      views: 610,
      likes: 47,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200",
      imageLink: ""
    },
    {
      id: "news-3",
      title: "Students win national coding challenge",
      date: "2025-02-27",
      status: "published",
      category: "Technology",
      excerpt: "Team won first place in national coding challenge.",
      content: "A student team from the school secured first rank in national coding championship competing with 200+ colleges.",
      author: "Innovation Cell",
      department: "SOICT",
      tags: ["Students", "Coding", "Achievement"],
      featured: false,
      priority: "medium",
      views: 720,
      likes: 91,
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200",
      imageLink: ""
    },
    {
      id: "news-4",
      title: "Annual sports performance highlights released",
      date: "2025-01-18",
      status: "published",
      category: "Sports",
      excerpt: "School teams performed strongly in university championships.",
      content: "School teams secured medals across athletics, basketball, and table tennis in annual university sports week.",
      author: "Sports Committee",
      department: "Student Affairs",
      tags: ["Sports", "Campus"],
      featured: false,
      priority: "low",
      views: 420,
      likes: 28,
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200",
      imageLink: ""
    },
    {
      id: "news-5",
      title: "Green campus sustainability drive completed",
      date: "2024-12-11",
      status: "published",
      category: "Environment",
      excerpt: "Plantation and clean-energy awareness campaign completed.",
      content: "Students and faculty completed a large sustainability drive with plantation and waste segregation awareness sessions.",
      author: "Eco Club",
      department: "Campus Development",
      tags: ["Environment", "Sustainability"],
      featured: false,
      priority: "low",
      views: 350,
      likes: 25,
      image: "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=1200",
      imageLink: ""
    },
    {
      id: "news-6",
      title: "Faculty publishes high-impact journal paper",
      date: "2024-11-08",
      status: "published",
      category: "Faculty & Research",
      excerpt: "Paper accepted in top-tier computing journal.",
      content: "Faculty team published a paper in an international high-impact journal on trustworthy machine learning systems.",
      author: "Dean Office",
      department: "SOICT",
      tags: ["Publication", "Faculty"],
      featured: false,
      priority: "medium",
      views: 530,
      likes: 39,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
      imageLink: ""
    },
    {
      id: "news-7",
      title: "School receives innovation excellence award",
      date: "2024-10-03",
      status: "published",
      category: "Awards & Recognition",
      excerpt: "Award received for innovation-led education practices.",
      content: "School has been recognized for innovation in pedagogy and industry-integrated curriculum.",
      author: "Administration",
      department: "SOICT",
      tags: ["Award", "Recognition"],
      featured: true,
      priority: "high",
      views: 810,
      likes: 102,
      image: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200",
      imageLink: ""
    }
  ],
  newsletters: [
    {
      id: "nl-1",
      title: "SOICT Monthly Digest - April 2026",
      date: "2026-04-05",
      category: "School Update",
      issueNumber: "Vol. 2026, Issue 1",
      excerpt: "Highlights from placements, research, and student activities.",
      content: "This issue covers recent school updates, student achievements, and key announcements.",
      coverImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
      imageLink: "",
      pdfLink: "",
      views: 320,
      isPublished: true
    },
    {
      id: "nl-2",
      title: "Innovation Special Edition",
      date: "2026-03-18",
      category: "Innovation",
      issueNumber: "Vol. 2026, Issue 2",
      excerpt: "Special issue focused on innovation projects and labs.",
      content: "A special edition featuring startup ideas, innovation day, and student-led product demos.",
      coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
      imageLink: "",
      pdfLink: "",
      views: 280,
      isPublished: true
    }
  ],
  notices: [
    {
      id: "notice-1",
      title: "Back Paper Examination Date Sheet - Even Semester 2024-25",
      date: "2025-05-16",
      type: "Important",
      priority: "high",
      content: "Back paper examination date sheet has been published for all eligible students.",
      pdfUrl: "",
      isNew: true,
      views: 1100
    },
    {
      id: "notice-2",
      title: "Notice for Aadhaar e-KYC through UPDESCO",
      date: "2025-06-03",
      type: "Administrative",
      priority: "medium",
      content: "All students are advised to complete Aadhaar e-KYC process through UPDESCO portal.",
      pdfUrl: "",
      isNew: true,
      views: 620
    },
    {
      id: "notice-3",
      title: "Summer Internship Opportunities 2025",
      date: "2025-05-10",
      type: "Placement",
      priority: "medium",
      content: "Multiple internship openings announced for 2nd and 3rd year students.",
      pdfUrl: "",
      isNew: false,
      views: 510
    },
    {
      id: "notice-4",
      title: "PhD Thesis Submission Guidelines Update",
      date: "2025-05-12",
      type: "Academic",
      priority: "low",
      content: "Updated thesis submission template and evaluation process has been published.",
      pdfUrl: "",
      isNew: false,
      views: 275
    }
  ],
  eventGallery: [
    {
      id: "gallery-1",
      title: "Innovation Day Highlights",
      eventDate: "2026-03-22",
      category: "Events",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200",
      images: ["https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200"],
      imageLink: ""
    },
    {
      id: "gallery-2",
      title: "Research Poster Showcase",
      eventDate: "2025-02-10",
      category: "Research",
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200",
      images: ["https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200"],
      imageLink: ""
    },
    {
      id: "gallery-3",
      title: "Sports Meet Moments",
      eventDate: "2025-01-29",
      category: "Sports",
      imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200",
      images: ["https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200"],
      imageLink: ""
    },
    {
      id: "gallery-4",
      title: "Cultural Evening Snaps",
      eventDate: "2024-12-14",
      category: "Cultural",
      imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200",
      images: ["https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200"],
      imageLink: ""
    }
  ],
  navigation: {
    tabs: [
      { id: "home", label: "Home", subTabs: [] },
      { id: "faculty", label: "Faculty", subTabs: [] },
      {
        id: "about",
        label: "About Us",
        subTabs: [
          "Dean's Message",
          "USICT COEIDrone Technologies",
          "USICT Cyber Security Lab",
          "USICT COEIRAEM",
          "USICT Board of Studies",
          "USICT Staff Members",
          "USICT Laboratories",
          "USICT Activities"
        ]
      },
      {
        id: "departments",
        label: "Departments & Academic Programs",
        subTabs: [
          "Department of Computer Science and Engineering",
          "Department of Information Technology",
          "Department of Electronic & Communication"
        ]
      },
      {
        id: "research",
        label: "Research",
        subTabs: [
          "Research",
          "Research Area and Profile",
          "Training and Consultancy",
          "Research Scholars",
          "Research Projects",
          "Patents"
        ]
      },
      { id: "placement", label: "Placement", subTabs: [] },
      { id: "contact", label: "Contact Us", subTabs: [] }
    ]
  },
  tabContent: {
    home: {
      heroTitle: "",
      heroSubtitle: "",
    },
    faculty: {
      facultyPagePath: "",
      title: "Faculty",
      totalFacultyText: "",
      description: "",
    },
    about: {
      introTitle: "About the School",
      overviewText: "",
      deanMessage: "",
      deanPath: "",
      boardPath: "",
      staffPath: "",
      labsPath: "",
      activitiesPath: "",
    },
    research: {
      introText: "",
      profilePath: "",
      consultancyPath: "",
      scholarsPath: "",
      projectsPath: "",
      patentsPath: "",
    },
    placement: {
      path: "",
      overview: "",
      statsText: "",
      recruiters: [],
    },
    contact: {
      path: "",
      officeHours: "Monday to Friday, 9:30 AM to 5:30 PM",
      helpdeskEmail: "",
      helpdeskPhone: "",
      mapUrl: "https://maps.google.com/?q=Gautam+Buddha+University",
    },
  },
};
