import React from "react";
import {
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  Mail,
  User,
  Settings,
  FolderOpen,
  FileText,
  Award,
  Activity,
  MessageSquare
} from "lucide-react";

const iconMap = {
  "dashboard": LayoutDashboard,
  "personal-details": User,
  "qualifications": GraduationCap,
  "certifications": Award,
  "teaching": BookOpen,
  "administration": Settings,
  "research-projects": FolderOpen,
  "publications": FileText,
  "talks": Activity,
  "awards": Award,
  "other": MessageSquare
};

const SidebarNav = ({ sections, activeSection, onSelect, onSave, onViewPublic, onLogout }) => {
  return (
    <aside className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] lg:w-72 lg:shrink-0 lg:self-start">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Faculty Navigation</h2>
        <p className="mt-1 text-xs text-slate-500">Profile management panel</p>
        
        <div className="mt-3 flex-1 overflow-y-auto space-y-1 pr-1 scrollbar-thin">
          {sections.map((section) => {
            const Icon = iconMap[section.id] || LayoutDashboard;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onSelect(section.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition ${
                  isActive ? "bg-slate-900 text-white shadow" : "bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="truncate">{section.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick Actions</p>
          <div className="mt-2 space-y-1.5">
            <button onClick={onSave} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800">
              Save
            </button>
            <button onClick={onViewPublic} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
              View Public Profile
            </button>
            <button onClick={onLogout} className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100">
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
