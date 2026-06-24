import { productService } from "@/services/productService";
import { CreateProduct, Product } from "@/types/product.type";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateProductMutation() {
  return useMutation<
    Product,
    AxiosError<{ message: string }>,
    FormData
  >({
    mutationFn: productService.createProduct,
    onError: (error) => {
      const serverMessage = error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}
