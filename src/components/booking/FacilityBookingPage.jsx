import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { 
  ArrowLeft, User, Calendar, Phone, Mail, FileText, 
  MapPin, CheckCircle, ShieldAlert, Award, Clock, HelpCircle 
} from "lucide-react";
import { format } from "date-fns";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import ImageCarousel from "./ImageCarousel";
import { facilities } from "../bookingData/facilities";
import { useToast } from "../../hooks/use-toast";
import { listBookedDates, submitBooking, listFacilityInCharge } from "../../services/bookingService";

const FacilityBookingPage = () => {
  const { facilityId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const bookingSectionRef = useRef(null);

  const facility = facilities.find((f) => f.id === facilityId);

  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookedDates, setBookedDates] = useState([]);
  const [pendingDates, setPendingDates] = useState([]);
  const [inCharge, setInCharge] = useState(facility?.inCharge);
  const [bookingSuccessToken, setBookingSuccessToken] = useState("");

  const autoOpenBook = searchParams.get("book") === "true";

  // Fetch dynamically assigned In-Charge manager and occupied/pending booking dates
  useEffect(() => {
    if (!facilityId) return;

    const loadData = async () => {
      try {
        // Fetch dynamic manager
        const manager = await listFacilityInCharge(facilityId);
        if (manager) {
          setInCharge({
            name: manager.name,
            contact: manager.phone,
            email: manager.email
          });
        }

        // Fetch bookings to disable calendar dates
        const bookings = await listBookedDates(facilityId);
        const booked = [];
        const pending = [];

        bookings.forEach((b) => {
          let current = new Date(b.startTime);
          const end = new Date(b.endTime);
          while (current <= end) {
            const dateStr = format(current, "yyyy-MM-dd");
            if (b.status === "approved") {
              if (!booked.includes(dateStr)) booked.push(dateStr);
            } else {
              if (!pending.includes(dateStr)) pending.push(dateStr);
            }
            current.setDate(current.getDate() + 1);
          }
        });

        setBookedDates(booked);
        setPendingDates(pending);
      } catch (err) {
        console.error("Error loading facility data:", err);
      }
    };

    loadData();
  }, [facilityId]);

  // Handle auto-open and scroll when ?book=true is passed
  useEffect(() => {
    if (autoOpenBook && facility) {
      setShowBookingForm(true);
      setTimeout(() => {
        bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [autoOpenBook, facility]);

  if (!facility) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-xl text-stone-600 mb-4">Facility not found in database.</p>
        <button
          onClick={() => navigate("/booking")}
          className="px-5 py-2.5 bg-stone-900 text-white rounded-xl font-semibold hover:bg-stone-850 transition"
        >
          Back to Facilities
        </button>
      </div>
    );
  }

    const handleDateSelect = (date) => {
    setDateRange(prev => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }
      if (date < prev.start) {
        return { start: date, end: null };
      }
      let current = new Date(prev.start);
      const end = new Date(date);
      let isValid = true;
      while (current <= end) {
        const dateStr = format(current, "yyyy-MM-dd");
        if (bookedDates.includes(dateStr) || pendingDates.includes(dateStr)) {
          isValid = false;
          break;
        }
        current.setDate(current.getDate() + 1);
      }
      if (!isValid) {
        toast({
          title: "Invalid Range",
          description: "Selection includes dates that are already booked or pending.",
          variant: "destructive"
        });
        return { start: date, end: null };
      }
      return { ...prev, end: date };
    });
    setShowBookingForm(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      const response = await submitBooking(bookingData);
      setBookingSuccessToken(response.data.token);
      toast({
        title: "Booking Request Received",
        description: `Your application token is ${response.data.token}.`,
      });
      // Clear selected date
      setDateRange({ start: null, end: null });
    } catch (error) {
      console.error("Booking Submit Error:", error);
      toast({
        title: "Submission Failed",
        description: error.response?.data?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleBookingCancel = () => {
    setDateRange({ start: null, end: null });
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-8 pb-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate("/booking")}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold mb-6 transition"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to Facilities
        </button>

        {/* Success Page Render */}
        {bookingSuccessToken ? (
          <div className="max-w-xl mx-auto my-12 p-8 bg-white border border-stone-200 rounded-3xl shadow-lg text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-stone-900">Application Submitted!</h2>
              <p className="text-stone-500 text-sm">
                Your booking request for <span className="font-semibold text-stone-800">{facility.name}</span> has been queued for administrative review.
              </p>
            </div>

            <div className="bg-stone-50 border border-dashed border-stone-300 p-5 rounded-2xl">
              <span className="block text-xs uppercase tracking-wider text-stone-400 font-bold mb-1">Your Tracking Token</span>
              <code className="text-xl font-bold text-stone-900 tracking-wide select-all">{bookingSuccessToken}</code>
              <p className="text-xs text-stone-400 mt-2">Double-click code to copy. Store this token safely to track progress.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate(`/booking/track?token=${bookingSuccessToken}`)}
                className="flex-1 rounded-xl bg-stone-900 text-white font-semibold py-3 hover:bg-stone-850 transition text-sm"
              >
                Track Request Status
              </button>
              <button
                onClick={() => {
                  setBookingSuccessToken("");
                  navigate("/booking");
                }}
                className="flex-1 rounded-xl border border-stone-300 text-stone-700 font-semibold py-3 hover:bg-stone-50 transition text-sm"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Top Facility Details Header */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm mb-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-stone-900">{facility.name}</h1>
                  <p className="text-stone-500 text-sm mt-1 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-stone-400" />
                    GBU University Campus, Greater Noida
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-stone-900 text-white capitalize">
                    {facility.type}
                  </span>
                  {facility.roomCount && (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {facility.roomCount} Rooms
                    </span>
                  )}
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Middle Column (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Image Carousel */}
                  <div className="rounded-2xl overflow-hidden border border-stone-200">
                    <ImageCarousel images={facility.images} facilityName={facility.name} />
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold uppercase tracking-wider text-stone-400">About the Space</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{facility.description}</p>
                  </div>

                  {/* Amenities */}
                  {facility.amenities && facility.amenities.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-base font-bold uppercase tracking-wider text-stone-400">Features & Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {facility.amenities.map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-1.5 text-xs font-semibold text-stone-700"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Guidelines & Cancellation policies */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-stone-100">
                    {facility.bookingGuidelines && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                          <HelpCircle className="h-4 w-4 text-stone-500" />
                          Booking Guidelines
                        </h4>
                        <ul className="list-disc pl-5 text-stone-600 text-xs space-y-1">
                          {facility.bookingGuidelines.map((g, idx) => (
                            <li key={idx}>{g}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {facility.cancellationPolicy && (
                      <div className="space-y-2">
                        <h4 className="font-bold text-stone-900 text-sm flex items-center gap-1.5">
                          <Clock className="h-4 w-4 text-stone-500" />
                          Cancellation Policy
                        </h4>
                        <ul className="list-disc pl-5 text-stone-600 text-xs space-y-1">
                          {facility.cancellationPolicy.map((c, idx) => (
                            <li key={idx}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column (1/3) */}
                <div className="space-y-6">
                  {/* Pricing rate structure */}
                  {facility.rentRate && (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Rent Rates Chart</h3>
                      <div className="space-y-2 text-sm text-stone-600">
                        {facility.rentRate.winter && facility.rentRate.summer ? (
                          <div className="space-y-3">
                            <div>
                              <span className="font-bold text-stone-900 text-xs">Winter Season</span>
                              <div className="flex justify-between items-center py-1 text-xs">
                                <span>Half Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.winter.halfDay?.toLocaleString() || '-'}</span>
                              </div>
                              <div className="flex justify-between items-center py-1 text-xs border-t border-stone-100/70">
                                <span>Full Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.winter.fullDay?.toLocaleString() || '-'}</span>
                              </div>
                            </div>
                            <div>
                              <span className="font-bold text-stone-900 text-xs">Summer Season</span>
                              <div className="flex justify-between items-center py-1 text-xs">
                                <span>Half Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.summer.halfDay?.toLocaleString() || '-'}</span>
                              </div>
                              <div className="flex justify-between items-center py-1 text-xs border-t border-stone-100/70">
                                <span>Full Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.summer.fullDay?.toLocaleString() || '-'}</span>
                              </div>
                            </div>
                            {facility.rentRate.outsider && (
                              <div className="pt-2 border-t border-stone-200">
                                <span className="font-bold text-stone-900 text-xs">Outsider / Standard</span>
                                <div className="flex justify-between items-center py-1 text-xs">
                                  <span>Half Day:</span>
                                  <span className="font-bold text-stone-900">₹{facility.rentRate.outsider.halfDay?.toLocaleString() || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 text-xs border-t border-stone-100/70">
                                  <span>Full Day:</span>
                                  <span className="font-bold text-stone-900">₹{facility.rentRate.outsider.fullDay?.toLocaleString() || '-'}</span>
                                </div>
                              </div>
                            )}
                            {facility.rentRate.employee && (
                              <div className="pt-2 border-t border-stone-200">
                                <span className="font-bold text-stone-900 text-xs">GBU Employee</span>
                                <div className="flex justify-between items-center py-1 text-xs">
                                  <span>Half Day:</span>
                                  <span className="font-bold text-purple-600">₹{facility.rentRate.employee.halfDay?.toLocaleString() || '-'}</span>
                                </div>
                                <div className="flex justify-between items-center py-1 text-xs border-t border-stone-100/70">
                                  <span>Full Day:</span>
                                  <span className="font-bold text-purple-600">₹{facility.rentRate.employee.fullDay?.toLocaleString() || '-'}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <>
                            {facility.rentRate.peak && (
                              <div className="flex justify-between items-center py-1">
                                <span>Standard / Peak Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.peak.toLocaleString()}</span>
                              </div>
                            )}
                            {facility.rentRate.offPeak && (
                              <div className="flex justify-between items-center py-1 border-t border-stone-100/70">
                                <span>Off-Peak Day:</span>
                                <span className="font-bold text-stone-900">₹{facility.rentRate.offPeak.toLocaleString()}</span>
                              </div>
                            )}
                            {facility.rentRate.student && (
                              <div className="flex justify-between items-center py-1 border-t border-stone-100/70">
                                <span>GBU Student:</span>
                                <span className="font-semibold text-emerald-600">₹{facility.rentRate.student.toLocaleString()}</span>
                              </div>
                            )}
                            {facility.rentRate.employee && (
                              <div className="flex justify-between items-center py-1 border-t border-stone-100/70">
                                <span>GBU Employee:</span>
                                <span className="font-semibold text-purple-600">₹{facility.rentRate.employee.toLocaleString()}</span>
                              </div>
                            )}
                            {facility.rentRate.outsider && (
                              <div className="flex justify-between items-center py-1 border-t border-stone-100/70">
                                <span>Outsider:</span>
                                <span className="font-semibold text-stone-900">₹{facility.rentRate.outsider.toLocaleString()}</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Manager in-charge */}
                  {inCharge && (
                    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-3.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Facility Manager</h3>
                      <div className="space-y-2.5 text-sm text-stone-700">
                        <div className="font-semibold text-stone-900 text-base">{inCharge.name}</div>
                        <div className="flex items-center gap-2 text-stone-500 text-xs">
                          <Phone className="h-4 w-4 text-stone-400" />
                          <span>{inCharge.contact}</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-500 text-xs">
                          <Mail className="h-4 w-4 text-stone-400" />
                          <span className="break-all">{inCharge.email}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Booking Trigger Call to Action */}
                  <button
                    onClick={() => {
                      setShowBookingForm(true);
                      setTimeout(() => {
                        bookingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 200);
                    }}
                    className="w-full rounded-2xl bg-stone-900 text-white font-semibold py-4 hover:bg-stone-850 active:bg-stone-950 transition shadow-sm text-sm"
                  >
                    Check Availability & Book Space
                  </button>
                </div>
              </div>
            </div>

            {/* Booking & Calendar Section */}
            {showBookingForm && (
              <div 
                ref={bookingSectionRef} 
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-8 border-t border-stone-200"
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-950 px-1">Check Space Availability</h3>
                  <BookingCalendar
                    dateRange={dateRange}
                    onDateSelect={handleDateSelect}
                    bookedDates={bookedDates}
                    pendingDates={pendingDates}
                  />
                </div>

                <div className="space-y-4">
                  {dateRange.start ? (
                    <>
                      <h3 className="text-lg font-bold text-stone-950 px-1">Fill Application Details</h3>
                      <BookingForm
                        facility={facility}
                        dateRange={dateRange}
                        onSubmit={handleBookingSubmit}
                        onCancel={handleBookingCancel}
                      />
                    </>
                  ) : (
                    <div className="h-full min-h-[350px] flex flex-col items-center justify-center bg-stone-100 border border-stone-200 border-dashed rounded-3xl p-8 text-center text-stone-500">
                      <Calendar className="h-10 w-10 text-stone-300 mb-3" />
                      <p className="font-semibold text-stone-600">No Date Selected</p>
                      <p className="text-xs text-stone-400 mt-1 max-w-xs">
                        Please choose an available date (highlighted green) on the calendar to open the booking details form.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FacilityBookingPage;
