import React, { InputHTMLAttributes } from "react";

// 1. Extend native input attributes to automatically support min, max, step, etc.
interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string; // Enforced for accessibility
  inputValue?: number | string; // Maintained for your existing form compatibility
}

export default function NumberInput({
  className = "",
  id,
  label,
  inputValue,
  ...props
}: NumberInputProps) {
  return (
    // 2. Adaptive mobile gaps
    <div className={`flex flex-col gap-1 md:gap-2 ${className}`}>
      <label 
        htmlFor={id} 
        className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base"
      >
        {label}
      </label>
      
      <input
        type="number"
        id={id}
        name={id}
        value={inputValue !== undefined ? inputValue : props.value}
        // 3. Added touch targets, disabled states, and the Spin-Button reset
        className="w-full bg-white border border-slate-200 text-slate-700 py-2 md:py-2.5 px-3 rounded-lg 
          transition-all cursor-text hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
          disabled:opacity-50 disabled:bg-slate-50 disabled:cursor-not-allowed
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        {...props}
      />
    </div>
  );
}