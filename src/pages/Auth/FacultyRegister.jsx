import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert } from "lucide-react";

const FacultyRegister = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-sky-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="w-full max-w-lg mb-4 relative z-10">
        <Link
          to="/login"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition-all hover:border-slate-300 hover:text-slate-900 hover:shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl relative z-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 mb-6">
          <ShieldAlert className="h-8 w-8" />
        </div>
        
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
          Registration Disabled
        </h1>
        
        <p className="text-slate-600 leading-relaxed">
          Self-registration for faculty members is currently disabled. 
          Please contact the University Administration or IT Cell to create your faculty profile.
        </p>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            For further assistance, reach out to the administrative office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyRegister;
