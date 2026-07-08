import React from "react";

interface ErrorDivProps {
  isError: boolean;
  // 1. Expanded type: APIs often return null or undefined for errors when successful
  errorMessage?: string | null; 
}

export default function ErrorDiv({ isError, errorMessage }: ErrorDivProps) {
  // 2. The Early Return Pattern
  if (!isError || !errorMessage) return null;

  return (
    // 3. Accessibility & Layout Refinements
    <div 
      role="alert"
      aria-live="assertive"
      className="flex items-center gap-2 md:gap-3 bg-red-50 border border-red-200 text-red-700 px-3 md:px-4 py-3 mb-4 md:mb-6 rounded-xl text-sm font-medium animate-fade-in w-full"
    >
      {/* 4. Visual UX: Icons for Color-Blind Accessibility */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 shrink-0 text-red-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={2}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{errorMessage}</span>
    </div>
  );
}