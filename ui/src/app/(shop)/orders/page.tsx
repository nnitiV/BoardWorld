"use client";
import Button from "@/components/admin/Button";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { useCancelOrderMutation, useGetOrdersMutation } from "@/hooks/useOrderMutation";
import { useEffect } from "react";

export default function OrdersList() {
  const { mutate: getOrders } = useGetOrdersMutation();
  useEffect(() => {
    getOrders();
  }, []);
  const orders = useUserStore((state) => state.orders);
  const router = useRouter();
  const { mutate: cancelOrder } = useCancelOrderMutation();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <h2 className="text-2xl font-semibold text-gray-800">No orders yet</h2>
        <p className="text-gray-500 mt-2">Looks like your board game collection needs expanding!</p>
        
        <Button 
          onClick={() => router.push('/')}
          className="mt-6 px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Purchase History</h2>
      
      <div className="space-y-6">
        {orders.map((order) => {
          console.log(order.items);
          if(!order.displayId) return;
          const normalizedStatus = order.status?.toString().toUpperCase();
          const statusClassName =
            normalizedStatus === "PENDING"
              ? "text-yellow-800 bg-yellow-100"
              : normalizedStatus === "PAID"
                ? "text-green-800 bg-green-100"
                : "text-red-800 bg-red-100";

          const orderTotal = order.items.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
          }, 0);

          return (
            <div
              key={order.id}
              className="flex flex-col p-5 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md transition-shadow gap-4"
            >
              {/* Top Row: Order Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 gap-4">
                {/* ... (Order ID and Date/Status rendering remains the same) ... */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                    ID
                  </p>
                  <p className="font-mono text-gray-900 text-sm mt-1">
                    ORDER-{String(order.displayId).padStart(5, `0`)}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:w-1/2">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">
                      Date
                    </p>
                    <p className="text-gray-900 font-medium mt-1">
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
                      className={`px-3 py-1 text-xs font-bold rounded-full ${statusClassName}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: The Items List */}
              <div className="pt-2">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Items in this order:
                </h4>
                <ul className="space-y-3">
                  {order.items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200">
                          {item.product.imagesUrl?.[0] ? (
                            <Image
                              src={`http://localhost:5173${item.product.imagesUrl[0]}`}
                              alt={item.product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                              No img
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.product.name}
                          </p>
                          <p className="text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="font-medium text-gray-900">
                        $
                        {(Number(item.product.price) * item.quantity).toFixed(
                          2,
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order Footer: Total */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <div className="flex gap-4">
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
                        onClick={() => router.push(order.paymentUrl)}
                      >
                        Pay
                      </Button>
                    </>
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600 mr-4 self-center">
                    Order Total:
                  </p>
                  <p className="text-lg font-bold text-gray-900">
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