import React, { useState, useEffect } from 'react';
import { getGrievanceSettings, toggleModule, toggleStudentModule } from '../../services/grievanceService';
import GrievanceManagementPanel from './GrievanceManagementPanel';
import { Loader2, Settings } from 'lucide-react';
import toast from 'react-hot-toast';

const GrievanceAdminTab = () => {
  const [settings, setSettings] = useState({ module_enabled: true, student_module_enabled: true });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await getGrievanceSettings();
        if (res.data?.success) {
          setSettings(res.data.data);
        }
      } catch (err) {
        toast.error('Failed to load grievance settings');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleToggle = async (type) => {
    try {
      if (type === 'faculty') {
        await toggleModule();
        setSettings(s => ({ ...s, module_enabled: !s.module_enabled }));
        toast.success('Faculty module toggled');
      } else {
        await toggleStudentModule();
        setSettings(s => ({ ...s, student_module_enabled: !s.student_module_enabled }));
        toast.success('Student module toggled');
      }
    } catch (err) {
      toast.error('Failed to toggle module setting');
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-semibold text-slate-900">Faculty/Staff Module</h3>
              <p className="text-sm text-slate-500">Enable or disable grievance submissions for faculty and staff.</p>
            </div>
            <button
              onClick={() => handleToggle('faculty')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.module_enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.module_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <h3 className="font-semibold text-slate-900">Student Module</h3>
              <p className="text-sm text-slate-500">Enable or disable grievance submissions for students.</p>
            </div>
            <button
              onClick={() => handleToggle('student')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${settings.student_module_enabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${settings.student_module_enabled ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <GrievanceManagementPanel
        scopeLabel="Admin Overview"
        showSchoolFilter={true}
        showSubmitterTypeFilter={true}
      />
    </div>
  );
};

export default GrievanceAdminTab;
