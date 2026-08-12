import React from 'react';
import { Quote, Sparkles, Compass, Lightbulb, Target } from 'lucide-react';
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import BannerSection from "../../components/HeroBanner.jsx";

const StrategicPerspective = () => {
  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/20 to-slate-100">
        {/* Banner */}
        <BannerSection
          title="GBU: A Strategic Perspective"
          subtitle="Transformative Vision, Academic Innovation & National Ethos"
          bgTheme={2}
        />

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          
          {/* Top Leaders & Quote Card (Clean Bright Executive Theme) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden mb-8 sm:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              
              {/* Leadership Photo Section (Mobile Responsive High-Focus Layout) */}
              <div className="lg:col-span-5 bg-slate-50/90 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 sm:mb-6">
                    <div className="p-1.5 sm:p-2 bg-teal-50 text-[#008c95] rounded-lg sm:rounded-xl border border-teal-100 shrink-0">
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                      University Leadership
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 sm:gap-6 text-center">
                    {/* Chancellor Profile */}
                    <div className="group bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                      <div className="w-full max-w-[130px] sm:max-w-[150px] aspect-[3/4] mx-auto mb-2.5 sm:mb-3 rounded-lg sm:rounded-xl overflow-hidden shadow-md ring-2 ring-teal-500/20 group-hover:ring-[#008c95] transition-all duration-300">
                        <img
                          src="/assets/Yogiji.jpg"
                          alt="Sh. Yogi Adityanath"
                          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-extrabold text-xs sm:text-base text-slate-900 group-hover:text-[#008c95] transition-colors leading-tight">
                        Sh. Yogi Adityanath
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#008c95] mt-1">Hon'ble Chancellor</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">Gautam Buddha University</p>
                    </div>

                    {/* Vice Chancellor Profile */}
                    <div className="group bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center">
                      <div className="w-full max-w-[130px] sm:max-w-[150px] aspect-[3/4] mx-auto mb-2.5 sm:mb-3 rounded-lg sm:rounded-xl overflow-hidden shadow-md ring-2 ring-teal-500/20 group-hover:ring-[#008c95] transition-all duration-300">
                        <img
                          src="/assets/prof.jpeg"
                          alt="Prof. Rana Pratap Singh"
                          className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h3 className="font-extrabold text-xs sm:text-base text-slate-900 group-hover:text-[#008c95] transition-colors leading-tight">
                        Prof. Rana Pratap Singh
                      </h3>
                      <p className="text-[11px] sm:text-xs font-semibold text-[#008c95] mt-1">Vice-Chancellor</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-medium leading-tight">Gautam Buddha University</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200/80 text-center">
                  <p className="text-[11px] sm:text-xs text-slate-600 italic font-medium">
                    Guiding GBU towards international benchmarks of academic excellence.
                  </p>
                </div>
              </div>

              {/* Strategic Vision Quote Box */}
              <div className="lg:col-span-7 p-5 sm:p-8 lg:p-12 flex flex-col justify-between bg-white relative">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <Quote className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-[#008c95]/30" />
                    <span className="bg-teal-50 text-[#008c95] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-teal-100">
                      Institutional Mission Statement
                    </span>
                  </div>

                  <blockquote className="text-slate-800 text-sm sm:text-base lg:text-lg font-medium leading-relaxed sm:leading-loose italic mb-6 sm:mb-8 relative z-10">
                    "Education in its truest sense is our foremost mission. At Gautam Buddha University, dreamers become thinkers, achievers, solvers, pioneers, and influencers. We are devoted to assisting our students in enduring imperishable intellectual, societal and individual transformation. There is phenomenal potential in our students. We stimulate their vision and empower them to actualize their vigour by infusing experiential, experimental and inter-disciplinary learning in a research environment."
                  </blockquote>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-6 sm:w-8 h-1 bg-[#008c95] rounded-full shrink-0"></div>
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                    Gautam Buddha University Strategic Perspective
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Narrative Content */}
          <div className="space-y-6 sm:space-y-8">
            
            {/* Section 1 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-teal-50 text-teal-700 rounded-xl sm:rounded-2xl border border-teal-100 shrink-0">
                  <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 leading-snug">
                  Socio-Cultural Value Enrichment & Skill Development
                </h2>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
                Education is essential for enriching our socio-cultural values and facilitating the overall scientific and technological development as well as to sustain growth and prosperity in the economy. It is also a potent and purposive intervention to advance scientific and technical know-how, object-oriented learning and utilitarian skills. Furthermore, we intend to consolidate moral values to enhance individual and social commitments. Therefore, our focus would be on creating an enabling atmosphere to develop skills that reinforce one’s faith in the self and shape generations’ individual and societal behaviour.
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-indigo-50 text-indigo-700 rounded-xl sm:rounded-2xl border border-indigo-100 shrink-0">
                  <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 leading-snug">
                  Mastering 4IR Breakthroughs & Philosophical Wisdom
                </h2>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify mb-4">
                In the wake of the Fourth Industrial Revolution (4IR), our education system needs to master various emerging breakthroughs in technology and cope with social and economic changes. A host of new disciplines like data science, robotics, artificial intelligence, business informatics, nanotechnology, quantum computing, genomics, biotechnology, the Internet of Things, the Industrial Internet of Things, fifth-generation wireless technologies, precision drones, additive manufacturing/ 3D printing and evolution of fully autonomous, self-driven and alternative energy vehicles are going to disrupt almost every industry into every country.
              </p>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
                On the economic front, after experiencing the full cycle of globalization, we are now at the threshold of de-globalization. The ongoing strife in social and other spheres of life can best be resolved through our rich philosophical traditions of Buddhism and the ancient wisdom enshrined into our scriptures since the Vedic age and other sources of rich heritage.
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="p-2.5 sm:p-3 bg-amber-50 text-amber-700 rounded-xl sm:rounded-2xl border border-amber-100 shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-slate-800 leading-snug">
                  Commitment to Quality & Global Benchmarks
                </h2>
              </div>
              <p className="text-slate-700 text-xs sm:text-sm lg:text-base leading-relaxed text-left sm:text-justify">
                So, we at the GBU have a firm resolve to attain and outpace various international benchmarks of quality and innovativeness in education. We are committed to infusing education with our rich heritage, ancient wisdom and national ethos, along with an emphasis to integrate ethics & values in the conduct and behaviour of our graduating students. Indeed, at the GBU, we have sustained commitment to all these goals.
              </p>
            </div>

          </div>

        </div>
      </div>
    </SearchableWrapper>
  );
};

export default StrategicPerspective;
