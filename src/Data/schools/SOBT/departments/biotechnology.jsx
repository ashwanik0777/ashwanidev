import { Microscope, Dna, FlaskConical, Users, BookOpen, Award, Lightbulb, GraduationCap } from "lucide-react";

export const departmentLayoutData = {
    schoolCode: "SOBT",
    departmentId: "biotechnology",
    heroProps: {
        title: "Department of Biotechnology",
        highlight: "Biotechnology",
        subtitle:
            "Pioneering innovation in life sciences education. Empowering students to become tomorrow's biotechnology leaders and researchers.",
        primaryButton: { label: "Explore Programs" },
        secondaryButton: { label: "Research Areas" },
        backgroundImage:
            "https://images.unsplash.com/photo-1581093588401-22a67f8b6d9b?auto=format&fit=crop&w=1920&q=80",
        features: [
            {
                icon: Dna,
                bg: "bg-gradient-to-br from-green-500 to-green-600",
                subtitle: "Genetic Engineering",
                description:
                    "Gene editing, CRISPR technology, and transgenic organism development",
            },
            {
                icon: Microscope,
                bg: "bg-gradient-to-br from-emerald-500 to-emerald-600",
                subtitle: "Molecular Biology",
                description:
                    "DNA/RNA analysis, protein chemistry, and molecular diagnostics",
            },
            {
                icon: FlaskConical,
                bg: "bg-gradient-to-br from-teal-500 to-teal-600",
                subtitle: "Bioprocess Engineering",
                description:
                    "Fermentation technology, downstream processing, and scale-up operations",
            },
        ],
    },
    hodProps: {
        title: "From the Desk of HOD, Biotechnology",
        image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
        name: "Dr. Rekha Puria",
        designation: "Head of Department",
        messageParagraphs: [
            "Greetings!",
            "Welcome to the Department of Biotechnology at the School of Biotechnology, Gautam Buddha University! Biotechnology is one of the most transformative fields of modern science, with applications spanning healthcare, agriculture, environmental conservation, and industrial manufacturing.",
            "Our department offers comprehensive programs that blend rigorous theoretical education with extensive hands-on laboratory training. We emphasize research-oriented learning where students work on real-world problems under the mentorship of experienced faculty members.",
            "We regularly organize workshops, seminars, conferences, and guest lectures by eminent scientists from national and international institutions. Our faculty members are actively engaged in cutting-edge research in areas like genetic engineering, molecular medicine, bioinformatics, and environmental biotechnology.",
            "Our graduates have successfully placed in leading pharmaceutical companies, research organizations, and academic institutions. We strive to create professionals who are not only technically competent but also socially responsible.",
        ],
        contact: {
            name: "Dr. Rekha Puria",
            designation: "Head of Department - Biotechnology",
            email: "rekha.puria@gbu.ac.in",
            phone: "0120-234-9901",
        },
    },
    aboutProps: null,
    programsData: [
        {
            id: "int-btech-mtech-biotech",
            title: "Integrated B.Tech.- M.Tech. / MBA (Biotechnology)",
            level: "Dual Degree",
            duration: "5 Years",
            intake: "60 Students",
            description: "Comprehensive 5-year integrated dual degree covering recombinant DNA technology, bioprocess engineering, and bio-management.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
            gradient: "from-emerald-500 to-teal-600",
            highlights: [
                "Recombinant DNA Technology",
                "Bioprocess & Fermentation",
                "Bio-Management",
                "Master Thesis"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/int-btech-mtech-biotech-structure-2023.pdf",
            syllabus: [
                {
                    session: "Course Structure (2023 onwards)",
                    url: "/courses/sobt/biotechnology/int-btech-mtech-biotech-structure-2023.pdf"
                },
                {
                    session: "Course Content (All Semesters)",
                    url: "/courses/sobt/biotechnology/int-btech-mtech-biotech-syllabus.pdf"
                },
                {
                    session: "Course Structure (Upto 2018 Batch)",
                    url: "/courses/sobt/biotechnology/int-btech-mtech-biotech-structure-2018.pdf"
                },
                {
                    session: "Course Content (Upto 2018 Batch)",
                    url: "/courses/sobt/biotechnology/int-btech-mtech-biotech-syllabus-2018.pdf"
                }
            ]
        },
        {
            id: "bsc-biotech-research",
            title: "B.Sc. Biotechnology (Hons.) with Research",
            level: "UG",
            duration: "4 Years",
            intake: "60 Students",
            description: "NEP-aligned undergraduate curriculum with intensive lab research in biochemistry, genetics, and cell cultures.",
            image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=400&q=80",
            gradient: "from-teal-500 to-cyan-600",
            highlights: [
                "Molecular Genetics",
                "Cell Culture Techniques",
                "Enzymology",
                "Undergraduate Thesis"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/bsc-biotech-structure-2022-26.pdf",
            syllabus: [
                {
                    session: "Course Structure (2022-26)",
                    url: "/courses/sobt/biotechnology/bsc-biotech-structure-2022-26.pdf"
                },
                {
                    session: "Course Content",
                    url: "/courses/sobt/biotechnology/bsc-biotech-syllabus.pdf"
                }
            ]
        },
        {
            id: "mtech-biotech",
            title: "M.Tech. Biotechnology",
            level: "PG",
            duration: "2 Years",
            intake: "30 Students",
            description: "Postgraduate engineering in bioreactor design, downstream purification, metabolic engineering, and synthetic biology.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
            gradient: "from-cyan-600 to-blue-700",
            highlights: [
                "Bioreactor Scale-up",
                "Downstream Processing",
                "Metabolic Engineering",
                "Master Dissertation"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/mtech-biotech-structure-2020.pdf",
            syllabus: [
                {
                    session: "Course Structure (2020 onwards)",
                    url: "/courses/sobt/biotechnology/mtech-biotech-structure-2020.pdf"
                },
                {
                    session: "Course Content (2019 onwards)",
                    url: "/courses/sobt/biotechnology/mtech-biotech-syllabus-2019.pdf"
                }
            ]
        },
        {
            id: "msc-biotech-2yr",
            title: "M.Sc. Biotechnology (2 Year)",
            level: "PG",
            duration: "2 Years",
            intake: "40 Students",
            description: "Advanced curriculum covering plant and animal biotechnology, genetic engineering, biostatistics, and cellular therapeutics.",
            image: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=400&q=80",
            gradient: "from-emerald-600 to-teal-700",
            highlights: [
                "Genetic Engineering",
                "Plant & Animal Biotech",
                "Immunotechnology",
                "Research Thesis"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/msc-biotech-2yr-structure.pdf",
            syllabus: [
                {
                    session: "Course Structure",
                    url: "/courses/sobt/biotechnology/msc-biotech-2yr-structure.pdf"
                },
                {
                    session: "Course Content (2019 onwards)",
                    url: "/courses/sobt/biotechnology/msc-biotech-2yr-syllabus-2019.pdf"
                }
            ]
        },
        {
            id: "msc-biotech-1yr-research",
            title: "M.Sc. (Research) in Biotechnology (1 Year)",
            level: "PG",
            duration: "1 Year",
            intake: "15 Students",
            description: "Intensive 1-year research-centric master's program dedicated to full-time laboratory investigation and thesis writing.",
            image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=400&q=80",
            gradient: "from-teal-600 to-cyan-700",
            highlights: [
                "1-Year Intensive Track",
                "Dedicated Lab Project",
                "Research Methodology",
                "Thesis Publication"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/msc-biotech-1yr-research-structure.pdf",
            syllabus: [
                {
                    session: "Course Structure",
                    url: "/courses/sobt/biotechnology/msc-biotech-1yr-research-structure.pdf"
                }
            ]
        },
        {
            id: "phd-biotech",
            title: "Ph.D. in Biotechnology",
            level: "Doctoral",
            duration: "3-5 Years",
            intake: "20 Students",
            description: "Doctoral research program promoting original scientific discovery in industrial microbiology, molecular medicine, and agriculture.",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
            gradient: "from-green-600 to-teal-800",
            highlights: [
                "Independent Research",
                "Indexed Journal Publications",
                "Instrument Access",
                "Doctoral Defense"
            ],
            syllabusUrl: "/courses/sobt/biotechnology/phd-biotech-structure-2020.pdf",
            syllabus: [
                {
                    session: "Course Structure (2020 onwards)",
                    url: "/courses/sobt/biotechnology/phd-biotech-structure-2020.pdf"
                },
                {
                    session: "Course Content (2020 onwards)",
                    url: "/courses/sobt/biotechnology/phd-biotech-syllabus-2020.pdf"
                }
            ]
        }
    ],
    facultyMembers: [
        {
            name: "Prof. S. Dhanalakshmi",
            position: "Professor and Dean",
            specialization: "Molecular Biology, Biochemistry, Enzymology",
            email: "dean.sobt@gbu.ac.in",
            achievements: "Ph.D: Life Sciences",
            image: "https://faculty.gbu.ac.in/uploads/photos/68c152fb1cc8f_Lakshmi_photo_1.png",
            color: "from-green-500 to-green-600",
            extraIcon: Award,
        },
        {
            name: "Dr. Rekha Puria",
            position: "Assistant Professor and HoD",
            specialization: "Yeast Biology, Gene Regulation, Stress Response",
            email: "rekha.puria@gbu.ac.in",
            achievements: "Ph.D: Biotechnology",
            image: "https://faculty.gbu.ac.in/uploads/photos/67c63940b5c8a_RP%20Pic.jpeg",
            color: "from-emerald-500 to-emerald-600",
            extraIcon: Award,
        },
        {
            name: "Dr. Bhupendra Chaudhary",
            position: "Assistant Professor",
            specialization: "Plant Molecular Biology, Genetic Engineering, Genomics",
            email: "bhupendra.chaudhary@gbu.ac.in",
            achievements: "Ph.D: Plant Molecular Biology",
            image: "https://faculty.gbu.ac.in/uploads/photos/660535f24a586_bhupendra.jpg",
            color: "from-teal-500 to-teal-600",
        },
        {
            name: "Dr. Barkha Singhal",
            position: "Assistant Professor",
            specialization: "Environmental Microbiology, Bioremediation, Waste Management",
            email: "barkha.singhal@gbu.ac.in",
            achievements: "Ph.D: Microbiology",
            image: "https://faculty.gbu.ac.in/uploads/photos/6605368841650_barkha.jpg",
            color: "from-blue-500 to-blue-600",
        },
    ],
    facultyStats: {
        text: "Our department has 15+ experienced faculty members with expertise across all areas of biotechnology.",
        stats: [
            {
                icon: BookOpen,
                numberText: "200+",
                subtitle: "Research Papers",
                bg: "bg-green-50",
                color: "text-green-600",
            },
            {
                icon: Award,
                numberText: "15+",
                subtitle: "Awards",
                bg: "bg-emerald-50",
                color: "text-emerald-600",
            },
            {
                icon: GraduationCap,
                custom: "PhD",
                numberText: "100%",
                subtitle: "PhD Faculty",
                bg: "bg-teal-50",
                color: "text-teal-600",
            },
            {
                icon: GraduationCap,
                custom: "Exp",
                numberText: "12+",
                subtitle: "Avg Experience",
                bg: "bg-blue-50",
                color: "text-blue-600",
            },
        ],
    },
    researchStats: null,
    topAchievers: null,
    achievements: null,
};
