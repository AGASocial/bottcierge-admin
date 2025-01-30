import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Order, OrderStatus } from '../types';
import { ORDER_STATUS_COLORS, ORDER_STATUS_SEQUENCE, TERMINAL_STATUSES } from '../utils/orderConstants';
import { fetchOrders, updateOrderStatus } from '../store/slices/orderSlice';
import type { AppDispatch } from '../store';
import Dialog from '../components/common/Dialog';
import Badge from '../components/common/Badge'; // Import Badge component

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory, loading, error } = useSelector((state: RootState) => state.order);
  const [filteredOrders, setFilteredOrders] = useState<Record<OrderStatus, Order[]>>({
    [OrderStatus.DRAFT]: [],
    [OrderStatus.PAID]: [],
    [OrderStatus.ACCEPTED]: [],
    [OrderStatus.PREPARING]: [],
    [OrderStatus.SERVING]: [],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: [],
  });

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders by status
  useEffect(() => {
    const grouped = orderHistory.reduce((acc, order) => {
      const status = order.status as OrderStatus;
      return {
        ...acc,
        [status]: [...(acc[status] || []), order],
      };
    }, {} as Record<OrderStatus, Order[]>);

    setFilteredOrders(grouped);
  }, [orderHistory]);

  const getStatusColor = (status: OrderStatus): string => {
    return ORDER_STATUS_COLORS[status];
  };

  const handleStatusUpdate = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  const [orderToCancel, setOrderToCancel] = useState<{ id: string; number: string } | null>(null);

  const handleCancelOrder = (orderId: string, orderNumber: string) => {
    setOrderToCancel({ id: orderId, number: orderNumber });
  };

  const confirmCancelOrder = async () => {
    if (orderToCancel) {
      try {
        await dispatch(updateOrderStatus({
          orderId: orderToCancel.id,
          status: OrderStatus.CANCELLED
        })).unwrap();
      } catch (error) {
        console.error('Failed to cancel order:', error);
      } finally {
        setOrderToCancel(null);
      }
    }
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className="glass-card p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">Order #{order.orderNumber}</span>
        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Table: {order.tableId}</p>
        <div className="space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t border-white/10">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 flex space-x-2">
        {order.status !== OrderStatus.COMPLETED && order.status !== OrderStatus.CANCELLED && (
          <button
            onClick={() => handleStatusUpdate(order.id, getNextStatus(order.status))}
            className="btn-primary text-sm"
          >
            Move to {getNextStatus(order.status)}
          </button>
        )}
        {order.status === OrderStatus.PAID && (
          <button
            onClick={() => handleCancelOrder(order.id, order.orderNumber)}
            className="btn-danger text-sm"
          >
            Cancel Order
          </button>
        )}
      </div>
    </div>
  );

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus => {
    const statusFlow: Record<OrderStatus, OrderStatus> = {
      [OrderStatus.DRAFT]: OrderStatus.DRAFT,
      [OrderStatus.PAID]: OrderStatus.ACCEPTED,
      [OrderStatus.ACCEPTED]: OrderStatus.PREPARING,
      [OrderStatus.PREPARING]: OrderStatus.SERVING,
      [OrderStatus.SERVING]: OrderStatus.COMPLETED,
      [OrderStatus.COMPLETED]: OrderStatus.COMPLETED,
      [OrderStatus.CANCELLED]: OrderStatus.CANCELLED
    };
    return statusFlow[currentStatus];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="glass-card p-4 text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* Active Orders Section */}
        {ORDER_STATUS_SEQUENCE
          .filter(status => !TERMINAL_STATUSES.includes(status))
          .map(status => {
            const orders = filteredOrders[status] || [];
            return (
              <div key={status} className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className={`w-4 h-4 rounded-full mr-3 ${getStatusColor(status)}`}></span>
                  {status.charAt(0).toUpperCase() + status.slice(1)} Orders ({orders.length})
                </h2>
                <div className="space-y-4">
                  {orders.length === 0 ? (
                    <p className="text-gray-400 text-center py-4">No orders</p>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
      </div>
      <Dialog
        isOpen={!!orderToCancel}
        onClose={() => setOrderToCancel(null)}
        onConfirm={confirmCancelOrder}
        title="Cancel Order"
        message={`Are you sure you want to cancel Order #${orderToCancel?.number}? This action cannot be undone.`}
        confirmText="Cancel Order"
        type="error"
      />
    </div>
  );
};

export default Home;
