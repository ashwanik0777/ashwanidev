 import { motion } from "framer-motion";
import { Mail, Phone, Shield, Award } from "lucide-react";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.01, duration: 0.2, ease: "easeOut" }
  })
};

const Card = ({ className = "", children, ...props }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeInUp}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.3 }}
    className={`rounded-lg shadow bg-white ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ className = "", children, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>{children}</div>
);

const CardTitle = ({ className = "", children, ...props }) => (
  <h2 className={`font-semibold text-lg ${className}`} {...props}>{children}</h2>
);

const CardContent = ({ className = "", children, ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>{children}</div>
);

const Badge = ({ className = "", variant, children, ...props }) => {
  let base = "inline-block px-3 py-1 rounded-full text-xs font-medium align-middle";
  let color =
    variant === "secondary"
      ? "bg-gray-100 text-gray-800"
      : variant === "outline"
      ? "border border-gray-300 text-gray-700 bg-white"
      : "";
  return (
    <span className={`${base} ${color} ${className}`} {...props}>
      {children}
    </span>
  );
};

const NCCStructure = ({ nccData }) => {
  const defaultAnoDetails = {
    name: 'Lt. Bhawna Joshi',
    designation: 'Associate NCC Officer (ANO)',
    email: 'bhawna.joshi@gbu.ac.in',
    phone: '+91-120-234-4000',
    image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png',
    serviceRecord: 'Associate NCC Officer leading 31 UP Girls Battalion & 37 UP Battalion wings at Gautam Buddha University.',
    qualifications: ['Ph.D in Physics', 'Officer Training Academy (OTA)', 'Military & Disaster Management Training'],
    awards: ['University ANO Commendation', 'Outstanding Leadership Award']
  };

  const defaultCadetLeaders = [
    {
      name: 'Cadet Under Officer Vikram Singh',
      rank: 'CUO',
      year: 'Final Year',
      program: 'B.Tech Mechanical',
      email: 'vikram.singh@student.edu',
      image: '/placeholder.svg',
      achievements: ['Best Cadet 2023', 'RDC Participant', 'NCC B Certificate']
    },
    {
      name: 'Cadet Sergeant Major Anita Sharma',
      rank: 'CSM',
      year: 'Third Year',
      program: 'B.Sc Physics',
      email: 'anita.sharma@student.edu',
      image: '/placeholder.svg',
      achievements: ['Drill Competition Winner', 'CATC Participant', 'NCC A Certificate']
    },
    {
      name: 'Cadet Sergeant Rohit Patel',
      rank: 'SGT',
      year: 'Second Year',
      program: 'B.Com',
      email: 'rohit.patel@student.edu',
      image: '/placeholder.svg',
      achievements: ['Shooting Competition Winner', 'Adventure Camp Participant']
    }
  ];

  const defaultPlatoons = [
    { name: 'Alpha Platoon', cadets: 35, commander: 'CUO Vikram Singh', focus: 'Drill & Discipline' },
    { name: 'Bravo Platoon', cadets: 32, commander: 'CSM Anita Sharma', focus: 'Adventure Activities' },
    { name: 'Charlie Platoon', cadets: 30, commander: 'SGT Rohit Patel', focus: 'Social Service' },
    { name: 'Delta Platoon', cadets: 28, commander: 'SGT Priya Gupta', focus: 'Cultural Activities' }
  ];

  const rawAno = nccData?.content?.anoDetails || defaultAnoDetails;
  const anoDetails = {
    ...rawAno,
    qualifications: typeof rawAno.qualifications === 'string'
      ? rawAno.qualifications.split(',').map(q => q.trim()).filter(Boolean)
      : (Array.isArray(rawAno.qualifications) ? rawAno.qualifications : []),
    awards: typeof rawAno.awards === 'string'
      ? rawAno.awards.split(',').map(a => a.trim()).filter(Boolean)
      : (Array.isArray(rawAno.awards) ? rawAno.awards : [])
  };

  const cadetLeaders = (nccData?.content?.cadetLeaders || defaultCadetLeaders).map(leader => ({
    ...leader,
    achievements: typeof leader.achievements === 'string'
      ? leader.achievements.split(',').map(a => a.trim()).filter(Boolean)
      : (Array.isArray(leader.achievements) ? leader.achievements : [])
  }));

  const platoons = nccData?.content?.platoons || defaultPlatoons;

  const getRankBadge = (rank) => {
    const rankColors = {
      'CUO': 'bg-yellow-100 text-yellow-800',
      'CSM': 'bg-red-100 text-red-800',
      'SGT': 'bg-blue-100 text-blue-800'
    };
    return rankColors[rank] || 'bg-gray-100 text-gray-800';
  };

  return (
    <SearchableWrapper>
      <div className="space-y-8 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl">

        {/* ANO & CTO Officers Section */}
        <Card className="overflow-hidden border border-slate-100">
          <CardHeader className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-b border-slate-100">
            <CardTitle className="text-xl sm:text-2xl flex items-center text-slate-850">
              <Shield className="h-6 w-6 mr-2 text-indigo-600" />
              NCC Officers & Caretakers (ANO / CTO)
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Lt. Bhawna Joshi */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png"
                  alt="Lt. Bhawna Joshi"
                  className="w-24 h-24 rounded-2xl object-contain bg-white p-2 border-2 border-amber-300 shadow-md shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-extrabold text-slate-900">Lt. Bhawna Joshi</h3>
                  <p className="text-amber-600 font-semibold text-xs mb-2">Associate NCC Officer (ANO / CTO)</p>
                  <p className="text-xs text-slate-500 font-medium mb-3">31 UP Girls Battalion NCC, Gautam Buddha University</p>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>bhawna.joshi@gbu.ac.in</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dr. Nitesh Singh Bhati */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png"
                  alt="Dr. Nitesh Singh Bhati"
                  className="w-24 h-24 rounded-2xl object-contain bg-white p-2 border-2 border-blue-300 shadow-md shrink-0"
                />
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-extrabold text-slate-900">Dr. Nitesh Singh Bhati</h3>
                  <p className="text-blue-600 font-semibold text-xs mb-2">NCC Caretaker Officer (CTO)</p>
                  <p className="text-xs text-slate-500 font-medium mb-3">37 UP Battalion NCC (Ghaziabad), Gautam Buddha University</p>
                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5">
                      <Mail className="h-3.5 w-3.5 text-slate-400" />
                      <span>nitesh.bhati@gbu.ac.in</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cadet Leadership Team */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">Cadet Leadership</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cadetLeaders.map((leader, index) => (
              <Card key={index} className="hover:shadow-lg">
                <CardContent className="text-center">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-orange-200"
                  />
                  <h3 className="font-bold text-gray-900">{leader.name}</h3>
                  <Badge className={getRankBadge(leader.rank)}>{leader.rank}</Badge>
                  <p className="text-sm text-gray-600 mt-2">{leader.year} • {leader.program}</p>
                  <p className="text-xs text-gray-500 mt-1">{leader.email}</p>
                  <div className="flex flex-wrap justify-center mt-2 gap-1">
                    {leader.achievements.map((ach, idx) => (
                      <Badge key={idx} variant="outline">{ach}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platoon Structure */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900 mb-6">Platoon Structure</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platoons.map((platoon, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle>{platoon.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{platoon.cadets}</div>
                  <div className="text-sm text-gray-600">Cadets</div>
                  <div className="text-sm font-medium text-gray-800">Commander: {platoon.commander}</div>
                  <Badge className="bg-orange-100 text-orange-800">{platoon.focus}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wing Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center flex justify-center items-center">
              <Award className="h-5 w-5 mr-2" />
              Army Wing Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-8">
              <div className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold">Associate NCC Officer (ANO)</div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-medium">Cadet Under Officer (CUO)</div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-medium">Cadet Sergeant Major (CSM)</div>
                <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-medium">Cadet Sergeant (SGT)</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="flex flex-wrap justify-center gap-4">
                {platoons.map((platoon, index) => (
                  <div key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm">
                    {platoon.name} ({platoon.cadets} Cadets)
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Schedule */}
        <Card className="bg-gradient-to-br from-indigo-50/40 via-white to-blue-50/30 border border-indigo-100/50 text-slate-800">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl text-center text-indigo-800 font-bold">Training Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 text-center gap-4">
              <div>
                <div className="text-xl font-bold text-slate-800">Saturday</div>
                <div className="text-slate-500 text-sm mt-1">Weekly Parade</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">Sunday</div>
                <div className="text-slate-500 text-sm mt-1">Adventure Training</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">4 Hours</div>
                <div className="text-slate-500 text-sm mt-1">Weekly Training</div>
              </div>
              <div>
                <div className="text-xl font-bold text-slate-800">120 Periods</div>
                <div className="text-slate-500 text-sm mt-1">Annual Training</div>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </SearchableWrapper>
  );
};

export default NCCStructure;
