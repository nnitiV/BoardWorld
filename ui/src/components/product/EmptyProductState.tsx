import Button from "../admin/Button";

interface EmptyProductStateProps {
  onAddProduct?: () => void;
}

export default function EmptyProductState({ onAddProduct }: EmptyProductStateProps) {
  return (
    // 1. Added responsive padding and a subtle background for contrast against the main page
    <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-4 text-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50">
      
      <svg
        className="w-16 h-16 md:w-20 md:h-20 text-slate-400 mb-4 shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true" // 2. Critical for a11y: Hide decorative SVGs from screen readers
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>

      <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-2">
        No products found
      </h2>

      {/* 3. Improved line height (leading-relaxed) for better readability */}
      <p className="text-sm md:text-base text-slate-500 max-w-sm mb-6 md:mb-8 leading-relaxed">
        Your catalog is currently empty. Get started by adding your first board game to the inventory.
      </p>

      {onAddProduct && (
        /* 4. Composition: We use our custom Button. 
           I added your cursor-pointer, plus active:scale-95 so it physically clicks down when pressed! */
        <Button
          variant="primary"
          onClick={onAddProduct}
          className="cursor-pointer shadow-sm hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
          + Add New Product
        </Button>
      )}
    </div>
  );
}