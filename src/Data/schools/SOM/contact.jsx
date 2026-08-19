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
  departments: [],
  directory: [
    { name: "Prof. Shweta Anand", phone: "0120-2346142", ext: "6142" },
    { name: "Dr. Indu Uprety", phone: "0120-2346178", ext: "6178" },
    { name: "Admission Office", phone: "0120-2344234", ext: "4234" },
    { name: "Academic Office", phone: "0120-2346144", ext: "6144" },
    { name: "Dr. Dinesh Kr. Sharma", phone: "0120-2346154", ext: "6154" },
    { name: "Dr. Lovy Sarikwal", phone: "0120-2346155", ext: "6155" },
    { name: "Dr. Rakesh Srivastava", phone: "0120-2346159", ext: "6159" },
    { name: "Dr. Varsha Dixit", phone: "0120-2346158", ext: "6158" },
    { name: "Dr. Subhojit Banerjee", phone: "0120-2346162", ext: "6162" },
    { name: "Dr. Satish Mittal", phone: "0120-2346170", ext: "6170" },
    { name: "Dr. Ajay Kansal", phone: "0120-2346168", ext: "6168" },
    { name: "Dr. Naveen Kumar", phone: "0120-2346160", ext: "6160" },
    { name: "Dr. Ombir Singh", phone: "0120-2346161", ext: "6161" },
    { name: "Dr. Kavita Singh", phone: "0120-2346164", ext: "6163" },
    { name: "Dr. Samar Raqshin", phone: "0120-2346165", ext: "6165" },
    { name: "Dr. Monika Bhati", phone: "0120-2346166", ext: "6166" },
  ],
};

