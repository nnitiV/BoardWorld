import { Review } from "@/types/product.type";
import Button from "../admin/Button";

interface ReviewSectionProps {
  className?: string;
  reviewsToShow?: Review[];
}

export default function ReviewSection({
  className,
  reviewsToShow,
}: ReviewSectionProps) {
  const reviews = reviewsToShow || [];
  return (
    <div className={`${className} md:px-24`}>
      <header className="flex flex-col gap-6 md:flex-row justify-between">
        <h1 className="text-3xl text-slate-950 font-bold">Reviews</h1>
        <Button className="text-lg md:text-xl cursor-pointer">Add Review (+)</Button>
      </header>
      <main>
        {reviews.length <= 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="bg-slate-100 p-4 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">No reviews yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm">
              Be the first to share your thoughts on this game. Your feedback
              helps other gamers choose their next adventure!
            </p>
            <Button className="text-lg cursor-pointer mt-5">Be the first!</Button>
          </div>
        ) : (
          reviews.map((review) => (
            <>
              <h2>{review.user.name}</h2>
              <p>{review.rating}/5</p>
              <p>{review.comment}</p>
            </>
          ))
        )}
      </main>
    </div>
  );
}
