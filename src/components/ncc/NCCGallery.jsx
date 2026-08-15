 import React, { useState } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';

import {
  Camera,
  Filter,
  Eye,
  Download,
  Shield,
  CalendarDays,
  Video,
  Image,
  X,
  ChevronDown,
} from 'lucide-react';
import StatsCard from '../StatsCard';
import SearchableWrapper from '../Searchbar/SearchableWrapper';

/* UI Components */

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-gray-300 rounded-xl shadow ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 pt-6 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
  <h3 className={`font-bold text-lg ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

const Button = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 shadow-sm',
  };
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
  };
  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = '', variant = 'default' }) => {
  const base =
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold';
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    outline: 'border border-gray-300 text-gray-700 bg-white',
  };
  return (
    <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>
  );
};

// Select Components removed for standard HTML select

/* Dialog Components */

const Dialog = ({ children }) => {
  const [open, setOpen] = useState(false);
  return React.Children.map(children, (child) => {
    if (child.type === DialogTrigger) {
      return React.cloneElement(child, { setOpen });
    }
    if (child.type === DialogContent) {
      return open ? React.cloneElement(child, { setOpen }) : null;
    }
    return child;
  });
};

const DialogTrigger = ({ children, setOpen }) => (
  <div onClick={() => setOpen(true)}>{children}</div>
);

const DialogContent = ({ children, setOpen, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
    className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-2 ${className}`}
    onClick={() => setOpen(false)}
  >
    <div
      className="bg-white rounded-lg shadow-lg max-w-full w-full md:w-auto relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        onClick={() => setOpen(false)}
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>
      <div className="p-4">{children}</div>
    </div>
  </motion.div>
);

/* Main NCCGallery Component */

