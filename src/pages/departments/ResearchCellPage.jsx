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
import { researchCellData } from "../../Data/schools/SOBT/about/research-cell";

const ResearchCellPage = () => {
  return (
    <div>
      <BannerSection
        title={researchCellData.hero.title}
        subtitle={researchCellData.hero.subtitle}
        bgTheme={researchCellData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={researchCellData.about.visionTitle}
        visionDescription={researchCellData.about.visionDescription}
        missionTitle={researchCellData.about.missionTitle}
        missionPoints={researchCellData.about.missionPoints}
        storyTitle={researchCellData.about.storyTitle}
        storyText={researchCellData.about.storyText}
        whatWeDoTitle={researchCellData.about.whatWeDoTitle}
        whatWeDoText={researchCellData.about.whatWeDoText}
        commitmentTitle={researchCellData.about.commitmentTitle}
        commitmentText={researchCellData.about.commitmentText}
        photos={researchCellData.about.photos}
      />

      <Mentors sectionTitle="Research Cell Committee" mentors={researchCellData.mentors} />

      <PartnersCarousel
        sectionTitle="Funding & Research Partners"
        sectionSubtitle="Agencies and organizations supporting SOBT research"
        partners={researchCellData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Active Research Projects"
        subtitle="Funded initiatives across diverse areas of biotechnology"
        projects={researchCellData.projects}
      />
      <DroneCourseCard
        sectionTitle={researchCellData.course.sectionTitle}
        sectionSubtitle={researchCellData.course.sectionSubtitle}
        imageSrc={researchCellData.course.imageSrc}
        imageAlt={researchCellData.course.imageAlt}
        badgeText={researchCellData.course.badgeText}
        courseTitle={researchCellData.course.courseTitle}
        courseDescription={researchCellData.course.courseDescription}
        duration={researchCellData.course.duration}
        price={researchCellData.course.price}
        eligibility={researchCellData.course.eligibility}
        startDate={researchCellData.course.startDate}
        venue={researchCellData.course.venue}
        highlights={researchCellData.course.highlights}
        syllabusLink={researchCellData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Research Infrastructure"
        facilities={researchCellData.facilities}
      />
      <RecentTalks
        sectionTitle="Seminars & Workshops"
        talks={researchCellData.talks}
      />
      <MediaCoverage
        sectionTitle="Research Highlights & News"
        sectionSubtitle="Achievements and milestones from SOBT Research Cell"
        mediaItems={researchCellData.mediaItems}
      />
    </div>
  );
};

export default ResearchCellPage;
