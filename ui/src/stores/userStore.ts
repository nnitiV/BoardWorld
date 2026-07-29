import { UserProfile } from "@/types/auth.type";
import { Cart, Order } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserProfile | null;
  cart: Cart | null;
  orders: Order[] | [];
  setUser: (user: UserProfile) => void;
  setCart: (cart: Cart) => void;
  addOrder: (order: Order) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      cart: null,
      orders: [],
      setUser: (user: UserProfile) => set({ user }),
      setCart: (cart: Cart) => set({ cart }),
      addOrder: (order: Order) => set((state) => ({ orders: [...state.orders, order] })),
    }),
    {
      name: "boardworld-user",
    },
  ),
);
