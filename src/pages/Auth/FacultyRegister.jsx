import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone,
  User,
  GraduationCap,
  Briefcase,
  School,
} from "lucide-react";
import { SCHOOLS_META } from "../../Data/schoolsMeta";
import {
  sendRegistrationOtp,
  verifyRegistrationOtp,
  submitFacultyRegistration,
} from "../../services/facultyRegistrationService";

/* ── Static option lists ── */

const CATEGORY_OPTIONS = [
  "Permanent",
  "Contractual",
  "OCFD (On Contract for Fixed Duration)",
  "PhD Scholar",
  "Guest Faculty",
  "Visiting Faculty",
];

const DESIGNATION_OPTIONS = [
  "Professor",
  "Associate Professor",
  "Assistant Professor",
  "Lecturer",
  "Senior Lecturer",
  "Research Associate",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ── Component ── */

const FacultyRegister = () => {
  const navigate = useNavigate();

  /* ── Form state ── */
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [schoolCode, setSchoolCode] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  /* ── OTP / email verification state ── */
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | sending | otp-sent | verifying | verified
  const [otp, setOtp] = useState("");
  const [emailVerificationToken, setEmailVerificationToken] = useState("");
  const [otpMessage, setOtpMessage] = useState("");

  /* ── General UI state ── */
  const [error, setError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ── Derived values ── */
  const selectedSchool = useMemo(
    () => SCHOOLS_META.find((s) => s.code === schoolCode) || null,
    [schoolCode]
  );

  const departments = useMemo(
    () => selectedSchool?.departments || [],
    [selectedSchool]
  );

  const isEmailValid = EMAIL_REGEX.test(email);
  const isMobileValid = /^\d{10}$/.test(mobile);

  const canSubmit =
    name.trim() &&
    category &&
    schoolCode &&
    department &&
    designation &&
    isEmailValid &&
    emailStatus === "verified" &&
    isMobileValid &&
    !submitting;

  /* ── Handlers ── */

  const handleSchoolChange = (code) => {
    setSchoolCode(code);
    setDepartment("");
  };

  const handleMobileChange = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    setMobile(digits);
    if (mobileError) setMobileError("");
  };

  const handleMobileBlur = () => {
    if (mobile && mobile.length !== 10) {
      setMobileError("Mobile number must be exactly 10 digits.");
    } else {
      setMobileError("");
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    // Reset verification when email changes
    if (emailStatus !== "idle") {
      setEmailStatus("idle");
      setOtp("");
      setEmailVerificationToken("");
      setOtpMessage("");
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setOtpMessage("");
    setEmailStatus("sending");
    try {
      await sendRegistrationOtp({ email: email.trim() });
      setEmailStatus("otp-sent");
      setOtpMessage("OTP sent to your email. Please check your inbox.");
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      setError(msg);
      setEmailStatus("idle");
    }
  };

  const handleVerifyOtp = async () => {
    setError("");
    setEmailStatus("verifying");
    try {
      const res = await verifyRegistrationOtp({ email: email.trim(), otp: otp.trim() });
      setEmailVerificationToken(res?.data?.emailVerificationToken || res?.emailVerificationToken || "verified");
      setEmailStatus("verified");
      setOtpMessage("");
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        "Invalid OTP. Please try again.";
      setError(msg);
      setEmailStatus("otp-sent");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setError("");
    setSubmitting(true);
    try {
      await submitFacultyRegistration({
        name: name.trim(),
        category,
        schoolCode,
        department,
        designation,
        email: email.trim(),
        mobile: mobile.trim(),
        emailVerificationToken,
      });
      setSubmitted(true);
    } catch (err) {
      const msg =
        err?.response?.data?.errors?.[0]?.message ||
        err?.response?.data?.message ||
        "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Shared Tailwind fragments ── */
  const inputClass =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-900";
  const selectClass =
    "w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-stone-900 appearance-none";
  const labelClass = "mb-1 block text-sm font-medium text-stone-700";

  /* ────────────────────────── RENDER ────────────────────────── */

  /* ── Success Screen ── */
  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-100 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 max-w-7xl">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-stone-500 hover:text-stone-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </div>

        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center justify-center">
          <div className="w-full rounded-3xl border border-stone-300 bg-white p-10 text-center shadow-2xl">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">
              Registration Submitted Successfully!
            </h2>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Your request has been sent for approval. Once approved, you will
              receive login credentials on your email.
            </p>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-8 w-full rounded-xl bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-stone-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Layout ── */
  return (
    <div className="min-h-screen bg-stone-100 px-4 py-8 sm:px-6 lg:px-8">
      {/* Back link */}
      <div className="mx-auto mb-4 max-w-7xl">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white px-3 py-1.5 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-stone-500 hover:text-stone-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      {/* Split card */}
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden rounded-3xl border border-stone-300 bg-white shadow-2xl lg:grid-cols-[1.1fr_1fr]">
        {/* ── Left Panel ── */}
        <section className="relative border-b border-stone-200 bg-stone-900 p-8 text-stone-100 lg:border-b-0 lg:border-r lg:p-12">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="h-full w-full bg-[radial-gradient(circle_at_20%_20%,#f5f5f4_1px,transparent_1px)] bg-[length:18px_18px]" />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-stone-600 bg-stone-800 px-4 py-2 text-sm">
                <Building2 className="h-4 w-4" />
                Gautam Buddha University
              </div>
              <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                Faculty Registration
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-300 lg:text-lg">
                Register as a faculty member. Your request will be reviewed by
                the administration.
              </p>
            </div>

            <div className="space-y-4 rounded-2xl border border-stone-700 bg-stone-800/80 p-6">
              <div className="flex items-center gap-3 text-lg font-semibold">
                <ShieldCheck className="h-5 w-5 text-stone-200" />
                How It Works
              </div>
              <ol className="space-y-2 text-sm text-stone-300 list-decimal list-inside">
                <li>Fill in your details in the registration form.</li>
                <li>Verify your email address via OTP.</li>
                <li>Submit the registration request.</li>
                <li>Await approval from the administration.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* ── Right Panel ── */}
        <section className="overflow-y-auto p-6 sm:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-stone-900">
                Create Your Account
              </h2>
              <p className="mt-1 text-sm text-stone-500">
                All fields are required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* 1. Faculty Name */}
              <div>
                <label className={labelClass} htmlFor="reg-name">
                  <span className="inline-flex items-center gap-1.5">
                    <User className="h-4 w-4" /> Faculty Name
                  </span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              {/* 2. Category */}
              <div>
                <label className={labelClass} htmlFor="reg-category">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> Category
                  </span>
                </label>
                <select
                  id="reg-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 3. School */}
              <div>
                <label className={labelClass} htmlFor="reg-school">
                  <span className="inline-flex items-center gap-1.5">
                    <School className="h-4 w-4" /> School
                  </span>
                </label>
                <select
                  id="reg-school"
                  value={schoolCode}
                  onChange={(e) => handleSchoolChange(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select school
                  </option>
                  {SCHOOLS_META.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 4. Department */}
              <div>
                <label className={labelClass} htmlFor="reg-department">
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" /> Department
                  </span>
                </label>
                <select
                  id="reg-department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  disabled={!schoolCode}
                  className={`${selectClass} ${!schoolCode ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  <option value="" disabled>
                    {schoolCode ? "Select department" : "Select a school first"}
                  </option>
                  {departments.map((d) => (
                    <option key={d.id || d.name} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 5. Designation */}
              <div>
                <label className={labelClass} htmlFor="reg-designation">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> Designation
                  </span>
                </label>
                <select
                  id="reg-designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className={selectClass}
                >
                  <option value="" disabled>
                    Select designation
                  </option>
                  {DESIGNATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* 6. Email + OTP Verification */}
              <div>
                <label className={labelClass} htmlFor="reg-email">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-4 w-4" /> Email Address
                  </span>
                </label>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="you@university.edu"
                      disabled={emailStatus === "verified"}
                      className={`${inputClass} ${emailStatus === "verified" ? "border-emerald-400 bg-emerald-50 pr-10" : ""}`}
                    />
                    {emailStatus === "verified" && (
                      <CheckCircle2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-600" />
                    )}
                  </div>

                  {emailStatus !== "verified" && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={
                        !isEmailValid ||
                        emailStatus === "sending" ||
                        emailStatus === "verifying"
                      }
                      className="shrink-0 rounded-xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm font-semibold text-stone-800 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {emailStatus === "sending" ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                </div>

                {/* OTP success banner */}
                {otpMessage && (
                  <p className="mt-2 text-sm font-medium text-green-700">
                    {otpMessage}
                  </p>
                )}

                {/* Verified label */}
                {emailStatus === "verified" && (
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" /> Email verified
                  </p>
                )}

                {/* OTP Input */}
                {(emailStatus === "otp-sent" || emailStatus === "verifying") && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                      }
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className={inputClass}
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={otp.length < 6 || emailStatus === "verifying"}
                      className="shrink-0 rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {emailStatus === "verifying" ? "Verifying..." : "Verify OTP"}
                    </button>
                  </div>
                )}
              </div>

              {/* 7. Mobile Number */}
              <div>
                <label className={labelClass} htmlFor="reg-mobile">
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-4 w-4" /> Mobile Number
                  </span>
                </label>
                <input
                  id="reg-mobile"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => handleMobileChange(e.target.value)}
                  onBlur={handleMobileBlur}
                  placeholder="10-digit mobile number"
                  className={`${inputClass} ${mobileError ? "border-red-400" : ""}`}
                />
                {mobileError && (
                  <p className="mt-1 text-sm font-medium text-red-700">
                    {mobileError}
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <p className="text-sm font-medium text-red-700">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full rounded-xl bg-stone-900 px-4 py-3 font-semibold text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? "Submitting..." : "Submit Registration"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-stone-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-stone-900 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FacultyRegister;
