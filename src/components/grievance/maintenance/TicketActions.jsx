import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Upload, X, ChevronDown, Star } from 'lucide-react';
import {
  performMaintenanceAction,
  listMaintenanceVendors,
  getMaintenanceConfig,
  getApiErrorMessage,
} from '../../../services/maintenanceService';
import { DECISION_LABELS, inputClass, todayKey } from './maintenanceMeta';

/*
 * Form definitions for each workflow action. The backend sends the actions the
 * current user may perform (`allowed_actions`); only those are rendered.
 */
const ACTION_FORMS = {
  assign_vendor: {
    title: 'Assign work to vendor',
    hint: 'Starts the 2-working-day site visit timer.',
    button: 'Assign Vendor',
    fields: [
      { name: 'vendor_id', type: 'vendor', label: 'Vendor', required: true },
      { name: 'remarks', type: 'textarea', label: 'Instructions for vendor (optional)' },
    ],
  },
  follow_up: {
    title: 'Follow up with vendor',
    hint: 'Notifies the vendor and restarts the 2-working-day site visit timer.',
    button: 'Send Follow-up',
    fields: [{ name: 'remarks', type: 'textarea', label: 'Follow-up remarks', required: true }],
  },
  submit_inspection: {
    title: 'Submit site inspection report',
    hint: 'Confirms your site visit. If you fixed the problem during the visit, tick the box — the JE will then review and close the ticket instead of approving a date.',
    button: 'Submit Inspection Report',
    attachment: true,
    fields: [
      { name: 'work_completed', type: 'checkbox', label: 'Work completed during this inspection visit' },
      { name: 'inspection_report', type: 'textarea', label: 'Inspection report', required: true },
      { name: 'estimated_completion_date', type: 'date', label: 'Estimated completion date', required: true, showWhen: { work_completed: '' } },
    ],
  },
  approve_timeline: {
    title: 'Approve expected completion date',
    hint: 'Defaults to the vendor\'s estimate — change it if needed.',
    button: 'Approve Timeline',
    fields: [
      { name: 'approved_completion_date', type: 'date', label: 'Approved completion date', required: true, defaultFrom: 'vendor_estimated_date' },
      { name: 'remarks', type: 'textarea', label: 'Remarks' },
    ],
  },
  mark_completed: {
    title: 'Mark work as completed',
    hint: 'The JE will verify the work before closing the ticket.',
    button: 'Mark Completed',
    tone: 'success',
    attachment: true,
    fields: [{ name: 'remarks', type: 'textarea', label: 'Completion remarks', required: true }],
  },
  submit_feedback: {
    title: 'Give your feedback on the work',
    hint: 'The vendor has reported the work as completed. Please check it — the JE will close the complaint only after your feedback.',
    button: 'Submit Feedback',
    tone: 'primary',
    attachment: true,
    attachmentWhen: { satisfied: 'no' },
    attachmentLabel: 'Photo of the pending work (optional)',
    fields: [
      { name: 'satisfied', type: 'satisfaction', label: 'Has the problem been resolved?', required: true },
      { name: 'rating', type: 'rating', label: 'Rate the work', required: true },
      { name: 'remarks', type: 'textarea', label: 'Comments', requiredWhen: { satisfied: 'no' } },
    ],
  },
  mark_resolved: {
    title: 'Work satisfactory — resolve & close',
    hint: 'Notifies the faculty member and closes the ticket.',
    button: 'Mark Resolved & Close',
    tone: 'success',
    fields: [{ name: 'remarks', type: 'textarea', label: 'Closing remarks (optional)' }],
  },
  request_rework: {
    title: 'Work not satisfactory — request rework',
    button: 'Request Rework',
    tone: 'warning',
    attachment: true,
    fields: [
      { name: 'remarks', type: 'textarea', label: 'What needs to be fixed', required: true },
      { name: 'approved_completion_date', type: 'date', label: 'Revised completion date', defaultFrom: 'approved_completion_date' },
    ],
  },
  revise_timeline: {
    title: 'Approve revised timeline',
    hint: 'Use after reviewing the vendor\'s delay remarks.',
    button: 'Approve Revised Date',
    fields: [
      { name: 'approved_completion_date', type: 'date', label: 'Revised completion date', required: true },
      { name: 'remarks', type: 'textarea', label: 'Remarks', required: true },
    ],
  },
  escalate: {
    title: 'Escalate to senior officers',
    hint: 'All three senior officers and the Director will see this case.',
    button: 'Escalate',
    tone: 'danger',
    fields: [{ name: 'remarks', type: 'textarea', label: 'Reason for escalation', required: true }],
  },
  escalation_decision: {
    title: 'Record escalation decision',
    button: 'Record Decision',
    fields: [
      { name: 'decision', type: 'decision', label: 'Decision', required: true },
      { name: 'approved_completion_date', type: 'date', label: 'New completion date', required: true, showWhen: { decision: 'continue_with_vendor' } },
      { name: 'vendor_id', type: 'vendor', label: 'New vendor', required: true, showWhen: { decision: 'reassign_vendor' } },
      { name: 'remarks', type: 'textarea', label: 'Escalation remarks', required: true },
    ],
  },
  assign_je: {
    title: 'Assign / change JE',
    button: 'Assign JE',
    fields: [
      { name: 'je_id', type: 'je', label: 'JE', required: true },
      { name: 'remarks', type: 'textarea', label: 'Remarks (optional)' },
    ],
  },
};

