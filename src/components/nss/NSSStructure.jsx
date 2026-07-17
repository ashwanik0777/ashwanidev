import React from "react";
import { Mail, Phone, Linkedin, Twitter, User, Award, Shield, Users } from "lucide-react";
import { motion } from "framer-motion";
import SearchableWrapper from "../Searchbar/SearchableWrapper";

const Card = ({ className = "", children }) => (
  <motion.div
    className={`bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
    whileHover={{ y: -4 }}
  >
    {children}
  </motion.div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`font-bold text-lg text-slate-800 ${className}`}>{children}</h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const Badge = ({ className = "", variant = "default", children }) => {
  let base = "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider";
  let color =
    variant === "secondary"
      ? "bg-purple-50 text-purple-700 border border-purple-100"
      : variant === "outline"
      ? "border border-blue-200 text-blue-600 bg-blue-50/50"
      : "bg-blue-600 text-white shadow-sm shadow-blue-100";

  return <span className={`${base} ${color} ${className}`}>{children}</span>;
};

// Reusable fallback image component
const FallbackAvatar = ({ src, alt, className }) => {
  const [hasError, setHasError] = React.useState(false);

  return hasError || !src ? (
    <div className={`bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 ${className}`}>
      <User className="w-1/2 h-1/2" />
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
    />
  );
};

const NSSStructure = ({ nssData }) => {
  const defaultCoordinator = {
    name: "Dr. Gaurav Kumar",
    designation: "NSS Coordinator & Senior Programme Officer",
    department: "Assistant Professor, School of ICT",
    tenure: "2025 - Present",
    email: "gaurav.kumar@gbu.ac.in",
    linkedin: "https://www.linkedin.com/in/gauravjnu/",
    twitter: "https://x.com/gauravkjnu",
    image: "https://nss.onlinegbu.com/images/GauravKumar.png",
  };

  const defaultCoreCouncil = [
    {
      name: "Akanksha Pandey",
      role: "Vice President",
      image: "https://res.cloudinary.com/dzbkwsdfy/image/upload/v1755153073/uploads/general/1755153072503-84fb0ce1b8cd-a12.webp.webp",
      email: "245dcs025@gbu.ac.in",
      achievements: ["NSS Core Team Lead", "Community Service Lead"],
    },
    {
      name: "Ashwani Kushwaha",
      role: "Vice President & Tech Head",
      image: "https://res.cloudinary.com/dzbkwsdfy/image/upload/v1764310861/uploads/general/1764310859023-ea2b935030a4-20251124_153222.jpg.jpg",
      email: "235ucs039@gbu.ac.in",
      achievements: ["NSS Portal Developer", "Digital Outreach Lead"],
    },
  ];

  const defaultUnits = [
    {
      unitNumber: 1,
      programOfficer: {
        name: "Dr. Gaurav Kumar",
        department: "School of ICT",
        image: "https://nss.onlinegbu.com/images/GauravKumar.png",
      },
      facultyMentor: {
        name: "Dr. Nishta Pareek",
        department: "School of Humanities",
        image: "",
      },
      convenors: [
        { name: "Anjali Yadav", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767949411/team/profile-photos/x3p6ngy9b5xcruqxcelj.jpg" },
        { name: "Jaysuvankar Pradhan", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767952028/team/profile-photos/ihabj079bomjazwbxrug.jpg" }
      ],
      coConvenors: [
        { name: "Anushka Shakya", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767951329/team/profile-photos/mhnnvvnuuuyfw29qzaug.jpg" },
        { name: "Ashish", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767949664/team/profile-photos/dlrtef1p9ampqmgqlilr.jpg" }
      ]
    },
    {
      unitNumber: 2,
      programOfficer: {
        name: "Dr. Bhaswati Banerjee",
        department: "School of Vocational Studies",
        image: "",
      },
      facultyMentor: {
        name: "Dr. Lalita Mehra",
        department: "School of Biotechnology",
        image: "https://faculty.gbu.ac.in/uploads/photos/67c162743188f_2.jpg",
      },
      convenors: [
        { name: "Bhakti Gupta", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767979754/team/profile-photos/wmq4q4iyc46y0mumzlfj.jpg" },
        { name: "Roshan Baburao Ingle", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767979974/team/profile-photos/waate9hooq3ijrg2gxbn.jpg" }
      ],
      coConvenors: [
        { name: "Disha Dalmiya", image: "" },
        { name: "Harshita Rao", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767979473/team/profile-photos/slaxozlsttdy0thuwijy.jpg" }
      ]
    },
    {
      unitNumber: 3,
      programOfficer: {
        name: "Dr. Rahul Kapoor",
        department: "School of Law",
        image: "https://faculty.gbu.ac.in/uploads/photos/660f98bf501e0_Screenshot_20240405_115043_Facebook.jpg",
      },
      facultyMentor: {
        name: "Dr. Aparna Verma",
        department: "School of Humanities",
        image: "",
      },
      convenors: [
        { name: "Nitish Kumar Pradhan", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767954054/team/profile-photos/qcu9hcz88bvkj4qcfjun.jpg" },
        { name: "Prerna", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767979494/team/profile-photos/ffvdz0tett35verzmafh.jpg" }
      ],
      coConvenors: [
        { name: "Saumya Singh", image: "" },
        { name: "Rabi Narayan Patra", image: "" }
      ]
    },
    {
      unitNumber: 4,
      programOfficer: {
        name: "Dr. Rakesh Kumar",
        department: "School of ICT",
        image: "",
      },
      facultyMentor: {
        name: "Ms Srijana Jaiswal",
        department: "School of Engineering",
        image: "",
      },
      convenors: [
        { name: "Aryan Kumar Rathore", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767953974/team/profile-photos/jzasqa5st2h4wct2vmxw.jpg" },
        { name: "Prince Kumar Singh", image: "" }
      ],
      coConvenors: [
        { name: "Pari Tyagi", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767978717/team/profile-photos/zycsunhz8p4tnydqook2.jpg" },
        { name: "Deepak Kumar", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767978455/team/profile-photos/syk3ajxkimj6ra1abr8t.jpg" }
      ]
    },
    {
      unitNumber: 5,
      programOfficer: {
        name: "Dr. Shrutee Kanwar",
        department: "School of Management",
        image: "https://faculty.gbu.ac.in/uploads/photos/675823651da3b_IMG-20241127-WA0005.jpg",
      },
      facultyMentor: {
        name: "Dr. Anuj Singh",
        department: "School of Vocational Studies",
        image: "",
      },
      convenors: [
        { name: "Prabhanshi Gupta", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767976641/team/profile-photos/ix7n0zwvwpjakpoqmclx.jpg" },
        { name: "Sameeksha Sharma", image: "" }
      ],
      coConvenors: [
        { name: "Abhay Singh", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767976760/team/profile-photos/mbtidi6kyi6pzr3x1sad.jpg" },
        { name: "Priyanshi Nautiyal", image: "https://res.cloudinary.com/dn7pqxqsy/image/upload/v1767979521/team/profile-photos/d1zks5bzuaahd34yzw3y.jpg" }
      ]
    },
    {
      unitNumber: 6,
      programOfficer: {
        name: "Dr. Indrajeet Singh",
        department: "School of Engineering",
        image: "https://faculty.gbu.ac.in/uploads/photos/67c53dfff3fa3_DSC_4677%20(1).jpg",
      },
      facultyMentor: {
        name: "Dr. Shobha Devi",
        department: "School of Buddhist Studies",
        image: "https://faculty.gbu.ac.in/uploads/photos/6734be2cbbc09_WhatsApp%20Image%202024-11-13%20at%2019.59.32.jpeg",
      },
      convenors: [],
      coConvenors: []
    }
  ];

  const coordinator = nssData?.content?.coordinator || defaultCoordinator;

  const coreCouncil = (nssData?.content?.coreCouncil || defaultCoreCouncil).map(member => ({
    ...member,
    achievements: typeof member.achievements === 'string'
      ? member.achievements.split(',').map(a => a.trim()).filter(Boolean)
      : (Array.isArray(member.achievements) ? member.achievements : [])
  }));

  const units = (nssData?.content?.units || defaultUnits).map(unit => {
    const parseList = (val) => {
      if (Array.isArray(val)) return val.map(item => typeof item === 'string' ? { name: item } : item);
      if (typeof val === 'string') return val.split(',').map(name => ({ name: name.trim() })).filter(item => item.name);
      return [];
    };
    return {
      ...unit,
      convenors: parseList(unit.convenors),
      coConvenors: parseList(unit.coConvenors)
    };
  });

  const fadeIn = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <SearchableWrapper>
      <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* NSS Coordinator */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center justify-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            University NSS Cell Leadership
          </h2>
          <div className="max-w-xl mx-auto bg-gradient-to-br from-white to-blue-50/30 rounded-3xl border border-slate-100 p-8 shadow-xl flex flex-col md:flex-row items-center gap-6 text-left">
            <FallbackAvatar
              src={coordinator.image}
              alt={coordinator.name}
              className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-100 shadow-md shrink-0"
            />
            <div className="space-y-2">
              <span className="bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                NSS Coordinator
              </span>
              <h3 className="text-xl font-bold text-slate-800 leading-tight mt-1">{coordinator.name}</h3>
              <p className="text-sm font-semibold text-slate-600">{coordinator.designation}</p>
              <p className="text-xs text-slate-400">{coordinator.department}</p>
              <p className="text-xs font-medium text-slate-500">Tenure: {coordinator.tenure}</p>
              <div className="flex gap-3 pt-2">
                {coordinator.email && (
                  <a href={`mailto:${coordinator.email}`} className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {coordinator.linkedin && (
                  <a href={coordinator.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {coordinator.twitter && (
                  <a href={coordinator.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Council */}
        <motion.div variants={fadeIn} initial="hidden" animate="visible" className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-slate-900 flex items-center justify-center gap-2">
            <Users className="w-6 h-6 text-purple-600" />
            NSS Student Core Council (Vice Presidents)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {coreCouncil.map((member, idx) => (
              <Card key={idx} className="p-6 flex flex-col sm:flex-row items-center gap-6">
                <FallbackAvatar
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-2xl object-cover border-2 border-purple-100 shadow shrink-0"
                />
                <div className="space-y-2 text-center sm:text-left">
                  <Badge variant="secondary">{member.role}</Badge>
                  <h3 className="text-lg font-bold text-slate-800">{member.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start pt-1">
                    {member.achievements.map((ach, i) => (
                      <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-500 font-semibold px-2 py-0.5 rounded">
                        {ach}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* NSS 6 Units Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center text-slate-900 flex items-center justify-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            NSS Units Structure (Unit 1 to 6)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {units.map((unit) => (
              <div
                key={unit.unitNumber}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden flex flex-col justify-between hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Unit {unit.unitNumber}</h3>
                  <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full font-bold">
                    Active Unit
                  </span>
                </div>

                <div className="p-6 space-y-6 flex-1">
                  {/* Program Officer */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Programme Officer</h4>
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <FallbackAvatar
                        src={unit.programOfficer.image}
                        alt={unit.programOfficer.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{unit.programOfficer.name}</p>
                        <p className="text-xs text-slate-500 truncate">{unit.programOfficer.department}</p>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Mentor */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Faculty Mentor</h4>
                    <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <FallbackAvatar
                        src={unit.facultyMentor.image}
                        alt={unit.facultyMentor.name}
                        className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0 border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{unit.facultyMentor.name}</p>
                        <p className="text-xs text-slate-500 truncate">{unit.facultyMentor.department}</p>
                      </div>
                    </div>
                  </div>

                  {/* Convenors */}
                  {unit.convenors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Convenors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {unit.convenors.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 bg-blue-50/30 p-2 rounded-lg border border-blue-50">
                            <FallbackAvatar
                              src={c.image}
                              alt={c.name}
                              className="w-7 h-7 rounded-full object-cover border border-blue-100"
                            />
                            <span className="text-xs font-semibold text-slate-700 truncate">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Co-convenors */}
                  {unit.coConvenors.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Co-Convenors</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {unit.coConvenors.map((cc, i) => (
                          <div key={i} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <FallbackAvatar
                              src={cc.image}
                              alt={cc.name}
                              className="w-7 h-7 rounded-full object-cover border border-slate-200"
                            />
                            <span className="text-xs font-medium text-slate-600 truncate">{cc.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </SearchableWrapper>
  );
};

export default NSSStructure;
