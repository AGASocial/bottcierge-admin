import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import menuReducer from './slices/menuSlice';
import tableReducer from './slices/tableSlice';
import venueReducer from './slices/venueSlice';
import sectionReducer from './slices/sectionSlice';
import staffReducer from './slices/staffSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    menu: menuReducer,
    table: tableReducer,
    venue: venueReducer,
    sections: sectionReducer,
    staff: staffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
