import React, { useState, useEffect } from 'react';
import NssNccNoticeBoard from '../campusLife/NssNccNoticeBoard';
import SearchableWrapper from '../Searchbar/SearchableWrapper';
import { NSS_OFFICIAL_GALLERY } from './nssGalleryData';

const NSSEvents = ({ nssData }) => {
  const [apiEvents, setApiEvents] = useState([]);

  useEffect(() => {
    const fetchApiEvents = async () => {
      try {
        const response = await fetch("https://nss.onlinegbu.com/api/events");
        const data = await response.json();
        if (data && Array.isArray(data.events)) {
          setApiEvents(data.events);
        }
      } catch (err) {
        console.error("Failed to fetch NSS API events:", err);
      }
    };
    fetchApiEvents();
  }, []);

  // Map static gallery data into the standard event format
  const staticGalleryEvents = NSS_OFFICIAL_GALLERY.map(item => ({
    id: item.id,
    title: item.title || item.event || "NSS Event",
    date: item.date 
      ? new Date(item.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
      : "Upcoming",
    type: item.category || "Event",
    image: item.images && item.images.length > 0 ? item.images[0].url : "",
    description: item.description || "",
    links: [] // Can add links if needed
  }));

  const formattedApiEvents = apiEvents.map(ev => {
    const extractedLinks = [ev.link, ev.galleryLink, ev.driveLink, ev.pdfUrl].filter(Boolean);

    return {
      id: ev._id || ev.id,
      title: ev.title || 'NSS Event',
      date: new Date(ev.date || ev.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      type: ev.category || 'Event',
      image: ev.image || ev.thumbnail || ev.galleryLink || ev.driveLink || '',
      description: ev.description || '',
      links: extractedLinks
    };
  });

  // Since the user explicitly requested to use the static gallery images for now,
  // we'll prioritize the staticGalleryEvents (or combine them)
  // Let's combine them so if API fetches something new, it also shows up.
  const finalEvents = [...formattedApiEvents, ...staticGalleryEvents];

  return (
    <SearchableWrapper>
      <NssNccNoticeBoard 
        title="NSS Activities & Events"
        events={finalEvents}
      />
    </SearchableWrapper>
  );
};

export default NSSEvents;
