import React, { useMemo, useState } from "react";
import { Pencil, Search, Trash2, X } from "lucide-react";
import { FacultyAvatar } from "../dashboard/SidebarNav";
import { completenessOf, completionTone } from "./facultyForm";
import { sortFaculty } from "../../../utils/facultyOrder";

// "Directory order" is the order of the public faculty directory: by designation, then A–Z.
const SORTS = [
  { id: "directory", label: "Directory order" },
  { id: "name", label: "Name (A–Z)" },
  { id: "least", label: "Least complete first", needsCompletion: true },
  { id: "most", label: "Most complete first", needsCompletion: true },
];

const shortDepartment = (value) => String(value || "").replace(/^department of\s+/i, "");

// Percentage, bar and (on hover) what is still missing.
const Completion = ({ completeness, compact = false }) => {
  if (!completeness) return <span className="text-xs text-slate-400">Not available</span>;
  const tone = completionTone(completeness.percent);
  const missing = completeness.checks.filter((check) => !check.done).map((check) => check.label);
  return (
    <div className={compact ? "w-full" : "w-36"} title={missing.length ? `Missing: ${missing.join(", ")}` : "Everything is filled in"}>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-sm font-bold ${tone.text}`}>{completeness.percent}%</span>
        <span className="text-[11px] text-slate-500">
          {completeness.checks.length - missing.length}/{completeness.checks.length}
        </span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${completeness.percent}%` }} />
      </div>
    </div>
  );
};

const RowActions = ({ faculty, onEdit, onDelete }) => (
  <div className="flex items-center gap-1.5">
    <button
      type="button"
      onClick={() => onEdit(faculty)}
      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
    >
      <Pencil className="h-3 w-3" /> Edit
    </button>
    <button
      type="button"
      onClick={() => onDelete(faculty)}
      aria-label={`Delete ${faculty.name || "faculty"}`}
      className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100"
    >
      <Trash2 className="h-3 w-3" /> Delete
    </button>
  </div>
);

const SkeletonRows = () => (
  <div className="space-y-2" aria-hidden="true">
    {[0, 1, 2, 3, 4].map((row) => (
      <div key={row} className="flex items-center gap-3 rounded-xl border border-slate-100 p-3">
        <div className="h-10 w-8 animate-pulse rounded-md bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-48 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-32 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="hidden h-3 w-28 animate-pulse rounded bg-slate-100 md:block" />
      </div>
    ))}
  </div>
);

/** The school's faculty with how complete each public profile is. */
const FacultyTable = ({ profiles, loading, onEdit, onDelete }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("directory");

  const rows = useMemo(
    () => profiles.map((faculty) => ({ faculty, completeness: completenessOf(faculty) })),
    [profiles],
  );
  const hasCompletion = rows.some((row) => row.completeness);

  const shown = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const filtered = needle
      ? rows.filter(({ faculty }) =>
          [faculty.name, faculty.designation, faculty.department, faculty.email, faculty.id].some((value) =>
            String(value || "").toLowerCase().includes(needle),
          ),
        )
      : rows;
    const byName = (a, b) => String(a.faculty.name || "").localeCompare(String(b.faculty.name || ""));
    const byDirectory = (a, b) => sortFaculty(a.faculty, b.faculty);
    const percent = (row) => row.completeness?.percent ?? -1;
    const order = {
      directory: byDirectory,
      name: byName,
      least: (a, b) => percent(a) - percent(b) || byDirectory(a, b),
      most: (a, b) => percent(b) - percent(a) || byDirectory(a, b),
    }[sort] || byDirectory;
    return [...filtered].sort(order);
  }, [rows, search, sort]);

  const summary = useMemo(() => {
    const known = rows.filter((row) => row.completeness);
    if (!known.length) return null;
    const average = Math.round(known.reduce((sum, row) => sum + row.completeness.percent, 0) / known.length);
    return {
      average,
      complete: known.filter((row) => row.completeness.percent === 100).length,
      low: known.filter((row) => row.completeness.percent < 40).length,
    };
  }, [rows]);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, designation, department or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-sm transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:bg-white"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-slate-600">
          Sort
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            {SORTS.filter((option) => hasCompletion || !option.needsCompletion).map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Summary */}
      {!loading && rows.length > 0 && (
        <div className="flex flex-wrap gap-2 py-3 text-xs">
          <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-semibold text-slate-700">{rows.length} faculty</span>
          {summary && (
            <>
              <span className={`rounded-lg px-2.5 py-1 font-semibold ring-1 ${completionTone(summary.average).chip}`}>Average profile {summary.average}% complete</span>
              {summary.complete > 0 && <span className="rounded-lg bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-700 ring-1 ring-emerald-200">{summary.complete} complete</span>}
              {summary.low > 0 && <span className="rounded-lg bg-rose-50 px-2.5 py-1 font-semibold text-rose-700 ring-1 ring-rose-200">{summary.low} below 40%</span>}
            </>
          )}
        </div>
      )}

      {loading ? (
        <div className="pt-4">
          <SkeletonRows />
        </div>
      ) : rows.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">
          No faculty profiles yet. Click "Add New" to create one.
        </div>
      ) : shown.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-500">No faculty match "{search}".</div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden max-h-[640px] overflow-auto rounded-xl border border-slate-200 md:block custom-scrollbar">
            <table className="w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Faculty</th>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Email</th>
                  {hasCompletion && <th className="px-4 py-3">Profile</th>}
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {shown.map(({ faculty, completeness }) => (
                  <tr key={faculty.id} className="transition-colors hover:bg-sky-50/40">
                    <td className="px-4 py-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <FacultyAvatar profile={faculty} className="h-11 w-8 shrink-0 rounded-md border border-slate-200 bg-slate-100" />
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-slate-900">{faculty.name || "Untitled faculty"}</p>
                          <p className="truncate text-xs text-slate-500">{faculty.designation || "No designation"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="max-w-[14rem] px-4 py-3 text-xs text-slate-600">{shortDepartment(faculty.department) || "—"}</td>
                    <td className="max-w-[14rem] truncate px-4 py-3 text-xs text-slate-600">{faculty.email || "—"}</td>
                    {hasCompletion && (
                      <td className="px-4 py-3">
                        <Completion completeness={completeness} />
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <RowActions faculty={faculty} onEdit={onEdit} onDelete={onDelete} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Phone cards */}
          <div className="space-y-2 md:hidden">
            {shown.map(({ faculty, completeness }) => (
              <div key={faculty.id} className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
                <div className="flex items-start gap-3">
                  <FacultyAvatar profile={faculty} className="h-12 w-9 shrink-0 rounded-md border border-slate-200 bg-slate-100" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">{faculty.name || "Untitled faculty"}</p>
                    <p className="truncate text-xs text-slate-500">{faculty.designation || "No designation"}</p>
                    {faculty.department && <p className="truncate text-xs text-slate-500">{shortDepartment(faculty.department)}</p>}
                  </div>
                </div>
                {hasCompletion && (
                  <div className="mt-3">
                    <Completion completeness={completeness} compact />
                  </div>
                )}
                <div className="mt-3 flex justify-end">
                  <RowActions faculty={faculty} onEdit={onEdit} onDelete={onDelete} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FacultyTable;
