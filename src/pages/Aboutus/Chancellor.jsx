import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Download, Building2, BookOpen, GraduationCap, ShieldCheck, Sparkles, Award, Compass, HeartHandshake } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

const Chancellor = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  const tabContent = {
    Overview: {
      title: "Executive Profile & Overview",
      content: (
        <div className="space-y-6">
          <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
            Shri Yogi Adityanath is the Hon'ble Chief Minister of Uttar Pradesh and Hon'ble Chancellor of Gautam Buddha University. A five-time Member of Parliament (12th, 13th, 14th, 15th, and 16th Lok Sabha) from Gorakhpur, he has been leading Uttar Pradesh since March 19, 2017. He was elected to the UP Legislative Council in 2017 and to the UP Legislative Assembly in 2022.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm mb-1">
                <Building2 className="w-4 h-4" />
                Monastic & Institutional Head
              </div>
              <p className="text-xs text-gray-600">
                Successor of Gorakshpeeth (1994) and Peethadheeshwar of Gorakshpeeth since September 2014. Manages over 30+ educational, medical, and technical institutions.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                <ShieldCheck className="w-4 h-4" />
                Parliamentary Service
              </div>
              <p className="text-xs text-gray-600">
                Served on Standing Committees for Home Affairs, Food & Civil Supplies, External Affairs, Transport, Tourism & Culture, and Chairperson of Joint Committee on Salaries & Allowances of MPs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="https://www.gbu.ac.in/Content/gbudata/about/Profile_ShYogiAdityanath_latest.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download CV</span>
            </a>
          </div>
        </div>
      )
    },
    Political_Career: {
      title: "Parliamentary & Political Career",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-600" />
              Five-Term Lok Sabha Member & Chief Minister
            </h4>
            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 text-sm">Chief Minister of Uttar Pradesh</h5>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">2017–Present</span>
                </div>
                <p className="text-xs text-gray-600">Took oath on March 19, 2017. Re-elected in 2022 as Member of Legislative Assembly.</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div className="flex justify-between items-start">
                  <h5 className="font-semibold text-gray-900 text-sm">5-Time Member of Parliament (Lok Sabha)</h5>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">1998–2017</span>
                </div>
                <p className="text-xs text-gray-600">Elected to 12th (1998), 13th (1999), 14th (2004), 15th (2009), and 16th (2014) Lok Sabha from Gorakhpur constituency.</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              Key Parliamentary Committees Served
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                <span><strong>Chairperson:</strong> Joint Committee on Salaries and Allowances of Members of Parliament (16th Lok Sabha).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                <span><strong>Member:</strong> Consultative Committee, Ministry of Home Affairs (12th, 13th, 14th, 15th, 16th Lok Sabha).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0"></span>
                <span><strong>Member:</strong> Standing Committee on Transport, Tourism and Culture; Public Undertakings; External Affairs; Food & Civil Supplies.</span>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    Institutions_Social: {
      title: "Institutional Leadership, Social & Cultural Contributions",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-600" />
              President / Managerial Leadership in Educational & Healthcare Trusts
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 mb-3">
              Manages and leads over 30+ prominent educational institutions, colleges, hospitals, and charitable trusts across Uttar Pradesh and Uttarakhand, including:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                <span className="font-bold text-amber-900">Maharana Pratap Shiksha Parishad, Gorakhpur:</span> Leading educational movement managing colleges & schools.
              </div>
              <div className="bg-teal-50/60 p-3 rounded-xl border border-teal-200">
                <span className="font-bold text-teal-900">Guru Shri Gorakhnath Hospital & Medical Sciences:</span> Charitable healthcare and medical institute in Gorakhpur.
              </div>
              <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200">
                <span className="font-bold text-blue-900">Gorakshnath Sanskrit Vidyapeeth & Schools:</span> Promoting traditional Vedic & Sanskrit education.
              </div>
              <div className="bg-purple-50/60 p-3 rounded-xl border border-purple-200">
                <span className="font-bold text-purple-900">Vishwa Hindu Maha Sangh & Gau Raksha Samiti:</span> National social security, cow protection, and rural welfare initiatives.
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-base mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-teal-600" />
              Published Books & Publications
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs sm:text-sm text-slate-700">
              <p><strong>Published Books:</strong> <em>‘Yaugik Shatkarm’</em>, <em>‘Hathayog: Swaroop evam Sadhna’</em>, <em>‘Hindu Rashtra Nepal: Atit, Vartmaan evam Bhavisya’</em>, and <em>‘Rajyog: Swaroop evam Sadhana’</em>.</p>
              <p><strong>Chief Editor:</strong> Hindi Weekly Newspaper and Monthly Spiritual Magazine <em>‘Yogvani’</em>.</p>
            </div>
          </div>
        </div>
      )
    },
    Vision: {
      title: "Leadership Vision & Institutional Mandate",
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
            Gautam Buddha University stands as a beacon of knowledge, innovation, and inclusivity, committed to shaping the future of education, research, and societal transformation grounded in ethics and holistic progress.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
              <h5 className="font-bold text-amber-900 text-sm mb-1">State Modernization</h5>
              <p className="text-xs text-amber-800">Transforming UP into a trillion-dollar economy with world-class expressways, airports, and IT hubs.</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
              <h5 className="font-bold text-teal-900 text-sm mb-1">Holistic Education</h5>
              <p className="text-xs text-teal-800">Integrating modern scientific know-how with ancient wisdom, ethics, and skill development.</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h5 className="font-bold text-blue-900 text-sm mb-1">Cultural & Social Ethos</h5>
              <p className="text-xs text-blue-800">Promoting social harmony, rural healthcare, women empowerment, and preserving cultural heritage.</p>
            </div>
          </div>
        </div>
      )
    }
  };

  const tabButtons = [
    { id: 'Overview', label: 'Overview' },
    { id: 'Political_Career', label: 'Political & Parliamentary Career' },
    { id: 'Institutions_Social', label: 'Institutions & Publications' },
    { id: 'Vision', label: 'Vision' }
  ];

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Banner */}
        <BannerSection
          title="Chancellor's Message"
          subtitle="Leadership Vision for Academic Excellence"
          bgTheme={3}
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
          
          {/* Top Profile & Message Box */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start mb-8 sm:mb-12">
            
            {/* Chancellor Card */}
            <div className="w-full lg:w-1/3 shrink-0">
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-slate-200 text-center">
                <div className="w-full max-w-[200px] sm:max-w-[250px] h-[250px] sm:h-[320px] mx-auto mb-3.5 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden shadow-md ring-4 ring-amber-500/15 border border-amber-500/20">
                  <img
                    src="/assets/Yogiji.jpg"
                    alt="Shri Yogi Adityanath"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <span className="inline-block bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full border border-amber-100 mb-1.5 sm:mb-2">
                  Hon'ble Chancellor
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">Shri Yogi Adityanath</h3>
                <p className="text-xs sm:text-sm font-semibold text-amber-700 mt-1">Hon'ble Chief Minister</p>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 font-medium">Government of Uttar Pradesh</p>
                <p className="text-[11px] sm:text-xs font-semibold text-slate-600 mt-1 italic">Peethadheeshwar, Gorakshpeeth</p>
              </div>
            </div>

            {/* Message Narrative */}
            <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-3xl sm:text-4xl text-amber-600 font-serif leading-none mb-2">"</div>
                <div className="space-y-3 sm:space-y-4 text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
                  <p>
                    Education is the most powerful weapon which can change the world and transform society. At Gautam Buddha University, we are committed to providing world-class education that nurtures both intellectual growth and moral values.
                  </p>
                  <p>
                    Our vision extends beyond traditional education. We aim to create an ecosystem where innovation thrives, research flourishes, and students emerge as global leaders equipped with knowledge, skills, and ethical foundations.
                  </p>
                  <p>
                    The university stands as a beacon of hope and progress, fostering an environment where diverse minds collaborate to address contemporary challenges and build a sustainable future for our nation and the world.
                  </p>
                </div>
                <div className="text-3xl sm:text-4xl text-amber-600 font-serif leading-none text-right mt-1 sm:mt-2">"</div>
              </div>
              <div className="mt-4 text-right border-t border-slate-100 pt-3 sm:pt-4">
                <p className="text-sm sm:text-base font-bold text-amber-800">Shri Yogi Adityanath</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Hon'ble Chief Minister, Uttar Pradesh & Chancellor, GBU</p>
              </div>
            </div>

          </div>

          {/* Know the Chancellor Section */}
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center mb-4 sm:mb-6 text-slate-800">
              Profile & Leadership Details
            </h2>

            {/* Custom Responsive Tabs (No Truncation) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center mb-6 max-w-full">
              {tabButtons.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-amber-600 text-white shadow-md shadow-amber-500/20 scale-[1.02]"
                        : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-sm"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content Panel */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 sm:p-6 lg:p-8">
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 mb-3 sm:mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                {tabContent[activeTab].title}
              </h3>
              <div>
                {tabContent[activeTab].content}
              </div>
            </div>

          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Chancellor;
