import React from "react";
import { CheckCircle2, CircleDot, Save } from "lucide-react";
import { primaryButtonClass } from "./constants";

const TopSummary = ({ title, isDirty, saving, onSave }) => (
  <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
    <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-[1.75rem]">{title}</h1>
    <div className="flex flex-wrap items-center gap-2">
      {isDirty ? (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-700 ring-1 ring-amber-200">
          <CircleDot className="h-3.5 w-3.5" /> Unsaved changes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
          <CheckCircle2 className="h-3.5 w-3.5" /> All changes saved
        </span>
      )}
      {/* Phones get Save in the top app bar instead */}
      <div className="hidden lg:block">
        <button type="button" onClick={onSave} disabled={saving} className={primaryButtonClass}>
          <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </header>
);

export default TopSummary;
