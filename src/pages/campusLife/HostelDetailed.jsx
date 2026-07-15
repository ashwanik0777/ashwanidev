import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroBanner from "../../components/HeroBanner";
import SearchableWrapper from "../../components/Searchbar/SearchableWrapper";

const GBU_HOSTEL_CATEGORIES = [
  {
    id: "boys",
    name: "Boys' Hostels (BH-1 to BH-12)",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    capacity: "11 Hostels (6,000+ Rooms)",
    description: "Spacious, single-occupancy rooms with scenic campus views, modern furnishings, and round-the-clock facilities.",
    fullDescription: "The boys' hostel complex at Gautam Buddha University comprises 11 beautifully constructed high-rise buildings designed for modern student living. Each hostel features independent common rooms, recreational areas, and reading halls. The architecture prioritizes natural ventilation and green surroundings, offering students a healthy and peaceful academic environment.",
    amenities: ["Single Occupancy Rooms", "24/7 Power Backup", "High-Speed Wi-Fi/LAN", "Gymnasium", "Indoor Sports Room", "Washing Machines", "Cooperative Mess", "24/7 Security"],
    rules: [
      "Hostel gates close strictly at 10:00 PM.",
      "Daily biometric attendance must be marked between 9:00 PM and 10:00 PM.",
      "Electrical appliances such as heaters or induction stoves are strictly prohibited in student rooms.",
      "Prior permission from the Warden is mandatory for any leaves."
    ]
  },
  {
    id: "girls",
    name: "Girls' Hostels (GH-1 to GH-6)",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    capacity: "6 Hostels (3,000+ Rooms)",
    description: "Secure, elegantly designed, and peaceful residential complex dedicated to female students.",
    fullDescription: "The girls' residential zone includes 6 high-capacity hostels nestled within a secure and beautifully manicured green belt. These hostels offer robust security, in-house convenience shops, beauty salons, and well-stocked reading rooms. It is a nurturing space that ensures complete peace of mind for both students and parents.",
    amenities: ["Single Occupancy Rooms", "Multi-Tier CCTV Security", "24/7 Wardens & Female Guards", "Beauty Parlor", "In-house Convenience Store", "Indoor Badminton & Gym", "High-Speed Wi-Fi", "Laundry Facilities"],
    rules: [
      "Hostel gates close strictly at 8:30 PM.",
      "Daily biometric attendance must be marked between 8:00 PM and 8:30 PM.",
      "Overnight leave requires prior written consent from parents and approval from the Warden.",
      "Guests are not allowed inside student rooms without written permission."
    ]
  },
  {
    id: "phd",
    name: "Ph.D. & Scholar Hostels (BH-10)",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    capacity: "1 Dedicated Hostel (400+ Rooms)",
    description: "Quiet and academic-centric residential rooms customized for doctoral candidates and senior research scholars.",
    fullDescription: "Understanding the unique, demanding schedules of doctoral candidates, GBU offers dedicated research scholar hostels (like BH-10 for men and designated wings for women). These facilities provide round-the-clock high-speed internet access, silent zones for reading, and flexible entry/exit timings for laboratory work, ensuring research is never interrupted.",
    amenities: ["24/7 Library & Silent Study Zones", "High-speed LAN/Wi-Fi", "Flexible Lab Timings Access", "Comfortable Single Rooms", "Dedicated Recreation Lounge", "Geysers & Water Coolers"],
    rules: [
      "Academic decorum and silence must be maintained in residential corridors.",
      "Research scholars must register their late-night lab timings with the warden.",
      "Maintenance of hygiene in common kitchenettes and dining areas is required."
    ]
  },
  {
    id: "international",
    name: "International & AC Suites",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
    capacity: "Special Premium Wings (200+ Rooms)",
    description: "Premium air-conditioned single suites with attached kitchenettes and upscale amenities for international scholars.",
    fullDescription: "GBU takes pride in hosting international students from over 15 countries. The international student residences feature premium single air-conditioned rooms, a dedicated helpdesk, self-cooking kitchenettes, satellite television lounges, and high-quality multi-cuisine food hubs.",
    amenities: ["Full Air Conditioning", "Attached Self-Cooking Kitchenette", "Multi-Cuisine Dining Options", "24/7 International Helpdesk", "Premium Lounges", "Satellite TV & Entertainment Hub"],
    rules: [
      "Adherence to all national visa, passport, and FRRO registration timelines is mandatory.",
      "Self-cooking zones must be kept clean and fire safety guidelines followed.",
      "Quiet hours are observed from 11:00 PM to 6:00 AM."
    ]
  }
];

