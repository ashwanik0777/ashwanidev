import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOVS",
  schoolName: "School of Vocational Studies & Applied Sciences",
  generalInfo: {
    heading: "Contact Us",
    subheading: "For Admissions related information contact us at:",
    cards: [
      {
        title: "Admission Office",
        content: "Gautam Buddha University\nYamuna Expressway, Greater Noida\nGautam Budh Nagar, Uttar Pradesh - 201312",
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone No.",
        content: "0120-2344234\n0120-2344247",
        gradient: "bg-gradient-to-br from-teal-500 to-emerald-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content: "admissions@gbu.ac.in",
        gradient: "bg-gradient-to-br from-purple-500 to-pink-600",
        icon: <Mail className="h-8 w-8 text-white" />,
      },
    ],
  },
  officeHours: [],
  departments: [],
  directoryTable: {
    title: "Directory | SOVSAS",
    rows: [
      { name: "Dr. Chander Kumar Singh (Dean)", phone: "0120-2344341", ext: "4341" },
      { name: "Dr. Sushil Kumar", phone: "0120-2344350", ext: "4350" },
      { name: "Dr. Vivek Kumar Shukla", phone: "0120-2344348", ext: "4348" },
      { name: "Dr. Jaya Maitra", phone: "0120-2344349", ext: "4349" },
      { name: "Dr. Upma Singh", phone: "0120-2344352", ext: "4352" },
      { name: "Dr. Vandana Singh", phone: "0120-2344351", ext: "4351" },
      { name: "Dr. Pratiksha Saxena", phone: "0120-2344353", ext: "4353" },
      { name: "Dr. Amit K Awasthi", phone: "0120-2344357", ext: "4357" },
      { name: "Dr. Amit Ujlayan", phone: "0120-2344360", ext: "4360" },
      { name: "Dr. Bhawana Joshi", phone: "0120-2344355", ext: "4355" },
      { name: "Dr. Manju Sharma (on special leave)", phone: "0120-2344367", ext: "4367" },
    ],
  },
  coeContacts: [],
};
