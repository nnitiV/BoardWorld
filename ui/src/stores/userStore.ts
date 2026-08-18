import { UserProfile } from "@/types/auth.type";
import { Cart } from "@/types/cart.type";
import { Order } from "@/types/order.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserProfile | null;
  cart: Cart | null;
  orders: Order[] | [];
  setUser: (user: UserProfile) => void;
  setCart: (cart: Cart) => void;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrder: (order: Order) => void;
  deleteCartItem: (productId: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      cart: null,
      orders: [],
      setUser: (user) => set({ user }),
      setCart: (cart) => set({ cart }),
      setOrders: (orders) => set({ orders }),
      addOrder: (order) =>
        set((state) => ({ orders: [...state.orders, order] })),
      updateOrder: (order) =>
        set((state) => ({
          orders: state.orders.map((o) => (o.id === order.id ? order : o)),
        })),
        deleteCartItem: (productId) => {
          set((state) => {
            if (!state.cart) return state;
            const updatedItems = state.cart.items.filter(
              (item) => item.productId !== productId,
            );
            return {
              cart: {
                ...state.cart,
                items: updatedItems,
              },
            };
          })
        }
    }),
    {
      name: "boardworld-user",
    },
  ),
);