import { io, Socket } from 'socket.io-client';
import { Order, OrderStatus } from '../types';

type OrderStatusUpdate = {
  orderId: string;
  status: OrderStatus;
};

type OrderStatusUpdateCallback = (update: OrderStatusUpdate) => void;

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;
  private statusUpdateCallbacks: Set<OrderStatusUpdateCallback> = new Set();

  private constructor() {}

  static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  connect() {
    if (!this.socket) {
      const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      this.socket = io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });

      // Listen for order status updates
      this.socket.on('orderStatusUpdate', (update: OrderStatusUpdate) => {
        console.log('Received order status update:', update);
        this.statusUpdateCallbacks.forEach(callback => callback(update));
      });
    }
    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  onOrderStatusUpdate(callback: OrderStatusUpdateCallback) {
    if (!this.socket) {
      this.connect();
    }
    this.statusUpdateCallbacks.add(callback);

    // Return cleanup function
    return () => {
      this.statusUpdateCallbacks.delete(callback);
    };
  }

  subscribeToAllOrders(callback: (orders: Order[]) => void) {
    if (!this.socket) {
      this.connect();
    }

    this.socket?.emit('subscribeToAllOrders');
    
    this.socket?.on('allOrders', ({ orders }) => {
      callback(orders);
    });

    this.socket?.on('orderUpdate', ({ orderId, status }) => {
      console.log(`Order ${orderId} updated to ${status}`);
    });
  }

  unsubscribeFromAllOrders() {
    if (this.socket) {
      this.socket.emit('unsubscribeFromAllOrders');
      this.socket.off('allOrders');
      this.socket.off('orderUpdate');
    }
  }
}

export const socketService = SocketService.getInstance();
