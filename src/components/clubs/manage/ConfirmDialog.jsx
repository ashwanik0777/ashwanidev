import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertTriangle } from "lucide-react";

// A small yes/no dialog in the dashboard's solid colours.
const ConfirmDialog = ({ open, title, message, confirmLabel = "Confirm", tone = "danger", busy = false, onConfirm, onCancel }) => {
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && !busy && onCancel();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, busy, onCancel]);

  if (!open) return null;
  const danger = tone === "danger";

  return createPortal(
    <div className="fixed inset-0 z-[9000] flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-label={title}>
      <div className="animate-backdrop-in absolute inset-0 bg-slate-900/50" onClick={() => !busy && onCancel()} />
      <div className="animate-panel-in relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${danger ? "bg-rose-50 text-rose-600" : "bg-amber-50 text-amber-600"}`}>
          <AlertTriangle className="h-5 w-5" />
        </span>
        <h2 className="mt-4 font-display text-lg font-bold text-slate-900">{title}</h2>
        <p className="mt-1.5 text-sm leading-6 text-slate-600">{message}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 ${danger ? "bg-rose-600 hover:bg-rose-700" : "bg-amber-600 hover:bg-amber-700"}`}
          >
            {busy ? "Please wait..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmDialog;
