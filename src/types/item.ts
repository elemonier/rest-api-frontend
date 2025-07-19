export interface Item {
  id: number;
  name: string;
  description?: string;
  created_at: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
}

export interface ErrorResponse {
  detail: string;
  status_code: number;
}