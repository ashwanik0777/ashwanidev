import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import ClubHero from '../../components/clubs/ClubHero';
import ClubAbout from '../../components/clubs/ClubAbout';
import ClubPolicies from '../../components/clubs/ClubPolicies';
import ClubTeam from '../../components/clubs/ClubTeam';
import ClubEvents from '../../components/clubs/ClubEvents';
import ClubSocialMedia from '../../components/clubs/ClubSocialMedia';
import ClubReports from '../../components/clubs/ClubReports';
import ClubNavigation from '../../components/clubs/ClubNavigation';
import { clubsData } from '../../components/clubs/data/clubsData';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';
import { getSchoolByCode, listSchools } from '../../services/schoolsService';

const normalizeStaticClub = (foundStaticClub, schoolCode) => {
  if (!foundStaticClub) return null;
  return {
    id: foundStaticClub.id || foundStaticClub.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: foundStaticClub.name,
    tagline: foundStaticClub.tagline || foundStaticClub.category || "Student Club",
    category: foundStaticClub.category || "Student Club",
    banner: foundStaticClub.banner || foundStaticClub.image,
    memberCount: foundStaticClub.members || foundStaticClub.memberCount || "N/A",
    description: foundStaticClub.description || "",
    objectives: foundStaticClub.objectives || [
      "Promote student participation and leadership",
      "Organize learning workshops and competitions",
      "Create networking opportunities within the field"
    ],
    history: foundStaticClub.history || `The ${foundStaticClub.name} was established to foster creativity and collaboration among students. Since its inception, it has organized numerous activities helping members develop their skills.`,
    achievements: foundStaticClub.achievements || [
      "Organized multiple annual events and workshops",
      "Built a strong community of active members",
      "Promoted learning and student-led initiatives"
    ],
    policies: foundStaticClub.policies || {
      codeOfConduct: [
        "Respect all members and opinions",
        "Contribute positively to activities",
        "Maintain decorum during meetings and events"
      ],
      eligibility: [
        "Open to all students of the school",
        "No prior experience required",
        "Commitment to participate in events"
      ],
      responsibilities: [
        "Advisors: Overall guidance and event approvals",
        "Student Committee: Event planning and execution"
      ],
      meetingFrequency: foundStaticClub.meetingFrequency || "Regular monthly meetings"
    },
    team: foundStaticClub.team || {
      facultyCoordinator: foundStaticClub.facultyAdvisor ? {
        name: foundStaticClub.facultyAdvisor,
        role: "Faculty Advisor",
        department: schoolCode || "Gautam Buddha University"
      } : null,
      members: []
    },
    events: foundStaticClub.events || [],
    reports: foundStaticClub.reports || [],
    socialMedia: foundStaticClub.socialMedia || foundStaticClub.socialLinks || {}
  };
};

const ClubDetail = () => {
  const { clubId } = useParams();
  const [searchParams] = useSearchParams();
  const schoolCode = searchParams.get("school");
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClubData = async () => {
      setLoading(true);
      try {
        // 1. Try static first
        const staticClub = clubsData.find(c => c.id === clubId);
        if (staticClub) {
          setClub(staticClub);
          setLoading(false);
          return;
        }

        // 2. Try school from query param
        if (schoolCode) {
          const school = await getSchoolByCode(schoolCode);
          const dynamicClub = school?.content?.clubs?.find(c => {
            const dynamicId = c.id || c.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return dynamicId === clubId;
          });
          if (dynamicClub) {
            setClub(dynamicClub);
            setLoading(false);
            return;
          }

          // Fallback: Try static config for this school
          try {
            const structureModule = await import(`../../Data/schools/${schoolCode}/home.jsx`);
            const configData = structureModule.sectionsConfig;
            const clubsSection = configData?.find(sec => sec.componentName === "ClubsAchievements");
            const staticClubs = clubsSection?.props?.clubs || [];
            const foundStaticClub = staticClubs.find(c => {
              const staticId = c.id || c.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return staticId === clubId;
            });
            if (foundStaticClub) {
              setClub(normalizeStaticClub(foundStaticClub, schoolCode));
              setLoading(false);
              return;
            }
          } catch (importErr) {
            console.warn(`No static config found for school ${schoolCode}:`, importErr);
          }

          // If schoolCode was provided but club was not found in it, do not fall back to other schools
          setClub(null);
          setLoading(false);
          return;
        }

        // 3. Fallback: Search all schools (only if no schoolCode was provided)
        try {
          const schools = await listSchools();
          for (const school of schools) {
            const dynamicClub = school.content?.clubs?.find(c => {
              const dynamicId = c.id || c.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return dynamicId === clubId;
            });
            if (dynamicClub) {
              setClub(dynamicClub);
              setLoading(false);
              return;
            }
          }
        } catch (dbErr) {
          console.error("Failed to check database schools in fallback:", dbErr);
        }

        // Search static config of all schools
        const SCHOOLS_LIST = ["SOICT", "SOBT", "SOBSC", "SOE", "SOL", "SOM", "SOHSS", "SOVS"];
        for (const code of SCHOOLS_LIST) {
          try {
            const structureModule = await import(`../../Data/schools/${code}/home.jsx`);
            const configData = structureModule.sectionsConfig;
            const clubsSection = configData?.find(sec => sec.componentName === "ClubsAchievements");
            const staticClubs = clubsSection?.props?.clubs || [];
            const foundStaticClub = staticClubs.find(c => {
              const staticId = c.id || c.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return staticId === clubId;
            });
            if (foundStaticClub) {
              setClub(normalizeStaticClub(foundStaticClub, code));
              setLoading(false);
              return;
            }
          } catch (importErr) {
            // Ignore failed imports
          }
        }
      } catch (err) {
        console.error("Failed to load club details:", err);
      } finally {
        setLoading(false);
      }
    };
    loadClubData();
  }, [clubId, schoolCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Club Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <SearchableWrapper>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ClubHero club={club} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-12">
            <section id="about">
              <ClubAbout club={club} />
            </section>
            
            <section id="policies">
              <ClubPolicies club={club} />
            </section>
            
            <section id="team">
              <ClubTeam club={club} />
            </section>
            
            <section id="events">
              <ClubEvents club={club} />
            </section>
            
            <section id="reports">
              <ClubReports club={club} />
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <ClubSocialMedia club={club} />
              <ClubNavigation />
            </div>
          </div>
        </div>
      </div>
    </div>
    </SearchableWrapper>
  );
};

export default ClubDetail;
