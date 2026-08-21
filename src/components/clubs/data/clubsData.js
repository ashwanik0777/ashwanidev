import tcclogo from "../../../assets/tcclogo.png";
import musiclogo from "../../../assets/musiclogo.png";

export const clubsData = [
  {
    id: 'qalakriti-dramatics',
    name: 'Qalakriti (Dishayan) – Dramatics Club',
    tagline: 'Theatrical Expression, Stagecraft & Street Plays',
    category: 'Cultural',
    logo: tcclogo,
    banner: 'https://www.gbu.ac.in/Content/img/club/techno.jpg',
    memberCount: 220,
    description: 'Qalakriti (Dishayan) is the premier dramatics society of Gautam Buddha University, fostering theatrical expression, stage productions, street plays (Nukkad Natak), scriptwriting, and national drama festival participation.',
    objectives: [
      'Nurture acting talent, stagecraft, and scriptwriting skills',
      'Perform social awareness street plays across North India',
      'Organize annual theatrical productions during Abhivyanjana',
      'Represent GBU in inter-university drama competitions'
    ],
    history: 'Founded under the Cultural Council as one of GBU’s earliest societies, Qalakriti has won multiple awards at national theater festivals for impactful stage plays and socially relevant Nukkad Natak performances.',
    achievements: [
      '1st Rank in Inter-University Nukkad Natak Championship',
      'Staged 30+ major theater productions in campus auditoriums',
      'Hosted annual drama workshops with NSD guest alumni'
    ],
    policies: {
      codeOfConduct: [
        'Uphold artistic integrity and respect team members',
        'Maintain discipline during rehearsals and stage calls'
      ],
      eligibility: ['Open to all GBU students passionate about theater and acting'],
      responsibilities: ['Secretary: Production management and rehearsal scheduling'],
      meetingFrequency: 'Rehearsals 4 days a week at Main Auditorium Complex'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Manmohan Singh Shishodia', role: 'Faculty Advisor', department: 'Student Affairs' },
      president: { name: 'Aarav Sharma', role: 'Club Head', department: 'SOE, 4th Year' }
    },
    events: [
      { id: 'q1', title: 'Nukkad Natak Street Fest', date: 'Annual Fest', description: 'Social awareness street play performance across campus grounds.' }
    ]
  },
  {
    id: 'swaranjali-music',
    name: 'Swaranjali – Music Club',
    tagline: 'Melodic Harmonies & Classical Rhythms',
    category: 'Cultural',
    logo: musiclogo,
    banner: 'https://www.gbu.ac.in/Content/clubs/img/music/music1.jpg',
    memberCount: 180,
    description: 'Swaranjali brings together vocalists, instrumentalists, and university bands to celebrate Indian classical, semi-classical, western fusion, and choir performances.',
    objectives: [
      'Provide professional vocal and instrumental practice opportunities',
      'Form student music bands and acoustic ensembles',
      'Perform live music during major university functions & Abhivyanjana'
    ],
    history: 'Swaranjali has been the musical voice of GBU since inception, training budding singers and hosting musical jam sessions in campus open-air theaters.',
    achievements: [
      'Best Vocal Ensemble award at Regional Youth Fest',
      'Composed official GBU university anthem renditions',
      'Organized 20+ acoustic jam nights and musical evenings'
    ],
    policies: {
      codeOfConduct: ['Respect all musical genres and instruments'],
      eligibility: ['Open to all vocalists and instrumentalists'],
      responsibilities: ['Band Lead: Arranging musical pieces and rehearsals'],
      meetingFrequency: 'Weekly music sessions in Cultural Center'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Nidhi Singh', role: 'Faculty Advisor', department: 'Humanities' },
      president: { name: 'Rohan Mehra', role: 'President', department: 'USICT, 3rd Year' }
    },
    events: [
      { id: 's1', title: 'Swar Sandhya Musical Night', date: 'Semester Event', description: 'Live classical & rock music concert by student bands.' }
    ]
  },
  {
    id: 'nrityangana-dance',
    name: 'Nrityangana – Dance Club',
    tagline: 'Rhythm, Grace & Expression in Motion',
    category: 'Cultural',
    logo: tcclogo,
    banner: 'https://www.gbu.ac.in/Content/clubs/img/buddha25.jpg',
    memberCount: 195,
    description: 'Nrityangana is GBU’s official dance society, specializing in classical Kathak/Bharatanatyam, hip-hop, contemporary, Bollywood fusion, and folk dance forms.',
    objectives: [
      'Train dancers in diverse choreographic styles',
      'Represent GBU in inter-college dance face-offs and national fests',
      'Promote cultural folk heritage through group dance productions'
    ],
    history: 'Known for high-energy stage performances, Nrityangana regularly mesmerizes audiences at Abhivyanjana and state cultural showcases.',
    achievements: [
      'Winners of Inter-University Group Dance Competition',
      'Choreographed grand inaugural dance performances for GBU Convocation'
    ],
    policies: {
      codeOfConduct: ['Maintain dedication and teamwork during group dance practices'],
      eligibility: ['Open to all students interested in dance and rhythm'],
      responsibilities: ['Choreographer Lead: Group formations and dance routines'],
      meetingFrequency: 'Practice sessions 3 days a week at Sports Complex Dance Studio'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Sumitra Huidrom', role: 'Faculty Advisor', department: 'SoVS' },
      president: { name: 'Ananya Verma', role: 'Dance President', department: 'SOM, 3rd Year' }
    },
    events: [
      { id: 'nd1', title: 'Footloose Dance Battle', date: 'Abhivyanjana Fest', description: 'Solo, dual, and group dance competitions.' }
    ]
  },
  {
    id: 'drishtikon-debate',
    name: 'Drishtikon – Debating Society',
    tagline: 'Voice, Vision & Critical Thought',
    category: 'Literary',
    logo: tcclogo,
    banner: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800',
    memberCount: 140,
    description: 'Drishtikon is the premier debating body of GBU fostering parliamentary debate formats, Model United Nations (MUN), declamation, and articulate public speaking.',
    objectives: [
      'Develop sharp analytical thinking, rhetoric, and public speaking skills',
      'Host GBU Model United Nations (GBUMUN) conferences',
      'Organize parliamentary debates on national & global socio-economic issues'
    ],
    history: 'Drishtikon delegates have consistently won Best Parliamentarian and Best Delegate awards at national Model UNs across India.',
    achievements: [
      'Hosted GBU Model UN with 400+ delegates from 50+ universities',
      'Won Best Delegation at National Parliamentary Debate'
    ],
    policies: {
      codeOfConduct: ['Uphold respectful discourse and parliamentary etiquette'],
      eligibility: ['Open to all students interested in public speaking and debates'],
      responsibilities: ['President: MUN Secretariat & Debate League Coordination'],
      meetingFrequency: 'Weekly debate sessions every Thursday'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Om Prakash', role: 'Faculty Advisor', department: 'Humanities' },
      president: { name: 'Kabir Das', role: 'President', department: 'SOLJG, 4th Year' }
    },
    events: [
      { id: 'dr1', title: 'GBU Model United Nations', date: 'Annual Event', description: 'Simulated UN committees debating global diplomacy.' }
    ]
  },
  {
    id: 'chitrakala-art',
    name: 'Chitrakala – Fine Arts & Painting Club',
    tagline: 'Brushing Dreams onto Canvas',
    category: 'Cultural',
    logo: tcclogo,
    banner: 'https://content.jdmagicbox.com/comp/jabalpur/u8/9999px761.x761.191120000131.a8u8/catalogue/chitrakala-fine-arts-academy-wright-town-jabalpur-painting-classes-xp1zmlta47.jpg',
    memberCount: 160,
    description: 'Chitrakala is GBU’s fine arts and painting society encouraging sketching, oil & acrylic painting, rangoli, wall murals, poster design, and digital art exhibitions.',
    objectives: [
      'Promote visual arts and creative aesthetic expression across campus',
      'Beautify campus spaces through eco-friendly wall art murals',
      'Organize art exhibitions and live painting contests'
    ],
    history: 'Chitrakala artists are responsible for creating stunning campus murals and decorating major university fests with hand-crafted installations.',
    achievements: [
      'Created 10+ large-scale eco-art murals on GBU academic walls',
      'Organized annual Art-O-Mania exhibition during Abhivyanjana'
    ],
    policies: {
      codeOfConduct: ['Respect original art and encourage budding creators'],
      eligibility: ['Open to all art and design enthusiasts'],
      responsibilities: ['Art Lead: Gallery curation and event installations'],
      meetingFrequency: 'Bi-weekly creative workshops'
    },
    team: {
      facultyCoordinator: { name: 'Prof. Kavita Mehta', role: 'Faculty Advisor', department: 'Fine Arts' },
      president: { name: 'Isha Saxena', role: 'Art Head', department: 'SOE, 3rd Year' }
    },
    events: [
      { id: 'ck1', title: 'Art-O-Mania Live Canvas', date: 'Annual Exhibition', description: 'Live painting and art gallery showcase.' }
    ]
  },
  {
    id: 'mirage-society',
    name: 'Mirage (Pradarsh) – Audio Visual Education Club',
    tagline: 'Capturing Moments, Telling Stories',
    category: 'Media',
    logo: musiclogo,
    banner: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    memberCount: 110,
    description: 'The official audio-visual and media team of GBU (Pradarsh), dedicated to photography, videography, short filmmaking, and visual event coverage.',
    objectives: [
      'Document major university events through photography & videography',
      'Produce creative visual content, interviews, and short films',
      'Teach camera operation, lighting, and video editing to students'
    ],
    history: 'Founded to chronicle campus life through a lens, Mirage has evolved into GBU’s trusted media body for official coverage and creative narratives.',
    achievements: [
      'Organized "Art of Light" photo exhibition under Abhivyanjana',
      'Covered 100+ university events with professional photo archives',
      'Produced short documentaries on campus life'
    ],
    policies: {
      codeOfConduct: ['Ensure professionalism and ethical media coverage'],
      eligibility: ['Students interested in media, photography, and video editing'],
      responsibilities: ['Secretary: Team coordination and video production'],
      meetingFrequency: 'Production meetings aligned with campus events'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Ritika Joshi', role: 'Faculty Advisor', department: 'Mass Communication' },
      president: { name: 'Siddharth Roy', role: 'General Secretary', department: 'SOE, 4th Year' }
    },
    events: [
      { id: 'mr1', title: 'Art of Light Photo Exhibition', date: 'Abhivyanjana Fest', description: 'Photography exhibition showcasing lighting and camera techniques.' }
    ]
  },
  {
    id: 'literary-club-arhant',
    name: 'Arhant – Literary Club',
    tagline: 'Where Words Come Alive',
    category: 'Literary',
    logo: musiclogo,
    banner: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800',
    memberCount: 135,
    description: 'Arhant is GBU’s literary society fostering creative writing, book reviews, poetry recitations (Kavi Sammelan), open-mics, and literary magazines.',
    objectives: [
      'Promote love for literature, reading, and creative writing',
      'Provide open-mic platforms for aspiring poets and writers',
      'Publish annual campus literary anthologies and newsletters'
    ],
    history: 'Arhant hosts popular signature events like "Spell Nerd" and "Kavya Sangam", bringing literary enthusiasts together.',
    achievements: [
      'Organized Spell Nerd vocabulary contest & Kavya Sangam open-mic',
      'Published student poetry collections'
    ],
    policies: {
      codeOfConduct: ['Promote creative freedom and avoid plagiarism'],
      eligibility: ['Open to all literature enthusiasts'],
      responsibilities: ['Secretary: Managing editorial board & events'],
      meetingFrequency: 'Weekly literary meetups every Wednesday'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Bipasha Som Gune', role: 'Faculty Advisor', department: 'Humanities' },
      president: { name: 'Mohd. Shoaib Khan', role: 'General Secretary', department: 'SOE, 4th Year' }
    },
    events: [
      { id: 'lh1', title: 'Kavya Sangam Open-Mic', date: 'Semester Event', description: 'Poetry recitation and spoken word performance.' }
    ]
  },
  {
    id: 'techno-cultural-club',
    name: 'Techno-Cultural Club (TCC)',
    tagline: 'Innovating at the Intersection of Tech & Art',
    category: 'Technical',
    logo: tcclogo,
    banner: 'https://www.gbu.ac.in/Content/img/club/techno.jpg',
    memberCount: 310,
    description: 'The Techno-Cultural Club bridges digital technology and creative expression through hackathons, open-source coding, robotics, web development, and tech fests.',
    objectives: [
      'Foster coding culture, open-source contribution, and AI/ML projects',
      'Conduct hands-on technical workshops and university hackathons',
      'Build digital utility applications for the campus community'
    ],
    history: 'TCC has grown into one of GBU’s largest technical societies, conducting annual hackathons and building real-world student projects.',
    achievements: [
      'Organized 24-Hour Hackathon with ₹1,00,000+ prize pool',
      'Built open-source campus web applications and student portals'
    ],
    policies: {
      codeOfConduct: ['Promote collaborative coding and ethical development practices'],
      eligibility: ['Open to all branches and skill levels'],
      responsibilities: ['Tech Lead: Managing dev sprints and workshops'],
      meetingFrequency: 'Weekly tech huddles every Friday'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Nagendra Singh', role: 'Faculty Advisor', department: 'USICT' },
      president: { name: 'Utkarsh Srivastava', role: 'President', department: 'USICT, 4th Year' }
    },
    events: [
      { id: 'tcc1', title: 'HackGBU 24-Hour Hackathon', date: 'Annual Event', description: '24-hour hackathon for building smart campus software & hardware.' }
    ]
  },
  {
    id: 'nature-club-gbu',
    name: "Trisha – Nature's Club",
    tagline: 'Living in Harmony with Nature',
    category: 'Environmental',
    logo: tcclogo,
    banner: 'https://www.gbu.ac.in/Content/img/club/nature.jpg',
    memberCount: 150,
    description: 'Trisha is the environmental conservation club of Gautam Buddha University devoted to green initiatives, campus biodiversity drives, tree plantations, and eco-sustainability.',
    objectives: [
      'Promote campus tree plantation and botanical conservation',
      'Organize plastic reduction drives and waste recycling awareness',
      'Conduct nature photography and eco-crafting workshops'
    ],
    history: 'Trisha operates under the School of Environmental Sciences, driving GBU’s green campus sustainability initiatives.',
    achievements: [
      'Planted 1,000+ native saplings across university campus',
      'Organized Nature Photography & Eco-Crafting Contests'
    ],
    policies: {
      codeOfConduct: ['Commitment to environmental preservation and eco-responsibility'],
      eligibility: ['Open to all eco-conscious GBU students'],
      responsibilities: ['General Secretary: Eco-drive planning'],
      meetingFrequency: 'Bi-weekly green drives'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Nirmita Mehrotra', role: 'Faculty Advisor', department: 'Environmental Sciences' },
      president: { name: 'Arnav Sharma', role: 'General Secretary', department: 'SOES, 4th Year' }
    },
    events: [
      { id: 'nc1', title: 'Campus Plantation Drive', date: 'Monsoon Drive', description: 'Mass tree plantation drive across GBU campus.' }
    ]
  },
  {
    id: 'yoga-meditation-club',
    name: 'Yoga & Meditation Club',
    tagline: 'Find Balance, Breathe Peace',
    category: 'Wellness',
    logo: tcclogo,
    banner: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800',
    memberCount: 175,
    description: 'The Yoga and Meditation Club provides a tranquil sanctuary for students to practice pranayama, mindfulness, stress relief, and holistic well-being.',
    objectives: [
      'Promote physical fitness, mental health, and emotional resilience',
      'Conduct daily guided yoga sessions and meditation circles',
      'Host International Yoga Day celebrations on campus'
    ],
    history: 'Dedicated to holistic health, the club conducts regular sessions at the university Meditation Center.',
    achievements: [
      'Organized campus-wide International Yoga Day sessions',
      'Conducted pre-examination stress management workshops'
    ],
    policies: {
      codeOfConduct: ['Maintain silence, discipline, and respect during meditation sessions'],
      eligibility: ['Open to all GBU students and faculty'],
      responsibilities: ['Yoga Instructor Lead: Session guidance'],
      meetingFrequency: 'Daily morning sessions at Meditation Hall'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Jitendra Rathore', role: 'Faculty Advisor', department: 'Buddhist Studies' },
      president: { name: 'Anupam Tiwari', role: 'Secretary', department: 'SOVS, 3rd Year' }
    },
    events: [
      { id: 'ym1', title: 'International Yoga Day Celebration', date: 'June 21', description: 'Mass yoga session at Meditation Complex.' }
    ]
  },
  {
    id: 'adventure-sports-club',
    name: 'Adventure & Outdoor Club',
    tagline: 'Thrill, Fitness & Outdoor Exploration',
    category: 'Sports',
    logo: tcclogo,
    banner: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800',
    memberCount: 130,
    description: 'The Adventure Club organizes outdoor trekking, camping trips, wall climbing, obstacle runs, and fitness expeditions for GBU students.',
    objectives: [
      'Promote outdoor fitness, endurance, and team leadership',
      'Organize Himalayan treks, cycling expeditions, and camping trips'
    ],
    history: 'Operates in collaboration with the Eklavya Sports Complex, organizing annual trekking expeditions.',
    achievements: [
      'Organized 5+ Himalayan high-altitude student treks',
      'Hosted annual campus obstacle adventure race'
    ],
    policies: {
      codeOfConduct: ['Strict adherence to safety guidelines during outdoor trips'],
      eligibility: ['Open to all physically fit students'],
      responsibilities: ['Trip Lead: Safety checks and itinerary planning'],
      meetingFrequency: 'Monthly outdoor expeditions'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Rajneesh Kumar', role: 'Faculty Advisor', department: 'Sports Officer' },
      president: { name: 'Vikas Singh', role: 'Club Head', department: 'SOE, 4th Year' }
    },
    events: [
      { id: 'ac1', title: 'Campus Obstacle Race', date: 'Shauryotsav', description: 'Adventure obstacle course run at Eklavya Complex.' }
    ]
  },
  {
    id: 'social-service-club',
    name: 'Social Service & Community Club',
    tagline: 'Serving Humanity with Empathy',
    category: 'Social',
    logo: tcclogo,
    banner: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800',
    memberCount: 200,
    description: 'Dedicated to community outreach, blood donation drives, underprivileged child education, and relief material distribution in local villages.',
    objectives: [
      'Conduct free literacy evening classes for worker children',
      'Organize semester blood donation camps with Rotary & Red Cross'
    ],
    history: 'Active in adopting surrounding villages for hygiene, digital literacy, and women empowerment workshops.',
    achievements: [
      'Collected 500+ units of blood in annual donation drives',
      'Teaching 100+ children daily through campus remedial classes'
    ],
    policies: {
      codeOfConduct: ['Empathy, humility, and selfless service'],
      eligibility: ['Open to all compassionate GBU volunteers'],
      responsibilities: ['Volunteering Coordinator: Field activity management'],
      meetingFrequency: 'Weekly evening classes & monthly outreach'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Priyadarshini', role: 'Faculty Advisor', department: 'Social Work' },
      president: { name: 'Neha Rani', role: 'President', department: 'HSS, 3rd Year' }
    },
    events: [
      { id: 'ss1', title: 'Mega Blood Donation Camp', date: 'Annual Drive', description: 'Blood donation camp in collaboration with Red Cross.' }
    ]
  },
  {
    id: 'vox-pop-media',
    name: 'Vox Pop – Photography & Media Club',
    tagline: 'The Campus Pulse & Visual Media',
    category: 'Media',
    logo: tcclogo,
    banner: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800',
    memberCount: 125,
    description: 'Vox Pop captures the pulse of GBU through student video interviews, event photojournalism, social media reels, and visual stories.',
    objectives: [
      'Create engaging student reels, event highlights, and photo stories',
      'Conduct photography contests and social media storytelling'
    ],
    history: 'Famous for creating viral campus reels, Vox Pop keeps GBU connected across social platforms.',
    achievements: [
      'Covered Abhivyanjana & Shauryotsav with live video highlights',
      'Over 1M+ total views on campus event reels'
    ],
    policies: {
      codeOfConduct: ['Creative accuracy and respect for interviewee privacy'],
      eligibility: ['Open to all photography & video editing enthusiasts'],
      responsibilities: ['Media Lead: Content curation & editing'],
      meetingFrequency: 'Weekly media editing huddles'
    },
    team: {
      facultyCoordinator: { name: 'Dr. Vivek Kumar', role: 'Faculty Advisor', department: 'Mass Comm' },
      president: { name: 'Sameer Khan', role: 'Lead Editor', department: 'USICT, 3rd Year' }
    },
    events: [
      { id: 'vp1', title: 'Campus Lens Photography Contest', date: 'Semester Event', description: 'Photography competition showcasing campus architecture & life.' }
    ]
  }
];
