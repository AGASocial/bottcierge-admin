import api from "./api";
import { Staff, StaffStatus } from "../types/staff.types";

export const staffService = {
  // Get all servers
  getStaff: async () => {
    // TODO: Replace with actual API call
    return api.get("/staff");
  },

  getStaffMembersFromVenue: async (venueId: string) => {
    // TODO: Replace with actual API call
    return api.get(`/venues/${venueId}/staff`);
  },

  // Get staff by ID
  getServerById: async (serverId: string) => {
    // TODO: Replace with actual API call
    return api.get(`/staff/${serverId}`);
  },

  // Create new staff
  createServer: async (serverData: Partial<Staff>) => {
    return {};
  },

  // Update staff
  updateServer: async (serverId: string, data: Partial<Staff>) => {
    // TODO: Replace with actual API call
    return [];
  },

  // Update staff status
  updateServerStatus: async (serverId: string, status: StaffStatus) => {
    // TODO: Replace with actual API call
    return [];
  },
};
