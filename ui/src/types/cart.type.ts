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

export interface OrderItem {
  id: string;
  quantity: number;
  orderId: string;
  product: Product;
  productId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  user: UserProfile;
  status: string
  items: OrderItem[];
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

export interface UpdateCartItem {
  productId: string;
  quantity: number;
}

export interface UpdateCartItemResponse {
  message: string;
  updatedCartItem: CartItem;
}

export interface DeleteCartItemResponse {
  message: string;
  deletedCartItemId: string;
}

export interface Checkout {
  id: string;
  url: string;
}

export interface CheckoutResponse {
  message: string;
  checkout: Checkout;
  order: Order
}