import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, AlertCircle } from 'lucide-react';
import { GrievanceStatusBadge, PriorityBadge } from './GrievanceStatusBadge';
import { updateGrievanceStatus } from '../../services/grievanceService';
import { getPortalSession } from '../../utils/portalSession';
import toast from 'react-hot-toast';

const GrievanceDetailModal = ({ grievance, isOpen, onClose, mode, onUpdate }) => {
  const [status, setStatus] = useState('Open');
  const [adminRemark, setAdminRemark] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (grievance) {
      setStatus(grievance.status || 'Open');
      setAdminRemark(grievance.admin_remark || '');
    }
  }, [grievance]);

  if (!grievance) return null;

  const session = getPortalSession();
  const accessToken = session?.accessToken || '';
  const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const attachmentUrl = grievance.attachment_url
    ? `${apiBase}/grievances/attachment/${grievance.ticket_id}?token=${accessToken}`
    : null;

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const res = await updateGrievanceStatus(grievance.ticket_id, { status, admin_remark: adminRemark });
      if (res.data?.success) {
        toast.success('Status updated successfully');
        if (onUpdate) onUpdate();
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl pointer-events-auto flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-bold text-slate-900">#{grievance.ticket_id}</h2>
                  <GrievanceStatusBadge status={grievance.status} />
                </div>
                <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {mode === 'vc' && (
                <div className="bg-blue-50 border-b border-blue-100 p-4 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Vice Chancellor — Read-Only Access</span>
                </div>
              )}

              <div className="p-6 space-y-8 flex-1">
                {/* Submitter Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Submitter</p>
                    <p className="text-sm font-medium text-slate-900">{grievance.submitter_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Email</p>
                    <p className="text-sm font-medium text-slate-900 truncate">{grievance.submitter_email}</p>
                  </div>
                  {grievance.submitter_type === 'student' && grievance.school !== 'N/A' && (
                    <div>
                      <p className="text-xs text-slate-500 mb-1">School</p>
                      <p className="text-sm font-medium text-slate-900">{grievance.school}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Type</p>
                    <p className="text-sm font-medium text-slate-900">{grievance.submitter_type}</p>
                  </div>
                </div>


                {/* Details */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 border-b border-slate-100 pb-2">Grievance Details</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Category</p>
                      <p className="text-sm font-medium text-slate-900">{grievance.category || grievance.complaint_for}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Sub-Category</p>
                      <p className="text-sm font-medium text-slate-900">{grievance.sub_category || grievance.issue_type}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Priority</p>
                      <PriorityBadge priority={grievance.priority || 'Low'} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 mb-1">Subject</p>
                    <p className="text-sm font-medium text-slate-900">{grievance.subject || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Description</p>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">{grievance.description}</p>
                  </div>

                  {attachmentUrl && (
                    <div className="mt-4">
                      <p className="text-xs text-slate-500 mb-2">Attachment</p>
                      {/\.(jpg|jpeg|png|webp)$/i.test(grievance.attachment_url) && (
                        <img
                          src={attachmentUrl}
                          alt="Attachment"
                          className="mb-3 max-h-48 object-contain rounded-xl border border-slate-200"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      )}
                      <a
                        href={attachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-xl"
                      >
                        <Download className="w-4 h-4" />
                        View/Download Attachment
                      </a>
                    </div>
                  )}
                </div>

                {/* Admin Response Section */}
                {mode === 'manage' ? (
                  <div className="border-t border-slate-100 pt-6">
                    <h3 className="text-sm font-semibold text-slate-900 mb-4">Update Status</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Admin Remark</label>
                        <textarea
                          rows={3}
                          value={adminRemark}
                          onChange={(e) => setAdminRemark(e.target.value)}
                          placeholder="Enter remarks for the submitter..."
                          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  (grievance.admin_remark || mode === 'vc') && (
                    <div className="border-t border-slate-100 pt-6">
                      <h3 className="text-sm font-semibold text-slate-900 mb-4">Admin Response</h3>
                      <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm font-medium text-slate-900 mb-2">Status: <GrievanceStatusBadge status={grievance.status} /></p>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{grievance.admin_remark || 'No remarks added yet.'}</p>
                      </div>
                    </div>
                  )
                )}

                {/* Timeline */}
                <div className="border-t border-slate-100 pt-6 text-xs text-slate-500 flex flex-wrap gap-4">
                  <p>Created: {new Date(grievance.created_at).toLocaleString()}</p>
                  <p>Updated: {new Date(grievance.updated_at).toLocaleString()}</p>
                  {grievance.resolved_at && <p>Resolved: {new Date(grievance.resolved_at).toLocaleString()}</p>}
                </div>
              </div>

              {mode === 'manage' && (
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 rounded-b-2xl">
                  <button
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdate}
                    disabled={updating}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50"
                  >
                    {updating ? 'Updating...' : 'Update Status & Notify'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GrievanceDetailModal;
