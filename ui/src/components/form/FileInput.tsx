import React from "react";

interface FileInputProps {
  className?: string; // Updated to standard React naming convention
  id: string;
  label: string;
  resetKey?: string | number; // Clearly named so devs know what this key is doing
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({
  className = "",
  id,
  label,
  resetKey,
  onChange,
}: FileInputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`} key={resetKey}>
      <label htmlFor={id} className="ms-2 text-blue-950 font-bold">
        {label}
      </label>
      <input
        type="file"
        id={id}
        name={id}
        onChange={onChange}
        className="w-full text-sm text-slate-500 
          file:mr-4 file:py-2 file:px-4 
          file:rounded-lg file:border-0 
          file:text-sm file:font-semibold 
          file:bg-blue-50 file:text-blue-700 
          hover:file:bg-blue-100 cursor-pointer transition-all"
      />
    </div>
  );
}
