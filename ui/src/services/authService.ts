import api from "@/lib/axios";
import { LoginCredentials, LoginResponse } from "@/types/auth.type";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
};
