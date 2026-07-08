import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary"; // Strict types for our UI design system
}

export default function Button({ 
  className = "", 
  children, 
  type = "button",
  variant = "primary", // Default to the original blue
  ...props 
}: ButtonProps) {
  
  // Base classes that EVERY button shares
  const baseClasses = "w-full md:w-auto font-bold px-6 py-3 md:px-10 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Variant-specific classes
  const variantClasses = {
    primary: "bg-blue-950 text-slate-300 hover:bg-blue-800",
    secondary: "bg-white text-blue-950 border-2 border-blue-950 hover:bg-slate-50"
  };

  return (
    <button
      type={type}
      {...props}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}