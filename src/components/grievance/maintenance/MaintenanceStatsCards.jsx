import React from 'react';

const CARDS = [
  { key: 'total', label: 'Total Complaints', className: 'text-slate-900' },
  { key: 'open', label: 'Awaiting JE Action', className: 'text-blue-700' },
  { key: 'in_progress', label: 'In Progress', className: 'text-amber-700' },
  { key: 'escalated', label: 'Escalated', className: 'text-rose-700' },
  { key: 'delayed', label: 'Delayed', className: 'text-orange-700' },
  { key: 'site_visit_overdue', label: 'Site Visit Overdue', className: 'text-red-700' },
  { key: 'resolved', label: 'Resolved', className: 'text-emerald-700' },
];

const MaintenanceStatsCards = ({ stats, only }) => {
  const cards = only ? CARDS.filter((card) => only.includes(card.key)) : CARDS;
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <div key={card.key} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs font-medium text-slate-500">{card.label}</p>
          <p className={`mt-1 text-2xl font-bold ${card.className}`}>{stats?.[card.key] ?? '—'}</p>
        </div>
      ))}
    </div>
  );
};

export default MaintenanceStatsCards;
