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
import { AxiosError } from "axios";

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
      setAccessToken(data.accessToken);
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
