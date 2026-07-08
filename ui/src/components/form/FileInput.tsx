import React, { InputHTMLAttributes, useState } from "react";

// 1. Extend native input attributes, omitting type and multiple since we control those explicitly
interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "multiple"> {
  id: string; // Enforced for accessibility
  label: string;
  isMultiple?: boolean;
  resetKey?: string | number; 
}

export default function FileInput({
  className = "",
  id,
  label,
  isMultiple = false,
  resetKey,
  ...props // Absorbs onChange, accept, disabled, required, etc.
}: FileInputProps) {
  return (
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
      >
        {label}
      </label>
      
      <input
        // 2. The key is moved directly to the input to optimize re-renders
        key={resetKey}
        type="file"
        id={id}
        name={id}
        multiple={isMultiple}
        className="w-full text-sm text-slate-500 bg-white border border-slate-200 rounded-lg shadow-sm
          file:mr-4 file:py-2 md:file:py-2.5 file:px-4 
          file:rounded-l-lg file:border-0 file:border-r file:border-slate-200
          file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 
          hover:file:bg-blue-100 cursor-pointer transition-all
          focus:outline-none focus:ring-2 focus:ring-blue-500/50
          disabled:opacity-50 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}