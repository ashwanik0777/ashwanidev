import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ExternalLink, Image as ImageIcon, HardDrive, FileText, Youtube } from 'lucide-react';

const getLinkConfig = (url) => {
  const lower = url.toLowerCase();
  if (lower.includes('drive.google.com')) return { label: 'Drive', icon: HardDrive, color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border-emerald-200' };
  if (lower.includes('photos.google.com') || lower.includes('photos.app.goo.gl')) return { label: 'Photos', icon: ImageIcon, color: 'text-blue-700 bg-blue-50 hover:bg-blue-100 border-blue-200' };
  if (lower.includes('.pdf')) return { label: 'PDF', icon: FileText, color: 'text-rose-700 bg-rose-50 hover:bg-rose-100 border-rose-200' };
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return { label: 'Video', icon: Youtube, color: 'text-red-700 bg-red-50 hover:bg-red-100 border-red-200' };
  return { label: 'Visit', icon: ExternalLink, color: 'text-gray-700 bg-gray-50 hover:bg-gray-100 border-gray-200' };
};

const CampusActivityGallery = ({ title, subtitle, items = [] }) => {
  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
          <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-6 rounded-full" />
        </div>

        {items.length === 0 ? (
          <div className="text-center text-gray-500 py-12">No activities found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, idx) => (
              <motion.div 
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80" }}
                  />
                  {item.type && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                        {item.type}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6 text-sm text-gray-600 flex-1">
                    {item.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span>{item.date}</span>
                      </div>
                    )}
                    {item.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="line-clamp-1">{item.venue}</span>
                      </div>
                    )}
                    {item.description && (
                      <p className="text-gray-500 line-clamp-2 mt-2">{item.description}</p>
                    )}
                  </div>

                  {/* Links */}
                  {item.links && item.links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-50">
                      {item.links.map((url, urlIdx) => {
                        if (!url || typeof url !== 'string') return null;
                        const config = getLinkConfig(url);
                        const Icon = config.icon;
                        return (
                          <a 
                            key={urlIdx}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all hover:scale-105 ${config.color}`}
                            title={url}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            {config.label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CampusActivityGallery;
