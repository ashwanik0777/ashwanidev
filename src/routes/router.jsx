import Home from "../pages/Aboutus/Home.jsx";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InternshipProgrammes from "../pages/Placement/InternshipProgrammes.jsx";

import PlacementStatistics from "../pages/Placement/PlacementStatistics.jsx";
const PlacementBrochure = React.lazy(() =>
  import("../pages/Placement/PlacementBrochure")
);
import TrainingCareerServices from "../pages/Placement/TrainingCareerServices.jsx";
import AdmissionProcess from "../pages/Admission/AdmissionProcess.jsx";
import CoursesOffered from "../pages/Admission/CoursesOffered.jsx";
import EligibilityReservation from "../pages/Admission/EligibilityReservation.jsx";
import FeeStructure from "../pages/Admission/FeeStructure.jsx";
import InternationalAdmissions from "../pages/Admission/InternationalAdmissions.jsx";
import NewsDetail from "../pages/Announcements/NewsDetail.jsx";
import NewsNotifications from "../pages/Announcements/NewsNotifications.jsx";
import EventsPage from "../pages/Announcements/EventsPage.jsx";
import NewsLetter from "../pages/Announcements/NewsLetter.jsx";
import EventDetail from "../pages/Announcements/EventDetail.jsx";
import MediaGallery from "../pages/Announcements/MediaGallery.jsx";
import Notice from "../pages/Announcements/Notice.jsx";
import NoticeDetail from "../pages/Announcements/NoticeDetail.jsx";



import ContactDirectory from "../pages/directory/ContactDirectory.jsx";

import HostelDining from "../pages/campusLife/HostelDining.jsx";

import SportsCultural from "../pages/campusLife/SportsCultural.jsx";
import ClubsMain from "../pages/clubs/ClubsMain.jsx";

import NSS from "../pages/campusLife/NSS.jsx";
import NCC from "../pages/campusLife/NCC.jsx";
import MeditationCenter from "../pages/campusLife/MeditationCenter.jsx";
import Overview from "../pages/campusLife/Overview.jsx";
import ClubDetail from "../pages/clubs/ClubDetail.jsx";

import FacultyPortalDashboard from "../pages/Auth/FacultyDashboard.jsx";
import SchoolDashboard from "../pages/Auth/SchoolDashboard.jsx";
import AdminPortalDashboard from "../pages/Auth/AdminDashboard.jsx";
import CourseDetails from "../components/departments/CourseDetailed.jsx"; 
import Sitemap from "../pages/Sitemap/Sitemap.jsx";
import SitemapAbout from "../pages/Sitemap/SitemapAbout.jsx";
import SitemapContact from "../pages/Sitemap/SitemapContact.jsx";
import SitemapAcademics from "../pages/Sitemap/SitemapAcademics.jsx";
import InstitutionInnovation from "../pages/Reasearch/InstitutionInnovation.jsx";
import GBUHistory from "../pages/Aboutus/History.jsx";
import LoginPortal from "../pages/Auth/LoginPortal.jsx";
import FacultyRegister from "../pages/Auth/FacultyRegister.jsx";
import ForgotPassword from "../pages/Auth/ForgotPassword.jsx";
import ProtectedPortalRoute from "../components/Auth/ProtectedPortalRoute.jsx";

/* Semester Registration — disabled for now, not part of the current release.
   Re-enable together with the routes below and the student login option in
   pages/Auth/LoginPortal.jsx.
const SemesterRegistration = lazy(() => import("../pages/SemesterRegistration/SemesterRegistration.jsx"));
const RegistrationPreview = lazy(() => import("../pages/SemesterRegistration/RegistrationPreview.jsx"));
*/


const AcademicCalendar = React.lazy(() =>
  import("../pages/Academic/AcademicCalendar.jsx")
);
const CBCSFramework = React.lazy(() =>
  import("../pages/Academic/CBCSFramework.jsx")
);
const CentersOfExcellence = React.lazy(() =>
  import("../pages/Academic/CentersOfExcellence.jsx")
);
const Faculty = React.lazy(() => import("../pages/Academic/Faculty.jsx"));
const FacultyDetail = React.lazy(() =>
  import("../pages/Academic/FacultyDetail.jsx")
);
const InternationalCollaboration = React.lazy(() =>
  import("../pages/Academic/InternationalCollaboration.jsx")
);

