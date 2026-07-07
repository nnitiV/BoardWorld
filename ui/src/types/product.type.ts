export interface Product {
    id: string,
    name: string,
    description: string,
    category: {
        id: string,
        name: string,
    }
    price: number,
    isActive: boolean,
    stock: number,
    imagesUrl: string[],
    createdAt: Date,
    updatedAt: Date,
}

export interface Category {
    id: string,
    name: string,
    description: string;
    createdAt: Date,
    updatedAt: Date;
}
    
export interface CreateProduct {
    name: string,
    description: string,
    price: number,
    imagesUrl: string[],
    categoryId: string,
    stock: number,
}

export interface CreateCategory {
    name: string,
    description: string | undefined,
}

export interface UpdateCategory {
    id: string,
    name: string,
    description: string | undefined,
}

export interface ProductCatalogResponse {
    message: string,
    productCatalog: Product[],
    totalItems: number,
}

export interface UpdateCategoryResponse {
    message: string,
    categories: Category[],
}

export interface ProductResponse {
    message: string,
    product: Product,
}

export interface CategoriesResponse {
    message: string,
    categories: Category[],
}