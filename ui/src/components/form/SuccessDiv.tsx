import React from "react";

interface SuccessDivProps {
  isSuccess: boolean;
  // 1. Defensive typing, just like the ErrorDiv
  successMessage?: string | null; 
}

export default function SuccessDiv({ isSuccess, successMessage }: SuccessDivProps) {
  // 2. The Early Return Pattern to save render cycles
  if (!isSuccess || !successMessage) return null;

  return (
    // 3. Notice the aria-live attribute here compared to the ErrorDiv!
    <div 
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 md:gap-3 bg-green-50 border border-green-200 text-green-700 px-3 md:px-4 py-3 mb-4 md:mb-6 rounded-xl text-sm font-medium animate-fade-in w-full"
    >
      {/* 4. A semantic success checkmark to assist color-blind users */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 shrink-0 text-green-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{successMessage}</span>
    </div>
  );
}