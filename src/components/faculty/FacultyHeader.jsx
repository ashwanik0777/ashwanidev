import React from 'react';
import { Mail, Phone, Download, ExternalLink, MapPin } from 'lucide-react';
import { resolveFacultyImage } from '../../utils/imageUtils';
import { calculateExperienceMonths, formatExperience } from '../../utils/facultyExperience';
import { facultySections } from './tabs/facultyTabData';
import { profileLink } from '../../utils/profileLinks';


// Reusable Card component
const Card = ({ className = '', children, ...props }) => (
  <div
    className={`rounded-2xl border border-gray-200 border-solid bg-white ${className}`}
    {...props}
  >
    {children}
  </div>
);

// Reusable Badge component
const Badge = ({ className = '', children, ...props }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}
    {...props}
  >
    {children}
  </span>
);

// Reusable Button component
const Button = ({ className = '', variant = 'solid', children, ...props }) => {
  const base =
    'inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  let styles = '';
  if (variant === 'outline') {
    styles = 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300';
  } else {
    styles = 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
  }

  return (
    <button className={`${base} ${styles} ${className}`} {...props}>
      {children}
    </button>
  );
};

const FacultyHeader = ({ faculty }) => {
  const profileImage = resolveFacultyImage(faculty?.image_url, faculty?.image, faculty?.name, faculty?.email, faculty?.id);
  const text = (value) => String(value ?? '').trim();

  const contacts = [
    { key: 'phone', icon: Phone, text: text(faculty?.phone) },
    { key: 'email', icon: Mail, text: text(faculty?.email), href: text(faculty?.email) && `mailto:${text(faculty?.email)}` },
    { key: 'office', icon: MapPin, text: text(faculty?.office) },
  ].filter((item) => item.text);

  const links = [
    { key: 'cv', label: 'Download CV', url: text(faculty?.cv), icon: Download, variant: 'solid' },
    // Typed as "www.linkedin.com/...", a bare ORCID iD and so on; opened as-is these break.
    { key: 'scholar', label: 'Google Scholar', url: profileLink(faculty?.googleScholar, 'googleScholar'), icon: ExternalLink, variant: 'outline' },
    { key: 'orcid', label: 'ORCID Profile', url: profileLink(faculty?.orcid, 'orcid'), icon: ExternalLink, variant: 'outline' },
    { key: 'linkedin', label: 'LinkedIn', url: profileLink(faculty?.linkedin, 'linkedin'), icon: ExternalLink, variant: 'outline' },
  ].filter((item) => item.url);

  return (
    <div className="w-full max-w-7xl px-3 sm:px-6 lg:w-5/6 mx-auto my-4 sm:my-6 lg:my-8">
      <Card className="p-4 sm:p-6 lg:p-8 shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
          {/* Profile Image */}
          <div className="flex-shrink-0 flex justify-center lg:justify-start w-full sm:w-auto">
            {/* 3:4 portrait, the same frame the dashboards crop photos to, so nothing is cut off here */}
            <div className="w-40 h-52 sm:w-48 sm:h-64 rounded-2xl overflow-hidden shadow-md bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
              <img
                src={profileImage}
                alt={faculty?.name || 'Faculty'}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 min-w-0 w-full text-left">
            <div className="mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1.5 sm:mb-2 break-words">
                {faculty?.name || 'Dr. Faculty Name'}
              </h1>
              {faculty?.designation && (
                <p className="text-base sm:text-lg lg:text-xl text-blue-600 font-semibold mb-1">
                  {faculty.designation}
                </p>
              )}
              {faculty?.school && (
                <p className="text-sm sm:text-base text-gray-600 font-medium mb-3 sm:mb-4">
                  {faculty.school}
                </p>
              )}

              {/* Specialization */}
              {faculty?.specialization && (
                <div className="flex items-start gap-2 text-sm sm:text-base text-gray-600 mb-4 max-w-3xl">
                  <span className="font-medium leading-relaxed">{faculty.specialization}</span>
                </div>
              )}

              {/* Contact Info: only the details the faculty filled in */}
              {contacts.length > 0 && (
                <div className="space-y-2.5 sm:space-y-3 mb-5 sm:mb-6">
                  {contacts.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.key} className="flex items-center gap-2.5 sm:gap-3 text-sm sm:text-base text-gray-600 min-w-0">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-gray-500" />
                        {item.href ? (
                          <a href={item.href} className="text-blue-600 hover:underline break-all min-w-0">
                            {item.text}
                          </a>
                        ) : (
                          <span className="break-words min-w-0">{item.text}</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Profile links: only the ones with a link */}
              {links.length > 0 && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {links.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.key}
                        variant={item.variant}
                        onClick={() => window.open(item.url, '_blank', 'noopener')}
                        className="text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2"
                      >
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 shrink-0" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          {(() => {
            // Auto-count from tabData arrays as fallback
            const tabData = faculty?.tabData || {};
            const expMonths = calculateExperienceMonths(tabData?.qualifications?.experience);
            // Count only the entries that are filled in (the same rule the tabs use); a count
            // typed in directly is the fallback. Blank rows never add to these numbers.
            const sections = facultySections(faculty);
            const typedCount = (value) => (Array.isArray(value) ? 0 : Number(value) || 0);

            const pubVal = sections.publications.length || typedCount(faculty?.publicationsCount) || typedCount(faculty?.publications);
            const talksVal = sections.talks.length || typedCount(tabData?.talksCount);
            const projVal = sections.projects.length || typedCount(tabData?.projectsCount);
            const stats = [
              expMonths > 0 && { value: formatExperience(expMonths), label: 'Experience', from: 'from-green-50', to: 'to-green-100', border: 'border-green-200', text: 'text-green-600', sub: 'text-green-700' },
              pubVal > 0 && { value: pubVal, label: 'Publications', from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-200', text: 'text-blue-600', sub: 'text-blue-700' },
              talksVal > 0 && { value: talksVal, label: 'Talks Delivered', from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-200', text: 'text-purple-600', sub: 'text-purple-700' },
              projVal > 0 && { value: projVal, label: 'Projects', from: 'from-orange-50', to: 'to-orange-100', border: 'border-orange-200', text: 'text-orange-600', sub: 'text-orange-700' },
            ].filter(Boolean);
            if (stats.length === 0) return null;
            return (
              <div className="w-full lg:w-48 xl:w-56 flex-shrink-0">
                <div
                  className={`grid gap-2.5 sm:gap-3.5 ${
                    stats.length === 1
                      ? 'grid-cols-1'
                      : stats.length === 2
                      ? 'grid-cols-2 lg:grid-cols-1'
                      : stats.length === 3
                      ? 'grid-cols-3 lg:grid-cols-1'
                      : 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-1'
                  }`}
                >
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className={`bg-gradient-to-br ${s.from} ${s.to} rounded-xl p-2.5 sm:p-3.5 text-center border ${s.border} border-solid shadow-xs flex flex-col justify-center min-w-0`}
                    >
                      <div className={`text-base sm:text-xl lg:text-2xl font-bold ${s.text} leading-tight`}>{s.value}</div>
                      <div className={`text-[11px] sm:text-xs font-medium ${s.sub} mt-0.5 sm:mt-1 leading-tight`}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </Card>
    </div>
  );
};

export default FacultyHeader;

