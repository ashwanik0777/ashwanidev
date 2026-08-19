import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSection from "../../components/HeroBanner";

const BoardOfStudies = ({ departments, dean }) => {
  const getRoleBadge = (role) => {
    switch (role) {
      case "Dean":
      case "Chairperson":
        return "bg-blue-100 text-blue-900 border border-blue-300";
      case "Head of the Department":
      case "HoD":
        return "bg-emerald-100 text-emerald-900 border border-emerald-300";
      case "Internal Member":
        return "bg-teal-100 text-teal-900 border border-teal-300";
      case "External Expert":
      case "External Member":
        return "bg-purple-100 text-purple-900 border border-purple-300";
      case "Member":
      default:
        return "bg-slate-100 text-slate-800 border border-slate-200";
    }
  };

  const containerStyle =
    departments.length === 1
      ? "max-w-3xl mx-auto"
      : departments.length === 2
      ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start max-w-5xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start";

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Optional Dean / Chairperson Hero Card */}
        {dean && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                School Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-outfit text-white">
                {dean.name}
              </h2>
              <p className="text-blue-200 font-semibold text-sm sm:text-base">
                {dean.designation} — {dean.department}
              </p>
              <p className="text-slate-300 text-xs sm:text-sm">
                {dean.university}
              </p>
            </div>
            {dean.role && (
              <div className="px-5 py-2.5 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-200 font-bold text-sm text-center shrink-0">
                {dean.role}
              </div>
            )}
          </div>
        )}

        <div className={containerStyle}>
          {departments.map((dept, deptIndex) => (
            <div
              key={deptIndex}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide relative z-10">
                  {dept.title}
                </h2>
              </div>

              <div className="p-5 sm:p-6 space-y-4 flex-1">
                {dept.members && dept.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="bg-gray-50/80 hover:bg-blue-50/50 rounded-xl p-4 sm:p-5 border border-gray-100 transition-colors"
                  >
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg leading-snug">
                        {member.name}
                      </h3>
                      {member.role && (
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0 ${getRoleBadge(
                            member.role
                          )}`}
                        >
                          {member.role}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-700 text-xs sm:text-sm font-medium leading-relaxed">
                      {member.designation}
                    </p>

                    {member.university && (
                      <p className="text-gray-600 text-xs sm:text-sm mt-0.5">
                        {member.university}
                      </p>
                    )}

                    {member.location && (
                      <p className="text-gray-500 text-xs mt-0.5">
                        {member.location}
                      </p>
                    )}

                    {(member.phone || member.email) && (
                      <div className="text-xs text-gray-500 pt-2 mt-2 border-t border-gray-200/60 space-y-0.5">
                        {member.phone && <div>Phone: {member.phone}</div>}
                        {member.email && <div>Email: {member.email}</div>}
                      </div>
                    )}
                  </div>
                ))}

                {/* External Experts Section */}
                {dept.experts && dept.experts.length > 0 && (
                  <div className="pt-4 border-t border-slate-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                      External BoS Experts History ({dept.experts.length})
                    </h4>
                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                          <tr>
                            <th className="py-2 px-3">Date</th>
                            <th className="py-2 px-3">BoS Expert Name</th>
                            <th className="py-2 px-3">Institution / Org</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-800">
                          {dept.experts.map((exp, expIdx) => (
                            <tr key={expIdx} className="hover:bg-blue-50/40">
                              <td className="py-2 px-3 font-semibold text-blue-700 whitespace-nowrap">
                                {exp.date}
                              </td>
                              <td className="py-2 px-3 font-medium text-slate-900">
                                {exp.name}
                              </td>
                              <td className="py-2 px-3 text-slate-600">
                                {exp.organization}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function BoardOfStudyPage() {
  const { shortCode } = useParams();
  const [boardofstudiesData, setBoardofstudiesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/about/board-of-studies.jsx`);
        setBoardofstudiesData(module.boardofstudiesData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/about/board-of-studies.jsx");
          setBoardofstudiesData(fallback.boardofstudiesData);
        } catch {
          setBoardofstudiesData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!boardofstudiesData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Board of Studies data not available.</div>;
  }

  return (
    <>
      <BannerSection
        title={boardofstudiesData.heading}
        subtitle={boardofstudiesData.subheading}
        bgTheme={10}
      />
      <BoardOfStudies
        departments={boardofstudiesData.departments}
        dean={boardofstudiesData.dean}
      />
    </>
  );
}
