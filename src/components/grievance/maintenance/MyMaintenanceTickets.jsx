import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Eye } from 'lucide-react';
import { getMyMaintenanceTickets, getApiErrorMessage } from '../../../services/maintenanceService';
import StageBadge, { SeverityBadge } from './StageBadge';
import TicketDetailModal from './TicketDetailModal';
import { formatDate, formatDateTime } from './maintenanceMeta';

const summarize = (tickets) =>
  tickets.reduce(
    (acc, ticket) => {
      acc.total += 1;
      if (ticket.stage === 'closed') acc.resolved += 1;
      else if (ticket.stage === 'escalated') acc.escalated += 1;
      else acc.pending += 1;
      return acc;
    },
    { total: 0, pending: 0, escalated: 0, resolved: 0 }
  );

const MyMaintenanceTickets = ({ refreshKey = 0, openTicketId, onOpenTicket }) => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setTickets((await getMyMaintenanceTickets()) || []);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to load your complaints'));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  // Opened from a notification in the parent.
  useEffect(() => {
    if (openTicketId) setSelectedId(openTicketId);
  }, [openTicketId]);

  const closeModal = useCallback(() => {
    setSelectedId(null);
    onOpenTicket?.(null);
  }, [onOpenTicket]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const stats = summarize(tickets);

  return (
    <div className="space-y-5">
      {tickets.length > 0 && (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            ['Total', stats.total, 'text-slate-900'],
            ['Pending', stats.pending, 'text-amber-700'],
            ['Escalated', stats.escalated, 'text-rose-700'],
            ['Resolved', stats.resolved, 'text-emerald-700'],
          ].map(([label, value, className]) => (
            <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-xs text-slate-500">{label}</p>
              <p className={`text-xl font-bold ${className}`}>{value}</p>
            </div>
          ))}
        </div>
      )}

      {tickets.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white py-12 text-center text-slate-500">No complaints submitted yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Ticket ID</th>
                <th className="px-4 py-3">Issue & Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Expected by</th>
                <th className="px-4 py-3">Submitted</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((ticket) => (
                <tr key={ticket.ticket_id} className="align-top hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">#{ticket.ticket_id}</p>
                    <div className="mt-1"><SeverityBadge level={ticket.severity_level} /></div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{ticket.sub_category}</p>
                    <p className="text-xs text-slate-600">{ticket.complaint_for} · {ticket.location_label}</p>
                    <p className="text-xs text-slate-500">{ticket.exact_location}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StageBadge stage={ticket.stage} />
                    {ticket.assigned_je_name && <p className="mt-1 text-xs text-slate-500">JE: {ticket.assigned_je_name}</p>}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">{formatDate(ticket.approved_completion_date)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-500">{formatDateTime(ticket.created_at)}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelectedId(ticket.ticket_id)}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-900"
                    >
                      <Eye className="h-4 w-4" />
                      Track
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedId && <TicketDetailModal ticketId={selectedId} onClose={closeModal} onChanged={load} />}
    </div>
  );
};

export default MyMaintenanceTickets;
