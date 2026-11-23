/**
 * Fallback faculty profile data used only during local development / testing
 * when the backend API is unreachable or when testing a demo ID.
 * Matches the schema of backend /faculty/:id/public responses.
 */
export const DEMO_FACULTY_PROFILES = {
  "SOICT-F0001": {
    id: "SOICT-F0001",
    name: "Dr. Gaurav Kumar",
    designation: "Assistant Professor",
    school: "School of Information & Communication Technology",
    department: "Department of Computer Science & Engineering",
    specialization: "Recommendation Systems, Machine Learning, Decision Support Systems, Sentiment Analysis, Cyber Scams",
    phone: "8586968801",
    email: "gaurav.kumar@gbu.ac.in",
    image_url: "/assets/Faculty/SOICT-F0001.jpg",
    shortBio: "Dr. Gaurav Kumar is an Assistant Professor in the Department of Computer Science & Engineering at Gautam Buddha University, Greater Noida. His research interests encompass Recommendation Systems, Machine Learning, Decision Support Systems, and Sentiment Analysis.",
    fullBio: "Dr. Gaurav Kumar is an Assistant Professor in the Department of Computer Science & Engineering at Gautam Buddha University, Greater Noida. His research interests encompass Recommendation Systems, Machine Learning, Decision Support Systems, and Sentiment Analysis. He has published research articles in indexed international journals and conferences.",
    researchAreas: [
      { title: "Recommendation Systems", description: "Hybrid collaborative filtering and context-aware recommendation algorithms." },
      { title: "Machine Learning", description: "Applied machine learning for decision support and predictive analytics." },
      { title: "Sentiment Analysis", description: "Natural language processing techniques for social media sentiment and scam detection." }
    ],
    tabData: {
      qualifications: {
        qualifications: [
          { degree: "Ph.D.", institution: "Gautam Buddha University", specialization: "Computer Science & Engineering", year: "2020", type: "doctorate" },
          { degree: "M.Tech.", institution: "Gautam Buddha University", specialization: "Computer Science & Engineering", year: "2014", type: "masters" }
        ],
        experience: [
          { position: "Assistant Professor", department: "Department of Computer Science & Engineering", institution: "Gautam Buddha University", from: "2017-02", to: "Present", type: "academic" }
        ]
      },
      publicationsCount: 6,
      talksCount: 3,
      projectsCount: 1,
      publications: {
        publications: [
          { title: "Hybrid Recommendation Algorithm for Personalized Learning", type: "journal", journalName: "Expert Systems with Applications", year: 2024 },
          { title: "Sentiment Analysis of Social Media Data for Scam Detection", type: "conference", conferenceName: "IEEE International Conference on Advanced Computing", year: 2023 },
          { title: "Decision Support Architecture in Cyber Scam Prevention", type: "journal", journalName: "Journal of Information Security", year: 2022 },
          { title: "Machine Learning Approaches in Educational Recommender Systems", type: "book chapter", bookTitle: "Advances in Intelligent Systems and Computing", year: 2021 }
        ]
      },
      talks: {
        invitedTalks: [
          { title: "AI-Driven Decision Support Systems", event: "National AI Symposium", date: "2024", venue: "New Delhi", type: "keynote" },
          { title: "Cyber Scam Prevention Mechanisms", event: "Cyber Security Workshop", date: "2023", venue: "GBU Campus", type: "invited" },
          { title: "Recent Trends in Machine Learning", event: "Faculty Development Programme", date: "2022", venue: "Greater Noida", type: "guest-lecture" }
        ]
      }
    }
  }
};

export const getDevFallbackFaculty = (id) => {
  if (!id) return DEMO_FACULTY_PROFILES["SOICT-F0001"];
  const upper = String(id).toUpperCase();
  return DEMO_FACULTY_PROFILES[upper] || DEMO_FACULTY_PROFILES["SOICT-F0001"];
};
