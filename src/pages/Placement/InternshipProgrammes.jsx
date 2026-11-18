import {
  Users,
  Clock,
  Sun,
  Factory,
  Microscope,
  Globe,
} from "lucide-react";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";
import { crcInfo } from "../../Data/placementData";

const Card = ({ children, className = "" }) => (
  <div className={`rounded-xl overflow-hidden ${className}`}>{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`${className}`}>{children}</div>
);

const InternshipProgrammes = () => {
  const internshipTypes = [
    {
      title: "Summer Internships",
      description:
        "8-12 week programs for 2nd and 3rd year students across top corporate partners",
      icon: Sun,
      duration: "8-12 weeks",
      eligibility: "2nd/3rd year students",
      companies: ["Google", "Microsoft", "Amazon", "Adobe"],
    },
    {
      title: "Industrial Training",
      description:
        "Hands-on experience with DRDO, IBM, and leading PSUs",
      icon: Factory,
      duration: "6 months",
      eligibility: "Final year students",
      companies: ["DRDO", "ISRO", "BHEL", "L&T"],
    },
    {
      title: "Research Internships",
      description:
        "Academic research opportunities in cutting-edge technology domains",
      icon: Microscope,
      duration: "3-6 months",
      eligibility: "All eligible years",
      companies: ["IITs", "IISc", "CSIR Labs", "Universities"],
    },
    {
      title: "International Programs",
      description: "Global exposure through MoUs and academic exchange programs",
      icon: Globe,
      duration: "2-4 months",
      eligibility: "Top academic performers",
      companies: ["Partner Universities", "Global Enterprises"],
    },
  ];

  return (
    <SearchableWrapper>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-blue-900 sm:text-4xl">
              Internship Opportunities
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internshipTypes.map((internship, index) => (
              <Card
                key={index}
                className="group bg-white p-6 border border-slate-200 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
              >
                <CardContent className="p-2">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 bg-blue-50 text-blue-700 ring-1 ring-blue-100 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:ring-blue-600"
                    >
                      <internship.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {internship.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          {internship.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          {internship.eligibility}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm mb-4">
                    {internship.description}
                  </p>

                  <div className="mb-5">
                    <div className="flex flex-wrap gap-1.5">
                      {internship.companies.map((company, companyIndex) => (
                        <span
                          key={companyIndex}
                          className="bg-slate-100 text-slate-700 font-medium px-2.5 py-1 rounded-md text-xs"
                        >
                          {company}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={crcInfo.forms.studentPlacementForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
                    >
                      Register Interest
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default InternshipProgrammes;
