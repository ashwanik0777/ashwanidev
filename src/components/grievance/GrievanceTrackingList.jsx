import React, { useState, useEffect } from 'react';
import { getMyGrievances } from '../../services/grievanceService';
import { GrievanceStatusBadge, PriorityBadge } from './GrievanceStatusBadge';
import GrievanceDetailModal from './GrievanceDetailModal';
import { Loader2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const GrievanceTrackingList = ({ userType, refreshTrigger }) => {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchGrievances = async () => {
    setLoading(true);
    try {
      const res = await getMyGrievances();
      if (res.data?.success) {
        setGrievances(res.data.data);
      }
    } catch (err) {
      toast.error('Failed to load grievances');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrievances();
    const handleRefresh = () => fetchGrievances();
    window.addEventListener('grievance-submitted', handleRefresh);
    return () => window.removeEventListener('grievance-submitted', handleRefresh);
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (grievances.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 shadow-sm">
        <p className="text-slate-500">No grievances submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject/Issue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {grievances.map((g) => (
              <tr key={g.ticket_id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">#{g.ticket_id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{g.category || g.complaint_for}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 truncate max-w-[200px]">{g.subject || g.issue_type}</td>
                <td className="px-6 py-4 whitespace-nowrap"><PriorityBadge priority={g.priority || 'Low'} /></td>
                <td className="px-6 py-4 whitespace-nowrap"><GrievanceStatusBadge status={g.status} /></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{new Date(g.created_at).toLocaleString([], { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => { setSelected(g); setIsModalOpen(true); }}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-900 transition"
                  >
                    <Eye className="w-4 h-4" />
                    Track
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <GrievanceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        grievance={selected}
        mode="view"
      />
    </div>
  );
};

export default GrievanceTrackingList;
