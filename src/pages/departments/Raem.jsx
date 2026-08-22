import React from "react";
import AboutRAEM from "../../components/departments/raem/AboutRAEM";
import FunctionalAreasSwiper from "../../components/departments/raem/FunctionalAreasSwiper";
import CoursesOffered from "../../components/departments/raem/CourseOffered";
import EventGallery from "../../components/departments/raem/EventGallery";
import BannerSection from "../../components/HeroBanner";
import { coeRaemData } from "../../Data/schools/SOICT/about/coeiraem";

const Raem = () => {
  return (
    <div>
      <BannerSection
        title={coeRaemData.hero.title}
        subtitle={coeRaemData.hero.subtitle}
        bgTheme={coeRaemData.hero.bgTheme}
      />
      <AboutRAEM
        visionText={coeRaemData.about.visionText}
        missionPoints={coeRaemData.about.missionPoints}
        sections={coeRaemData.about.sections}
        photos={coeRaemData.about.photos} />
      <FunctionalAreasSwiper
        title="Key Functional Areas"
        functionalAreas={coeRaemData.functionalAreas}
      />
      <CoursesOffered
        title="Courses Offered"
        description="Explore our specialized Certificate, Diploma & Degree programs tailored for industry professionals."
        courses={coeRaemData.courses}
      />
      <EventGallery
        title="Our Events"
        subtitle="See highlights from our workshops & training"
        events={coeRaemData.events}
      />
    </div>
  );
};

export default Raem;
