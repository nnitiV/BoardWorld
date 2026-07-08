import React, { TextareaHTMLAttributes } from "react";

// 1. Extend native textarea attributes to support rows, maxLength, disabled, etc.
interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string; // Enforced for accessibility
  inputValue?: string; // Maintained for your existing form compatibility
}

export default function TextAreaInput({
  className = "",
  id,
  label,
  inputValue,
  ...props
}: TextAreaInputProps) {
  return (
    // 2. Added flex-col with dynamic gaps for mobile spacing
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
      >
        {label}
      </label>
      
      <textarea
        id={id}
        name={id}
        value={inputValue !== undefined ? inputValue : props.value}
        // 3. Fixed the height bug, adjusted padding, and locked the resize axis
        className="w-full min-h-[120px] bg-white border border-slate-200 text-slate-700 p-3 rounded-lg 
          transition-all cursor-text hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed resize-y"
        {...props}
      />
    </div>
  );
}