import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Youtube } from "lucide-react";
import { getSchoolByCode } from "../../services/schoolsService";

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
    const baseClass = "w-5 h-5 transition-colors cursor-pointer";
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
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
            Student Clubs &amp; Activities
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayClubs.map((club, idx) => (
            <div
              key={club.id || idx}
              className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
              onClick={() => handleCardClick(club)}
            >
              <div>
                <div className="relative">
                  <img
                    src={
                      club.banner ||
                      club.image ||
                      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                    }
                    alt={club.name || "Club"}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white">
                      {club.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-college-navy text-lg font-semibold mb-2">
                    {club.name}
                  </h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {club.description}
                  </p>
                  <p className="text-sm text-gray-500 mb-1">Faculty Advisor:</p>
                  <p className="text-sm font-medium text-college-navy mb-3 truncate">
                    {club.facultyAdvisor ||
                      club.team?.facultyCoordinator?.name ||
                      "N/A"}
                  </p>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-500">Members:</span>
                    <span className="font-semibold text-college-blue">
                      {club.members || club.memberCount || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social links */}
              {club.socialMedia &&
                Object.values(club.socialMedia).some((v) => v) && (
                  <div className="border-t pt-4 pb-6 px-6">
                    <div className="flex justify-center gap-4">
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
