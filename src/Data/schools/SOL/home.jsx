import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

const lawBanner =
  "https://www.gbu.ac.in/Content/schools/img/banner/Artboard1soljg.jpg";

const lawSlides = [
  {
    title: "School of Law, Justice and Governance",
    subtitle: "Gautam Buddha University",
    description:
      "Teaching, learning, research and diffusion of knowledge in law, justice and governance.",
    image: lawBanner,
  },
  {
    title: "BA LLB, LLM and PhD in Law",
    subtitle: "Academic programmes",
    description:
      "Five-year integrated BA LLB, LLM (one year and two year weekend) and PhD in Law.",
    image: lawBanner,
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: lawSlides },
  },
  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        subtitle: "School of Law, Justice and Governance",
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
                  School of Law, Justice and Governance
                </span>{" "}
                advances teaching, learning and research in law, justice and
                governance at Gautam Buddha University.
              </>
            ),
            highlight: (
              <>
                The curriculum blends{" "}
                <span className="font-semibold text-indigo-600">
                  BCI subjects
                </span>{" "}
                with interdisciplinary study and practical training through moot
                court, legal aid and internships.
              </>
            ),
          },
          {
            title: "Our Commitment",
            icon: <Trophy size={28} />,
            bgGradient: "from-purple-500 to-pink-600",
            content: (
              <>
                The school offers the five-year integrated BA LLB, LLM (one year
                and two year weekend) and PhD in Law.
              </>
            ),
            bullets: [
              "BA LLB started in July 2012",
              "PhD in Law started in 2016",
              "LLM started in 2017",
              "LLM One Year started in 2019",
              "LLM Two Year Weekend Programme started in 2023",
            ],
          },
        ],
      },
    },
  },
  {
    componentName: "SchoolStats",
    enabled: true,
    position: 3,
    props: {
      title: "Academic highlights",
      stats: [
        { value: 4, label: "Programmes", suffix: "" },
        { value: 18, label: "Faculty", suffix: "+" },
        { value: 2, label: "BCI Letters", suffix: "" },
        { value: 9, label: "Emails", suffix: "" },
        { value: 15, label: "Phone Lines", suffix: "+" },
        { value: 3, label: "Placement Brochures", suffix: "" },
      ],
    },
  },
  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: "Dr. Krishna Kant Dwivedi",
      title: "Dean (I/C) - School of Law, Justice and Governance",
      image:
        "https://www.gbu.ac.in/Content/gbudata/Employee/img/KKDwivedi1.jpg",
      description:
        "The school blends BCI-prescribed compulsory subjects with interdisciplinary options and professional skill development for advocacy, judicial services and allied legal careers.",
    },
  },
  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "School of Law, Justice and Governance",
          code: "SOLJG",
          description:
            "Focused on legal education, governance, public service and professional practice with strong moot court and legal aid training.",
          courses: [
            "BA LLB (Five Year Integrated)",
            "LLM (Two Year Weekend Programme)",
            "LLM (One Year)",
            "PhD in Law",
          ],
          faculty: 18,
          labs: 3,
          image:
            "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=250&fit=crop",
          gradient: "from-blue-500 to-blue-700",
          link: "/schools/SOL/departments/law-governance",
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
          name: "BA LLB (Five Year Integrated)",
          code: "BALLB",
          duration: "5 Years",
          specializations: [
            "Constitutional Law",
            "Business Law",
            "International Law",
            "WTO Law",
          ],
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=60",
          description:
            "Integrated undergraduate programme with BCI subjects and interdisciplinary electives.",
        },
        {
          name: "LLM (Two Year Weekend Programme)",
          code: "LLM-Weekend",
          duration: "2 Years",
          specializations: ["Advanced legal research", "Weekend format"],
          image:
            "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=600&auto=format&fit=crop&q=60",
          description: "Weekend LLM programme started in 2023.",
        },
        {
          name: "LLM (One Year)",
          code: "LLM-1Y",
          duration: "1 Year",
          specializations: ["Specialized postgraduate study"],
          image:
            "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600&auto=format&fit=crop&q=60",
          description: "One-year LLM programme started in 2019.",
        },
        {
          name: "PhD in Law",
          code: "PHD",
          duration: "Varies",
          specializations: ["Legal research", "Policy and governance"],
          image:
            "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=600&auto=format&fit=crop&q=60",
          description: "Doctoral research programme started in 2016.",
        },
      ],
    },
  },
  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of SOLJG",
      subTitle: "Teachers, mentors and research guides",
      facultyList: [
        {
          name: "Hon'ble Mr. Justice Ravi Shankar Jha",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6638c6199572a_new.png",
        },
        {
          name: "Hon'ble. Mr. Justice Pradeep Kumar",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6613869854ac0_pksrivastava.jpg",
        },
        {
          name: "Prof. A. Lakshminath",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66138604bee10_Prof-A-Lakshminath.png",
        },
        {
          name: "Prof. S.P. Singh",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/661384a07347b_SP%20singh.jpg",
        },
        {
          name: "Prof. Uday Shankar",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6613850dcde74_Uday%20Shankar.jpg",
        },
        {
          name: "Sh. R. B. Sharma",
          title: "Recognized/Visiting Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/661382d5d7148_RBSharma.jpg",
        },
        {
          name: "Dr. Krishna Kant Dwivedi",
          title: "Assistant Professor and Dean (I/C)",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053e5f6ee31_KKDwivedi1.jpg",
        },
        {
          name: "Dr. Santosh Kumar Tiwari",
          title: "Assistant Professor and HoD",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c464a42c46f_Photo.jpg",
        },
        {
          name: "Dr. Akshay Kumar Singh",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053d745ec2d_akshay.jpg",
        },
        {
          name: "Dr. Chandrabhanu Bharas",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/675fda1e67bf5_IMG-20241216-WA0019.jpg",
        },
        {
          name: "Dr. Poonam Verma",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67cb3de93c326_IMG_5618.jpeg",
        },
        {
          name: "Dr. Prakash Chand Dilare",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053dda06108_prakash.jpg",
        },
        {
          name: "Dr. Priyanka Singh",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053da08965d_priyanka.jpg",
        },
        {
          name: "Dr. Rama Sharma",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053e4094749_rama.jpg",
        },
        {
          name: "Dr. Sangeeta Wadhwa",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Satish Chandra",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c5ab5dca716_Photo.jpg",
        },
        {
          name: "Dr. Vikram Karuna",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/672140dca5957_img_1_1729962624360.jpg",
        },
        {
          name: "Dr. Mamta Sharma",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053df22d1ce_mamta.jpg",
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
          title: "Time Table of Odd Semester 2023-24",
          date: "2023-09-01",
          type: "Notice",
        },
        {
          title: "Committees",
          date: "2023-09-01",
          type: "Administrative",
        },
        {
          title: "BCI Approval 2023",
          date: "2023-08-01",
          type: "Approval",
        },
        {
          title: "BCI Letter 3 August 2022",
          date: "2022-08-03",
          type: "Approval",
        },
        {
          title: "Research Work Details (May 2023)",
          date: "2023-05-01",
          type: "Research",
        },
      ],
      events: [
        {
          title: "Hindi Divas 2025",
          date: "2025-09-01",
          image: lawBanner,
          description: "Hindi Divas celebration and activities.",
        },
        {
          title: "Industrial Meet 2025",
          date: "2025-08-30",
          image: lawBanner,
          description: "Academia-industry meet at SOLJG.",
        },
        {
          title: "RTI Awareness Workshop 2025",
          date: "2025-05-02",
          image: lawBanner,
          description: "RTI awareness workshop at law school.",
        },
        {
          title: "National Girl Child Day 2025",
          date: "2025-01-25",
          image: lawBanner,
          description: "National Girl Child Day celebration at SOLJG.",
        },
      ],
      initialNoticeCount: 5,
      sectionTitle: "Notices and Events",
      sectionSubtitle: "Updates, approvals and activities",
    },
  },
  {
    componentName: "ClubsAchievements",
    enabled: true,
    position: 9,
    props: {
      clubs: [
        {
          name: "Moot Court Society",
          description:
            "Replica-court training for advocacy, pleadings and oral submissions.",
          members: 1,
          category: "Academic",
          facultyAdvisor: "Faculty Coordinators",
          image: lawBanner,
          socialLinks: {
            facebook:
              "https://www.facebook.com/profile.php?id=100083596931300&mibextid=ZbWKwL",
            email: "mcs@gbu.ac.in",
          },
        },
        {
          name: "Legal Aid Centre",
          description:
            "Collaborates with DLSA and runs legal awareness camps, mediation and village outreach.",
          members: 1,
          category: "Public Service",
          facultyAdvisor: "Dr. Santosh Kumar Tiwari",
          image: lawBanner,
          socialLinks: {
            email: "legalaid@gbu.ac.in",
          },
        },
        {
          name: "Placement and Internship Cell",
          description:
            "Supports court internships, legal practice exposure and professional growth.",
          members: 1,
          category: "Career Development",
          facultyAdvisor: "Dr. Vikram Karuna",
          image: lawBanner,
          socialLinks: {
            linkedin: "https://www.linkedin.com/company/ipclawgbu",
            email: "placement_internlaw@gbu.ac.in",
          },
        },
        {
          name: "School Library",
          description:
            "Access to online journals, databases and law collections.",
          members: 1,
          category: "Learning Resources",
          facultyAdvisor: "Library Team",
          image: lawBanner,
          socialLinks: {
            email: "librarysoljg@gbu.ac.in",
          },
        },
      ],
    },
  },
  {
    componentName: "PlacementsSection",
    enabled: true,
    position: 10,
    props: {
      data: {
        title: "Placements and internships",
        subTitle: "Brochures and contact details",
        heroImage: lawBanner,
        placementStats: [
          {
            label: "Placement Brochure 2026",
            value: "PDF",
            color: "bg-green-500",
          },
          {
            label: "Placement Brochure 2025",
            value: "PDF",
            color: "bg-blue-500",
          },
          {
            label: "Placement Brochure 2023",
            value: "PDF",
            color: "bg-purple-500",
          },
          {
            label: "CRC Contact",
            value: "crc@gbu.ac.in",
            color: "bg-yellow-500",
          },
        ],
      },
    },
  },
  {
    componentName: "RecentPlacements",
    enabled: true,
    position: 11,
    props: {
      data: {
        sectionTitle: "Placement documents",
        students: [
          {
            name: "Placement Brochure 2026",
            company: "SOLJG",
            package: "PDF",
            department: "Placements",
            photo: lawBanner,
          },
          {
            name: "Placement Brochure May 2025",
            company: "SOLJG",
            package: "PDF",
            department: "Placements",
            photo: lawBanner,
          },
          {
            name: "Placement Brochure May 2023",
            company: "SOLJG",
            package: "PDF",
            department: "Placements",
            photo: lawBanner,
          },
          {
            name: "Placement Law 2026",
            company: "SOLJG",
            package: "PDF",
            department: "Placements",
            photo: lawBanner,
          },
        ],
      },
    },
  },
  {
    componentName: "RecruitersShowcase",
    enabled: true,
    position: 12,
    props: {
      recruitersData: [
        { name: "District Legal Service Authority", logo: lawBanner },
        { name: "State Legal Service Authority", logo: lawBanner },
        { name: "Bar Council of India", logo: lawBanner },
        { name: "High Courts", logo: lawBanner },
        { name: "Law Firms", logo: lawBanner },
        { name: "NGOs", logo: lawBanner },
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
            name: "Legal Aid Centre",
            founder: "School of Law, Justice and Governance",
            description:
              "Legal aid, awareness camps and mediation support with DLSA collaboration.",
            funding: "University Supported",
            status: "Active",
            image: lawBanner,
            year: "2012",
          },
        ],
        stats: {
          totalFunding: "3 PDFs",
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
          title: "Hindi Divas 2025",
          achievement: "Event document",
          year: "2025",
          student: "SOLJG",
          department: "Events",
          image: lawBanner,
          description: "Hindi Divas 2025 document from SOLJG.",
        },
        {
          title: "Industrial Meet 2025",
          achievement: "Event document",
          year: "2025",
          student: "SOLJG",
          department: "Events",
          image: lawBanner,
          description: "Academia-industry meet document for 2025.",
        },
        {
          title: "RTI Awareness Workshop 2025",
          achievement: "Event document",
          year: "2025",
          student: "SOLJG",
          department: "Events",
          image: lawBanner,
          description: "RTI workshop document from 2025.",
        },
        {
          title: "National Girl Child Day 2025",
          achievement: "Event document",
          year: "2025",
          student: "SOLJG",
          department: "Events",
          image: lawBanner,
          description: "National Girl Child Day 2025 document.",
        },
      ],
    },
  },
];