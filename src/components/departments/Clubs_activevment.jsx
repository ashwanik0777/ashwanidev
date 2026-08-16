import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Youtube } from "lucide-react";
import { getSchoolByCode } from "../../services/schoolsService";

const nssCard = {
  id: "nss",
  name: "National Service Scheme (NSS)",
  tagline: "Not Me But You",
  category: "University-Level",
  banner: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800",
  description: "The National Service Scheme (NSS) is a Government-sponsored public service program under the Ministry of Youth Affairs & Sports, Govt. of India.",
  facultyAdvisor: "Dr. Gaurav Kumar",
  memberCount: "500+",
  isUniversityLevel: true,
  path: "/campus-life/NSS"
};

const nccCard = {
  id: "ncc",
  name: "National Cadet Corps (NCC)",
  tagline: "Unity and Discipline",
  category: "University-Level",
  banner: "https://images.unsplash.com/photo-1621293954908-9071414472f1?w=800",
  description: "The National Cadet Corps is the youth wing of the Indian Armed Forces. It operates as a tri-services organization, comprising the Army, the Navy and the Air Wing.",
  facultyAdvisor: "Lt. Col. Rajesh Kumar",
  memberCount: "300+",
  isUniversityLevel: true,
  path: "/campus-life/NCC"
};

const ClubsAchievements = ({ schoolCode, clubs: defaultClubs = [] }) => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchoolClubs = async () => {
      if (!schoolCode) return;
      setLoading(true);
      try {
        const school = await getSchoolByCode(schoolCode);
        if (school && school.content && school.content.clubs && school.content.clubs.length > 0) {
          setClubs(school.content.clubs);
        } else {
          setClubs([]);
        }
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
      navigate(`/club/${club.id}?school=${schoolCode}`);
    }
  };

  const renderSocialIcon = (platform, url) => {
    const baseClass = "w-5 h-5 transition-colors cursor-pointer";
    const getClass = {
      facebook: `${baseClass} text-gray-600 hover:text-blue-600`,
      instagram: `${baseClass} text-gray-600 hover:text-pink-500`,
      twitter: `${baseClass} text-gray-600 hover:text-sky-500`,
      linkedin: `${baseClass} text-gray-600 hover:text-blue-700`,
      email: `${baseClass} text-gray-600 hover:text-red-500`,
      youtube: `${baseClass} text-gray-600 hover:text-red-600`,
    }[platform];

    const openLink = (e) => {
      e.stopPropagation(); // Prevent card click when clicking social icons
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
    if (!Icon) return null; // Prevent rendering undefined

    return <Icon className={getClass} onClick={openLink} />;
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
        Loading Clubs...
      </div>
    );
  }

  const displayClubs = [
    ...clubs.map(club => ({
      ...club,
      id: club.id || club.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    })),
    nssCard,
    nccCard
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">Student Clubs & Activities</h2>
          {/* <p className="text-xl text-gray-600">Fostering leadership and innovation</p> */}
          <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayClubs.map((club, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
              onClick={() => handleCardClick(club)}
            >
              <div>
                <div className="relative">
                  <img src={club.banner || club.image || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"} alt="club" className="w-full h-48 object-cover rounded-t-xl" />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white">{club.category}</Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-college-navy text-lg font-semibold mb-2">{club.name}</h4>
                  <p className="text-gray-600 mb-3 line-clamp-2">{club.description}</p>
                  <p className="text-sm text-gray-500 mb-1">Faculty Advisor:</p>
                  <p className="text-sm font-medium text-college-navy mb-3 truncate">
                    {club.facultyAdvisor || club.team?.facultyCoordinator?.name || "N/A"}
                  </p>
                  <div className="flex justify-between text-sm mb-4">
                    <span className="text-gray-500">Members:</span>
                    <span className="font-semibold text-college-blue">{club.members || club.memberCount || "N/A"}</span>
                  </div>
                </div>
              </div>
              {club.socialMedia && Object.keys(club.socialMedia).length > 0 && (
                <div className="border-t pt-4 pb-6 px-6">
                  <div className="flex justify-center gap-4">
                    {Object.entries(club.socialMedia || {}).map(([platform, url]) => (
                      <div key={platform}>{renderSocialIcon(platform, url)}</div>
                    ))}
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
