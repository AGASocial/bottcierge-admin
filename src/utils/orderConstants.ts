import type { OrderStatus, OrderStatusType } from "../types";

export const ORDER_STATUS_COLORS: Record<OrderStatusType, string> = {
  draft: "bg-amber-500", // Warm yellow for draft
  paid: "bg-electric-blue", // Our custom electric blue for paid
  accepted: "bg-violet-500", // Purple for accepted
  preparing: "bg-light-blue", // Our custom light blue for preparing
  serving: "bg-orange-500", // Orange for active serving
  completed: "bg-emerald-500", // Bright green for completion
  cancelled: "bg-rose-500", // Red for cancelled
};

// Define the sequence of order statuses for display and flow
export const ORDER_STATUS_SEQUENCE = [
  "paid",
  "accepted",
  "preparing",
  "serving",
  "completed",
  "cancelled",
] as const;

// Terminal states that don't proceed to next status
export const TERMINAL_STATUSES: OrderStatusType[] = ["completed", "cancelled"];

// You can add more order-related constants here in the future
