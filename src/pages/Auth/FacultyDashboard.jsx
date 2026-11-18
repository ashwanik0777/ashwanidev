import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, CheckCircle, X } from "lucide-react";

import SidebarNav from "../../components/faculty/dashboard/SidebarNav";
import TopSummary from "../../components/faculty/dashboard/TopSummary";
import ProfileForms from "../../components/faculty/dashboard/ProfileForms";
import TabDataEditors from "../../components/faculty/dashboard/TabDataEditors";
import DashboardOverview from "../../components/faculty/dashboard/DashboardOverview";
import {
  FACULTY_SIDEBAR_SECTIONS,
  SECTION_TITLES,
  cardClass,
  parseCommaList,
  HOD_EXTRA_SECTIONS,
  VC_EXTRA_SECTIONS
} from "../../components/faculty/dashboard/constants";
import { getSectionCounts } from "../../components/faculty/dashboard/profileStats";
import ConfirmModal from "../../components/ui/ConfirmModal";
import { getGrievanceRole } from "../../utils/portalSession";
import { logoutPortalSession } from "../../services/sessionManager";
import MaintenanceComplaintForm from "../../components/grievance/maintenance/MaintenanceComplaintForm";
import MyMaintenanceTickets from "../../components/grievance/maintenance/MyMaintenanceTickets";
import MaintenanceOverview from "../../components/grievance/maintenance/MaintenanceOverview";
import NotificationBell from "../../components/grievance/maintenance/NotificationBell";
import {
  fetchMyFacultyProfile,
  updateMyFacultyProfile,
} from "../../services/facultyDashboardService";

const TAB_DATA_SECTIONS = ["qualifications", "teaching", "administration", "research-projects", "publications", "certifications", "talks", "awards", "other"];

const getDefaultProfile = () => ({
  name: "", designation: "", department: "", school: "", email: "", phone: "",
  experience_years: 0, publications: 0, education: "", shortBio: "", fullBio: "",
  office: "", image_url: "", faculty_url: "", cv: "", googleScholar: "", orcid: "", linkedin: "",
  tags: [], researchAreas: [], tabData: {
    talksCount: 0,
    projectsCount: 0,
    qualifications: { qualifications: [], experience: [] },
    teaching: { philosophy: "", courses: [] },
    administration: { administrativeRoles: [], committees: [] },
    researchProjects: { projects: [] },
    researchGroup: { phdScholars: [], postdocs: [], researchAssistants: [] },
    publications: { publications: [], patents: [] },
    patents: { patents: [] },
    certifications: { certifications: [], professionalDevelopment: [] },
    talks: { invitedTalks: [] },
    awards: { awards: [] },
    socialImpact: { socialActivities: [] },
    other: { message: "" }
  }
});

/**
 * Strips empty/blank entries from all arrays inside tabData before saving.
 * An entry is considered "empty" if every meaningful field in it is blank/falsy.
 * This prevents ghost rows from being saved when a user adds a new row but
 * never fills in any data.
 */
const sanitizeTabData = (rawTabData) => {
  if (!rawTabData || typeof rawTabData !== "object") return {};

  /** Returns true if a value is "empty" (null, undefined, empty string, 0, empty array). */
  const isEmpty = (v) => {
    if (v === null || v === undefined || v === "") return true;
    if (typeof v === "number" && v === 0) return true;
    if (Array.isArray(v) && v.length === 0) return true;
    if (typeof v === "string" && !v.trim()) return true;
    return false;
  };

  /** Fields to skip when checking if a row is "meaningfully filled". */
  const metaFields = new Set(["type", "status", "level", "role", "ranking", "quartile"]);

  /** Returns true if an object has at least one real (non-meta) field with content. */
  const hasContent = (obj) => {
    if (!obj || typeof obj !== "object") return false;
    return Object.entries(obj).some(([key, val]) => {
      if (metaFields.has(key)) return false;
      if (Array.isArray(val)) return val.some((item) => typeof item === "string" ? item.trim() : !!item);
      return !isEmpty(val);
    });
  };

  const cleaned = {};
  for (const [sectionKey, sectionVal] of Object.entries(rawTabData)) {
    if (sectionVal === null || sectionVal === undefined) continue;

    // Primitive values (talksCount, projectsCount, etc.) — keep as-is
    if (typeof sectionVal !== "object") {
      cleaned[sectionKey] = sectionVal;
      continue;
    }

    // Section is an object with sub-keys that may be arrays
    const cleanedSection = {};
    for (const [subKey, subVal] of Object.entries(sectionVal)) {
      if (Array.isArray(subVal)) {
        // Filter out entries where ALL meaningful fields are empty
        cleanedSection[subKey] = subVal.filter((item) => hasContent(item));
      } else {
        // Keep scalar/string values (e.g. philosophy, message)
        cleanedSection[subKey] = subVal;
      }
    }
    cleaned[sectionKey] = cleanedSection;
  }
  return cleaned;
};

