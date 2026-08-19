import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOBT",
  schoolName: "School of Biotechnology",
  generalInfo: {
    heading: "Contact Us — SOBT",
    subheading: "School of Biotechnology, Gautam Buddha University",
    cards: [
      {
        title: "School of Biotechnology Office",
        content: "School of Biotechnology\nGautam Buddha University\nGreater Noida, Gautam Buddh Nagar, UP - 201312",
        phone: "0120-2344268",
        email: "biotech.gbu@gbu.ac.in",
        gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "GBU Admission Office",
        content: "Gautam Buddha University Campus\nGreater Noida, Yamuna Expressway\nUttar Pradesh - 201312",
        phone: "0120-2344234 / 0120-2344247",
        email: "admissions@gbu.ac.in",
        gradient: "bg-gradient-to-br from-teal-500 to-green-600",
        icon: <Mail className="h-8 w-8 text-white" />,
      },
    ],
  },
  officeHours: [],
  departments: [
    {
      name: "Department of Biotechnology",
      role: "Head of Department",
      hod: "Dr. Rekha Puria",
      phone: "0120-2344276",
      email: "hod.sobt@gbu.ac.in",
      office: "School of Biotechnology, Gautam Buddha University, Greater Noida",
      color: "from-green-500 to-emerald-600",
    },
  ],
  coeContacts: [],
};
