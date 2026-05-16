import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner";
import StatsCard from "../../components/StatsCard";

/* -------------------------- Data Definitions -------------------------- */

/* ---------------------------- Components ---------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const Hero = ({ data }) => (
 <BannerSection
    title={data.title}
    subtitle={data.description}
    bgTheme={1}
  />
);

const Stats = ({ data }) => (
  <StatsCard 
    stats={data.map((item) => ({
      icon: item.icon,
      ...(typeof item.value === 'string' 
        ? { numberText: item.value } 
        : { number: item.value }),
      subtitle: item.label
    }))}
  />
);

const OngoingProjects = ({ projects }) => (
  <motion.section
    className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-purple-50"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Ongoing Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-xl shadow-lg bg-gradient-to-br ${proj.gradient} hover:shadow-xl transition-all`}
            whileHover={{ scale: 1.03 }}
          >
            <span className="text-sm bg-black/10 text-black px-2 py-1 rounded-full inline-block mb-2">
              {proj.tag}
            </span>
            <h4 className="text-xl font-bold mb-2">{proj.title}</h4>
            <p className="text-gray-700 mb-4">{proj.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Duration: {proj.duration}</p>
              <p>Team: {proj.team}</p>
              <p>Funding: {proj.grant}</p>
              <p>PI: {proj.pi} ({proj.department})</p>
              <p>Progress: {proj.progress}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const ProjectCategories = ({ categories }) => (
  <motion.section
    className="py-16 px-4 bg-white"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Project Categories</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${cat.bg} mb-4`}>
              <cat.icon className={`${cat.iconColor} w-6 h-6`} />
            </div>
            <h4 className="text-xl font-bold mb-2">{cat.title}</h4>
            <ul className="text-gray-600 mb-4 space-y-1">
              {cat.items.map((item, idx) => (
                <li key={idx}>
                  {item.label}: <span className="font-semibold">{item.value}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-gray-700">
              Total Funding: {cat.totalFunding}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const CompletedProjects = ({ projects }) => (
  <motion.section
    className="py-16 px-4 bg-gradient-to-br from-purple-50 to-pink-50"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Completed Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
            whileHover={{ scale: 1.02 }}
          >
            <proj.icon className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="text-xl font-bold mb-2">{proj.title}</h4>
            <p className="text-gray-700 mb-2">{proj.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Duration: {proj.duration}</p>
              <p>Funding: {proj.funding}</p>
              <p>PI: {proj.pi}</p>
              <p>Publications: {proj.publications}</p>
              <p>Impact: {proj.impact}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const UpcomingProjects = ({ projects }) => (
  <motion.section
    className="py-16 px-4 bg-white"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 border-solid hover:shadow-xl transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <proj.icon className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="text-xl font-bold mb-1">{proj.title}</h4>
            <span className="text-sm inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-full mb-2">
              {proj.status}
            </span>
            <p className="text-gray-700 mb-2">{proj.description}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Start: {proj.start}</p>
              <p>Funding: {proj.funding}</p>
              <p>Duration: {proj.duration}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const ImpactPublications = ({ items }) => (
  <motion.section
    className="py-16 px-4 bg-gradient-to-br from-indigo-50 to-blue-50"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Research Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-xl shadow-lg ${item.bg} hover:shadow-xl transition-all`}
            whileHover={{ scale: 1.05 }}
          >
            <h4 className={`text-3xl font-bold mb-1 ${item.color}`}>{item.value}+</h4>
            <p className="text-lg font-semibold mb-1">{item.label}</p>
            <p className="text-sm text-gray-600">{item.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const ImpactSocial = ({ items }) => (
  <motion.section
    className="py-16 px-4 bg-white"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Social Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className={`p-6 rounded-xl shadow-lg border-t-4 ${item.color} bg-white hover:shadow-xl transition-all`}
            whileHover={{ scale: 1.02 }}
          >
            <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            <p className="text-gray-700">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);

const ContactDetails = ({ contacts }) => (
  <motion.section
    className="py-16 px-4 bg-gradient-to-br from-purple-50 to-indigo-50"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
    variants={fadeUp}
  >
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contacts.map((contact, i) => (
          <motion.div
            key={i}
            className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <contact.icon className={`w-10 h-10 mx-auto mb-4 ${contact.color}`} />
            <h4 className="text-xl font-bold mb-2">{contact.title}</h4>
            <p className="text-gray-700">{contact.email}</p>
            <p className="text-gray-700">{contact.phone}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.section>
);
/* ---------------------------- Main Page ---------------------------- */

const ResearchProjects = () => {
  const { shortCode } = useParams();
  const [researchProjectsData, setResearchProjectsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/research/research-projects.jsx`);
        setResearchProjectsData(module.researchProjectsData);
      } catch {
        try {
          const fallback = await import("../../Data/schools/SOICT/research/research-projects.jsx");
          setResearchProjectsData(fallback.researchProjectsData);
        } catch {
          setResearchProjectsData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!researchProjectsData) {
    return <div className="flex justify-center items-center h-screen text-gray-500">Research projects data not available.</div>;
  }

  const {
    hero,
    stats,
    ongoingProjects,
    projectCategories,
    completedProjects,
    upcomingProjects,
    impactPublications,
    impactSocial,
    contactDetails,
  } = researchProjectsData;

  return (
    <div className="min-h-screen">
      <Hero data={hero} />
      <Stats data={stats} />
      <OngoingProjects projects={ongoingProjects} />
      <ProjectCategories categories={projectCategories} />
      <CompletedProjects projects={completedProjects} />
      <UpcomingProjects projects={upcomingProjects} />
      <ImpactPublications items={impactPublications} />
      <ImpactSocial items={impactSocial} />
      <ContactDetails contacts={contactDetails} />
    </div>
  );
};

export default ResearchProjects;
