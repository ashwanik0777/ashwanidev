import React from 'react';
import { FileText, Newspaper, CalendarDays, FileDown, File, Archive, CircleCheck, ExternalLink, Clock, AlertCircle } from 'lucide-react';

const RecruitmentContent = ({ tabId, data }) => {
  const isArchived = String(tabId || '').startsWith('archived');
  const tabData = data && typeof data === 'object' ? data : null;

  if (!tabData) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
        <AlertCircle className="h-8 w-8 text-slate-300" />
        <p className="mt-3 text-sm font-medium text-slate-500">No recruitment information available.</p>
      </div>
    );
  }

  const iconMap = {
    'Extension Notice': CalendarDays,
    'Detailed Advertisement': FileText,
    'Newspaper Publication': Newspaper,
    'Application Form (PDF)': FileDown,
    'Application Form (Word)': File,
    'Walk-in Interview Notice': CalendarDays,
    'Archive Notice': Archive,
  };

  const documents = Array.isArray(tabData.documents) && tabData.documents.length
    ? tabData.documents.map((doc) => ({
        name: doc.name || 'Document',
        description: doc.description || 'Official recruitment document',
        icon: iconMap[doc.name] || FileText,
        url: doc.url || '#',
      }))
    : [];

  // Calculate days remaining if closing date exists
  const closingDate = tabData.closingDate || tabData.closing_date;
  let daysLeft = null;
  if (closingDate && !isArchived) {
    const diff = Math.ceil((new Date(closingDate) - new Date()) / (1000 * 60 * 60 * 24));
    daysLeft = diff >= 0 ? diff : null;
  }

  return (
    <div className="space-y-4 flex-grow flex flex-col">
      {/* Header Info */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-900 leading-tight">{tabData.title}</h3>
            {tabData.ref && (
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                Ref: {tabData.ref}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {daysLeft !== null && (
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                daysLeft <= 7
                  ? 'bg-red-100 text-red-700'
                  : daysLeft <= 30
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
              }`}>
                <Clock className="h-3 w-3" />
                {daysLeft === 0 ? 'Last day' : `${daysLeft} day${daysLeft !== 1 ? 's' : ''} left`}
              </span>
            )}
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                isArchived
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              {isArchived ? <Archive className="h-3 w-3" /> : <CircleCheck className="h-3 w-3" />}
              {isArchived ? 'Archived' : 'Active'}
            </span>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            Published: {tabData.date}
          </span>
          {closingDate && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              Closing: {new Date(closingDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
          )}
        </div>
      </div>

      {/* Documents */}
      {documents.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white flex-grow">
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Available Documents ({documents.length})
            </h4>
          </div>

          <div className="divide-y divide-slate-100">
            {documents.map((doc, idx) => {
              const Icon = doc.icon;
              return (
                <div
                  key={`${doc.name}-${idx}`}
                  className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-slate-100 p-2">
                      <Icon className="h-4 w-4 text-slate-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.description}</p>
                    </div>
                  </div>

                  <a
                    href={doc.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all"
                  >
                    Open <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center flex-grow">
          <FileText className="h-6 w-6 text-slate-300" />
          <p className="mt-2 text-xs text-slate-500">No documents attached to this recruitment.</p>
        </div>
      )}
    </div>
  );
};

export default RecruitmentContent;