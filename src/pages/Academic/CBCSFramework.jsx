import React, { useState } from 'react';
import { BookOpen, Target, CheckCircle, GraduationCap, Star } from 'lucide-react';

import BannerSection from "../../components/HeroBanner.jsx";
import StatsCard from "../../components/StatsCard.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

// Static high-fidelity data representing GBU's actual Choice Based Credit System (CBCS)
const GBU_CBCS_HERO = {
  title: "Choice Based Credit System (CBCS)",
  description: "Gautam Buddha University adopts the Choice Based Credit System (CBCS) to offer students a diverse, flexible, and interdisciplinary academic experience, allowing them to choose courses matching their interests and career goals.",
  bgTheme: 7,
  credits_coount: 24, // Typical Credit Points per Semester
  elective_courses: 50, // Elective Courses offered across programs
  grading_scale: "10-Point", // 10-point scale
  flexebility: "High" // Choice Flexibility
};

const GBU_CBCS_WHAT = [
  {
    title: "Understanding CBCS at GBU",
    description: "The Choice Based Credit System (CBCS) provides a 'cafeteria' approach in which students can select courses of their choice from a wide array of core, elective, and capability enhancement courses, enabling holistic and interdisciplinary education.",
    card_title: "Core Courses",
    card_desc: "Mandatory subjects in the student's primary discipline that provide the foundational knowledge required for the degree."
  },
  {
    card_title: "Elective Courses",
    card_desc: "Flexible choices from within or outside the department, allowing students to specialize in niche areas or explore lateral disciplines."
  },
  {
    card_title: "Ability Enhancement",
    card_desc: "Skill-oriented courses including English communication, environmental science, and computer applications to boost employability."
  },
  {
    card_title: "Credit Accumulation",
    card_desc: "Students earn credits based on lectures, tutorials, and practical hours (L-T-P structure), which are easily transferable."
  }
];

const GBU_CBCS_GRADING = [
  {
    grade: "O",
    points: 10,
    percentage_range: "91% - 100%",
    description: "Outstanding",
    status: "Pass"
  },
  {
    grade: "A+",
    points: 9,
    percentage_range: "81% - 90%",
    description: "Excellent",
    status: "Pass"
  },
  {
    grade: "A",
    points: 8,
    percentage_range: "71% - 80%",
    description: "Very Good",
    status: "Pass"
  },
  {
    grade: "B+",
    points: 7,
    percentage_range: "61% - 70%",
    description: "Good",
    status: "Pass"
  },
  {
    grade: "B",
    points: 6,
    percentage_range: "51% - 60%",
    description: "Above Average",
    status: "Pass"
  },
  {
    grade: "C",
    points: 5,
    percentage_range: "41% - 50%",
    description: "Average",
    status: "Pass"
  },
  {
    grade: "P",
    points: 4,
    percentage_range: "40%",
    description: "Pass",
    status: "Pass"
  },
  {
    grade: "F",
    points: 0,
    percentage_range: "< 40%",
    description: "Fail",
    status: "Fail"
  },
  {
    grade: "Ab",
    points: 0,
    percentage_range: "Absent",
    description: "Absent",
    status: "Fail"
  }
];

const GBU_CBCS_BENEFITS = [
  {
    card_desc: "Allows students to choose interdisciplinary, intra-disciplinary, and skill-based courses according to their learning capabilities."
  },
  {
    card_desc: "Promotes student-centric education where learners can design their own curriculum combinations."
  },
  {
    card_desc: "Standardized 10-point grading system aligned with UGC guidelines makes it easier for employers and global universities to evaluate performance."
  },
  {
    card_desc: "Enables seamless credit transfer across different departments and schools within GBU."
  },
  {
    card_desc: "Facilitates global mobility as the credit-based semester system matches international academic standards."
  },
  {
    card_desc: "Equips students with primary degree knowledge alongside supplementary professional skill sets."
  }
];

const GBU_CBCS_EXPLORE = {
  title: "Explore Curriculum Details",
  description: "To view the complete school-wise course listings, detailed syllabi under the CBCS scheme, and credit rules, visit our academic ordinances portal.",
  button_text: "View Ordinances",
  url: "https://www.gbu.ac.in/",
  background_color: "#e0e7ff" // indigo-100
};

const CBCSFramework = () => {
  const [heroData, setHeroData] = useState(GBU_CBCS_HERO);
  const [whatData, setWhatData] = useState(GBU_CBCS_WHAT);
  const [grading, setGrading] = useState(GBU_CBCS_GRADING);
  const [benefits, setBenefits] = useState(GBU_CBCS_BENEFITS);
  const [explore, setExplore] = useState(GBU_CBCS_EXPLORE);

  const stats = [
    {
      title: "Credit Points per Semester",
      icon: GraduationCap,
      iconColor: "#2563eb",
      number: heroData.credits_coount || 0,
    },
    {
      numberText: heroData.elective_courses || 0,
      title: "Elective Courses",
      icon: BookOpen,
      iconColor: "#16a34a",
      number: heroData.elective_courses || 0,
    },
    {
      numberText: heroData.grading_scale,
      title: "Point Grading Scale",
      icon: Star,
      iconColor: "#7c3aed",
    },
    {
      numberText: `${heroData.flexebility}`,
      title: "Choice Flexibility",
      icon: Target,
      iconColor: "#ea580c",
      number: heroData.flexebility,
    },
  ];

  return (
    <SearchableWrapper>
      <>
        {/* Hero Section */}
        <BannerSection
          title={heroData.title}
          subtitle={heroData.description}
          bgTheme={heroData.bgTheme || 7}
        />

        {/* Statistics */}
        <StatsCard stats={stats} />

        {/* What is CBCS */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">{whatData[0]?.title}</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">{whatData[0]?.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.isArray(whatData) && whatData.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-2xl transition-shadow animate-fade-in">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{item.card_title}</h3>
                  <p className="text-gray-600">{item.card_desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grading System */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Grading System</h2>
              <p className="text-xl text-gray-600">10-point grading scale ensuring fair and transparent evaluation</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                <div className="grid grid-cols-5 bg-blue-600 text-white font-semibold text-center py-4">
                  <div>Grade</div>
                  <div>Points</div>
                  <div>Percentage</div>
                  <div>Description</div>
                  <div>Status</div>
                </div>
                {grading.map((grade, index) => (
                  <div key={index} className={`grid grid-cols-5 text-center py-3 border-b border-gray-200 ${grade.status === 'Fail' ? 'bg-red-50' : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="font-bold text-lg">{grade.grade}</div>
                    <div className="font-semibold text-blue-600">{grade.points}</div>
                    <div>{grade.percentage_range}</div>
                    <div className="font-medium">{grade.description}</div>
                    <div>
                      <span className={`font-semibold ${grade.status === 'Fail' ? 'text-red-600' : 'text-green-600'}`}>{grade.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Benefits of CBCS</h2>
              <p className="text-xl text-gray-600">Advantages of the Choice Based Credit System</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {benefits.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{item.card_desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        {explore && (
          <section className="py-16 text-black" style={{ backgroundColor: explore.background_color }}>
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold mb-6">{explore.title}</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">{explore.description}</p>
              <a
                href={explore.url}
                className="border border-b-blue-600 text-black px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {explore.button_text}
              </a>
            </div>
          </section>
        )}
      </>
    </SearchableWrapper>
  );
};

export default CBCSFramework;
