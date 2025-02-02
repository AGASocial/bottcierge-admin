import api from "./api";
import { Staff, StaffStatus } from "../types/staff.types";

export const tableService = {
  // Get all servers
  fetchTables: async () => {
    // TODO: Replace with actual API call
    return api.get("/tables");
  },

  fetchTablesFromVenue: async (venueId: string) => {
    // TODO: Replace with actual API call
    return api.get(`/tables/venue/${venueId}`);
  },

  // Get staff by ID
  fetchTableById: async (tableId: string) => {
    // TODO: Replace with actual API call
    return api.get(`/tables/${tableId}`);
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
