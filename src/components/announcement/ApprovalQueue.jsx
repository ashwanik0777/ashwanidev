import React, { useCallback, useEffect, useState } from "react";
import { CheckCircle2, XCircle, RefreshCw, Inbox } from "lucide-react";
import {
  KIND_LABELS,
  approveAnnouncement,
  listPendingAnnouncements,
  rejectAnnouncement,
} from "../../services/announcementsAdminService";

/*
 * Super-admin review queue.
 *
 * A school can publish its own school-level announcements freely, but anything
 * it wants shown university-wide lands here first. Nothing in this list is
 * visible on the public site until it is approved.
 */

const ApprovalQueue = ({ onMessage }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState({});
  const [busyKey, setBusyKey] = useState("");

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
          <p className="mt-0.5 text-xs text-slate-500">
            College-level announcements submitted by schools. These stay off the website until approved.
          </p>
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
                    Requested: College-wide
                  </span>
                  <span className="text-xs text-slate-500">
                    from <strong className="text-slate-700">{item.schoolName || item.schoolCode}</strong>
                    {item.createdByName ? ` · by ${item.createdByName}` : ""}
                    {item.createdAt ? ` · ${new Date(item.createdAt).toLocaleDateString()}` : ""}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                {(item.excerpt || item.content || item.description) && (
                  <p className="mt-1 line-clamp-3 text-xs text-slate-600">
                    {item.excerpt || item.content || item.description}
                  </p>
                )}

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
