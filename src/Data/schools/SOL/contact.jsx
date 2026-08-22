import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOL",
  schoolName: "School of Law, Justice & Governance",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with the School of Law, Justice & Governance.",
    cards: [
      {
        title: "Address",
        content: "School of Law, Justice & Governance\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-red-500 to-red-700",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone",
        content: "Main Office: 0120-234-7002\nDean's Office: 0120-234-7001\nFax: 0120-234-4200",
        gradient: "bg-gradient-to-br from-red-700 to-rose-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content: "General: sol.office@gbu.ac.in\nDean: dean.sol@gbu.ac.in\nAdmissions: admissions.sol@gbu.ac.in",
        gradient: "bg-gradient-to-br from-rose-500 to-red-600",
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
      name: "School of Law, Justice & Governance",
      hod: "Dr. Santosh Kumar Tiwari",
      phone: "0120-234-7003",
      email: "sol.hod@gbu.ac.in",
      hodEmail: "santosh.tiwari@gbu.ac.in",
      office: "Room 201, Academic Block E",
      color: "from-red-500 to-red-700",
    },
  ],
  coeContacts: [
    {
      name: "Legal Aid Clinic",
      department: "School of Law, Justice & Governance, GBU",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "legalaid.sol@gbu.ac.in",
      phone: "0120-234-7002",
      socials: { linkedin: "#", twitter: "#", instagram: "#", youtube: "#" },
      color: "from-red-500 to-rose-600",
      textColor: "text-red-600",
    },
    {
      name: "Moot Court Cell",
      department: "School of Law, Justice & Governance, GBU",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "mootcourt.sol@gbu.ac.in",
      phone: "0120-234-7004",
      socials: { linkedin: "#", twitter: "#", instagram: "#", youtube: "#" },
      color: "from-rose-500 to-red-600",
      textColor: "text-rose-600",
    },
  ],
};
