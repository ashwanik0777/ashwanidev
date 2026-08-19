import { Mail, Phone, Building2 } from "lucide-react";

export const contactData = {
  schoolCode: "SOL",
  schoolName: "School of Law, Justice & Governance",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with the School of Law, Justice & Governance or Admission Office.",
    cards: [
      {
        title: "Admission Office",
        content: "Phone No.: 0120-2344234/47\nEmail: admissions@gbu.ac.in",
        gradient: "bg-gradient-to-br from-purple-700 to-indigo-800",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "School of Law, Justice & Governance",
        content: "Phone no: 0120-2347002\nEmail: gbulawschool@gmail.com",
        gradient: "bg-gradient-to-br from-purple-800 to-slate-900",
        icon: <Building2 className="h-8 w-8 text-white" />,
      },
    ],
  },
  departments: [],
};

