import * as React from "react";
import { useNavigate } from "react-router-dom";
import { User, Calendar, Info, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// --- ✅ Card ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    whileHover={{ y: -4, boxShadow: "0 12px 30px rgba(0,0,0,0.08)" }}
    className={cn(
      "flex flex-col justify-between rounded-2xl bg-white text-black transition-all duration-300 border border-stone-200 overflow-hidden shadow-sm hover:border-stone-400",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div className={cn("relative w-full aspect-video overflow-hidden bg-stone-100", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("text-lg font-semibold text-stone-900 mb-1", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("flex-1 p-5 pt-4", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("grid grid-cols-2 gap-3 p-5 pt-0", className)} {...props} />
);

// --- ✅ Badge ---
const Badge = ({ className, ...props }) => (
  <div
    className={cn(
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-stone-100 text-stone-800 border border-stone-200 shadow-sm",
      className
    )}
    {...props}
  />
);

const FacilityCard = ({ facility, userRole = "outsider" }) => {
  const navigate = useNavigate();

  const getCapacityLabel = () =>
    facility.type === "guesthouse" || facility.type === "accommodation"
      ? "Guests"
      : "Seats";

  const getFacilityTypeLabel = () => {
    switch (facility.type) {
      case "guesthouse":
      case "accommodation":
        return "Accommodation";
      case "dining":
        return "Kitchen & Dining";
      case "sports":
        return "Sports Facility";
      case "auditorium":
        return "Auditorium";
      case "conference":
        return "Conference Hall";
      default:
        return facility.type.charAt(0).toUpperCase() + facility.type.slice(1);
    }
  };

  const mainImage = facility.images && facility.images.length > 0 ? facility.images[0] : "/assets/logo1.png";

  return (
    <Card>
      <CardHeader>
        <img
          src={mainImage}
          alt={facility.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end">
          <Badge className="bg-stone-900 text-white border-transparent">
            {getFacilityTypeLabel()}
          </Badge>
          {facility.roomCount && (
            <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
              {facility.roomCount} Rooms Available
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle>{facility.name}</CardTitle>

        <div className="flex items-center gap-4 mb-3 text-stone-500">
          <div className="flex items-center gap-1.5 text-xs">
            <User className="h-3.5 w-3.5" />
            <span>
              {facility.capacity.toLocaleString()} {getCapacityLabel()}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            <Calendar className="h-3.5 w-3.5" />
            <span className="text-emerald-600 font-medium">Available</span>
          </div>
        </div>

        <p className="text-stone-600 text-sm leading-relaxed line-clamp-2">
          {facility.description}
        </p>
      </CardContent>

      <CardFooter>
        <button
          onClick={() => navigate(`/booking/${facility.id}`)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 py-2.5 text-sm font-semibold text-stone-700 hover:bg-stone-50 hover:text-stone-950 transition-all duration-200"
        >
          <Info className="h-4 w-4" />
          More Info
        </button>
        <button
          onClick={() => navigate(`/booking/${facility.id}?book=true`)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 py-2.5 text-sm font-semibold text-white hover:bg-stone-800 active:bg-stone-950 transition-all duration-200 shadow-sm"
        >
          <BookOpen className="h-4 w-4" />
          Book Now
        </button>
      </CardFooter>
    </Card>
  );
};

export default FacilityCard;
