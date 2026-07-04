import { productService } from "@/services/productService";
import { ErrorResponsePayload } from "@/types/error.type";
import { Category, CategoriesResponse, CreateCategory, Product, ProductCatalogResponse, ProductResponse } from "@/types/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Axios, AxiosError } from "axios";

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

export const useCreateCategoryMutation = () => {
  return useMutation<Category, AxiosError<ErrorResponsePayload>, CreateCategory>({
    mutationFn: productService.createCategory,
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    }
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

export function useGetCategoriesQuery() {
  return useQuery<CategoriesResponse, AxiosError<ErrorResponsePayload>>({
    queryFn: productService.getCategories,
    queryKey: ["category"],
  });
}

export function useGetProductByIdQuery(id: string) {
  return useQuery<ProductResponse, AxiosError<ErrorResponsePayload>>({
    queryKey: ["product", id],
    queryFn: () => productService.getProductById(id),
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

export function useDeactivateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponsePayload>, string>({
    mutationFn: productService.deactivateProduct,
    // 1. We receive the string ID
    onMutate: async (productId: string) => {
      // 2. THE OBJECT FILTER: Cancel any outgoing fetches for all product lists
      await queryClient.cancelQueries({ queryKey: ["product"] });

      // 3. TARGET ALL CACHES: Update every paginated list in memory dynamically
      queryClient.setQueriesData<ProductCatalogResponse>(
        { queryKey: ["product"] },
        (oldData) => {
          if (!oldData) return undefined;

          return {
            ...oldData,
            // 4. MAP INSTEAD OF FILTER: Flip the status, keep the product!
            productCatalog: oldData.productCatalog.map(
              (product) =>
                product.id === productId
                  ? { ...product, isActive: false } // Update this specific product
                  : product, // Leave all others alone
            ),
          };
        },
      );

      return { productId };
    },

    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Deactivation failed";
      console.error("Backend Error:", serverMessage);
    },

    onSettled: () => {
      // Always resync with the server after a mutation finishes
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}

export function useRestoreProductMutation() {
  const queryClient = useQueryClient();
  return useMutation<Product, AxiosError<ErrorResponsePayload>, string>({
    mutationFn: productService.restoreProduct,
    onMutate: async (productId: string) => {
      await queryClient.cancelQueries({ queryKey: ["product"] });
      queryClient.setQueriesData<ProductCatalogResponse>(
        { queryKey: ["product"] },
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            productCatalog: oldData.productCatalog.map((product) =>
              product.id === productId
                ? { ...product, isActive: true }
                : product,
            ),
          };
        },
      );
      return { productId };
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Deactivation failed";
      console.error("Backend Error:", serverMessage);
    },

    onSettled: () => {
      // Always resync with the server after a mutation finishes
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
}
