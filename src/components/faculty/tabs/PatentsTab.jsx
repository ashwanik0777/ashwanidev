import React from 'react';
// Minimal custom Card, CardHeader, CardTitle, CardContent, Badge, and Button components with Tailwind CSS

export const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`px-6 pt-6 pb-2 border-b border-gray-100 border-solid${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h2 className={`font-semibold tracking-tight ${className}`} {...props}>
    {children}
  </h2>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`px-6 pb-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

export const Badge = ({ className = '', variant = 'solid', children, ...props }) => {
  const base = 'inline-flex items-center px-2 py-0.5 rounded-full font-medium text-xs border';
  const variants = {
    solid: 'bg-blue-600 text-white border-transparent',
    outline: 'bg-white text-blue-700 border-blue-200',
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
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
  const variants = {
    outline:
      'border border-blue-300 bg-white text-blue-700 hover:bg-blue-50 active:bg-blue-100',
    solid:
      'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
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
import { Award, Calendar, MapPin, FileText, ExternalLink } from 'lucide-react';
import { asArray, asText, matchKey, pickArray, pickNumber, pickText, displayOr } from './fieldUtils';

const STATUS_COLORS = {
  filed: 'bg-blue-100 text-blue-800',
  'under examination': 'bg-yellow-100 text-yellow-800',
  published: 'bg-green-100 text-green-800',
  granted: 'bg-purple-100 text-purple-800',
};

const normalizePatent = (item) => ({
  title: pickText(item, ['title', 'name']),
  description: pickText(item, ['description', 'abstract']),
  applicationNo: pickText(item, ['applicationNo', 'applicationNumber', 'application_no']),
  technicalField: pickText(item, ['technicalField', 'field']),
  applicationDate: pickText(item, ['applicationDate', 'filingDate', 'filedOn']),
  country: pickText(item, ['country'], 'India'),
  patentOffice: pickText(item, ['patentOffice', 'office']),
  filedYear: pickNumber(item, ['filedYear', 'year'], 0),
  status: pickText(item, ['status'], 'Filed'),
  inventors: pickArray(item, ['inventors', 'authors']),
  applicationUrl: pickText(item, ['applicationUrl', 'url', 'documentUrl']),
});

const countByStatus = (patents, status) =>
  patents.filter((patent) => asText(patent.status).toLowerCase() === status).length;

export const PatentsTab = ({ profile }) => {
  // Dashboard saves patents under publications.patents; read that first, legacy fallback to patents.patents
  const pubPatents = asArray(profile?.tabData?.publications?.patents);
  const legacyPatents = asArray(profile?.tabData?.patents?.patents);
  const patents = (pubPatents.length ? pubPatents : legacyPatents).map(normalizePatent);

  const getStatusColor = (status) => matchKey(status, STATUS_COLORS, 'bg-gray-100 text-gray-800');

  // Sort a copy — `.sort()` on the source array mutates state during render.
  const patentsByYear = [...patents].sort((a, b) => b.filedYear - a.filedYear);

  return (
    <div className="space-y-6">
      {/* Patents Overview */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Award className="w-6 h-6 mr-2 text-blue-600" />
            Patent Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{patents.length}</div>
              <div className="text-sm text-blue-700">Total Patents</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">
                {countByStatus(patents, 'filed')}
              </div>
              <div className="text-sm text-green-700">Filed</div>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 text-center border border-yellow-200 border-solid">
              <div className="text-2xl font-bold text-yellow-600">
                {countByStatus(patents, 'under examination')}
              </div>
              <div className="text-sm text-yellow-700">Under Review</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">
                {countByStatus(patents, 'published')}
              </div>
              <div className="text-sm text-purple-700">Published</div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            This patent portfolio reflects {pickText(profile, ['name'], 'the faculty member')}&apos;s work
            on translating research innovations into practical, real-world solutions.
          </p>
        </CardContent>
      </Card>

      {/* Patent Details */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Patent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {patents.map((patent, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{patent.title}</h3>
                    {patent.description && (
                      <p className="text-gray-700 mb-4 leading-relaxed">{patent.description}</p>
                    )}

                    <div className="grid sm:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Application No:</span> {displayOr(patent.applicationNo)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Technical Field:</span> {displayOr(patent.technicalField)}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span className="font-medium">Filed:</span> {displayOr(patent.applicationDate)}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="font-medium">Country:</span> {displayOr(patent.country)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Patent Office:</span> {displayOr(patent.patentOffice)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Year:</span> {patent.filedYear || '—'}
                        </p>
                      </div>
                    </div>

                    {patent.inventors.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Inventors:</h4>
                        <div className="flex flex-wrap gap-2">
                          {patent.inventors.map((inventor, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {inventor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {patent.applicationUrl && (
                      <div className="flex gap-2">
                        <a href={patent.applicationUrl} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-1" />
                            View Application
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <Badge className={getStatusColor(patent.status)}>
                      {patent.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            {patents.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">No patents added yet.</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Patent Timeline */}
      {patentsByYear.length > 0 && (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Patent Filing Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patentsByYear.map((patent, index) => (
              <div key={index} className="relative pl-8 pb-4 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-2"></div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{patent.title}</h3>
                      <p className="text-xs text-gray-600">{patent.applicationNo}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(patent.status)}>
                        {patent.status}
                      </Badge>
                      {patent.filedYear > 0 && (
                        <span className="text-xs text-gray-600">{patent.filedYear}</span>
                      )}
                    </div>
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
