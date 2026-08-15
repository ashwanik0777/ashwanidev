import { Utensils, ShieldCheck, Activity, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "food-processing-technology",
  heroProps: {
    title: "Department of Food Processing & Technology",
    highlight: "Food Processing",
    subtitle:
      "Engineering food safety, quality, and preservation — Leading academic training and research in food engineering, packaging, and bio-processing since 2012.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: Utensils,
        bg: "bg-gradient-to-br from-orange-500 to-orange-600",
        subtitle: "Food Engineering",
        description: "Food preservation engineering, process modeling, and machinery",
      },
      {
        icon: ShieldCheck,
        bg: "bg-gradient-to-br from-yellow-500 to-yellow-600",
        subtitle: "Quality & Safety",
        description: "Food analysis, FSSAI regulations, and microbial quality control",
      },
      {
        icon: Activity,
        bg: "bg-gradient-to-br from-red-500 to-red-600",
        subtitle: "Functional Foods",
        description: "Bio-active compound extraction, nutraceuticals, and novel products",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Food Processing & Technology",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Mohd. Tashfeen Ashraf",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Food Processing & Technology at the School of Vocational Studies & Applied Sciences, Gautam Buddha University. Food technology is a highly progressive field that ensures food security, quality, and nutrition from farm to fork.",
      "We offer B.Tech., M.Tech., B.Voc., and Ph.D. programs. The curriculum is interdisciplinary, covering food chemistry, microbiology, food packaging, thermal processing, dairy technology, and regulatory guidelines like FSSAI standards.",
      "Our students gain hands-on training in our pilot plant and testing laboratories, which feature modern instrumentation like HPLC, spray dryers, and texture analyzers. We place a strong emphasis on industrial internships to make students industry-ready.",
      "Explore our academic options and join us in shaping the future of food engineering.",
    ],
    contact: {
      name: "Dr. Mohd. Tashfeen Ashraf",
      designation: "Head of Department - Food Processing & Technology",
      email: "ashraf@gbu.ac.in",
      phone: "0120-234-4200",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Food Processing & Technology trains students in advanced food engineering, preservation, quality analysis, packaging, and entrepreneurship in the food sector.",
    stats: [
      { icon: Users, numberText: "150+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "6+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "4+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "35+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Pilot Plant Training",
        description:
          "Practical exposure in processing machinery including spray dryers, food dehydrators, packaging lines, and homogenizers.",
        dotColor: "#f97316",
      },
      {
        title: "Industrial Internships",
        description:
          "Mandatory 6-week industrial training in leading food companies like Nestle, Mother Dairy, Coca-Cola, and Haldirams.",
        dotColor: "#eab308",
      },
      {
        title: "FSSAI Standards Focus",
        description:
          "Curriculum covers food safety audit practices, HACCP principles, and FSSAI licensing and labeling regulations.",
        dotColor: "#ef4444",
      },
    ],
    vision:
      "To be a premier center for food engineering education and research, fostering novel food products and safety standards for the processing industry.",
    missionPoints: [
      "Provide high-quality technical education in food processing and bio-processing",
      "Perform research on food safety, functional foods, packaging, and shelf life extension",
      "Train students in processing machinery operation and quality control protocols",
      "Encourage entrepreneurship and food startup initiatives among students",
    ],
  },
  programsData: [
    {
      title: "B.Tech. Food Processing & Technology",
      duration: "4 Years",
      intake: "60 Students",
      description:
        "Four-year engineering degree covering food physics, chemical analysis, unit operations, dairy engineering, and regulatory standards.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-50 to-orange-100",
      highlights: [
        "Food Biochemistry & Nutrition",
        "Food Engineering Unit Operations",
        "Food Microbiology & Fermentation",
        "Beverage & Bakery Technology",
        "Dairy & Meat Processing Technology",
        "Quality Control & HACCP",
        "In-plant training",
        "B.Tech Project & Seminar",
      ],
      syllabusUrl: "/schools/food-processing-technology/B.Tech_FPT_CStr_May2023.pdf",
      syllabus: [],
    },
    {
      title: "B.Voc. Food Processing",
      duration: "3 Years",
      intake: "50 Students",
      description:
        "Skill-based undergraduate program aligned with NSQF guidelines, focused on food preservation, processing line operations, and packaging.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      gradient: "from-yellow-50 to-yellow-100",
      highlights: [
        "NSQF level certifications",
        "Food preservation techniques",
        "Grain & Pulses milling",
        "Packaging operations",
        "Entrepreneurship modules",
        "Multiple exit options (Diploma/B.Voc)",
        "Industrial project training",
      ],
      syllabus: [],
    },
    {
      title: "M.Tech. Food Processing & Technology",
      duration: "2 Years",
      intake: "18 Students",
      description:
        "Advanced postgraduate program specializing in food safety audit, novel product formulation, process optimization, and industrial automation.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-red-50 to-red-100",
      highlights: [
        "Advanced Food Engineering",
        "Novel Food Processing Technologies",
        "Bioprocess Engineering",
        "Food safety standards & auditing",
        "Advanced Food Packaging",
        "Industrial Internship",
        "Dissertation Research",
      ],
      syllabusUrl: "/schools/food-processing-technology/PhD_FPT_CS_21March24.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. Food Processing & Technology",
      duration: "3-5 Years",
      intake: "4 Students",
      description:
        "Doctoral research in functional foods, value-added products, packaging innovations, and waste valorization.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-orange-500 to-orange-600",
      highlights: [
        "Independent Research",
        "Functional Compound Extraction",
        "Research Methodology",
        "Lab automation studies",
        "High impact publication",
        "Thesis Defense",
      ],
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 6 dedicated faculty members with research expertise in food engineering, preservation, bio-active compounds, and dairy technology.",
    stats: [
      { icon: BookOpen, numberText: "35+", subtitle: "Research Papers", bg: "bg-orange-50", color: "text-orange-600" },
      { icon: Award, numberText: "2+", subtitle: "Completed Projects", bg: "bg-yellow-50", color: "text-yellow-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-red-50", color: "text-red-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "10+", subtitle: "Avg Experience", bg: "bg-rose-50", color: "text-rose-600" },
    ],
  },
  researchStats: [
    { numberText: "2+", subtitle: "Research Projects" },
    { numberText: "₹12L+", subtitle: "Research Funding" },
    { numberText: "35+", subtitle: "Publications" },
    { numberText: "4+", subtitle: "PhDs Awarded" },
  ],
  topAchievers: [
    {
      name: "Akash Singhal",
      year: "B.Tech 2023",
      achievement: "Placed as Quality Control Officer at Mother Dairy, Delhi",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
      skills: ["Quality Audit", "FSSAI standards", "Dairy Tech"],
    },
    {
      name: "Sneha Goel",
      year: "M.Tech 2024",
      achievement: "Secured CSIR Senior Research Fellowship (SRF) for PhD studies",
      image: "https://randomuser.me/api/portraits/women/56.jpg",
      skills: ["Functional Foods", "HPLC Analysis", "Process engineering"],
    },
  ],
  achievements: [
    {
      title: "FSSAI Sponsored Training Program",
      year: "2024",
      description: "Conducted a successful food safety training program for 100+ local food business operators.",
    },
    {
      title: "Product Launch at University Expo",
      year: "2023",
      description: "Students successfully formulated and launched a novel high-protein millet-based beverage at the GBU Tech Expo.",
    },
  ],
};
