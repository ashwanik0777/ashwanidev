import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner";

const LaboratoryCard = ({ lab, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 border-solid overflow-hidden"
    >
      <div className="relative h-44">
        <img
          src={lab.image}
          alt={lab.name}
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400x200.png?text=Lab+Image";
          }}
          className="w-full h-full object-cover"
        />
        {lab.isNew && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
            NEW
          </span>
        )}
        <span className="absolute top-3 left-3 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
          {lab.category}
        </span>
      </div>
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-bold text-gray-800">{lab.name}</h3>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Faculty:</span> {lab.faculty}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Support:</span> {lab.support}
        </p>
      </div>
    </motion.div>
  );
};

export default function Laboratories() {
  const { shortCode } = useParams();
  const [laboratoriesData, setLaboratoriesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

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

  const categories = useMemo(() => {
    if (!laboratoriesData?.laboratories) return ["All"];
    const unique = new Set(
      laboratoriesData.laboratories.map((lab) => lab.category)
    );
    return ["All", ...Array.from(unique)];
  }, [laboratoriesData]);

  const filteredLabs = useMemo(() => {
    if (!laboratoriesData?.laboratories) return [];
    if (filter === "All") {
      return laboratoriesData.laboratories;
    }
    return laboratoriesData.laboratories.filter((lab) => lab.category === filter);
  }, [filter, laboratoriesData]);

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
    <div className="min-h-screen bg-white">
      <BannerSection
        title={laboratoriesData.heading}
        subtitle={laboratoriesData.subheading}
        bgTheme={3}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border border-solid transition-all ${
                filter === category
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-200 hover:border-blue-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredLabs.map((lab, index) => (
            <LaboratoryCard key={lab.name} lab={lab} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
