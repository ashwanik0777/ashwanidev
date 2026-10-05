import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

const SCHOOLS = ['SOICT', 'SOBT', 'SOBSC', 'SOE', 'SOL', 'SOM', 'SOHSS', 'SOVS'];
const STATUSES = ['All', 'Open', 'In Progress', 'Resolved', 'Rejected'];

const GrievanceFilterBar = ({ filters, onFilterChange, showSchoolFilter, showSubmitterTypeFilter }) => {
  const [search, setSearch] = useState(filters?.search || '');

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search });
    }, 300);
    return () => clearTimeout(timer);
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search grievances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <select
          name="status"
          value={filters?.status || 'All'}
          onChange={handleChange}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
        >
          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {showSchoolFilter && (
          <select
            name="school"
            value={filters?.school || 'All'}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
          >
            <option value="All">All Schools</option>
            {SCHOOLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        )}

        {showSubmitterTypeFilter && (
          <select
            name="submitterType"
            value={filters?.submitterType || 'All'}
            onChange={handleChange}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
          >
            <option value="All">All Types</option>
            <option value="Faculty">Faculty</option>
            <option value="Student">Student</option>
          </select>
        )}
      </div>
    </div>
  );
};

export default GrievanceFilterBar;
