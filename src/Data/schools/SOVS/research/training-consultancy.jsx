import { Briefcase, Users, Award, Building, TrendingUp } from "lucide-react";

export const trainingConsultancyData = {
  schoolCode: "SOVS",
  schoolName: "School of Vocational Studies & Applied Sciences",
  hero: {
    title: "Training & Consultancy — School of Vocational Studies & Applied Sciences",
    subtitle:
      "Bridging the gap between scientific theory and industrial application through professional development courses, technical testing services, and industrial consultancy.",
  },
  stats: [
    { Icon: Users, number: "1500+", label: "Professionals Trained", color: "text-teal-600" },
    { Icon: Building, number: "30+", label: "Corporate Partners", color: "text-blue-600" },
    { Icon: Award, number: "25+", label: "Training Programs", color: "text-purple-600" },
    { Icon: TrendingUp, number: "96%", label: "Satisfaction Rate", color: "text-orange-600" },
  ],
  trainingPrograms: [
    {
      bg: "from-blue-50 to-indigo-100",
      icon: "Briefcase",
      iconColor: "text-blue-600",
      title: "Technical & Science Skill Training",
      subtitle: "Professional Workshops & FDPs",
      items: [
        {
          title: "Materials Characterization & Spectroscopy",
          desc: "Hands-on training in thin film deposition, spectrophotometry, and thermal analyzers",
          detail1: "Duration: 3 days",
          detail2: "Participants: 25",
        },
        {
          title: "Mathematical Modeling in Scientific Computing",
          desc: "FDP on using MATLAB, Python, and R for differential modeling and data sciences",
          detail1: "Duration: 5 days",
          detail2: "Participants: 35",
        },
        {
          title: "Water Quality Testing & Geochemical Mapping",
          desc: "Training on heavy metal detection, atomic adsorption spectroscopy, and water quality protocols",
          detail1: "Duration: 4 days",
          detail2: "Participants: 30",
        },
      ],
      footer: {
        bg: "bg-blue-100",
        textColor: "text-blue-800",
        textColor2: "text-blue-600",
        label: "Corporate Registration:",
        value: "Contact SOVS office for schedules",
        note: "Laboratory certification provided upon completion",
      },
    },
    {
      bg: "from-green-50 to-emerald-100",
      icon: "Users",
      iconColor: "text-green-600",
      title: "Vocational & Industrial Safety Training",
      subtitle: "Industrial Skill Enhancement",
      items: [
        {
          title: "Food Safety Standards & Quality Auditing",
          desc: "FSSAI standards compliance training, HACCP implementations, and sanitary audits",
          detail1: "Duration: 5 days",
          detail2: "Participants: 40",
        },
        {
          title: "Industrial Safety & Waste Management",
          desc: "FDP on handling hazardous chemicals, e-waste, and solid waste processing",
          detail1: "Duration: 3 days",
          detail2: "Participants: 30",
        },
      ],
      footer: {
        bg: "bg-green-100",
        textColor: "text-green-800",
        textColor2: "text-green-600",
        label: "Registration Fee:",
        value: "₹4,000 - ₹10,000",
        note: "Discount available for GBU students & research scholars",
      },
    },
  ],
  technicalConsultancy: [
    {
      title: "Materials & Thin Film Testing",
      desc: "Comprehensive fabrication and characterization of nanostructured materials",
      border: "border-amber-600",
      points: [
        "Thin film vacuum deposition services",
        "UV-Vis spectroscopic optical analysis",
        "Polymer matrix composite testing",
        "Conducting polymer electrochemical studies",
      ],
    },
    {
      title: "Water Quality & Environmental Audit",
      desc: "Analytical monitoring and impact assessment for government and private sites",
      border: "border-green-600",
      points: [
        "Groundwater chemical analysis (Arsenic, Fluoride)",
        "Air and soil quality monitoring",
        "Environmental Impact Assessment (EIA) support",
        "GIS mapping & landscape ecological studies",
      ],
    },
    {
      title: "Food Safety & Quality Compliance",
      desc: "HPLC-based chemical profiling and preservation tests",
      border: "border-orange-600",
      points: [
        "Nutrient profiling and shelf-life analysis",
        "Spray dryer & food packaging testing",
        "FSSAI license guidance and compliance audits",
        "Functional food ingredient stability tests",
      ],
    },
  ],
  businessConsultancy: [
    {
      title: "Industrial Waste Recycling",
      desc: "Consultancy on setting up eco-friendly solid waste recycling systems",
      border: "border-teal-600",
      points: [
        "Composting and organic waste valorization",
        "Heavy metal soil filtration columns design",
        "E-waste recycling and hazard assessment",
      ],
    },
    {
      title: "Food Processing Line Optimization",
      desc: "Techno-economic feasibility and machinery selection guidance for food startups",
      border: "border-red-600",
      points: [
        "Processing parameters optimization",
        "Thermal extrusion and packaging line setup",
        "Millet-based product manufacturing guidance",
      ],
    },
  ],
  successStories: [
    {
      from: "from-green-50 to-emerald-100",
      iconColor: "text-green-600",
      quote: `"The groundwater quality mapping and remediation consultancy provided by GBU's Environmental Sciences team helped us optimize municipal filtration setups across Noida regions."`,
      client: "GNIDA (Greater Noida Industrial Development Authority)",
      fields: [
        { label: "Service", value: "Water Quality Mapping & Audit" },
        { label: "Scale", value: "Regional rural districts" },
        { label: "Impact", value: "Remediated heavy metals in 12 sectors" },
      ],
    },
    {
      from: "from-orange-50 to-amber-100",
      iconColor: "text-orange-600",
      quote: `"The Food Processing department helped us optimize our spray-drying parameters for milk powders, resulting in a 15% reduction in processing energy consumption."`,
      client: "Mother Dairy",
      fields: [
        { label: "Service", value: "Process Line Optimization" },
        { label: "Scope", value: "Industrial Spray Dryer Operations" },
        { label: "Impact", value: "Improved powder solubility & energy efficiency" },
      ],
    },
  ],
};
