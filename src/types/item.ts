export interface Item {
  id: number;
  name: string;
  description?: string;
  created_at: string;
  owner_id: number;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
}

export interface User {
  id: number;
  email: string;
  created_at: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ErrorResponse {
  detail: string;
  status_code: number;
}