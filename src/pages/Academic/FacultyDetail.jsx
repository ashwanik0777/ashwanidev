import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SimpleLayout from '../../components/faculty/SimpleLayout';
import FacultyHeader from '../../components/faculty/FacultyHeader';
import FacultyTabs from '../../components/faculty/FacultyTabs';
import TabContent from '../../components/faculty/TabContent';
import { FileText, FlaskConical, GraduationCap, Newspaper } from 'lucide-react';
import { fetchFacultyPublicProfile } from '../../services/facultyDashboardService';
import { facultySections, TAB_HAS_DATA } from '../../components/faculty/tabs/facultyTabData';
import { calculateExperienceMonths, formatExperience } from '../../utils/facultyExperience';
import { getDevFallbackFaculty } from '../../Data/demoFacultyProfile';

import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const TAB_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'qualifications', label: 'Qualifications & Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'administration', label: 'Administration' },
  { id: 'research-projects', label: 'Research Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'talks', label: 'Invited Talks' },
  { id: 'awards', label: 'Awards' },
  { id: 'other', label: 'Other' },
];

const FacultyDetail = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Tabs with nothing filled in are left out, and the first tab that has data
     opens by default. */
  const visibleTabs = useMemo(() => {
    if (!faculty) return [];
    const sections = facultySections(faculty);
    return TAB_ITEMS.filter((tab) => TAB_HAS_DATA[tab.id]?.(sections));
  }, [faculty]);
  const defaultTab = visibleTabs[0]?.id;

  /* The active tab lives in the URL (?tab=teaching) so the browser back button
     steps through tabs instead of leaving the profile entirely, and so a tab can
     be linked to or reloaded directly. */
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const activeTab = useMemo(
    () => (visibleTabs.some((tab) => tab.id === requestedTab) ? requestedTab : defaultTab),
    [requestedTab, visibleTabs, defaultTab],
  );

  const handleTabChange = useCallback(
    (tabId) => {
      if (tabId === activeTab) return;
      const next = new URLSearchParams(searchParams);
      if (tabId === defaultTab) next.delete('tab');
      else next.set('tab', tabId);
      // Push (not replace) so each tab becomes its own history entry.
      setSearchParams(next);
    },
    [activeTab, defaultTab, searchParams, setSearchParams],
  );

  const normalizeFacultyProfile = (member) => ({
    ...member,
    image_url: member.image_url,
    experience: formatExperience(calculateExperienceMonths(member?.tabData?.qualifications?.experience)),
    // Used by OverviewTab; left empty when the faculty has not written a bio
    shortBio: member.shortBio || member.bio || '',
    fullBio: member.fullBio || member.bio || '',
    // Used by FacultyHeader & FacultyDetail stats (projects/talks counts)
    projects: member.tabData?.projectsCount !== undefined && member.tabData?.projectsCount !== null && member.tabData?.projectsCount !== ""
      ? Number(member.tabData.projectsCount)
      : (member.tabData?.researchProjects?.projects || member.tabData?.projects || member.projects || []),
    talks: member.tabData?.talksCount !== undefined && member.tabData?.talksCount !== null && member.tabData?.talksCount !== ""
      ? Number(member.tabData.talksCount)
      : (member.tabData?.talks?.invitedTalks || member.tabData?.invitedTalks || member.talks || []),
    // Used by OverviewTab quick links
    quickLinks: member.quickLinks || [
      { label: 'Curriculum Vitae', icon: FileText, color: 'blue' },
      { label: 'Research Profile', icon: FlaskConical, color: 'green' },
      { label: 'Teaching Profile', icon: GraduationCap, color: 'purple' },
      { label: 'Publications', icon: Newspaper, color: 'orange' }
    ]
  });

  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      try {
        const backendProfile = await fetchFacultyPublicProfile(id);
        if (backendProfile) {
          setFaculty(normalizeFacultyProfile(backendProfile));
        } else if (import.meta.env.DEV) {
          setFaculty(normalizeFacultyProfile(getDevFallbackFaculty(id)));
        } else {
          setFaculty(null); // Explicitly handle null if not found
        }
      } catch (backendErr) {
        console.warn('Backend fetch failed:', backendErr?.response?.status);
        if (import.meta.env.DEV) {
          setFaculty(normalizeFacultyProfile(getDevFallbackFaculty(id)));
        } else {
          setFaculty(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-3" />
          <p className="text-gray-500">Loading faculty profile...</p>
        </div>
      </div>
    );
  }

  if (!faculty) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Faculty profile not found.</p>
        </div>
      </div>
    );
  }

  return (
    <SearchableWrapper>
      <SimpleLayout>
        <FacultyHeader faculty={faculty} />
        {visibleTabs.length > 0 && (
          <>
            <FacultyTabs tabItems={visibleTabs} activeTab={activeTab} onTabChange={handleTabChange} />
            <TabContent activeTab={activeTab} profile={faculty} />
          </>
        )}
      </SimpleLayout>
    </SearchableWrapper>
  );
};

export default FacultyDetail;
