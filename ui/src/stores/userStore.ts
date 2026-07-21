import { UserProfile } from "@/types/auth.type";
import { Cart } from "@/types/cart.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserProfile | null;
  cart: Cart | null;
  setUser: (user: UserProfile) => void;
  setCart: (user: Cart) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      cart: null,
      setUser: (user: UserProfile) => set({ user }),
      setCart: (cart: Cart) => set({ cart }),
    }),
    {
      name: "boardworld-user",
    },
  ),
);
