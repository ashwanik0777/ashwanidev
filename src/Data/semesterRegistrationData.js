import { SCHOOLS_META } from './schoolsMeta.js';

export const PROGRAMME_OPTIONS = {
  SOICT: ['B.Tech', 'M.Tech', 'Ph.D'],
  SOE: ['B.Tech', 'M.Tech', 'Ph.D'],
  SOBT: ['B.Sc', 'M.Sc', 'Ph.D'],
  SOVS: ['B.Sc', 'M.Sc', 'Ph.D'],
  SOHSS: ['BA', 'MA', 'Ph.D'],
  SOBSC: ['BA', 'MA', 'Ph.D'],
  SOM: ['BBA', 'MBA', 'Ph.D'],
  SOL: ['BA LLB', 'LLM', 'Ph.D'],
};

// Department-wise specialisations (includes 'Core' for each department)
export const DEPARTMENT_SPECIALISATIONS = {
  // ── SOICT ──
  'Department of Computer Science & Engineering': [
    'Core', 'Artificial Intelligence', 'Artificial Intelligence & Robotics',
    'Data Science', 'Machine Learning', 'Cyber Security',
    'Internet of Things (IoT)', 'Software Engineering', 'Cloud Computing'
  ],
  'Department of Information Technology': [
    'Core', 'Data Science', 'Information & Cyber Security',
    'Software Engineering', 'Cloud Computing & DevOps'
  ],
  'Department of Electronics & Communication Engineering': [
    'Core', 'VLSI Design', 'Embedded Systems',
    'Signal Processing', 'Telecommunication & RAMS',
    'Railway Signaling'
  ],

  // ── SOE ──
  'Department of Mechanical Engineering': [
    'Core', 'Thermal Engineering', 'Design Engineering',
    'Manufacturing Engineering', 'Industrial Engineering',
    'CAD/CAM'
  ],
  'Department of Civil Engineering': [
    'Core', 'Structural Engineering', 'Construction Management',
    'Environmental Engineering', 'Transportation Engineering',
    'Geotechnical & Geo-Environmental Engineering',
    'Infrastructure Design & Management'
  ],
  'Department of Electrical Engineering': [
    'Core', 'Power Systems', 'Power Electronics & Drives',
    'Power & Energy Systems', 'Renewable Energy',
    'Control & Robotics', 'Instrumentation & Control Engineering',
    'Instrumentation & Signal Processing'
  ],
  'Department of Automobile Engineering': [
    'Core', 'Electric Vehicle Technology', 'Automotive Design'
  ],

  // ── SOBT ──
  'Department of Biotechnology': [
    'Core', 'Genetic Engineering', 'Food Technology',
    'Bioinformatics', 'Pharmaceutical Biotechnology',
    'Environmental Biotechnology'
  ],
  'Department of Bioinformatics & Computational Biology': [
    'Core', 'Computational Genomics', 'Drug Design',
    'Systems Biology'
  ],
  'Department of Molecular Medicine & Microbial Biotechnology': [
    'Core', 'Medical Biotechnology', 'Microbial Biotechnology',
    'Immunology'
  ],

  // ── SOM ──
  'Department of Business Management': [
    'Core', 'Finance', 'Marketing Management',
    'Human Resource Management (HRM)', 'Operations Management',
    'Strategic Management', 'Business Analytics & Data Science',
    'International Business'
  ],

  // ── SOL ──
  'Department of Law & Governance': [
    'Core', 'Constitutional Law', 'Criminal Law',
    'International Law', 'Human Rights Law'
  ],
  'Department of Corporate & Business Law': [
    'Core', 'Corporate Governance', 'Intellectual Property Law',
    'Taxation Law', 'Banking & Insurance Law'
  ],

  // ── SOHSS ──
  'Department of English & Modern European Languages': [
    'Core', 'Linguistics', 'Literature', 'Translation Studies'
  ],
  'Department of Indian Languages & Literature': [
    'Core', 'Hindi Literature', 'Sanskrit', 'Comparative Literature'
  ],
  'Department of Mass Communication & Media Studies': [
    'Core', 'Journalism', 'Advertising & PR',
    'Digital Media', 'Film & Television'
  ],
  'Department of Economics, Planning & Development': [
    'Core', 'Development Economics', 'Financial Economics',
    'Econometrics'
  ],
  'Department of Education & Training': [
    'Core', 'Educational Technology', 'Curriculum Development',
    'Inclusive Education'
  ],
  'Department of History & Civilization': [
    'Core', 'Ancient Indian History', 'Medieval History',
    'Modern History'
  ],
  'Department of Political Science & International Relations': [
    'Core', 'International Relations', 'Public Policy',
    'Governance & Development'
  ],
  'Department of Psychology & Mental Health': [
    'Core', 'Clinical Psychology', 'Counselling Psychology',
    'Organizational Psychology'
  ],
  'Department of Public Administration, Governance & Policy Research': [
    'Core', 'Public Policy Analysis', 'Urban Governance',
    'E-Governance'
  ],
  'Department of Social Work': [
    'Core', 'Community Development', 'Medical & Psychiatric Social Work',
    'Human Resource Management'
  ],
  'Department of Sociology': [
    'Core', 'Urban Sociology', 'Rural Sociology',
    'Gender Studies'
  ],
  'Department of Library & Information Science': [
    'Core', 'Digital Library Management', 'Knowledge Management',
    'Information Systems'
  ],

  // ── SOBSC ──
  'Department of Buddhist Studies': [
    'Core', 'Pali & Theravada Studies', 'Mahayana Studies',
    'Buddhist Philosophy', 'Buddhist Art & Architecture'
  ],
  'Department of Civilization Studies': [
    'Core', 'Indian Civilization', 'Comparative Civilizations',
    'Cultural Heritage Studies'
  ],

  // ── SOVS ──
  'Department of Applied Mathematics': [
    'Core', 'Computational Mathematics', 'Applied Statistics',
    'Operations Research'
  ],
  'Department of Applied Chemistry': [
    'Core', 'Organic Chemistry', 'Analytical Chemistry',
    'Material Science'
  ],
  'Department of Applied Physics': [
    'Core', 'Condensed Matter Physics', 'Photonics & Optics',
    'Nuclear Physics'
  ],
  'Department of Environmental Sciences': [
    'Core', 'Environmental Management', 'Climate Science',
    'Waste Management'
  ],
  'Department of Food Processing and Technology': [
    'Core', 'Food Safety & Quality', 'Food Preservation Technology',
    'Nutraceuticals'
  ],
};

