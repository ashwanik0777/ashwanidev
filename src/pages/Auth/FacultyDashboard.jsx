import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import SidebarNav from "../../components/faculty/dashboard/SidebarNav";
import TopSummary from "../../components/faculty/dashboard/TopSummary";
import ProfileForms from "../../components/faculty/dashboard/ProfileForms";
import TabDataEditors from "../../components/faculty/dashboard/TabDataEditors";
import ProfilePreview from "../../components/faculty/dashboard/ProfilePreview";
import {
  deepClone,
  FACULTY_SIDEBAR_SECTIONS,
  parseCommaList,
} from "../../components/faculty/dashboard/constants";
import { clearPortalSession, getPortalSession } from "../../utils/portalSession";
import {
  fetchMyFacultyProfile,
  updateMyFacultyProfile,
} from "../../services/facultyDashboardService";

const getDefaultProfile = () => ({
  name: "", designation: "", department: "", school: "", email: "", phone: "",
  experience_years: 0, publications: 0, education: "", shortBio: "", fullBio: "",
  office: "", image_url: "", faculty_url: "", cv: "", googleScholar: "", orcid: "",
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

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(() => getDefaultProfile());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newAreaTitle, setNewAreaTitle] = useState("");
  const [newAreaDesc, setNewAreaDesc] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [linkedFacultyId, setLinkedFacultyId] = useState("");

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
          const tabData = {};
          Object.keys(defaults.tabData).forEach((key) => {
            tabData[key] = {
              ...defaults.tabData[key],
              ...(rawTabData[key] || {})
            };
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
          setLinkedFacultyId(data.id || "");
        }
      } catch (err) {
        console.warn("Could not load profile from backend, using defaults:", err?.response?.status || err.message);
        // If 404, faculty profile not linked yet - show defaults
        setMessage(
          err?.response?.status === 404
            ? "⚠️ No faculty profile linked to your account. Contact admin to set up your profile."
            : ""
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

  const summary = useMemo(
    () => [
      { label: "Experience", value: `${profile.experience_years || 0} years` },
      { label: "Publications", value: profile.publications || 0 },
      { label: "Department", value: profile.department || "-" },
      { label: "School", value: profile.school || "-" },
    ],
    [profile]
  );

  const updateField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
    setMessage("");
  };

  const updateTags = (value) => {
    setTagsInput(value);
    setProfile((prev) => ({ ...prev, tags: parseCommaList(value) }));
    setMessage("");
  };

  const updateResearchArea = (index, key, value) => {
    setProfile((prev) => {
      const updated = [...(prev.researchAreas || [])];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, researchAreas: updated };
    });
    setMessage("");
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
    setMessage("");
  };

  const removeResearchArea = (index) => {
    setProfile((prev) => ({
      ...prev,
      researchAreas: (prev.researchAreas || []).filter((_, i) => i !== index),
    }));
    setMessage("");
  };

  const replaceTabDataSection = (sectionKey, sectionValue) => {
    setProfile((prev) => ({
      ...prev,
      tabData: {
        ...(prev.tabData || {}),
        [sectionKey]: sectionValue,
      },
    }));
    setMessage("");
  };

  const handleSave = useCallback(async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload = {
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
        phone: profile.phone,
        email: profile.email,
        department: profile.department,
        school: profile.school,
        tags: profile.tags || [],
        researchAreas: profile.researchAreas || [],
        tabData: profile.tabData || {},
      };

      const updated = await updateMyFacultyProfile(payload);
      if (updated) {
        setProfile((prev) => ({ ...prev, ...updated }));
        setMessage("Profile saved successfully to database!");
      }
    } catch (err) {
      console.error("Save failed:", err);
      const errMsg = err?.response?.data?.message || err.message || "Unknown error";
      setMessage(`Save failed: ${errMsg}`);
    } finally {
      setSaving(false);
    }
  }, [profile]);

  const facultyPublicId = linkedFacultyId || "";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your faculty profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto flex w-full max-w-[98%] flex-col gap-6 lg:flex-row">
        <SidebarNav
          sections={FACULTY_SIDEBAR_SECTIONS}
          activeSection={activeSection}
          onSelect={setActiveSection}
          onSave={handleSave}
          onViewPublic={() => facultyPublicId ? navigate(`/academics/faculty/${facultyPublicId}`) : alert("Profile not linked yet.")}
          onLogout={() => {
            clearPortalSession();
            navigate("/login");
          }}
        />

        <div className="flex-1 space-y-6 lg:w-[80%]">
          <TopSummary
            profile={profile}
            summary={summary}
            message={message}
            onSave={handleSave}
            onOpenPublic={() => facultyPublicId ? navigate(`/academics/faculty/${facultyPublicId}`) : alert("Profile not linked yet.")}
            showStats={activeSection === "dashboard"}
          />

          {saving && (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-sm text-blue-700 font-medium flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700" />
              Saving to database...
            </div>
          )}

          {/* Render forms conditionally based on activeSection */}
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
              onUpdateTabDataField={(key, val) => {
                setProfile((prev) => ({
                  ...prev,
                  tabData: {
                    ...(prev.tabData || {}),
                    [key]: val
                  }
                }));
              }}
            />
          )}

          {["qualifications", "teaching", "administration", "research-projects", "publications", "certifications", "talks", "awards", "other"].includes(activeSection) && (
            <TabDataEditors
              tabData={profile.tabData || {}}
              activeSection={activeSection}
              onReplaceTabData={replaceTabDataSection}
            />
          )}

          {activeSection === "profile-preview" && (
            <ProfilePreview profile={profile} />
          )}

          {activeSection === "dashboard" && (
            <div className="rounded-2xl border border-stone-300 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-stone-900 mb-2">Welcome to your Faculty Profile Portal</h2>
              <p className="text-sm text-stone-600 mb-4">
                Use the sidebar navigation tabs to update your personal details, stats, external profile links, and detail tabs.
              </p>
              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-stone-800">Need to preview your page?</h4>
                  <p className="text-xs text-stone-500">See how your public profile looks to students and visitors.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection("profile-preview")}
                  className="rounded-lg bg-stone-950 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-850 self-start sm:self-center"
                >
                  Go to Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
