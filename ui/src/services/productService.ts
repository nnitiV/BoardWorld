import api from "@/lib/axios";

export const productService = {
    createProduct: async (product: FormData) => {
        const {data} = await api.post("/products", product);
        return data;
    },
    getProductCatalog: async (page: number, limit: number) => {
        const {data} = await api.get(`/products/catalog?page=${page}&limit=${limit}`);
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
    restoreProduct: async (id: string) => {
        const {data} = await api.put(`/products/restore/${id}`);
        return data;
    }, 
    deactivateProduct: async (id: string) => {
        const {data} = await api.delete(`/products/${id}`);
        return data;
    }
}