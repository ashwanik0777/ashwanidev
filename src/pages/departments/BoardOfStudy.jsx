import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSection from "../../components/HeroBanner";

const BoardOfStudies = ({ departments }) => {
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

  return (
    <div className="min-h-screen bg-gray-50/50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start">
          {departments.map((dept, deptIndex) => (
            <div
              key={deptIndex}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 p-6 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide relative z-10">
                  {dept.title}
                </h2>
              </div>

              <div className="p-5 sm:p-6 space-y-4">
                {dept.members.map((member, memberIndex) => (
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
      <BoardOfStudies departments={boardofstudiesData.departments} />
    </>
  );
}
