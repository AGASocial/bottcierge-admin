import api from './api';
import { Order, OrderStatus } from '../types';

export const orderService = {
  // Get all orders
  getOrders: async () => {
    // TODO: Replace with actual API call
    const mockOrders: Order[] = [
      // CREATED Orders
      {
        id: '1',
        orderNumber: 'ORD001',
        userId: 'user1',
        tableId: 'table1',
        items: [
          {
            id: 'item1',
            productId: 'prod1',
            name: 'Margarita',
            quantity: 2,
            price: 12.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.CREATED
          }
        ],
        status: OrderStatus.CREATED,
        total: 25.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        orderNumber: 'ORD002',
        userId: 'user1',
        tableId: 'table1',
        items: [
          {
            id: 'item2',
            productId: 'prod2',
            name: 'Piña Colada',
            quantity: 1,
            price: 14.99,
            size: 'Large',
            sizeId: 'size2',
            customizations: {},
            status: OrderStatus.CREATED
          }
        ],
        status: OrderStatus.CREATED,
        total: 14.99,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      
      // AUTHORIZED Orders
      {
        id: '3',
        orderNumber: 'ORD003',
        userId: 'user2',
        tableId: 'table2',
        items: [
          {
            id: 'item3',
            productId: 'prod3',
            name: 'Mojito',
            quantity: 3,
            price: 11.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.AUTHORIZED
          }
        ],
        status: OrderStatus.AUTHORIZED,
        total: 35.97,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        orderNumber: 'ORD004',
        userId: 'user2',
        tableId: 'table2',
        items: [
          {
            id: 'item4',
            productId: 'prod4',
            name: 'Old Fashioned',
            quantity: 2,
            price: 13.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.AUTHORIZED
          }
        ],
        status: OrderStatus.AUTHORIZED,
        total: 27.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      // PREPARING Orders
      {
        id: '5',
        orderNumber: 'ORD005',
        userId: 'user3',
        tableId: 'table3',
        items: [
          {
            id: 'item5',
            productId: 'prod5',
            name: 'Moscow Mule',
            quantity: 4,
            price: 10.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.PREPARING
          }
        ],
        status: OrderStatus.PREPARING,
        total: 43.96,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        orderNumber: 'ORD006',
        userId: 'user3',
        tableId: 'table3',
        items: [
          {
            id: 'item6',
            productId: 'prod6',
            name: 'Whiskey Sour',
            quantity: 2,
            price: 12.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.PREPARING
          }
        ],
        status: OrderStatus.PREPARING,
        total: 25.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      // READY Orders
      {
        id: '7',
        orderNumber: 'ORD007',
        userId: 'user4',
        tableId: 'table4',
        items: [
          {
            id: 'item7',
            productId: 'prod7',
            name: 'Gin & Tonic',
            quantity: 3,
            price: 11.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.READY
          }
        ],
        status: OrderStatus.READY,
        total: 35.97,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        orderNumber: 'ORD008',
        userId: 'user4',
        tableId: 'table4',
        items: [
          {
            id: 'item8',
            productId: 'prod8',
            name: 'Cosmopolitan',
            quantity: 2,
            price: 13.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.READY
          }
        ],
        status: OrderStatus.READY,
        total: 27.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      // SERVED Orders
      {
        id: '9',
        orderNumber: 'ORD009',
        userId: 'user5',
        tableId: 'table5',
        items: [
          {
            id: 'item9',
            productId: 'prod9',
            name: 'Manhattan',
            quantity: 1,
            price: 14.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.SERVED
          }
        ],
        status: OrderStatus.SERVED,
        total: 14.99,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        orderNumber: 'ORD010',
        userId: 'user5',
        tableId: 'table5',
        items: [
          {
            id: 'item10',
            productId: 'prod10',
            name: 'Negroni',
            quantity: 2,
            price: 12.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.SERVED
          }
        ],
        status: OrderStatus.SERVED,
        total: 25.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      // COMPLETED Orders
      {
        id: '11',
        orderNumber: 'ORD011',
        userId: 'user6',
        tableId: 'table6',
        items: [
          {
            id: 'item11',
            productId: 'prod11',
            name: 'Daiquiri',
            quantity: 3,
            price: 11.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.COMPLETED
          }
        ],
        status: OrderStatus.COMPLETED,
        total: 35.97,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '12',
        orderNumber: 'ORD012',
        userId: 'user6',
        tableId: 'table6',
        items: [
          {
            id: 'item12',
            productId: 'prod12',
            name: 'Mai Tai',
            quantity: 2,
            price: 13.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.COMPLETED
          }
        ],
        status: OrderStatus.COMPLETED,
        total: 27.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },

      // CANCELLED Orders
      {
        id: '13',
        orderNumber: 'ORD013',
        userId: 'user7',
        tableId: 'table7',
        items: [
          {
            id: 'item13',
            productId: 'prod13',
            name: 'Martini',
            quantity: 1,
            price: 14.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.CANCELLED
          }
        ],
        status: OrderStatus.CANCELLED,
        total: 14.99,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '14',
        orderNumber: 'ORD014',
        userId: 'user7',
        tableId: 'table7',
        items: [
          {
            id: 'item14',
            productId: 'prod14',
            name: 'Bloody Mary',
            quantity: 2,
            price: 12.99,
            size: 'Regular',
            sizeId: 'size1',
            customizations: {},
            status: OrderStatus.CANCELLED
          }
        ],
        status: OrderStatus.CANCELLED,
        total: 25.98,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
    
    return mockOrders;
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
      status: OrderStatus.CANCELLED 
    });
    return response.data;
  }
};
