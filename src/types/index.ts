export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "customer";
}

export interface OrderHistory {
  orderId: string;
  venueId: string;
  date: Date;
  status: OrderStatus;
  total: number;
}

export interface Size {
  id: string;
  name: string;
  currentPrice: number;
  isAvailable: boolean;
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  totalPrice: number;
  quantity: number;
  size: Size;
  options: Record<string, string | string[]>;
  status: "pending" | "preparing" | "ready" | "delivered";
}

export enum OrderStatus {
  DRAFT = "draft",
  PAID = "paid",
  ACCEPTED = "accepted",
  PREPARING = "preparing",
  SERVING = "serving",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export type OrderStatusType =
  | "draft"
  | "paid"
  | "accepted"
  | "preparing"
  | "serving"
  | "completed"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  tip: number;
  additionalTip: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  brand: string;
  status: "available" | "out_of_stock";
  section: string;
  brandId: string;
  type: string;
  inventory: {
    current: number;
    minimum: number;
    maximum: number;
  };
  sizes: Size[];
}

export interface ProductCustomization {
  id: string;
  name: string;
  type: string;
  options: string[];
}

export interface ServerMetrics {
  ordersServed: number;
  averageRating: number;
  totalSales: number;
  lastMonthPerformance: {
    ordersServed: number;
    averageRating: number;
    totalSales: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  code: string;
  displayOrder: number;
  isActive: boolean;
  parentCategoryId?: string;
  type: "food" | "beverage";
}

export interface ServiceRequest {
  id: string;
  tableId: string;
  type: string;
  status: "pending" | "completed" | "cancelled";
  createdAt: string;
}

export interface PreferenceOption {
  value: string;
  label: string;
}

export interface PreferenceOptions {
  venues: PreferenceOption[];
  musicGenres: PreferenceOption[];
  events: PreferenceOption[];
  drinks: PreferenceOption[];
  crowdSizes: PreferenceOption[];
  spendingHabits: PreferenceOption[];
  atmospheres: PreferenceOption[];
  nightOutFrequency: PreferenceOption[];
  transportation: PreferenceOption[];
  preferredNights: PreferenceOption[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Section {
  id: string;
  name: string;
  description?: string;
  type: "VIP" | "DANCE_FLOOR" | "BAR" | "GENERAL";
  isActive: boolean;
  tables: Table[];
  position: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export enum TableStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  OCCUPIED = "occupied",
  MAINTENANCE = "maintenance",
}

export enum TableType {
  ROUND = "round",
  SQUARE = "square",
  RECTANGLE = "rectangle",
  DANCE_FLOOR = "dance_floor",
  LOUNGE = "lounge",
  BAR_ADJACENT = "bar_adjacent",
  BALCONY = "balcony",
  ROOFTOP = "rooftop",
  CORNER = "corner",
  HIGH_TOP = "high_top",
  SHARED = "shared",
  BOOTH = "booth"
  
}

export interface Table {
  id: string;
  venueId: string;
  number: string;
  qrCode: string;
  category: "regular" | "vip";
  section: string;
  capacity: {
    minimum: number;
    maximum: number;
  };
  location: {
    floor: number;
    position: string;
    coordinates: {
      x: number;
      y: number;
    };
  };
  minimumSpend: number;
  status: TableStatus;
  tableType: TableType;
  reservation: TableReservation | null;
  currentOrder: string | null;
  reservationHistory: ReservationHistory[];
  userId: string | null;
}

export interface TableReservation {
  id: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  minimumSpend: number;
  specialRequests: string;
}

export interface ReservationHistory {
  id: string;
  date: Date;
  revenue: number;
  rating: number;
}

export interface OrderStatusUpdate {
  orderId: string;
  status: OrderStatus;
  updatedAt: string;
}
