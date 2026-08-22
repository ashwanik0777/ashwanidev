import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Mail, Phone, Search, Filter, X, BookOpen, Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

import Landing from "../../../components/departments/Landing";
import AboutSection from "../../../components/departments/AboutIct";
import SchoolStats from "../../../components/departments/SchoolStats";
import LeadershipCard from "../../../components/departments/Dean";
import DepartmentsSection from "../../../components/departments/Deptcard";
// import ProgramsShowcase from "../../../components/departments/Program";
import FacultyCarousel from "../../../components/departments/faculty_rotating.jsx";
import NoticeEvents from "../../../components/departments/Notice.jsx";
import PlacementsSection from "../../../components/departments/Placement.jsx";
import RecentPlacements from "../../../components/departments/Recent_Placement.jsx";
import RecruitersShowcase from "../../../components/departments/Recuritor_showcase";
import ClubsAchievements from "../../../components/departments/Clubs_activevment.jsx";
// import StudentAchievements from "../../../components/departments/Student_achievements.jsx";
// import StudentStartup from "../../../components/departments/Startup.jsx";
import { resolveSchool } from '../../../Data/schoolsMeta';

const componentsMap = {
  Landing,
  AboutSection,
  SchoolStats,
  LeadershipCard,
  DepartmentsSection,
  FacultyCarousel,
  NoticeEvents,
  ClubsAchievements,
  PlacementsSection,
  RecentPlacements,
  RecruitersShowcase,
};

// Semester registration is not live yet — banner + link kept out of the build.
// import SemesterRegistrationBanner from "../../../components/home/SemesterRegistrationBanner.jsx";

export default function SchoolDetail() {
  const { shortCode } = useParams();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolvedCode, setResolvedCode] = useState(shortCode);

  useEffect(() => {
    const fetchSections = async () => {
      setLoading(true);
      try {
        // Resolve the URL shortCode (could be SOICT, soict, ict, etc.) to the canonical school code
        const school = resolveSchool(shortCode);
        const canonicalCode = school?.code || shortCode.toUpperCase();
        setResolvedCode(canonicalCode);

        // Load from folder structure: Data/schools/SOICT/home.jsx
        const structureModule = await import(`../../../Data/schools/${canonicalCode}/home.jsx`);

        const configData = structureModule.sectionsConfig;

        if (configData && Array.isArray(configData)) {
          const enabledSorted = configData
            .filter((sec) => sec.enabled)
            .sort((a, b) => a.position - b.position);
          setSections(enabledSorted);
        } else {
          setSections([]);
        }
      } catch (error) {
        console.error(`Error loading structure config for ${shortCode}:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, [shortCode]);

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center">Loading School Details...</div>;
  }

  if (sections.length === 0) {
    return <div className="min-h-screen flex justify-center items-center text-xl text-red-500">School configuration not found or empty.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {sections.map((section, idx) => {
        const Component = componentsMap[section.componentName];
        if (!Component) return null;

        // Spread the backend/json props directly to the targeted module
        return (
          <React.Fragment key={idx}>
            <Component {...(section.props || {})} schoolCode={resolvedCode} />
            {/* {section.componentName === 'Landing' && <SemesterRegistrationBanner />} */}
          </React.Fragment>
        );
      })}
    </div>
  );
}
