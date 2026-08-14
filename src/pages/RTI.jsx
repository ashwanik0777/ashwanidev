import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Users, Clock, Phone, Mail } from 'lucide-react';

import BannerSection from "../components/HeroBanner.jsx";
import SearchableWrapper from "../components/Searchbar/SearchableWrapper.jsx";

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const RTI = () => {
  const handleDownload = (formType) => {
    const content = `Right to Information - ${formType}\n\nGautam Buddha University\nGreater Noida, Uttar Pradesh - 201312\n\nThis is a sample ${formType} document.\nPlease contact the university for the actual form.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formType.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Banner */}
        <BannerSection
          title="Right To Information"
          subtitle=""
          bgTheme={9}
        />

        <main className="container mx-auto px-4 py-16 max-w-6xl space-y-24">
          {/* About RTI */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-lg p-10 border-l-4 border-blue-600"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-6 flex items-center">
              <FileText className="mr-3" size={36} />
              About RTI
            </h2>
            <div className="grid md:grid-cols-2 gap-10 text-gray-800 leading-relaxed">
              <div className="space-y-4">
                <p>
                  The Right to Information Act, 2005 (RTI Act) is an Act of the Parliament of India which sets out the rules and procedures regarding citizens' right to information.
                </p>
                <p>
                  Under the provisions of the RTI Act, any citizen of India may request information from a "public authority" which must reply expeditiously or within thirty days.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-lg mb-3 text-blue-700">Key Features</h3>
                <ul className="space-y-2">
                  {['Transparent Governance', 'Citizen Empowerment', 'Accountability'].map((item, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Authorities */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-gray-900">
              RTI Authorities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Appellate Authority',
                  name: 'Prof. Uttam Kumar',
                  role: 'Deputy Registrar',
                  dept: 'Gautam Buddha University',
                  phone: '+91-120-2344212',
                  email: 'dr@gbu.ac.in',
                  accentBg: 'bg-blue-600',
                  accentBorder: 'border-blue-600',
                  accentText: 'text-blue-700',
                  iconText: 'text-blue-600',
                  badgeBg: 'bg-blue-50 text-blue-700 border-blue-100',
                },
                {
                  title: 'Nodal PIO (RTI)',
                  name: 'Dr. Vikram Karuna',
                  role: 'Public Information Officer (PIO)',
                  dept: 'Gautam Buddha University',
                  phone: '+91-120-2344260',
                  email: 'pio@gbu.ac.in',
                  accentBg: 'bg-teal-600',
                  accentBorder: 'border-teal-600',
                  accentText: 'text-teal-700',
                  iconText: 'text-teal-600',
                  badgeBg: 'bg-teal-50 text-teal-700 border-teal-100',
                },
                {
                  title: 'Assistant PIO (APIO)',
                  name: 'Sh. Umakant Ahirwar',
                  role: 'Section Superintendent',
                  dept: 'Gautam Buddha University',
                  phone: '+91-120-2344218',
                  email: 'umakant@gbu.ac.in',
                  accentBg: 'bg-amber-600',
                  accentBorder: 'border-amber-600',
                  accentText: 'text-amber-700',
                  iconText: 'text-amber-600',
                  badgeBg: 'bg-amber-50 text-amber-700 border-amber-100',
                },
              ].map((officer, idx) => (
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  className={`bg-white rounded-2xl shadow-md p-6 sm:p-8 border-t-4 ${officer.accentBorder} flex flex-col justify-between`}
                  key={idx}
                >
                  <div>
                    <div className="text-center mb-5">
                      <div className={`w-14 h-14 ${officer.accentBg} rounded-2xl flex items-center justify-center mx-auto mb-3.5 shadow-md shadow-slate-200`}>
                        <Users className="text-white" size={26} />
                      </div>
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${officer.badgeBg} mb-2`}>
                        {officer.title}
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-tight">
                        {officer.name}
                      </h3>
                      <p className={`text-xs sm:text-sm font-semibold ${officer.accentText} mt-1`}>{officer.role}</p>
                      <p className="text-xs text-slate-500 font-medium">{officer.dept}</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-2 text-xs sm:text-sm text-slate-700">
                    <p className="flex items-center gap-2.5">
                      <Phone size={15} className={`${officer.iconText} shrink-0`} />
                      <a href={`tel:${officer.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline font-medium">
                        {officer.phone}
                      </a>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Mail size={15} className={`${officer.iconText} shrink-0`} />
                      <a href={`mailto:${officer.email}`} className="hover:underline font-medium break-all">
                        {officer.email}
                      </a>
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* How to Apply */}
          <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-10 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center flex items-center justify-center text-blue-700">
                <Clock className="mr-3" size={36} /> How to Apply
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Steps */}
                {[
                  {

                    num: '1',
                    title: 'Application Format',
                    desc: 'Applications should be made in writing or electronically in English or Hindi to the PIO.',
                    color: 'blue',
                    link: 'https://rtionline.gov.in/',
                    linkText: 'Apply Online',
                  },
                  {
                    num: '2',
                    title: 'Required Information',
                    desc: [
                      'Details of information sought',
                      'Period to which information relates',
                      'Contact details of applicant',
                      'Fee deposit particulars',
                    ],
                    color: 'green',
                  },
                  {
                    num: '3',
                    title: 'Fee Structure',
                    desc: 'Application fee: ₹10\nAdditional: ₹2/page for photocopying (A4/A3)',
                    color: 'orange',
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`bg-${step.color}-50 p-6 rounded-lg border-l-4 border-${step.color}-500 shadow hover:shadow-md transition`}
                  >
                    <div className={`w-12 h-12 bg-${step.color}-500 rounded-full flex items-center justify-center mb-4`}>
                      <span className="text-white font-bold text-lg">{step.num}</span>
                    </div>
                    <h3 className={`font-bold mb-3 text-${step.color}-700`}>
                      {step.title}
                    </h3>
                    {Array.isArray(step.desc) ? (
                      <ul className="space-y-1 text-gray-800 text-sm">
                        {step.desc.map((item, i) => (
                          <li key={i} className="flex items-center">
                            <span className={`w-1 h-1 bg-${step.color}-500 rounded-full mr-2`}></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-800 text-sm whitespace-pre-line">{step.desc}</p>
                    )}
                    {step.link && (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 mt-4 px-5 py-2 bg-${step.color}-600 hover:bg-${step.color}-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5`}
                      >
                        {step.linkText || 'Visit'}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

                   {/* Important Notes */}
          {/* <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-gray-50 border border-gray-200 p-10 rounded-xl shadow-lg space-y-6">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
                Important Notes
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2"></span>
                    Information shall be provided within 30 days of receipt of application.
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-green-600 rounded-full mr-4 mt-2"></span>
                    Information concerning life and liberty shall be provided within 48 hours.
                  </li>
                </ul>
                <ul className="space-y-4 text-gray-800">
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-orange-500 rounded-full mr-4 mt-2"></span>
                    If information is held by another authority, the application shall be transferred within 5 days.
                  </li>
                  <li className="flex items-start">
                    <span className="w-3 h-3 bg-blue-600 rounded-full mr-4 mt-2"></span>
                    No fee shall be charged from Below Poverty Line (BPL) applicants.
                  </li>
                </ul>
              </div>
            </div>
          </motion.section> */}

          {/* Downloadable Forms */}
          {/* <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-10 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
                Downloadable Forms
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { name: "RTI Application Form", color: "blue" },
                  { name: "First Appeal Form", color: "green" },
                  { name: "RTI Guidelines", color: "orange" },
                ].map((form, idx) => (
                  <motion.div
                    whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    key={idx}
                    className={`bg-${form.color}-50 p-6 rounded-lg text-center border border-${form.color}-200`}
                  >
                    <div className={`w-16 h-16 bg-${form.color}-500 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Download className="text-white" size={28} />
                    </div>
                    <h3 className={`font-bold mb-4 text-${form.color}-700`}>
                      {form.name}
                    </h3>
                    <button
                      onClick={() => handleDownload(form.name)}
                      className={`bg-${form.color}-500 text-white px-6 py-3 rounded-lg hover:bg-${form.color}-600 transition flex items-center mx-auto`}
                    >
                      <Download size={18} className="mr-2" />
                      Download
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section> */}

          {/* Contact Information */}
          {/* <motion.section
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-white rounded-xl shadow-lg p-10 space-y-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900">
                Contact Information
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-blue-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-blue-700">University Address</h3>
                  <address className="not-italic text-gray-800 leading-relaxed">
                    Gautam Buddha University<br />
                    Greater Noida, Gautam Buddha Nagar<br />
                    Uttar Pradesh - 201312<br />
                    India
                  </address>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-gray-200">
                  <h3 className="text-xl font-bold mb-4 text-green-700">General Contact</h3>
                  <div className="space-y-4 text-gray-800">
                    <p className="flex items-center">
                      <Phone size={18} className="mr-3 text-blue-500" />
                      <strong>Phone:</strong>&nbsp;0120-2344200
                    </p>
                    <p className="flex items-center">
                      <Mail size={18} className="mr-3 text-green-500" />
                      <strong>Email:</strong>&nbsp;info@gbu.ac.in
                    </p>
                    <p className="flex items-center">
                      <FileText size={18} className="mr-3 text-orange-500" />
                      <strong>Website:</strong>&nbsp;www.gbu.ac.in
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section> */}
        </main>
      </div>
    </SearchableWrapper>
  );
};

export default RTI;
