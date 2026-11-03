import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Quote, ChevronDown } from "lucide-react";
import { resolveSchool } from "../../Data/schoolsMeta";
import { getSchoolMeta } from "../../utils/schoolMeta";
import { fetchFacultyPublicList } from "../../services/facultyDashboardService";
import SectionHeading, { SECTION_PADDING, VISION_CONTAINER } from "./SectionHeading";

const LeadershipCard = (props) => {
  const { shortCode } = useParams();
  const [data, setData] = useState({
    name: props.name || "",
    title: props.title || "",
    image: props.image || "",
    shortMessage: props.shortMessage || "",
    description: props.description || ""
  });
  const [facultyLink, setFacultyLink] = useState(null);
  const [loading, setLoading] = useState(!props.name && !!(shortCode || props.schoolCode));
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      let currentData = {
        name: props.name || "",
        title: props.title || "",
        image: props.image || "",
        shortMessage: props.shortMessage || "",
        description: props.description || ""
      };
      const currentShortCode = shortCode || props.schoolCode;
      let canonicalCode = currentShortCode ? resolveSchool(currentShortCode)?.code || currentShortCode.toUpperCase() : null;

      if (!props.name && canonicalCode) {
        try {
          const module = await import(`../../Data/schools/${canonicalCode}/home.jsx`);
          const sections = module.sectionsConfig || [];
          const leadershipSection = sections.find(sec => sec.componentName === "LeadershipCard");
          if (leadershipSection && leadershipSection.props) {
            const p = leadershipSection.props;
            currentData = {
              name: p.name || "",
              title: p.title || "",
              image: p.image || "",
              shortMessage: p.shortMessage || "",
              description: p.description || p.message || ""
            };
            if (isMounted) setData(currentData);
          }
        } catch (error) {
          console.error("Error loading leadership config:", error);
        }
      }

      if (isMounted) setLoading(false);

      if (currentData.name && canonicalCode) {
        try {
          const schoolMeta = getSchoolMeta(canonicalCode);
          const preferredSchool = schoolMeta?.apiParam || schoolMeta?.name || "";
          const primary = await fetchFacultyPublicList({
            limit: 1000,
            school: preferredSchool,
          });

          if (primary && primary.items) {
            const deanNameLower = currentData.name.toLowerCase().replace(/dr\.|prof\.|mr\.|ms\./g, "").trim();
            const matchedFaculty = primary.items.find(f => {
              const fName = (f.name || f.fullName || "").toLowerCase().replace(/dr\.|prof\.|mr\.|ms\./g, "").trim();
              return fName.includes(deanNameLower) || deanNameLower.includes(fName);
            });

            if (matchedFaculty && (matchedFaculty._id || matchedFaculty.id)) {
              if (isMounted) setFacultyLink(`/academics/faculty/${matchedFaculty._id || matchedFaculty.id}`);
            } else {
              if (isMounted) setFacultyLink(`/schools/${canonicalCode}/faculty`);
            }
          }
        } catch (err) {
          console.error("Failed to fetch faculty for dean linking:", err);
          if (isMounted) setFacultyLink(`/schools/${canonicalCode}/faculty`);
        }
      }
    };

    loadData();
    return () => { isMounted = false; };
  }, [props.name, props.schoolCode, props.shortMessage, props.description, shortCode]);

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading Dean's Profile...</div>;
  }

  const safeName = data.name || "Dean";
  const safeTitle = data.title || "Dean";
  const safeImage =
    data.image ||
    "https://ui-avatars.com/api/?name=Dean&background=0D8ABC&color=fff&size=300";

  const fullText = typeof data.description === "string" ? data.description : "";
  const shortText = typeof data.shortMessage === "string" ? data.shortMessage : "";

  const hasToggle = Boolean(shortText && fullText && shortText.trim() !== fullText.trim());

  const displayedText = hasToggle
    ? (isExpanded ? fullText : shortText)
    : (fullText || shortText || "Dean's message will be updated soon. Please check back later.");

  // Long messages without a separate short version are clamped, so every school's card stays compact
  const canClamp = !hasToggle && displayedText.length > 500;
  const showToggle = hasToggle || canClamp;

  const linkTarget = facultyLink || "/academics/faculty";

  // Small photo with name, designation and message beside it, so the card is only as tall as its text
  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <div className="px-3 sm:px-4 lg:px-5">
        <div className={VISION_CONTAINER}>
          <SectionHeading>Dean's Message</SectionHeading>

          {/* From tablet up: photo spans 4 rows; the 1fr rows above/below centre the text against the photo */}
          <div className="relative grid grid-cols-[auto_1fr] sm:grid-rows-[1fr_auto_auto_1fr] gap-x-4 sm:gap-x-6 min-[2560px]:gap-x-10 gap-y-3 sm:gap-y-0 bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 min-[2560px]:p-10 shadow-sm border border-blue-100 border-l-4 border-l-blue-600">
            <Quote
              aria-hidden="true"
              className="absolute top-3 right-3 sm:top-4 sm:right-5 w-8 h-8 sm:w-10 sm:h-10 min-[2560px]:w-16 min-[2560px]:h-16 text-blue-100"
            />

            <img
              src={safeImage}
              alt={safeName}
              className="sm:row-start-1 sm:row-span-4 w-20 h-24 sm:w-36 sm:h-44 lg:w-40 lg:h-48 min-[1920px]:w-44 min-[1920px]:h-52 min-[2560px]:w-64 min-[2560px]:h-80 object-cover object-top rounded-lg sm:rounded-xl shadow-sm ring-2 ring-blue-100"
            />

            {/* Name + designation */}
            <div className="self-center sm:self-end sm:row-start-2 sm:col-start-2 min-w-0 pr-10 sm:pr-14">
              <Link to={linkTarget} className="hover:opacity-80 transition-opacity">
                <h3 className="text-base sm:text-xl min-[2560px]:text-4xl font-bold text-blue-900 hover:text-blue-700 leading-tight">
                  {safeName}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm min-[2560px]:text-2xl text-blue-600 font-medium mt-0.5 leading-snug">
                {safeTitle}
              </p>
            </div>

            {/* Message (below the photo row on mobile, beside the photo from tablet up) */}
            <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-3 sm:mt-3 min-[2560px]:mt-5 min-w-0">
              <p
                className={`text-slate-700 text-sm sm:text-base min-[2560px]:text-2xl whitespace-pre-line text-justify leading-relaxed ${
                  canClamp && !isExpanded ? "line-clamp-4" : ""
                }`}
              >
                {displayedText}
              </p>

              {showToggle && (
                <button
                  type="button"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="mt-2 inline-flex items-center gap-1 text-sm min-[2560px]:text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                >
                  {isExpanded ? "Show less" : "Read full message"}
                  <ChevronDown
                    className={`w-4 h-4 min-[2560px]:w-6 min-[2560px]:h-6 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCard;
