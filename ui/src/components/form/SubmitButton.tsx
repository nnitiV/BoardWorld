import { ReactNode } from "react";

interface SubmitButtonProps {
  classes?: string;
  isPending: boolean;
  children: ReactNode
}

export default function SubmitButton({
  classes,
  isPending,
  children
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className={`bg-blue-950 w-full block mx-auto text-slate-300 font-bold px-10 py-3 rounded-xl transition-all cursor-pointer
         ${!isPending && "hover:bg-blue-900 focus:ring-4 focus:ring-blue-100"} ${classes}`}
    >
      {children}
    </button>
  );
}
