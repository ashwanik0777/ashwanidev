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
  announcements: [],
  events: [],
  news: [],
  newsletters: [],
  notices: [],
  eventGallery: [],
  navigation: {
    tabs: [
      { id: "home", label: "Home", subTabs: [] },
      { id: "faculty", label: "Faculty", subTabs: [] },
      {
        id: "about",
        label: "About Us",
        subTabs: [
          "Dean's Message",
          "SoICT COEIDrone Technologies",
          "SoICT Cyber Security Lab",
          "SoICT COEIRAEM",
          "SoICT Board of Studies",
          "SoICT Staff Members",
          "SoICT Laboratories",
          "SoICT Activities"
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
