import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Building, Calendar, ShieldCheck, FileCheck, Quote } from "lucide-react";
import BannerSection from "../../components/HeroBanner.jsx";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper.jsx";
import ButtonGroup from "../../components/TabsData.jsx";

const Registrar = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Responsibilities", "Contact"];

  const tabContent = {
    Overview: {
      title: "About the Registrar",
      content: (
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Prof. Chander Kumar Singh serves as the Registrar of Gautam Buddha University. He is responsible for the overall administrative affairs, statutory compliance, and institutional governance of the university.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With years of experience in higher education administration, academic planning, and institutional leadership, he leads the administrative team to ensure smooth functioning of the academic sessions, university governance boards, and student support services.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50">
              <h4 className="font-bold text-blue-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Statutory Authority
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Acts as the custodian of records, common seal, and properties of the university as per the GBU Act and Statutes.
              </p>
            </div>
            <div className="bg-green-50/50 p-4 rounded-2xl border border-green-100/50">
              <h4 className="font-bold text-green-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-600" />
                Administrative Head
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Oversees secretarial support to the Board of Governors, Academic Council, and Finance Committee.
              </p>
            </div>
          </div>
        </div>
      )
    },
    Responsibilities: {
      title: "Key Portfolios & Responsibilities",
      content: (
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed font-semibold text-gray-900">
            The Office of the Registrar manages a wide range of academic and administrative operations, including:
          </p>
          <ul className="list-none space-y-3">
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <div>
                <strong>Academic Governance:</strong> Conducting meetings and maintaining proceedings of statutory university bodies like the Court, Executive Council, Academic Council, and Board of Studies.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <div>
                <strong>Records & Affiliations:</strong> Managing legal agreements, MoUs, affiliations, properties, and custody of official university documents.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <div>
                <strong>Human Resource Management:</strong> Overseeing administrative recruitment, service records of staff, promotional schemes, and welfare measures.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
              <div>
                <strong>Student Support & Admissions:</strong> Facilitating admission procedures, issuing degrees, certificates, and verifying academic transcripts.
              </div>
            </li>
          </ul>
        </div>
      )
    },
    Contact: {
      title: "Office Contact Information",
      content: (
        <div className="space-y-6 text-gray-700">
          <p>
            For administrative inquiries, statutory verifications, and official correspondences, you can connect with the Registrar's Office during official hours (Monday to Friday, 9:30 AM to 5:30 PM).
          </p>
          <div className="space-y-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Office Location</p>
                <p className="text-sm font-semibold text-gray-800">Administrative Block, Gautam Buddha University, Greater Noida, UP - 201312</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Official Email</p>
                <p className="text-sm font-semibold text-gray-800 hover:text-blue-600">
                  <a href="mailto:registrar@gbu.ac.in">registrar@gbu.ac.in</a>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Telephone Directory</p>
                <p className="text-sm font-semibold text-gray-800">+91-120-2344200 (Ext. 4200 / 4203)</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  };

  const tabButtons = tabs.map((tab) => ({
    id: tab,
    label: tab
  }));

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-gray-50/50 pb-20">
        {/* Hero Section */}
        <BannerSection
          title="Registrar's Office"
          subtitle="Administration, Regulation & Institutional Integrity"
          bgTheme={4}
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Card: Registrar Profile */}
            <div className="w-full lg:w-1/3">
              <div className="bg-gradient-to-b from-blue-50/70 to-white p-6 rounded-3xl shadow-sm border border-blue-100">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-200 mb-6 shadow-md relative">
                  <img
                    src="/assets/Faculty/Prof. Chander Kumar Singh.jpeg"
                    alt="Prof. Chander Kumar Singh"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900">Prof. Chander Kumar Singh</h3>
                  <p className="text-sm font-semibold text-blue-600 mt-1">Registrar</p>
                  <p className="text-xs text-gray-500 mt-0.5">Gautam Buddha University</p>
                </div>
                
                {/* Micro Info */}
                <div className="mt-6 pt-6 border-t border-blue-100/50 space-y-3.5 text-sm text-gray-600">
                  <div className="flex items-center gap-2.5">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>Administrative Block</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <a href="mailto:registrar@gbu.ac.in" className="hover:underline">registrar@gbu.ac.in</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Message */}
            <div className="w-full lg:w-2/3 bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100">
              <Quote className="w-8 h-8 text-blue-500/30 mb-3" />
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p className="text-base sm:text-lg font-medium text-gray-900">
                  Welcome to Gautam Buddha University. As the administrative heart of the university, the Registrar's Office is committed to ensuring operational excellence, administrative efficiency, and student-centric support.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  We strive to maintain the highest standards of governance, legal compliance, and statutory integrity, aligning our processes to support GBU's vision of becoming a global hub of learning and research. Our office handles a wide spectrum of responsibilities, including academic administration, student registration, examinations, recruitment, and statutory governance.
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  We are dedicated to providing a transparent, responsive, and digitised administrative ecosystem that enables our students, faculty, and stakeholders to focus on what matters most: academic growth and intellectual pursuits. I welcome all students, parents, scholars, and collaborators to engage with our administration.
                </p>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <Quote className="w-6 h-6 text-blue-500/20 rotate-180" />
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">Prof. Chander Kumar Singh</p>
                  <p className="text-sm font-semibold text-blue-600">Registrar, Gautam Buddha University</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="mt-16 bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">Know the Registrar's Office</h2>

            {/* Tabs */}
            <ButtonGroup
              buttons={tabButtons}
              onClick={setActiveTab}
              activeButton={activeTab}
              size="lg"
              fullWidth={true}
              rounded="2xl"
              animated={true}
              className="sm:flex-nowrap mb-8"
            />

            {/* Tab Panel Content */}
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {tabContent[activeTab].title}
              </h3>
              <div>{tabContent[activeTab].content}</div>
            </div>
          </div>
        </div>
      </div>
    </SearchableWrapper>
  );
};

export default Registrar;
