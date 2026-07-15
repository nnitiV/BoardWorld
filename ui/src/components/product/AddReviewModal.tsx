import { ChangeEvent, SetStateAction, useState } from "react";
import TextInput from "../form/TextInput";
import SubmitButton from "../form/SubmitButton";
import ErrorDiv from "../form/ErrorDiv";
import { getErrorMessage } from "@/utils/validator";
import SuccessDiv from "../form/SuccessDiv";
import { useCreateReviewMutation } from "@/hooks/useProductMutation";
import StarRatingInput from "../form/StartRatingInput";
import TextAreaInput from "../form/TextAreaInput";

interface AddReviewProps {
  productId: string;
  setShowAddReview: (value: SetStateAction<boolean>) => void;
}

export default function AddReviewModal({
  productId,
  setShowAddReview,
}: AddReviewProps) {
  const [localError, setLocalError] = useState<string | null>(null);
  const [isLocalError, setIsLocalError] = useState<boolean>(false);
  const [comment, setComment] = useState<string | undefined>("");
  const [rating, setRating] = useState<number>(0);

  const {
    mutate: createReview,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateReviewMutation(productId);

  const errorMessage = getErrorMessage(error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    setIsLocalError(false);

    if (!comment) {
      setLocalError("Please provide a comment.");
      setIsLocalError(true);
      return;
    }
    if (comment.length < 2) {
      setLocalError("Please provide a comment with more than 2 characters.");
      setIsLocalError(true);
      return;
    }
    if (rating === 0) {
      setLocalError("Please provide a rating.");
      setIsLocalError(true);
      return;
    }
    console.log({ comment, rating }, productId);
    createReview({ comment, rating }, {
        onSuccess: () => {
            setComment("");
            setRating(0);
        }
    });
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
      onClick={() => setShowAddReview(false)}
    >
      {/* Replaced w-1/2 with fluid max-w-xl and adaptive padding */}
      <div
        className="w-full max-w-xl bg-white p-5 md:p-8 rounded-2xl shadow-2xl relative max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-center text-xl md:text-2xl text-blue-950 font-bold mb-4 md:mb-6 pr-8 md:pr-0">
          Add Review
        </h1>

        {/* Converted to a semantic <button> with better mobile positioning */}
        <button
          className="absolute right-4 top-4 md:right-5 md:top-5 cursor-pointer fill-blue-950 hover:fill-red-600 transition-colors"
          onClick={() => setShowAddReview(false)}
          aria-label="Close modal"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="25"
            height="25"
            viewBox="0 0 30 30"
          >
            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
          </svg>
        </button>

        <SuccessDiv isSuccess={isSuccess} successMessage="Review added!" />
        <ErrorDiv
          isError={isLocalError || isError}
          errorMessage={localError || errorMessage}
        />

        {/* Replaced the redundant grid with a simple flex column */}
        <form
          className="flex flex-col gap-4 py-2 md:py-4 w-full"
          onSubmit={handleSubmit}
        >
          <TextAreaInput
            placeholder="Comment"
            id="comment"
            label="Comment:"
            inputValue={comment || ""}
            onChange={(e) => setComment(e.target.value)}
            className="w-full"
          />
          <StarRatingInput
            label="Your rating:"
            rating={rating}
            onChange={setRating}
          />
          <SubmitButton
            className="w-full mt-2 cursor-pointer"
            isPending={isPending}
          >
            {isPending ? "Adding Review..." : "Add Review"}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
}
