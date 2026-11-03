import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Upload, X, Loader2, Building2, Wrench, Droplet, Droplets, Zap, Fan, Sparkles, HelpCircle, Hammer, CheckCircle2 } from 'lucide-react';
import {
  getMaintenanceMeta,
  getMaintenanceModuleStatus,
  submitMaintenanceTicket,
  getApiErrorMessage,
} from '../../../services/maintenanceService';
import { inputClass } from './maintenanceMeta';

const MAX_WORDS = 100;
const MAX_FILE_MB = 8;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

const ISSUE_ICONS = {
  civil: Building2,
  carpentry: Hammer,
  plumbing: Droplet,
  water: Droplets,
  electrical: Zap,
  lift_hvac: Fan,
  cleanliness: Sparkles,
  other: HelpCircle,
};

const EMPTY_FORM = {
  location_category: '',
  location_id: '',
  exact_location: '',
  issue_type: '',
  description: '',
  severity_level: '',
  submitter_contact: '',
};

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

const StepLabel = ({ children }) => (
  <label className="mb-2 block text-sm font-semibold text-slate-800">{children}</label>
);

/*
 * Faculty complaint form, in the order of the flow diagram:
 * location category -> school / residence / campus facility -> exact location
 * -> issue type -> description -> photo -> submit.
 */
const MaintenanceComplaintForm = ({ onSubmitted }) => {
  const [meta, setMeta] = useState(null);
  const [moduleEnabled, setModuleEnabled] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [lastTicket, setLastTicket] = useState(null);

  useEffect(() => {
    getMaintenanceMeta()
      .then(setMeta)
      .catch((error) => toast.error(getApiErrorMessage(error, 'Could not load complaint options')));
    getMaintenanceModuleStatus()
      .then((status) => setModuleEnabled(status?.module_enabled !== false))
      .catch(() => {});
  }, []);

  useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

  const category = useMemo(
    () => meta?.categories.find((item) => item.category_key === form.location_category),
    [meta, form.location_category]
  );
  const wordCount = countWords(form.description);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const chooseCategory = (key) => setForm((prev) => ({ ...prev, location_category: key, location_id: '' }));

  const handleFile = (event) => {
    const selected = event.target.files?.[0];
    event.target.value = '';
    if (!selected) return;
    if (!ALLOWED_TYPES.includes(selected.type)) {
      toast.error('Only JPG, PNG, WEBP or PDF files are allowed');
      return;
    }
    if (selected.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(`File must be ${MAX_FILE_MB} MB or smaller`);
      return;
    }
    setFile(selected);
    setPreview(selected.type.startsWith('image/') ? URL.createObjectURL(selected) : null);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.location_category) return toast.error('Please select where the problem is');
    if (!form.location_id) return toast.error(`Please ${category?.picker_label?.toLowerCase() || 'select a location'}`);
    if (!form.exact_location.trim()) return toast.error('Please enter the exact location');
    if (!form.issue_type) return toast.error('Please select the issue type');
    if (!form.severity_level) return toast.error('Please select the severity level');
    if (!form.description.trim()) return toast.error('Please describe the problem');
    if (wordCount > MAX_WORDS) return toast.error(`Description must be ${MAX_WORDS} words or less`);

    setSubmitting(true);
    try {
      const result = await submitMaintenanceTicket(form, file);
      setLastTicket(result);
      toast.success(`Grievance submitted. Ticket ID: ${result.ticket_id}`);
      setForm(EMPTY_FORM);
      clearFile();
      onSubmitted?.(result);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to submit grievance'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!moduleEnabled) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
        <h3 className="mb-2 text-lg font-semibold">Grievance Module Offline</h3>
        <p>The grievance module is currently disabled. Please try again later.</p>
      </div>
    );
  }

  if (!meta) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-7 w-7 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {lastTicket && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">Ticket #{lastTicket.ticket_id} created.</p>
            <p>
              {lastTicket.assigned_je_name
                ? `It has been sent to ${lastTicket.assigned_je_name}. You can track it below.`
                : 'It will be assigned to the responsible JE shortly. You can track it below.'}
            </p>
          </div>
          <button type="button" onClick={() => setLastTicket(null)} className="ml-auto text-emerald-700 hover:text-emerald-900">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div>
        <StepLabel>Complaint for</StepLabel>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {meta.categories.map((item) => (
            <button
              key={item.category_key}
              type="button"
              onClick={() => chooseCategory(item.category_key)}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                form.location_category === item.category_key
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {category && (
        <div>
          <StepLabel>{category.picker_label}</StepLabel>
          <select value={form.location_id} onChange={(e) => setField('location_id', e.target.value)} className={inputClass}>
            <option value="">{category.picker_label}…</option>
            {category.locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <StepLabel>Exact location</StepLabel>
        <input
          value={form.exact_location}
          onChange={(e) => setField('exact_location', e.target.value)}
          maxLength={300}
          placeholder="e.g. Block B, 2nd floor, Room 214 / House no. 12"
          className={inputClass}
        />
      </div>

      <div>
        <StepLabel>Issue type</StepLabel>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {meta.issue_types.map((issue) => {
            const Icon = ISSUE_ICONS[issue.issue_key] || Wrench;
            const selected = form.issue_type === issue.issue_key;
            return (
              <button
                key={issue.issue_key}
                type="button"
                onClick={() => setField('issue_type', issue.issue_key)}
                className={`flex flex-col items-center justify-center rounded-xl border p-4 transition ${
                  selected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="mb-2 h-6 w-6" />
                <span className="text-sm font-medium">{issue.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <StepLabel>Description</StepLabel>
          <span className={`text-xs ${wordCount > MAX_WORDS ? 'font-semibold text-rose-600' : 'text-slate-500'}`}>
            {wordCount} / {MAX_WORDS} words
          </span>
        </div>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setField('description', e.target.value)}
          placeholder="Describe the problem"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Contact number for site visit (optional)</label>
          <input
            value={form.submitter_contact}
            onChange={(e) => setField('submitter_contact', e.target.value)}
            maxLength={15}
            inputMode="tel"
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Severity Level</label>
          <select value={form.severity_level} onChange={(e) => setField('severity_level', e.target.value)} className={inputClass}>
            <option value="">Select severity level…</option>
            {(meta.severity_levels || []).map((level) => (
              <option key={level.key} value={level.key}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <StepLabel>Attach photo / supporting file (optional)</StepLabel>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
            <Upload className="mr-2 h-4 w-4" />
            Upload File
            <input type="file" className="hidden" onChange={handleFile} accept=".jpg,.jpeg,.png,.webp,.pdf" />
          </label>
          {file && (
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
              <span className="max-w-[180px] truncate">{file.name}</span>
              <button type="button" onClick={clearFile} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {preview && <img src={preview} alt="Preview" className="mt-3 h-32 rounded-lg border border-slate-200 object-cover" />}
        <p className="mt-2 text-xs text-slate-500">Max {MAX_FILE_MB} MB. Allowed: JPG, PNG, WEBP, PDF.</p>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={submitting || wordCount > MAX_WORDS}
          className="flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? 'Submitting…' : 'Submit Grievance'}
        </button>
      </div>
    </form>
  );
};

export default MaintenanceComplaintForm;
