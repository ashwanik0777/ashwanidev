"use client";
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getSchoolDisplayCode } from "../../Data/schoolsMeta";
import SectionHeading, { SECTION_PADDING, SECTION_CONTAINER, SLIDER_SIDE_SPACE, HEADING_SPACE } from "./SectionHeading";

// Same button for every school; per-department `gradient` values in data are intentionally ignored
const LEARN_MORE_BUTTON =
  "mt-auto inline-flex items-center justify-center gap-1.5 w-full py-2 min-[2560px]:py-3.5 rounded-lg sm:rounded-xl text-sm min-[2560px]:text-xl font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors";

const DepartmentsSection = ({ departments = [], schoolCode }) => {
  // Short school name (e.g. "SOE"); the full name is shown only on the banner
  const schoolShortName = getSchoolDisplayCode(schoolCode);

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <SectionHeading className={`${HEADING_SPACE} px-4`}>
        {schoolShortName ? `${schoolShortName} Departments` : "Our Departments"}
      </SectionHeading>

      {/* Same width as the faculty slider (container + the side space its arrows use) */}
      <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE}`}>
        <div>
          {/* Cards */}
          <div className="grid gap-5 sm:gap-6 lg:gap-8 min-[2560px]:gap-12 sm:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4">
            {departments.length > 0 ? (
              departments.map((dept, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white border border-slate-200 border-t-4 border-t-blue-600 shadow-sm hover:shadow-md transition-shadow rounded-xl sm:rounded-2xl p-4 sm:p-5 min-[2560px]:p-8"
                >
                  <h3 className="text-base sm:text-lg min-[2560px]:text-3xl font-bold text-blue-900 leading-snug">
                    {dept.name}
                  </h3>

                  {(dept.courses || []).length > 0 && (
                    <div className="mt-3 mb-4 pt-3 border-t border-slate-100">
                      <h4 className="text-[11px] sm:text-xs min-[2560px]:text-lg font-semibold uppercase tracking-wider text-slate-500 mb-2">
                        Programs Offered
                      </h4>
                      <ul className="space-y-1.5">
                        {dept.courses.map((course, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs sm:text-sm min-[2560px]:text-xl text-slate-700"
                          >
                            <span className="w-1.5 h-1.5 min-[2560px]:w-2.5 min-[2560px]:h-2.5 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                            {course}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Link to={dept.link || "#"} className={LEARN_MORE_BUTTON}>
                    Learn More
                    <ArrowRight className="w-4 h-4 min-[2560px]:w-6 min-[2560px]:h-6" />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center col-span-full text-gray-500">
                No departments available.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepartmentsSection;
