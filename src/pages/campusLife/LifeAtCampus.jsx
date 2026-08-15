import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Trophy, 
  Sparkles, 
  Bed, 
  Users, 
  Utensils, 
  ShoppingBag, 
  Building, 
  HeartPulse, 
  Heart, 
  Footprints, 
  Compass,
  ArrowRight,
  Sun
} from 'lucide-react';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const CAMPUS_LIFE_HUB_ITEMS = [
  {
    title: "Sports Facilities",
    subtitle: "Indoor Arena, Stadiums & Courts",
    image: "https://www.gbu.ac.in/Content/clubs/img/sportsimg.JPG",
    link: "/campus-life/sports-fitness",
    icon: Trophy,
    badge: "Olympic Standard",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Meditation Center",
    subtitle: "Mahatma Jyotiba Phule Dhyana Kendra",
    image: "https://www.gbu.ac.in/Content/clubs/img/buddha25.jpg",
    link: "/campus-life/meditation-center",
    icon: Sun,
    badge: "Peace & Silence",
    color: "from-amber-600 to-orange-600"
  },
  {
    title: "Student Accommodation",
    subtitle: "Single-Occupancy Hostels & Mess",
    image: "https://www.gbu.ac.in/Content/clubs/img/hostel.jpg",
    link: "/campus-life/hostel-facilities",
    icon: Bed,
    badge: "18+ Hostels",
    color: "from-teal-600 to-emerald-600"
  },
  {
    title: "Clubs & Societies",
    subtitle: "Student-Led Creative Communities",
    image: "https://www.gbu.ac.in/Content/clubs/img/clubs.jpg",
    link: "/campus-life/clubs-societies",
    icon: Users,
    badge: "Vibrant Life",
    color: "from-purple-600 to-pink-600"
  },
  {
    title: "Cultural Activities",
    subtitle: "Festivals, Music & Performing Arts",
    image: "https://www.gbu.ac.in/Content/clubs/img/buddha25.jpg",
    link: "/campus-life/sports-fitness",
    icon: Sparkles,
    badge: "Annual Fests",
    color: "from-rose-600 to-red-600"
  },
  {
    title: "Shopping Complex",
    subtitle: "Essential Goods, Cafes & Stationery",
    image: "https://www.gbu.ac.in/Content/clubs/img/shoppingcomplex.jpg",
    link: "#cafes-food",
    icon: ShoppingBag,
    badge: "On-Campus Stores",
    color: "from-sky-600 to-cyan-600"
  },
  {
    title: "Auditorium Complex",
    subtitle: "Vast Halls for Events & Conventions",
    image: "https://www.gbu.ac.in/Content/clubs/img/auditorium.jpg",
    link: "#campus-tour",
    icon: Building,
    badge: "3000+ Seating",
    color: "from-indigo-600 to-violet-600"
  },
  {
    title: "University Dispensary",
    subtitle: "24/7 Medical Care & Ambulance Support",
    image: "https://www.gbu.ac.in/Content/clubs/img/dispensary.jpg",
    link: "#home",
    icon: HeartPulse,
    badge: "24x7 Health Care",
    color: "from-emerald-600 to-green-600"
  }
];

const FEATURED_HIGHLIGHTS = [
  {
    id: "dining-services",
    title: "Dining Services",
    tagline: "Nutritious Meals & Variety On Campus",
    description: "Feast on fresh, nutritious food, or grab a quick snack on campus! In addition to our buffet-style hostel dining halls, explore our Grand Street Cafe, Central Shopping Complex food court, Nescafé academic kiosks, Revive Juice & Shake bars, and specialized campus cafeterias. You will eat well at GBU!",
    image: "https://www.gbu.ac.in/Content/clubs/img/canteen.jpeg",
    badge: "Fresh & Vegetarian",
    icon: Utensils,
    color: "text-amber-600 bg-amber-50 border-amber-100"
  },
  {
    id: "grand-walk",
    title: "Evening Out @ Grand Walk",
    tagline: "Lush Green Walkways & Wellness",
    description: "The cardiovascular benefits of walking are biologically plausible — like other forms of regular moderate exercise, walking improves cardiac risk factors, mental clarity, and overall physical vitality. Enjoy quiet, tree-lined avenues across our 511-acre green sanctuary as sunset falls over campus.",
    image: "https://www.gbu.ac.in/Content/clubs/img/eveningout1.jpg",
    badge: "Eco Promenade",
    icon: Footprints,
    color: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    id: "dhyana-kendra",
    title: "Meditation Center @ GBU",
    tagline: "Mahatma Jyotiba Phule Dhyana Kendra",
    description: "In addition to curricular inputs, the university provides facilities to guide and shape character. Inspired by stupa architecture, Mahatma Jyotiba Phule Dhyana Kendra is a retreat centre giving students an experience of inner silence, positive values, stress-free living, and self-management.",
    image: "https://www.gbu.ac.in/Content/clubs/img/meditationcenternight2.jpg",
    badge: "Architectural Marvel",
    icon: Compass,
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    id: "shanti-sarowar",
    title: "Meet at Shanti Sarowar",
    tagline: "Oasis of Spiritual Recharge & Peace",
    description: "An oasis of peace in the happening life at GBU, Shanti Sarovar is a perfect place to relax, refresh, and recharge the soul. As an academy for higher learning of values and spiritual skills, it conducts retreats, seminars, and experiential workshops throughout the academic year.",
    image: "https://www.gbu.ac.in/Content/clubs/img/4.jpg",
    badge: "Serene Water Body",
    icon: Heart,
    color: "text-purple-600 bg-purple-50 border-purple-100"
  }
];

const LifeAtCampus = () => {
  return (
    <SearchableWrapper>
      <section id="life-at-gbu" className="py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden font-sans text-left">
        {/* Decorative ambient background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
          


          {/* Life At Campus Grid (8 Key Facilities) */}
          <div className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Explore Campus Ecosystem</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CAMPUS_LIFE_HUB_ITEMS.map((item, idx) => {
                const IconComponent = item.icon;
                const isExternal = item.link.startsWith('#');
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white rounded-2xl border border-slate-200/70 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                  >
                    <div>
                      <div className="h-44 relative overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "/assets/completegbu.webp";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <h4 className="font-extrabold text-base leading-tight drop-shadow-md">{item.title}</h4>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      {isExternal ? (
                        <a
                          href={item.link}
                          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-bold text-xs transition-colors duration-300 border border-slate-100"
                        >
                          <span>Explore Feature</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <Link
                          to={item.link}
                          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 group-hover:bg-blue-600 text-slate-700 group-hover:text-white font-bold text-xs transition-colors duration-300 border border-slate-100"
                        >
                          <span>Explore Feature</span>
                          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Featured Campus Highlights (Deep Dives) */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Special Campus Experiences</h3>
            </div>

            <div className="space-y-12">
              {FEATURED_HIGHLIGHTS.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 0;

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md ${
                      !isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Image Column */}
                    <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-102"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/assets/completegbu.webp";
                          }}
                        />
                      </div>
                    </div>

                    {/* Content Column */}
                    <div className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-950 mb-4 tracking-tight">
                        {item.title}
                      </h4>

                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal mb-6">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </SearchableWrapper>
  );
};

export default LifeAtCampus;
