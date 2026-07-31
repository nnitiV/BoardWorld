import api from "@/lib/axios";
import { CancelOrderResponse, CheckoutResponse, GetOrdersResponse } from "@/types/order.type";

export const orderService = {
  getOrders: async () => {
    const { data } = await api.post<GetOrdersResponse>("/order");
    return data;
  },
  checkout: async () => {
    const { data } = await api.post<CheckoutResponse>("/order/checkout");
    return data;
  },
  cancelOrder: async (id: string) => {
    const { data } = await api.delete<CancelOrderResponse>(`/order/cancel/${id}`);
    return data;
  },
}