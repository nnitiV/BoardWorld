import api from "@/lib/axios";
import { CancelOrderResponse, CheckoutResponse } from "@/types/order.type";

export const orderService = {
  checkout: async () => {
    const { data } = await api.post<CheckoutResponse>("/order/checkout");
    return data;
  },
  cancelOrder: async (id: string) => {
    const { data } = await api.delete<CancelOrderResponse>(`/order/cancel/${id}`);
    return data;
  },
}