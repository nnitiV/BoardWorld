import api from "@/lib/axios";

export const productService = {
    createProduct: async (product: FormData) => {
        const {data} = await api.post("/products", product);
        return data;
    },
    getProductCatalog: async (page: number, limit: number) => {
        const {data} = await api.get(`/products/catalog?page=${page}&limit=${limit}`)
        return data;
    }
}