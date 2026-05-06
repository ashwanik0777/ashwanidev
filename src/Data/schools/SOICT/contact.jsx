import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
	schoolCode: "SOICT",
	schoolName: "School of Information & Communication Technology",
	generalInfo: {
		heading: "Contact Us",
		subheading: "Get in touch with our departments and COE.",
		cards: [
			{
				title: "Address",
				content:
					"University School of ICT\nGautam Buddha University\nGreater Noida, Uttar Pradesh\nPIN: 201312",
				gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
				icon: <MapPin className="h-8 w-8 text-white" />,
			},
			{
				title: "Phone",
				content:
					"Main Office: 0120-234 6070\nAdmissions: +91-11-2586-1001\nFax: +91-11-2586-1002",
				gradient: "bg-gradient-to-br from-green-500 to-green-600",
				icon: <Phone className="h-8 w-8 text-white" />,
			},
			{
				title: "Email",
				content:
					"General: soict@gbu.ac.in\nAdmissions: admissions@usict.ac.in\nAcademic: academic@usict.ac.in",
				gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
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
			name: "Computer Science & Engineering",
			hod: "Dr. Arun Solanki",
			phone: " 0120-234 6083",
			email: "cse@usict.ac.in",
			hodEmail: "asolanki@gbu.ac.in",
			office: "Room 301, Block A",
			color: "from-blue-500 to-blue-600",
		},
		{
			name: "Electronics & Communication Engineering",
			hod: "Dr. Vidushi Sharma",
			phone: " 0120-234 6087",
			email: "ece@usict.ac.in",
			hodEmail: "vidushi@gbu.ac.in",
			office: "Room 201, Block B",
			color: "from-orange-500 to-red-500",
		},
		{
			name: "Information Technology",
			hod: "Dr. Neeta Singh",
			phone: "9990715153",
			email: "it@usict.ac.in",
			hodEmail: "neeta@gbu.ac.in",
			office: "Room 401, Block A",
			color: "from-green-500 to-blue-500",
		},
	],
	coeContacts: [
		{
			name: "Centre of Excellence in Drone Technology",
			department: "School of ICT, Gautam Buddha University",
			address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
			email: "cedt.gbu@gmail.com",
			phone: "23142424XX",
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
			name: "Centre for Rapid and Alternative Energy Mobility",
			department: "School of ICT, Gautam Buddha University",
			address: "Greater Noida, Gautam Buddh Nagar, PIN - 201312",
			email: "info@gbu.ac.in",
			phone: "0120 234 4200",
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
