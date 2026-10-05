import React from 'react';
import { Wrench, Droplet, Zap, Sparkles, Building2, User, HelpCircle } from 'lucide-react';

const FACULTY_COMPLAINT_FOR = ['School', 'Residential', 'Others'];
const FACULTY_ISSUE_TYPES = [
  { id: 'Civil', icon: Building2, label: 'Civil' },
  { id: 'Carpentry', icon: Wrench, label: 'Carpentry' },
  { id: 'Plumbing', icon: Droplet, label: 'Plumbing' },
  { id: 'Water', icon: Droplet, label: 'Water' },
  { id: 'Electrical', icon: Zap, label: 'Electrical' },
  { id: 'Cleanliness', icon: Sparkles, label: 'Cleanliness' },
  { id: 'Other', icon: HelpCircle, label: 'Other' }
];

const STUDENT_CATEGORIES = {
  'Academic': ['Registration', 'Examination', 'Classes', 'Marksheet', 'Other'],
  'Hostel': ['Room Allotment', 'Mess', 'Maintenance', 'Internet', 'Other'],
  'Infrastructure': ['Classroom', 'Library', 'Sports', 'Other'],
  'Administration': ['Fee', 'Scholarship', 'Documents', 'Other'],
  'Disciplinary': ['Ragging', 'Harassment', 'Other'],
  'IT Services': ['WiFi', 'Email', 'Portal', 'Other'],
  'Other': ['General Inquiry', 'Suggestion']
};

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'];

const GrievanceCategorySelect = ({ type, category, subCategory, complaintFor, issueType, priority, onChange }) => {
  if (type === 'faculty') {
    return (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Complaint For</label>
          <select
            name="complaintFor"
            value={complaintFor || ''}
            onChange={(e) => onChange('complaintFor', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
          >
            <option value="">Select option...</option>
            {FACULTY_COMPLAINT_FOR.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Issue Type</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FACULTY_ISSUE_TYPES.map((issue) => {
              const Icon = issue.icon;
              const isSelected = issueType === issue.id;
              return (
                <button
                  key={issue.id}
                  type="button"
                  onClick={() => onChange('issueType', issue.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border transition ${isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">{issue.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const availableSubcategories = STUDENT_CATEGORIES[category] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
        <select
          name="category"
          value={category || ''}
          onChange={(e) => {
            onChange('category', e.target.value);
            onChange('subCategory', ''); // Reset subcategory when category changes
          }}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
        >
          <option value="">Select category...</option>
          {Object.keys(STUDENT_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Sub-Category</label>
        <select
          name="subCategory"
          value={subCategory || ''}
          onChange={(e) => onChange('subCategory', e.target.value)}
          disabled={!category}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700 disabled:bg-slate-50 disabled:text-slate-500"
        >
          <option value="">Select sub-category...</option>
          {availableSubcategories.map(sub => <option key={sub} value={sub}>{sub}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
        <select
          name="priority"
          value={priority || 'Low'}
          onChange={(e) => onChange('priority', e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-700 focus:ring-1 focus:ring-slate-700"
        >
          {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );
};

export default GrievanceCategorySelect;
