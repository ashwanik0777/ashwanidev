import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSection from "../../components/HeroBanner";

const BoardOfStudies = ({ departments }) => {
  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {departments.map((dept, deptIndex) => (
            <div
              key={deptIndex}
              className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-3 border border-gray-100 border-solid overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
                <h2 className="text-2xl font-bold text-white text-center tracking-wide relative z-10">
                  {dept.title}
                </h2>
              </div>

              <div className="p-8 space-y-8">
                {dept.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border-l-4 border-blue-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {member.name}
                      </h3>
                      {member.role && (
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            member.role === "Chairperson"
                              ? "bg-blue-100 text-blue-800"
                              : member.role === "HoD"
                              ? "bg-green-100 text-green-800"
                              : member.role === "External Expert"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {member.role}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-2 font-medium">
                      {member.designation}
                    </p>

                    {member.university && (
                      <p className="text-gray-600 text-sm mb-1">
                        {member.university}
                      </p>
                    )}

                    {member.location && (
                      <p className="text-gray-600 text-sm mb-4">
                        {member.location}
                      </p>
                    )}

                    <div className="text-xs text-gray-600 space-y-1">
                      {member.phone && <div>Phone: {member.phone}</div>}
                      {member.email && <div>Email: {member.email}</div>}
                    </div>
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
