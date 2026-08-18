import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Search, Calendar, User, Phone, Mail, 
  MapPin, Clock, CheckCircle2, XCircle, AlertCircle, Loader2 
} from "lucide-react";
import { trackBooking, listFacilityInCharge } from "../../services/bookingService";
import { format } from "date-fns";

const BookingTrack = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryToken = searchParams.get("token") || "";

  const [tokenInput, setTokenInput] = useState(queryToken);
  const [booking, setBooking] = useState(null);
  const [inCharge, setInCharge] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleTrack = async (searchToken) => {
    if (!searchToken || searchToken.trim() === "") {
      setErrorMsg("Please enter a valid tracking token");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");
    setBooking(null);
    setInCharge(null);

    try {
      const data = await trackBooking(searchToken.trim());
      setBooking(data);
      setSearchParams({ token: searchToken.trim() });

      // Load facility manager details dynamically
      if (data?.facility_id) {
        const mgr = await listFacilityInCharge(data.facility_id);
        if (mgr) {
          setInCharge(mgr);
        }
      }
    } catch (err) {
      setErrorMsg(
        err.response?.data?.message || 
        "Failed to retrieve booking request details. Please check the token."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryToken) {
      handleTrack(queryToken);
    }
  }, [queryToken]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="h-3.5 w-3.5" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="h-3.5 w-3.5 animate-pulse" /> Pending Review
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 pt-10 pb-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Back Link */}
        <button
          onClick={() => navigate("/booking")}
          className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-semibold transition"
        >
          <ArrowLeft className="h-4.5 w-4.5" />
          Back to Facilities
        </button>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold text-stone-900">Track Booking Status</h1>
          <p className="text-stone-500 text-sm">
            Enter your unique token to check application status, coordinator details, and remarks.
          </p>
        </div>

        {/* Input Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(tokenInput);
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="e.g. GBUBK-20260623-XXXX"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value.toUpperCase())}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 bg-stone-50/30 text-stone-900 text-sm shadow-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 transition"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading || !tokenInput}
              className="h-11 rounded-xl bg-stone-900 text-white font-semibold px-6 hover:bg-stone-850 transition disabled:opacity-50 flex items-center justify-center gap-2 text-sm shadow-sm"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Track Status"
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600 mt-3.5 bg-red-50/50 p-3 rounded-xl border border-red-100">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* Tracking Details */}
        {booking && (
          <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-fade-in">
            {/* Status Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div>
                <span className="block text-xs uppercase tracking-wider text-stone-400 font-bold">Booking Token</span>
                <span className="text-lg font-bold text-stone-900">{booking.token}</span>
              </div>
              <div>{getStatusBadge(booking.status)}</div>
            </div>

            {/* Rejection Remarks */}
            {booking.status === "rejected" && booking.remarks && (
              <div className="p-4 bg-red-50/50 border border-red-100 text-red-700 rounded-2xl space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600 flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4" /> Administrative Remarks
                </span>
                <p className="text-sm leading-relaxed">{booking.remarks}</p>
              </div>
            )}

            {/* Approved Remarks */}
            {booking.status === "approved" && (
              <div className="p-4 bg-emerald-50/40 border border-emerald-100 text-emerald-800 rounded-2xl">
                <p className="text-xs leading-relaxed font-semibold">
                  Your booking request is approved. Please coordinate with the manager below for security clearance, fee submission, and keys.
                </p>
              </div>
            )}

            {/* Summary Details */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Request Summary</h3>
              <table className="w-full text-sm text-stone-600 border border-stone-150 rounded-xl overflow-hidden bg-stone-50/50">
                <tbody>
                  <tr className="border-b border-stone-150">
                    <td className="p-3.5 font-semibold text-stone-500 w-1/3">Facility Space</td>
                    <td className="p-3.5 font-bold text-stone-900">{booking.facility_name}</td>
                  </tr>
                  <tr className="border-b border-stone-150">
                    <td className="p-3.5 font-semibold text-stone-500">Event Date Range</td>
                    <td className="p-3.5 text-stone-850 font-medium">
                      {format(new Date(booking.start_time), "PPPP")}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-150">
                    <td className="p-3.5 font-semibold text-stone-500">Timings</td>
                    <td className="p-3.5 font-mono text-stone-900">
                      {format(new Date(booking.start_time), "p")} to {format(new Date(booking.end_time), "p")}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-150">
                    <td className="p-3.5 font-semibold text-stone-500">Applicant Name</td>
                    <td className="p-3.5 font-semibold text-stone-900">{booking.user_name}</td>
                  </tr>
                  <tr className="border-b border-stone-150">
                    <td className="p-3.5 font-semibold text-stone-500">Organization</td>
                    <td className="p-3.5 text-stone-800">{booking.organization || "Individual/Personal"}</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-stone-500">Purpose</td>
                    <td className="p-3.5 text-stone-600 leading-relaxed whitespace-pre-wrap">{booking.purpose}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Coordinator Details */}
            {inCharge && (
              <div className="pt-4 border-t border-stone-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Coordinator / Facility In-Charge</h3>
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="block font-bold text-stone-900 text-base">{inCharge.name}</span>
                    <span className="text-xs text-stone-400 font-semibold">GBU Official Facility Manager</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-xs font-medium text-stone-600">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-stone-400" />
                      <span>{inCharge.phone || inCharge.contact}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-4 w-4 text-stone-400" />
                      <span>{inCharge.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTrack;
