import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { resolveSchool } from "../../Data/schoolsMeta";
import { getSchoolMeta } from "../../utils/schoolMeta";
import { fetchFacultyPublicList } from "../../services/facultyDashboardService";

const LeadershipCard = (props) => {
  const { shortCode } = useParams();
  const [data, setData] = useState({
    name: props.name || "",
    title: props.title || "",
    image: props.image || "",
    description: props.description || ""
  });
  const [facultyLink, setFacultyLink] = useState(null);
  const [loading, setLoading] = useState(!props.name && !!(shortCode || props.schoolCode));

  useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
      // If no props were passed, we need to fetch from the school's home.jsx config
      let currentData = {
        name: props.name || "",
        title: props.title || "",
        image: props.image || "",
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
            currentData = {
              name: leadershipSection.props.name || "",
              title: leadershipSection.props.title || "",
              image: leadershipSection.props.image || "",
              description: leadershipSection.props.description || ""
            };
            if (isMounted) setData(currentData);
          }
        } catch (error) {
          console.error("Error loading leadership config:", error);
        }
      }
      
      if (isMounted) setLoading(false);

      // Now, try to find the faculty ID for this dean to make the link dynamic
      if (currentData.name && canonicalCode) {
        try {
          const schoolMeta = getSchoolMeta(canonicalCode);
          const preferredSchool = schoolMeta?.apiParam || schoolMeta?.name || "";
          const primary = await fetchFacultyPublicList({
            limit: 1000,
            school: preferredSchool,
          });
          
          if (primary && primary.items) {
            // Find faculty by name
            const deanNameLower = currentData.name.toLowerCase().replace(/dr\.|prof\.|mr\.|ms\./g, "").trim();
            const matchedFaculty = primary.items.find(f => {
              const fName = (f.name || f.fullName || "").toLowerCase().replace(/dr\.|prof\.|mr\.|ms\./g, "").trim();
              return fName.includes(deanNameLower) || deanNameLower.includes(fName);
            });
            
            if (matchedFaculty && (matchedFaculty._id || matchedFaculty.id)) {
              if (isMounted) setFacultyLink(`/academics/faculty/${matchedFaculty._id || matchedFaculty.id}`);
            } else {
               // Fallback to directory if not found
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
  }, [props.name, props.schoolCode, shortCode]);

  if (loading) {
    return <div className="py-12 text-center text-gray-500">Loading Dean's Profile...</div>;
  }

  const safeName = data.name || "Dean";
  const safeTitle = data.title || "Dean";
  const safeImage =
    data.image ||
    "https://ui-avatars.com/api/?name=Dean&background=0D8ABC&color=fff&size=300";
  const safeDescription =
    data.description ||
    "Dean's message will be updated soon. Please check back later.";

  const linkTarget = facultyLink || "/academics/faculty";

  return (
    <section className="py-12 sm:py-16 ">
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-blue-800">
          Dean's <span className="text-blue-800">Message</span>
        </h2>
        <div className="w-20 sm:w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6">
        <div className="w-full bg-white rounded-3xl shadow-xl border border-blue-200 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
          <img
            src={safeImage}
            alt={safeName}
            className="w-60 h-56 sm:w-48 sm:h-64 md:w-[220px] md:h-[300px] object-cover rounded-xl shadow-md"
          />
          <div className="text-center md:text-left">
            <Link to={linkTarget} className="inline-block hover:opacity-80 transition-opacity">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 hover:text-blue-700 underline decoration-transparent hover:decoration-blue-700 underline-offset-4 transition-all duration-300 cursor-pointer">
                {safeName}
              </h3>
            </Link>
            <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 mt-1">
              {safeTitle}
            </p>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line text-justify">
              {safeDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipCard;
