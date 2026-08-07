import React from 'react';
import { motion } from "framer-motion";
import Meditation from '../../../assets/Meditation.jpeg';
import SearchableWrapper from '../../../components/Searchbar/SearchableWrapper';

export default function Services() {
  const content = [
    {
      title: 'Library',
      description: "Bodhisattva Dr. B.R.Ambedkar Library is the heart of academic and research activities of the Gautam Buddha University. It has been catering to the needs of faculty members, research scholars, and students on campus effectively.",
      image: 'https://library.gbu.ac.in/img/Artboard%201library1.jpg',
    },
    {
      title: 'Meditation Centre',
      description: 'The centre is looking forward to organize seminars, lectures and experiential workshops in meditation, positive values, stress free living and self management.',
      image: Meditation,
    },
    {
      title: 'Central Computer Center',
      description: 'The Central Computer Center of Gautam Buddha University is a central facility that caters the IT needs of the University and provides access to internet resources as well as telecommunication facilities. ',
      image: 'https://www.gbu.ac.in/Content/gbudata/ccc/assets/img/banner3.jpg',
    },
  ];

  return (
    <SearchableWrapper>
      <section className="bg-white py-24 px-4 sm:px-10 md:px-20 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Our Services
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
            <p className="mt-6 text-slate-600 max-w-2xl mx-auto text-lg">
              Providing state-of-the-art facilities and support systems to nurture innovation and drive research excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-all z-10 duration-300"></div>
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </SearchableWrapper>
  );
}
