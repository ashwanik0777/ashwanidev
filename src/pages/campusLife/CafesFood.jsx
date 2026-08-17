import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Utensils, Star, MapPin, Clock, X, ChefHat, User, Mail, MessageSquare, CupSoda } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';
import SearchableWrapper from '../../components/Searchbar/SearchableWrapper';

const GBU_FOOD_CATEGORIES = [
  { title: "All Outlets", description: "GBU Campus Food", icon: Utensils },
  { title: "Coffee & Tea", description: "Hot & Cold Brews", icon: Coffee },
  { title: "Quick Snacks", description: "Bites & Shakes", icon: ChefHat },
  { title: "Full Meals", description: "Thalis & Dishes", icon: Utensils }
];

const GBU_AUTHENTIC_FOOD_OUTLETS = [
  {
    id: 1,
    name: "Grand Street Cafe",
    image: "https://www.gbu.ac.in/Content/clubs/img/shoppingcomplex.jpg",
    description: "Official GBU on-campus cafe inaugurated by VC Prof. R.K. Sinha. Serving fresh coffee, burgers, grilled sandwiches, wraps, and quick fast-food bites.",
    rating: 4.7,
    review_count: 420,
    is_open: true,
    location: "GBU Shopping Complex Plaza",
    price_range: "₹30 - ₹180",
    categories: ["Coffee & Tea", "Quick Snacks"],
    menu: [
      { section: "Brews & Beverages", items: ["Masala Chai - ₹15", "Hot Espresso Coffee - ₹25", "Iced Cold Coffee - ₹50", "Fresh Lime Soda - ₹35"] },
      { section: "Fast Food & Snacks", items: ["Veg Cheese Burger - ₹60", "Paneer Kathi Roll - ₹80", "Grilled Cheese Sandwich - ₹50", "French Fries - ₹60", "Crispy Veg Patties - ₹25"] }
    ]
  },
  {
    id: 2,
    name: "Central Shopping Complex Food Court",
    image: "/assets/guest_house_dining_1.jpg",
    description: "The primary commercial food hub within GBU's 21-shop plaza. Features local dhaba-style eateries, North & South Indian thalis, and confectionery stores.",
    rating: 4.5,
    review_count: 580,
    is_open: true,
    location: "Central Shopping Complex, GBU",
    price_range: "₹20 - ₹200",
    categories: ["Full Meals", "Quick Snacks"],
    menu: [
      { section: "Main Course Meals", items: ["North Indian Thali - ₹110", "Chole Bhature - ₹70", "Veg Fried Rice & Manchurian - ₹90", "Masala Dosa - ₹80"] },
      { section: "Snacks & Drinks", items: ["Samosa (2 pcs) - ₹20", "Bread Pakora - ₹20", "Paneer Patties - ₹25", "Sweet Lassi - ₹30"] }
    ]
  },
  {
    id: 3,
    name: "Nescafé Academic Kiosk",
    image: "https://www.gbu.ac.in/Content/clubs/img/canteen.jpeg",
    description: "Located near the School of ICT and Engineering blocks. The preferred stop for students between lectures for hot coffee, iced brews, Maggi, and muffins.",
    rating: 4.8,
    review_count: 610,
    is_open: true,
    location: "Near USICT / SOE Academic Block, GBU",
    price_range: "₹20 - ₹90",
    categories: ["Coffee & Tea", "Quick Snacks"],
    menu: [
      { section: "Signature Brews", items: ["Hot Nescafé Classic - ₹25", "Hazelnut Cold Coffee - ₹55", "Lemon Iced Tea - ₹35", "Green Tea - ₹20"] },
      { section: "Quick Bites", items: ["Butter Plain Maggi - ₹35", "Cheese Maggi - ₹50", "Veg Grilled Sandwich - ₹45", "Chocolate Muffin - ₹30"] }
    ]
  },
  {
    id: 4,
    name: "Revive Juice & Shake Bar",
    image: "/assets/guest_house_1.jpg",
    description: "On-campus healthy beverage and fruit shake corner. Offers fresh seasonal fruit juices, thick chocolate & mango milkshakes, and healthy fruit chat.",
    rating: 4.6,
    review_count: 310,
    is_open: true,
    location: "Shopping Complex Lawn, GBU",
    price_range: "₹30 - ₹120",
    categories: ["Quick Snacks"],
    menu: [
      { section: "Fresh Juices", items: ["Fresh Sweet Lime (Mosambi) Juice - ₹50", "Fresh Orange Juice - ₹50", "Pomegranate Juice - ₹70"] },
      { section: "Milkshakes & Bowls", items: ["Mango Milkshake - ₹60", "Banana Protein Shake - ₹50", "Belgian Chocolate Thick Shake - ₹75", "Fresh Fruit Chat Bowl - ₹40"] }
    ]
  },
  {
    id: 5,
    name: "Gargi Girls' Residential Cafeteria",
    image: "/assets/Hostel_Image.webp",
    description: "Dedicated cafe located in the girls' residential hostel zone, offering fresh parathas, South Indian snacks, tea, coffee, and evening meals in a secure setting.",
    rating: 4.6,
    review_count: 240,
    is_open: true,
    location: "Girls' Hostel Quadrangle (Near Savitri Bai Phule Hostel)",
    price_range: "₹20 - ₹130",
    categories: ["Coffee & Tea", "Full Meals", "Quick Snacks"],
    menu: [
      { section: "Breakfast & Snacks", items: ["Aloo/Paneer Paratha with Curd - ₹45", "Idli Sambhar - ₹50", "Poha - ₹30", "Masala Tea & Biscuits - ₹20"] },
      { section: "Meals", items: ["Mini Thali - ₹80", "Rajma Chawal Bowl - ₹70", "Veg Hakka Noodle - ₹60"] }
    ]
  },
  {
    id: 6,
    name: "Bodhisattva Library Refreshment Kiosk",
    image: "https://library.gbu.ac.in/img/Artboard%201library1.jpg",
    description: "Quiet refreshment kiosk inside Dr. B.R. Ambedkar Central Library ground level, serving hot beverages, mineral water, cookies, and energy snacks.",
    rating: 4.4,
    review_count: 190,
    is_open: true,
    location: "Ground Floor, Central Library, GBU",
    price_range: "₹15 - ₹60",
    categories: ["Coffee & Tea", "Quick Snacks"],
    menu: [
      { section: "Refreshments", items: ["Hot Milk Tea / Lemon Tea - ₹15", "Espresso Black Coffee - ₹30", "Bakery Cookies - ₹15", "Packaged Energy Snacks - ₹20"] }
    ]
  }
];

