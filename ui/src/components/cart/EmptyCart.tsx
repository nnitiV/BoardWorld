import Button from "@/components/admin/Button";
import CartIcon from "@/components/Icons/CartIcon";
import { useRouter } from "next/navigation";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="mx-auto mt-8 flex min-h-100 w-full max-w-2xl flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 p-8 text-center shadow-sm backdrop-blur-sm transition-all hover:border-slate-300">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <CartIcon className="h-12 w-12 fill-current" />
      </div>

      <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
        Your cart is empty
      </h3>
      <p className="mt-1 max-w-sm text-sm text-slate-500">
        Looks like you haven&lsquo;t added anything to your cart yet. Explore
        our products and discover great deals!
      </p>

      <div className="mt-6">
        <Button
          onClick={() => router.push("/")}
          className="cursor-pointer px-6 py-2.5 font-medium shadow-sm transition-all hover:shadow-md"
        >
          Start Shopping
        </Button>
      </div>
    </div>
  );
}
