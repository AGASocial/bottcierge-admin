import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Section, Table } from '../../types';
import { sectionService } from '../../services/sectionService';

interface SectionState {
  sections: Section[];
  selectedSection: Section | null;
  loading: boolean;
  error: string | null;
}

const initialState: SectionState = {
  sections: [],
  selectedSection: null,
  loading: false,
  error: null,
};

export const fetchSections = createAsyncThunk(
  'sections/fetchSections',
  async () => {
    return await sectionService.getSections();
  }
);

export const createSection = createAsyncThunk(
  'sections/createSection',
  async (section: Omit<Section, 'id'>) => {
    return await sectionService.createSection(section);
  }
);

export const updateSection = createAsyncThunk(
  'sections/updateSection',
  async (section: Section) => {
    return await sectionService.updateSection(section);
  }
);

export const deleteSection = createAsyncThunk(
  'sections/deleteSection',
  async (sectionId: string) => {
    await sectionService.deleteSection(sectionId);
    return sectionId;
  }
);

export const updateTable = createAsyncThunk(
  'sections/updateTable',
  async (table: Table) => {
    return await sectionService.updateTable(table);
  }
);

const sectionSlice = createSlice({
  name: 'sections',
  initialState,
  reducers: {
    setSelectedSection: (state, action: PayloadAction<Section | null>) => {
      state.selectedSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSections.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch sections';
      })
      .addCase(createSection.fulfilled, (state, action) => {
        state.sections.push(action.payload);
      })
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.sections.findIndex((s) => s.id === action.payload.id);
        if (index !== -1) {
          state.sections[index] = action.payload;
        }
      })
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.sections = state.sections.filter((s) => s.id !== action.payload);
        if (state.selectedSection?.id === action.payload) {
          state.selectedSection = null;
        }
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        const sectionIndex = state.sections.findIndex(
          (s) => s.id === action.payload.sectionId
        );
        if (sectionIndex !== -1) {
          const tableIndex = state.sections[sectionIndex].tables.findIndex(
            (t) => t.id === action.payload.id
          );
          if (tableIndex !== -1) {
            state.sections[sectionIndex].tables[tableIndex] = action.payload;
          }
        }
      });
  },
});

export const { setSelectedSection } = sectionSlice.actions;
export default sectionSlice.reducer;
