import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchFacultyPublicList } from "../../services/facultyDashboardService";
import { getSchoolMeta } from "../../utils/schoolMeta";
import { matchDepartmentId } from "../../Data/schoolsMeta";
import useResponsiveSlider from "./useResponsiveSlider";
import SectionHeading, { SECTION_PADDING, SECTION_GUTTER, SECTION_CONTAINER, SLIDER_SIDE_SPACE, HEADING_SPACE } from "./SectionHeading";

import { resolveFacultyImage } from "../../utils/imageUtils";

// [min viewport width, cards per view]: mobile, tablet, laptop, desktop, full HD / projector, 4K
const CARD_BREAKPOINTS = [
  [0, 2],
  [640, 3],
  [1024, 4],
  [1280, 5],
  [1920, 6],
  [2560, 7],
];

export default function FacultyResponsiveSlider({
  title = "Faculty",
  facultyList = [],
  autoSlideInterval = 3000,
  gap = 16,
  navigateTo,
  schoolCode,
  departmentId,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dynamicFaculty, setDynamicFaculty] = useState([]);
  const navigate = useNavigate();
  const schoolMeta = useMemo(() => getSchoolMeta(schoolCode), [schoolCode]);
  const { viewportRef, cardsPerView, cardWidth, step } = useResponsiveSlider(CARD_BREAKPOINTS, gap);

  const effectiveFacultyList =
    dynamicFaculty.length > 0 ? dynamicFaculty : facultyList;

  const shouldScroll = effectiveFacultyList.length > cardsPerView;
  const maxIndex = Math.max(0, effectiveFacultyList.length - cardsPerView);

  // Keep the index valid when the screen size (and so cards per view) changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!shouldScroll || isPaused) return undefined;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [shouldScroll, isPaused, maxIndex, autoSlideInterval]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleCardClick = () => {
    const fallbackPath = `/schools/${schoolCode || "SOICT"}/faculty`;
    navigate(navigateTo || fallbackPath);
  };

  useEffect(() => {
    let mounted = true;

    const loadFaculty = async () => {
      if (!schoolCode) {
        setDynamicFaculty([]);
        return;
      }

      try {
        const preferredSchool = schoolMeta.apiParam || schoolMeta.name || "";
        const primary = await fetchFacultyPublicList({
          limit: 1000,
          school: preferredSchool,
        });
        let items = Array.isArray(primary?.items) ? primary.items : [];

        let filtered = items;
        if (departmentId) {
          filtered = items.filter((member) =>
            matchDepartmentId(schoolCode, member?.department) === departmentId
          );
        }

        const mapped = filtered
          .map((member) => ({
            name: member?.name || member?.fullName || "Faculty Member",
            title: member?.designation || member?.title || "Faculty",
            image: resolveFacultyImage(
              member?.imageUrl || member?.profileImageUrl || member?.image_url,
              member?.image,
              member?.name || member?.fullName,
              member?.email
            ),
          }))
          .filter((member) => member.name && member.title);

        if (mounted) {
          setDynamicFaculty(mapped);
        }
      } catch (error) {
        if (mounted) {
          setDynamicFaculty([]);
        }
      }
    };

    loadFaculty();

    return () => {
      mounted = false;
    };
  }, [schoolCode, schoolMeta.name, departmentId]);

  if (effectiveFacultyList.length === 0) return null;

  const arrowClass =
    "absolute top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 min-[2560px]:w-14 min-[2560px]:h-14 flex items-center justify-center rounded-full bg-white border border-blue-100 text-blue-700 shadow-md hover:bg-blue-50 active:scale-95 transition";

  return (
    <section className={`${SECTION_PADDING} bg-white overflow-hidden`}>
      <SectionHeading className={`${HEADING_SPACE} px-4`}>{title}</SectionHeading>

      <div
        className={`relative ${SECTION_CONTAINER} ${
          shouldScroll ? SLIDER_SIDE_SPACE : SECTION_GUTTER
        }`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {shouldScroll && (
          <button onClick={handlePrev} aria-label="Previous faculty" className={`${arrowClass} left-1 sm:left-2`}>
            <ChevronLeft className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
          </button>
        )}
        {shouldScroll && (
          <button onClick={handleNext} aria-label="Next faculty" className={`${arrowClass} right-1 sm:right-2`}>
            <ChevronRight className="w-5 h-5 min-[2560px]:w-8 min-[2560px]:h-8" />
          </button>
        )}

        <div ref={viewportRef} className="overflow-hidden">
          <motion.div
            animate={{ x: shouldScroll ? -currentIndex * step : 0 }}
            transition={{ ease: "easeInOut", duration: 0.6 }}
            className={`flex py-3${!shouldScroll ? " justify-center" : ""}`}
            style={{ gap: `${gap}px` }}
          >
            {cardWidth > 0 &&
              effectiveFacultyList.map((member, i) => (
                <div
                  key={i}
                  onClick={handleCardClick}
                  className="shrink-0 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm border border-blue-100 p-2.5 sm:p-3 min-[2560px]:p-5 flex flex-col items-center text-center cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  style={{ width: `${cardWidth}px` }}
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full max-w-36 min-[2560px]:max-w-60 aspect-[4/5] object-cover object-top rounded-lg shadow-sm mb-2.5"
                  />
                  <h3 className="text-sm sm:text-base min-[2560px]:text-2xl font-semibold text-blue-800 leading-snug line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="text-xs sm:text-sm min-[2560px]:text-xl text-gray-600 leading-snug line-clamp-2 mt-0.5">
                    {member.title}
                  </p>
                </div>
              ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
