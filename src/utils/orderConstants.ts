import { OrderStatus } from '../types';

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  [OrderStatus.DRAFT]: 'bg-amber-500',           // Warm yellow for draft
  [OrderStatus.PAID]: 'bg-electric-blue',        // Our custom electric blue for paid
  [OrderStatus.ACCEPTED]: 'bg-violet-500',       // Purple for accepted
  [OrderStatus.PREPARING]: 'bg-light-blue',      // Our custom light blue for preparing
  [OrderStatus.SERVING]: 'bg-orange-500',        // Orange for active serving
  [OrderStatus.COMPLETED]: 'bg-emerald-500',     // Bright green for completion
  [OrderStatus.CANCELLED]: 'bg-rose-500'         // Red for cancelled
};

// Define the sequence of order statuses for display and flow
export const ORDER_STATUS_SEQUENCE = [
  OrderStatus.PAID,
  OrderStatus.ACCEPTED,
  OrderStatus.PREPARING,
  OrderStatus.SERVING,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED
] as const;

// Terminal states that don't proceed to next status
export const TERMINAL_STATUSES: OrderStatus[] = [
  OrderStatus.COMPLETED,
  OrderStatus.CANCELLED
];

// You can add more order-related constants here in the future
