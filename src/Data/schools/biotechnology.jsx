import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const biotechSlides = [
  {
    image: "/assets/campusimg/Ellavya_Sports_complex.jpg",
    title: "School of Biotechnology",
    subtitle: "Innovating Life Sciences for a Better Tomorrow",
  },
  {
    image: "/assets/campusimg/library.jpg",
    title: "Cutting-edge Research",
    subtitle: "Transforming Healthcare and Agriculture",
  },
  {
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920&h=1080&fit=crop",
    title: "Biotech Labs",
    subtitle: "Where Curiosity Meets Discovery",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const biotechOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Biotechnology",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Biotechnology</span> focuses
                  on life sciences, molecular biology, genetics, and bioprocessing to solve real-world
                  challenges in health, agriculture, and sustainability.
                </>
              ),
              highlight: (
                <>
                  Our mission is to blend <span className="font-semibold text-indigo-600">scientific rigor</span>
                  with <span className="font-semibold text-purple-600">hands-on lab training</span> and
                  research-driven learning.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  We prepare students for careers in biotech, pharma, diagnostics, and research through
                  industry collaborations, project-based learning, and modern laboratories.
                </>
              ),
              bullets: [
                "Advanced lab-based curriculum",
                "Research exposure from early semesters",
                "Industry-oriented training and internships",
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
        { value: 12, label: "Programs", suffix: "+" },
        { value: 1200, label: "Students", suffix: "+" },
        { value: 45, label: "Faculty", suffix: "+" },
        { value: 150, label: "Publications", suffix: "+" },
        { value: 88, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Biotechnology, GBU",
      image: "/assets/campusimg/library.jpg",
      description:
        "The School of Biotechnology is led by a dedicated academic team focused on innovation in life sciences, interdisciplinary research, and strong industry engagement to shape future-ready graduates.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Biotechnology",
          code: "BT",
          description:
            "Core life sciences with focus on molecular biology, genetics, and bioprocessing.",
          courses: ["B.Tech Biotechnology", "M.Tech Biotechnology", "Ph.D Biotechnology"],
          faculty: 18,
          labs: 6,
          image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop",
          gradient: "from-emerald-500 to-green-600",
          link: "/comingSoon",
        },
        {
          name: "Bioinformatics",
          code: "BI",
          description:
            "Computational biology, data analysis, and genomics for modern biotech solutions.",
          courses: ["M.Sc Bioinformatics", "Ph.D Bioinformatics"],
          faculty: 10,
          labs: 3,
          image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop",
          gradient: "from-teal-500 to-cyan-600",
          link: "/comingSoon",
        },
        {
          name: "Life Sciences",
          code: "LS",
          description:
            "Foundation programs in biology, microbiology, and environmental sciences.",
          courses: ["B.Sc Life Sciences", "M.Sc Life Sciences"],
          faculty: 12,
          labs: 4,
          image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&h=250&fit=crop",
          gradient: "from-lime-500 to-green-700",
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
          name: "B.Tech Biotechnology",
          code: "BT",
          duration: "4 Years",
          specializations: ["Genetics", "Bioprocessing", "Industrial Biotechnology"],
          image: "https://images.unsplash.com/photo-1581091012184-5c2f1f5fe06f?w=600&auto=format&fit=crop",
          description: "Undergraduate program covering core and applied biotechnology practices.",
        },
        {
          name: "M.Tech Biotechnology",
          code: "M.Tech BT",
          duration: "2 Years",
          specializations: ["Bioprocess", "Molecular Biology"],
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&auto=format&fit=crop",
          description: "Postgraduate program focusing on advanced biotech research and applications.",
        },
        {
          name: "M.Sc Bioinformatics",
          code: "M.Sc BI",
          duration: "2 Years",
          specializations: ["Genomics", "Computational Biology"],
          image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&auto=format&fit=crop",
          description: "Specialized program in biological data analytics and computation.",
        },
        {
          name: "Ph.D Biotechnology",
          code: "Ph.D BT",
          duration: "Varies",
          specializations: ["Life Sciences Research"],
          image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop",
          description: "Doctoral research in emerging areas of biotechnology and life sciences.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, biotechOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: biotechSlides },
  },
  ...sharedSections,
];
