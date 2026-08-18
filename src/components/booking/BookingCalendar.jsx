import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2, Sparkles } from "lucide-react";
import { format, isBefore, startOfDay, addMonths, subMonths } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const BookingCalendar = ({
  dateRange,
  onDateSelect,
  bookedDates = [],
  pendingDates = [],
}) => {
  const today = startOfDay(new Date());
  
  // Track the month currently being viewed
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  const isDateBooked = (date) =>
    bookedDates.includes(format(date, "yyyy-MM-dd"));
  const isDatePending = (date) =>
    pendingDates.includes(format(date, "yyyy-MM-dd"));

  const isDateDisabled = (date) => {
    return isBefore(startOfDay(date), today) || isDateBooked(date);
  };

  const isDateAvailable = (date) => {
    return !isBefore(startOfDay(date), today) && !isDateBooked(date) && !isDatePending(date);
  };

  // Generate days for the grid
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const startDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = subMonths(currentMonth, 1);
  const daysInPrevMonth = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0).getDate();

  const daysGrid = [];

  // 1. Previous month days (dimmed/disabled)
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    daysGrid.push({
      date: new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // 2. Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    daysGrid.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // 3. Next month days (dimmed/disabled to fill the grid up to multiple of 7)
  const totalCellsNeeded = daysGrid.length <= 35 ? 35 : 42;
  const cellsToFill = totalCellsNeeded - daysGrid.length;

  for (let i = 1; i <= cellsToFill; i++) {
    const nextMonth = addMonths(currentMonth, 1);
    daysGrid.push({
      date: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), i),
      isCurrentMonth: false,
    });
  }

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDayClasses = (dayDate, isCurrentMonth) => {
    if (!isCurrentMonth) {
      return "text-stone-300 opacity-20 cursor-not-allowed pointer-events-none";
    }

    const dateStr = format(dayDate, "yyyy-MM-dd");
    const isBooked = isDateBooked(dayDate);
    const isPending = isDatePending(dayDate);
    const isPast = isBefore(startOfDay(dayDate), today);
    let isSelected = false;
    let isInRange = false;
    if (dateRange && dateRange.start) {
      const startStr = format(dateRange.start, "yyyy-MM-dd");
      const endStr = dateRange.end ? format(dateRange.end, "yyyy-MM-dd") : null;
      if (dateStr === startStr || dateStr === endStr) {
        isSelected = true;
      } else if (endStr && dateStr > startStr && dateStr < endStr) {
        isInRange = true;
      }
    }
    const isToday = format(new Date(), "yyyy-MM-dd") === dateStr;

    if (isPast) {
      return "text-stone-600 opacity-50 cursor-not-allowed line-through pointer-events-none";
    }

    if (isSelected) {
      return "bg-stone-950 text-white font-black shadow-lg shadow-stone-950/20 border-none scale-95 ring-2 ring-stone-950/15 z-10 relative";
    }
    if (isInRange) {
      return "bg-stone-200 text-stone-900 font-bold border-none";
    }

    if (isBooked) {
      return "bg-rose-50 text-rose-700 border border-rose-200/60 font-bold cursor-not-allowed opacity-60 line-through decoration-rose-350 pointer-events-none";
    }

    let classes = "hover:bg-stone-150 hover:text-stone-950 cursor-pointer font-bold";

    if (isPending) {
      classes += " bg-amber-50 text-amber-900 border border-amber-300 shadow-[inset_0_-2px_0_0_rgba(245,158,11,0.3)]";
    } else {
      // Available
      classes += " bg-emerald-50 text-emerald-950 border border-emerald-300 shadow-[inset_0_-2px_0_0_rgba(16,185,129,0.35)]";
    }

    if (isToday) {
      classes += " ring-2 ring-stone-950/20 border-stone-500";
    }

    return classes;
  };

  const handleDateClick = (day) => {
    if (!day.isCurrentMonth) return;
    if (isDateDisabled(day.date)) return;
    onDateSelect(day.date);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-stone-200/80 bg-white p-6 shadow-xl shadow-stone-100/40 hover:shadow-2xl hover:shadow-stone-200/30 transition-all duration-300 flex flex-col justify-between h-auto self-start w-full relative overflow-hidden"
    >
      {/* Background soft design accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-stone-50 rounded-full blur-3xl opacity-60 -z-10 pointer-events-none" />

      <div className="space-y-6">
        {/* Legend Header */}
        <div className="flex flex-col gap-4 pb-5 border-b border-stone-100">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-stone-900 flex items-center gap-2">
              <Calendar className="h-4.5 w-4.5 text-stone-900" />
              Calendar Availability
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h4>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest bg-stone-50 px-2 py-0.5 rounded-md">Realtime</span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-100/70 shadow-sm transition hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Available
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-1.5 text-xs font-bold bg-amber-50 text-amber-800 border border-amber-100/70 shadow-sm transition hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              Pending ({pendingDates.length})
            </span>
            <span className="inline-flex items-center gap-2 rounded-2xl px-3.5 py-1.5 text-xs font-bold bg-rose-50/70 text-rose-800 border border-rose-100/50 shadow-sm transition hover:scale-105">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span>
              Occupied ({bookedDates.length})
            </span>
          </div>
        </div>

        {/* Custom Calendar view */}
        <div className="py-1">
          {/* Calendar Month Header */}
          <div className="flex items-center justify-between mb-5 px-1">
            <h5 className="text-sm font-extrabold text-stone-900 tracking-tight capitalize">
              {format(currentMonth, "MMMM yyyy")}
            </h5>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="h-9 w-9 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-400 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-950/10 active:scale-95 shadow-sm"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="h-9 w-9 rounded-xl border border-stone-200 bg-white text-stone-600 hover:bg-stone-50 hover:text-stone-900 hover:border-stone-400 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-stone-950/10 active:scale-95 shadow-sm"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Weekdays row */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {weekdays.map((day) => (
              <span key={day} className="text-stone-400 font-bold text-[10px] uppercase tracking-wider">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {daysGrid.map((day, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleDateClick(day)}
                disabled={!day.isCurrentMonth || isDateDisabled(day.date)}
                className={`h-10 w-full p-0 font-semibold rounded-xl text-sm transition-all duration-150 flex items-center justify-center select-none border border-transparent ${getDayClasses(
                  day.date,
                  day.isCurrentMonth
                )}`}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Indicator Panel */}
      <AnimatePresence mode="wait">
        {dateRange?.start ? (
          <motion.div
            key="selected-panel"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mt-6 p-4 bg-stone-900 border border-stone-850 rounded-2xl flex items-center justify-between gap-3 shadow-md shadow-stone-900/10"
          >
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-xl bg-white text-stone-950 flex items-center justify-center font-extrabold text-base shadow-sm">
                {format(dateRange.start, "d")}{dateRange.end && `-${format(dateRange.end, "d")}`}
              </div>
              <div>
                <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider">Date Confirmed</span>
                <span className="text-sm font-bold text-white">
                  {format(dateRange.start, "MMM dd")} {dateRange.end ? `- ${format(dateRange.end, "MMM dd, yyyy")}` : format(dateRange.start, ", yyyy")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-xl border border-emerald-500/20 text-xs font-bold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Ready</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="info-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-4 bg-stone-50 border border-stone-200 border-dashed rounded-2xl flex items-center gap-3"
          >
            <div className="h-10 w-10 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-stone-400" />
            </div>
            <div className="text-xs text-stone-500 leading-normal">
              <span className="font-bold text-stone-700 block mb-0.5">Choose your event date</span>
              Tap any green/amber cell on the calendar to configure details.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BookingCalendar;
