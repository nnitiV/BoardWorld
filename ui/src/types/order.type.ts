import { UserProfile } from "./auth.type";
import { Product } from "./product.type";


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
  displayId: number;
  userId: string;
  user: UserProfile;
  status: string;
  paymentUrl: string;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Checkout {
  id: string;
  url: string;
}

export interface GetOrdersResponse {
  message: string;
  orders: Order[]
}

export interface CheckoutResponse {
  message: string;
  checkout: Checkout;
  order: Order
}

export interface CancelOrderResponse {
  message: string;
  canceledOrder: Order
}