import React, { InputHTMLAttributes } from "react";

// 1. Extend native input attributes, omitting 'type' since we hardcode it to "date"
interface DateInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string; // Enforced to guarantee accessibility linking
}

export default function DateInput({
  className = "",
  label,
  id,
  ...props // Captures value, onChange, placeholder, min, max, disabled, etc.
}: DateInputProps) {
  return (
    // 2. Added flex-col with dynamic gaps for better mobile spacing
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      
      {/* 3. Bug Fix: Dynamic htmlFor instead of hardcoded string */}
      <label 
        htmlFor={id} 
        className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
      >
        {label}
      </label>
      
      <input
        type="date"
        id={id}
        name={id}
        // 4. Refined padding for touch targets and added disabled styling
        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 md:py-2.5 px-3 rounded-lg 
          transition-all cursor-text hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}