import React, { useState } from 'react';
import {
  Globe, Users, BookOpen, MapPin, Plane
} from 'lucide-react';
import { motion } from 'framer-motion';

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

// ✅ Premium Unsplash images matching official partners
const partnerImages = [
  'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80', // Monash / Australia
  'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?auto=format&fit=crop&w=800&q=80', // Dongguk / South Korea
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=800&q=80', // USAII / US AI
  'https://images.unsplash.com/photo-1513829096960-ef016598c92a?auto=format&fit=crop&w=800&q=80', // Sheffield Hallam / UK
  'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80', // Manchester Metropolitan / UK
  'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?auto=format&fit=crop&w=800&q=80', // Denmark ABS
];

const programImages = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80', // Student Exchange
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80', // Ph.D. Research
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', // Faculty Exchange
];

const opportunityImages = [
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80', // Monash fellowship
  'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?auto=format&fit=crop&w=800&q=80', // Dongguk exchange
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', // USAII AI
];

// Static high-fidelity data representing GBU's actual International Collaborations and MoUs
const GBU_COLLAB_HERO = {
  title: "International Collaborations & MoUs",
  description: "The International Affairs Cell at Gautam Buddha University actively cultivates global academic partnerships, joint research initiatives, and student/faculty exchange programs with prestigious institutions worldwide.",
  bgTheme: 2,
  activemou_count: 12,
  participants_counts: 150,
  countries_count: 10,
  publications_count: 75
};

const GBU_COLLAB_PARTNERS = [
  {
    id: 1,
    card_title: "Monash University",
    card_desc: "A major collaborative agreement signed under the auspices of the Uttar Pradesh government to foster academic collaboration, joint doctoral research, faculty capacity building, and innovative educational research initiatives.",
    country: "Australia",
    since_year: 2025,
    url: "https://www.gbu.ac.in/"
  },
  {
    id: 2,
    card_title: "Dongguk University",
    card_desc: "A comprehensive academic partnership with the College of Buddhist Studies and the Buddhist Culture Research Institute of Dongguk University. Focuses on exchanging research dissertations, joint academic projects, student internships, and doctoral research exchanges.",
    country: "South Korea",
    since_year: 2023,
    url: "https://www.gbu.ac.in/"
  },
  {
    id: 3,
    card_title: "United States Artificial Intelligence Institute (USAII®)",
    card_desc: "An industry-academia alliance focusing on elevating artificial intelligence and machine learning education. Students gain exclusive access to specialized industry-standard AI certifications, curriculum resources, and hands-on workshops.",
    country: "United States",
    since_year: 2024,
    url: "https://www.gbu.ac.in/"
  },
  {
    id: 4,
    card_title: "Sheffield Hallam University",
    card_desc: "A long-standing academic agreement promoting mutual research initiatives, joint seminars, and student/faculty mobility programs across engineering, computing, and social sciences.",
    country: "United Kingdom",
    since_year: 2018,
    url: "https://www.gbu.ac.in/"
  },
  {
    id: 5,
    card_title: "Manchester Metropolitan University",
    card_desc: "Collaborative agreement focusing on curriculum design advisory, joint workshops, guest faculty lectures, and bilateral research opportunities in management and humanities.",
    country: "United Kingdom",
    since_year: 2019,
    url: "https://www.gbu.ac.in/"
  },
  {
    id: 6,
    card_title: "Academy of Business Studies",
    card_desc: "Bilateral student exchange program offering business management and international trade students the opportunity to spend a semester studying in Denmark with fully transferable academic credits.",
    country: "Denmark",
    since_year: 2017,
    url: "https://www.gbu.ac.in/"
  }
];

