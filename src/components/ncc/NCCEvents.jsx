import React from 'react';
import NssNccNoticeBoard from '../campusLife/NssNccNoticeBoard';
import SearchableWrapper from '../Searchbar/SearchableWrapper';

const NCCEvents = ({ nccData }) => {
  const defaultEvents = [
    {
      id: 1,
      title: "Inauguration Ceremony - NCC Senior Wing (Boys & Girls)",
      date: "15 Oct 2025",
      type: "Celebration",
      venue: "Auditorium-5, Gautam Buddha University",
      description: "Official inauguration of NCC Senior Wing (Boys & Girls) under 37 UP Battalion NCC (Ghaziabad) & 31 UP Girls Battalion.",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
      links: ["https://photos.app.goo.gl/sampleNCC"]
    },
    {
      id: 2,
      title: "Combined Annual Training Camp (CATC)",
      date: "10 Nov 2025",
      type: "Camp",
      venue: "Battalion Training Ground",
      description: "10-day intensive training camp featuring weapon handling, obstacle training, map reading, and physical fitness.",
      links: ["https://drive.google.com/drive/folders/sampleNCC"]
    },
    {
      id: 3,
      title: "Thal Sainik Competition (TSC) Selection & Drills",
      date: "05 Dec 2025",
      type: "Competition",
      venue: "GBU Sports Complex Ground",
      description: "Cadet selections and firing practice for national level representation.",
      links: ["https://gbu.ac.in/ncc-rules.pdf"]
    },
    {
      id: 4,
      title: "Swachh Bharat & Tree Plantation Drive",
      date: "18 Jan 2026",
      type: "Training",
      venue: "GBU Campus Premises",
      description: "Environmental awareness and clean campus campaign by cadets.",
      links: ["https://youtu.be/sample"]
    },
  ];

  const finalEvents = nccData?.events || defaultEvents;

  return (
    <SearchableWrapper>
      <NssNccNoticeBoard 
        title="NCC Training & Events"
        events={finalEvents}
      />
    </SearchableWrapper>
  );
};

export default NCCEvents;
