import React from "react";
import {
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
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl overflow-hidden ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

const TrainingCareerServices = () => {
  const trainingPrograms = [
    {
      title: "Resume Writing & Profile Building",
      description: "Craft ATS-friendly resumes and build strong corporate professional profiles.",
      icon: FileText,
      color: "from-blue-400 to-blue-600",
      topics: ["ATS formatting", "Skill highlighting", "Portfolio building"],
    },
    {
      title: "Aptitude & Reasoning Prep",
      description: "Preparation for quantitative, analytical, and logical reasoning rounds.",
      icon: Calculator,
      color: "from-green-400 to-green-600",
      topics: ["Quantitative aptitude", "Logical reasoning", "Verbal ability"],
    },
    {
      title: "Soft Skills & Public Speaking",
      description: "Develop interpersonal skills, professional communication, and presentation techniques.",
      icon: MessageSquare,
      color: "from-purple-400 to-purple-600",
      topics: ["Public speaking", "Team collaboration", "Professional etiquette"],
    },
    {
      title: "Technical Skill Bootcamps",
      description: "Industry-focused technical modules in software, data science, and domain engineering.",
      icon: Code,
      color: "from-orange-400 to-orange-600",
      topics: ["Software Development", "Data Science", "Core Domain Skills"],
    },
    {
      title: "Mock Interviews & GD Prep",
      description: "Practice technical interviews, HR interactions, and group discussion rounds.",
      icon: Target,
      color: "from-red-400 to-red-600",
      topics: ["HR rounds", "Technical interviews", "Group discussions"],
    },
  ];

  const careerServices = [
    {
      title: "Personalized Career Counseling",
      description: "One-on-one guidance tailored to student career goals and domain choices.",
      icon: Target,
    },
    {
      title: "Interview Drive Coordination",
      description: "Seamless scheduling and drive management between corporate HRs and students.",
      icon: CalendarRange,
    },
    {
      title: "Industry Mentorship Programs",
      description: "Interaction and webinars with alumni and industry leaders.",
      icon: UserCheck,
    },
    {
      title: "On-Campus Recruitment Drives",
      description: "Direct interaction and recruitment processes with top corporate partners.",
      icon: Building,
    },
  ];

  return (
    <SearchableWrapper>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Training & Career Services
            </h2>
            <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {trainingPrograms.map((program, index) => (
              <Card
                key={index}
                className="bg-slate-50 p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-0">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center mb-4 text-white`}
                  >
                    <program.icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {program.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {program.topics.map((topic, topicIndex) => (
                      <span
                        key={topicIndex}
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerServices.map((service, index) => (
              <div
                key={index}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex items-start gap-4"
              >
                <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center shrink-0 mt-1">
                  <service.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default TrainingCareerServices;
