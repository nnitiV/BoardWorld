import { UserProfile } from "@/types/auth.type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserProfile) => set({ user }),
    }),
    {
      name: "boardworld-user",
    },
  ),
);
