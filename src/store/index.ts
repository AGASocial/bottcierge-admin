import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import orderReducer from './slices/orderSlice';
import menuReducer from './slices/menuSlice';
import tableReducer from './slices/tableSlice';
import venueReducer from './slices/venueSlice';
import serverReducer from './slices/serverSlice';
import sectionReducer from './slices/sectionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    order: orderReducer,
    menu: menuReducer,
    table: tableReducer,
    venue: venueReducer,
    server: serverReducer,
    sections: sectionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
