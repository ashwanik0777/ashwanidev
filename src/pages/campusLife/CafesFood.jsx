import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Utensils, Star, MapPin, Sparkles, Clock, X, ChefHat, User, Mail, MessageSquare } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_FOOD_CATEGORIES = [
  { title: "All Cafes", description: "All Outlets", icon: Utensils },
  { title: "Coffee & Tea", description: "Hot & Cold Brews", icon: Coffee },
  { title: "Quick Snacks", description: "Bites & Appetizers", icon: ChefHat },
  { title: "Full Meals", description: "Lunches & Dinners", icon: Utensils }
];

const GBU_FOOD_OUTLETS = [
  {
    id: 1,
    name: "Central Food Court (G.D. Market)",
    image: "/assets/guest_house_dining_1.jpg",
    description: "The multi-cuisine core hub of GBU. Features popular local food stalls, massive indoor seating, and student-friendly pricing.",
    rating: 4.5,
    review_count: 340,
    is_open: true,
    location: "G.D. Market Complex, GBU",
    price_range: "₹60 - ₹250",
    categories: ["Full Meals", "Quick Snacks"],
    menu: [
      { section: "Main Course", items: ["North Indian Thali - ₹120", "Masala Dosa - ₹80", "Veg Biryani - ₹100"] },
      { section: "Snacks", items: ["Paneer Patty - ₹25", "Samosa (2 pcs) - ₹20", "Cold Drinks - ₹20"] }
    ]
  },
  {
    id: 2,
    name: "Nescafé Kiosk",
    image: "/assets/convention_1.jpg",
    description: "The ultimate destination for late-night coffee runs, iced teas, hot Maggi, and quick baked snacks between lectures.",
    rating: 4.8,
    review_count: 512,
    is_open: true,
    location: "Opposite School of ICT, GBU",
    price_range: "₹20 - ₹80",
    categories: ["Coffee & Tea", "Quick Snacks"],
    menu: [
      { section: "Brews", items: ["Hot Nescafe Classic - ₹25", "Hazelnut Cold Coffee - ₹50", "Lemon Iced Tea - ₹35"] },
      { section: "Quick Bites", items: ["Cheese Maggi - ₹45", "Veg Grilled Sandwich - ₹40", "Chocolate Muffin - ₹30"] }
    ]
  },
  {
    id: 3,
    name: "Baskin Robbins & Snacks Parlor",
    image: "/assets/guest_house_1.jpg",
    description: "Satisfy your cravings with premium scoop ice creams, thick milkshakes, sundae waffles, and quick refreshments.",
    rating: 4.3,
    review_count: 180,
    is_open: true,
    location: "Shopping Complex (Near BH-1)",
    price_range: "₹50 - ₹180",
    categories: ["Quick Snacks"],
    menu: [
      { section: "Ice Creams", items: ["Gold Medal Ribbon - ₹80", "Bavarian Chocolate - ₹80", "Cotton Candy - ₹70"] },
      { section: "Shakes", items: ["Belgian Chocolate Shake - ₹120", "Mango Shake - ₹100"] }
    ]
  },
  {
    id: 4,
    name: "Gargi Girls Cafeteria",
    image: "/assets/guest_house_dining_1.jpg",
    description: "A cozy and secure cafe adjacent to the girls' residential zone, serving fresh parathas, juices, and South Indian delicacies.",
    rating: 4.6,
    review_count: 220,
    is_open: true,
    location: "Girls' Hostel Area, GBU",
    price_range: "₹40 - ₹150",
    categories: ["Coffee & Tea", "Full Meals", "Quick Snacks"],
    menu: [
      { section: "Breakfast", items: ["Aloo Paratha - ₹40", "Idli Sambhar - ₹50", "Fresh Fruit Juice - ₹40"] },
      { section: "Meals", items: ["Chole Bhature - ₹70", "Mini Thali - ₹80"] }
    ]
  }
];

