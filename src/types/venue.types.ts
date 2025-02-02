export interface Venue {
  id: string;
  name: string;
  address: string;
  description?: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  timezone: string;
  operatingHours: OperatingHours[];
  pricingRules: { [key: string]: number };
  taxRate: number;
  socialMedia?: {
    [key: string]: string;
  };
  image?: string;
  email: string;
  website: string;
  status: VenueStatus;
  paymentAccepted: PaymentAccepted[];
}

export enum VenueStatus {
  ACTIVE = "Active",
  CLOSED = "Closed",
  SPECIAL_EVENT = "Special Event",
  INACTIVE = "Inactive",
}

// export interface PricingRule {
//   [key: string]: number;
  // id: string;
  // name: string;
  // minimumSpend: number;
  // startTime: string;
  // endTime: string;
  // daysApplicable: number[];
  // multiplier: number;
  // affectedCategories: string[];
// }

export interface OperatingHours {
  dayOfWeek: number;
  open: string;
  close: string;
  isOpen: boolean;
}

export interface PaymentAccepted {
  id: string;
  name: string;
  type:
    | "credit_card"
    | "apple_pay"
    | "google_pay"
    | "debit_card"
    | "cash"
    | "samsung_pay";
  isActive: boolean;
}
