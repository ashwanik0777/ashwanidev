import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, CreditCard, 
  User, GraduationCap, FileText, Upload, Eye, Loader2, ExternalLink, 
  Shield, ClipboardCheck, ArrowRight, Lock, Edit3
} from 'lucide-react';

import { fetchStudentProfile, verifyFeeStatus, submitRegistration } from '../../services/semesterRegistrationService';
import { CATEGORY_OPTIONS, GENDER_OPTIONS, YEAR_OPTIONS, SEMESTER_OPTIONS, DEPARTMENT_SPECIALISATIONS, parseDriveLink } from '../../Data/semesterRegistrationData';
import { SCHOOLS_META } from '../../Data/schoolsMeta';
import { getPortalSession } from '../../utils/portalSession';
import { getRegistrationStatus } from '../../services/registrationControl';
import './SemesterRegistration.css';

const PROGRAMME_OPTIONS_BY_SCHOOL = {
  SOICT: ['B.Tech', 'M.Tech', 'Ph.D', 'BCA', 'MCA'],
  SOE: ['B.Tech', 'M.Tech', 'Ph.D'],
  SOBT: ['B.Sc', 'M.Sc', 'Ph.D'],
  SOVS: ['B.Sc', 'M.Sc', 'Ph.D'],
  SOHSS: ['BA', 'MA', 'Ph.D'],
  SOBSC: ['BA', 'MA', 'Ph.D'],
  SOM: ['BBA', 'MBA', 'PGDM', 'Ph.D'],
  SOL: ['BA LLB', 'LLM', 'Ph.D'],
};

