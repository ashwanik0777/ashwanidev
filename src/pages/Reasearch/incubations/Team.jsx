import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, ChevronLeft, ChevronRight, User } from "lucide-react";

import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";

const teamMembers = [
  {
    name: 'Dr. Shakti Sahi',
    position: 'Chief Technology Officer',
    linkedin: 'https://www.linkedin.com/in/shakti-sahi-32255a9/',
    image: 'https://www.gburif.org/mentors/shakti_sahi_edit.jpg'
  },
  {
    name: 'Dr. Satish K Mittal',
    position: 'Chief Operations Officer',
    linkedin: 'https://www.linkedin.com/in/drsatishkmittal/',
    image: 'https://www.gburif.org/mentors/satish_mittal.jpg'
  },
  {
    name: 'Dr. Vinay Kumar Litoria',
    position: 'Nodal Officer',
    linkedin: 'https://www.linkedin.com/in/vinay-kumar-litoria/',
    image: 'https://summit.careerguide.com/wp-content/uploads/2022/06/vinay-litoria.jpeg'
  },
  {
    name: 'Mr. Raj Kumar',
    position: 'Manager',
    linkedin: 'https://www.linkedin.com/in/raj-kumar-manager',
    image: 'https://gburif.org/mentors/raj_kumar_edit.jpg'
  },
  {
    name: 'Mr. Manish Bhardwaj',
    position: 'Office Assistant',
    linkedin: 'https://www.linkedin.com/in/manish-bhardwaj-office',
    image: ''
  },
  {
    name: 'Mr. Shekhar Chandra',
    position: 'Office Attendant',
    linkedin: 'https://www.linkedin.com/in/shekhar-chandra-attendant',
    image: ''
  }
];

const repeatedTeam = [...teamMembers, ...teamMembers];

export default function TeamSlider() {
  const [x, setX] = useState(0);
  const cardWidth = 260; // Slightly larger cards for premium look
  const gap = 32;
  const moveBy = cardWidth + gap;
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setX((prevX) => {
      const nextX = prevX - moveBy;
      const maxOffset = -moveBy * teamMembers.length;
      return nextX <= maxOffset ? 0 : nextX;
    });
  };

  const handlePrev = () => {
    setX((prevX) => {
      const maxOffset = -moveBy * (teamMembers.length - 1);
      const nextX = prevX + moveBy;
      return nextX > 0 ? maxOffset : nextX;
    });
  };

  return (
    <SearchableWrapper>
      <section className="py-24 bg-white border-t border-gray-100 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Meet Our Team
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-6"></div>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            The visionary minds driving innovation at the Incubation Center
          </p>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 overflow-hidden">
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-3 shadow-md hover:shadow-lg hover:bg-slate-50 transition-all text-slate-700"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 rounded-full p-3 shadow-md hover:shadow-lg hover:bg-slate-50 transition-all text-slate-700"
          >
            <ChevronRight size={24} />
          </button>

          <motion.div
            animate={{ x }}
            transition={{ ease: "easeInOut", duration: 0.7 }}
            className="flex px-12 py-4"
            style={{ width: `${repeatedTeam.length * moveBy}px`, gap: `${gap}px` }}
          >
            {repeatedTeam.map((member, index) => (
              <div
                key={index}
                style={{ width: cardWidth }}
                className="flex-shrink-0 group bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-md relative bg-slate-200 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <div className={`absolute inset-0 flex items-center justify-center bg-slate-200 ${member.image ? 'hidden' : ''}`}>
                    <User className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                
                <h3 className="font-bold text-lg text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-4">{member.position}</p>
                
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-200 text-slate-600 hover:bg-indigo-600 hover:text-white transition-colors duration-300"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </SearchableWrapper>
  );
}
