import api from "@/lib/axios";
import { CreateCategory, UpdateCategory } from "@/types/product.type";

export const productService = {
    createProduct: async (product: FormData) => {
        const {data} = await api.post("/products", product);
        return data;
    },
    createCategory: async (category: CreateCategory) => {
        const {data} = await api.post("/products/category", category);
        return data;
    },
    getProductCatalog: async (page: number, limit: number) => {
        const {data} = await api.get(`/products/catalog?page=${page}&limit=${limit}`);
        return data;
    },
    getCategories: async () => {
        const {data} = await api.get("/products/categories");
        return data;
    },
    getProductById: async (id: string) => {
        const {data} = await api.get(`/products/${id}`);
        return data;
    },
    getActiveProductCatalog: async (page: number, limit: number) => {
        const {data} = await api.get(`/products/active?page=${page}&limit=${limit}`);
        return data;
    },
    updateProduct: async (product: FormData) => {
        const {data} = await api.put(`/products/${product.get("id")}`, product);
        return data;
    },
    updateCategory: async (category: UpdateCategory) => {
      const {data} = await api.put(`/products/category/${category.id}`, category);
      return data;
    },
    restoreProduct: async (id: string) => {
        const {data} = await api.put(`/products/restore/${id}`);
        return data;
    }, 
    deactivateProduct: async (id: string) => {
        const {data} = await api.delete(`/products/${id}`);
        return data;
    }
}