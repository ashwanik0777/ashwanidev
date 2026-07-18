import React from "react";
import {
  ArrowLeft,
  BookOpen,
  Users,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Target,
  FileText,
  Calculator,
  MessageSquare,
  Code,
  CalendarRange,
  UserCheck,
  Building,
} from "lucide-react";
import { Link } from "react-router-dom";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl overflow-hidden ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

const Button = ({
  children,
  className = "",
  variant = "default",
  ...props
}) => {
  const baseStyle =
    "px-4 py-2 rounded-lg font-semibold transition-all duration-300 focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-450",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-2 focus:ring-blue-450",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const TrainingCareerServices = () => {
  const successMetrics = [
    { metric: "90%+", description: "Placement Success Rate" },
    { metric: "200+", description: "Corporate Recruiters" },
    { metric: "15 LPA", description: "Highest Package Offered" },
    { metric: "6.5 LPA", description: "Average Package" },
  ];

  const trainingPrograms = [
    {
      title: "Resume Writing Workshops",
      description:
        "Learn to craft compelling resumes that stand out to recruiters",
      duration: "2 hours",
      frequency: "Weekly",
      icon: FileText,
      color: "from-blue-400 to-blue-600",
      topics: [
        "ATS-friendly formatting",
        "Skill highlighting",
        "Industry-specific templates",
      ],
    },
    {
      title: "Aptitude Test Training",
      description:
        "Comprehensive preparation for quantitative and logical reasoning",
      duration: "4 weeks",
      frequency: "3x per week",
      icon: Calculator,
      color: "from-green-400 to-green-600",
      topics: ["Quantitative aptitude", "Logical reasoning", "Verbal ability"],
    },
    {
      title: "Soft Skills & Communication",
      description: "Develop essential interpersonal and communication skills",
      duration: "3 weeks",
      frequency: "2x per week",
      icon: MessageSquare,
      color: "from-purple-400 to-purple-600",
      topics: ["Public speaking", "Team collaboration", "Leadership skills"],
    },
    {
      title: "Technical Bootcamps",
      description: "Intensive training in cutting-edge technologies",
      duration: "6 weeks",
      frequency: "5x per week",
      icon: Code,
      color: "from-orange-400 to-orange-600",
      topics: ["Web development", "Data science", "Machine learning"],
    },
    {
      title: "Mock Interviews",
      description:
        "Practice with industry professionals for real interview experience",
      duration: "1 hour",
      frequency: "On-demand",
      icon: Target,
      color: "from-red-400 to-red-600",
      topics: ["HR interviews", "Technical rounds", "Group discussions"],
    },
  ];

  const careerServices = [
    {
      title: "Personalized Career Counseling",
      description:
        "One-on-one guidance tailored to your career goals and interests",
      icon: Target,
      features: ["Career path mapping", "Skill gap analysis", "Goal setting"],
    },
    {
      title: "Interview Scheduling Support",
      description: "Seamless coordination between students and recruiters",
      icon: CalendarRange,
      features: [
        "Automated scheduling",
        "Reminder notifications",
        "Conflict resolution",
      ],
    },
    {
      title: "Industry Mentorship Programs",
      description: "Connect with professionals from your field of interest",
      icon: UserCheck,
      features: [
        "Industry insights",
        "Networking opportunities",
        "Career guidance",
      ],
    },
    {
      title: "Career Fairs & Campus Drives",
      description: "Direct interaction with potential employers",
      icon: Building,
      features: ["Multiple companies", "On-spot interviews", "Job offers"],
    },
  ];

  const upcomingWorkshops = [
    {
      title: "Advanced Python for Data Science",
      date: "December 15, 2024",
      time: "10:00 AM - 4:00 PM",
      instructor: "Dr. Rajesh Kumar",
      seats: "Available",
      level: "Intermediate",
    },
    {
      title: "Digital Marketing Essentials",
      date: "December 18, 2024",
      time: "2:00 PM - 5:00 PM",
      instructor: "Ms. Priya Sharma",
      seats: "Limited",
      level: "Beginner",
    },
    {
      title: "Mock Interview Marathon",
      date: "December 20, 2024",
      time: "9:00 AM - 6:00 PM",
      instructor: "Industry Panel",
      seats: "Available",
      level: "All Levels",
    },
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen pt-3 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-800 mb-4">
                Training & Career Services
              </h2>
              <p className="text-lg text-center text-gray-600">
                Equipping students with industry-ready skills and guidance
              </p>
              <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
            </div>

            {/* Success Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
              {successMetrics.map((item, index) => (
                <Card
                  key={index}
                  className="bg-white/80 pt-8 px-4 rounded-2xl backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 group"
                >
                  <CardContent className="flex flex-col items-center pb-6">
                    <div className="text-4xl font-extrabold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                      {item.metric}
                    </div>
                    <p className="text-gray-700 text-center font-semibold text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Workshops */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Upcoming Workshops
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {upcomingWorkshops.map((workshop, index) => (
                  <Card
                    key={index}
                    className="h-full flex flex-col bg-white backdrop-blur-sm border border-slate-100 shadow-xl rounded-2xl pt-5 hover:shadow-2xl transition-all duration-300 hover-scale"
                  >
                    <CardContent className="flex-grow p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-bold text-slate-850 max-w-[70%]">
                            {workshop.title}
                          </h3>
                          <span
                            className={`px-2 mt-1 py-1 rounded-full text-xs font-semibold ${
                              workshop.seats === "Available"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {workshop.seats}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-gray-700 mb-6">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                            <span>{workshop.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-green-600" />
                            <span>{workshop.time}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2 text-purple-600" />
                            <span>Instructor: {workshop.instructor}</span>
                          </div>
                          <div className="flex items-center">
                            <Target className="h-4 w-4 mr-2 text-orange-600" />
                            <span>Level: {workshop.level}</span>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white mt-auto rounded-xl py-2.5">
                        Register Now
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Training Programs */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Training Programs Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingPrograms.map((program, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover-scale group pt-5"
                  >
                    <CardContent className="p-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r ${program.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 text-white`}
                      >
                        <program.icon className="h-7 w-7" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                        {program.title}
                      </h3>
                      <p className="text-gray-800 text-sm mb-4 text-center">
                        {program.description}
                      </p>

                      <div className="flex justify-between items-center mb-4 text-sm">
                        <div className="flex items-center text-blue-600">
                          <Clock className="h-4 w-4 mx-2" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="flex items-center text-green-600">
                          <Calendar className="h-4 w-4 mx-2" />
                          <span>{program.frequency}</span>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 ml-2 mb-3 text-sm">
                          Key Topics:
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {program.topics.map((topic, topicIndex) => (
                            <span
                              key={topicIndex}
                              className="bg-blue-100 text-blue-700 px-2 py-1 hover:bg-blue-500 hover:text-white rounded-md text-xs"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Career Services */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
                Career Services Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {careerServices.map((service, index) => (
                  <Card
                    key={index}
                    className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl pt-6 hover:shadow-2xl transition-all duration-300 hover-scale"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-red-100 to-orange-100 rounded-lg mt-2 flex items-center justify-center flex-shrink-0 text-red-600 group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {service.description}
                          </p>
                          <ul className="space-y-1">
                            {service.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-center text-sm text-gray-700"
                              >
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SearchableWrapper>
  );
};

export default TrainingCareerServices;
