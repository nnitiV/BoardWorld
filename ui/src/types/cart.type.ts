import { UserProfile } from "./auth.type";
import { Product } from "./product.type";

export interface CartItem {
  id: string;
  quantity: number;
  cartId: string;
  product: Product;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cart {
  id: string;
  userId: string;
  user: UserProfile;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AddCartItem {
  productId: string;
  quantity: number;
}

export interface AddCartItemResponse {
  message: string;
  cartItem: CartItem;
}