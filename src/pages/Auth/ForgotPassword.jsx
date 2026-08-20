import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, KeyRound, Mail, Lock } from "lucide-react";
import {
  requestForgotPasswordOtp,
  verifyForgotPasswordOtp,
} from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const extractError = (err, fallback) => {
    return (
      err?.response?.data?.errors?.[0]?.message ||
      err?.response?.data?.message ||
      fallback
    );
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your registered email.");
      return;
    }

    try {
      setLoading(true);
      await requestForgotPasswordOtp({ email: email.trim() });
      setMessage("OTP sent to your email if account exists.");
      setStep(2);
    } catch (err) {
      setError(extractError(err, "Failed to send OTP."));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!otp.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      await verifyForgotPasswordOtp({
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
        confirmPassword,
      });
      setMessage("Password reset successful. Please login.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(extractError(err, "Failed to reset password."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden px-4 py-10 flex flex-col items-center justify-center">
      {/* Subtle background decoration to match login */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="w-full max-w-lg mb-4 relative z-10">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 shadow-xl relative z-10">
        <div className="mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 text-sky-600 mb-5">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Forgot Password</h1>
          <p className="mt-2 text-sm text-slate-500">
            {step === 1
              ? "Enter your registered email address to receive an OTP for password reset."
              : "Enter the OTP sent to your email and your new password."}
          </p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
                Registered Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="name@gbu.ac.in"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:from-sky-400 hover:to-sky-500 hover:shadow-sky-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label htmlFor="otp" className="mb-1.5 block text-sm font-medium text-slate-700">
                Enter OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-center tracking-widest font-mono text-lg"
                placeholder="000000"
                maxLength={6}
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Create new password"
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                  placeholder="Re-enter password"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/30 transition-all hover:from-sky-400 hover:to-sky-500 hover:shadow-sky-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "Resetting..." : "Verify OTP & Reset Password"}
            </button>
          </form>
        )}

        {error ? (
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700 text-center">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-2.5 text-sm font-medium text-sky-700 text-center">
            {message}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ForgotPassword;
