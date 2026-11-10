import axios, { AxiosInstance, AxiosError } from 'axios';
import type { Order, CreateOrderDto, UpdateOrderDto, OrderApiResponse, OrderErrorResponse } from '../types/order.types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

class OrderApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError<OrderErrorResponse>) => {
        if (error.response) {
          const errorData = error.response.data;
          const message = errorData?.message || 'Error en la solicitud';
          console.error(`[OrderApi] Error ${error.response.status}: ${message}`);
          return Promise.reject(new Error(message));
        } else if (error.request) {
          console.error('[OrderApi] Sin respuesta del servidor');
          return Promise.reject(new Error('No se pudo conectar al servidor'));
        } else {
          console.error('[OrderApi] Error de configuración:', error.message);
          return Promise.reject(error);
        }
      }
    );
  }

  async createOrder(orderData: CreateOrderDto): Promise<Order> {
    const response = await this.client.post<OrderApiResponse<Order>>('/orders', orderData);
    return response.data.data;
  }

  async getOrders(): Promise<Order[]> {
    const response = await this.client.get<OrderApiResponse<Order[]>>('/orders');
    return response.data.data;
  }

  async getOrderById(id: string): Promise<Order> {
    const response = await this.client.get<OrderApiResponse<Order>>(`/orders/${id}`);
    return response.data.data;
  }

  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<Order> {
    const response = await this.client.put<OrderApiResponse<Order>>(`/orders/${id}`, orderData);
    return response.data.data;
  }

  async deleteOrder(id: string): Promise<void> {
    await this.client.delete(`/orders/${id}`);
  }
}

export const orderApi = new OrderApiService();
export default orderApi;