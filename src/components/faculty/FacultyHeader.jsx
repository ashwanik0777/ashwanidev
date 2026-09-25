import React from 'react';
import { Mail, Phone, Download, ExternalLink, MapPin } from 'lucide-react';
import { resolveFacultyImage } from '../../utils/imageUtils';


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
  const profileImage = resolveFacultyImage(faculty?.image_url, faculty?.image, faculty?.name, faculty?.email);


  return (
    <Card className="p-8 my-8 shadow-lg mx-auto w-5/6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col p-5 lg:flex-row gap-8">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
            <img
              src={profileImage}
              alt={faculty?.name || 'Faculty'}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {faculty?.name || 'Dr. Faculty Name'}
            </h1>
            <p className="text-xl text-blue-600 font-semibold mb-4">
              {faculty?.designation || 'Designation'}
            </p>

            {/* Tags */}
            {faculty?.tags && (
              <div className="flex flex-wrap gap-2 mb-6">
                {faculty.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Specialization */}
            <div className="flex items-center gap-3 text-gray-600 mb-4">
              <span className="font-medium">
                {faculty?.specialization || 'Specialization Area'}
              </span>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>{faculty?.phone || 'Phone Number'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <a
                  href={`mailto:${faculty?.email || '#'}`}
                  className="text-blue-600 hover:underline"
                >
                  {faculty?.email || 'email@example.com'}
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-5 h-5" />
                <span>{faculty?.office || 'Office Address'}</span>
              </div>
            </div>

            {/* Action Buttons — always visible! */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() =>
                  window.open(faculty?.cv || '#', '_blank')
                }
              >
                <Download className="w-4 h-4 mr-2" />
                Download CV
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(faculty?.googleScholar || '#', '_blank')
                }
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Google Scholar
              </Button>

              <Button
                variant="outline"
                onClick={() =>
                  window.open(faculty?.orcid || '#', '_blank')
                }
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                ORCID Profile
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {(() => {
          const expVal = Array.isArray(faculty?.experience) ? faculty.experience.length : (Number(faculty?.experienceYears) || Number(faculty?.experience) || 0);
          const pubVal = Array.isArray(faculty?.publications) ? faculty.publications.length : (Number(faculty?.publicationsCount) || Number(faculty?.publications) || 0);
          const talksVal = Array.isArray(faculty?.talks) ? faculty.talks.length : (Number(faculty?.talks) || 0);
          const projVal = Array.isArray(faculty?.projects) ? faculty.projects.length : (Number(faculty?.projects) || 0);
          const stats = [
            expVal > 0 && { value: expVal, label: 'Years Experience', from: 'from-green-50', to: 'to-green-100', border: 'border-green-200', text: 'text-green-600', sub: 'text-green-700' },
            pubVal > 0 && { value: pubVal, label: 'Publications', from: 'from-blue-50', to: 'to-blue-100', border: 'border-blue-200', text: 'text-blue-600', sub: 'text-blue-700' },
            talksVal > 0 && { value: talksVal, label: 'Talks Delivered', from: 'from-purple-50', to: 'to-purple-100', border: 'border-purple-200', text: 'text-purple-600', sub: 'text-purple-700' },
            projVal > 0 && { value: projVal, label: 'Projects', from: 'from-orange-50', to: 'to-orange-100', border: 'border-orange-200', text: 'text-orange-600', sub: 'text-orange-700' },
          ].filter(Boolean);
          if (stats.length === 0) return null;
          return (
            <div className="flex-shrink-0">
              <div className={`grid gap-4 ${stats.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} lg:grid-cols-1`}>
                {stats.map((s) => (
                  <div key={s.label} className={`bg-gradient-to-br ${s.from} ${s.to} rounded-xl p-4 text-center border ${s.border} border-solid`}>
                    <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                    <div className={`text-sm ${s.sub}`}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </Card>
  );
};

export default FacultyHeader;

