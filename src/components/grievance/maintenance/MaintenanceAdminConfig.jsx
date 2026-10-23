import React, { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader2, Plus, Trash2 } from 'lucide-react';
import {
  getMaintenanceConfig,
  setMaintenanceCategoryActive,
  createMaintenanceLocation,
  updateMaintenanceLocation,
  updateMaintenanceRoutingRule,
  addMaintenanceHoliday,
  removeMaintenanceHoliday,
  getApiErrorMessage,
} from '../../../services/maintenanceService';
import { ROLE_LABELS, formatDate, inputClass } from './maintenanceMeta';

const Card = ({ title, description, children }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <h3 className="text-base font-bold text-slate-900">{title}</h3>
    {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
    <div className="mt-4">{children}</div>
  </section>
);

const Toggle = ({ checked, onChange, disabled }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-50 ${checked ? 'bg-emerald-500' : 'bg-slate-300'}`}
  >
    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const describeRule = (rule, categoryLabels, issueLabels) => {
  const parts = [];
  parts.push(rule.issue_type ? issueLabels[rule.issue_type] || rule.issue_type : rule.trade ? `Any ${rule.trade} issue` : 'Any issue');
  parts.push(rule.location_category ? `at ${categoryLabels[rule.location_category] || rule.location_category}` : 'anywhere');
  return parts.join(' ');
};

const MaintenanceAdminConfig = () => {
  const [config, setConfig] = useState(null);
  const [busy, setBusy] = useState(false);
  const [locationCategory, setLocationCategory] = useState('school');
  const [newLocation, setNewLocation] = useState({ label: '', source_no: '' });
  const [newHoliday, setNewHoliday] = useState({ holiday_date: '', label: '' });

  const load = useCallback(async () => {
    try {
      setConfig(await getMaintenanceConfig());
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Could not load maintenance settings'));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const run = async (fn, successMessage) => {
    setBusy(true);
    try {
      await fn();
      if (successMessage) toast.success(successMessage);
      await load();
    } catch (error) {
      toast.error(getApiErrorMessage(error, 'Update failed'));
    } finally {
      setBusy(false);
    }
  };

  const categoryLabels = useMemo(
    () => Object.fromEntries((config?.categories || []).map((c) => [c.category_key, c.label])),
    [config]
  );
  const issueLabels = useMemo(
    () => Object.fromEntries((config?.issue_types || []).map((i) => [i.issue_key, i.label])),
    [config]
  );
  const jes = useMemo(() => (config?.staff || []).filter((s) => s.role === 'je'), [config]);

  if (!config) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  const locations = config.locations.filter((location) => location.category_key === locationCategory);

  return (
    <div className="space-y-6">
      <Card
        title="Location categories"
        description="Shown to faculty as the first step (Complaint for). Hostel is prepared but switched off until hostel grievances go live."
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {config.categories.map((category) => (
            <div key={category.category_key} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div>
                <p className="font-semibold text-slate-900">{category.label}</p>
                <p className="text-xs text-slate-500">{category.picker_label}</p>
              </div>
              <Toggle
                checked={category.is_active}
                disabled={busy}
                onChange={(value) => run(() => setMaintenanceCategoryActive(category.category_key, value), `${category.label} ${value ? 'enabled' : 'disabled'}`)}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Locations" description="Schools, faculty residences and campus facilities offered in the complaint form. Disable a location instead of deleting it so old tickets keep their history.">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {config.categories.map((category) => (
            <button
              key={category.category_key}
              type="button"
              onClick={() => setLocationCategory(category.category_key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                locationCategory === category.category_key ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {category.label} ({config.locations.filter((l) => l.category_key === category.category_key).length})
            </button>
          ))}
        </div>

        <form
          className="mb-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newLocation.label.trim()) return toast.error('Enter a location name');
            run(
              () => createMaintenanceLocation({ category_key: locationCategory, ...newLocation }),
              'Location added'
            ).then(() => setNewLocation({ label: '', source_no: '' }));
          }}
        >
          <input
            value={newLocation.label}
            onChange={(e) => setNewLocation((prev) => ({ ...prev, label: e.target.value }))}
            placeholder={`New ${categoryLabels[locationCategory] || ''} location name`}
            className={inputClass}
          />
          <input
            value={newLocation.source_no}
            onChange={(e) => setNewLocation((prev) => ({ ...prev, source_no: e.target.value }))}
            placeholder="Source no. (optional)"
            className={`${inputClass} sm:w-48`}
          />
          <button type="submit" disabled={busy} className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </button>
        </form>

        <div className="max-h-96 overflow-y-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="sticky top-0 bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Source no.</th>
                <th className="px-3 py-2">Dropdown label</th>
                <th className="px-3 py-2 text-right">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {locations.map((location) => (
                <tr key={location.id} className={location.is_active ? '' : 'text-slate-400'}>
                  <td className="px-3 py-2">{location.source_no || '—'}</td>
                  <td className="px-3 py-2">{location.label}</td>
                  <td className="px-3 py-2 text-right">
                    <Toggle
                      checked={location.is_active}
                      disabled={busy}
                      onChange={(value) => run(() => updateMaintenanceLocation(location.id, { is_active: value }))}
                    />
                  </td>
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-slate-500">No locations in this category yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Routing rules (which JE gets which complaint)"
        description="The most specific matching rule wins: an exact issue type beats a location, which beats a trade. Complaints that match no rule wait in the admin overview for manual JE assignment."
      >
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Rule</th>
                <th className="px-3 py-2">Matches</th>
                <th className="px-3 py-2">Responsible JE</th>
                <th className="px-3 py-2 text-right">Active</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {config.routing_rules.map((rule) => (
                <tr key={rule.id}>
                  <td className="px-3 py-2 text-slate-700">{rule.description}</td>
                  <td className="px-3 py-2 text-slate-600">{describeRule(rule, categoryLabels, issueLabels)}</td>
                  <td className="px-3 py-2">
                    <select
                      value={rule.je_user_id || ''}
                      disabled={busy}
                      onChange={(e) => run(() => updateMaintenanceRoutingRule(rule.id, { je_user_id: Number(e.target.value) }), 'Routing rule updated')}
                      className={`${inputClass} py-1.5`}
                    >
                      {!rule.je_user_id && <option value="">— No JE —</option>}
                      {jes.map((je) => (
                        <option key={je.id} value={je.id}>{je.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <Toggle
                      checked={rule.is_active}
                      disabled={busy}
                      onChange={(value) => run(() => updateMaintenanceRoutingRule(rule.id, { is_active: value }))}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="Holidays"
        description="Working days are Monday–Saturday except Sundays and the 2nd & 4th Saturday. Holidays added here are also skipped by the 2-working-day site visit timer."
      >
        <form
          className="mb-4 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newHoliday.holiday_date || !newHoliday.label.trim()) return toast.error('Enter the date and holiday name');
            run(() => addMaintenanceHoliday(newHoliday), 'Holiday saved').then(() => setNewHoliday({ holiday_date: '', label: '' }));
          }}
        >
          <input
            type="date"
            value={newHoliday.holiday_date}
            onChange={(e) => setNewHoliday((prev) => ({ ...prev, holiday_date: e.target.value }))}
            className={`${inputClass} sm:w-48`}
          />
          <input
            value={newHoliday.label}
            onChange={(e) => setNewHoliday((prev) => ({ ...prev, label: e.target.value }))}
            placeholder="Holiday name"
            className={inputClass}
          />
          <button type="submit" disabled={busy} className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
            <Plus className="mr-1 h-4 w-4" />
            Add
          </button>
        </form>
        {config.holidays.length === 0 ? (
          <p className="text-sm text-slate-500">No holidays added.</p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
            {config.holidays.map((holiday) => (
              <li key={holiday.holiday_date} className="flex items-center justify-between px-3 py-2 text-sm">
                <span>
                  <span className="font-medium text-slate-900">{formatDate(holiday.holiday_date)}</span>
                  <span className="ml-2 text-slate-600">{holiday.label}</span>
                </span>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => run(() => removeMaintenanceHoliday(holiday.holiday_date), 'Holiday removed')}
                  className="rounded-lg p-1.5 text-rose-600 hover:bg-rose-50"
                  aria-label="Remove holiday"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card title="Maintenance staff accounts" description="JEs, vendors, senior officers and the Director. They sign in from the Login page using the Maintenance tab.">
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full divide-y divide-slate-100 text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Role</th>
                <th className="px-3 py-2">Trade</th>
                <th className="px-3 py-2">Login (username / email)</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {config.staff.map((member) => (
                <tr key={member.id}>
                  <td className="px-3 py-2 font-medium text-slate-900">
                    {member.name}
                    {(member.designation || member.company_name) && (
                      <span className="block text-xs font-normal text-slate-500">{member.designation || member.company_name}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">{ROLE_LABELS[member.role] || member.role}</td>
                  <td className="px-3 py-2 capitalize">{member.trade || '—'}</td>
                  <td className="px-3 py-2 text-slate-600">
                    {member.username}
                    <span className="block text-xs">{member.email}</span>
                  </td>
                  <td className="px-3 py-2">{member.is_active && member.profile_active ? 'Active' : 'Inactive'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default MaintenanceAdminConfig;
