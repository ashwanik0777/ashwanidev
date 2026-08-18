import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner";

const StaffMembers = ({ staffData, heading, subheading }) => {
  const allMembers = useMemo(() => {
    return staffData.flatMap((dept) => dept.members || []);
  }, [staffData]);

  return (
    <>
      <BannerSection
        title={heading}
        subtitle={subheading}
        bgTheme={4}
      />
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allMembers.map((member, index) => {
              const getInitials = (name) => {
                if (!name) return "GBU";
                const cleanName = name.replace(/\([^)]*\)/g, "").trim();
                const parts = cleanName
                  .split(" ")
                  .filter((n) => n && !["Mr.", "Mrs.", "Dr.", "Prof.", "Ms."].includes(n));
                if (parts.length === 0) return "GBU";
                if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
                return (parts[0][0] + parts[1][0]).toUpperCase();
              };

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 overflow-hidden flex flex-col justify-between transition-all"
                >
                  <div className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white flex items-center justify-center font-bold text-xl shadow-md border-2 border-white relative">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                      <span className="select-none tracking-wider">{getInitials(member.name)}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-blue-700 text-sm font-semibold mt-1">
                      {member.designation}
                    </p>
                    {member.department && (
                      <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {member.department}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default function StaffPage() {
  const { shortCode } = useParams();
  const [staffmembersData, setStaffmembersData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/about/staff-members.jsx`);
        setStaffmembersData(module.staffmembersData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/about/staff-members.jsx");
          setStaffmembersData(fallback.staffmembersData);
        } catch {
          setStaffmembersData(null);
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

  if (!staffmembersData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Staff data not available.</div>;
  }

  return <StaffMembers staffData={staffmembersData.departments} heading={staffmembersData.heading} subheading={staffmembersData.subheading} />;
}
