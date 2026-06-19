import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { authService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { LoginCredentials, LoginResponse } from "@/types/auth.type";
import axios, { AxiosError } from "axios";

export function useLoginMutation() {
  const router = useRouter();
  const setAccessToken = useAuthStore((state) => state.setAccessToken);

  return useMutation<LoginResponse, AxiosError<{ message: string }>, LoginCredentials>({
    mutationFn: authService.login,
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.accessToken);
      router.push("/");
    },
    onError: (error) => {
      const serverMessage = error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}
