"use client";

import { useUserStore } from "@/stores/userStore";
import EmptyCart from "../../../components/cart/EmptyCart";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCreateCheckoutSessionMutation, useDeleteCartItemMutation, useUpdateCartItemMutation } from "@/hooks/useCartMutation";
import TrashIcon from "@/components/Icons/TrashIcon";
import Button from "@/components/admin/Button";

export default function Cart() {
  const router = useRouter();
  const cart = useUserStore((state) => state.cart);
  const totalToPay = cart?.items.reduce((total, item) => (item.product.price * item.quantity) + total, 0);
  const { mutate: updateCartItem } = useUpdateCartItemMutation();
  const { mutate: deleteCartItem } = useDeleteCartItemMutation();
  const { mutate: checkout, data, isPending } = useCreateCheckoutSessionMutation();
  const checkoutCart = async () => {
    checkout();
    if(data?.checkout.url) {
      router.push(data.checkout.url);
    }
  }
  const setAmount = (quantity: number, productId: string) => {
    updateCartItem({ quantity, productId });
  }
  return (
    <>
      {cart && cart.items && cart.items.length > 0 ? (
        <div className="mx-auto mt-8 flex w-full max-w-6xl flex-col items-start gap-8 px-4 md:flex-row">
          {/* Left Column (Cart Items) */}
          <div className="flex-1 w-full rounded-2xl border border-slate-200 bg-white shadow-sm backdrop-blur-sm">
            <ul className="flex w-full flex-col">
              {cart.items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex w-full items-start sm:items-center gap-4 sm:gap-6 border-b border-slate-200 p-4 sm:p-6 transition-all last:border-b-0"
                >
                  {/* Image Container */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-slate-100 bg-slate-100 sm:h-24 sm:w-24">
                    <Image
                      onClick={() => router.push(`/product/${item.product.id}`)}
                      src={`http://localhost:5173${item.product.imagesUrl[0]}`}
                      alt={item.product.name}
                      width={96}
                      height={96}
                      className="h-full w-full cursor-pointer object-cover"
                    />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-1 flex-col justify-between self-stretch py-1">
                    <div className="flex items-start justify-between gap-4">
                      <h2
                        className="cursor-pointer text-base font-semibold text-slate-900 transition-colors hover:text-blue-700 sm:text-lg line-clamp-2"
                        onClick={() =>
                          router.push(`/product/${item.product.id}`)
                        }
                      >
                        {item.product.name}
                      </h2>
                      <button
                        onClick={() => deleteCartItem(item.id)}
                        className="p-1 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <TrashIcon className="h-5 w-5 fill-red-600 cursor-pointer sm:h-6 sm:w-6" />
                      </button>
                    </div>

                    {/* Price and Quantity Row */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <label
                          htmlFor={`amount-${item.id}`}
                          className="text-sm sm:text-base font-semibold text-slate-800"
                        >
                          Quantity:
                        </label>
                        <div className="relative inline-block w-20 sm:w-24">
                          <select
                            name="amount"
                            id={`amount-${item.id}`}
                            disabled={item.product.stock <= 0}
                            value={item.quantity}
                            onChange={(e) =>
                              setAmount(Number(e.target.value), item.productId)
                            }
                            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-8 text-sm sm:text-base text-slate-700 transition-all cursor-pointer hover:border-blue-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50"
                          >
                            {item.product.stock > 0 ? (
                              Array.from(
                                { length: item.product.stock },
                                (_, index) => index + 1,
                              ).map((num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              ))
                            ) : (
                              <option value={0}>0</option>
                            )}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                            <svg
                              className="h-4 w-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <p className="text-base font-bold text-slate-900 sm:text-lg">
                        ${item.product.price * item.quantity}{" "}
                        {item.quantity > 1 && (
                          <span className="ml-1 text-xs text-slate-400 font-normal">
                            (${item.product.price} each)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column (Summary Box) */}
          <div className="flex w-full shrink-0 flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm backdrop-blur-sm md:sticky md:top-8 md:w-80 lg:w-96">
            <h3 className="text-xl font-bold text-slate-950 border-b border-slate-100 pb-4">
              Order Summary
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-medium">Total to pay</span>
              <span className="text-xl font-bold text-green-600">
                ${totalToPay && totalToPay.toFixed(2)}
              </span>
            </div>
            <Button className="w-full font-bold text-white py-3" onClick={checkoutCart}>
              {isPending ? "Proceeding to checkout..." : "Proceed to checkout"}
            </Button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </>
  );
}
