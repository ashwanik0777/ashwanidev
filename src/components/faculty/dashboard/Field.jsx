import React from "react";

export const Field = ({ label, children }) => (
  <div>
    <span className="mb-1 block text-sm font-medium text-stone-700">{label}</span>
    {children}
  </div>
);

export default Field;