const ReportsPublications = React.lazy(() =>
  import("../pages/Academic/ReportsPublications.jsx")
);
const NationalAcademicDepository = React.lazy(() =>
  import("../pages/Academic/NationalAcademicDepository.jsx")
);
const Schools = React.lazy(() => import("../pages/Academic/Schools.jsx"));
const ListOfHolidays = React.lazy(() => import("../pages/Academic/ListOfHolidays.jsx"));

const Disclosures = lazy(() => import("../pages/Aboutus/Disclosures.jsx"));
const History = lazy(() => import("../pages/Aboutus/History.jsx"));
const Policies = lazy(() => import("../pages/Aboutus/Policies.jsx"));
const AboutGbu = lazy(() => import("../pages/Aboutus/AboutGbu.jsx"));
const Act = lazy(() => import("../pages/Aboutus/Act.jsx"));
const Committee = lazy(() => import("../pages/Aboutus/Committee.jsx"));
const RegulatoryBodies = lazy(() => import("../pages/Aboutus/RegulatoryBodies.jsx"));

const Chancellor = lazy(() => import("../pages/Aboutus/Chancellor.jsx"));
const StrategicPerspective = lazy(() => import("../pages/Aboutus/StrategicPerspective.jsx"));
const Governance = lazy(() => import("../pages/Aboutus/Governance.jsx"));
const ViceChancellor = lazy(() =>
  import("../pages/Aboutus/ViceChancellor.jsx")
);
const DeansOfSchools = lazy(() =>
  import("../pages/Aboutus/DeansOfSchools.jsx")
);
const Registrar = lazy(() =>
  import("../pages/Aboutus/Registrar.jsx")
);

const PrivacyPolicy = lazy(() => import("../pages/Legal/PrivacyPolicy.jsx"));
const TermsOfUse = lazy(() => import("../pages/Legal/TermsOfUse.jsx"));

const FundedProjects = lazy(() =>
  import("../pages/Reasearch/researchhighlights/FundedProjects")
);
const StartUp = lazy(() =>
  import("../pages/Reasearch/incubations/StartUp.jsx")
);
const Index = lazy(() =>
  import("../pages/Reasearch/researchhighlights/Index.jsx")
);
const Publications = lazy(() =>
  import("../pages/Reasearch/researchhighlights/Publications.jsx")
);

const ResearchCenters = lazy(() =>
  import("../pages/Reasearch/ResearchCenters.jsx")
);
const Incubation = lazy(() => import("../pages/Reasearch/incubations/Incubation.jsx"));
const Ipr = lazy(() => import("../pages/Reasearch/ipr/Ipr.jsx"));

// ICT School components (lazy loaded) - Update these paths according to your project structure
const ICTFaculty = lazy(() => import("../pages/departments/Faculty"));
const ResearchArea = lazy(() => import("../pages/departments/Research_area"));
const ResearchProjects = lazy(() =>
  import("../pages/departments/Reasearch_project")
);
const ResearchScholars = lazy(() =>
  import("../pages/departments/Reasearch_Scholar")
);
const TrainingConsultancy = lazy(() => import("../pages/departments/Training"));
const Patents = lazy(() => import("../pages/departments/Patent"));
const BoardOfStudies = lazy(() => import("../pages/departments/BoardOfStudy"));
import SchoolsLayout from "../components/departments/SchoolsLayout.jsx";
import Dean from "../components/departments/Dean.jsx";
import Conferences from "../pages/departments/Usict_activities.jsx";
import LaboratoryCards from "../pages/departments/laboratries.jsx";
import Placement_home from "../pages/Placement/Placement_home.jsx";
import AlumniMain from "../pages/Alumni/AlumniMain.jsx";

import RecruitMain from "../pages/recruitments/RecruitMain.jsx";


import BookingMain from "../pages/booking/BookingMain.jsx";
import FacilityBookingPage from "../components/booking/FacilityBookingPage.jsx";
import BookingTrack from "../pages/booking/BookingTrack.jsx";
import TenderMain from "../pages/tenders/TenderMain.jsx";


import RTI from "../pages/RTI.jsx";
import Guidelines from "../pages/Aboutus/Guidelines.jsx";

