import React, { useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  UserCog,
  School,
  GraduationCap,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  Lock,
  Fingerprint,
  KeyRound
} from "lucide-react";
import { loginByRole, verifyLoginOtpService } from "../../services/authService";
import { getRoleHomeRoute, setPortalSession } from "../../utils/portalSession";

const ROLE_OPTIONS = [
  {
    id: "admin",
    title: "Admin Login",
    subtitle: "Central administration",
    icon: UserCog
  },
  {
    id: "school",
    title: "School Login",
    subtitle: "School office",
    icon: School
  },
  {
    id: "faculty",
    title: "Faculty Login",
    subtitle: "Faculty and teaching staff",
    icon: GraduationCap
  },
  /* Student Login — disabled until semester registration ships.
  {
    id: "student",
    title: "Student Login",
    subtitle: "Semester registration",
    icon: BookOpen
  }
  */
];

const LoginPortal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionExpired = searchParams.get("session") === "expired";
  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requiresOtp, setRequiresOtp] = useState(false);
  const [otpEmail, setOtpEmail] = useState("");
  const [forcePasswordReset, setForcePasswordReset] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const selectedRole = useMemo(
    () => ROLE_OPTIONS.find((item) => item.id === role) || ROLE_OPTIONS[0],
    [role]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      if (requiresOtp) {
        if (!otp.trim()) {
          setError("Please enter the OTP.");
          setLoading(false);
          return;
        }
        if (forcePasswordReset && !newPassword.trim()) {
          setError("Please enter a new password.");
          setLoading(false);
          return;
        }

        const response = await verifyLoginOtpService({
          email: otpEmail,
          otp,
          newPassword,
        });

        const authData = response?.data;
        if (!authData?.accessToken || !authData?.refreshToken || !authData?.user?.role) {
          setError("Invalid login response from server.");
          setLoading(false);
          return;
        }

        setPortalSession(authData);
        navigate(getRoleHomeRoute(authData.user.role));
      } else {
        if (!username.trim() || !password.trim()) {
          setError("Please enter both username and password.");
          setLoading(false);
          return;
        }

        const response = await loginByRole({
          role,
          email: username.trim(),
          password,
        });

        const authData = response?.data;
        if (response?.requiresOtp || authData?.requiresOtp) {
          setRequiresOtp(true);
          setOtpEmail(response?.email || authData?.email);
          setForcePasswordReset(response?.forcePasswordReset || authData?.forcePasswordReset);
          return;
        }

        if (!authData?.accessToken || !authData?.refreshToken || !authData?.user?.role) {
          setError("Invalid login response from server.");
          return;
        }

        setPortalSession(authData);
        navigate(getRoleHomeRoute(authData.user.role));
      }
    } catch (err) {
      const serverMessage =
        err?.response?.data?.errors?.[0]?.message || err?.response?.data?.message;
      setError(serverMessage || (requiresOtp ? "Invalid OTP." : "Invalid credentials."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      {/* Back Button */}
      <div className="relative z-10 px-4 pt-6 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <Link
            to="/academics/schools"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-400 hover:text-slate-900 hover:shadow"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Schools
          </Link>
        </div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 flex items-center justify-center px-4 py-8 sm:px-6">
        <div className="w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:grid lg:grid-cols-[1.05fr_1fr]">

          {/* Left Panel — Branding (dark accent panel) */}
          <section className="relative border-b border-slate-200 bg-[#0e1626] p-8 text-white lg:border-b-0 lg:border-r lg:p-12">
            <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
              <div className="h-full w-full bg-[radial-gradient(circle,#ffffff_1px,transparent_1px)] bg-[length:20px_20px]" />
            </div>

            <div className="relative z-10 flex h-full flex-col justify-between gap-10">
              <div>
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-600/40 bg-slate-800/80 shadow-lg">
                    <img
                      src="/assets/logo1.png"
                      alt="GBU Logo"
                      className="h-10 w-10 object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sky-400 tracking-wide">
                      Gautam Buddha University
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">Greater Noida, Uttar Pradesh</p>
                  </div>
                </div>

                <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.75rem] tracking-tight">
                  Unified Access
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 to-blue-400 bg-clip-text text-transparent">
                    Portal
                  </span>
                </h1>
                <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400">
                  Secure login portal for Faculty, School Administration, and Super Admin accounts.
                </p>
              </div>

              {/* Security Card */}
              <div className="space-y-4 rounded-xl border border-slate-700/60 bg-slate-800/50 p-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-500/10">
                    <ShieldCheck className="h-5 w-5 text-sky-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Security Notice</span>
                </div>
                <ul className="space-y-2.5 text-sm text-slate-400">
                  <li className="flex items-start gap-2">
                    <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    Use your official university credentials.
                  </li>
                  <li className="flex items-start gap-2">
                    <Fingerprint className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    Do not share your password with anyone.
                  </li>
                  <li className="flex items-start gap-2">
                    <KeyRound className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
                    Contact system admin for account recovery.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Right Panel — Login Form (light) */}
          <section className="flex items-center bg-white p-6 sm:p-8 lg:p-10">
            <div className="mx-auto w-full max-w-lg">
              <div className="mb-7">
                <h2 className="text-2xl font-bold text-slate-900">Sign In</h2>
                <p className="mt-1 text-sm text-slate-500">Choose your role and enter credentials</p>
              </div>

              {/* Role Selector */}
              <div className="grid gap-3 sm:grid-cols-3">
                {ROLE_OPTIONS.map((item) => {
                  const Icon = item.icon;
                  const isActive = role === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setRole(item.id)}
                      className={`group relative flex flex-col items-center gap-2 rounded-xl border-2 px-3 py-4 text-center transition-all duration-200 ${
                        isActive
                          ? "border-sky-500 bg-sky-50 text-slate-900 shadow-md shadow-sky-100"
                          : "border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300 hover:bg-white hover:text-slate-700"
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors ${
                        isActive ? "bg-sky-100 text-sky-600" : "bg-slate-100 text-slate-400 group-hover:text-slate-500"
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold leading-tight">{item.title.replace(" Login", "")}</p>
                        <p className={`mt-0.5 text-[11px] leading-snug ${isActive ? "text-sky-500" : "text-slate-400"}`}>{item.subtitle}</p>
                      </div>
                      {isActive && (
                        <div className="absolute -top-px left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-sky-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Session Expired Notice */}
              {sessionExpired && !requiresOtp ? (
                <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-800">
                  Your session expired. Please sign in again to continue.
                </div>
              ) : null}

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {requiresOtp ? (
                  <>
                    <div className="rounded-xl border border-sky-200 bg-sky-50 p-3.5 text-sm text-sky-800">
                      An OTP has been sent to <strong>{otpEmail}</strong>. Please enter it below.
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="otp">
                        Enter OTP
                      </label>
                      <input
                        id="otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit OTP"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>
                    {forcePasswordReset && (
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="newPassword">
                          Set New Password (First Time Login)
                        </label>
                        <div className="relative">
                          <input
                            id="newPassword"
                            type={showPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Create a strong password"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="username">
                        Username / Email
                      </label>
                      <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username or email"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700" htmlFor="password">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {error ? (
                  <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">{error}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#0e1626] px-4 py-3.5 font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-[#162035] hover:shadow-slate-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? (requiresOtp ? "Verifying..." : "Signing in...")
                    : (requiresOtp ? "Verify & Login" : `Login as ${selectedRole.title.replace(" Login", "")}`)}
                </button>
              </form>

              {/* Bottom Links */}
              <div className="mt-6 flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="text-slate-500 hover:text-slate-800 transition"
                  onClick={() => navigate("/login/forgot-password")}
                >
                  Forgot password?
                </button>
                <button
                  type="button"
                  className="font-semibold text-sky-600 hover:text-sky-700 transition"
                  onClick={() => navigate("/faculty-register")}
                >
                  Faculty Register →
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPortal;
