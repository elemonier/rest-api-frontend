import axios from 'axios';
import { Item, CreateItemRequest } from '@/types/item';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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