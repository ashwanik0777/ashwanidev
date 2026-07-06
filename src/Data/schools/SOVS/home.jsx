import React from "react";
import { Code, Lightbulb, Rocket, Target, Trophy } from "lucide-react";

const sovsasBanner =
  "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop";

const sovsasSlides = [
  {
    title: "School of Vocational Studies and Applied Sciences",
    subtitle: "Gautam Buddha University",
    description:
      "Integrating core sciences with applied learning through laboratories, workshops, and research-driven teaching.",
    image: sovsasBanner,
  },
  {
    title: "Applied Sciences in Practice",
    subtitle: "Physics, Chemistry, Mathematics, Environment",
    description:
      "Interdisciplinary programs emphasize practical skills, industry readiness, and scientific rigor across disciplines.",
    image:
      "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
  },
  {
    title: "Advanced Laboratories and Research",
    subtitle: "Hands-on training",
    description:
      "Dedicated labs in physics, chemistry, mathematics, environmental science, and food technology support PG and PhD research.",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
  },
];

export const sectionsConfig = [
  {
    componentName: "Landing",
    enabled: true,
    position: 1,
    props: { slides: sovsasSlides },
  },
  {
    componentName: "AboutSection",
    enabled: true,
    position: 2,
    props: {
      data: {
        heading: "About Us",
        subtitle: "School of Vocational Studies and Applied Sciences",
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
                  University School of Vocational Studies and Applied Sciences
                  (USoVSAS)
                </span>{" "}
                integrates Physics, Chemistry, Mathematics, Environmental
                Science, and Food Processing with practical laboratory learning
                across UG, PG, and doctoral programs.
              </>
            ),
            highlight: (
              <>
                The school emphasizes{" "}
                <span className="font-semibold text-indigo-600">
                  integration of theory with practice
                </span>
                , offering workshops, seminars, and research opportunities
                supported by national agencies such as DST, CSIR, and UPCST.
              </>
            ),
          },
          {
            title: "Our Commitment",
            icon: <Trophy size={28} />,
            bgGradient: "from-purple-500 to-pink-600",
            content: (
              <>
                Teaching and learning combine lectures, experience sharing, and
                analytical problem solving with continuous industry engagement
                and interdisciplinary collaboration.
              </>
            ),
            bullets: [
              <span className="font-semibold text-gray-800">
                Advanced laboratories for postgraduate and doctoral training
              </span>,
              "Guest lectures, workshops, and academic collaborations",
              "Residential campus that supports mentoring and research culture",
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
        { value: 5, label: "Departments", suffix: "" },
        { value: 35, label: "Faculty", suffix: "+" },
        { value: 22, label: "Programs", suffix: "+" },
        { value: 16, label: "Labs", suffix: "+" },
        { value: 100, label: "Publications", suffix: "+" },
        { value: 2010, label: "Established", suffix: "" },
      ],
    },
  },
  {
    componentName: "LeadershipCard",
    enabled: true,
    position: 4,
    props: {
      name: "Prof. Chander Kumar Singh",
      title:
        "Professor and Dean - School of Vocational Studies and Applied Sciences",
      image:
        "https://i1.rgstatic.net/ii/profile.image/337623269822466-1457507069206_Q512/Chander-Singh.jpg",
      description:
        "Prof. Chander Kumar Singh leads USoVSAS with a focus on applied sciences, environmental research, and community impact. His work bridges hydrogeochemistry, public health, and geospatial modeling to translate research into practical solutions for society.",
    },
  },
  {
    componentName: "DepartmentsSection",
    enabled: true,
    position: 5,
    props: {
      departments: [
        {
          name: "Department of Applied Mathematics",
          code: "AM",
          description:
            "Modeling, simulation, computation, and analytical methods for science and engineering challenges.",
          courses: [
            "B.Tech. (Maths and Computing)",
            "B.Sc (Hons.) Mathematics",
            "B.Sc (Hons.) in Mathematics, Statistics, Economics",
            "M.Sc. Mathematics (Since 2018)",
            "Ph.D. (Mathematics)",
          ],
          faculty: 8,
          labs: 2,
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
          gradient: "from-blue-400 to-blue-600",
          link: "/schools/SOVS/departments/applied-mathematics",
        },
        {
          name: "Department of Applied Chemistry",
          code: "AC",
          description:
            "Chemical sciences, green chemistry, polymer science, and materials research with strong lab exposure.",
          courses: [
            "B.Sc (Hons.) in Chemistry",
            "M.Sc. Chemistry",
            "Ph.D. (Chemistry)",
            "Post Graduate Diploma in Polyurethane Technology",
            "Course Structure",
          ],
          faculty: 10,
          labs: 4,
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          gradient: "from-blue-600 to-blue-800",
          link: "/schools/SOVS/departments/applied-chemistry",
        },
        {
          name: "Department of Applied Physics",
          code: "AP",
          description:
            "Photonics, nanomaterials, optoelectronics, and experimental physics with strong research focus.",
          courses: [
            "B.Sc. Physical Sciences",
            "B.Sc. Hons Physics/ B.Sc. Hons Physics with research",
            "M.Sc. Physics (Batch 2024-26)",
            "Ph.D. (Physics)",
          ],
          faculty: 9,
          labs: 6,
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          gradient: "from-blue-50 to-blue-700",
          link: "/schools/SOVS/departments/applied-physics",
        },
        {
          name: "Department of Environmental Sciences",
          code: "ES",
          description:
            "Environmental science education and research with emphasis on sustainability, assessment, and remediation.",
          courses: [
            "B.Sc. (Hons.) in Environmental Science",
            "M.Sc. Environmental Science",
            "Ph.D. in Enviornmental Sciences",
            "Post Graduate Diploma in Environmental Management",
            "Post Graduate Diploma in Environmental Law and Policy",
          ],
          faculty: 8,
          labs: 2,
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          gradient: "from-blue-400 to-blue-600",
          link: "/schools/SOVS/departments/environmental-science",
        },
        {
          name: "Department of Food Processing and Technology",
          code: "FPT",
          description:
            "Food science, processing technologies, product development, and safety standards for industry readiness.",
          courses: [
            "B.Tech. Food Processing and Technology",
            "M.Tech. Food Processing and Technoloy",
            "M.Sc. Food Science",
            "Ph.D. in Food Processing and Technology",
            "M.Sc. Geology",
          ],
          faculty: 8,
          labs: 5,
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          gradient: "from-blue-600 to-blue-800",
          link: "/schools/SOVS/departments/food-processing-technology",
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
          name: "B.Tech. Food Processing and Technology",
          code: "BTech FPT",
          duration: "4 Years",
          specializations: [
            "Food Technology",
            "Quality Assurance",
            "Product Development",
          ],
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          description:
            "Undergraduate program focused on food processing, safety, and industry practices.",
        },
        {
          name: "M.sc. Food Science",
          code: "MSc FS",
          duration: "2 Years",
          specializations: ["Food Chemistry", "Quality Control"],
          image:
            "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
          description:
            "Postgraduate program emphasizing food science, analysis, and laboratory methods.",
        },
        {
          name: "M.Tech. Food Processing and Technoloy",
          code: "MTech FPT",
          duration: "2 Years",
          specializations: ["Process Engineering", "Food Technology"],
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Advanced program in food processing technology and applied research.",
        },
        {
          name: "B.Tech. (Maths and Computing)",
          code: "BTech MC",
          duration: "4 Years",
          specializations: ["Mathematical Modeling", "Computing"],
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
          description:
            "Applied mathematics and computing foundations for analytical and technical roles.",
        },
        {
          name: "B.Tech. (Food Processing and Technology)",
          code: "BTech FPT",
          duration: "4 Years",
          specializations: ["Food Processing", "Food Safety"],
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          description:
            "Skill-oriented program in food processing systems and product development.",
        },
        {
          name: "B.Sc. Physical Sciences",
          code: "BSc PS",
          duration: "3 Years",
          specializations: ["Physics", "Chemistry", "Mathematics"],
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          description:
            "Interdisciplinary science program covering core physical sciences and lab work.",
        },
        {
          name: "B.Sc. Hons Physics/ B.Sc. Hons Physics with research",
          code: "BSc Phys",
          duration: "4 Years",
          specializations: ["Photonics", "Energy Studies", "Quantum"],
          image:
            "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
          description:
            "Honours program with research exposure in modern physics and optoelectronics.",
        },
        {
          name: "B.Sc (Hons.) Mathematics",
          code: "BSc Math",
          duration: "4 Years",
          specializations: ["Statistics", "Operations Research"],
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Mathematics honours program focused on applied analysis and modeling.",
        },
        {
          name: "B.Sc (Hons.) in Mathematics, Statistics, Economics",
          code: "BSc MSE",
          duration: "4 Years",
          specializations: ["Mathematics", "Statistics", "Economics"],
          image:
            "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
          description:
            "Integrated honours program combining mathematical and economic foundations.",
        },
        {
          name: "B.Sc (Hons.) in Chemistry",
          code: "BSc Chem",
          duration: "4 Years",
          specializations: ["Organic Chemistry", "Green Chemistry"],
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Chemistry honours program with strong laboratory and research components.",
        },
        {
          name: "M.Tech. (Food Processing and Technology)",
          code: "MTech FPT",
          duration: "2 Years",
          specializations: ["Food Engineering", "Process Design"],
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          description:
            "Postgraduate program in advanced food processing and technology systems.",
        },
        {
          name: "M.Sc. Chemistry",
          code: "MSc Chem",
          duration: "2 Years",
          specializations: ["Physical Chemistry", "Material Chemistry"],
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Advanced chemistry curriculum with lab-based training and research focus.",
        },
        {
          name: "M.Sc. Physics (Batch 2024-26)",
          code: "MSc Phys",
          duration: "2 Years",
          specializations: ["Astro Physics", "Photonics", "Quantum"],
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          description:
            "Postgraduate physics program with specialization pathways and research exposure.",
        },
        {
          name: "M.Sc. Mathematics (Since 2018)",
          code: "MSc Math",
          duration: "2 Years",
          specializations: ["Applied Mathematics", "Computational Methods"],
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
          description:
            "Postgraduate program emphasizing mathematical modeling and computation.",
        },
        {
          name: "M.Sc. Environmental Science",
          code: "MSc ES",
          duration: "2 Years",
          specializations: ["Sustainability", "Environmental Assessment"],
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          description:
            "Advanced study in environmental monitoring, management, and remediation.",
        },
        {
          name: "M.Sc. Food Science",
          code: "MSc FS",
          duration: "2 Years",
          specializations: ["Food Analysis", "Food Safety"],
          image:
            "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
          description:
            "Postgraduate food science program with analytical and research components.",
        },
        {
          name: "M.Sc. Geology",
          code: "MSc Geo",
          duration: "2 Years",
          specializations: ["Earth Science", "Geology"],
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          description:
            "Earth science program focusing on applied geology and field practice.",
        },
        {
          name: "Ph.D. (Physics)",
          code: "PhD Phys",
          duration: "Varies",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
          description:
            "Doctoral research in physics and related applied sciences.",
        },
        {
          name: "Ph.D. (Chemistry)",
          code: "PhD Chem",
          duration: "Varies",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description: "Doctoral research program in chemical sciences.",
        },
        {
          name: "Ph.D. (Mathematics)",
          code: "PhD Math",
          duration: "Varies",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
          description: "Doctoral research in applied and pure mathematics.",
        },
        {
          name: "Ph.D. in Food Processing and Technology",
          code: "PhD FPT",
          duration: "Varies",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          description: "Doctoral research in food processing and technology.",
        },
        {
          name: "Ph.D. in Enviornmental Sciences",
          code: "PhD ES",
          duration: "Varies",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          description:
            "Doctoral research in environmental sciences and sustainability.",
        },
        {
          name: "Syllabus of M.Sc Enviornmental Science",
          code: "MSc ES Syllabus",
          duration: "N/A",
          specializations: ["Curriculum"],
          image:
            "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
          description:
            "Programme curriculum and syllabus resource for M.Sc Environmental Science.",
        },
        {
          name: "Students (List of Ph.D. Students with RDC approved Thesis Title)",
          code: "PhD Students",
          duration: "N/A",
          specializations: ["Research"],
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Reference list of Ph.D. students and approved research thesis titles.",
        },
      ],
    },
  },
  {
    componentName: "FacultyCarousel",
    enabled: true,
    position: 7,
    props: {
      title: "Faculty of SOVSAS",
      subTitle: "",
      facultyList: [
        {
          name: "Prof. Chander Kumar Singh",
          title: "Professor and Dean",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/68ef9005eec78_cks.jpeg",
        },
        {
          name: "Prof. Saumitra Mukherjee",
          title: "Adjunct Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/689463f4ae742_Picture1.jpg",
        },
        {
          name: "Dr. Vinit Kumar",
          title: "Associate Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/691c632735770_Dr. Vinit.png",
        },
        {
          name: "Dr. Bhaswati Banerjee",
          title: "Assistant Professor and HoD",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Mausumi Pohit",
          title: "Assistant Professor and HoD",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/66053438d5edf_mausumi.jpg",
        },
        {
          name: "Dr. Pratiksha Saxena",
          title: "Assistant Professor and HoD",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660533001af1f_pratiksha.jpg",
        },
        {
          name: "Dr. Rajesh Kumar Gupta",
          title: "Assistant Professor and HoD",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660533b4b11ee_rajesh.jpg",
        },
        {
          name: "Dr. Tashfeen Ashraf",
          title: "Assistant Professor and HoD",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Alpa Yadav",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660534a85d1d9_alpa.jpg",
        },
        {
          name: "Dr. Amit Kumar Awasthi",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605334bd9c47_amitkawasthi.jpg",
        },
        {
          name: "Dr. Amit Ujlayan",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605335de5ae3_amitujlayan.jpg",
        },
        {
          name: "Dr. Asha Pandey",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c487340ef66_WhatsApp Image 2025-02-28 at 3.43.14 PM.jpeg",
        },
        {
          name: "Dr. Ashish Kumar Keshari",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605339fa2686_ashishk.png",
        },
        {
          name: "Dr. Bhawana Joshi",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605333281711_bhawana.jpg",
        },
        {
          name: "Dr. Deepti Goyal",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660534b9f13b0_deepti.png",
        },
        {
          name: "Dr. Dipti Singh",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605340210c8b_dipti.jpg",
        },
        {
          name: "Dr. Jaya Maitra",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605329255034_jaya.jpg",
        },
        {
          name: "Dr. Manju Sharma",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Manmohan Singh Shishodia",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605337b333c2_manmohan.png",
        },
        {
          name: "Dr. Nitin Sonkar",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c69ca1267bf_Nitin Pic.jpeg",
        },
        {
          name: "Dr. Sushil Kumar",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/660532af762d9_sushil.kumar.jpg",
        },
        {
          name: "Dr. Tanvi Vats",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6605348a7631f_tanvi.jpg",
        },
        {
          name: "Dr. Upma Singh",
          title: "Assistant Professor",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Vandana Singh",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c3ee4c53ff0_vandana.jpg",
        },
        {
          name: "Dr. Venus Dillu",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c54f9461b79_Venus Dillu GBU.jpg",
        },
        {
          name: "Dr. Vivek Kumar Shukla",
          title: "Assistant Professor",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c3951bd2b60_vks pic Feb 2025B.jpg",
        },
        {
          name: "Dr. Alice Singh",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6981b54da5eee_Picture1.png",
        },
        {
          name: "Dr. Asha Kumari",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6979f4437b3f6_pic jpg.jpg",
        },
        {
          name: "Dr. Neena Singh",
          title: "Assistant Professor (OCFD)",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Pallawi Joshi",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/697b161a97f26_IMG_20240909_142522.jpg",
        },
        {
          name: "Dr. Ruchi Lamba",
          title: "Assistant Professor (OCFD)",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Ruchi Verma",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6979f74b01d1a_image.jpg",
        },
        {
          name: "Dr. Saba Shirin",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67cb4e77adc46_Dr. Saba Shirin pic.jpeg",
        },
        {
          name: "Dr. Sheela Pal",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67c9ffa864260_Sheela maam pic.jpeg",
        },
        {
          name: "Dr. Shiv Shankar",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67cec71383752_profile pic.jpg",
        },
        {
          name: "Dr. Smriti Mehrotra",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/67ca1f5a36438_smriti_photo-transformed (6) (1).png",
        },
        {
          name: "Dr. Swati Chauhan",
          title: "Assistant Professor (OCFD)",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Vasundhara",
          title: "Assistant Professor (OCFD)",
          image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
        },
        {
          name: "Dr. Vinita Sharma",
          title: "Assistant Professor (OCFD)",
          image:
            "https://faculty.gbu.ac.in/../uploads/photos/6981cccd09eda_Dr. Vinita Sharma.jpeg",
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
          title: "PolyUrethane Admission Brochure 2023-24",
          date: "2025-01-05",
          type: "Admission",
        },
        {
          title: "Admission Brochure 2023-24",
          date: "2025-01-08",
          type: "Admission",
        },
        {
          title: "Admission Flyer 2023-24",
          date: "2025-01-12",
          type: "Admission",
        },
        {
          title: "Admission Booklet 2023-24",
          date: "2025-01-15",
          type: "Admission",
        },
        {
          title: "Admission Brochure",
          date: "2025-01-18",
          type: "Admission",
        },
      ],
      events: [
        {
          title: "National Science Day Celebration",
          date: "2025-02-28",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          description:
            "Lectures, debates, and quizzes across applied sciences disciplines.",
        },
        {
          title: "Guest Speaker Series",
          date: "2025-03-10",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Industry and academic experts share research insights and career guidance.",
        },
        {
          title: "Laboratory Skills Workshop",
          date: "2025-03-22",
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Hands-on training in laboratory safety and analytical techniques.",
        },
        {
          title: "Environmental Science Field Visit",
          date: "2025-04-05",
          image:
            "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          description:
            "Field-based exposure to environmental monitoring and assessment.",
        },
        {
          title: "Food Technology Lab Demonstrations",
          date: "2025-04-18",
          image:
            "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          description:
            "Applied lab sessions for food processing and quality practices.",
        },
        {
          title: "Academic Collaboration Meet",
          date: "2025-04-26",
          image:
            "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
          description:
            "Industry and academic partners explore joint research and training.",
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
          name: "C V Raman Club",
          description:
            "Science outreach and lecture series celebrating physics and innovation.",
          members: 120,
          category: "Science Outreach",
          facultyAdvisor: "Dr. Mausumi Pohit",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          socialLinks: {
            email: "admissions@gbu.ac.in",
          },
        },
        {
          name: "National Science Day 2023",
          description:
            "Annual events, quizzes, and competitions for applied sciences students.",
          members: 200,
          category: "Events",
          facultyAdvisor: "Dr. Ashish Kumar Keshari",
          image:
            "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
          socialLinks: {
            email: "crc@gbu.ac.in",
          },
        },
        {
          name: "National Science Day 2022",
          description:
            "Faculty-led outreach programs to promote scientific temper.",
          members: 180,
          category: "Events",
          facultyAdvisor: "Prof. Chander Kumar Singh",
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          socialLinks: {
            email: "crc@gbu.ac.in",
          },
        },
        {
          name: "Alumni Meet 2023",
          description:
            "Alumni engagement and mentoring for research and placement readiness.",
          members: 80,
          category: "Alumni",
          facultyAdvisor: "Dr. Vinit Kumar",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          socialLinks: {
            email: "vinay.litoria@gbu.ac.in",
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
        subTitle: "Corporate Relationship Center",
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
    enabled: true,
    position: 11,
    props: {
      data: {
        sectionTitle: "Success Stories",
        students: [
          {
            name: "SOVSAS Graduate",
            company: "Environmental Research Lab",
            package: "INR 6.5 LPA",
            department: "Environmental Science",
            photo:
              "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
          },
          {
            name: "SOVSAS Graduate",
            company: "Food Processing Industry",
            package: "INR 7.2 LPA",
            department: "Food Processing",
            photo:
              "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
          },
          {
            name: "SOVSAS Graduate",
            company: "Applied Chemistry Lab",
            package: "INR 6.8 LPA",
            department: "Applied Chemistry",
            photo:
              "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          },
          {
            name: "SOVSAS Graduate",
            company: "Physics Research Center",
            package: "INR 7.0 LPA",
            department: "Applied Physics",
            photo:
              "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          },
          {
            name: "SOVSAS Graduate",
            company: "Analytics Firm",
            package: "INR 7.8 LPA",
            department: "Applied Mathematics",
            photo:
              "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
          },
          {
            name: "SOVSAS Graduate",
            company: "Quality Assurance Lab",
            package: "INR 6.9 LPA",
            department: "Food Science",
            photo:
              "https://images.unsplash.com/photo-1509223197845-458d87318791?w=600&h=400&fit=crop",
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
          name: "Environmental Labs",
          logo: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop",
        },
        {
          name: "FoodTech Industry",
          logo: "https://images.unsplash.com/photo-1581092160612-33d00a8b99c1?w=600&h=400&fit=crop",
        },
        {
          name: "Applied Chemistry Labs",
          logo: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
        },
        {
          name: "Physics Research Centers",
          logo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
        },
        {
          name: "Mathematics and Analytics",
          logo: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=600&h=400&fit=crop",
        },
        {
          name: "Vocational Training Partners",
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
            name: "Applied Sciences Innovation Cell",
            founder: "SOVSAS Students",
            description:
              "Student-led initiatives translating lab research into prototypes and community solutions.",
            funding: "University Supported",
            status: "Incubated",
            image:
              "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
            year: "2022",
          },
        ],
        stats: {
          totalFunding: "INR 8L+",
          totalDepartments: 5,
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
          title: "National Science Day Celebration",
          achievement: "Campus-wide Participation",
          year: "2023",
          student: "SOVSAS Students",
          department: "Applied Sciences",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&h=400&fit=crop",
          description:
            "Science outreach events with lectures, debates, and competitions across departments.",
        },
        {
          title: "Guest Speaker Series",
          achievement: "Expert Talks",
          year: "2024",
          student: "SOVSAS Community",
          department: "Interdisciplinary",
          image:
            "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
          description:
            "Sessions by academic and industry experts to connect research with real-world impact.",
        },
        {
          title: "Workshops and Seminars",
          achievement: "Skill Training",
          year: "2024",
          student: "SOVSAS Students",
          department: "Applied Chemistry",
          image:
            "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
          description:
            "Hands-on workshops in green chemistry, analytics, and laboratory practices.",
        },
        {
          title: "Research Support Programs",
          achievement: "DST/CSIR/UPCST Backing",
          year: "2025",
          student: "Research Scholars",
          department: "Applied Sciences",
          image:
            "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=600&h=400&fit=crop",
          description:
            "Research activities supported by national agencies and collaborative partners.",
        },
      ],
    },
  },
];