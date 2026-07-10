import { productService } from "@/services/productService";
import { ErrorResponsePayload } from "@/types/error.type";
import { Category, CategoriesResponse, Product, ProductCatalogResponse, ProductResponse, UpdateCategoryResponse, UpdateCategory, ProductsResponse } from "@/types/product.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export const useCreateCategoryMutation = () => {
  return useMutation<Category, AxiosError<ErrorResponsePayload>, { name: string }>({
    mutationFn: productService.createCategory,
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    }
  });
}

export function useGetPopularProductCatalogQuery(
  page: number,
  limit: number,
) {
  return useQuery<ProductsResponse, AxiosError<ErrorResponsePayload>>({
    queryKey: ["product", page, limit ],
    queryFn: () => productService.getPopularProductCatalog(page, limit),
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

export function useGetProductsByCategoroy(category: string) {
  return useQuery<ProductsResponse, AxiosError<ErrorResponsePayload>>({
    queryKey: ["product", category],
    queryFn: () => productService.getProductByCategoryName(category),
  });
}

export function useUpdateProductMutation() {
  const queryClient =  useQueryClient();
  const queryKey = ["product"];

  return useMutation<Product, AxiosError<ErrorResponsePayload>, FormData>({
    mutationFn: productService.updateProduct,
    onMutate: async (updatedProduct: FormData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousCatalog = queryClient.getQueryData<ProductCatalogResponse>(queryKey);

      queryClient.setQueriesData<ProductCatalogResponse>(
        { queryKey },
        (oldData) => {
          if (!oldData) return undefined;

          const id = updatedProduct.get("id")?.toString();
          const name = updatedProduct.get("name")?.toString();
          const description = updatedProduct.get("description")?.toString();
          const categories = queryClient.getQueryData<UpdateCategoryResponse>(["category"] );
          const categoryId = updatedProduct.get("categoryId")?.toString();
          const category = categories?.categories.find(cat => cat.id === categoryId);
          const price = updatedProduct.get("price") ? Number(updatedProduct.get("price")) : undefined;
          const stock = updatedProduct.get("stock") ? parseInt(updatedProduct.get("stock") as string, 10) : undefined;
          const isActive = updatedProduct.get("isActive") === "true";

          if (!id) return oldData;

          return {
            ...oldData,
            productCatalog: oldData.productCatalog.map((product) =>
              product.id === id
                ? {
                    ...product,
                    ...(name && { name }),
                    ...(description && { description }),
                    ...(price !== undefined && { price }),
                    ...(stock !== undefined && { stock }),
                    ...(category && {
                      category: {
                        id: category.id,
                        name: category.name,
                      },
                    }),
                    isActive,
                  }
                : product,
            ),
          };
        },
      );

      return { previousCatalog };
    },
    onError: (error) => {
      const serverMessage =
        error.response?.data?.message || "Authentication failed";
      console.error("Backend Error:", serverMessage);
    },
  });
}

export function useUpdateCategoryMutation() {
  const queryClient = useQueryClient();
  const queryKey = ["category"];

  return useMutation<Category, AxiosError<ErrorResponsePayload>, UpdateCategory>({
    mutationFn: productService.updateCategory,
    onMutate: async (updatedCategory) => {
      await queryClient.cancelQueries({ queryKey });
      const oldCategories = queryClient.getQueryData<UpdateCategoryResponse>(queryKey);

      queryClient.setQueriesData<UpdateCategoryResponse>(
        { queryKey },
        (oldData) => {
          if (!oldData) return undefined;

          const name = updatedCategory.name;
          const description = updatedCategory.description;

          if (!updatedCategory.id) return oldData;

          return {
            ...oldData,
            categories: oldData?.categories.map((category) =>
              category.id == updatedCategory.id
                ? {
                    ...category,
                    ...(name && { name }),
                    ...(description && { description }),
                  }
                : category,
            ),
          };
        },
      );
      return { oldCategories };
    }
  })
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

interface DeleteCategoryContext {
  oldCategories: UpdateCategoryResponse | undefined;
}

export function useDeleteCategoryMutation() {
  const queryClient = useQueryClient();
  const queryKey = ["category"]

  return useMutation<
    void,
    AxiosError<ErrorResponsePayload>,
    string,
    DeleteCategoryContext
  >({
    mutationFn: productService.deleteCategory,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });

      const oldCategories =
        queryClient.getQueryData<UpdateCategoryResponse>(queryKey);

      queryClient.setQueriesData<UpdateCategoryResponse>(
        { queryKey },
        (oldData) => {
          if (!oldData) return undefined;
          return {
            ...oldData,
            categories: oldData.categories.filter(
              (category) => category.id !== id,
            ),
          };
        },
      );

      return { oldCategories };
    },
    onError: (error, _, onMutateResult) => {
      const serverMessage =
        error.response?.data?.message || "Deactivation failed";
      console.error("Backend Error:", serverMessage);
      if (onMutateResult?.oldCategories) {
        queryClient.setQueryData(queryKey, onMutateResult.oldCategories);
      }
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
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
