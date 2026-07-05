import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  RotateCcw,
  LogOut,
  Shield,
  Users,
  UserPlus,
  School,
  CalendarDays,
  Newspaper,
  Bell,
  Images,
  Pencil,
  Trash2,
  Plus,
  KeyRound,
  Search,
  ListFilter,
  Download,
  Upload,
  Activity,
  AlertTriangle,
  Eye,
  EyeOff,
  FileText,
  BriefcaseBusiness,
  Sparkles,
  Cpu,
} from "lucide-react";
import {
  DEFAULT_SCHOOL_DASHBOARD_DATA,
  SCHOOL_DASHBOARD_STORAGE_KEY,
} from "../../Data/schoolDashboardData";
import {
  SCHOOLS_META,
  getSchoolByApiParam,
  getSchoolByName,
  resolveSchool,
} from "../../Data/schoolsMeta";
import {
  ADMIN_PORTAL_ACCOUNTS_KEY,
  DEFAULT_ADMIN_PORTAL_ACCOUNTS,
} from "../../Data/adminDashboardData";
import {
  DEFAULT_TENDERS,
  TENDERS_STORAGE_KEY,
  getTenderAutoHideDate,
  isTenderActive,
  splitTendersByStatus,
} from "../../Data/tendersData";
import {
  createTender,
  deleteTender,
  listTenders,
  updateTender,
} from "../../services/tendersService";
import {
  createAdminAccount,
  deleteAdminAccount,
  dispatchCredentialEmails,
  listAdminAccountAuditLogs,
  listAdminAccounts,
  updateAdminAccount,
} from "../../services/adminAccountsService";
import {
  createFacultyProfile,
  deleteFacultyProfile,
  listFacultyProfiles,
  updateFacultyProfile,
} from "../../services/facultyService";
import { clearPortalSession } from "../../utils/portalSession";
import { getRecruitmentDashboardData } from "../../services/announcementsService";
import {
  DEFAULT_RECRUITMENT_DASHBOARD_DATA,
  RECRUITMENT_DASHBOARD_STORAGE_KEY,
} from "../../Data/recruitmentData";
import {
  listSchools,
  updateSchool,
} from "../../services/schoolsService";
import {
  listFacultyRegistrationRequests,
  approveFacultyRegistration,
  rejectFacultyRegistration,
} from "../../services/facultyRegistrationService";
import {
  listBookingRequests,
  approveBookingRequest,
  rejectBookingRequest,
  listFacilityInCharges,
  updateFacilityInCharge,
} from "../../services/bookingService";
import { facilities } from "../../components/bookingData/facilities";

const EMPTY_SCHOOL_DATA = {
  schoolName: "",
  schoolCode: "",
  deanName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  address: "",
  bannerImage: "",
  schoolDescription: "",
  events: [],
  news: [],
  notices: [],
  newsletters: [],
  eventGallery: [],
  tabContent: {}
};

const deepClone = (value) => JSON.parse(JSON.stringify(value));
const ensureArray = (value, fallback) => (Array.isArray(value) ? value : fallback);
const ADMIN_ACTIVITY_LOG_KEY = "gbu_admin_activity_log";
const FACULTY_MAIL_QUEUE_KEY = "gbu_faculty_mail_queue";

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

const parseCsvRow = (line) => {
  const result = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }
    current += ch;
  }
  result.push(current.trim());
  return result;
};

const toBool = (value, fallback = false) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "yes" || normalized === "1") return true;
    if (normalized === "false" || normalized === "no" || normalized === "0") return false;
  }
  return fallback;
};

const resolveDepartmentName = (schoolMeta, departmentInput) => {
  const fallback = String(departmentInput || "").trim();
  if (!schoolMeta || !fallback) return fallback;
  const needle = fallback.toLowerCase();
  const match = (schoolMeta.departments || []).find((dept) =>
    [dept.id, dept.shortName, dept.name]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase() === needle),
  );
  return match?.name || fallback;
};

const getApiErrorMessage = (error, fallback) => {
  const baseMessage = error?.response?.data?.message || error?.message || fallback || "Request failed";
  const errors = Array.isArray(error?.response?.data?.errors) ? error.response.data.errors : [];
  const detail = errors
    .map((item) => String(item?.message || "").trim())
    .filter(Boolean)
    .join(" | ");
  return detail ? `${baseMessage} | ${detail}` : baseMessage;
};

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";
const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700";

const tabs = [
  { id: "overview", label: "Overview", icon: Shield },
  { id: "accounts", label: "User & Login Management", icon: KeyRound },
  { id: "faculty", label: "Faculty Management", icon: Users },
  { id: "faculty-requests", label: "Faculty Requests", icon: UserPlus },
  { id: "school", label: "Schools Management", icon: School },
  { id: "nss", label: "NSS Management", icon: Sparkles },
  { id: "ncc", label: "NCC Management", icon: Activity },
  { id: "tenders", label: "Tender Management", icon: FileText },
  { id: "recruitment", label: "Recruitment Management", icon: BriefcaseBusiness },
  { id: "bookings", label: "Booking Management", icon: CalendarDays },
  { id: "dac", label: "DAC Management", icon: Cpu },
];

const schoolContentTabs = [
  { id: "basic", label: "Basic Settings", icon: School },
  { id: "events", label: "Events", icon: CalendarDays },
  { id: "news", label: "News", icon: Newspaper },
  { id: "notices", label: "Notices", icon: Bell },
  { id: "newsletters", label: "Newsletters", icon: Newspaper },
  { id: "gallery", label: "Event Gallery", icon: Images },
];

const Field = ({ label, children }) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
    {children}
  </div>
);

const FilterBar = ({ searchValue, onSearchChange, searchPlaceholder, children, onClear }) => (
  <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-slate-700"
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
        />
      </div>

      <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
        <span className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 py-2 text-xs font-medium text-slate-600">
          <ListFilter className="h-3.5 w-3.5" /> Filters
        </span>
        {children}
        <button
          type="button"
          onClick={onClear}
          className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          Clear
        </button>
      </div>
    </div>
  </div>
);

const getInitialSchoolData = () => {
  try {
    const raw = localStorage.getItem(SCHOOL_DASHBOARD_STORAGE_KEY);
    if (!raw) return deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA);
    const parsed = JSON.parse(raw);
    return {
      ...deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA),
      ...parsed,
      events: ensureArray(parsed.events, deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.events || [])),
      news: ensureArray(parsed.news, deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.news || [])),
      newsletters: ensureArray(
        parsed.newsletters,
        deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.newsletters || []),
      ),
      notices: ensureArray(parsed.notices, deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.notices || [])),
      eventGallery: ensureArray(
        parsed.eventGallery,
        deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.eventGallery || []),
      ),
      tabContent: {
        ...deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA.tabContent),
        ...(parsed.tabContent || {}),
      },
    };
  } catch {
    return deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA);
  }
};

const getInitialAccounts = () => {
  try {
    const raw = localStorage.getItem(ADMIN_PORTAL_ACCOUNTS_KEY);
    if (!raw) return deepClone(DEFAULT_ADMIN_PORTAL_ACCOUNTS);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length
      ? parsed
      : deepClone(DEFAULT_ADMIN_PORTAL_ACCOUNTS);
  } catch {
    return deepClone(DEFAULT_ADMIN_PORTAL_ACCOUNTS);
  }
};

