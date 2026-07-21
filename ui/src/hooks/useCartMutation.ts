import { cartService } from "@/services/cartService";
import { useUserStore } from "@/stores/userStore";
import { AddCartItem, AddCartItemResponse } from "@/types/cart.type";
import { ErrorResponsePayload } from "@/types/error.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useAddItemToCartMutation() {
  const { setCart, cart } = useUserStore((state) => state);
  return useMutation<
    AddCartItemResponse,
    AxiosError<ErrorResponsePayload>,
    AddCartItem
  >({
    mutationFn: (variables) => cartService.addCartItem(variables),
    onSuccess: (data: AddCartItemResponse) => {
      if (!cart) return;
      const updatedItems = [data.cartItem, ...cart.items];
      setCart({ ...cart, items: updatedItems });
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}