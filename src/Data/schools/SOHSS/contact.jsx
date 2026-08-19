import { Mail, MapPin, Phone } from "lucide-react";

export const contactData = {
	schoolCode: "SOHSS",
	schoolName: "School of Humanities & Social Sciences",
	generalInfo: {
		heading: "Contact Us",
		subheading: "Get in touch with the School of Humanities & Social Sciences.",
		cards: [
			{
				title: "Address",
				content:
					"School of Humanities & Social Sciences\nGautam Buddha University\nYamuna Expressway, Greater Noida\nGautam Budh Nagar, Uttar Pradesh\nPIN: 201312",
				gradient: "bg-gradient-to-br from-pink-500 to-rose-600",
				icon: <MapPin className="h-8 w-8 text-white" />,
			},
			{
				title: "Phone",
				content:
					"Dean's Office: 0120-2344416\nSchool Office: 0120-2344223\nSchool Office: 0120-2344419\nPsychology Dept: 0120-2344429\nUniversity: 0120-2344200",
				gradient: "bg-gradient-to-br from-green-500 to-emerald-600",
				icon: <Phone className="h-8 w-8 text-white" />,
			},
			{
				title: "Email",
				content:
					"Dean's Office: deanhss@gbu.ac.in\nSchool Office: sohss101@gmail.com\nPsychology Dept: psychology@gbu.ac.in\nAdmissions: admissions@gbu.ac.in\nCRC: crc@gbu.ac.in",
				gradient: "bg-gradient-to-br from-purple-500 to-indigo-600",
				icon: <Mail className="h-8 w-8 text-white" />,
			},
		],
	},
	officeHours: [],
	departments: [],
	directoryTable: {
		title: "Directory | SOHSS",
		rows: [
			{ name: "Dean", phone: "0120-2346170", ext: "6170" },
			{ name: "Head of the Department Journalism and Mass Communication", phone: "0120-2344416", ext: "4416" },
			{ name: "HOD - Department of Education", phone: "0120-2344424", ext: "4424" },
			{ name: "Head of the Department of Psychology and Mental Health", phone: "0120-2344429", ext: "4429" },
			{ name: "Head of Social Work", phone: "0120-2344426", ext: "4426" },
			{ name: "Head of the Department of Economics Planning and Development", phone: "0120-2346161", ext: "6161" },
			{ name: "Head of the Department of English & Modern European Languages", phone: "0120-2344430", ext: "4430" },
		],
	},
	coeContacts: [],
};
