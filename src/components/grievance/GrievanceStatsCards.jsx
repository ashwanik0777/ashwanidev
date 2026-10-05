import React from 'react';
import { Inbox, AlertCircle, Clock, CheckCircle } from 'lucide-react';

const GrievanceStatsCards = ({ stats = {} }) => {
  const { total = 0, open = 0, in_progress = 0, resolved = 0, rejected = 0 } = stats;

  const cards = [
    { label: 'Total Grievances', count: total, icon: Inbox, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'Open/Pending', count: open, icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'In Progress', count: in_progress, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Resolved', count: resolved, icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-xl ${card.bg}`}>
              <Icon className={`w-6 h-6 ${card.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <h3 className="text-2xl font-bold text-slate-900">{card.count}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GrievanceStatsCards;
