import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Inbox, ChevronDown, ExternalLink } from "lucide-react";
import {
  KIND_LABELS,
  approveAnnouncement,
  listPendingAnnouncements,
  rejectAnnouncement,
} from "../../services/announcementsAdminService";
import { ANNOUNCEMENT_FIELDS, optionLabel } from "../../Data/announcementFields";
import { parseImageUrl } from "../../utils/imageUtils";

/*
 * Super-admin review queue.
 *
 * A school publishes to its own page freely, but an item it also wants on the
 * university page lands here first. It already shows on the school's page and
 * reaches the university page only once approved.
 */

const IMAGE_KEYS = new Set(["image", "flyerUrl", "coverImage", "coverImageUrl"]);
const LINK_KEYS = new Set([
  "pdfUrl", "brochureUrl", "englishPdfLink", "hindiPdfLink", "registrationUrl", "link", "imageLink",
]);

const formatDate = (value, withTime = false) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return withTime
    ? date.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : date.toLocaleDateString("en-IN", { dateStyle: "medium" });
};

const isBlank = (value) =>
  value === null || value === undefined || value === "" || value === 0 ||
  (Array.isArray(value) && value.filter(Boolean).length === 0);

const Thumbnail = ({ url }) => (
  <a href={parseImageUrl(url)} target="_blank" rel="noreferrer"
    className="block h-20 w-28 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
    <img src={parseImageUrl(url, 400)} alt="" className="h-full w-full object-cover" />
  </a>
);

/** One filled-in form field, shown the way the school entered it. */
const FieldValue = ({ field, value }) => {
  if (field.type === "image-list") {
    return (
      <div className="flex flex-wrap gap-2">
        {value.filter(Boolean).map((url) => <Thumbnail key={url} url={url} />)}
      </div>
    );
  }
  if (IMAGE_KEYS.has(field.key)) return <Thumbnail url={value} />;
  if (LINK_KEYS.has(field.key)) {
    return (
      <a href={value} target="_blank" rel="noreferrer"
        className="inline-flex max-w-full items-center gap-1 break-all text-sky-700 hover:underline">
        {value} <ExternalLink className="h-3 w-3 shrink-0" />
      </a>
    );
  }
  if (field.type === "date") return formatDate(value);
  if (field.type === "boolean") return value ? "Yes" : "No";
  if (field.type === "select") {
    const option = (field.options || []).find((entry) => (entry?.value ?? entry) === value);
    return option ? optionLabel(option) : String(value);
  }
  if (Array.isArray(value)) return value.join(", ");
  return <span className="whitespace-pre-wrap">{String(value)}</span>;
};

/** Everything the school filled in, so the admin can judge the whole request. */
const RequestDetails = ({ item }) => {
  const fields = (ANNOUNCEMENT_FIELDS[item.kind] || []).filter((field) => !isBlank(item[field.key]));
  const rows = [
    { label: "School", value: item.schoolName || item.schoolCode },
    { label: "Submitted By", value: item.createdByName },
    { label: "Submitted On", value: item.createdAt ? formatDate(item.createdAt, true) : "" },
    { label: "Last Updated", value: item.updatedAt ? formatDate(item.updatedAt, true) : "" },
    { label: "Publish To", value: "School Page and University Page" },
  ].filter((row) => row.value);

  return (
    <dl className="mt-3 grid gap-x-4 gap-y-3 rounded-xl border border-slate-200 bg-white p-4 text-xs sm:grid-cols-[10rem_1fr]">
      {rows.map((row) => (
        <React.Fragment key={row.label}>
          <dt className="font-semibold text-slate-500">{row.label}</dt>
          <dd className="text-slate-800">{row.value}</dd>
        </React.Fragment>
      ))}
      {fields.map((field) => (
        <React.Fragment key={field.key}>
          <dt className="font-semibold text-slate-500">{field.label.replace(/\s*\(.*\)\s*$/, "")}</dt>
          <dd className="min-w-0 text-slate-800"><FieldValue field={field} value={item[field.key]} /></dd>
        </React.Fragment>
      ))}
    </dl>
  );
};

const ApprovalQueue = ({ onMessage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState({});
  const [busyKey, setBusyKey] = useState("");
  const [openKey, setOpenKey] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await listPendingAnnouncements());
      setError("");
    } catch (err) {
      setError(
        err?.response?.status === 401
          ? "Your session expired. Please log in again."
          : err?.response?.data?.message || err.message || "Failed to load the approval queue",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const review = async (item, decision) => {
    const key = `${item.kind}-${item.id}`;
    setBusyKey(key);
    try {
      const action = decision === "approve" ? approveAnnouncement : rejectAnnouncement;
      const { message } = await action(item.kind, item.id, notes[key] || "");
      onMessage?.(message);
      setNotes((prev) => ({ ...prev, [key]: "" }));
      await load();
    } catch (err) {
      const detail = err?.response?.data?.message || err.message || "Review failed";
      setError(detail);
      onMessage?.(detail, true);
    } finally {
      setBusyKey("");
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-slate-900">
            Approval Queue
            {items.length > 0 && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-700">
                {items.length}
              </span>
            )}
          </h3>
          {/* <p className="mt-0.5 text-xs text-slate-500">
            College-level announcements submitted by schools. These stay off the website until approved.
          </p> */}
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      {error ? (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <p className="py-10 text-center text-sm text-slate-500">Loading pending submissions…</p>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-center">
          <Inbox className="h-8 w-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-600">Nothing waiting for review</p>
          <p className="text-xs text-slate-500">
            School submissions for university-wide publication will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const key = `${item.kind}-${item.id}`;
            const busy = busyKey === key;
            return (
              <div key={key} className="rounded-xl border border-amber-200 bg-amber-50/40 p-4">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded bg-slate-900 px-2 py-0.5 text-xs font-bold uppercase text-white">
                    {KIND_LABELS[item.kind] || item.kind}
                  </span>
                  <span className="rounded border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-700">
                    Requested: University Page
                  </span>
                  <span className="text-xs text-slate-500">
                    from <strong className="text-slate-700">{item.schoolName || item.schoolCode}</strong>
                    {item.createdByName ? ` · by ${item.createdByName}` : ""}
                    {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString()}` : ""}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                {(item.excerpt || item.content || item.description) && openKey !== key && (
                  <p className="mt-1 line-clamp-3 text-xs text-slate-600">
                    {item.excerpt || item.content || item.description}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => setOpenKey(openKey === key ? "" : key)}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800"
                >
                  {openKey === key ? "Hide Details" : "View Details"}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openKey === key ? "rotate-180" : ""}`} />
                </button>
                {openKey === key && <RequestDetails item={item} />}

                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                  <input
                    className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 outline-none focus:border-slate-700"
                    placeholder="Optional note to the school (reason for the decision)"
                    value={notes[key] || ""}
                    onChange={(event) => setNotes((prev) => ({ ...prev, [key]: event.target.value }))}
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => review(item, "approve")}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Approve & Publish
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => review(item, "reject")}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-rose-300 bg-white px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-50"
                    >
                      <XCircle className="h-3.5 w-3.5" /> Reject
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ApprovalQueue;