import StaffMembers from "../pages/departments/StaffMembers.jsx";
import Coedt from "../pages/departments/Coedt.jsx";
import Raem from "../pages/departments/Raem.jsx";
import CyberSecurity from "../pages/departments/CyberSecurity.jsx";
  import SchoolDetail from "../pages/Academic/SchoolDetail/index.jsx";
import Contact from "../pages/departments/Contact.jsx";
import CSE from "../pages/departments/CSE.jsx";
import IT from "../pages/departments/IT.jsx";
import ECE from "../pages/departments/ECE.jsx";
import GenericDepartment from "../pages/departments/GenericDepartment.jsx";
import CoeBioinformatics from "../pages/departments/CoeBioinformatics.jsx";
import MolecularBiologyLab from "../pages/departments/MolecularBiologyLab.jsx";
import ResearchCellPage from "../pages/departments/ResearchCellPage.jsx";
import SoeAdvancedComputing from "../pages/departments/SoeAdvancedComputing.jsx";
import SoeDesignLab from "../pages/departments/SoeDesignLab.jsx";
import SoeInnovationCell from "../pages/departments/SoeInnovationCell.jsx";
import GenericCentrePage from "../pages/departments/GenericCentrePage.jsx";

import ITCell from "../pages/itcell/ITCell.jsx";
import PlacementDashboard from "../pages/departments/PlacementDashboard.jsx";
import ContactBanner from "../pages/Contact/ContactBanner.jsx";
import ComingSoon from "../components/ComingSoon.jsx";
// import DACmain from "../pages/itcell/DACmain.jsx";




