
import React from 'react';
// Card, CardHeader, CardTitle, CardContent, and Badge components defined here for best UI/UX

// Card container with subtle shadow and rounded corners
const Card = ({ className = '', children }) => (
  <div className={`bg-white rounded-2xl shadow border border-gray-100 border-solid ${className}`}>{children}</div>
);

// CardHeader with padding and bottom border
 export const CardHeader = ({ className = "", children, ...props }) => (
   <div className={`px-4 sm:px-6 pt-5 sm:pt-6 pb-2 ${className}`} {...props}>
     {children}
   </div>
 );

// CardTitle with font styling
const CardTitle = ({ className = '', children }) => (
  <h2 className={`font-bold tracking-tight ${className}`}>{children}</h2>
);

// CardContent with padding
const CardContent = ({ children }) => (
  <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-3 sm:pt-4">{children}</div>
);

// Badge with pill shape, subtle shadow, and transition
const Badge = ({ className = '', children }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full font-semibold text-xs shadow-sm transition-colors duration-200 ${className}`}
  >
    {children}
  </span>
);
import { Calendar, MapPin, GraduationCap } from 'lucide-react';
import { asText, matchKey, pickArray } from './fieldUtils';
import { facultySections } from './facultyTabData';
import { calculateExperienceMonths, formatExperience, parseExperienceDate } from '../../../utils/facultyExperience';

const TYPE_COLORS = {
  doctorate: 'bg-purple-100 text-purple-800',
  masters: 'bg-blue-100 text-blue-800',
  bachelors: 'bg-green-100 text-green-800',
  academic: 'bg-indigo-100 text-indigo-800',
};

export const QualificationsTab = ({ profile }) => {
  const { qualifications, experience } = facultySections(profile);

  const getSortValue = (dateStr) => {
    const date = parseExperienceDate(dateStr);
    if (!date) return 0;
    if (date.present) return 999999;
    return date.year * 100 + (date.hasMonth ? date.month : 0);
  };

  const sortedQualifications = [...qualifications].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0;
    const yearB = parseInt(b.year, 10) || 0;
    return yearB - yearA;
  });

  const sortedExperience = [...experience].sort((a, b) => {
    const toA = getSortValue(a.to);
    const toB = getSortValue(b.to);
    if (toA !== toB) return toB - toA;
    const fromA = getSortValue(a.from);
    const fromB = getSortValue(b.from);
    return fromB - fromA;
  });

  const getTypeColor = (type) => matchKey(type, TYPE_COLORS, 'bg-gray-100 text-gray-800');

  // Display period from from/to fields, in any format parseExperienceDate understands
  const formatPeriod = (exp) => {
    const fromStr = asText(exp.from);
    const toStr = asText(exp.to);
    if (!fromStr) return '';

    const from = parseExperienceDate(fromStr);
    if (!from || from.present) return fromStr;

    const monthName = (m) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months[(m - 1)] || '';
    };

    const dateLabel = (date, fallback) => {
      if (!date) return fallback;
      if (date.present) return 'Present';
      return date.hasMonth ? `${monthName(date.month)} ${date.year}` : `${date.year}`;
    };

    const months = calculateExperienceMonths([exp]);
    const durationText = months > 0 ? ` (${formatExperience(months)})` : '';

    return `${dateLabel(from, fromStr)} - ${dateLabel(parseExperienceDate(toStr), toStr)}${durationText}`;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Educational Qualifications */}
      {qualifications.length > 0 && (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-gray-900 flex items-center">
            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-blue-600 shrink-0" />
            Educational Qualifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {sortedQualifications?.map((qual, index) => (
              <div key={index} className="relative pl-6 sm:pl-8 pb-5 sm:pb-6 border-l-2 border-blue-200 last:border-l-0 last:pb-0">
                <div className="absolute left-0 top-0 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-blue-600 rounded-full transform -translate-x-[7px] sm:-translate-x-2"></div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 sm:p-6 shadow-xs border border-gray-100 border-solid hover:shadow-sm transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      {qual.degree && <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">{qual.degree}</h3>}
                      {qual.institution && (
                        <p className="text-blue-600 font-medium text-sm sm:text-base mb-1">{qual.institution}</p>
                      )}
                      {qual.specialization && (
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{qual.specialization}</p>
                      )}
                      <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-500">
                        {qual.year && (
                          <div className="flex items-center">
                            <Calendar className="w-3.5 h-3.5 mr-1" />
                            {qual.year}
                          </div>
                        )}
                        {qual.location && (
                          <div className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            {qual.location}
                          </div>
                        )}
                      </div>
                    </div>
                    {asText(qual.type) && (
                      <Badge className={getTypeColor(qual.type)}>
                        {qual.type.charAt(0).toUpperCase() + qual.type.slice(1)}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl text-gray-900">Professional Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 sm:space-y-6">
            {sortedExperience?.map((exp, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 sm:p-6 border border-blue-100">
                <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4 ${pickArray(exp, ['responsibilities']).length > 0 ? 'mb-3 sm:mb-4' : ''}`}>
                  <div className="min-w-0 flex-1">
                    {exp.position && <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">{exp.position}</h3>}
                    {exp.department && (
                      <p className="text-blue-600 font-medium text-sm sm:text-base mb-1">{exp.department}</p>
                    )}
                    {exp.institution && <p className="text-sm sm:text-base text-gray-700">{exp.institution}</p>}
                  </div>
                  {(asText(exp.type) || formatPeriod(exp)) && (
                    <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2 shrink-0">
                      {asText(exp.type) && (
                        <Badge className={getTypeColor(exp.type)}>
                          {exp.type.charAt(0).toUpperCase() + exp.type.slice(1)}
                        </Badge>
                      )}
                      {formatPeriod(exp) && (
                        <span className="text-xs sm:text-sm text-gray-600 flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1" />
                          {formatPeriod(exp)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                {pickArray(exp, ['responsibilities']).length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {pickArray(exp, ['responsibilities'])?.map((responsibility, idx) => (
                        <li key={idx} className="text-xs sm:text-sm text-gray-700 flex items-start">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 mr-2.5 flex-shrink-0"></span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      )}
    </div>
  );
};
