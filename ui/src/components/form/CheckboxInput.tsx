import React, { InputHTMLAttributes } from "react";

// 1. Extend native input attributes so it inherits disabled, required, etc.
// We omit 'type' because we are hardcoding it to "checkbox".
interface CheckboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string; // Enforced for strict accessibility linking
  setChecked?: (value: boolean) => void;
}

export default function CheckboxInput({
  className = "",
  label,
  id,
  checked,
  setChecked,
  onChange,
  ...props
}: CheckboxInputProps) {
  
  // 2. Safely merge your custom setChecked with standard React onChange events
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setChecked) setChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  return (
    // 3. Flex container ensures perfect vertical alignment between the box and the text
    <div className={`flex items-center gap-3 ${className}`}>
      
      {/* 4. Relative wrapper specifically to hold the custom SVG checkmark */}
      <div className="relative flex items-center justify-center shrink-0">
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={handleChange}
          // 5. Increased mobile touch target (w-5 h-5), focus rings, and Tailwind's 'peer' class
          className="appearance-none w-5 h-5 md:w-4 md:h-4 border-2 border-slate-300 rounded cursor-pointer transition-all 
            checked:bg-blue-950 checked:border-blue-950 
            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-1 
            disabled:opacity-50 disabled:cursor-not-allowed peer"
          {...props}
        />
        
        {/* 6. The Missing Checkmark: Controlled purely by CSS using peer-checked */}
        <svg
          className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      
      <label
        htmlFor={id}
        // 7. select-none prevents the text from highlighting if the user taps too fast
        className="text-blue-950 font-semibold cursor-pointer text-sm md:text-base select-none peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
      >
        {label}
      </label>
    </div>
  );
}