import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Youtube } from "lucide-react";
import { getSchoolByCode } from "../../services/schoolsService";
import SectionHeading, { SECTION_PADDING, SECTION_CONTAINER, SLIDER_SIDE_SPACE, HEADING_SPACE } from "./SectionHeading";

const ClubsAchievements = ({ schoolCode }) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolClubs = async () => {
      if (!schoolCode) {
        setClubs([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const school = await getSchoolByCode(schoolCode);
        const dbClubs =
          school && school.content && Array.isArray(school.content.clubs)
            ? school.content.clubs
            : [];
        setClubs(dbClubs);
      } catch (err) {
        console.error("Failed to load school clubs:", err);
        setClubs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchSchoolClubs();
  }, [schoolCode]);

  const handleCardClick = (club) => {
    if (club.isUniversityLevel) {
      navigate(club.path);
    } else {
      const clubId =
        club.id || (club.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-");
      navigate(`/club/${clubId}?school=${schoolCode}`);
    }
  };

  const renderSocialIcon = (platform, url) => {
    if (!url) return null;
    const baseClass = "w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8 transition-colors cursor-pointer";
    const classMap = {
      facebook: `${baseClass} text-gray-600 hover:text-blue-600`,
      instagram: `${baseClass} text-gray-600 hover:text-pink-500`,
      twitter: `${baseClass} text-gray-600 hover:text-sky-500`,
      linkedin: `${baseClass} text-gray-600 hover:text-blue-700`,
      email: `${baseClass} text-gray-600 hover:text-red-500`,
      youtube: `${baseClass} text-gray-600 hover:text-red-600`,
    };

    const openLink = (e) => {
      e.stopPropagation();
      if (platform === "email") {
        window.open(`mailto:${url}`, "_blank");
      } else {
        window.open(url, "_blank");
      }
    };

    const icons = {
      facebook: Facebook,
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      email: Mail,
      youtube: Youtube,
    };

    const Icon = icons[platform];
    if (!Icon) return null;

    return <Icon className={classMap[platform] || baseClass} onClick={openLink} />;
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2" />
        Loading Clubs...
      </div>
    );
  }

  // Build display list — add stable IDs
  const displayClubs = clubs
    .filter((club) => {
      const name = (club.name || "").toLowerCase();
      return (
        !name.includes("nss") &&
        !name.includes("ncc") &&
        !name.includes("national service scheme") &&
        !name.includes("national cadet corps")
      );
    })
    .map((club) => ({
      ...club,
      id: club.id || (club.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

  // If no clubs, hide the entire section
  if (displayClubs.length === 0) return null;

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <SectionHeading className={`${HEADING_SPACE} px-4`}>Student Clubs &amp; Activities</SectionHeading>

      {/* Same width as the faculty / departments sections */}
      <div className={`${SECTION_CONTAINER} ${SLIDER_SIDE_SPACE}`}>
        <div className="grid gap-5 sm:gap-6 lg:gap-8 min-[2560px]:gap-12 sm:grid-cols-2 lg:grid-cols-3 min-[1920px]:grid-cols-4">
          {displayClubs.map((club, idx) => (
            <div
              key={club.id || idx}
              className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer flex flex-col overflow-hidden"
              onClick={() => handleCardClick(club)}
            >
              <div className="relative">
                <img
                  src={
                    club.banner ||
                    club.image ||
                    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                  }
                  alt={club.name || "Club"}
                  loading="lazy"
                  className="w-full h-36 sm:h-40 lg:h-44 min-[2560px]:h-72 object-cover"
                />
                {club.category && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="outline" className="bg-white text-blue-700 border-blue-100 min-[2560px]:text-lg">
                      {club.category}
                    </Badge>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 min-[2560px]:p-8 flex-1 flex flex-col">
                <h4 className="text-base sm:text-lg min-[2560px]:text-3xl font-bold text-blue-900 leading-snug mb-1.5">
                  {club.name}
                </h4>
                <p className="text-xs sm:text-sm min-[2560px]:text-xl text-slate-600 leading-relaxed line-clamp-2 mb-3">
                  {club.description}
                </p>

                <div className="mt-auto pt-3 border-t border-slate-100 space-y-1.5 text-xs sm:text-sm min-[2560px]:text-xl">
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500 shrink-0">Faculty Advisor</span>
                    <span className="font-medium text-slate-800 truncate text-right">
                      {club.facultyAdvisor ||
                        club.team?.facultyCoordinator?.name ||
                        "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between gap-3">
                    <span className="text-slate-500">Members</span>
                    <span className="font-semibold text-blue-700">
                      {club.members || club.memberCount || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              {club.socialMedia &&
                Object.values(club.socialMedia).some((v) => v) && (
                  <div className="border-t border-slate-100 py-3 min-[2560px]:py-5 px-4">
                    <div className="flex justify-center gap-4 min-[2560px]:gap-6">
                      {Object.entries(club.socialMedia).map(
                        ([platform, url]) =>
                          url && (
                            <div key={platform}>
                              {renderSocialIcon(platform, url)}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubsAchievements;
