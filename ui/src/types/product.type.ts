export interface Product {
    id: string,
    name: string,
    description: string,
    price: number,
    isActive: boolean,
    stock: number,
    imagesUrl: string[],
    createdAt: Date,
    updatedAt: Date,
}
    
export interface CreateProduct {
    name: string,
    description: string,
    price: number,
    imagesUrl: string[],
    stock: number,
}

export interface ProductCatalogResponse {
    message: string,
    productCatalog: Product[],
    totalItems: number,
}

export interface ProductResponse {
    message: string,
    product: Product,
}