import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Paperclip, X, AlertTriangle } from 'lucide-react';
import { getMaintenanceTicket, openMaintenanceAttachment, getApiErrorMessage } from '../../../services/maintenanceService';
import StageBadge, { SeverityBadge } from './StageBadge';
import TicketTimeline from './TicketTimeline';
import TicketActions from './TicketActions';
import { STAGE_META, DECISION_LABELS, formatDate, formatDateTime, isSiteVisitOverdue } from './maintenanceMeta';

const Field = ({ label, children }) => (
  <div>
    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</dt>
    <dd className="mt-0.5 text-sm text-slate-900">{children || '—'}</dd>
  </div>
);

const Section = ({ title, children }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4">
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h3>
    {children}
  </section>
);

const TicketDetailModal = ({ ticketId, onClose, onChanged }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setDetail(await getMaintenanceTicket(ticketId));
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not load ticket'));
      onClose();
    } finally {
      setLoading(false);
    }
  }, [ticketId, onClose]);

  useEffect(() => {
    if (ticketId) load();
  }, [ticketId, load]);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!ticketId) return null;

  const ticket = detail?.ticket;
  const handleUpdated = (updated) => {
    setDetail(updated);
    onChanged?.();
  };

  const openComplaintFile = async () => {
    try {
      await openMaintenanceAttachment(ticket.ticket_id, 'complaint');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not open attachment'));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/50 p-3 sm:p-6" onClick={onClose}>
      <div className="w-full max-w-5xl rounded-2xl bg-slate-50 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 rounded-t-2xl border-b border-slate-200 bg-white px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Maintenance complaint</p>
            <h2 className="text-lg font-bold text-slate-900">#{ticketId}</h2>
            {ticket && (
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <StageBadge ticket={ticket} />
                <SeverityBadge level={ticket.severity_level} />
              </div>
            )}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-800" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading && !ticket ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        ) : ticket ? (
          <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              {isSiteVisitOverdue(ticket) && (
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  The vendor did not visit within 2 working days (due {formatDateTime(ticket.site_visit_due_at)}).
                </div>
              )}

              <Section title="Complaint">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Complaint for">{ticket.complaint_for}</Field>
                  <Field label="Location">{ticket.location_label}</Field>
                  <Field label="Exact location">{ticket.exact_location}</Field>
                  <Field label="Issue type">{ticket.sub_category}</Field>
                  {ticket.severity_level && <Field label="Severity level"><SeverityBadge level={ticket.severity_level} /></Field>}
                  <Field label="Submitted by">
                    {ticket.submitter_name}
                    {ticket.submitter_contact && <span className="block text-xs text-slate-500">{ticket.submitter_contact}</span>}
                    {ticket.submitter_email && <span className="block text-xs text-slate-500">{ticket.submitter_email}</span>}
                  </Field>
                  <Field label="Submitted on">{formatDateTime(ticket.created_at)}</Field>
                </dl>
                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Description</p>
                  <p className="mt-1 whitespace-pre-line text-sm text-slate-800">{ticket.description}</p>
                </div>
                {ticket.has_attachment && (
                  <button type="button" onClick={openComplaintFile} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800">
                    <Paperclip className="h-4 w-4" />
                    View attached photo / file
                  </button>
                )}
              </Section>

              <Section title="Work status">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Responsible JE">{ticket.assigned_je_name || 'Not assigned yet'}</Field>
                  <Field label="Vendor">
                    {ticket.assigned_vendor_name || 'Not assigned yet'}
                    {ticket.assigned_vendor_company && <span className="block text-xs text-slate-500">{ticket.assigned_vendor_company}</span>}
                  </Field>
                  {ticket.site_visit_due_at && <Field label="Site visit due">{formatDateTime(ticket.site_visit_due_at)}</Field>}
                  {ticket.site_visit_at && <Field label="Site visited on">{formatDateTime(ticket.site_visit_at)}</Field>}
                  {ticket.vendor_estimated_date && <Field label="Vendor's estimate">{formatDate(ticket.vendor_estimated_date)}</Field>}
                  {ticket.approved_completion_date && <Field label="Approved completion date">{formatDate(ticket.approved_completion_date)}</Field>}
                  {ticket.closed_at && <Field label="Closed on">{formatDateTime(ticket.closed_at)}</Field>}
                  {(ticket.follow_up_count > 0 || ticket.rework_count > 0) && (
                    <Field label="Follow-ups / reworks">{`${ticket.follow_up_count} / ${ticket.rework_count}`}</Field>
                  )}
                </dl>

                {ticket.assigned_vendor_id && (
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs text-slate-500">
                      <span>Progress</span>
                      <span>{ticket.progress_percent || 0}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${ticket.progress_percent || 0}%` }} />
                    </div>
                  </div>
                )}

                {ticket.inspection_report && (
                  <div className="mt-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Inspection report</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-800">{ticket.inspection_report}</p>
                  </div>
                )}
                {ticket.pending_tasks && (
                  <div className="mt-3">
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Pending tasks</p>
                    <p className="mt-1 whitespace-pre-line text-sm text-slate-800">{ticket.pending_tasks}</p>
                  </div>
                )}
              </Section>

              {ticket.escalated_at && (
                <Section title="Escalation">
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field label="Escalated on">{formatDateTime(ticket.escalated_at)}</Field>
                    <Field label="Escalated from">{STAGE_META[ticket.escalated_from_stage]?.label || ticket.escalated_from_stage}</Field>
                    <Field label="Reason">{ticket.escalation_reason}</Field>
                    <Field label="Decision">
                      {ticket.escalation_decision ? DECISION_LABELS[ticket.escalation_decision] || ticket.escalation_decision : 'Pending with senior officers'}
                      {ticket.escalation_decided_by_name && (
                        <span className="block text-xs text-slate-500">
                          by {ticket.escalation_decided_by_name}, {formatDateTime(ticket.escalation_decided_at)}
                        </span>
                      )}
                    </Field>
                  </dl>
                  {ticket.escalation_remarks && <p className="mt-3 whitespace-pre-line text-sm text-slate-800">{ticket.escalation_remarks}</p>}
                </Section>
              )}

              {detail.allowed_actions?.length > 0 && (
                <Section title="Take action">
                  <TicketActions ticket={ticket} allowedActions={detail.allowed_actions} onUpdated={handleUpdated} />
                </Section>
              )}
            </div>

            <Section title="Timeline">
              <TicketTimeline ticketId={ticket.ticket_id} events={detail.events} />
            </Section>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TicketDetailModal;
