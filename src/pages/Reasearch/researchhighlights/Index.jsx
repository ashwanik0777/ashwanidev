import React from "react";

import Publications from "./Publications";
import BannerSection from "../../../components/HeroBanner.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";

const Index = () => {
  return (
    <SearchableWrapper>
      <>
        <BannerSection
          title="Research & Innovation at GBU"
          bgTheme={4}
        />

        <Publications />
      </>
    </SearchableWrapper>
  );
};

export default Index;
