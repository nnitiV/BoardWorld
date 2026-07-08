import { ButtonHTMLAttributes, ReactNode } from "react";

// 1. Extend native HTML attributes instead of manually typing props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // className and onClick are automatically inherited from ButtonHTMLAttributes
}

export default function Button({ 
  className = "", 
  children, 
  type = "button", // Default to "button" to prevent accidental form submissions
  ...props 
}: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      // 2. Mobile-first layout: full width on mobile, auto width on desktop
      className={`bg-blue-950 cursor-pointer w-full md:w-auto text-slate-300 font-bold px-6 py-3 md:px-10 rounded-xl transition-all 
        hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 
        disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}