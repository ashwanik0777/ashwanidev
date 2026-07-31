import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Printer, Download, ArrowLeft, GraduationCap } from 'lucide-react';
import './SemesterRegistration.css';
import { parseDriveLink, REGISTRATION_STORAGE_KEY } from '../../Data/semesterRegistrationData';

const RegistrationPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const printRef = useRef(null);

  // Try location.state first, then try latest localStorage entry
  let registration = location.state?.registration || null;
  if (!registration) {
    try {
      const stored = JSON.parse(localStorage.getItem(REGISTRATION_STORAGE_KEY) || '[]');
      if (stored.length > 0) registration = stored[0];
    } catch (e) { /* ignore */ }
  }

  if (!registration) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
          <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find your registration data. Please fill the form again.</p>
          <button
            onClick={() => navigate('/semester-registration')}
            className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Use the browser's built-in print-to-PDF which respects our @media print CSS
    window.print();
  };

  const getImageUrl = (link) => {
    if (!link) return '';
    try {
      return parseDriveLink(link) || link;
    } catch (e) {
      return link;
    }
  };

  const RegistrationCopy = ({ type }) => {
    const isStudent = type === 'student';
    
    return (
      <div className="registration-copy flex flex-col justify-between">
        {/* Header Section */}
        <div className="border-b-2 border-indigo-900 pb-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/logo1.png" alt="GBU Logo" className="w-16 h-16 object-contain" onError={(e) => e.target.src = 'https://via.placeholder.com/64?text=GBU'} />
              <div>
                <h1 className="text-xl font-bold text-indigo-900 uppercase tracking-wide m-0 leading-tight">Gautam Buddha University</h1>
                <p className="text-sm text-gray-600 m-0">Greater Noida, Uttar Pradesh 201312</p>
                <h2 className="text-lg font-bold text-gray-800 mt-1 uppercase">Semester Registration Form</h2>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-200">
                {isStudent ? 'STUDENT COPY' : 'OFFICE COPY'}
              </div>
              <p className="text-xs text-gray-500 m-0">Reg No: <span className="font-semibold text-gray-800">{registration.registrationId || registration.id || `REG-${new Date().getFullYear()}-${Math.floor(Math.random() * 10000)}`}</span></p>
              <p className="text-xs text-gray-500 m-0">Date: <span className="font-semibold text-gray-800">{new Date(registration.timestamp || registration.registrationDate || Date.now()).toLocaleDateString('en-IN')}</span></p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex gap-6">
          {/* Form Data */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</span>
                <span className="w-2/3 text-base font-bold text-gray-900">{registration.name || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Roll Number</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.rollNumber || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Programme</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.programme || 'N/A'}</span>
              </div>
              
              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">School</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.schoolName || registration.school || 'N/A'}</span>
              </div>

              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">Department</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.department || '—'}</span>
              </div>

              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">Specialisation</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.specialisation || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Year</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.year || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Semester</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.semester || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Category</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.category || 'N/A'}</span>
              </div>
              
              <div className="flex mb-1 border-b pb-1">
                <span className="w-2/5 text-xs font-semibold text-gray-600 uppercase">Gender</span>
                <span className="w-3/5 text-sm font-medium text-gray-900">{registration.gender || 'N/A'}</span>
              </div>

              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">Aadhar</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.aadhar || registration.aadharNumber || 'N/A'}</span>
              </div>

              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">Email</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.email || 'N/A'}</span>
              </div>

              <div className="col-span-2 flex mb-1 border-b pb-1">
                <span className="w-1/3 text-xs font-semibold text-gray-600 uppercase">Mobile</span>
                <span className="w-2/3 text-sm font-medium text-gray-900">{registration.mobile || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Photos & Signatures */}
          <div className="w-32 flex flex-col items-center gap-4 flex-shrink-0">
            <div className="w-28 h-32 border border-gray-300 rounded overflow-hidden bg-gray-50 flex flex-col items-center justify-center">
              {registration.photoLink ? (
                <img src={getImageUrl(registration.photoLink)} alt="Student Photo" className="w-full h-full object-contain bg-white" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              ) : null}
              <span className="text-xs text-gray-400 font-medium text-center px-2" style={{ display: registration.photoLink ? 'none' : 'block' }}>PASSPORT<br/>PHOTO</span>
            </div>
            
            <div className="w-28 h-12 border border-gray-300 rounded overflow-hidden bg-gray-50 flex flex-col items-center justify-center mt-2">
              {registration.signatureLink ? (
                <img src={getImageUrl(registration.signatureLink)} alt="Student Signature" className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
              ) : null}
              <span className="text-[10px] text-gray-400 font-medium" style={{ display: registration.signatureLink ? 'none' : 'block' }}>SIGNATURE</span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-end">
            <div className="w-48 text-center">
              <div className="h-10"></div>
              <div className="border-t border-gray-400 pt-1 text-xs font-semibold text-gray-600">Student Signature</div>
            </div>
            {isStudent ? (
              <div className="w-48 text-center">
                <div className="h-10"></div>
                <div className="border-t border-gray-400 pt-1 text-xs font-semibold text-gray-600">Official Stamp & Sign</div>
              </div>
            ) : (
              <>
                <div className="w-48 text-center">
                  <div className="h-10"></div>
                  <div className="border-t border-gray-400 pt-1 text-xs font-semibold text-gray-600">Verified By</div>
                </div>
                <div className="w-32 text-center">
                  <div className="h-10"></div>
                  <div className="border-t border-gray-400 pt-1 text-xs font-semibold text-gray-600">Date</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Controls Bar (No Print) */}
      <div className="max-w-6xl mx-auto mb-8 no-print flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg text-green-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Registration Successful!</h2>
            <p className="text-sm text-gray-500">Print or save as this form PDF and submit to the office.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/semester-registration')}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2 shadow-sm"
          >
            <Printer className="w-4 h-4" />
            Print Form
          </button>
        </div>
      </div>

      {/* A4 Preview Container */}
      <div className="registration-print-area" ref={printRef}>
        <div className="registration-a4-page">
          <RegistrationCopy type="student" />
          <div className="cut-line"></div>
          <RegistrationCopy type="office" />
        </div>
      </div>
    </div>
  );
};

export default RegistrationPreview;
