import { Briefcase, Users, Award, Building, TrendingUp, CheckCircle } from "lucide-react";

export const trainingConsultancyData = {
  schoolCode: "SOM",
  schoolName: "School of Management",
  hero: {
    title: "Training & Consultancy — School of Management",
    subtitle:
      "The School of Management at Gautam Buddha University offers comprehensive training programs, faculty development initiatives, management development programs (MDPs), and consultancy services to bridge the gap between academia and industry.",
  },
  stats: [
    { Icon: Users, number: "2000+", label: "Professionals Trained", color: "text-green-600" },
    { Icon: Building, number: "50+", label: "Corporate Partners", color: "text-blue-600" },
    { Icon: Award, number: "40+", label: "Training Programs", color: "text-purple-600" },
    { Icon: TrendingUp, number: "95%", label: "Satisfaction Rate", color: "text-orange-600" },
  ],
  trainingPrograms: [
    {
      bg: "from-blue-50 to-indigo-100",
      icon: "Briefcase",
      iconColor: "text-blue-600",
      title: "Management Development Programs (MDPs)",
      subtitle: "Executive & Corporate Training",
      items: [
        {
          title: "Leadership & Strategic Management",
          desc: "Comprehensive leadership training for mid-senior level managers",
          detail1: "Duration: 5 days",
          detail2: "Mode: On-campus/Online",
        },
        {
          title: "Business Analytics & Data-Driven Decision Making",
          desc: "Training on Python, SPSS, predictive analytics and business intelligence tools",
          detail1: "Duration: 3 days",
          detail2: "Mode: Hybrid",
        },
        {
          title: "Financial Planning & Investment Management",
          desc: "Portfolio management, financial modeling, and capital market operations",
          detail1: "Duration: 4 days",
          detail2: "Mode: On-campus",
        },
      ],
      footer: {
        bg: "bg-blue-100",
        textColor: "text-blue-800",
        textColor2: "text-blue-600",
        label: "Registration:",
        value: "Contact CRC for corporate pricing",
        note: "Group discounts available for batch enrollment",
      },
    },
    {
      bg: "from-green-50 to-emerald-100",
      icon: "Users",
      iconColor: "text-green-600",
      title: "Faculty Development Programs (FDPs)",
      subtitle: "Academic Excellence Initiatives",
      items: [
        {
          title: "ICSSR Sponsored AI-based Research Methodology",
          desc: "10-day course on integration of AI in research for management scholars",
          detail1: "Duration: 10 days",
          detail2: "Participants: 40",
        },
        {
          title: "Case-Based Teaching Methodology Workshop",
          desc: "Training on case writing, case analysis, and classroom case teaching",
          detail1: "Duration: 5 days",
          detail2: "Participants: 30",
        },
        {
          title: "Advanced Quantitative Research Methods",
          desc: "SEM, Factor Analysis, Regression, and SPSS/AMOS applications",
          detail1: "Duration: 3 days",
          detail2: "Participants: 25",
        },
      ],
      footer: {
        bg: "bg-green-100",
        textColor: "text-green-800",
        textColor2: "text-green-600",
        label: "Registration Fee:",
        value: "₹3,000 - ₹8,000",
        note: "Accommodation available on GBU campus",
      },
    },
    {
      bg: "from-purple-50 to-pink-100",
      icon: "Award",
      iconColor: "text-purple-600",
      title: "Student Enhancement Programs",
      subtitle: "Career Readiness & Placement Training",
      items: [
        {
          title: "Pre-Placement Training (PPT)",
          desc: "Resume building, group discussion, mock interviews, and soft skills",
          detail1: "Duration: 4 weeks",
          detail2: "Batch Size: 80",
        },
        {
          title: "Entrepreneurship Awareness Camp",
          desc: "Business planning, startup ecosystem, and innovation management",
          detail1: "Duration: 1 week",
          detail2: "Batch Size: 50",
        },
        {
          title: "Investor Awareness & Financial Literacy",
          desc: "Capital markets, responsible investing, and SEBI regulations",
          detail1: "Duration: 2 days",
          detail2: "Batch Size: 100",
        },
      ],
      footer: {
        bg: "bg-purple-100",
        textColor: "text-purple-800",
        textColor2: "text-purple-600",
        label: "Note:",
        value: "Free for SOM students",
        note: "External participants: ₹1,000 - ₹5,000",
      },
    },
  ],
  technicalConsultancy: [
    {
      title: "Business Analytics Consultancy",
      desc: "Data-driven solutions for business intelligence and decision support",
      border: "border-blue-600",
      points: [
        "Predictive Analytics & Forecasting",
        "Customer Segmentation & Profiling",
        "Market Research & Competitive Analysis",
        "Business Process Optimization",
      ],
    },
    {
      title: "Financial Advisory & Valuation",
      desc: "Corporate finance advisory, valuation, and financial restructuring",
      border: "border-green-600",
      points: [
        "Corporate Valuation & Restructuring",
        "Financial Modeling & Projection",
        "Risk Assessment & Management",
        "Tax Planning & Advisory",
      ],
    },
    {
      title: "HR Consulting & OD Interventions",
      desc: "Organizational development, HR audits, and workforce transformation",
      border: "border-purple-600",
      points: [
        "Competency Mapping & Assessment",
        "Performance Management System Design",
        "Organizational Change Management",
        "Training Needs Analysis (TNA)",
      ],
    },
  ],
  businessConsultancy: [
    {
      title: "Marketing Strategy & Brand Consulting",
      desc: "Brand building, market entry strategy, and digital marketing frameworks",
      border: "border-orange-600",
      points: [
        "Brand Positioning & Strategy",
        "Digital Marketing Audit",
        "Consumer Behavior Research",
        "Go-to-Market Strategy",
      ],
    },
    {
      title: "Operations & Supply Chain Advisory",
      desc: "Process optimization, lean management, and supply chain excellence",
      border: "border-red-600",
      points: [
        "Lean & Six Sigma Implementation",
        "Supply Chain Optimization",
        "Quality Management Systems",
        "Process Re-engineering",
      ],
    },
    {
      title: "Entrepreneurship & Startup Advisory",
      desc: "Business model design, funding strategy, and incubation support",
      border: "border-teal-600",
      points: [
        "Business Plan Development",
        "Funding & Investor Readiness",
        "Startup Incubation Support",
        "Social Entrepreneurship Design",
      ],
    },
  ],
  successStories: [
    {
      from: "from-blue-50 to-indigo-100",
      iconColor: "text-blue-600",
      quote:
        "\"The Management Development Program by SOM-GBU helped our middle management team develop strategic thinking and leadership capabilities that directly impacted our business growth.\"",
      details: {
        client: "Adani Group",
        fields: [
          { label: "Program", value: "Leadership & Strategic Management MDP" },
          { label: "Participants", value: "45 managers" },
          { label: "Duration", value: "5 days" },
        ],
      },
    },
    {
      from: "from-green-50 to-emerald-100",
      iconColor: "text-green-600",
      quote:
        "\"The ICSSR-sponsored research methodology course at GBU's School of Management was instrumental in training our faculty on AI-driven research tools and modern methodologies.\"",
      details: {
        client: "ICSSR-FDP Participants",
        fields: [
          { label: "Program", value: "AI-based Research Methodology" },
          { label: "Participants", value: "40 scholars & faculty" },
          { label: "Duration", value: "10 days" },
        ],
      },
    },
    {
      from: "from-purple-50 to-pink-100",
      iconColor: "text-purple-600",
      quote:
        "\"The pre-placement training and investor awareness programs by SOM helped our MBA students secure placements at top financial firms and develop a strong understanding of capital markets.\"",
      details: {
        client: "SOM Alumni Network",
        fields: [
          { label: "Programs", value: "PPT + Investor Awareness" },
          { label: "Beneficiaries", value: "200+ MBA students" },
          { label: "Placement Rate", value: "75%" },
        ],
      },
    },
  ],
};
