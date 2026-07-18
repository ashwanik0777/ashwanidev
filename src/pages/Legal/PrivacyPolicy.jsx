import React from "react";
import { Shield, Lock, Eye, FileText, CheckCircle, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "collection",
      icon: Eye,
      title: "1. Information We Collect",
      content: [
        "Personal Identification Information: We may collect personal information such as your name, email address, phone number, mailing address, and student/faculty credentials when you register on our portal, apply for admission, pay fees, or fill out forms.",
        "Academic and Professional Records: Details regarding your academic history, qualifications, enrollment details, grades, attendance, and professional experiences for faculty profiles are stored securely in our database.",
        "Technical Usage Data: We automatically collect technical data when you visit our website, including your IP address, browser type, operating system, pages viewed, and access times, to optimize your experience."
      ]
    },
    {
      id: "usage",
      icon: FileText,
      title: "2. How We Use Your Information",
      content: [
        "To provide and maintain official academic and administrative services, including managing admissions, course enrollments, faculty portfolios, and examination processes.",
        "To process transactions securely, such as online fee payments, hostel bookings, and facility reservations.",
        "To send periodic communications regarding academic calendars, event announcements, policy updates, newsletters, and administrative alerts.",
        "To improve our website functionality, security protocols, and user experience based on feedback and analytical data."
      ]
    },
    {
      id: "protection",
      icon: Lock,
      title: "3. Data Protection and Security",
      content: [
        "We implement robust administrative, technical, and physical security measures to safeguard your personal information from unauthorized access, alteration, disclosure, or destruction.",
        "Secure Socket Layer (SSL) technology is utilized to encrypt sensitive transactional data (such as payment details) during transmission.",
        "Access to personal data is strictly restricted to authorized university personnel and administrators who require the information to perform official duties."
      ]
    },
    {
      id: "cookies",
      icon: Shield,
      title: "4. Cookies and Tracking Technologies",
      content: [
        "Gautam Buddha University website uses cookies and similar tracking technologies to enhance navigation, remember user preferences, and analyze site traffic.",
        "Cookies are small files placed on your device's storage. You can choose to disable cookies through your browser settings, though doing so may limit your access to certain portal features."
      ]
    },
    {
      id: "sharing",
      icon: CheckCircle,
      title: "5. Information Sharing and Disclosure",
      content: [
        "We do not sell, trade, or rent your personal identification information to third parties.",
        "We may share necessary information with trusted third-party service providers (e.g., payment gateways, official verification agencies) solely to facilitate university operations.",
        "We may disclose information if required to do so by law, court order, or government regulation, or to protect the safety, rights, and property of Gautam Buddha University, its students, and staff."
      ]
    },
    {
      id: "contact",
      icon: HelpCircle,
      title: "6. Contact and Grievances",
      content: [
        "If you have any questions, concerns, or grievances regarding this Privacy Policy or our data handling practices, you may contact our administrator:",
        "Email: privacy@gbu.ac.in | Address: Gautam Buddha University, Yamuna Expressway, Greater Noida, UP - 201312"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-slate-50 font-sans pb-16">
        {/* Page Banner */}
        <div className="relative py-20 bg-[#0e1626] text-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-900/40 rounded-full blur-[120px] opacity-40" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-900/30 rounded-full blur-[120px] opacity-35" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Learn how Gautam Buddha University collects, uses, protects, and manages your academic and personal information securely.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          {/* Top Metadata Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Effective Date: June 26, 2026</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Gautam Buddha University is committed to protecting the privacy of our students, faculty, staff, and visitors. This Privacy Policy describes how we collect, process, and protect information across our official website, admissions portal, academic management dashboards, and digital communication channels.
            </p>
          </div>

          {/* Policy Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            {sections.map((sec) => {
              const Icon = sec.icon;
              return (
                <motion.div
                  key={sec.id}
                  variants={cardVariants}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-3.5 mb-5 border-b border-slate-100 pb-4">
                    <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                      <Icon className="w-5.5 h-5.5" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-850">{sec.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {sec.content.map((para, i) => (
                      <p key={i} className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SearchableWrapper>
  );
}