const GBU_COLLAB_PROGRAMS = [
  {
    id: 1,
    title: "Global Exchange Programs",
    description: "Our structured academic mobility programs enable GBU students and faculty to engage in international research and cross-cultural learning.",
    card_title: "Bilateral Student Exchange",
    card_desc: "Allows undergraduate and postgraduate students to spend a semester studying at our global partner universities, acquiring international credits.",
    duration: "1 Semester (4-6 Months)",
    participants: "25+ Students Annually",
    benefits: "Transferable Academic Credits\r\nGlobal Exposure & Intercultural Skills\r\nWaived Tuition Fees at Host University\r\nAccess to Foreign Laboratories & Library Networks"
  },
  {
    card_title: "Bilateral Doctoral Research Exchange",
    card_desc: "Enables Ph.D. scholars in Buddhist Studies, ICT, and Biotechnology to conduct research under joint supervision at partner institutions like Dongguk University.",
    duration: "3 to 12 Months",
    participants: "10+ Scholars Active",
    benefits: "Joint Academic Publications\r\nAccess to Rare Manuscript Repositories\r\nCo-supervised Thesis Evaluation\r\nFully Funded Research Internships"
  },
  {
    card_title: "International Faculty Mobility",
    card_desc: "Facilitates GBU faculty members delivering guest lectures, engaging in joint research projects, and participating in curriculum benchmarking at partner universities.",
    duration: "1 to 4 Weeks",
    participants: "15+ Faculty Members",
    benefits: "Collaborative Research Project Bidding\r\nGlobal Curricular Benchmarking\r\nJoint Seminar & Conference Organizing\r\nProfessional Network Development"
  }
];

const GBU_COLLAB_OPPORTUNITIES = [
  {
    id: 1,
    title: "Current Exchange Opportunities",
    description: "Apply for upcoming semester-abroad fellowships, research internships, and international student mobility scholarships.",
    card_title: "Monash Research Fellowship 2026",
    duration: "6 Months",
    benefits: "Fully Funded Monthly Stipend & Travel Allowance",
    elegibility: "Pre-Final Year B.Tech / M.Tech / M.Sc. Students with CGPA > 8.5",
    deadline: "2026-09-15",
    url: "https://www.gbu.ac.in/",
    button_text: "Apply Fellowship"
  },
  {
    id: 2,
    card_title: "Dongguk Buddhist Studies Exchange",
    duration: "1 Semester",
    benefits: "Free Accommodation in Seoul, Korea & Tuition Fee Waiver",
    elegibility: "MA & Ph.D. Students of Buddhist Studies & Civilizations",
    deadline: "2026-10-01",
    url: "https://www.gbu.ac.in/",
    button_text: "Apply Program"
  },
  {
    id: 3,
    card_title: "USAII® Artificial Intelligence Internships",
    duration: "3 Months (Virtual/Hybrid)",
    benefits: "Industry-standard AI Engineer Certification & Mentorship",
    elegibility: "B.Tech SOICT Students (CSE / AI / Data Science) in 3rd/4th Year",
    deadline: "2026-08-30",
    url: "https://www.gbu.ac.in/",
    button_text: "Register Now"
  }
];

const GBU_COLLAB_CTA = {
  title: "Connect with GBU International Affairs Cell",
  description: "Are you a foreign university seeking an academic partnership, or a GBU student/faculty member looking to go abroad? Get in touch with our International Affairs office.",
  background_color: "#eff6ff", // blue-50
  button1_text: "Partner with Us",
  url1: "mailto:international@gbu.ac.in",
  button2_text: "Contact IA Cell"
};

