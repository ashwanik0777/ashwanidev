import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
	schoolCode: "SOM",
	schoolName: "School of Management",
	generalInfo: {
		heading: "Contact Us",
		subheading: "Get in touch with the School of Management.",
		cards: [
			{
				title: "Address",
				content:
					"School of Management\nGautam Buddha University\nYamuna Expressway, Greater Noida\nGautam Budh Nagar, Uttar Pradesh\nPIN: 201312",
				gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
				icon: <MapPin className="h-8 w-8 text-white" />,
			},
			{
				title: "Phone",
				content:
					"SOM Office: 0120-2346144\nUniversity: 0120-2344200\nAdmissions: 0120-2344234\nCRC: 0120-2344209",
				gradient: "bg-gradient-to-br from-green-500 to-green-600",
				icon: <Phone className="h-8 w-8 text-white" />,
			},
			{
				title: "Email",
				content:
					"SOM Office: som@gbu.ac.in\nAdmissions: admissions@gbu.ac.in\nCRC: crc@gbu.ac.in\nDean: neeti@gbu.ac.in",
				gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
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
			name: "Department of Business Management",
			hod: "Dr. Varsha Dixit",
			phone: "0120-2346144",
			email: "som@gbu.ac.in",
			hodEmail: "varsha.dixit@gbu.ac.in",
			office: "Academic Block F, GBU Campus",
			color: "from-blue-500 to-blue-600",
		},
	],
	coeContacts: [
		{
			name: "Corporate Resource Center (CRC)",
			department: "School of Management, Gautam Buddha University",
			address: "Yamuna Expressway, Greater Noida, Gautam Budh Nagar, PIN - 201312",
			email: "crc@gbu.ac.in",
			phone: "0120-2344209",
			socials: {
				linkedin: "#",
				twitter: "#",
				instagram: "#",
				youtube: "#",
			},
			color: "from-purple-500 to-indigo-500",
			textColor: "text-purple-600",
		},
		{
			name: "Admission Cell",
			department: "School of Management, Gautam Buddha University",
			address: "Yamuna Expressway, Greater Noida, Gautam Budh Nagar, PIN - 201312",
			email: "admissions@gbu.ac.in",
			phone: "0120-2344234",
			socials: {
				linkedin: "#",
				twitter: "#",
				instagram: "#",
				youtube: "#",
			},
			color: "from-blue-500 to-green-500",
			textColor: "text-blue-500",
		},
	],
};
