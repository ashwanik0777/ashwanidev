import React from 'react';
// Minimal UI components with styles matching usage in this file
 export const Card = ({ className = "", children, ...props }) => (
   <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm${className}`} {...props}>
     {children}
   </div>
 );
 
 export const CardHeader = ({ className = "", children, ...props }) => (
   <div className={`px-6 pt-6 pb-2  border-solid${className}`} {...props}>
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

export const Badge = ({ className = '', variant = 'solid', children, ...props }) => {
  const base =
    'inline-flex items-center px-2 py-0.5 rounded-full font-medium border text-xs';
  const variants = {
    solid: 'bg-blue-600 text-white border-transparent',
    outline: 'bg-white text-blue-700 border-blue-200',
  };
  return (
    <span
      className={`${base} ${variants[variant] || ''} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export const Button = ({
  className = '',
  variant = 'outline',
  size = 'sm',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const variants = {
    outline:
      'border border-blue-200 bg-white text-blue-700 hover:bg-blue-50',
    solid:
      'bg-blue-600 text-white hover:bg-blue-700 border border-transparent',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
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
import { Award, Calendar, ExternalLink, CheckCircle } from 'lucide-react';
import { asArray, matchKey, pickArray, pickText, displayOr } from './fieldUtils';

const LEVEL_COLORS = {
  professional: 'bg-purple-100 text-purple-800',
  associate: 'bg-blue-100 text-blue-800',
  specialization: 'bg-green-100 text-green-800',
};

const TYPE_COLORS = {
  workshop: 'bg-orange-100 text-orange-800',
  fdp: 'bg-blue-100 text-blue-800',
  conference: 'bg-green-100 text-green-800',
};

// Bridges the dashboard's editor field names to what this tab renders.
const normalizeCertification = (item) => ({
  title: pickText(item, ['title', 'name']),
  platform: pickText(item, ['platform', 'issuingOrganization', 'organization', 'issuer']),
  year: pickText(item, ['year', 'issueDate', 'issuedOn']),
  validUntil: pickText(item, ['validUntil', 'expirationDate', 'expiryDate']),
  credentialId: pickText(item, ['credentialId', 'credential_id']),
  credentialUrl: pickText(item, ['credentialUrl', 'credential_url', 'url']),
  level: pickText(item, ['level']),
  skills: pickArray(item, ['skills', 'topics']),
  verified: Boolean(item?.verified),
});

const normalizeProgram = (item) => ({
  title: pickText(item, ['title', 'programName', 'name']),
  organizer: pickText(item, ['organizer', 'organisation', 'organization']),
  duration: pickText(item, ['duration']),
  type: pickText(item, ['type', 'category']),
  year: pickText(item, ['year']),
  description: pickText(item, ['description']),
});

export const CertificationsTab = ({ profile }) => {
  const tabData = profile?.tabData?.certifications || {};
  const certifications = asArray(tabData.certifications)?.map(normalizeCertification);
  const professionalDevelopment = asArray(tabData.professionalDevelopment)?.map(normalizeProgram);

  const getLevelColor = (level) => matchKey(level, LEVEL_COLORS, 'bg-gray-100 text-gray-800');
  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');

  // Earliest certification year drives the "years of learning" tile. The editor
  // stores free text ("January 2025"), so pull the 4-digit year out of it.
  const certificationYears = certifications
    ?.map((cert) => Number(String(cert.year).match(/\d{4}/)?.[0] || 0))
    .filter((year) => year > 1900);
  const yearsOfLearning = certificationYears.length
    ? `${new Date().getFullYear() - Math.min(...certificationYears)}+`
    : '--';

  return (
    <div className="space-y-6">
      {/* Certifications Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Award className="w-6 h-6 mr-2 text-blue-600" />
            Professional Certifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{certifications.length}</div>
              <div className="text-sm text-blue-700">Total Certifications</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">
                {certifications.filter(c => c.verified).length}
              </div>
              <div className="text-sm text-green-700">Verified</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">
                {certifications.filter(c => c.level === 'Professional').length}
              </div>
              <div className="text-sm text-purple-700">Professional Level</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200 border-solid">
              <div className="text-2xl font-bold text-orange-600">{yearsOfLearning}</div>
              <div className="text-sm text-orange-700">Years of Learning</div>
            </div>
          </div>
          
          <p className="text-gray-700 leading-relaxed">
            {pickText(profile, ['name'], 'This faculty member')} maintains current professional
            certifications and takes part in faculty development programs, keeping their teaching
            and research aligned with the latest advances and industry best practices.
          </p>
        </CardContent>
      </Card>

      {/* Certification Details */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Certification Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="bg-blue-600 text-white p-2 rounded-lg">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{cert.title}</h3>
                        <p className="text-blue-600 font-medium">{cert.platform}</p>
                      </div>
                      {cert.verified && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div>
                        <p className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="font-medium">Obtained:</span> {displayOr(cert.year)}
                        </p>
                        <p><span className="font-medium">Valid Until:</span> {displayOr(cert.validUntil)}</p>
                      </div>
                      <div>
                        <p><span className="font-medium">Credential ID:</span> {displayOr(cert.credentialId)}</p>
                        <p><span className="font-medium">Level:</span> {displayOr(cert.level)}</p>
                      </div>
                    </div>

                    {cert.skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Skills Covered:</h4>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills?.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <div className="flex gap-2">
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View Credential
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-start lg:items-end gap-2">
                    {cert.level && (
                      <Badge className={getLevelColor(cert.level)}>
                        {cert.level}
                      </Badge>
                    )}
                    {cert.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {certifications.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No certifications added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Professional Development */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Professional Development</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {professionalDevelopment?.map((activity, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{activity.title}</h3>
                    <p className="text-blue-600 text-sm mb-2">{activity.organizer}</p>
                    {activity.duration && (
                      <p className="text-xs text-gray-600">Duration: {activity.duration}</p>
                    )}
                    {activity.description && (
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.type && (
                      <Badge className={getTypeColor(activity.type)}>
                        {activity.type}
                      </Badge>
                    )}
                    {activity.year && (
                      <span className="text-sm text-gray-600 flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activity.year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {professionalDevelopment.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No professional development programs added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
