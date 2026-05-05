import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

const soeSlides = [
  {
    image: "https://www.gbu.ac.in/Content/schools/img/banner/Artboard1soe.jpg",
    title: "School of Engineering",
    subtitle: "Innovation, design and application",
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: {
      slides: soeSlides,
    },
  },

  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        subtitle: "School of Engineering",

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
                In accordance with the Vision of the University, School of
                Engineering has been conceptualized and established with an
                objective to work out and develop a dependable model for growth,
                consistency and significant breakthrough in cutting edge
                technology and innovation. The rapid diffusion of core
                engineering fields like Civil Engineering, Electrical
                Engineering and Mechanical Engineering has the potential of
                bringing improvement in productivity and efficiency in almost
                every aspects of our life and consequently turning out to be a
                key driver of our economic growth. We are committed to prepare
                technology leaders for tomorrow with our innovative curriculum
                and meticulous pedagogy for training. The programmes offered are
                unique in their right and fall in line with international
                practices. Our efforts travel beyond classrooms and encompass
                trends and practices through our research and modular training
                at par with some of the best institutions of national and
                international repute. We encourage our graduates to opt for
                courses from different streams which shall not restrict them to
                one area but open new avenues in their field of interest.
                Faculty members are encouraged to use innovative tools in their
                teaching. We ensure that our graduate students possess necessary
                skills like Creativity, Innovation, Critical Thinking, Problem
                Solving and Collaboration.
              </>
            ),
            highlight: ["N / A"],
          },

          {
            title: "Our Commitment",
            icon: <Trophy size={28} />,
            bgGradient: "from-purple-500 to-pink-600",
            content: (
              <>
                The School offers innovative and interdisciplinary programmes,
                complemented by experiential learning in real world situation
                that allow our students to combine classroom learning and their
                exposure to the industry to understand current trends in their
                field of interest and expertise. We offer five years Integrated
                Dual-degree Programmes (B.Tech. + M. Tech./ B.Tech. + MBA) in
                the following branches:
              </>
            ),
            bullets: [
              "Civil Engineering",
              "Mechanical Engineering",
              "Electrical Engineering",
              "Architecture & Regional Planning",
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
      title: "Our numbers speak for themselves",
      stats: [
        { value: 4, label: "Departments", suffix: "+" },
        { value: 25, label: "Courses", suffix: "+" },
        { value: 3000, label: "Students", suffix: "+" },
        { value: 80, label: "Faculty", suffix: "+" },
        { value: 200, label: "Publications", suffix: "+" },
        { value: 95, label: "Placement Rate", suffix: "%" },
      ],
    },
  },

  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: "Dr. Kirti Pal",
      title: "Dean (I/C) and Associate Professor",
      image:
        "https://faculty.gbu.ac.in/uploads/photos/660531da1be80_kirti.pal.jpg",
      description: `It is my proud privilege to welcome you at School of Engineering on the Website of Gautam Buddha University. The School has came in to existence in the academic session, 2010 -11 with the beginning of Five years Integrated dual degree program ( B.Tech. + M.Tech / M.B.A.) in three core branches of engineering ( Civil, Mechanical & Electrical ). In the academic session, 2014 -15, the first batch of Engineers of the University is going to pass out. In successive years B. Arch in Architecture & Regional Planning, Masters & Doctoral Programs in different disciplines have come in to existence.
As an academic community, the school is committed to the belief that expanding our knowledge of the liberal Sciences & Technologies will enable us to live better lives and to contribute more to society. Thus we are constantly trying to remain competitive, to maintain excellence in teaching to strengthen our undergraduate and graduate programs and to build the School's research agenda to increase the external partnerships & sponsors. I hope that you will join us in our mission.`,
    },
  },

  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "Electrical Engineering",
          code: "EE",
          description:
            "Focus on power systems, electronics, control systems and automation.",
          courses: [
            "B.Tech Electrical Engineering",
            "B.Tech Electrical Engineering (Industrial Automation)",
            "B.Tech Electrical Engineering (Electric Vehicles)",
            "B.Tech Electrical Engineering (AI & ML)",
            "B.Tech Electrical Engineering (Biomedical Engineering)",
            "B.Tech Electrical Engineering (Computer Engineering)",
            "B.Tech Electrical & Computer Engineering",
            "B.Tech Electrical & Electronics Engineering",
            "B.Tech Robotics and Artificial Intelligence",
            "Integrated B.Tech–M.Tech/MBA (Electrical Engineering)",
            "M.Tech Instrumentation and Control",
            "M.Tech Control and Robotics",
            "M.Tech Power System and Energy Management",
            "M.Tech (RES, PS, I&C, PED, C&R, ISP)",
            "M.Tech Weekend – Working Professionals (Instrumentation & Control, Power Systems, Power Electronics & Drives, Instrumentation & Signal Processing, Renewable Energy, Power & Energy Management, Control & Robotics)",
            "Ph.D Electrical and Electronics Engineering",
          ],
          faculty: 16,
          labs: 17,
          image:
            "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&h=400&fit=crop",
          gradient: "from-blue-400 to-blue-600",
          link: "/schools/SOE/departments/ee",
        },

        {
          name: "Mechanical Engineering",
          code: "ME",
          description:
            "Covers design, manufacturing, thermal and industrial engineering.",
          courses: [
            "B.Tech Mechanical Engineering",
            "B.Tech Mechanical Engineering with minor (Automobile and Industrial Engineering)",
            "B.Tech Mechanical Engineering with minor (Mechatronics and Automation)",
            "M.Tech Mechanical Engineering (Manufacturing Engineering)",
            "M.Tech Mechanical Engineering (Design Engineering)",
            "M.Tech Mechanical Engineering (Thermal Engineering)",
            "M.Tech Mechanical Engineering Weekend – Working Professionals (3 Years)",
            "Ph.D Mechanical Engineering",
          ],
          faculty: 9,
          labs: 11,
          image:
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
          gradient: "from-blue-600 to-blue-800",
          link: "/schools/SOE/departments/me",
        },

        {
          name: "Civil Engineering",
          code: "CE",
          description:
            "Focuses on infrastructure, structural and environmental engineering.",
          courses: [
            "B.Tech Civil Engineering",
            "M.Tech Civil Engineering (Structural Engineering)",
            "M.Tech Civil Engineering (Environmental Engineering)",
            "M.Tech Civil Engineering (Transportation Engineering)",
            "M.Tech Civil Engineering (Geotechnical & Geo Environmental Engineering)",
            "M.Tech Civil Engineering (Construction Management)",
            "Ph.D Civil Engineering",
          ],
          faculty: 13,
          labs: 10,
          image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
          gradient: "from-blue-500 to-blue-700",
          link: "/schools/SOE/departments/ce",
        },

        {
          name: "Architecture & Regional Planning",
          code: "AR",
          description:
            "Focuses on urban planning, architecture design and development.",
          courses: [
            "B.Arch (Bachelor in Architecture)",
            "B.Des (Interior Design)",
            "M.Plan (Masters in Urban and Regional Planning)",
          ],
          faculty: 10,
          labs: 7,
          image:
            "https://images.unsplash.com/photo-1505842465776-3acb1f4a0a94?w=600&h=400&fit=crop",
          gradient: "from-blue-500 to-blue-700",
          link: "/schools/SOE/departments/ar",
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
        // ================= ELECTRICAL =================
        {
          name: "B.Tech Electrical Engineering",
          code: "EE",
          duration: "4 Years",
          specializations: [
            "Industrial Automation",
            "Electric Vehicles",
            "AI & ML",
            "Biomedical Engineering",
            "Computer Engineering",
          ],
          image:
            "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=600&h=400&fit=crop",
          description:
            "Core electrical engineering program with modern specialization tracks.",
        },
        {
          name: "B.Tech Electrical & Computer Engineering",
          code: "ECE",
          duration: "4 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
          description:
            "Undergraduate program combining electrical and computer engineering disciplines.",
        },
        {
          name: "B.Tech Electrical & Electronics Engineering",
          code: "EEE",
          duration: "4 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=600&h=400&fit=crop",
          description:
            "Undergraduate program in electrical and electronics engineering.",
        },
        {
          name: "B.Tech Robotics and Artificial Intelligence",
          code: "RAI",
          duration: "4 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
          description:
            "Undergraduate program in robotics and artificial intelligence.",
        },
        {
          name: "Integrated B.Tech–M.Tech/MBA (Electrical Engineering)",
          code: "EE Dual",
          duration: "5 Years",
          specializations: [
            "Power Systems",
            "Instrumentation & Control",
            "Power Electronics & Drives",
            "Renewable Energy",
            "MBA",
          ],
          image:
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop",
          description:
            "Integrated dual-degree program combining undergraduate and postgraduate electrical studies.",
        },
        {
          name: "M.Tech Instrumentation and Control",
          code: "M.Tech IC",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in instrumentation and control engineering.",
        },
        {
          name: "M.Tech Control and Robotics",
          code: "M.Tech CR",
          duration: "2 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop",
          description: "Postgraduate program in control systems and robotics.",
        },
        {
          name: "M.Tech Power System and Energy Management",
          code: "M.Tech PS",
          duration: "2 Years",
          specializations: [
            "Renewable Energy Sources",
            "Power System",
            "Instrumentation & Control",
            "Power Electronics & Drives",
            "Instrumentation & Signal Processing",
            "Power & Energy Management",
            "Control & Robotics",
          ],
          image:
            "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in power systems, energy management and allied electrical specializations.",
        },
        {
          name: "Ph.D Electrical and Electronics Engineering",
          code: "PhD EE",
          duration: "Varies",
          specializations: [
            "Power System",
            "Semiconductors",
            "VLSI",
            "Control & Instrumentation",
            "System Design",
            "Reliability Engineering",
            "Power Electronic Drives",
            "Industrial Automation and Control",
            "High Voltage Engineering",
            "Industrial and Biomedical Instrumentation",
          ],
          image:
            "https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=600&h=400&fit=crop",
          description:
            "Doctoral research in electrical and electronics engineering.",
        },

        // ================= MECHANICAL =================
        {
          name: "B.Tech Mechanical Engineering",
          code: "ME",
          duration: "4 Years",
          specializations: [
            "Automobile and Industrial Engineering",
            "Mechatronics and Automation",
          ],
          image:
            "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop",
          description:
            "Undergraduate program covering core mechanical engineering concepts.",
        },
        {
          name: "M.Tech Mechanical Engineering",
          code: "M.Tech ME",
          duration: "2 Years",
          specializations: [
            "Manufacturing Engineering",
            "Design Engineering",
            "Thermal Engineering",
          ],
          image:
            "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=600&h=400&fit=crop",
          description:
            "Postgraduate specialization in core mechanical domains.",
        },
        {
          name: "Ph.D Mechanical Engineering",
          code: "PhD ME",
          duration: "Varies",
          specializations: [
            "Machine Design",
            "Production Engineering (CAD/CAM)",
            "Thermal Engineering",
            "Industrial Engineering",
          ],
          image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
          description: "Doctoral research in mechanical engineering fields.",
        },

        // ================= CIVIL =================
        {
          name: "B.Tech Civil Engineering",
          code: "CE",
          duration: "4 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop",
          description:
            "Undergraduate program focused on infrastructure and construction engineering.",
        },
        {
          name: "M.Tech Civil Engineering (Structural Engineering)",
          code: "M.Tech CE-SE",
          duration: "2 Years",
          specializations: ["Structural Engineering"],
          image:
            "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop",
          description:
            "Postgraduate program with specialization in structural engineering.",
        },
        {
          name: "M.Tech Civil Engineering (Environmental Engineering)",
          code: "M.Tech CE-EE",
          duration: "2 Years",
          specializations: ["Environmental Engineering"],
          image:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop",
          description:
            "Postgraduate program with specialization in environmental engineering.",
        },
        {
          name: "M.Tech Civil Engineering (Transportation Engineering)",
          code: "M.Tech CE-TE",
          duration: "2 Years",
          specializations: ["Transportation Engineering"],
          image:
            "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=600&h=400&fit=crop",
          description:
            "Postgraduate program with specialization in transportation engineering.",
        },
        {
          name: "M.Tech Civil Engineering (Geotechnical & Geo Environmental Engineering)",
          code: "M.Tech CE-GE",
          duration: "2 Years",
          specializations: [
            "Geotechnical Engineering",
            "Geo Environmental Engineering",
          ],
          image:
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
          description:
            "Postgraduate program with specialization in geotechnical and geo environmental engineering.",
        },
        {
          name: "M.Tech Civil Engineering (Construction Management)",
          code: "M.Tech CE-CM",
          duration: "2 Years",
          specializations: ["Construction Management"],
          image:
            "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          description:
            "Postgraduate program with specialization in construction management.",
        },
        {
          name: "Ph.D Civil Engineering",
          code: "PhD CE",
          duration: "Varies",
          specializations: [
            "Water Management",
            "Environment Engineering",
            "Structural Engineering",
          ],
          image:
            "https://images.unsplash.com/photo-1581093458791-9d09d7e07b6a?w=600&h=400&fit=crop",
          description: "Doctoral research in civil engineering disciplines.",
        },

        // ================= ARCHITECTURE =================
        {
          name: "B.Arch (Bachelor in Architecture)",
          code: "B.Arch",
          duration: "5 Years",
          specializations: [],
          image:
            "https://images.unsplash.com/photo-1505842465776-3acb1f4a0a94?w=600&h=400&fit=crop",
          description: "Professional undergraduate program in architecture.",
        },
        {
          name: "B.Des (Interior Design)",
          code: "B.Des",
          duration: "4 Years",
          specializations: ["Interior Design"],
          image:
            "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=600&h=400&fit=crop",
          description:
            "Design program focused on interior spaces and human-centered design.",
        },
        {
          name: "M.Plan (Masters in Urban and Regional Planning)",
          code: "M.Plan",
          duration: "2 Years",
          specializations: ["Urban & Regional Planning"],
          image:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          description: "Postgraduate program in urban and regional planning.",
        },
      ],
    },
  },

  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of School of Engineering",
      subTitle: "All Departments",
      facultyList: [
        // ===== ARCHITECTURE =====
        {
          name: "Dr. Madhuri Aggarwal",
          title: "Assistant Professor – Architecture & Planning",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660531a696e89_madhuri.jpg",
        },
        {
          name: "Prof. Charanjit Singh Shah",
          title: "Recognized/Visiting Professor – Architecture & Planning",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Prof. Krishna Kumar Dhote",
          title: "Recognized/Visiting Professor – Architecture & Planning",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Nirmita Mahrotra",
          title: "Assistant Professor – Architecture & Planning",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605308e35d32_nirmitamehrotra.jpg",
        },
        {
          name: "Dr. Anant Pratap Singh",
          title: "Assistant Professor and HoD – Architecture & Planning",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660531c243424_anant.jpg",
        },

        // ===== ELECTRICAL =====
        {
          name: "Dr. Kirti Pal",
          title: "Associate Professor and Dean (I/C) – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660531da1be80_kirti.pal.jpg",
        },
        {
          name: "Dr. Omveer Singh",
          title: "Assistant Professor and HoD – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/660531910b2a4_omveer.singh.jpg",
        },
        {
          name: "Dr. Nidhi Singh",
          title: "Assistant Professor – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c1ec88b4b8d_nidhi-pic.jpeg",
        },
        {
          name: "Dr. Mohd. Ahmad Ansari",
          title: "Assistant Professor – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c5f0df429ce_Dr.M.A.Ansari%20School%20of%20Engineering_GBU2.JPG",
        },
        {
          name: "Dr. Shabana Urooj",
          title: "Assistant Professor – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605310436840_shabana.jpg",
        },
        {
          name: "Dr. Isha Kansal",
          title: "Assistant Professor (OCFD) – Electrical Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Prof. S.P. Singh",
          title: "Recognized/Visiting Professor – Electrical Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Mr. Ravi Kant Yadav",
          title: "Assistant Professor (OCFD) – Electrical Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Mr. Swadheen Sharma",
          title: "Assistant Professor (OCFD) – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6652702cee733_pp_photo.jpg",
        },
        {
          name: "Mrs. Jyoti Singh",
          title: "Assistant Professor (OCFD) – Electrical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c156ffaa6cd_Jyoti.JPG",
        },

        // ===== CIVIL =====
        {
          name: "Dr. Shobha Ram",
          title: "Assistant Professor and HoD – Civil Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Anju Agarwal",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Rohit Ralli",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/665082b8ce82c_IMG_6047%20(Edited).JPG",
        },
        {
          name: "Dr. Indrajeet Singh",
          title: "Assistant Professor – Civil Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/67c53dfff3fa3_DSC_4677%20(1).jpg",
        },
        {
          name: "Mr. Vikas Kumar",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6650a4ce231d4_VIKAS%20N.jpg",
        },
        {
          name: "Mr. Chitransh Sharma",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Mr. Manish Tomar",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/665448b67385e_Picture45449.jpg",
        },
        {
          name: "Ms. Varsha Mall",
          title: "Assistant Professor (OCFD) – Civil Engineering",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },

        // ===== MECHANICAL =====
        {
          name: "Dr. Dharamvir Mangal",
          title: "Assistant Professor – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605316f1198d_dharamvir.jpg",
        },
        {
          name: "Dr. Harishchandra Thakur",
          title: "Assistant Professor and HoD – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605311bb0f06_harish.jpg",
        },
        {
          name: "Dr. Satpal Sharma",
          title: "Assistant Professor – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6605306fd622f_satpal.jpg",
        },
        {
          name: "Dr. Parvesh Ali",
          title: "Assistant Professor (OCFD) – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6614fe5707123_photo.jpg",
        },
        {
          name: "Dr. Vikas Shrivastava",
          title: "Assistant Professor (OCFD) – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6614d9f83c240_download.png",
        },
        {
          name: "Dr. Sultan Singh",
          title: "Assistant Professor (OCFD) – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/6617c0f4052e9_SULTAN%20PHOTO.jpg",
        },
        {
          name: "Dr. Manish Dev",
          title: "Assistant Professor (OCFD) – Mechanical Engineering",
          image:
            "https://faculty.gbu.ac.in/uploads/photos/66181b5aa3f11_Manish%20Dev.jpg",
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
          title: "Back Paper Examination Date Sheet – Even Semester 2024–25",
          date: "2025-05-16",
          type: "Important",
        },
        {
          title: "Notice for Aadhaar e‑kyc through UPDESCO",
          date: "2025-06-03",
          type: "Administrative",
        },
        {
          title: "Tablet Distribution Program Scheduled",
          date: "2025-05-24",
          type: "General",
        },
        {
          title: "Office Order for Hostel & Mess Exemption",
          date: "2025-05-13",
          type: "Administrative",
        },
        {
          title: "Office Order for Hostel & Mess2 Exemption",
          date: "2025-05-13",
          type: "Administrative",
        },
        {
          title: "PhD Thesis Submission Guidelines Update",
          date: "2025-05-12",
          type: "Academic",
        },
        {
          title: "Summer Internship Opportunities 2025",
          date: "2025-05-10",
          type: "Placement",
        },
        {
          title: "Library Working Hours Extended",
          date: "2025-05-09",
          type: "General",
        },
        {
          title: "Research Grant Applications Open",
          date: "2025-05-08",
          type: "Research",
        },
        {
          title: "Campus Recruitment Drive - TCS",
          date: "2025-05-07",
          type: "Placement",
        },
        {
          title: "Student Council Elections Schedule",
          date: "2025-05-06",
          type: "Important",
        },
        {
          title: "Student Council Elections Schedule",
          date: "2025-05-06",
          type: "Important",
        },
      ],

      events: [
        // ===== ELECTRICAL ENGINEERING =====
        {
          title: "Workshop on Power Systems & Renewable Energy",
          date: "2024-03-15",
          image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
          description:
            "Hands-on workshop on power systems, renewable energy technologies, and modern electrical applications.",
        },
        {
          title: "MATLAB & Simulation Training Session",
          date: "2024-02-20",
          image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
          description:
            "Training program focused on simulation-based learning using MATLAB for electrical engineering students.",
        },
        {
          title: "IEEE Technical Workshop & Seminar",
          date: "2024-01-25",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          description:
            "Technical sessions and workshops conducted under IEEE student chapter for skill development.",
        },

        // ===== MECHANICAL ENGINEERING =====
        {
          title: "Virtual Lab Workshop on Fluid Mechanics",
          date: "2024-03-10",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
          description:
            "Simulation-based experiments including Bernoulli theorem, Venturimeter, and Reynolds experiment.",
        },
        {
          title: "Industry Expert Lecture on Manufacturing Technology",
          date: "2024-02-28",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789",
          description:
            "Guest lecture by industry expert covering modern manufacturing techniques and industrial practices.",
        },
        {
          title: "Project-Based Learning Showcase",
          date: "2024-01-30",
          image: "https://images.unsplash.com/photo-1537432376769-00a8c7f4c6d3",
          description:
            "Students presented innovative engineering projects focusing on real-world problem solving.",
        },
        {
          title: "ANSYS & Hypermesh Training Program",
          date: "2024-02-10",
          image: "https://images.unsplash.com/photo-1581093458791-9d09d7e07b6a",
          description:
            "Hands-on training on simulation tools like ANSYS and Hypermesh for mechanical design and analysis.",
        },
      ],
    },
  },

  {
    componentName: "ClubsAchievements",
    enabled: true,
    position: 9,
    props: {
      clubs: [
        {
          name: "Techno Cultural Club",
          description:
            "Runs coding contests, hackathons, robotics, quizzes, poster-making & cultural events.",
          members: 150,
          category: "Technical & Cultural",
          facultyAdvisor: "Dr. Vimlesh Kumar Ray",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dlCh4LMQ-987UX_Ssas6havujpWSVCmIGw&s",
          socialLinks: {
            instagram: "https://instagram.com/technoculture_gbu",
            linkedin: "https://linkedin.com/company/techno-club-gbu",
            email: "techno.ict.gbu@gmail.com",
          },
        },
        {
          name: "GDSC – Google Developer Student Club",
          description:
            "Peer-run community for workshops in Web Dev, Cloud, ML under GDSC umbrella.",
          members: 500,
          category: "Technical",
          facultyAdvisor: "Dr. Rajesh Mishra",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxT9G3gSxNZESl4NJH1NzcPq0kBF1XNyHcA&s",
          socialLinks: {
            instagram: "https://instagram.com/gdsc_gbu",
            linkedin:
              "https://linkedin.com/company/gdsc-gautam-buddha-university",
            email: "gdsc@gbu.ac.in",
          },
        },
        {
          name: "IEEE Student Branch",
          description:
            "Professional branch organizing tech talks, paper contests & networking.",
          members: 60,
          category: "Professional",
          facultyAdvisor: "Dr. Vikram Singh",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxT9G3gSxNZESl4NJH1NzcPq0kBF1XNyHcA&s",
          socialLinks: {
            linkedin: "https://linkedin.com/company/ieeestudentbranch",
            twitter: "https://twitter.com/ieeestudents",
            email: "ieee@gbu.ac.in",
          },
        },
        {
          name: "Programming / CodeChef Chapter",
          description:
            "Competitive coding community hosting Code Matrix, Learn to Code & hackathons.",
          members: 200,
          category: "Technical",
          facultyAdvisor: "Dr. Anurag Singh Baghel",
          image:
            "https://repository-images.githubusercontent.com/389157855/a2869f47-24d9-4e16-a6cc-b944855dc5f7",
          socialLinks: {
            instagram: "https://instagram.com/codechef_gbu",
            email: "codechef@gbu.ac.in",
          },
        },
        {
          name: "Robotics Club",
          description:
            "Builds autonomous systems & competes in national robotics events.",
          members: 45,
          category: "Technical",
          facultyAdvisor: "Dr. Vimlesh Kumar Ray",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dlCh4LMQ-987UX_Ssas6havujpWSVCmIGw&s",
          socialLinks: {
            twitter: "https://twitter.com/robiotics_gbu",
            email: "robotics@gbu.ac.in",
          },
        },
        {
          name: "Dhrishtikon – Debate Society",
          description:
            "Promotes free discussion, public speaking & debate competitions.",
          members: 80,
          category: "Cultural",
          facultyAdvisor: "Dr. Manjari Suman",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiaFXt6eK5fEvem3rwrqMkO-O3ERZm0rV9g&s",
          socialLinks: {
            linkedin: "https://linkedin.com/company/drishtikon-gbu",
            email: "drishtikon@gbu.ac.in",
          },
        },
        {
          name: "Cultural Council",
          description:
            "Oversees Drama, Dance, Music, Painting, Photography, Literature, Adventure clubs.",
          members: 300,
          category: "Cultural",
          facultyAdvisor: "Dr. Anand Pratap Singh",
          image:
            "https://www.palmbeachculture.com/wp/wp-content/uploads/2025/06/Art-Calls-32.jpg",
          socialLinks: {
            facebook: "https://facebook.com/abhivyanjana",
            instagram: "https://instagram.com/abhivyanjana_gbu",
            email: "cultural@gbu.ac.in",
          },
        },
        {
          name: "Adventure Club",
          description:
            "Organizes trekking, camping and outdoor adventure activities.",
          members: 60,
          category: "Adventure",
          facultyAdvisor: "Dr. Sunita Gupta",
          image:
            "https://i.pinimg.com/736x/2a/9b/fd/2a9bfd335b50e86e48ad59b4b28aa5b5.jpg",
          socialLinks: {
            email: "adventure@gbu.ac.in",
          },
        },
        {
          name: "Photography Club",
          description: "Encourages campus photography exhibitions & workshops.",
          members: 50,
          category: "Creative",
          facultyAdvisor: "Dr. Vidushi Sharma",
          image:
            "https://image-static.collegedunia.com/public/reviewPhotos/899143/unnamed.jpg",
          socialLinks: {
            instagram: "https://instagram.com/photoclub_gbu",
            email: "photography@gbu.ac.in",
          },
        },
        {
          name: "Art & Painting Club",
          description:
            "Hosts workshops & exhibitions to nurture visual arts on campus.",
          members: 40,
          category: "Creative",
          facultyAdvisor: "Dr. Anand Pratap Singh",
          image:
            "https://images.squarespace-cdn.com/content/v1/604e4790cbfeea1a501ac957/1664284358990-4TBHSR3TPHO2A3M8O79V/teen+photo.jpeg",
          socialLinks: {
            email: "art@gbu.ac.in",
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
        title: "Placements",
        subTitle: "Electrical, Mechanical, Civil & Architecture",
        heroImage:
          "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=300&fit=crop",

        placementStats: [
          {
            label: "Departments Covered",
            value: "4",
            color: "bg-green-500",
          },
          {
            label: "Core + IT Recruiters",
            value: "50+",
            color: "bg-blue-500",
          },
          {
            label: "Domains",
            value: "Core / IT / Design",
            color: "bg-purple-500",
          },
          {
            label: "Opportunities",
            value: "Internships + Jobs",
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
        sectionTitle: "Placement Highlights",

        students: [
          // ===== ELECTRICAL =====
          {
            name: "Electrical Engineering Student",
            company: "TCS",
            package: "₹3.5 - 6 LPA",
            department: "B.Tech Electrical",
            photo: "https://randomuser.me/api/portraits/men/32.jpg",
          },
          {
            name: "Electrical Engineering Student",
            company: "Wipro",
            package: "₹3.5 - 5 LPA",
            department: "B.Tech Electrical",
            photo: "https://randomuser.me/api/portraits/women/44.jpg",
          },

          // ===== MECHANICAL =====
          {
            name: "Mechanical Engineering Student",
            company: "Honda",
            package: "₹4 - 7 LPA",
            department: "B.Tech Mechanical",
            photo: "https://randomuser.me/api/portraits/men/65.jpg",
          },
          {
            name: "Mechanical Engineering Student",
            company: "Tata Motors",
            package: "₹4 - 8 LPA",
            department: "B.Tech Mechanical",
            photo: "https://randomuser.me/api/portraits/men/41.jpg",
          },

          // ===== CIVIL =====
          {
            name: "Civil Engineering Student",
            company: "L&T Construction",
            package: "₹4 - 6 LPA",
            department: "B.Tech Civil",
            photo: "https://randomuser.me/api/portraits/women/68.jpg",
          },
          {
            name: "Civil Engineering Student",
            company: "DLF",
            package: "₹3 - 5 LPA",
            department: "B.Tech Civil",
            photo: "https://randomuser.me/api/portraits/men/52.jpg",
          },

          // ===== ARCHITECTURE =====
          {
            name: "Architecture Student",
            company: "Architectural Design Firms",
            package: "₹3 - 6 LPA",
            department: "B.Arch",
            photo: "https://randomuser.me/api/portraits/women/25.jpg",
          },
          {
            name: "Architecture Student",
            company: "Urban Planning Firms",
            package: "₹4 - 7 LPA",
            department: "B.Arch",
            photo: "https://randomuser.me/api/portraits/men/22.jpg",
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
        // ===== CORE + IT COMPANIES =====
        { name: "TCS", logo: "https://logo.clearbit.com/tcs.com" },
        { name: "Wipro", logo: "https://logo.clearbit.com/wipro.com" },
        { name: "HCL", logo: "https://logo.clearbit.com/hcltech.com" },
        { name: "Infosys", logo: "https://logo.clearbit.com/infosys.com" },

        // ===== LIVE PROJECT / INTERNSHIP PARTNERS (from CRC data) =====
        { name: "NSIC", logo: "https://logo.clearbit.com/nsic.co.in" },
        { name: "CSIR", logo: "https://logo.clearbit.com/csir.res.in" },
        { name: "TERI", logo: "https://logo.clearbit.com/teri.res.in" },

        // ===== CORE ENGINEERING =====
        { name: "L&T", logo: "https://logo.clearbit.com/larsentoubro.com" },
        {
          name: "Tata Motors",
          logo: "https://logo.clearbit.com/tatamotors.com",
        },
        { name: "Honda", logo: "https://logo.clearbit.com/honda.com" },

        // ===== ARCHITECTURE / DESIGN =====
        { name: "DLF", logo: "https://logo.clearbit.com/dlf.in" },
        { name: "NBCC", logo: "https://logo.clearbit.com/nbccindia.com" },
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
            name: "KOYAL FM",
            founder: "GBU Incubation Team",
            description: "Campus-based community radio initiative by students",
            funding: "University Supported",
            status: "Incubated",
            image:
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
            year: "2020",
          },
        ],
        stats: {
          totalFunding: "₹19.3L+",
          totalDepartments: 4,
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
        // ===== CIVIL ENGINEERING =====
        {
          title: "GATE Qualified by Civil Engineering Students",
          achievement: "National Examination Qualification",
          year: "2017",
          student: "Civil Engineering Students",
          department: "Civil Engineering",
          image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
          description:
            "Students from the Department of Civil Engineering qualified GATE, demonstrating strong academic and technical preparation.",
        },
        {
          title: "Extra Curricular Activities – CED Students",
          achievement: "Active Participation",
          year: "2017",
          student: "Civil Engineering Students",
          department: "Civil Engineering",
          image: "https://images.unsplash.com/photo-1581093458791-9d09d7e07b6a",
          description:
            "Civil Engineering Department students actively participated in extra-curricular activities during 2016-17 and 2017-18.",
        },

        // ===== ELECTRICAL ENGINEERING =====
        {
          title: "Research Publications in Power Systems",
          achievement: "Multiple Research Papers Published",
          year: "2023",
          student: "EE Students & Researchers",
          department: "Electrical Engineering",
          image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231",
          description:
            "Electrical Engineering students contributed to research in power systems, renewable energy, and smart grid technologies.",
        },
        {
          title: "Renewable Energy Projects",
          achievement: "Innovative Project Development",
          year: "2023",
          student: "Electrical Engineering Students",
          department: "Electrical Engineering",
          image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7",
          description:
            "Students developed projects focused on solar energy, electric vehicles, and sustainable energy solutions.",
        },
        {
          title: "Control Systems & Automation Projects",
          achievement: "Technical Innovation",
          year: "2022",
          student: "EE Students",
          department: "Electrical Engineering",
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758",
          description:
            "Students worked on automation, robotics, and control system-based innovations for real-world applications.",
        },
        {
          title: "Participation in Technical Workshops & IEEE Events",
          achievement: "Skill Development & Certification",
          year: "2023",
          student: "Electrical Engineering Students",
          department: "Electrical Engineering",
          image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
          description:
            "Students actively participated in IEEE workshops, seminars, and technical training sessions to enhance practical knowledge.",
        },
      ],
    },
  },
];