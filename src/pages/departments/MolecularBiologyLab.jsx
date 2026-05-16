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
import { molecularBiologyLabData } from "../../Data/schools/SOBT/about/molecular-biology-lab";

const MolecularBiologyLab = () => {
  return (
    <div>
      <BannerSection
        title={molecularBiologyLabData.hero.title}
        subtitle={molecularBiologyLabData.hero.subtitle}
        bgTheme={molecularBiologyLabData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={molecularBiologyLabData.about.visionTitle}
        visionDescription={molecularBiologyLabData.about.visionDescription}
        missionTitle={molecularBiologyLabData.about.missionTitle}
        missionPoints={molecularBiologyLabData.about.missionPoints}
        storyTitle={molecularBiologyLabData.about.storyTitle}
        storyText={molecularBiologyLabData.about.storyText}
        whatWeDoTitle={molecularBiologyLabData.about.whatWeDoTitle}
        whatWeDoText={molecularBiologyLabData.about.whatWeDoText}
        commitmentTitle={molecularBiologyLabData.about.commitmentTitle}
        commitmentText={molecularBiologyLabData.about.commitmentText}
        photos={molecularBiologyLabData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Team" mentors={molecularBiologyLabData.mentors} />

      <PartnersCarousel
        sectionTitle="Our Collaborators"
        sectionSubtitle="Research and industry partners supporting our mission"
        partners={molecularBiologyLabData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Research Projects"
        subtitle="Cutting-edge molecular biology research initiatives"
        projects={molecularBiologyLabData.projects}
      />
      <DroneCourseCard
        sectionTitle={molecularBiologyLabData.course.sectionTitle}
        sectionSubtitle={molecularBiologyLabData.course.sectionSubtitle}
        imageSrc={molecularBiologyLabData.course.imageSrc}
        imageAlt={molecularBiologyLabData.course.imageAlt}
        badgeText={molecularBiologyLabData.course.badgeText}
        courseTitle={molecularBiologyLabData.course.courseTitle}
        courseDescription={molecularBiologyLabData.course.courseDescription}
        duration={molecularBiologyLabData.course.duration}
        price={molecularBiologyLabData.course.price}
        eligibility={molecularBiologyLabData.course.eligibility}
        startDate={molecularBiologyLabData.course.startDate}
        venue={molecularBiologyLabData.course.venue}
        highlights={molecularBiologyLabData.course.highlights}
        syllabusLink={molecularBiologyLabData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Lab Facilities & Equipment"
        facilities={molecularBiologyLabData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={molecularBiologyLabData.talks}
      />
      <MediaCoverage
        sectionTitle="News & Highlights"
        sectionSubtitle="Latest updates from the Molecular Biology Lab"
        mediaItems={molecularBiologyLabData.mediaItems}
      />
    </div>
  );
};

export default MolecularBiologyLab;
