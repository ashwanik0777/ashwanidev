import React from "react";
import { Info, ShieldAlert, Key, BookOpen, AlertTriangle, Scale, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";

export default function TermsOfUse() {
  const sections = [
    {
      id: "acceptance",
      icon: Info,
      title: "1. Acceptance of Terms",
      content: [
        "Welcome to the official digital portal of Gautam Buddha University (GBU). By accessing, browsing, or using this website, including all subdomains, admissions systems, student and faculty management portals, you agree to be bound by these Terms of Use and all applicable laws and regulations.",
        "If you do not agree with any part of these terms, you are prohibited from accessing or using our websites and services."
      ]
    },
    {
      id: "registration",
      icon: Key,
      title: "2. User Registration and Account Security",
      content: [
        "To access specific portals (such as the Faculty Dashboard, Student Portal, or Administration System), you may be required to register and create an account using university-authorized credentials.",
        "You are solely responsible for maintaining the confidentiality of your login credentials (username, password, and security tokens) and for all activities that occur under your account.",
        "You agree to notify the University IT Center immediately of any unauthorized account usage or security breach. GBU shall not be held liable for any loss arising from unauthorized credentials use."
      ]
    },
    {
      id: "conduct",
      icon: ShieldAlert,
      title: "3. Acceptable Use Policy",
      content: [
        "You agree to use this website only for lawful purposes related to academic enrollment, research, instruction, administration, and official communication.",
        "Prohibited Activities: You must not upload, post, transmit, or distribute any content that: (a) violates any local, national, or international laws; (b) infringes upon intellectual property rights; (c) contains computer viruses, malware, or destructive code; (d) disrupts the networks or servers connected to GBU systems; (e) impersonates another individual or misrepresents academic credentials."
      ]
    },
    {
      id: "intellectual",
      icon: BookOpen,
      title: "4. Intellectual Property Rights",
      content: [
        "All content featured on GBU portals, including logos, text, graphics, academic publications, course curricula, images, layout designs, and software, is the exclusive property of Gautam Buddha University or its content providers and is protected by intellectual property laws.",
        "You may view, download, and print materials for personal, non-commercial, academic research, and educational purposes only. Any unauthorized duplication, modification, distribution, or commercial exploitation of GBU materials is strictly prohibited without prior written consent."
      ]
    },
    {
      id: "liability",
      icon: AlertTriangle,
      title: "5. Limitation of Liability",
      content: [
        "Gautam Buddha University makes every effort to ensure the accuracy and reliability of the information posted on this website. However, all materials, services, and portal systems are provided on an 'as is' and 'as available' basis, without warranties of any kind, express or implied.",
        "The University does not warrant that the website will operate uninterrupted, secure, or error-free, or that data transmissions are immune to server issues. GBU shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of or inability to use the website."
      ]
    },
    {
      id: "governing",
      icon: Scale,
      title: "6. Governing Law and Jurisdiction",
      content: [
        "These Terms of Use shall be governed by and construed in accordance with the laws of India and the state of Uttar Pradesh.",
        "Any disputes, claims, or legal proceedings arising from or relating to the use of this website or portals shall be subject to the exclusive jurisdiction of the courts in Gautam Buddha Nagar / Allahabad, Uttar Pradesh."
      ]
    },
    {
      id: "contact",
      icon: HelpCircle,
      title: "7. Contact Information",
      content: [
        "If you have questions regarding these Terms of Use or wish to report a website issue, please reach out to our support office:",
        "IT Service Center, Gautam Buddha University, Greater Noida, UP - 201312 | Email: support@gbu.ac.in"
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
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms of Use</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Understand the rules, guidelines, and legal terms governing the use of Gautam Buddha University portals and digital services.
            </p>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          {/* Top Info Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm mb-8">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Effective Date: June 26, 2026</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              By accessing and using Gautam Buddha University websites and online services, you agree to comply with the terms and conditions outlined below. These terms apply to all students, faculty members, researchers, administrators, and guest visitors.
            </p>
          </div>

          {/* Terms Sections */}
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