const TONE_CLASSES = {
  default: 'bg-slate-900 hover:bg-slate-800',
  primary: 'bg-blue-600 hover:bg-blue-700',
  success: 'bg-emerald-600 hover:bg-emerald-700',
  warning: 'bg-orange-600 hover:bg-orange-700',
  danger: 'bg-rose-600 hover:bg-rose-700',
};

const isVisible = (field, values) =>
  !field.showWhen || Object.entries(field.showWhen).every(([key, value]) => values[key] === value);

const isRequired = (field, values) =>
  Boolean(field.required) ||
  Boolean(field.requiredWhen && Object.entries(field.requiredWhen).every(([key, value]) => values[key] === value));

const SATISFACTION_OPTIONS = [
  { value: 'yes', label: 'Yes, resolved', active: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
  { value: 'no', label: 'No, still pending', active: 'border-rose-500 bg-rose-50 text-rose-800' },
];

const buildInitialValues = (form, ticket) =>
  Object.fromEntries(
    form.fields.map((field) => {
      const fallback = field.defaultFrom ? ticket[field.defaultFrom] : '';
      let value = fallback ?? '';
      if (field.type === 'date' && value && String(value) < todayKey()) value = '';
      return [field.name, value === null ? '' : String(value)];
    })
  );

const ActionForm = ({ actionName, form, ticket, staffOptions, onDone }) => {
  const [values, setValues] = useState(() => buildInitialValues(form, ticket));
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const setValue = (name, value) => setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    const visibleFields = form.fields.filter((field) => isVisible(field, values));
    const missing = visibleFields.find((field) => isRequired(field, values) && !String(values[field.name] || '').trim());
    if (missing) {
      toast.error(`${missing.label} is required`);
      return;
    }

    const payload = Object.fromEntries(visibleFields.map((field) => [field.name, values[field.name]]));
    // Send the file only while its upload box is shown (e.g. feedback photo only when "No").
    const sendFile = form.attachment && isVisible({ showWhen: form.attachmentWhen }, values) ? file : null;
    setSubmitting(true);
    try {
      const detail = await performMaintenanceAction(ticket.ticket_id, actionName, payload, sendFile);
      toast.success(`${form.title} — done`);
      onDone(detail);
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Action failed'));
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field) => {
    const value = values[field.name] ?? '';
    const common = { id: `${actionName}-${field.name}`, value, onChange: (e) => setValue(field.name, e.target.value) };

    switch (field.type) {
      case 'textarea':
        return <textarea {...common} rows={3} className={`${inputClass} resize-y`} />;
      case 'date':
        return <input {...common} type="date" min={todayKey()} className={inputClass} />;
      case 'percent':
        return <input {...common} type="number" min={0} max={100} step={1} className={inputClass} />;
      case 'checkbox':
        // Stored as 'true' / '' so it can drive `showWhen` like the other string fields.
        return (
          <input
            id={common.id}
            type="checkbox"
            checked={value === 'true'}
            onChange={(e) => setValue(field.name, e.target.checked ? 'true' : '')}
            className="h-4 w-4 rounded border-slate-300"
          />
        );
      case 'vendor':
      case 'je': {
        const options = field.type === 'vendor' ? staffOptions.vendors : staffOptions.jes;
        return (
          <select {...common} className={inputClass}>
            <option value="">{options === null ? 'Loading…' : `Select ${field.type === 'vendor' ? 'vendor' : 'JE'}…`}</option>
            {(options || [])
              .filter((option) => option.id !== (field.type === 'vendor' ? ticket.assigned_vendor_id : ticket.assigned_je_id))
              .map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                  {option.company_name ? ` — ${option.company_name}` : ''}
                  {option.designation ? ` — ${option.designation}` : ''}
                </option>
              ))}
          </select>
        );
      }
      case 'rating':
        return (
          <div className="flex items-center gap-1" role="radiogroup" aria-label={field.label}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                role="radio"
                aria-checked={Number(value) === star}
                aria-label={`${star} out of 5`}
                onClick={() => setValue(field.name, String(star))}
                className="rounded p-0.5 transition hover:scale-110"
              >
                <Star className={`h-7 w-7 ${Number(value) >= star ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
              </button>
            ))}
            {value && <span className="ml-2 text-sm text-slate-600">{value} / 5</span>}
          </div>
        );
      case 'satisfaction':
        return (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SATISFACTION_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setValue(field.name, option.value)}
                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition ${
                  value === option.value ? option.active : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        );
      case 'decision':
        return (
          <div className="space-y-2">
            {Object.entries(DECISION_LABELS).map(([key, label]) => (
              <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-slate-700">
                <input type="radio" name={`${actionName}-decision`} checked={value === key} onChange={() => setValue(field.name, key)} />
                {label}
              </label>
            ))}
          </div>
        );
      default:
        return <input {...common} type="text" className={inputClass} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {form.hint && <p className="text-xs text-slate-500">{form.hint}</p>}
      {form.fields.filter((field) => isVisible(field, values)).map((field) =>
        field.type === 'checkbox' ? (
          <label key={field.name} className="flex cursor-pointer items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-800">
            {renderField(field)}
            {field.label}
          </label>
        ) : (
          <div key={field.name}>
            <label htmlFor={`${actionName}-${field.name}`} className="mb-1.5 block text-sm font-medium text-slate-700">
              {field.label}
              {isRequired(field, values) && <span className="text-rose-500"> *</span>}
            </label>
            {renderField(field)}
          </div>
        )
      )}

      {form.attachment && isVisible({ showWhen: form.attachmentWhen }, values) && (
        <div>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">{form.attachmentLabel || 'Photo / supporting file (optional)'}</span>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <Upload className="mr-2 h-4 w-4" />
              Choose file
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected && selected.size > 8 * 1024 * 1024) {
                    toast.error('File must be 8 MB or smaller');
                    return;
                  }
                  setFile(selected || null);
                }}
              />
            </label>
            {file && (
              <span className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-600">
                <span className="max-w-[180px] truncate">{file.name}</span>
                <button type="button" onClick={() => setFile(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50 ${TONE_CLASSES[form.tone || 'default']}`}
      >
        {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {form.button}
      </button>
    </form>
  );
};

const TicketActions = ({ ticket, allowedActions, onUpdated }) => {
  const actions = useMemo(() => (allowedActions || []).filter((name) => ACTION_FORMS[name]), [allowedActions]);
  const [openAction, setOpenAction] = useState(actions[0] || null);
  const [staffOptions, setStaffOptions] = useState({ vendors: null, jes: null });

  const needsVendors = actions.some((name) => ACTION_FORMS[name].fields.some((field) => field.type === 'vendor'));
  const needsJes = actions.includes('assign_je');

  useEffect(() => {
    setOpenAction(actions[0] || null);
  }, [actions]);

  useEffect(() => {
    if (!needsVendors) return;
    listMaintenanceVendors(ticket.trade)
      .then((vendors) => setStaffOptions((prev) => ({ ...prev, vendors: vendors || [] })))
      .catch(() => setStaffOptions((prev) => ({ ...prev, vendors: [] })));
  }, [needsVendors, ticket.trade]);

  useEffect(() => {
    if (!needsJes) return;
    getMaintenanceConfig()
      .then((config) => setStaffOptions((prev) => ({ ...prev, jes: (config?.staff || []).filter((s) => s.role === 'je' && s.is_active) })))
      .catch(() => setStaffOptions((prev) => ({ ...prev, jes: [] })));
  }, [needsJes]);

  if (!actions.length) return null;

  return (
    <div className="space-y-3">
      {actions.map((name) => {
        const form = ACTION_FORMS[name];
        const isOpen = openAction === name;
        return (
          <div key={name} className={`rounded-xl border ${isOpen ? 'border-slate-400 bg-white' : 'border-slate-200 bg-slate-50'}`}>
            <button
              type="button"
              onClick={() => setOpenAction(isOpen ? null : name)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-800"
            >
              {form.title}
              <span
                className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-sm transition ${
                  isOpen ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-sky-600 text-white hover:bg-sky-700'
                }`}
              >
                {isOpen ? 'Hide' : 'Open'}
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </span>
            </button>
            {isOpen && (
              <div className="border-t border-slate-200 px-4 py-4">
                <ActionForm
                  key={`${ticket.ticket_id}-${ticket.stage}-${name}`}
                  actionName={name}
                  form={form}
                  ticket={ticket}
                  staffOptions={staffOptions}
                  onDone={onUpdated}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TicketActions;
