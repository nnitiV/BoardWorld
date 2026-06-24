interface SuccessDivProps {
  isSuccess: boolean;
  successMessage: string;
}

export default function SuccessDiv({ isSuccess, successMessage }: SuccessDivProps) {
  return (
    <>
      {isSuccess && (
        <div className="bg-green-50 border mb-6 border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
          {successMessage}
        </div>
      )}
    </>
  );
}
