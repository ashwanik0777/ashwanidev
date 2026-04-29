import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const vocationalSlides = [
  {
    image: "/assets/campusimg/h2.webp",
    title: "School of Vocational Studies",
    subtitle: "Empowering Skills for Tomorrow",
  },
  {
    image: "/assets/campusimg/WhatsApp_Image_2025-06-25_at_4.28.55_PM.jpeg",
    title: "Hands-on Training",
    subtitle: "Bridging Education and Industry",
  },
  {
    image: "https://images.unsplash.com/photo-1465101178521-c1a9136a3fd8?w=1920&h=1080&fit=crop",
    title: "Career Readiness",
    subtitle: "Transforming Aspirations into Achievements",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const vocationalOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Vocational Studies",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Vocational Studies</span> focuses
                  on skill-based, industry-ready education with practical training and career orientation.
                </>
              ),
              highlight: (
                <>
                  We bridge <span className="font-semibold text-indigo-600">education</span> and
                  <span className="font-semibold text-purple-600">employment</span> through hands-on learning.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Programs are designed with industry partners to ensure employability, entrepreneurship,
                  and real-world exposure.
                </>
              ),
              bullets: [
                "Industry-linked curriculum",
                "Apprenticeship and internship pathways",
                "Skill certification and placement support",
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
        { value: 15, label: "Programs", suffix: "+" },
        { value: 2000, label: "Students", suffix: "+" },
        { value: 50, label: "Faculty", suffix: "+" },
        { value: 100, label: "Certifications", suffix: "+" },
        { value: 84, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Vocational Studies, GBU",
      image: "/assets/campusimg/h2.webp",
      description:
        "The School of Vocational Studies emphasizes practical skills, industry partnerships, and career readiness through hands-on training.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Hospitality & Hotel Management",
          code: "HHM",
          description: "Hospitality operations, culinary arts, and service management.",
          courses: ["B.Voc Hospitality", "Diploma in Hotel Management"],
          faculty: 12,
          labs: 4,
          image: "https://images.unsplash.com/photo-1521391406205-55c2f5a8b2da?w=400&h=250&fit=crop",
          gradient: "from-amber-500 to-orange-600",
          link: "/comingSoon",
        },
        {
          name: "Tourism & Travel",
          code: "TT",
          description: "Tourism management, travel operations, and event services.",
          courses: ["B.Voc Tourism", "Diploma in Travel"],
          faculty: 10,
          labs: 3,
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=250&fit=crop",
          gradient: "from-teal-500 to-cyan-600",
          link: "/comingSoon",
        },
        {
          name: "Fashion & Design",
          code: "FD",
          description: "Design fundamentals, textiles, and apparel production.",
          courses: ["B.Voc Fashion Design", "Diploma in Fashion"],
          faculty: 8,
          labs: 3,
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=250&fit=crop",
          gradient: "from-pink-500 to-rose-600",
          link: "/comingSoon",
        },
        {
          name: "Media & Communication",
          code: "MC",
          description: "Media production, digital communication, and journalism skills.",
          courses: ["B.Voc Media", "Diploma in Digital Media"],
          faculty: 10,
          labs: 3,
          image: "https://images.unsplash.com/photo-1452696196232-3ac7f0f2b8c2?w=400&h=250&fit=crop",
          gradient: "from-purple-500 to-indigo-600",
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
          name: "B.Voc Hospitality",
          code: "B.Voc HHM",
          duration: "3 Years",
          specializations: ["Hotel Operations", "Culinary"],
          image: "https://images.unsplash.com/photo-1521391406205-55c2f5a8b2da?w=600&auto=format&fit=crop",
          description: "Skill-based program in hospitality and hotel management.",
        },
        {
          name: "B.Voc Tourism",
          code: "B.Voc TT",
          duration: "3 Years",
          specializations: ["Travel Operations", "Event Management"],
          image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&auto=format&fit=crop",
          description: "Program focused on tourism services and travel operations.",
        },
        {
          name: "B.Voc Fashion Design",
          code: "B.Voc FD",
          duration: "3 Years",
          specializations: ["Apparel Design", "Textiles"],
          image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop",
          description: "Design-focused program for fashion and apparel production.",
        },
        {
          name: "B.Voc Media",
          code: "B.Voc MC",
          duration: "3 Years",
          specializations: ["Digital Media", "Content Production"],
          image: "https://images.unsplash.com/photo-1452696196232-3ac7f0f2b8c2?w=600&auto=format&fit=crop",
          description: "Media and communication program with practical studio exposure.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, vocationalOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: vocationalSlides },
  },
  ...sharedSections,
];
