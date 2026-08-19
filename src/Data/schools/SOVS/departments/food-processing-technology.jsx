import { Utensils, ShieldCheck, Activity } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "food-processing-technology",
  heroProps: {
    title: "Department of Food Processing and Technology",
    highlight: "From Farm to Fork: Innovating Food for a Safer and Sustainable Tomorrow.",
    subtitle:
      "Advancing education, research, and innovation in food science, food processing, and value addition to agricultural products at Gautam Buddha University.",
    primaryButton: { label: "Explore Programmes" },
    secondaryButton: { label: "Department Labs" },
    backgroundImage:
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Utensils,
        bg: "bg-gradient-to-br from-orange-500 to-amber-600",
        subtitle: "Food Science & Processing",
        description: "Innovative processing technologies, food preservation, and value addition to agricultural products",
      },
      {
        icon: ShieldCheck,
        bg: "bg-gradient-to-br from-emerald-500 to-teal-600",
        subtitle: "Quality & Safety",
        description: "Food safety protocols, analytical evaluation, FSSAI compliance, and microbial quality control",
      },
      {
        icon: Activity,
        bg: "bg-gradient-to-br from-purple-500 to-indigo-600",
        subtitle: "Research & Innovation",
        description: "Hands-on laboratory training, industry-focused research, and product development",
      },
    ],
  },
  hodProps: {
    title: "HoD's Message",
    image: "https://faculty.gbu.ac.in/../uploads/photos/67c69ca1267bf_Nitin Pic.jpeg",
    name: "Dr. Nitin Sonkar",
    designation: "Head of Department",
    messageParagraphs: [
      "The Department of Food Processing and Technology is dedicated to delivering high-quality education and practical expertise in food technology. The department offers undergraduate, postgraduate, and doctoral programmes. Our goal is to equip students with a comprehensive understanding of various aspects of food technology, transforming them into world-class scientists and entrepreneurs who can make meaningful contributions to the food industry, scientific community and society. The department emphasises both theoretical knowledge and practical training through laboratory work, projects and industry exposure. Our faculty members are committed to supporting students’ academic growth and career development.",
      "I wish success to our students in their studies and future careers and invite our future students to join the department for a successful and impactful career in the field of food technology.",
    ],
    contact: {
      name: "Dr. Nitin Sonkar",
      designation: "Head of Department - Food Processing & Technology",
      email: "nitin.sonkar@gbu.ac.in",
      phone: "0120-2344341",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "“From Farm to Fork: Innovating Food for a Safer and Sustainable Tomorrow.”",
    description:
      "The Department of Food Processing and Technology at Gautam Buddha University was established under the School of Vocational Studies and Applied Sciences (SoVSAS) with the objective of advancing education, research and innovation in food science, food processing, and value addition to agricultural products. Since its establishment, the department has consistently focused on preparing competent professionals and researchers who can address emerging issues related to food quality, safety, nutrition, and sustainability. The department is strengthened by a team of qualified and committed faculty members specializing in various domains of food technology.\n\nThe department is equipped with modern laboratories and advanced processing facilities that provide an enabling environment for academic learning, research activities, product development, and industry-focused training. The available infrastructure supports hands-on experience, analytical evaluation, and innovative work across multiple areas of food technology.\n\nA variety of academic programmes are offered to provide students with a strong blend of theoretical understanding and practical expertise. These include B.Tech. in Food Technology, M.Tech. in Food Technology, M.Sc. in Food Science and Technology, and Ph.D. in Food Technology. The B.Tech. programme lays the groundwork in food processing, engineering concepts, and food safety, while the M.Sc. and M.Tech. programmes focus on advanced studies, research, and technological applications. The Ph.D. programme is designed to develop research scholars capable of contributing to academia, research institutions, and the food industry.\n\nBeyond academics, the department conducts seminars, workshops, industrial visits, and training sessions to enhance students’ skills and professional development. Students are actively encouraged to engage in research projects, internships, and collaborations with industry and research organizations, providing them with valuable practical exposure.\n\nWith its interdisciplinary outlook, robust academic structure and emphasis on innovation and sustainability, the department continues to grow as a vibrant hub for education, research and technological progress in the field of food processing.",
    vision:
      "To be a vibrant hub for education, research, and technological progress in food processing, producing competent professionals and entrepreneurs for a safer, sustainable tomorrow.",
    missionPoints: [
      "Deliver high-quality education and practical expertise in food science, processing, and safety",
      "Conduct cutting-edge research on food quality, nutrition, shelf-life extension, and green processing",
      "Provide state-of-the-art laboratory and pilot plant infrastructure for experiential learning",
      "Foster strong industry collaborations, internships, and entrepreneurial ventures in food tech",
    ],
  },
  programsData: [
    {
      id: "btech-fpt",
      title: "B.Tech. (Food Processing and Technology)",
      level: "Undergraduate",
      duration: "4 Years (8 Semesters)",
      intake: "30 Seats",
      description:
        "Lays foundational concepts in food processing, engineering principles, food preservation, thermal technology, and food safety standards.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-amber-600",
      highlights: [
        "30 Student Intake",
        "4 Years (8 Semesters)",
        "Food Engineering & Preservation",
        "FSSAI Quality & Safety Standards",
      ],
      syllabus: [],
    },
    {
      id: "mtech-fpt",
      title: "M.Tech. (Food Processing and Technology)",
      level: "Postgraduate",
      duration: "2 Years (4 Semesters)",
      intake: "15 Seats",
      description:
        "Advanced post-graduate program emphasizing food process modeling, novel packaging, bioprocess engineering, and technological applications.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=400&q=80",
      gradient: "from-amber-600 to-orange-700",
      highlights: [
        "15 Student Intake",
        "2 Years (4 Semesters)",
        "Advanced Process Engineering",
        "Master Research Thesis",
      ],
      syllabus: [],
    },
    {
      id: "msc-fst",
      title: "M.Sc. (Food Science & Technology)",
      level: "Postgraduate",
      duration: "2 Years (4 Semesters)",
      intake: "20 Seats",
      description:
        "Focuses on food chemistry, food microbiology, sensory evaluation, analytical testing, and novel product formulation.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-600 to-teal-700",
      highlights: [
        "20 Student Intake",
        "2 Years (4 Semesters)",
        "Food Chemistry & Microbiology",
        "Laboratory Testing & Research",
      ],
      syllabus: [],
    },
    {
      id: "phd-fpt",
      title: "Ph.D. (Food Processing and Technology)",
      level: "Doctoral",
      duration: "As per UGC / University Norms",
      intake: "As per UGC / University Norms",
      description:
        "Doctoral research program developing independent research scholars capable of contributing to academia, research institutions, and global food industries.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      gradient: "from-purple-600 to-indigo-700",
      highlights: [
        "UGC & University Norms Intake",
        "Doctoral Coursework & Research",
        "Advanced Product Development",
        "Ph.D. Dissertation Defense",
      ],
      syllabus: [],
    },
  ],
};
