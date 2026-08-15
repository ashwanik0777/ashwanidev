 import React from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Users,
  BarChart,
  Activity,
  Calendar,
  Facebook,
  Instagram,
  Youtube,
  Twitter
} from 'lucide-react';
import StatsCard from '../StatsCard';
import SearchableWrapper from '../Searchbar/SearchableWrapper';

const Card = ({ className = '', children }) => (
  <div className={`rounded-xl shadow bg-white ${className}`}>{children}</div>
);

const CardContent = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const Button = ({ className = '', children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 rounded-md bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 w-full ${className}`}
    {...props}
  >
    {children}
  </button>
);

const NCCSocialMedia = ({ nccData }) => {
  const socialMedia = nccData?.content?.socialMedia || {};
  const socialHandles = [
    {
      platform: 'Instagram (37 UP BN NCC GBU)',
      handle: '@up37_ncc_gbu',
      link: 'https://www.instagram.com/up37_ncc_gbu/',
      color: 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500',
      icon: <Instagram className="w-6 h-6 text-white" />
    },
    {
      platform: 'Instagram (GBU NCC Cell)',
      handle: '@gbu_ncc',
      link: 'https://www.instagram.com/gbu_ncc/',
      color: 'bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600',
      icon: <Instagram className="w-6 h-6 text-white" />
    }
  ];

  return (
    <SearchableWrapper>
      <motion.div
        className="space-y-8 px-4 sm:px-6 lg:px-20 mx-auto max-w-7xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-center"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Official Social Media</h2>
          <p className="text-base sm:text-lg text-gray-600">
            Follow official Gautam Buddha University NCC Instagram handles for live updates, event highlights & photos
          </p>
        </motion.div>

        {/* Social Media Handles */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto gap-6">
            {socialHandles.map((handle, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-xl border border-slate-100">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-between h-full">
                    <div>
                      <div className={`w-16 h-16 ${handle.color} rounded-full flex items-center justify-center mb-4 mx-auto shadow-md`}>
                        {handle.icon}
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-1">{handle.platform}</h4>
                      <p className="text-pink-600 font-semibold text-sm mb-6">{handle.handle}</p>
                    </div>
                    <Button
                      onClick={() => window.open(handle.link, '_blank')}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white border-0 shadow-md"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Instagram Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </SearchableWrapper>
  );
};

export default NCCSocialMedia;
