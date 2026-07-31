
import React from 'react';
// Card, CardHeader, CardTitle, CardContent, and Badge components defined here for best UI/UX

const Card = ({ className = '', children }) => (
  <div className={`rounded-xl bg-white border border-gray-200 border-solid shadow-sm${className}`}>{children}</div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 pt-6 pb-2   bg-gradient-to-r from-gray-50 to-white rounded-t-xl${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`font-bold ${className}`}>{children}</h2>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 pt-4 ${className}`}>{children}</div>
);

const Badge = ({ children, className = '' }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${className}`}
  >
    {children}
  </span>
);
import { Calendar, MapPin, Settings, Users } from 'lucide-react';
import { asArray, asText, pickArray, pickText } from './fieldUtils';

// Bridges the dashboard's editor field names to what this tab renders.
const normalizeRole = (item) => ({
  role: pickText(item, ['role', 'title', 'position']),
  department: pickText(item, ['department', 'level', 'scope']),
  institution: pickText(item, ['institution', 'organization', 'organisation']),
  duration: pickText(item, ['duration', 'period']),
  status: pickText(item, ['status'], 'ongoing'),
  description: pickText(item, ['description']),
  responsibilities: pickArray(item, ['responsibilities', 'keyResponsibilities']),
});

const normalizeCommittee = (item) => ({
  name: pickText(item, ['name', 'title']),
  role: pickText(item, ['role', 'designation', 'position']),
  period: pickText(item, ['period', 'duration']),
  responsibility: pickText(item, ['responsibility', 'contribution', 'description']),
});

export const AdministrationTab = ({ profile }) => {
  const tabData = profile?.tabData?.administration || {};
  const administrativeRoles = asArray(tabData.administrativeRoles)?.map(normalizeRole);
  const committees = asArray(tabData.committees)?.map(normalizeCommittee);

  const getStatusColor = (status) => {
    return asText(status).toLowerCase() === 'ongoing'
      ? 'bg-green-100 text-green-800'
      : 'bg-blue-100 text-blue-800';
  };

  const titleCase = (value, fallback) => {
    const text = asText(value, fallback);
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <div className="space-y-6 bg-gray-50">
        {/* Administrative Impact */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Settings  className="w-6 h-6 mr-2 text-blue-600" />
             Administrative Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">{administrativeRoles.length}</div>
              <div className="text-sm text-green-700">Total Roles</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">
                {administrativeRoles.filter(role => role.status === 'ongoing').length}
              </div>
              <div className="text-sm text-blue-700">Current Roles</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">{committees.length}</div>
              <div className="text-sm text-purple-700">Committees</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200 border-solid">
              <div className="text-2xl font-bold text-orange-600">3+</div>
              <div className="text-sm text-orange-700">Years Service</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Administrative Roles */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-blue-600" />
            Administrative Roles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {administrativeRoles?.map((role, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{role.role}</h3>
                    {role.department && (
                      <p className="text-blue-600 font-medium mb-1">{role.department}</p>
                    )}
                    {role.institution && <p className="text-gray-700 mb-2">{role.institution}</p>}
                    {role.duration && (
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {role.duration}
                        </div>
                      </div>
                    )}
                  </div>
                  <Badge className={getStatusColor(role.status)}>
                    {titleCase(role.status, 'Active')}
                  </Badge>
                </div>

                {role.description && (
                  <p className="mb-3 text-sm text-gray-700">{role.description}</p>
                )}

                {role.responsibilities.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {role.responsibilities?.map((responsibility, idx) => (
                        <li key={idx} className="text-sm text-gray-700 flex items-start">
                          <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
            {administrativeRoles.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No administrative roles added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Committee Memberships */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900 flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-600" />
            Committee Memberships
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {committees?.map((committee, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{committee.name}</h3>
                    {committee.role && <p className="text-sm text-blue-600">{committee.role}</p>}
                    {committee.responsibility && (
                      <p className="mt-1 text-sm text-gray-700">{committee.responsibility}</p>
                    )}
                  </div>
                  {committee.period && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-1" />
                      {committee.period}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {committees.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No committee memberships added yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

    
    </div>
  );
};
