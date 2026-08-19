import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

const somBanner =
  "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=600&h=400&fit=crop";

const somSlides = [
  {
    title: "School of Management",
    subtitle: "Gautam Buddha University",
    description:
      "Residential management education with industry collaboration, modern facilities, and a research-driven culture.",
    image: somBanner,
  },
  {
    title: "MBA and Dual Degree Programs",
    subtitle: "Leadership and analytics",
    description:
      "Programs span MBA, dual degree BBA+MBA, executive MBA, and doctoral research in management.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
  },
  {
    title: "Corporate Resource Center",
    subtitle: "Placement readiness",
    description:
      "Summer internships and final placements connect students with industry expectations and career growth.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: somSlides },
  },
  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        subtitle: "School of Management",
        floatingIcons: [
          {
            icon: <Code size={40} />,
            color: "text-blue-400",
            style: "top-20 left-10",
          },
          {
            icon: <Lightbulb size={35} />,
            color: "text-purple-400",
            style: "top-32 right-20",
          },
          {
            icon: <Rocket size={45} />,
            color: "text-indigo-400",
            style: "bottom-20 left-1/4",
          },
        ],
        cards: [
          {
            title: "Our Mission",
            icon: <Target size={28} />,
            bgGradient: "from-blue-500 to-purple-600",
            content: (
              <>
                The{" "}
                <span className="font-semibold text-blue-600">
                  School of Management
                </span>{" "}
                commenced its first batch of MBA in August 2008 and has grown
                with an integrated focus on collaboration, modern facilities,
                and a fully residential learning environment.
              </>
            ),
            highlight: (
              <>
                At present, the school offers{" "}
                <span className="font-semibold text-indigo-600">
                  MBA, Dual Degree BBA+MBA (with exit option), and Doctoral
                  Programme
                </span>{" "}
                with a curriculum that has international and cross-cultural
                focus.
              </>
            ),
          },
          {
            title: "Our Commitment",
            icon: <Trophy size={28} />,
            bgGradient: "from-purple-500 to-pink-600",
            content: (
              <>
                The teaching pedagogy blends lectures, experience sharing,
                case-based learning, and analytical problem solving to build
                confident, industry-ready managers.
              </>
            ),
            bullets: [
              <span className="font-semibold text-gray-800">
                MBA specializations in Finance, HRM, Marketing, Operations, and
                Strategy
              </span>,
              "Dual degree MBA for professionally skilled global business managers",
              "Doctoral research across all functional areas of management",
            ],
          },
        ],
      },
    },
  },

  {
    componentName: "SchoolStats",
    enabled: false,
    position: 3,
    props: {
      title: "Our numbers speak for themselves",
      stats: [
        { value: 2008, label: "Established", suffix: "" },
        { value: 17, label: "Faculty", suffix: "+" },
        { value: 6, label: "Programs", suffix: "+" },
        { value: 6, label: "Specializations", suffix: "" },
        { value: 50, label: "PhD Scholars", suffix: "+" },
        { value: 85, label: "Placement Rate", suffix: "%+" },
      ],
    },
  },
  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: "Dr. Indu Uprety",
      title: "Dean (I/C) & Associate Professor - School of Management, GBU",
      image:
        "https://faculty.gbu.ac.in/../uploads/photos/6605384ccc2da_induu (1).jpg ",
      description:
        "Dr. Indu Uprety is Associate Professor and Dean(I/C), University School of Management. Education: Ph.D. (Statistics)[Reliability Theory], DST Fellowship as JRF, M.Sc.(Statistics), Six Sigma (BB) Certification (Indian Statistical Institute, Delhi), Executive Education Programme in Operations Management (Awarded IIM-Kozhikode Gold Medal). Area of Specialization: Operations Mgmt & Decision Sciences Area.",
    },
  },
  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "Department of Business Management",
          code: "DBM",
          description:
            "Department of Business Management focuses on multi-disciplinary and actionable business management programs. Presently, it runs programmes: Master in Business Administration (2 year full time), Dual Degree BBA+MBA (with exit option), B.Com (Hons), M.Com, MBA (Executive) 2 years and Doctoral Programme (Fulltime/Working Professional).",
          courses: [
            "MBA (2 year full time)",
            "Dual Degree BBA+MBA (with exit option)",
            "B.Com (Hons)",
            "M.Com",
            "MBA (Executive) 2 years",
            "Doctoral Programme",
          ],
          faculty: 17,
          labs: 4,
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
          gradient: "from-blue-400 to-blue-600",
          link: "/schools/SOM/departments/business-management",
        },
      ],
    },
  },
  {
    componentName: "ProgramsShowcase",
    enabled: true,
    position: 6,
    props: {
      programs: [
        {
          name: "Dual Degree BBA+MBA (with exit option)",
          code: "BBA+MBA",
          duration: "5 Years",
          specializations: [
            "Finance",
            "HRM",
            "Marketing",
            "Operations",
            "Strategy",
          ],
          image:
            "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
          description:
            "Integrated dual degree program building strong foundations in business and management.",
        },
        {
          name: "B.Com (Honours)",
          code: "B.Com Hons",
          duration: "3 Years",
          specializations: ["Accounting", "Finance", "Business Fundamentals"],
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
          description:
            "Undergraduate commerce program with a strong base in accounting and finance.",
        },
        {
          name: "MBA",
          code: "MBA",
          duration: "2 Years",
          specializations: [
            "Finance",
            "HRM",
            "Marketing",
            "Operations",
            "Strategy",
          ],
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
          description:
            "Flagship MBA program with industry-relevant specializations and leadership focus.",
        },
        {
          name: "MBA (Executive)",
          code: "MBA Exec",
          duration: "2 Years",
          specializations: ["Leadership", "Operations", "Strategy"],
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
          description:
            "Executive MBA for working professionals to advance strategic and managerial skills.",
        },
        {
          name: "MBA (Business Analytics & Data Science)",
          code: "MBA BADS",
          duration: "2 Years",
          specializations: [
            "Data Science",
            "Business Analytics",
            "AI in Business",
          ],
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
          description:
            "Analytics-focused MBA program for data-driven decision making and business insights.",
        },
        {
          name: "Ph.D. (Business Management)",
          code: "PhD BM",
          duration: "Varies",
          specializations: [
            "Finance",
            "Marketing",
            "HRM",
            "Operations",
            "Strategy",
          ],
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Doctoral research program across functional areas of management.",
        },
      ],
    },
  },
  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of Management",
      subTitle: "",
      facultyList: [
        {
          name: "Prof. Shweta Anand",
          title: "Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660fdd8f07e7c_Photo Prof Shweta Anand.jpeg ",
        },
        {
          name: "Dr. Indu Uprety",
          title: "Associate Professor & Dean (I/C)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605384ccc2da_induu (1).jpg ",
        },
        {
          name: "Dr. Neeti Rana",
          title: "Associate Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660537a861cc0_neeti.jpg ",
        },
        {
          name: "Dr. Ombir Singh",
          title: "Assistant Professor & HoD",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660537bbe4320_odahiya.jpg ",
        },
        {
          name: "Dr. Subhojit Banerjee",
          title: "Assistant Professor & HoD",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660537d9f2793_subhojit.jpg ",
        },
        {
          name: "Dr. Ajay Kumar Kansal",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605385fcad96_ajay.jpg ",
        },
        {
          name: "Dr. Dinesh Kumar Sharma",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053774653dc_dinesh.jpg ",
        },
        {
          name: "Dr. Kavita Singh",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c3f1f03a01a_Screenshot_20250302_110655_WhatsApp~2.jpg ",
        },
        {
          name: "Dr. Lovy Sarikwal",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053781ad234_lsarikwal.jpg ",
        },
        {
          name: "Dr. Monika Bhati",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660ea875496ce_37763569-971C-4CA7-AD79-1D8C361639E5.jpeg ",
        },
        {
          name: "Dr. Naveen Kumar",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053761a57c3_naveen.jpg ",
        },
        {
          name: "Dr. Rakesh Kumar Srivastava",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Samar Raqshin",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660e589b876b2_B.jpeg ",
        },
        {
          name: "Dr. Satish K Mittal",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053839d87e8_skumar.jpg ",
        },
        {
          name: "Dr. Varsha Dixit",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053791f1813_varsha.jpg ",
        },
        {
          name: "Dr. Shobha Devi",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6734be2cbbc09_WhatsApp Image 2024-11-13 at 19.59.32.jpeg ",
        },
        {
          name: "Ms. Ragini Jadon",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6721f1bb948f2_press re. pic.jpg ",
        },
      ],
    },
  },
  {
    componentName: "NoticeEvents",
    enabled: true,
    position: 8,
    props: {
      notices: [
        {
          title: "MBA Executive Brochure",
          date: "2025-01-05",
          type: "Academic",
        },
        {
          title: "MBA in Business Analytics and Data Science Brochure",
          date: "2025-01-08",
          type: "Academic",
        },
        {
          title:
            "10 Days Research Methodology Course on Integration of AI in Research sponsored by the ICSSR",
          date: "2025-01-12",
          type: "Research",
        },
        {
          title:
            "ICSSR Sponsored 10 Days AI-based Research Methodology Course by SOM in Dec 2024",
          date: "2025-01-15",
          type: "Research",
        },
        {
          title:
            "Students Visit Reserve Bank of India, Gaining Deep Insight into RBI Operations",
          date: "2025-01-20",
          type: "Event",
        },
        {
          title: "Investor Awareness Programme",
          date: "2025-01-24",
          type: "Event",
        },
      ],
      events: [
        {
          title: "ICSSR Research Methodology Course",
          date: "2024-12-03",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
          description:
            "Ten-day program on integrating AI in research for management scholars.",
        },
        {
          title: "RBI Exposure Visit",
          date: "2025-01-18",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
          description:
            "Industry visit to understand central banking operations and policy.",
        },
        {
          title: "Investor Awareness Session",
          date: "2025-01-28",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
          description:
            "Market education session focusing on responsible investing.",
        },
        {
          title: "CRC Placement Orientation",
          date: "2025-02-10",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description: "Guidance for summer internships and final placements.",
        },
        {
          title: "Management Research Colloquium",
          date: "2025-03-05",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
          description:
            "Faculty and doctoral scholars present ongoing research.",
        },
        {
          title: "Admissions Outreach",
          date: "2025-03-20",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Information sessions on SOM programs and admission process.",
        },
      ],
      initialNoticeCount: 5,
      sectionTitle: "Notices & Events",
      sectionSubtitle: "Stay updated with all updates",
    },
  },
  {
    componentName: "ClubsAchievements",
    enabled: true,
    position: 9,
    props: {
      clubs: [
        {
          name: "Yashodhara Sikha Shivir",
          description:
            "Social outreach club supporting underprivileged students through education and mentoring.",
          members: 120,
          category: "Social Outreach",
          facultyAdvisor: "Prof. Shweta Anand",
          image:
            "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
          socialLinks: {
            email: "admissions@gbu.ac.in",
          },
        },
        {
          name: "Lifestyle@Environment",
          description:
            "Sustainability and ESG awareness club promoting environmental responsibility.",
          members: 90,
          category: "Sustainability",
          facultyAdvisor: "Prof. Shweta Anand",
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          socialLinks: {
            email: "ragini.ocfd@gbu.ac.in",
          },
        },
        {
          name: "Corporate Resource Centre (CRC)",
          description:
            "Placement and industry connect cell supporting internships and final placements.",
          members: 150,
          category: "Placements",
          facultyAdvisor: "Dr. Indu Uprety",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          socialLinks: {
            email: "crc@gbu.ac.in",
          },
        },
        {
          name: "Finance & Investment Club",
          description:
            "Investor awareness and market education initiatives for students.",
          members: 80,
          category: "Finance",
          facultyAdvisor: "Dr. Ajay Kumar Kansal",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
          socialLinks: {
            email: "crc@gbu.ac.in",
          },
        },
        {
          name: "Research & Analytics Club",
          description:
            "Research methodology workshops and analytics-focused learning initiatives.",
          members: 70,
          category: "Research",
          facultyAdvisor: "Dr. Naveen Kumar",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
          socialLinks: {
            email: "vinay.litoria@gbu.ac.in",
          },
        },
      ],
    },
  },
  {
    componentName: "PlacementsSection",
    enabled: false,
    position: 10,
    props: {
      data: {
        title: "Placements",
        subTitle: "Corporate Resource Center",
        heroImage:
          "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
        placementStats: [
          {
            label: "CRC Email",
            value: "crc@gbu.ac.in",
            color: "bg-green-500",
          },
          {
            label: "CRC Phone",
            value: "+91-120-2344209",
            color: "bg-blue-500",
          },
          {
            label: "Admissions Email",
            value: "admissions@gbu.ac.in",
            color: "bg-purple-500",
          },
          {
            label: "Admissions Phone",
            value: "0120-2344234",
            color: "bg-yellow-500",
          },
        ],
      },
    },
  },
  {
    componentName: "RecentPlacements",
    enabled: false,
    position: 11,
    props: {
      data: {
        sectionTitle: "Success Stories",
        students: [
          {
            name: "SOM Graduate",
            company: "Adani Power Ltd",
            package: "INR 7.2 LPA",
            department: "MBA",
            photo:
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
          },
          {
            name: "SOM Graduate",
            company: "Coca Cola",
            package: "INR 8.1 LPA",
            department: "MBA Marketing",
            photo:
              "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
          },
          {
            name: "SOM Graduate",
            company: "Bank of Baroda",
            package: "INR 6.8 LPA",
            department: "MBA Finance",
            photo:
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          },
          {
            name: "SOM Graduate",
            company: "Reliance Money",
            package: "INR 7.4 LPA",
            department: "MBA Finance",
            photo:
              "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
          },
          {
            name: "SOM Graduate",
            company: "Hero Motors",
            package: "INR 7.0 LPA",
            department: "MBA Operations",
            photo:
              "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
          },
          {
            name: "SOM Graduate",
            company: "India Infoline",
            package: "INR 7.6 LPA",
            department: "MBA Finance",
            photo:
              "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
          },
        ],
      },
    },
  },
  {
    componentName: "RecruitersShowcase",
    enabled: false,
    position: 12,
    props: {
      recruitersData: [
        {
          name: "Adani Power Ltd",
          logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
        },
        {
          name: "Aircel",
          logo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
        },
        {
          name: "Albert David Ltd",
          logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        },
        {
          name: "Anand Rathi",
          logo: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
        },
        {
          name: "Auth Bridge Research Services Pvt Ltd",
          logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        },
        {
          name: "Aviva Life Insurance",
          logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
        },
        {
          name: "B H E L",
          logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
        },
        {
          name: "Bank of Baroda",
          logo: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
        },
        {
          name: "Bharat Petroleum Corp.Ltd",
          logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
        },
        {
          name: "Bhushan Steel",
          logo: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
        },
        {
          name: "Central Electronic Limited",
          logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        },
        {
          name: "Caparo Engineering",
          logo: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
        },
      ],
    },
  },
  {
    componentName: "StudentStartup",
    enabled: true,
    position: 13,
    props: {
      startupData: {
        startups: [
          {
            name: "SOM Consulting Studio",
            founder: "School of Management Students",
            description:
              "Student-led consulting and analytics studio delivering market research for local enterprises.",
            funding: "University Supported",
            status: "Incubated",
            image:
              "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=400&fit=crop",
            year: "2021",
          },
        ],
        stats: {
          totalFunding: "INR 10L+",
          totalDepartments: 1,
        },
      },
    },
  },
  {
    componentName: "StudentAchievements",
    enabled: true,
    position: 14,
    props: {
      achievements: [
        {
          title: "MBA First Batch Launch",
          achievement: "120 Students",
          year: "2008",
          student: "SOM Cohort",
          department: "MBA",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
          description:
            "The School of Management started its MBA program with a cohort of 120 students.",
        },
        {
          title: "ICSSR Research Methodology Course",
          achievement: "10-Day Program",
          year: "2024",
          student: "Research Scholars",
          department: "Research",
          image:
            "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=600&h=400&fit=crop",
          description:
            "ICSSR sponsored training on AI-enabled research methodology for management scholars.",
        },
        {
          title: "RBI Industry Exposure Visit",
          achievement: "Policy Insights",
          year: "2025",
          student: "MBA Students",
          department: "Finance",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Students visited the Reserve Bank of India to understand central banking operations.",
        },
        {
          title: "Investor Awareness Programme",
          achievement: "Market Literacy",
          year: "2025",
          student: "SOM Community",
          department: "Finance",
          image:
            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
          description:
            "Programme focused on responsible investing and financial awareness for students.",
        },
      ],
    },
  },
];