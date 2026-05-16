import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOE",
  schoolName: "School of Engineering",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with SOE departments and offices.",
    cards: [
      {
        title: "Address",
        content:
          "School of Engineering\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone",
        content:
          "Main Office: 0120-234 6070\nDean Office: +91-120-234-9910\nFax: +91-120-234-9911",
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content:
          "General: soe@gbu.ac.in\nDean: dean.soe@gbu.ac.in\nAcademic: academic.soe@gbu.ac.in",
        gradient: "bg-gradient-to-br from-cyan-500 to-blue-600",
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
      name: "Mechanical Engineering",
      hod: "Dr. Anil Kumar Tiwari",
      phone: "0120-234 9911",
      email: "mech@gbu.ac.in",
      hodEmail: "anil.tiwari@gbu.ac.in",
      office: "Room 201, Academic Block D",
      color: "from-indigo-500 to-blue-600",
    },
    {
      name: "Civil Engineering",
      hod: "Dr. Prashant Garg",
      phone: "0120-234 9912",
      email: "civil@gbu.ac.in",
      hodEmail: "prashant.garg@gbu.ac.in",
      office: "Room 205, Academic Block D",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Electrical Engineering",
      hod: "Dr. O.V. Singh",
      phone: "0120-234 9913",
      email: "electrical@gbu.ac.in",
      hodEmail: "ov.singh@gbu.ac.in",
      office: "Room 210, Academic Block D",
      color: "from-purple-500 to-indigo-500",
    },
    {
      name: "Automobile Engineering",
      hod: "Dr. Vikas Kumar",
      phone: "0120-234 9914",
      email: "automobile@gbu.ac.in",
      hodEmail: "vikas.kumar@gbu.ac.in",
      office: "Room 215, Academic Block D",
      color: "from-orange-500 to-red-500",
    },
  ],
  coeContacts: [
    {
      name: "Advanced Computing Center",
      department: "School of Engineering, Gautam Buddha University",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "computing.soe@gbu.ac.in",
      phone: "0120-234 9915",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      color: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
    },
    {
      name: "Engineering Design Laboratory",
      department: "School of Engineering, Gautam Buddha University",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "designlab.soe@gbu.ac.in",
      phone: "0120-234 9916",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      color: "from-blue-500 to-cyan-500",
      textColor: "text-blue-500",
    },
  ],
};
