import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isDestructive = true,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-slate-100 p-5">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                isDestructive ? "bg-rose-100 text-rose-600" : "bg-sky-100 text-sky-600"
              }`}
            >
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          </div>
          <button
            onClick={onCancel}
            className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-slate-600">{message}</p>
        </div>
        <div className="flex items-center justify-end gap-3 bg-slate-50 px-5 py-4">
          <button
            onClick={onCancel}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 ${
              isDestructive
                ? "bg-gradient-to-r from-rose-500 to-rose-600 shadow-rose-500/20 hover:shadow-rose-500/30"
                : "bg-gradient-to-r from-sky-500 to-sky-600 shadow-sky-500/20 hover:shadow-sky-500/30"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
