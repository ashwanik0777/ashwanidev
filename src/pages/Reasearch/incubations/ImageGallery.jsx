import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SearchableWrapper from "../../../components/Searchbar/SearchableWrapper";
import { incubationGallery } from "../../../Data/incubationData.js";

Modal.setAppElement("#root");

export default function GallerySlider() {
  const [mainIndex, setMainIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const images = incubationGallery.length > 0 ? incubationGallery : [
    "https://www.gburif.org/images/intro-carousel/dsf8939-b-copy.jpg",
    "https://www.gburif.org/images/intro-carousel/gautam-buddha-university-3.jpg",
    "https://www.gburif.org/images/about-mission.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (images.length > 0) {
        setIsTransitioning(true);
        setTimeout(() => {
          setMainIndex((prev) => (prev + 1) % images.length);
          setIsTransitioning(false);
        }, 150);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleThumbnailClick = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setMainIndex(index);
      setIsTransitioning(false);
    }, 150);
  };

  const currentImage = images[mainIndex];

  return (
    <SearchableWrapper>
      <div className="w-full bg-slate-50 py-24 px-4 sm:px-10 md:px-20 border-t border-gray-100" id="gallery">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-600 uppercase bg-indigo-100/80 px-4 py-1.5 rounded-full border border-indigo-200">
              Campus & Activities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-3">
              Official Photo Gallery
            </h2>
            <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Glimpses of activities, incubation facilities, workshops, and startup events at AIC-GBU
            </p>
          </div>

          {/* Main Image View */}
          <div
            onClick={() => setModalOpen(true)}
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-8 cursor-pointer group bg-slate-900 border border-slate-200"
          >
            <img
              src={currentImage}
              alt={`Incubation Gallery ${mainIndex + 1}`}
              className={`w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[540px] object-cover transition-all duration-700 ease-in-out ${
                isTransitioning ? "scale-105 opacity-80 blur-[2px]" : "scale-100 opacity-100 blur-0"
              }`}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
              <span className="text-white text-sm font-semibold bg-indigo-600/90 px-4 py-2 rounded-xl backdrop-blur">
                Click to view full image
              </span>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-1.5 bg-slate-950/60 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
              <span className="text-xs text-white font-semibold">
                {mainIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnails Carousel */}
          <div className="w-full overflow-x-auto no-scrollbar pb-4">
            <div className="flex gap-3 min-w-max px-2">
              {images.map((src, index) => (
                <div
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`cursor-pointer transition-all rounded-xl overflow-hidden border-2 bg-slate-200 ${
                    index === mainIndex
                      ? "border-indigo-600 scale-105 shadow-md ring-2 ring-indigo-300"
                      : "border-transparent opacity-75 hover:opacity-100 hover:scale-102"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Thumb ${index + 1}`}
                    className="w-24 h-16 sm:w-28 sm:h-20 object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal for Lightbox */}
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          contentLabel="Full Image"
          className="flex items-center justify-center h-full p-4"
          overlayClassName="fixed inset-0 bg-slate-950/90 z-50 backdrop-blur-sm"
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl">
            <img
              src={currentImage}
              alt="Zoomed Gallery View"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 bg-slate-900/80 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
            >
              ✕
            </button>
          </div>
        </Modal>

        <style>{`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
      </div>
    </SearchableWrapper>
  );
}
