import React from "react";
import { BookOpen, Globe, Users, Target, Trophy } from "lucide-react";

const sohssSlides = [
  {
    image: "https://www.gbu.ac.in/Content/schools/img/banner/Artboard1sohss.jpg",
    title: "School of Humanities and Social Sciences",
    subtitle: "Exploring culture, society and human values",
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: {
      slides: sohssSlides,
    },
  },

  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        subtitle: "School of Humanities and Social Sciences",

        floatingIcons: [
          {
            icon: <BookOpen size={40} />,
            color: "text-blue-400",
            style: "top-20 left-10",
          },
          {
            icon: <Globe size={35} />,
            color: "text-purple-400",
            style: "top-32 right-20",
          },
          {
            icon: <Users size={45} />,
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
                The School of Humanities and Social Sciences started in
                2009-2010, plays the pivotal role of providing the students with
                an environment that is conducive for developing an understanding
                of contemporary society and its pertaining vibrant issues
                through inter-relationship of society, science, language,
                literature, social work, technology, management and media. The
                school has a unique and distinctive role of hosting creative
                educational academic programmes that focus on creating holistic
                understanding of complexities of life in social context with
                emphasis on Indian cultural values and Buddhist ethics.
              </>
            ),
            highlight: ["Est. 2009–2010"],
          },

          {
            title: "Our Commitment",
            icon: <Trophy size={28} />,
            bgGradient: "from-purple-500 to-pink-600",
            content: (
              <>
                The school chooses its mission to propagate learning and
                appreciating as well as preserving Buddhist Ethics and Values.
                Academic programmes, designed in line with the best universities
                around the world, combine the best practices of pedagogy and
                classroom teaching, complemented by practical training and
                experiential learning. The Humanities section consists of three
                core departments while Social Sciences has eight major core
                departments.
              </>
            ),
            bullets: [
              "Department of English and Modern European Languages",
              "Department of Indian Languages and Literature",
              "Department of Mass Communication and Media Studies",
              "Eight Social Sciences Departments",
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
        { value: 11, label: "Departments", suffix: "+" },
        { value: 29, label: "Courses", suffix: "+" },
        { value: 5, label: "Centres of Excellence", suffix: "+" },
        { value: 40, label: "Faculty", suffix: "+" },
        { value: 1, label: "International MoU (SQA)", suffix: "" },
      ],
    },
  },

  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: "Prof. Madhav Govind",
      title: "Dean, School of Humanities & Social Sciences",
      image:
        "https://faculty.gbu.ac.in/uploads/photos/69b1734dae066_Prof.%20Madhav%20Govind.jpg",
      description: `Welcome to the School of Humanities and Social Sciences. We are proud to be in the plurality of fields being primarily concerned with application of multidirectional education with firm foundation in Humanities and Social Sciences. We expound the essential qualities of language, literature, culture and expression. We have embarked on a journey with a desire of expanding our intellectual horizons. School of Humanities and Social Sciences is a dynamic collaboration of faculty and students contributing to ambitious research agenda and striving for the well being of the society. Our education programme creates broad spectrum perspective in our students to transcend traditional disciplines boundaries keeping pace with global development in their respective fields. The school chooses its mission to propagate learning and appreciating as well as preserving Buddhist Ethics and Values.`,
    },
  },

  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "English and Modern European Languages",
          code: "EN",
          description:
            "Focuses on English language, literature, and modern European languages.",
          courses: ["B.A. (English)", "M.A. (English)", "Ph.D. English"],
          image:
            "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&h=400&fit=crop",
          gradient: "from-blue-400 to-blue-600",
          link: "/schools/SOHSS/departments/english",
        },

        {
          name: "Indian Languages and Literature",
          code: "IL",
          description:
            "Covers Hindi, Urdu, and Sanskrit languages and their literary traditions.",
          courses: [
            "B.A. and M.A. Honours (Hindi)",
            "B.A. Honours Sanskrit",
            "M.A. (Urdu)",
          ],
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
          gradient: "from-blue-500 to-blue-700",
          link: "/schools/SOHSS/departments/indian-languages",
        },

        {
          name: "Mass Communication and Media Studies",
          code: "MC",
          description:
            "Focuses on journalism, mass communication, media studies, and linguistics.",
          courses: [
            "B.A. (Hons.) in Journalism & Mass Communication",
            "M.A. (Mass Communication)",
            "M.A. Linguistics",
            "MA in Journalism & Mass Communication",
          ],
          image:
            "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop",
          gradient: "from-blue-600 to-blue-800",
          link: "/schools/SOHSS/departments/mass-communication",
        },

        {
          name: "Economics, Planning and Development",
          code: "EP",
          description:
            "Covers economic theory, planning, and development studies.",
          courses: [
            "B.A. (Hons.) Economics",
            "B.A. (Hons.) and M.A. (Economics)",
          ],
          image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
          gradient: "from-purple-400 to-purple-600",
          link: "/schools/SOHSS/departments/economics",
        },

        {
          name: "Education and Training",
          code: "ET",
          description:
            "Offers teacher education, physical education, and educational studies.",
          courses: [
            "B.Ed. (Bachelors of Education)",
            "B.Sc B.Ed./B.Com. B.Ed./B.A. B.Ed. (ITEP)",
            "Bachelor of Physical Education and Sports (BPES)",
            "M.A. (Education)",
          ],
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
          gradient: "from-purple-500 to-purple-700",
          link: "/schools/SOHSS/departments/education-training",
        },

        {
          name: "History and Civilization",
          code: "HIS",
          description:
            "Studies historical events, civilizations, and cultural heritage.",
          courses: ["B.A. and M.A. (History)"],
          image:
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&h=400&fit=crop",
          gradient: "from-indigo-400 to-indigo-600",
          link: "/schools/SOHSS/departments/history-civilization",
        },

        {
          name: "Political Science and International Relations",
          code: "PIR",
          description:
            "Covers political theory, governance, and international relations.",
          courses: [
            "B.A. (Hons.)/ M.A. Political Science",
            "M.A. (Political Science and International Relations)",
          ],
          image:
            "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=400&fit=crop",
          gradient: "from-indigo-500 to-indigo-700",
          link: "/schools/SOHSS/departments/political-science",
        },

        {
          name: "Psychology and Mental Health",
          code: "PSY",
          description:
            "Focuses on applied psychology, clinical psychology, and mental health.",
          courses: [
            "Psychology & Mental Health",
            "B.A. / B.Sc. (Hons.) with Research degree in Applied Psychology",
            "M.A./ M.Sc. (Applied Psychology)",
            "M. Phil. (Clinical Psychology)",
          ],
          image:
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&h=400&fit=crop",
          gradient: "from-pink-400 to-pink-600",
          link: "/schools/SOHSS/departments/psychology",
        },

        {
          name: "Public Administration, Governance and Policy Research",
          code: "PA",
          description:
            "Studies governance, public policy, and public administration.",
          courses: [],
          image:
            "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&h=400&fit=crop",
          gradient: "from-pink-500 to-pink-700",
          link: "/schools/SOHSS/departments/public-administration",
        },

        {
          name: "Social Work",
          code: "SW",
          description:
            "Trains students in social work practice and community development.",
          courses: [
            "Bachelors in Social Work (BSW)",
            "MSW (Master in Social Work)",
          ],
          image:
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
          gradient: "from-green-400 to-green-600",
          link: "/schools/SOHSS/departments/social-work",
        },

        {
          name: "Sociology",
          code: "SO",
          description:
            "Studies social behaviour, institutions, and societal structures.",
          courses: ["M.A. (Sociology)"],
          image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
          gradient: "from-green-500 to-green-700",
          link: "/schools/SOHSS/departments/sociology",
        },

        {
          name: "Library and Information Science",
          code: "LIS",
          description:
            "Covers library management, information science, and knowledge organization.",
          courses: ["M.Lib.I.Sc. (Master of Library and Information Science)"],
          image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop",
          gradient: "from-teal-400 to-teal-600",
          link: "/schools/SOHSS/departments/library-information-science",
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
        // ================= ENGLISH =================
        {
          name: "B.A. (English)",
          code: "EN",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=600&h=400&fit=crop",
          description:
            "Undergraduate program in English language and literature.",
        },
        {
          name: "M.A. (English)",
          code: "MA EN",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in English language and literature.",
        },
        {
          name: "Ph.D. English",
          code: "PhD EN",
          duration: "Varies",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop",
          description: "Doctoral research program in English.",
        },

        // ================= INDIAN LANGUAGES =================
        {
          name: "B.A. and M.A. Honours (Hindi)",
          code: "IL-HI",
          duration: "3/2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=400&fit=crop",
          description:
            "Undergraduate and postgraduate programs in Hindi language and literature.",
        },
        {
          name: "B.A. Honours Sanskrit",
          code: "IL-SA",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1567098260939-5d9cee055592?w=600&h=400&fit=crop",
          description: "Undergraduate honours program in Sanskrit.",
        },
        {
          name: "M.A. (Urdu)",
          code: "IL-UR",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=600&h=400&fit=crop",
          description: "Postgraduate program in Urdu language and literature.",
        },

        // ================= MASS COMMUNICATION =================
        {
          name: "B.A. (Hons.) in Journalism & Mass Communication",
          code: "JMC",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
          description:
            "Undergraduate honours program in journalism and mass communication.",
        },
        {
          name: "M.A. (Mass Communication)",
          code: "MA MC",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=600&h=400&fit=crop",
          description: "Postgraduate program in mass communication.",
        },
        {
          name: "M.A. Linguistics",
          code: "MA LING",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&h=400&fit=crop",
          description: "Postgraduate program in linguistics.",
        },
        {
          name: "MA in Journalism & Mass Communication",
          code: "MA JMC",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in journalism and mass communication.",
        },

        // ================= ECONOMICS =================
        {
          name: "B.A. (Hons.) Economics",
          code: "EP",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
          description: "Undergraduate honours program in economics.",
        },
        {
          name: "B.A. (Hons.) and M.A. (Economics)",
          code: "MA EP",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in economics, planning, and development.",
        },

        // ================= EDUCATION =================
        {
          name: "B.Ed. (Bachelors of Education)",
          code: "BEd",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=400&fit=crop",
          description: "Two-year B.Ed. programme accredited by NCTE.",
        },
        {
          name: "B.Sc B.Ed./B.Com. B.Ed./B.A. B.Ed. (ITEP)",
          code: "ITEP",
          duration: "4 Years",
          specializations: ["B.Sc B.Ed.", "B.Com. B.Ed.", "B.A. B.Ed."],
          image:
            "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop",
          description: "Integrated Teacher Education Programme.",
        },
        {
          name: "Bachelor of Physical Education and Sports (BPES)",
          code: "BPES",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop",
          description:
            "Undergraduate program in physical education and sports.",
        },
        {
          name: "M.A. (Education)",
          code: "MA ET",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop",
          description: "Postgraduate program in education.",
        },

        // ================= HISTORY =================
        {
          name: "B.A. and M.A. (History)",
          code: "HIS",
          duration: "3/2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600&h=400&fit=crop",
          description:
            "Undergraduate and postgraduate programs in history and civilization.",
        },

        // ================= POLITICAL SCIENCE =================
        {
          name: "B.A. (Hons.)/ M.A. Political Science",
          code: "PIR",
          duration: "3/2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=600&h=400&fit=crop",
          description:
            "Undergraduate and postgraduate programs in political science.",
        },
        {
          name: "M.A. (Political Science and International Relations)",
          code: "MA PIR",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in political science and international relations.",
        },

        // ================= PSYCHOLOGY =================
        {
          name: "Psychology & Mental Health",
          code: "PSY",
          duration: "Varies",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=600&h=400&fit=crop",
          description: "Program in psychology and mental health.",
        },
        {
          name: "B.A. / B.Sc. (Hons.) with Research degree in Applied Psychology",
          code: "BSC PSY",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
          description:
            "Undergraduate honours program in applied psychology (2024).",
        },
        {
          name: "M.A./ M.Sc. (Applied Psychology)",
          code: "MA PSY",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in applied psychology, with M.Sc. provision for science background candidates.",
        },
        {
          name: "M. Phil. (Clinical Psychology)",
          code: "MPhil PSY",
          duration: "Varies",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=400&fit=crop",
          description: "M.Phil. program in clinical psychology.",
        },

        // ================= SOCIAL WORK =================
        {
          name: "Bachelors in Social Work (BSW)",
          code: "BSW",
          duration: "3 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=400&fit=crop",
          description: "Undergraduate program in social work.",
        },
        {
          name: "MSW (Master in Social Work)",
          code: "MSW",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=600&h=400&fit=crop",
          description: "Postgraduate program in social work.",
        },

        // ================= SOCIOLOGY =================
        {
          name: "M.A. (Sociology)",
          code: "SO",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
          description: "Postgraduate program in sociology.",
        },

        // ================= HINDU STUDIES / HUMAN RIGHTS =================
        {
          name: "M.A. in Hindu Studies",
          code: "HS",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1567098260939-5d9cee055592?w=600&h=400&fit=crop",
          description: "Postgraduate program in Hindu studies.",
        },
        {
          name: "M.A. in Human Rights",
          code: "HR",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=600&h=400&fit=crop",
          description: "Postgraduate program in human rights.",
        },

        // ================= LIBRARY SCIENCE =================
        {
          name: "M.Lib.I.Sc. (Master of Library and Information Science)",
          code: "LIS",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in library and information science.",
        },
      ],
    },
  },

  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of School of Humanities and Social Sciences",
      subTitle: "All Departments",
      facultyList: [
        // ===== PROFESSORS =====
        {
          name: "Prof. Madhav Govind",
          title: "Professor and Dean – Sociology",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/69b1734dae066_Prof.%20Madhav%20Govind.jpg",
        },
        {
          name: "Prof. Bandana Pandey",
          title: "Professor – Mass Communication & Media Studies",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/65fe7d554e4af_bandana.jpg",
        },
        // ===== ASSISTANT PROFESSORS (HODs) =====
        {
          name: "Dr. Anand Pratap Singh",
          title:
            "Assistant Professor and HoD – Psychology and Mental Health / Social Work",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660538aada591_apsingh.jpg",
        },
        {
          name: "Dr. Pankaj Deep",
          title:
            "Assistant Professor and HoD – Political Science & International Relations",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660538e7c2b09_pankaj.jpg",
        },
        {
          name: "Dr. Sumitra Huidrom",
          title:
            "Assistant Professor and HoD – English & Modern European Languages",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66082c2240fe9_huidromsumitra.jpg",
        },
        {
          name: "Dr. Vivek Kumar Mishra",
          title:
            "Assistant Professor and HoD – Political Science & International Relations",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c3f0b944a86_Vivek%20photo.PNG",
        },
        {
          name: "Dr. Rakesh Kumar Srivastava",
          title: "Assistant Professor – History & Civilization",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        // ===== ASSISTANT PROFESSORS =====
        {
          name: "Dr. Anu Malik",
          title: "Assistant Professor – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/662625eca7533_WhatsApp%20Image%202024-04-03%20at%2011.07.47.jpeg",
        },
        {
          name: "Dr. Bipasha Som Gune",
          title: "Assistant Professor – English & Modern European Languages",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c32fc2efd15_IMG-20240807-WA0015~7.jpg",
        },
        {
          name: "Dr. Diwakar Garwa",
          title: "Assistant Professor – Indian Languages & Literature",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053a23c139d_diwakar.jpg",
        },
        {
          name: "Dr. Mamta Rani",
          title: "Assistant Professor – Education & Training",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/687dfea01a64e_WhatsApp%20Image%202025-07-21%20at%202.13.22%20PM.jpeg",
        },
        {
          name: "Dr. Manjri Suman",
          title: "Assistant Professor – English & Modern European Languages",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/682849bd7f9c3_Manjri_photo1.jpeg",
        },
        {
          name: "Dr. Muhammad Asif",
          title: "Assistant Professor – Indian Languages & Literature",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6613c66a534bd_asif.jpeg",
        },
        {
          name: "Dr. Obaidul Ghaffar",
          title: "Assistant Professor – English & Modern European Languages",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605398fb608c_obaidul.jpg",
        },
        {
          name: "Dr. Om Prakash",
          title: "Assistant Professor – English & Modern European Languages",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Rahul Kapoor",
          title: "Assistant Professor – Social Work",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660f98bf501e0_Screenshot_20240405_115043_Facebook.jpg",
        },
        {
          name: "Dr. Rehana Sultana",
          title: "Assistant Professor – English & Modern European Languages",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Renu Yadav",
          title: "Assistant Professor – Indian Languages & Literature",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053a4a69366_renu.jpg",
        },
        {
          name: "Dr. Ritika Joshi",
          title: "Assistant Professor – History & Civilization",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/674943341d79e_bf1e74ff-22f7-45ba-a4a5-2bdd71cc898d.jpeg",
        },
        {
          name: "Dr. Riya Raj",
          title: "Assistant Professor – English & Modern European Languages",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c605bfed5ba_IMG_20210724_153228_Bokeh~2.jpg",
        },
        {
          name: "Dr. Roopali Srivastava",
          title: "Assistant Professor – Economics, Planning & Development",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66053a6265876_roopali.jpg ",
        },
        {
          name: "Dr. Shrutee Kanwar",
          title: "Assistant Professor – Education & Training",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/675823651da3b_IMG-20241127-WA0005.jpg",
        },
        {
          name: "Dr. Siddaramu B",
          title: "Assistant Professor – Social Work",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660bd29b8c6f3_pp.JPG",
        },
        {
          name: "Dr. Vibhavari",
          title: "Assistant Professor – Indian Languages & Literature",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605396206f88_vibhavari.jpg",
        },
        {
          name: "Dr. Vineet Kumar",
          title: "Assistant Professor – Mass Communication & Media Studies",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66125c70412a8_Vineet-Kumar-94.png",
        },
        {
          name: "Dr. Vinod Kumar Shanwal",
          title: "Assistant Professor – Education & Training",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660538906f61b_vk.shanwal.jpg",
        },
        // ===== ASSISTANT PROFESSORS (OCFD) =====
        {
          name: "Dr. Anu",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c9465f4346d_offc.JPG",
        },
        {
          name: "Dr. Ashfia Nishat",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Neha Sharma",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c97560db651_neha%20pic%201.jpg",
        },
        {
          name: "Dr. Puja Kumari",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c3037625a6c_swati%20singh%20pic1.jpg",
        },
        {
          name: "Dr. Shipra Sharma",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c82d99d028a_e9d01297-d020-4e38-8a82-1b3a5ebf69b5.jpeg",
        },
        {
          name: "Dr. Shivendra Vikram Singh",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c93afd3b127_Profile_Photo-removebg-preview.png",
        },
        {
          name: "Dr. Sujata Sukhala",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Vaishali",
          title: "Assistant Professor (OCFD) – Education & Training",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/674f147968eb3_passport%20pic.jpg",
        },
        {
          name: "Dr. Shalini Bhardwaj",
          title: "Assistant Professor (OCFD) – Education & Training",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6759b6bac5553_My%20photo.jpg",
        },
        {
          name: "Ms. Paridhi Vats",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c9341cbb00f_Paridhi.JPG",
        },
        {
          name: "Ms. Shreya",
          title: "Assistant Professor (OCFD) – Psychology and Mental Health",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c977accb9f0_Duggu.jpg",
        },
      ],
    },
  },

  {
    componentName: "NoticeEvents",
    enabled: true,
    position: 8,
    props: {
      notices: [],
      events: [],
    },
  },

  {
    componentName: "ClubsAchievements",
    enabled: true,
    position: 9,
    props: {
      clubs: [],
    },
  },

  {
    componentName: "PlacementsSection",
    enabled: false,
    position: 10,
    props: {
      data: {
        title: "Placements",
        subTitle: "School of Humanities and Social Sciences",
        heroImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=300&fit=crop",

        placementStats: [
          {
            label: "Placement Process",
            value: "Summer Internship",
            color: "bg-blue-500",
          },
          {
            label: "Placement Process",
            value: "Final Placement",
            color: "bg-green-500",
          },
          {
            label: "CRC Support",
            value: "Summer & Final",
            color: "bg-purple-500",
          },
        ],
      },
    },
  },

  {
    componentName: "RecruitersShowcase",
    enabled: false,
    position: 11,
    props: {
      recruitersData: [],
    },
  },
];