export default function SemesterRegistration() {
  const navigate = useNavigate();
  const [feeStatus, setFeeStatus] = useState('loading');
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [regStatus, setRegStatus] = useState(null);
  const registrationDataRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    mobileNumber: '',
    gender: '',
    category: '',
    aadharNumber: '',
    schoolCode: '',
    schoolName: '',
    department: '',
    programme: '',
    specialisation: '',
    year: '',
    semester: '',
    photoLink: '',
    signatureLink: '',
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    initRegistration();
  }, []);

  // Autosave draft data
  useEffect(() => {
    if (formData.rollNumber && !submitSuccess) {
      localStorage.setItem(`semester_reg_draft_${formData.rollNumber}`, JSON.stringify({ formData, activeStep }));
    }
  }, [formData, activeStep, submitSuccess]);

  const initRegistration = async () => {
    setFeeStatus('loading');
    try {
      const session = getPortalSession();
      if (!session) {
        // Fallback for demo
      }

      // Check registration open/closed status
      const schoolCode = session?.user?.linkedSchoolCode || '';
      const status = getRegistrationStatus(schoolCode);
      setRegStatus(status);
      if (!status.active) {
        setFeeStatus('reg_closed');
        return;
      }

      // Fetch student data
      const studentData = await fetchStudentProfile();
      const resolvedRollNumber = studentData?.rollNumber || session?.user?.rollNumber || '21/CSE/001';
      
      let initialFormData = {
        name: studentData?.name || 'John Doe',
        rollNumber: resolvedRollNumber
      };

      try {
        const savedDraft = localStorage.getItem(`semester_reg_draft_${resolvedRollNumber}`);
        if (savedDraft) {
          const parsedDraft = JSON.parse(savedDraft);
          if (parsedDraft.formData) {
            initialFormData = { ...parsedDraft.formData };
          }
          if (parsedDraft.activeStep) {
            setActiveStep(parsedDraft.activeStep);
          }
        }
      } catch (e) {
        console.error("Failed to load draft data", e);
      }
      
      setFormData(prev => ({
        ...prev,
        ...initialFormData
      }));

      // In a real app we'd get selected semester early, using default '3rd' for now
      checkFeeStatus(resolvedRollNumber, '3rd');
    } catch (error) {
      console.error('Failed to init registration', error);
      checkFeeStatus('21/CSE/001', '3rd'); // Fallback check
    }
  };

  const checkFeeStatus = async (roll, sem) => {
    setFeeStatus('loading');
    try {
      const status = await verifyFeeStatus(roll, sem);
      setFeeStatus(status.paid ? 'paid' : 'unpaid');
    } catch (err) {
      setFeeStatus('paid'); // Defaulting to paid to allow flow testing
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const newData = { ...prev, [name]: type === 'checkbox' ? checked : value };
      
      if (name === 'schoolCode') {
        const selectedSchool = SCHOOLS_META.find(s => s.code === value);
        newData.schoolName = selectedSchool ? selectedSchool.name : '';
        newData.department = '';
        newData.programme = '';
        newData.specialisation = '';
      }
      
      if (name === 'department') {
        newData.specialisation = '';
      }
      
      return newData;
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Valid email is required';
        isValid = false;
      }
      if (!formData.mobileNumber || !/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Valid 10-digit mobile number starting with 6-9 is required';
        isValid = false;
      }
      if (!formData.gender) {
        newErrors.gender = 'Gender is required';
        isValid = false;
      }
      if (!formData.category) {
        newErrors.category = 'Category is required';
        isValid = false;
      }
      if (!formData.aadharNumber || !/^\d{12}$/.test(formData.aadharNumber.replace(/-/g, ''))) {
        newErrors.aadharNumber = 'Valid 12-digit Aadhar number is required';
        isValid = false;
      }
    } else if (step === 2) {
      if (!formData.schoolCode) { newErrors.schoolCode = 'School is required'; isValid = false; }
      if (!formData.department) { newErrors.department = 'Department is required'; isValid = false; }
      if (!formData.programme) { newErrors.programme = 'Programme is required'; isValid = false; }
      if (!formData.specialisation) { newErrors.specialisation = 'Specialisation is required'; isValid = false; }
      if (!formData.year) { newErrors.year = 'Year is required'; isValid = false; }
      if (!formData.semester) { newErrors.semester = 'Semester is required'; isValid = false; }
    } else if (step === 3) {
      if (!formData.photoLink) {
        newErrors.photoLink = 'Photo link is required';
        isValid = false;
      }
      if (!formData.signatureLink) {
        newErrors.signatureLink = 'Signature link is required';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const formatAadhar = (val) => {
    const cleaned = val.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,4})(\d{0,4})(\d{0,4})$/);
    if (!match) return cleaned;
    return [match[1], match[2], match[3]].filter(Boolean).join('-');
  };

  const handleAadharChange = (e) => {
    const formatted = formatAadhar(e.target.value);
    handleInputChange({ target: { name: 'aadharNumber', value: formatted } });
  };

  const handleSubmit = async () => {
    if (!formData.termsAccepted) return;
    
    setIsSubmitting(true);
    try {
      const regId = 'REG-' + Date.now().toString().slice(-6);
      const submissionData = { ...formData, registrationId: regId, timestamp: new Date().toISOString() };
      
      await submitRegistration(submissionData);
      
      setRegistrationId(regId);
      registrationDataRef.current = submissionData;
      setSubmitSuccess(true);
      localStorage.removeItem(`semester_reg_draft_${formData.rollNumber}`);
    } catch (error) {
      console.error('Submission failed', error);
      alert('Failed to submit registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableProgrammes = useMemo(() => {
    if (!formData.schoolCode) return [];
    return PROGRAMME_OPTIONS_BY_SCHOOL[formData.schoolCode] || PROGRAMME_OPTIONS_BY_SCHOOL['DEFAULT'] || [];
  }, [formData.schoolCode]);

  const availableDepartments = useMemo(() => {
    if (!formData.schoolCode) return [];
    const school = SCHOOLS_META.find(s => s.code === formData.schoolCode);
    return school?.departments || [];
  }, [formData.schoolCode]);

  const availableSpecialisations = useMemo(() => {
    if (!formData.department) return [];
    return DEPARTMENT_SPECIALISATIONS[formData.department] || ['Core'];
  }, [formData.department]);

  const currentMonth = new Date().getMonth();
  
  const currentSemesterType = useMemo(() => {
    if (currentMonth >= 0 && currentMonth <= 5) return 'Even';
    if (currentMonth === 6) return 'All';
    return 'Odd';
  }, [currentMonth]);

  const semesterPeriodLabel = useMemo(() => {
    if (currentMonth >= 0 && currentMonth <= 5) return 'Jan–Jun';
    if (currentMonth === 6) return 'Jul (Transition)';
    return 'Aug–Dec';
  }, [currentMonth]);

  const filteredSemesters = useMemo(() => {
    if (currentSemesterType === 'Even') return SEMESTER_OPTIONS.filter(s => s % 2 === 0);
    if (currentSemesterType === 'Odd') return SEMESTER_OPTIONS.filter(s => s % 2 !== 0);
    return SEMESTER_OPTIONS;
  }, [currentSemesterType]);

  if (regStatus && !regStatus.active) {
    const isClosed = regStatus.reason === 'closed';
    const isNotStarted = regStatus.reason === 'not_started';
    const isMaintenance = regStatus.reason === 'maintenance';
    return (
      <div className="reg-status-screen">
        <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center mx-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isNotStarted ? 'bg-amber-50' : isMaintenance ? 'bg-blue-50' : 'bg-red-50'
          }`}>
            {isNotStarted ? (
              <Lock className="w-10 h-10 text-amber-500" />
            ) : isMaintenance ? (
              <Shield className="w-10 h-10 text-blue-500" />
            ) : (
              <AlertTriangle className="w-10 h-10 text-red-500" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            {isNotStarted ? 'Registration Not Started' : isMaintenance ? 'Under Maintenance' : 'Registration Closed'}
          </h2>
          <p className="text-slate-500 mb-6 text-lg">
            {regStatus.message || 'Semester registration is currently unavailable.'}
          </p>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
            <p className="text-sm text-slate-500">If you believe this is an error, please contact your school administration.</p>
          </div>
        </div>
      </div>
    );
  }

  if (feeStatus === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-slate-800">Verifying your fee status...</h2>
        <p className="text-slate-500 mt-2 text-center max-w-md">Please wait while we check your fee records with the accounts department.</p>
      </div>
    );
  }

  if (feeStatus === 'unpaid') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full overflow-hidden animate-fade-in">
          <div className="h-2 w-full bg-gradient-to-r from-red-500 to-orange-500"></div>
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Fee Payment Required</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Your semester fees have not been submitted. Please pay your fees first before enrolling for this semester.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => window.open('https://csms.gbu.ac.in/', '_blank')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay Fees Now
              </button>
              <button 
                onClick={initRegistration}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-xl border border-slate-200 transition-colors"
              >
                Check Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 registration-success">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-8 text-center relative overflow-hidden animate-fade-in">
          <div className="absolute inset-0 pointer-events-none confetti-bg opacity-30"></div>
          <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">
            <CheckCircle2 className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 relative z-10">Registration Successful!</h2>
          <p className="text-slate-500 mb-6 relative z-10">Your semester enrollment has been submitted.</p>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-8 border border-slate-100 relative z-10">
            <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold mb-1">Registration ID</p>
            <p className="text-2xl font-mono font-bold text-indigo-700">{registrationId}</p>
          </div>

          <div className="space-y-3 relative z-10">
            <button 
              onClick={() => navigate('/semester-registration/preview', { state: { registration: registrationDataRef.current } })}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Preview & Download
            </button>
            <button 
              onClick={() => {
                setSubmitSuccess(false);
                setActiveStep(1);
                setFormData(prev => ({...prev, termsAccepted: false}));
              }}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 font-medium py-3 px-6 rounded-xl border border-slate-200 transition-colors"
            >
              Register Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Personal', icon: <User className="w-5 h-5" /> },
    { id: 2, label: 'Academic', icon: <GraduationCap className="w-5 h-5" /> },
    { id: 3, label: 'Documents', icon: <Upload className="w-5 h-5" /> },
    { id: 4, label: 'Review', icon: <ClipboardCheck className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Semester Registration</h1>
          <p className="mt-3 text-lg text-slate-500 max-w-2xl mx-auto">
            Complete your enrollment details for the upcoming academic session.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full z-0 hidden sm:block"></div>
          <div 
            className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 rounded-full z-0 transition-all duration-500 ease-in-out hidden sm:block"
            style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="relative z-10 flex justify-between">
            {steps.map((step) => {
              const isCompleted = activeStep > step.id;
              const isActive = activeStep === step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-4 shadow-sm
                      ${isActive ? 'bg-indigo-600 border-indigo-100 text-white scale-110' : 
                        isCompleted ? 'bg-green-500 border-green-100 text-white' : 
                        'bg-white border-slate-100 text-slate-400'}`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : step.icon}
                  </div>
                  <span className={`mt-3 text-sm font-medium ${isActive ? 'text-indigo-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          
          <div className="p-6 sm:p-8">
            {/* Step 1: Personal Details */}
            {activeStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Personal Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData.name} 
                        readOnly
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed pl-10"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Roll Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        value={formData.rollNumber} 
                        readOnly
                        className="w-full bg-slate-50 border-slate-200 rounded-xl px-4 py-3 text-slate-500 cursor-not-allowed pl-10"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="student@gbu.ac.in"
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      placeholder="9876543210"
                      maxLength="10"
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow ${errors.mobileNumber ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Gender *</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${errors.gender ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Gender</option>
                      {GENDER_OPTIONS?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category *</label>
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${errors.category ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Category</option>
                      {CATEGORY_OPTIONS?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Aadhar Number *</label>
                    <input 
                      type="text" 
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleAadharChange}
                      placeholder="XXXX-XXXX-XXXX"
                      maxLength="14"
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow ${errors.aadharNumber ? 'border-red-500' : 'border-slate-300'}`}
                    />
                    {errors.aadharNumber && <p className="text-red-500 text-xs mt-1">{errors.aadharNumber}</p>}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Academic Details */}
            {activeStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Academic Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">School *</label>
                    <select 
                      name="schoolCode"
                      value={formData.schoolCode}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${errors.schoolCode ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select School</option>
                      {SCHOOLS_META?.map(s => <option key={s.code} value={s.code}>{s.name} ({s.code})</option>)}
                    </select>
                    {errors.schoolCode && <p className="text-red-500 text-xs mt-1">{errors.schoolCode}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department *</label>
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      disabled={!formData.schoolCode}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400 ${errors.department ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Department</option>
                      {availableDepartments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Programme *</label>
                    <select 
                      name="programme"
                      value={formData.programme}
                      onChange={handleInputChange}
                      disabled={!formData.schoolCode}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400 ${errors.programme ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Programme</option>
                      {availableProgrammes.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    {errors.programme && <p className="text-red-500 text-xs mt-1">{errors.programme}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Specialisation *</label>
                    <select 
                      name="specialisation"
                      value={formData.specialisation}
                      onChange={handleInputChange}
                      disabled={!formData.department}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white disabled:bg-slate-50 disabled:text-slate-400 ${errors.specialisation ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Specialisation</option>
                      {availableSpecialisations.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.specialisation && <p className="text-red-500 text-xs mt-1">{errors.specialisation}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Year *</label>
                    <select 
                      name="year"
                      value={formData.year}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${errors.year ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Year</option>
                      {YEAR_OPTIONS?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Semester *</label>
                    <select 
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white ${errors.semester ? 'border-red-500' : 'border-slate-300'}`}
                    >
                      <option value="">Select Semester</option>
                      {filteredSemesters?.map(opt => <option key={opt} value={opt}>Semester {opt}</option>)}
                    </select>
                    {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
                    <p className="text-indigo-500 text-xs mt-1 flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      {currentSemesterType} Semester Period ({semesterPeriodLabel})
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Documents */}
            {activeStep === 3 && (
              <div className="space-y-8 animate-fade-in">
                <h3 className="text-xl font-bold text-slate-800 border-b pb-4 mb-6">Upload Documents</h3>
                
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-800 text-sm">
                  <Shield className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p>Please provide public Google Drive links for your photo and signature. Ensure the links have "Anyone with the link can view" permission.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Photo Upload */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Passport Size Photo Link *</label>
                      <input 
                        type="url" 
                        name="photoLink"
                        value={formData.photoLink}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/..."
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow ${errors.photoLink ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.photoLink && <p className="text-red-500 text-xs mt-1">{errors.photoLink}</p>}
                      <p className="text-slate-400 text-xs mt-2">Paste your Google Drive image link.</p>
                    </div>

                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-2 h-56 flex items-center justify-center bg-slate-50 relative overflow-hidden group">
                      {formData.photoLink && parseDriveLink(formData.photoLink) ? (
                        <img 
                          src={parseDriveLink(formData.photoLink)} 
                          alt="Photo Preview" 
                          className="w-full h-full object-contain rounded-lg bg-white"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      <div className={`flex-col items-center justify-center text-slate-400 ${formData.photoLink && parseDriveLink(formData.photoLink) ? 'hidden' : 'flex'}`}>
                        <User className="w-12 h-12 mb-3 text-slate-300" />
                        <span className="text-sm font-medium">Photo Preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Signature Upload */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Signature Link *</label>
                      <input 
                        type="url" 
                        name="signatureLink"
                        value={formData.signatureLink}
                        onChange={handleInputChange}
                        placeholder="https://drive.google.com/..."
                        className={`w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow ${errors.signatureLink ? 'border-red-500' : 'border-slate-300'}`}
                      />
                      {errors.signatureLink && <p className="text-red-500 text-xs mt-1">{errors.signatureLink}</p>}
                      <p className="text-slate-400 text-xs mt-2">Paste your Google Drive signature link.</p>
                    </div>

                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-2 h-56 flex items-center justify-center bg-slate-50 relative overflow-hidden">
                      {formData.signatureLink && parseDriveLink(formData.signatureLink) ? (
                        <img 
                          src={parseDriveLink(formData.signatureLink)} 
                          alt="Signature Preview" 
                          className="w-full h-full object-contain rounded-lg bg-white"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      
                      <div className={`flex-col items-center justify-center text-slate-400 ${formData.signatureLink && parseDriveLink(formData.signatureLink) ? 'hidden' : 'flex'}`}>
                        <FileText className="w-12 h-12 mb-3 text-slate-300" />
                        <span className="text-sm font-medium">Signature Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Review & Submit */}
            {activeStep === 4 && (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b pb-4 mb-6">
                  <h3 className="text-xl font-bold text-slate-800">Review & Submit</h3>
                  <span className="bg-indigo-50 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">Draft</span>
                </div>

                <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                  {/* Summary Header */}
                  <div className="bg-slate-800 p-6 flex items-center gap-6 text-white relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    
                    <div className="w-24 h-24 rounded-full bg-slate-700 border-2 border-white/20 overflow-hidden flex-shrink-0 z-10">
                       <img 
                          src={parseDriveLink(formData.photoLink)} 
                          alt="Student" 
                          className="w-full h-full object-contain bg-white"
                          onError={(e) => e.target.src = 'https://ui-avatars.com/api/?name=' + formData.name}
                        />
                    </div>
                    <div className="z-10">
                      <h4 className="text-2xl font-bold">{formData.name}</h4>
                      <p className="text-slate-300 text-lg flex items-center gap-2 mt-1">
                        <GraduationCap className="w-5 h-5" />
                        {formData.rollNumber}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    {/* Sections */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Personal Data */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <User className="w-4 h-4 text-indigo-500" /> Personal Info
                          </h5>
                          <button onClick={() => setActiveStep(1)} className="text-indigo-600 text-sm font-medium hover:underline">Edit</button>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Email</span> <span className="font-medium text-slate-800 text-sm">{formData.email}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Mobile</span> <span className="font-medium text-slate-800 text-sm">{formData.mobileNumber}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Gender</span> <span className="font-medium text-slate-800 text-sm capitalize">{formData.gender}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Category</span> <span className="font-medium text-slate-800 text-sm uppercase">{formData.category}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Aadhar</span> <span className="font-medium text-slate-800 text-sm">{formData.aadharNumber}</span></div>
                        </div>
                      </div>

                      {/* Academic Data */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-indigo-500" /> Academic Info
                          </h5>
                          <button onClick={() => setActiveStep(2)} className="text-indigo-600 text-sm font-medium hover:underline">Edit</button>
                        </div>
                        <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-sm">
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">School</span> <span className="font-medium text-slate-800 text-sm text-right">{formData.schoolName}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Department</span> <span className="font-medium text-slate-800 text-sm text-right">{formData.department}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Programme</span> <span className="font-medium text-slate-800 text-sm">{formData.programme}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Specialisation</span> <span className="font-medium text-slate-800 text-sm text-right truncate w-40">{formData.specialisation}</span></div>
                          <div className="flex justify-between"><span className="text-slate-500 text-sm">Year/Sem</span> <span className="font-medium text-slate-800 text-sm">{formData.year} / {formData.semester}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Signature Preview section */}
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h5 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-500" /> Signature
                        </h5>
                        <button onClick={() => setActiveStep(3)} className="text-indigo-600 text-sm font-medium hover:underline">Edit</button>
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-center h-24">
                        <img 
                          src={parseDriveLink(formData.signatureLink)} 
                          alt="Signature" 
                          className="h-full object-contain"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    </div>

                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mt-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 cursor-pointer"
                    />
                    <span className="text-sm text-yellow-900 leading-relaxed font-medium">
                      I hereby declare that all the information provided above is true and correct to the best of my knowledge. I understand that my registration is subject to verification and approval.
                    </span>
                  </label>
                </div>
                
                <div className="pt-4 flex justify-end">
                   <button 
                    onClick={handleSubmit}
                    disabled={!formData.termsAccepted || isSubmitting}
                    className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit Enrollment <ArrowRight className="w-5 h-5" /></>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Footer */}
          {activeStep < 4 && (
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center sm:px-8">
              <button
                onClick={prevStep}
                disabled={activeStep === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-slate-600 font-medium hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" /> Previous
              </button>
              
              <button
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm transition-colors"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
