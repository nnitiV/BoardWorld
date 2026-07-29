import api from "@/lib/axios";
import { AddCartItem, AddCartItemResponse, CheckoutResponse, DeleteCartItemResponse, UpdateCartItem, UpdateCartItemResponse } from "@/types/cart.type";

export const cartService = {
  addCartItem: async (cartItem: AddCartItem) => {
    const { data } = await api.post<AddCartItemResponse>("/cart", cartItem);
    return data;
  },
  checkout: async () => {
    console.log("Buying cart...");
    const { data } = await api.post<CheckoutResponse>("/cart/checkout");
    console.log(data);
    return data;
  },
  updateCartItem: async (cartItem: UpdateCartItem) => {
    const { data } = await api.put<UpdateCartItemResponse>("/cart", cartItem);
    return data;
  },
  deleteCartItem: async (cartItemId: string) => {
    console.log(cartItemId);
    const { data } = await api.delete<DeleteCartItemResponse>(`/cart/${cartItemId}`);
    console.log(data);
    return data;
  }
};