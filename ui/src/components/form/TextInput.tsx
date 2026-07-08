import React, { InputHTMLAttributes } from "react";

// 1. Extend native input attributes to automatically support maxLength, pattern, disabled, etc.
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string; // Enforced for accessibility
  inputValue?: string; // Maintained for backward compatibility with your forms
}

export default function TextInput({
  className = "",
  type = "text", // 2. Set a sensible default so you don't have to type it every time
  id,
  label,
  inputValue,
  ...props
}: TextInputProps) {
  return (
    // 3. Adaptive mobile gaps
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
      >
        {label}
      </label>
      
      <input
        type={type}
        id={id}
        name={id}
        value={inputValue !== undefined ? inputValue : props.value}
        // 4. Fixed the padding dead-zone and added disabled states
        className="w-full appearance-none bg-white border border-slate-200 text-slate-700 py-2 md:py-2.5 px-3 rounded-lg 
          transition-all cursor-text hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed"
        {...props}
      />
    </div>
  );
}