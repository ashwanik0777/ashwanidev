import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Pencil, Trash2, X, RefreshCw, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import {
  ANNOUNCEMENT_COLUMNS,
  ANNOUNCEMENT_FIELDS,
  LEVEL_FIELD,
  buildEmptyAnnouncement,
  optionLabel,
  optionValue,
} from "../../Data/announcementFields";
import {
  APPROVAL_STATUS,
  KIND_LABELS,
  LEVELS,
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  updateAnnouncement,
} from "../../services/announcementsAdminService";
import { invalidateAnnouncementsCache } from "../../utils/schoolAnnouncements";

/*
 * One CRUD surface for every announcement kind, used by both the admin portal
 * and the school portal.
 *
 * Each item is saved to the database the moment the form is submitted — there is
 * no separate "save the whole page" step and nothing is staged in localStorage,
 * which is why dashboard entries never used to reach the public site.
 */

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700";

const STATUS_BADGES = {
  [APPROVAL_STATUS.PUBLISHED]: { label: "Published", className: "bg-emerald-50 text-emerald-700 border-emerald-200", Icon: CheckCircle2 },
  [APPROVAL_STATUS.PENDING]: { label: "Awaiting approval", className: "bg-amber-50 text-amber-700 border-amber-200", Icon: Clock },
  [APPROVAL_STATUS.REJECTED]: { label: "Rejected", className: "bg-rose-50 text-rose-700 border-rose-200", Icon: AlertCircle },
};

