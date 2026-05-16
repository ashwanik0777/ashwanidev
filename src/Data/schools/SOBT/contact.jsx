import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOBT",
  schoolName: "School of Biotechnology",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with SOBT departments and centres.",
    cards: [
      {
        title: "Address",
        content:
          "School of Biotechnology\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone",
        content:
          "Main Office: 0120-234 6070\nDean Office: +91-120-234-9900\nFax: +91-120-234-9901",
        gradient: "bg-gradient-to-br from-teal-500 to-green-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content:
          "General: sobt@gbu.ac.in\nDean: dean.sobt@gbu.ac.in\nAcademic: academic.sobt@gbu.ac.in",
        gradient: "bg-gradient-to-br from-emerald-500 to-teal-600",
        icon: <Mail className="h-8 w-8 text-white" />,
      },
    ],
  },
  officeHours: [
    { day: "Monday - Friday", time: "9:00 AM - 5:00 PM" },
    { day: "Saturday", time: "9:00 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  departments: [
    {
      name: "Biotechnology",
      hod: "Dr. Rekha Puria",
      phone: "0120-234 9901",
      email: "biotech@gbu.ac.in",
      hodEmail: "rekha.puria@gbu.ac.in",
      office: "Room 101, Academic Block B",
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Bioinformatics & Computational Biology",
      hod: "Dr. Deepali Singh",
      phone: "0120-234 9902",
      email: "bioinformatics@gbu.ac.in",
      hodEmail: "deepali.singh@gbu.ac.in",
      office: "Room 105, Academic Block B",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Molecular Medicine & Microbial Biotechnology",
      hod: "Dr. Barkha Singhal",
      phone: "0120-234 9903",
      email: "molmed@gbu.ac.in",
      hodEmail: "barkha.singhal@gbu.ac.in",
      office: "Room 110, Academic Block B",
      color: "from-purple-500 to-pink-500",
    },
  ],
  coeContacts: [
    {
      name: "Centre of Excellence in Bioinformatics",
      department: "School of Biotechnology, Gautam Buddha University",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "coe.bioinformatics@gbu.ac.in",
      phone: "0120-234 9905",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      color: "from-green-500 to-teal-500",
      textColor: "text-green-600",
    },
    {
      name: "Molecular Biology Research Centre",
      department: "School of Biotechnology, Gautam Buddha University",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "molbio.research@gbu.ac.in",
      phone: "0120-234 9906",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      color: "from-emerald-500 to-green-500",
      textColor: "text-emerald-500",
    },
  ],
};
