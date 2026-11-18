import React from "react";
import { SECTION_CONTAINER, SLIDER_SIDE_SPACE, VISION_CONTAINER } from "./SectionHeading";

/*
 * Placeholder for a school's home page while its layout and saved content load. Same blocks,
 * sizes and widths as the real page (banner, About Us, dean's message, departments, faculty,
 * notices), so nothing jumps when the content arrives.
 */

const Bar = ({ className = "" }) => <div className={`rounded-md bg-slate-200 ${className}`} />;

const Heading = () => (
  <div className="mb-4 flex flex-col items-center gap-2 sm:mb-5">
    <Bar className="h-7 w-48 sm:h-8 sm:w-64" />
    <div className="h-1 w-16 rounded-full bg-slate-300 sm:w-20" />
  </div>
);

const SchoolPageSkeleton = () => (
  <div className="min-h-screen bg-white" aria-busy="true" aria-live="polite">
    <span className="sr-only">Loading the school page</span>
    <div className="animate-pulse" aria-hidden="true">
      {/* Banner */}
      <div className="relative flex h-[30vh] min-h-[200px] items-center justify-center bg-slate-200 sm:h-[36vh] lg:h-[40vh]">
        <div className="flex w-full max-w-3xl flex-col items-center gap-3 px-12">
          <div className="h-7 w-4/5 rounded-lg bg-slate-300 sm:h-10" />
          <div className="h-7 w-3/5 rounded-lg bg-slate-300 sm:h-10" />
        </div>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          <span className="h-2 w-6 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* About Us */}
      <section className="px-3 py-6 sm:px-4 sm:py-8 lg:px-5">
        <div className={VISION_CONTAINER}>
          <Heading />
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:gap-8">
            {[0, 1].map((card) => (
              <div key={card} className="rounded-xl border border-slate-100 bg-slate-50 p-4 sm:rounded-2xl sm:p-5">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-200" />
                  <Bar className="h-5 w-28" />
                </div>
                <div className="space-y-2.5">
                  <Bar className="h-3.5 w-full" />
                  <Bar className="h-3.5 w-full" />
                  <Bar className="h-3.5 w-11/12" />
                  <Bar className="h-3.5 w-4/5" />
                  <Bar className="h-3.5 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dean's message */}
      <section className="px-3 py-6 sm:px-4 sm:py-8 lg:px-5">
        <div className={VISION_CONTAINER}>
          <Heading />
          <div className="flex gap-4 rounded-xl border border-l-4 border-slate-100 border-l-slate-300 p-4 sm:gap-6 sm:rounded-2xl sm:p-6">
            <div className="h-24 w-20 shrink-0 rounded-lg bg-slate-200 sm:h-44 sm:w-36 lg:h-48 lg:w-40" />
            <div className="flex-1 space-y-2.5 pt-1 sm:pt-6">
              <Bar className="h-5 w-48" />
              <Bar className="h-3.5 w-36" />
              <div className="space-y-2.5 pt-3">
                <Bar className="h-3.5 w-full" />
                <Bar className="h-3.5 w-full" />
                <Bar className="hidden h-3.5 w-11/12 sm:block" />
                <Bar className="h-3.5 w-3/5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="py-6 sm:py-8">
        <Heading />
        <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE} grid gap-5 sm:grid-cols-2 lg:grid-cols-3`}>
          {[0, 1, 2].map((card) => (
            <div key={card} className={`overflow-hidden rounded-xl border border-slate-100 sm:rounded-2xl ${card === 2 ? "hidden lg:block" : card === 1 ? "hidden sm:block" : ""}`}>
              <div className="h-36 bg-slate-200 sm:h-40" />
              <div className="space-y-2.5 p-4">
                <Bar className="h-4 w-3/4" />
                <Bar className="h-3.5 w-full" />
                <Bar className="h-3.5 w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Faculty */}
      <section className="py-6 sm:py-8">
        <Heading />
        <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE} grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5`}>
          {[0, 1, 2, 3, 4].map((card) => (
            <div key={card} className={`flex flex-col items-center gap-2.5 rounded-xl border border-slate-100 p-4 ${card >= 3 ? "hidden lg:flex" : card === 2 ? "hidden sm:flex" : ""}`}>
              <div className="h-20 w-20 rounded-full bg-slate-200" />
              <Bar className="h-4 w-24" />
              <Bar className="h-3 w-16" />
            </div>
          ))}
        </div>
      </section>

      {/* Notices and events */}
      <section className="py-6 sm:py-8">
        <Heading />
        <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE} grid gap-5 lg:grid-cols-12 lg:gap-8`}>
          <div className="space-y-2 rounded-xl border border-slate-100 p-4 lg:col-span-5 xl:col-span-4">
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex gap-3 rounded-lg border border-slate-100 p-2.5">
                <div className="h-11 w-11 shrink-0 rounded-lg bg-slate-200" />
                <div className="flex-1 space-y-2 pt-1">
                  <Bar className="h-3.5 w-full" />
                  <Bar className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-64 rounded-xl bg-slate-200 sm:h-80 lg:col-span-7 xl:col-span-8" />
        </div>
      </section>
    </div>
  </div>
);

export default SchoolPageSkeleton;
