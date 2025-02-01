import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Menu from "./pages/Menu";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import Orders from "./pages/OrdersHistory";
import Payment from "./pages/Payment";
import Receipt from "./pages/Receipt";
import ProductDetails from "./pages/ProductDetails";
import Servers from "./pages/Servers";
import BusinessInfo from "./pages/BusinessInfo";
import OperatingHours from "./pages/OperatingHours";
import TableManagement from "./pages/TableManagement";
import AddTable from "./pages/AddTable";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { getCurrentUser } from "./store/slices/authSlice";
import { setRandomVenue } from "./store/slices/venueSlice";
import { socketService } from "./services/socketService";
import {
  addNewPaidOrders,
  updateOrderStatusSocket,
  fetchOrders,
} from "./store/slices/orderSlice";
import type { AppDispatch } from "./store";
import type { Order, OrderStatus } from "./types";
import ErrorBoundary from "./components/common/ErrorBoundary";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Set up socket connection for authenticated users
    socketService.connect();

    // Subscribe to all orders
    const handleOrders = (orders: Order[]) => {
      // Only handle new PAID orders from socket
      const paidOrders = orders.filter((order) => order.status === "paid");
      if (paidOrders.length > 0) {
        dispatch(addNewPaidOrders(paidOrders));
      }
    };

    // Listen for order status updates
    const handleStatusUpdate = (update: {
      orderId: string;
      status: OrderStatus;
    }) => {
      const completeUpdate = {
        ...update,
        updatedAt: new Date().toISOString(),
      };

      if (completeUpdate.status === "paid") {
        // For PAID status, we add it directly via socket
        dispatch(updateOrderStatusSocket(completeUpdate));
      } else {
        // For other status changes, refresh via API to ensure consistency
        dispatch(fetchOrders());
      }
    };

    socketService.subscribeToAllOrders(handleOrders);
    const cleanup = socketService.onOrderStatusUpdate(handleStatusUpdate);

    return () => {
      cleanup();
      socketService.unsubscribeFromAllOrders();
      socketService.disconnect();
    };

    // Initialize venue with mock data
    dispatch(setRandomVenue("default"));
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-deep-blue text-white">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="login" element={<Navigate to="/auth" replace />} />
            <Route path="menu" element={<Menu />} />
            <Route path="menu/:productId" element={<ProductDetails />} />
            <Route path="tables" element={<Tables />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/business-info" element={<BusinessInfo />} />
            <Route path="profile/hours" element={<OperatingHours />} />
            <Route path="profile/tables" element={<TableManagement />} />
            <Route path="profile/tables/add" element={<AddTable />} />
            <Route path="profile/tables/edit/:tableId" element={<AddTable />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payment" element={<Payment />} />
            <Route path="receipt" element={<Receipt />} />
            <Route path="servers" element={<Servers />} />
          </Route>
        </Routes>
      </div>
    </ErrorBoundary>
  );
}

export default App;
