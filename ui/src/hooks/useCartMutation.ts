import { cartService } from "@/services/cartService";
import { useUserStore } from "@/stores/userStore";
import { AddCartItem, AddCartItemResponse, CartItem, CheckoutResponse, DeleteCartItemResponse, UpdateCartItem, UpdateCartItemResponse } from "@/types/cart.type";
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
      const existingItemIndex = cart.items.findIndex(item => item.productId == data.cartItem.productId)
      let updatedItems: CartItem[];
      if(existingItemIndex === -1) {
        updatedItems = [data.cartItem, ...cart.items];
      } else {
        updatedItems = cart.items.map(item => 
          item.productId == data.cartItem.productId 
          ?
          {
            ...item,
            quantity: data.cartItem.quantity
            }
          :
          item
        )
      }
      setCart({ ...cart, items: updatedItems });
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}

export function useUpdateCartItemMutation() {
  const { setCart, cart } = useUserStore((state) => state);
  return useMutation<UpdateCartItemResponse, AxiosError<ErrorResponsePayload>, UpdateCartItem>({
    mutationFn: cartService.updateCartItem,
    onSuccess: (data: UpdateCartItemResponse) => {
      if (!cart) return;
      const existingItemIndex = cart.items.findIndex(item => item.productId == data.updatedCartItem.productId)
      console.log(existingItemIndex)
      let updatedItems: CartItem[];
      if(existingItemIndex === -1) {
        updatedItems = [data.updatedCartItem, ...cart.items];
      } else {
        updatedItems = cart.items.map(item => 
          item.productId == data.updatedCartItem.productId 
          ?
          {
            ...item,
            quantity: data.updatedCartItem.quantity
            }
          :
          item
        )
      }
      setCart({ ...cart, items: updatedItems });
    },
    onError: (error) => {
      const serverMessage =
        error || "Authentication failed";
      console.error("Backend Error:", serverMessage, error);
    },
  })
}

export function useDeleteCartItemMutation() {
  const { setCart, cart } = useUserStore((state) => state);
  return useMutation<DeleteCartItemResponse, AxiosError<ErrorResponsePayload>, string>({
    mutationFn: (itemId) => cartService.deleteCartItem(itemId),
    onSuccess: (data: DeleteCartItemResponse) => {
      if (!cart) return;
      const updatedCartItems = cart.items.filter(item => item.id !== data.deletedCartItemId);
      setCart({ ...cart, items: updatedCartItems});
    },
    onError: (error) => {
      const serverMessage =
        error || "Authentication failed";
      console.error("Backend Error:", serverMessage, error);
    },
  })
}

export function useCreateCheckoutSessionMutation() {
  return useMutation<CheckoutResponse, AxiosError<ErrorResponsePayload>, void>({
    mutationFn: cartService.checkout,
    onSuccess: (data) => {
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