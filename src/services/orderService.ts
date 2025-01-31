import api from './api';
import type { Order, OrderStatus } from '../types';

export const orderService = {
  // Get all orders
  getOrders: async () => {
    try {
      const response = await api.get<Order[]>('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getOrderById: async (orderId: string) => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: OrderStatus) => {
    const response = await api.patch(`/orders/${orderId}`, { status });
    return response.data;
  },

  // Create new order
  createOrder: async (orderData: Partial<Order>) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Cancel order
  cancelOrder: async (orderId: string) => {
    const response = await api.patch(`/orders/${orderId}`, {
      status: 'cancelled' as const
    });
    return response.data;
  }
};
