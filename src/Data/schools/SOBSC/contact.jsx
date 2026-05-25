import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
  schoolCode: "SOBSC",
  schoolName: "School of Buddhist Studies & Civilization",
  generalInfo: {
    heading: "Contact Us",
    subheading: "Get in touch with the School of Buddhist Studies & Civilization.",
    cards: [
      {
        title: "Address",
        content: "School of Buddhist Studies & Civilization\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
        gradient: "bg-gradient-to-br from-yellow-500 to-orange-600",
        icon: <MapPin className="h-8 w-8 text-white" />,
      },
      {
        title: "Phone",
        content: "Main Office: 0120-234-9901\nDean's Office: 0120-234-9900\nFax: 0120-234-4200",
        gradient: "bg-gradient-to-br from-orange-500 to-red-600",
        icon: <Phone className="h-8 w-8 text-white" />,
      },
      {
        title: "Email",
        content: "General: sobsc.office@gbu.ac.in\nDean: dean.sobsc@gbu.ac.in\nAdmissions: admissions.sobsc@gbu.ac.in",
        gradient: "bg-gradient-to-br from-amber-500 to-yellow-600",
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
      name: "Buddhist Philosophy & Ethics",
      hod: "Dr. Chintala Venkata Sivasai",
      phone: "0120-234-9902",
      email: "buddhist.philosophy@gbu.ac.in",
      hodEmail: "sivasai@gbu.ac.in",
      office: "Room 101, Academic Block C",
      color: "from-yellow-500 to-orange-600",
    },
    {
      name: "Buddhist Languages & Literature",
      hod: "Dr. Manish T. Meshram",
      phone: "0120-234-9905",
      email: "buddhist.languages@gbu.ac.in",
      hodEmail: "manish.meshram@gbu.ac.in",
      office: "Room 102, Academic Block C",
      color: "from-orange-500 to-red-600",
    },
    {
      name: "Meditation & Mindfulness Studies",
      hod: "Dr. Priyadarsini Mitra",
      phone: "0120-234-9906",
      email: "meditation.studies@gbu.ac.in",
      hodEmail: "priyadarsini@gbu.ac.in",
      office: "Room 103, Academic Block C",
      color: "from-amber-500 to-yellow-600",
    },
  ],
  coeContacts: [
    {
      name: "Centre for Buddhist Studies",
      department: "School of Buddhist Studies & Civilization, GBU",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "centre.buddhist@gbu.ac.in",
      phone: "0120-234-9901",
      socials: { linkedin: "#", twitter: "#", instagram: "#", youtube: "#" },
      color: "from-yellow-500 to-orange-600",
      textColor: "text-yellow-600",
    },
    {
      name: "Meditation & Mindfulness Centre",
      department: "School of Buddhist Studies & Civilization, GBU",
      address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
      email: "meditation.centre@gbu.ac.in",
      phone: "0120-234-9906",
      socials: { linkedin: "#", twitter: "#", instagram: "#", youtube: "#" },
      color: "from-orange-500 to-amber-600",
      textColor: "text-orange-600",
    },
  ],
};
