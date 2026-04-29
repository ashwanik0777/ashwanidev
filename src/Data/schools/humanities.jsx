import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const humanitiesSlides = [
  {
    image: "/assets/campusimg/library.jpg",
    title: "School of Humanities & Social Sciences",
    subtitle: "Understanding Society, Inspiring Change",
  },
  {
    image: "/assets/campusimg/Artboard_1ccc_banner_1.jpg",
    title: "Diverse Disciplines",
    subtitle: "Exploring Human Culture and Thought",
  },
  {
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=1920&h=1080&fit=crop",
    title: "Social Impact",
    subtitle: "Research for a Better World",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const humanitiesOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Humanities & Social Sciences",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Humanities & Social Sciences</span>
                  explores human behavior, culture, language, and society to build critical thinkers
                  and compassionate leaders.
                </>
              ),
              highlight: (
                <>
                  We encourage <span className="font-semibold text-indigo-600">research</span> and
                  <span className="font-semibold text-purple-600">social engagement</span> for meaningful impact.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Our interdisciplinary programs strengthen analytical skills, communication, and
                  policy understanding across diverse fields.
                </>
              ),
              bullets: [
                "Interdisciplinary humanities programs",
                "Research and community initiatives",
                "Skill-based learning and communication",
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
        { value: 5, label: "Departments", suffix: "+" },
        { value: 14, label: "Programs", suffix: "+" },
        { value: 1800, label: "Students", suffix: "+" },
        { value: 55, label: "Faculty", suffix: "+" },
        { value: 160, label: "Publications", suffix: "+" },
        { value: 85, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Humanities & Social Sciences, GBU",
      image: "/assets/campusimg/library.jpg",
      description:
        "The School of Humanities & Social Sciences supports interdisciplinary learning, critical research, and social impact initiatives to nurture well-rounded graduates.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "English & Literature",
          code: "ENG",
          description: "Literature, language studies, and creative expression.",
          courses: ["B.A. English", "M.A. English", "Ph.D English"],
          faculty: 14,
          labs: 2,
          image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop",
          gradient: "from-rose-500 to-pink-600",
          link: "/comingSoon",
        },
        {
          name: "Political Science",
          code: "POL",
          description: "Governance, public policy, and international relations.",
          courses: ["B.A. Political Science", "M.A. Political Science"],
          faculty: 12,
          labs: 2,
          image: "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=400&h=250&fit=crop",
          gradient: "from-sky-500 to-blue-600",
          link: "/comingSoon",
        },
        {
          name: "Economics",
          code: "ECO",
          description: "Economic theory, development studies, and data analysis.",
          courses: ["B.A. Economics", "M.A. Economics"],
          faculty: 10,
          labs: 2,
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
          gradient: "from-emerald-500 to-green-700",
          link: "/comingSoon",
        },
        {
          name: "Psychology",
          code: "PSY",
          description: "Behavioral studies, counseling, and applied psychology.",
          courses: ["B.A. Psychology", "M.A. Psychology"],
          faculty: 9,
          labs: 2,
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=250&fit=crop",
          gradient: "from-purple-500 to-indigo-700",
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
          name: "B.A. English",
          code: "BA ENG",
          duration: "3 Years",
          specializations: ["Literature", "Linguistics"],
          image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop",
          description: "Undergraduate program focusing on literature and language.",
        },
        {
          name: "B.A. Political Science",
          code: "BA POL",
          duration: "3 Years",
          specializations: ["Public Policy", "International Relations"],
          image: "https://images.unsplash.com/photo-1453749024858-4bca89bd9edc?w=600&auto=format&fit=crop",
          description: "Program covering governance, politics, and policy frameworks.",
        },
        {
          name: "M.A. Economics",
          code: "MA ECO",
          duration: "2 Years",
          specializations: ["Development", "Applied Economics"],
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop",
          description: "Advanced studies in economic theory and data analysis.",
        },
        {
          name: "M.A. Psychology",
          code: "MA PSY",
          duration: "2 Years",
          specializations: ["Counseling", "Behavioral Science"],
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&auto=format&fit=crop",
          description: "Postgraduate program focused on psychology and human behavior.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, humanitiesOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: humanitiesSlides },
  },
  ...sharedSections,
];
