import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { Order, OrderStatus } from "../types";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_SEQUENCE,
  TERMINAL_STATUSES,
} from "../utils/orderConstants";
import {
  fetchOrders,
  updateOrderStatus,
  updateOrderStatusSocket,
  addNewPaidOrders,
} from "../store/slices/orderSlice";
import type { AppDispatch } from "../store";
import Dialog from "../components/common/Dialog";
import { socketService } from "../services/socketService";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory, loading, error } = useSelector(
    (state: RootState) => state.order
  );
  const [groupedOrders, setGroupedOrders] = useState<
    Record<OrderStatus, Order[]>
  >({
    [OrderStatus.DRAFT]: [],
    [OrderStatus.PAID]: [],
    [OrderStatus.ACCEPTED]: [],
    [OrderStatus.PREPARING]: [],
    [OrderStatus.SERVING]: [],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: [],
  });
  const [orderToCancel, setOrderToCancel] = useState<{
    id: string;
    number: string;
  } | null>(null);

  // Initial fetch of orders
  useEffect(() => {
    console.log("Fetching orders...");
    dispatch(fetchOrders());

    // Set up socket connection and subscriptions
    socketService.connect();

    // Subscribe to all orders
    const handleOrders = (orders: Order[]) => {
      // Only handle new PAID orders from socket
      const paidOrders = orders.filter((order) => order.status === "paid");
      if (paidOrders.length > 0) {
        console.log("Received new PAID orders:", paidOrders);
        // Merge paid orders with existing orders
        dispatch(addNewPaidOrders(paidOrders));
      }
    };

    // Listen for order status updates
    const handleStatusUpdate = (
      update: Omit<OrderStatusUpdate, "updatedAt">
    ) => {
      const completeUpdate: OrderStatusUpdate = {
        ...update,
        updatedAt: new Date().toISOString(),
      };

      console.log("Order status updated2:", completeUpdate);
      if (completeUpdate.status === "paid") {
        // For PAID status, we add it directly via socket
        dispatch(updateOrderStatusSocket(completeUpdate));
      } else {
        // For other status changes, refresh via API to ensure consistency
        dispatch(fetchOrders());
      }
    };

    socketService.subscribeToAllOrders(handleOrders);
    const cleanup = socketService.onOrderStatusUpdate(handleStatusUpdate);

    return () => {
      cleanup();
      socketService.unsubscribeFromAllOrders();
      socketService.disconnect();
    };
  }, [dispatch]);

  // Filter orders by status whenever orderHistory changes
  useEffect(() => {
    // console.log('Filtering orders:', orderHistory);
    const grouped = orderHistory.reduce((acc, order) => {
      const status = order.status as OrderStatus;
      return {
        ...acc,
        [status]: [...(acc[status] || []), order],
      };
    }, {} as Record<OrderStatus, Order[]>);

    setGroupedOrders(grouped);
  }, [orderHistory]);

  const getStatusColor = (status: OrderStatus): string => {
    return ORDER_STATUS_COLORS[status];
  };

  const getStatusBadgeClass = (status: OrderStatus) => {
    const baseClasses = "px-2 py-1 rounded-full text-sm";
    const colorClass = getStatusColor(status);
    const animationClass =
      status === OrderStatus.PAID ? "animate-pulse-fast" : "";
    return `${baseClasses} ${colorClass} ${animationClass}`;
  };

  const getCardClass = (status: OrderStatus) => {
    const baseClasses = "glass-card p-4 mb-4";
    const bgClass = status === OrderStatus.PAID ? "bg-deep-blue/100" : "";
    return `${baseClasses} ${bgClass}`;
  };

  const handleStatusUpdate = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: newStatus })
      ).unwrap();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const handleCancelOrder = (orderId: string, orderNumber: string) => {
    setOrderToCancel({ id: orderId, number: orderNumber });
  };

  const confirmCancelOrder = async () => {
    if (orderToCancel) {
      try {
        await dispatch(
          updateOrderStatus({
            orderId: orderToCancel.id,
            status: OrderStatus.CANCELLED,
          })
        ).unwrap();
      } catch (error) {
        console.error("Failed to cancel order:", error);
      } finally {
        setOrderToCancel(null);
      }
    }
  };

  const OrderCard: React.FC<{ order: Order }> = ({ order }) => (
    <div className={getCardClass(order.status as OrderStatus)}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">
          Order #{order.orderNumber}
        </span>
        <span className={getStatusBadgeClass(order.status as OrderStatus)}>
          {order.status}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-300">Table: {order.tableId}</p>
        <div className="space-y-1">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t border-white/10">
          <span className="font-semibold">Total:</span>
          <span className="font-semibold">${order.total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mt-4 flex justify-between space-x-2">
        <div className="justify-self-start">
          {order.status === OrderStatus.PAID && (
            <button
              onClick={() => handleCancelOrder(order.id, order.orderNumber)}
              className="btn-secondary text-sm"
            >
              Cancel Order
            </button>
          )}
        </div>
        <div className="justify-self-end">
          {order.status !== OrderStatus.COMPLETED &&
            order.status !== OrderStatus.CANCELLED && (
              <button
                onClick={() =>
                  handleStatusUpdate(
                    order.id,
                    getNextStatus(order.status as OrderStatus)
                  )
                }
                className="btn-primary text-sm"
              >
                Move to {getNextStatus(order.status as OrderStatus)}
              </button>
            )}
        </div>
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
      [OrderStatus.CANCELLED]: OrderStatus.CANCELLED,
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
        <div className="glass-card p-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order Management</h1>
      <div className="grid grid-cols-1 gap-6">
        {/* Active Orders Section */}
        {ORDER_STATUS_SEQUENCE.filter(
          (status) => !TERMINAL_STATUSES.includes(status)
        ).map((status) => {
          const orders = groupedOrders[status] || [];
          return (
            <div key={status} className="glass-card p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <span
                  className={`w-4 h-4 rounded-full mr-3 ${getStatusColor(
                    status
                  )}`}
                ></span>
                {status.charAt(0).toUpperCase() + status.slice(1)} Orders (
                {orders.length})
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
