import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const buddhistSlides = [
  {
    image: "/assets/campusimg/Vesak_Day.jpg",
    title: "School of Buddhist Studies & Civilization",
    subtitle: "Exploring Wisdom, Heritage, and Peace",
  },
  {
    image: "/assets/campusimg/Yoda_Day.jpg",
    title: "Cultural Harmony",
    subtitle: "Celebrating Buddhist Traditions and Values",
  },
  {
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=1920&h=1080&fit=crop",
    title: "Global Perspectives",
    subtitle: "Connecting Ancient Wisdom with Modern Life",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const buddhistOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Buddhist Studies & Civilization",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Buddhist Studies & Civilization</span>
                  preserves Buddhist heritage while promoting critical scholarship, ethics, and peace studies.
                </>
              ),
              highlight: (
                <>
                  We connect <span className="font-semibold text-indigo-600">ancient wisdom</span> with
                  <span className="font-semibold text-purple-600">contemporary scholarship</span> for global understanding.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Our programs emphasize research, cultural immersion, and interdisciplinary perspectives to
                  nurture thoughtful scholars and responsible citizens.
                </>
              ),
              bullets: [
                "Classical and modern Buddhist studies",
                "Cultural and heritage research",
                "Global dialogue and peace initiatives",
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
        { value: 2, label: "Departments", suffix: "+" },
        { value: 8, label: "Programs", suffix: "+" },
        { value: 600, label: "Students", suffix: "+" },
        { value: 28, label: "Faculty", suffix: "+" },
        { value: 90, label: "Publications", suffix: "+" },
        { value: 82, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Buddhist Studies & Civilization, GBU",
      image: "/assets/campusimg/Vesak_Day.jpg",
      description:
        "The School of Buddhist Studies & Civilization promotes scholarship on Buddhist traditions, ethics, and cultural heritage through teaching, research, and community engagement.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Buddhist Studies",
          code: "BS",
          description: "Classical texts, philosophy, and Buddhist thought across traditions.",
          courses: ["B.A. Buddhist Studies", "M.A. Buddhist Studies", "Ph.D Buddhist Studies"],
          faculty: 12,
          labs: 2,
          image: "https://images.unsplash.com/photo-1544986581-efac024faf62?w=400&h=250&fit=crop",
          gradient: "from-amber-500 to-yellow-600",
          link: "/comingSoon",
        },
        {
          name: "Philosophy & Ethics",
          code: "PE",
          description: "Ethics, comparative philosophy, and contemporary moral discourse.",
          courses: ["B.A. Philosophy", "M.A. Philosophy"],
          faculty: 8,
          labs: 1,
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop",
          gradient: "from-orange-500 to-amber-700",
          link: "/comingSoon",
        },
        {
          name: "History & Culture",
          code: "HC",
          description: "Cultural history, art, and heritage studies with field immersion.",
          courses: ["B.A. History", "M.A. Culture Studies"],
          faculty: 8,
          labs: 1,
          image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=250&fit=crop",
          gradient: "from-yellow-500 to-orange-600",
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
          name: "B.A. Buddhist Studies",
          code: "BA BS",
          duration: "3 Years",
          specializations: ["Buddhist Philosophy", "Classical Texts"],
          image: "https://images.unsplash.com/photo-1544986581-efac024faf62?w=600&auto=format&fit=crop",
          description: "Undergraduate program focusing on Buddhist traditions and philosophy.",
        },
        {
          name: "M.A. Buddhist Studies",
          code: "MA BS",
          duration: "2 Years",
          specializations: ["Comparative Religion", "Ethics"],
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop",
          description: "Advanced postgraduate study in Buddhist thought and culture.",
        },
        {
          name: "M.A. Philosophy",
          code: "MA PH",
          duration: "2 Years",
          specializations: ["Ethics", "Indian Philosophy"],
          image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&auto=format&fit=crop",
          description: "Postgraduate program in philosophy and ethics.",
        },
        {
          name: "Ph.D Buddhist Studies",
          code: "Ph.D BS",
          duration: "Varies",
          specializations: ["Buddhist Research"],
          image: "https://images.unsplash.com/photo-1452696196232-3ac7f0f2b8c2?w=600&auto=format&fit=crop",
          description: "Doctoral research across Buddhist traditions and cultural studies.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, buddhistOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: buddhistSlides },
  },
  ...sharedSections,
];
