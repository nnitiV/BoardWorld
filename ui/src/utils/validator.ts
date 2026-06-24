import { ErrorResponsePayload } from "@/types/error.type";
import { AxiosError } from "axios";

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
export const isStrongPassword = (password: string): boolean => {
  return (
    password.length >= 8 &&
    /[a-z]/.test(password) && 
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)    
  );
};
export const getErrorMessage = (error: AxiosError<ErrorResponsePayload> | null) => {
    const backendMessage = error?.response?.data?.message;

    if (Array.isArray(backendMessage) && backendMessage.length > 0) {
      return backendMessage[0].error;
    }

    if (typeof backendMessage === "string") {
      return backendMessage;
    }

    return "An unexpected network error occurred.";
  };