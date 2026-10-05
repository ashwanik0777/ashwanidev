import React, { useState, useEffect, useCallback } from 'react';
import { getManagedGrievances, getManagementStats, exportGrievances } from '../../services/grievanceService';
import { GrievanceStatusBadge, PriorityBadge } from './GrievanceStatusBadge';
import GrievanceDetailModal from './GrievanceDetailModal';
import GrievanceStatsCards from './GrievanceStatsCards';
import GrievanceFilterBar from './GrievanceFilterBar';
import { Loader2, Settings2, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const GrievanceManagementPanel = ({ scopeLabel, showSchoolFilter, showSubmitterTypeFilter }) => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'All', school: 'All', submitterType: 'All', page: 1, limit: 10 });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [statsRes, listRes] = await Promise.all([
        getManagementStats(),
        getManagedGrievances(filters)
      ]);
      if (statsRes.data?.success) setStats(statsRes.data.data);
      if (listRes.data?.success) {
        setGrievances(listRes.data.data);
        setPagination(listRes.data.pagination || { total: 0, pages: 1 });
      }
    } catch (err) {
      toast.error('Failed to load management data');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await exportGrievances();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'grievances_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900">{scopeLabel || 'Grievance Management'}</h2>
        {scopeLabel === 'Admin Overview' && (
          <button
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-medium hover:bg-slate-200 transition disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exporting...' : 'Export CSV'}
          </button>
        )}
      </div>

      <GrievanceStatsCards stats={stats} />
      <GrievanceFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        showSchoolFilter={showSchoolFilter}
        showSubmitterTypeFilter={showSubmitterTypeFilter}
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : grievances.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No grievances found matching the filters.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {grievances.map((g) => (
                  <tr key={g.ticket_id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{g.ticket_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      <p className="text-slate-900 font-medium">{g.submitter_name}</p>
                      <p className="text-xs">{g.submitter_type}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{g.category || g.complaint_for}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={g.priority || 'Low'} /></td>
                    <td className="px-6 py-4 whitespace-nowrap"><GrievanceStatusBadge status={g.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(g.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => { setSelected(g); setIsModalOpen(true); }}
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 transition bg-slate-100 px-3 py-1.5 rounded-lg"
                      >
                        <Settings2 className="w-4 h-4" />
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pagination.pages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <span className="text-sm text-slate-500">Page {filters.page} of {pagination.pages}</span>
            <div className="flex gap-2">
              <button
                disabled={filters.page === 1}
                onClick={() => setFilters(p => ({ ...p, page: p.page - 1 }))}
                className="px-3 py-1 rounded-lg border border-slate-300 bg-white text-sm disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={filters.page === pagination.pages}
                onClick={() => setFilters(p => ({ ...p, page: p.page + 1 }))}
                className="px-3 py-1 rounded-lg border border-slate-300 bg-white text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <GrievanceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        grievance={selected}
        mode="manage"
        onUpdate={fetchData}
      />
    </div>
  );
};

export default GrievanceManagementPanel;
