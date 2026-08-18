import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  Brain,
  Zap,
  Users,
  Award,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

import droneImage from "../../assets/Drone.png";
import raemImage from "../../assets/Raem.png";
import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// ✅ Local icon map for dynamic matching
const iconMap = {
  'cyber security': Shield,
  'artificial intelligence': Brain,
  'drone technologies': Zap,
  'drone technology': Zap,
  'data science': Brain,
  'robotics': Zap,
};

// Data for Centers of Excellence sourced from GBURIF (https://gburif.org/coe.php)
const GBU_COE_HERO = {
  title: "Centers of Excellence (CoE)",
  description: "Specialized state-of-the-art research laboratories established under Gautam Buddha University Research & Innovation Foundation (GBURIF) and AIC-GBU, driving advanced research in Drone Technologies, Renewable Energy, and Artificial Intelligence.",
  bgTheme: 6,
  coe_count: 2,
  ResearchAndstudents: 220,
  projects_count: 15,
  memberrs_count: 24
};

const GBU_COE_LIST = [
  {
    id: 1,
    title: "drone technology",
    card_title: "Center of Excellence in Drone Technologies (CEDT)",
    card_desc: "A DGCA-certified training and research facility featuring advanced drone design, assembly, maintenance, and flight testing laboratories. The center specializes in UAV research, autonomous flight algorithms, and professional drone pilot training.",
    faculty_count: 8,
    student_count: 75,
    project_count: 6,
    director: "Dr. Vimlesh Kumar",
    link: "/schools/SOICT/departments/coedt",
    image: droneImage
  },
  {
    id: 2,
    title: "renewable energy",
    card_title: "Center of Excellence in Renewable Energy & Advanced Manufacturing (REAM)",
    card_desc: "Dedicated to the future of energy and sustainable transportation, focusing on solar-wind microgrids, EV battery management systems, fast-charging technologies, thermal protection materials, and additive manufacturing.",
    faculty_count: 7,
    student_count: 60,
    project_count: 5,
    director: "Dr. Anurag Singh Bhagat",
    link: "/schools/SOICT/departments/raem",
    image: raemImage
  },
  {
    id: 3,
    title: "artificial intelligence",
    card_title: "Center of Excellence in Artificial Intelligence & Robotics (CoE-AI)",
    card_desc: "Focuses on developing cutting-edge AI, machine learning, and deep learning solutions. The center collaborates with industry leaders, fostering research in computer vision, NLP voice-interactive humanoid robots, and predictive systems.",
    faculty_count: 9,
    student_count: 85,
    project_count: 7,
    director: "Dr. Vidushi Sharma",
    link: "https://gburif.org/coe.php",
    image: "/coe_ai_robotics.png",
    hidden: true
  }
];

const GBU_COE_GALLERY = [
  {
    src: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80",
    caption: "UAV Flight Testing & Training Session at CEDT Field",
    alt: "Drone technology"
  },
  {
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    caption: "Cyber Security and Digital Forensics Laboratory",
    alt: "Cyber security"
  },
  {
    src: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
    caption: "Deep Learning Model Training in AI Lab",
    alt: "Artificial intelligence"
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    caption: "Data Analytics and High Performance Computing Lab",
    alt: "Data science"
  },
  {
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    caption: "Autonomous Robot Prototype Testing in Robotics Lab",
    alt: "Robotics"
  },
  {
    src: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    caption: "Electric Vehicle Drivetrain & Battery Testing Facility",
    alt: "Alternative energy mobility"
  }
];

const GBU_COE_CTA = {
  title: "Join Our Centers of Excellence",
  description: "Collaborate with our researchers, faculty, and industry partners to drive next-generation innovation and research in computing, intelligence, and mobility.",
  url1: "https://www.gbu.ac.in/",
  button1_text: "Apply for Research",
  url2: "https://www.gbu.ac.in/",
  button2_text: "Contact COE Office"
};

const CentersOfExcellence = () => {
  const [heroData, setHeroData] = useState(GBU_COE_HERO);
  const [centers, setCenters] = useState(GBU_COE_LIST);
  const [galleryImages, setGalleryImages] = useState(GBU_COE_GALLERY);
  const [ctaData, setCtaData] = useState(GBU_COE_CTA);

  const stats = [
    {
      number: heroData.coe_count || 0,
      title: "Centers of Excellence",
      icon: Award,
      iconColor: "#7c3aed",
    },
    {
      number: heroData.ResearchAndstudents || 0,
      numberText: `${heroData.ResearchAndstudents}+`,
      title: "Researchers & Students",
      icon: Users,
      iconColor: "#2563eb",
    },
    {
      number: heroData.projects_count || 0,
      numberText: `${heroData.projects_count}+`,
      title: "Research Projects",
      icon: BookOpen,
      iconColor: "#16a34a",
    },
    {
      number: heroData.memberrs_count || 0,
      title: "Faculty Members",
      icon: Shield,
      iconColor: "#f97316",
    },
  ];

  return (
    <SearchableWrapper>
      <>
        {/* Hero Section */}
        <BannerSection
          title={heroData.title}
          subtitle={heroData.description}
          bgTheme={heroData.bgTheme || 6}
        />

        {/* Statistics */}
        <StatsCard stats={stats} />

        {/* Centers Grid */}
        <section className="py-10 md:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Centers of Excellence</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our centers drive excellence in research, technology, and societal impact through interdisciplinary collaboration and innovation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
              {centers.filter((c) => !c.hidden).map((center) => {
                const IconComponent =
                  iconMap[(center.title || "").toLowerCase()] || Shield;

                return (
                  <div
                    key={center.id}
                    className="bg-white rounded-3xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group animate-fade-in"
                  >
                    <div className="h-52 relative bg-gradient-to-br from-slate-800 to-gray-900 overflow-hidden flex items-center justify-center">
                      {center.image ? (
                        <img
                          src={center.image}
                          alt={center.card_title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <IconComponent className="w-16 h-16 text-white z-10" />
                      )}
                    </div>

                    <div className="p-5 md:p-6">
                      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                        {center.card_title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {center.card_desc}
                      </p>

                      <div className="grid grid-cols-3 gap-4 text-center mb-4">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {center.faculty_count}
                          </div>
                          <div className="text-xs text-gray-500">Faculty</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {center.student_count}
                          </div>
                          <div className="text-xs text-gray-500">Students</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-purple-600">
                            {center.project_count}
                          </div>
                          <div className="text-xs text-gray-500">Projects</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-end pt-3 border-t border-gray-100 mt-3">
                        {(center.link || "").startsWith("/") || center.id === 1 ? (
                          <Link
                            to={center.id === 1 ? "/schools/SOICT/departments/coedt" : center.link}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            CoE Portal <ArrowRight size={12} />
                          </Link>
                        ) : (
                          <a
                            href={center.link || "https://gburif.org/coe.php"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2.5 py-1.5 rounded-lg transition-all"
                          >
                            CoE Portal <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Gallery of Excellence
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore moments of innovation, collaboration, and brilliance captured from across our Centers of Excellence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm backdrop-blur-sm">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-10 md:py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-6">{ctaData.title}</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
              {ctaData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href={ctaData.url1}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-all text-center w-full sm:w-auto"
              >
                {ctaData.button1_text}
              </a>
              <a
                href={ctaData.url2}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-purple-600 border-solid text-purple-600 px-8 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all text-center w-full sm:w-auto"
              >
                {ctaData.button2_text}
              </a>
            </div>
          </div>
        </section>
      </>
    </SearchableWrapper>
  );
};

export default CentersOfExcellence;
