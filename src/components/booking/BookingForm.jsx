import * as React from "react";
import { format } from "date-fns";
import { CheckCircle2, AlertCircle, ShieldAlert, Loader2 } from "lucide-react";
import { sendBookingOtp, verifyBookingOtp } from "../../services/bookingService";

// Helper to join class names
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-stone-200 bg-white shadow-sm flex flex-col h-full overflow-hidden",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6 border-b border-stone-100 bg-stone-50/50", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-stone-900",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 flex-1", className)} {...props} />
));
CardContent.displayName = "CardContent";

// Label
const Label = React.forwardRef(({ className, required, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1",
      className
    )}
    {...props}
  >
    {props.children}
    {required && <span className="text-red-500">*</span>}
  </label>
));
Label.displayName = "Label";

// Input
const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    className={cn(
      "flex h-11 w-full rounded-xl border border-stone-200 bg-stone-50/30 px-3.5 py-2 text-stone-900 text-sm shadow-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    ref={ref}
    {...props}
  />
));
Input.displayName = "Input";

// Textarea
const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex min-h-[90px] w-full rounded-xl border border-stone-200 bg-stone-50/30 px-3.5 py-2 text-stone-900 text-sm shadow-sm placeholder:text-stone-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:border-transparent transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60",
      className
    )}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const BookingForm = ({ facility, dateRange, onSubmit, onCancel }) => {
  const [formData, setFormData] = React.useState({
    userName: "",
    userEmail: "",
    userPhonePrimary: "",
    userPhoneSecondary: "",
    organization: "",
    purpose: "",
    startTime: "09:00",
    endTime: "17:00",
  });

    const [emailOtpState, setEmailOtpState] = React.useState("idle"); // idle, sending, sent, verifying, verified
  const [otpCode, setOtpCode] = React.useState("");
  const [verificationToken, setVerificationToken] = React.useState("");
  const [otpError, setOtpError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const timeSlots = [
    "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
    "20:00", "21:00", "22:00"
  ];

  
  
  const handleInputChange = (field, value) => {
    // Validate digit inputs for mobile
    if ((field === "userPhonePrimary" || field === "userPhoneSecondary") && value !== "") {
      const cleanVal = value.replace(/[^0-9]/g, "");
      if (cleanVal.length > 10) return;
      setFormData(prev => ({ ...prev, [field]: cleanVal }));
      return;
    }

    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSendOtp = async () => {
    if (!formData.userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.userEmail)) {
      setOtpError("Please enter a valid email address");
      return;
    }
    setOtpError("");
    setEmailOtpState("sending");
    try {
      await sendBookingOtp({ email: formData.userEmail });
      setEmailOtpState("sent");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Failed to send OTP code.");
      setEmailOtpState("idle");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpError("Please enter the 6-digit verification code");
      return;
    }
    setOtpError("");
    setEmailOtpState("verifying");
    try {
      const response = await verifyBookingOtp({ email: formData.userEmail, otp: otpCode });
      setVerificationToken(response.data.verificationToken);
      setEmailOtpState("verified");
    } catch (err) {
      setOtpError(err.response?.data?.message || "Invalid OTP code entered.");
      setEmailOtpState("sent");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (formData.userName.trim().length === 0) {
      alert("Please enter Applicant Full Name");
      return;
    }
    if (formData.userPhonePrimary.length !== 10) {
      alert("Primary Mobile Number must be 10 digits");
      return;
    }
    if (formData.purpose.trim().length === 0) {
      alert("Please enter the Purpose of Booking");
      return;
    }

    if (emailOtpState !== "verified" || !verificationToken) {
      setOtpError("Email verification is mandatory to book the facility.");
      return;
    }

    setIsSubmitting(true);
    try {
      const submissionData = {
        ...formData,
        facilityId: facility.id,
        facilityName: facility.name,
        startTime: `${format(dateRange.start, "yyyy-MM-dd")}T${formData.startTime}:00`,
        endTime: `${format(dateRange.end || dateRange.start, "yyyy-MM-dd")}T${formData.endTime}:00`,
        emailVerificationToken: verificationToken,
      };
      await onSubmit(submissionData);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid =
    formData.userName.trim().length > 0 &&
    formData.purpose.trim().length > 0 &&
    formData.userPhonePrimary.length === 10 &&
    formData.userPhoneSecondary.length === 10 &&
    emailOtpState === "verified" &&
    verificationToken;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Application Form</CardTitle>
        <p className="text-xs text-stone-500 font-medium">
          Date Range: {format(dateRange.start, "PP")} {dateRange.end ? `to ${format(dateRange.end, "PP")}` : ""}
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleFormSubmit} className="space-y-5">
          <div>
            <Label required>Applicant Full Name</Label>
            <Input
              placeholder="e.g. John Doe"
              value={formData.userName}
              onChange={(e) => handleInputChange("userName", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label required>Start Time</Label>
              <select
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/30 px-3.5 py-2 text-stone-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
              >
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <Label required>End Time</Label>
              <select
                className="w-full h-11 rounded-xl border border-stone-200 bg-stone-50/30 px-3.5 py-2 text-stone-900 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-900 focus:border-transparent transition-all duration-200"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
              >
                {timeSlots.filter(t => t > formData.startTime).map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Email verification flow */}
          <div>
            <Label required>Contact Email</Label>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="contact@gbu.ac.in"
                value={formData.userEmail}
                onChange={(e) => handleInputChange("userEmail", e.target.value)}
                disabled={emailOtpState === "verified" || emailOtpState === "verifying"}
                required
              />
              {emailOtpState !== "verified" && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={emailOtpState === "sending" || !formData.userEmail}
                  className="rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-850 transition disabled:opacity-50 whitespace-nowrap min-w-[90px] flex items-center justify-center"
                >
                  {emailOtpState === "sending" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : emailOtpState === "sent" ? (
                    "Resend OTP"
                  ) : (
                    "Send OTP"
                  )}
                </button>
              )}
            </div>

            {emailOtpState === "verified" && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1.5">
                <CheckCircle2 className="h-4 w-4" />
                <span>Email verified successfully</span>
              </div>
            )}

            {otpError && (
              <div className="flex items-center gap-1.5 text-xs text-red-600 font-medium mt-1.5">
                <ShieldAlert className="h-4 w-4" />
                <span>{otpError}</span>
              </div>
            )}

            {(emailOtpState === "sent" || emailOtpState === "verifying") && (
              <div className="mt-3 p-4 border border-stone-200 bg-stone-50/50 rounded-xl space-y-2">
                <Label required>Enter 6-Digit OTP</Label>
                <div className="flex gap-2">
                  <Input
                    maxLength={6}
                    placeholder="123456"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/[^0-9]/g, ""))}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={emailOtpState === "verifying" || otpCode.length !== 6}
                    className="rounded-xl bg-emerald-600 px-4 text-xs font-semibold text-white hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center min-w-[90px]"
                  >
                    {emailOtpState === "verifying" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label required>Primary Mobile Number</Label>
              <Input
                type="tel"
                placeholder="10 digit number"
                value={formData.userPhonePrimary}
                onChange={(e) => handleInputChange("userPhonePrimary", e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Secondary / Emergency Mobile</Label>
              <Input
                type="tel"
                placeholder="10 digit number"
                value={formData.userPhoneSecondary}
                onChange={(e) => handleInputChange("userPhoneSecondary", e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Organization Name (if applicable)</Label>
            <Input
              placeholder="e.g. GBU Department of CSE"
              value={formData.organization}
              onChange={(e) => handleInputChange("organization", e.target.value)}
            />
          </div>

          <div>
            <Label required>Purpose of Booking</Label>
            <Textarea
              placeholder="Describe the nature and purpose of your event in detail..."
              value={formData.purpose}
              onChange={(e) => handleInputChange("purpose", e.target.value)}
              required
            />
          </div>

          {/* Estimated Charges section removed */}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-stone-300 py-3 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-xl bg-stone-900 py-3 text-sm font-semibold text-white hover:bg-stone-850 active:bg-stone-950 transition disabled:opacity-50 shadow-sm flex items-center justify-center"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Submit Booking Request"
              )}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