export default function AppRouter() {
   return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          Loading...
        </div>
      }
    >
        <Routes>
          {/* About Us Routes */}

          <Route path="/comingSoon" element={<ComingSoon />} />
          <Route path="/" element={<Home />} />
          <Route path="/about-us/About GBU" element={<AboutGbu />} />
          <Route path="/about-us/act" element={<Act />} />
          <Route path="/about-us/act-statute-ordinance" element={<Act />} />
          <Route path="/about/act" element={<Act />} />
          <Route path="/about-us/committee" element={<Committee />} />
          <Route path="/about/committee" element={<Committee />} />
          <Route path="/about-us/regulatory-bodies" element={<RegulatoryBodies />} />
          <Route path="/about/regulatorybodies" element={<RegulatoryBodies />} />
          <Route path="/aboutUs/GBUHistory" element={<History />} />
          <Route path="/about-us/chancellor-message" element={<Chancellor />} />
          <Route
            path="/about-us/vice-chancellor-message"
            element={<ViceChancellor />}
          />
          <Route
            path="/about-us/strategic-perspective"
            element={<StrategicPerspective />}
          />
          <Route
            path="/about/vc"
            element={<StrategicPerspective />}
          />
          <Route
            path="/organization"
            element={<DeansOfSchools />}
          />
          <Route
            path="/about-us/organization"
            element={<DeansOfSchools />}
          />
          <Route
            path="/registrar"
            element={<Registrar />}
          />
          <Route
            path="/about-us/registrar"
            element={<Registrar />}
          />
          <Route
            path="/about-us/governing-bodies"
            element={<Governance />}
          />

          <Route
            path="/about-us/policies"
            element={<Policies />}
          />
          <Route
            path="/about-us/policies-statutes-rti"
            element={<Policies />}
          />
          <Route
            path="/page/policy"
            element={<Policies />}
          />
          <Route
            path="/about/policy"
            element={<Policies />}
          />
          <Route
            path="/about-us/mandatory-disclosures"
            element={<Disclosures />}
          />
          <Route
            path="/about-us/rti"
            element={<RTI />}
          />
          <Route
            path="/about/rti"
            element={<RTI />}
          />
          <Route
            path="/about-us/guidelines"
            element={<Guidelines />}
          />
          <Route
            path="/about/guidelines"
            element={<Guidelines />}
          />
          <Route
            path="/about/Guidelines"
            element={<Guidelines />}
          />
          <Route
            path="/guidelines"
            element={<Guidelines />}
          />

          {/* Academics */}
          <Route path="/academics" element={<h1>Academics</h1>} />
          <Route path="/login" element={<LoginPortal />} />
          <Route path="/faculty-register" element={<FacultyRegister />} />
          <Route path="/login/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/faculty-portal/dashboard"
            element={
              <ProtectedPortalRoute>
                <FacultyPortalDashboard />
              </ProtectedPortalRoute>
            }
          />
          <Route
            path="/school-portal/dashboard"
            element={
              <ProtectedPortalRoute>
                <SchoolDashboard />
              </ProtectedPortalRoute>
            }
          />
          <Route
            path="/admin-portal/dashboard"
            element={
              <ProtectedPortalRoute>
                <AdminPortalDashboard />
              </ProtectedPortalRoute>
            }
          />
          <Route
            path="/academics/academic-calendar"
            element={<AcademicCalendar />}
          />
          <Route
            path="/academics/academic-calendars"
            element={<AcademicCalendar />}
          />
          <Route
            path="/page/academicCalender"
            element={<AcademicCalendar />}
          />
          <Route
            path="/page/academicCalendar"
            element={<AcademicCalendar />}
          />
          <Route
            path="/academics/list-of-holidays"
            element={<ListOfHolidays />}
          />
          <Route
            path="/academics/holidays"
            element={<ListOfHolidays />}
          />
          <Route
            path="/page/holidays"
            element={<ListOfHolidays />}
          />
          <Route path="/academics/cbcs-framework" element={<CBCSFramework />} />
          <Route
            path="/academics/centers-of-excellence"
            element={<CentersOfExcellence />}
          />
          <Route path="/academics/faculty" element={<Faculty />} />
          <Route path="/academics/faculty/:id" element={<FacultyDetail />} />
          <Route
            path="/academics/international-collaboration"
            element={<InternationalCollaboration />}
          />

          <Route
            path="/academics/reports-publications"
            element={<ReportsPublications />}
          />
          <Route
            path="/academics/national-academic-depository"
            element={<NationalAcademicDepository />}
          />
          <Route
            path="/academics/nad"
            element={<NationalAcademicDepository />}
          />
          <Route path="/academics/schools" element={<Schools />} />

          <Route path="/schools/:shortCode" element={<SchoolsLayout />}>
              <Route index element={
                <Suspense fallback={<div>Loading School...</div>}>
                  <SchoolDetail />
                </Suspense>
              } />
              <Route path="faculty" element={<Faculty />} />
              <Route path="placement" element={<PlacementDashboard />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about/dean" element={<Dean />} />
              <Route path="about/board" element={<BoardOfStudies />} />
              <Route path="about/staff" element={<StaffMembers />} />
              <Route path="about/labs" element={<LaboratoryCards />} />
              <Route path="about/activities" element={<Conferences />} />
              <Route path="research-area" element={<ResearchArea />} />
              <Route path="research-projects" element={<ResearchProjects />} />
              <Route path="research-scholars" element={<ResearchScholars />} />
              <Route path="training-consultancy" element={<TrainingConsultancy />} />
              <Route path="patents" element={<Patents />} />
              <Route path="departments/coe-bioinformatics" element={<CoeBioinformatics />} />
              <Route path="departments/molecular-biology-lab" element={<MolecularBiologyLab />} />
              <Route path="departments/research-cell" element={<ResearchCellPage />} />
              <Route path="departments/advanced-computing-center" element={<SoeAdvancedComputing />} />
              <Route path="departments/engineering-design-lab" element={<SoeDesignLab />} />
              <Route path="departments/innovation-research-cell" element={<SoeInnovationCell />} />
              {/* SOBSC Centre Pages */}
              <Route path="departments/centre-buddhist-studies" element={<GenericCentrePage />} />
              <Route path="departments/pali-sanskrit-studies" element={<GenericCentrePage />} />
              <Route path="departments/heritage-archaeology" element={<GenericCentrePage />} />
              <Route path="departments/meditation-mindfulness-centre" element={<GenericCentrePage />} />
              {/* SOL Centre Pages */}
              <Route path="departments/moot-court-cell" element={<GenericCentrePage />} />
              <Route path="departments/legal-aid-clinic" element={<GenericCentrePage />} />
              <Route path="departments/constitutional-governance" element={<GenericCentrePage />} />
              <Route path="departments/cyber-law-centre" element={<GenericCentrePage />} />
              <Route path="departments/:deptId" element={<GenericDepartment />} />
              <Route path="departments/cse" element={<CSE />} />
              <Route path="departments/it" element={<IT />} />
              <Route path="departments/ece" element={<ECE />} />
              <Route path="departments/cyber-security" element={<CyberSecurity />} />
              <Route path="departments/coedt" element={<Coedt />} />
              <Route path="departments/raem" element={<Raem />} />
          </Route>

          {/* ------------------------------------------------------------------------------------------------------------------ */}




          {/* Admissions Routes */}
          {/* <Route
            path="/admissions/admission-process"
            element={<AdmissionProcess />}
          />
          <Route
            path="/admissions/courses-offered"
            element={<CoursesOffered />}
          />
          <Route
            path="/admissions/eligibility-reservation"
            element={<EligibilityReservation />}
          />
          <Route
            path="/admissions/fee-structure-prospectus"
            element={<FeeStructure />}
          />
          <Route
            path="/admissions/international-admissions"
            element={<InternationalAdmissions />}
          /> */}

          <Route
            path="/research/research-centers"
            element={<ResearchCenters />}
          />
          <Route path="/research/publications-patents" element={<Index />} />
          <Route path="/research/incubation" element={<Incubation />} />
          <Route path="/research/institution-innovation" element={<InstitutionInnovation />} />
          <Route path="/research/ipr-cell" element={<Ipr />} />

          {/* Campus Life Routes */}
          <Route
            path="/campus-life/hostel-facilities"
            element={<HostelDining />}
          />

          <Route path="/campus-life/hero" element={<Overview />} />
          <Route
            path="/campus-life/sports-fitness"
            element={<SportsCultural />}
          />

          <Route
            path="/campus-life/clubs-societies"
            element={<ClubsMain />}
          />
          <Route path="/club/:clubId" element={<ClubDetail />} />
          <Route path="/campus-life/NSS" element={<NSS />} />
          <Route path="/campus-life/NCC" element={<NCC />} />

          <Route
            path="/campus-life/meditation-center"
            element={<MeditationCenter />}
          />

          {/* Announcements Routes */}
          <Route
            path="/announcements/news-notifications"
            element={<NewsNotifications />}
          />
          <Route
            path="/announcements/news-notifications/:id"
            element={<NewsDetail />}
          />
          <Route
            path="/announcements/event-calendar"
            element={<EventsPage />}
          />
          <Route
            path="/announcements/event-calendar/:id"
            element={<EventDetail />}
          />
          <Route path="/announcements/notices" element={<Notice />} />
          <Route path="/announcements/notices/:id" element={<NoticeDetail />} />
          <Route
            path="/announcements/media-gallery"
            element={<MediaGallery />}
          />

          <Route
            path="/announcements/newsletter"
            element={<NewsLetter />}
          />

          {/* Placements Routes */}
          <Route path="/placements" element={<Placement_home />} />

          {/* Alumni Routes */}
          <Route path="/alumni" element={<AlumniMain />} />




          {/* <Route path="/itcellMain" element={<DACmain/>}/> */}
          <Route path="/it-cell" element={<ITCell />} />




          <Route path="/booking" element={<BookingMain />} />
          <Route path="/booking/:facilityId" element={<FacilityBookingPage />} />
          <Route path="/booking/track" element={<BookingTrack />} />





          <Route path="/tender" element={<TenderMain />} />


          <Route path="/rti" element={<RTI />} />
          <Route path="/contactUs" element={<ContactBanner />} />


          <Route path="/recruitments" element={<RecruitMain />} />


          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/sitemapAbout" element={<SitemapAbout />} />
          <Route path="/sitemapContact" element={<SitemapContact />} />
          <Route path="/sitemapAcademics" element={<SitemapAcademics />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />

          <Route path="/contactDirectory" element={<ContactDirectory/>}/>

          {/* Course Details Routes - Dynamic Course Pages */}
          <Route path="/schools/departments/courseDetailed" element={<CourseDetails />} />
          {/* <Route path="/schools/departments/courseDetailed/:school/:course" element={<CourseDetails />} /> */}

          {/* Semester Registration Routes — disabled for now (not being shipped yet)
          <Route path="/semester-registration" element={
            <ProtectedPortalRoute>
              <SemesterRegistration />
            </ProtectedPortalRoute>
          } />
          <Route path="/semester-registration/preview" element={
            <ProtectedPortalRoute>
              <RegistrationPreview />
            </ProtectedPortalRoute>
          } />
          */}

        </Routes>
    </Suspense>
  );
}
