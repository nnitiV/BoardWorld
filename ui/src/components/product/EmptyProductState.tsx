import React from "react";

interface EmptyProductStateProps {
  onAddProduct?: () => void;
}

export default function EmptyProductState({ onAddProduct }: EmptyProductStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-24 px-4 text-center rounded-2xl border-2 border-dashed border-slate-200">
      
      <svg
        className="w-20 h-20 text-slate-300 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>

      <h2 className="text-xl font-bold text-slate-700 mb-2">
        No products found
      </h2>

      <p className="text-slate-500 max-w-sm mb-6">
        Your catalog is currently empty. Get started by adding your first board game to the inventory.
      </p>

      {onAddProduct && (
        <button
          onClick={onAddProduct}
          className="bg-blue-950 text-white px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer hover:bg-blue-900 hover:scale-105 shadow-sm"
        >
          + Add New Product
        </button>
      )}
    </div>
  );
}