import React, { useEffect, useMemo, useRef, useState } from 'react';
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
const MAX_PHOTOS = 3;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

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

// Every field is required; the red star says so.
const StepLabel = ({ children }) => (
  <label className="mb-2 block text-sm font-semibold text-slate-800">
    {children} <span className="text-rose-600">*</span>
  </label>
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
  // Up to MAX_PHOTOS photos: [{ file, preview }].
  const [photos, setPhotos] = useState([]);
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

  // Free the preview URLs when the form unmounts.
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((photo) => URL.revokeObjectURL(photo.preview)), []);

  const category = useMemo(
    () => meta?.categories.find((item) => item.category_key === form.location_category),
    [meta, form.location_category]
  );
  const wordCount = countWords(form.description);

  const setField = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const chooseCategory = (key) => setForm((prev) => ({ ...prev, location_category: key, location_id: '' }));

  const handleFiles = (event) => {
    const selected = Array.from(event.target.files || []);
    event.target.value = '';
    if (!selected.length) return;

    const room = MAX_PHOTOS - photos.length;
    if (selected.length > room) toast.error(`You can upload up to ${MAX_PHOTOS} photos`);

    const accepted = [];
    for (const file of selected.slice(0, Math.max(room, 0))) {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error('Only JPG, PNG or WEBP photos are allowed');
        continue;
      }
      if (file.size > MAX_FILE_MB * 1024 * 1024) {
        toast.error(`Each photo must be ${MAX_FILE_MB} MB or smaller`);
        continue;
      }
      accepted.push({ file, preview: URL.createObjectURL(file) });
    }
    if (accepted.length) setPhotos((prev) => [...prev, ...accepted]);
  };

  const removePhoto = (index) => {
    URL.revokeObjectURL(photos[index]?.preview);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const clearPhotos = () => {
    photos.forEach((photo) => URL.revokeObjectURL(photo.preview));
    setPhotos([]);
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
    if (!form.submitter_contact.trim()) return toast.error('Please enter your contact number');
    if (!/^[0-9+\-\s]{7,15}$/.test(form.submitter_contact.trim())) return toast.error('Please enter a valid contact number');

    setSubmitting(true);
    try {
      const result = await submitMaintenanceTicket(form, photos.map((photo) => photo.file));
      setLastTicket(result);
      toast.success(`Complaint submitted. Ticket ID: ${result.ticket_id}`);
      setForm(EMPTY_FORM);
      clearPhotos();
      onSubmitted?.(result);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Failed to submit complaint'));
    } finally {
      setSubmitting(false);
    }
  };

  if (!moduleEnabled) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center text-rose-700">
        <h3 className="mb-2 text-lg font-semibold">Online Maintenance Offline</h3>
        <p>Online Maintenance is currently disabled. Please try again later.</p>
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
          <StepLabel>Contact number for site visit</StepLabel>
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
          <StepLabel>Severity Level</StepLabel>
          <select value={form.severity_level} onChange={(e) => setField('severity_level', e.target.value)} className={inputClass}>
            <option value="">Select severity level…</option>
            {(meta.severity_levels || []).map((level) => (
              <option key={level.key} value={level.key}>{level.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-800">Photos of the problem (optional, up to {MAX_PHOTOS})</label>
        <div className="flex flex-wrap items-start gap-3">
          {photos.map((photo, index) => (
            <div key={photo.preview} className="relative">
              <img src={photo.preview} alt={`Photo ${index + 1}`} className="h-24 w-24 rounded-lg border border-slate-200 object-cover sm:h-28 sm:w-28" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute -right-2 -top-2 rounded-full bg-white p-0.5 text-slate-500 shadow ring-1 ring-slate-200 hover:text-rose-600"
                aria-label={`Remove photo ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <label className="flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:bg-slate-50 sm:h-28 sm:w-28">
              <Upload className="mb-1 h-5 w-5" />
              Add photo
              <input type="file" className="hidden" onChange={handleFiles} accept=".jpg,.jpeg,.png,.webp" multiple />
            </label>
          )}
        </div>
        <p className="mt-2 text-xs text-slate-500">{photos.length} / {MAX_PHOTOS} photos · Max {MAX_FILE_MB} MB each. Allowed: JPG, PNG, WEBP.</p>
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-4">
        <button
          type="submit"
          disabled={submitting || wordCount > MAX_WORDS}
          className="flex items-center justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitting ? 'Submitting…' : 'Submit Complaint'}
        </button>
      </div>
    </form>
  );
};

export default MaintenanceComplaintForm;