export const CATEGORY_OPTIONS = ['General', 'OBC', 'SC', 'ST', 'EWS', 'PWD'];
export const GENDER_OPTIONS = ['Male', 'Female', 'Other'];
export const YEAR_OPTIONS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'];
export const SEMESTER_OPTIONS = Array.from({ length: 10 }, (_, i) => i + 1);

export const parseDriveLink = (url) => {
  if (!url) return '';
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=))([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  if (match && match[1]) {
    const fileId = match[1];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
  }
  return url;
};

export const MOCK_STUDENT_PROFILE = { 
  name: 'Rahul Kumar', 
  rollNumber: '2024SOICT001', 
  email: 'rahul.kumar@gbu.ac.in', 
  phone: '9876543210', 
  school: 'SOICT', 
  programme: 'B.Tech', 
  specialisation: 'Artificial Intelligence', 
  year: '2nd Year', 
  semester: 4 
};

export const MOCK_FEE_STATUS_PAID = { paid: true, amount: 75000, transactionId: 'TXN2026001234', paidDate: '2026-07-10' };
export const MOCK_FEE_STATUS_UNPAID = { paid: false };

export const MOCK_REGISTRATIONS = [
  { id: 'REG-2026-00001', studentName: 'Rahul Kumar', rollNumber: '2024SOICT001', email: 'rahul.kumar@gbu.ac.in', mobile: '9876543210', gender: 'Male', category: 'General', aadharNumber: 'XXXX-XXXX-1234', programme: 'B.Tech', department: 'Department of Computer Science & Engineering', specialisation: 'Artificial Intelligence', year: '2nd Year', semester: 4, school: 'SOICT', schoolName: 'School of Information and Communication Technology', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-20T10:00:00Z', status: 'enrolled' },
  { id: 'REG-2026-00002', studentName: 'Priya Sharma', rollNumber: '2023SOM002', email: 'priya.sharma@gbu.ac.in', mobile: '9876543211', gender: 'Female', category: 'OBC', aadharNumber: 'XXXX-XXXX-2345', programme: 'MBA', department: 'Department of Business Management', specialisation: 'Finance', year: '2nd Year', semester: 3, school: 'SOM', schoolName: 'School of Management', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-21T11:00:00Z', status: 'enrolled' },
  { id: 'REG-2026-00003', studentName: 'Amit Singh', rollNumber: '2025SOE003', email: 'amit.singh@gbu.ac.in', mobile: '9876543212', gender: 'Male', category: 'SC', aadharNumber: 'XXXX-XXXX-3456', programme: 'B.Tech', department: 'Department of Mechanical Engineering', specialisation: 'Core', year: '1st Year', semester: 1, school: 'SOE', schoolName: 'School of Engineering', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-19T09:30:00Z', status: 'enrolled' },
  { id: 'REG-2026-00004', studentName: 'Neha Gupta', rollNumber: '2022SOL004', email: 'neha.gupta@gbu.ac.in', mobile: '9876543213', gender: 'Female', category: 'General', aadharNumber: 'XXXX-XXXX-4567', programme: 'BA LLB', department: 'Department of Law & Governance', specialisation: 'Constitutional Law', year: '4th Year', semester: 7, school: 'SOL', schoolName: 'School of Law, Justice & Governance', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-18T14:20:00Z', status: 'enrolled' },
  { id: 'REG-2026-00005', studentName: 'Vikas Verma', rollNumber: '2024SOBT005', email: 'vikas.verma@gbu.ac.in', mobile: '9876543214', gender: 'Male', category: 'General', aadharNumber: 'XXXX-XXXX-5678', programme: 'B.Sc', department: 'Department of Biotechnology', specialisation: 'Genetic Engineering', year: '2nd Year', semester: 3, school: 'SOBT', schoolName: 'School of Biotechnology', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-21T10:15:00Z', status: 'enrolled' },
  { id: 'REG-2026-00006', studentName: 'Anjali Yadav', rollNumber: '2023SOBSC006', email: 'anjali.yadav@gbu.ac.in', mobile: '9876543215', gender: 'Female', category: 'OBC', aadharNumber: 'XXXX-XXXX-6789', programme: 'MA', department: 'Department of Buddhist Studies', specialisation: 'Pali & Theravada Studies', year: '2nd Year', semester: 3, school: 'SOBSC', schoolName: 'School of Buddhist Studies & Civilization', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-17T16:45:00Z', status: 'enrolled' },
  { id: 'REG-2026-00007', studentName: 'Ravi Kumar', rollNumber: '2025SOVS007', email: 'ravi.kumar@gbu.ac.in', mobile: '9876543216', gender: 'Male', category: 'ST', aadharNumber: 'XXXX-XXXX-7890', programme: 'M.Sc', department: 'Department of Applied Physics', specialisation: 'Condensed Matter Physics', year: '1st Year', semester: 1, school: 'SOVS', schoolName: 'School of Vocational Studies & Applied Sciences', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-20T12:00:00Z', status: 'enrolled' },
  { id: 'REG-2026-00008', studentName: 'Pooja Singh', rollNumber: '2024SOHSS008', email: 'pooja.singh@gbu.ac.in', mobile: '9876543217', gender: 'Female', category: 'General', aadharNumber: 'XXXX-XXXX-8901', programme: 'BA', department: 'Department of English & Modern European Languages', specialisation: 'Core', year: '2nd Year', semester: 3, school: 'SOHSS', schoolName: 'School of Humanities & Social Sciences', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-19T13:10:00Z', status: 'enrolled' },
  { id: 'REG-2026-00009', studentName: 'Saurabh Mishra', rollNumber: '2023SOICT009', email: 'saurabh.mishra@gbu.ac.in', mobile: '9876543218', gender: 'Male', category: 'EWS', aadharNumber: 'XXXX-XXXX-9012', programme: 'B.Tech', department: 'Department of Electronics & Communication Engineering', specialisation: 'VLSI Design', year: '3rd Year', semester: 5, school: 'SOICT', schoolName: 'School of Information and Communication Technology', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-18T10:30:00Z', status: 'enrolled' },
  { id: 'REG-2026-00010', studentName: 'Kriti Sharma', rollNumber: '2022SOE010', email: 'kriti.sharma@gbu.ac.in', mobile: '9876543219', gender: 'Female', category: 'General', aadharNumber: 'XXXX-XXXX-0123', programme: 'B.Tech', department: 'Department of Civil Engineering', specialisation: 'Structural Engineering', year: '4th Year', semester: 7, school: 'SOE', schoolName: 'School of Engineering', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-21T09:45:00Z', status: 'enrolled' },
  { id: 'REG-2026-00011', studentName: 'Mohit Agarwal', rollNumber: '2024SOM011', email: 'mohit.agarwal@gbu.ac.in', mobile: '9876543220', gender: 'Male', category: 'General', aadharNumber: 'XXXX-XXXX-1357', programme: 'BBA', department: 'Department of Business Management', specialisation: 'Marketing Management', year: '2nd Year', semester: 3, school: 'SOM', schoolName: 'School of Management', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-20T11:20:00Z', status: 'enrolled' },
  { id: 'REG-2026-00012', studentName: 'Nisha Singh', rollNumber: '2025SOL012', email: 'nisha.singh@gbu.ac.in', mobile: '9876543221', gender: 'Female', category: 'OBC', aadharNumber: 'XXXX-XXXX-2468', programme: 'LLM', department: 'Department of Corporate & Business Law', specialisation: 'Intellectual Property Law', year: '1st Year', semester: 1, school: 'SOL', schoolName: 'School of Law, Justice & Governance', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-19T14:40:00Z', status: 'enrolled' },
  { id: 'REG-2026-00013', studentName: 'Arun Yadav', rollNumber: '2023SOBT013', email: 'arun.yadav@gbu.ac.in', mobile: '9876543222', gender: 'Male', category: 'OBC', aadharNumber: 'XXXX-XXXX-3579', programme: 'M.Sc', department: 'Department of Biotechnology', specialisation: 'Food Technology', year: '2nd Year', semester: 3, school: 'SOBT', schoolName: 'School of Biotechnology', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-18T11:55:00Z', status: 'enrolled' },
  { id: 'REG-2026-00014', studentName: 'Swati Patel', rollNumber: '2024SOBSC014', email: 'swati.patel@gbu.ac.in', mobile: '9876543223', gender: 'Female', category: 'ST', aadharNumber: 'XXXX-XXXX-4680', programme: 'BA', department: 'Department of Buddhist Studies', specialisation: 'Buddhist Philosophy', year: '2nd Year', semester: 3, school: 'SOBSC', schoolName: 'School of Buddhist Studies & Civilization', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-21T08:30:00Z', status: 'enrolled' },
  { id: 'REG-2026-00015', studentName: 'Deepak Chaudhary', rollNumber: '2022SOVS015', email: 'deepak.chaudhary@gbu.ac.in', mobile: '9876543224', gender: 'Male', category: 'General', aadharNumber: 'XXXX-XXXX-5791', programme: 'B.Sc', department: 'Department of Food Processing and Technology', specialisation: 'Food Safety & Quality', year: '3rd Year', semester: 5, school: 'SOVS', schoolName: 'School of Vocational Studies & Applied Sciences', photoUrl: '', signatureUrl: '', registrationDate: '2026-07-20T15:10:00Z', status: 'enrolled' },
];

export const REGISTRATION_STORAGE_KEY = 'gbu_semester_registrations';
