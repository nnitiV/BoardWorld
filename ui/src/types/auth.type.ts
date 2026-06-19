export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

export interface LoginCredentials {
  login: string;
  password: string;
  rememberMe: boolean;
  deviceId: string;
}

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: UserProfile;
}
