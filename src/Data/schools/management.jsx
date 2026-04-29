import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const managementSlides = [
  {
    image: "/assets/campusimg/5.jpg",
    title: "School of Management",
    subtitle: "Developing Leaders for a Dynamic World",
  },
  {
    image: "/assets/campusimg/Artboard_1ccc_banner_1.jpg",
    title: "Business Innovation",
    subtitle: "Where Ideas Become Impact",
  },
  {
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&h=1080&fit=crop",
    title: "Global Perspective",
    subtitle: "Preparing Students for International Success",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const managementOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Management",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Management</span> develops
                  business leaders with strong foundations in strategy, finance, marketing, and entrepreneurship.
                </>
              ),
              highlight: (
                <>
                  We focus on <span className="font-semibold text-indigo-600">industry relevance</span> and
                  <span className="font-semibold text-purple-600">leadership skills</span> through experiential learning.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Our programs combine case studies, internships, and live projects to prepare students for
                  dynamic business environments.
                </>
              ),
              bullets: [
                "Industry-centric curriculum",
                "Entrepreneurship and innovation focus",
                "Strong placement and mentorship support",
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
        { value: 3, label: "Departments", suffix: "+" },
        { value: 10, label: "Programs", suffix: "+" },
        { value: 1500, label: "Students", suffix: "+" },
        { value: 40, label: "Faculty", suffix: "+" },
        { value: 120, label: "Publications", suffix: "+" },
        { value: 90, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Management, GBU",
      image: "/assets/campusimg/Artboard_1ccc_banner_1.jpg",
      description:
        "The School of Management emphasizes leadership, innovation, and industry engagement to produce future-ready business professionals.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Management Studies",
          code: "MS",
          description: "Core management, strategy, and organizational leadership.",
          courses: ["BBA", "MBA"],
          faculty: 16,
          labs: 2,
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400&h=250&fit=crop",
          gradient: "from-blue-500 to-indigo-600",
          link: "/comingSoon",
        },
        {
          name: "Finance & Accounting",
          code: "FIN",
          description: "Financial markets, analytics, and corporate finance.",
          courses: ["MBA Finance", "M.Com"],
          faculty: 10,
          labs: 1,
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
          gradient: "from-emerald-500 to-green-700",
          link: "/comingSoon",
        },
        {
          name: "Marketing & Entrepreneurship",
          code: "MKT",
          description: "Branding, digital marketing, and startup ecosystems.",
          courses: ["MBA Marketing", "PGDM"],
          faculty: 8,
          labs: 1,
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=250&fit=crop",
          gradient: "from-orange-500 to-amber-600",
          link: "/comingSoon",
        },
        {
          name: "Human Resource Management",
          code: "HR",
          description: "People management, talent development, and organizational culture.",
          courses: ["MBA HR"],
          faculty: 6,
          labs: 1,
          image: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=400&h=250&fit=crop",
          gradient: "from-pink-500 to-rose-600",
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
          name: "BBA",
          code: "BBA",
          duration: "3 Years",
          specializations: ["Marketing", "Finance"],
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&auto=format&fit=crop",
          description: "Undergraduate management program with business fundamentals.",
        },
        {
          name: "MBA",
          code: "MBA",
          duration: "2 Years",
          specializations: ["Finance", "Marketing", "HR"],
          image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop",
          description: "Postgraduate program focused on leadership and strategic management.",
        },
        {
          name: "MBA Finance",
          code: "MBA FIN",
          duration: "2 Years",
          specializations: ["Corporate Finance", "Investment"],
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop",
          description: "Specialized MBA in finance and analytics.",
        },
        {
          name: "MBA Marketing",
          code: "MBA MKT",
          duration: "2 Years",
          specializations: ["Brand Management", "Digital Marketing"],
          image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&auto=format&fit=crop",
          description: "Specialized MBA in marketing and consumer insights.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, managementOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: managementSlides },
  },
  ...sharedSections,
];
