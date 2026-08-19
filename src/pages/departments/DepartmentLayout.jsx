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
  facultyStats,
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
  const shouldHideAbout = hideAbout || currentSchool === "SOM" || currentSchool === "SOHSS";
  const shouldHideResearch = hideResearch || currentSchool === "SOM" || currentSchool === "SOHSS";
  const shouldHideAchievers = hideAchievers || currentSchool === "SOM" || currentSchool === "SOHSS";

  return (
    <div className="min-h-screen bg-background">
      <BannerSection {...heroProps} />
      <HodMessage {...hodProps} />
      {aboutProps && !shouldHideAbout && <AboutDepartment {...aboutProps} />}
      <Programs
        heading="Academic Programs"
        subheading="Choose from our diverse range of programs designed to meet your academic and career goals."
        programs={programsData}
      />
      <FacultyCarousel
        title="Meet Our Faculty"
        subTitle="Experienced educators and researchers dedicated to student success"
        schoolCode={schoolCode}
        departmentId={departmentId}
        facultyList={facultyMembers}
        navigateTo={schoolCode ? `/schools/${schoolCode}/faculty` : "/academics/faculty"}
        autoSlideInterval={5000}
        visibleCards={3}
        bottomStats={facultyStats}
      />

      {!shouldHideResearch && ((researchAreas && researchAreas.length > 0) || (researchStats && researchStats.length > 0)) && (
        <ResearchSection
          title="Research & Innovation"
          subtitle="Pioneering technology research and real-world domain solutions."
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