const GBU_HOSTELS_DATA = {
  boys: [
    {
      name: "Birsa Munda Hostel (BH-1)",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      description: "Home to first-year undergraduate students, focusing on a welcoming and ragging-free atmosphere. Features extensive outdoor recreational space.",
      facilities: {
        rooms: "Single Seated, fully furnished (Bed, Table, Chair, Wardrobe)",
        common_rooms: "Equipped with LCD TV, Chess, Carrom, and Table Tennis",
        sports: "Outdoor Badminton court and Volleyball court inside hostel premises",
        dining: "Spacious dining hall offering nutritious vegetarian and non-vegetarian meals",
        internet: "Wi-Fi enabled campus network with high-speed internet access",
        security: "24/7 guard security and biometric entry gates"
      }
    },
    {
      name: "Guru Ghasi Das Hostel (BH-2)",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      description: "Spacious hostel block for senior undergraduate students, offering excellent sports and fitness facilities.",
      facilities: {
        rooms: "600 single rooms with balcony access",
        fitness: "In-house mini gym with modern treadmill, weights, and cycles",
        dining: "Student-managed cooperative mess serving delicious North/South Indian food",
        recreation: "Large common hall with satellite TV and board games",
        laundry: "Washing machine facilities available on each floor",
        backup: "24-hour generator power backup for study lamps and fans"
      }
    },
    {
      name: "Chhatrapati Shahuji Maharaj Hostel (BH-3)",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      description: "Designed for postgraduate and professional course students, featuring a highly studious environment and excellent reading rooms.",
      facilities: {
        rooms: "Single occupancy rooms with ergonomic desks",
        reading_room: "Fully air-conditioned reading room open until midnight",
        dining: "Hygienic mess serving breakfast, lunch, high tea, and dinner",
        sports: "Basketball court and net practice area for cricket",
        dispensary: "First-aid room with essential medicines and regular doctor visits",
        gardens: "Beautiful interior lawns for morning walks and meditation"
      }
    },
    {
      name: "Sant Kabir Das Hostel (BH-4)",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
      description: "A modern hostel block housing engineering and technology students, close to the School of ICT labs.",
      facilities: {
        rooms: "Single-occupancy rooms with high-speed LAN points",
        tech_lounge: "Coding and discussion room with high-speed Wi-Fi",
        dining: "Fully automated kitchen serving healthy steam-cooked meals",
        recreation: "Recreation hall with Table Tennis and Foosball tables",
        sanitation: "Daily room cleaning service and clean drinking water purifiers",
        security: "CCTV surveillance in all corridors and common areas"
      }
    }
  ],
  girls: [
    {
      name: "Mahamaya Girls Hostel (GH-1)",
      image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      description: "Elegantly designed residential block for female undergraduate students, focusing on complete safety and comfortable living.",
      facilities: {
        rooms: "500 single-occupancy rooms with private balconies",
        security: "Triple-tier security check-in, female guards, and CCTV coverage",
        dining: "In-house mess offering delicious home-style meals and snacks",
        convenience: "In-hostel stationery shop, juice center, and convenience store",
        wellbeing: "Fully functional beauty parlor and salon services inside the hostel",
        fitness: "Indoor gym and outdoor badminton courts inside the boundary"
      }
    },
    {
      name: "Savitribai Phule Girls Hostel (GH-2)",
      image: "https://images.unsplash.com/photo-1567521464027-f123fed55043?auto=format&fit=crop&w=800&q=80",
      description: "Home to senior female students, providing a peaceful environment for competitive exam preparation and studies.",
      facilities: {
        rooms: "Comfortable single-seated rooms with ample wardrobe space",
        reading_hall: "Dedicated reading room with daily newspapers and magazines",
        mess: "Nutritious and balanced menu planned by the student mess committee",
        laundry: "Commercial washing machines and drying areas",
        recreation: "Spacious TV room and green lawn for evening yoga and exercise",
        wifi: "High-speed Wi-Fi coverage across all rooms and lawns"
      }
    },
    {
      name: "Sanghamitra Girls Hostel (GH-3)",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      description: "A premium block for postgraduate female students, close to the academic schools and administrative block.",
      facilities: {
        rooms: "Fully ventilated single rooms with custom study desks",
        medical_room: "Dedicated sick-room with round-the-clock nurse and ambulance access",
        dining: "Clean mess with premium dining tables and modern kitchen",
        sports: "Indoor games room for carrom, chess, and skipping",
        water_heaters: "Solar water heaters installed for winter hot water supply",
        warden_support: "Resident warden available 24/7 for student guidance"
      }
    }
  ],
  phd: [
    {
      name: "Ramanujam Ph.D. Hostel (BH-10)",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      description: "The premier residential block for doctoral candidates, research scholars, and junior faculty members.",
      facilities: {
        rooms: "Single-seated quiet suites with study desks and high-speed LAN",
        study_lounge: "24/7 silent study and coding hall for night researchers",
        connectivity: "Direct high-speed link to the university central library network",
        dining: "Dedicated mess with flexible timings to accommodate late-night research",
        laundry: "In-house laundry service and dry cleaning drop-off",
        parking: "Secured bicycle and two-wheeler parking lot"
      }
    }
  ],
  international: [
    {
      name: "International AC Residence (GH-1 Wing)",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
      description: "Exclusive residential wing for international students and visiting professors, offering global living standards.",
      facilities: {
        rooms: "Air-conditioned single rooms with premium wooden furnishings",
        kitchenette: "Attached kitchenette equipped with microwave, induction cooktop, and refrigerator",
        dining: "International mess offering continental, Asian, and Indian cuisines",
        lounge: "Common lounge with satellite TV, international channels, and magazines",
        helpdesk: "24/7 student support desk for visa, transport, and local guidance",
        internet: "Ultra-fast dedicated internet connection for global communication"
      }
    }
  ]
};

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-xl bg-white shadow-md hover:shadow-xl transition-transform duration-300 cursor-pointer overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-4 md:p-6 ${className}`} {...props}>
    {children}
  </div>
);

const HostelDetailed = () => {
  const [categories, setCategories] = useState(GBU_HOSTEL_CATEGORIES);
  const [hostelData, setHostelData] = useState(GBU_HOSTELS_DATA);
  const [currentCategory, setCurrentCategory] = useState(GBU_HOSTEL_CATEGORIES[0]);
  const [selectedHostel, setSelectedHostel] = useState(null);

  const handleCategoryClick = (cat) => {
    setCurrentCategory(cat);
    setSelectedHostel(null);
  };

  const handleHostelClick = (h) => {
    setSelectedHostel(h);
  };

  const getHostelsOfCategory = () => {
    if (!currentCategory) return [];
    const key = currentCategory.name.toLowerCase().includes("boys")
      ? "boys"
      : currentCategory.name.toLowerCase().includes("girls")
      ? "girls"
      : currentCategory.name.toLowerCase().includes("phd")
      ? "phd"
      : "international";
    return hostelData[key] || [];
  };

  return (
    <SearchableWrapper>
    <section className="min-h-screen bg-gray-50">
      <HeroBanner
        title="Hostel Life"
        subtitle="Explore our hostels with modern amenities and comfortable living."
        bgTheme={1}
      />
      <div className="container mt-10 mx-auto px-4 md:px-8 lg:px-30">
        {/* === Category Cards === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(cat)}
            >
              <Card
                className={`${
                  currentCategory?.id === cat.id
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }`}
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-bold">{cat.name}</h3>
                    <p className="text-sm">{cat.capacity}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* === Selected Category Detail === */}
        {currentCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <Card className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-4 md:p-6">
              <CardContent>
                <h3 className="text-2xl md:text-3xl font-extrabold mb-3 text-gray-800">
                  {currentCategory.name}
                </h3>

                <p className="text-lg md:text-xl text-blue-700 font-semibold mb-3">
                  Capacity: {currentCategory.capacity}
                </p>

                <p className="text-gray-700 text-base md:text-lg mb-2 leading-relaxed">
                  {currentCategory.description}
                </p>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                  {currentCategory.fullDescription}
                </p>

                {currentCategory.amenities?.length > 0 && (
                  <>
                    <h4 className="mt-4 text-lg font-semibold text-gray-800">
                      Amenities:
                    </h4>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {currentCategory.amenities.map((a, i) => (
                        <li
                          key={i}
                          className="bg-blue-100 text-blue-800 text-xs md:text-sm px-3 py-1 rounded-full shadow-sm"
                        >
                          {a}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {currentCategory.rules?.length > 0 && (
                  <>
                    <h4 className="mt-4 text-lg font-semibold text-gray-800">
                      Rules:
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-gray-600 space-y-1 text-base">
                      {currentCategory.rules.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* === Hostels in Selected Category === */}
        {getHostelsOfCategory().length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {getHostelsOfCategory().map((h, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                onClick={() => handleHostelClick(h)}
              >
                <Card>
                  <a href="#detailedcard">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={h.image}
                        alt={h.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h4 className="text-lg font-bold">{h.name}</h4>
                      </div>
                    </div>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* === Selected Hostel Detail === */}
        <div id="detailedcard" className="pb-10"></div>
        {selectedHostel && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="my-12 pt-5"
          >
            <Card className="p-4 md:p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-2xl md:text-3xl text-blue-700 font-extrabold mb-4"
                >
                  {selectedHostel.name}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-gray-800 text-base md:text-lg mb-4 leading-relaxed"
                >
                  {selectedHostel.description}
                </motion.p>

                <p className="text-blue-600 text-base md:text-lg font-semibold mb-2">
                  Facilities:
                </p>

                {selectedHostel.facilities && (
                  <ul className="text-gray-700 space-y-2 capitalize text-base md:text-lg">
                    {Object.entries(selectedHostel.facilities).map(([k, v]) => (
                      <li key={k} className="flex items-start gap-2">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                        <span>
                          <strong>{k.replace(/_/g, " ")}:</strong> {v}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {selectedHostel.image && (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    src={selectedHostel.image}
                    alt={selectedHostel.name}
                    className="w-full mt-6 rounded-2xl shadow-md object-cover"
                  />
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
    </SearchableWrapper>
  );
};

export default HostelDetailed;
