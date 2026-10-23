import React from 'react';
import { Paperclip } from 'lucide-react';
import toast from 'react-hot-toast';
import { openMaintenanceAttachment, getApiErrorMessage } from '../../../services/maintenanceService';
import { EVENT_LABELS, ROLE_LABELS, DETAIL_LABELS, formatDateTime, formatDetailValue } from './maintenanceMeta';

// Details already shown elsewhere in the entry, or internal ids.
const HIDDEN_DETAILS = new Set(['vendor_id', 'je_id', 'previous_je_id', 'inspection_report']);

const dotColor = (action) => {
  if (action === 'escalated' || action === 'site_visit_missed' || action === 'marked_delayed') return 'bg-rose-500';
  if (action === 'resolved_and_closed') return 'bg-emerald-500';
  if (action === 'rework_requested') return 'bg-orange-500';
  return 'bg-slate-400';
};

const TicketTimeline = ({ ticketId, events }) => {
  const openFile = async (eventId) => {
    try {
      await openMaintenanceAttachment(ticketId, eventId);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not open attachment'));
    }
  };

  if (!events?.length) return <p className="text-sm text-slate-500">No activity yet.</p>;

  return (
    <ol className="relative space-y-5 border-l border-slate-200 pl-5">
      {events.map((event) => {
        const details = Object.entries(event.details || {})
          .filter(([key]) => !HIDDEN_DETAILS.has(key))
          .map(([key, value]) => [DETAIL_LABELS[key] || key, formatDetailValue(key, value)])
          .filter(([, value]) => value !== null);

        return (
          <li key={event.id} className="relative">
            <span className={`absolute -left-[26px] top-1.5 h-3 w-3 rounded-full ring-4 ring-white ${dotColor(event.action)}`} />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-slate-900">{EVENT_LABELS[event.action] || event.action}</p>
              <p className="text-xs text-slate-500">{formatDateTime(event.created_at)}</p>
            </div>
            <p className="text-xs text-slate-500">
              {event.actor_name || 'System'}
              {event.actor_role && event.actor_role !== 'system' ? ` · ${ROLE_LABELS[event.actor_role] || event.actor_role}` : ''}
            </p>

            {event.details?.inspection_report && (
              <p className="mt-2 whitespace-pre-line rounded-lg bg-slate-50 p-2.5 text-sm text-slate-700">
                <span className="font-medium">Inspection report: </span>
                {event.details.inspection_report}
              </p>
            )}
            {event.remarks && event.action !== 'submitted' && (
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
            {event.has_attachment && (
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
    </ol>
  );
};

export default TicketTimeline;
