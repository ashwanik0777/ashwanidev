import React from "react";
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  User,
  Flower,
  Moon,
  Users,
  ChevronRight,
  Mail
} from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import ImageGallery from "./ImageGallery";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

import img1 from "../../assets/meditation/image1.png";
import img2 from "../../assets/meditation/image2.png";
import img3 from "../../assets/meditation/image3.png";
import img4 from "../../assets/meditation/image4.png";
import img5 from "../../assets/meditation/image5.png";
import img6 from "../../assets/meditation/image6.png";
import img7 from "../../assets/meditation/image7.png";
import img8 from "../../assets/meditation/image8.png";
import img9 from "../../assets/meditation/image9.png";
import img10 from "../../assets/meditation/image10.png";
import img11 from "../../assets/meditation/image11.png";
import img12 from "../../assets/meditation/image12.png";

const images = [
  img1, img2, img3, img4, img5, img6,
  img7, img8, img9, img10, img11, img12
];

const MeditationCenter = () => {
  const facultyData = {
    name: "Dr. Manish T. Meshram",
    position: "Assistant Professor & In-charge, Meditation Centre",
    school: "School of Buddhist Studies and Civilization",
    bio: "Dedicated practitioner and teacher of Buddhist meditation with extensive experience in guiding students toward inner peace, mindfulness, and self-management.",
    achievements: [
      "Ordained into Triratna Buddhist Order since 2006",
      "Published 60+ research papers on Buddhist Philosophy & Meditation",
      "Author of books on Buddhist Meditation techniques",
      "Guided 1000+ students through Bodhi Mindfulness Meditation"
    ],
    email: "manishtmeshram@gbu.ac.in"
  };

  const scheduleData = [
    {
      sno: 1,
      days: "Every Monday & Thursday",
      course: "Bodhi Meditation course for beginners",
      time: "5.00-6.00 PM",
      practitioners: "GBU Students only",
    },
    {
      sno: 2,
      days: "Every Friday",
      course: 'Advance Course on "Bodhi Meditation for Trainers"',
      time: "4.00-5.00 PM",
      practitioners: "BMC Members only",
    },
    {
      sno: 3,
      days: "Every 2nd Sunday of the month",
      course: "Basic Mindfulness Meditation Practices",
      time: "8.00-9.00 AM",
      practitioners: "GBU Family Members",
    },
    {
      sno: 4,
      days: "Every 4th Saturday of the month",
      course: 'Day Workshop on "Bodhi Meditation" With Sub-Theme : Personality Development; Motivation; Effective Study & Student Career',
      time: "2.00-5.30 PM",
      practitioners: "Open to All",
    },
    {
      sno: 5,
      days: "On Festival Holidays",
      course: 'One Day Retreat on "Study & Practices of Buddhist Meditation"',
      time: "10.00 AM to 5.00 PM",
      practitioners: "Advanced Practitioners",
    },
    {
      sno: 6,
      days: "In Winter/Summer Vacations",
      course: 'One Day Camp on "Mindfulness Training for School Children"',
      time: "10.00 AM to 4.00 PM",
      practitioners: "Open for school students",
    },
    {
      sno: 7,
      days: "End of the Even session",
      course: 'Two days Retreat on "Vipassana Meditation : Theory & Practices"',
      time: "Two Days",
      practitioners: "GBU Students",
    },
  ];

  const historyPoints = [
    {
      title: "Stupa Architectural Inspiration",
      text: "Inspired by classical stupa architecture, the center was constructed as a tranquil learning and retreat sanctuary to provide an experience of inner silence.",
      icon: Flower
    },
    {
      title: "School of Buddhist Studies Collaboration",
      text: "Operates under the guidance of the School of Buddhist Studies and Civilization (SoBSC) to deliver structured mindfulness courses.",
      icon: BookOpen
    },
    {
      title: "Vipassana & Bodhi Practices",
      text: "Offers practical mindfulness courses based on Vipassana techniques, helping campus residents cultivate self-awareness and peace.",
      icon: Moon
    },
    {
      title: "Mindfulness Growth Since 2013",
      text: "Over 950+ students from various academic schools have participated in structured Bodhi meditation programs since 2013.",
      icon: Users
    }
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 font-sans text-left pb-16">
        {/* Banner Section */}
        <BannerSection
          title="Mahatma Jyotiba Phule Dhyan Kendra"
          subtitle="Gautam Buddha University Meditation & Retreat Center"
          bgTheme={10}
        />

        {/* Main Single Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

          {/* Section 1: ABOUT */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-amber-500 shrink-0" />
              About Mahatma Jyotiba Phule Dhyan Kendra
            </h2>
            <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-8"></div>

            <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed">
              <p>
                In addition to regular academic curricula, Gautam Buddha University has established the <strong>Mahatma Jyotiba Phule Dhyan Kendra</strong>. Inspired by classical stupa architecture, the center serves as a retreat and learning sanctuary designed to give students, faculty, and campus residents a direct experience of inner peace and silence.
              </p>
              <p>
                The center regularly organizes seminars, lectures, and experiential workshops focusing on meditation, positive values, stress-free living, and self-management.
              </p>
              <p>
                It aims to help campus residents recognize their inherent qualities, reduce academic stress, and unlock their innermost potential through guided mindfulness and silence.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
              <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-100">
                <h4 className="font-bold text-amber-900 text-lg mb-2">Inner Peace</h4>
                <p className="text-sm text-amber-800/80">Experience deep silence and mental clarity through guided meditation sessions.</p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100">
                <h4 className="font-bold text-blue-900 text-lg mb-2">Stress Management</h4>
                <p className="text-sm text-blue-800/80">Workshops tailored to help students manage academic pressure and anxiety.</p>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-lg mb-2">Self Development</h4>
                <p className="text-sm text-emerald-800/80">Fostering positive values, emotional resilience, and personal growth.</p>
              </div>
            </div>
          </section>

          {/* Section 2: HISTORY */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 shrink-0" />
              History & Philosophy of Bodhi Meditation
            </h2>
            <div className="w-20 h-1.5 bg-indigo-600 rounded-full mb-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {historyPoints.map((point, index) => {
                const IconComp = point.icon;
                return (
                  <div key={index} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <IconComp size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg mb-2">{point.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{point.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: MEDITATION PROGRAMME SCHEDULE TABLE */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
              <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-600 shrink-0" />
              Bodhi Meditation Course/Programme Schedule
            </h2>
            <div className="w-20 h-1.5 bg-amber-500 rounded-full mb-8"></div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-4 px-4 border-b border-slate-800 text-center w-16">S.No.</th>
                    <th className="py-4 px-6 border-b border-slate-800">Days/Month</th>
                    <th className="py-4 px-6 border-b border-slate-800">Types of Course/Programmes</th>
                    <th className="py-4 px-6 border-b border-slate-800">Time Duration</th>
                    <th className="py-4 px-6 border-b border-slate-800">Practitioners</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {scheduleData.map((row, idx) => (
                    <tr key={row.sno} className={idx % 2 === 1 ? "bg-slate-50/70 hover:bg-slate-100/80 transition-colors" : "bg-white hover:bg-slate-50 transition-colors"}>
                      <td className="py-4 px-4 text-center font-bold text-slate-500">{row.sno}.</td>
                      <td className="py-4 px-6 font-semibold text-slate-900">{row.days}</td>
                      <td className="py-4 px-6 font-medium text-slate-800">{row.course}</td>
                      <td className="py-4 px-6 font-semibold text-emerald-700 whitespace-nowrap">{row.time}</td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                          {row.practitioners}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="block md:hidden space-y-4">
              {scheduleData.map((row) => (
                <div key={row.sno} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/80 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      #{row.sno}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900">
                      {row.practitioners}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base leading-snug">{row.course}</h4>
                  <div className="pt-2 border-t border-slate-200/80 flex flex-col gap-1.5 text-xs text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold text-slate-800">{row.days}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-400 shrink-0" />
                      <span className="font-semibold text-emerald-700">{row.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: FACULTY */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 flex items-center gap-3">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600 shrink-0" />
              Faculty In-Charge & Leadership
            </h2>
            <div className="w-20 h-1.5 bg-blue-600 rounded-full mb-8"></div>

            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{facultyData.name}</h3>
              <p className="text-blue-700 font-semibold text-sm mb-1">{facultyData.position}</p>
              <p className="text-slate-500 text-xs mb-4">{facultyData.school}</p>

              <p className="text-slate-700 text-sm leading-relaxed mb-6">{facultyData.bio}</p>

              <h4 className="font-bold text-slate-900 text-sm mb-3">Key Highlights & Accomplishments:</h4>
              <ul className="space-y-2 mb-6">
                {facultyData.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                    <ChevronRight size={14} className="text-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Mail size={14} className="text-blue-600" />
                <a href={`mailto:${facultyData.email}`} className="text-blue-600 hover:underline">
                  {facultyData.email}
                </a>
              </div>
            </div>
          </section>

          {/* Section 5: PHOTO GALLERY */}
          <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 border border-slate-100 shadow-md overflow-hidden">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8 text-center">
              Meditation Center Photo Gallery
            </h2>
            <ImageGallery images={images} autoPlayInterval={4000} />
          </section>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default MeditationCenter;
