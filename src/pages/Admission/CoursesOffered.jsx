import React, { useState } from "react";
import {
  GraduationCap,
  BookOpen,
  Users,
  Clock,
  Star,
  Award,
  Globe,
} from "lucide-react";
import HeroBanner from "../../components/HeroBanner";
import StatsCard from '../../components/StatsCard';
import ButtonGroup from "../../components/TabsData";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import { ADMISSIONS_CATEGORIES, ADMISSIONS_SCHOOL_BUTTONS } from "../../Data/schools";
// Mock Navbar component

// UI Components
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg shadow-sm border border-gray-200 border-solid${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-4 border-b border-gray-200 border-solid">
    {children}
  </div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`px-6 py-4 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    outline: "border border-gray-300 text-gray-700 bg-white",
  };

  const activeSchoolData = schoolCategories[activeSchool] ||
    schoolCategories[ADMISSIONS_SCHOOL_BUTTONS[0]?.id];

  if (!activeSchoolData) {
    return (
      <SearchableWrapper>
        <div className="min-h-screen bg-gray-50 pb-10">
          <HeroBanner
            title="Courses Offered"
            subtitle="Explore our diverse academic programs across multiple schools and degree levels"
            bgTheme={5}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  mb-8">
            <StatsCard stats={educationStatsData} />
            <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-center text-gray-500">
              Admissions data is not configured yet.
            </div>
          </div>
        </div>
      </SearchableWrapper>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Button = ({ children, size = "default", className = "" }) => {
  const sizes = {
    default: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Tabs = ({ children, defaultValue, className = "" }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={`w-full ${className}`} data-active-tab={activeTab}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
};

const TabsList = ({ children, className = "", activeTab, setActiveTab }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-500 ${className}`}
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({
  children,
  value,
  className = "",
  activeTab,
  setActiveTab,
}) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      activeTab === value
        ? "bg-white text-gray-900 shadow-sm"
        : "text-gray-600 hover:text-gray-900"
    } ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, className = "", activeTab }) =>
  activeTab === value ? <div className={className}>{children}</div> : null;

// School Categories Data (centralized in Data/schools)
const schoolCategories = ADMISSIONS_CATEGORIES;
const educationStatsData = [
  {
    icon: GraduationCap,
    numberText: "8",
    title: "Schools",
    iconColor: "#2563eb", // blue-600
  },
  {
    icon: BookOpen,
    numberText: "50+",
    title: "Programs",
    iconColor: "#16a34a", // green-600
  },
  {
    icon: Award,
    numberText: "1000+",
    title: "Total Seats",
    iconColor: "#9333ea", // purple-600
  },
  {
    icon: Globe,
    numberText: "95%",
    title: "Placement Rate",
    iconColor: "#f97316", // orange-600
  },
];
const CoursesOffered = () => {
  const [activeSchool, setActiveSchool] = useState(
    ADMISSIONS_SCHOOL_BUTTONS[0]?.id || ""
  );

  const schoolButtons = ADMISSIONS_SCHOOL_BUTTONS;

  const CourseCard = ({ course }) => (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg">{course.name}</span>
          <Badge variant="secondary">{course.duration}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Specializations:</h4>
            <div className="flex flex-wrap gap-2">
              {course.specializations.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>{course.seats} seats</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span>{course.duration}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">Eligibility:</h4>
            <p className="text-sm text-gray-600">{course.eligibility}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Highlights:</h4>
            <ul className="space-y-1">
              {course.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const ProgramSection = ({ programs, schoolName, schoolData }) => {
    const [activeProgram, setActiveProgram] = useState("Undergraduate");

    const programButtons = [
      { id: "Undergraduate", label: "UG", tooltip: "Undergraduate Programs" },
      { id: "Postgraduate", label: "PG", tooltip: "Postgraduate Programs" },
      { id: "Doctoral", label: "Doctoral", tooltip: "Doctoral Programs" },
    ];

    return (
      <div className="space-y-8">
        {/* School Banner */}
        <div className="relative rounded-lg overflow-hidden">
          <img
            src={`https://images.unsplash.com/${schoolData.image}?auto=format&fit=crop&w=1200&h=300`}
            alt={schoolName}
            className="w-full h-48 object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${schoolData.color} opacity-80`} />
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center">
              <schoolData.icon className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold">{schoolName}</h2>
            </div>
          </div>
        </div>

        {/* UG/PG/Doctoral ButtonGroup */}
        <ButtonGroup
          buttons={programButtons}
          onClick={setActiveProgram}
          activeButton={activeProgram}
          size="md"
          fullWidth={true}
          rounded="xl"
          animated={true}
          gap
          className="flex-wrap justify-center"
        />

        {/* Program Level Content */}
        {Object.entries(programs).map(([level, courses]) => (
          activeProgram === level && (
            <div key={level} className="space-y-6">
              {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course, index) => (
                    <CourseCard key={index} course={course} />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center">
                  <CardContent>
                    <div className="text-gray-500">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">No {level} programs available in this school</p>
                      <p className="text-sm mt-2">Please check other program levels or contact admissions</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )
        ))}
      </div>
    );
  };

  return (
    <SearchableWrapper>
    <div className="min-h-screen bg-gray-50 pb-10">
      <HeroBanner
        title="Courses Offered"
        subtitle="Explore our diverse academic programs across multiple schools and degree levels"
        bgTheme={5}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  mb-8">
        <StatsCard stats={educationStatsData} />

        {/* School Tabs */}
        <ButtonGroup
          buttons={schoolButtons}
          onClick={setActiveSchool}
          activeButton={activeSchool}
          size="lg"
          fullWidth={true}
          rounded="2xl"
          animated={true}
          className="mb-8 flex-wrap justify-center"
        />

        {/* Program Tabs + Content */}
        <ProgramSection
          programs={activeSchoolData.programs}
          schoolName={activeSchool}
          schoolData={activeSchoolData}
        />
      </div>
    </div>
    </SearchableWrapper>
  );
};

export default CoursesOffered;