"use client";
import Button from "@/components/admin/Button";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useCancelOrderMutation, useGetOrdersMutation } from "@/hooks/useOrderMutation";
import { useEffect } from "react";
import Link from "next/link";

export default function OrdersList() {
  const API_URL = process.env.API_URL || "http://localhost:5173";
  
  const { mutate: getOrders } = useGetOrdersMutation();
  const { mutate: cancelOrder } = useCancelOrderMutation();
  const orders = useUserStore((state) => state.orders);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 w-full max-w-4xl mx-auto mt-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">No orders yet</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-2">Looks like your board game collection needs expanding!</p>
        
        {/* Swapped from Button with router.push to a semantic Link */}
        <Link 
          href="/"
          className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors shadow-sm inline-block"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">Your Purchase History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => {
          if (!order.displayId) return null;
          
          const normalizedStatus = order.status?.toString().toUpperCase();
          const statusClassName =
            normalizedStatus === "PENDING"
              ? "text-yellow-800 bg-yellow-100 border-yellow-200"
              : normalizedStatus === "PAID"
                ? "text-green-800 bg-green-100 border-green-200"
                : "text-red-800 bg-red-100 border-red-200";

          const orderTotal = order.items.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
          }, 0);

          return (
            <div
              key={order.id}
              className="flex flex-col p-4 sm:p-6 bg-white shadow-sm rounded-xl border border-gray-200 hover:shadow-md transition-shadow gap-4 sm:gap-6"
            >
              {/* Top Row: Order Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    ID
                  </p>
                  <p className="font-mono text-gray-900 text-sm mt-1 font-medium">
                    ORDER-{String(order.displayId).padStart(5, `0`)}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:w-1/2 sm:justify-end sm:gap-8">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Date
                    </p>
                    <p className="text-gray-900 text-sm mt-1 font-medium">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
                      Status
                    </p>
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full border ${statusClassName}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle Row: The Items List */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Items in this order:
                </h4>
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 relative bg-gray-50 rounded-md overflow-hidden shrink-0 border border-gray-200">
                          {item.product.imagesUrl?.[0] ? (
                            <Image
                              src={`${API_URL}${item.product.imagesUrl[0]}`}
                              alt={item.product.name}
                              fill
                              sizes="64px"
                              className="object-contain p-1"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-gray-900 shrink-0">
                        $
                        {(Number(item.product.price) * item.quantity).toFixed(
                          2,
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Row: Footer & Actions */}
              {/* FIXED: Switched to flex-col on mobile, flex-row on desktop so buttons don't crush the total text */}
              <div className="mt-2 pt-4 border-t border-gray-100 flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex w-full sm:w-auto gap-3">
                  {order.status === "PENDING" && (
                    <>
                      <Button
                        className="bg-red-500 border border-red-300/50 text-white font-bold hover:bg-red-400"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-green-500 border border-green-300/50 text-white font-bold hover:bg-green-400"
                        disabled={order.status.toUpperCase() !== "PENDING"}
                        onClick={() => window.location.href = order.paymentUrl}
                      >
                        Pay
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex justify-between w-full sm:w-auto items-center sm:block">
                  <p className="text-sm text-gray-600 sm:mr-4 inline-block">
                    Order Total:
                  </p>
                  <p className="text-lg font-extrabold text-blue-600 inline-block">
                    ${orderTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}