import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LogOut,
  Wrench,
  Inbox,
  Truck,
  AlarmClock,
  ClipboardCheck,
  Hammer,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  List,
  History,
  Hourglass,
} from "lucide-react";
import { clearPortalSession, getPortalSession } from "../../utils/portalSession";
import { getMaintenanceStats, getMaintenanceStaffProfile } from "../../services/maintenanceService";
import NotificationBell from "../../components/grievance/maintenance/NotificationBell";
import TicketWorkspace from "../../components/grievance/maintenance/TicketWorkspace";
import TicketDetailModal from "../../components/grievance/maintenance/TicketDetailModal";
import MaintenanceStatsCards from "../../components/grievance/maintenance/MaintenanceStatsCards";
import MaintenanceOverview from "../../components/grievance/maintenance/MaintenanceOverview";
import { OVERVIEW_TABS } from "../../components/grievance/maintenance/maintenanceMeta";

const cardClass = "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm";

const ROLE_TITLES = {
  je: "Junior Engineer",
  vendor: "Vendor",
  senior_officer: "Senior Officer",
  director: "Director",
};

const ROLE_DESCRIPTIONS = {
  je: "Review complaints routed to you, assign vendors and verify completed work.",
  vendor: "Your assigned maintenance tasks — visit, inspect, work and report progress.",
  senior_officer: "Cases escalated by the JEs that need a decision.",
  director: "University-wide view of all maintenance complaints, including cases escalated to the senior officers.",
};

const JE_TABS = [
  { key: "new", label: "New Complaints", icon: Inbox, stages: ["pending_je_review"], description: "Review the complaint and assign it to a vendor." },
  { key: "vendor", label: "With Vendor", icon: Truck, stages: ["assigned_to_vendor"], description: "Vendor must visit within 2 working days. Overdue visits are flagged automatically." },
  { key: "overdue", label: "Visit Overdue", icon: AlarmClock, flag: "site_visit_overdue", description: "Vendor missed the site visit — follow up or escalate." },
  { key: "inspection", label: "Inspection Review", icon: ClipboardCheck, stages: ["inspection_submitted"], description: "Review the vendor's inspection report and approve the completion date." },
  { key: "progress", label: "Work in Progress", icon: Hammer, stages: ["work_in_progress"] },
  { key: "delayed", label: "Delayed", icon: Clock, stages: ["delayed"], description: "Promised date passed. Review vendor remarks, then approve a revised timeline or escalate." },
  { key: "verify", label: "Verify Work", icon: ShieldCheck, stages: ["work_completed"], description: "Vendor says the work is done — verify, then resolve or request rework." },
  { key: "escalated", label: "Escalated", icon: AlertTriangle, stages: ["escalated"] },
  { key: "closed", label: "Closed", icon: CheckCircle, stages: ["closed"] },
  { key: "all", label: "All", icon: List },
];

const VENDOR_TABS = [
  { key: "visit", label: "Site Visit Pending", icon: Truck, stages: ["assigned_to_vendor"], description: "Visit the location within 2 working days and submit your inspection report." },
  { key: "work", label: "Work in Progress", icon: Hammer, stages: ["work_in_progress", "delayed"], description: "Update progress regularly and mark the work completed when done." },
  { key: "waiting", label: "Waiting for JE", icon: Hourglass, stages: ["inspection_submitted", "work_completed"] },
  { key: "escalated", label: "Escalated", icon: AlertTriangle, stages: ["escalated"] },
  { key: "closed", label: "Closed", icon: CheckCircle, stages: ["closed"] },
  { key: "all", label: "All My Tasks", icon: List },
];

const SENIOR_OFFICER_TABS = [
  { key: "pending", label: "Action Required", icon: AlertTriangle, stages: ["escalated"], description: "Escalated by a JE. Any one senior officer can record the decision." },
  { key: "history", label: "All Escalated Cases", icon: History, flag: "escalated_ever" },
];

// The director's sidebar drives the overview's own tabs.
const OVERVIEW_ICONS = {
  all: List,
  open: Inbox,
  progress: Hammer,
  escalated: AlertTriangle,
  escalated_ever: History,
  delayed: Clock,
  overdue: AlarmClock,
  resolved: CheckCircle,
};
const DIRECTOR_TABS = OVERVIEW_TABS.map((tab) => ({ ...tab, icon: OVERVIEW_ICONS[tab.key] || List }));

const TABS_FOR_ROLE = {
  je: JE_TABS,
  vendor: VENDOR_TABS,
  senior_officer: SENIOR_OFFICER_TABS,
  director: DIRECTOR_TABS,
};

const STATS_FOR_ROLE = {
  je: ["total", "open", "in_progress", "escalated", "delayed", "site_visit_overdue", "resolved"],
  vendor: ["total", "in_progress", "delayed", "site_visit_overdue", "resolved"],
};

