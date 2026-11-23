import React, { useState } from 'react';
import { parseImageUrl } from '../../../utils/imageUtils';
// Minimal UI components with Tailwind CSS, matching usage and effects

 export const Card = ({ className = "", children, ...props }) => (
   <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm ${className}`} {...props}>
     {children}
   </div>
 );
 
 export const CardHeader = ({ className = "", children, ...props }) => (
   <div className={`px-4 sm:px-6 pt-5 sm:pt-6 pb-2 ${className}`} {...props}>
     {children}
   </div>
 );
 
 export const CardTitle = ({ className = "", children, ...props }) => (
   <h2 className={`font-bold ${className}`} {...props}>
     {children}
   </h2>
 );
 
 export const CardContent = ({ className = "", children, ...props }) => (
   <div className={`px-4 sm:px-6 py-4 ${className}`} {...props}>
     {children}
   </div>
 );

export const Badge = ({
  className = '',
  variant = 'solid',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium transition-colors';
  const variants = {
    solid: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-white',
  };
  return (
    <span className={`${base} ${variants[variant] || ''} ${className}`} {...props}>
      {children}
    </span>
  );
};

export const Button = ({
  className = '',
  variant = 'outline',
  size = 'md',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
  const variants = {
    outline:
      'border border-gray-300 bg-white text-gray-800 hover:bg-gray-50 active:bg-gray-100',
    solid:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800',
  };
  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant] || ''} ${sizes[size] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
import { Mic, Calendar, MapPin, Users, ExternalLink, Play } from 'lucide-react';
import { asArray, asText, matchKey, pickText } from './fieldUtils';
import { facultySections, withValue } from './facultyTabData';
import StatTiles from './StatTiles';

const TYPE_COLORS = {
  keynote: 'bg-purple-100 text-purple-800',
  invited: 'bg-blue-100 text-blue-800',
  'guest-lecture': 'bg-green-100 text-green-800',
  panel: 'bg-orange-100 text-orange-800',
};

const TYPE_LABELS = {
  keynote: 'Keynote',
  invited: 'Invited Talk',
  'guest-lecture': 'Guest Lecture',
  panel: 'Panel Discussion',
};

// Static classes only — Tailwind cannot see interpolated class names.
const EXPERTISE_STYLES = [
  'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 text-blue-900',
  'bg-gradient-to-br from-red-50 to-red-100 border-red-200 text-red-900',
  'bg-gradient-to-br from-green-50 to-green-100 border-green-200 text-green-900',
  'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 text-purple-900',
  'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 text-orange-900',
  'bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 text-indigo-900',
];

// Bridges the dashboard's editor field names to what this tab renders.
const normalizeTalk = (item) => ({
  title: pickText(item, ['title', 'topic']),
  description: pickText(item, ['description', 'summary']),
  event: pickText(item, ['event', 'eventName', 'conference']),
  date: pickText(item, ['date', 'year']),
  venue: pickText(item, ['venue', 'location']),
  host: pickText(item, ['host', 'organizer', 'organiser']),
  type: asText(pickText(item, ['type'], 'invited')).toLowerCase(),
  photos: asArray(item.photos).filter(Boolean),
});

export const TalksTab = ({ profile }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const invitedTalks = facultySections(profile).talks.map(normalizeTalk);

  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');
  const formatType = (type) => matchKey(type, TYPE_LABELS, asText(type, 'Talk'));

  const invitedCount = invitedTalks.filter((talk) => talk.type === 'invited').length;
  const keynoteCount = invitedTalks.filter((talk) => talk.type === 'keynote').length;
  const guestLectureCount = invitedTalks.filter((talk) => talk.type === 'guest-lecture').length;
  const panelCount = invitedTalks.filter((talk) => talk.type === 'panel').length;

  // Counts with nothing in them are left out.
  const stats = withValue([
    { label: 'Invited Talks', value: invitedCount, tone: 'blue' },
    { label: 'Keynote Speeches', value: keynoteCount, tone: 'purple' },
    { label: 'Guest Lectures', value: guestLectureCount, tone: 'green' },
    { label: 'Panel Discussions', value: panelCount, tone: 'orange' },
  ]);

  if (!invitedTalks.length) return null;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Talks Overview */}
      {stats.length > 0 && (
      <Card className="hover:shadow-lg transition-shadow duration-300">
         <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
            <Mic className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600 shrink-0" />
            Invited Talks & Presentations
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <StatTiles stats={stats} />
        </CardContent>
      </Card>
      )}

      {/* Talk Details */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl text-gray-900">Speaking Engagements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {invitedTalks?.map((talk, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 sm:p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    {talk.title && <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{talk.title}</h3>}
                    {talk.description && (
                      <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">{talk.description}</p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 empty:hidden">
                      <div className="space-y-2 empty:hidden">
                        {talk.event && <p className="font-medium text-blue-600">{talk.event}</p>}
                        {talk.date && (
                          <p className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {talk.date}
                          </p>
                        )}
                        {talk.venue && (
                          <p className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {talk.venue}
                          </p>
                        )}
                      </div>
                      {talk.host && (
                        <div className="space-y-2">
                          <p><span className="font-medium">Host:</span> {talk.host}</p>
                        </div>
                      )}
                    </div>

                    {talk.photos && talk.photos.length > 0 && (
                      <div className="flex flex-wrap gap-2.5 sm:gap-4 mt-3 sm:mt-4">
                        {talk.photos.map((photoUrl, pIdx) => (
                          <img
                            key={pIdx}
                            src={parseImageUrl(photoUrl)}
                            alt={`Talk photo ${pIdx + 1}`}
                            className="h-24 sm:h-32 w-auto object-cover rounded-md border border-gray-200 shadow-sm cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setSelectedPhoto(parseImageUrl(photoUrl))}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
                    <Badge className={getTypeColor(talk.type)}>
                      {formatType(talk.type)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Lightbox for viewing photos */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-full max-h-full">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-gray-300 flex items-center gap-1 font-medium"
              onClick={() => setSelectedPhoto(null)}
            >
              Close
            </button>
            <img 
              src={selectedPhoto} 
              alt="Full view" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};
