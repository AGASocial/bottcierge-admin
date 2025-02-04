import api from "./api";
import { Table } from "../types";

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

  // Update table status
  updateTableStatus: async (tableId: string, status: string) => {
    return api.patch(`/tables/${tableId}/status`, {
      status,
      assigned: false
    });
  },
};
