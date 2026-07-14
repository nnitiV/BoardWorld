import { UserProfile } from "./auth.type";

export interface Product {
  id: string;
  name: string;
  description: string;
  categories: {
    id: string;
    name: string;
  }[];
  totalRating: number;
  price: number;
  isActive: boolean;
  stock: number;
  imagesUrl: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface EditProduct {
  id: string;
  name: string;
  description: string;
  categories: string[];
  totalRating: number;
  price: number;
  isActive: boolean;
  stock: number;
  imagesUrl: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;
  description: string;
  price: number;
  imagesUrl: string[];
  categories: string[];
  stock: number;
}

export interface UpdateCategory {
  id: string;
  name: string;
  description: string | undefined;
}

export interface ProductCatalogResponse {
  message: string;
  productCatalog: Product[];
  totalItems: number;
}

export interface UpdateCategoryResponse {
  message: string;
  categories: Category[];
}

export interface ProductResponse {
  message: string;
  product: Product;
}

export interface ProductsResponse {
  message: string;
  products: Product[];
}

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}

export interface Review {
  id: string;
  productId: string;
  user: UserProfile,
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
