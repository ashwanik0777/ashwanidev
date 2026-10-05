import React from "react";
import { useNavigate } from "react-router-dom";
import { clearPortalSession } from "../../utils/portalSession";
import { LogOut, GraduationCap } from "lucide-react";
import GrievanceSubmissionForm from "../../components/grievance/GrievanceSubmissionForm";
import GrievanceTrackingList from "../../components/grievance/GrievanceTrackingList";

const StudentGrievanceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-2.5"><GraduationCap className="h-6 w-6 text-blue-700" /></div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Student Grievance Portal</h1>
              <p className="text-sm text-slate-500">Submit and track your grievances</p>
            </div>
          </div>
          <button
            onClick={() => { clearPortalSession(); navigate("/login"); }}
            className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700 hover:bg-rose-100 transition"
          >
            <LogOut className="inline h-4 w-4 mr-1" /> Logout
          </button>
        </div>

        {/* Submission Form */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Submit a Grievance</h2>
          <p className="text-sm text-slate-500 mb-6">Fill in the details below to register your complaint or feedback.</p>
          <GrievanceSubmissionForm userType="student" onSubmitSuccess={() => {}} />
        </div>

        {/* Tracking */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">My Submitted Grievances</h2>
          <GrievanceTrackingList userType="student" />
        </div>
      </div>
    </div>
  );
};

export default StudentGrievanceDashboard;
