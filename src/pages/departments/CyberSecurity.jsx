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
import { cyberSecurityLabData } from "../../Data/schools/SOICT/about/cyber-security-lab";

const CyberSecurity = () => {
  return (
    <div>
      <BannerSection
        title={cyberSecurityLabData.hero.title}
        subtitle={cyberSecurityLabData.hero.subtitle}
        bgTheme={cyberSecurityLabData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={cyberSecurityLabData.about.visionTitle}
        visionDescription={cyberSecurityLabData.about.visionDescription}
        missionTitle={cyberSecurityLabData.about.missionTitle}
        missionPoints={cyberSecurityLabData.about.missionPoints}
        storyTitle={cyberSecurityLabData.about.storyTitle}
        storyText={cyberSecurityLabData.about.storyText}
        whatWeDoTitle={cyberSecurityLabData.about.whatWeDoTitle}
        whatWeDoText={cyberSecurityLabData.about.whatWeDoText}
        commitmentTitle={cyberSecurityLabData.about.commitmentTitle}
        commitmentText={cyberSecurityLabData.about.commitmentText}
        photos={cyberSecurityLabData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Mentors" mentors={cyberSecurityLabData.mentors} />

      <PartnersCarousel
        sectionTitle="Our Collaborators"
        sectionSubtitle="Strategic partners supporting our mission"
        partners={cyberSecurityLabData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Our Projects"
        subtitle="Innovative initiatives transforming ideas into reality"
        projects={cyberSecurityLabData.projects}
      />
      <DroneCourseCard
        sectionTitle={cyberSecurityLabData.course.sectionTitle}
        sectionSubtitle={cyberSecurityLabData.course.sectionSubtitle}
        imageSrc={cyberSecurityLabData.course.imageSrc}
        imageAlt={cyberSecurityLabData.course.imageAlt}
        badgeText={cyberSecurityLabData.course.badgeText}
        courseTitle={cyberSecurityLabData.course.courseTitle}
        courseDescription={cyberSecurityLabData.course.courseDescription}
        duration={cyberSecurityLabData.course.duration}
        price={cyberSecurityLabData.course.price}
        eligibility={cyberSecurityLabData.course.eligibility}
        startDate={cyberSecurityLabData.course.startDate}
        venue={cyberSecurityLabData.course.venue}
        highlights={cyberSecurityLabData.course.highlights}
        syllabusLink={cyberSecurityLabData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Facilities Offered"
        facilities={cyberSecurityLabData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={cyberSecurityLabData.talks}
      />
      <MediaCoverage
        sectionTitle="Media Coverage"
        sectionSubtitle="Explore how our work is making headlines"
        mediaItems={cyberSecurityLabData.mediaItems}
      />
    </div>
  );
};

export default CyberSecurity;
