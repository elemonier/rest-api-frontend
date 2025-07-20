import axios from 'axios';
import { Item, CreateItemRequest, RegisterRequest, LoginRequest, AuthResponse, User } from '@/types/item';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear invalid token
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      // Could redirect to login here
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: async (userData: RegisterRequest): Promise<User> => {
    const response = await api.post<User>('/auth/register', userData);
    return response.data;
  },

  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },
};

export const itemsApi = {
  getAllItems: async (): Promise<Item[]> => {
    const response = await api.get<Item[]>('/items');
    return response.data;
  },

  getItem: async (id: number): Promise<Item> => {
    const response = await api.get<Item>(`/items/${id}`);
    return response.data;
  },

  createItem: async (item: CreateItemRequest): Promise<Item> => {
    const response = await api.post<Item>('/items', item);
    return response.data;
  },
};

export default api;