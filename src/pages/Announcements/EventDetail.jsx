import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  CalendarPlus,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon
} from "lucide-react";
import Header from "../../components/announcement/Header";
import SocialShare from "../../components/announcement/SocialShare";
import RelatedEvents from "../../components/announcement/RelatedEvents";
import {
  getSchoolAnnouncements,
  refreshSchoolAnnouncements,
  syncAnnouncementsFromCache,
} from "../../utils/schoolAnnouncements";
import { parseImageUrl } from "../../utils/imageUtils.js";

// --- Solid Color Button ---
const Button = ({
  children,
  variant = "default",
  size = "md",
  asChild,
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-blue-600 text-blue-600 bg-white hover:bg-blue-50",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
    lg: "px-7 py-2.5 text-lg",
  };
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: `${child.props.className || ""} ${classes}`.trim(),
      ...props,
    });
  }
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// --- Solid Badge ---
const Badge = ({ children, className = "", variant = "solid", ...props }) => {
  const base =
    "inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm tracking-wide";
  const variants = {
    solid: "bg-blue-600 text-white",
    outline: "border border-current text-inherit bg-transparent",
  };
  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
};

// --- Solid Card ---
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`bg-white rounded-2xl shadow-xl border border-gray-200 border-solid hover:shadow-2xl transition-shadow duration-300${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardHeader = ({ children, className = "", ...props }) => (
  <div
    className={`border-b px-8 py-6 bg-blue-50 rounded-t-2xl ${className}`}
    {...props}
  >
    {children}
  </div>
);
const CardTitle = ({ children, className = "", ...props }) => (
  <h2
    className={`text-2xl font-extrabold text-blue-700 tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h2>
);
const CardContent = ({ children, className = "", ...props }) => (
  <div className={`px-8 py-6 ${className}`} {...props}>
    {children}
  </div>
);

// --- Tabs ---
const TabsContext = React.createContext();
const Tabs = ({ defaultValue, children, className = "" }) => {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};
const TabsList = ({ children, className = "" }) => (
  <div
    className={`flex gap-2 bg-blue-100 rounded-xl p-2 mb-4 shadow-inner ${className}`}
  >
    {children}
  </div>
);
const TabsTrigger = ({ value, children, className = "" }) => {
  const { value: active, setValue } = React.useContext(TabsContext);
  const isActive = active === value;
  return (
    <button
      className={`flex-1 px-8 py-3 rounded-lg font-bold uppercase tracking-wide text-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white shadow"
          : "text-blue-700 hover:bg-blue-200"
      } ${className}`}
      onClick={() => setValue(value)}
      type="button"
    >
      {children}
    </button>
  );
};
const TabsContent = ({ value, children, className = "" }) => {
  const { value: active } = React.useContext(TabsContext);
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
};

