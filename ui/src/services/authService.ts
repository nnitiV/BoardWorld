import api from "@/lib/axios";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "@/types/auth.type";
import { userService } from "./userService";

export const authService = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    return data;
  },
  register: async (credentials: RegisterCredentials) => {
    const { data } = await api.post<RegisterResponse>(
      "/auth/register",
      credentials,
    );
    const user = await userService.getUserProfile();
    return {message: "User registered", data, user };
  },
  logout: async () => {
    const { data } = await api.post<{ message: string }>("/auth/logout");
    return data;
  },
};
