import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Save,
  RotateCcw,
  LogOut,
  Home,
  Users,
  UserPlus,
  CalendarDays,
  Newspaper,
  Bell,
  Images,
  Lock,
  Plus,
  Trash2,
  Pencil,
  Search,
  AlertTriangle,
  X,
  ClipboardList,
  CheckCircle,
} from "lucide-react";
import {
  DEFAULT_SCHOOL_DASHBOARD_DATA,
  SCHOOL_DASHBOARD_STORAGE_KEY,
} from "../../Data/schoolDashboardData";
import {
  adminGetFacultyList,
  adminCreateFacultyProfile,
  adminUpdateFacultyProfile,
  adminDeleteFacultyProfile,
  adminGenerateFacultyPassword
} from "../../services/facultyDashboardService";
import { clearPortalSession } from "../../utils/portalSession";
import {
  listFacultyRegistrationRequests,
  approveFacultyRegistration,
  rejectFacultyRegistration,
} from "../../services/facultyRegistrationService";
import {
  SCHOOLS_META,
  getSchoolByApiParam,
  getSchoolByName,
  getDepartmentsForSchool,
  resolveSchool,
} from "../../Data/schoolsMeta";
import { parseImageUrl } from "../../utils/imageUtils.js";
// Semester Registration is held back from this release, so its modules are not
// committed to the repository. Keeping these imports live breaks the deployment
// build with "Could not resolve ../../services/registrationControl".
// To re-enable: delete the stubs below and restore these three imports.
//   import { fetchRegistrationsBySchool } from "../../services/semesterRegistrationService";
//   import { parseDriveLink } from "../../Data/semesterRegistrationData";
//   import { getSchoolRegistrationState, setSchoolRegistration, getRegistrationStatus, REASON_OPTIONS } from "../../services/registrationControl";
const fetchRegistrationsBySchool = async () => ({ data: [] });
const parseDriveLink = (url) => parseImageUrl(url);
const getSchoolRegistrationState = () => ({ active: false, reason: "", customMessage: "" });
const setSchoolRegistration = () => {};
const getRegistrationStatus = () => ({ active: false, reason: "", customMessage: "" });
const REASON_OPTIONS = [];

import AnnouncementManager from "../../components/announcement/AnnouncementManager";

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const ACTIVE_TABS = [
  { id: "home", label: "Home", icon: Home },
  { id: "faculty-management", label: "Faculty Management", icon: Users },
  { id: "faculty-requests", label: "Faculty Requests", icon: UserPlus },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "news", label: "News", icon: Newspaper },
  { id: "newsletters", label: "Newsletters", icon: Newspaper },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "event-gallery", label: "Event Gallery", icon: Images },
  { id: "clubs", label: "Clubs & Societies", icon: Users },
  // { id: "semester-registrations", label: "Semester Registrations", icon: ClipboardList }, // hidden until semester registration ships
];

const INACTIVE_TABS = [
  "About Us",
  "Departments & Academic Programs",
  "Research",
  "Placement",
  "Contact Us",
];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const NOTICES_FIELDS = [
  { key: "title", label: "Notice Title", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "type", label: "Type", type: "select", options: ["General", "Academic", "Examination", "Admission", "Placement", "Tenders", "Important", "Sports", "NSS/NCC", "Research", "Student Corner"], required: true },
  { key: "priority", label: "Priority", type: "select", options: ["medium", "low", "high"], required: true },
  { key: "level", label: "Announcement Level", type: "select", options: ["college", "school"], required: true },
  { key: "pdfUrl", label: "PDF URL", required: true },
  { key: "content", label: "Content", type: "textarea", required: true },
];

const NOTICES_TEMPLATE = {
  title: "",
  date: "",
  type: "General",
  priority: "medium",
  level: "college",
  pdfUrl: "",
  content: "",
};

