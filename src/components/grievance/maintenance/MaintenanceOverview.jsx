import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Eye } from 'lucide-react';
import { getMaintenanceStats, getApiErrorMessage } from '../../../services/maintenanceService';
import MaintenanceStatsCards from './MaintenanceStatsCards';
import TicketWorkspace from './TicketWorkspace';
import { OVERVIEW_TABS } from './maintenanceMeta';

/*
 * University-wide (or department-wide for HOD) dashboard: counts, per-JE load
 * and every ticket. Read-only for Director / VC / HOD; the admin additionally
 * gets "Assign JE" inside the ticket modal. The maintenance portal passes
 * `activeTab` from its sidebar, which hides the in-list tab row.
 */
const MaintenanceOverview = ({ title, subtitle, accentClass = 'bg-slate-900', activeTab }) => {
  const [stats, setStats] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  // Day / month chosen in the ticket list; the stats cards and JE table follow it.
  const [dateFilter, setDateFilter] = useState({});
  const { date, month } = dateFilter;

  const loadStats = useCallback(async () => {
    try {
      setStats(await getMaintenanceStats({ date, month }));
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not load statistics'));
    }
  }, [date, month]);

  useEffect(() => {
    loadStats();
  }, [loadStats, refreshKey]);

  return (
    <div className="space-y-6">
      {title && (
        <div className={`flex items-center gap-3 rounded-2xl p-4 text-white shadow-sm ${accentClass}`}>
          <Eye className="h-6 w-6 shrink-0" />
          <div>
            <h2 className="text-lg font-bold">{title}</h2>
            {subtitle && <p className="text-sm text-white/80">{subtitle}</p>}
          </div>
        </div>
      )}

      <MaintenanceStatsCards stats={stats} />

      {stats?.by_je?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <h3 className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-800">Workload by JE</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100 text-sm">
              <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-4 py-2">JE</th>
                  <th className="px-4 py-2">Total</th>
                  <th className="px-4 py-2">Pending</th>
                  <th className="px-4 py-2">Escalated</th>
                  <th className="px-4 py-2">Delayed</th>
                  <th className="px-4 py-2">Resolved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stats.by_je.map((row) => (
                  <tr key={row.je_id ?? 'unassigned'}>
                    <td className="px-4 py-2 font-medium text-slate-800">{row.je_name}</td>
                    <td className="px-4 py-2">{row.total}</td>
                    <td className="px-4 py-2">{row.total - row.closed}</td>
                    <td className="px-4 py-2 text-rose-700">{row.escalated}</td>
                    <td className="px-4 py-2 text-orange-700">{row.delayed}</td>
                    <td className="px-4 py-2 text-emerald-700">{row.closed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <TicketWorkspace
        tabs={OVERVIEW_TABS}
        activeTab={activeTab}
        hideTabs={Boolean(activeTab)}
        columns={{ je: true }}
        refreshKey={refreshKey}
        onChanged={() => setRefreshKey((key) => key + 1)}
        onDateFilterChange={setDateFilter}
        emptyText="No complaints in this view."
      />
    </div>
  );
};

export default MaintenanceOverview;
