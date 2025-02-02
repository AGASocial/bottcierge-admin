import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { ClockIcon } from "@heroicons/react/24/outline";
import { getOrders } from "../store/slices/orderSlice";
import type { AppDispatch, RootState } from "../store";
import { Order, OrderStatus, OrderStatusType } from "../types";
import {
  ORDER_STATUS_COLORS,
  ORDER_STATUS_SEQUENCE,
} from "../utils/orderConstants";

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  return (
    <span
      className={`px-2 py-1 text-white rounded-full text-sm ${
        ORDER_STATUS_COLORS[status as OrderStatus]
      }`}
    >
      {status}
    </span>
  );
};

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    orderHistory: orders,
    loading,
    error,
  } = useSelector((state: RootState) => state.order);
  const [filter, setFilter] = useState<OrderStatusType>("all" as OrderStatusType);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const groupedOrders = orders.reduce(
    (acc: Record<OrderStatus, Order[]>, order: Order) => {
      const status = order.status as OrderStatus;
      if (!acc[status]) {
        acc[status] = [];
      }
      acc[status].push(order);
      return acc;
    },
    {} as Record<OrderStatus, Order[]>
  );

  const statusOrder = ORDER_STATUS_SEQUENCE;

  const filteredStatuses = statusOrder.filter((status) => {
    if (filter === ("all" as OrderStatus)) {
      return true;
    }
    return status === filter;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderOrder = (order: Order) => (
    <motion.div
      key={order.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 text-white"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <h3 className="text-xl font-bold">Order #{order.orderNumber}</h3>
            <OrderStatusBadge status={order.status as OrderStatus} />
          </div>
          <div className="flex items-center space-x-2 text-gray-300">
            <ClockIcon className="w-4 h-4" />
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4">
        <h4 className="font-medium mb-2 text-gray-300">Items</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-2 rounded-lg hover:bg-blue-900/30 transition-colors duration-150"
            >
              <div>
                <p className="font-medium text-white">{item.name}</p>
                <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
              </div>
              <p className="text-white">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-deep-blue/100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Orders History</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all" as OrderStatus)}
              className={`px-4 py-2 rounded ${
                filter === "all" as OrderStatus
                  ? "bg-blue-500 text-white"
                  : "bg-blue-900/50 hover:bg-blue-800/50 text-white"
              }`}
            >
              All
            </button>
            {statusOrder.map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded ${
                  filter === status
                    ? "bg-blue-500 text-white"
                    : "bg-blue-900/50 hover:bg-blue-800/50 text-white"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          {filteredStatuses.map((status) => {
            const statusOrders = groupedOrders[status] || [];
            if (statusOrders.length === 0) return null;

            return (
              <div key={status} className="glass-card p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4 text-white">
                  {status.charAt(0).toUpperCase() + status.slice(1)} Orders (
                  {statusOrders.length})
                </h2>
                <div className="space-y-4">{statusOrders.map(renderOrder)}</div>
              </div>
            );
          })}
        </div>
      </div>
      {orders.length === 0 && (
        <div className="text-center text-gray-400 mt-8">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default Orders;