const Collaboration = () => {
  const [hero, setHero] = useState(GBU_COLLAB_HERO);
  const [partners, setPartners] = useState(GBU_COLLAB_PARTNERS);
  const [programs, setPrograms] = useState(GBU_COLLAB_PROGRAMS);
  const [opportunities, setOpportunities] = useState(GBU_COLLAB_OPPORTUNITIES);
  const [cta, setCta] = useState(GBU_COLLAB_CTA);
  const [expanded, setExpanded] = useState({});

  const stats = [
    { icon: Globe, number: hero.activemou_count, title: "Active MOUs", iconColor: "#4338ca" }, // indigo-700
    { icon: Users, number: hero.participants_counts, numberText: `${hero.participants_counts}+`, title: "Participants", iconColor: "#2563eb" }, // blue-600
    { icon: MapPin, number: hero.countries_count, title: "Countries", iconColor: "#059669" }, // green-600
    { icon: BookOpen, number: hero.publications_count, title: "Publications", iconColor: "#f97316" }, // orange-500
  ];

  return (
    <SearchableWrapper>
      <div className="font-sans">
        {/* HERO */}
        <BannerSection
          title={hero.title}
          subtitle={hero.description}
          bgTheme={hero.bgTheme || 2}
        />

        {/* STATS */}
        <StatsCard stats={stats} />

        {/* PARTNERS */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-20 bg-gray-100 px-4 sm:px-6"
        >
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12 text-gray-800">Our Global Partners</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
            {partners.map((p, i) => {
              const isExpanded = expanded[p.id] || false;
              const shortDesc = p.card_desc?.slice(0, 60) || '';
              const shouldShowToggle = p.card_desc?.length > 60;

              return (
                <motion.div
                  key={p.id}
                  className="relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 duration-500 group"
                  variants={fadeUp}
                >
                  <div className="h-65 w-full overflow-hidden bg-slate-900">
                    <img
                      src={partnerImages[i % partnerImages.length]}
                      alt={p.card_title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    />
                  </div>
                  <div className="relative p-6 bg-gray-700 text-white z-10">
                    <h3 className="text-xl font-bold">{p.card_title}</h3>
                    <p className="text-sm opacity-80 my-3">
                      {isExpanded ? p.card_desc : shortDesc}
                      {shouldShowToggle && (
                        <>
                          {!isExpanded && '... '}
                          <button
                            onClick={() =>
                              setExpanded(prev => ({ ...prev, [p.id]: !isExpanded }))
                            }
                            className="underline text-xs ml-1"
                          >
                            {isExpanded ? 'Read less' : 'Read more'}
                          </button>
                        </>
                      )}
                    </p>
                    <p className="text-sm mb-1">Country: {p.country}</p>
                    <p className="text-sm mb-3">Since {p.since_year}</p>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block bg-white/10 backdrop-blur-md px-4 py-3 text-sm rounded-full hover:bg-white hover:text-black"
                    >
                      View MoU →
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* PROGRAMS */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-20 bg-white px-4 sm:px-6"
        >
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">{programs[0]?.title}</h2>
          <p className="text-center text-gray-800 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">{programs[0]?.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
            {programs.map((p, i) => (
              <motion.div
                key={p.id}
                className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-500 group"
                variants={fadeUp}
              >
                <div className="h-96 sm:h-125 w-full overflow-hidden bg-slate-900">
                  <img
                    src={programImages[i % programImages.length]}
                    alt={p.card_title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 p-5 sm:p-6 text-white">
                  <h3 className="text-lg font-bold mb-1">{p.card_title}</h3>
                  <p className="text-xs sm:text-sm mb-1">{p.card_desc}</p>
                  <p className="text-xs sm:text-sm mb-1">Duration: {p.duration}</p>
                  <p className="text-xs sm:text-sm mb-2">Participants: {p.participants}</p>
                  <ul className="text-xs sm:text-sm list-disc pl-4 opacity-80">
                    {p.benefits && p.benefits.split('\r\n').map((b, index) => <li key={index}>{b}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* OPPORTUNITIES */}
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-12 sm:py-20 bg-gray-100 px-4 sm:px-6"
        >
          <h2 className="text-center text-3xl sm:text-4xl font-extrabold mb-4">{opportunities[0]?.title}</h2>
          <p className="text-center text-gray-700 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">{opportunities[0]?.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto">
            {opportunities.map((o, i) => (
              <motion.div
                key={o.id}
                className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-2xl transition transform hover:-translate-y-2 duration-500 group"
                variants={fadeUp}
              >
                <div className="h-68 opacity-80 w-full overflow-hidden bg-slate-900">
                  <img
                    src={opportunityImages[i % opportunityImages.length]}
                    alt={o.card_title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 p-12 text-white">
                  <div className="flex justify-between items-center mb-2">
                    <Plane className="w-4 h-4 text-white" />
                    <span className="text-sm text-red-400">Deadline: {o.deadline ? new Date(o.deadline).toLocaleDateString() : 'N/A'}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{o.card_title}</h3>
                  <p className="text-sm mb-1">Duration: {o.duration}</p>
                  <p className="text-sm mb-1">Benefits: {o.benefits}</p>
                  <p className="text-sm mb-3">Eligibility: {o.elegibility}</p>
                  <a
                    href={o.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 text-sm rounded-full hover:text-black hover:bg-white"
                  >
                    {o.button_text}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        {cta && (
          <section className="py-20 px-4 text-center" style={{ backgroundColor: cta.background_color }}>
            <h2 className="text-3xl font-bold mb-2">{cta.title}</h2>
            <p className="text-gray-600 mb-4">{cta.description}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={cta.url1} className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700">{cta.button1_text}</a>
              <a href={"/contactUs"} className="border border-blue-600 text-blue-600 px-6 py-2 rounded-xl hover:bg-blue-50">{cta.button2_text}</a>
            </div>
          </section>
        )}
      </div>
    </SearchableWrapper>
  );
};

export default Collaboration;
