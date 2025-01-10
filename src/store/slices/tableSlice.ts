import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Table } from '../../types';

interface TableState {
  selectedTable: Table | null;
  currentTableCode: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: TableState = {
  selectedTable: null,
  currentTableCode: null,
  loading: false,
  error: null,
};

export const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    selectTable: (state, action: PayloadAction<Table | null>) => {
      state.selectedTable = action.payload;
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
});

export const { selectTable, setTableCode, setLoading, setError } = tableSlice.actions;

export default tableSlice.reducer;
