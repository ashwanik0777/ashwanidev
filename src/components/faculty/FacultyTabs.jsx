import React, { useEffect, useRef } from 'react';
import {
  User,
  GraduationCap,
  BookOpen,
  Settings,
  Beaker,
  Users,
  FileText,
  Badge,
  Mic,
  Trophy,
  Heart,
} from 'lucide-react';

// Simple `cn` helper if you're not using a library
const cn = (...classes) => classes.filter(Boolean).join(' ');

const TAB_ICONS = {
  overview: User,
  qualifications: GraduationCap,
  certifications: Badge,
  teaching: BookOpen,
  administration: Settings,
  'research-projects': Beaker,
  'research-group': Users,
  publications: FileText,
  patents: FileText,
  talks: Mic,
  awards: Trophy,
  'social-impact': Heart,
  other: Heart,
};

export const DEFAULT_FACULTY_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'qualifications', label: 'Qualifications' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'administration', label: 'Administration' },
  { id: 'research-projects', label: 'Research Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'talks', label: 'Invited Talks' },
  { id: 'awards', label: 'Awards' },
  { id: 'other', label: 'Other' },
];

const FacultyTabs = ({ tabItems = DEFAULT_FACULTY_TABS, activeTab, onTabChange }) => {
  const tabStripRef = useRef(null);
  const activeTabRef = useRef(null);

  // Keep the selected tab visible when the strip scrolls horizontally — e.g.
  // after the browser back button restores a tab that is off-screen.
  useEffect(() => {
    const strip = tabStripRef.current;
    const button = activeTabRef.current;
    if (!strip || !button) return;

    const buttonLeft = button.offsetLeft;
    const buttonRight = buttonLeft + button.offsetWidth;
    if (buttonLeft < strip.scrollLeft || buttonRight > strip.scrollLeft + strip.clientWidth) {
      strip.scrollTo({ left: buttonLeft - 16, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="sticky w-5/6 mx-auto top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-gray-200 border-solid mb-8">
      <div className="overflow-x-auto" ref={tabStripRef}>
        <div className="flex space-x-1 min-w-max p-2">
          {tabItems.map((tab) => {
            const Icon = TAB_ICONS[tab.id] || User;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                ref={isActive ? activeTabRef : null}
                onClick={() => onTabChange(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'flex items-center space-x-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:scale-102',
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FacultyTabs;
