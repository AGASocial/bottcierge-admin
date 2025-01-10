import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Menu from './pages/Menu';
import Tables from './pages/Tables';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Payment from './pages/Payment';
import Receipt from './pages/Receipt';
import ProductDetails from './pages/ProductDetails';
import Servers from './pages/Servers';
import BusinessInfo from './pages/BusinessInfo';
import OperatingHours from './pages/OperatingHours';
import TableManagement from './pages/TableManagement';
import AddTable from './pages/AddTable';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { getCurrentUser } from './store/slices/authSlice';
import { setRandomVenue } from './store/slices/venueSlice';
import type { AppDispatch } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(getCurrentUser());
    }
    // Initialize venue with mock data
    dispatch(setRandomVenue('default'));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-purple-900 text-white">
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
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
  );
}

export default App;
