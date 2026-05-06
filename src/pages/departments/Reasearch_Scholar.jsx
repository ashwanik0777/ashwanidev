import React from "react";
import { motion } from "framer-motion";
import { Calendar, CheckCircle } from "lucide-react";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";
import { researchScholarsData } from "../../Data/schools/SOICT/research/research-scholars";

// Hero Section
const HeroSection = ({ title, subtitle }) => (
  <BannerSection
    title={title}
    subtitle={subtitle}
    bgTheme={3}
  />
);

// Stats Section
const StatsSection = ({ stats }) => (
  <StatsCard
    stats={stats.map((item) => ({
      icon: item.icon,
      number: item.count,
      subtitle: item.label,
    }))}  
  />
);

// Featured Scholars
const FeaturedScholars = ({ scholars }) => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Featured Research Scholars
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholars.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 + i * 0.2 }}
            className={`bg-gradient-to-br ${s.bg} p-6 rounded-xl`}
          >
            <div className="text-center mb-6">
              <div
                className={`w-24 h-24 ${s.avatarColor} rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold`}
              >
                {s.initials}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
              <p className={`font-semibold ${s.textColor}`}>{s.designation}</p>
              <p className="text-sm text-gray-600">{s.department}</p>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  Research Area:
                </h4>
                <p className="text-sm text-gray-600">{s.area}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {s.supervisorTitle}:
                </h4>
                <p className="text-sm text-gray-600">{s.supervisor}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {s.publicationsTitle}:
                </h4>
                <p className="text-sm text-gray-600">{s.publications}</p>
              </div>
            </div>

            <div className="bg-white p-3 rounded-lg">
              <p className="text-xs text-gray-600 font-semibold mb-1">
                {s.achievementTitle}:
              </p>
              <p className="text-xs text-gray-500">{s.achievement}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Research Areas Distribution
const DistributionSection = ({ departments, fellowships }) => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Research Areas Distribution
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Department-wise Scholar Distribution
          </h3>
          <div className="space-y-4">
            {departments.map((d, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 ${d.bg} rounded-lg`}
              >
                <div>
                  <h4 className="font-semibold text-gray-900">{d.name}</h4>
                  <p className="text-sm text-gray-600">{d.desc}</p>
                </div>
                <div className="text-right">
                  <span className={`text-2xl font-bold ${d.color}`}>
                    {d.count}
                  </span>
                  <p className="text-xs text-gray-500">Scholars</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Funding & Fellowship Status
          </h3>
          <div className="space-y-4">
            {fellowships.map((f, i) => (
              <div
                key={i}
                className={`border-l-4 ${f.border} pl-4`}
              >
                <h4 className="font-semibold text-gray-900">{f.name}</h4>
                <p className="text-sm text-gray-600">{f.detail}</p>
                <p className="text-xs text-gray-500">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Achievements
const AchievementsSection = ({ achievements }) => (
  <section className="py-16 px-4 bg-white">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-gray-900 mb-12 text-center"
      >
        Recent Achievements
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 + i * 0.2 }}
            className={`bg-gradient-to-br ${a.bg} p-6 rounded-xl`}
          >
            <a.icon className={`h-12 w-12 ${a.color} mb-4`} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">{a.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{a.desc}</p>
            <p className="text-xs text-gray-500">{a.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// Application Process
const ApplicationProcess = ({ timeline, fee }) => (
  <section className="py-16 px-4 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
        Join Our Research Community
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Ph.D. Admission Requirements
          </h3>
          <ul className="space-y-4">
            {[
              {
                title: "Educational Qualification",
                desc:
                  "M.Tech/M.E./M.S. in relevant field with minimum 60% marks",
              },
              {
                title: "Entrance Test",
                desc: "GATE/NET qualified or TechVision Research Aptitude Test",
              },
              {
                title: "Research Proposal",
                desc: "2-3 page research proposal in chosen area",
              },
              {
                title: "Interview",
                desc: "Technical interview with potential supervisors",
              },
            ].map((r, i) => (
              <li key={i} className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">{r.title}:</strong>
                  <p className="text-sm text-gray-600">{r.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Application Timeline
          </h3>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-center">
                <Calendar className={`h-6 w-6 ${t.color} mr-3`} />
                <div>
                  <strong className="text-gray-900">{t.title}:</strong>
                  <p className="text-sm text-gray-600">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Application Fee:</strong> {fee.application}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Annual Fee:</strong> {fee.annual}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Contact
const ContactSection = ({ contacts }) => (
  <section className="py-16 px-4 text-gray-900 bg-white">
    <div className="max-w-7xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-8">
        Connect with Our Research Community
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contacts.map((c, i) => (
          <div key={i} className="shadow-2xl p-5 rounded-2xl border-gray-300 border-[1px] border-solid">
            <c.icon className={`h-12 w-12 ${c.color} mx-auto mb-4`} />
            <h3 className="text-xl font-semibold mb-2">{c.title}</h3>
            <p >{c.email}</p>
            <p >{c.phone}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const {
  hero,
  stats,
  scholars,
  departments,
  fellowships,
  achievements,
  timeline,
  fee,
  contacts,
} = researchScholarsData;



// Main Parent
export default function ResearchScholars() {
   return (
    <div className="min-h-screen">
      <HeroSection
        title={hero.title}
        subtitle={hero.subtitle}
      />
      <StatsSection stats={stats} />
      <FeaturedScholars scholars={scholars} />
      <DistributionSection departments={departments} fellowships={fellowships} />
      <AchievementsSection achievements={achievements} />
      <ApplicationProcess timeline={timeline} fee={fee} />
      <ContactSection contacts={contacts} />
    </div>
  );
}
