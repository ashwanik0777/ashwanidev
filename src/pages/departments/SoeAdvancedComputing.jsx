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
import { advancedComputingData } from "../../Data/schools/SOE/about/advanced-computing-center";

const SoeAdvancedComputing = () => {
  return (
    <div>
      <BannerSection
        title={advancedComputingData.hero.title}
        subtitle={advancedComputingData.hero.subtitle}
        bgTheme={advancedComputingData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={advancedComputingData.about.visionTitle}
        visionDescription={advancedComputingData.about.visionDescription}
        missionTitle={advancedComputingData.about.missionTitle}
        missionPoints={advancedComputingData.about.missionPoints}
        storyTitle={advancedComputingData.about.storyTitle}
        storyText={advancedComputingData.about.storyText}
        whatWeDoTitle={advancedComputingData.about.whatWeDoTitle}
        whatWeDoText={advancedComputingData.about.whatWeDoText}
        commitmentTitle={advancedComputingData.about.commitmentTitle}
        commitmentText={advancedComputingData.about.commitmentText}
        photos={advancedComputingData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Team" mentors={advancedComputingData.mentors} />

      <PartnersCarousel
        sectionTitle="Technology Partners"
        sectionSubtitle="Strategic partners supporting our computing infrastructure"
        partners={advancedComputingData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Research Projects"
        subtitle="Simulation and computing-driven engineering research"
        projects={advancedComputingData.projects}
      />
      <DroneCourseCard
        sectionTitle={advancedComputingData.course.sectionTitle}
        sectionSubtitle={advancedComputingData.course.sectionSubtitle}
        imageSrc={advancedComputingData.course.imageSrc}
        imageAlt={advancedComputingData.course.imageAlt}
        badgeText={advancedComputingData.course.badgeText}
        courseTitle={advancedComputingData.course.courseTitle}
        courseDescription={advancedComputingData.course.courseDescription}
        duration={advancedComputingData.course.duration}
        price={advancedComputingData.course.price}
        eligibility={advancedComputingData.course.eligibility}
        startDate={advancedComputingData.course.startDate}
        venue={advancedComputingData.course.venue}
        highlights={advancedComputingData.course.highlights}
        syllabusLink={advancedComputingData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Our Facilities"
        facilities={advancedComputingData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={advancedComputingData.talks}
      />
      <MediaCoverage
        sectionTitle="News & Highlights"
        sectionSubtitle="Latest updates from the Advanced Computing Center"
        mediaItems={advancedComputingData.mediaItems}
      />
    </div>
  );
};

export default SoeAdvancedComputing;
