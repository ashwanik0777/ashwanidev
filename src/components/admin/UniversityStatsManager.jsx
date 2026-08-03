import React, { useCallback, useEffect, useState } from "react";
import { BarChart3, RotateCcw, Save } from "lucide-react";
import {
  adminListUniversityStats,
  adminSaveUniversityStats,
} from "../../services/universityStatsService";

/*
 * Single place to manage the university-wide headline figures.
 *
 * These numbers (campus acreage, students, faculty, programmes, placement rate,
 * number of schools, …) appear across the homepage, About, Admissions and
 * Campus Life pages. They used to be hardcoded separately in each file and had
 * drifted apart. Editing a value here updates every one of those places.
 */

const CATEGORY_LABELS = {
  campus: "Campus",
  academics: "Academics",
  people: "People",
  placement: "Placement",
  research: "Research",
  general: "General",
};

/** Where each figure is shown, so an editor knows the blast radius of a change. */
const USED_ON = {
  acres_campus: "Homepage · About · History · Campus Life",
  academic_schools: "Homepage · Admissions",
  programs: "Homepage · About · Admissions",
  students: "Homepage · About",
  faculty_members: "Homepage · About",
  placement_rate: "Homepage · Admissions",
  available_seats: "Admissions",
  hostels: "Campus Life",
  library_books: "Campus Life",
  stadium_capacity: "Campus Life",
  countries_represented: "Campus Life",
  research_publications: "Research pages",
};

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700";

const UniversityStatsManager = ({ onMessage }) => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      setStats(await adminListUniversityStats());
      setIsDirty(false);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to load university stats.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const updateStat = (key, field, value) => {
    setStats((prev) => prev.map((item) => (item.key === key ? { ...item, [field]: value } : item)));
    setIsDirty(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      setStats(await adminSaveUniversityStats(stats));
      setIsDirty(false);
      // Let any open public page in this tab pick the new figures up at once.
      window.dispatchEvent(new Event("university-stats-updated"));
      onMessage?.("University statistics updated across the website.");
    } catch (err) {
      const detail =
        err?.response?.data?.message || err?.message || "Failed to save university stats.";
      setError(detail);
      onMessage?.(detail);
    } finally {
      setIsSaving(false);
    }
  };

  const grouped = stats.reduce((acc, stat) => {
    const category = stat.category || "general";
    (acc[category] = acc[category] || []).push(stat);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-base font-semibold text-slate-900">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            University Statistics
          </h3>
          <p className="mt-0.5 text-xs text-slate-500">
            One place for the figures shown across the homepage, About, Admissions and Campus Life
            pages. Update here and every page follows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={load}
            disabled={isLoading || isSaving}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RotateCcw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Reload
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !isDirty}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            <Save className="h-3.5 w-3.5" />
            {isSaving ? "Saving..." : "Save Statistics"}
          </button>
        </div>
      </div>

      {error ? (
        <div className="mb-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          {error}
        </div>
      ) : null}

      {isDirty && !isSaving ? (
        <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs font-semibold text-amber-700">
          Unsaved changes — click “Save Statistics” to publish them to the website.
        </div>
      ) : null}

      {isLoading && stats.length === 0 ? (
        <p className="py-6 text-center text-sm text-slate-500">Loading statistics…</p>
      ) : null}

      <div className="space-y-5">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              {CATEGORY_LABELS[category] || category}
            </h4>
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-4 py-2.5">Label</th>
                    <th className="w-40 px-4 py-2.5">Value</th>
                    <th className="px-4 py-2.5">Shown on</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((stat) => (
                    <tr key={stat.key} className="hover:bg-slate-50/70">
                      <td className="px-4 py-2.5">
                        <input
                          className={inputClass}
                          value={stat.label || ""}
                          onChange={(e) => updateStat(stat.key, "label", e.target.value)}
                        />
                        <p className="mt-1 font-mono text-[11px] text-slate-400">{stat.key}</p>
                      </td>
                      <td className="px-4 py-2.5">
                        <input
                          className={`${inputClass} font-semibold`}
                          value={stat.value ?? ""}
                          onChange={(e) => updateStat(stat.key, "value", e.target.value)}
                          placeholder="e.g. 8200+"
                        />
                      </td>
                      <td className="px-4 py-2.5 text-xs text-slate-500">
                        {USED_ON[stat.key] || "—"}
                        {stat.updatedByName ? (
                          <p className="mt-1 text-[11px] text-slate-400">
                            Last edited by {stat.updatedByName}
                          </p>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Values are shown on the website exactly as typed, so suffixes such as{" "}
        <span className="font-mono">+</span>, <span className="font-mono">%</span> or{" "}
        <span className="font-mono">L+</span> are preserved (e.g. <span className="font-mono">8200+</span>,{" "}
        <span className="font-mono">90%</span>, <span className="font-mono">2.5L+</span>).
      </p>
    </div>
  );
};

export default UniversityStatsManager;