function format(date, formatStr) {
  const d = typeof date === "string" ? new Date(date) : date;
  const pad = (n) => n.toString().padStart(2, "0");
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  if (formatStr === "MMMM dd, yyyy") {
    return `${months[d.getMonth()]} ${pad(d.getDate())}, ${d.getFullYear()}`;
  }
  if (formatStr === "MMM dd, yyyy") {
    return `${months[d.getMonth()].slice(0, 3)} ${pad(d.getDate())}, ${d.getFullYear()}`;
  }
  return d.toLocaleDateString();
}

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isExternalGalleryLink = (url) => {
    if (!url) return false;
    return url.includes('photos.app.goo.gl') || 
           url.includes('photos.google.com') || 
           url.includes('drive.google.com/drive/folders') ||
           url.includes('drive.google.com/open?id=') && url.includes('folder');
  };

  const handleNextImage = (e, total) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  const handlePrevImage = (e, total) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  useEffect(() => {
    let isMounted = true;

    const loadEvent = async () => {
      try {
        await refreshSchoolAnnouncements();
      } catch {
        syncAnnouncementsFromCache();
      }

      const eventList = getSchoolAnnouncements().events;
      const selected = eventList.find((item) => String(item.id) === String(id));
      if (!isMounted) return;
      setEvent(selected || null);
      setLoading(false);
    };

    loadEvent();
    window.addEventListener("storage", loadEvent);
    window.addEventListener("focus", loadEvent);
    window.addEventListener("announcements-data-updated", loadEvent);

    return () => {
      isMounted = false;
      window.removeEventListener("storage", loadEvent);
      window.removeEventListener("focus", loadEvent);
      window.removeEventListener("announcements-data-updated", loadEvent);
    };
  }, [id]);
  // const event = mockEvents.find((item) => String(item.id) === String(id));
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
            Event not found
          </h1>
          <Link to="/announcements/event-calendar">
            <Button>Back to Events</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getTypeColor = () => "bg-blue-600 text-white";
  const getModeColor = () => "bg-blue-600 text-white";

  const addToGoogleCalendar = () => {
    const startDate = new Date(event.date);
    const endDate = event.endDate
      ? new Date(event.endDate)
      : new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
    const formatDate = (date) =>
      date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title,
    )}&dates=${formatDate(startDate)}/${formatDate(
      endDate,
    )}&details=${encodeURIComponent(
      event.description,
    )}&location=${encodeURIComponent(event.venue)}`;
    window.open(googleCalendarUrl, "_blank");
  };

  // Parse images: handle both array and comma-separated string
  const eventImages = Array.isArray(event.images)
    ? event.images.filter(Boolean)
    : typeof event.images === 'string' && event.images.trim()
      ? event.images.split(',').map(s => s.trim()).filter(Boolean)
      : [];

  const flyerImage = event.flyerUrl || '';

  return (
    <div className="min-h-screen bg-gray-50/50 pb-20">
      <div className="container mx-auto px-4 md:px-8 pt-8">
        <div className="mb-8">
          <Link to="/announcements/event-calendar">
            <Button variant="outline" size="sm" className="text-gray-600 border-gray-300 hover:bg-gray-100">
              <ArrowLeft size={16} className="mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          {/* Left Column: Flyer */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5.5] bg-gray-100 border border-gray-200 flex items-center justify-center">
              {flyerImage ? (
                <img
                  src={parseImageUrl(flyerImage)}
                  alt={event.title}
                  className="w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 p-6 text-center">
                  <Calendar size={64} className="opacity-50 mb-4" />
                  <p className="text-sm">Flyer not available</p>
                </div>
              )}
              {event.isUpcoming && (
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
                    UPCOMING
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Information & Buttons */}
          <div className="lg:col-span-6 xl:col-span-7 flex flex-col">
            <div className="mb-6 flex flex-wrap gap-2">
              <Badge className={`${getTypeColor(event.type)} shadow-sm`}>{event.type}</Badge>
              {event.mode && <Badge className={`${getModeColor(event.mode)} shadow-sm`}>{event.mode}</Badge>}
              {!event.isUpcoming && (
                <Badge variant="solid" className="bg-gray-600 text-white shadow-sm">
                  Completed
                </Badge>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {event.title}
            </h1>
            <p className="text-sm font-bold uppercase tracking-wider text-blue-600 mb-8">
              {event.schoolName}
            </p>

            {/* Quick Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Date & Time</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {event.startsAt ? format(new Date(event.startsAt), "MMMM dd, yyyy") : 'TBA'}
                  </p>
                  {(event.time || event.endsAt) && (
                    <p className="text-sm text-gray-600 mt-0.5">
                      {event.time ? event.time : (event.endsAt ? `Until ${format(new Date(event.endsAt), "MMM dd")}` : '')}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Venue</p>
                  <p className="font-semibold text-gray-900 mt-1">{event.venue || event.location}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                  <Users size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Organizer</p>
                  <p className="font-semibold text-gray-900 mt-1">{event.organizer}</p>
                </div>
              </div>

              {event.price && (
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <span className="font-bold text-lg leading-none">₹</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-wide">Fee</p>
                    <p className="font-semibold text-gray-900 mt-1">{event.price === 'Free' ? 'Free Entry' : event.price}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full-width Description & Actions */}
        <div className="mb-16 max-w-7xl">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">About This Event</h3>
          <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line mb-10">
            {event.description}
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl">
            <Button 
              size="md" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm" 
              asChild
              disabled={!event.isUpcoming || !event.registrationUrl}
            >
              {event.isUpcoming && event.registrationUrl ? (
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} className="mr-2" />
                  Register Now
                </a>
              ) : (
                <span>
                  <ExternalLink size={18} className="mr-2" />
                  Register Now
                </span>
              )}
            </Button>

            <Button 
              size="md" 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50" 
              asChild
              disabled={!event.flyerUrl && !event.brochureUrl}
            >
              {(event.flyerUrl || event.brochureUrl) ? (
                <a href={event.flyerUrl || event.brochureUrl} target="_blank" rel="noopener noreferrer">
                  <Download size={18} className="mr-2 text-gray-600" />
                  Download Flyer
                </a>
              ) : (
                <span>
                  <Download size={18} className="mr-2 text-gray-400" />
                  Download Flyer
                </span>
              )}
            </Button>

            <Button 
              size="md" 
              variant="outline" 
              className="w-full border-gray-300 hover:bg-gray-50" 
              onClick={addToGoogleCalendar}
            >
              <CalendarPlus size={18} className="mr-2 text-gray-600" />
              Add to Calendar
            </Button>

            <SocialShare url={window.location.href} title={event.title} className="w-full" />
          </div>
        </div>

        {/* Gallery Section (Only for Past Events) */}
        {!event.isUpcoming && eventImages.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b pb-4">Event Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eventImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-video overflow-hidden rounded-xl shadow-md group relative bg-gray-100 cursor-pointer"
                  onClick={() => {
                    if (isExternalGalleryLink(image)) {
                      window.open(image, "_blank");
                    } else {
                      setSelectedIndex(index);
                    }
                  }}
                >
                  {isExternalGalleryLink(image) ? (
                    <div className="w-full h-full flex flex-col items-center justify-center text-blue-600 bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                      <ImageIcon size={48} className="opacity-80 mb-2" />
                      <span className="font-semibold px-4 text-center">View Gallery Album</span>
                    </div>
                  ) : (
                    <>
                      <img
                        src={parseImageUrl(image)}
                        alt={`${event.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox for Gallery */}
      {selectedIndex !== null && eventImages[selectedIndex] && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setSelectedIndex(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white hover:text-gray-300 bg-black/50 p-2 rounded-full transition-colors z-50"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          >
            <X size={28} />
          </button>
          
          {eventImages.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full transition-colors z-50"
              onClick={(e) => handlePrevImage(e, eventImages.length)}
            >
              <ChevronLeft size={36} />
            </button>
          )}

          <div className="relative max-w-full max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            {isExternalGalleryLink(eventImages[selectedIndex]) ? (
              <div className="bg-white rounded-xl p-8 flex flex-col items-center max-w-sm text-center">
                <ImageIcon size={64} className="text-blue-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">External Gallery Album</h3>
                <p className="text-gray-600 mb-6">This item is a link to an external gallery (Google Photos or Drive).</p>
                <Button onClick={() => window.open(eventImages[selectedIndex], "_blank")}>
                  Open in New Tab
                </Button>
              </div>
            ) : (
              <img 
                src={parseImageUrl(eventImages[selectedIndex])} 
                alt="Gallery preview" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            )}
          </div>

          {eventImages.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 bg-black/50 p-3 rounded-full transition-colors z-50"
              onClick={(e) => handleNextImage(e, eventImages.length)}
            >
              <ChevronRight size={36} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default EventDetail;
