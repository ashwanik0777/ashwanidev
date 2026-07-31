
import React, { useState } from 'react';
// Minimal custom UI components styled with Tailwind CSS
 
export const Card = ({ className = "", children, ...props }) => (
  <div className={`bg-white rounded-xl border border-gray-200 border-solid shadow-sm${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`px-6 pt-6 pb-2 `} {...props}>
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

export const Badge = ({ className = "", children, ...props }) => (
  <span
    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${className}`}
    {...props}
  >
    {children}
  </span>
);

export const Button = ({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline:
      "bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 focus:ring-blue-500",
    ghost:
      "bg-transparent text-gray-600 hover:bg-gray-100 focus:ring-blue-500 shadow-none border-none",
  };
  const sizes = {
    sm: "text-xs px-2 py-1 h-8",
    md: "text-sm px-4 py-2 h-10",
    lg: "text-base px-6 py-3 h-12",
  };
  return (
    <button
      className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
import { BookOpen, Clock, Users, Filter, FileText, Download, Eye } from 'lucide-react';
import { asArray, asText, pick, pickArray, pickNumber, pickText } from './fieldUtils';

const LEVEL_COLORS = {
  UG: 'bg-green-100 text-green-800',
  PG: 'bg-blue-100 text-blue-800',
  PhD: 'bg-purple-100 text-purple-800',
};

// The dashboard stores long level names; the filter chips here use short codes.
const toLevelCode = (value) => {
  const level = asText(value).toLowerCase();
  if (level.startsWith('under') || level === 'ug') return 'UG';
  if (level.startsWith('post') || level === 'pg') return 'PG';
  if (level.startsWith('doctor') || level === 'phd') return 'PhD';
  return asText(value, 'Other');
};

// Bridges the dashboard's editor field names to what this tab renders.
const normalizeCourse = (item) => ({
  code: pickText(item, ['code', 'courseCode']),
  name: pickText(item, ['name', 'title', 'courseTitle']),
  description: pickText(item, ['description', 'summary']),
  semester: pickText(item, ['semester', 'term']),
  students: pickNumber(item, ['students', 'enrolled'], 0),
  credits: pickNumber(item, ['credits'], 0),
  batch: pickText(item, ['batch', 'school', 'programme']),
  role: pickText(item, ['role']),
  level: toLevelCode(pick(item, ['level'])),
  slides: pickArray(item, ['slides']),
});

export const TeachingTab = ({ profile }) => {
  const [selectedLevel, setSelectedLevel] = useState('all');
  const tabData = profile?.tabData?.teaching || {};
  const courses = asArray(tabData.courses)?.map(normalizeCourse);

  const filteredCourses = selectedLevel === 'all'
    ? courses
    : courses.filter(course => course.level === selectedLevel);

  const getLevelColor = (level) => LEVEL_COLORS[level] || 'bg-gray-100 text-gray-800';

  const totalStudents = courses.reduce((sum, course) => sum + (course?.students || 0), 0);
  const totalCredits = courses.reduce((sum, course) => sum + (course?.credits || 0), 0);
  const totalSlides = courses.reduce((sum, course) => sum + (course?.slides?.length || 0), 0);

  const teachingPhilosophy = asText(tabData.philosophy);

  return (
    <div className="space-y-6 bg-gray-50">
        {/* Teaching Statistics */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
         
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <BookOpen  className="w-6 h-6 mr-2 text-blue-600" />
             Teaching Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 text-center border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
              <div className="text-sm text-blue-700">Total Courses</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 text-center border border-green-200 border-solid">
              <div className="text-2xl font-bold text-green-600">{totalStudents}</div>
              <div className="text-sm text-green-700">Total Students</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 text-center border border-purple-200 border-solid">
              <div className="text-2xl font-bold text-purple-600">{totalCredits}</div>
              <div className="text-sm text-purple-700">Total Credits</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 text-center border border-orange-200 border-solid">
              <div className="text-2xl font-bold text-orange-600">{totalSlides}</div>
              <div className="text-sm text-orange-700">Lecture Slides</div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Teaching Philosophy */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Teaching Philosophy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {teachingPhilosophy || 'No teaching philosophy added yet.'}
          </p>
        </CardContent>
      </Card>

      {/* Courses Section */}
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle className="text-2xl text-gray-900">Courses Taught</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <div className="flex gap-2">
                {['all', 'UG', 'PG', 'PhD']?.map((level) => (
                  <Button
                    key={level}
                    variant={selectedLevel === level ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLevel(level)}
                    className="text-xs"
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {filteredCourses?.map((course, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-6 border border-gray-200 border-solid hover:shadow-md transition-all duration-200">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      {course.code && (
                        <div className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded">
                          {course.code}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                        {course.description && (
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      {course.semester && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {course.semester}
                        </div>
                      )}
                      {course.students > 0 && (
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {course.students} students
                        </div>
                      )}
                      {course.credits > 0 && (
                        <div>
                          <span className="font-medium">Credits:</span> {course.credits}
                        </div>
                      )}
                      {course.batch && (
                        <div>
                          <span className="font-medium">Batch:</span> {course.batch}
                        </div>
                      )}
                      {course.role && (
                        <div>
                          <span className="font-medium">Role:</span> {course.role}
                        </div>
                      )}
                    </div>

                    {/* Lecture Slides Section */}
                    {course.slides.length > 0 && (
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-md font-semibold text-gray-800 flex items-center">
                            <FileText className="w-4 h-4 mr-2" />
                            Lecture Slides ({course.slides.length})
                          </h4>
                        </div>

                        <div className="grid gap-2">
                          {course.slides?.map((slide, slideIdx) => (
                            <div key={slide?.id || slideIdx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 border-solid hover:bg-gray-100 transition-colors">
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {pickText(slide, ['title', 'name'], 'Lecture slide')}
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {pickText(slide, ['filename', 'file'])}
                                  </p>
                                </div>
                              </div>
                              {pickText(slide, ['url', 'fileUrl']) && (
                                <div className="flex items-center gap-2">
                                  <a
                                    href={pickText(slide, ['url', 'fileUrl'])}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <Eye className="w-3 h-3" />
                                    </Button>
                                  </a>
                                  <a href={pickText(slide, ['url', 'fileUrl'])} download>
                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                      <Download className="w-3 h-3" />
                                    </Button>
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                {courses.length === 0
                  ? 'No courses added yet.'
                  : 'No courses match the selected level.'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

    
    </div>
  );
};
