import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import type { Table } from "../../types";
import { tableService } from "../../services/table.service";

interface TableState {
  tables: Table[];
  selectedTable: Table | null;
  currentTableCode: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  tables: [],
  selectedTable: null,
  currentTableCode: null,
  loading: false,
  error: null,
};

export const fetchTablesByVenueId = createAsyncThunk(
  "table/fetchTablesByVenueId",
  async (venueId: string) => {
    const response = await tableService.fetchTablesFromVenue(venueId);
    return response.data;
  }
);

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    selectTable: (state, action: PayloadAction<Table | null>) => {
      state.selectedTable = action.payload;
    },
    setCurrentTableCode: (state, action: PayloadAction<string | null>) => {
      state.currentTableCode = action.payload;
    },
    setTableCode: (state, action: PayloadAction<string>) => {
      state.currentTableCode = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTablesByVenueId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTablesByVenueId.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTablesByVenueId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tables";
      });
  },
});

export const {
  selectTable,
  setCurrentTableCode,
  setTableCode,
  setLoading,
  setError,
} = tableSlice.actions;

export default tableSlice.reducer;
