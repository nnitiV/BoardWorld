import { useState } from "react";

interface StarRatingInputProps {
    label: string;
  rating: number;
  onChange: (rating: number) => void;
  error?: string;
}

export default function StarRatingInput({ label, rating, onChange, error }: StarRatingInputProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  return (
    <div className="flex flex-col gap-2">
      <label className="ms-1 md:ms-2 text-blue-950 font-bold text-sm md:text-base">
        {label}
      </label>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = starValue <= activeRating;

          return (
            <button
              key={starValue}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              className="p-1 rounded-md transition-transform duration-100 hover:scale-115 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              aria-label={`Rate ${starValue} out of 5 stars`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={isFilled ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={1.5}
                className={`w-8 h-8 transition-colors duration-150 ${
                  isFilled
                    ? "text-amber-400 fill-amber-400"
                    : "text-slate-300 hover:text-slate-400"
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499c.173-.435.766-.435.94 0l2.22 5.535 5.967.457c.478.037.67.622.316.944l-4.482 4.07 1.342 5.823c.108.467-.4.836-.813.59L12 18.062l-5.18 2.919c-.413.246-.921-.122-.813-.59l1.342-5.823-4.482-4.07c-.354-.322-.162-.907.316-.944l5.967-.457 2.22-5.535z"
                />
              </svg>
            </button>
          );
        })}

        {activeRating > 0 && (
          <span className="text-sm font-semibold text-slate-500 ml-2 transition-all">
            {`${activeRating} / 5`}
          </span>
        )}
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
}