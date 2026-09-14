// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // 1. Mientras se verifica la sesión, evita redirigir falsamente
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <p>Cargando sesión...</p>
      </div>
    );
  }

  // 2. Si no está autenticado, redirige al login guardando la ruta previa
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Si está autenticado, renderiza la ruta hija solicitada
  return <Outlet />;
}
