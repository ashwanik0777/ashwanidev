import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOICT",
  schoolName: "School of Information & Communication Technology",
  generalInfo: {
    heading: "Contact Us | USICT",
    subheading: "School of ICT, Gautam Buddha University",
    cards: [
      {
        title: "USICT OFFICE",
        content:
          "School of ICT, Gautam Buddha University\nGreater Noida, Uttar Pradesh (201312,)",
        phone: "0120-234 6070",
        email: "soict@gbu.ac.in",
        gradient: "bg-gradient-to-br from-blue-600 to-indigo-700",
        icon: <MapPin className="h-7 w-7 text-white" />,
      },
    ],
  },
  deanInfo: {
    name: "Dr. Arpit Bhardwaj",
    title: "Dean",
    department: "School of ICT, Gautam Buddha University",
    image: "https://www.gbu.ac.in/USICT/media/img/arpit%20bhardwaj.jpg",
    phone: "0120-234 6067",
    email: "arpit.bhardwaj@gbu.ac.in",
    office:
      "School of ICT, Gautam Buddha University\nGreater Noida, Uttar Pradesh (201312,)",
    color: "from-indigo-500 to-purple-700",
  },
  officeHours: [],
  departments: [
    {
      name: "Department Of Computer Science and Engineering",
      hod: "Dr. Arun Solanki",
      role: "Head of Department",
      phone: "0120-234 6083",
      email: "asolanki@gbu.ac.in",
      office:
        "School of ICT, Gautam Buddha University\nGreater Noida, Uttar Pradesh (201312,)",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "Department of Electronics and Communication Engineering",
      hod: "Dr. Vidushi Sharma",
      role: "Head of Department",
      phone: "0120-234 6087",
      email: "",
      office:
        "School of ICT, Gautam Buddha University\nGreater Noida, Uttar Pradesh (201312,)",
      color: "from-purple-600 to-pink-600",
    },
    {
      name: "Department of Information Technology",
      hod: "Dr. Neeta Singh",
      role: "Head of Department",
      phone: "",
      email: "",
      office:
        "School of ICT, Gautam Buddha University\nGreater Noida, Uttar Pradesh (201312,)",
      color: "from-emerald-600 to-teal-600",
    },
  ],
  coeContacts: [],
};
