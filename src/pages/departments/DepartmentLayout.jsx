import BannerSection from "../../components/HeroBanner";
import HodMessage from "../../components/departments/cse/Hod";
import AboutDepartment from "../../components/departments/cse/AboutDepartment";
import Programs from "../../components/departments/cse/Program";
import FacultyCarousel from "../../components/departments/faculty_rotating";
import ResearchSection from "../../components/departments/ResearchSection";
import StudentAchievers from "../../components/departments/cse/StudentAchievers";

const DepartmentLayout = ({
  heroProps,
  hodProps,
  aboutProps,
  programsData,
  schoolCode,
  departmentId,
  facultyMembers,
  researchAreas,
  researchStats,
  topAchievers,
  achievements,
  hideAbout,
  hideResearch,
  hideAchievers,
}) => {
  const currentSchool = (schoolCode || "").toUpperCase();
  const shouldHideAbout = hideAbout || currentSchool === "SOM" || currentSchool === "SOHSS" || currentSchool === "SOVS";
  const shouldHideResearch = hideResearch || currentSchool === "SOM" || currentSchool === "SOHSS" || currentSchool === "SOVS";
  const shouldHideAchievers = hideAchievers || currentSchool === "SOM" || currentSchool === "SOHSS" || currentSchool === "SOVS";
  // "Department of Civil Engineering" -> "Civil Engineering"
  const departmentName = (heroProps?.title || "").replace(/^(Department|School) of\s+/i, "").trim();

  return (
    <div className="min-h-screen bg-background">
      {/* Same banner theme for every department so all schools look identical */}
      <BannerSection {...heroProps} bgTheme={1} />
      <HodMessage {...hodProps} />
      {aboutProps && !shouldHideAbout && <AboutDepartment {...aboutProps} />}
      <Programs
        heading="Academic Programs"
        programs={programsData}
      />
      <FacultyCarousel
        title={departmentName ? `Meet ${departmentName} Faculty` : "Meet Our Faculty"}
        schoolCode={schoolCode}
        departmentId={departmentId}
        facultyList={facultyMembers}
        navigateTo={schoolCode ? `/schools/${schoolCode}/faculty` : "/academics/faculty"}
        autoSlideInterval={5000}
      />

      {!shouldHideResearch && ((researchAreas && researchAreas.length > 0) || (researchStats && researchStats.length > 0)) && (
        <ResearchSection
          title="Research & Innovation"
          researchAreas={researchAreas}
          researchStats={researchStats}
        />
      )}

      {!shouldHideAchievers && ((topAchievers && topAchievers.length > 0) || (achievements && achievements.length > 0)) && (
        <StudentAchievers
          topAchievers={topAchievers}
          achievements={achievements}
          achieversHeading="Top Student Achievers"
          achieversSubheading="Students making us proud globally"
          achievementsHeading="Key Achievements"
          achievementsSubheading="Excellence and recognition"
        />
      )}
    </div>
  );
};

export default DepartmentLayout;

