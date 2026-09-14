import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginForm from './components/Login.jsx';
import RegisterForm from './components/Register.jsx';
import InventoryForm from './components/Inventory.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/inventory" element={<InventoryForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
