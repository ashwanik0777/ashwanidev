import { useEffect, useRef, useState, Suspense } from "react";
import { useLocation } from "react-router-dom";
import AppRouter from "./routes/router";
import PreLoad from "../src/components/home/preLoad.jsx";
import Primarynavbar from "../src/components/home/Primarynavbar.jsx";
import Navbar from "../src/components/home/Navbar.jsx";
import DepartmentNavbar from "../src/components/departments/Navbar.jsx";
import Footer from "../src/components/home/Footer.jsx";
import ScrollToTop from "./hooks/scrollToTop.jsx";
import useHashScroll from "./hooks/useHashScroll.js";
import { watchJustify } from "./utils/autoJustify.js";

function App() {
  // Enable cross-page hash-based scrolling (used by search)
  useHashScroll();
  const [isPreloadComplete, setIsPreloadComplete] = useState(() => {
    return localStorage.getItem("preloadComplete") === "true" || (typeof window !== "undefined" && new URLSearchParams(window.location.search).has("nopreload"));
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("loggedIn") === "true";
  });

  const location = useLocation();
  const isICTPage = location.pathname.startsWith("/schools");
  const isFacultyPortalPage = location.pathname.startsWith("/faculty-portal");
  const isSchoolPortalPage = location.pathname.startsWith("/school-portal");
  const isAdminPortalPage = location.pathname.startsWith("/admin-portal");
  const isMaintenancePortalPage = location.pathname.startsWith("/maintenance-portal");
  const isPortalPage = isFacultyPortalPage || isSchoolPortalPage || isAdminPortalPage || isMaintenancePortalPage;
  const isAuthPage = ["/login", "/login/forgot-password", "/admission/login", "/faculty-register"].includes(
    location.pathname
  );
  const shouldHideChrome = isPortalPage || isAuthPage;

  useEffect(() => {
    if (isPreloadComplete) {
      localStorage.setItem("preloadComplete", "true");
    }
  }, [isPreloadComplete]);

  // Justified description text on the public pages (see utils/autoJustify.js).
  // Dashboards and login pages are left as they are.
  const pageContentRef = useRef(null);
  useEffect(() => {
    if (!isPreloadComplete || shouldHideChrome) return undefined;
    return watchJustify(pageContentRef.current);
  }, [isPreloadComplete, shouldHideChrome]);


  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {!isPreloadComplete ? (
          <PreLoad onComplete={() => setIsPreloadComplete(true)} />
        ) : (
          <>
          <ScrollToTop>
            {!shouldHideChrome && <Primarynavbar />}
            {!shouldHideChrome &&
              (isICTPage ? (
                <div className="mt-9">
                  <DepartmentNavbar />
                </div>
              ) : (
                <Navbar />
              ))}
            <div ref={pageContentRef} className={shouldHideChrome ? "pt-0" : isICTPage ? "pt-9 sm:pt-14 xl:pt-14" : "pt-[5.5rem] sm:pt-24 xl:pt-[6.1rem]"}>
              <AppRouter />
            </div>
            {!shouldHideChrome && <Footer />}
            </ScrollToTop>
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
