import api from "@/lib/axios";
import { AddCartItem, AddCartItemResponse, DeleteCartItemResponse, UpdateCartItem, UpdateCartItemResponse } from "@/types/cart.type";
import { CheckoutResponse } from "@/types/order.type";

export const cartService = {
  addCartItem: async (cartItem: AddCartItem) => {
    const { data } = await api.post<AddCartItemResponse>("/cart", cartItem);
    return data;
  },
  updateCartItem: async (cartItem: UpdateCartItem) => {
    const { data } = await api.put<UpdateCartItemResponse>("/cart", cartItem);
    return data;
  },
  deleteCartItem: async (cartItemId: string) => {
    const { data } = await api.delete<DeleteCartItemResponse>(`/cart/${cartItemId}`);
    return data;
  }
};