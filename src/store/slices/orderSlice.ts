import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';
import { Order, OrderItem, OrderStatus } from '../../types';
import api from '../../services/api';

interface OrderState {
  currentOrder: Order | null;
  loading: boolean;
  error: string | null;
  orderHistory: Order[];
}

const initialState: OrderState = {
  currentOrder: null,
  loading: false,
  error: null,
  orderHistory: [],
};

export const addItemToOrder = createAsyncThunk(
  'order/addItem',
  async ({ orderId, item }: { orderId: string; item: Omit<OrderItem, 'id'> }) => {
    const response = await api.post(`/orders/${orderId}/items`, item);
    return response.data;
  }
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: { venueId: string; tableId: string; type: string }) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  }
);


export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => {
    const response = await api.get('/orders');
    return response.data;
  }
);


export const removeItemFromOrder = createAsyncThunk(
  'order/removeItem',
  async ({ orderId, itemId }: { orderId: string; itemId: string }) => {
    const response = await api.delete(`/orders/${orderId}/items/${itemId}`);
    return response.data;
  }
);


// Async thunks
export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async () => {
    const orders = await orderService.getOrders();
    return orders;
  }
);

export const updateOrderStatus = createAsyncThunk(
  'order/updateStatus',
  async ({ orderId, status }: { orderId: string; status: OrderStatus }) => {
    const updatedOrder = await orderService.updateOrderStatus(orderId, status);
    return updatedOrder;
  }
);

export const cancelOrder = createAsyncThunk(
  'order/cancelOrder',
  async (orderId: string) => {
    const cancelledOrder = await orderService.cancelOrder(orderId);
    return cancelledOrder;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      // Update Order Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload;
        state.orderHistory = state.orderHistory.map(order =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update order status';
      })
      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        const cancelledOrder = action.payload;
        state.orderHistory = state.orderHistory.map(order =>
          order.id === cancelledOrder.id ? cancelledOrder : order
        );
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to cancel order';
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
