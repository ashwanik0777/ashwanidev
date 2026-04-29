import React from "react";
import { sectionsConfig as ictSections } from "./ict";
import { applySchoolOverrides } from "./schoolConfigUtils";

const lawSlides = [
  {
    image: "/assets/campusimg/FB_IMG_1664482115262.webp",
    title: "School of Law",
    subtitle: "Justice, Integrity, and Leadership",
  },
  {
    image: "/assets/campusimg/1634122517phpl3wwVT_480x360.jpg",
    title: "Legal Excellence",
    subtitle: "Empowering the Next Generation of Legal Minds",
  },
  {
    image: "https://images.unsplash.com/photo-1517971071642-34a2d3eccb5e?w=1920&h=1080&fit=crop",
    title: "Moot Court & Advocacy",
    subtitle: "Practical Training for Real-World Impact",
  },
];

const baseSections = ictSections.filter(
  (section) => section.componentName !== "Landing"
);

const lawOverrides = {
  AboutSection: (section) => {
    const [missionCard, commitmentCard] = section.props.data.cards;
    return {
      ...section,
      props: {
        ...section.props,
        data: {
          ...section.props.data,
          subtitle: "School of Law",
          cards: [
            {
              ...missionCard,
              content: (
                <>
                  The <span className="font-semibold text-blue-600">School of Law</span> develops legal
                  professionals with strong foundations in justice, governance, and ethical practice.
                </>
              ),
              highlight: (
                <>
                  We emphasize <span className="font-semibold text-indigo-600">advocacy</span> and
                  <span className="font-semibold text-purple-600">public service</span> through practical learning.
                </>
              ),
            },
            {
              ...commitmentCard,
              content: (
                <>
                  Our programs combine classroom learning with moot courts, internships, and legal clinics
                  to create industry-ready graduates.
                </>
              ),
              bullets: [
                "Moot court and advocacy training",
                "Legal research and drafting skills",
                "Community legal outreach",
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
        { value: 7, label: "Programs", suffix: "+" },
        { value: 900, label: "Students", suffix: "+" },
        { value: 32, label: "Faculty", suffix: "+" },
        { value: 110, label: "Publications", suffix: "+" },
        { value: 86, label: "Placement Rate", suffix: "%" },
      ],
    },
  }),
  LeadershipCard: (section) => ({
    ...section,
    props: {
      ...section.props,
      name: "Dean (I/C)",
      title: "School of Law, GBU",
      image: "/assets/campusimg/1634122517phpl3wwVT_480x360.jpg",
      description:
        "The School of Law emphasizes academic excellence, ethical legal practice, and hands-on training through moot courts and clinical programs.",
    },
  }),
  DepartmentsSection: (section) => ({
    ...section,
    props: {
      ...section.props,
      departments: [
        {
          name: "Law & Governance",
          code: "LG",
          description: "Constitutional law, governance, and public policy studies.",
          courses: ["B.A. LL.B.", "LL.M.", "Ph.D Law"],
          faculty: 18,
          labs: 2,
          image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&h=250&fit=crop",
          gradient: "from-blue-600 to-indigo-700",
          link: "/comingSoon",
        },
        {
          name: "Corporate & Business Law",
          code: "CBL",
          description: "Corporate law, commercial transactions, and regulatory frameworks.",
          courses: ["B.B.A. LL.B.", "LL.M. Corporate Law"],
          faculty: 14,
          labs: 1,
          image: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=400&h=250&fit=crop",
          gradient: "from-slate-600 to-gray-700",
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
          name: "B.A. LL.B.",
          code: "BA LLB",
          duration: "5 Years",
          specializations: ["Constitutional Law", "Criminal Law"],
          image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&auto=format&fit=crop",
          description: "Integrated law program with strong foundations in social sciences and law.",
        },
        {
          name: "B.B.A. LL.B.",
          code: "BBA LLB",
          duration: "5 Years",
          specializations: ["Corporate Law", "Business Law"],
          image: "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=600&auto=format&fit=crop",
          description: "Integrated program combining business management and legal studies.",
        },
        {
          name: "LL.M.",
          code: "LLM",
          duration: "2 Years",
          specializations: ["Corporate", "Constitutional"],
          image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&auto=format&fit=crop",
          description: "Postgraduate program with specialization options across law domains.",
        },
        {
          name: "Ph.D Law",
          code: "Ph.D",
          duration: "Varies",
          specializations: ["Legal Research"],
          image: "https://images.unsplash.com/photo-1517971071642-34a2d3eccb5e?w=600&auto=format&fit=crop",
          description: "Doctoral research across legal studies and governance.",
        },
      ],
    },
  }),
};

const sharedSections = applySchoolOverrides(baseSections, lawOverrides);

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: lawSlides },
  },
  ...sharedSections,
];
