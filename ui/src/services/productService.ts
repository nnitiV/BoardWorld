import api from "@/lib/axios";
import { UpdateCategory, UpdateReview } from "@/types/product.type";

export const productService = {
  createProduct: async (product: FormData) => {
    const { data } = await api.post("/products", product);
    return data;
  },
  createCategory: async (categoryName: { name: string }) => {
    const { data } = await api.post("/products/category", categoryName);
    return data;
  },
  createReview: async ({ productId, comment, rating }: { productId: string, comment: string, rating: number  }) => {
    const { data } = await api.post(`/products/review/${productId}`, { comment, rating });
    console.log(data);
    return data;
  },
  getPopularProductCatalog: async (page: number, limit: number) => {
    const { data } = await api.get(
      `/products/popular?page=${page}&limit=${limit}`,
    );
    return data;
  },
  getProductCatalog: async (page: number, limit: number) => {
    const { data } = await api.get(
      `/products/catalog?page=${page}&limit=${limit}`,
    );
    return data;
  },
  getCategories: async () => {
    const { data } = await api.get("/products/categories");
    return data;
  },
  getReviewsByProductId: async (id: string) => {
    const { data } = await api.get(`/products/reviews/product/${id}`);
    console.log("Service:", data);
    return data;
  },
  getProductById: async (id: string) => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
  getProductByCategoryName: async (category: string) => {
    const { data } = await api.get(`/products/productCategory/${category}`);
    return data;
  },
  getActiveProductCatalog: async (page: number, limit: number) => {
    const { data } = await api.get(
      `/products/active?page=${page}&limit=${limit}`,
    );
    return data;
  },
  updateProduct: async (product: FormData) => {
    const { data } = await api.put(`/products/${product.get("id")}`, product);
    return data;
  },
  updateCategory: async (category: UpdateCategory) => {
    const { data } = await api.put(
      `/products/category/${category.id}`,
      category,
    );
    return data;
  },
  updateReview: async (review: UpdateReview) => {
    const { data } = await api.put(
      `/products/review/${review.id}`,
      review,
    );
    return data;
  },
  restoreProduct: async (id: string) => {
    const { data } = await api.put(`/products/restore/${id}`);
    return data;
  },
  deactivateProduct: async (id: string) => {
    const { data } = await api.delete(`/products/${id}`);
    return data;
  },
  deleteCategory: async (id: string) => {
    const { data } = await api.delete(`/products/category/${id}`);
    return data;
  },
  deleteReview: async (id: string) => {
    const { data } = await api.delete(`/products/review/${id}`);
    return data;
  },
};