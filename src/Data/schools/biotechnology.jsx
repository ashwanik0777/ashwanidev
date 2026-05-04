import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";
const biotechSlides = [
  {
    image: "https://www.gbu.ac.in/Content/schools/img/banner/Artboard1SObt.jpg",
    title: "School of Biotechnology",
    subtitle: "Advancing Life Sciences",
  },
  {
    image: "/assets/biotech_lab.jpg",
    title: "Modern Labs",
    subtitle: "Hands-on Training",
  },
];
export const sectionsConfig = [
     { componentName: "Landing", enabled: true, position: 1 , props:{ slides : biotechSlides },
          
             },
     
             {
               componentName: "AboutSection",
               enabled: true,
               position: 2,
               props: {
                 data: {
                   heading: "About Us",
                   subtitle: "School of Biotechnology",
                   floatingIcons: [
                     { icon: <Code size={40} />, color: "text-blue-400", style: "top-20 left-10" },
                     { icon: <Lightbulb size={35} />, color: "text-purple-400", style: "top-32 right-20" },
                     { icon: <Rocket size={45} />, color: "text-indigo-400", style: "bottom-20 left-1/4" },
                   ],
          
            cards: [
  {
    title: "Our Mission",
    icon: <Target size={28} />,
    bgGradient: "from-green-500 to-emerald-600",
    content: (
      <>
        The{" "}
        <span className="font-semibold text-green-600">
          School of Biotechnology
        </span>{" "}
        is committed to advancing knowledge in{" "}
        <span className="font-semibold text-emerald-600">
          life sciences and biotechnology
        </span>{" "}
        through quality education, innovative research, and practical laboratory training.
      </>
    ),
    highlight: (
      <>
        Guided by our vision of{" "}
        <span className="font-semibold text-teal-600">
          scientific excellence and ethical responsibility
        </span>
        , we empower students with modern biotechnological tools and hands-on experience
        to address global challenges in healthcare, agriculture, and environmental sustainability.
      </>
    ),
  },

  {
    title: "Our Commitment",
    icon: <Trophy size={28} />,
    bgGradient: "from-emerald-500 to-teal-600",
    content: (
      <>
        At the School of Biotechnology, we go beyond traditional learning—we nurture{" "}
        <span className="font-semibold text-green-600">
          future scientists and innovators
        </span>
        . Through{" "}
        <span className="font-semibold text-teal-600">
          interdisciplinary research, advanced laboratories, and industry collaboration
        </span>
        , we foster a culture of innovation and discovery.
      </>
    ),
    bullets: [
      <span className="font-semibold text-gray-800">
        Skilled and research-oriented biotechnology professionals
      </span>,
      "Prepared to solve real-world problems in health, environment, and agriculture",
      "Contributing to innovation and sustainable development",
    ],
  },
],
                 }
               },
             },
     
              {
          componentName: "SchoolStats",
          enabled: true,
          position: 3,
          props: {
            title: "Our numbers speak for themselves",
            stats: [
              { value: 3, label: "Departments", suffix: "+" },
              { value: 15, label: "Courses", suffix: "+" },
              { value: 1200, label: "Students", suffix: "+" },
              { value: 45, label: "Faculty", suffix: "+" },
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
            name: "Prof. S. Dhanalakshmi",
            title: "Dean, University School of Biotechnology",
            image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
            description: `In the School of Biotechnology, we bring together highly talented, innovative and well groomed faculty with specialization in diverse fields ranging from various basic to advanced aspects of Biotechnology. Our faculty includes skilled personnel with excellent research experience from renowned universities and institutes of India and abroad. These faculty members motivate students to work in collaborative environment. The faculty is imbued with a sense of deep commitment and is capable of imparting state of art education. They work hard to inculcate scientific ethics, morality and inquisitiveness.The school offers various programmes at different entry levels finally aimed to confer the degree of Master of Technology (M. Tech) in Biotechnology with specializations in the areas of Genetic engineering and Bioinformatics.                      We have started our programme with the objective of generating work force that could turn into a substantially trained manpower to meet the existing and future global demands. The school is equipped with state of art laboratories and a curriculum tailored to suit the needs of various sectors of economy. The programme curricula combine a strong theoretical background coupled with practical experience in laboratory with a view to achieve their optimum potential as researcher. The foundation thus laid enables students to enhance their learning capability and adapt themselves to the fast scientific development in the world. We strive to keep our students updated with ongoing progress in frontier areas of Biotechnology. Our vision is to make School of Biotechnology a truly academic and research and development center providing the balanced combination of teaching and research fused with power of innovation`,



          },
        },

       
      {
  componentName: "DepartmentsSection",
  enabled: true,
  position: 5,
  props: {
    departments: [
      {
        name: "Biotechnology",
        code: "BT",
        description:
          "Focuses on genetics, molecular biology, microbiology, bioinformatics, and modern biotechnological applications in healthcare and agriculture.",
        courses: [
          "Integrated B.Tech–M.Tech Biotechnology",
          "B.Sc Biotechnology (Hons.) by Research",
          "M.Tech Biotechnology",
          "M.Sc Biotechnology (DBT Sponsored)",
          "Ph.D Biotechnology",
        ],
        faculty: 40,
        labs: 10,
        image:
          "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?w=400",
        gradient: "from-green-400 to-emerald-600",
        link: "/schools/biotech/departments/biotech",
      },

      {
        name: "Bioinformatics & Computational Biology",
        code: "BCB",
        description:
          "Integrates biology with computational techniques to analyze genomic data, protein structures, and biological systems.",
        courses: [
          "M.Sc Bioinformatics & Genomics",
          "Computational Biology",
          "Genomics & Data Analysis",
          "Ph.D Bioinformatics",
        ],
        faculty: 15,
        labs: 5,
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400",
        gradient: "from-blue-400 to-cyan-600",
        link: "/schools/biotech/departments/bioinformatics",
      },

      {
        name: "Molecular Medicine & Microbial Biotechnology",
        code: "MMB",
        description:
          "Focuses on disease biology, drug development, and microbial applications in healthcare, industry, and environment.",
        courses: [
          "M.Sc Molecular Medicine",
          "M.Sc Microbial Biotechnology",
          "Industrial Microbiology",
          "Ph.D Molecular Biology",
        ],
        faculty: 20,
        labs: 7,
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        gradient: "from-purple-400 to-pink-600",
        link: "/schools/biotech/departments/molecular",
      }
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
        name: "Integrated B.Tech – M.Tech Biotechnology",
        code: "BT Dual",
        duration: "5 Years",
        specializations: ["Genetic Engineering", "Bioinformatics"],
        image:
          "https://images.unsplash.com/photo-1581091012184-5c0c9b4f5f5f?w=600&h=400&fit=crop",
        description:
          "Integrated dual-degree program combining undergraduate and postgraduate studies in Biotechnology.",
      },
      {
        name: "B.Sc Biotechnology (Hons.) by Research",
        code: "BSc BT",
        duration: "3-4 Years",
        specializations: ["Life Sciences", "Research Training"],
        image:
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&h=400&fit=crop",
        description:
          "Undergraduate research-focused program in biotechnology and life sciences.",
      },
      {
        name: "M.Tech Biotechnology",
        code: "M.Tech BT",
        duration: "2 Years",
        specializations: ["Genetic Engineering", "Bioinformatics"],
        image:
          "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&h=400&fit=crop",
        description:
          "Postgraduate program focusing on advanced biotechnology concepts and applications.",
      },
      {
        name: "M.Sc Biotechnology (DBT Sponsored)",
        code: "MSc BT",
        duration: "2 Years",
        specializations: ["Biotechnology Research"],
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop",
        description:
          "DBT-sponsored postgraduate program with focus on research and innovation.",
      },
      {
        name: "M.Sc Molecular Medicine",
        code: "MSc MM",
        duration: "2 Years",
        specializations: ["Medical Biotechnology"],
        image:
          "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&h=400&fit=crop",
        description:
          "Advanced study of molecular biology and its applications in medicine.",
      },
      {
        name: "M.Sc Bioinformatics & Genomics",
        code: "MSc Bioinfo",
        duration: "2 Years",
        specializations: ["Genomics", "Computational Biology"],
        image:
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
        description:
          "Combines biology with computational tools for genomic data analysis.",
      },
      {
        name: "M.Sc Microbial Biotechnology",
        code: "MSc Micro",
        duration: "2 Years",
        specializations: ["Microbiology"],
        image:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&h=400&fit=crop",
        description:
          "Focus on microbial applications in industry and environment.",
      },
      {
        name: "Ph.D Biotechnology",
        code: "Ph.D BT",
        duration: "Varies",
        specializations: ["Biotechnology Research"],
        image:
          "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
        description:
          "Doctoral research program in advanced areas of biotechnology.",
      },
    ],
  },
},
            {
          componentName: "FacultyCarousel",
          enabled: true,
          position: 7,
          props: {
            title: "Faculty of Biotechnology",
            subTitle: "",
            facultyList: [
              {
                name: "Prof. S Dhanalakshmi",
                title: "Professor and Dean",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
              },
              {
                name: "Prof. Rajeev Varshney",
                title: "Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/68c9104d2a52d_Prof.%20R.jpg",
              },
              {
                name: "Prof. Dr. Sudhir Kumar Shukla",
                title: "Recognized/Visiting Professor",
                image: " https://faculty.gbu.ac.in/uploads/photos/66ad254325f87_Picture1.jpg",
              },
              {
                name: "Dr. Prafullakumar B. Tailor",
                title: "Adjunct Professor",
                image: "https://faculty.gbu.ac.in/uploads/photos/6881e98393b0a_tailor.jpeg",
              },
              {
                name: "Dr. Pramod R. Yadav",
                title: "Adjunct Professor",
                image: "https://faculty.gbu.ac.in/uploads/photos/6881e5e6e154a_pramodyadav.jpg",
              },
              {
                name: "Dr. Shalini Rai",
                title: "Assistant Professor – CSE",
                image:"https://faculty.gbu.ac.in/uploads/photos/6881e837d0124_Dr-Shalini.jpg",
              },
              {
                name: "Dr. Shivani Ghildiyal",
                title: "Adjunct Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/6881e78dcc4ac_ShivaniG.png",
              },
              {
                name: "Prof. B.R. Panda",
                title: "Adjunct Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/6881e8edce52e_bp_headshot2.jpg",
              },
              {
                name: "Prof. Umesh Chand Singh Yadav",
                title: "Adjunct Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/6881e478cd5c6_umeshcsyadav.jpeg",
              },
              {
                name: "Dr. Rekha Puria",
                title: "Assistant Professor and HoD",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
              },
              {
                name: "Dr. Barkha Singhal",
                title: "Assistant Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/6605368841650_barkha.jpg",
              },
              {
                name: "Dr. Bhaswati Banerjee",
                title: "Assistant Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/661c94d134e30_BBanerjee_Pic.jpg",
              },
              {
                name: "Dr. Bhupendra Chaudhary",
                title: "Assistant Professor",
                image: "https://faculty.gbu.ac.in/uploads/photos/660535f24a586_bhupendra.jpg",
              },
              {
                name: "Dr. Deepali Singh",
                title: "Assistant Professor",
                image:
                  "https://faculty.gbu.ac.in/uploads/photos/660536ae760c3_deepali.jpg",
              },
              {
                name: "Dr. Gunjan Garg",
                title: "Assistant Professor",
                image: "https://faculty.gbu.ac.in/uploads/photos/660535a7c46a1_gunjangarg.jpg",
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
              {
                title: "Online National Article Writing Competition (GST)",
                date: "2025-06-30",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2NnCSPRdgMAEkEafMhZojs0fdgEv6hFY0A&s",
                description: "Organized by School of Law, extended submission date.",
              },
              {
                title: "Six‑Day Residential Vipassana Program",
                date: "2025-06-09",
                image: "https://data.gbu.ac.in/Events/1714148988_FIVE%20DAY%20VIPASSANA%20COURSE%20FEB2024_page-0001.jpg",
                description: "Well‑being retreat by School of Buddhist Studies.",
              },
              {
                title: "World Environment Day Report",
                date: "2025-06-05",
                image: "https://images.timesnownews.com/thumb/msid-151788925,thumbsize-1151391,width-1280,height-720,resizemode-75/151788925.jpg",
                description: "Activities report by Department of Environmental Science.",
              },
              {
                title: "SOBSC Vesak Day Celebrations",
                date: "2025-05-03",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwXCDOopXvx7WxXSEcJJJ86SzCi_HjeITTQ&s",
                description: "Celebration at School of Buddhist Studies & Civilization.",
              },
              {
                title: "ICSSR‑Sponsored AI Research Methodology Course",
                date: "2024-12-03",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQud5sjoe92WQkeO2ddUOccbSRysoFo6K5GvgRZzSeMy1a2DsromFso3Hp7ctE8W-e94&usqp=CAU",
                description: "10‑day course on integrating AI in research, sponsored by ICSSR.",
              },
              {
                title: "Digital India Talk Show",
                date: "2024-11-20",
                image: "https://negd.gov.in/wp-content/uploads/2025/01/gatishakti.jpeg",
                description: "Awareness session on e‑governance chaired by VC Prof. R.K. Sinha.",
              },
            ],
            initialNoticeCount: 5,
            sectionTitle: "Notices & Events",
            sectionSubtitle: "Stay updated with all updates"
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
                description: "Runs coding contests, hackathons, robotics, quizzes, poster-making & cultural events.",
                members: 150,
                category: "Technical & Cultural",
                facultyAdvisor: "Dr. Vimlesh Kumar Ray",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dlCh4LMQ-987UX_Ssas6havujpWSVCmIGw&s",
                socialLinks: {
                  instagram: "https://instagram.com/technoculture_gbu",
                  linkedin: "https://linkedin.com/company/techno-club-gbu",
                  email: "techno.ict.gbu@gmail.com"
                }
              },
              {
                name: "GDSC – Google Developer Student Club",
                description: "Peer-run community for workshops in Web Dev, Cloud, ML under GDSC umbrella.",
                members: 500,
                category: "Technical",
                facultyAdvisor: "Dr. Rajesh Mishra",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxT9G3gSxNZESl4NJH1NzcPq0kBF1XNyHcA&s",
                socialLinks: {
                  instagram: "https://instagram.com/gdsc_gbu",
                  linkedin: "https://linkedin.com/company/gdsc-gautam-buddha-university",
                  email: "gdsc@gbu.ac.in"
                }
              },
              {
                name: "IEEE Student Branch",
                description: "Professional branch organizing tech talks, paper contests & networking.",
                members: 60,
                category: "Professional",
                facultyAdvisor: "Dr. Vikram Singh",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQxT9G3gSxNZESl4NJH1NzcPq0kBF1XNyHcA&s",
                socialLinks: {
                  linkedin: "https://linkedin.com/company/ieeestudentbranch",
                  twitter: "https://twitter.com/ieeestudents",
                  email: "ieee@gbu.ac.in"
                }
              },
              {
                name: "Programming / CodeChef Chapter",
                description: "Competitive coding community hosting Code Matrix, Learn to Code & hackathons.",
                members: 200,
                category: "Technical",
                facultyAdvisor: "Dr. Anurag Singh Baghel",
                image: "https://repository-images.githubusercontent.com/389157855/a2869f47-24d9-4e16-a6cc-b944855dc5f7",
                socialLinks: {
                  instagram: "https://instagram.com/codechef_gbu",
                  email: "codechef@gbu.ac.in"
                }
              },
              {
                name: "Robotics Club",
                description: "Builds autonomous systems & competes in national robotics events.",
                members: 45,
                category: "Technical",
                facultyAdvisor: "Dr. Vimlesh Kumar Ray",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_dlCh4LMQ-987UX_Ssas6havujpWSVCmIGw&s",
                socialLinks: {
                  twitter: "https://twitter.com/robiotics_gbu",
                  email: "robotics@gbu.ac.in"
                }
              },
              {
                name: "Dhrishtikon – Debate Society",
                description: "Promotes free discussion, public speaking & debate competitions.",
                members: 80,
                category: "Cultural",
                facultyAdvisor: "Dr. Manjari Suman",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiaFXt6eK5fEvem3rwrqMkO-O3ERZm0rV9g&s",
                socialLinks: {
                  linkedin: "https://linkedin.com/company/drishtikon-gbu",
                  email: "drishtikon@gbu.ac.in"
                }
              },
              {
                name: "Cultural Council",
                description: "Oversees Drama, Dance, Music, Painting, Photography, Literature, Adventure clubs.",
                members: 300,
                category: "Cultural",
                facultyAdvisor: "Dr. Anand Pratap Singh",
                image: "https://www.palmbeachculture.com/wp/wp-content/uploads/2025/06/Art-Calls-32.jpg",
                socialLinks: {
                  facebook: "https://facebook.com/abhivyanjana",
                  instagram: "https://instagram.com/abhivyanjana_gbu",
                  email: "cultural@gbu.ac.in"
                }
              },
              {
                name: "Adventure Club",
                description: "Organizes trekking, camping and outdoor adventure activities.",
                members: 60,
                category: "Adventure",
                facultyAdvisor: "Dr. Sunita Gupta",
                image: "https://i.pinimg.com/736x/2a/9b/fd/2a9bfd335b50e86e48ad59b4b28aa5b5.jpg",
                socialLinks: {
                  email: "adventure@gbu.ac.in"
                }
              },
              {
                name: "Photography Club",
                description: "Encourages campus photography exhibitions & workshops.",
                members: 50,
                category: "Creative",
                facultyAdvisor: "Dr. Vidushi Sharma",
                image: "https://image-static.collegedunia.com/public/reviewPhotos/899143/unnamed.jpg",
                socialLinks: {
                  instagram: "https://instagram.com/photoclub_gbu",
                  email: "photography@gbu.ac.in"
                }
              },
              {
                name: "Art & Painting Club",
                description: "Hosts workshops & exhibitions to nurture visual arts on campus.",
                members: 40,
                category: "Creative",
                facultyAdvisor: "Dr. Anand Pratap Singh",
                image: "https://images.squarespace-cdn.com/content/v1/604e4790cbfeea1a501ac957/1664284358990-4TBHSR3TPHO2A3M8O79V/teen+photo.jpeg",
                socialLinks: {
                  email: "art@gbu.ac.in"
                }
              }
            ],
          }
        },

             {
               componentName: "PlacementsSection",
               enabled: true,
               position: 10,
               props: {
                 data: {
                   title: "Placements",
                   subTitle: "Connecting talent with opportunities",
                   heroImage:
                     "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&h=300&fit=crop",
                   placementStats: [
                     {
                       label: "Placement Rate",
                       value: "85‑90%",
                       color: "bg-green-500",
                     },
                     {
                       label: "Highest Package",
                       value: "₹51 LPA",
                       color: "bg-blue-500",
                     },
                     {
                       label: "Average Package",
                       value: "₹6 LPA",
                       color: "bg-purple-500",
                     },
                     {
                       label: "Companies Visited",
                       value: "150+",
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
      heading: "Recent Placements",
      subheading: "Our biotechnology students placed in leading pharma and research companies",
      sectionTitle: "Success Stories",
      students: [
        {
          name: "Ankit Verma",
          company: "Biocon",
          package: "₹5.5 LPA",
          department: "M.Sc Biotechnology",
          photo: "https://randomuser.me/api/portraits/men/32.jpg",
        },
        {
          name: "Sneha Sharma",
          company: "Serum Institute of India",
          package: "₹6.2 LPA",
          department: "M.Tech Biotechnology",
          photo: "https://randomuser.me/api/portraits/women/44.jpg",
        },
        {
          name: "Rohit Kumar",
          company: "Dr. Reddy’s Laboratories",
          package: "₹5.8 LPA",
          department: "B.Tech Biotechnology",
          photo: "https://randomuser.me/api/portraits/men/45.jpg",
        },
        {
          name: "Pooja Singh",
          company: "Sun Pharma",
          package: "₹6.5 LPA",
          department: "M.Sc Molecular Medicine",
          photo: "https://randomuser.me/api/portraits/women/65.jpg",
        },
        {
          name: "Aman Gupta",
          company: "Lupin",
          package: "₹5.2 LPA",
          department: "M.Sc Microbial Biotechnology",
          photo: "https://randomuser.me/api/portraits/men/50.jpg",
        },
        {
          name: "Neha Yadav",
          company: "Cipla",
          package: "₹5.9 LPA",
          department: "M.Sc Biotechnology",
          photo: "https://randomuser.me/api/portraits/women/68.jpg",
        },
        {
          name: "Faizan Khan",
          company: "Panacea Biotec",
          package: "₹5.4 LPA",
          department: "B.Sc Biotechnology (Hons.)",
          photo: "https://randomuser.me/api/portraits/men/60.jpg",
        },
        {
          name: "Kavya Reddy",
          company: "Syngene International",
          package: "₹6.8 LPA",
          department: "M.Sc Bioinformatics",
          photo: "https://randomuser.me/api/portraits/women/72.jpg",
        }
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
      {
        name: "Biocon",
        logo: "https://picsum.photos/200?1",
      },
      {
        name: "Cipla",
        logo: "https://picsum.photos/200?2",
      },
      {
        name: "Sun Pharma",
        logo: "https://picsum.photos/200?3",
      },
      {
        name: "Dr. Reddy’s",
        logo: "https://picsum.photos/200?4",
      },
      {
        name: "Lupin",
        logo: "https://picsum.photos/200?5",
      },
      {
        name: "Zydus",
        logo: "https://picsum.photos/200?6",
      },
      {
        name: "Panacea Biotec",
        logo: "https://picsum.photos/200?7",
      },
      {
        name: "Syngene",
        logo: "https://picsum.photos/200?8",
      }
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
          name: "Next Gen Life Sciences Collaboration",
          founder: "SoBT Research Team",
          description:
            "Industry-academia collaboration focused on sustainable biotechnology solutions and research innovation.",
          funding: "Industry Supported",
          status: "Active",
          image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800",
          year: "2023",
        },
        {
          name: "Bharat Test House Biotech Initiative",
          founder: "SoBT Students & Faculty",
          description:
            "Research collaboration for applied biotechnology testing and industrial applications.",
          funding: "Collaborative Project",
          status: "Ongoing",
          image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800",
          year: "2023",
        }
      ],
      stats: {
        totalFunding: "₹10L+",
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
        title: "Khorana Fellowship Selection",
        achievement: "International Fellowship (USA)",
        year: "2015",
        student: "Jyotsna Mishra",
        department: "Biotechnology",
        image: "https://images.unsplash.com/photo-1581091870622-9c6c63c67f1f?w=400",
        description:
          "First GBU student selected for prestigious Indo-US Khorana Fellowship program.",
      },
      {
        title: "International Ph.D Selections",
        achievement: "Global University Placements",
        year: "2017",
        student: "Multiple SoBT Students",
        department: "Biotechnology",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
        description:
          "Students selected for Ph.D programs in USA, France, South Korea, Taiwan, and Australia.",
      },
      {
        title: "CSIR / UGC NET-JRF Achievements",
        achievement: "National Research Fellowships",
        year: "2012-2017",
        student: "SoBT Students",
        department: "Biotechnology",
        image: "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?w=400",
        description:
          "Students qualified prestigious CSIR, UGC-NET, DBT-JRF and ICMR fellowships.",
      },
      {
        title: "GATE Qualified Students",
        achievement: "Multiple Selections",
        year: "2012-2017",
        student: "SoBT Students",
        department: "Biotechnology",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400",
        description:
          "Students successfully qualified GATE exams and secured admissions in top institutes.",
      },
      {
        title: "International Research Training",
        achievement: "Global Research Exposure",
        year: "2016-2017",
        student: "M.Tech Students",
        department: "Biotechnology",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
        description:
          "Students completed research training at institutes like CNRS France and NMBU Norway.",
      }
    ],
  },
}
           ];