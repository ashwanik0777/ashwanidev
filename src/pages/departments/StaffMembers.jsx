import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner";
import { staffmembersData } from "../../Data/schools/SOICT/about/staff-members";

const StaffMembers = ({ staffData }) => {
  const [activeDept, setActiveDept] = useState(staffData[0]?.short || "");

  const activeMembers = useMemo(() => {
    return staffData.find((dept) => dept.short === activeDept)?.members || [];
  }, [activeDept, staffData]);

  return (
    <>
      <BannerSection
        title={staffmembersData.heading}
        subtitle={staffmembersData.subheading}
        bgTheme={4}
      />
      <div className="min-h-screen bg-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {staffData.map((dept) => (
              <button
                key={dept.short}
                onClick={() => setActiveDept(dept.short)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border border-solid ${
                  activeDept === dept.short
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
                }`}
              >
                {dept.department}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 border-solid overflow-hidden"
              >
                <div className="p-6 text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.designation}
                  </p>
                </div>

                <div className="border-t border-gray-200 p-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="font-mono text-xs">{member.phone}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 text-blue-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-mono text-xs text-blue-700">
                      {member.email}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default function StaffPage() {
  return <StaffMembers staffData={staffmembersData.departments} />;
}
