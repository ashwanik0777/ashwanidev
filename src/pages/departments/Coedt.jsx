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
import { coeDroneData } from "../../Data/schools/SOICT/about/coeidrone-technologies";

const Coedt = () => {
  return (
    <div>
      <BannerSection 
        title={coeDroneData.hero.title}
        subtitle={coeDroneData.hero.subtitle}
        bgTheme={coeDroneData.hero.bgTheme}
/>
      <AboutSection
        sectionTitle="About Us"
        visionTitle={coeDroneData.about.visionTitle}
        visionDescription={coeDroneData.about.visionDescription}
        missionTitle={coeDroneData.about.missionTitle}
        missionPoints={coeDroneData.about.missionPoints}
        storyTitle={coeDroneData.about.storyTitle}
        storyText={coeDroneData.about.storyText}
        whatWeDoTitle={coeDroneData.about.whatWeDoTitle}
        whatWeDoText={coeDroneData.about.whatWeDoText}
        commitmentTitle={coeDroneData.about.commitmentTitle}
        commitmentText={coeDroneData.about.commitmentText}
        photos={coeDroneData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Mentors" mentors={coeDroneData.mentors} />

      <PartnersCarousel
        sectionTitle="Our Collaborators"
        sectionSubtitle="Strategic partners supporting our mission"
        partners={coeDroneData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Our Projects"
        subtitle="Innovative initiatives transforming ideas into reality"
        projects={coeDroneData.projects}
      />
      <DroneCourseCard
        sectionTitle={coeDroneData.course.sectionTitle}
        sectionSubtitle={coeDroneData.course.sectionSubtitle}
        imageSrc={coeDroneData.course.imageSrc}
        imageAlt={coeDroneData.course.imageAlt}
        badgeText={coeDroneData.course.badgeText}
        courseTitle={coeDroneData.course.courseTitle}
        courseDescription={coeDroneData.course.courseDescription}
        duration={coeDroneData.course.duration}
        price={coeDroneData.course.price}
        eligibility={coeDroneData.course.eligibility}
        startDate={coeDroneData.course.startDate}
        venue={coeDroneData.course.venue}
        highlights={coeDroneData.course.highlights}
        syllabusLink={coeDroneData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Facilities Offered"
        facilities={coeDroneData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={coeDroneData.talks}
      />
      <MediaCoverage
        sectionTitle="Media Coverage"
        sectionSubtitle="Explore how our work is making headlines"
        mediaItems={coeDroneData.mediaItems}
      />
    </div>
  );
};

export default Coedt;
