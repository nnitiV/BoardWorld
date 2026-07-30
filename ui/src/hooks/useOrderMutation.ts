import { orderService } from "@/services/orderService";
import { useUserStore } from "@/stores/userStore";
import { ErrorResponsePayload } from "@/types/error.type";
import { CancelOrderResponse, CheckoutResponse } from "@/types/order.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateCheckoutSessionMutation() {
  const addOrder = useUserStore(state => state.addOrder);
  return useMutation<CheckoutResponse, AxiosError<ErrorResponsePayload>, void>({
    mutationFn: orderService.checkout,
    onSuccess: (data) => {
      addOrder(data.order);
      if (data.checkout.url) {
        window.location.href = data.checkout.url;
      }
    },
    onError: (error) => {
      const serverMessage = error || "Authentication failed";
      console.error("Backend Error:", serverMessage, error);
    },
  });
}

export function useCancelOrderMutation() {
  const updateOrder = useUserStore(state => state.updateOrder);
  return useMutation<
    CancelOrderResponse,
    AxiosError<ErrorResponsePayload>,
    string
  >({
    mutationFn: orderService.cancelOrder,
    onSuccess: (data) => {
      if (!data) return;
      updateOrder(data.canceledOrder);
    },
    onError: (error) => {
      const serverMessage = error || "Authentication failed";
      console.error("Backend Error:", serverMessage, error);
    },
  });
}