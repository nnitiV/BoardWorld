import { productService } from "@/services/productService";
import { ErrorResponsePayload } from "@/types/error.type";
import { Product, ProductCatalogResponse } from "@/types/product.type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useCreateProductMutation() {
  return useMutation<Product, AxiosError<ErrorResponsePayload>, FormData>({
    mutationFn: productService.createProduct,
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}

export function useGetProductCatalogQuery(
  page: number,
  limit: number,
  activeOnly: boolean = false,
) {
  return useQuery<ProductCatalogResponse, AxiosError<ErrorResponsePayload>>({
    queryKey: ["product", page, limit, activeOnly],
    queryFn: () =>
      activeOnly
        ? productService.getActiveProductCatalog(page, limit)
        : productService.getProductCatalog(page, limit),
  });
}

export function useUpdateProductMutation() {
  return useMutation<Product, AxiosError<ErrorResponsePayload>, FormData>({
    mutationFn: productService.updateProduct,
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}
