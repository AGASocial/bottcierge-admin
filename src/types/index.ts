export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "customer";
}

export interface PaymentMethod {
  id: string;
  type: "credit_card" | "apple_pay" | "google_pay";
  lastFour: string;
  token: string;
  isDefault: boolean;
  expiryDate: string;
}

export interface Favorite {
  templateId: string;
  name: string;
  items: OrderItem[];
  lastUsed: Date;
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

export interface Table {
  id: string;
  number: string;
  status: "available" | "occupied" | "reserved";
  x: number;
  y: number;
  capacity: number;
  sectionId: string;
  minimumSpend: number;
  notes?: string;
  shape: "round" | "square" | "rectangle";
  width: number;
  height: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  description: string;
  image?: string;
  tables: Table[];
  email?: string;
  phone?: string;
  location?: VenueLocation;
  website?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  operatingHours?: OperatingHours[];
  pricingRules?: PricingRule[];
  events?: VenueEvent[];
  staff?: Staff[];
  tableReservations?: TableReservation[];
  reservationHistory?: ReservationHistory[];
  paymentMethods?: PaymentMethod[];
  favorites?: Favorite[];
  orders?: Order[];
  products?: Product[];
  productCustomizations?: ProductCustomization[];
}

export interface VenueLocation {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  timezone: string;
  taxRate: number;
}

export interface OperatingHours {
  dayOfWeek: string;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface PricingRule {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  daysApplicable: number[];
  multiplier: number;
  affectedCategories: string[];
}

export interface VenueEvent {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  specialMenu: boolean;
  minimumSpend: number;
  specialPricing: boolean;
}

export interface Staff {
  id: string;
  badgeNumber: string;
  firstName: string;
  lastName: string;
  venueId: string;
  email: string;
  phoneNumber: string;
  role: "manager" | "server" | "bartender";
  sections: string[];
  isActive: boolean;
  status: StaffStatus;
  metrics: {
    averageRating: number;
    ordersServed: number;
    salesVolume: number;
    totalSales: number;
  };
  schedule: {
    dayOfWeek: number;
    start: string;
    end: string;
  }[];
}

export enum StaffStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ON_BREAK = "On Break",
  OFF_DUTY = "Off Duty",
  SICK = "Sick",
  VACATION = "Vacation",
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
