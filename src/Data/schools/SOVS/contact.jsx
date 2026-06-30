import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOVS",
  schoolName: "School of Vocational Studies & Applied Sciences",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with the School of Vocational Studies & Applied Sciences.",
    cards: [
      {
        title: "Address",
        content:
          "School of Vocational Studies & Applied Sciences\nAcademic Block H\nGautam Buddha University\nYamuna Expressway, Greater Noida\nGautam Budh Nagar, Uttar Pradesh\nPIN: 201312",
        gradient: "from-teal-500 to-emerald-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone",
        content:
          "Dean's Office: 0120-2344345\nSchool Office: 0120-2344346\nMath Dept: 0120-2344353\nUniversity: 0120-2344200",
        gradient: "from-blue-500 to-teal-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content:
          "Dean's Office: sovs.office@gbu.ac.in\nMath Dept: pratiksha@gbu.ac.in\nAdmissions: admissions@gbu.ac.in\nCRC: crc@gbu.ac.in",
        gradient: "from-purple-50 to-indigo-600",
        icon: <Mail className="h-8 w-8 text-white" />,
      },
    ],
  },
  officeHours: [
    { day: "Monday - Friday", time: "9:30 AM - 5:30 PM" },
    { day: "Saturday", time: "9:30 AM - 1:00 PM" },
    { day: "Sunday", time: "Closed" },
  ],
  departments: [
    {
      name: "Dean's Office — SOVS",
      hod: "Prof. Chander Kumar Singh",
      phone: "0120-2344345",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "sovs.office@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Department of Applied Mathematics",
      hod: "Dr. Pratiksha Saxena",
      phone: "0120-2344353",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "pratiksha@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Department of Applied Chemistry",
      hod: "Dr. Jaya Maitra",
      phone: "0120-2344345",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "jayamaitra@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Department of Applied Physics",
      hod: "Dr. Ashish Kumar",
      phone: "0120-2344345",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "ashishk@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Department of Environmental Sciences",
      hod: "Dr. Bhaswati Banerjee",
      phone: "0120-2344223",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "bhaswati@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Department of Food Processing and Technology",
      hod: "Dr. Mohd. Tashfeen Ashraf",
      phone: "0120-2344200",
      email: "sovs.office@gbu.ac.in",
      hodEmail: "ashraf@gbu.ac.in",
      office: "Academic Block H, GBU Campus",
      color: "from-orange-500 to-orange-600",
    },
  ],
  coeContacts: [
    {
      name: "Corporate Resource Center (CRC)",
      department: "School of Vocational Studies & Applied Sciences, GBU",
      address: "Yamuna Expressway, Greater Noida, Gautam Budh Nagar, PIN - 201312",
      email: "crc@gbu.ac.in",
      phone: "0120-2344209",
      socials: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
        youtube: "#",
      },
      color: "from-teal-500 to-indigo-500",
      textColor: "text-teal-600",
    },
  ],
};
