// Minimal Card components for local use, styled for responsiveness
import { motion } from "framer-motion";
 // Minimal Card components
const Card = ({ className = "", children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`rounded-xl shadow bg-white ${className}`}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h2 className={`font-bold text-xl md:text-2xl ${className}`}>{children}</h2>
);

const CardContent = ({ className = "", children }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);
import { Shield, Target, Users, Award, Star, Flag, ArrowRight, ExternalLink } from 'lucide-react';
import StatsCard from "../StatsCard";
import SearchableWrapper from "../Searchbar/SearchableWrapper";
 
const NCCIntroduction = ({ nccData }) => {
  const visionText = nccData?.overview || `The National Cadet Corps (NCC) is a youth development movement under the Ministry of Defence, aimed at instilling discipline, leadership, patriotism, and military awareness among students. We uphold the motto "Unity and Discipline" - fostering national integration and building character through military training and social service.`;
  const registerUrl = nccData?.content?.email || "#";
  const mainUrl = nccData?.content?.websiteUrl || "#";

  const objectives = [
    {
      icon: Shield,
      title: 'Character Development',
      description: 'Develop qualities of character, courage, comradeship, discipline, leadership, and patriotism.'
    },
    {
      icon: Target,
      title: 'Military Training',
      description: 'Provide basic military training to create a pool of organized, trained, and motivated youth.'
    },
    {
      icon: Flag,
      title: 'National Unity',
      description: 'Foster unity and brotherhood among youth of different backgrounds and regions.'
    },
    {
      icon: Users,
      title: 'Social Service',
      description: 'Encourage youth to actively participate in community development and social service.'
    }
  ];

  const unitDetails = {
    wing: 'Army Wing',
    nccCode: 'UP-07-A',
    paradeDay: 'Saturday',
    intakeCapacity: 150,
    establishedYear: 2015
  };
const nccStatsData = [
  {
    icon: Users,
    number: 300,
    numberText: '300+',
    title: 'Enrolled Cadets',
    iconColor: '#3b82f6', // blue
  },
  {
    icon: Shield,
    number: 25,
    numberText: '25+',
    title: 'Training Camps',
    iconColor: '#f97316', // orange
  },
  {
    icon: Award,
    number: 100,
    numberText: '100+',
    title: 'Certificates Earned',
    iconColor: '#10b981', // green
  },
  {
    icon: Star,
    number: 15,
    numberText: '15+',
    title: 'RDC Selections',
    iconColor: '#8b5cf6', // purple
  },
];

  return (
    <SearchableWrapper>
    <div className="space-y-8 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl">
      {/* Hero Mission Statement Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest bg-amber-500 text-slate-950 mb-4">
                OFFICIAL NCC GBU CELL
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight">
                National Cadet Corps <span className="text-amber-400">(NCC GBU)</span>
              </h2>
              <p className="text-base md:text-lg text-blue-200 font-medium mb-6">
                राष्ट्रीय कैडेट कोर - गौतम बुद्ध विश्वविद्यालय
              </p>
              <p className="text-sm md:text-base text-slate-200 leading-relaxed mb-8">
                {visionText}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={registerUrl}
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:scale-105"
                >
                  Start Cadet Registration <ArrowRight size={18} />
                </a>
                <a
                  href={mainUrl}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold backdrop-blur-sm transition-all"
                >
                  Cadet Login <ExternalLink size={16} />
                </a>
              </div>
            </div>

            {/* Official NCC Emblem Logo */}
            <div className="shrink-0 self-center md:self-auto">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png"
                alt="Official NCC Logo"
                className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain bg-white rounded-full p-2.5 shadow-2xl border-4 border-amber-400/80"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://panducollege.ac.in/images/ncc-new-logo.png";
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Unit Information */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8 flex items-center justify-center gap-2">
          <Shield className="w-8 h-8 text-orange-600 animate-pulse" />
          Unit Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-50/50 to-white rounded-2xl border border-orange-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-1">Affiliated Wing</div>
            <div className="text-xl font-bold text-slate-800">{unitDetails.wing}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50/50 to-white rounded-2xl border border-blue-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">NCC Unit Code</div>
            <div className="text-xl font-bold text-slate-800">{unitDetails.nccCode}</div>
          </div>
          <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl border border-indigo-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">Parade Day</div>
            <div className="text-xl font-bold text-slate-800">{unitDetails.paradeDay}</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50/50 to-white rounded-2xl border border-emerald-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-emerald-600 uppercase tracking-wider mb-1">Intake Capacity</div>
            <div className="text-xl font-bold text-slate-800">{unitDetails.intakeCapacity} Cadets</div>
          </div>
          <div className="bg-gradient-to-br from-purple-50/50 to-white rounded-2xl border border-purple-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">Established</div>
            <div className="text-xl font-bold text-slate-800">{unitDetails.establishedYear}</div>
          </div>
          <div className="bg-gradient-to-br from-amber-50/50 to-white rounded-2xl border border-amber-100/60 p-6 shadow-sm hover:shadow-md transition-all duration-200">
            <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">Unit Rating</div>
            <div className="text-xl font-bold text-slate-800">A Grade</div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <StatsCard stats={nccStatsData} />
      {/* Objectives */}
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">NCC Objectives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {objectives.map((objective, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full">
                    <objective.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{objective.title}</h3>
                    <p className="text-gray-600">{objective.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* NCC Pledge */}
      <Card className="bg-gradient-to-br from-orange-50/30 via-slate-50 to-blue-50/30 border border-slate-100/80 shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-gray-900">NCC Pledge</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-lg leading-relaxed text-gray-800 italic">
            "We, the cadets of the National Cadet Corps, do solemnly pledge that we shall always uphold 
            the unity of India. We resolve to be disciplined and responsible citizens of our nation. 
            We shall undertake positive community service in the spirit of selflessness and concern for 
            our fellow beings."
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/50 border border-blue-100/60 text-slate-800">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">Join the Corps</h2>
          <p className="text-xl mb-6 text-slate-650">
            Be part of a disciplined force that builds character, leadership, and patriotism.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={registerUrl} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block">
              Apply Now
            </a>
            <a href={mainUrl} className="border border-slate-300 text-slate-700 bg-white px-8 py-3 rounded-lg font-semibold hover:bg-slate-50 transition-colors inline-block">
              Learn More
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
    </SearchableWrapper>
  );
};

export default NCCIntroduction;
