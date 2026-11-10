import { useState, useCallback, useEffect } from 'react';
import type { Order, CreateOrderDto, UpdateOrderDto } from '../types/order.types';
import { orderApi } from '../services/orderApi';

export interface UseOrdersState {
  orders: Order[];
  selectedOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseOrdersActions {
  fetchOrders: () => Promise<void>;
  fetchOrderById: (id: string) => Promise<Order | null>;
  createOrder: (orderData: CreateOrderDto) => Promise<Order | null>;
  updateOrder: (id: string, orderData: UpdateOrderDto) => Promise<Order | null>;
  deleteOrder: (id: string) => Promise<boolean>;
  selectOrder: (order: Order | null) => void;
  clearError: () => void;
  clearSelectedOrder: () => void;
}

export type UseOrdersReturn = UseOrdersState & UseOrdersActions;

export function useOrders(): UseOrdersReturn {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSelectedOrder = useCallback(() => {
    setSelectedOrder(null);
  }, []);

  const selectOrder = useCallback((order: Order | null) => {
    setSelectedOrder(order);
  }, []);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedOrders = await orderApi.getOrders();
      setOrders(fetchedOrders);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar las órdenes';
      setError(message);
      console.error('[useOrders] Error fetching orders:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchOrderById = useCallback(async (id: string): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const order = await orderApi.getOrderById(id);
      setSelectedOrder(order);
      return order;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar la orden';
      setError(message);
      console.error('[useOrders] Error fetching order by id:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createOrder = useCallback(async (orderData: CreateOrderDto): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const newOrder = await orderApi.createOrder(orderData);
      setOrders((prev) => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la orden';
      setError(message);
      console.error('[useOrders] Error creating order:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateOrder = useCallback(async (id: string, orderData: UpdateOrderDto): Promise<Order | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderApi.updateOrder(id, orderData);
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updatedOrder : order))
      );
      if (selectedOrder?.id === id) {
        setSelectedOrder(updatedOrder);
      }
      return updatedOrder;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar la orden';
      setError(message);
      console.error('[useOrders] Error updating order:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrder]);

  const deleteOrder = useCallback(async (id: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      await orderApi.deleteOrder(id);
      setOrders((prev) => prev.filter((order) => order.id !== id));
      if (selectedOrder?.id === id) {
        setSelectedOrder(null);
      }
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar la orden';
      setError(message);
      console.error('[useOrders] Error deleting order:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [selectedOrder]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    selectedOrder,
    isLoading,
    error,
    fetchOrders,
    fetchOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    selectOrder,
    clearError,
    clearSelectedOrder,
  };
}

export default useOrders;