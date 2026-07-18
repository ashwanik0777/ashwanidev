import React, { useState } from 'react';
import { Linkedin, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const teamMembers = [
  {
    name: 'Dr. Shakti Sahi',
    position: 'Chief Technology Officer / Nodal Officer',
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
    linkedin: 'https://www.linkedin.com/in/dr-vinay-kumar-litoria',
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
  },
  {
    name: 'Mr. Rohit Sharma',
    position: 'Technical Support',
    linkedin: 'https://www.linkedin.com/in/rohit-sharma-tech',
    image: ''
  },
  {
    name: 'Ms. Ananya Singh',
    position: 'Research Coordinator',
    linkedin: 'https://www.linkedin.com/in/ananya-singh-research',
    image: ''
  }
];

export default function Team() {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (index) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Meet Our Team</h1>
        <div className="relative px-4 sm:px-12">
          {/* Custom Navigation Buttons (Outside Slider) */}
          <button className="swiper-prev-team absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 sm:p-2.5 shadow-md hover:bg-blue-50 hover:text-blue-600 text-gray-500 hover:border-blue-200 transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="swiper-next-team absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 rounded-full p-2 sm:p-2.5 shadow-md hover:bg-blue-50 hover:text-blue-600 text-gray-500 hover:border-blue-200 transition-all duration-200 focus:outline-none cursor-pointer disabled:opacity-30 disabled:pointer-events-none">
            <ChevronRight className="w-5 h-5" />
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: '.swiper-prev-team',
              nextEl: '.swiper-next-team',
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            className="pb-8"
          >
            {teamMembers.map((member, index) => {
              const hasRealImage = member.image && !imageErrors[index];

              return (
                <SwiperSlide key={index}>
                  <div className="bg-white mb-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center border border-gray-100 flex flex-col justify-between h-[300px]">
                    <div>
                      {hasRealImage ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-blue-100 shadow-sm"
                          onError={() => handleImageError(index)}
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 border-4 border-blue-100 flex items-center justify-center mx-auto mb-4 text-indigo-400 shadow-sm">
                          <User className="w-12 h-12" />
                        </div>
                      )}
                      <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-blue-600 font-medium mb-4 line-clamp-2 h-10 flex items-center justify-center">
                        {member.position}
                      </p>
                    </div>
                    <div className="flex justify-center mt-auto">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 p-2 rounded-full hover:bg-blue-100"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

