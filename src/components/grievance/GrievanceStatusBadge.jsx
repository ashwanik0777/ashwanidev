import React from 'react';

export const GrievanceStatusBadge = ({ status }) => {
  const styles = {
    'Open': 'bg-blue-100 text-blue-700',
    'In Progress': 'bg-amber-100 text-amber-700',
    'Resolved': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-rose-100 text-rose-700'
  };
  const badgeStyle = styles[status] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle}`}>
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }) => {
  const styles = {
    'Low': 'bg-slate-100 text-slate-700',
    'Medium': 'bg-blue-100 text-blue-700',
    'High': 'bg-amber-100 text-amber-700',
    'Urgent': 'bg-rose-100 text-rose-700'
  };
  const badgeStyle = styles[priority] || 'bg-slate-100 text-slate-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle}`}>
      {priority}
    </span>
  );
};
