import React from 'react';
import { Paperclip, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { openMaintenanceAttachment, getApiErrorMessage } from '../../../services/maintenanceService';
import { EVENT_LABELS, ROLE_LABELS, DETAIL_LABELS, formatDateTime, formatDetailValue } from './maintenanceMeta';

// Details already shown elsewhere in the entry, or internal ids.
const HIDDEN_DETAILS = new Set(['vendor_id', 'je_id', 'previous_je_id', 'inspection_report']);

const dotColor = (action) => {
  if (action === 'escalated' || action === 'site_visit_missed' || action === 'marked_delayed') return 'bg-rose-500';
  if (action === 'resolved_and_closed') return 'bg-emerald-500';
  if (action === 'rework_requested') return 'bg-orange-500';
  return 'bg-emerald-500';
};

// Faculty (the complainant) see a short version: submitted -> vendor assigned -> closed,
// with only the details listed here.
const SIMPLE_EVENTS = {
  submitted: { details: ['issue_type'], showActor: true },
  vendor_assigned: { details: ['vendor_name', 'site_visit_due_at'] },
  vendor_reassigned: { details: ['vendor_name', 'site_visit_due_at'] },
  resolved_and_closed: { details: [] },
};

const TicketTimeline = ({ ticketId, events, simple = false }) => {
  const openFile = async (eventId) => {
    try {
      await openMaintenanceAttachment(ticketId, eventId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not open attachment'));
    }
  };

  const shownEvents = simple ? (events || []).filter((event) => SIMPLE_EVENTS[event.action]) : events;

  if (!shownEvents?.length) return <p className="text-sm text-slate-500">No activity yet.</p>;

  // Closed tickets end with a green "completed" point; open ones pulse on the latest step.
  const isCompleted = shownEvents.some((event) => event.action === 'resolved_and_closed');
  const currentEventId = isCompleted ? null : shownEvents[shownEvents.length - 1].id;

  return (
    <ol className="relative space-y-5 border-l-2 border-emerald-500 pl-5">
      {shownEvents.map((event) => {
        const simpleRule = simple ? SIMPLE_EVENTS[event.action] : null;
        const details = Object.entries(event.details || {})
          .filter(([key]) => (simpleRule ? simpleRule.details.includes(key) : !HIDDEN_DETAILS.has(key)))
          .map(([key, value]) => [DETAIL_LABELS[key] || key, formatDetailValue(key, value)])
          .filter(([, value]) => value !== null);

        return (
          <li key={event.id} className="relative">
            {event.id === currentEventId ? (
              <span className="absolute -left-[26px] top-1.5 flex h-3 w-3" title="Work in progress">
                <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${dotColor(event.action)}`} />
                <span className={`relative inline-flex h-3 w-3 rounded-full ring-4 ring-white ${dotColor(event.action)}`} />
              </span>
            ) : (
              <span className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full ring-4 ring-white ${dotColor(event.action)}`} />
            )}
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{EVENT_LABELS[event.action] || event.action}</p>
              <p className="text-xs text-slate-500">{formatDateTime(event.created_at)}</p>
            </div>
            {simpleRule ? (
              simpleRule.showActor && <p className="text-xs text-slate-500">{event.actor_name}</p>
            ) : (
              <p className="text-xs text-slate-500">
                {event.actor_name || 'System'}
                {event.actor_role && event.actor_role !== 'system' ? ` · ${ROLE_LABELS[event.actor_role] || event.actor_role}` : ''}
              </p>
            )}

            {!simpleRule && event.details?.inspection_report && (
              <p className="mt-2 whitespace-pre-line rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
                <span className="font-medium">Inspection report: </span>
                {event.details.inspection_report}
              </p>
            )}
            {!simpleRule && event.remarks && event.action !== 'submitted' && (
              <p className="mt-2 whitespace-pre-line rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">{event.remarks}</p>
            )}
            {details.length > 0 && (
              <dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 text-xs sm:grid-cols-2">
                {details.map(([label, value]) => (
                  <div key={label} className="flex gap-1">
                    <dt className="text-slate-500">{label}:</dt>
                    <dd className="font-medium text-slate-700">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {!simpleRule && event.has_attachment && (
              <button
                type="button"
                onClick={() => openFile(event.id)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800"
              >
                <Paperclip className="h-3.5 w-3.5" />
                {event.attachment_name || 'View attachment'}
              </button>
            )}
          </li>
        );
      })}
      {isCompleted && (
        <li className="relative">
          <span className="absolute -left-[31px] top-0 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-emerald-500 text-white shadow-md ring-4 ring-emerald-100">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <p className="pt-0.5 text-sm font-semibold text-emerald-700">Work completed</p>
        </li>
      )}
    </ol>
  );
};

export default TicketTimeline;
