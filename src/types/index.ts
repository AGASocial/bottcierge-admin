export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'staff' | 'customer';
}

export interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'apple_pay' | 'google_pay';
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

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  sizeId: string;
  customizations: Record<string, string | string[]>;
  status: OrderStatus;
}

export enum OrderStatus {
  CREATED = 'created',
  AUTHORIZED = 'authorized',
  PREPARING = 'preparing',
  READY = 'ready',
  SERVED = 'served',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

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

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  size: string;
  sizeId: string;
  customizations: Record<string, string | string[]>;
  status: OrderStatus;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  brand: string;
  status: 'available' | 'out_of_stock';
  section: string;
  brandId: string;
  type: string;
  inventory: {
    current: number;
    minimum: number;
    maximum: number;
  };
  sizes: {
    id: string;
    name: string;
    currentPrice: number;
    isAvailable: boolean;
  }[]
}

export interface ProductCustomization {
  id: string;
  name: string;
  type: string;
  options: string[];
}

export enum ServerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  ON_BREAK = 'ON_BREAK',
  OFF_DUTY = 'OFF_DUTY'
}

export interface ServerSection {
  id: string;
  name: string;
  description: string;
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

export interface Server {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: ServerStatus;
  sections: ServerSection[];
  metrics: ServerMetrics;
  startDate: string;
  schedule: {
    start: string;
    end: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  code: string;
  displayOrder: number;
  isActive: boolean;
  parentCategoryId?: string;
  type: 'food' | 'beverage';
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
  type: 'VIP' | 'DANCE_FLOOR' | 'BAR' | 'GENERAL';
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
  status: 'available' | 'occupied' | 'reserved';
  x: number;
  y: number;
  capacity: number;
  sectionId: string;
  notes?: string;
  shape: 'round' | 'square' | 'rectangle';
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
  dayOfWeek: number;
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
  firstName: string;
  lastName: string;
  role: 'manager' | 'server' | 'bartender';
  sections: string[];
  isActive: boolean;
  status: 'active' | 'inactive';
  metrics: {
    averageRating: number;
    ordersServed: number;
    salesVolume: number;
  };
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
