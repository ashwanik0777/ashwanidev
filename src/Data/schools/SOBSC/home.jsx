import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";
import { deansMessageData } from "./about/deans-message";

const buddhistslides = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSAkYj4I9sawa_oLwgyVPf9hf-ooy83Ieytw&s",
    title: "School of Buddhist Studies and Civilization",
    subtitle: "Promoting Peace, Harmony & Mindfulness",
  },
  {
    image: "https://www.gbu.ac.in/Content/schools/img/sobs/buddhism.jpg",
    title: "Established and successfully running since 2011, with over 90% international students from 10 countries",
    subtitle: "Scientific & Non-Sectarian Research",
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: buddhistslides },
  },

  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        floatingIcons: [
          { icon: <Code size={40} />, color: "text-amber-400", style: "top-20 left-10" },
          { icon: <Lightbulb size={35} />, color: "text-orange-400", style: "top-32 right-20" },
          { icon: <Rocket size={45} />, color: "text-yellow-400", style: "bottom-20 left-1/4" },
        ],
        cards: [
          {
            title: "VISION | SOBSC",
            icon: <Target size={28} />,
            bgGradient: "from-amber-500 to-orange-600",
            content: (
              <>
                The{" "}
                <span className="font-semibold text-amber-600">
                  School of Buddhist Studies & Civilization (SOBSC)
                </span>{" "}
                envisions a world where diverse learners have direct access to the{" "}
                <span className="font-semibold text-orange-600">
                  teachings of the Buddha
                </span>{" "}
                to foster global wisdom, peace, and compassion. Established in 2011 as the first independent faculty/school of its kind in India, it provides an authentic academic and meditative environment with qualified faculty, dedicated research facilities, and Vipassana meditation training.
              </>
            ),
          },
          {
            title: "MISSION | SOBSC",
            icon: <Trophy size={28} />,
            bgGradient: "from-orange-500 to-amber-600",
            content: (
              <>
                To serve as an international centre of higher learning providing both{" "}
                <span className="font-semibold text-orange-600">
                  traditional and modern Buddhist education
                </span>{" "}
                through rigorous research, translation, interfaith dialogue, and societal engagement. With international students representing nearly{" "}
                <span className="font-semibold text-amber-600">
                  90% of total enrolment across 10+ nations
                </span>
                , the school promotes non-sectarian scholarship, conflict resolution, human values, and global harmony.
              </>
            ),
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
        { value: 1, label: "School", suffix: "" },
        { value: 132, label: "Students", suffix: "+" },
        { value: 10, label: "Countries", suffix: "+" },
        { value: 90, label: "International Students", suffix: "%" },
        { value: 11, label: "Faculty Members", suffix: "+" },
        { value: 2011, label: "Established", suffix: "" },
      ],
    },
  },

  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: deansMessageData?.deanName || "Prof. Karam Tej Sarao",
      title: deansMessageData?.designation || "Dean, School of Buddhist Studies and Civilization",
      image: deansMessageData?.image || "https://ui-avatars.com/api/?name=Karam+Tej+Sarao&size=300&background=F59E0B&color=fff",
      shortMessage: deansMessageData?.shortMessage,
      description: deansMessageData?.message || deansMessageData?.fullMessage || deansMessageData?.shortMessage,
      message: deansMessageData?.message || deansMessageData?.fullMessage,
    },
  },

  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "Buddhist Philosophy & Ethics",
          code: "BPE",
          description:
            "Focuses on core Buddhist teachings, philosophy, ethics, and human values for global peace and harmony.",
          courses: [
            "M.A. Buddhist Studies",
            "M.Phil Buddhist Studies",
            "Ph.D Buddhist Studies",
          ],
          faculty: 11,
          labs: 2,
          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
          gradient: "from-yellow-400 to-orange-500",
          link: "/schools/SOBSC/departments/buddhist-philosophy",
        },
        {
          name: "Buddhist Languages & Literature",
          code: "BLL",
          description:
            "Covers study of Pali, Sanskrit, and other canonical languages with focus on Buddhist texts and literature.",
          courses: [
            "Language Studies (Pali, Sanskrit)",
            "Textual & Canonical Studies",
            "Research in Buddhist Literature",
          ],
          faculty: 8,
          labs: 1,
          image:
            "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
          gradient: "from-orange-500 to-yellow-600",
          link: "/schools/SOBSC/departments/buddhist-languages",
        },
        {
          name: "Meditation & Mindfulness Studies",
          code: "MMS",
          description:
            "Focuses on Vipassana meditation, mindfulness practices, and their application in modern life and mental well-being.",
          courses: [
            "Vipassana Meditation Training",
            "Mindfulness & Well-being",
            "Applied Buddhist Practices",
          ],
          faculty: 5,
          labs: 2,
          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
          gradient: "from-yellow-500 to-orange-600",
          link: "/schools/SOBSC/departments/meditation-mindfulness",
        },
      ],
    },
  },

  {
    componentName: "ProgramsShowcase",
    enabled: true,
    position: 6,
    props: {
      categories: ["All", "PG", "Ph.D"],
      programs: [
        {
          name: "M.A. Buddhist Studies",
          code: "MA",
          level: "PG",
          duration: "2 Years",
          specializations: ["Buddhist Philosophy", "Ethics", "Meditation Studies"],
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600",
          description: "Postgraduate program focused on Buddhist philosophy, teachings and practices.",
        },
        {
          name: "M.Phil Buddhist Studies",
          code: "MPhil",
          level: "PG",
          duration: "2 Years",
          specializations: ["Advanced Buddhist Research"],
          image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
          description: "Research-oriented program for advanced academic exploration.",
        },
        {
          name: "Ph.D Buddhist Studies",
          code: "PhD",
          level: "Ph.D",
          duration: "Varies",
          specializations: ["Research in Buddhism & Civilization"],
          image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600",
          description: "Doctoral research in Buddhist philosophy, ethics, and global studies.",
        },
      ],
    },
  },

  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of Buddhist Studies",
      subTitle: "School of Buddhist Studies and Civilization",
      facultyList: [
        {
          name: "Prof. Niranjan Melkania",
          title: "Professor (Dean)",
          image: "https://ui-avatars.com/api/?name=Niranjan+Melkania",
        },
        {
          name: "Dr. Chintala Venkata Sivasai",
          title: "Assistant Professor (Head)",
          image: "https://faculty.gbu.ac.in/uploads/photos/6820d450b7965_sivasai%20photo.jpg",
        },
        {
          name: "Dr. Chandrashekhar Paswan",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/66053c7fcc9ee_chandrashekhar.jpg",
        },
        {
          name: "Dr. Arvind Kumar Singh",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/67c148e692499_arving%20singh.JPG",
        },
        {
          name: "Dr. Gyanaditya Shakya",
          title: "Assistant Professor",
          image: "https://ui-avatars.com/api/?name=Gyanaditya+Shakya",
        },
        {
          name: "Dr. Priyadarsini Mitra",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/66053d094c80d_priyadarsini.jpg",
        },
        {
          name: "Dr. Manish T. Meshram",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/661d144021f36_Passport%20photo.jpg",
        },
        {
          name: "Mr. Vikram Singh Yadav",
          title: "Assistant Professor (On Contract)",
          image: "https://faculty.gbu.ac.in/uploads/photos/66053d4f8054f_vikram.singh.jpg",
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
          title: "Notice for e‑kyc through UPDESCO",
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
      ],
      events: [
        {
          title: "Online National Article Writing Competition (GST)",
          date: "2025-06-30",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK2NnCSPRdgMAEkEafMhZojs0fdgEv6hFY0A&s",
          description: "Organized by School of Law, extended submission date.",
        },
        {
          title: "Six‑Day Residential Vipassana Program",
          date: "2025-06-09",
          image:
            "https://data.gbu.ac.in/Events/1714148988_FIVE%20DAY%20VIPASSANA%20COURSE%20FEB2024_page-0001.jpg",
          description: "Well‑being retreat by School of Buddhist Studies.",
        },
        {
          title: "World Environment Day Report",
          date: "2025-06-05",
          image:
            "https://images.timesnownews.com/thumb/msid-151788925,thumbsize-1151391,width-1280,height-720,resizemode-75/151788925.jpg",
          description:
            "Activities report by Department of Environmental Science.",
        },
        {
          title: "SOBSC Vesak Day Celebrations",
          date: "2025-05-03",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCwXCDOopXvx7WxXSEcJJJ86SzCi_HjeITTQ&s",
          description:
            "Celebration at School of Buddhist Studies & Civilization.",
        },
        {
          title: "ICSSR‑Sponsored AI Research Methodology Course",
          date: "2024-12-03",
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvQud5sjoe92WQkeO2ddUOccbSRysoFo6K5GvgRZzSeMy1a2DsromFso3Hp7ctE8W-e94&usqp=CAU",
          description:
            "10‑day course on integrating AI in research, sponsored by ICSSR.",
        },
        {
          title: "Digital India Talk Show",
          date: "2024-11-20",
          image:
            "https://negd.gov.in/wp-content/uploads/2025/01/gatishakti.jpeg",
          description:
            "Awareness session on e‑governance chaired by VC Prof. R.K. Sinha.",
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
          description:
            "Encourages campus photography exhibitions & workshops.",
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
    enabled: false,
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
            value: "₹51 LPA",
            color: "bg-blue-500",
          },
          {
            label: "Average Package",
            value: "₹6 LPA",
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
    enabled: false,
    position: 11,
    props: {
      data: {
        heading: "Academic Achievements",
        subheading:
          "Our students excelling in higher studies, research and fellowships",
        sectionTitle: "Success Stories",
        students: [
          {
            name: "Rahul Sharma",
            company: "Ph.D Scholar – Nalanda University",
            package: "Research Fellowship",
            department: "M.A. Buddhist Studies",
            photo:
              "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop",
          },
          {
            name: "Priya Verma",
            company: "International Buddhist University, Thailand",
            package: "Scholarship Awarded",
            department: "M.A. Buddhist Studies",
            photo:
              "https://media.istockphoto.com/id/485372249/photo/beautiful-university-student-smiling-outside-the-building.webp",
          },
          {
            name: "Amit Kumar",
            company: "Ph.D – Jawaharlal Nehru University",
            package: "JRF Qualified",
            department: "M.Phil Buddhist Studies",
            photo:
              "https://images.unsplash.com/photo-1646415753793-dcfda1dfeee3?w=600&auto=format&fit=crop",
          },
          {
            name: "Neha Singh",
            company: "Research Associate – IGNCA",
            package: "₹5 LPA",
            department: "M.A. Buddhist Studies",
            photo:
              "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
          },
          {
            name: "Aditya Patel",
            company: "Ph.D – University of Delhi",
            package: "NET Qualified",
            department: "M.Phil Buddhist Studies",
            photo:
              "https://images.unsplash.com/photo-1644904105846-095e45fca990?w=600&auto=format&fit=crop",
          },
          {
            name: "Riya Gupta",
            company: "Teaching Fellow – Buddhist Research Institute",
            package: "₹4.5 LPA",
            department: "M.A. Buddhist Studies",
            photo:
              "https://media.istockphoto.com/id/1362063465/photo/female-teen-student",
          },
          {
            name: "Mohammed Siddiqui",
            company: "Ph.D – Banaras Hindu University",
            package: "Research Fellowship",
            department: "M.A. Buddhist Studies",
            photo:
              "https://media.istockphoto.com/id/1995982413/photo/happy-black-male-student",
          },
          {
            name: "Ananya Reddy",
            company: "International Research Program – Japan",
            package: "Fully Funded",
            department: "M.A. Buddhist Studies",
            photo:
              "https://media.istockphoto.com/id/1272815911/photo/young-indian-female-student",
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
        {
          name: "Nalanda University",
          logo: "https://logo.clearbit.com/nalandauniv.edu.in",
        },
        {
          name: "IGNCA",
          logo: "https://logo.clearbit.com/ignca.gov.in",
        },
        {
          name: "ICCR",
          logo: "https://logo.clearbit.com/iccr.gov.in",
        },
        {
          name: "University of Delhi",
          logo: "https://logo.clearbit.com/du.ac.in",
        },
        {
          name: "Jawaharlal Nehru University",
          logo: "https://logo.clearbit.com/jnu.ac.in",
        },
        {
          name: "Banaras Hindu University",
          logo: "https://logo.clearbit.com/bhu.ac.in",
        },
        {
          name: "Nalanda International University",
          logo: "https://logo.clearbit.com/nalandauniv.edu.in",
        },
        {
          name: "Mahachulalongkorn University",
          logo: "https://logo.clearbit.com/mcu.ac.th",
        },
        {
          name: "International Buddhist College",
          logo: "https://logo.clearbit.com/ibc.ac.th",
        },
        {
          name: "Buddhist Research Institute",
          logo: "https://logo.clearbit.com/budsas.org",
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
            name: "Buddhist Knowledge Initiative",
            founder: "SoBSC Students & Faculty",
            description:
              "A student-led initiative promoting Buddhist teachings, mindfulness practices, and cultural awareness through workshops and seminars.",
            funding: "University Supported",
            status: "Active",
            image:
              "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
            year: "2022",
          },
          {
            name: "Mindfulness & Meditation Circle",
            founder: "SoBSC Research Scholars",
            description:
              "A collaborative platform for meditation training, mental wellness, and applied Buddhist practices.",
            funding: "Self & Institutional Support",
            status: "Ongoing",
            image:
              "https://images.unsplash.com/photo-1474418397713-6b7f0c1f1d3b?w=800",
            year: "2023",
          },
        ],
        stats: {
          totalFunding: "₹5L+",
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
          department: "Buddhist Studies",
          image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
          description:
            "Student selected for prestigious Indo-US Khorana Fellowship for academic excellence.",
        },
        {
          title: "International Ph.D Selections",
          achievement: "Global University Placements",
          year: "2017",
          student: "SoBSC Students",
          department: "Buddhist Studies",
          image:
            "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?w=400",
          description:
            "Students selected for Ph.D programs in universities across USA, France, and Asia.",
        },
        {
          title: "UGC-NET / JRF Qualification",
          achievement: "National Fellowships",
          year: "2016",
          student: "Multiple Students",
          department: "Buddhist Studies",
          image:
            "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?w=400",
          description:
            "Students qualified UGC-NET, JRF and other national-level fellowships.",
        },
        {
          title: "International Research Training",
          achievement: "Global Exposure",
          year: "2017",
          student: "M.Phil Scholars",
          department: "Buddhist Studies",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400",
          description:
            "Students completed research training at international institutes in Europe and Asia.",
        },
      ],
    },
  },
];