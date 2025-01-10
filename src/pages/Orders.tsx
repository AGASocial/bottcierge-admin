import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import { getOrders } from '../store/slices/orderSlice';
import type { AppDispatch, RootState } from '../store';
import { Order, OrderStatus } from '../types';

const OrderStatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const colors: Record<OrderStatus, string> = {
    [OrderStatus.CREATED]: 'bg-yellow-500',
    [OrderStatus.AUTHORIZED]: 'bg-blue-500',
    [OrderStatus.PREPARING]: 'bg-purple-500',
    [OrderStatus.READY]: 'bg-green-500',
    [OrderStatus.SERVED]: 'bg-gray-500',
    [OrderStatus.COMPLETED]: 'bg-green-500',
    [OrderStatus.CANCELLED]: 'bg-red-500'
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-white text-sm ${colors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Orders: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orderHistory: orders, loading, error } = useSelector((state: RootState) => state.order);
  const [filter, setFilter] = useState<'all' | 'active' | 'past'>('active');

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const groupedOrders = orders.reduce((acc, order: Order) => {
    if (!acc[order.status]) {
      acc[order.status] = [];
    }
    acc[order.status].push(order);
    return acc;
  }, {} as Record<OrderStatus, Order[]>);

  const statusOrder = [
    OrderStatus.CREATED,
    OrderStatus.AUTHORIZED,
    OrderStatus.PREPARING,
    OrderStatus.READY,
    OrderStatus.SERVED,
    OrderStatus.COMPLETED,
    OrderStatus.CANCELLED
  ];

  const filteredStatuses = statusOrder.filter(status => {
    if (filter === 'active') {
      return [
        OrderStatus.CREATED,
        OrderStatus.AUTHORIZED,
        OrderStatus.PREPARING,
        OrderStatus.READY
      ].includes(status);
    }
    if (filter === 'past') {
      return [
        OrderStatus.SERVED,
        OrderStatus.COMPLETED,
        OrderStatus.CANCELLED
      ].includes(status);
    }
    return true;
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
      className="text-black bg-white rounded-lg shadow-md p-6 mb-4"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-4 mb-2">
            <h3 className="text-xl font-bold">Order #{order.orderNumber}</h3>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <ClockIcon className="w-4 h-4" />
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold">${order.total.toFixed(2)}</p>
        </div>
      </div>

      <div className="border-t pt-4">
        <h4 className="font-medium mb-2">Items</h4>
        <div className="space-y-2">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </p>
              </div>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded ${filter === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded ${filter === 'past'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 hover:bg-gray-200 text-black'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {filteredStatuses.map(status => {
          const statusOrders = groupedOrders[status] || [];
          if (statusOrders.length === 0) return null;

          return (
            <div key={status} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-white">
                {status.charAt(0).toUpperCase() + status.slice(1)} Orders ({statusOrders.length})
              </h2>
              <div className="space-y-4">
                {statusOrders.map(renderOrder)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
