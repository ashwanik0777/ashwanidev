import React from "react";

export const Field = ({ label, hint, children }) => (
  <div>
    <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
    {children}
    {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
  </div>
);

export default Field;
