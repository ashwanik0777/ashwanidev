import { FlaskConical, Atom, Droplets, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
  schoolCode: "SOVS",
  departmentId: "applied-chemistry",
  heroProps: {
    title: "Department of Applied Chemistry",
    highlight: "Applied Chemistry",
    subtitle:
      "Synthesizing molecular innovations and industrial technology — Excellence in polymer technology, green chemistry, and materials synthesis since 2012.",
    primaryButton: { label: "Explore Programs" },
    secondaryButton: { label: "Research Areas" },
    backgroundImage:
      "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=1920&q=80",
    features: [
      {
        icon: FlaskConical,
        bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
        subtitle: "Industrial Chemistry",
        description: "Polymer materials, chemical engineering, and organic synthesis",
      },
      {
        icon: Atom,
        bg: "bg-gradient-to-br from-teal-500 to-teal-600",
        subtitle: "Green Chemistry",
        description: "Eco-friendly catalysts, chemical safety, and sustainable synthesis",
      },
      {
        icon: Droplets,
        bg: "bg-gradient-to-br from-blue-500 to-blue-600",
        subtitle: "Water Remediation",
        description: "Adsorption techniques, water purification, and environmental materials",
      },
    ],
  },
  hodProps: {
    title: "From the Desk of HOD, Applied Chemistry",
    image: "https://faculty.gbu.ac.in/uploads/photos/comingsoonimg.jpg",
    name: "Dr. Jaya Maitra",
    designation: "Head of Department",
    messageParagraphs: [
      "Greetings!",
      "Welcome to the Department of Applied Chemistry at the School of Vocational Studies & Applied Sciences, Gautam Buddha University. Chemistry is the central science, connecting physics with biology and engineering, and our focus is on making it highly practical.",
      "We offer B.Sc. (Hons) Chemistry, M.Sc. in Applied Chemistry, and Ph.D. programs. Our curriculum combines fundamental topics like organic, inorganic, and physical chemistry with applied subjects such as polymer technology, analytical methods, green chemistry, and materials science.",
      "Our faculty members are actively engaged in research supported by agencies like CSIR, DST, and UGC, focusing on heavy metal remediation, biodegradable polymers, and inorganic synthesis. Our laboratories are equipped with modern analytical instruments.",
      "We invite you to explore our academic programs and join our research endeavors.",
    ],
    contact: {
      name: "Dr. Jaya Maitra",
      designation: "Head of Department - Applied Chemistry",
      email: "jayamaitra@gbu.ac.in",
      phone: "0120-234-4345",
    },
  },
  aboutProps: {
    heading: "About the Department",
    subheading:
      "The Department of Applied Chemistry focuses on developing a strong base in chemical principles while training students in polymer chemistry, environmental safety, and advanced analytical instrumentation.",
    stats: [
      { icon: Users, numberText: "100+", title: "Students", subtitle: "Enrolled" },
      { icon: BookOpen, numberText: "5+", title: "Faculty", subtitle: "Members" },
      { icon: Award, numberText: "6+", title: "Research Projects", subtitle: "Completed" },
      { icon: Lightbulb, numberText: "60+", title: "Publications", subtitle: "Research Papers" },
    ],
    highlights: [
      {
        title: "Advanced Instruments",
        description:
          "Practical training in analytical chemistry instrumentation including UV-Vis spectrophotometers, chromatography units, and thermal analyzers.",
        dotColor: "#10b981",
      },
      {
        title: "Polymer & Green Chemistry",
        description:
          "Specialized elective tracks and research focus in biodegradable plastics, polymeric biomaterials, and waste water treatment.",
        dotColor: "#14b8a6",
      },
      {
        title: "Industrial & Lab Training",
        description:
          "Summer training and final year dissertation research in university labs or partner CSIR laboratories to prepare students for pharma and polymer industries.",
        dotColor: "#3b82f6",
      },
    ],
    vision:
      "To be a distinguished center of chemical education and research, fostering polymer innovations and eco-friendly chemical technologies for industrial growth.",
    missionPoints: [
      "Provide comprehensive education in chemical science with strong practical training",
      "Conduct advanced research in polymer chemistry, green catalysis, and water treatment",
      "Train students in analytical instrumentation and industrial chemical processes",
      "Promote environmental safety and green technology principles",
    ],
  },
  programsData: [
    {
      title: "B.Sc. (Hons.) Chemistry",
      duration: "3 Years",
      intake: "40 Students",
      description:
        "Undergraduate honors program in chemistry covering organic, inorganic, physical, analytical, and industrial chemistry with extensive lab practice.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&w=400&q=80",
      gradient: "from-emerald-500 to-emerald-600",
      highlights: [
        "Organic Synthesis",
        "Inorganic & Coordination Chemistry",
        "Physical Chemistry & Thermodynamics",
        "Analytical Chemistry Methods",
        "Industrial Chemistry Lab",
        "Polymer Chemistry basics",
        "Laboratory Safety Training",
      ],
      syllabusUrl: "/schools/applied-chemistry/B.Sc_Hons._Chem_June2023.pdf",
    syllabus: [],
    },
    {
      title: "M.Sc. Applied Chemistry",
      duration: "2 Years",
      intake: "30 Students",
      description:
        "Postgraduate program specializing in materials chemistry, green synthesis, polymer chemistry, separation techniques, and instrumental analysis.",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80",
      gradient: "from-teal-500 to-teal-600",
      highlights: [
        "Advanced Polymer Chemistry",
        "Green Chemistry & Catalysis",
        "Spectroscopic Identification Methods",
        "Electrochemistry & Corrosion",
        "Environmental Chemistry",
        "Instrumental Analysis Lab",
        "Dissertation Research",
      ],
      syllabusUrl: "/schools/applied-chemistry/M.Sc_Chemistry_Syllabus_June2023.pdf",
      syllabus: [],
    },
    {
      title: "Ph.D. Applied Chemistry",
      duration: "3-5 Years",
      intake: "4 Students",
      description:
        "Doctoral research in polymeric materials, waste remediation, coordination chemistry, natural products, and green synthesis technologies.",
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80",
      gradient: "from-blue-500 to-blue-600",
      highlights: [
        "Independent Materials Research",
        "Advanced Catalysis Research",
        "Research Methodology & Ethics",
        "CSIR/UGC Project fellowships",
        "Scientific Writing & Patents",
        "Thesis Submission & Defense",
      ],
      syllabus: [],
    },
  ],
  facultyStats: {
    text: "Our department has 5 dedicated faculty members specializing in polymer technology, inorganic synthesis, environmental chemistry, and green technologies.",
    stats: [
      { icon: BookOpen, numberText: "60+", subtitle: "Research Papers", bg: "bg-emerald-50", color: "text-emerald-600" },
      { icon: Award, numberText: "3+", subtitle: "Completed Projects", bg: "bg-teal-50", color: "text-teal-600" },
      { icon: GraduationCap, custom: "PhD", numberText: "100%", subtitle: "PhD Faculty", bg: "bg-blue-50", color: "text-blue-600" },
      { icon: GraduationCap, custom: "Exp", numberText: "15+", subtitle: "Avg Experience", bg: "bg-amber-50", color: "text-amber-600" },
    ],
  },
  researchStats: [
    { numberText: "3+", subtitle: "Research Projects" },
    { numberText: "₹25L+", subtitle: "Research Funding" },
    { numberText: "60+", subtitle: "Publications" },
    { numberText: "12+", subtitle: "PhDs Awarded" },
  ],
  topAchievers: [
    {
      name: "Ritu Singhal",
      year: "M.Sc 2023",
      achievement: "Placed as Research Associate at Jubilant Biosys, Noida",
      image: "https://randomuser.me/api/portraits/women/49.jpg",
      skills: ["Organic Synthesis", "HPLC", "Spectroscopy"],
    },
    {
      name: "Vikas Nagar",
      year: "B.Sc 2024",
      achievement: "Accepted for PG studies at Indian Institute of Science (IISc), Bangalore",
      image: "https://randomuser.me/api/portraits/men/50.jpg",
      skills: ["Physical Chemistry", "Polymer Chemistry", "Lab safety"],
    },
  ],
  achievements: [
    {
      title: "UGC-DAE Funded Research Project",
      year: "2024",
      description: "Received a major research project for structural studies on polymer nanocomposites.",
    },
    {
      title: "Patents in Waste Remediation",
      year: "2023",
      description: "Faculty filed a patent for a novel low-cost polymer adsorbent for dye removal from textile wastewater.",
    },
  ],
};
