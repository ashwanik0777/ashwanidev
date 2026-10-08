import React, { useState, useEffect, useCallback } from 'react';
import { getManagedGrievances, getManagementStats } from '../../services/grievanceService';
import { GrievanceStatusBadge, PriorityBadge } from './GrievanceStatusBadge';
import GrievanceDetailModal from './GrievanceDetailModal';
import GrievanceStatsCards from './GrievanceStatsCards';
import GrievanceFilterBar from './GrievanceFilterBar';
import { Loader2, Eye, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';

const GrievanceVCPanel = () => {
  const [grievances, setGrievances] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', status: 'All', school: 'All', submitterType: 'All', page: 1, limit: 10 });
  const [pagination, setPagination] = useState({ total: 0, pages: 1 });
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      toast.error('Failed to load VC overview data');
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

  return (
    <div>
      <div className="bg-blue-600 text-white p-4 rounded-2xl mb-6 shadow-sm flex items-center gap-3">
        <ShieldAlert className="w-6 h-6" />
        <div>
          <h2 className="text-lg font-bold">Vice Chancellor Overview</h2>
          <p className="text-blue-100 text-sm">Read-Only Overview of all University Grievances</p>
        </div>
      </div>

      <GrievanceStatsCards stats={stats} />
      <GrievanceFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        showSchoolFilter={true}
        showSubmitterTypeFilter={true}
      />

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : grievances.length === 0 ? (
          <div className="text-center py-12 text-slate-500">No grievances found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitter</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type of Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">School</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{g.sub_category || g.subject || g.issue_type}</span>
                        {(g.complaint_for || g.category) && (
                          <span className="mt-1 inline-flex w-fit items-center rounded-md bg-sky-100 px-2 py-0.5 text-xs font-medium text-sky-700">
                            {g.complaint_for || g.category}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{g.school_name || g.school_code || 'N/A'}</td>
                    <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={g.priority || 'Low'} /></td>
                    <td className="px-6 py-4 whitespace-nowrap"><GrievanceStatusBadge status={g.status} /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => { setSelected(g); setIsModalOpen(true); }}
                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 transition bg-blue-50 px-3 py-1.5 rounded-lg"
                      >
                        <Eye className="w-4 h-4" />
                        View Ticket
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
        mode="vc"
      />
    </div>
  );
};

export default GrievanceVCPanel;
