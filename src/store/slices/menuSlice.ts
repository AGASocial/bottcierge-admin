import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';
import type { Product, MenuCategory } from '../../types';

interface MenuState {
  products: Product[];
  categories: MenuCategory[];
  loading: boolean;
  error: string | null;
  selectedProduct: Product | null;
}

const initialState: MenuState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  selectedProduct: null,
};

export const getCategories = createAsyncThunk(
  'menu/getCategories',
  async () => {
    const response = await api.get('/menu/categories');
    return response.data.data;
  }
);

export const getProducts = createAsyncThunk(
  'menu/getProducts',
  async () => {
    const response = await api.get('/menu/products');
    return response.data.data;
  }
);

export const updateProduct = createAsyncThunk(
  'menu/updateProduct',
  async ({ id, data }: { id: string; data: Partial<Product> }) => {
    const response = await api.put(`/menu/product/${id}`, data);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  'menu/createProduct',
  async (data: Omit<Product, 'id'>) => {
    const response = await api.post('/menu/products', data);
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'menu/deleteProduct',
  async (id: string) => {
    await api.delete(`/menu/product/${id}`);
    return id;
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Get Categories
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
      });

    // Get Products
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });

    // Update Product
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });

    // Create Product
    builder
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      });

    // Delete Product
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(p => p.id !== action.payload);
      });
  },
});

export const { clearError, setSelectedProduct } = menuSlice.actions;
export default menuSlice.reducer;
