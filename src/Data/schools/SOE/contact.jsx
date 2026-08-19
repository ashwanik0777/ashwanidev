import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOE",
  schoolName: "School of Engineering",
  generalInfo: {
    heading: "Contact Us — SOE",
    subheading: "Get in touch with SOE departments and offices.",
    cards: [
      {
        title: "School of Engineering Office",
        content:
          "School of Engineering\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-indigo-500 to-blue-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
        email: "soe@gbu.ac.in",
        phone: "0120-2344266",
      },
      {
        title: "Office of the Dean",
        content:
          "School of Engineering\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-blue-500 to-indigo-600",
        icon: <Mail className="h-8 w-8 text-white" />,
        email: "dean.soe@gbu.ac.in",
        phone: "0120-2344266",
      },
    ],
  },
  officeHours: [],
  departments: [],
  coeContacts: [],
  directory: [],
};
