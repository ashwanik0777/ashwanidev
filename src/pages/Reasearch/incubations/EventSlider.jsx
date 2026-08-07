import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import ButtonGroup from "../../../components/TabsData.jsx";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper.jsx";

const categories = ["All", "Workshops", "Seminars", "Hackathons"];

const events = [
  {
    title: "STUDENTS VISIT WORKSHOPS",
    date: "March 15, 2024",
    image: "https://www.gburif.org/event/students.jpeg",
    images: ["https://www.gburif.org/event/students.jpeg"],
    description: "Students from various departments visited industry workshops to explore practical applications and innovations.",
    detailedDescription: "Students from various departments participated in guided visits to multiple industrial workshops. They learned about real-world processes, observed live demonstrations, and interacted with experts to understand the latest technologies shaping the industry.",
    category: "Workshops",
  },
  {
    title: "TECH INNOVATION FAIR",
    date: "April 2, 2024",
    image: "https://youthincmag.com/wp-content/uploads/2022/12/IMG_20200105_151513-scaled.jpg",
    images: ["https://www.gburif.org/event/innovation.jpeg"],
    description: "Showcase of student-led innovations with live prototypes and demos.",
    detailedDescription: "Over 50 projects ranging from IoT devices to sustainable energy solutions were showcased by students.",
    category: "Seminars",
  },
  {
    title: "WOMEN IN TECH SEMINAR",
    date: "April 28, 2024",
    image: "https://media.kasperskydaily.com/wp-content/uploads/sites/85/2021/03/19103746/womens-history-month.jpg",
    images: ["https://media.kasperskydaily.com/wp-content/uploads/sites/85/2021/03/19103746/womens-history-month.jpg"],
    description: "Celebrating women innovators through talks and mentorship.",
    detailedDescription: "Women leaders from academia and industry inspired participants through panel discussions, networking and interactive sessions.",
    category: "Seminars",
  },
  {
    title: "AI & ROBOTICS WORKSHOP",
    date: "May 10, 2024",
    image: "https://gburif.org/Photo%20Gallery/img/img-42.jpg",
    images: ["https://www.gburif.org/event/robotics.jpeg"],
    description: "Hands-on with robots and AI models.",
    detailedDescription: "Participants programmed robots to perform tasks and explored machine learning applications in real-world scenarios.",
    category: "Workshops",
  },
  {
    title: "CAMPUS HACKATHON 2024",
    date: "June 5, 2024",
    image: "https://gburif.org/event/trade%20show.jpeg",
    images: ["https://www.gburif.org/event/hackathon.jpeg"],
    description: "24-hour coding competition attracting teams from across India.",
    detailedDescription: "More than 300 students competed to solve real-world challenges under tight deadlines. The hackathon concluded with demos and prize distribution.",
    category: "Hackathons",
  },
  {
    title: "STARTUP PITCH DAY",
    date: "June 20, 2024",
    image: "https://gburif.org/Photo%20Gallery/img/img-5.jpg",
    images: ["https://www.gburif.org/event/startup.jpeg"],
    description: "Incubated startups pitched ideas to investors.",
    detailedDescription: "Early-stage startups showcased their progress and received valuable feedback from industry experts and potential investors.",
    category: "Seminars",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" },
  }),
};

export default function EventsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const categoryButtons = categories.map((cat) => ({
    id: cat,
    label: cat,
  }));

  return (
    <SearchableWrapper>
      <div className="min-h-screen bg-white py-24 px-4 sm:px-10 md:px-20 border-t border-gray-100 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Events & News
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-8"></div>
            
            <ButtonGroup
              tabs={categoryButtons}
              activeTab={selectedCategory}
              setActiveTab={setSelectedCategory}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.title}
                  custom={index}
                  layout
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  variants={cardVariants}
                  onClick={() => setSelectedEvent(event)}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 overflow-hidden cursor-pointer transition-all duration-300 flex flex-col"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'; }}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transform transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-600 shadow-sm flex items-center gap-1.5">
                      <Calendar size={14} />
                      {event.date}
                    </div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <span className="text-xs font-bold tracking-wider text-slate-400 uppercase mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                      {event.description}
                    </p>
                    <span className="text-indigo-600 font-medium text-sm inline-flex items-center group-hover:underline">
                      Read more &rarr;
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredEvents.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-slate-500">No events found in this category.</p>
            </motion.div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
              >
                <div className="relative h-64 md:h-80 w-full shrink-0">
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800'; }}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur text-slate-900 p-2 rounded-full hover:bg-white hover:text-red-500 transition-colors shadow-sm"
                  >
                    <X size={24} />
                  </button>
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-sm flex items-center gap-2">
                      <Calendar size={16} /> {selectedEvent.date}
                    </span>
                    <span className="bg-white text-slate-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                      {selectedEvent.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 overflow-y-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                    {selectedEvent.title}
                  </h3>
                  <div className="prose prose-slate max-w-none">
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {selectedEvent.detailedDescription}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SearchableWrapper>
  );
}
