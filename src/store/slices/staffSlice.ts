import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { Staff } from "../../types";
import { staffService } from "../../services/staffService";

interface StaffState {
  staffMembers: Staff[];
  currentStaff: Staff | null;
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  staffMembers: [],
  currentStaff: null,
  loading: false,
  error: null,
};

export const fetchStaffMembers = createAsyncThunk(
  "staff/fetchStaffMembers",
  async () => {
    const response = await api.get("/staff");
    return response.data;
  }
);

export const fetchStaffMembersFromVenue = createAsyncThunk(
  "staff/fetchStaffMembersFromVenue",
  async (venueId: string) => {
    const response = await staffService.getStaffMembersFromVenue(venueId);
    return response.data;
  }
);

export const fetchStaffById = createAsyncThunk(
  "staff/fetchStaffById",
  async (staffId: string) => {
    const response = await api.get(`/staff/${staffId}`);
    return response.data;
  }
);

export const createStaffMember = createAsyncThunk(
  "staff/createStaffMember",
  async (staffData: Partial<Staff>) => {
    const response = await api.post("/staff", staffData);
    return response.data;
  }
);

export const updateStaffMember = createAsyncThunk(
  "staff/updateStaffMember",
  async ({ id, data }: { id: string; data: Partial<Staff> }) => {
    const response = await api.put(`/staff/${id}`, data);
    return response.data;
  }
);

export const updateStaffStatus = createAsyncThunk(
  "venue/updateStaffStatus",
  async (
    {
      staffId,
      status,
    }: {
      staffId: string;
      status: Staff["status"];
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/staff/${staffId}/status/${status}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update staff status"
      );
    }
  }
);

export const updateStaffMetrics = createAsyncThunk(
  "staff/updateStaffMetrics",
  async ({ id, metrics }: { id: string; metrics: Staff["metrics"] }) => {
    const response = await api.patch(`/staff/${id}/metrics`, metrics);
    return response.data;
  }
);

export const deactivateStaffMember = createAsyncThunk(
  "staff/deactivateStaffMember",
  async (staffId: string) => {
    const response = await api.post(`/staff/${staffId}/deactivate`);
    return response.data;
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCurrentStaff: (state, action) => {
      state.currentStaff = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get staff members
      .addCase(fetchStaffMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.staffMembers = action.payload;
      })
      .addCase(fetchStaffMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get staff members";
      })
      // Get staff members from venue
      .addCase(fetchStaffMembersFromVenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffMembersFromVenue.fulfilled, (state, action) => {
        state.loading = false;
        state.staffMembers = action.payload;
      })
      .addCase(fetchStaffMembersFromVenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get staff members";
      })
      // Get staff by ID
      .addCase(fetchStaffById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaffById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentStaff = action.payload;
      })
      .addCase(fetchStaffById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to get staff member";
      })
      // Create staff member
      .addCase(createStaffMember.fulfilled, (state, action) => {
        state.staffMembers.push(action.payload);
      })
      // Update staff member
      .addCase(updateStaffMember.fulfilled, (state, action) => {
        const index = state.staffMembers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.staffMembers[index] = action.payload;
        }
        if (state.currentStaff?.id === action.payload.id) {
          state.currentStaff = action.payload;
        }
      })
      // Update staff metrics
      .addCase(updateStaffMetrics.fulfilled, (state, action) => {
        const index = state.staffMembers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.staffMembers[index] = action.payload;
        }
        if (state.currentStaff?.id === action.payload.id) {
          state.currentStaff = action.payload;
        }
      })
      .addCase(updateStaffStatus.fulfilled, (state, action) => {
        const staffIndex = state.staffMembers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (staffIndex !== -1) {
          state.staffMembers[staffIndex] = action.payload;
        }
      })
      // Deactivate staff member
      .addCase(deactivateStaffMember.fulfilled, (state, action) => {
        const index = state.staffMembers.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.staffMembers[index] = action.payload;
        }
        if (state.currentStaff?.id === action.payload.id) {
          state.currentStaff = action.payload;
        }
      });
  },
});

export const { clearError, setCurrentStaff } = staffSlice.actions;
export default staffSlice.reducer;
