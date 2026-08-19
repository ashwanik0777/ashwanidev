import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  User,
  Building,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import BannerSection from "../../components/HeroBanner";

// Reusable Card Component with Framer Motion hover
const ContactCard = ({ children, className = "" }) => (
  <motion.div
    whileHover={{ y: -3, transition: { duration: 0.2 } }}
    className={`bg-white rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
  >
    {children}
  </motion.div>
);

// Contact Page Content Component
const Contact = ({ data, departments, officeHours, generalInfo, deanInfo, directory }) => {
  return (
    <div className="min-h-screen bg-slate-50 selection:bg-purple-200">
      {/* Hero Section */}
      <BannerSection
        title={generalInfo?.heading || "Contact Us"}
        subtitle={generalInfo?.subheading || "SoICT, Gautam Buddha University"}
        bgTheme={3}
      />

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl py-8 sm:py-12 space-y-8 sm:space-y-12">
        
        {/* USICT Main Office Section */}
        {generalInfo?.cards && generalInfo.cards.length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
                Main Office
              </h2>
            </div>

            <div className={`mx-auto ${generalInfo.cards.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl' : 'max-w-4xl space-y-4 sm:space-y-6'}`}>
              {generalInfo.cards.map((info, idx) => (
                <ContactCard key={idx}>
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex flex-col justify-between h-full">
                    <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center shadow-md shadow-purple-500/10 text-white shrink-0">
                        <Building className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base sm:text-xl font-bold text-slate-900 font-outfit truncate">
                          {info.title}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">
                          {generalInfo?.subheading || "School of Biotechnology"}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 text-sm">
                      {/* Address */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Address
                        </div>
                        <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                          {info.content}
                        </p>
                      </div>

                      {/* Phone */}
                      {info.phone && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> Phone
                          </div>
                          <div>
                            <a
                              href={`tel:${info.phone.replace(/\s+/g, '')}`}
                              className="text-sm sm:text-base font-bold text-slate-900 hover:text-purple-600 transition-colors"
                            >
                              {info.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {info.email && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                            <Mail className="w-3.5 h-3.5 text-purple-600 shrink-0" /> Email
                          </div>
                          <div>
                            <a
                              href={`mailto:${info.email}`}
                              className="text-sm sm:text-base font-bold text-purple-700 hover:underline break-all"
                            >
                              {info.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ContactCard>
              ))}
            </div>
          </section>
        )}

        {/* Directory Section */}
        {directory && directory.length > 0 && (
          <section className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
                Faculty & Staff Directory
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Direct contact phone numbers and extension details
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="py-3.5 px-6">Name</th>
                      <th className="py-3.5 px-6 text-center">Phone No.</th>
                      <th className="py-3.5 px-6 text-center">Ext. No.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/80 font-medium">
                    {directory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-6 font-bold text-slate-900">{item.name}</td>
                        <td className="py-3 px-6 text-center font-semibold text-purple-700">
                          <a href={`tel:${item.phone.replace(/\s+/g, '')}`} className="hover:underline">
                            {item.phone}
                          </a>
                        </td>
                        <td className="py-3 px-6 text-center font-bold text-slate-700">
                          <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs font-mono">
                            {item.ext}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Dean Section */}
        {deanInfo && (
          <section className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
                Office of the Dean
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <ContactCard className="bg-white">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div className="flex items-center gap-3 sm:gap-4 border-b border-slate-100 pb-4">
                    {deanInfo.image ? (
                      <img
                        src={deanInfo.image}
                        alt={deanInfo.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover shadow-sm border border-indigo-200 shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center shadow-md shadow-indigo-500/10 text-white shrink-0 font-bold text-sm sm:text-base">
                        DB
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-slate-900 font-outfit truncate">
                        {deanInfo.name}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 mt-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {deanInfo.title}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* Office / Address */}
                    <div className="space-y-1.5 md:col-span-1">
                      <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                        <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> Location
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-medium">
                        {deanInfo.address || deanInfo.department}
                      </p>
                    </div>

                    {/* Phone */}
                    {deanInfo.phone && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          <Phone className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> Phone
                        </div>
                        <div>
                          <a
                            href={`tel:${deanInfo.phone.replace(/\s+/g, '')}`}
                            className="text-sm sm:text-base font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                          >
                            {deanInfo.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    {deanInfo.email && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                          <Mail className="w-3.5 h-3.5 text-indigo-600 shrink-0" /> Email
                        </div>
                        <div>
                          <a
                            href={`mailto:${deanInfo.email}`}
                            className="text-sm sm:text-base font-bold text-indigo-700 hover:underline break-all"
                          >
                            {deanInfo.email}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ContactCard>
            </div>
          </section>
        )}

        {/* Department Contacts Section */}
        {departments && departments.length > 0 && (
          <section className="space-y-4 sm:space-y-6">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
                Heads of Departments
              </h2>
            </div>

            <div className={`grid gap-4 sm:gap-6 ${departments.length === 1 ? 'max-w-xl mx-auto grid-cols-1' : departments.length === 2 ? 'max-w-3xl mx-auto grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-3'}`}>
              {departments.map((dept, index) => (
                <ContactCard key={index} className="flex flex-col justify-between">
                  <div className="p-4 sm:p-6 space-y-4">
                    {/* Department Title & HOD Name */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 block">
                        {dept.role || "Head of Department"}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit leading-snug">
                        {dept.hod}
                      </h3>
                      <p className="text-xs sm:text-sm font-semibold text-purple-700 leading-tight">
                        {dept.name}
                      </p>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-2 pt-3 border-t border-slate-100">
                      {dept.phone && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`tel:${dept.phone.replace(/\s+/g, '')}`} className="text-slate-900 font-semibold hover:text-purple-600">
                            {dept.phone}
                          </a>
                        </div>
                      )}

                      {dept.email && (
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium min-w-0">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`mailto:${dept.email}`} className="text-purple-700 font-semibold hover:underline truncate">
                            {dept.email}
                          </a>
                        </div>
                      )}

                      {dept.office && (
                        <div className="flex items-start gap-2 text-xs text-slate-500 pt-1 font-medium leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span className="whitespace-pre-line">{dept.office}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </ContactCard>
              ))}
            </div>
          </section>
        )}

        {/* Office Hours Section (If provided) */}
        {officeHours && officeHours.length > 0 && (
          <section className="space-y-4 max-w-4xl mx-auto">
            <ContactCard className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold border border-amber-100">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-outfit">Office Hours</h3>
                  <p className="text-xs text-slate-500 font-medium">General administrative timing</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {officeHours.map((schedule, index) => (
                  <div key={index} className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="font-semibold text-slate-800 text-xs sm:text-sm">{schedule.day}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{schedule.time}</div>
                  </div>
                ))}
              </div>
            </ContactCard>
          </section>
        )}

        {/* COE Contacts Section (If provided) */}
        {data && data.length > 0 && (
          <section className="space-y-4">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-outfit">
                Centers of Excellence
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {data.map((item, index) => (
                <ContactCard key={index} className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
                  <p className="text-xs text-slate-500 mb-3">{item.department}</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-600">
                    {item.email && <div className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 shrink-0" /> {item.email}</div>}
                    {item.phone && <div className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 shrink-0" /> {item.phone}</div>}
                    {item.address && <div className="flex items-start gap-2"><MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" /> {item.address}</div>}
                  </div>
                </ContactCard>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

// Dynamic Contact Page Component
const ContactPage = () => {
  const { shortCode } = useParams();
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const schoolCode = (shortCode || "SOICT").toUpperCase();
        const module = await import(`../../Data/schools/${schoolCode}/contact.jsx`);
        setContactData(module.contactData);
      } catch (err) {
        try {
          const fallback = await import("../../Data/schools/SOICT/contact.jsx");
          setContactData(fallback.contactData);
        } catch {
          setContactData(null);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [shortCode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!contactData) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-500 font-medium text-sm">
        Contact data not available for this school.
      </div>
    );
  }

  return (
    <Contact
      data={contactData.coeContacts}
      departments={contactData.departments}
      officeHours={contactData.officeHours}
      generalInfo={contactData.generalInfo}
      deanInfo={contactData.deanInfo}
      directory={contactData.directory}
    />
  );
};

export default ContactPage;
