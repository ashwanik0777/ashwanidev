import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { UserCheck, Wrench, FlaskConical } from "lucide-react";
import BannerSection from "../../components/HeroBanner";

const LaboratoryCard = ({ lab, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 p-6 flex flex-col justify-between transition-all group"
    >
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            #{lab.sno || index + 1}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-5 group-hover:text-blue-700 transition-colors">
          {lab.name}
        </h3>

        <div className="space-y-2.5 pt-2 border-t border-gray-100 text-sm">
          <div className="flex items-center gap-2.5 text-gray-700">
            <UserCheck className="w-4 h-4 text-blue-600 shrink-0" />
            <div>
              <span className="text-xs text-gray-400 block font-medium">Faculty In-Charge</span>
              <span className="font-semibold text-gray-800">{lab.faculty}</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 text-gray-700 pt-1">
            <Wrench className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              <span className="text-xs text-gray-400 block font-medium">Technical Support</span>
              <span className="font-semibold text-gray-800">{lab.support}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Laboratories() {
  const { shortCode } = useParams();
  const [laboratoriesData, setLaboratoriesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/about/laboratories.jsx`);
        setLaboratoriesData(module.laboratoriesData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/about/laboratories.jsx");
          setLaboratoriesData(fallback.laboratoriesData);
        } catch {
          setLaboratoriesData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  const labs = useMemo(() => {
    return laboratoriesData?.laboratories || [];
  }, [laboratoriesData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!laboratoriesData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Laboratories data not available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <BannerSection
        title={laboratoriesData.heading}
        subtitle={laboratoriesData.subheading}
        bgTheme={3}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {labs.map((lab, index) => (
            <LaboratoryCard key={lab.name} lab={lab} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
