import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const engineeringSlides = [
  {
    image: "/assets/campusimg/DSC_0089.JPG",
    title: "School of Engineering",
    subtitle: "Building the Future, One Innovation at a Time",
  },
  {
    image: "/assets/campusimg/Ellavya_Sports_complex.jpg",
    title: "Modern Infrastructure",
    subtitle: "Empowering Engineers with World-Class Facilities",
  },
  {
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=1920&h=1080&fit=crop",
    title: "Engineering Excellence",
    subtitle: "From Concept to Creation",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const engineeringOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Engineering",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Engineering</span> nurtures
                  problem-solvers and innovators across core engineering disciplines with a strong focus
                  on design, experimentation, and industry readiness.
                </>
              ),
              highlight: (
                <>
                  We combine <span className="font-semibold text-indigo-600">theory</span> with
                  <span className="font-semibold text-purple-600">practical applications</span> to build future-ready engineers.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Our programs emphasize labs, projects, and interdisciplinary collaboration to solve
                  real-world engineering challenges.
                </>
              ),
              bullets: [
                "Strong lab and workshop culture",
                "Industry-aligned curriculum",
                "Capstone and research-driven learning",
              ],
            },
          ],
        },
      },
    };
  },
  SchoolStats: (section) => ({
    ...section,
    props: {
      ...section.props,
      stats: [
        { value: 4, label: "Departments", suffix: "+" },
        { value: 16, label: "Programs", suffix: "+" },
        { value: 2200, label: "Students", suffix: "+" },
        { value: 70, label: "Faculty", suffix: "+" },
        { value: 180, label: "Publications", suffix: "+" },
        { value: 90, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Engineering, GBU",
      image: "/assets/campusimg/DSC_0089.JPG",
      description:
        "The School of Engineering focuses on excellence in teaching, research, and innovation with modern labs and strong industry partnerships.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Mechanical Engineering",
          code: "ME",
          description: "Design, manufacturing, thermal sciences, and automation.",
          courses: ["B.Tech ME", "M.Tech ME", "Ph.D ME"],
          faculty: 20,
          labs: 8,
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
          gradient: "from-orange-500 to-red-600",
          link: "/comingSoon",
        },
        {
          name: "Civil Engineering",
          code: "CE",
          description: "Structures, geotechnical, transportation, and environmental engineering.",
          courses: ["B.Tech CE", "M.Tech CE", "Ph.D CE"],
          faculty: 18,
          labs: 7,
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=250&fit=crop",
          gradient: "from-amber-500 to-orange-700",
          link: "/comingSoon",
        },
        {
          name: "Electrical Engineering",
          code: "EE",
          description: "Power systems, control, instrumentation, and renewable energy.",
          courses: ["B.Tech EE", "M.Tech EE", "Ph.D EE"],
          faculty: 16,
          labs: 6,
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
          gradient: "from-yellow-500 to-orange-600",
          link: "/comingSoon",
        },
        {
          name: "Electronics Engineering",
          code: "EC",
          description: "Embedded systems, VLSI, communication systems, and IoT.",
          courses: ["B.Tech EC", "M.Tech EC"],
          faculty: 16,
          labs: 6,
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop",
          gradient: "from-blue-500 to-indigo-700",
          link: "/comingSoon",
        },
      ],
    },
  }),
  ProgramsShowcase: (section) => ({
    ...section,
    props: {
      ...section.props,
      programs: [
        {
          name: "B.Tech Mechanical Engineering",
          code: "B.Tech ME",
          duration: "4 Years",
          specializations: ["Manufacturing", "Thermal"],
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop",
          description: "Undergraduate program in mechanical engineering fundamentals and applications.",
        },
        {
          name: "B.Tech Civil Engineering",
          code: "B.Tech CE",
          duration: "4 Years",
          specializations: ["Structures", "Transportation"],
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&auto=format&fit=crop",
          description: "Program focused on infrastructure development and construction technologies.",
        },
        {
          name: "B.Tech Electrical Engineering",
          code: "B.Tech EE",
          duration: "4 Years",
          specializations: ["Power", "Control"],
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop",
          description: "Program covering power systems, machines, and electrical design.",
        },
        {
          name: "M.Tech Engineering",
          code: "M.Tech",
          duration: "2 Years",
          specializations: ["Core Engineering"],
          image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&auto=format&fit=crop",
          description: "Postgraduate program with specialization options across core branches.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, engineeringOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: engineeringSlides },
  },
  ...sharedSections,
];
