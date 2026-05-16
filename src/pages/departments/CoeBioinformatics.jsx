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
import { coeBioinformaticsData } from "../../Data/schools/SOBT/about/coe-bioinformatics";

const CoeBioinformatics = () => {
  return (
    <div>
      <BannerSection
        title={coeBioinformaticsData.hero.title}
        subtitle={coeBioinformaticsData.hero.subtitle}
        bgTheme={coeBioinformaticsData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={coeBioinformaticsData.about.visionTitle}
        visionDescription={coeBioinformaticsData.about.visionDescription}
        missionTitle={coeBioinformaticsData.about.missionTitle}
        missionPoints={coeBioinformaticsData.about.missionPoints}
        storyTitle={coeBioinformaticsData.about.storyTitle}
        storyText={coeBioinformaticsData.about.storyText}
        whatWeDoTitle={coeBioinformaticsData.about.whatWeDoTitle}
        whatWeDoText={coeBioinformaticsData.about.whatWeDoText}
        commitmentTitle={coeBioinformaticsData.about.commitmentTitle}
        commitmentText={coeBioinformaticsData.about.commitmentText}
        photos={coeBioinformaticsData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Team" mentors={coeBioinformaticsData.mentors} />

      <PartnersCarousel
        sectionTitle="Our Collaborators"
        sectionSubtitle="Strategic partners supporting our research mission"
        partners={coeBioinformaticsData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Research Projects"
        subtitle="Innovative computational biology initiatives driving discovery"
        projects={coeBioinformaticsData.projects}
      />
      <DroneCourseCard
        sectionTitle={coeBioinformaticsData.course.sectionTitle}
        sectionSubtitle={coeBioinformaticsData.course.sectionSubtitle}
        imageSrc={coeBioinformaticsData.course.imageSrc}
        imageAlt={coeBioinformaticsData.course.imageAlt}
        badgeText={coeBioinformaticsData.course.badgeText}
        courseTitle={coeBioinformaticsData.course.courseTitle}
        courseDescription={coeBioinformaticsData.course.courseDescription}
        duration={coeBioinformaticsData.course.duration}
        price={coeBioinformaticsData.course.price}
        eligibility={coeBioinformaticsData.course.eligibility}
        startDate={coeBioinformaticsData.course.startDate}
        venue={coeBioinformaticsData.course.venue}
        highlights={coeBioinformaticsData.course.highlights}
        syllabusLink={coeBioinformaticsData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Our Facilities"
        facilities={coeBioinformaticsData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={coeBioinformaticsData.talks}
      />
      <MediaCoverage
        sectionTitle="News & Highlights"
        sectionSubtitle="Latest updates from COE Bioinformatics"
        mediaItems={coeBioinformaticsData.mediaItems}
      />
    </div>
  );
};

export default CoeBioinformatics;
