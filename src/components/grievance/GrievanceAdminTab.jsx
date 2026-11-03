import React, { useState, useEffect } from 'react';
import { Loader2, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getMaintenanceModuleStatus,
  setMaintenanceModuleEnabled,
  getApiErrorMessage,
} from '../../services/maintenanceService';
import MaintenanceOverview from './maintenance/MaintenanceOverview';
import MaintenanceAdminConfig from './maintenance/MaintenanceAdminConfig';

const SUB_TABS = [
  { id: 'maintenance', label: 'Faculty Maintenance Complaints' },
  { id: 'maintenance-settings', label: 'Maintenance Settings' },
];

const GrievanceAdminTab = () => {
  const [moduleEnabled, setModuleEnabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subTab, setSubTab] = useState('maintenance');

  useEffect(() => {
    getMaintenanceModuleStatus()
      .then((status) => setModuleEnabled(status?.module_enabled !== false))
      .catch((error) => toast.error(getApiErrorMessage(error, 'Failed to load grievance settings')))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    setSaving(true);
    try {
      const result = await setMaintenanceModuleEnabled(!moduleEnabled);
      setModuleEnabled(result.module_enabled);
      toast.success(result.module_enabled ? 'Complaint submission switched on' : 'Complaint submission switched off');
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to update module setting'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-slate-400" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
          <Settings className="w-6 h-6 text-slate-700" />
          <h2 className="text-lg font-bold text-slate-900">Grievance Module Settings</h2>
        </div>
        <div className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 md:max-w-xl">
          <div>
            <h3 className="font-semibold text-slate-900">Faculty Maintenance Complaints</h3>
            <p className="text-sm text-slate-500">Allow faculty to raise new complaints. Tickets already raised keep moving either way.</p>
          </div>
          <button
            type="button"
            onClick={handleToggle}
            disabled={saving}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-60 ${moduleEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${moduleEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {SUB_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSubTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              subTab === tab.id ? 'bg-slate-900 text-white shadow' : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {subTab === 'maintenance' && <MaintenanceOverview />}
      {subTab === 'maintenance-settings' && <MaintenanceAdminConfig />}
    </div>
  );
};

export default GrievanceAdminTab;