// What the save sends. Also used to tell whether anything changed since the last load or save.
// Department, school and email are left out: this API does not change them.
const buildPayload = (profile) => ({
  name: profile.name,
  designation: profile.designation,
  specialization: profile.specialization,
  experience_years: profile.experience_years || 0,
  publications: profile.publications || 0,
  education: profile.education,
  shortBio: profile.shortBio,
  fullBio: profile.fullBio,
  office: profile.office,
  image_url: profile.image_url,
  faculty_url: profile.faculty_url,
  cv: profile.cv,
  googleScholar: profile.googleScholar,
  orcid: profile.orcid,
  linkedin: profile.linkedin,
  phone: profile.phone,
  tags: profile.tags || [],
  researchAreas: (profile.researchAreas || []).filter(
    (area) => (area.title && area.title.trim()) || (area.description && area.description.trim())
  ),
  tabData: sanitizeTabData(profile.tabData),
});

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const [profile, setProfile] = useState(() => getDefaultProfile());
  const [savedSnapshot, setSavedSnapshot] = useState(null);
  const [notice, setNotice] = useState("");
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");
  const [newAreaDesc, setNewAreaDesc] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [linkedFacultyId, setLinkedFacultyId] = useState("");
  const [grievanceRefreshKey, setGrievanceRefreshKey] = useState(0);
  const [notificationTicket, setNotificationTicket] = useState(null);

  // Grievance role (vc / hod) from the JWT access token
  const grievanceRole = getGrievanceRole();

  // Build dynamic sidebar sections based on grievance role
  const dynamicSections = useMemo(() => {
    let sections = [...FACULTY_SIDEBAR_SECTIONS];
    if (grievanceRole === 'hod') sections = [...sections, ...HOD_EXTRA_SECTIONS];
    else if (grievanceRole === 'vc') sections = [...sections, ...VC_EXTRA_SECTIONS];
    return sections;
  }, [grievanceRole]);

  const showToast = useCallback((type, text) => {
    setToast({ type, text, key: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Load profile from backend on mount
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const data = await fetchMyFacultyProfile();
        if (data) {
          const defaults = getDefaultProfile();
          const rawTabData = data.tabData || {};

          // Carefully merge each section to ensure lists are initialized
          const tabData = { ...rawTabData };
          Object.keys(defaults.tabData).forEach((key) => {
            const defaultVal = defaults.tabData[key];
            const rawVal = rawTabData[key];
            if (typeof defaultVal === "object" && defaultVal !== null && !Array.isArray(defaultVal)) {
              tabData[key] = {
                ...defaultVal,
                ...(rawVal || {})
              };
            } else {
              tabData[key] = rawVal !== undefined ? rawVal : defaultVal;
            }
          });

          const merged = {
            ...defaults,
            ...data,
            tabData,
            researchAreas: Array.isArray(data.researchAreas)
              ? data.researchAreas
              : defaults.researchAreas,
          };
          setProfile(merged);
          setSavedSnapshot(JSON.stringify(buildPayload(merged)));
          setLinkedFacultyId(data.id || "");
        }
      } catch (err) {
        console.warn("Could not load profile from backend, using defaults:", err?.response?.status || err.message);
        setNotice(
          err?.response?.status === 404
            ? "No faculty profile is linked to your account yet. Please contact the admin to set up your profile."
            : "Your profile could not be loaded. Please refresh the page; if it keeps happening, contact the admin."
        );
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    setTagsInput(Array.isArray(profile.tags) ? profile.tags.join(", ") : "");
  }, [profile.tags]);

  const isDirty = useMemo(
    () => savedSnapshot !== null && JSON.stringify(buildPayload(profile)) !== savedSnapshot,
    [profile, savedSnapshot]
  );

  // Warn before closing or reloading the tab with unsaved edits.
  useEffect(() => {
    if (!isDirty) return undefined;
    const warn = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const sectionCounts = useMemo(() => getSectionCounts(profile), [profile]);

  const selectSection = (sectionId) => {
    setActiveSection(sectionId);
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  };

  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const updateTags = (value) => {
    setTagsInput(value);
    setProfile((prev) => ({ ...prev, tags: parseCommaList(value) }));
  };

  const updateResearchArea = (index, key, value) => {
    setProfile((prev) => {
      const updated = [...(prev.researchAreas || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, researchAreas: updated };
    });
  };

  const addResearchArea = () => {
    if (!newAreaTitle.trim() || !newAreaDesc.trim()) return;
    setProfile((prev) => ({
      ...prev,
      researchAreas: [
        ...(prev.researchAreas || []),
        { title: newAreaTitle.trim(), description: newAreaDesc.trim() },
      ],
    }));
    setNewAreaTitle("");
    setNewAreaDesc("");
  };

  const removeResearchArea = (index) => {
    setProfile((prev) => ({
      ...prev,
      researchAreas: (prev.researchAreas || []).filter((_, i) => i !== index),
    }));
  };

  const replaceTabDataSection = (sectionKey, sectionValue) => {
    setProfile((prev) => ({
      ...prev,
      tabData: {
        ...(prev.tabData || {}),
        [sectionKey]: sectionValue,
      },
    }));
  };

  const handleSave = useCallback(async () => {
    if (saving) return;
    setSaving(true);
    try {
      const updated = await updateMyFacultyProfile(buildPayload(profile));
      if (updated) {
        const merged = {
          ...profile,
          ...updated,
          tabData: {
            ...(profile.tabData || {}),
            ...(updated.tabData || {}),
          },
        };
        setProfile(merged);
        setSavedSnapshot(JSON.stringify(buildPayload(merged)));
        showToast("success", "Profile saved. Your public page now shows these changes.");
      }
    } catch (err) {
      console.error("Save failed:", err);
      // A 401 here means even the refresh token is gone — the API client already
      // retried once with a fresh access token before giving up.
      if (err?.response?.status === 401) {
        showToast("error", "Your session has expired. Please log in again — your unsaved edits are still on screen.");
      } else {
        const errMsg = err?.response?.data?.message || err.message || "Unknown error";
        showToast("error", `Save failed: ${errMsg}`);
      }
    } finally {
      setSaving(false);
    }
  }, [profile, saving, showToast]);

  // Ctrl+S / Cmd+S saves, as people expect from an editor.
  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        handleSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSave]);

  // Opens in a new tab so unsaved edits here are not lost.
  const openPublicProfile = () => {
    if (!linkedFacultyId) {
      showToast("error", "Your public profile is not linked yet. Please contact the admin.");
      return;
    }
    window.open(`/academics/faculty/${linkedFacultyId}`, "_blank", "noopener");
  };

  const logout = () => {
    logoutPortalSession();
    navigate("/login", { replace: true });
  };

  const handleLogout = () => {
    if (!isDirty) {
      logout();
      return;
    }
    setConfirmDialog({
      isOpen: true,
      title: "Leave without saving?",
      message: "You have changes that are not saved yet. If you log out now, they will be lost.",
      confirmText: "Log out anyway",
      onConfirm: () => {
        setConfirmDialog({ isOpen: false });
        logout();
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your faculty profile...</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-slate-100 p-2 md:p-4 lg:h-screen lg:overflow-hidden">
      <div className="flex h-full w-full flex-col gap-4 lg:flex-row lg:gap-6">
        <SidebarNav
          sections={dynamicSections}
          activeSection={activeSection}
          onSelect={selectSection}
          onViewPublic={openPublicProfile}
          onLogout={handleLogout}
          profile={profile}
          counts={sectionCounts}
          isDirty={isDirty}
          saving={saving}
          onSave={handleSave}
        />

        <main ref={mainRef} className="custom-scrollbar min-w-0 flex-1 space-y-6 pb-6 lg:overflow-y-auto lg:pr-2">
          {/* The dashboard has nothing to edit, so its page goes without the title/save bar. */}
          {activeSection !== "dashboard" && (
            <TopSummary
              title={SECTION_TITLES[activeSection] || SECTION_TITLES.dashboard}
              isDirty={isDirty}
              saving={saving}
              onSave={handleSave}
            />
          )}

          {notice && (
            <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <p>{notice}</p>
            </div>
          )}

          {toast && (
            <div
              key={toast.key}
              role="status"
              className={`fixed inset-x-3 top-3 z-[9999] flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg backdrop-blur-md animate-toast-in sm:inset-x-auto sm:right-4 sm:top-4 sm:max-w-md sm:px-5 sm:py-3.5 ${
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

          {activeSection === "dashboard" && (
            <DashboardOverview profile={profile} onNavigate={selectSection} onOpenPublic={openPublicProfile} />
          )}

          {activeSection === "personal-details" && (
            <ProfileForms
              activeSection={activeSection}
              profile={profile}
              tagsInput={tagsInput}
              onUpdateField={updateField}
              onUpdateTags={updateTags}
              onUpdateResearchArea={updateResearchArea}
              onAddResearchArea={addResearchArea}
              onRemoveResearchArea={removeResearchArea}
              newAreaTitle={newAreaTitle}
              newAreaDesc={newAreaDesc}
              setNewAreaTitle={setNewAreaTitle}
              setNewAreaDesc={setNewAreaDesc}
            />
          )}

          {TAB_DATA_SECTIONS.includes(activeSection) && (
            <TabDataEditors
              tabData={profile.tabData || {}}
              activeSection={activeSection}
              onReplaceTabData={replaceTabDataSection}
            />
          )}

          {activeSection === "grievance" && (
            <div className="space-y-6">
              <div className={cardClass}>
                <div className="mb-6 flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-bold tracking-tight text-slate-900">Report a Maintenance Problem</h2>
                  <NotificationBell onOpenTicket={setNotificationTicket} />
                </div>
                <MaintenanceComplaintForm onSubmitted={() => setGrievanceRefreshKey((key) => key + 1)} />
              </div>
              <div className={cardClass}>
                <h2 className="mb-4 font-display text-lg font-bold tracking-tight text-slate-900">My Complaints</h2>
                <MyMaintenanceTickets
                  refreshKey={grievanceRefreshKey}
                  openTicketId={notificationTicket}
                  onOpenTicket={setNotificationTicket}
                />
              </div>
            </div>
          )}

          {activeSection === "grievance-overview" && grievanceRole === 'vc' && (
            <MaintenanceOverview
              title="Vice Chancellor Overview"
              subtitle="Read-only view of all faculty maintenance complaints across the university."
              accentClass="bg-blue-600"
            />
          )}

          {activeSection === "grievance-overview" && grievanceRole === 'hod' && (
            <MaintenanceOverview
              title="Department Maintenance Complaints"
              subtitle="Read-only view of complaints raised by faculty of your department."
              accentClass="bg-slate-800"
            />
          )}

          <ConfirmModal
            isOpen={confirmDialog.isOpen}
            title={confirmDialog.title}
            message={confirmDialog.message}
            confirmText={confirmDialog.confirmText}
            onConfirm={confirmDialog.onConfirm}
            onCancel={() => setConfirmDialog({ isOpen: false })}
          />
        </main>
      </div>
    </div>
  );
};

export default FacultyDashboard;
