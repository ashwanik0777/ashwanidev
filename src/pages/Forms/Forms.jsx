import React from "react";
import { CalendarDays, Clock, Download, ExternalLink, Eye, FileText, HeartPulse, Wrench } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import { FORM_SECTIONS, MAINTENANCE_COMPLAINT_FORM_URL, TIMETABLE_URL } from "../../Data/formsData";

const SECTION_ICONS = { leave: CalendarDays, medical: HeartPulse, general: FileText };

const fileInfo = (form) => {
  const size = form.sizeKb >= 1024 ? `${(form.sizeKb / 1024).toFixed(1)} MB` : `${form.sizeKb} KB`;
  return `PDF · ${form.pages} page${form.pages === 1 ? "" : "s"} · ${size}`;
};

const actionClass =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";

const FormRow = ({ form, index }) => (
  <li className="group flex flex-col gap-3 px-4 py-3.5 transition-colors hover:bg-blue-50/40 sm:flex-row sm:items-center sm:px-5">
    <span className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600 ring-1 ring-red-100 sm:flex">
      <FileText className="h-4 w-4" />
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-sm font-semibold leading-snug text-slate-900 sm:text-[15px]">
        <span className="mr-1 text-slate-400">{index + 1}.</span>
        {form.title}
      </p>
      <p className="mt-0.5 text-xs text-slate-500">
        {form.note ? `${form.note} · ` : ""}
        {fileInfo(form)}
      </p>
    </div>
    <div className="flex shrink-0 gap-2">
      <a
        href={form.file}
        target="_blank"
        rel="noopener noreferrer"
        className={`${actionClass} border border-slate-200 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700`}
        aria-label={`View ${form.title}`}
      >
        <Eye className="h-3.5 w-3.5" /> View
      </a>
      <a
        href={form.file}
        download
        className={`${actionClass} bg-blue-600 text-white shadow-sm hover:bg-blue-700`}
        aria-label={`Download ${form.title}`}
      >
        <Download className="h-3.5 w-3.5" /> Download
      </a>
    </div>
  </li>
);

const OnlineLink = ({ href, icon, title, text }) => {
  const Icon = icon;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-bold text-slate-900 group-hover:text-blue-700">
          {title} <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
        </span>
        <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{text}</span>
      </span>
    </a>
  );
};

const Forms = () => (
  <SearchableWrapper>
    <div className="min-h-screen bg-white">
      <BannerSection title="Forms" bgTheme={11} />

      <section className="p-6 sm:p-8 ">

          <div className="space-y-6 lg:col-span-8">
            {FORM_SECTIONS.map((section) => {
              const Icon = SECTION_ICONS[section.id] || FileText;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-32 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <header className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-4 py-4 sm:px-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h2 id={`${section.id}-heading`} className="text-lg font-bold text-blue-900 sm:text-xl">
                        {section.title}
                      </h2>
                      <p className="text-xs text-slate-500 sm:text-sm">{section.description}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 ring-1 ring-blue-100">
                      {section.forms.length} {section.forms.length === 1 ? "form" : "forms"}
                    </span>
                  </header>
                  <ol className="divide-y divide-slate-100">
                    {section.forms.map((form, index) => (
                      <FormRow key={form.file} form={form} index={index} />
                    ))}
                  </ol>
                </section>
              );
            })}

        </div>
      </section>
    </div>
  </SearchableWrapper>
);

export default Forms;