const getInitialTenders = () => {
  try {
    const raw = localStorage.getItem(TENDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getInitialRecruitmentData = () => {
  try {
    const raw = localStorage.getItem(RECRUITMENT_DASHBOARD_STORAGE_KEY);
    if (!raw) return { categories: [], archived: [] };
    const parsed = JSON.parse(raw);
    return {
      categories: Array.isArray(parsed?.categories)
        ? parsed.categories
        : [],
      archived: Array.isArray(parsed?.archived)
        ? parsed.archived
        : [],
    };
  } catch {
    return { categories: [], archived: [] };
  }
};

const getFacultyProfiles = () => {
  return [];
};

const getInitialActivityLog = () => {
  try {
    const raw = localStorage.getItem(ADMIN_ACTIVITY_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const getInitialMailQueue = () => {
  try {
    const raw = localStorage.getItem(FACULTY_MAIL_QUEUE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const generateStrongPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@#$%!&*";
  let password = "";
  for (let i = 0; i < 12; i += 1) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [message, setMessage] = useState("");
  const [activeSchoolSubTab, setActiveSchoolSubTab] = useState("basic");

  const [schoolData, setSchoolData] = useState(getInitialSchoolData);
  const [schoolsList, setSchoolsList] = useState([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState(null);
  const [isSchoolsLoading, setIsSchoolsLoading] = useState(false);
  const [isSchoolSaving, setIsSchoolSaving] = useState(false);
  const [schoolDeletingKey, setSchoolDeletingKey] = useState("");
  const [schoolApiError, setSchoolApiError] = useState("");
  const [schoolEditor, setSchoolEditor] = useState({ isCreating: false });
  const [accounts, setAccounts] = useState(getInitialAccounts);
  const [tenders, setTenders] = useState(getInitialTenders);
  const [recruitmentData, setRecruitmentData] = useState(getInitialRecruitmentData);
  const [facultyProfiles, setFacultyProfiles] = useState(getFacultyProfiles);

  const [accountEditor, setAccountEditor] = useState({ index: null, form: null });
  const [facultyEditor, setFacultyEditor] = useState({ index: null, form: null });
  const [collectionEditors, setCollectionEditors] = useState({});
  const [tenderEditor, setTenderEditor] = useState({ index: null, form: null });
  const [dacMembers, setDacMembers] = useState({ faculty: [], student: [], all: [] });
  const [dacEditor, setDacEditor] = useState({ index: null, form: null });
  const [isDacLoading, setIsDacLoading] = useState(false);
  const [isDacSaving, setIsDacSaving] = useState(false);
  const [dacDeletingKey, setDacDeletingKey] = useState("");
  const [dacApiError, setDacApiError] = useState("");
  const [dacReloadToken, setDacReloadToken] = useState(0);
  const [dacFilters, setDacFilters] = useState({ query: "", teamType: "all" });
  const [recruitmentEditor, setRecruitmentEditor] = useState({ mode: null, index: null, form: null });
  const [accountFilters, setAccountFilters] = useState({ query: "", role: "all", status: "all" });
  const [accountPagination, setAccountPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [accountsReloadToken, setAccountsReloadToken] = useState(0);
  const [facultyFilters, setFacultyFilters] = useState({ query: "", department: "all" });
  const [facultyPagination, setFacultyPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [tenderFilters, setTenderFilters] = useState({ query: "", status: "all" });
  const [tenderPagination, setTenderPagination] = useState({ page: 1, limit: 10 });
  const [recruitmentCurrentPagination, setRecruitmentCurrentPagination] = useState({ page: 1, limit: 10 });
  const [recruitmentArchivedPagination, setRecruitmentArchivedPagination] = useState({ page: 1, limit: 10 });
  const [recruitmentFilter, setRecruitmentFilter] = useState("");
  const [collectionFilters, setCollectionFilters] = useState({});
  const [collectionPagination, setCollectionPagination] = useState({});
  const [isFacultyLoading, setIsFacultyLoading] = useState(false);
  const [isFacultySaving, setIsFacultySaving] = useState(false);
  const [facultyDeletingKey, setFacultyDeletingKey] = useState("");
  const [facultyApiError, setFacultyApiError] = useState("");
  const [facultyReloadToken, setFacultyReloadToken] = useState(0);
  const [isAccountsLoading, setIsAccountsLoading] = useState(false);
  const [isAccountSaving, setIsAccountSaving] = useState(false);
  const [accountDeletingKey, setAccountDeletingKey] = useState("");
  const [accountApiError, setAccountApiError] = useState("");
  const [auditFilters, setAuditFilters] = useState({ query: "", action: "all" });
  const [auditLogs, setAuditLogs] = useState([]);
  const [auditPagination, setAuditPagination] = useState({ page: 1, limit: 8, total: 0, totalPages: 1 });
  const [auditReloadToken, setAuditReloadToken] = useState(0);
  const [isAuditLoading, setIsAuditLoading] = useState(false);
  const [auditApiError, setAuditApiError] = useState("");
  const [isTenderLoading, setIsTenderLoading] = useState(false);
  const [isTenderSaving, setIsTenderSaving] = useState(false);
  const [tenderDeletingKey, setTenderDeletingKey] = useState("");
  const [tenderApiError, setTenderApiError] = useState("");
  const [isRecruitmentLoading, setIsRecruitmentLoading] = useState(false);
  const [recruitmentApiError, setRecruitmentApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activityLog, setActivityLog] = useState(getInitialActivityLog);
  const [mailQueue, setMailQueue] = useState(getInitialMailQueue);
  const [isDispatchingMailQueue, setIsDispatchingMailQueue] = useState(false);
  const backupInputRef = useRef(null);
  const bulkFacultyInputRef = useRef(null);

  /* ── Faculty Registration Requests state ── */
  const [regRequests, setRegRequests] = useState([]);
  const [regRequestsLoading, setRegRequestsLoading] = useState(false);
  const [regRequestsError, setRegRequestsError] = useState("");
  const [regStatusFilter, setRegStatusFilter] = useState("pending");
  const [regSearchQuery, setRegSearchQuery] = useState("");
  const [regReloadToken, setRegReloadToken] = useState(0);
  const [regActionLoading, setRegActionLoading] = useState("");

  const tenderSplit = useMemo(() => splitTendersByStatus(tenders), [tenders]);
  const recruitmentPostCount = useMemo(
    () =>
      (recruitmentData.categories || []).reduce(
        (count, category) => count + (Array.isArray(category.tabs) ? category.tabs.length : 0),
        0,
      ),
    [recruitmentData],
  );

  const pendingMailQueueCount = useMemo(
    () => mailQueue.filter((item) => String(item?.status || "") === "pending-backend").length,
    [mailQueue],
  );

  const summary = useMemo(
    () => [
      { label: "Total Accounts", value: accountPagination.total },
      { label: "Faculty Profiles", value: facultyProfiles.length },
      { label: "School Events", value: schoolData.events?.length || 0 },
      { label: "Active Tenders", value: tenderSplit.current.length },
      { label: "Recruitment Posts", value: recruitmentPostCount },
    ],
    [
      accountPagination.total,
      facultyProfiles,
      schoolData,
      tenderSplit.current.length,
      recruitmentPostCount,
    ],
  );

  const saveAll = () => {
    localStorage.setItem(SCHOOL_DASHBOARD_STORAGE_KEY, JSON.stringify(schoolData));
    localStorage.setItem(ADMIN_PORTAL_ACCOUNTS_KEY, JSON.stringify(accounts));
    localStorage.setItem(TENDERS_STORAGE_KEY, JSON.stringify(tenders));
    localStorage.setItem(RECRUITMENT_DASHBOARD_STORAGE_KEY, JSON.stringify(recruitmentData));
    setActivityLog((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "Saved all dashboard data",
        time: new Date().toISOString(),
      },
      ...prev,
    ].slice(0, 12));
    setMessage("Admin dashboard saved. School + Faculty + User login system updated.");
    window.dispatchEvent(new Event("tenders-data-updated"));
    window.dispatchEvent(new Event("recruitment-data-updated"));
  };

  const resetAll = () => {
    setSchoolData(deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA));
    setAccounts(deepClone(DEFAULT_ADMIN_PORTAL_ACCOUNTS));
    setTenders([]);
    setRecruitmentData({ categories: [], archived: [] });
    setFacultyProfiles([]);
    localStorage.removeItem(SCHOOL_DASHBOARD_STORAGE_KEY);
    localStorage.removeItem(ADMIN_PORTAL_ACCOUNTS_KEY);
    localStorage.removeItem(TENDERS_STORAGE_KEY);
    localStorage.removeItem(RECRUITMENT_DASHBOARD_STORAGE_KEY);
    setActivityLog((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "Reset dashboard to defaults",
        time: new Date().toISOString(),
      },
      ...prev,
    ].slice(0, 12));
    setMessage("Admin dashboard reset to default data.");
  };

  useEffect(() => {
    localStorage.setItem(ADMIN_ACTIVITY_LOG_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem(FACULTY_MAIL_QUEUE_KEY, JSON.stringify(mailQueue));
  }, [mailQueue]);

  useEffect(() => {
    localStorage.setItem(TENDERS_STORAGE_KEY, JSON.stringify(tenders));
    window.dispatchEvent(new Event("tenders-data-updated"));
  }, [tenders]);

  useEffect(() => {
    localStorage.setItem(RECRUITMENT_DASHBOARD_STORAGE_KEY, JSON.stringify(recruitmentData));
    window.dispatchEvent(new Event("recruitment-data-updated"));
  }, [recruitmentData]);

  useEffect(() => {
    let isMounted = true;

    const syncAccountsFromServer = async () => {
      setIsAccountsLoading(true);
      setAccountApiError("");
      try {
        const response = await listAdminAccounts({
          query: accountFilters.query,
          role: accountFilters.role,
          status: accountFilters.status,
          page: accountPagination.page,
          limit: accountPagination.limit,
        });
        if (!isMounted) return;
        setAccounts(Array.isArray(response?.items) ? response.items : []);
        setAccountPagination((prev) => ({
          ...prev,
          page: response?.pagination?.page || prev.page,
          limit: response?.pagination?.limit || prev.limit,
          total: response?.pagination?.total || 0,
          totalPages: response?.pagination?.totalPages || 1,
        }));
      } catch (error) {
        if (!isMounted) return;
        setAccountApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch user accounts from backend.",
        );
      } finally {
        if (isMounted) setIsAccountsLoading(false);
      }
    };

    syncAccountsFromServer();

    return () => {
      isMounted = false;
    };
  }, [
    accountFilters.query,
    accountFilters.role,
    accountFilters.status,
    accountPagination.page,
    accountPagination.limit,
    accountsReloadToken,
  ]);

  useEffect(() => {
    let isMounted = true;

    const syncFacultyFromServer = async () => {
      setIsFacultyLoading(true);
      setFacultyApiError("");
      try {
        const response = await listFacultyProfiles({
          query: facultyFilters.query,
          department: facultyFilters.department === "all" ? "" : facultyFilters.department,
          page: facultyPagination.page,
          limit: facultyPagination.limit,
        });
        if (!isMounted) return;
        setFacultyProfiles(Array.isArray(response?.items) ? response.items : []);
        if (response?.pagination) {
          setFacultyPagination((prev) => ({
            ...prev,
            total: response.pagination.total || 0,
            totalPages: response.pagination.totalPages || 1,
          }));
        }
      } catch (error) {
        if (!isMounted) return;
        setFacultyApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch faculty profiles from backend.",
        );
      } finally {
        if (isMounted) setIsFacultyLoading(false);
      }
    };

    syncFacultyFromServer();

    return () => {
      isMounted = false;
    };
  }, [
    facultyFilters.query,
    facultyFilters.department,
    facultyPagination.page,
    facultyPagination.limit,
    facultyReloadToken,
  ]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    let isMounted = true;

    const syncAccountAuditLogs = async () => {
      setIsAuditLoading(true);
      setAuditApiError("");
      try {
        const response = await listAdminAccountAuditLogs({
          query: auditFilters.query,
          action: auditFilters.action,
          page: auditPagination.page,
          limit: auditPagination.limit,
        });
        if (!isMounted) return;
        setAuditLogs(Array.isArray(response?.items) ? response.items : []);
        setAuditPagination((prev) => ({
          ...prev,
          page: response?.pagination?.page || prev.page,
          limit: response?.pagination?.limit || prev.limit,
          total: response?.pagination?.total || 0,
          totalPages: response?.pagination?.totalPages || 1,
        }));
      } catch (error) {
        if (!isMounted) return;
        setAuditApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch account audit logs from backend.",
        );
      } finally {
        if (isMounted) setIsAuditLoading(false);
      }
    };

    syncAccountAuditLogs();

    return () => {
      isMounted = false;
    };
  }, [
    auditFilters.query,
    auditFilters.action,
    auditPagination.page,
    auditPagination.limit,
    auditReloadToken,
  ]);

  useEffect(() => {
    let isMounted = true;

    const syncTendersFromServer = async () => {
      setIsTenderLoading(true);
      setTenderApiError("");
      try {
        const serverTenders = await listTenders();
        if (!isMounted) return;
        setTenders(serverTenders);
      } catch (error) {
        if (!isMounted) return;
        setTenderApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch tenders from backend.",
        );
      } finally {
        if (isMounted) setIsTenderLoading(false);
      }
    };

    const syncRecruitmentsFromServer = async () => {
      setIsRecruitmentLoading(true);
      setRecruitmentApiError("");
      try {
        const serverRecruitments = await getRecruitmentDashboardData();
        if (!isMounted) return;
        setRecruitmentData(serverRecruitments);
      } catch (error) {
        if (!isMounted) return;
        setRecruitmentApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch recruitments from backend.",
        );
      } finally {
        if (isMounted) setIsRecruitmentLoading(false);
      }
    };

    const syncSchoolsFromServer = async () => {
      setIsSchoolsLoading(true);
      setSchoolApiError("");
      try {
        const serverSchools = await listSchools();
        if (!isMounted) return;
        setSchoolsList(serverSchools);
      } catch (error) {
        if (!isMounted) return;
        setSchoolApiError(
          error?.response?.data?.message ||
            error?.message ||
            "Unable to fetch schools from backend.",
        );
      } finally {
        if (isMounted) setIsSchoolsLoading(false);
      }
    };

    syncTendersFromServer();
    syncRecruitmentsFromServer();
    syncSchoolsFromServer();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ── Fetch DAC team members ── */
  useEffect(() => {
    let isMounted = true;
    const fetchDacTeam = async () => {
      setIsDacLoading(true);
      setDacApiError("");
      try {
        const data = await listDacMembers();
        if (!isMounted) return;
        setDacMembers(data);
      } catch (error) {
        if (!isMounted) return;
        setDacApiError(getApiErrorMessage(error, "Failed to load DAC team members."));
      } finally {
        if (isMounted) setIsDacLoading(false);
      }
    };
    fetchDacTeam();
    return () => {
      isMounted = false;
    };
  }, [dacReloadToken]);

  /* ── Fetch faculty registration requests ── */
  useEffect(() => {
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

  /* ── Fetch booking requests for admin ── */
  useEffect(() => {
    if (activeTab !== "bookings") return;

    let isMounted = true;
    const fetchRequests = async () => {
      setIsBookingsLoading(true);
      try {
        const data = await listBookingRequests({
          status: bookingFilters.status,
          facilityId: bookingFilters.facilityId,
          search: bookingFilters.search,
          page: bookingPage,
          limit: 10,
        });
        if (!isMounted) return;
        if (data) {
          setBookingRequests(data.requests || []);
          setBookingPagination(data.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 });
        }
      } catch (err) {
        console.error("Failed to fetch booking requests:", err);
      } finally {
        if (isMounted) setIsBookingsLoading(false);
      }
    };

    fetchRequests();
    return () => { isMounted = false; };
  }, [activeTab, bookingFilters.status, bookingFilters.facilityId, bookingFilters.search, bookingPage, bookingReloadToken]);

  /* ── Fetch facility in-charges for admin ── */
  useEffect(() => {
    if (activeTab !== "bookings" || bookingSubSection !== "in-charges") return;

    let isMounted = true;
    const fetchInChargesList = async () => {
      try {
        const data = await listFacilityInCharges();
        if (!isMounted) return;
        if (data) setInCharges(data);
      } catch (err) {
        console.error("Failed to fetch in-charges:", err);
      }
    };

    fetchInChargesList();
    return () => { isMounted = false; };
  }, [activeTab, bookingSubSection, bookingReloadToken]);

  const buildUniqueUsername = (seed, existingAccounts) => {
    const sanitized = String(seed || "faculty.user")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "") || "faculty.user";
    let candidate = sanitized;
    let suffix = 1;
    const existing = new Set(existingAccounts.map((item) => String(item.username || "").toLowerCase()));
    while (existing.has(candidate)) {
      candidate = `${sanitized}${suffix}`;
      suffix += 1;
    }
    return candidate;
  };

  const createFacultyAccount = (faculty, existingAccounts, passwordOverride) => {
    const usernameSeed = faculty.email ? faculty.email.split("@")[0] : faculty.id || faculty.name;
    const username = buildUniqueUsername(usernameSeed, existingAccounts);
    const password = passwordOverride || generateStrongPassword();
    return {
      id: `acc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: faculty.name || username,
      username,
      password,
      role: "teacher",
      status: "active",
      linkedFacultyId: faculty.id || "",
      linkedSchool: faculty.school || schoolData.schoolCode || "",
      linkedDepartment: faculty.department || "",
    };
  };

  const downloadFacultyTemplate = () => {
    const header = [
      "name",
      "designation",
      "department",
      "school",
      "email",
      "phone",
      "createLoginAccount",
      "sendCredentialsEmail",
    ];
    const example = [
      "Dr. New Faculty",
      "Assistant Professor",
      "Computer Science",
      getSchoolByName(schoolData.schoolName)?.code || "SOICT",
      "faculty@gbu.ac.in",
      "+91-9876543210",
      "true",
      "true",
    ];
    const csv = `${header.join(",")}\n${example.join(",")}\n`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faculty_bulk_upload_template.csv";
    link.click();
    URL.revokeObjectURL(url);
    setMessage("Faculty bulk upload template downloaded.");
  };

  const handleBulkFacultyUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      if (lines.length < 2) {
        setMessage("CSV is empty. Please use the template and add at least one row.");
        return;
      }

      const headers = parseCsvRow(lines[0]).map((item) => item.trim());
      const requiredHeaders = ["name", "designation", "department", "school", "email", "phone"];
      const missing = requiredHeaders.filter((header) => !headers.includes(header));
      if (missing.length) {
        setMessage(`Missing required CSV columns: ${missing.join(", ")}`);
        return;
      }

      const uploadedFaculty = [];
      const queuedEmails = [];
      const failedFacultyRows = [];
      const failedAccountRows = [];
      let createdAccountCount = 0;

      for (let i = 1; i < lines.length; i += 1) {
        const values = parseCsvRow(lines[i]);
        const row = Object.fromEntries(headers.map((header, idx) => [header, values[idx] || ""]));
        if (!row.name) continue;

        const facultyDraft = {
          name: row.name,
          designation: row.designation,
          department: row.department,
          school: row.school || schoolData.schoolCode || schoolData.schoolName || "",
          email: row.email,
          phone: row.phone,
        };

        let faculty;
        try {
          faculty = await createFacultyProfile(facultyDraft);
          uploadedFaculty.push(faculty);
        } catch (error) {
          failedFacultyRows.push({
            row: i + 1,
            faculty: facultyDraft.name,
            reason:
              error?.response?.data?.message || error?.message || "Faculty save failed",
          });
          continue;
        }

        const shouldCreateLogin = toBool(row.createLoginAccount, true);
        const shouldSendEmail = toBool(row.sendCredentialsEmail, true);

        if (shouldCreateLogin) {
          const generatedPassword = generateStrongPassword();
          const accountDraft = createFacultyAccount(faculty, accounts, generatedPassword);
          try {
            const createdAccount = await createAdminAccount(accountDraft);
            createdAccountCount += 1;

            if (shouldSendEmail && faculty.email) {
              queuedEmails.push({
                id: `mail-${Date.now()}-${i}`,
                to: faculty.email,
                subject: "GBU Faculty Portal Credentials",
                status: "pending-backend",
                payload: {
                  facultyName: faculty.name,
                  username: createdAccount.username,
                  password: generatedPassword,
                  linkedFacultyId: createdAccount.linkedFacultyId,
                },
                createdAt: new Date().toISOString(),
              });
            }
          } catch (error) {
            failedAccountRows.push({
              row: i + 1,
              faculty: faculty.name,
              reason:
                error?.response?.data?.message || error?.message || "Account creation failed",
            });
          }
        }
      }

      if (!uploadedFaculty.length) {
        if (failedFacultyRows.length) {
          const sample = failedFacultyRows
            .slice(0, 2)
            .map((item) => `Row ${item.row} (${item.faculty}): ${item.reason}`)
            .join(" | ");
          setMessage(`Bulk upload failed for all rows. ${sample}`);
        } else {
          setMessage("No valid rows found in CSV.");
        }
        return;
      }

      setFacultyReloadToken((prev) => prev + 1);
      if (queuedEmails.length) {
        setMailQueue((prev) => [...queuedEmails, ...prev].slice(0, 100));
      }

      setAccountPagination((prev) => ({ ...prev, page: 1 }));
      setAccountsReloadToken((prev) => prev + 1);
      setAuditPagination((prev) => ({ ...prev, page: 1 }));
      setAuditReloadToken((prev) => prev + 1);

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Bulk uploaded ${uploadedFaculty.length} faculty profiles and created ${createdAccountCount} accounts`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));

      if (failedAccountRows.length) {
        const sample = failedAccountRows
          .slice(0, 2)
          .map((item) => `Row ${item.row} (${item.faculty}): ${item.reason}`)
          .join(" | ");
        setMessage(
          `Bulk upload completed with partial failures: ${uploadedFaculty.length} faculty added, ${createdAccountCount} accounts created, ${failedFacultyRows.length} faculty rows failed, ${failedAccountRows.length} account rows failed. ${sample}`,
        );
      } else {
        const facultyFailureInfo = failedFacultyRows.length
          ? ` ${failedFacultyRows.length} faculty rows failed.`
          : "";
        setMessage(
          `Bulk upload completed: ${uploadedFaculty.length} faculty added, ${createdAccountCount} accounts created, ${queuedEmails.length} credential emails queued.${facultyFailureInfo}`,
        );
      }
    } catch {
      setMessage("Bulk upload failed. Please upload a valid CSV template file.");
    } finally {
      event.target.value = "";
    }
  };

  const exportBackup = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      schoolData,
      accounts,
      tenders,
      recruitmentData,
      facultyProfiles,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gbu-admin-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setActivityLog((prev) => [
      {
        id: `log-${Date.now()}`,
        action: "Exported admin backup",
        time: new Date().toISOString(),
      },
      ...prev,
    ].slice(0, 12));
    setMessage("Backup exported successfully.");
  };

  const importBackup = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!parsed || typeof parsed !== "object") throw new Error("Invalid file format");

      const importedSchoolData = parsed.schoolData
        ? { ...deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA), ...parsed.schoolData }
        : deepClone(DEFAULT_SCHOOL_DASHBOARD_DATA);
      const importedAccounts = Array.isArray(parsed.accounts)
        ? parsed.accounts
        : deepClone(DEFAULT_ADMIN_PORTAL_ACCOUNTS);
      const importedTenders = Array.isArray(parsed.tenders) ? parsed.tenders : deepClone(DEFAULT_TENDERS);
      const importedRecruitmentData = parsed.recruitmentData
        ? {
            categories: Array.isArray(parsed.recruitmentData.categories)
              ? parsed.recruitmentData.categories
              : deepClone(DEFAULT_RECRUITMENT_DASHBOARD_DATA.categories),
            archived: Array.isArray(parsed.recruitmentData.archived)
              ? parsed.recruitmentData.archived
              : deepClone(DEFAULT_RECRUITMENT_DASHBOARD_DATA.archived),
          }
        : deepClone(DEFAULT_RECRUITMENT_DASHBOARD_DATA);
      const importedFaculty = Array.isArray(parsed.facultyProfiles)
        ? parsed.facultyProfiles
        : [deepClone(DUMMY_FACULTY_DETAIL)];

      setSchoolData(importedSchoolData);
      setAccounts(importedAccounts);
      setTenders(importedTenders);
      setRecruitmentData(importedRecruitmentData);
      setFacultyProfiles(importedFaculty);
      localStorage.setItem(SCHOOL_DASHBOARD_STORAGE_KEY, JSON.stringify(importedSchoolData));
      localStorage.setItem(ADMIN_PORTAL_ACCOUNTS_KEY, JSON.stringify(importedAccounts));
      localStorage.setItem(TENDERS_STORAGE_KEY, JSON.stringify(importedTenders));
      localStorage.setItem(RECRUITMENT_DASHBOARD_STORAGE_KEY, JSON.stringify(importedRecruitmentData));
      importedFaculty.forEach((faculty) => {
        if (faculty?.id) {
          localStorage.setItem(`${FACULTY_PROFILE_STORAGE_PREFIX}${faculty.id}`, JSON.stringify(faculty));
        }
      });

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: "Imported admin backup",
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));
      setMessage("Backup imported and applied successfully.");
      window.dispatchEvent(new Event("tenders-data-updated"));
      window.dispatchEvent(new Event("recruitment-data-updated"));
    } catch {
      setMessage("Backup import failed. Please select a valid JSON backup file.");
    } finally {
      event.target.value = "";
    }
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

  const saveCollectionForm = (listKey) => {
    const editor = collectionEditors[listKey];
    if (!editor?.form) return;

    let nextForm = { ...editor.form };
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

    setSchoolData((prev) => {
      const next = [...(prev[listKey] || [])];
      if (editor.index === null || editor.index === undefined) next.push(nextForm);
      else next[editor.index] = nextForm;
      return { ...prev, [listKey]: next };
    });
    setCollectionEditors((prev) => ({ ...prev, [listKey]: { index: null, form: null } }));
  };

  const deleteCollectionItem = (listKey, index) => {
    setSchoolData((prev) => ({
      ...prev,
      [listKey]: (prev[listKey] || []).filter((_, i) => i !== index),
    }));
  };

  const openSchool = (school) => {
    setSelectedSchoolId(school.id);
    const content = school.content || {};
    setSchoolData({
        schoolCode: school.code || "",
        schoolName: school.name || "",
        deanName: content.deanName || "",
        email: content.email || "",
        phone: content.phone || "",
        websiteUrl: content.websiteUrl || "",
        bannerImage: content.bannerImage || "",
        address: content.address || "",
        schoolDescription: school.overview || "",
        events: content.events || [],
        news: content.news || [],
        notices: content.notices || [],
        newsletters: content.newsletters || [],
        eventGallery: content.eventGallery || [],
        clubs: content.clubs || [],
        tabContent: content.tabContent || {}
    });
    setSchoolEditor({ isCreating: false });
    setActiveSchoolSubTab("basic");
  };

  const openNss = (school) => {
    setSelectedSchoolId(school.id);
    const content = school.content || {};
    setSchoolData({
        schoolCode: school.code || "NSS",
        schoolName: school.name || "National Service Scheme (NSS)",
        schoolDescription: school.overview || "",
        email: content.email || "",
        phone: content.phone || "",
        websiteUrl: content.websiteUrl || "",
        bannerImage: content.bannerImage || "",
        address: content.address || "",
        events: content.events || [],
        news: content.news || [],
        notices: content.notices || [],
        newsletters: content.newsletters || [],
        eventGallery: content.eventGallery || [],
        clubs: content.clubs || [],
        tabContent: content.tabContent || {},
        coordinator: content.coordinator || {
          name: "Dr. Gaurav Kumar",
          designation: "NSS Coordinator & Senior Programme Officer",
          department: "Assistant Professor, School of ICT",
          tenure: "2025 - Present",
          email: "gaurav.kumar@gbu.ac.in",
          linkedin: "https://www.linkedin.com/in/gauravjnu/",
          twitter: "https://x.com/gauravkjnu",
          image: "https://nss.onlinegbu.com/images/GauravKumar.png",
        },
        coreCouncil: content.coreCouncil || [
          {
            name: "Akanksha Pandey",
            role: "Vice President",
            image: "https://res.cloudinary.com/dzbkwsdfy/image/upload/v1755153073/uploads/general/1755153072503-84fb0ce1b8cd-a12.webp.webp",
            email: "245dcs025@gbu.ac.in",
            achievements: "NSS Core Team Lead, Community Service Lead",
          },
          {
            name: "Ashwani Kushwaha",
            role: "Vice President & Tech Head",
            image: "https://res.cloudinary.com/dzbkwsdfy/image/upload/v1764310861/uploads/general/1764310859023-ea2b935030a4-20251124_153222.jpg.jpg",
            email: "235ucs039@gbu.ac.in",
            achievements: "NSS Portal Developer, Digital Outreach Lead",
          },
        ],
        units: content.units || [
          {
            unitNumber: 1,
            programOfficer: { name: "Dr. Gaurav Kumar", department: "School of ICT", image: "https://nss.onlinegbu.com/images/GauravKumar.png" },
            facultyMentor: { name: "Dr. Nishta Pareek", department: "School of Humanities", image: "" },
            convenors: "Anjali Yadav, Jaysuvankar Pradhan",
            coConvenors: "Anushka Shakya, Ashish"
          },
          {
            unitNumber: 2,
            programOfficer: { name: "Dr. Bhaswati Banerjee", department: "School of Vocational Studies", image: "" },
            facultyMentor: { name: "Dr. Lalita Mehra", department: "School of Biotechnology", image: "https://faculty.gbu.ac.in/uploads/photos/67c162743188f_2.jpg" },
            convenors: "Bhakti Gupta, Roshan Baburao Ingle",
            coConvenors: "Disha Dalmiya, Harshita Rao"
          },
          {
            unitNumber: 3,
            programOfficer: { name: "Dr. Rahul Kapoor", department: "School of Law", image: "https://faculty.gbu.ac.in/uploads/photos/660f98bf501e0_Screenshot_20240405_115043_Facebook.jpg" },
            facultyMentor: { name: "Dr. Aparna Verma", department: "School of Humanities", image: "" },
            convenors: "Nitish Kumar Pradhan, Prerna",
            coConvenors: "Saumya Singh, Rabi Narayan Patra"
          },
          {
            unitNumber: 4,
            programOfficer: { name: "Dr. Rakesh Kumar", department: "School of ICT", image: "" },
            facultyMentor: { name: "Ms Srijana Jaiswal", department: "School of Engineering", image: "" },
            convenors: "Aryan Kumar Rathore, Prince Kumar Singh",
            coConvenors: "Pari Tyagi, Deepak Kumar"
          },
          {
            unitNumber: 5,
            programOfficer: { name: "Dr. Shrutee Kanwar", department: "School of Management", image: "https://faculty.gbu.ac.in/uploads/photos/675823651da3b_IMG-20241127-WA0005.jpg" },
            facultyMentor: { name: "Dr. Anuj Singh", department: "School of Vocational Studies", image: "" },
            convenors: "Prabhanshi Gupta, Sameeksha Sharma",
            coConvenors: "Abhay Singh, Priyanshi Nautiyal"
          },
          {
            unitNumber: 6,
            programOfficer: { name: "Dr. Indrajeet Singh", department: "School of Engineering", image: "https://faculty.gbu.ac.in/uploads/photos/67c53dfff3fa3_DSC_4677%20(1).jpg" },
            facultyMentor: { name: "Dr. Shobha Devi", department: "School of Buddhist Studies", image: "" },
            convenors: "Vanshika Pal, Priyanshi",
            coConvenors: "Naitik, Abhishek Singh"
          }
        ],
        socialMedia: content.socialMedia || {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          linkedin: ""
        }
    });
    setSchoolEditor({ isCreating: false });
    setActiveNssSubTab("basic");
  };

  const openNcc = (school) => {
    setSelectedSchoolId(school.id);
    const content = school.content || {};
    setSchoolData({
        schoolCode: school.code || "NCC",
        schoolName: school.name || "National Cadet Corps (NCC)",
        schoolDescription: school.overview || "",
        email: content.email || "",
        phone: content.phone || "",
        websiteUrl: content.websiteUrl || "",
        bannerImage: content.bannerImage || "",
        address: content.address || "",
        events: content.events || [],
        news: content.news || [],
        notices: content.notices || [],
        newsletters: content.newsletters || [],
        eventGallery: content.eventGallery || [],
        clubs: content.clubs || [],
        tabContent: content.tabContent || {},
        anoDetails: content.anoDetails || {
          name: 'Lt. Col. Rajesh Kumar',
          designation: 'Associate NCC Officer (ANO)',
          email: 'rajesh.kumar@university.edu',
          phone: '+91-9876543210',
          image: '/placeholder.svg',
          serviceRecord: '15 years in Indian Army',
          qualifications: 'B.Tech, M.Tech, Military Leadership Course',
          awards: 'Vishisht Seva Medal, Commendation Card'
        },
        cadetLeaders: content.cadetLeaders || [
          {
            name: 'Cadet Under Officer Vikram Singh',
            rank: 'CUO',
            year: 'Final Year',
            program: 'B.Tech Mechanical',
            email: 'vikram.singh@student.edu',
            image: '/placeholder.svg',
            achievements: 'Best Cadet 2023, RDC Participant, NCC B Certificate'
          },
          {
            name: 'Cadet Sergeant Major Anita Sharma',
            rank: 'CSM',
            year: 'Third Year',
            program: 'B.Sc Physics',
            email: 'anita.sharma@student.edu',
            image: '/placeholder.svg',
            achievements: 'Drill Competition Winner, CATC Participant, NCC A Certificate'
          },
          {
            name: 'Cadet Sergeant Rohit Patel',
            rank: 'SGT',
            year: 'Second Year',
            program: 'B.Com',
            email: 'rohit.patel@student.edu',
            image: '/placeholder.svg',
            achievements: 'Shooting Competition Winner, Adventure Camp Participant'
          }
        ],
        platoons: content.platoons || [
          { name: 'Alpha Platoon', cadets: 35, commander: 'CUO Vikram Singh', focus: 'Drill & Discipline' },
          { name: 'Bravo Platoon', cadets: 32, commander: 'CSM Anita Sharma', focus: 'Adventure Activities' },
          { name: 'Charlie Platoon', cadets: 30, commander: 'SGT Rohit Patel', focus: 'Social Service' },
          { name: 'Delta Platoon', cadets: 28, commander: 'SGT Priya Gupta', focus: 'Cultural Activities' }
        ],
        socialMedia: content.socialMedia || {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          linkedin: ""
        }
    });
    setSchoolEditor({ isCreating: false });
    setActiveNccSubTab("basic");
  };

  const selectMainTab = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "nss") {
      const nss = schoolsList.find((s) => s.code === "NSS");
      if (nss) openNss(nss);
    } else if (tabId === "ncc") {
      const ncc = schoolsList.find((s) => s.code === "NCC");
      if (ncc) openNcc(ncc);
    } else if (tabId === "school") {
      setSelectedSchoolId(null);
      setSchoolEditor({ isCreating: false });
      setSchoolData(deepClone(EMPTY_SCHOOL_DATA));
    }
  };

  const handleSaveSchool = async () => {
    const payload = {
        name: schoolData.schoolName || schoolData.name || "",
        overview: schoolData.schoolDescription || schoolData.overview || "",
        content: {
            deanName: schoolData.deanName || "",
            email: schoolData.email || "",
            phone: schoolData.phone || "",
            websiteUrl: schoolData.websiteUrl || "",
            bannerImage: schoolData.bannerImage || "",
            address: schoolData.address || "",
            events: schoolData.events || [],
            news: schoolData.news || [],
            notices: schoolData.notices || [],
            newsletters: schoolData.newsletters || [],
            eventGallery: schoolData.eventGallery || [],
            tabContent: schoolData.tabContent || {},
        },
        is_active: true
    };
    
    if (!payload.name) {
      setMessage("School Name is required.");
      return;
    }

    setIsSchoolSaving(true);
    setSchoolApiError("");
    try {
        if (selectedSchoolId) {
            const updated = await updateSchool(selectedSchoolId, payload);
            setSchoolsList(prev => prev.map(s => s.id === selectedSchoolId ? updated : s));
            setMessage("School updated successfully!");
        } else {
            setMessage("Schools are pre-seeded. Select a school to update.");
        }
    } catch (error) {
        setSchoolApiError(error?.response?.data?.message || error?.message || "Failed to save school");
        setMessage("Failed to save school");
    } finally {
        setIsSchoolSaving(false);
    }
  };



  const handleDeleteAccount = async (account) => {
    const accountId = Number(account?.id);
    if (!Number.isInteger(accountId) || accountId <= 0) {
      setMessage("Only backend synced accounts can be deleted.");
      return;
    }

    setAccountApiError("");
    setAccountDeletingKey(String(accountId));

    try {
      await deleteAdminAccount(accountId);
      const shouldMoveToPreviousPage = accounts.length === 1 && accountPagination.page > 1;
      if (shouldMoveToPreviousPage) {
        setAccountPagination((prev) => ({ ...prev, page: prev.page - 1 }));
      }
      setAccountsReloadToken((prev) => prev + 1);
      setAuditReloadToken((prev) => prev + 1);
      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Deleted login account: ${account.username || account.name || accountId}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));
      setMessage("Login account deleted from backend.");
    } catch (error) {
      setAccountApiError(
        error?.response?.data?.message || error?.message || "Failed to delete account from backend.",
      );
      setMessage("Account delete failed. Please retry.");
    } finally {
      setAccountDeletingKey("");
    }
  };

  const handleSaveAccount = async () => {
    const form = accountEditor.form;
    if (!form?.username || !form?.role) {
      setMessage("Username and role are required.");
      return;
    }

    if (accountEditor.index === null && !form?.password) {
      setMessage("Password is required for new account creation.");
      return;
    }

    const duplicate = accounts.some(
      (item, idx) =>
        idx !== accountEditor.index &&
        String(item.username || "").toLowerCase() === String(form.username || "").toLowerCase(),
    );

    if (duplicate) {
      setMessage("This username already exists. Please use a unique username.");
      return;
    }

    const normalizedRole = String(form.role || "").toLowerCase();
    const normalizedSchool = String(form.linkedSchool || "").trim().toLowerCase();
    const normalizedFacultyId = String(form.linkedFacultyId || "").trim().toLowerCase();
    const normalizedDepartment = String(form.linkedDepartment || "").trim();

    if (normalizedRole === "school" && !normalizedSchool) {
      setMessage("School account ke liye Linked School required hai.");
      return;
    }

    if (normalizedRole === "school") {
      const duplicateSchool = accounts.some((item, idx) => {
        if (idx === accountEditor.index) return false;
        if (String(item.role || "").toLowerCase() !== "school") return false;
        return String(item.linkedSchool || "").trim().toLowerCase() === normalizedSchool;
      });

      if (duplicateSchool) {
        setMessage("Is school ka account pehle se bana hua hai. Ek school ka sirf ek login allow hai.");
        return;
      }
    }

    if (normalizedRole === "teacher") {
  if (!normalizedFacultyId) {
    setMessage("Linked Faculty ID is required for a faculty account.");
    return;
  }

  if (!normalizedSchool) {
    setMessage("Linked School is required for a faculty account.");
    return;
  }

  if (!normalizedDepartment) {
    setMessage("Linked Department is required for a faculty account.");
    return;
  }

      const duplicateFacultyAccount = accounts.some((item, idx) => {
        if (idx === accountEditor.index) return false;
        if (String(item.role || "").toLowerCase() !== "teacher") return false;
        return String(item.linkedFacultyId || "").trim().toLowerCase() === normalizedFacultyId;
      });

      if (duplicateFacultyAccount) {
        setMessage("Is faculty ke liye login account pehle se exist karta hai.");
        return;
      }

      const linkedFacultyExists = facultyProfiles.some(
        (item) => String(item?.id || "").trim().toLowerCase() === normalizedFacultyId,
      );

      if (!linkedFacultyExists) {
        setMessage("Linked Faculty ID not found. Please select a valid faculty profile.");
        return;
      }
    }

    const resolvedSchoolMeta = resolveSchool(form.linkedSchool) || getSchoolByName(form.linkedSchool);
    const linkedSchoolValue = resolvedSchoolMeta?.code || String(form.linkedSchool || "").trim();
    const linkedDepartmentValue = resolveDepartmentName(resolvedSchoolMeta, form.linkedDepartment);

    const payload = {
      ...form,
      linkedSchool: linkedSchoolValue,
      linkedDepartment: linkedDepartmentValue,
    };

    setIsAccountSaving(true);
    setAccountApiError("");

    try {
      if (accountEditor.index === null) {
        await createAdminAccount(payload);
        setAccountPagination((prev) => ({ ...prev, page: 1 }));
      } else {
        const current = accounts[accountEditor.index];
        const accountId = Number(current?.id);
        if (!Number.isInteger(accountId) || accountId <= 0) {
          setMessage("Unable to update unsynced account. Please refresh and retry.");
          return;
        }
        await updateAdminAccount(accountId, payload);
      }

      setAccountsReloadToken((prev) => prev + 1);
      setAuditReloadToken((prev) => prev + 1);

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Updated login account: ${payload.username}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));

      setAccountEditor({ index: null, form: null });
      setMessage("Login account synced with backend successfully.");
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Failed to save account to backend.");
      setAccountApiError(errorMessage);
      setMessage(`Account save failed. ${errorMessage}`);
    } finally {
      setIsAccountSaving(false);
    }
  };

  const departmentOptions = useMemo(() => {
    return SCHOOLS_META.flatMap((school) => school.departments)
      .map((dept) => dept.name)
      .filter(Boolean);
  }, []);

  const schoolOptions = useMemo(
    () => SCHOOLS_META.map((school) => ({
      label: school.name,
      value: school.code,
    })),
    []
  );

  const roleAwareDepartmentOptions = useMemo(() => {
    const activeSchool = String(accountEditor?.form?.linkedSchool || "").trim().toLowerCase();
    if (!activeSchool) return departmentOptions;

    const schoolMeta = resolveSchool(activeSchool) || getSchoolByName(activeSchool);
    const scopedDepartments = schoolMeta?.departments?.map((dept) => dept.name) || [];
    return scopedDepartments.length ? scopedDepartments : departmentOptions;
  }, [accountEditor?.form?.linkedSchool, departmentOptions]);

  const filteredFacultyProfiles = useMemo(() => {
    return facultyProfiles.map((faculty, index) => ({ faculty, index }));
  }, [facultyProfiles]);

  const filteredTenders = useMemo(() => {
    const query = tenderFilters.query.trim().toLowerCase();
    return tenders
      .map((tender, index) => ({ tender, index }))
      .filter(({ tender }) => {
        const matchesQuery =
          !query ||
          [tender.title, tender.description, tender.documentUrl, tender.id]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(query);

        const isActive = isTenderActive(tender);
        const matchesStatus =
          tenderFilters.status === "all" ||
          (tenderFilters.status === "active" && isActive) ||
          (tenderFilters.status === "archived" && !isActive);

        return matchesQuery && matchesStatus;
      });
  }, [tenders, tenderFilters]);

  const recruitmentCurrentItems = useMemo(
    () =>
      (recruitmentData.categories || []).flatMap((category, categoryIndex) =>
        (category.tabs || []).map((tab, tabIndex) => ({
          ...tab,
          categoryType: category.type,
          categoryTitle: category.title,
          categoryIndex,
          tabIndex,
        })),
      ),
    [recruitmentData.categories],
  );

  const filteredRecruitmentCurrentItems = useMemo(() => {
    const query = recruitmentFilter.trim().toLowerCase();
    if (!query) return recruitmentCurrentItems;
    return recruitmentCurrentItems.filter((item) =>
      [item.title, item.label, item.ref, item.date, item.categoryTitle]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [recruitmentCurrentItems, recruitmentFilter]);

  const filteredRecruitmentArchivedItems = useMemo(() => {
    const query = recruitmentFilter.trim().toLowerCase();
    const list = recruitmentData.archived || [];
    if (!query) return list;
    return list.filter((item) =>
      [item.title, item.ref, item.date, item.year]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [recruitmentData.archived, recruitmentFilter]);

  const parseRecruitmentDocuments = (value) => {
    return String(value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [name, description, url] = line.split("|");
        return {
          name: (name || "Document").trim(),
          description: (description || "Official recruitment document").trim(),
          url: (url || "#").trim(),
        };
      });
  };

  const formatRecruitmentDocuments = (docs) => {
    return (Array.isArray(docs) ? docs : [])
      .map(
        (doc) =>
          `${doc.name || "Document"}|${doc.description || "Official recruitment document"}|${doc.url || "#"}`,
      )
      .join("\n");
  };

  const saveRecruitmentEditor = () => {
    const form = recruitmentEditor.form;
    if (!form?.title?.trim() || !form?.ref?.trim() || !form?.date) {
      setMessage("Recruitment title, reference number and date are required.");
      return;
    }

    const payload = {
      id: form.id || `rec-${Date.now()}`,
      label: form.label || form.title,
      title: form.title,
      ref: form.ref,
      date: form.date,
      status: form.status || "active",
      documents: parseRecruitmentDocuments(form.documentsText),
    };

    if (recruitmentEditor.mode === "current") {
      setRecruitmentData((prev) => {
        const categories = [...(prev.categories || [])];
        const targetCategory = categories.find((item) => item.type === form.categoryType);
        if (!targetCategory) return prev;

        const tabs = [...(targetCategory.tabs || [])];
        const existingIndex = tabs.findIndex((item) => item.id === form.id);
        const nextTab = {
          ...payload,
          id: form.id || `tab-${Date.now()}`,
          label: form.label || payload.label,
        };

        if (existingIndex >= 0) tabs[existingIndex] = nextTab;
        else tabs.push(nextTab);

        const targetCategoryIndex = categories.findIndex((item) => item.type === form.categoryType);
        categories[targetCategoryIndex] = { ...targetCategory, tabs };
        return { ...prev, categories };
      });
      setMessage("Current recruitment post updated.");
    }

    if (recruitmentEditor.mode === "archived") {
      setRecruitmentData((prev) => {
        const archived = [...(prev.archived || [])];
        const existingIndex = archived.findIndex((item) => item.id === form.id);
        const nextArchived = {
          ...payload,
          id: form.id || `archived-${form.year || Date.now()}`,
          year: form.year || "",
          status: "archived",
        };

        if (existingIndex >= 0) archived[existingIndex] = nextArchived;
        else archived.push(nextArchived);

        return { ...prev, archived };
      });
      setMessage("Archived recruitment post updated.");
    }

    setRecruitmentEditor({ mode: null, index: null, form: null });
  };

  const deleteRecruitmentCurrent = (item) => {
    setRecruitmentData((prev) => {
      const categories = [...(prev.categories || [])];
      const categoryIndex = categories.findIndex((category) => category.type === item.categoryType);
      if (categoryIndex < 0) return prev;
      const tabs = (categories[categoryIndex].tabs || []).filter((tab) => tab.id !== item.id);
      categories[categoryIndex] = { ...categories[categoryIndex], tabs };
      return { ...prev, categories };
    });
    setMessage("Current recruitment post deleted.");
  };

  const deleteRecruitmentArchived = (item) => {
    setRecruitmentData((prev) => ({
      ...prev,
      archived: (prev.archived || []).filter((entry) => entry.id !== item.id),
    }));
    setMessage("Archived recruitment post deleted.");
  };

  const handleSaveFacultyProfile = async () => {
    if (!facultyEditor.form?.name?.trim()) {
      setMessage("Faculty name is required.");
      return;
    }

    const facultyForm = {
      ...facultyEditor.form,
      createLoginAccount: toBool(facultyEditor.form.createLoginAccount, true),
      sendCredentialsEmail: toBool(facultyEditor.form.sendCredentialsEmail, true),
    };

    const isEdit = facultyEditor.index !== null;
    setIsFacultySaving(true);
    setFacultyApiError("");

    let savedFaculty;
    let resultMessage = "Faculty profile synced with backend successfully.";

    try {
      if (isEdit) {
        if (!facultyForm.id) {
          setMessage("Faculty id missing. Please refresh and retry.");
          return;
        }
        savedFaculty = await updateFacultyProfile(facultyForm.id, facultyForm);
      } else {
        const rawResponse = await createFacultyProfile(facultyForm);
        savedFaculty = rawResponse;

        // Backend auto-creates login account and returns credentials
        if (rawResponse?.loginAccount) {
          const { username, password } = rawResponse.loginAccount;
          resultMessage = `Faculty "${savedFaculty.name}" created successfully! Login credentials — Username: ${username} | Password: ${password}`;
          
          // Refresh accounts list since a new account was created
          setAccountPagination((prev) => ({ ...prev, page: 1 }));
          setAccountsReloadToken((prev) => prev + 1);
          setAuditReloadToken((prev) => prev + 1);

          // Queue credential email if requested
          if (facultyForm.sendCredentialsEmail && savedFaculty.email) {
            const queueItem = {
              id: `mail-${Date.now()}`,
              to: savedFaculty.email,
              subject: "GBU Faculty Portal Credentials",
              status: "pending-backend",
              payload: {
                facultyName: savedFaculty.name,
                username,
                password,
                linkedFacultyId: savedFaculty.id,
              },
              createdAt: new Date().toISOString(),
            };

            setMailQueue((prev) => [queueItem, ...prev].slice(0, 100));

            try {
              const dispatchResult = await dispatchCredentialEmails([queueItem]);
              const resultItem = dispatchResult?.items?.[0];
              if (resultItem?.status) {
                setMailQueue((prev) =>
                  prev.map((item) =>
                    item.id === queueItem.id
                      ? { ...item, status: resultItem.status, error: resultItem.error || "" }
                      : item,
                  ),
                );
              }
            } catch (mailError) {
              // Email send failed but account was created
              console.error("Credential email dispatch failed:", mailError);
            }
          }
        } else if (!isEdit && facultyForm.createLoginAccount) {
          resultMessage = `Faculty "${savedFaculty.name}" created. Login account may already exist or email was missing.`;
        }
      }

      setFacultyProfiles((prev) => {
        const next = [...prev];
        const existingIndex = next.findIndex((item) => item.id === savedFaculty.id);
        if (existingIndex >= 0) next[existingIndex] = savedFaculty;
        else next.unshift(savedFaculty);
        return next;
      });
      setFacultyReloadToken((prev) => prev + 1);

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `${isEdit ? "Updated" : "Created"} faculty profile: ${savedFaculty.name}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));

      setFacultyEditor({ index: null, form: null });
      setMessage(resultMessage);
    } catch (error) {
      const errorMessage = getApiErrorMessage(error, "Failed to save faculty to backend.");
      setFacultyApiError(errorMessage);
      setMessage(`Faculty save failed. ${errorMessage}`);
    } finally {
      setIsFacultySaving(false);
    }
  };

  const handleDeleteFaculty = async (faculty, actualIndex) => {
    const key = faculty?.id || `faculty-${actualIndex}`;
    const previous = [...facultyProfiles];

    setFacultyApiError("");
    setFacultyDeletingKey(String(key));
    setFacultyProfiles((prev) => prev.filter((_, i) => i !== actualIndex));

    if (!faculty?.id) {
      setMessage("Local faculty entry removed. Backend delete skipped because no ID was found.");
      setFacultyDeletingKey("");
      return;
    }

    try {
      await deleteFacultyProfile(faculty.id);
      setFacultyReloadToken((prev) => prev + 1);
      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Deleted faculty profile: ${faculty.name || faculty.id}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));
      setMessage("Faculty deleted successfully.");
    } catch (error) {
      setFacultyProfiles(previous);
      setFacultyApiError(
        error?.response?.data?.message || error?.message || "Failed to delete faculty from backend.",
      );
      setMessage("Faculty delete failed. Previous data restored.");
    } finally {
      setFacultyDeletingKey("");
    }
  };

  const handleDeleteTender = async (tender, actualIndex) => {
    const key = tender.localId || tender.id || `tender-${actualIndex}`;
    const previous = [...tenders];

    setTenderApiError("");
    setTenderDeletingKey(String(key));
    setTenders((prev) => prev.filter((_, i) => i !== actualIndex));

    try {
      if (tender.id && !String(tender.id).startsWith("tmp-")) {
        await deleteTender(tender.id);
      }

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Deleted tender: ${tender.title || tender.id || "untitled"}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));
      setMessage("Tender deleted successfully.");
    } catch (error) {
      setTenders(previous);
      setTenderApiError(
        error?.response?.data?.message || error?.message || "Failed to delete tender from backend.",
      );
      setMessage("Tender delete failed. Previous data restored.");
    } finally {
      setTenderDeletingKey("");
    }
  };

  const handleSaveTender = async () => {
    const form = tenderEditor.form;
    if (!form?.title || !form?.description || !form?.closingDate || !form?.documentUrl) {
      setMessage("Title, description, closing date, and document URL are required.");
      return;
    }

    setIsTenderSaving(true);
    setTenderApiError("");

    const payload = {
      id: form.id || "",
      title: String(form.title).trim(),
      description: String(form.description).trim(),
      closingDate: form.closingDate,
      documentUrl: String(form.documentUrl).trim(),
      localId: form.localId || `tender-${Date.now()}`,
    };

    const isCreate = tenderEditor.index === null;
    const rollbackState = [...tenders];

    if (isCreate) {
      const tempId = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const optimisticTender = {
        ...payload,
        id: tempId,
        localId: tempId,
      };

      setTenders((prev) => [optimisticTender, ...prev]);
      setTenderEditor({ index: null, form: null });

      try {
        const created = await createTender(payload);
        setTenders((prev) =>
          prev.map((item) => (item.localId === tempId ? { ...item, ...created, localId: created.localId || created.id || tempId } : item)),
        );
        setActivityLog((prev) => [
          {
            id: `log-${Date.now()}`,
            action: `Created tender: ${created.title}`,
            time: new Date().toISOString(),
          },
          ...prev,
        ].slice(0, 12));
        setMessage("Tender created and synced with backend.");
      } catch (error) {
        setTenders(rollbackState);
        setTenderApiError(
          error?.response?.data?.message || error?.message || "Failed to create tender on backend.",
        );
        setMessage("Tender create failed. Previous data restored.");
      } finally {
        setIsTenderSaving(false);
      }
      return;
    }

    const target = tenders[tenderEditor.index];
    const targetKey = target?.localId || target?.id || payload.localId;

    setTenders((prev) =>
      prev.map((item, index) =>
        index === tenderEditor.index || item.localId === targetKey
          ? {
              ...item,
              ...payload,
              localId: item.localId || payload.localId,
            }
          : item,
      ),
    );
    setTenderEditor({ index: null, form: null });

    try {
      if (target?.id && !String(target.id).startsWith("tmp-")) {
        const updated = await updateTender(target.id, payload);
        setTenders((prev) =>
          prev.map((item) =>
            item.localId === targetKey || item.id === target.id
              ? { ...item, ...updated, localId: updated.localId || updated.id || targetKey }
              : item,
          ),
        );
      } else {
        const created = await createTender(payload);
        setTenders((prev) =>
          prev.map((item) =>
            item.localId === targetKey
              ? { ...item, ...created, localId: created.localId || created.id || targetKey }
              : item,
          ),
        );
      }

      setActivityLog((prev) => [
        {
          id: `log-${Date.now()}`,
          action: `Updated tender: ${payload.title}`,
          time: new Date().toISOString(),
        },
        ...prev,
      ].slice(0, 12));
      setMessage("Tender updated and synced with backend.");
    } catch (error) {
      setTenders(rollbackState);
      setTenderApiError(
        error?.response?.data?.message || error?.message || "Failed to update tender on backend.",
      );
      setMessage("Tender update failed. Previous data restored.");
    } finally {
      setIsTenderSaving(false);
    }
  };

  const healthChecks = useMemo(() => {
    const inactiveAccounts = accounts.filter((item) => item.status === "inactive").length;
    const schoolUsersWithoutCode = accounts.filter(
      (item) => item.role === "school" && !String(item.linkedSchool || "").trim(),
    ).length;
    const facultyWithoutEmail = facultyProfiles.filter((item) => !String(item.email || "").trim()).length;
    const sectionsMissingData = [
      { key: "events", value: schoolData.events?.length || 0, label: "Events" },
      { key: "news", value: schoolData.news?.length || 0, label: "News" },
      { key: "notices", value: schoolData.notices?.length || 0, label: "Notices" },
      { key: "newsletters", value: schoolData.newsletters?.length || 0, label: "Newsletters" },
      { key: "gallery", value: schoolData.eventGallery?.length || 0, label: "Event Gallery" },
    ]
      .filter((item) => item.value === 0)
      .map((item) => item.label);

    return [
      {
        id: "inactive-accounts",
        title: "Inactive Accounts",
        value: inactiveAccounts,
        status: inactiveAccounts > 0 ? "warning" : "good",
      },
      {
        id: "school-code",
        title: "School Users Missing Code",
        value: schoolUsersWithoutCode,
        status: schoolUsersWithoutCode > 0 ? "warning" : "good",
      },
      {
        id: "faculty-email",
        title: "Faculty Missing Email",
        value: facultyWithoutEmail,
        status: facultyWithoutEmail > 0 ? "warning" : "good",
      },
      {
        id: "sections-empty",
        title: "Empty Content Sections",
        value: sectionsMissingData.length,
        detail: sectionsMissingData.join(", "),
        status: sectionsMissingData.length > 0 ? "warning" : "good",
      },
    ];
  }, [accounts, facultyProfiles, schoolData]);

  const renderCollectionEditor = (listKey, title, fields, newItemTemplate) => {
    const pagination = collectionPagination[listKey] || { page: 1, limit: 10 };
    const setPagination = (updateFn) => {
      setCollectionPagination((prev) => {
        const curr = prev[listKey] || { page: 1, limit: 10 };
        const updated = typeof updateFn === "function" ? updateFn(curr) : updateFn;
        return {
          ...prev,
          [listKey]: updated,
        };
      });
    };

    const filteredItems = (schoolData[listKey] || [])
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => {
        const query = (collectionFilters[listKey] || "").trim().toLowerCase();
        if (!query) return true;
        
        const checkValue = (val) => {
          if (val === null || val === undefined) return false;
          if (typeof val === "object") {
            return Object.values(val).some(checkValue);
          }
          return String(val).toLowerCase().includes(query);
        };
        
        return Object.values(item || {}).some(checkValue);
      });

    const total = filteredItems.length;
    const page = pagination.page;
    const limit = pagination.limit;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const startIndex = (page - 1) * limit;
    const paginatedItems = filteredItems.slice(startIndex, startIndex + limit);

    return (
      <div className={cardClass}>
        {/* Tab Header */}
        <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-semibold text-slate-900">{title} List</h3>
            <p className="text-xs text-slate-500 mt-0.5">Showing list of {title.toLowerCase()} for this school/organization.</p>
          </div>
          <button
            type="button"
            onClick={() => openCollectionAdd(listKey, newItemTemplate)}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
          >
            <Plus className="h-3.5 w-3.5" /> Add New
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="w-full">
          <FilterBar
            searchValue={collectionFilters[listKey] || ""}
            onSearchChange={(value) => {
              setCollectionFilters((prev) => ({ ...prev, [listKey]: value }));
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
            searchPlaceholder={`Search ${title.toLowerCase()}...`}
            onClear={() => {
              setCollectionFilters((prev) => ({ ...prev, [listKey]: "" }));
              setPagination((prev) => ({ ...prev, page: 1 }));
            }}
          />

          {/* Paginated Widescreen Table */}
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-3">{listKey === "clubs" ? "Club Name" : "Title / Name"}</th>
                  {listKey !== "clubs" && <th className="px-4 py-3">Date</th>}
                  <th className="px-4 py-3">Category / Type</th>
                  {listKey === "events" && <th className="px-4 py-3">Venue</th>}
                  {listKey === "clubs" && <th className="px-4 py-3">Faculty Advisor</th>}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedItems.length > 0 ? (
                  paginatedItems.map(({ item, index }) => {
                    const primaryValue = item.title || item.name || item.id || `Item ${index + 1}`;
                    const itemDate = item.date || item.eventDate || "";
                    const categoryValue = item.category || item.type || "N/A";

                    return (
                      <tr key={`${listKey}-${item.id || index}`} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3">
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate max-w-xs sm:max-w-md md:max-w-lg">{primaryValue}</p>
                            {item.tagline && <p className="text-xs text-slate-400 mt-0.5">{item.tagline}</p>}
                            {item.excerpt && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{item.excerpt}</p>}
                          </div>
                        </td>
                        {listKey !== "clubs" && (
                          <td className="px-4 py-3 text-xs font-semibold text-slate-600">
                            {itemDate || "N/A"}
                          </td>
                        )}
                        <td className="px-4 py-3">
                          <span className="rounded bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                            {categoryValue}
                          </span>
                        </td>
                        {listKey === "events" && (
                          <td className="px-4 py-3 text-xs text-slate-600 font-semibold truncate max-w-xs">
                            {item.venue || "N/A"}
                          </td>
                        )}
                        {listKey === "clubs" && (
                          <td className="px-4 py-3 text-xs text-slate-600 font-semibold">
                            {item.facultyAdvisor || "N/A"}
                          </td>
                        )}
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => openCollectionEdit(listKey, index, item)}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                            >
                              <Pencil className="h-3.5 w-3.5" /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCollectionItem(listKey, index)}
                              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
                            >
                              <Trash2 className="h-3.5 w-3.5" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-4 py-8 text-center text-slate-500 font-normal">
                      No items found in {title.toLowerCase()}. Click "Add New" to create one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Local Pagination Controls */}
          <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 sm:flex-row">
            <div className="flex items-center gap-2">
              <span>Show</span>
              <select
                className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none"
                value={limit}
                onChange={(e) => {
                  const newLimit = Number(e.target.value);
                  setPagination({ page: 1, limit: newLimit });
                }}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
              <span className="text-slate-400">|</span>
              <span>
                Showing {total ? startIndex + 1 : 0}
                -
                {Math.min(startIndex + limit, total)} of{" "}
                {total}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                Previous
              </button>
              <span className="font-semibold text-slate-800">
                Page {page} / {totalPages}
              </span>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: Math.min(totalPages, prev.page + 1) }))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Modal Overlay for Add/Edit Collection Item */}
        {collectionEditors[listKey]?.form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {collectionEditors[listKey].index === null ? `➕ Add ${title}` : `Edit ${title}`}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {collectionEditors[listKey].index === null
                      ? `Create a new entry in ${title.toLowerCase()}`
                      : `Update details for ${collectionEditors[listKey].form.title || collectionEditors[listKey].form.name || "item"}.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCollectionEditors((prev) => ({ ...prev, [listKey]: { index: null, form: null } }))}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {fields.map((field) => (
                  <Field key={`${listKey}-${field.key}`} label={field.label}>
                    {field.type === "textarea" ? (
                      <textarea
                        className={`${inputClass} min-h-[90px]`}
                        value={collectionEditors[listKey].form[field.key] || ""}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
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
                    ) : (
                      <input
                        className={inputClass}
                        type={field.type || "text"}
                        value={collectionEditors[listKey].form[field.key] || ""}
                        onChange={(e) => updateCollectionFormField(listKey, field, e.target.value)}
                      />
                    )}
                  </Field>
                ))}
              </div>

              <button
                type="button"
                onClick={() => saveCollectionForm(listKey)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderAccountsTab = () => (
    <div className="space-y-4">
      <div className={cardClass}>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">User Login ID & Password Management</h2>
          <button
            type="button"
            onClick={() =>
              setAccountEditor({
                index: null,
                form: {
                  id: `acc-${Date.now()}`,
                  name: "",
                  username: "",
                  password: "",
                  role: "teacher",
                  status: "active",
                  linkedFacultyId: "",
                  linkedSchool: schoolData.schoolCode || "",
                  linkedDepartment: "",
                },
              })
            }
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <UserPlus className="h-3.5 w-3.5" /> Create Login
          </button>
        </div>

        {isAccountsLoading ? (
          <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
            Loading login accounts from backend API...
          </div>
        ) : null}

        {accountApiError ? (
          <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            API Error: {accountApiError}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <FilterBar
              searchValue={accountFilters.query}
              onSearchChange={(value) => {
                setAccountFilters((prev) => ({ ...prev, query: value }));
                setAccountPagination((prev) => ({ ...prev, page: 1 }));
              }}
              searchPlaceholder="Search by name, username, faculty ID, school code..."
              onClear={() => {
                setAccountFilters({ query: "", role: "all", status: "all" });
                setAccountPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <select
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700"
                value={accountFilters.role}
                onChange={(e) => {
                  setAccountFilters((prev) => ({ ...prev, role: e.target.value }));
                  setAccountPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <option value="all">All Roles</option>
                <option value="admin">admin</option>
                <option value="school">school</option>
                <option value="teacher">teacher</option>
              </select>
              <select
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700"
                value={accountFilters.status}
                onChange={(e) => {
                  setAccountFilters((prev) => ({ ...prev, status: e.target.value }));
                  setAccountPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <option value="all">All Status</option>
                <option value="active">active</option>
                <option value="inactive">inactive</option>
              </select>
            </FilterBar>

            {/* Filter and group accounts into two categories */}
            {(() => {
              const adminAndSchoolAccounts = accounts.filter(acc => acc.role === "admin" || acc.role === "school");
              const facultyAccounts = accounts.filter(acc => acc.role === "teacher");

              return (
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1 pb-2">
                  {/* Category 1: Admins and School Management Accounts */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      Admin & School Portal Accounts ({adminAndSchoolAccounts.length})
                    </h3>
                    {adminAndSchoolAccounts.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                        <table className="w-full border-collapse text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-2.5">Full Name</th>
                              <th className="px-4 py-2.5">Username</th>
                              <th className="px-4 py-2.5">Role</th>
                              <th className="px-4 py-2.5">Linked School</th>
                              <th className="px-4 py-2.5 text-center">Status</th>
                              <th className="px-4 py-2.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {adminAndSchoolAccounts.map((acc) => {
                              const isActive = acc.status === "active";
                              const isDeleting = accountDeletingKey === String(acc.id || "");
                              return (
                                <tr key={acc.id} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-2.5 text-slate-900 font-bold">{acc.name || "-"}</td>
                                  <td className="px-4 py-2.5 text-slate-500">@{acc.username}</td>
                                  <td className="px-4 py-2.5">
                                    <span className={`inline-block rounded-full px-2 py-0.5 border text-[10px] font-bold uppercase tracking-wider ${
                                      acc.role === "admin" ? "bg-blue-50 text-blue-800 border-blue-200" : "bg-indigo-50 text-indigo-800 border-indigo-200"
                                    }`}>
                                      {acc.role}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-slate-700">{acc.linkedSchool || "-"}</td>
                                  <td className="px-4 py-2.5 text-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                      isActive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}>
                                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                                      {acc.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        disabled={isAccountSaving || isDeleting}
                                        onClick={() => setAccountEditor({ index: accounts.indexOf(acc), form: { ...acc } })}
                                        className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        disabled={isAccountSaving || isDeleting}
                                        onClick={() => handleDeleteAccount(acc)}
                                        className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 transition"
                                      >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-xs text-slate-500">
                        No admin or school accounts found on this page.
                      </div>
                    )}
                  </div>

                  {/* Category 2: Faculty Portal Accounts */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Faculty Portal Accounts ({facultyAccounts.length})
                    </h3>
                    {facultyAccounts.length > 0 ? (
                      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                        <table className="w-full border-collapse text-left text-xs">
                          <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
                            <tr>
                              <th className="px-4 py-2.5">Full Name</th>
                              <th className="px-4 py-2.5">Username</th>
                              <th className="px-4 py-2.5">Linked Faculty ID</th>
                              <th className="px-4 py-2.5">School / Dept</th>
                              <th className="px-4 py-2.5 text-center">Status</th>
                              <th className="px-4 py-2.5 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 font-medium">
                            {facultyAccounts.map((acc) => {
                              const isActive = acc.status === "active";
                              const isDeleting = accountDeletingKey === String(acc.id || "");
                              return (
                                <tr key={acc.id} className="hover:bg-slate-50/50">
                                  <td className="px-4 py-2.5 text-slate-900 font-bold">{acc.name || "-"}</td>
                                  <td className="px-4 py-2.5 text-slate-500">@{acc.username}</td>
                                  <td className="px-4 py-2.5">
                                    <span className="font-mono bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded text-[11px] text-slate-700 select-all">
                                      {acc.linkedFacultyId || "-"}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-slate-700">
                                    {acc.linkedSchool || acc.linkedDepartment ? (
                                      <span className="truncate max-w-[200px] block" title={`${acc.linkedSchool || ""} - ${acc.linkedDepartment || ""}`}>
                                        {acc.linkedSchool || "-"}{acc.linkedDepartment ? ` / ${acc.linkedDepartment}` : ""}
                                      </span>
                                    ) : (
                                      "-"
                                    )}
                                  </td>
                                  <td className="px-4 py-2.5 text-center">
                                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                      isActive ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-100 text-slate-600 border-slate-200"
                                    }`}>
                                      <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-slate-400"}`} />
                                      {acc.status}
                                    </span>
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <div className="flex items-center justify-end gap-1.5">
                                      <button
                                        type="button"
                                        disabled={isAccountSaving || isDeleting}
                                        onClick={() => setAccountEditor({ index: accounts.indexOf(acc), form: { ...acc } })}
                                        className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-50 transition"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        type="button"
                                        disabled={isAccountSaving || isDeleting}
                                        onClick={() => handleDeleteAccount(acc)}
                                        className="rounded border border-rose-200 bg-rose-50 px-2 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 transition"
                                      >
                                        {isDeleting ? "Deleting..." : "Delete"}
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-xs text-slate-500">
                        No faculty accounts found on this page.
                      </div>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Pagination Controls Footer */}
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs text-slate-700">
              <div className="flex items-center gap-4 flex-wrap">
                <span>
                  Showing {accountPagination.total ? (accountPagination.page - 1) * accountPagination.limit + 1 : 0}
                  -
                  {Math.min(accountPagination.page * accountPagination.limit, accountPagination.total)} of{" "}
                  {accountPagination.total}
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 font-medium">Show:</span>
                  <select
                    value={accountPagination.limit}
                    onChange={(e) => {
                      const newLimit = parseInt(e.target.value, 10);
                      setAccountPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:outline-none"
                  >
                    <option value={20}>20 rows</option>
                    <option value={50}>50 rows</option>
                    <option value={100}>100 rows</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isAccountsLoading || accountPagination.page <= 1}
                  onClick={() =>
                    setAccountPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
                  }
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Previous
                </button>
                <span>
                  Page {accountPagination.page} / {accountPagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={
                    isAccountsLoading || accountPagination.page >= accountPagination.totalPages
                  }
                  onClick={() =>
                    setAccountPagination((prev) => ({
                      ...prev,
                      page: Math.min(prev.totalPages, prev.page + 1),
                    }))
                  }
                  className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            {accountEditor.form ? (
              <>
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">
                    {accountEditor.index === null ? "Create Account" : "Edit Account"}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAccountEditor({ index: null, form: null })}
                    className="text-xs font-medium text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                </div>

                <div className="space-y-3">
                  <Field label="Full Name">
                    <input
                      className={inputClass}
                      value={accountEditor.form.name || ""}
                      onChange={(e) =>
                        setAccountEditor((prev) => ({ ...prev, form: { ...prev.form, name: e.target.value } }))
                      }
                    />
                  </Field>
                  <Field label="Username">
                    <input
                      className={inputClass}
                      value={accountEditor.form.username || ""}
                      onChange={(e) =>
                        setAccountEditor((prev) => ({ ...prev, form: { ...prev.form, username: e.target.value } }))
                      }
                    />
                  </Field>
                  <Field label="Password">
                    <div className="flex items-center gap-2">
                      <input
                        className={inputClass}
                        type={showPassword ? "text" : "password"}
                        value={accountEditor.form.password || ""}
                        onChange={(e) =>
                          setAccountEditor((prev) => ({ ...prev, form: { ...prev.form, password: e.target.value } }))
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-3 text-slate-600 hover:bg-slate-100"
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAccountEditor((prev) => ({
                            ...prev,
                            form: { ...prev.form, password: generateStrongPassword() },
                          }))
                        }
                        className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> Generate
                      </button>
                    </div>
                  </Field>
                  <Field label="Role">
                    <select
                      className={inputClass}
                      value={accountEditor.form.role || "teacher"}
                      onChange={(e) => {
                        const nextRole = e.target.value;
                        setAccountEditor((prev) => {
                          const current = prev.form || {};
                          if (nextRole === "admin") {
                            return {
                              ...prev,
                              form: {
                                ...current,
                                role: nextRole,
                                linkedFacultyId: "",
                                linkedSchool: "",
                                linkedDepartment: "",
                              },
                            };
                          }

                          if (nextRole === "school") {
                            return {
                              ...prev,
                              form: {
                                ...current,
                                role: nextRole,
                                linkedFacultyId: "",
                                linkedDepartment: "",
                                linkedSchool: current.linkedSchool || schoolData.schoolCode || "",
                              },
                            };
                          }

                          return {
                            ...prev,
                            form: {
                              ...current,
                              role: nextRole,
                              linkedSchool: current.linkedSchool || schoolData.schoolCode || "",
                              linkedDepartment: current.linkedDepartment || "",
                            },
                          };
                        });
                      }}
                    >
                      <option value="admin">admin</option>
                      <option value="school">school</option>
                      <option value="teacher">teacher</option>
                    </select>
                  </Field>
                  <Field label="Status">
                    <select
                      className={inputClass}
                      value={accountEditor.form.status || "active"}
                      onChange={(e) =>
                        setAccountEditor((prev) => ({ ...prev, form: { ...prev.form, status: e.target.value } }))
                      }
                    >
                      <option value="active">active</option>
                      <option value="inactive">inactive</option>
                    </select>
                  </Field>
                  <Field
                    label={
                      accountEditor.form.role === "teacher"
                        ? "Linked Faculty ID (required)"
                        : "Linked Faculty ID"
                    }
                  >
                    <input
                      className={inputClass}
                      value={accountEditor.form.linkedFacultyId || ""}
                      onChange={(e) =>
                        setAccountEditor((prev) => ({
                          ...prev,
                          form: { ...prev.form, linkedFacultyId: e.target.value },
                        }))
                      }
                      list="faculty-id-options"
                      placeholder={
                        accountEditor.form.role === "teacher"
                          ? "Example: SOICT-F0001"
                          : "Optional"
                      }
                      disabled={accountEditor.form.role === "admin" || accountEditor.form.role === "school"}
                    />
                  </Field>
                  <Field
                    label={
                      accountEditor.form.role === "admin"
                        ? "Linked School"
                        : "Linked School (required for school/teacher)"
                    }
                  >
                    <input
                      className={inputClass}
                      value={accountEditor.form.linkedSchool || ""}
                      onChange={(e) =>
                        setAccountEditor((prev) => ({ ...prev, form: { ...prev.form, linkedSchool: e.target.value } }))
                      }
                      list="school-options"
                      placeholder="Example: SOICT"
                      disabled={accountEditor.form.role === "admin"}
                    />
                  </Field>

                  {accountEditor.form.role === "teacher" ? (
                    <Field label="Linked Department (required)">
                      <input
                        className={inputClass}
                        value={accountEditor.form.linkedDepartment || ""}
                        onChange={(e) =>
                          setAccountEditor((prev) => ({
                            ...prev,
                            form: { ...prev.form, linkedDepartment: e.target.value },
                          }))
                        }
                        list="department-options"
                        placeholder="Example: Computer Science"
                      />
                    </Field>
                  ) : null}
                </div>

                <datalist id="faculty-id-options">
                  {facultyProfiles
                    .filter((item) => item?.id)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name || item.id}
                      </option>
                    ))}
                </datalist>

                <datalist id="school-options">
                  {schoolOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </datalist>

                <datalist id="department-options">
                  {roleAwareDepartmentOptions.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>

                <button
                  type="button"
                  disabled={isAccountSaving}
                  onClick={handleSaveAccount}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  {isAccountSaving ? "Saving..." : "Save Account"}
                </button>
              </>
            ) : (
              <div className="flex h-full min-h-[180px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
                Select account to edit or create new login ID.
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={cardClass}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Account Audit Logs</h3>
            <p className="text-xs text-slate-500">Create, update and delete actions are tracked from backend.</p>
          </div>
          <button
            type="button"
            onClick={() => setAuditReloadToken((prev) => prev + 1)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100"
          >
            Refresh Logs
          </button>
        </div>

        <FilterBar
          searchValue={auditFilters.query}
          onSearchChange={(value) => {
            setAuditFilters((prev) => ({ ...prev, query: value }));
            setAuditPagination((prev) => ({ ...prev, page: 1 }));
          }}
          searchPlaceholder="Search summary, actor email, or entity id..."
          onClear={() => {
            setAuditFilters({ query: "", action: "all" });
            setAuditPagination((prev) => ({ ...prev, page: 1 }));
          }}
        >
          <select
            className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700"
            value={auditFilters.action}
            onChange={(e) => {
              setAuditFilters((prev) => ({ ...prev, action: e.target.value }));
              setAuditPagination((prev) => ({ ...prev, page: 1 }));
            }}
          >
            <option value="all">All Actions</option>
            <option value="create-account">create-account</option>
            <option value="update-account">update-account</option>
            <option value="delete-account">delete-account</option>
          </select>
        </FilterBar>

        {isAuditLoading ? (
          <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
            Loading audit logs from backend API...
          </div>
        ) : null}

        {auditApiError ? (
          <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
            API Error: {auditApiError}
          </div>
        ) : null}

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div key={log.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="rounded-md bg-slate-900 px-2 py-1 font-semibold text-white">
                  {log.action}
                </span>
                <span className="text-slate-500">{new Date(log.createdAt).toLocaleString()}</span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-800">{log.summary}</p>
              <p className="mt-1 text-xs text-slate-600">
                Actor: {log.actor?.name || "System"}
                {log.actor?.email ? ` (${log.actor.email})` : ""}
                {log.actor?.role ? ` • Role: ${log.actor.role}` : ""}
              </p>
            </div>
          ))}

          {!isAuditLoading && !auditLogs.length ? (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-600">
              No audit logs found for selected filters.
            </div>
          ) : null}
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
          <span>
            Showing {auditPagination.total ? (auditPagination.page - 1) * auditPagination.limit + 1 : 0}
            -
            {Math.min(auditPagination.page * auditPagination.limit, auditPagination.total)} of {auditPagination.total}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isAuditLoading || auditPagination.page <= 1}
              onClick={() => setAuditPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            <span>
              Page {auditPagination.page} / {auditPagination.totalPages}
            </span>
            <button
              type="button"
              disabled={isAuditLoading || auditPagination.page >= auditPagination.totalPages}
              onClick={() =>
                setAuditPagination((prev) => ({
                  ...prev,
                  page: Math.min(prev.totalPages, prev.page + 1),
                }))
              }
              className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFacultyTab = () => {
    const facultySchoolMeta = resolveSchool(facultyEditor.form?.school)
      || getSchoolByName(facultyEditor.form?.school);
    const facultyDepartmentOptions = (facultySchoolMeta?.departments || []).map((dept) => ({
      label: dept.name,
      value: dept.name,
    }));

    return (
      <div className="space-y-4">
        <div className={cardClass}>
          {/* Header */}
          <div className="mb-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Faculty Profiles Management</h2>
              <p className="text-xs text-slate-500">Manage institutional profiles, generate credentials, and upload in bulk.</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={downloadFacultyTemplate}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Download className="h-3.5 w-3.5" /> Download Template
              </button>
              <button
                type="button"
                onClick={() => bulkFacultyInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Upload className="h-3.5 w-3.5" /> Bulk Upload CSV
              </button>
              <input
                ref={bulkFacultyInputRef}
                type="file"
                accept=".csv,text/csv"
                onChange={handleBulkFacultyUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() =>
                  setFacultyEditor({
                    index: null,
                    form: {
                      id: "",
                      name: "",
                      designation: "",
                      department: "",
                      school: schoolData.schoolCode || schoolData.schoolName || "",
                      email: "",
                      phone: "",
                      createLoginAccount: true,
                      sendCredentialsEmail: true,
                      generatedPassword: generateStrongPassword(),
                      isActive: true,
                    },
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" /> Add Faculty
              </button>
            </div>
          </div>

          {/* Loader and Errors */}
          {isFacultyLoading && (
            <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading faculty profiles...
            </div>
          )}

          {facultyApiError && (
            <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {facultyApiError}
            </div>
          )}

          {/* Search/Filter Bar */}
          <div className="w-full">
            <FilterBar
              searchValue={facultyFilters.query}
              onSearchChange={(value) => {
                setFacultyFilters((prev) => ({ ...prev, query: value }));
                setFacultyPagination((prev) => ({ ...prev, page: 1 }));
              }}
              searchPlaceholder="Search by name, designation, email, ID..."
              onClear={() => {
                setFacultyFilters({ query: "", department: "all" });
                setFacultyPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <select
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700"
                value={facultyFilters.department}
                onChange={(e) => {
                  setFacultyFilters((prev) => ({ ...prev, department: e.target.value }));
                  setFacultyPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <option value="all">All Departments</option>
                {departmentOptions.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </FilterBar>

            {/* Profiles Widescreen Table */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Faculty Member</th>
                    <th className="px-4 py-3">Designation & Dept</th>
                    <th className="px-4 py-3">School</th>
                    <th className="px-4 py-3">Contact info</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {facultyProfiles.length > 0 ? (
                    facultyProfiles.map((faculty, idx) => (
                      <tr key={faculty.id || idx} className="hover:bg-slate-55/50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {faculty.image_url ? (
                              <img
                                src={faculty.image_url}
                                alt={faculty.name}
                                className="h-10 w-10 rounded-xl object-cover ring-2 ring-slate-100 flex-shrink-0"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "";
                                }}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center ring-2 ring-slate-100 text-slate-400 flex-shrink-0">
                                <User className="h-5 w-5" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">{faculty.name}</p>
                              <p className="text-[10px] text-slate-400 font-mono select-all mt-0.5">{faculty.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-slate-800 font-semibold">{faculty.designation || "No Designation"}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{faculty.department || "No Department"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 border border-indigo-100">
                            {faculty.school || "N/A"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-slate-600 truncate">{faculty.email || "No Email"}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{faculty.phone || "No Phone"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                            faculty.isActive 
                              ? "bg-emerald-105 bg-emerald-100 text-emerald-700" 
                              : "bg-rose-105 bg-rose-100 text-rose-700"
                          }`}>
                            {faculty.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setFacultyEditor({ index: faculty.id, form: { ...faculty } })}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                            >
                              <Pencil className="h-3 w-3" /> Edit
                            </button>
                            <button
                              type="button"
                              disabled={facultyDeletingKey === String(faculty.id)}
                              onClick={() => handleDeleteFaculty(faculty, idx)}
                              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
                            >
                              <Trash2 className="h-3 w-3" />
                              {facultyDeletingKey === String(faculty.id) ? "Deleting" : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-slate-500 font-normal">
                        No faculty profiles found. Click "Add Faculty" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 sm:flex-row">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none"
                  value={facultyPagination.limit}
                  onChange={(e) => {
                    const newLimit = Number(e.target.value);
                    setFacultyPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
                  }}
                >
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
                <span className="text-slate-400">|</span>
                <span>
                  Showing {facultyPagination.total ? (facultyPagination.page - 1) * facultyPagination.limit + 1 : 0}
                  -
                  {Math.min(facultyPagination.page * facultyPagination.limit, facultyPagination.total)} of{" "}
                  {facultyPagination.total}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isFacultyLoading || facultyPagination.page <= 1}
                  onClick={() => setFacultyPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <span className="font-semibold text-slate-800">
                  Page {facultyPagination.page} / {facultyPagination.totalPages}
                </span>
                <button
                  type="button"
                  disabled={isFacultyLoading || facultyPagination.page >= facultyPagination.totalPages}
                  onClick={() => setFacultyPagination((prev) => ({ ...prev, page: Math.min(prev.totalPages, prev.page + 1) }))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Overlay for Add/Edit Faculty Profile */}
        {facultyEditor.form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {facultyEditor.index === null ? "➕ Add Faculty Profile" : "Edit Faculty Profile"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {facultyEditor.index === null
                      ? "Create a new institutional profile and optionally generate login credentials."
                      : `Update profile information for ${facultyEditor.form.name}.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFacultyEditor({ index: null, form: null })}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                <Field label="Full Name">
                  <input
                    className={inputClass}
                    value={facultyEditor.form.name || ""}
                    placeholder="Enter full name"
                    onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, name: e.target.value } }))}
                  />
                </Field>
                <Field label="Designation">
                  <input
                    className={inputClass}
                    value={facultyEditor.form.designation || ""}
                    placeholder="e.g. Associate Professor"
                    onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, designation: e.target.value } }))}
                  />
                </Field>
                <Field label="School">
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
                <Field label="Department">
                  <select
                    className={inputClass}
                    value={facultyEditor.form.department || ""}
                    onChange={(e) =>
                      setFacultyEditor((prev) => ({
                        ...prev,
                        form: { ...prev.form, department: e.target.value },
                      }))
                    }
                    disabled={!facultyDepartmentOptions.length}
                  >
                    <option value="">
                      {facultyDepartmentOptions.length ? "Select department" : "Select school first"}
                    </option>
                    {facultyDepartmentOptions.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Email Address">
                  <input
                    className={inputClass}
                    type="email"
                    value={facultyEditor.form.email || ""}
                    placeholder="e.g. email@gbu.ac.in"
                    onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, email: e.target.value } }))}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    className={inputClass}
                    value={facultyEditor.form.phone || ""}
                    placeholder="Enter phone number"
                    onChange={(e) => setFacultyEditor((prev) => ({ ...prev, form: { ...prev.form, phone: e.target.value } }))}
                  />
                </Field>

                <Field label="Status">
                  <select
                    className={inputClass}
                    value={String(facultyEditor.form.isActive ?? true)}
                    onChange={(e) =>
                      setFacultyEditor((prev) => ({
                        ...prev,
                        form: { ...prev.form, isActive: e.target.value === "true" },
                      }))
                    }
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </Field>

                {facultyEditor.index === null && (
                  <>
                    <div className="my-4 border-t border-dashed border-slate-200 pt-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Portal Login Account</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Configure automatic account creation on submission.</p>
                    </div>

                    <Field label="Create Login Account">
                      <select
                        className={inputClass}
                        value={String(facultyEditor.form.createLoginAccount ?? true)}
                        onChange={(e) =>
                          setFacultyEditor((prev) => ({
                            ...prev,
                            form: { ...prev.form, createLoginAccount: e.target.value === "true" },
                          }))
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </Field>
                    <Field label="Send Credentials Email">
                      <select
                        className={inputClass}
                        value={String(facultyEditor.form.sendCredentialsEmail ?? true)}
                        onChange={(e) =>
                          setFacultyEditor((prev) => ({
                            ...prev,
                            form: { ...prev.form, sendCredentialsEmail: e.target.value === "true" },
                          }))
                        }
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </Field>
                    <Field label="Generated Temporary Password">
                      <div className="flex items-center gap-2">
                        <input className={inputClass} value={facultyEditor.form.generatedPassword || ""} readOnly />
                        <button
                          type="button"
                          onClick={() =>
                            setFacultyEditor((prev) => ({
                              ...prev,
                              form: { ...prev.form, generatedPassword: generateStrongPassword() },
                            }))
                          }
                          className="inline-flex h-10 items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <Sparkles className="h-3.5 w-3.5" /> Regenerate
                        </button>
                      </div>
                    </Field>
                  </>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 text-right">
                <button
                  type="button"
                  onClick={() => setFacultyEditor({ index: null, form: null })}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isFacultySaving}
                  onClick={handleSaveFacultyProfile}
                  className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  {isFacultySaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderTendersTab = () => {
    const totalTenders = filteredTenders.length;
    const tenderPage = tenderPagination.page;
    const tenderLimit = tenderPagination.limit;
    const tenderTotalPages = Math.max(1, Math.ceil(totalTenders / tenderLimit));
    const tenderStartIndex = (tenderPage - 1) * tenderLimit;
    const paginatedTenders = filteredTenders.slice(tenderStartIndex, tenderStartIndex + tenderLimit);

    return (
      <div className="space-y-4">
        <div className={cardClass}>
          {/* Header */}
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Tender Management</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage active and archived university procurement tenders.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setTenderEditor({
                  index: null,
                  form: {
                    id: "",
                    title: "",
                    description: "",
                    closingDate: "",
                    documentUrl: "",
                    localId: `tender-${Date.now()}`,
                  },
                })
              }
              className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <Plus className="h-3.5 w-3.5" /> Add Tender
            </button>
          </div>

          {/* Loader and Errors */}
          {isTenderLoading && (
            <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading tenders...
            </div>
          )}

          {tenderApiError && (
            <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              {tenderApiError}
            </div>
          )}

          {/* Search/Filter Bar */}
          <div className="w-full">
            <FilterBar
              searchValue={tenderFilters.query}
              onSearchChange={(value) => {
                setTenderFilters((prev) => ({ ...prev, query: value }));
                setTenderPagination((prev) => ({ ...prev, page: 1 }));
              }}
              searchPlaceholder="Search by title, description, document url..."
              onClear={() => {
                setTenderFilters({ query: "", status: "all" });
                setTenderPagination((prev) => ({ ...prev, page: 1 }));
              }}
            >
              <select
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 outline-none"
                value={tenderFilters.status}
                onChange={(e) => {
                  setTenderFilters((prev) => ({ ...prev, status: e.target.value }));
                  setTenderPagination((prev) => ({ ...prev, page: 1 }));
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
            </FilterBar>

            {/* Tenders Table */}
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Tender Title & Description</th>
                    <th className="px-4 py-3">Closing Date</th>
                    <th className="px-4 py-3">Auto-Hide Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {paginatedTenders.length > 0 ? (
                    paginatedTenders.map(({ tender, index: actualIndex }) => {
                      const autoHideDate = getTenderAutoHideDate(tender.closingDate);
                      const isActive = isTenderActive(tender);
                      return (
                        <tr key={tender.localId || tender.id || actualIndex} className="hover:bg-slate-55/50 transition-colors">
                          <td className="px-4 py-3">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate max-w-xs sm:max-w-md md:max-w-lg">{tender.title || "Untitled Tender"}</p>
                              {tender.description && <p className="text-xs text-slate-400 mt-0.5 truncate max-w-xs">{tender.description}</p>}
                              {tender.id && <p className="text-[10px] text-slate-400 font-mono mt-0.5 select-all">{tender.id}</p>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600 font-semibold">
                            {tender.closingDate || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-400 font-semibold">
                            {autoHideDate ? autoHideDate.toISOString().slice(0, 10) : "N/A"}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-bold ${
                              isActive 
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-250" 
                                : "bg-rose-100 text-rose-700 border border-rose-250"
                            }`}>
                              {isActive ? "Active" : "Archived"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                disabled={isTenderSaving || tenderDeletingKey === String(tender.localId || tender.id || actualIndex)}
                                onClick={() =>
                                  setTenderEditor({
                                    index: actualIndex,
                                    form: {
                                      id: tender.id || "",
                                      title: tender.title || "",
                                      description: tender.description || "",
                                      closingDate: tender.closingDate || "",
                                      documentUrl: tender.documentUrl || "",
                                      localId: tender.localId || `tender-${Date.now()}`,
                                    },
                                  })
                                }
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
                              >
                                <Pencil className="h-3 w-3" /> Edit
                              </button>
                              <button
                                type="button"
                                disabled={isTenderSaving || tenderDeletingKey === String(tender.localId || tender.id || actualIndex)}
                                onClick={() => handleDeleteTender(tender, actualIndex)}
                                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
                              >
                                <Trash2 className="h-3 w-3" />
                                {tenderDeletingKey === String(tender.localId || tender.id || actualIndex) ? "Deleting" : "Delete"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500 font-normal">
                        No tenders found. Click "Add Tender" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-700 sm:flex-row">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 outline-none"
                  value={tenderLimit}
                  onChange={(e) => {
                    const newLimit = Number(e.target.value);
                    setTenderPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span>entries</span>
                <span className="text-slate-400">|</span>
                <span>
                  Showing {totalTenders ? tenderStartIndex + 1 : 0}
                  -
                  {Math.min(tenderStartIndex + tenderLimit, totalTenders)} of{" "}
                  {totalTenders}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={tenderPage <= 1}
                  onClick={() => setTenderPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  Previous
                </button>
                <span className="font-semibold text-slate-800">
                  Page {tenderPage} / {tenderTotalPages}
                </span>
                <button
                  type="button"
                  disabled={tenderPage >= tenderTotalPages}
                  onClick={() => setTenderPagination((prev) => ({ ...prev, page: Math.min(tenderTotalPages, prev.page + 1) }))}
                  className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tender Snapshot */}
        <div className={cardClass}>
          <h3 className="mb-3 text-base font-semibold text-slate-900">Tender Snapshot</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">Active Tenders</p>
              <p className="mt-1 text-2xl font-bold text-slate-955">{tenderSplit.current.length}</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs uppercase tracking-wide text-slate-500 font-bold">Archived Tenders</p>
              <p className="mt-1 text-2xl font-bold text-slate-955">{tenderSplit.archived.length}</p>
            </div>
          </div>
        </div>

        {/* Modal Overlay for Add/Edit Tender */}
        {tenderEditor.form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {tenderEditor.index === null ? "➕ Add New Tender" : "Edit Tender"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {tenderEditor.index === null
                      ? "Publish a new procurement tender notice on the smart campus portal."
                      : `Update procurement details for tender: ${tenderEditor.form.title}.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTenderEditor({ index: null, form: null })}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                <Field label="Tender ID (Backend Generated)">
                  <input className={`${inputClass} bg-slate-100 cursor-not-allowed`} value={tenderEditor.form.id || "Auto-generated by backend"} disabled />
                </Field>
                <Field label="Title">
                  <input
                    className={inputClass}
                    value={tenderEditor.form.title || ""}
                    placeholder="Enter tender title"
                    onChange={(e) =>
                      setTenderEditor((prev) => ({ ...prev, form: { ...prev.form, title: e.target.value } }))
                    }
                  />
                </Field>
                <Field label="Description">
                  <textarea
                    className={`${inputClass} min-h-24`}
                    value={tenderEditor.form.description || ""}
                    placeholder="Provide a detailed description of the tender"
                    onChange={(e) =>
                      setTenderEditor((prev) => ({ ...prev, form: { ...prev.form, description: e.target.value } }))
                    }
                  />
                </Field>
                <Field label="Closing Date">
                  <input
                    className={inputClass}
                    type="date"
                    value={tenderEditor.form.closingDate || ""}
                    onChange={(e) =>
                      setTenderEditor((prev) => ({ ...prev, form: { ...prev.form, closingDate: e.target.value } }))
                    }
                  />
                </Field>
                <Field label="Document URL">
                  <input
                    className={inputClass}
                    value={tenderEditor.form.documentUrl || ""}
                    placeholder="Enter link to download official PDF/Doc"
                    onChange={(e) =>
                      setTenderEditor((prev) => ({ ...prev, form: { ...prev.form, documentUrl: e.target.value } }))
                    }
                  />
                </Field>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 flex items-center justify-end gap-2 border-t border-slate-100 pt-4 text-right">
                <button
                  type="button"
                  onClick={() => setTenderEditor({ index: null, form: null })}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isTenderSaving}
                  onClick={handleSaveTender}
                  className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {isTenderSaving ? "Saving..." : "Save Tender"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDacTab = () => {
    const filtered = dacMembers.all.filter((member) => {
      const query = dacFilters.query.toLowerCase();
      const matchesSearch = 
        member.name.toLowerCase().includes(query) ||
        member.role.toLowerCase().includes(query) ||
        member.designation.toLowerCase().includes(query) ||
        member.department.toLowerCase().includes(query);
      
      const matchesType = dacFilters.teamType === "all" || member.teamType === dacFilters.teamType;
      
      return matchesSearch && matchesType;
    });

    const filteredFaculty = filtered.filter((m) => m.teamType === "faculty");
    const filteredStudent = filtered.filter((m) => m.teamType === "student");

    const renderMemberCard = (member) => {
      const actualIndex = dacMembers.all.findIndex((m) => m.id === member.id);
      
      // Filter same-team members to enable conditional arrows
      const teamMembers = dacMembers.all.filter(m => m.teamType === member.teamType);
      const subIndex = teamMembers.findIndex(m => m.id === member.id);
      const isFirst = subIndex === 0;
      const isLast = subIndex === teamMembers.length - 1;

      return (
        <div
          key={member.id || member.localId}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between"
        >
          <div className="flex items-start gap-3 min-w-0">
            {member.image ? (
              <img
                src={member.image}
                alt={member.name}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-slate-100 flex-shrink-0"
              />
            ) : (
              <div className="h-14 w-14 rounded-2xl bg-slate-100 flex items-center justify-center ring-2 ring-slate-100 text-slate-400 flex-shrink-0">
                <User className="h-7 w-7" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <p className="font-bold text-slate-900 truncate text-sm">{member.name}</p>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${
                  member.teamType === "faculty" 
                    ? "bg-indigo-100 text-indigo-700" 
                    : "bg-emerald-100 text-emerald-700"
                }`}>
                  {member.teamType}
                </span>
                {!member.isActive ? (
                  <span className="rounded bg-rose-100 px-1.5 py-0.5 text-[9px] font-semibold text-rose-700">
                    Inactive
                  </span>
                ) : null}
              </div>
              <p className="text-xs font-semibold text-blue-700 mt-0.5">{member.role}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{member.designation} • {member.department}</p>
              <p className="text-[10px] font-medium text-slate-400 mt-1.5 bg-slate-50 border border-slate-100 rounded px-1.5 py-0.5 inline-block">Position Index: {member.sortOrder}</p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 gap-2">
            {/* Reordering Controls */}
            <div className="flex gap-1">
              <button
                type="button"
                disabled={isFirst || isDacSaving}
                onClick={() => handleDacReorder(actualIndex, "up")}
                className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-slate-50 transition border border-slate-200"
                title="Move Up"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                disabled={isLast || isDacSaving}
                onClick={() => handleDacReorder(actualIndex, "down")}
                className="p-1.5 rounded bg-slate-50 hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-slate-50 transition border border-slate-200"
                title="Move Down"
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </button>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setDacEditor({
                    index: actualIndex,
                    form: {
                      id: member.id,
                      name: member.name,
                      role: member.role,
                      department: member.department,
                      designation: member.designation,
                      image: member.image,
                      email: member.email,
                      linkedin: member.linkedin,
                      portfolio: member.portfolio,
                      bio: member.bio,
                      skills: Array.isArray(member.skills) ? member.skills.join(", ") : member.skills,
                      teamType: member.teamType,
                      sortOrder: member.sortOrder,
                      isActive: member.isActive,
                    },
                  })
                }
                className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-sm"
              >
                <Pencil className="h-3 w-3" /> Edit
              </button>
              <button
                type="button"
                disabled={isDacSaving || dacDeletingKey === String(member.id)}
                onClick={() => handleDeleteDacMember(actualIndex)}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
                {dacDeletingKey === String(member.id) ? "..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className={cardClass}>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Digital Automation Cell (DAC) Team</h2>
              <p className="text-xs text-slate-500 mt-1">Manage faculty advisors, student developers, and their display order on the main DAC page.</p>
            </div>
            <button
              type="button"
              onClick={() =>
                setDacEditor({
                  index: null,
                  form: {
                    name: "",
                    role: "",
                    department: "",
                    designation: "",
                    image: "",
                    email: "",
                    linkedin: "",
                    portfolio: "",
                    bio: "",
                    skills: "",
                    teamType: "student",
                    sortOrder: "",
                    isActive: true,
                  },
                })
              }
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition shadow-sm self-start sm:self-auto"
            >
              <Plus className="h-4 w-4" /> Add Team Member
            </button>
          </div>

          {isDacLoading ? (
            <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800 flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading team members...
            </div>
          ) : null}

          {dacApiError ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              API Error: {dacApiError}
            </div>
          ) : null}

          <div className="space-y-4">
            <FilterBar
              searchValue={dacFilters.query}
              onSearchChange={(value) => setDacFilters((prev) => ({ ...prev, query: value }))}
              searchPlaceholder="Search by name, role, department..."
              onClear={() => setDacFilters({ query: "", teamType: "all" })}
            >
              <select
                className="rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-semibold text-slate-700"
                value={dacFilters.teamType}
                onChange={(e) => setDacFilters((prev) => ({ ...prev, teamType: e.target.value }))}
              >
                <option value="all">All Teams</option>
                <option value="faculty">Faculty Team</option>
                <option value="student">Student Team</option>
              </select>
            </FilterBar>

            <div className="space-y-6 max-h-[650px] overflow-y-auto pr-1 py-1">
              {/* Faculty Team Section */}
              {(dacFilters.teamType === "all" || dacFilters.teamType === "faculty") && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider">Faculty Advisors / Mentors</h3>
                    <span className="rounded-full bg-indigo-50 border border-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700">
                      {filteredFaculty.length}
                    </span>
                  </div>
                  {filteredFaculty.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs text-slate-400">
                      No faculty members found matching search filters.
                    </div>
                  ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                      {filteredFaculty.map(renderMemberCard)}
                    </div>
                  )}
                </div>
              )}

              {/* Student Team Section */}
              {(dacFilters.teamType === "all" || dacFilters.teamType === "student") && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                    <h3 className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Student Developers / Builders</h3>
                    <span className="rounded-full bg-emerald-50 border border-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                      {filteredStudent.length}
                    </span>
                  </div>
                  {filteredStudent.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-6 text-center text-xs text-slate-400">
                      No student members found matching search filters.
                    </div>
                  ) : (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                      {filteredStudent.map(renderMemberCard)}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Overlay for Add/Edit Member */}
        {dacEditor.form && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl flex flex-col max-h-[90vh] my-8 animate-in fade-in zoom-in-95 duration-150">
              {/* Modal Header */}
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {dacEditor.index === null ? "➕ Add DAC Member" : "Edit DAC Member"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {dacEditor.index === null 
                      ? "Create a new Digital Automation Cell member profile." 
                      : `Modify details for ${dacEditor.form.name}.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setDacEditor({ index: null, form: null })}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Scrollable Form Body */}
              <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-left">
                {dacApiError && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
                    {dacApiError}
                  </div>
                )}

                <Field label="Name">
                  <input
                    className={inputClass}
                    value={dacEditor.form.name || ""}
                    onChange={(e) =>
                      setDacEditor((prev) => ({ ...prev, form: { ...prev.form, name: e.target.value } }))
                    }
                    placeholder="e.g. Ashwani Kushwaha"
                  />
                </Field>

                <div className="grid gap-3 grid-cols-2">
                  <Field label="Team Type">
                    <select
                      className={inputClass}
                      value={dacEditor.form.teamType || "student"}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, teamType: e.target.value } }))
                      }
                    >
                      <option value="student">Student Team</option>
                      <option value="faculty">Faculty Team</option>
                    </select>
                  </Field>

                  <Field label="Sort Order / Position (Blank = Bottom)">
                    <input
                      className={inputClass}
                      type="number"
                      value={dacEditor.form.sortOrder ?? ""}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, sortOrder: e.target.value } }))
                      }
                      placeholder="e.g. 0 for top, 1 for second"
                    />
                  </Field>
                </div>

                <Field label="Role">
                  <input
                    className={inputClass}
                    value={dacEditor.form.role || ""}
                    onChange={(e) =>
                      setDacEditor((prev) => ({ ...prev, form: { ...prev.form, role: e.target.value } }))
                    }
                    placeholder="e.g. Lead Full-Stack Developer or Chief Patron"
                  />
                </Field>

                <div className="grid gap-3 grid-cols-2">
                  <Field label="Designation">
                    <input
                      className={inputClass}
                      value={dacEditor.form.designation || ""}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, designation: e.target.value } }))
                      }
                      placeholder="e.g. Student Lead or Vice Chancellor"
                    />
                  </Field>

                  <Field label="Department">
                    <input
                      className={inputClass}
                      value={dacEditor.form.department || ""}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, department: e.target.value } }))
                      }
                      placeholder="e.g. B.Tech CSE or School of ICT"
                    />
                  </Field>
                </div>

                <Field label="Image URL">
                  <input
                    className={inputClass}
                    value={dacEditor.form.image || ""}
                    onChange={(e) =>
                      setDacEditor((prev) => ({ ...prev, form: { ...prev.form, image: e.target.value } }))
                    }
                    placeholder="https://..."
                  />
                </Field>

                <Field label="Email Address">
                  <input
                    className={inputClass}
                    type="email"
                    value={dacEditor.form.email || ""}
                    onChange={(e) =>
                      setDacEditor((prev) => ({ ...prev, form: { ...prev.form, email: e.target.value } }))
                    }
                    placeholder="e.g. example@gbu.ac.in"
                  />
                </Field>

                <div className="grid gap-3 grid-cols-2">
                  <Field label="LinkedIn Profile URL">
                    <input
                      className={inputClass}
                      value={dacEditor.form.linkedin || ""}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, linkedin: e.target.value } }))
                      }
                      placeholder="https://linkedin.com/in/..."
                    />
                  </Field>

                  <Field label="Portfolio / Website URL">
                    <input
                      className={inputClass}
                      value={dacEditor.form.portfolio || ""}
                      onChange={(e) =>
                        setDacEditor((prev) => ({ ...prev, form: { ...prev.form, portfolio: e.target.value } }))
                      }
                      placeholder="https://github.com/..."
                    />
                  </Field>
                </div>

                {dacEditor.form.teamType === "student" && (
                  <>
                    <Field label="Short Bio">
                      <textarea
                        className={`${inputClass} min-h-[80px]`}
                        value={dacEditor.form.bio || ""}
                        onChange={(e) =>
                          setDacEditor((prev) => ({ ...prev, form: { ...prev.form, bio: e.target.value } }))
                        }
                        placeholder="Briefly describe key contributions..."
                      />
                    </Field>

                    <Field label="Skills (Comma-separated)">
                      <input
                        className={inputClass}
                        value={dacEditor.form.skills || ""}
                        onChange={(e) =>
                          setDacEditor((prev) => ({ ...prev, form: { ...prev.form, skills: e.target.value } }))
                        }
                        placeholder="React, Node.js, PostgreSQL"
                      />
                    </Field>
                  </>
                )}

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="dacIsActive"
                    checked={dacEditor.form.isActive}
                    onChange={(e) =>
                      setDacEditor((prev) => ({ ...prev, form: { ...prev.form, isActive: e.target.checked } }))
                    }
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-700 h-4 w-4"
                  />
                  <label htmlFor="dacIsActive" className="text-xs font-semibold text-slate-700 cursor-pointer">
                    Is Active Member
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => setDacEditor({ index: null, form: null })}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isDacSaving}
                  onClick={handleSaveDacMember}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
                >
                  {isDacSaving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSchoolTab = () => {
    if (selectedSchoolId === null && !schoolEditor.isCreating) {
      return (
        <div className="space-y-4">
          <div className={cardClass}>
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Schools & Organizations Management</h2>
              <p className="text-sm text-slate-500">Select a school to view and manage its content, events, news, notices, and clubs.</p>
            </div>

            {schoolApiError && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {schoolApiError}
              </div>
            )}

            {isSchoolsLoading ? (
              <div className="py-8 text-center text-sm text-slate-500">Loading schools...</div>
            ) : schoolsList.length === 0 ? (
              <div className="py-8 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                No schools found. Backend may not be running.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {schoolsList.filter((s) => s.code !== "NSS" && s.code !== "NCC").map((school) => {
                  const c = school.content || {};
                  const counts = [
                    { label: "Events", n: (c.events || []).length, bg: "bg-indigo-50 text-indigo-700 border-indigo-100" },
                    { label: "News", n: (c.news || []).length, bg: "bg-emerald-50 text-emerald-700 border-emerald-100" },
                    { label: "Notices", n: (c.notices || []).length, bg: "bg-sky-50 text-sky-700 border-sky-100" },
                  ];
                  return (
                    <div
                      key={school.id}
                      onClick={() => openSchool(school)}
                      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-350 hover:shadow-lg flex flex-col justify-between min-h-[170px]"
                    >
                      <div>
                        <div className="mb-3 flex items-center justify-between">
                          <span className="rounded-lg bg-slate-900 px-3 py-1 text-xs font-bold text-white tracking-wider uppercase">{school.code}</span>
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-250">Active</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-slate-950 transition-colors">{school.name}</h3>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold">
                          {counts.map((cnt) => (
                            <span key={cnt.label} className={`rounded-md border px-2 py-0.5 ${cnt.bg}`}>
                              {cnt.n} {cnt.label}
                            </span>
                          ))}
                        </div>
                        <p className="mt-3.5 text-xs font-bold text-slate-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Configure Content &rarr;
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedSchoolId(null);
                setSchoolEditor({ isCreating: false });
                setSchoolData(deepClone(EMPTY_SCHOOL_DATA));
              }}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              title="Back to schools list"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold text-slate-900">{schoolData.schoolName || "School"}</h2>
                <span className="rounded-lg bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">{schoolData.schoolCode}</span>
              </div>
              <p className="text-sm text-slate-500">Manage this school's content, events, news &amp; more. Data is saved per-school.</p>
            </div>
          </div>
          <button
            onClick={handleSaveSchool}
            disabled={isSchoolSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSchoolSaving ? "Saving..." : "Save School"}
          </button>
        </div>

      {activeSchoolSubTab === "basic" && (
        <div className={cardClass}>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">School Basic Settings</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="School Name">
              <input
                className={inputClass}
                value={schoolData.schoolName || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolName: e.target.value }))}
              />
            </Field>
            <Field label="School Code (Read-only)">
              <input
                className={`${inputClass} bg-slate-100 cursor-not-allowed`}
                value={schoolData.schoolCode || ""}
                readOnly
              />
            </Field>
            <Field label="Dean Name">
              <input
                className={inputClass}
                value={schoolData.deanName || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, deanName: e.target.value }))}
              />
            </Field>
            <Field label="School Email">
              <input
                className={inputClass}
                value={schoolData.email || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </Field>
            <Field label="Phone">
              <input
                className={inputClass}
                value={schoolData.phone || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </Field>
            <Field label="Website URL">
              <input
                className={inputClass}
                value={schoolData.websiteUrl || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
              />
            </Field>
            <Field label="Banner Image URL">
              <input
                className={inputClass}
                value={schoolData.bannerImage || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, bannerImage: e.target.value }))}
              />
            </Field>
            <Field label="Address">
              <input
                className={inputClass}
                value={schoolData.address || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, address: e.target.value }))}
              />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="School Description">
              <textarea
                className={`${inputClass} min-h-28`}
                value={schoolData.schoolDescription || ""}
                onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolDescription: e.target.value }))}
              />
            </Field>
          </div>
        </div>
      )}

      {activeSchoolSubTab === "events" &&
        renderCollectionEditor(
          "events",
          "Events",
          [
            { key: "title", label: "Event Title" },
            { key: "date", label: "Date", type: "date" },
            { key: "startsAt", label: "Starts At" },
            { key: "endDate", label: "End Date", type: "date" },
            { key: "endsAt", label: "Ends At" },
            { key: "time", label: "Time" },
            { key: "venue", label: "Venue" },
            { key: "location", label: "Location" },
            { key: "type", label: "Type" },
            { key: "mode", label: "Mode" },
            { key: "organizer", label: "Organizer" },
            { key: "attendees", label: "Attendees", type: "number" },
            { key: "price", label: "Price" },
            { key: "tags", label: "Tags (comma separated)" },
            { key: "image", label: "Image URL" },
            { key: "imageLink", label: "Image Click Link" },
            { key: "coverImageUrl", label: "Cover Image URL" },
            { key: "images", label: "Gallery Images (comma separated URLs)" },
            { key: "registrationUrl", label: "Registration URL" },
            { key: "description", label: "Description", type: "textarea" },
          ],
          {
            title: "",
            date: "",
            startsAt: "",
            endDate: "",
            endsAt: "",
            time: "",
            venue: "",
            location: "",
            type: "",
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
            description: "",
          },
        )}

      {activeSchoolSubTab === "news" &&
        renderCollectionEditor(
          "news",
          "News",
          [
            { key: "title", label: "News Title" },
            { key: "date", label: "Date", type: "date" },
            { key: "category", label: "Category" },
            { key: "author", label: "Author" },
            { key: "department", label: "Department" },
            { key: "tags", label: "Tags (comma separated)" },
            { key: "priority", label: "Priority" },
            { key: "featured", label: "Featured", type: "boolean" },
            { key: "views", label: "Views", type: "number" },
            { key: "likes", label: "Likes", type: "number" },
            { key: "image", label: "Image URL" },
            { key: "imageLink", label: "Image Click Link" },
            { key: "coverImageUrl", label: "Cover Image URL" },
            { key: "pdfUrl", label: "PDF URL" },
            { key: "link", label: "External Link" },
            { key: "excerpt", label: "Excerpt", type: "textarea" },
            { key: "content", label: "Content", type: "textarea" },
            { key: "status", label: "Status" },
          ],
          {
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
            status: "draft",
          },
        )}

      {activeSchoolSubTab === "notices" &&
        renderCollectionEditor(
          "notices",
          "Notices",
          [
            { key: "title", label: "Notice Title" },
            { key: "date", label: "Date", type: "date" },
            { key: "type", label: "Type" },
            { key: "priority", label: "Priority" },
            { key: "isNew", label: "New Badge", type: "boolean" },
            { key: "views", label: "Views", type: "number" },
            { key: "image", label: "Image URL" },
            { key: "imageLink", label: "Image Click Link" },
            { key: "pdfUrl", label: "PDF URL" },
            { key: "content", label: "Content", type: "textarea" },
          ],
          {
            title: "",
            date: "",
            type: "General",
            priority: "medium",
            isNew: true,
            views: 0,
            image: "",
            imageLink: "",
            pdfUrl: "",
            content: "",
          },
        )}

      {activeSchoolSubTab === "newsletters" &&
        renderCollectionEditor(
          "newsletters",
          "Newsletters",
          [
            { key: "title", label: "Title" },
            { key: "date", label: "Date", type: "date" },
            { key: "issueNumber", label: "Issue Number" },
            { key: "category", label: "Category" },
            { key: "views", label: "Views", type: "number" },
            { key: "coverImage", label: "Cover Image URL" },
            { key: "imageLink", label: "Image Click Link" },
            { key: "pdfLink", label: "PDF Link" },
            { key: "excerpt", label: "Excerpt", type: "textarea" },
            { key: "content", label: "Content", type: "textarea" },
            { key: "isPublished", label: "Published", type: "boolean" },
          ],
          {
            title: "",
            date: "",
            issueNumber: "",
            category: "School Update",
            views: 0,
            coverImage: "",
            imageLink: "",
            pdfLink: "",
            excerpt: "",
            content: "",
            isPublished: true,
          },
        )}

      {activeSchoolSubTab === "gallery" &&
        renderCollectionEditor(
          "eventGallery",
          "Event Gallery",
          [
            { key: "title", label: "Gallery Title" },
            { key: "eventDate", label: "Event Date", type: "date" },
            { key: "category", label: "Category" },
            { key: "imageUrl", label: "Image 1 URL" },
            { key: "imageUrl2", label: "Image 2 URL" },
            { key: "imageUrl3", label: "Image 3 URL" },
            { key: "imageUrl4", label: "Image 4 URL" },
            { key: "imageLink", label: "Image Click Link" },
          ],
          {
            title: "",
            eventDate: "",
            category: "Events",
            imageUrl: "",
            imageUrl2: "",
            imageUrl3: "",
            imageUrl4: "",
            imageLink: "",
          },
        )}

      {activeSchoolSubTab === "clubs" && schoolData.schoolCode !== "NSS" && schoolData.schoolCode !== "NCC" &&
        renderCollectionEditor(
          "clubs",
          "Clubs & Societies",
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
        )}
    </div>
  );
};

  const renderNssTab = () => {
    return (
      <div className="space-y-4">
        {/* Header Panel */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">NSS</span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">National Service Scheme (NSS) Management</h2>
              <p className="text-sm text-slate-500">Configure overview text, coordinator details, core council list, and program units.</p>
            </div>
          </div>
          <button
            onClick={handleSaveSchool}
            disabled={isSchoolSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSchoolSaving ? "Saving..." : "Save NSS Settings"}
          </button>
        </div>

        {/* Dynamic sub-tab rendering */}
        {activeNssSubTab === "basic" && (
          <div className="space-y-4">
            {/* Overview & Basic Info Card */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">NSS Overview & Basic Settings</h3>
              <div className="space-y-4">
                <Field label="NSS Name">
                  <input
                    className={inputClass}
                    value={schoolData.schoolName || ""}
                    onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolName: e.target.value }))}
                  />
                </Field>
                <Field label="NSS Description / Mission Statement">
                  <textarea
                    className={`${inputClass} min-h-28`}
                    value={schoolData.schoolDescription || ""}
                    onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolDescription: e.target.value }))}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Official Website Link">
                    <input
                      className={inputClass}
                      value={schoolData.websiteUrl || ""}
                      onChange={(e) => setSchoolData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                    />
                  </Field>
                  <Field label="Volunteer Registration Link">
                    <input
                      className={inputClass}
                      value={schoolData.email || ""}
                      onChange={(e) => setSchoolData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Coordinator Details Card */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">NSS Coordinator Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Coordinator Name">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.name || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, name: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Designation">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.designation || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, designation: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Department">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.department || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, department: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Tenure (e.g. 2025 - Present)">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.tenure || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, tenure: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.email || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, email: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Image URL">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.image || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, image: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="LinkedIn Profile">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.linkedin || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, linkedin: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Twitter Profile">
                  <input
                    className={inputClass}
                    value={schoolData.coordinator?.twitter || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        coordinator: { ...prev.coordinator, twitter: e.target.value }
                      }))
                    }
                  />
                </Field>
              </div>
            </div>

            {/* Social Media Links Card */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">Social Media Links</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Field label="Facebook Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.facebook || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Twitter / X Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.twitter || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Instagram Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.instagram || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="YouTube Channel URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.youtube || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, youtube: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="LinkedIn Page URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.linkedin || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))
                    }
                  />
                </Field>
              </div>
            </div>
          </div>
        )}

        {activeNssSubTab === "council" && (
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">NSS Core Council Members</h3>
                <p className="text-xs text-slate-500">Add, edit, or remove members in the NSS Core Council.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter Member Name:");
                  if (!name) return;
                  const role = prompt("Enter Role (e.g. Vice President):");
                  const email = prompt("Enter Email:");
                  const image = prompt("Enter Image URL:");
                  const achievements = prompt("Enter Achievements (comma separated):");
                  const newMember = { name, role, email, image, achievements };
                  setSchoolData((prev) => ({
                    ...prev,
                    coreCouncil: [...(prev.coreCouncil || []), newMember]
                  }));
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add Member
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-600">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-700">
                    <th className="px-4 py-3">Photo</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Achievements</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(schoolData.coreCouncil || []).map((member, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <img src={member.image || "/placeholder.svg"} className="h-10 w-10 rounded-full object-cover border border-slate-200" alt="" />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">{member.name}</td>
                      <td className="px-4 py-3">{member.role}</td>
                      <td className="px-4 py-3">{member.email}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate">{member.achievements}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const name = prompt("Enter Member Name:", member.name) || member.name;
                              const role = prompt("Enter Role:", member.role) || member.role;
                              const email = prompt("Enter Email:", member.email) || member.email;
                              const image = prompt("Enter Image URL:", member.image) || member.image;
                              const achievements = prompt("Enter Achievements:", member.achievements) || member.achievements;
                              const updated = { name, role, email, image, achievements };
                              setSchoolData((prev) => {
                                const list = [...prev.coreCouncil];
                                list[idx] = updated;
                                return { ...prev, coreCouncil: list };
                              });
                            }}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove ${member.name}?`)) {
                                setSchoolData((prev) => ({
                                  ...prev,
                                  coreCouncil: prev.coreCouncil.filter((_, i) => i !== idx)
                                }));
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(schoolData.coreCouncil || []).length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">No members configured in the council list.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeNssSubTab === "units" && (
          <div className={cardClass}>
            <h3 className="mb-4 text-base font-semibold text-slate-900">NSS Units (Units 1 to 6)</h3>
            <div className="space-y-6">
              {(schoolData.units || []).map((unit, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/50 p-4">
                  <div className="mb-4 border-b border-slate-200 pb-2">
                    <span className="text-sm font-bold text-slate-800">Unit {unit.unitNumber || idx + 1}</span>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
                      <span className="text-xs font-semibold text-indigo-600">Programme Officer</span>
                      <Field label="Officer Name">
                        <input
                          className={inputClass}
                          value={unit.programOfficer?.name || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              programOfficer: { ...units[idx].programOfficer, name: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                      <Field label="Officer Department">
                        <input
                          className={inputClass}
                          value={unit.programOfficer?.department || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              programOfficer: { ...units[idx].programOfficer, department: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                      <Field label="Officer Image URL">
                        <input
                          className={inputClass}
                          value={unit.programOfficer?.image || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              programOfficer: { ...units[idx].programOfficer, image: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                    </div>

                    <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-3">
                      <span className="text-xs font-semibold text-indigo-600">Faculty Mentor</span>
                      <Field label="Mentor Name">
                        <input
                          className={inputClass}
                          value={unit.facultyMentor?.name || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              facultyMentor: { ...units[idx].facultyMentor, name: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                      <Field label="Mentor Department">
                        <input
                          className={inputClass}
                          value={unit.facultyMentor?.department || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              facultyMentor: { ...units[idx].facultyMentor, department: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                      <Field label="Mentor Image URL">
                        <input
                          className={inputClass}
                          value={unit.facultyMentor?.image || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = {
                              ...units[idx],
                              facultyMentor: { ...units[idx].facultyMentor, image: e.target.value }
                            };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                    </div>

                    <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
                      <Field label="Convenors (comma separated names)">
                        <input
                          className={inputClass}
                          value={unit.convenors || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = { ...units[idx], convenors: e.target.value };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                      <Field label="Co-Convenors (comma separated names)">
                        <input
                          className={inputClass}
                          value={unit.coConvenors || ""}
                          onChange={(e) => {
                            const units = [...schoolData.units];
                            units[idx] = { ...units[idx], coConvenors: e.target.value };
                            setSchoolData(prev => ({ ...prev, units }));
                          }}
                        />
                      </Field>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeNssSubTab === "events" &&
          renderCollectionEditor(
            "events",
            "NSS Events",
            [
              { key: "title", label: "Event Title" },
              { key: "date", label: "Date", type: "date" },
              { key: "venue", label: "Venue" },
              { key: "organizer", label: "Organizer" },
              { key: "image", label: "Image URL" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            {
              title: "",
              date: "",
              venue: "",
              organizer: "NSS Unit",
              image: "",
              description: "",
            }
          )}

        {activeNssSubTab === "notices" &&
          renderCollectionEditor(
            "notices",
            "NSS Notices",
            [
              { key: "title", label: "Notice Title" },
              { key: "date", label: "Date", type: "date" },
              { key: "priority", label: "Priority" },
              { key: "pdfUrl", label: "PDF Document URL" },
              { key: "content", label: "Content", type: "textarea" },
            ],
            {
              title: "",
              date: "",
              priority: "medium",
              pdfUrl: "",
              content: "",
            }
          )}

        {activeNssSubTab === "gallery" &&
          renderCollectionEditor(
            "eventGallery",
            "NSS Event Gallery",
            [
              { key: "title", label: "Gallery Title" },
              { key: "eventDate", label: "Event Date", type: "date" },
              { key: "imageUrl", label: "Image URL" },
            ],
            {
              title: "",
              eventDate: "",
              imageUrl: "",
            }
          )}
      </div>
    );
  };

  const renderNccTab = () => {
    return (
      <div className="space-y-4">
        {/* Header Panel */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="rounded-lg bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">NCC</span>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">National Cadet Corps (NCC) Management</h2>
              <p className="text-sm text-slate-500">Configure overview text, ANO details, cadet leadership, and platoons.</p>
            </div>
          </div>
          <button
            onClick={handleSaveSchool}
            disabled={isSchoolSaving}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {isSchoolSaving ? "Saving..." : "Save NCC Settings"}
          </button>
        </div>

        {/* Dynamic sub-tab rendering */}
        {activeNccSubTab === "basic" && (
          <div className="space-y-4">
            {/* Overview & Basic Info Card */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">NCC Overview & Basic Settings</h3>
              <div className="space-y-4">
                <Field label="NCC Name">
                  <input
                    className={inputClass}
                    value={schoolData.schoolName || ""}
                    onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolName: e.target.value }))}
                  />
                </Field>
                <Field label="NCC Description / Mission Statement">
                  <textarea
                    className={`${inputClass} min-h-28`}
                    value={schoolData.schoolDescription || ""}
                    onChange={(e) => setSchoolData((prev) => ({ ...prev, schoolDescription: e.target.value }))}
                  />
                </Field>
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Official Website Link">
                    <input
                      className={inputClass}
                      value={schoolData.websiteUrl || ""}
                      onChange={(e) => setSchoolData((prev) => ({ ...prev, websiteUrl: e.target.value }))}
                    />
                  </Field>
                  <Field label="Registration Link">
                    <input
                      className={inputClass}
                      value={schoolData.email || ""}
                      onChange={(e) => setSchoolData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Associate NCC Officer (ANO) Details */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">Associate NCC Officer (ANO) Details</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="ANO Name">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.name || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, name: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Designation">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.designation || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, designation: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Email Address">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.email || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, email: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.phone || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, phone: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Service Record (e.g. 15 years in Army)">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.serviceRecord || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, serviceRecord: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Image URL">
                  <input
                    className={inputClass}
                    value={schoolData.anoDetails?.image || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        anoDetails: { ...prev.anoDetails, image: e.target.value }
                      }))
                    }
                  />
                </Field>
                <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
                  <Field label="Qualifications (comma separated)">
                    <input
                      className={inputClass}
                      value={schoolData.anoDetails?.qualifications || ""}
                      onChange={(e) =>
                        setSchoolData((prev) => ({
                          ...prev,
                          anoDetails: { ...prev.anoDetails, qualifications: e.target.value }
                        }))
                      }
                    />
                  </Field>
                  <Field label="Awards & Commendations (comma separated)">
                    <input
                      className={inputClass}
                      value={schoolData.anoDetails?.awards || ""}
                      onChange={(e) =>
                        setSchoolData((prev) => ({
                          ...prev,
                          anoDetails: { ...prev.anoDetails, awards: e.target.value }
                        }))
                      }
                    />
                  </Field>
                </div>
              </div>
            </div>

            {/* Social Media Links Card */}
            <div className={cardClass}>
              <h3 className="mb-4 text-base font-semibold text-slate-900">Social Media Links</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Field label="Facebook Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.facebook || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Twitter / X Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.twitter || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="Instagram Profile URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.instagram || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="YouTube Channel URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.youtube || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, youtube: e.target.value }
                      }))
                    }
                  />
                </Field>
                <Field label="LinkedIn Page URL">
                  <input
                    className={inputClass}
                    value={schoolData.socialMedia?.linkedin || ""}
                    onChange={(e) =>
                      setSchoolData((prev) => ({
                        ...prev,
                        socialMedia: { ...prev.socialMedia, linkedin: e.target.value }
                      }))
                    }
                  />
                </Field>
              </div>
            </div>
          </div>
        )}

        {activeNccSubTab === "leaders" && (
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">NCC Cadet Leadership</h3>
                <p className="text-xs text-slate-500">Configure the cadet leadership hierarchy.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter Cadet Name:");
                  if (!name) return;
                  const rank = prompt("Enter Rank (e.g. CUO, CSM):");
                  const year = prompt("Enter Academic Year:");
                  const program = prompt("Enter Study Program:");
                  const email = prompt("Enter Email:");
                  const image = prompt("Enter Image URL:");
                  const achievements = prompt("Enter Achievements (comma separated):");
                  const newLeader = { name, rank, year, program, email, image, achievements };
                  setSchoolData((prev) => ({
                    ...prev,
                    cadetLeaders: [...(prev.cadetLeaders || []), newLeader]
                  }));
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add Cadet Leader
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-600">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-700">
                    <th className="px-4 py-3">Photo</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Rank</th>
                    <th className="px-4 py-3">Details</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Achievements</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(schoolData.cadetLeaders || []).map((leader, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3">
                        <img src={leader.image || "/placeholder.svg"} className="h-10 w-10 rounded-full object-cover border border-slate-200" alt="" />
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-900">{leader.name}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-800">{leader.rank}</span>
                      </td>
                      <td className="px-4 py-3">{leader.year} • {leader.program}</td>
                      <td className="px-4 py-3">{leader.email}</td>
                      <td className="px-4 py-3 max-w-[200px] truncate">{leader.achievements}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const name = prompt("Enter Name:", leader.name) || leader.name;
                              const rank = prompt("Enter Rank:", leader.rank) || leader.rank;
                              const year = prompt("Enter Year:", leader.year) || leader.year;
                              const program = prompt("Enter Program:", leader.program) || leader.program;
                              const email = prompt("Enter Email:", leader.email) || leader.email;
                              const image = prompt("Enter Image URL:", leader.image) || leader.image;
                              const achievements = prompt("Enter Achievements:", leader.achievements) || leader.achievements;
                              const updated = { name, rank, year, program, email, image, achievements };
                              setSchoolData((prev) => {
                                const list = [...prev.cadetLeaders];
                                list[idx] = updated;
                                return { ...prev, cadetLeaders: list };
                              });
                            }}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove ${leader.name}?`)) {
                                setSchoolData((prev) => ({
                                  ...prev,
                                  cadetLeaders: prev.cadetLeaders.filter((_, i) => i !== idx)
                                }));
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(schoolData.cadetLeaders || []).length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">No cadet leaders configured.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeNccSubTab === "platoons" && (
          <div className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900">NCC Platoon Structure</h3>
                <p className="text-xs text-slate-500">Configure platoon strengths, commanders, and focus areas.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const name = prompt("Enter Platoon Name (e.g. Alpha Platoon):");
                  if (!name) return;
                  const cadets = Number(prompt("Enter Number of Cadets:")) || 0;
                  const commander = prompt("Enter Commander Name:");
                  const focus = prompt("Enter Focus Area:");
                  const newPlatoon = { name, cadets, commander, focus };
                  setSchoolData((prev) => ({
                    ...prev,
                    platoons: [...(prev.platoons || []), newPlatoon]
                  }));
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
              >
                <Plus className="h-3.5 w-3.5" /> Add Platoon
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm text-slate-600">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase text-slate-700">
                    <th className="px-4 py-3">Platoon Name</th>
                    <th className="px-4 py-3">Cadets Count</th>
                    <th className="px-4 py-3">Commander</th>
                    <th className="px-4 py-3">Focus Area</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(schoolData.platoons || []).map((platoon, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-800">{platoon.name}</td>
                      <td className="px-4 py-3 font-medium text-slate-900">{platoon.cadets}</td>
                      <td className="px-4 py-3">{platoon.commander}</td>
                      <td className="px-4 py-3">
                        <span className="rounded bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">{platoon.focus}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              const name = prompt("Enter Platoon Name:", platoon.name) || platoon.name;
                              const cadets = Number(prompt("Enter Cadets Count:", platoon.cadets)) || platoon.cadets;
                              const commander = prompt("Enter Commander Name:", platoon.commander) || platoon.commander;
                              const focus = prompt("Enter Focus:", platoon.focus) || platoon.focus;
                              const updated = { name, cadets, commander, focus };
                              setSchoolData((prev) => {
                                const list = [...prev.platoons];
                                list[idx] = updated;
                                return { ...prev, platoons: list };
                              });
                            }}
                            className="text-slate-500 hover:text-slate-900"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Remove Platoon ${platoon.name}?`)) {
                                setSchoolData((prev) => ({
                                  ...prev,
                                  platoons: prev.platoons.filter((_, i) => i !== idx)
                                }));
                              }
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {(schoolData.platoons || []).length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-slate-400">No platoons configured.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeNccSubTab === "events" &&
          renderCollectionEditor(
            "events",
            "NCC Events",
            [
              { key: "title", label: "Event Title" },
              { key: "date", label: "Date", type: "date" },
              { key: "venue", label: "Venue" },
              { key: "organizer", label: "Organizer" },
              { key: "image", label: "Image URL" },
              { key: "description", label: "Description", type: "textarea" },
            ],
            {
              title: "",
              date: "",
              venue: "",
              organizer: "NCC Platoon",
              image: "",
              description: "",
            }
          )}

        {activeNccSubTab === "notices" &&
          renderCollectionEditor(
            "notices",
            "NCC Notices",
            [
              { key: "title", label: "Notice Title" },
              { key: "date", label: "Date", type: "date" },
              { key: "priority", label: "Priority" },
              { key: "pdfUrl", label: "PDF Document URL" },
              { key: "content", label: "Content", type: "textarea" },
            ],
            {
              title: "",
              date: "",
              priority: "medium",
              pdfUrl: "",
              content: "",
            }
          )}

        {activeNccSubTab === "gallery" &&
          renderCollectionEditor(
            "eventGallery",
            "NCC Event Gallery",
            [
              { key: "title", label: "Gallery Title" },
              { key: "eventDate", label: "Event Date", type: "date" },
              { key: "imageUrl", label: "Image URL" },
            ],
            {
              title: "",
              eventDate: "",
              imageUrl: "",
            }
          )}
      </div>
    );
  };

  /* ── Faculty Registration Requests Tab ── */
  const handleApproveRequest = async (reqId) => {
    setRegActionLoading(`approve-${reqId}`);
    try {
      await approveFacultyRegistration(reqId);
      setMessage("Faculty registration approved. Login credentials sent to their email.");
      setRegReloadToken((p) => p + 1);
      setFacultyReloadToken((p) => p + 1);
    } catch (err) {
      setMessage(`Approve failed: ${getApiErrorMessage(err, "Could not approve request")}`);
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
      setMessage(`Reject failed: ${getApiErrorMessage(err, "Could not reject request")}`);
    } finally {
      setRegActionLoading("");
    }
  };

  const renderFacultyRequestsTab = () => (
    <div className="space-y-4">
      <div className={cardClass}>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Faculty Registration Requests</h2>
            <p className="text-sm text-slate-600">Review and approve faculty registration requests.</p>
          </div>
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
              placeholder="Search by name, email, school..."
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

        {/* Error */}
        {regRequestsError && (
          <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            <AlertTriangle className="mr-1 inline h-4 w-4" /> {regRequestsError}
          </div>
        )}

        {/* Loading */}
        {regRequestsLoading && (
          <div className="py-8 text-center text-sm text-slate-500">Loading requests...</div>
        )}

        {/* Empty */}
        {!regRequestsLoading && regRequests.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            No {regStatusFilter !== "all" ? regStatusFilter : ""} registration requests found.
          </div>
        )}

        {/* Table */}
        {!regRequestsLoading && regRequests.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-slate-500">
                  <th className="px-3 py-2">Name / Designation</th>
                  <th className="px-3 py-2">Category</th>
                  <th className="px-3 py-2">School</th>
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
                    <td className="px-3 py-2.5 text-slate-600 font-semibold uppercase">{req.school_code}</td>
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

  const renderRecruitmentTab = () => {
    const defaultDocumentsText =
      "Extension Notice|Official extension notification|#\nDetailed Advertisement|Complete vacancy details|#";

    return (
      <div className="space-y-4">
        <div className={cardClass}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Recruitment Management</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setRecruitmentEditor({
                    mode: "current",
                    index: null,
                    form: {
                      id: "",
                      categoryType: (recruitmentData.categories || [])[0]?.type || "teaching",
                      label: "",
                      title: "",
                      ref: "",
                      date: "",
                      status: "active",
                      documentsText: defaultDocumentsText,
                    },
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-3.5 w-3.5" /> Add Current
              </button>
              <button
                type="button"
                onClick={() =>
                  setRecruitmentEditor({
                    mode: "archived",
                    index: null,
                    form: {
                      id: "",
                      year: "",
                      title: "",
                      ref: "",
                      date: "",
                      status: "archived",
                      documentsText: "Archived Advertisement|Official archived recruitment notice|#",
                    },
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                <Plus className="h-3.5 w-3.5" /> Add Archived
              </button>
            </div>
          </div>

          {isRecruitmentLoading ? (
            <div className="mb-3 rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
              Loading recruitments from backend API...
            </div>
          ) : null}

          {recruitmentApiError ? (
            <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
              API Error: {recruitmentApiError}
            </div>
          ) : null}

          <FilterBar
            searchValue={recruitmentFilter}
            onSearchChange={setRecruitmentFilter}
            searchPlaceholder="Search recruitment title, reference, year..."
            onClear={() => setRecruitmentFilter("")}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Current Recruitment Tabs</h3>
              <div className="max-h-[430px] space-y-2 overflow-y-auto pr-1">
                {filteredRecruitmentCurrentItems.map((item) => (
                  <div key={`${item.categoryType}-${item.id}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">{item.categoryTitle} • {item.ref} • {item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setRecruitmentEditor({
                              mode: "current",
                              index: null,
                              form: {
                                id: item.id,
                                categoryType: item.categoryType,
                                label: item.label || "",
                                title: item.title || "",
                                ref: item.ref || "",
                                date: item.date || "",
                                status: item.status || "active",
                                documentsText: formatRecruitmentDocuments(item.documents),
                              },
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRecruitmentCurrent(item)}
                          className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="mb-3 text-sm font-semibold text-slate-900">Archived Recruitment Years</h3>
              <div className="max-h-[430px] space-y-2 overflow-y-auto pr-1">
                {filteredRecruitmentArchivedItems.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500">Year {item.year} • {item.ref} • {item.date}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setRecruitmentEditor({
                              mode: "archived",
                              index: null,
                              form: {
                                id: item.id,
                                year: item.year || "",
                                title: item.title || "",
                                ref: item.ref || "",
                                date: item.date || "",
                                status: "archived",
                                documentsText: formatRecruitmentDocuments(item.documents),
                              },
                            })
                          }
                          className="inline-flex items-center gap-1 rounded-md border border-slate-300 bg-white px-2 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
                        >
                          <Pencil className="h-3.5 w-3.5" /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteRecruitmentArchived(item)}
                          className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={cardClass}>
          {recruitmentEditor.form ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900">
                  {recruitmentEditor.mode === "archived" ? "Edit Archived Recruitment" : "Edit Current Recruitment"}
                </h3>
                <button
                  type="button"
                  onClick={() => setRecruitmentEditor({ mode: null, index: null, form: null })}
                  className="text-xs font-medium text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {recruitmentEditor.mode === "current" ? (
                  <Field label="Category Type">
                    <select
                      className={inputClass}
                      value={recruitmentEditor.form.categoryType || "teaching"}
                      onChange={(e) =>
                        setRecruitmentEditor((prev) => ({
                          ...prev,
                          form: { ...prev.form, categoryType: e.target.value },
                        }))
                      }
                    >
                      {(recruitmentData.categories || []).map((category) => (
                        <option key={category.type} value={category.type}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </Field>
                ) : (
                  <Field label="Year">
                    <input
                      className={inputClass}
                      value={recruitmentEditor.form.year || ""}
                      onChange={(e) =>
                        setRecruitmentEditor((prev) => ({ ...prev, form: { ...prev.form, year: e.target.value } }))
                      }
                    />
                  </Field>
                )}

                <Field label="Tab Label">
                  <input
                    className={inputClass}
                    value={recruitmentEditor.form.label || ""}
                    onChange={(e) =>
                      setRecruitmentEditor((prev) => ({ ...prev, form: { ...prev.form, label: e.target.value } }))
                    }
                    placeholder="Example: Assistant Professor's"
                  />
                </Field>

                <Field label="Title">
                  <input
                    className={inputClass}
                    value={recruitmentEditor.form.title || ""}
                    onChange={(e) =>
                      setRecruitmentEditor((prev) => ({ ...prev, form: { ...prev.form, title: e.target.value } }))
                    }
                  />
                </Field>

                <Field label="Reference Number">
                  <input
                    className={inputClass}
                    value={recruitmentEditor.form.ref || ""}
                    onChange={(e) =>
                      setRecruitmentEditor((prev) => ({ ...prev, form: { ...prev.form, ref: e.target.value } }))
                    }
                  />
                </Field>

                <Field label="Published Date">
                  <input
                    className={inputClass}
                    type="date"
                    value={recruitmentEditor.form.date || ""}
                    onChange={(e) =>
                      setRecruitmentEditor((prev) => ({ ...prev, form: { ...prev.form, date: e.target.value } }))
                    }
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label="Documents (one per line format: Name|Description|URL)">
                  <textarea
                    className={`${inputClass} min-h-32`}
                    value={recruitmentEditor.form.documentsText || ""}
                    onChange={(e) =>
                      setRecruitmentEditor((prev) => ({
                        ...prev,
                        form: { ...prev.form, documentsText: e.target.value },
                      }))
                    }
                  />
                </Field>
              </div>

              <button
                type="button"
                onClick={saveRecruitmentEditor}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Save Recruitment Data
              </button>
            </>
          ) : (
            <div className="flex min-h-[170px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-500">
              Select a current or archived recruitment entry to edit.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-4">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
        <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-80 lg:shrink-0 lg:self-start">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Admin Navigation</h2>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <div key={tab.id} className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                        isActive ? "bg-slate-900 text-white shadow" : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>

                    {tab.id === "school" && isActive && selectedSchoolId && (
                      <div className="relative ml-2 mt-2 space-y-2 pl-5">
                        <div className="pointer-events-none absolute bottom-2 left-1 top-2 w-1 rounded-full bg-gradient-to-b from-blue-200 via-indigo-200 to-sky-200" />
                        {schoolContentTabs.map((subTab) => {
                          const SubIcon = subTab.icon;
                          const isSubActive = activeSchoolSubTab === subTab.id;
                          return (
                            <button
                              key={subTab.id}
                              type="button"
                              onClick={() => setActiveSchoolSubTab(subTab.id)}
                              className={`group relative flex w-full items-center gap-2 rounded-2xl border px-3 py-2.5 text-left text-xs font-semibold transition-all duration-200 ${
                                isSubActive
                                  ? "border-blue-400 bg-blue-50 text-slate-900 shadow-sm"
                                  : "border-transparent bg-slate-50/70 text-slate-600 hover:border-slate-200 hover:bg-white hover:text-slate-900"
                              }`}
                            >
                              <span
                                className={`absolute -left-[18px] h-2.5 w-2.5 rounded-full ring-4 ring-white transition ${
                                  isSubActive ? "bg-blue-500" : "bg-slate-300 group-hover:bg-slate-400"
                                }`}
                              />
                              <SubIcon className={`h-3.5 w-3.5 ${isSubActive ? "text-blue-600" : "text-slate-500"}`} />
                              {subTab.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-auto rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mt-2 space-y-2">
                <button
                  onClick={exportBackup}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Download className="h-4 w-4" /> Export Backup
                </button>
                {/* <button
                  onClick={() => backupInputRef.current?.click()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <Upload className="h-4 w-4" /> Import Backup
                </button> */}
                <input
                  ref={backupInputRef}
                  type="file"
                  accept="application/json"
                  onChange={importBackup}
                  className="hidden"
                />
                <button
                  onClick={saveAll}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  <Save className="h-4 w-4" /> Save All
                </button>
                {/* <button
                  onClick={resetAll}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  <RotateCcw className="h-4 w-4" /> Reset
                </button> */}
                <button
                  onClick={() => {
                    clearPortalSession();
                    navigate("/login");
                  }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 space-y-6 lg:w-[80%]">
          {activeTab === "overview" && (
            <section className="space-y-6">
              <section className={cardClass}>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-slate-600">
                  Manage your school data, faculty profiles, and user accounts all in one place.
                </p>
              </section>

              <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {summary.map((item) => (
                  <div key={item.label} className={cardClass}>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{item.label}</p>
                    <p className="mt-2 text-2xl font-bold text-slate-900">{item.value}</p>
                  </div>
                ))}
              </section>

              <div className={cardClass}>
                <h2 className="mb-4 text-lg font-semibold text-slate-900">What You Can Control</h2>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 inline-flex rounded-lg bg-blue-100 p-2 text-blue-700"><KeyRound className="h-4 w-4" /></div>
                    <p className="font-semibold text-slate-900">User Management</p>
                    <p className="mt-1 text-sm text-slate-600">Generate login IDs/passwords for admin, school, and faculty users.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 inline-flex rounded-lg bg-green-100 p-2 text-green-700"><Users className="h-4 w-4" /></div>
                    <p className="font-semibold text-slate-900">Faculty Management</p>
                    <p className="mt-1 text-sm text-slate-600">Create and update faculty profiles directly from admin panel.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 inline-flex rounded-lg bg-indigo-100 p-2 text-indigo-700"><School className="h-4 w-4" /></div>
                    <p className="font-semibold text-slate-900">School Content</p>
                    <p className="mt-1 text-sm text-slate-600">Manage events, news, notices, newsletters, and gallery data.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 inline-flex rounded-lg bg-orange-100 p-2 text-orange-700"><FileText className="h-4 w-4" /></div>
                    <p className="font-semibold text-slate-900">Tender Management</p>
                    <p className="mt-1 text-sm text-slate-600">Create tenders with full fields and auto archive after closing date + 1 day.</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="mb-2 inline-flex rounded-lg bg-violet-100 p-2 text-violet-700"><BriefcaseBusiness className="h-4 w-4" /></div>
                    <p className="font-semibold text-slate-900">Recruitment Management</p>
                    <p className="mt-1 text-sm text-slate-600">Update recruitment categories, tabs, archived years, and documents for the public page.</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className={cardClass}>
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <h3 className="text-base font-semibold text-slate-900">System Health Checks</h3>
                  </div>
                  <div className="space-y-2">
                    {healthChecks.map((item) => (
                      <div key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-sm font-medium text-slate-800">{item.title}</p>
                          <span
                            className={`rounded-full px-2 py-1 text-xs font-semibold ${
                              item.status === "warning"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {item.value}
                          </span>
                        </div>
                        {item.detail ? <p className="mt-1 text-xs text-slate-500">{item.detail}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={cardClass}>
                  <div className="mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <h3 className="text-base font-semibold text-slate-900">Recent Activity</h3>
                  </div>
                  {activityLog.length ? (
                    <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
                      {activityLog.map((log) => (
                        <div key={log.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-sm font-medium text-slate-800">{log.action}</p>
                          <p className="mt-1 text-xs text-slate-500">{new Date(log.time).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                      No recent activity yet. Actions will appear here.
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {activeTab === "accounts" && renderAccountsTab()}
          {activeTab === "faculty" && renderFacultyTab()}
          {activeTab === "faculty-requests" && renderFacultyRequestsTab()}
          {activeTab === "school" && renderSchoolTab()}
          {activeTab === "nss" && renderNssTab()}
          {activeTab === "ncc" && renderNccTab()}
          {activeTab === "tenders" && renderTendersTab()}
          {activeTab === "recruitment" && renderRecruitmentTab()}
          {activeTab === "bookings" && renderBookingsTab()}
          {activeTab === "dac" && renderDacTab()}
        </main>
      </div>

      {/* Toast Notification */}
      {message && (() => {
        const isError = String(message).toLowerCase().includes("fail") || 
                        String(message).toLowerCase().includes("error") || 
                        String(message).toLowerCase().includes("decline") ||
                        String(message).toLowerCase().includes("invalid");
        return (
          <div className={`fixed top-4 right-4 z-[9999] max-w-sm w-full bg-white/95 backdrop-blur-md border ${isError ? "border-rose-200 bg-rose-50/90" : "border-emerald-200 bg-emerald-50/90"} shadow-2xl rounded-2xl p-4 flex items-start gap-3 animate-toast-in`}>
            <div className={`rounded-full p-1.5 flex-shrink-0 ${isError ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
              {isError ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900">{isError ? "Operation Failed" : "Success"}</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5 leading-relaxed">{message}</p>
            </div>
            <button
              type="button"
              onClick={() => setMessage("")}
              className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })()}
    </div>
  );
};

export default AdminDashboard;
