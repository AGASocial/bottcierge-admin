import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../services/api";
import axios from "axios";
import type { Section } from "../../types";
import {
  PaymentAccepted,
  // PricingRule,
  Venue,
  VenueStatus,
} from "@/types/venue.types";
import { updateVenueDetails as updateVenueAPI } from "../../services/venue.service";

interface VenueState {
  currentVenue: Venue | null;
  loading: boolean;
  error: string | null;
}

const initialState: VenueState = {
  currentVenue: null,
  loading: false,
  error: null,
};

export const fetchVenueDetails = createAsyncThunk(
  "venue/fetchDetails",
  async (venueId: string, { rejectWithValue }) => {
    try {
      const venueRes = await api.get(`/venues/${venueId}`);
      return {
        venue: venueRes.data,
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch venue details"
      );
    }
  }
);

export const updateVenueThunk = createAsyncThunk(
  "venue/updateDetails",
  async ({ venueId, venueData }: { venueId: string; venueData: Venue }, { rejectWithValue }) => {
    try {
      const response = await updateVenueAPI(venueId, venueData);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update venue details"
      );
    }
  }
);

export const fetchVenueMetrics = createAsyncThunk(
  "venue/fetchMetrics",
  async (venueId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/venues/${venueId}/metrics`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch venue metrics"
      );
    }
  }
);

// export const updatePricingRule = createAsyncThunk(
//   "venue/updatePricingRule",
//   async (
//     {
//       ruleId,
//       updates,
//     }: {
//       ruleId: string;
//       updates: Partial<PricingRule>;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await api.patch(`/pricing-rules/${ruleId}`, updates);
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to update pricing rule"
//       );
//     }
//   }
// );

const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {
    updateVenue: (state, action: PayloadAction<Venue>) => {
      console.log('Updating venue in Redux:', action.payload);
      state.currentVenue = action.payload;
      state.error = null;
    },
    clearVenueError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVenueDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenueDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVenue = action.payload.venue;
      })
      .addCase(fetchVenueDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateVenueThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVenueThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVenue = action.payload;
      })
      .addCase(updateVenueThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateVenue, clearVenueError } = venueSlice.actions;

export default venueSlice.reducer;
