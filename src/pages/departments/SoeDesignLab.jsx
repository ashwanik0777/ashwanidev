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
import { engineeringDesignLabData } from "../../Data/schools/SOE/about/engineering-design-lab";

const SoeDesignLab = () => {
  return (
    <div>
      <BannerSection
        title={engineeringDesignLabData.hero.title}
        subtitle={engineeringDesignLabData.hero.subtitle}
        bgTheme={engineeringDesignLabData.hero.bgTheme}
      />

      <AboutSection
        sectionTitle="About Us"
        visionTitle={engineeringDesignLabData.about.visionTitle}
        visionDescription={engineeringDesignLabData.about.visionDescription}
        missionTitle={engineeringDesignLabData.about.missionTitle}
        missionPoints={engineeringDesignLabData.about.missionPoints}
        storyTitle={engineeringDesignLabData.about.storyTitle}
        storyText={engineeringDesignLabData.about.storyText}
        whatWeDoTitle={engineeringDesignLabData.about.whatWeDoTitle}
        whatWeDoText={engineeringDesignLabData.about.whatWeDoText}
        commitmentTitle={engineeringDesignLabData.about.commitmentTitle}
        commitmentText={engineeringDesignLabData.about.commitmentText}
        photos={engineeringDesignLabData.about.photos}
      />

      <Mentors sectionTitle="Meet Our Team" mentors={engineeringDesignLabData.mentors} />

      <PartnersCarousel
        sectionTitle="Our Partners"
        sectionSubtitle="Industry and software partners enabling our design capabilities"
        partners={engineeringDesignLabData.partners}
        interval={5000}
      />
      <ProjectsSection
        title="Design Projects"
        subtitle="Student-driven innovation projects from concept to prototype"
        projects={engineeringDesignLabData.projects}
      />
      <DroneCourseCard
        sectionTitle={engineeringDesignLabData.course.sectionTitle}
        sectionSubtitle={engineeringDesignLabData.course.sectionSubtitle}
        imageSrc={engineeringDesignLabData.course.imageSrc}
        imageAlt={engineeringDesignLabData.course.imageAlt}
        badgeText={engineeringDesignLabData.course.badgeText}
        courseTitle={engineeringDesignLabData.course.courseTitle}
        courseDescription={engineeringDesignLabData.course.courseDescription}
        duration={engineeringDesignLabData.course.duration}
        price={engineeringDesignLabData.course.price}
        eligibility={engineeringDesignLabData.course.eligibility}
        startDate={engineeringDesignLabData.course.startDate}
        venue={engineeringDesignLabData.course.venue}
        highlights={engineeringDesignLabData.course.highlights}
        syllabusLink={engineeringDesignLabData.course.syllabusLink}
      />

      <FacilitiesSwiper
        sectionTitle="Lab Facilities & Equipment"
        facilities={engineeringDesignLabData.facilities}
      />
      <RecentTalks
        sectionTitle="Recent Talks and Sessions"
        talks={engineeringDesignLabData.talks}
      />
      <MediaCoverage
        sectionTitle="News & Highlights"
        sectionSubtitle="Latest updates from the Engineering Design Lab"
        mediaItems={engineeringDesignLabData.mediaItems}
      />
    </div>
  );
};

export default SoeDesignLab;
