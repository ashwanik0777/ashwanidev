import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import SimpleLayout from '../../components/faculty/SimpleLayout';
import FacultyHeader from '../../components/faculty/FacultyHeader';
import SummaryDashboard from '../../components/faculty/SummaryDashboard';
import FacultyTabs from '../../components/faculty/FacultyTabs';
import TabContent from '../../components/faculty/TabContent';
import { TrendingUp, BookOpenCheck, Presentation, FolderOpen, FileText, FlaskConical, GraduationCap, Newspaper } from 'lucide-react';
import { fetchFacultyPublicProfile } from '../../services/facultyDashboardService';
import { hasContent } from '../../components/faculty/tabs/fieldUtils';

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

/* The tabData sections each tab renders. A tab is hidden only when every one of
   its sections is completely empty; Overview has no entry and always shows. */
const TAB_SECTIONS = {
  qualifications: ['qualifications'],
  certifications: ['certifications'],
  teaching: ['teaching'],
  administration: ['administration'],
  'research-projects': ['researchProjects', 'researchGroup'],
  publications: ['publications', 'patents'],
  talks: ['talks'],
  awards: ['awards', 'socialImpact'],
  other: ['other'],
};

const FacultyDetail = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);

  const visibleTabs = useMemo(
    () =>
      TAB_ITEMS.filter((tab) => {
        const sections = TAB_SECTIONS[tab.id];
        if (!sections) return true;
        return sections.some((key) => hasContent(faculty?.tabData?.[key]));
      }),
    [faculty],
  );

  /* The active tab lives in the URL (?tab=teaching) so the browser back button
     steps through tabs instead of leaving the profile entirely, and so a tab can
     be linked to or reloaded directly. */
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get('tab');
  const activeTab = useMemo(
    () => (visibleTabs.some((tab) => tab.id === requestedTab) ? requestedTab : 'overview'),
    [requestedTab, visibleTabs],
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

  const calcExperienceYears = (member) => {
    const expEntries = member?.tabData?.qualifications?.experience || [];
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;

    const parseExpDate = (val, defaultMonth = 1) => {
      if (!val) return { year: 0, month: defaultMonth };
      const s = String(val).trim();
      const lower = s.toLowerCase();
      if (lower === 'present' || lower === 'current') {
        return { year: currentYear, month: currentMonth };
      }
      const yMatch = s.match(/\b(19\d\d|20\d\d)\b/);
      const year = yMatch ? parseInt(yMatch[1], 10) : 0;
      let month = defaultMonth;
      const slashMatch = s.match(/\b(0?[1-9]|1[0-2])[\/\-](19\d\d|20\d\d)\b/);
      if (slashMatch) {
        month = parseInt(slashMatch[1], 10);
      } else {
        const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const mIdx = monthNames.findIndex(m => lower.includes(m));
        if (mIdx !== -1) month = mIdx + 1;
      }
      return { year, month };
    };

    let totalMonths = 0;
    expEntries.forEach(exp => {
      const from = parseExpDate(exp.from || exp.fromYear || '', 1);
      const to = parseExpDate(exp.to || exp.toYear || '', 1);
      if (from.year > 0 && to.year >= from.year) {
        const months = (to.year - from.year) * 12 + (to.month - from.month);
        if (months > 0) totalMonths += months;
      }
    });
    const rawYears = Math.round(totalMonths / 12);
    const years = (rawYears > 0 && rawYears <= 70) ? rawYears : 0;
    const fallbackExp = Number(member?.experience_years) || Number(member?.experienceYears) || 0;
    const safeFallback = (fallbackExp > 0 && fallbackExp <= 70) ? fallbackExp : 0;
    const finalYears = years || safeFallback;
    return finalYears > 0 ? `${finalYears} years` : '0 years';
  };

  const normalizeFacultyProfile = (member) => ({
    ...member,
    image_url: member.image_url,
    // Used by FacultyHeader stats
    experience: calcExperienceYears(member),
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
      value: faculty?.experience || '--',
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
        <FacultyTabs tabItems={visibleTabs}activeTab={activeTab} onTabChange={handleTabChange} />
        <TabContent activeTab={activeTab} profile={faculty} />
      </SimpleLayout>
    </SearchableWrapper>
  );
};

export default FacultyDetail;
