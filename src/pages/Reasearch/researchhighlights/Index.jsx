import React from "react";

import Publications from "./Publications";
import BannerSection from "../../../components/HeroBanner.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";

const Index = () => {
  return (
    <SearchableWrapper>
      <>
        <BannerSection
          title="Publications"
          bgTheme={4}
        />

        <Publications />
      </>
    </SearchableWrapper>
  );
};

export default Index;