const CafesFood = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Outlets');
  const [selectedCafeMenu, setSelectedCafeMenu] = useState(null);
  const [reviewCafe, setReviewCafe] = useState(null);
  const { toast } = useToast();

  const filteredOutlets = selectedFilter === 'All Outlets'
    ? GBU_AUTHENTIC_FOOD_OUTLETS
    : GBU_AUTHENTIC_FOOD_OUTLETS.filter(outlet => outlet.categories.includes(selectedFilter));

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
      <section id="cafes-food" className="py-16 bg-white relative overflow-hidden font-sans text-left">
        <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-7xl relative z-10">
          
          {/* Header */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-extrabold text-slate-950 tracking-tight"
            >
              Official GBU Campus Cafes & Food Outlets
            </motion.h2>
          </div>

          {/* Category Filters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-14 max-w-4xl mx-auto">
            {GBU_FOOD_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={idx}
                onClick={() => setSelectedFilter(cat.title)}
                whileHover={{ y: -3 }}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border text-center transition-all duration-300 relative overflow-hidden group ${
                  selectedFilter === cat.title ? 'bg-orange-600 text-white border-transparent shadow-lg shadow-orange-500/15' : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
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
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={cafe.image} 
                      alt={cafe.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103" 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/guest_house_dining_1.jpg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        <span>{cafe.rating}</span>
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-600 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                        On-Campus
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-extrabold text-xl text-slate-950 mb-2 leading-tight">{cafe.name}</h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">{cafe.description}</p>
                    <div className="space-y-2 text-xs text-slate-500 border-t border-slate-100 pt-4">
                      <div className="flex items-center gap-1.5">
                        <MapPin size={13} className="text-orange-500" />
                        <span>{cafe.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={13} className="text-orange-500" />
                        <span>Price Range: {cafe.price_range}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex gap-3">
                  <button
                    onClick={() => setSelectedCafeMenu(cafe)}
                    className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md hover:shadow-orange-500/10 transition-all cursor-pointer text-center"
                  >
                    View Menu & Rates
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
                  <h2 className="text-2xl font-extrabold text-slate-950 flex items-center gap-2">
                    <ChefHat className="text-orange-600" size={24} />
                    <span>{selectedCafeMenu.name} Menu</span>
                  </h2>
                  <p className="text-xs text-slate-500">Authentic campus pricing & student favorites.</p>
                </div>
                <div className="space-y-6">
                  {selectedCafeMenu.menu.map((sec, i) => (
                    <div key={i} className="space-y-2">
                      <h4 className="font-bold text-slate-900 border-b border-slate-100 pb-1 text-xs uppercase tracking-wider text-orange-600">{sec.section}</h4>
                      <ul className="divide-y divide-slate-100">
                        {sec.items.map((item, idx) => (
                          <li key={idx} className="py-2.5 text-sm text-slate-700 flex justify-between">
                            <span className="font-medium text-slate-800">{item.split(' - ')[0]}</span>
                            <span className="font-bold text-orange-600">{item.split(' - ')[1]}</span>
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
                  <p className="text-sm text-slate-500">Share your feedback for {reviewCafe.name}.</p>
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
                      <input id="email" name="email" type="email" required placeholder="your.email@gbu.ac.in" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900" />
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
                    <textarea id="review" name="review" required placeholder="Write your review about food quality, service, hygiene..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 border-solid rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-sm text-slate-900 h-24 resize-none" />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-lg hover:shadow-orange-500/25 transition-all cursor-pointer mt-2">
                    Submit Review
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
