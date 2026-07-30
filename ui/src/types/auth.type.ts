import { Cart } from "./cart.type";
import { Order } from "./order.type";

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string; 
  role: "USER" | "ADMIN"; 
  dateOfBirth: string; 
  createdAt: string;
  updatedAt: string;
}

export interface RegisterCredentials {
  email: string;
  name: string;
  username: string;
  password: string;
  dateOfBirth: string
}

export interface RegisterResponse {
  message: string;
  user: UserProfile;
}

export interface LoginCredentials {
  login: string;
  password: string;
  rememberMe: boolean;
  deviceId: string;
}

export interface LoginResponse {
  message: string;      
  accessToken: string;
  cart: Cart;
  orders: Order[];
  user: UserProfile;
}