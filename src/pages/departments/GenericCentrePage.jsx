import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BannerSection from "../../components/HeroBanner";
import AboutSection from "../../components/departments/coedt/AboutCEDT";
import FacilitiesSwiper from "../../components/departments/coedt/FacilitiesSwiper";

/**
 * Generic Centre Page — Dynamically loads centre/unit data from
 * Data/schools/{schoolCode}/about/{centreId}.jsx and renders
 * the hero, about, facilities, and key activities sections.
 */
const GenericCentrePage = () => {
  const { shortCode } = useParams();
  const location = window.location.pathname;
  const centreId = location.split("/").filter(Boolean).pop();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOBSC").toUpperCase();
        // Map URL centreId to actual about file name
        const fileMap = {
          "meditation-mindfulness-centre": "meditation-mindfulness",
        };
        const fileName = fileMap[centreId] || centreId;
        const module = await import(`../../Data/schools/${schoolCode}/about/${fileName}.jsx`);
        // Try multiple export name patterns
        const exportData =
          module.centreBuddhistStudiesData ||
          module.paliSanskritStudiesData ||
          module.heritageArchaeologyData ||
          module.meditationMindfulnessData ||
          Object.values(module).find((v) => v && typeof v === "object" && v.hero);
        setData(exportData || null);
      } catch (err) {
        console.warn(`Centre data not found for ${shortCode}/${centreId}`, err);
        setData(null);
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode, centreId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Centre/Unit data not available.
      </div>
    );
  }

  return (
    <div>
      {data.hero && (
        <BannerSection
          title={data.hero.title}
          subtitle={data.hero.subtitle}
          bgTheme={data.hero.bgTheme || 5}
        />
      )}

      {data.about && (
        <AboutSection
          sectionTitle="About Us"
          visionTitle={data.about.visionTitle}
          visionDescription={data.about.visionDescription}
          missionTitle={data.about.missionTitle}
          missionPoints={data.about.missionPoints}
          storyTitle={data.about.storyTitle}
          storyText={data.about.storyText}
          whatWeDoTitle={data.about.whatWeDoTitle}
          whatWeDoText={data.about.whatWeDoText}
          commitmentTitle={data.about.commitmentTitle}
          commitmentText={data.about.commitmentText}
          photos={data.about.photos}
        />
      )}

      {data.facilities && data.facilities.length > 0 && (
        <FacilitiesSwiper
          sectionTitle="Our Facilities"
          facilities={data.facilities}
        />
      )}

      {/* Key Activities Section */}
      {data.keyActivities && data.keyActivities.length > 0 && (
        <section className="py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
              Key Activities & Programs
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              Discover our flagship initiatives and regular programs
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.keyActivities.map((activity, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500" />
                    <h3 className="text-lg font-bold text-gray-800">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {activity.description}
                  </p>
                  {activity.date && (
                    <div className="text-xs font-semibold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block">
                      📅 {activity.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default GenericCentrePage;
