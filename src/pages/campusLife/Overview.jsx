import React from 'react';
import CampusHero from './CampusHero';
import CampusStats from './CampusStats';
import LifeAtCampus from './LifeAtCampus';
import HostelDining from "./HostelDining";
import VirtualTour from "./VirtualTour";
import Header from "./Header";
import ClubsCouncils from './ClubsCouncils';
import Library from './Library';
import SportsCultural from "./SportsCultural";
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const Overview = () => {
  return (
    <SearchableWrapper>
   <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* <Header /> */}
      <main className="relative">
      <CampusHero />
      <VirtualTour/>
      <CampusStats />
      <LifeAtCampus />
      <HostelDining/>
      <Library/>
      <SportsCultural/>
      </main>
    </div>
    </SearchableWrapper>
  );
};

export default Overview;
