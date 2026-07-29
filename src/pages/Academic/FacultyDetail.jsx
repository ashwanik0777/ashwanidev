import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SimpleLayout from '../../components/faculty/SimpleLayout';
import FacultyHeader from '../../components/faculty/FacultyHeader';
import SummaryDashboard from '../../components/faculty/SummaryDashboard';
import FacultyTabs from '../../components/faculty/FacultyTabs';
import TabContent from '../../components/faculty/TabContent';
import { TrendingUp, BookOpenCheck, Presentation, FolderOpen, FileText, FlaskConical, GraduationCap, Newspaper } from 'lucide-react';
import { fetchFacultyPublicProfile } from '../../services/facultyDashboardService';

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

const TAB_IDS = TAB_ITEMS.map((tab) => tab.id);

const FacultyDetail = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  /* The active tab lives in the URL (?tab=teaching) so the browser back button
     steps through tabs instead of leaving the profile entirely, and so a tab can
     be linked to or reloaded directly. */
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const activeTab = useMemo(
    () => (TAB_IDS.includes(requestedTab) ? requestedTab : 'overview'),
    [requestedTab],
  );

  const handleTabChange = useCallback(
    (tabId) => {
      if (tabId === activeTab) return;
      const next = new URLSearchParams(searchParams);
      if (tabId === 'overview') next.delete('tab');
      else next.set('tab', tabId);
      // Push (not replace) so each tab becomes its own history entry.
      setSearchParams(next);
    },
    [activeTab, searchParams, setSearchParams],
  );

  const normalizeFacultyProfile = (member) => ({
    ...member,
    image_url: member.image_url,
    // Used by FacultyHeader stats
    experience: `${member.experience_years || 0} years`,
    // Used by OverviewTab
    shortBio: member.shortBio || member.bio || 'Faculty profile is available.',
    fullBio: member.fullBio || member.bio || 'Faculty profile details are available.',
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
        } else {
          setFaculty(null); // Explicitly handle null if not found
        }
      } catch (backendErr) {
        console.warn('Backend fetch failed:', backendErr?.response?.status);
        setFaculty(null);
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

  const summaryStats = [
    {
      icon: TrendingUp,
      value: Array.isArray(faculty?.experience) ? faculty.experience.length : (faculty?.experienceYears || faculty?.experience || '--'),
      label: 'Experience',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: BookOpenCheck,
      value: `${Array.isArray(faculty?.publications) ? faculty.publications.length : (faculty?.publicationsCount || faculty?.publications || 0)}+`,
      label: 'Publications',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Presentation,
      value: Array.isArray(faculty?.talks) ? faculty.talks.length : (faculty?.talks || '--'),
      label: 'Talks Delivered',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: FolderOpen,
      value: Array.isArray(faculty?.projects) ? faculty.projects.length : (faculty?.projects || '--'),
      label: 'Projects',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <SearchableWrapper>
      <SimpleLayout>
        <FacultyHeader faculty={faculty} />
        <FacultyTabs tabItems={TAB_ITEMS} activeTab={activeTab} onTabChange={handleTabChange} />
        <TabContent activeTab={activeTab} profile={faculty} />
      </SimpleLayout>
    </SearchableWrapper>
  );
};

export default FacultyDetail;
