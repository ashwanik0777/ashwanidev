import { Phone, Building2 } from "lucide-react";

export const contactData = {
  schoolCode: "SOM",
  schoolName: "School of Management",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with the School of Management or Admission Office.",
    cards: [
      {
        title: "Admission Office",
        content: "For Admissions related information contact us at:\nPhone No.: 0120-2344234/47\nEmail: admissions@gbu.ac.in",
        gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Programme Office",
        content: "For more information about MBA programme contact us at:\nPhone No.: 0120-2346144",
        gradient: "bg-gradient-to-br from-indigo-700 to-purple-800",
        icon: <Building2 className="h-8 w-8 text-white" />,
      },
    ],
  },
  departments: [
    {
      name: "Admission Office",
      phone: "0120-2344234/47",
      email: "admissions@gbu.ac.in",
      color: "from-blue-600 to-indigo-700",
    },
    {
      name: "Programme Office (MBA Information)",
      phone: "0120-2346144",
      email: "",
      color: "from-indigo-700 to-purple-800",
    },
  ],
};

