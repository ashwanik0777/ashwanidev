export const STAGE_META = {
  unrouted: { label: 'Awaiting JE Assignment', className: 'bg-slate-100 text-slate-700' },
  pending_je_review: { label: 'Under JE Review', className: 'bg-blue-100 text-blue-700' },
  assigned_to_vendor: { label: 'Assigned to Vendor', className: 'bg-indigo-100 text-indigo-700' },
  inspection_submitted: { label: 'Inspection Submitted', className: 'bg-violet-100 text-violet-700' },
  work_in_progress: { label: 'Work in Progress', className: 'bg-amber-100 text-amber-800' },
  delayed: { label: 'Delayed', className: 'bg-orange-100 text-orange-800' },
  work_completed: { label: 'Completed – Awaiting Verification', className: 'bg-teal-100 text-teal-700' },
  escalated: { label: 'Escalated', className: 'bg-rose-100 text-rose-700' },
  closed: { label: 'Resolved & Closed', className: 'bg-emerald-100 text-emerald-700' },
};

export const SEVERITY_META = {
  minor: { label: 'Minor Repair', className: 'bg-sky-100 text-sky-700' },
  major: { label: 'Major Repair', className: 'bg-rose-100 text-rose-700' },
};

export const EVENT_LABELS = {
  submitted: 'Complaint submitted',
  routed: 'Routed to JE inbox',
  unrouted: 'No routing rule matched — waiting for admin',
  je_assigned: 'JE assigned by admin',
  vendor_assigned: 'Work assigned to vendor',
  vendor_reassigned: 'Vendor reassigned',
  vendor_followed_up: 'JE followed up with vendor',
  site_visit_missed: 'Site visit deadline missed',
  inspection_submitted: 'Inspection report submitted',
  timeline_approved: 'Completion date approved by JE',
  progress_updated: 'Work progress updated',
  marked_delayed: 'Work not completed by promised date',
  timeline_revised: 'Revised timeline approved',
  work_completed: 'Vendor marked work completed',
  rework_requested: 'Rework requested by JE',
  resolved_and_closed: 'Verified, resolved & closed',
  escalated: 'Escalated to senior officers',
  escalation_decided: 'Senior officer decision recorded',
};

export const ROLE_LABELS = {
  je: 'JE',
  vendor: 'Vendor',
  senior_officer: 'Senior Officer',
  director: 'Director',
  super_admin: 'Admin',
  faculty: 'Faculty',
  system: 'System',
};

export const DECISION_LABELS = {
  continue_with_vendor: 'Continue with same vendor (new deadline)',
  reassign_vendor: 'Reassign to a different vendor',
};

export const DETAIL_LABELS = {
  vendor_name: 'Vendor',
  je_name: 'JE',
  site_visit_due_at: 'Site visit due',
  estimated_completion_date: 'Vendor estimate',
  approved_completion_date: 'Completion date',
  previous_date: 'Previous date',
  vendor_estimated_date: 'Vendor estimate',
  progress_percent: 'Progress',
  pending_tasks: 'Pending tasks',
  inspection_report: 'Inspection report',
  visited_within_deadline: 'Visited within 2 working days',
  completed_during_inspection: 'Work completed during inspection',
  completed_on_time: 'Completed on time',
  decision: 'Decision',
  escalated_from_stage: 'Escalated from',
  location: 'Location',
  exact_location: 'Exact location',
  issue_type: 'Issue type',
};

const IST = 'Asia/Kolkata';

export const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString('en-IN', { timeZone: IST, day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : '—';

// DATE columns arrive as plain 'YYYY-MM-DD' strings.
export const formatDate = (value) => {
  if (!value) return '—';
  const [year, month, day] = String(value).slice(0, 10).split('-').map(Number);
  if (!year) return '—';
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-IN', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' });
};

export const todayKey = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: IST, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());

export const formatDetailValue = (key, value) => {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  if (key === 'site_visit_due_at') return formatDateTime(value);
  if (key.endsWith('_date')) return formatDate(value);
  if (key === 'progress_percent') return `${value}%`;
  if (key === 'decision') return DECISION_LABELS[value] || value;
  if (key === 'escalated_from_stage') return STAGE_META[value]?.label || value;
  return String(value);
};

export const isSiteVisitOverdue = (ticket) =>
  ticket?.stage === 'assigned_to_vendor' && Boolean(ticket.site_visit_overdue_at);

// Tabs of the university-wide overview (Director, VC, HOD, admin).
export const OVERVIEW_TABS = [
  { key: 'all', label: 'All Complaints' },
  { key: 'open', label: 'Awaiting JE', stages: ['unrouted', 'pending_je_review'] },
  { key: 'progress', label: 'In Progress', stages: ['assigned_to_vendor', 'inspection_submitted', 'work_in_progress', 'work_completed'] },
  { key: 'escalated', label: 'Escalated (Sr. Officers)', stages: ['escalated'], description: 'Cases currently with the three senior officers.' },
  { key: 'escalated_ever', label: 'Escalation History', flag: 'escalated_ever', description: 'Every case that was escalated at any point, with the senior officer decision.' },
  { key: 'delayed', label: 'Delayed', stages: ['delayed'] },
  { key: 'overdue', label: 'Site Visit Overdue', flag: 'site_visit_overdue' },
  { key: 'resolved', label: 'Resolved', stages: ['closed'] },
];

export const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700 disabled:bg-slate-50 disabled:text-slate-500';
