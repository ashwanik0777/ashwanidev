import RaemImage from "../../../../assets/Raem.png";
import RaemWorkshopImage from "../../../../assets/raem_workshop.jpg";
import fnarea1 from "../../../../assets/fnarea1.png";
import fnarea2 from "../../../../assets/fnarea2.png";
import fnarea3 from "../../../../assets/fnarea3.png";
import fnarea4 from "../../../../assets/fnarea4.png";

export const coeRaemData = {
  schoolCode: "SOICT",
  schoolName: "School of Information & Communication Technology",
  hero: {
    title: "Center for Rapid and Alternative Energy Mobility",
    subtitle: "Leading the Future of Rapid and Alternative Energy Mobility",
    bgTheme: 8,
  },
  about: {
    visionText: [
      "To be a national leader in research, innovation, and capacity-building for sustainable, rapid, and alternative energy mobility systems.",
      "RAEM aspires to create a robust ecosystem that bridges academia, industry, and government to advance railways, metro systems, hydrogen mobility, and renewable energy technologies.",
    ],
    missionPoints: [
      "Conduct research & develop solutions in railway signaling, telecom, and RAMS",
      "Undertake collaborative and contract research with Indian Railways and industry",
      "Offer specialized Diploma, Certificate, and M.Tech. programs",
      "Provide hands-on training and internships in rapid and alternative energy mobility",
      "Promote sustainable, innovative transport solutions for India’s future",
    ],
    sections: [
      {
        heading: "Our Story",
        text: "The Centre for Rapid and Alternative Energy Mobility (RAEM) is an initiative of Gautam Buddha University dedicated to advancing education, research, and innovation in rapid mobility systems, metro rail engineering, and alternative energy transportation such as hydrogen-powered vehicles and maglev trains.",
      },
      {
        heading: "What We Do",
        text: "RAEM offers specialized Diploma, Certificate, and M.Tech programs in Railway Signaling, Telecom, and RAMS. The Centre undertakes collaborative and contract research, provides training workshops, and develops indigenous solutions for the challenges faced by India's growing transportation sector.",
      },
      {
        heading: "Our Commitment",
        text: "We are committed to empowering the next generation of engineers, technologists, and innovators through industry-driven education, advanced R&D infrastructure, and meaningful partnerships with Indian Railways, NMRC, and DMRC.",
      },
    ],
    photos: [RaemImage, RaemWorkshopImage],
  },
  functionalAreas: [
    {
      title: "Signal, Telecom and RAMS",
      description:
        "Specialized focus on Railway Signaling, Telecom & Optical Fiber Technology, and RAMS to enhance safety, reliability, and efficiency in railway operations.",
      image: fnarea1,
    },
    {
      title: "Education & Training Programs",
      description:
        "Short-term courses, Certificate Programs, One-Year Diploma, and Two-Year M.Tech in Railway Signaling, Telecom, and RAMS to develop skilled professionals.",
      image: fnarea2,
    },
    {
      title: "Research and Development in Mobility",
      description:
        "Product development, lab establishment for ERTMS Level 1 & 2, and advanced R&D in traffic signaling, rolling stock, and reliability solutions.",
      image: fnarea3,
    },
    {
      title: "Alternative Energy Solutions",
      description:
        "Exploring hydrogen-powered vehicles, solar energy, and other renewable techniques to promote sustainable transportation systems.",
      image: fnarea4,
    },
    {
      title: "Maintenance & Optimization",
      description:
        "Forecasting reliability, managing inventory, preventive and corrective maintenance, and developing optimization solutions for smooth operations.",
      image:
        "https://img.freepik.com/premium-photo/smart-grid-optimization-renewable-energy_1022456-162721.jpg",
    },
  ],
  courses: [
    {
      title: "Maintenance Engineering (ME)",
      duration: "3 Months (Cert.) / 6 Months (Diploma)",
      description:
        "Establishes operational foundations, lifecycles, LCC, CM/PM/CBM/RCM/TPM strategies, smart sensor monitoring, NDT testing, IIoT, and CMMS integration.",
      eligibility:
        "B.Tech/B.E with 2 yrs experience OR Engineering Diploma with 3 yrs work experience.",
      highlights: [
        "Modern Maintenance & Reliability Concepts",
        "CM, PM, CBM, RCM, and TPM Strategies",
        "Destructive & NDT State Monitoring (Ultrasonic, Radiographic, Eddy Current)",
        "Smart & Wireless Sensors for IIoT & AI/ML",
        "LCC & Life Cycle Costing Methodologies",
        "CMMS Software & Railway/Wind Industrial Case Studies",
      ],
      gradient: "from-blue-600 to-indigo-600",
      bgImage:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop",
      syllabusLinks: [
        { label: "Maintenance Fundamental", url: "https://drive.google.com/file/d/1g9g9Vfpg-mFCcqvVz_up48KN9yThTKAp/view?usp=drive_web" },
        { label: "RAEM Brochure", url: "https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web" },
      ],
    },
    {
      title: "Prognostics & Health Management (PHM)",
      duration: "3 Months (Basic) / 6 Months (Advanced)",
      description:
        "Predictive and data-driven paradigms using physics-of-failure modeling, Kalman/Particle filtering, ML/Deep Learning (CNN, LSTM), digital twins, and RUL estimation.",
      eligibility:
        "B.Tech/B.E with 2 yrs experience OR Engineering Diploma with 3 yrs work experience.",
      highlights: [
        "PHM Pipeline Mapped to ISO 13374 Standard",
        "Edge vs. Cloud IoT Data Acquisition & Cleansing",
        "Physics-of-Failure & Filtering (Kalman & Particle Filters)",
        "Machine Learning (CNN, LSTM, PCA, Auto-Encoders)",
        "RUL (Remaining Useful Life) & Hazard Rate Estimation",
        "Digital Twins, Cybersecurity & Aerospace/Railway Labs",
      ],
      gradient: "from-purple-600 to-indigo-600",
      bgImage:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
      syllabusLinks: [
        { label: "PHM Basic", url: "https://drive.google.com/file/d/1NR_KYgVojPetRq0ArkT5f5JEpdaucGcN/view?usp=drive_web" },
        { label: "RAEM Brochure", url: "https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web" },
      ],
    },
    {
      title: "Reliability, Availability, Maintainability & Safety (RAMS)",
      duration: "3 Months / 6 Months / 2 Years (M.Tech)",
      description:
        "Advanced mathematical & probabilistic backbone focusing on multi-state system models, stress-strength interference, testing (ALT/HALT/HASS), FTA, and industry SIL standards.",
      eligibility:
        "B.Tech/B.E/M.S. with 2 yrs experience OR Diploma with 3 yrs work experience.",
      highlights: [
        "Advanced System Reliability & Standby Modeling",
        "Stress-Strength Interference & Failure Physics",
        "Maintainability & Availability Markov Models",
        "Fault Tree Analysis (FTA) & Birnbaum Algorithms",
        "Accelerated Life Testing (ALT, HALT & HASS)",
        "Global RAMS Standards (MIL, IEC, CENELEC, SIL)",
      ],
      gradient: "from-emerald-600 to-teal-600",
      bgImage:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop",
      syllabusLinks: [
        { label: "RAMS Advanced", url: "https://drive.google.com/file/d/1TivVp4qHz1M574ccZKlfAlK-YdZCWbwx/view?usp=drive_web" },
        { label: "RAMS Fundamental", url: "https://drive.google.com/file/d/1U6Nnze6J1lJs4phPoqwbeV731XZoBpqx/view?usp=drive_web" },
        { label: "RAEM Brochure", url: "https://drive.google.com/file/d/1ddggOgPemgdsUirUIKNCS7N3JV8OIfJF/view?usp=drive_web" },
      ],
    },
  ],
  events: [
    {
      id: 1,
      title: "DMRC Visit",
      date: "2024-09-10",
      category: "Workshop",
      images: [
        {
          url: "http://raem.gbu.ac.in/images/demo/gallery/square/IMG_20190423_134947.jpg",
          caption: "Group Photo",
        },
        {
          url: "http://raem.gbu.ac.in/images/demo/gallery/v_long/20190423_132338.jpg",
          caption: "Discussion during visit",
        },
        {
          url: "http://raem.gbu.ac.in/images/demo/gallery/long/samsung%20pics%20dec%202019%20197.jpg",
          caption: "Hands-on demonstration",
        },
        {
          url: "http://raem.gbu.ac.in/images/demo/gallery/square/nmrc1.jpg",
          caption: "Interactive session",
        },
      ],
    },
  ],
};
export const coeiraemData = {
  schoolCode: "SOICT",
  schoolName: "School of Information & Communication Technology",
  heading: "coeiraem — SOICT",
  content: [],
};
