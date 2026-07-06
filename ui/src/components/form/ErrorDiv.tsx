interface ErrorDivProps {
  isError: boolean;
  errorMessage: string;
}

export default function ErrorDiv({ isError, errorMessage }: ErrorDivProps) {
  return (
    <>
      {isError  && (
        <div className="bg-red-50 border mb-6 border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in">
          {errorMessage}
        </div>
      )}
    </>
  );
}