const EVENTS_FIELDS = [
  { key: "title", label: "Event Title", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "startsAt", label: "Starts At (e.g. 10:00 AM)" },
  { key: "endDate", label: "End Date", type: "date" },
  { key: "endsAt", label: "Ends At (e.g. 04:00 PM)" },
  { key: "time", label: "Time Description (e.g. 10:00 AM - 04:00 PM)" },
  { key: "venue", label: "Venue (e.g. Seminar Hall)", required: true },
  { key: "location", label: "Location (e.g. ICT Block)" },
  { key: "type", label: "Type", type: "select", options: ["Seminar", "Workshop", "Conference", "Competition", "Sports", "Cultural", "Guest Lecture", "Orientation", "Convocation", "Other"], required: true },
  { key: "mode", label: "Mode", type: "select", options: ["Offline", "Online", "Hybrid"], required: true },
  { key: "organizer", label: "Organizer (e.g. School Office)", required: true },
  { key: "attendees", label: "Expected Attendees", type: "number" },
  { key: "price", label: "Price / Registration Fee" },
  { key: "tags", label: "Tags (comma separated)" },
  { key: "image", label: "Image URL" },
  { key: "imageLink", label: "Image Click Link" },
  { key: "coverImageUrl", label: "Cover Image URL" },
  { key: "images", label: "Gallery Images (comma separated URLs)" },
  { key: "registrationUrl", label: "Registration Link / URL" },
  { key: "level", label: "Announcement Level", type: "select", options: ["college", "school"], required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
];

const EVENTS_TEMPLATE = {
  title: "",
  date: "",
  startsAt: "",
  endDate: "",
  endsAt: "",
  time: "",
  venue: "",
  location: "",
  type: "Seminar",
  mode: "Offline",
  organizer: "",
  attendees: 0,
  price: "Free",
  tags: "",
  image: "",
  imageLink: "",
  coverImageUrl: "",
  images: "",
  registrationUrl: "",
  level: "college",
  description: "",
};

const NEWS_FIELDS = [
  { key: "title", label: "News Title", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "category", label: "Category", type: "select", options: ["Academic", "Research", "Technology", "Sports", "Environment", "Awards & Recognition", "Cultural", "Other"], required: true },
  { key: "priority", label: "Priority", type: "select", options: ["medium", "low", "high"], required: true },
  { key: "level", label: "Announcement Level", type: "select", options: ["college", "school"], required: true },
  { key: "excerpt", label: "Excerpt (Short Summary)", type: "textarea", required: true },
  { key: "content", label: "Content (Full Details)", type: "textarea", required: true },
  { key: "author", label: "Author" },
  { key: "department", label: "Department" },
  { key: "tags", label: "Tags (comma separated)" },
  { key: "featured", label: "Featured News", type: "boolean" },
  { key: "views", label: "Views Count", type: "number" },
  { key: "likes", label: "Likes Count", type: "number" },
  { key: "image", label: "Image URL" },
  { key: "imageLink", label: "Image Click Link" },
  { key: "coverImageUrl", label: "Cover Image URL" },
  { key: "pdfUrl", label: "PDF URL" },
  { key: "link", label: "External Link" },
  { key: "status", label: "Status", type: "select", options: ["published", "draft"], required: true },
];

const NEWS_TEMPLATE = {
  title: "",
  date: "",
  category: "Academic",
  author: "School Office",
  department: "",
  tags: "",
  priority: "medium",
  featured: false,
  views: 0,
  likes: 0,
  image: "",
  imageLink: "",
  coverImageUrl: "",
  pdfUrl: "",
  link: "",
  excerpt: "",
  content: "",
  level: "college",
  status: "published",
};

const NEWSLETTERS_FIELDS = [
  { key: "title", label: "Title", required: true },
  { key: "date", label: "Date", type: "date", required: true },
  { key: "issueNumber", label: "Issue Number (e.g. Vol. 1, Issue 2)", required: true },
  { key: "category", label: "Category", type: "select", options: ["Monthly Digest", "Special Edition", "Annual Report", "Academic Update", "Student Newsletter", "Other"], required: true },
  { key: "views", label: "Views Count", type: "number" },
  { key: "coverImage", label: "Cover Image URL", required: true },
  { key: "imageLink", label: "Image Click Link" },
  { key: "pdfLink", label: "PDF Link / URL", required: true },
  { key: "excerpt", label: "Excerpt (Short Summary)", type: "textarea", required: true },
  { key: "content", label: "Content (Full Details)", type: "textarea", required: true },
  { key: "isPublished", label: "Published", type: "boolean", required: true },
];

const NEWSLETTERS_TEMPLATE = {
  title: "",
  date: "",
  category: "Monthly Digest",
  issueNumber: "",
  views: 0,
  coverImage: "",
  imageLink: "",
  pdfLink: "",
  excerpt: "",
  content: "",
  isPublished: true,
};

const GALLERY_FIELDS = [
  { key: "title", label: "Gallery Title", required: true },
  { key: "eventDate", label: "Event Date", type: "date", required: true },
  { key: "category", label: "Category", type: "select", options: ["Events", "Research", "Sports", "Cultural", "Infrastructure", "Other"], required: true },
  { key: "imageUrl", label: "Image 1 URL", required: true },
  { key: "imageUrl2", label: "Image 2 URL" },
  { key: "imageUrl3", label: "Image 3 URL" },
  { key: "imageUrl4", label: "Image 4 URL" },
  { key: "imageLink", label: "Image Click Link" },
];

const GALLERY_TEMPLATE = {
  title: "",
  eventDate: "",
  category: "Events",
  imageUrl: "",
  imageUrl2: "",
  imageUrl3: "",
  imageUrl4: "",
  imageLink: "",
};

const FIELDS_CONFIG = {
  notices: NOTICES_FIELDS,
  news: NEWS_FIELDS,
  events: EVENTS_FIELDS,
  newsletters: NEWSLETTERS_FIELDS,
  eventGallery: GALLERY_FIELDS,
};

const Field = ({ label, children, required }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">
      {label} {required && <span className="text-red-500 font-bold ml-0.5">*</span>}
    </label>
    {children}
  </div>
);

const ensureArray = (value, fallback) => (Array.isArray(value) ? value : fallback);
const toList = (value) => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const SchoolDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA));
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";
  const setActiveTab = (tabId) => {
    setSearchParams({ tab: tabId }, { replace: true });
  };
  const [toast, setToast] = useState(null);
  const toastTimerRef = React.useRef(null);

  const setMessage = useCallback((text) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    if (!text) { setToast(null); return; }
    const isError = /fail|error|expired|cannot|too large/i.test(text);
    setToast({ text, type: isError ? "error" : "success", key: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    toastTimerRef.current = setTimeout(() => setToast(null), 5500);
    return () => clearTimeout(toastTimerRef.current);
  }, [toast]);
  const [facultyRefreshKey, setFacultyRefreshKey] = useState(0);
  const [collectionEditors, setCollectionEditors] = useState({});
  const [facultyEditor, setFacultyEditor] = useState({ index: null, form: null });
  const [facultyProfiles, setFacultyProfiles] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [schoolId, setSchoolId] = useState(null);
  // Content as last read from the backend, so a save never drops keys this
  // dashboard does not edit.
  const [storedSchoolContent, setStoredSchoolContent] = useState({});

  /* ── Faculty Registration Requests state ── */
  const [regRequests, setRegRequests] = useState([]);
  const [regRequestsLoading, setRegRequestsLoading] = useState(false);
  const [regRequestsError, setRegRequestsError] = useState("");
  const [regStatusFilter, setRegStatusFilter] = useState("pending");
  const [regSearchQuery, setRegSearchQuery] = useState("");
  const [regReloadToken, setRegReloadToken] = useState(0);
  const [regActionLoading, setRegActionLoading] = useState("");

  /* ── Semester Registrations state ── */
  const [semRegData, setSemRegData] = useState([]);
  const [semRegLoading, setSemRegLoading] = useState(false);
  const [semRegError, setSemRegError] = useState("");
  const [semRegFilters, setSemRegFilters] = useState({ programme: "all", semester: "all", search: "" });
  const [semRegExpanded, setSemRegExpanded] = useState(null);

  /* ── Registration Control State ── */
  const [schoolRegState, setSchoolRegState] = useState({ active: true, reason: '', customMessage: '' });
  const [regReasonOpen, setRegReasonOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState('closed');
  const [customMessage, setCustomMessage] = useState('');

  // Get school code from JWT session
  const session = React.useMemo(() => {
    try {
      const raw = localStorage.getItem("portal_auth_session");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      const token = parsed?.accessToken;
      if (!token) return null;
      const payload = JSON.parse(atob(token.split(".")[1]));
      return { schoolCode: payload?.schoolCode || "", ...parsed };
    } catch {
      return null;
    }
  }, []);

  const mySchoolCode = session?.schoolCode || data.schoolCode || "SOICT";

  React.useEffect(() => {
    if (mySchoolCode) {
      setSchoolRegState(getSchoolRegistrationState(mySchoolCode));
    }
  }, [mySchoolCode]);

  // Load school data from backend on mount
  React.useEffect(() => {
    const loadSchoolData = async () => {
      try {
        const { getSchoolByCode } = await import("../../services/schoolsService");
        const school = await getSchoolByCode(mySchoolCode);
        if (school) {
          setSchoolId(school.id);
          const c = school.content || {};
          setStoredSchoolContent(c);
          setData({
            ...deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA),
            schoolName: school.name || "",
            schoolCode: school.code || mySchoolCode,
            deanName: c.deanName || "",
            email: c.email || "",
            phone: c.phone || "",
            websiteUrl: c.websiteUrl || "",
            bannerImage: c.bannerImage || "",
            address: c.address || "",
            schoolDescription: school.overview || "",
            events: c.events || [],
            news: c.news || [],
            notices: c.notices || [],
            newsletters: c.newsletters || [],
            eventGallery: c.eventGallery || [],
            clubs: c.clubs || [],
            tabContent: c.tabContent || deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.tabContent),
          });
        }
      } catch (err) {
        console.error("Failed to load school data:", err);
        setMessage("Failed to load school data from backend. Using local defaults.");
      }
    };
    loadSchoolData();
  }, [mySchoolCode]);

  React.useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const schoolMeta = resolveSchool(mySchoolCode) || getSchoolByName(data.schoolName);
        const schoolParam = schoolMeta?.code || mySchoolCode || data.schoolName;
        const dataList = await adminGetFacultyList({ school: schoolParam, limit: 1000 });
        setFacultyProfiles(dataList.items || []);
      } catch (err) {
        console.error("Failed to fetch faculty list:", err);
      }
    };
    if (mySchoolCode || data.schoolName) {
      fetchFaculty();
    }
  }, [mySchoolCode, data.schoolName, facultyRefreshKey]);

  /* ── Fetch faculty registration requests ── */
  React.useEffect(() => {
    let isMounted = true;
    const fetchRegRequests = async () => {
      setRegRequestsLoading(true);
      setRegRequestsError("");
      try {
        const data = await listFacultyRegistrationRequests({
          status: regStatusFilter,
          query: regSearchQuery,
          page: 1,
          limit: 100,
        });
        if (!isMounted) return;
        setRegRequests(data?.items || []);
      } catch (err) {
        if (!isMounted) return;
        setRegRequestsError(err?.response?.data?.message || err?.message || "Failed to fetch requests");
      } finally {
        if (isMounted) setRegRequestsLoading(false);
      }
    };
    fetchRegRequests();
    return () => { isMounted = false; };
  }, [regStatusFilter, regSearchQuery, regReloadToken]);

  /* ── Fetch Semester Registrations ── */
  React.useEffect(() => {
    if (activeTab !== "semester-registrations") return;
    let isMounted = true;
    const loadData = async () => {
      setSemRegLoading(true);
      setSemRegError("");
      try {
        const result = await fetchRegistrationsBySchool(mySchoolCode, {
          programme: semRegFilters.programme === "all" ? undefined : semRegFilters.programme,
          semester: semRegFilters.semester === "all" ? undefined : semRegFilters.semester,
          search: semRegFilters.search || undefined,
        });
        if (!isMounted) return;
        setSemRegData(result?.data || []);
      } catch (err) {
        if (!isMounted) return;
        setSemRegError(err?.message || "Failed to load registrations");
      } finally {
        if (isMounted) setSemRegLoading(false);
      }
    };
    loadData();
    return () => { isMounted = false; };
  }, [activeTab, mySchoolCode, semRegFilters]);

  const schoolOptions = useMemo(
    () => SCHOOLS_META.map((school) => ({
      label: school.name,
      value: school.code,
    })),
    []
  );

  const departmentOptions = useMemo(() => {
    const schoolMeta = resolveSchool(facultyEditor.form?.school);
    return (schoolMeta?.departments || []).map((dept) => ({
      label: dept.name,
      value: dept.name,
    }));
  }, [facultyEditor.form?.school]);

  const summary = useMemo(
    () => [
      { label: "Faculty", value: facultyProfiles.length },
      { label: "Events", value: data.events?.length || 0 },
      { label: "News", value: data.news?.length || 0 },
      { label: "Newsletters", value: data.newsletters?.length || 0 },
      { label: "Notices", value: data.notices?.length || 0 },
    ],
    [facultyProfiles.length, data.events, data.news, data.newsletters, data.notices]
  );

  const updateField = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
    setMessage("");
  };

  const updateTabContent = (section, key, value) => {
    setData((prev) => ({
      ...prev,
      tabContent: {
        ...(prev.tabContent || {}),
        [section]: {
          ...(prev.tabContent?.[section] || {}),
          [key]: value,
        },
      },
    }));
    setMessage("");
  };

  const saveAll = async () => {
    if (!schoolId) {
      setMessage("School not loaded from backend. Cannot save.");
      return;
    }
    setIsSaving(true);
    try {
      const { updateSchool } = await import("../../services/schoolsService");
      const updated = await updateSchool(schoolId, {
        name: data.schoolName,
        overview: data.schoolDescription || "",
        // Overlay onto the stored content so keys this dashboard does not edit
        // (e.g. anything added by the admin portal) survive the save.
        content: {
          ...storedSchoolContent,
          deanName: data.deanName || "",
          email: data.email || "",
          phone: data.phone || "",
          websiteUrl: data.websiteUrl || "",
          bannerImage: data.bannerImage || "",
          address: data.address || "",
          events: data.events || [],
          news: data.news || [],
          notices: data.notices || [],
          newsletters: data.newsletters || [],
          eventGallery: data.eventGallery || [],
          tabContent: data.tabContent || {},
          clubs: data.clubs || [],
        },
        is_active: true,
      });
      if (updated?.content) setStoredSchoolContent(updated.content);
      setMessage("School data saved to backend successfully!");
    } catch (err) {
      console.error("Failed to save school data:", err);
      const status = err?.response?.status;
      if (status === 401) {
        setMessage("Your session expired. Please log in again — your edits are still on screen.");
      } else if (status === 413) {
        setMessage("This school's content is too large to save in one request. Remove some gallery images or older items and try again.");
      } else {
        setMessage(`Failed to save: ${err?.response?.data?.message || err.message}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const resetAll = () => {
    setData(deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA));
    setMessage("School dashboard reset to default data. Save to apply.");
  };

  const saveFacultyProfile = async (faculty) => {
    try {
      if (faculty.id && faculty.id.startsWith("faculty-")) {
        // New faculty – auto-create login account
        const result = await adminCreateFacultyProfile({
          ...faculty,
          createLoginAccount: true,
        });
        setFacultyRefreshKey((prev) => prev + 1);
        if (result?.loginAccount) {
          setMessage(`Faculty "${faculty.name}" created! Login — Username: ${result.loginAccount.username} | Password: ${result.loginAccount.password}`);
        } else {
          setMessage(`Faculty profile created: ${faculty.name}`);
        }
      } else {
        await adminUpdateFacultyProfile(faculty.id, faculty);
        setFacultyRefreshKey((prev) => prev + 1);
        setMessage(`Faculty profile updated: ${faculty.name}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(`Failed to update faculty: ${err?.response?.data?.message || err.message}`);
    }
  };

  const deleteFacultyProfile = async (facultyId) => {
    if (!window.confirm("Are you sure you want to delete this faculty profile? This action cannot be undone.")) {
      return;
    }
    try {
      await adminDeleteFacultyProfile(facultyId);
      setFacultyRefreshKey((prev) => prev + 1);
      setFacultyEditor({ index: null, form: null });
      setMessage("Faculty profile deleted.");
    } catch (err) {
      console.error(err);
      setMessage(`Failed to delete faculty: ${err?.response?.data?.message || err.message}`);
    }
  };

  const generateFacultyPassword = async (facultyId) => {
    try {
      const result = await adminGenerateFacultyPassword(facultyId);
      setMessage(`Password generated successfully: ${result?.password || "Check Email"}`);
    } catch (err) {
      console.error(err);
      setMessage(`Failed to generate password: ${err?.response?.data?.errors?.[0]?.message || err?.response?.data?.message || err.message}`);
    }
  };

  const addFacultyProfile = () => {
    const schoolMeta = resolveSchool(data.schoolCode) || getSchoolByName(data.schoolName);
    setFacultyEditor({
      index: null,
      form: {
        id: `faculty-${Date.now()}`,
        name: "",
        designation: "",
        department: "",
        school: schoolMeta?.code || data.schoolCode || "",
        school_code: schoolMeta?.code || data.schoolCode || "",
        email: "",
        phone: "",
      },
    });
  };

  const normalizeFieldInput = (field, value) => {
    if (field.type === "number") return Number(value || 0);
    if (field.type === "boolean") return value === true || value === "true";
    return value;
  };

  const openCollectionAdd = (listKey, template) => {
    setCollectionEditors((prev) => ({
      ...prev,
      [listKey]: { index: null, form: { ...template, id: `${listKey}-${Date.now()}` } },
    }));
  };

  const openCollectionEdit = (listKey, index, item) => {
    if (listKey === "clubs") {
      const flatClub = {
        id: item.id || `club-${Date.now()}`,
        name: item.name || "",
        tagline: item.tagline || "",
        category: item.category || "Technical",
        logo: item.logo || "",
        banner: item.banner || "",
        memberCount: item.memberCount || 0,
        description: item.description || "",
        history: item.history || "",
        facultyAdvisor: item.team?.facultyCoordinator?.name || item.facultyAdvisor || "",
        facultyAdvisorDept: item.team?.facultyCoordinator?.department || item.facultyAdvisorDept || "",
        presidentName: item.team?.president?.name || item.presidentName || "",
        presidentDept: item.team?.president?.department || item.presidentDept || "",
        vicePresidentName: item.team?.vicePresident?.name || item.vicePresidentName || "",
        vicePresidentDept: item.team?.vicePresident?.department || item.vicePresidentDept || "",
        secretaryName: item.team?.secretary?.name || item.secretaryName || "",
        secretaryDept: item.team?.secretary?.department || item.secretaryDept || "",
        treasurerName: item.team?.treasurer?.name || item.treasurerName || "",
        treasurerDept: item.team?.treasurer?.department || item.treasurerDept || "",
        instagram: item.socialMedia?.instagram || item.instagram || "",
        linkedin: item.socialMedia?.linkedin || item.linkedin || "",
        youtube: item.socialMedia?.youtube || item.youtube || "",
        objectives: Array.isArray(item.objectives) ? item.objectives.join(", ") : (item.objectives || ""),
        achievements: Array.isArray(item.achievements) ? item.achievements.join(", ") : (item.achievements || "")
      };
      setCollectionEditors((prev) => ({
        ...prev,
        [listKey]: { index, form: flatClub },
      }));
      return;
    }

    if (listKey === "eventGallery") {
      const sourceImages = toList(item.images);
      const baseImages = [item.imageUrl, ...sourceImages].map((image) => String(image || "").trim()).filter(Boolean);
      const uniqueImages = [...new Set(baseImages)].slice(0, 4);
      setCollectionEditors((prev) => ({
        ...prev,
        [listKey]: {
          index,
          form: {
            ...item,
            imageUrl: uniqueImages[0] || "",
            imageUrl2: uniqueImages[1] || "",
            imageUrl3: uniqueImages[2] || "",
            imageUrl4: uniqueImages[3] || "",
          },
        },
      }));
      return;
    }

    setCollectionEditors((prev) => ({
      ...prev,
      [listKey]: { index, form: { ...item } },
    }));
  };

  const updateCollectionFormField = (listKey, field, value) => {
    setCollectionEditors((prev) => ({
      ...prev,
      [listKey]: {
        ...(prev[listKey] || { index: null, form: {} }),
        form: {
          ...((prev[listKey] && prev[listKey].form) || {}),
          [field.key]: normalizeFieldInput(field, value),
        },
      },
    }));
  };

  const cancelCollectionEdit = (listKey) => {
    setCollectionEditors((prev) => ({
      ...prev,
      [listKey]: { index: null, form: null },
    }));
  };

  const saveCollectionForm = (listKey) => {
    const editor = collectionEditors[listKey];
    if (!editor?.form) return;

    let nextForm = { ...editor.form };
    const fieldsToValidate = FIELDS_CONFIG[listKey];
    if (fieldsToValidate) {
      for (const field of fieldsToValidate) {
        if (field.required) {
          const val = nextForm[field.key];
          if (val === undefined || val === null || String(val).trim() === "") {
            alert(`${field.label} is required.`);
            return;
          }
        }
      }
    }

    if (listKey === "clubs") {
      const objectivesArray = typeof nextForm.objectives === "string" 
        ? nextForm.objectives.split(",").map(x => x.trim()).filter(Boolean) 
        : (nextForm.objectives || []);
      const achievementsArray = typeof nextForm.achievements === "string" 
        ? nextForm.achievements.split(",").map(x => x.trim()).filter(Boolean) 
        : (nextForm.achievements || []);

      nextForm = {
        id: nextForm.id || nextForm.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: nextForm.name || "",
        tagline: nextForm.tagline || "",
        category: nextForm.category || "Technical",
        logo: nextForm.logo || "",
        banner: nextForm.banner || "",
        memberCount: Number(nextForm.memberCount || 0),
        description: nextForm.description || "",
        history: nextForm.history || "",
        objectives: objectivesArray,
        achievements: achievementsArray,
        team: {
          facultyCoordinator: {
            name: nextForm.facultyAdvisor || "",
            role: "Faculty Advisor",
            department: nextForm.facultyAdvisorDept || ""
          },
          president: {
            name: nextForm.presidentName || "",
            role: "President",
            department: nextForm.presidentDept || ""
          },
          vicePresident: {
            name: nextForm.vicePresidentName || "",
            role: "Vice President",
            department: nextForm.vicePresidentDept || ""
          },
          secretary: {
            name: nextForm.secretaryName || "",
            role: "Secretary",
            department: nextForm.secretaryDept || ""
          },
          treasurer: {
            name: nextForm.treasurerName || "",
            role: "Treasurer",
            department: nextForm.treasurerDept || ""
          },
          members: []
        },
        socialMedia: {
          instagram: nextForm.instagram || "",
          linkedin: nextForm.linkedin || "",
          youtube: nextForm.youtube || ""
        },
        policies: {
          codeOfConduct: [
            "Respect all members regardless of skill level",
            "Contribute positively to club activities",
            "Follow ethical practices"
          ],
          eligibility: [
            "Open to all students of the school",
            "Passion to learn and collaborate",
            "Commitment to attend regular sessions"
          ],
          responsibilities: [
            "President: Strategic planning & leadership",
            "Vice-President: Event coordination & engagement",
            "Secretary: Communication & documentation",
            "Treasurer: Budget management"
          ],
          meetingFrequency: "Weekly sessions as scheduled by coordinator"
        },
        events: [],
        reports: []
      };
    }

    if (listKey === "eventGallery") {
      const galleryImages = [
        nextForm.imageUrl,
        nextForm.imageUrl2,
        nextForm.imageUrl3,
        nextForm.imageUrl4,
        ...toList(nextForm.images),
      ]
        .map((item) => String(item || "").trim())
        .filter(Boolean);

      const uniqueImages = [...new Set(galleryImages)].slice(0, 4);
      if (galleryImages.length > 4) {
        setMessage("Event Gallery supports maximum 4 images per item.");
      }

      nextForm = {
        ...nextForm,
        imageUrl: uniqueImages[0] || "",
        images: uniqueImages,
      };
      delete nextForm.imageUrl2;
      delete nextForm.imageUrl3;
      delete nextForm.imageUrl4;
    }

    setData((prev) => {
      const next = [...(prev[listKey] || [])];
      if (editor.index === null || editor.index === undefined) {
        next.push(nextForm);
      } else {
        next[editor.index] = nextForm;
      }
      return { ...prev, [listKey]: next };
    });

    setCollectionEditors((prev) => ({
      ...prev,
      [listKey]: { index: null, form: null },
    }));
    setMessage(`${listKey} item saved.`);
  };

  const deleteCollectionItem = (listKey, index) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) {
      return;
    }
    setData((prev) => ({
      ...prev,
      [listKey]: (prev[listKey] || []).filter((_, i) => i !== index),
    }));

    setCollectionEditors((prev) => {
      const current = prev[listKey] || { index: null, form: null };
      if (current.index === index) return { ...prev, [listKey]: { index: null, form: null } };
      return prev;
    });

    setMessage(`${listKey} item deleted.`);
  };

  const renderCollectionEditor = (listKey, title, fields, newItemTemplate) => (
    <div className={cardClass}>
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">{title}</h2>
          <p className="text-xs text-slate-500 mt-1">Manage, add, and update school listings.</p>
        </div>
        <button
          type="button"
          onClick={() => openCollectionAdd(listKey, newItemTemplate)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-3.5 py-2 text-xs font-bold text-white hover:bg-sky-600 shadow-sm transition"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {(data[listKey] || []).map((item, index) => {
          const primaryValue = item.title || item.name || item.id || `Item ${index + 1}`;
          return (
            <div key={`${listKey}-${item.id || index}`} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 hover:bg-slate-50 transition">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{primaryValue}</p>
                  <p className="text-xs text-slate-500 mt-1">Entry #{index + 1}</p>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => openCollectionEdit(listKey, index, item)}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                  >
                    <Pencil className="h-3 w-3 text-slate-500" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCollectionItem(listKey, index)}
                    className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
                  >
                    <Trash2 className="h-3 w-3 text-rose-500" /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {(data[listKey] || []).length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No entries found. Click "Add New" to get started.
          </div>
        )}
      </div>

      {collectionEditors[listKey]?.form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl transform rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl transition-all animate-scale-in">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950">
                {collectionEditors[listKey].index === null ? `Add New ${title}` : `Edit ${title} Details`}
              </h3>
              <button
                type="button"
                onClick={() => cancelCollectionEdit(listKey)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1 py-1">
              {fields.map((field) => (
                <div key={`${listKey}-${field.key}`} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <Field label={field.label} required={field.required}>
                    {field.type === "textarea" ? (
                      <textarea
                        className={`${inputClass} min-h-24`}
                        value={collectionEditors[listKey].form[field.key] || ""}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                      />
                    ) : field.type === "boolean" ? (
                      <select
                        className={inputClass}
                        value={String(collectionEditors[listKey].form[field.key] ?? false)}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                      >
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    ) : field.type === "select" ? (
                      <select
                        className={inputClass}
                        value={collectionEditors[listKey].form[field.key] || ""}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                      >
                        {(field.options || []).map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        className={inputClass}
                        type={field.type || "text"}
                        value={collectionEditors[listKey].form[field.key] || ""}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => cancelCollectionEdit(listKey)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveCollectionForm(listKey)}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 text-xs font-semibold transition"
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderFacultyEditor = () => (
    <div className={cardClass}>
      <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Faculty Management</h2>
          <p className="text-xs text-slate-500 mt-1">Manage active faculty profiles for your school.</p>
        </div>
        <button
          type="button"
          onClick={addFacultyProfile}
          className="inline-flex items-center gap-1.5 rounded-xl bg-sky-500 px-3.5 py-2 text-xs font-bold text-white hover:bg-sky-600 shadow-sm transition"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
        {facultyProfiles.map((faculty, index) => (
          <div key={faculty.id || index} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 hover:bg-slate-50 transition">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-900">{faculty.name || "Untitled Faculty"}</p>
                <p className="text-xs text-slate-500 mt-1">{faculty.designation || "No designation"}</p>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => generateFacultyPassword(faculty.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                  title="Generate Initial Login Password"
                >
                  <Lock className="h-3 w-3 text-slate-500" /> Gen Pass
                </button>
                <button
                  type="button"
                  onClick={() => setFacultyEditor({ index, form: { ...faculty } })}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                >
                  <Pencil className="h-3 w-3 text-slate-500" /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteFacultyProfile(faculty.id)}
                  className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
                >
                  <Trash2 className="h-3 w-3 text-rose-500" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {facultyProfiles.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No faculty profiles found. Click "Add New" to create one.
          </div>
        )}
      </div>

      {facultyEditor.form && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl transform rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl transition-all animate-scale-in">
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-950">
                {facultyEditor.index === null ? "Add Faculty Profile" : "Edit Faculty Details"}
              </h3>
              <button
                type="button"
                onClick={() => setFacultyEditor({ index: null, form: null })}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 max-h-[60vh] overflow-y-auto pr-1 py-1">
              <Field label="Name" required><input className={inputClass} value={facultyEditor.form.name || ""} onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, name: e.target.value } }))} /></Field>
              <Field label="Designation" required><input className={inputClass} value={facultyEditor.form.designation || ""} onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, designation: e.target.value } }))} /></Field>
              <Field label="School" required>
                <select
                  className={inputClass}
                  value={facultyEditor.form.school || ""}
                  onChange={(e) =>
                    setFacultyEditor((prev) => ({
                      ...prev,
                      form: {
                        ...prev.form,
                        school: e.target.value,
                        department: "",
                      },
                    }))
                  }
                >
                  <option value="">Select school</option>
                  {schoolOptions.map((school) => (
                    <option key={school.value} value={school.value}>
                      {school.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Department" required>
                <select
                  className={inputClass}
                  value={facultyEditor.form.department || ""}
                  onChange={(e) =>
                    setFacultyEditor((prev) => ({
                      ...prev,
                      form: { ...prev.form, department: e.target.value },
                    }))
                  }
                  disabled={!departmentOptions.length}
                >
                  <option value="">
                    {departmentOptions.length ? "Select department" : "Select school first"}
                  </option>
                  {departmentOptions.map((dept) => (
                    <option key={dept.value} value={dept.value}>
                      {dept.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Email" required><input className={inputClass} value={facultyEditor.form.email || ""} onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, email: e.target.value } }))} /></Field>
              <Field label="Phone"><input className={inputClass} value={facultyEditor.form.phone || ""} onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, phone: e.target.value } }))} /></Field>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => setFacultyEditor({ index: null, form: null })}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveFacultyProfile(facultyEditor.form);
                  setFacultyEditor({ index: null, form: null });
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 text-xs font-semibold transition"
              >
                Save Faculty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  /* ── Faculty Registration Requests handlers and render ── */
  const handleApproveRequest = async (reqId) => {
    setRegActionLoading(`approve-${reqId}`);
    try {
      await approveFacultyRegistration(reqId);
      setMessage("Faculty registration approved. Login credentials sent to their email.");
      setRegReloadToken((p) => p + 1);
      setFacultyRefreshKey((p) => p + 1);
    } catch (err) {
      setMessage(`Approve failed: ${err?.response?.data?.message || err?.message || "Error"}`);
    } finally {
      setRegActionLoading("");
    }
  };

  const handleRejectRequest = async (reqId) => {
    const reason = prompt("Enter rejection reason (optional):");
    setRegActionLoading(`reject-${reqId}`);
    try {
      await rejectFacultyRegistration(reqId, reason || "");
      setMessage("Faculty registration request rejected.");
      setRegReloadToken((p) => p + 1);
    } catch (err) {
      setMessage(`Reject failed: ${err?.response?.data?.message || err?.message || "Error"}`);
    } finally {
      setRegActionLoading("");
    }
  };

  const renderFacultyRequestsTab = () => (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3">
          <h2 className="text-lg font-semibold text-slate-900">Faculty Registration Requests</h2>
          <p className="text-sm text-slate-600">Review and approve registration requests for your school.</p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-700"
              type="text"
              value={regSearchQuery}
              onChange={(e) => setRegSearchQuery(e.target.value)}
              placeholder="Search by name, email..."
            />
          </div>
          <select
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-700"
            value={regStatusFilter}
            onChange={(e) => setRegStatusFilter(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
          <button
            type="button"
            onClick={() => { setRegSearchQuery(""); setRegStatusFilter("pending"); }}
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Clear
          </button>
        </div>

        {regRequestsError && (
          <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            <AlertTriangle className="mr-1 inline h-4 w-4" /> {regRequestsError}
          </div>
        )}

        {regRequestsLoading && (
          <div className="py-8 text-center text-sm text-slate-500">Loading requests...</div>
        )}

        {!regRequestsLoading && regRequests.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No {regStatusFilter !== "all" ? regStatusFilter : ""} registration requests found.
          </div>
        )}

        {!regRequestsLoading && regRequests.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                  <th className="px-3 py-2">Name / Designation</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">Department</th>
                  <th className="px-3 py-2">Contact Details</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Date</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {regRequests.map((req) => (
                  <tr key={req.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2.5">
                      <div className="font-semibold text-slate-900">{req.name}</div>
                      <div className="text-xs text-slate-500">{req.designation}</div>
                    </td>
                    <td className="px-3 py-2.5 text-slate-600">{req.category}</td>
                    <td className="px-3 py-2.5 text-slate-600">{req.department}</td>
                    <td className="px-3 py-2.5">
                      <div className="text-slate-700 font-medium">{req.email}</div>
                      <div className="text-xs text-slate-500">{req.mobile}</div>
                    </td>
                    <td className="px-3 py-2.5">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                        req.status === "pending" ? "bg-amber-100 text-amber-800" :
                        req.status === "approved" ? "bg-emerald-100 text-emerald-800" :
                        "bg-rose-100 text-rose-800"
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500 text-xs">{new Date(req.created_at).toLocaleDateString()}</td>
                    <td className="px-3 py-2.5">
                      {req.status === "pending" && (
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleApproveRequest(req.id)}
                            disabled={regActionLoading === `approve-${req.id}`}
                            className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 disabled:opacity-50"
                          >
                            {regActionLoading === `approve-${req.id}` ? "..." : "Approve"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRejectRequest(req.id)}
                            disabled={regActionLoading === `reject-${req.id}`}
                            className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-50"
                          >
                            {regActionLoading === `reject-${req.id}` ? "..." : "Reject"}
                          </button>
                        </div>
                      )}
                      {req.status === "rejected" && req.rejection_reason && (
                        <span className="text-xs text-slate-500" title={req.rejection_reason}>Reason: {req.rejection_reason.slice(0, 30)}{req.rejection_reason.length > 30 ? "..." : ""}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  const renderBody = () => {
    if (activeTab === "home") {
      return (
        <div className={cardClass}>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Home Management</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="School Name">
              <input className={inputClass} value={data.schoolName || ""} onChange={(e) => updateField("schoolName", e.target.value)} />
            </Field>
            <Field label="Dean Name">
              <input className={inputClass} value={data.deanName || ""} onChange={(e) => updateField("deanName", e.target.value)} />
            </Field>
            <Field label="Hero Title">
              <input className={inputClass} value={data.tabContent?.home?.heroTitle || ""} onChange={(e) => updateTabContent("home", "heroTitle", e.target.value)} />
            </Field>
            <Field label="Hero Subtitle">
              <input className={inputClass} value={data.tabContent?.home?.heroSubtitle || ""} onChange={(e) => updateTabContent("home", "heroSubtitle", e.target.value)} />
            </Field>
            <Field label="Banner Image URL">
              <input className={inputClass} value={data.bannerImage || ""} onChange={(e) => updateField("bannerImage", e.target.value)} />
            </Field>
            <Field label="School Email">
              <input className={inputClass} value={data.email || ""} onChange={(e) => updateField("email", e.target.value)} />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="School Description">
              <textarea className={`${inputClass} min-h-28`} value={data.schoolDescription || ""} onChange={(e) => updateField("schoolDescription", e.target.value)} />
            </Field>
          </div>
        </div>
      );
    }

    if (activeTab === "faculty-management") return renderFacultyEditor();

    if (activeTab === "faculty-requests") return renderFacultyRequestsTab();

    /* Announcements are real database rows shared with the public site, not
       part of this school's content blob. Each item saves on its own; a
       college-level item goes to the university admin for approval first. */
    const announcementKind = {
      events: "events",
      news: "news",
      newsletters: "newsletters",
      notices: "notices",
      "event-gallery": "gallery",
    }[activeTab];

    if (announcementKind) {
      return (
        <AnnouncementManager
          key={announcementKind}
          kind={announcementKind}
          actorRole="school"
          schoolCode={mySchoolCode}
          onMessage={(text) => setMessage(text)}
        />
      );
    }

    if (activeTab === "clubs") {
      return renderCollectionEditor(
        "clubs",
        "Clubs & Societies Management",
        [
          { key: "name", label: "Club Name" },
          { key: "tagline", label: "Tagline" },
          { key: "category", label: "Category (Technical / Cultural / Sports / Social)" },
          { key: "logo", label: "Logo URL" },
          { key: "banner", label: "Banner Image URL" },
          { key: "memberCount", label: "Member Count", type: "number" },
          { key: "facultyAdvisor", label: "Faculty Advisor Name" },
          { key: "facultyAdvisorDept", label: "Faculty Advisor Department" },
          { key: "presidentName", label: "President Name" },
          { key: "presidentDept", label: "President Department/Year" },
          { key: "vicePresidentName", label: "Vice President Name" },
          { key: "vicePresidentDept", label: "Vice President Department/Year" },
          { key: "secretaryName", label: "Secretary Name" },
          { key: "secretaryDept", label: "Secretary Department/Year" },
          { key: "treasurerName", label: "Treasurer Name" },
          { key: "treasurerDept", label: "Treasurer Department/Year" },
          { key: "instagram", label: "Instagram URL" },
          { key: "linkedin", label: "LinkedIn URL" },
          { key: "youtube", label: "YouTube URL" },
          { key: "description", label: "Description", type: "textarea" },
          { key: "objectives", label: "Objectives (comma separated)", type: "textarea" },
          { key: "history", label: "History", type: "textarea" },
          { key: "achievements", label: "Achievements (comma separated)", type: "textarea" },
        ],
        {
          name: "",
          tagline: "",
          category: "Technical",
          logo: "",
          banner: "",
          memberCount: 0,
          facultyAdvisor: "",
          facultyAdvisorDept: "",
          presidentName: "",
          presidentDept: "",
          vicePresidentName: "",
          vicePresidentDept: "",
          secretaryName: "",
          secretaryDept: "",
          treasurerName: "",
          treasurerDept: "",
          instagram: "",
          linkedin: "",
          youtube: "",
          description: "",
          objectives: "",
          history: "",
          achievements: "",
        }
      );
    }

    // if (activeTab === "semester-registrations") return renderSemesterRegistrationsTab(); // hidden until semester registration ships

    return null;
  };

  const renderSemesterRegistrationsTab = () => {
    const totalCount = semRegData.length;
    const uniqueProgrammes = new Set(semRegData.map(d => d.programme).filter(Boolean)).size;
    const uniqueSemesters = new Set(semRegData.map(d => d.semester).filter(Boolean)).size;
    const recentCount = semRegData.filter(d => {
      if (!d.registrationDate) return false;
      const days = (new Date() - new Date(d.registrationDate)) / (1000 * 60 * 60 * 24);
      return days <= 7;
    }).length;

    return (
      <div className={cardClass}>
        {/* Registration Control */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Registration Status</h3>
              <p className="text-sm text-slate-500">Control semester registration for your school</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`text-sm font-semibold ${schoolRegState.active ? 'text-green-600' : 'text-red-600'}`}>
                {schoolRegState.active ? '● Registration Open' : '● Registration Closed'}
              </span>
              <button
                onClick={() => {
                  if (schoolRegState.active) {
                    setRegReasonOpen(true);
                  } else {
                    // Turn ON
                    setSchoolRegistration(mySchoolCode, true);
                    setSchoolRegState({ active: true, reason: '', customMessage: '' });
                    setRegReasonOpen(false);
                  }
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  schoolRegState.active
                    ? 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
                    : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                }`}
              >
                {schoolRegState.active ? 'Close Registration' : 'Open Registration'}
              </button>
            </div>
          </div>
          
          {/* Reason Selector - shows when closing */}
          {regReasonOpen && (
            <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <label className="block text-sm font-medium text-slate-700">Reason for closing</label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
              >
                {REASON_OPTIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              {selectedReason === 'other' && (
                <div>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value.slice(0, 100))}
                    placeholder="Enter custom message..."
                    maxLength={100}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
                  />
                  <p className="text-xs text-slate-400 mt-1">{customMessage.length}/100 characters</p>
                </div>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSchoolRegistration(mySchoolCode, false, selectedReason, customMessage);
                    setSchoolRegState({ active: false, reason: selectedReason, customMessage });
                    setRegReasonOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                >
                  Confirm Close
                </button>
                <button
                  onClick={() => setRegReasonOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center gap-4">
          <h2 className="text-xl font-semibold text-slate-800">Semester Registrations</h2>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-2">
              <span className="text-xs font-semibold uppercase text-sky-600">Total</span>
              <p className="text-lg font-bold text-blue-900">{totalCount}</p>
            </div>
            <div className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2">
              <span className="text-xs font-semibold uppercase text-indigo-600">Programmes</span>
              <p className="text-lg font-bold text-indigo-900">{uniqueProgrammes}</p>
            </div>
            <div className="rounded-xl border border-purple-100 bg-purple-50 px-4 py-2">
              <span className="text-xs font-semibold uppercase text-purple-600">Semesters</span>
              <p className="text-lg font-bold text-purple-900">{uniqueSemesters}</p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-2">
              <span className="text-xs font-semibold uppercase text-emerald-600">Recent (7d)</span>
              <p className="text-lg font-bold text-emerald-900">{recentCount}</p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-500 uppercase tracking-wider">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                className={`${inputClass} pl-10 py-2`}
                placeholder="Search name, roll no, email..."
                value={semRegFilters.search}
                onChange={(e) => setSemRegFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
          </div>
          <div className="w-full md:w-48">
            <label className="mb-1.5 block text-xs font-medium text-slate-500 uppercase tracking-wider">Programme</label>
            <select
              className={`${inputClass} py-2`}
              value={semRegFilters.programme}
              onChange={(e) => setSemRegFilters(prev => ({ ...prev, programme: e.target.value }))}
            >
              <option value="all">All Programmes</option>
              {["B.Tech", "M.Tech", "Ph.D", "B.Sc", "M.Sc", "BA", "MA", "BBA", "MBA", "BA LLB", "LLM"].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-40">
            <label className="mb-1.5 block text-xs font-medium text-slate-500 uppercase tracking-wider">Semester</label>
            <select
              className={`${inputClass} py-2`}
              value={semRegFilters.semester}
              onChange={(e) => setSemRegFilters(prev => ({ ...prev, semester: e.target.value }))}
            >
              <option value="all">All Semesters</option>
              {[1,2,3,4,5,6,7,8,9,10].map(s => (
                <option key={s} value={String(s)}>Semester {s}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setSemRegFilters({ programme: "all", semester: "all", search: "" })}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {semRegError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600 flex items-center gap-3">
            <AlertTriangle size={20} />
            <p>{semRegError}</p>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Roll Number</th>
                <th className="px-4 py-3 font-medium">Programme</th>
                <th className="px-4 py-3 font-medium">Semester</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {semRegLoading ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    <div className="flex justify-center items-center gap-2">
                      <RotateCcw className="animate-spin text-slate-400" size={20} />
                      Loading registrations...
                    </div>
                  </td>
                </tr>
              ) : semRegData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-slate-500">
                    No registrations found matching the filters.
                  </td>
                </tr>
              ) : (
                semRegData.map((reg, idx) => (
                  <React.Fragment key={reg.id || idx}>
                    <tr 
                      className={`hover:bg-slate-50 cursor-pointer transition-colors ${semRegExpanded === reg.id ? 'bg-slate-50' : ''}`}
                      onClick={() => setSemRegExpanded(semRegExpanded === reg.id ? null : reg.id)}
                    >
                      <td className="px-4 py-3 text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{reg.studentName}</td>
                      <td className="px-4 py-3 font-mono">{reg.rollNumber}</td>
                      <td className="px-4 py-3">{reg.programme}</td>
                      <td className="px-4 py-3">{reg.semester}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {reg.registrationDate ? new Date(reg.registrationDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          reg.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          reg.status === 'rejected' ? 'bg-red-100 text-red-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {reg.status || 'pending'}
                        </span>
                      </td>
                    </tr>
                    {semRegExpanded === reg.id && (
                      <tr>
                        <td colSpan="7" className="p-0 border-b-2 border-indigo-100 bg-indigo-50/30">
                          <div className="p-4 sm:p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="space-y-3">
                              <h4 className="font-semibold text-indigo-900 border-b border-indigo-100 pb-2">Student Details</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-slate-500">Email:</span>
                                <span className="font-medium">{reg.email || "-"}</span>
                                <span className="text-slate-500">Mobile:</span>
                                <span className="font-medium">{reg.mobile || "-"}</span>
                                <span className="text-slate-500">Gender:</span>
                                <span className="font-medium">{reg.gender || "-"}</span>
                                <span className="text-slate-500">Category:</span>
                                <span className="font-medium">{reg.category || "-"}</span>
                                <span className="text-slate-500">Aadhar:</span>
                                <span className="font-medium">{reg.aadharNumber || "-"}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <h4 className="font-semibold text-indigo-900 border-b border-indigo-100 pb-2">Academic Details</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <span className="text-slate-500">Specialisation:</span>
                                <span className="font-medium">{reg.specialisation || "-"}</span>
                                <span className="text-slate-500">Year:</span>
                                <span className="font-medium">{reg.year || "-"}</span>
                                <span className="text-slate-500">School:</span>
                                <span className="font-medium">{reg.schoolName || reg.school || "-"}</span>
                              </div>
                            </div>

                            <div className="space-y-3 md:col-span-2 lg:col-span-1">
                              <h4 className="font-semibold text-indigo-900 border-b border-indigo-100 pb-2">Documents</h4>
                              <div className="flex gap-4">
                                {reg.photoUrl && (
                                  <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs text-slate-500 font-medium">Photo</span>
                                    <div className="w-20 h-24 bg-white border border-slate-200 rounded-md overflow-hidden flex items-center justify-center">
                                      <img src={parseDriveLink(reg.photoUrl)} alt="Photo" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                    <a href={reg.photoUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">View Source</a>
                                  </div>
                                )}
                                {reg.signatureUrl && (
                                  <div className="flex flex-col items-center gap-2">
                                    <span className="text-xs text-slate-500 font-medium">Signature</span>
                                    <div className="w-32 h-16 bg-white border border-slate-200 rounded-md overflow-hidden flex items-center justify-center">
                                      <img src={parseDriveLink(reg.signatureUrl)} alt="Signature" className="w-full h-full object-contain p-1" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                    <a href={reg.signatureUrl} target="_blank" rel="noreferrer" className="text-xs text-indigo-600 hover:underline">View Source</a>
                                  </div>
                                )}
                                {!reg.photoUrl && !reg.signatureUrl && (
                                  <span className="text-sm text-slate-400 italic">No documents provided</span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-slate-50 p-2 md:p-4 overflow-hidden">
      <div className="flex h-full w-full flex-col gap-6 lg:flex-row">
        <aside className="h-auto lg:h-full lg:w-72 min-w-[280px] lg:shrink-0">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">School Navigation</h2>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto p-1 -mx-1 -my-1 no-scrollbar">
              {ACTIVE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                      isActive ? "bg-sky-50 text-sky-700 font-semibold shadow-sm ring-1 ring-sky-500/50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                    {tab.label}
                  </button>
                );
              })}

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-2">
                <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Upcoming Tabs</p>
                <div className="space-y-1">
                  {INACTIVE_TABS.map((label) => (
                    <button
                      key={label}
                      type="button"
                      disabled
                      className="flex w-full cursor-not-allowed items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-400"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-3 shrink-0">
              <div className="mt-2 space-y-2">
                <button onClick={saveAll} disabled={isSaving} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:from-sky-400 hover:to-sky-500 hover:shadow-sky-500/30 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0">
                  <Save className="h-4 w-4" /> {isSaving ? "Saving..." : "Save All"}
                </button>
                <button onClick={() => {
                  clearPortalSession();
                  navigate("/login");
                }} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 transition-colors">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 space-y-6 lg:w-[80%] overflow-y-auto custom-scrollbar pb-6 pr-2">
          <section className={cardClass}>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{data.schoolName || "School Dashboard"}</h1>
              <span className="rounded-lg bg-sky-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">{mySchoolCode}</span>
            </div>
            <p className="mt-1 text-sm text-slate-600">Manage your school's content, events, news, notices &amp; more. All changes are saved per-school.</p>
          </section>

          {/* Toast Notification */}
          {toast && (
            <div
              key={toast.key}
              className={`fixed top-4 right-4 z-[9999] flex items-center gap-3 rounded-xl border px-5 py-3.5 shadow-lg backdrop-blur-md animate-toast-in max-w-md ${
                toast.type === "error"
                  ? "border-rose-200 bg-rose-50/95 text-rose-800"
                  : "border-emerald-200 bg-emerald-50/95 text-emerald-800"
              }`}
            >
              {toast.type === "error" ? (
                <AlertTriangle className="h-5 w-5 shrink-0 text-rose-500" />
              ) : (
                <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
              )}
              <p className="text-sm font-medium leading-snug">{toast.text}</p>
              <button
                type="button"
                onClick={() => setToast(null)}
                className="ml-auto shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {summary.map((item) => (
              <div key={item.label} className={cardClass}>
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
              </div>
            ))}
          </section>

          {renderBody()}
        </main>
      </div>
    </div>
  );
};

export default SchoolDashboard;
