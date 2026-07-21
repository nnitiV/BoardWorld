import api from "@/lib/axios";
import { AddCartItem, AddCartItemResponse } from "@/types/cart.type";

export const cartService = {
  addCartItem: async (cartItem: AddCartItem) => {
    const { data } = await api.post<AddCartItemResponse>("/cart", cartItem);
    return data;
  },
};