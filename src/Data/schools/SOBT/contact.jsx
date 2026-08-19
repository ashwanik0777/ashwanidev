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
  directory: [
    { name: "Dean", phone: "0120-2344266", ext: "4266" },
    { name: "Dr. Jai Prakash Muyal", phone: "0120-2344273", ext: "4273" },
    { name: "Dr. Gunjan Garg", phone: "0120-2344272", ext: "4272" },
    { name: "Dr. Md. Tashfeen Ashraf", phone: "0120-2344285", ext: "4285" },
    { name: "Dr. Vikrant Nain", phone: "0120-2344283", ext: "4283" },
    { name: "Dr. Shakti Sahi", phone: "0120-2344275", ext: "4275" },
    { name: "Dr. Jitendra Singh Rathore", phone: "0120-2344286", ext: "4286" },
    { name: "Dr. Rekha Puria", phone: "0120-2344276", ext: "4276" },
    { name: "Dr. Nagendra Singh", phone: "0120-2344277", ext: "4277" },
    { name: "Dr. Bhaswati Banerjee", phone: "0120-2344287", ext: "4287" },
    { name: "Dr. Vishwas Tripathi", phone: "0120-2344288", ext: "4288" },
    { name: "Dr. Barkha Singhal", phone: "0120-2344290", ext: "4290" },
    { name: "Dr. Imteyaz Qamar", phone: "0120-2344280", ext: "4280" },
    { name: "Dr. Deepali Singh", phone: "0120-2344281", ext: "4281" },
  ],
  coeContacts: [],
};
