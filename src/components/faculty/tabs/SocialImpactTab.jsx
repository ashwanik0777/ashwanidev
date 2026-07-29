
import React from 'react';
// Card Component
const Card = ({ className = '', children }) => (
  <div className={`rounded-xl bg-white border border-gray-200 border-solid shadow-sm${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 pt-6 pb-2 border-b border-gray-100 border-solid">{children}</div>
);

const CardTitle = ({ className = '', children }) => (
  <h2 className={`font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-4">{children}</div>
);

// Badge Component
const Badge = ({ className = '', children }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${className}`}>
    {children}
  </span>
);

// Button Component
const Button = ({ variant = "solid", size = "md", className = '', children, ...props }) => {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    solid: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 focus:ring-blue-500"
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base"
  };
  return (
    <button
      className={`${base} ${variants[variant] || ''} ${sizes[size] || ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
import { Heart, Users, Calendar, MapPin, TreePine, GraduationCap, Lightbulb, Camera } from 'lucide-react';
import { asArray, asText, matchKey, pickArray, pickText, displayOr } from './fieldUtils';

const TYPE_COLORS = {
  'community-outreach': 'bg-blue-100 text-blue-800',
  awareness: 'bg-orange-100 text-orange-800',
  environmental: 'bg-green-100 text-green-800',
  education: 'bg-purple-100 text-purple-800',
  healthcare: 'bg-red-100 text-red-800',
};

const TYPE_ICONS = {
  'community-outreach': Users,
  awareness: Lightbulb,
  environmental: TreePine,
  education: GraduationCap,
  healthcare: Heart,
};

// Bridges the dashboard's editor field names to what this tab renders.
const normalizeActivity = (item) => ({
  title: pickText(item, ['title', 'name']),
  organization: pickText(item, ['organization', 'organisation']),
  description: pickText(item, ['description']),
  duration: pickText(item, ['duration']),
  location: pickText(item, ['location']),
  role: pickText(item, ['role']),
  beneficiaries: pickText(item, ['beneficiaries']),
  type: asText(pickText(item, ['type'])).toLowerCase(),
  impact: pickArray(item, ['impact', 'outcomes']),
  photosUrl: pickText(item, ['photosUrl', 'gallery']),
});

export const SocialImpactTab = ({ profile }) => {
  const tabData = profile?.tabData?.socialImpact || {};
  const socialActivities = asArray(tabData.socialActivities).map(normalizeActivity);

  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');
  const getTypeIcon = (type) => matchKey(type, TYPE_ICONS, Heart);

  const formatType = (type) => {
    const value = asText(type);
    if (!value) return 'Social Impact';
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const organisationCount = new Set(
    socialActivities.map((activity) => activity.organization).filter(Boolean),
  ).size;
  const focusAreaCount = new Set(
    socialActivities.map((activity) => activity.type).filter(Boolean),
  ).size;
  const impactPointCount = socialActivities.reduce(
    (sum, activity) => sum + activity.impact.length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Social Impact Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Heart className="w-6 h-6 mr-2 text-blue-600" />
            Social Impact & Community Service
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{socialActivities.length}</div>
              <div className="text-sm text-blue-700">Active Initiatives</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">{organisationCount}</div>
              <div className="text-sm text-green-700">Partner Organisations</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">{focusAreaCount}</div>
              <div className="text-sm text-purple-700">Focus Areas</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200 border-solid">
              <div className="text-2xl font-bold text-orange-600">{impactPointCount}</div>
              <div className="text-sm text-orange-700">Recorded Outcomes</div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {socialActivities.length > 0
              ? `${pickText(profile, ['name'], 'This faculty member')} contributes to community service and outreach through ${socialActivities.length} recorded initiative${socialActivities.length === 1 ? '' : 's'}.`
              : 'No social impact activities have been added to this profile yet.'}
          </p>
        </CardContent>
      </Card>

      {/* Social Activities */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Community Initiatives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {socialActivities.map((activity, index) => {
              const IconComponent = getTypeIcon(activity.type);
              return (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h3>
                          {activity.organization && (
                            <p className="text-blue-600 font-medium mb-2">{activity.organization}</p>
                          )}
                          {activity.description && (
                            <p className="text-gray-700 leading-relaxed mb-3">{activity.description}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div className="space-y-1">
                          <p className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span className="font-medium">Duration:</span>&nbsp;{displayOr(activity.duration)}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span className="font-medium">Location:</span>&nbsp;{displayOr(activity.location)}
                          </p>
                        </div>
                        <div className="space-y-1">
                          {activity.role && (
                            <p className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="font-medium">Role:</span>&nbsp;{activity.role}
                            </p>
                          )}
                          {activity.beneficiaries && (
                            <p className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              <span className="font-medium">Beneficiaries:</span>&nbsp;{activity.beneficiaries}
                            </p>
                          )}
                        </div>
                      </div>

                      {activity.impact.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-900 mb-2">Key Impact:</h4>
                          <ul className="space-y-1">
                            {activity.impact.map((impact, idx) => (
                              <li key={idx} className="text-sm text-gray-700 flex items-start">
                                <span className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                {impact}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {activity.photosUrl && (
                        <div className="flex gap-2">
                          <a href={activity.photosUrl} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm">
                              <Camera className="w-4 h-4 mr-1" />
                              View Photos
                            </Button>
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <Badge className={getTypeColor(activity.type)}>
                        {formatType(activity.type)}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
            {socialActivities.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No community initiatives added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
