import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { getMaintenanceStats, getApiErrorMessage } from '../../../services/maintenanceService';
import MaintenanceStatsCards from './MaintenanceStatsCards';
import { todayInIst } from './maintenanceMeta';

/*
 * Senior officers' monitoring view: university-wide counts, work by category
 * (Civil / Electrical), and how much each JE and each vendor has handled.
 */

const PERIODS = [
  { key: 'all', label: 'All Time' },
  { key: 'today', label: 'Today' },
  { key: 'month', label: 'This Month' },
];

const periodParams = (period) => {
  const today = todayInIst();
  if (period === 'today') return { date: today };
  if (period === 'month') return { month: today.slice(0, 7) };
  return {};
};

const tradeLabel = (trade) => (trade ? `${trade.charAt(0).toUpperCase()}${trade.slice(1)}` : '—');

const percent = (done, total) => (total > 0 ? `${Math.round((done / total) * 100)}%` : '—');

const cardClass = 'overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm';
const thClass = 'px-3 py-2 whitespace-nowrap';
const tdClass = 'px-3 py-2 whitespace-nowrap';

const JE_COLUMNS = [
  { key: 'total', label: 'Total' },
  { key: 'awaiting_je', label: 'Awaiting JE', className: 'text-blue-700' },
  { key: 'in_progress', label: 'In Progress', className: 'text-amber-700' },
  { key: 'delayed', label: 'Delayed', className: 'text-orange-700' },
  { key: 'escalated', label: 'Escalated', className: 'text-rose-700' },
  { key: 'closed', label: 'Resolved', className: 'text-emerald-700' },
];

const VENDOR_COLUMNS = [
  { key: 'total', label: 'Assigned' },
  { key: 'visit_pending', label: 'Visit Pending', className: 'text-blue-700' },
  { key: 'visit_overdue', label: 'Visit Overdue', className: 'text-red-700' },
  { key: 'in_progress', label: 'In Progress', className: 'text-amber-700' },
  { key: 'delayed', label: 'Delayed', className: 'text-orange-700' },
  { key: 'escalated', label: 'Escalated', className: 'text-rose-700' },
  { key: 'closed', label: 'Completed', className: 'text-emerald-700' },
];

const WorkTable = ({ title, rows, nameHeader, renderName, rowKey, columns, emptyText }) => (
  <div className={cardClass}>
    <h3 className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">{title}</h3>
    {rows.length === 0 ? (
      <p className="px-4 py-6 text-center text-sm text-slate-500">{emptyText}</p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className={thClass}>{nameHeader}</th>
              <th className={thClass}>Category</th>
              {columns.map((col) => (
                <th key={col.key} className={thClass}>{col.label}</th>
              ))}
              <th className={thClass}>Done %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={rowKey(row)} className="hover:bg-slate-50">
                <td className={`${tdClass} font-medium text-slate-800`}>{renderName(row)}</td>
                <td className={`${tdClass} text-slate-600`}>{tradeLabel(row.trade)}</td>
                {columns.map((col) => (
                  <td key={col.key} className={`${tdClass} ${col.className || 'font-semibold text-slate-900'}`}>
                    {row[col.key] ?? 0}
                  </td>
                ))}
                <td className={`${tdClass} font-semibold text-slate-900`}>{percent(row.closed, row.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

const SeniorOfficerMonitor = ({ refreshKey = 0 }) => {
  const [period, setPeriod] = useState('all');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let active = true;
    getMaintenanceStats(periodParams(period))
      .then((data) => active && setStats(data))
      .catch((error) => toast.error(getApiErrorMessage(error, 'Could not load statistics')));
    return () => {
      active = false;
    };
  }, [period, refreshKey]);

  const jeRows = useMemo(() => stats?.by_je || [], [stats]);
  const vendorRows = stats?.by_vendor || [];

  // Civil / Electrical totals, from the JE each complaint is routed to.
  const categories = useMemo(() => {
    const totals = {};
    for (const row of jeRows) {
      const key = row.trade || 'unassigned';
      totals[key] = totals[key] || { trade: key, total: 0, closed: 0 };
      totals[key].total += row.total;
      totals[key].closed += row.closed;
    }
    return Object.values(totals);
  }, [jeRows]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        {PERIODS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setPeriod(item.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              period === item.key ? 'bg-sky-600 text-white shadow-sm' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <MaintenanceStatsCards stats={stats} />

      {categories.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.trade} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">
                {cat.trade === 'unassigned' ? 'Not yet routed' : `${tradeLabel(cat.trade)} Work`}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-sm">
                <span className="text-slate-600">Total <b className="text-slate-900">{cat.total}</b></span>
                <span className="text-slate-600">Pending <b className="text-amber-700">{cat.total - cat.closed}</b></span>
                <span className="text-slate-600">Resolved <b className="text-emerald-700">{cat.closed}</b></span>
                <span className="text-slate-600">Done <b className="text-slate-900">{percent(cat.closed, cat.total)}</b></span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: cat.total > 0 ? `${(cat.closed / cat.total) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <WorkTable
        title="Work by JE"
        rows={jeRows}
        nameHeader="JE"
        rowKey={(row) => row.je_id ?? 'unassigned'}
        renderName={(row) =>
          row.je_id ? (
            <span>
              {row.designation || row.je_name}
              {row.designation && <span className="block text-xs font-normal text-slate-400">{row.je_name}</span>}
            </span>
          ) : (
            'Not yet routed'
          )
        }
        columns={JE_COLUMNS}
        emptyText="No complaints in this period."
      />

      <WorkTable
        title="Work by Vendor"
        rows={vendorRows}
        nameHeader="Vendor"
        rowKey={(row) => row.vendor_id}
        renderName={(row) => (
          <span>
            {row.company_name || row.vendor_name}
            {row.company_name && <span className="block text-xs font-normal text-slate-400">{row.vendor_name}</span>}
          </span>
        )}
        columns={VENDOR_COLUMNS}
        emptyText="No work assigned to vendors in this period."
      />
    </div>
  );
};

export default SeniorOfficerMonitor;