const CafesFood = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Cafes');
  const [selectedCafeMenu, setSelectedCafeMenu] = useState(null);
  const [reviewCafe, setReviewCafe] = useState(null);
  const { toast } = useToast();

  const filteredOutlets = selectedFilter === 'All Cafes'
    ? GBU_FOOD_OUTLETS
    : GBU_FOOD_OUTLETS.filter(outlet => outlet.categories.includes(selectedFilter));

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    toast({
      title: "Review Submitted!",
      description: `Thank you for reviewing ${reviewCafe.name}. Your rating of ${data.get('rating')} stars has been recorded.`,
    });
    setReviewCafe(null);
  };

  return (
    <SearchableWrapper>
      <section id="cafes-food" className="py-24 bg-white relative overflow-hidden font-sans text-left">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider mb-4 border border-orange-100"
            >
              <ChefHat size={13} />
              <span>Campus Dining</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
            >
              Cafes & Food Courts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-slate-600 text-lg leading-relaxed"
            >
              Discover delicious snack stalls, brand kiosks, and multi-cuisine cafeterias operating within the university boundaries.
            </motion.p>
          </div>

          {/* Category Filters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
            {GBU_FOOD_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedFilter(cat.title)}
                whileHover={{ y: -3 }}
                className={`cursor-pointer rounded-2xl p-5 border text-center transition-all duration-300 relative overflow-hidden group ${
                  selectedFilter === cat.title ? 'bg-orange-600 text-white border-transparent shadow-lg shadow-orange-500/15' : 'bg-slate-50 border-slate-100 text-slate-700 hover:bg-slate-100/60'
                }`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                    selectedFilter === cat.title ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-600'
                  }`}>
                    {React.createElement(cat.icon, { size: 18 })}
                  </div>
                  <h4 className="font-bold text-sm leading-snug">{cat.title}</h4>
                  <p className={`text-[10px] mt-0.5 ${selectedFilter === cat.title ? 'text-orange-100' : 'text-slate-400'}`}>{cat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Outlets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOutlets.map((cafe) => (
              <motion.div
                key={cafe.id}
                layout
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img src={cafe.image} alt={cafe.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span>{cafe.rating}</span>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-green-500/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        Open
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-slate-950 mb-2 leading-tight">{cafe.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{cafe.description}</p>
                    <div className="space-y-2 text-xs text-slate-600 border-t border-slate-50 pt-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-slate-400" />
                        <span>{cafe.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-slate-400" />
                        <span>Average Cost: {cafe.price_range}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                  <button
                    onClick={() => setSelectedCafeMenu(cafe)}
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md hover:shadow-orange-500/10 transition-all cursor-pointer text-center"
                  >
                    View Menu List
                  </button>
                  <button
                    onClick={() => setReviewCafe(cafe)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-all cursor-pointer text-center"
                  >
                    Write Review
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Menu Dialog */}
        <AnimatePresence>
          {selectedCafeMenu && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setSelectedCafeMenu(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-lg z-10 border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <button
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setSelectedCafeMenu(null)}
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                    <ChefHat className="text-orange-600" size={24} />
                    <span>{selectedCafeMenu.name} Menu</span>
                  </h2>
                  <p className="text-xs text-slate-500">Authentic university prices & fresh dishes.</p>
                </div>
                <div className="space-y-6">
                  {selectedCafeMenu.menu.map((sec, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 text-sm uppercase tracking-wider text-orange-600">{sec.section}</h4>
                      <ul className="divide-y divide-slate-50">
                        {sec.items.map((item, idx) => (
                          <li key={idx} className="py-2 text-sm text-slate-700 flex justify-between">
                            <span>{item.split(' - ')[0]}</span>
                            <span className="font-bold text-slate-950">{item.split(' - ')[1]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Review Dialog */}
        <AnimatePresence>
          {reviewCafe && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
                onClick={() => setReviewCafe(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md z-10 border border-slate-100 max-h-[90vh] overflow-y-auto"
              >
                <button
                  className="absolute top-6 right-6 text-slate-400 hover:text-slate-950 p-1.5 hover:bg-slate-100 rounded-full cursor-pointer"
                  onClick={() => setReviewCafe(null)}
                >
                  <X size={20} />
                </button>
                <div className="mb-6 flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-slate-950 flex items-center gap-2">
                    <MessageSquare className="text-orange-600" size={24} />
                    <span>Rate & Review</span>
                  </h2>
                  <p className="text-sm text-slate-500">Share your dining feedback for {reviewCafe.name}.</p>
                </div>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="reviewerName" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Name</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><User size={16} /></span>
                      <input id="reviewerName" name="reviewerName" required placeholder="Enter your name" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></span>
                      <input id="email" name="email" type="email" required placeholder="your.email@example.com" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="rating" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Rating</label>
                    <select id="rating" name="rating" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900">
                      <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                      <option value="4">⭐⭐⭐⭐ (4/5 Good)</option>
                      <option value="3">⭐⭐⭐ (3/5 Average)</option>
                      <option value="2">⭐⭐ (2/5 Poor)</option>
                      <option value="1">⭐ (1/5 Very Bad)</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="review" className="block mb-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">Your Experience</label>
                    <textarea id="review" name="review" required placeholder="Write a short review about the food quality, service, hygiene..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900 h-24 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer mt-2">
                    Submit Dining Review
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>
    </SearchableWrapper>
  );
};

export default CafesFood;
