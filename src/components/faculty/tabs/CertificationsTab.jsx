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
    solid: 'bg-blue-600 text-black border-transparent',
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
import { asText, matchKey, pickArray, pickText } from './fieldUtils';
import { facultySections, withValue } from './facultyTabData';
import StatTiles from './StatTiles';

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
  image: pickText(item, ['image', 'imageUrl', 'image_url', 'certificateImage']),
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
  const sections = facultySections(profile);
  const certifications = sections.certifications.map(normalizeCertification);
  const professionalDevelopment = sections.professionalDevelopment.map(normalizeProgram);

  const getLevelColor = (level) => matchKey(level, LEVEL_COLORS, 'bg-gray-100 text-gray-800');
  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');

  // Earliest certification year drives the "years of learning" tile. The editor
  // stores free text ("January 2025"), so pull the 4-digit year out of it.
  const certificationYears = certifications
    ?.map((cert) => Number(String(cert.year).match(/\d{4}/)?.[0] || 0))
    .filter((year) => year > 1900);
  const learningYears = certificationYears.length
    ? new Date().getFullYear() - Math.min(...certificationYears)
    : 0;

  // Counts with nothing in them are left out.
  const stats = withValue([
    { label: 'Total Certifications', value: certifications.length, tone: 'blue' },
    { label: 'Training Programs', value: professionalDevelopment.length, tone: 'green' },
    {
      label: 'Professional Level',
      value: certifications.filter((cert) => asText(cert.level).toLowerCase() === 'professional').length,
      tone: 'purple',
    },
    { label: 'Years of Learning', value: learningYears > 0 ? `${learningYears}+` : '', tone: 'orange' },
  ]);

  return (
    <div className="space-y-6">
      {/* Certifications Overview */}
      {stats.length > 0 && (
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center">
              <Award className="w-6 h-6 mr-2 text-blue-600" />
              Professional Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <StatTiles stats={stats} />
          </CardContent>
        </Card>
      )}

      {/* Certification Details */}
      {certifications.length > 0 && (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Certification Portfolio</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {certifications?.map((cert, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* Left Information Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex gap-4">
                        <div className="bg-blue-50 text-blue-600 p-3 rounded-xl mt-1 shrink-0 border border-blue-100">
                          <Award className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1.5">{cert.title}</h3>
                          {cert.platform && <p className="text-blue-700 font-semibold text-sm">{cert.platform}</p>}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 shrink-0 ml-4 items-end">
                        {cert.level && (
                          <Badge className={`${getLevelColor(cert.level)} px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider`}>
                            {cert.level}
                          </Badge>
                        )}
                        {cert.verified && (
                          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" /> Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {(cert.year || cert.validUntil || cert.credentialId) && (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-gray-50/80 p-5 rounded-xl border border-gray-100 mb-6">
                        {cert.year && (
                          <div>
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">Issue Date</p>
                            <p className="text-gray-900 font-semibold flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {cert.year}
                            </p>
                          </div>
                        )}
                        {cert.validUntil && (
                          <div>
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">Valid Until</p>
                            <p className="text-gray-900 font-semibold">{cert.validUntil}</p>
                          </div>
                        )}
                        {cert.credentialId && (
                          <div className="sm:col-span-2">
                            <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1.5">Credential ID</p>
                            <p className="text-gray-800 font-mono text-sm bg-white border border-gray-200 px-2.5 py-1 rounded-md inline-block break-all">
                              {cert.credentialId}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {cert.skills?.length > 0 && (
                      <div className="mb-6">
                        <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-3">Skills Earned</p>
                        <div className="flex flex-wrap gap-2">
                          {cert.skills.map((skill, idx) => (
                            <span key={idx} className="bg-indigo-50/50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {cert.credentialUrl && (
                      <div className="mt-auto pt-2">
                        <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 font-semibold">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Verify Credential
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Image Area */}
                  {cert.image && (
                    <div className="lg:w-[320px] shrink-0 self-start">
                      <div className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-3">Certificate File</div>
                      <a href={cert.image} target="_blank" rel="noopener noreferrer" className="block relative group rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white transition-all hover:shadow-md hover:border-blue-300">
                        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <span className="text-white font-semibold text-sm bg-blue-900/80 px-4 py-2 rounded-xl flex items-center gap-2 shadow-xl">
                            <ExternalLink className="w-4 h-4" /> View Full Image
                          </span>
                        </div>
                        <img
                          src={cert.image}
                          alt={`${cert.title} Certificate`}
                          className="w-full aspect-[4/3] object-cover"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Professional Development */}
      {professionalDevelopment.length > 0 && (
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
                    {activity.organizer && <p className="text-blue-600 text-sm mb-2">{activity.organizer}</p>}
                    {activity.duration && (
                      <p className="text-xs text-gray-600">Duration: {activity.duration}</p>
                    )}
                    {activity.description && (
                      <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 empty:hidden">
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
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
};
