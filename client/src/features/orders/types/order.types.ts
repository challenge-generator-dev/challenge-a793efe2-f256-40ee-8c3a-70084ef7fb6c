export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
}

export interface UpdateOrderDto {
  customerName?: string;
  customerEmail?: string;
  items?: OrderItem[];
  totalAmount?: number;
  status?: OrderStatus;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderApiResponse<T> {
  data: T;
  message?: string;
}

export interface OrderErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string>;
}