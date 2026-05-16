import React from "react";
import AboutSection from "../../components/departments/coedt/AboutCEDT";
import Mentors from "../../components/departments/coedt/Mentors";
import PartnersCarousel from "../../components/departments/coedt/PartnersCarousel";
import ProjectsSection from "../../components/departments/coedt/ProjectsSection";
import DroneCourseCard from "../../components/departments/coedt/DroneCourseCard";
import FacilitiesSwiper from "../../components/departments/coedt/FacilitiesSwiper";
import RecentTalks from "../../components/departments/coedt/RecentTalks";
import MediaCoverage from "../../components/departments/coedt/MediaCoverage";
import BannerSection from "../../components/HeroBanner";
import { innovationResearchCellData } from "../../Data/schools/SOE/about/innovation-research-cell";

const SoeInnovationCell = () => {
  return (
    <div>
      <BannerSection
        title={innovationResearchCellData.hero.title}
        subtitle={innovationResearchCellData.hero.subtitle}
        bgTheme={innovationResearchCellData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={innovationResearchCellData.about.visionTitle}
        visionDescription={innovationResearchCellData.about.visionDescription}
        missionTitle={innovationResearchCellData.about.missionTitle}
        missionPoints={innovationResearchCellData.about.missionPoints}
        storyTitle={innovationResearchCellData.about.storyTitle}
        storyText={innovationResearchCellData.about.storyText}
        whatWeDoTitle={innovationResearchCellData.about.whatWeDoTitle}
        whatWeDoText={innovationResearchCellData.about.whatWeDoText}
        commitmentTitle={innovationResearchCellData.about.commitmentTitle}
        commitmentText={innovationResearchCellData.about.commitmentText}
        photos={innovationResearchCellData.about.photos}
      />

      <Mentors sectionTitle="Research Cell Committee" mentors={innovationResearchCellData.mentors} />

      <PartnersCarousel
        sectionTitle="Funding & Research Partners"
        sectionSubtitle="Agencies and organizations supporting SOE research"
        partners={innovationResearchCellData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Active Research Projects"
        subtitle="Funded initiatives across diverse engineering domains"
        projects={innovationResearchCellData.projects}
      />
      <DroneCourseCard
        sectionTitle={innovationResearchCellData.course.sectionTitle}
        sectionSubtitle={innovationResearchCellData.course.sectionSubtitle}
        imageSrc={innovationResearchCellData.course.imageSrc}
        imageAlt={innovationResearchCellData.course.imageAlt}
        badgeText={innovationResearchCellData.course.badgeText}
        courseTitle={innovationResearchCellData.course.courseTitle}
        courseDescription={innovationResearchCellData.course.courseDescription}
        duration={innovationResearchCellData.course.duration}
        price={innovationResearchCellData.course.price}
        eligibility={innovationResearchCellData.course.eligibility}
        startDate={innovationResearchCellData.course.startDate}
        venue={innovationResearchCellData.course.venue}
        highlights={innovationResearchCellData.course.highlights}
        syllabusLink={innovationResearchCellData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Research Infrastructure"
        facilities={innovationResearchCellData.facilities}
      />
      <RecentTalks
        sectionTitle="Seminars & Workshops"
        talks={innovationResearchCellData.talks}
      />
      <MediaCoverage
        sectionTitle="Research Highlights & News"
        sectionSubtitle="Achievements and milestones from SOE Innovation & Research Cell"
        mediaItems={innovationResearchCellData.mediaItems}
      />
    </div>
  );
};

export default SoeInnovationCell;
