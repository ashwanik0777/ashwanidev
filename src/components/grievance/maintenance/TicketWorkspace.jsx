import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Search, Eye, RefreshCw, CalendarDays } from 'lucide-react';
import { listMaintenanceTickets, getApiErrorMessage } from '../../../services/maintenanceService';
import StageBadge, { SeverityBadge } from './StageBadge';
import TicketDetailModal from './TicketDetailModal';
import { formatDate, formatDateTime, inputClass } from './maintenanceMeta';

const PAGE_SIZE = 15;

// Compact on purpose — the shared inputClass is full-width.
const DATE_INPUT_CLASS =
  'w-40 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700';

const DATE_MODES = [
  { key: 'all', label: 'All dates' },
  { key: 'day', label: 'Day' },
  { key: 'month', label: 'Month' },
];

/*
 * Tabbed ticket list used by every maintenance role. Each tab is a server-side
 * filter ({ stage: 'a,b', flag }); the backend already limits rows to what the
 * signed-in user may see. The day / month filter applies to the complaint's
 * submission date and is reported to the parent (onDateFilterChange) so stats
 * cards can follow it.
 *
 * Portal pages drive the tab from their sidebar: pass `activeTab` and
 * `hideTabs` and the pill row is not rendered.
 */
const TicketWorkspace = ({
  tabs,
  activeTab: controlledTab,
  hideTabs = false,
  columns = {},
  refreshKey = 0,
  onChanged,
  onDateFilterChange,
  emptyText = 'No tickets here.',
}) => {
  const [internalTab, setInternalTab] = useState(tabs[0].key);
  const activeTab = controlledTab ?? internalTab;
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  // Back to page 1 whenever the tab changes, including from the parent's sidebar.
  const [pageTab, setPageTab] = useState(activeTab);
  if (pageTab !== activeTab) {
    setPageTab(activeTab);
    setPage(1);
  }
  const [dateMode, setDateMode] = useState('all');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');

  const dateParam = dateMode === 'day' && day ? day : undefined;
  const monthParam = dateMode === 'month' && month ? month : undefined;

  useEffect(() => {
    setPage(1);
    onDateFilterChange?.({ date: dateParam, month: monthParam });
  }, [dateParam, monthParam, onDateFilterChange]);
  const [data, setData] = useState({ items: [], pagination: { total: 0, pages: 1 } });
  const [loading, setLoading] = useState(true);
  const [openTicketId, setOpenTicketId] = useState(null);

  const tab = tabs.find((item) => item.key === activeTab) || tabs[0];
  // Primitive deps: parents pass a new `tabs` array on every render.
  const stageParam = tab.stages?.join(',') || undefined;
  const flagParam = tab.flag;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setData(await listMaintenanceTickets({
        stage: stageParam,
        flag: flagParam,
        search: query || undefined,
        date: dateParam,
        month: monthParam,
        page,
        limit: PAGE_SIZE,
      }));
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not load tickets'));
    } finally {
      setLoading(false);
    }
  }, [stageParam, flagParam, query, dateParam, monthParam, page]);

  useEffect(() => {
    load();
  }, [load, refreshKey]);

  const handleChanged = () => {
    load();
    onChanged?.();
  };

  const closeModal = useCallback(() => setOpenTicketId(null), []);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:justify-between">
        {hideTabs ? (
          <h3 className="text-sm font-semibold text-slate-800">{tab.label}</h3>
        ) : (
          <div className="flex flex-wrap gap-1.5">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setInternalTab(item.key)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                  item.key === activeTab ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        <form
          className="flex gap-2"
          onSubmit={(e) => { e.preventDefault(); setPage(1); setQuery(search.trim()); }}
        >
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ticket, name or location"
              className={`${inputClass} w-56 py-2 pl-9`}
            />
          </div>
          <button type="button" onClick={load} className="rounded-xl border border-slate-300 px-3 text-slate-600 hover:bg-slate-50" title="Refresh">
            <RefreshCw className="h-4 w-4" />
          </button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-3 text-sm">
        <CalendarDays className="h-4 w-4 text-slate-500" />
        <span className="font-medium text-slate-700">Submitted on:</span>
        <div className="flex gap-1">
          {DATE_MODES.map((mode) => (
            <button
              key={mode.key}
              type="button"
              onClick={() => setDateMode(mode.key)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                dateMode === mode.key ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
        {dateMode === 'day' && (
          <input type="date" value={day} onChange={(e) => setDay(e.target.value)} className={DATE_INPUT_CLASS} />
        )}
        {dateMode === 'month' && (
          <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className={DATE_INPUT_CLASS} />
        )}
        {(dateParam || monthParam) && (
          <span className="text-xs text-slate-500">
            {data.pagination.total} ticket{data.pagination.total === 1 ? '' : 's'} in this period
          </span>
        )}
      </div>

      {tab.description && <p className="border-b border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-600">{tab.description}</p>}

      {loading ? (
        <div className="flex justify-center py-14">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      ) : data.items.length === 0 ? (
        <p className="py-14 text-center text-sm text-slate-500">{emptyText}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-medium uppercase tracking-wider text-slate-500">
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Issue & Location</th>
                {columns.submitter !== false && <th className="px-4 py-3">Raised by</th>}
                {columns.je && <th className="px-4 py-3">JE</th>}
                {columns.vendor !== false && <th className="px-4 py-3">Vendor</th>}
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Due / Updated</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {data.items.map((ticket) => (
                <tr key={ticket.ticket_id} className="align-top transition hover:bg-slate-50">
                  <td className="whitespace-nowrap px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">#{ticket.ticket_id}</p>
                    <div className="mt-1"><SeverityBadge level={ticket.severity_level} /></div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-900">{ticket.sub_category}</p>
                    <p className="text-xs text-slate-600">{ticket.complaint_for} · {ticket.location_label}</p>
                    <p className="max-w-[240px] truncate text-xs text-slate-500" title={ticket.exact_location}>{ticket.exact_location}</p>
                  </td>
                  {columns.submitter !== false && (
                    <td className="px-4 py-3 text-sm text-slate-700">
                      {ticket.submitter_name}
                      {ticket.submitter_contact && <span className="block text-xs text-slate-500">{ticket.submitter_contact}</span>}
                    </td>
                  )}
                  {columns.je && <td className="px-4 py-3 text-sm text-slate-700">{ticket.assigned_je_name || '—'}</td>}
                  {columns.vendor !== false && <td className="px-4 py-3 text-sm text-slate-700">{ticket.assigned_vendor_name || '—'}</td>}
                  <td className="px-4 py-3"><StageBadge ticket={ticket} /></td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-600">
                    {ticket.stage === 'assigned_to_vendor' && ticket.site_visit_due_at && <p>Visit by {formatDateTime(ticket.site_visit_due_at)}</p>}
                    {['work_in_progress', 'delayed'].includes(ticket.stage) && ticket.approved_completion_date && (
                      <p>Complete by {formatDate(ticket.approved_completion_date)}</p>
                    )}
                    <p className="text-slate-400">Updated {formatDateTime(ticket.updated_at)}</p>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setOpenTicketId(ticket.ticket_id)}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <Eye className="h-4 w-4" />
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.pagination.pages > 1 && (
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-3 text-sm">
          <span className="text-slate-500">Page {page} of {data.pagination.pages} · {data.pagination.total} tickets</span>
          <div className="flex gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 disabled:opacity-50">
              Previous
            </button>
            <button type="button" disabled={page >= data.pagination.pages} onClick={() => setPage((p) => p + 1)} className="rounded-lg border border-slate-300 bg-white px-3 py-1 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      )}

      {openTicketId && <TicketDetailModal ticketId={openTicketId} onClose={closeModal} onChanged={handleChanged} />}
    </div>
  );
};

export default TicketWorkspace;
