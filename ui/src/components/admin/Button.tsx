import { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({ className, onClick, children }: ButtonProps) {
  return (
    <button
      onClick={() => onClick && onClick()}
      className={`bg-blue-950 w-full mx-auto text-slate-300 font-bold px-10 py-3 rounded-xl transition-all cursor-pointer 
        hover:bg-blue-800 ${className}`}
    >
      {children}
    </button>
  );
}
