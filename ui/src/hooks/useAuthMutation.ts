import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
  RegisterResponse,
} from "@/types/auth.type";
import { Axios, AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

export function useLoginMutation() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAuthData);

  return useMutation<
    LoginResponse,
    AxiosError<{ message: string }>,
    LoginCredentials
  >({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse) => {
      const decodedToken = jwtDecode<{ exp: number }>(data.accessToken);
      const expirationTimestamp = decodedToken.exp * 1000;
      setAccessToken(data.accessToken, expirationTimestamp);
      router.push("/");
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}

export function useRegisterMutation() {
  const router = useRouter();

  return useMutation<
    RegisterResponse,
    AxiosError<{ message: string }>,
    RegisterCredentials
  >({
    mutationFn: authService.register,
    onSuccess: (data) => {
      router.push("/login");
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}

export function useLogoutMutation() {
  const router = useRouter();
  const logoutStore = useAuthStore((state) => state.logout);
  
  return useMutation<
    { message: string },
    AxiosError<{ message: string }>,
    void
  >({
    mutationFn: authService.logout,
    onSuccess: () => {
      logoutStore();
      router.push("/login");
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}
