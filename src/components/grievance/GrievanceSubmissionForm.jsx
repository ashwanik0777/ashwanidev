import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Upload, X, Loader2 } from 'lucide-react';
import GrievanceCategorySelect from './GrievanceCategorySelect';
import { submitGrievance, getModuleStatus } from '../../services/grievanceService';

const GrievanceSubmissionForm = ({ userType, onSubmitSuccess }) => {
  const [moduleEnabled, setModuleEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    complaintFor: '',
    issueType: '',
    category: '',
    subCategory: '',
    priority: 'Low',
    subject: '',
    description: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    getModuleStatus().then(res => {
      if (res.data?.success) {
        const status = userType === 'faculty' ? res.data.data.module_enabled : res.data.data.student_module_enabled;
        setModuleEnabled(status);
      }
    }).catch(err => console.error(err));
  }, [userType]);

  const handleFieldChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    setWordCount(words);
    handleFieldChange('description', text);
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const maxMb = userType === 'faculty' ? 8 : 5;
    if (selected.size > maxMb * 1024 * 1024) {
      toast.error(`File size must be less than ${maxMb}MB`);
      return;
    }

    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!allowed.includes(selected.type)) {
      toast.error('Invalid file type');
      return;
    }

    setFile(selected);
    if (selected.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount > 100) {
      toast.error('Description must be 100 words or less');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      if (userType === 'faculty') {
        // Faculty: auto-set category, sub_category from issueType, auto-generate subject
        formData.append('category', 'Faculty Maintenance');
        formData.append('sub_category', form.issueType || 'Other');
        formData.append('complaint_for', form.complaintFor || '');
        formData.append('subject', `Faculty Issue [${form.complaintFor || 'General'}]: ${form.issueType || 'Other'}`);
        formData.append('priority', 'Medium');
      } else {
        // Student: direct mapping from camelCase form state to snake_case backend keys
        formData.append('category', form.category || '');
        formData.append('sub_category', form.subCategory || '');
        formData.append('subject', form.subject || '');
        formData.append('priority', form.priority || 'Medium');
      }

      formData.append('description', form.description || '');
      formData.append('submitter_type', userType);
      if (file) formData.append('attachment', file);

      const res = await submitGrievance(formData);
      if (res.data?.success) {
        toast.success(`Grievance submitted successfully. Ticket ID: ${res.data.data.ticket_id}`);
        if (onSubmitSuccess) onSubmitSuccess();
        // Reset form
        setForm({ complaintFor: '', issueType: '', category: '', subCategory: '', priority: 'Low', subject: '', description: '' });
        setFile(null);
        setPreview(null);
        setWordCount(0);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit grievance');
    } finally {
      setLoading(false);
    }
  };

  if (!moduleEnabled) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
        <h3 className="font-semibold text-lg mb-2">Grievance Module Offline</h3>
        <p>The grievance module is currently disabled. Please try again later.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-6">
      <GrievanceCategorySelect
        type={userType}
        {...form}
        onChange={handleFieldChange}
      />

      {userType === 'student' && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
          <input
            type="text"
            required
            value={form.subject}
            onChange={e => handleFieldChange('subject', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
          />
        </div>
      )}

      <div>
        <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-2">
          <span>Description</span>
          <span className={`text-xs ${wordCount > 100 ? 'text-rose-600 font-semibold' : 'text-slate-500'}`}>
            {wordCount} / 100 words
          </span>
        </label>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={handleDescriptionChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Attachment (Optional)</label>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer flex items-center justify-center px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
            <input type="file" className="hidden" onChange={handleFileChange} accept=".jpg,.jpeg,.png,.webp,.pdf" />
          </label>
          {file && (
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <span className="truncate max-w-[150px]">{file.name}</span>
              <button type="button" onClick={() => { setFile(null); setPreview(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
        {preview && (
          <div className="mt-4">
            <img src={preview} alt="Preview" className="h-32 object-cover rounded-lg border border-slate-200" />
          </div>
        )}
        <p className="mt-2 text-xs text-slate-500">Max {userType === 'faculty' ? '8MB' : '5MB'}. Allowed: JPG, PNG, WEBP, PDF.</p>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="submit"
          disabled={loading || wordCount > 100}
          className="flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {loading ? 'Submitting...' : 'Submit Grievance'}
        </button>
      </div>
    </form>
  );
};

export default GrievanceSubmissionForm;