const EMPTY_TEXT = {
  je: "Nothing in this queue.",
  vendor: "No tasks here.",
  senior_officer: "No escalated cases.",
};

const MaintenanceDashboard = () => {
  const navigate = useNavigate();
  const session = getPortalSession();
  const role = session?.user?.role;
  const navTabs = TABS_FOR_ROLE[role] || [];
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = navTabs.find((tab) => tab.key === requestedTab) || navTabs[0];
  const setActiveTab = (key) => setSearchParams({ tab: key }, { replace: true });

  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [notificationTicket, setNotificationTicket] = useState(null);
  // Day / month chosen in the ticket list; the stats cards follow it.
  const [dateFilter, setDateFilter] = useState({});
  const { date, month } = dateFilter;

  useEffect(() => {
    getMaintenanceStaffProfile().then(setProfile).catch(() => {});
  }, []);

  useEffect(() => {
    if (role === "director") return;
    getMaintenanceStats({ date, month }).then(setStats).catch(() => {});
  }, [role, refreshKey, date, month]);

  const refresh = useCallback(() => setRefreshKey((key) => key + 1), []);
  const closeNotificationTicket = useCallback(() => setNotificationTicket(null), []);

  const logout = () => {
    clearPortalSession();
    navigate("/login");
  };

  const statCards = role === "senior_officer"
    ? [
        { key: "escalated", label: "Awaiting Decision", value: stats?.escalated },
        { key: "escalated_ever", label: "Total Escalated", value: stats?.escalated_ever },
        { key: "resolved", label: "Resolved (after escalation)", value: stats?.resolved },
      ]
    : null;

  const displayName = profile?.name || session?.user?.name;
  const profileLine = [profile?.designation, profile?.company_name].filter(Boolean).join(" · ");

  return (
    <div className="min-h-screen bg-slate-50 p-2 md:p-4 lg:h-screen lg:overflow-hidden">
      <div className="flex h-full w-full flex-col gap-6 lg:flex-row">
        <aside className="h-auto lg:h-full lg:w-72 min-w-[280px] lg:shrink-0">
          <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">GBU Maintenance Portal</p>
                <p className="truncate text-xs text-slate-500">{displayName}</p>
                {profileLine && <p className="truncate text-xs text-slate-400">{profileLine}</p>}
              </div>
            </div>

            <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
              {ROLE_TITLES[role] || "Maintenance"} Navigation
            </h2>

            <div className="mt-3 flex-1 space-y-2 overflow-y-auto p-1 -mx-1 -my-1 no-scrollbar">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab?.key === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                      isActive ? "bg-sky-50 text-sky-700 font-semibold shadow-sm ring-1 ring-sky-500/50" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? "text-sky-600" : "text-slate-400"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-auto shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-3">
              <button
                type="button"
                onClick={logout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0 space-y-6 pb-6 lg:overflow-y-auto lg:pr-2 custom-scrollbar">
          <section className={cardClass}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">{activeTab?.label || "Dashboard"}</h1>
                <span className="rounded-lg bg-sky-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
                  {ROLE_TITLES[role] || role}
                </span>
              </div>
              <NotificationBell onOpenTicket={setNotificationTicket} />
            </div>
            <p className="mt-1 text-sm text-slate-600">{activeTab?.description || ROLE_DESCRIPTIONS[role]}</p>
          </section>

          {role === "director" && <MaintenanceOverview activeTab={activeTab?.key} />}

          {role === "senior_officer" && statCards && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {statCards.map((card) => (
                <div key={card.key} className={cardClass}>
                  <p className="text-xs uppercase tracking-wide text-slate-500">{card.label}</p>
                  <p className="mt-2 text-2xl font-bold text-slate-900">{card.value ?? "—"}</p>
                </div>
              ))}
            </div>
          )}

          {(role === "je" || role === "vendor") && <MaintenanceStatsCards stats={stats} only={STATS_FOR_ROLE[role]} />}

          {["je", "vendor", "senior_officer"].includes(role) && activeTab && (
            <TicketWorkspace
              tabs={navTabs}
              activeTab={activeTab.key}
              hideTabs
              columns={role === "senior_officer" ? { je: true } : undefined}
              refreshKey={refreshKey}
              onChanged={refresh}
              onDateFilterChange={setDateFilter}
              emptyText={EMPTY_TEXT[role]}
            />
          )}
        </main>
      </div>

      {notificationTicket && (
        <TicketDetailModal ticketId={notificationTicket} onClose={closeNotificationTicket} onChanged={refresh} />
      )}
    </div>
  );
};

export default MaintenanceDashboard;
