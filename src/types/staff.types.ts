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