import api from "@/lib/axios";

export const productService = {
    createProduct: async (product: FormData) => {
        const {data} = await api.post("/products", product);
        return data;
    }
}