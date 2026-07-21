"use client";

import { useUserStore } from "@/stores/userStore";
import EmptyCart from "../../../components/cart/EmptyCart";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const router = useRouter();
  const cart = useUserStore((state) => state.cart);
  console.log(cart);
  return (
    <>
      {cart && cart?.items.length > 0 ? (
        <div className="mx-auto mt-8 w-full max-w-2xl rounded-2xl border border-slate-200 bg-slate-50/50 p-4 sm:p-6 shadow-sm backdrop-blur-sm">
          <ul className="flex w-full flex-col gap-4">
            {cart?.items &&
              cart.items.length > 0 &&
              cart.items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex w-full items-center gap-4 sm:gap-6 rounded-xl border border-slate-200/60 bg-white p-4 transition-all hover:border-slate-300 hover:shadow-md cursor-pointer"
                  onClick={() => router.push(`/product/${item.product.id}`)}
                >
                  {/* Image Container */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
                    <Image
                      src={`http://localhost:5173${item.product.imagesUrl[0]}`}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col justify-between self-stretch py-1">
                    <div>
                      <h2 className="text-base sm:text-lg font-semibold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h2>

                      {item.product.categories &&
                        item.product.categories.length > 0 && (
                          <p className="mt-1 text-xs sm:text-sm text-slate-500 line-clamp-1">
                            <span className="font-semibold text-slate-700">
                              Categories:
                            </span>{" "}
                            {item.product.categories
                              .map((c) => c.name)
                              .join(", ")}
                          </p>
                        )}
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-base sm:text-lg font-bold text-slate-900">
                        ${item.product.price}
                      </p>
                      <span className="text-xs font-medium text-slate-500">
                        Quantidadae: {item.quantity ?? 1}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
