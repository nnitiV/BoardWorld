import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  expiresAt: number | null;
  setAuthData: (token: string, expiresAt: number) => void;
  logout: () => void;
  isTokenValid: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      expiresAt: null,
      setAuthData: (token, expiresAt) => set({ accessToken: token, expiresAt }),
      logout: () => set({ accessToken: null, expiresAt: null }),
      isTokenValid: () => {
        const { accessToken, expiresAt } = get();
        if (!accessToken || !expiresAt) return false;

        return Date.now() < expiresAt;
      },
    }),
    {
      name: "boardworld-auth",
    },
  ),
);
