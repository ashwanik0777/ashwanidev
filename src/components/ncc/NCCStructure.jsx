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





      </div>
    </SearchableWrapper>
  );
};

export default NCCStructure;