const NCCGallery = ({ nccData }) => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const defaultGalleryItems = [
    {
      id: 1,
      title: 'NCC Senior Wing (Boys & Girls Unit) Inauguration',
      category: 'Social',
      year: '2025',
      date: '2025-10-15',
      images: [
        { url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png', caption: 'Official Inauguration under 37 UP BN & 31 UP Girls Bn at Auditorium-5, GBU' },
        { url: 'https://static.mygov.in/indiancc/2021/05/mygov-9999999991614076475-1024x576.jpg', caption: 'Cadets Guard of Honour for Dignitaries' },
        { url: 'https://static.mygov.in/indiancc/2021/08/mygov-9999999991629807572.jpg', caption: 'Rank Ceremony for Cadet Leaders' },
      ],
    },
    {
      id: 2,
      title: 'Combined Annual Training Camp (CATC)',
      category: 'Camps',
      year: '2025',
      date: '2025-11-10',
      images: [
        { url: 'https://static.mygov.in/indiancc/2021/08/mygov-9999999991629807572.jpg', caption: '10-Day CATC Drill & Weapon Training' },
        { url: 'https://static.mygov.in/indiancc/2021/05/mygov-9999999991614076475-1024x576.jpg', caption: 'Morning Marching & Physical Fitness Drills' },
        { url: 'https://static.mygov.in/indiancc/2021/06/mygov-9999999991623838421.jpg', caption: 'Obstacle Course & Map Reading Exercises' },
      ],
    },
    {
      id: 3,
      title: 'Thal Sainik Competition (TSC) & Firing Drills',
      category: 'Competitions',
      year: '2025',
      date: '2025-12-05',
      images: [
        { url: 'https://static.mygov.in/indiancc/2021/05/mygov-9999999991614076475-1024x576.jpg', caption: '.22 Rifle Firing Practice at Shooting Range' },
        { url: 'https://static.mygov.in/indiancc/2021/08/mygov-9999999991629807572.jpg', caption: 'Thal Sainik Competition Cadet Selections' },
      ],
    },
    {
      id: 4,
      title: 'Social Awareness & Tree Plantation Drive',
      category: 'Social',
      year: '2026',
      date: '2026-01-18',
      images: [
        { url: 'https://static.mygov.in/indiancc/2021/09/mygov-9999999991631526438.jpg', caption: 'GBU NCC Cadets Tree Plantation Drive' },
        { url: 'https://static.mygov.in/indiancc/2021/06/mygov-9999999991623838421.jpg', caption: 'Swachh Bharat Abhiyan Campaign at GBU Campus' },
      ],
    },
    {
      id: 5,
      title: 'Republic Day Ceremonial Parade',
      category: 'Drill',
      year: '2026',
      date: '2026-01-26',
      images: [
        { url: 'https://static.mygov.in/indiancc/2021/05/mygov-9999999991614076475-1024x576.jpg', caption: 'Republic Day Parade Display at Main Administrative Block' },
        { url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_National_Cadet_Corps_%28India%29.png', caption: 'Salute to National Flag by 31 UP Girls & 37 UP BN Cadets' },
      ],
    },
  ];

  const dbGallery = nccData?.content?.eventGallery || [];
  const galleryItems = dbGallery.length > 0
    ? dbGallery.map((g, idx) => ({
        id: idx + 1,
        title: g.title || "NCC Event Image",
        category: "Social",
        event: g.title || "NCC Event",
        year: g.eventDate ? g.eventDate.split('-')[0] : "2024",
        date: g.eventDate || "2024-01-15",
        images: [
          { url: g.imageUrl || g.image || "/placeholder.svg", caption: g.title || "Event Photo" }
        ]
      }))
    : defaultGalleryItems;
const galleryStatsData = [
  {
    icon: Image,
    numberText: "800+",
    title: "Total Photos",
   iconColor: '#3b82f6',
  },
  {
    icon: CalendarDays,
    numberText: "75+",
    title: "Events Documented",
      iconColor: '#f97316'
  },
  {
    icon: Video,
    numberText: "30+",
    title: "Training Videos",
     iconColor: '#10b981',
  },
  {
    icon: Eye,
    numberText: "15K+",
    title: "Total Views",
   iconColor: '#8b5cf6'
  },
];
  const filteredItems = galleryItems.filter((item) => {
    const yearMatch = selectedYear === 'all' || item.year === selectedYear;
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

  const getCategoryColor = (category) => {
    const colors = {
      Training: 'bg-blue-100 text-blue-800',
      Camps: 'bg-green-100 text-green-800',
      Adventure: 'bg-orange-100 text-orange-800',
      Competitions: 'bg-red-100 text-red-800',
      Drill: 'bg-purple-100 text-purple-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };
const [dialogImage, setDialogImage] = useState(null);
  return (
<SearchableWrapper>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-8 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl"
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">NCC Gallery</h2>
        <p className="text-lg text-gray-600">
          Capturing moments of discipline, training, and camaraderie
        </p>
      </motion.div>
<StatsCard stats={galleryStatsData}/>
      {/* FILTERS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Years</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-36 px-3 py-2 border border-gray-300 rounded bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Training">Training</option>
                <option value="Camps">Camps</option>
                <option value="Adventure">Adventure</option>
                <option value="Competitions">Competitions</option>
                <option value="Drill">Drill</option>
                <option value="Social">Social</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      
{/* GALLERY GRID */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                <div>
                  <h3 className="font-semibold text-xl text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">
                    {new Date(item.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold border border-gray-300 text-gray-700 bg-white">
                    {item.year}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {item.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="relative group cursor-pointer"
                    onClick={() => setDialogImage(image)}
                  >
                    <img
                      src={image.url}
                      alt={image.caption}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center"
                    >
                      <Eye className="h-6 w-6 text-white" />
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">{item.images.length} photos</span>
                
              </div>
            </div>

          </motion.div>
        ))}
      </motion.div>

      {/* DIALOG */}
      <AnimatePresence>
        {dialogImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-white/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDialogImage(null)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-xl shadow-2xl p-4 md:p-6 w-[90vw] max-w-xl relative mt-32"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 focus:outline-none"
                onClick={() => setDialogImage(null)}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <img
                    src={dialogImage.url}
                    alt={dialogImage.caption}
                    className="rounded-md object-contain max-h-[60vh]"
                  />
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <p className="text-gray-700 text-center sm:text-left">{dialogImage.caption}</p>
                  
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* VIDEO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Camera className="h-6 w-6 text-purple-600" />
              <span>Training Videos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Drill Training Highlights', duration: '5:30', views: '2.1K' },
                { title: 'Adventure Camp Documentary', duration: '12:45', views: '3.5K' },
                { title: 'RDC Parade Performance', duration: '8:20', views: '4.2K' },
              ].map((video, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="space-y-4"
                >
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{video.title}</h4>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{video.duration}</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
    </SearchableWrapper>
  );
};

export default NCCGallery;
