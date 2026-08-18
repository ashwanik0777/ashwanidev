/**
 * SOVS — Research Areas & Profile
 * School of Vocational Studies & Applied Sciences
 */
export const researchAreaData = {
  schoolCode: "SOVS",
  schoolName: "School of Vocational Studies & Applied Sciences",
  heading: "Research Areas — SOVS",
  subheading: "Explore the research focus areas of the School of Vocational Studies & Applied Sciences at Gautam Buddha University.",
  hero: {
    title: "Research Area and Profile",
    subtitle: "Our research ecosystem spans critical domains in computational mathematics, materials science, polymer chemistry, environmental remediation, and food preservation.",
  },
  stats: [
    { iconName: "BookOpen", color: "text-teal-600", number: "20+", label: "Active Research Projects" },
    { iconName: "Users", color: "text-emerald-600", number: 22, label: "Research Faculty" },
    { iconName: "Award", color: "text-blue-600", number: "150+", label: "Publications" },
    { iconName: "TrendingUp", color: "text-orange-600", number: "₹1.5Cr+", label: "Research Funding" },
  ],
  domains: [
    {
      iconName: "Binary",
      color: "text-indigo-600",
      bg: "from-indigo-50 to-purple-100",
      title: "Applied Mathematics & Scientific Computing",
      tagline: "Mathematical Modeling & Simulation",
      points: [
        { title: "Mathematical Biology & Epidemiology", desc: "Modeling infectious disease transmission dynamics and ecological systems" },
        { title: "Optimization & Operations Research", desc: "Scientific decision making, transportation models, and network design" },
        { title: "Numerical Analysis", desc: "Development of algorithms for differential and integral equations" },
      ],
      faculty: "Dr. Pratiksha Saxena, Dr. Rajesh Kumar Gupta, Dr. Amit K. Awasthi",
      projects: "5",
      funding: "₹25 Lakhs",
    },
    {
      iconName: "Zap",
      color: "text-amber-600",
      bg: "from-amber-50 to-orange-100",
      title: "Solid State & Thin Film Physics",
      tagline: "Semiconductor & Energy Materials",
      points: [
        { title: "Thin Film Solar Cells", desc: "Fabricating and analyzing high-efficiency photovoltaics" },
        { title: "Conducting Polymers", desc: "Developing nano-composite polymer electrolytes for battery applications" },
        { title: "Gas Sensing Devices", desc: "Designing semiconducting oxide thin films for environmental gas detection" },
      ],
      faculty: "Dr. Ashish Kumar, Dr. Vivek Kumar Shukla, Dr. Sudhisht Srivastava",
      projects: "4",
      funding: "₹35 Lakhs",
    },
    {
      iconName: "FlaskConical",
      color: "text-emerald-600",
      bg: "from-emerald-50 to-teal-100",
      title: "Green Polymer Chemistry",
      tagline: "Sustainable Materials & Remediation",
      points: [
        { title: "Biodegradable Polymers", desc: "Synthesis of eco-friendly polymers for packaging and biomedical uses" },
        { title: "Water Remediation", desc: "Developing polymer-based adsorbents for removing dyes and heavy metals from wastewater" },
        { title: "Coordination Chemistry", desc: "Green synthesis of metal organic frameworks (MOFs) and bio-active complexes" },
      ],
      faculty: "Prof. Anuradha Mishra, Dr. Jaya Maitra, Dr. Anita Kushwaha",
      projects: "5",
      funding: "₹35 Lakhs",
    },
    {
      iconName: "Globe",
      color: "text-green-600",
      bg: "from-green-50 to-emerald-100",
      title: "Environmental Geochemistry & Monitoring",
      tagline: "Sustainable Conservation & GIS",
      points: [
        { title: "Heavy Metal Remediation", desc: "Mapping groundwater quality and developing soil remediation techniques" },
        { title: "GIS & Climate Impact Modeling", desc: "Using remote sensing to evaluate climate adaptation strategies" },
        { title: "Environmental Impact Assessment (EIA)", desc: "Analyzing environmental footprint and ecological sustainability of industrial sites" },
      ],
      faculty: "Dr. Bhaswati Banerjee, Prof. Chander Kumar Singh, Dr. Abhishek Pandey Bharat",
      projects: "4",
      funding: "₹25 Lakhs",
    },
    {
      iconName: "Utensils",
      color: "text-orange-600",
      bg: "from-orange-50 to-amber-100",
      title: "Food Processing & Bio-processing Tech",
      tagline: "Food Safety & Novel Product Formulation",
      points: [
        { title: "Food Safety & Quality Testing", desc: "HPLC-based chemical and microbiological analysis of processed foods" },
        { title: "Novel Product Formulation", desc: "Developing millet-based functional foods and packaging films" },
        { title: "Thermal Food Preservation", desc: "Optimizing spray drying, freeze drying, and thermal extrusion processes" },
      ],
      faculty: "Dr. Mohd. Tashfeen Ashraf, Dr. Vinita Sharma, Dr. Vyakhaya",
      projects: "4",
      funding: "₹30 Lakhs",
    },
  ],
  funding: [
    { title: "DST-SERB", subtitle: "Department of Science and Technology, Govt of India", amount: "₹45 Lakhs", bg: "bg-teal-50", color: "text-teal-600" },
    { title: "UGC Projects", subtitle: "University Grants Commission, India", amount: "₹25 Lakhs", bg: "bg-blue-50", color: "text-blue-600" },
    { title: "CSIR Research Grants", subtitle: "Council of Scientific and Industrial Research", amount: "₹30 Lakhs", bg: "bg-indigo-50", color: "text-indigo-600" },
    { title: "MoFPI Funding", subtitle: "Ministry of Food Processing Industries, India", amount: "₹35 Lakhs", bg: "bg-orange-50", color: "text-orange-600" },
  ],
  collaborations: [
    { title: "National Physical Laboratory (NPL), New Delhi", desc: "Collaborative research on thin film solar cell characterization and standard reference materials.", border: "border-teal-500", extra: "Active since 2018" },
    { title: "CSIR-CFTRI, Mysore", desc: "Student internships and joint research on functional food development and packaging tests.", border: "border-blue-500", extra: "MoU signed in 2021" },
    { title: "IIT Delhi (Materials Science Department)", desc: "Collaborative research on polymer-nanocomposite materials and ion beam irradiation facilities.", border: "border-indigo-500", extra: "Active since 2019" },
    { title: "IUAC (Inter-University Accelerator Centre), New Delhi", desc: "Thin film modification and irradiation characterization for gas sensing applications.", border: "border-orange-500", extra: "Collaborative facility sharing" },
  ],
};
export const schoolCard = {
  imageUrl: "https://www.gbu.ac.in/Content/schools/img/banner/Artboard1sovsas.jpg",
  label: "School of Vocational Studies & Applied Sciences",
  description: "Fostering scientific innovation and vocational competence through advanced labs and research in mathematics, physics, chemistry, environmental science, and food technology.",
  path: "/schools/SOVS",
  features: ["Applied Sciences", "Food Technology", "Environmental Research", "Vocational Training"]
};
