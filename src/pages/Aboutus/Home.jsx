import WelcomePage from "../../components/home/HeroBanner.jsx";
import QuickLinks from "../../components/home/Quicklink.jsx"
import AboutSection from "../../components/home/Aboutsection.jsx";
import Glance from "../../components/home/Glance.jsx";
import VisionaryLeadership from "../../components/home/Visionary.jsx";
import LatestUpdates from "../../components/home/Latest.jsx";
import DistinguishedVisitors from "../../components/home/DistinguishedVisitors.jsx";
import CampusGallery from "../../components/home/Gallery.jsx";
// import ExcellenceSection from "../../components/home/Education.jsx";
import CampusLifeSection from "../../components/home/Campus.jsx";
import HiringSection from "../../components/home/Placement.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import SocialSidebar from "../../components/home/SocialSidebar.jsx";
import RegulatorySlider from "../../components/home/RegulatorySlider.jsx";
import SocialFeed from "../../components/home/SocialFeed.jsx";

function Home() {
  return (
    <SearchableWrapper>
      <div className="min-h-screen flex flex-col">
        <SocialSidebar />
        <WelcomePage />
        <VisionaryLeadership />
        <AboutSection />
        <QuickLinks />
        <LatestUpdates />
        {/* After the news and notices: recent visits read as news; before the photo gallery */}
        <DistinguishedVisitors />
        <CampusGallery />
        {/* <ExcellenceSection /> */}
        <CampusLifeSection />

        <HiringSection />
        <RegulatorySlider />
        <SocialFeed />

      </div>
    </SearchableWrapper>
  );
}

export default Home;