const StatusBadge = ({ status }) => {
  const meta = STATUS_BADGES[status] || STATUS_BADGES[APPROVAL_STATUS.PUBLISHED];
  const { Icon } = meta;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${meta.className}`}>
      <Icon className="h-3 w-3" />
      {meta.label}
    </span>
  );
};

/**
 * The public Announcements pages cache their snapshot and listen for this event,
 * so a dashboard change shows up without waiting for a reload.
 */
const announcePublicDataChanged = () => {
  if (typeof window === "undefined") return;
  invalidateAnnouncementsCache();
  window.dispatchEvent(new Event("announcements-data-updated"));
};

const formatCell = (item, key) => {
  const value = item?.[key];
  if (value === null || value === undefined || value === "") return "—";
  if (key === "date" || key === "startsAt") return String(value).slice(0, 10);
  if (Array.isArray(value)) return value.length ? `${value.length} item(s)` : "—";
  return String(value);
};

/** Arrays arrive from the API but the textarea inputs work in plain text. */
const toFormValue = (field, value) => {
  if (field.type === "textarea" && Array.isArray(value)) return value.join("\n");
  if (field.key === "tags" && Array.isArray(value)) return value.join(", ");
  if (field.type === "date") return String(value || "").slice(0, 10);
  if (field.type === "boolean") return Boolean(value);
  if (field.type === "number") return Number(value || 0);
  return value ?? "";
};

const AnnouncementManager = ({
  kind,
  /** "admin" can choose any level; "school" is warned about the approval step. */
  actorRole = "admin",
  schoolCode = "",
  onMessage,
}) => {
  const fields = ANNOUNCEMENT_FIELDS[kind] || [];
  const columns = ANNOUNCEMENT_COLUMNS[kind] || [];
  const isAdmin = actorRole === "admin";

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editor, setEditor] = useState(null); // { id, form } — null when closed
  const [deletingId, setDeletingId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const notify = useCallback(
    (text, isError = false) => {
      setError(isError ? text : "");
      onMessage?.(text, isError);
    },
    [onMessage],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      // An admin viewing one school sees only that school's items; the
      // university-wide tab passes no code and sees everything.
      const data = await listAnnouncements(kind, schoolCode ? { schoolCode } : {});
      setItems(data);
      setError("");
    } catch (err) {
      const detail =
        err?.response?.status === 401
          ? "Your session expired. Please log in again."
          : err?.response?.data?.message || err.message || "Failed to load";
      setError(detail);
    } finally {
      setLoading(false);
    }
  }, [kind, schoolCode]);

  useEffect(() => {
    load();
  }, [load]);

  const visibleItems = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      Object.values(item).some((value) => String(value ?? "").toLowerCase().includes(query)),
    );
  }, [items, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return visibleItems.slice(start, start + itemsPerPage);
  }, [visibleItems, currentPage]);

  const totalPages = Math.max(1, Math.ceil(visibleItems.length / itemsPerPage));

  const openCreate = () => {
    // Managing a specific school defaults to that school's own pages; the
    // university-wide tab defaults to college level.
    const defaultLevel = schoolCode ? LEVELS.SCHOOL : LEVELS.COLLEGE;
    setEditor({ id: null, form: buildEmptyAnnouncement(kind, defaultLevel) });
  };

  const openEdit = (item) => {
    const form = { level: item.level || LEVELS.SCHOOL };
    for (const field of fields) form[field.key] = toFormValue(field, item[field.key]);
    setEditor({ id: item.id, form });
  };

  const setField = (key, value) => {
    setEditor((prev) => (prev ? { ...prev, form: { ...prev.form, [key]: value } } : prev));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!editor) return;

    const missing = fields.filter(
      (field) => field.required && String(editor.form[field.key] ?? "").trim() === "",
    );
    if (missing.length) {
      notify(`Please fill in: ${missing.map((f) => f.label).join(", ")}`, true);
      return;
    }

    setSaving(true);
    try {
      const payload = { ...editor.form };
      // A school account is always pinned to its own school server-side, but
      // send it so an admin can file an item on a school's behalf.
      if (schoolCode) payload.schoolCode = schoolCode;

      const { message } = editor.id
        ? await updateAnnouncement(kind, editor.id, payload)
        : await createAnnouncement(kind, payload);

      setEditor(null);
      notify(message || "Saved");
      await load();
      announcePublicDataChanged();
    } catch (err) {
      const detail =
        err?.response?.status === 401
          ? "Your session expired. Please log in again — your entry is still on screen."
          : err?.response?.data?.errors?.map((e) => e.message).join(" | ") ||
            err?.response?.data?.message ||
            err.message ||
            "Save failed";
      notify(detail, true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    setDeletingId(item.id);
    try {
      const message = await deleteAnnouncement(kind, item.id);
      notify(message || "Deleted");
      await load();
      announcePublicDataChanged();
    } catch (err) {
      notify(err?.response?.data?.message || err.message || "Delete failed", true);
    } finally {
      setDeletingId(null);
    }
  };

  const willNeedApproval =
    !isAdmin && editor?.form?.level === LEVELS.COLLEGE;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-slate-900">{KIND_LABELS[kind]}</h3>
          <p className="mt-0.5 text-xs text-slate-500">
            Saved straight to the database and shown on the public Announcements pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800"
          >
            <Plus className="h-3.5 w-3.5" /> Add New
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <input
        className={`${inputClass} mb-3`}
        placeholder={`Search ${KIND_LABELS[kind].toLowerCase()}…`}
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3">{column.label}</th>
              ))}
              {kind !== "news" && kind !== "events" && <th className="px-4 py-3">Level</th>}
              {kind !== "news" && <th className="px-4 py-3">Status</th>}
              {isAdmin && <th className="px-4 py-3">School</th>}
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {loading ? (
              <tr>
                <td colSpan={columns.length + 4} className="px-4 py-8 text-center text-slate-500">
                  Loading {KIND_LABELS[kind].toLowerCase()}…
                </td>
              </tr>
            ) : visibleItems.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 4} className="px-4 py-8 text-center text-slate-500">
                  No {KIND_LABELS[kind].toLowerCase()} yet. Click &ldquo;Add New&rdquo; to create one.
                </td>
              </tr>
            ) : (
              paginatedItems.map((item) => (
                <tr key={item.id} className="transition-colors hover:bg-slate-50/80">
                  {columns.map((column, index) => (
                    <td key={column.key} className="max-w-xs truncate px-4 py-3">
                      {index === 0 ? (
                        <span className="font-semibold text-slate-900">{formatCell(item, column.key)}</span>
                      ) : (
                        formatCell(item, column.key)
                      )}
                    </td>
                  ))}
                  {kind !== "news" && kind !== "events" && (
                    <td className="px-4 py-3">
                      <span className="rounded border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-xs font-semibold uppercase text-indigo-700">
                        {item.level === LEVELS.COLLEGE ? "College" : "School"}
                      </span>
                    </td>
                  )}
                  {kind !== "news" && (
                    <td className="px-4 py-3"><StatusBadge status={item.approvalStatus} /></td>
                  )}
                  {isAdmin && (
                    <td className="px-4 py-3 text-xs text-slate-600">{item.schoolCode || "GBU"}</td>
                  )}
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {deletingId === item.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        
        {/* Pagination UI */}
        <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div>
              Total: <span className="font-semibold text-slate-900">{visibleItems.length}</span>
            </div>
            <div className="flex items-center gap-2 border-l border-slate-300 pl-4">
              <label htmlFor="itemsPerPage" className="text-slate-600">Rows per page:</label>
              <select
                id="itemsPerPage"
                value={itemsPerPage === Number.MAX_SAFE_INTEGER ? "all" : itemsPerPage}
                onChange={(e) => {
                  const val = e.target.value;
                  setItemsPerPage(val === "all" ? Number.MAX_SAFE_INTEGER : Number(val));
                  setCurrentPage(1);
                }}
                className="rounded border border-slate-300 bg-white px-2 py-1 text-sm text-slate-700 focus:border-slate-500 focus:outline-none"
              >
                <option value={20}>20</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
                <option value="all">All</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={loading || currentPage <= 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            <span className="text-sm text-slate-700">
              Page {currentPage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={loading || currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              className="rounded-md border border-slate-300 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {editor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="relative my-8 flex max-h-[90vh] w-full max-w-3xl flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {editor.id ? `Edit ${KIND_LABELS[kind]}` : `Add ${KIND_LABELS[kind]}`}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                  Saving writes directly to the database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  {LEVEL_FIELD.label} <span className="text-rose-600">*</span>
                </span>
                <select
                  className={inputClass}
                  value={editor.form.level}
                  onChange={(event) => setField("level", event.target.value)}
                >
                  {LEVEL_FIELD.options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
                <span className="mt-1 block text-xs text-slate-500">{LEVEL_FIELD.help}</span>
              </label>

              {willNeedApproval && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                  This will be submitted to the university admin for approval and will not appear on
                  the website until it is approved.
                </div>
              )}

              {isAdmin && schoolCode && editor.form.level === LEVELS.COLLEGE && (
                <div className="rounded-xl border border-blue-200 bg-blue-50 p-3 text-xs text-blue-800">
                  College-level items belong to the university rather than to {schoolCode}, so this
                  will move to the university-wide Announcements list after saving.
                </div>
              )}

              {fields.map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-700">
                    {field.label}
                    {field.required && <span className="text-rose-600"> *</span>}
                  </span>

                  {field.type === "textarea" ? (
                    <textarea
                      className={`${inputClass} min-h-[90px]`}
                      value={editor.form[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) => setField(field.key, event.target.value)}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className={inputClass}
                      value={editor.form[field.key] ?? ""}
                      onChange={(event) => setField(field.key, event.target.value)}
                    >
                      {(field.options || []).map((option) => (
                        <option key={optionValue(option)} value={optionValue(option)}>
                          {optionLabel(option)}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "boolean" ? (
                    <select
                      className={inputClass}
                      value={editor.form[field.key] ? "true" : "false"}
                      onChange={(event) => setField(field.key, event.target.value === "true")}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  ) : (
                    <input
                      className={inputClass}
                      type={field.type || "text"}
                      value={editor.form[field.key] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setField(
                          field.key,
                          field.type === "number" ? Number(event.target.value || 0) : event.target.value,
                        )
                      }
                    />
                  )}
                </label>
              ))}
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {saving ? "Saving…" : willNeedApproval ? "Submit for Approval" : "Save & Publish"}
              </button>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AnnouncementManager;
