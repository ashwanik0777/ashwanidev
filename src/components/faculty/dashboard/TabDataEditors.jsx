import React from "react";
import {
  Plus,
  Trash2
} from "lucide-react";
import Field from "./Field";
import { inputClass } from "./constants";
import ImageUploadField from "../../ui/ImageUploadField";

const TabDataEditors = ({ tabData = {}, activeSection, onReplaceTabData }) => {
  // Local helper to safely update sections in tabData
  const updateSectionKey = (sectionKey, subKey, value) => {
    const currentSection = tabData[sectionKey] || {};
    const updatedSection = {
      ...currentSection,
      [subKey]: value
    };
    onReplaceTabData(sectionKey, updatedSection);
  };

  // Generic array helpers
  const handleUpdateArrayItem = (sectionKey, subKey, index, field, value) => {
    const currentSection = tabData[sectionKey] || {};
    const list = [...(currentSection[subKey] || [])];
    list[index] = {
      ...list[index],
      [field]: value
    };
    updateSectionKey(sectionKey, subKey, list);
  };

  const handleAddArrayItem = (sectionKey, subKey, template) => {
    const currentSection = tabData[sectionKey] || {};
    const list = [...(currentSection[subKey] || [])];
    list.push({ ...template });
    updateSectionKey(sectionKey, subKey, list);
    
    // Sync patents to publications.patents and vice-versa
    if (sectionKey === "patents" && subKey === "patents") {
      const pubSection = tabData["publications"] || {};
      onReplaceTabData("publications", { ...pubSection, patents: list });
    }
  };

  const handleRemoveArrayItem = (sectionKey, subKey, index) => {
    const currentSection = tabData[sectionKey] || {};
    const list = (currentSection[subKey] || []).filter((_, i) => i !== index);
    updateSectionKey(sectionKey, subKey, list);

    // Sync patents to publications.patents and vice-versa
    if (sectionKey === "patents" && subKey === "patents") {
      const pubSection = tabData["publications"] || {};
      onReplaceTabData("publications", { ...pubSection, patents: list });
    }
  };

  // Helper for array responsibilities string -> list parsing
  const getListValue = (val) => {
    if (Array.isArray(val)) return val.join("\n");
    return val || "";
  };

  const setListValue = (val) => {
    return val.split("\n").map(r => r.trim()).filter(Boolean);
  };

  // Render Sub-tab Editors
  const renderSubTabContent = () => {
    switch (activeSection) {
      case "qualifications": {
        const section = tabData.qualifications || {};
        const qualifications = section.qualifications || [];
        const experience = section.experience || [];

        return (
          <div className="space-y-6">
            {/* Qualifications */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Educational Qualifications</h3>
                  <p className="text-xs text-stone-500">Add your degrees and academic qualifications.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("qualifications", "qualifications", {
                    degree: "", institution: "", specialization: "", year: "", location: "", type: "doctorate"
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Degree
                </button>
              </div>

              <div className="space-y-4">
                {qualifications.map((item, index) => (
                  <div key={`qual-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Degree #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("qualifications", "qualifications", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Degree Name"><input className={inputClass} value={item.degree || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "degree", e.target.value)} placeholder="e.g. Ph.D" /></Field>
                      <Field label="Institution"><input className={inputClass} value={item.institution || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "institution", e.target.value)} placeholder="e.g. IIT Delhi" /></Field>
                      <Field label="Specialization"><input className={inputClass} value={item.specialization || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "specialization", e.target.value)} placeholder="e.g. Computer Science" /></Field>
                      <Field label="Year"><input className={inputClass} value={item.year || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "year", e.target.value)} placeholder="e.g. 2021" /></Field>
                      <Field label="Location"><input className={inputClass} value={item.location || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "location", e.target.value)} placeholder="e.g. New Delhi, India" /></Field>
                      <Field label="Degree Type">
                        <select className={inputClass} value={item.type || "doctorate"} onChange={(e) => handleUpdateArrayItem("qualifications", "qualifications", index, "type", e.target.value)}>
                          <option value="doctorate">Doctorate</option>
                          <option value="masters">Masters</option>
                          <option value="bachelors">Bachelors</option>
                          <option value="academic">Academic</option>
                          <option value="other">Other</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
                {qualifications.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No degrees added yet.</p>}
              </div>
            </div>

            {/* Experience */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Professional Experience</h3>
                  <p className="text-xs text-stone-500">Add your academic, research, or industry experience.</p>
                </div>
                <button
                  type="button"
                   onClick={() => handleAddArrayItem("qualifications", "experience", {
                    position: "", department: "", institution: "", type: "academic", from: "", to: "", responsibilities: []
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Experience
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((item, index) => (
                  <div key={`exp-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Experience #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("qualifications", "experience", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Designation / Position"><input className={inputClass} value={item.position || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "position", e.target.value)} placeholder="e.g. Assistant Professor" /></Field>
                      <Field label="Department"><input className={inputClass} value={item.department || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "department", e.target.value)} placeholder="e.g. CSE" /></Field>
                      <Field label="Institution / Company"><input className={inputClass} value={item.institution || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "institution", e.target.value)} placeholder="e.g. GBU, Greater Noida" /></Field>
                      <Field label="From Year/Month"><input type="month" className={inputClass} value={item.from || ""} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "from", e.target.value)} /></Field>
                      <Field label="To Year/Month (or Present)">
                        <div className="flex gap-2 items-center">
                          <input
                            type={item.to === "Present" ? "text" : "month"}
                            className={inputClass}
                            value={item.to || ""}
                            onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "to", e.target.value)}
                            disabled={item.to === "Present"}
                            placeholder="Select month or mark Present"
                          />
                          <label className="flex items-center gap-1 text-xs text-stone-600 whitespace-nowrap cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={item.to === "Present"}
                              onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "to", e.target.checked ? "Present" : "")}
                              className="rounded border-stone-300"
                            />
                            Present
                          </label>
                        </div>
                      </Field>
                      <Field label="Type">
                        <select className={inputClass} value={item.type || "academic"} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "type", e.target.value)}>
                          <option value="academic">Academic</option>
                          <option value="research">Research</option>
                          <option value="industrial">Industrial</option>
                          <option value="other">Other</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Responsibilities (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.responsibilities)} onChange={(e) => handleUpdateArrayItem("qualifications", "experience", index, "responsibilities", setListValue(e.target.value))} placeholder="e.g. Teaching Operating Systems&#10;Research in Distributed Systems" />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {experience.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No experiences added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "teaching": {
        const section = tabData.teaching || {};
        const courses = section.courses || [];
        const philosophy = section.philosophy || "";

        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-base font-semibold text-stone-800">Teaching Philosophy</h3>
              <p className="mb-3 text-xs text-stone-500">Describe your teaching values, methods, and pedagogical approach.</p>
              <Field label="Philosophy Statement">
                <textarea
                  className={`${inputClass} min-h-24`}
                  value={philosophy}
                  onChange={(e) => updateSectionKey("teaching", "philosophy", e.target.value)}
                  placeholder="Share how you inspire students..."
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Courses Taught</h3>
                  <p className="text-xs text-stone-500">Add graduate or undergraduate courses you have instructed.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("teaching", "courses", {
                    code: "", title: "", level: "Undergraduate", credits: 0
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Course
                </button>
              </div>

              <div className="space-y-4">
                {courses.map((item, index) => (
                  <div key={`course-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Course #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("teaching", "courses", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <Field label="Course Title"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("teaching", "courses", index, "title", e.target.value)} placeholder="e.g. Software Engineering" /></Field>
                      <Field label="Course Code"><input className={inputClass} value={item.code || ""} onChange={(e) => handleUpdateArrayItem("teaching", "courses", index, "code", e.target.value)} placeholder="e.g. CS-301" /></Field>
                      <Field label="Course Level">
                        <select className={inputClass} value={item.level || "Undergraduate"} onChange={(e) => handleUpdateArrayItem("teaching", "courses", index, "level", e.target.value)}>
                          <option value="Undergraduate">Undergraduate</option>
                          <option value="Postgraduate">Postgraduate</option>
                          <option value="Integrated UG Plus PG">Integrated UG Plus PG</option>
                          <option value="Doctoral">Doctoral</option>
                          <option value="Other">Other</option>
                        </select>
                      </Field>
                      <Field label="Credits"><input className={inputClass} type="number" min="0" value={item.credits ?? 0} onChange={(e) => handleUpdateArrayItem("teaching", "courses", index, "credits", Number(e.target.value || 0))} placeholder="e.g. 4" /></Field>
                    </div>

                    {/* Lecture Slides */}
                    <div className="mt-4 pt-3 border-t border-stone-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-xs font-semibold text-stone-600 uppercase tracking-wider">Lecture Slides</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const currentSlides = item.slides || [];
                            const updatedCourses = [...courses];
                            updatedCourses[index] = { ...item, slides: [...currentSlides, { title: "", url: "" }] };
                            onReplaceTabData("teaching", { ...section, courses: updatedCourses });
                          }}
                          className="inline-flex items-center gap-1 rounded-md bg-stone-100 px-2 py-1 text-xs font-medium text-stone-700 hover:bg-stone-200 border border-stone-200"
                        >
                          <Plus className="h-3 w-3" /> Add Slide
                        </button>
                      </div>
                      {(item.slides || []).length === 0 && (
                        <p className="text-xs text-stone-400 text-center py-2">No lecture slides added for this course.</p>
                      )}
                      <div className="space-y-2">
                        {(item.slides || []).map((slide, sIdx) => (
                          <div key={`slide-${index}-${sIdx}`} className="flex items-start gap-2 p-2 rounded-md bg-white border border-stone-200">
                            <div className="flex-1 grid gap-2 sm:grid-cols-2">
                              <input className={inputClass} value={slide.title || ""} onChange={(e) => {
                                const updatedCourses = [...courses];
                                const updatedSlides = [...(item.slides || [])];
                                updatedSlides[sIdx] = { ...updatedSlides[sIdx], title: e.target.value };
                                updatedCourses[index] = { ...item, slides: updatedSlides };
                                onReplaceTabData("teaching", { ...section, courses: updatedCourses });
                              }} placeholder="Slide title" />
                              <input className={inputClass} value={slide.url || ""} onChange={(e) => {
                                const updatedCourses = [...courses];
                                const updatedSlides = [...(item.slides || [])];
                                updatedSlides[sIdx] = { ...updatedSlides[sIdx], url: e.target.value };
                                updatedCourses[index] = { ...item, slides: updatedSlides };
                                onReplaceTabData("teaching", { ...section, courses: updatedCourses });
                              }} placeholder="URL (Google Drive / link)" />
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const updatedCourses = [...courses];
                                const updatedSlides = [...(item.slides || [])];
                                updatedSlides.splice(sIdx, 1);
                                updatedCourses[index] = { ...item, slides: updatedSlides };
                                onReplaceTabData("teaching", { ...section, courses: updatedCourses });
                              }}
                              className="mt-1 rounded-md p-1.5 text-rose-500 hover:bg-rose-50"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No courses added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "administration": {
        const section = tabData.administration || {};
        const administrativeRoles = section.administrativeRoles || [];
        const committees = section.committees || [];

        return (
          <div className="space-y-6">
            {/* Roles */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Administrative Roles</h3>
                  <p className="text-xs text-stone-500">List official positions held (e.g. Dean, HOD, Coordinator).</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("administration", "administrativeRoles", {
                    role: "", level: "University", startYear: "", endYear: "",
                    department: "", institution: "", status: "ongoing"
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Role
                </button>
              </div>

              <div className="space-y-4">
                {administrativeRoles.map((item, index) => (
                  <div key={`admin-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Role #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("administration", "administrativeRoles", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Role Title"><input className={inputClass} value={item.role || ""} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "role", e.target.value)} placeholder="e.g. Dean Academics" /></Field>
                      <Field label="Start Month/Year">
                        <input type="month" className={inputClass} value={item.startYear && item.startYear !== "Present" ? item.startYear : ""} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "startYear", e.target.value)} />
                      </Field>
                      <Field label="End Month/Year">
                        <div className="flex flex-col gap-2">
                          <input 
                            type="month"
                            className={`${inputClass} disabled:opacity-50 disabled:bg-gray-100`}
                            value={item.endYear === "Present" ? "" : (item.endYear || "")} 
                            disabled={item.endYear === "Present"}
                            onChange={(e) => {
                              const val = e.target.value;
                              const currentSection = tabData.administration || {};
                              const list = [...(currentSection.administrativeRoles || [])];
                              list[index] = { ...list[index], endYear: val, status: val ? "completed" : "ongoing" };
                              onReplaceTabData("administration", { ...currentSection, administrativeRoles: list });
                            }} 
                          />
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input 
                              type="checkbox" 
                              checked={item.endYear === "Present"}
                              onChange={(e) => {
                                const isPresent = e.target.checked;
                                const currentSection = tabData.administration || {};
                                const list = [...(currentSection.administrativeRoles || [])];
                                list[index] = { 
                                  ...list[index], 
                                  endYear: isPresent ? "Present" : "", 
                                  status: isPresent ? "ongoing" : "completed" 
                                };
                                onReplaceTabData("administration", { ...currentSection, administrativeRoles: list });
                              }}
                            />
                            Present (Ongoing)
                          </label>
                        </div>
                      </Field>
                      <Field label="Scope Level">
                        <select className={inputClass} value={item.level || "University"} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "level", e.target.value)}>
                          <option value="University">University Level</option>
                          <option value="School">School Level</option>
                          <option value="Department">Department Level</option>
                          <option value="External">External Body</option>
                        </select>
                      </Field>
                      <Field label="Department / School"><input className={inputClass} value={item.department || ""} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "department", e.target.value)} placeholder="e.g. School of ICT" /></Field>
                      <Field label="Institution / Body"><input className={inputClass} value={item.institution || ""} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "institution", e.target.value)} placeholder="e.g. Gautam Buddha University" /></Field>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "ongoing"} onChange={(e) => handleUpdateArrayItem("administration", "administrativeRoles", index, "status", e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
                {administrativeRoles.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No roles added yet.</p>}
              </div>
            </div>

            {/* Committees */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Committee Memberships</h3>
                  <p className="text-xs text-stone-500">Committees or boards you participate in (e.g. Board of Studies, Academic Council).</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("administration", "committees", {
                    name: "", designation: "Member", startYear: "", endYear: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Committee
                </button>
              </div>

              <div className="space-y-4">
                {committees.map((item, index) => (
                  <div key={`comm-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Committee #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("administration", "committees", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Committee Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("administration", "committees", index, "name", e.target.value)} placeholder="e.g. Board of Studies (CSE)" /></Field>
                      <Field label="Designation / Position"><input className={inputClass} value={item.designation || ""} onChange={(e) => handleUpdateArrayItem("administration", "committees", index, "designation", e.target.value)} placeholder="e.g. Chairperson" /></Field>
                      <Field label="Start Month/Year">
                        <input type="month" className={inputClass} value={item.startYear && item.startYear !== "Present" ? item.startYear : ""} onChange={(e) => handleUpdateArrayItem("administration", "committees", index, "startYear", e.target.value)} />
                      </Field>
                      <Field label="End Month/Year">
                        <div className="flex flex-col gap-2">
                          <input 
                            type="month"
                            className={`${inputClass} disabled:opacity-50 disabled:bg-gray-100`}
                            value={item.endYear === "Present" ? "" : (item.endYear || "")} 
                            disabled={item.endYear === "Present"}
                            onChange={(e) => handleUpdateArrayItem("administration", "committees", index, "endYear", e.target.value)} 
                          />
                          <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input 
                              type="checkbox" 
                              checked={item.endYear === "Present"}
                              onChange={(e) => handleUpdateArrayItem("administration", "committees", index, "endYear", e.target.checked ? "Present" : "")}
                            />
                            Present (Ongoing)
                          </label>
                        </div>
                      </Field>
                    </div>
                  </div>
                ))}
                {committees.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No committees added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "research-projects": {
        const projSection = tabData.researchProjects || {};
        const projects = projSection.projects || [];
        const groupSection = tabData.researchGroup || {};
        const phdScholars = groupSection.phdScholars || [];
        const postdocs = groupSection.postdocs || [];
        const researchAssistants = groupSection.researchAssistants || [];

        return (
          <div className="space-y-6">
            {/* Research & Consultancy Projects */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Research &amp; Consultancy Projects</h3>
                  <p className="text-xs text-stone-500">List funded research schemes or corporate consultancies.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("researchProjects", "projects", {
                    title: "", role: "Principal Investigator", fundingAgency: "", grantAmount: "",
                    duration: "", status: "ongoing", description: "", collaborators: [], deliverables: []
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Project
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((item, index) => (
                  <div key={`proj-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Project #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("researchProjects", "projects", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Project Title"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "title", e.target.value)} placeholder="e.g. AI-driven Traffic Management" /></Field>
                      <Field label="Funding Agency"><input className={inputClass} value={item.fundingAgency || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "fundingAgency", e.target.value)} placeholder="e.g. DST, Govt of India" /></Field>
                      <Field label="Grant Amount"><input className={inputClass} value={item.grantAmount || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "grantAmount", e.target.value)} placeholder="e.g. Rs. 25 Lakhs" /></Field>
                      <Field label="Duration"><input className={inputClass} value={item.duration || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "duration", e.target.value)} placeholder="e.g. 3 Years" /></Field>
                      <Field label="Role"><input className={inputClass} value={item.role || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "role", e.target.value)} placeholder="e.g. Principal Investigator" /></Field>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "ongoing"} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "status", e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Project Description">
                          <textarea className={`${inputClass} min-h-16`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "description", e.target.value)} placeholder="Provide a brief abstract/scope of the project..." />
                        </Field>
                      </div>
                      <div className="sm:col-span-2 md:col-span-3 grid gap-3 sm:grid-cols-2">
                        <Field label="Collaborators (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.collaborators)} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "collaborators", setListValue(e.target.value))} placeholder="e.g. Dr. A. Sharma, IIT Delhi&#10;Prof. R. Verma, GBU" />
                        </Field>
                        <Field label="Key Deliverables (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.deliverables)} onChange={(e) => handleUpdateArrayItem("researchProjects", "projects", index, "deliverables", setListValue(e.target.value))} placeholder="e.g. Prototype system&#10;2 journal papers" />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No projects added yet.</p>}
              </div>
            </div>

            {/* Research Group Overview */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <h3 className="mb-2 text-base font-semibold text-stone-800">Research Group Overview</h3>
              <p className="mb-3 text-xs text-stone-500">Shown at the top of the Research Group tab on your public profile.</p>
              <Field label="Group Description">
                <textarea
                  className={`${inputClass} min-h-24`}
                  value={groupSection.overview || ""}
                  onChange={(e) => updateSectionKey("researchGroup", "overview", e.target.value)}
                  placeholder="Describe your group's focus areas and how members collaborate..."
                />
              </Field>
            </div>

            {/* PhD Scholars */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">PhD Scholars Guided</h3>
                  <p className="text-xs text-stone-500">PhD scholars under your mentorship.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("researchGroup", "phdScholars", {
                    name: "", topic: "", status: "ongoing", year: "",
                    program: "", researchArea: "", publications: 0, email: "", profileUrl: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add PhD Scholar
                </button>
              </div>

              <div className="space-y-4">
                {phdScholars.map((item, index) => (
                  <div key={`phd-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">PhD Scholar #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("researchGroup", "phdScholars", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <Field label="Scholar Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "name", e.target.value)} placeholder="e.g. Anita Sharma" /></Field>
                      <Field label="Thesis Topic"><input className={inputClass} value={item.topic || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "topic", e.target.value)} placeholder="e.g. Deep Learning in Healthcare" /></Field>
                      <Field label="Research Area"><input className={inputClass} value={item.researchArea || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "researchArea", e.target.value)} placeholder="e.g. Medical Image Analysis" /></Field>
                      <Field label="Programme"><input className={inputClass} value={item.program || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "program", e.target.value)} placeholder="e.g. PhD Computer Science" /></Field>
                      <Field label="Year"><input className={inputClass} value={item.year || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "year", e.target.value)} placeholder="e.g. 2025" /></Field>
                      <Field label="Publications Count"><input className={inputClass} type="number" min="0" value={item.publications ?? 0} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "publications", Number(e.target.value || 0))} placeholder="e.g. 3" /></Field>
                      <Field label="Email"><input className={inputClass} value={item.email || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "email", e.target.value)} placeholder="e.g. scholar@gbu.ac.in" /></Field>
                      <Field label="Profile Link"><input className={inputClass} value={item.profileUrl || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "profileUrl", e.target.value)} placeholder="https://..." /></Field>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "ongoing"} onChange={(e) => handleUpdateArrayItem("researchGroup", "phdScholars", index, "status", e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="submitted">Submitted</option>
                          <option value="awarded">Awarded</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
                {phdScholars.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No PhD scholars added yet.</p>}
              </div>
            </div>

            {/* Postdocs */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Postdoc Fellows</h3>
                  <p className="text-xs text-stone-500">Postdoctoral scholars mentored.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("researchGroup", "postdocs", {
                    name: "", topic: "", status: "ongoing", year: "",
                    program: "", researchArea: "", previousInstitute: "", publications: 0, email: "", profileUrl: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Postdoc
                </button>
              </div>

              <div className="space-y-4">
                {postdocs.map((item, index) => (
                  <div key={`pd-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Postdoc #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("researchGroup", "postdocs", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <Field label="Scholar Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "name", e.target.value)} /></Field>
                      <Field label="Research Topic"><input className={inputClass} value={item.topic || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "topic", e.target.value)} /></Field>
                      <Field label="Research Area"><input className={inputClass} value={item.researchArea || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "researchArea", e.target.value)} placeholder="e.g. Natural Language Processing" /></Field>
                      <Field label="Position"><input className={inputClass} value={item.program || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "program", e.target.value)} placeholder="e.g. Postdoctoral Fellow" /></Field>
                      <Field label="Previous Institute"><input className={inputClass} value={item.previousInstitute || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "previousInstitute", e.target.value)} placeholder="e.g. IIT Kanpur" /></Field>
                      <Field label="Year / Duration"><input className={inputClass} value={item.year || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "year", e.target.value)} /></Field>
                      <Field label="Publications Count"><input className={inputClass} type="number" min="0" value={item.publications ?? 0} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "publications", Number(e.target.value || 0))} /></Field>
                      <Field label="Email"><input className={inputClass} value={item.email || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "email", e.target.value)} /></Field>
                      <Field label="Profile Link"><input className={inputClass} value={item.profileUrl || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "profileUrl", e.target.value)} placeholder="https://..." /></Field>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "ongoing"} onChange={(e) => handleUpdateArrayItem("researchGroup", "postdocs", index, "status", e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
                {postdocs.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No postdoc scholars added yet.</p>}
              </div>
            </div>

            {/* Research Assistants */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Research Assistants / Group Members</h3>
                  <p className="text-xs text-stone-500">RAs or student group members working in your lab.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("researchGroup", "researchAssistants", {
                    name: "", topic: "", status: "ongoing", year: "",
                    program: "", email: "", profileUrl: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add RA / Member
                </button>
              </div>

              <div className="space-y-4">
                {researchAssistants.map((item, index) => (
                  <div key={`ra-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Member #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("researchGroup", "researchAssistants", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                      <Field label="Member Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "name", e.target.value)} /></Field>
                      <Field label="Project / Role"><input className={inputClass} value={item.topic || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "topic", e.target.value)} placeholder="e.g. RA - Data Analytics" /></Field>
                      <Field label="Programme"><input className={inputClass} value={item.program || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "program", e.target.value)} placeholder="e.g. M.Tech CSE" /></Field>
                      <Field label="Year"><input className={inputClass} value={item.year || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "year", e.target.value)} /></Field>
                      <Field label="Email"><input className={inputClass} value={item.email || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "email", e.target.value)} /></Field>
                      <Field label="Profile Link"><input className={inputClass} value={item.profileUrl || ""} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "profileUrl", e.target.value)} placeholder="https://..." /></Field>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "ongoing"} onChange={(e) => handleUpdateArrayItem("researchGroup", "researchAssistants", index, "status", e.target.value)}>
                          <option value="ongoing">Ongoing</option>
                          <option value="completed">Completed</option>
                        </select>
                      </Field>
                    </div>
                  </div>
                ))}
                {researchAssistants.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No research assistants added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "publications": {
        const section = tabData.publications || {};
        const publications = section.publications || [];
        const patentSection = tabData.patents || {};
        const patents = patentSection.patents || [];

        return (
          <div className="space-y-6">
            {/* Publications */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Publications (Journals &amp; Conferences)</h3>
                  <p className="text-xs text-stone-500">Add published articles, reviews, or book chapters.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("publications", "publications", {
                    type: "journal", title: "", year: new Date().getFullYear(), authors: "", publisher: "", keyword: "", doi: "", issn: "", paperUrl: "", pdfUrl: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Publication
                </button>
              </div>

              <div className="space-y-4">
                {publications.map((item, index) => (
                  <div key={`pub-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Publication #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("publications", "publications", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Publication Type">
                        <select className={inputClass} value={item.type || "journal"} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "type", e.target.value)}>
                          <option value="journal">Journal</option>
                          <option value="conference">Conference</option>
                          <option value="book">Book</option>
                          <option value="book chapter">Book Chapter</option>
                        </select>
                      </Field>
                      {item.type !== "book" && item.type !== "book chapter" && (
                        <div className="sm:col-span-2">
                          <Field label="Paper Title"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "title", e.target.value)} placeholder="e.g. A Secure Blockchain Framework for IoT" /></Field>
                        </div>
                      )}
                      <Field label="Year"><input className={inputClass} type="number" value={item.year || new Date().getFullYear()} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "year", Number(e.target.value))} /></Field>
                      <div className="sm:col-span-2">
                        <Field label="Authors"><input className={inputClass} value={item.authors || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "authors", e.target.value)} placeholder="e.g. R. Kumar, A. Sharma" /></Field>
                      </div>
                      <Field label="Publisher"><input className={inputClass} value={item.publisher || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "publisher", e.target.value)} placeholder="e.g. IEEE / Springer" /></Field>
                      <Field label="Keyword"><input className={inputClass} value={item.keyword || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "keyword", e.target.value)} placeholder="e.g. IoT, Blockchain" /></Field>
                      <Field label="DOI"><input className={inputClass} value={item.doi || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "doi", e.target.value)} placeholder="e.g. 10.1109/TCC.2023.123456" /></Field>
                      <Field label="ISSN/ISBN"><input className={inputClass} value={item.issn || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "issn", e.target.value)} placeholder="e.g. 1234-5678" /></Field>

                      {item.type === "journal" && (
                        <>
                          <div className="sm:col-span-2">
                            <Field label="Name of journal"><input className={inputClass} value={item.journalName || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "journalName", e.target.value)} placeholder="e.g. IEEE Transactions on Cloud Computing" /></Field>
                          </div>
                          <Field label="Volume"><input className={inputClass} value={item.volume || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "volume", e.target.value)} placeholder="e.g. Vol 12" /></Field>
                          <Field label="Page no"><input className={inputClass} value={item.pageNo || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "pageNo", e.target.value)} placeholder="e.g. 1-10" /></Field>
                          <Field label="Quartile">
                            <select className={inputClass} value={item.quartile || "None"} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "quartile", e.target.value)}>
                              <option value="None">None</option>
                              <option value="Q1">Q1</option>
                              <option value="Q2">Q2</option>
                              <option value="Q3">Q3</option>
                              <option value="Q4">Q4</option>
                            </select>
                          </Field>
                          <div className="sm:col-span-2 md:col-span-3">
                            <div className="text-xs font-semibold text-stone-700 mb-2">Indexing</div>
                            <div className="flex flex-col sm:flex-row gap-6">
                              <label className="flex items-start gap-2 text-sm mt-1">
                                <input type="checkbox" className="mt-1" checked={item.scopus || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "scopus", e.target.checked)} />
                                Scopus
                              </label>
                              <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 text-sm">
                                  <input type="checkbox" checked={item.wos || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "wos", e.target.checked)} />
                                  Web of Science
                                </label>
                                {item.wos && (
                                  <div className="flex flex-col gap-2 ml-6">
                                    <label className="flex items-center gap-2 text-sm">
                                      <input type="checkbox" checked={item.sci || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "sci", e.target.checked)} /> SCI / SCIE
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                      <input type="checkbox" checked={item.ssci || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "ssci", e.target.checked)} /> SSCI
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                      <input type="checkbox" checked={item.ahci || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "ahci", e.target.checked)} /> AHCI
                                    </label>
                                    <label className="flex items-center gap-2 text-sm">
                                      <input type="checkbox" checked={item.esci || false} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "esci", e.target.checked)} /> ESCI
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {item.type === "conference" && (
                        <>
                          <div className="sm:col-span-2">
                            <Field label="Name of conference"><input className={inputClass} value={item.conferenceName || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "conferenceName", e.target.value)} placeholder="e.g. IEEE CloudSummit" /></Field>
                          </div>
                          <Field label="Location of conference"><input className={inputClass} value={item.location || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "location", e.target.value)} placeholder="e.g. New Delhi, India" /></Field>
                          <Field label="Page no"><input className={inputClass} value={item.pageNo || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "pageNo", e.target.value)} placeholder="e.g. pp. 12-18" /></Field>
                          <Field label="Ranking">
                            <select className={inputClass} value={item.ranking || "None"} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "ranking", e.target.value)}>
                              <option value="None">None</option>
                              <option value="A*">A*</option>
                              <option value="A">A</option>
                              <option value="B">B</option>
                              <option value="C">C</option>
                            </select>
                          </Field>
                        </>
                      )}

                      {item.type === "book chapter" && (
                        <>
                          <div className="sm:col-span-2">
                            <Field label="Title of chapter"><input className={inputClass} value={item.chapterTitle || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "chapterTitle", e.target.value)} placeholder="e.g. Security in IoT" /></Field>
                          </div>
                          <div className="sm:col-span-2">
                            <Field label="Title of book"><input className={inputClass} value={item.bookTitle || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "bookTitle", e.target.value)} placeholder="e.g. Advances in Internet of Things" /></Field>
                          </div>
                          <Field label="Page no"><input className={inputClass} value={item.pageNo || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "pageNo", e.target.value)} placeholder="e.g. pp. 45-60" /></Field>
                        </>
                      )}

                      {item.type === "book" && (
                        <>
                          <div className="sm:col-span-2">
                            <Field label="Title of book"><input className={inputClass} value={item.bookTitle || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "bookTitle", e.target.value)} placeholder="e.g. Handbook of Cloud Computing" /></Field>
                          </div>
                          <Field label="Editor's name"><input className={inputClass} value={item.editorName || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "editorName", e.target.value)} placeholder="e.g. John Doe" /></Field>
                          <Field label="Total page count"><input className={inputClass} type="number" value={item.pageCount || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "pageCount", Number(e.target.value))} placeholder="e.g. 350" /></Field>
                        </>
                      )}

                      <div className="sm:col-span-2 md:col-span-3 grid gap-3 sm:grid-cols-2">
                        <Field label="Paper Link / URL"><input className={inputClass} value={item.paperUrl || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "paperUrl", e.target.value)} placeholder="e.g. https://ieeexplore.ieee.org/document/..." /></Field>
                        <Field label="PDF Link / URL"><input className={inputClass} value={item.pdfUrl || ""} onChange={(e) => handleUpdateArrayItem("publications", "publications", index, "pdfUrl", e.target.value)} placeholder="e.g. https://gbu.ac.in/faculty/pdf/paper.pdf" /></Field>
                      </div>
                    </div>
                  </div>
                ))}
                {publications.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No publications added yet.</p>}
              </div>
            </div>

            {/* Patents */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Patents Portfolio</h3>
                  <p className="text-xs text-stone-500">Add filed, published, or granted patents.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("patents", "patents", {
                    title: "", description: "", status: "Filed", applicationNo: "", technicalField: "", applicationDate: "", country: "India", patentOffice: "Indian Patent Office", filedYear: new Date().getFullYear(), inventors: []
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Patent
                </button>
              </div>

              <div className="space-y-4">
                {patents.map((item, index) => (
                  <div key={`patent-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Patent #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("patents", "patents", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <div className="sm:col-span-2">
                        <Field label="Patent Title"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "title", e.target.value)} /></Field>
                      </div>
                      <Field label="Status">
                        <select className={inputClass} value={item.status || "Filed"} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "status", e.target.value)}>
                          <option value="Filed">Filed</option>
                          <option value="Under Examination">Under Examination</option>
                          <option value="Published">Published</option>
                          <option value="Granted">Granted</option>
                        </select>
                      </Field>
                      <Field label="Application Number"><input className={inputClass} value={item.applicationNo || ""} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "applicationNo", e.target.value)} placeholder="e.g. 202611000000" /></Field>
                      <Field label="Technical Field"><input className={inputClass} value={item.technicalField || ""} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "technicalField", e.target.value)} placeholder="e.g. Computing / IoT" /></Field>
                      <Field label="Filing Date"><input className={inputClass} value={item.applicationDate || ""} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "applicationDate", e.target.value)} placeholder="e.g. May 12, 2026" /></Field>
                      <Field label="Country"><input className={inputClass} value={item.country || "India"} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "country", e.target.value)} /></Field>
                      <Field label="Patent Office"><input className={inputClass} value={item.patentOffice || "Indian Patent Office"} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "patentOffice", e.target.value)} /></Field>
                      <Field label="Filing Year"><input className={inputClass} type="number" value={item.filedYear || new Date().getFullYear()} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "filedYear", Number(e.target.value))} /></Field>
                      
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Inventors Names (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.inventors)} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "inventors", setListValue(e.target.value))} placeholder="e.g. Dr. Rahul Kumar&#10;Dr. Amit Sharma" />
                        </Field>
                      </div>
                      
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Brief Patent Description">
                          <textarea className={`${inputClass} min-h-20`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("patents", "patents", index, "description", e.target.value)} placeholder="Provide a short overview of the patented innovation..." />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {patents.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No patents added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "certifications": {
        const section = tabData.certifications || {};
        const certifications = section.certifications || [];
        const professionalDevelopment = section.professionalDevelopment || [];

        return (
          <div className="space-y-6">
            {/* Certifications */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Certifications &amp; Licenses</h3>
                  <p className="text-xs text-stone-500">Add credentials, online courses certificates, or professional licenses.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("certifications", "certifications", {
                    title: "", issuingOrganization: "", issueDate: "", expirationDate: "",
                    credentialId: "", credentialUrl: "", level: "", skills: [], verified: false
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Certification
                </button>
              </div>

              <div className="space-y-4">
                {certifications.map((item, index) => (
                  <div key={`cert-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Certification #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("certifications", "certifications", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Certification Title"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "title", e.target.value)} placeholder="e.g. AWS Certified Solutions Architect" /></Field>
                      <Field label="Issuing Organization"><input className={inputClass} value={item.issuingOrganization || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "issuingOrganization", e.target.value)} placeholder="e.g. Amazon Web Services" /></Field>
                      <Field label="Issue Date"><input className={inputClass} value={item.issueDate || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "issueDate", e.target.value)} placeholder="e.g. January 2025" /></Field>
                      <Field label="Expiration Date"><input className={inputClass} value={item.expirationDate || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "expirationDate", e.target.value)} placeholder="e.g. January 2028 (or N/A)" /></Field>
                      <Field label="Credential ID"><input className={inputClass} value={item.credentialId || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "credentialId", e.target.value)} placeholder="e.g. AWS-12345" /></Field>
                      <Field label="Credential Link"><input className={inputClass} value={item.credentialUrl || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "credentialUrl", e.target.value)} placeholder="https://..." /></Field>
                      <Field label="Level">
                        <select className={inputClass} value={item.level || ""} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "level", e.target.value)}>
                          <option value="">Not specified</option>
                          <option value="Professional">Professional</option>
                          <option value="Associate">Associate</option>
                          <option value="Specialization">Specialization</option>
                          <option value="Foundation">Foundation</option>
                        </select>
                      </Field>
                      <Field label="Verified Credential">
                        <select className={inputClass} value={item.verified ? "yes" : "no"} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "verified", e.target.value === "yes")}>
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Skills Covered (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.skills)} onChange={(e) => handleUpdateArrayItem("certifications", "certifications", index, "skills", setListValue(e.target.value))} placeholder="e.g. Cloud Architecture&#10;Network Security" />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {certifications.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No certifications added yet.</p>}
              </div>
            </div>

            {/* FDPs */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">FDPs &amp; Professional Development</h3>
                  <p className="text-xs text-stone-500">Faculty Development Programs, workshops, or training attended.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("certifications", "professionalDevelopment", {
                    programName: "", organizer: "", duration: "", year: new Date().getFullYear(), description: "", type: "fdp"
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Program
                </button>
              </div>

              <div className="space-y-4">
                {professionalDevelopment.map((item, index) => (
                  <div key={`fdp-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Program #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("certifications", "professionalDevelopment", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Program Title / Topic"><input className={inputClass} value={item.programName || ""} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "programName", e.target.value)} placeholder="e.g. AI in Education Workshop" /></Field>
                      <Field label="Organizer"><input className={inputClass} value={item.organizer || ""} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "organizer", e.target.value)} placeholder="e.g. NPTEL" /></Field>
                      <Field label="Duration"><input className={inputClass} value={item.duration || ""} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "duration", e.target.value)} placeholder="e.g. 1 Week" /></Field>
                      <Field label="Year"><input className={inputClass} type="number" value={item.year || new Date().getFullYear()} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "year", Number(e.target.value))} /></Field>
                      <Field label="Program Type">
                        <select className={inputClass} value={item.type || "fdp"} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "type", e.target.value)}>
                          <option value="fdp">FDP</option>
                          <option value="workshop">Workshop</option>
                          <option value="conference">Conference</option>
                          <option value="training">Training</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Key Learnings / Description"><textarea className={`${inputClass} min-h-16`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("certifications", "professionalDevelopment", index, "description", e.target.value)} placeholder="Topics covered and outcomes..." /></Field>
                      </div>
                    </div>
                  </div>
                ))}
                {professionalDevelopment.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No programs added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "talks": {
        const section = tabData.talks || {};
        const invitedTalks = section.invitedTalks || [];

        return (
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-stone-800">Invited Talks Delivered</h3>
                <p className="text-xs text-stone-500">List guest lectures, keynotes, or panel invitations you delivered.</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddArrayItem("talks", "invitedTalks", {
                  title: "", event: "", organizer: "", location: "", date: "",
                  type: "invited", description: "", photos: []
                })}
                className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
              >
                <Plus className="h-3.5 w-3.5" /> Add Talk
              </button>
            </div>

            <div className="space-y-4">
              {invitedTalks.map((item, index) => (
                <div key={`talk-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-semibold uppercase text-stone-500">Talk #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem("talks", "invitedTalks", index)}
                      className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Remove
                    </button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                    <div className="sm:col-span-2">
                      <Field label="Talk Title / Topic"><input className={inputClass} value={item.title || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "title", e.target.value)} placeholder="e.g. Cybersecurity Challenges in Smart Cities" /></Field>
                    </div>
                    <Field label="Event Name"><input className={inputClass} value={item.event || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "event", e.target.value)} placeholder="e.g. National Cyber Con" /></Field>
                    <Field label="Organizer"><input className={inputClass} value={item.organizer || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "organizer", e.target.value)} placeholder="e.g. GBU IEEE Student Branch" /></Field>
                    <Field label="Location / Venue"><input className={inputClass} value={item.location || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "location", e.target.value)} placeholder="e.g. Greater Noida, India" /></Field>
                    <Field label="Date"><input className={inputClass} value={item.date || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "date", e.target.value)} placeholder="e.g. January 12, 2026" /></Field>
                    <Field label="Talk Type">
                      <select className={inputClass} value={item.type || "invited"} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "type", e.target.value)}>
                        <option value="invited">Invited Talk</option>
                        <option value="keynote">Keynote</option>
                        <option value="guest-lecture">Guest Lecture</option>
                        <option value="panel">Panel Discussion</option>
                      </select>
                    </Field>
                    <div className="sm:col-span-2 md:col-span-3">
                      <Field label="Talk Description"><textarea className={`${inputClass} min-h-16`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("talks", "invitedTalks", index, "description", e.target.value)} placeholder="What the talk covered..." /></Field>
                      
                      <div className="mt-4">
                        <label className="block text-sm font-semibold mb-2 text-stone-700">Event Photos (Max 4)</label>
                        {/* Display uploaded photos */}
                        {(item.photos && item.photos.length > 0) && (
                          <div className="flex flex-wrap gap-4 mb-4">
                            {item.photos.map((photoUrl, photoIdx) => (
                              <div key={`talk-${index}-photo-${photoIdx}`} className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg border border-stone-200 overflow-hidden shadow-sm group bg-stone-50">
                                <img src={photoUrl} alt="Talk" className="w-full h-full object-cover" />
                                <button 
                                  type="button"
                                  className="absolute top-1.5 right-1.5 bg-red-500/90 hover:bg-red-600 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const newPhotos = item.photos.filter((_, i) => i !== photoIdx);
                                    handleUpdateArrayItem("talks", "invitedTalks", index, "photos", newPhotos);
                                  }}
                                  title="Remove Photo"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* ONE upload option if under limit */}
                        {(!item.photos || item.photos.length < 4) && (
                          <div className="max-w-xs">
                            <ImageUploadField
                              value=""
                              onChange={(url) => {
                                if (url) {
                                  const newPhotos = [...(item.photos || []), url];
                                  handleUpdateArrayItem("talks", "invitedTalks", index, "photos", newPhotos);
                                }
                              }}
                              folder="faculty/talks"
                              label={item.photos && item.photos.length > 0 ? "Add Another Photo" : "Add Photo"}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {invitedTalks.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No invited talks added yet.</p>}
            </div>
          </div>
        );
      }

      case "awards": {
        const section = tabData.awards || {};
        const awards = section.awards || [];
        const socialSection = tabData.socialImpact || {};
        const socialActivities = socialSection.socialActivities || [];

        return (
          <div className="space-y-6">
            {/* Awards & Honors */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Awards &amp; Honors</h3>
                  <p className="text-xs text-stone-500">Record academic recognition, fellowships, or research prizes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("awards", "awards", {
                    name: "", organization: "", year: "", description: "", level: ""
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Award
                </button>
              </div>

              <div className="space-y-4">
                {awards.map((item, index) => (
                  <div key={`award-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Award #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("awards", "awards", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <div className="sm:col-span-2">
                        <Field label="Award Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("awards", "awards", index, "name", e.target.value)} placeholder="e.g. Best Researcher Award" /></Field>
                      </div>
                      <Field label="Awarding Body / Org"><input className={inputClass} value={item.organization || ""} onChange={(e) => handleUpdateArrayItem("awards", "awards", index, "organization", e.target.value)} placeholder="e.g. GBU Research Council" /></Field>
                      <Field label="Year"><input className={inputClass} value={item.year || ""} onChange={(e) => handleUpdateArrayItem("awards", "awards", index, "year", e.target.value)} placeholder="e.g. 2025" /></Field>
                      <Field label="Level">
                        <select className={inputClass} value={item.level || ""} onChange={(e) => handleUpdateArrayItem("awards", "awards", index, "level", e.target.value)}>
                          <option value="">Not specified</option>
                          <option value="International">International</option>
                          <option value="National">National</option>
                          <option value="State">State</option>
                          <option value="University">University</option>
                          <option value="School">School</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Award Description">
                          <textarea className={`${inputClass} min-h-16`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("awards", "awards", index, "description", e.target.value)} placeholder="Brief summary of the honor and research details..." />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {awards.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No awards added yet.</p>}
              </div>
            </div>

            {/* Social Impact */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-stone-800">Social Impact &amp; Outreach</h3>
                  <p className="text-xs text-stone-500">Community projects, public lectures, or CSR activities.</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddArrayItem("socialImpact", "socialActivities", {
                    name: "", organization: "", role: "", duration: "", description: "",
                    location: "", type: "", beneficiaries: "", impact: []
                  })}
                  className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Activity
                </button>
              </div>

              <div className="space-y-4">
                {socialActivities.map((item, index) => (
                  <div key={`social-${index}`} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <div className="mb-3 flex items-center justify-between border-b border-stone-200 pb-2">
                      <span className="text-xs font-semibold uppercase text-stone-500">Activity #{index + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem("socialImpact", "socialActivities", index)}
                        className="inline-flex items-center gap-1 rounded-md border border-rose-200 bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                      <Field label="Activity Name"><input className={inputClass} value={item.name || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "name", e.target.value)} placeholder="e.g. Rural Literacy Campaign" /></Field>
                      <Field label="Organization"><input className={inputClass} value={item.organization || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "organization", e.target.value)} placeholder="e.g. GBU Social Club" /></Field>
                      <Field label="Role / Contribution"><input className={inputClass} value={item.role || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "role", e.target.value)} placeholder="e.g. Organizer / Volunteer" /></Field>
                      <Field label="Duration"><input className={inputClass} value={item.duration || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "duration", e.target.value)} placeholder="e.g. 2 Months" /></Field>
                      <Field label="Location"><input className={inputClass} value={item.location || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "location", e.target.value)} placeholder="e.g. Greater Noida, UP" /></Field>
                      <Field label="Beneficiaries"><input className={inputClass} value={item.beneficiaries || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "beneficiaries", e.target.value)} placeholder="e.g. 500 village students" /></Field>
                      <Field label="Focus Area">
                        <select className={inputClass} value={item.type || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "type", e.target.value)}>
                          <option value="">Not specified</option>
                          <option value="community-outreach">Community Outreach</option>
                          <option value="awareness">Awareness</option>
                          <option value="environmental">Environmental</option>
                          <option value="education">Education</option>
                          <option value="healthcare">Healthcare</option>
                        </select>
                      </Field>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Activity Description">
                          <textarea className={`${inputClass} min-h-16`} value={item.description || ""} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "description", e.target.value)} placeholder="Describe the activity and its social impact..." />
                        </Field>
                      </div>
                      <div className="sm:col-span-2 md:col-span-3">
                        <Field label="Key Impact Points (One per line)">
                          <textarea className={`${inputClass} min-h-16`} value={getListValue(item.impact)} onChange={(e) => handleUpdateArrayItem("socialImpact", "socialActivities", index, "impact", setListValue(e.target.value))} placeholder="e.g. 500 villagers trained in digital literacy&#10;3 community centres set up" />
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                {socialActivities.length === 0 && <p className="text-center py-4 text-xs text-stone-500">No outreach activities added yet.</p>}
              </div>
            </div>
          </div>
        );
      }

      case "other": {
        const section = tabData.other || {};
        const message = section.message || "";

        return (
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
            <h3 className="mb-2 text-base font-semibold text-stone-800">Other Information</h3>
            <p className="mb-3 text-xs text-stone-500">Any other academic credentials, references, or details you want to show.</p>
            <Field label="Custom Profile Message / Other Details">
              <textarea
                className={`${inputClass} min-h-36`}
                value={message}
                onChange={(e) => updateSectionKey("other", "message", e.target.value)}
                placeholder="Type any miscellaneous information here..."
              />
            </Field>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return <div className="mt-4">{renderSubTabContent()}</div>;
};

export default TabDataEditors;
