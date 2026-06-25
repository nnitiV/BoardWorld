export interface Product {
    id: string,
    name: string,
    price: number,
    isActive: boolean,
    stock: number,
    imageUrl: string,
    createdAt: Date,
    updatedAt: Date,
}

export interface CreateProduct {
    name: string,
    price: number,
    imageUrl: string,
    stock: number,
}

export interface ProductCatalogResponse {
    message: string,
    productCatalog: Product[],
    totalItems: number,
}