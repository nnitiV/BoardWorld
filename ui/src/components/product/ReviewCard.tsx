import { Review } from "@/types/product.type";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Safe fallback to grab user initials
  const userInitial = review.user?.name
    ? review.user.name.charAt(0).toUpperCase()
    : "?";

  // Safely format date if needed, or fallback gracefully
  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="flex flex-col gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header: User Avatar, Name, and Date */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Dynamic/Fallback Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200 shrink-0">
            {userInitial}
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-none">
              {review.user?.name || "Anonymous Gamer"}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-slate-400">Verified Buyer</span>
              {formattedDate && (
                <>
                  <span className="text-slate-300 text-xs">•</span>
                  <span className="text-xs text-slate-400">{formattedDate}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Visual Star Rating */}
        <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-amber-500"
          >
            <path
              fillRule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-xs font-bold text-amber-700">{review.rating}</span>
        </div>
      </div>

      {/* Review Comment */}
      {review.comment ? (
        <p className="text-sm text-slate-600 leading-relaxed pl-1 whitespace-pre-wrap">
          {review.comment}
        </p>
      ) : (
        <p className="text-sm text-slate-400 italic pl-1">
          Left a rating without a comment.
        </p>
      )}
    </div>
  );
}