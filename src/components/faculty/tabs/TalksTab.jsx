
import React from 'react';
// Minimal UI components with Tailwind CSS, matching usage and effects

 export const Card = ({ className = "", children, ...props }) => (
   <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm${className}`} {...props}>
     {children}
   </div>
 );
 
 export const CardHeader = ({ className = "", children, ...props }) => (
   <div className={`px-6 pt-6 pb-2  `} {...props}>
     {children}
   </div>
 );
 
 export const CardTitle = ({ className = "", children, ...props }) => (
   <h2 className={`font-bold ${className}`} {...props}>
     {children}
   </h2>
 );
 
 export const CardContent = ({ className = "", children, ...props }) => (
   <div className={`px-6 py-4 ${className}`} {...props}>
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
  role: pickText(item, ['role']),
  audience: pickText(item, ['audience']),
  type: asText(pickText(item, ['type'], 'invited')).toLowerCase(),
  slidesUrl: pickText(item, ['slidesUrl', 'slides']),
  recordingUrl: pickText(item, ['recordingUrl', 'recording', 'videoUrl']),
});

export const TalksTab = ({ profile }) => {
  const tabData = profile?.tabData?.talks || {};
  const invitedTalks = asArray(tabData.invitedTalks).map(normalizeTalk);

  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');
  const formatType = (type) => matchKey(type, TYPE_LABELS, asText(type, 'Talk'));

  const keynoteCount = invitedTalks.filter((talk) => talk.type === 'keynote').length;
  const recordedCount = invitedTalks.filter((talk) => talk.recordingUrl).length;

  const talkYears = invitedTalks
    .map((talk) => Number(String(talk.date).match(/\d{4}/)?.[0] || 0))
    .filter((year) => year > 1900);
  const latestYear = talkYears.length ? Math.max(...talkYears) : '--';

  // Speaking expertise mirrors the faculty's own research areas/tags rather than
  // a hardcoded list.
  const expertiseTopics = [
    ...asArray(profile?.researchAreas).map((area) =>
      typeof area === 'string' ? area : pickText(area, ['title', 'name']),
    ),
    ...asArray(profile?.tags),
  ]
    .map((topic) => asText(topic))
    .filter(Boolean)
    .slice(0, 6);

  return (
    <div className="space-y-6 bg-gray-50">
      {/* Talks Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        
         <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Mic className="w-6 h-6 mr-2 text-blue-600" />
            Invited Talks & Presentations
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{invitedTalks.length}</div>
              <div className="text-sm text-blue-700">Total Talks</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">{keynoteCount}</div>
              <div className="text-sm text-purple-700">Keynote Speeches</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">{recordedCount}</div>
              <div className="text-sm text-green-700">Recorded Talks</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200 border-solid">
              <div className="text-2xl font-bold text-orange-600">{latestYear}</div>
              <div className="text-sm text-orange-700">Latest Year</div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {pickText(profile, ['name'], 'This faculty member')} delivers invited talks, keynotes and
            guest lectures, sharing research insights and their practical applications with academic
            and industry audiences.
          </p>
        </CardContent>
      </Card>

      {/* Talk Details */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Speaking Engagements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {invitedTalks.map((talk, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{talk.title}</h3>
                    {talk.description && (
                      <p className="text-gray-700 mb-4 leading-relaxed">{talk.description}</p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="space-y-2">
                        {talk.event && <p className="font-medium text-blue-600">{talk.event}</p>}
                        {talk.date && (
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {talk.date}
                          </p>
                        )}
                        {talk.venue && (
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {talk.venue}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        {talk.host && <p><span className="font-medium">Host:</span> {talk.host}</p>}
                        {talk.role && <p><span className="font-medium">Role:</span> {talk.role}</p>}
                        {talk.audience && (
                          <p className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {talk.audience}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      {talk.slidesUrl && (
                        <a href={talk.slidesUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Slides
                          </Button>
                        </a>
                      )}
                      {talk.recordingUrl && (
                        <a href={talk.recordingUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <Play className="w-4 h-4 mr-1" />
                            Watch Recording
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <Badge className={getTypeColor(talk.type)}>
                      {formatType(talk.type)}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            {invitedTalks.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No invited talks added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Speaking Topics */}
      {expertiseTopics.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Speaking Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {expertiseTopics.map((topic, index) => (
                <div
                  key={`${topic}-${index}`}
                  className={`rounded-lg p-4 border border-solid ${EXPERTISE_STYLES[index % EXPERTISE_STYLES.length]}`}
                >
                  <h3 className="font-semibold">{topic}</h3>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
