import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchFacultyPublicList } from "../../services/facultyDashboardService";
import { getSchoolMeta } from "../../utils/schoolMeta";
import { matchDepartmentId } from "../../Data/schoolsMeta";

import { resolveFacultyImage } from "../../utils/imageUtils";

export default function FacultyResponsiveSlider({
  title = "Faculty",
  subTitle = "",
  facultyList = [],
  autoSlideInterval = 3000,
  visibleCards = 4,
  cardWidth = 280,
  gap = 38,
  navigateTo,
  schoolCode,
  departmentId,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disableAnimation, setDisableAnimation] = useState(false);
  const [dynamicFaculty, setDynamicFaculty] = useState([]);
  const navigate = useNavigate();
  const schoolMeta = useMemo(() => getSchoolMeta(schoolCode), [schoolCode]);

  const effectiveFacultyList =
    dynamicFaculty.length > 0 ? dynamicFaculty : facultyList;

  const moveBy = cardWidth + gap;

  const loopData = [
    ...effectiveFacultyList,
    ...effectiveFacultyList.slice(0, visibleCards),
  ];

  useEffect(() => {
    if (effectiveFacultyList.length <= visibleCards) return; 

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === effectiveFacultyList.length) {
          setDisableAnimation(true);
          setTimeout(() => {
            setCurrentIndex(0);
            setDisableAnimation(false);
          }, 50);
          return prev + 1;
        }
        return prev + 1;
      });
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [effectiveFacultyList.length, autoSlideInterval, visibleCards]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? effectiveFacultyList.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === effectiveFacultyList.length ? 0 : prev + 1
    );
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

  return (
    <section className="py-10 bg-white overflow-hidden relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
          {title}
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
        {/* {subTitle && (
          <p className="text-gray-600 text-sm mt-1">{subTitle}</p>
        )} */}
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4">
        <button
          onClick={handlePrev}
          className="absolute -left-10 top-1/2 -translate-y-1/2 bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full shadow-md z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={handleNext}
          className="absolute -right-10 top-1/2 -translate-y-1/2 bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded-full shadow-md z-10"
        >
          <ChevronRight size={24} />
        </button>

        <div className="overflow-hidden">
          <motion.div
            animate={{ x: -currentIndex * moveBy }}
            transition={
              disableAnimation ? { duration: 0 } : { ease: "easeInOut", duration: 0.6 }
            }
            className="flex gap-[38px] py-4 px-2"
            style={{
              width: `${(cardWidth + gap) * (effectiveFacultyList.length + visibleCards)}px`,
            }}
          >
            {loopData.map((member, i) => (
              <div
                key={i}
                onClick={handleCardClick}
                className="flex-shrink-0 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md border border-blue-200 p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                style={{ width: `${cardWidth}px` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-36 h-44 object-cover rounded-xl shadow mb-4"
                />
                <h3 className="text-lg font-semibold text-blue-800">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600">{member.title}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
