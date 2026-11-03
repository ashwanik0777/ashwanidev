import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { STAGE_META, SEVERITY_META, isSiteVisitOverdue } from './maintenanceMeta';

// Tickets raised before severity existed have none; render nothing for them.
export const SeverityBadge = ({ level }) => {
  const meta = SEVERITY_META[level];
  if (!meta) return null;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}>
      {meta.label}
    </span>
  );
};

const StageBadge = ({ ticket, stage }) => {
  const key = stage || ticket?.stage;
  const meta = STAGE_META[key] || { label: key, className: 'bg-slate-100 text-slate-700' };

  return (
    <span className="inline-flex flex-wrap items-center gap-1">
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.className}`}>
        {meta.label}
      </span>
      {ticket && isSiteVisitOverdue(ticket) && (
        <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
          <AlertTriangle className="h-3 w-3" />
          Visit overdue
        </span>
      )}
    </span>
  );
};

export default StageBadge;
