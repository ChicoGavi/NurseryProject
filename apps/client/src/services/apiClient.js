// src/services/apiClient.js
const BASE_URL =
  import.meta.env?.VITE_BACKEND_URL || 'http://localhost:4000/api';

/**
 * Wrapper de fetch que inyecta automáticamente el JWT
 */
export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('authToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Si existe el token, agregamos el estándar Bearer
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Si el token expiró (código 401), podemos limpiar sesión
  if (response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    window.location.href = '/'; // Forzar salida
    throw new Error('Sesión expirada. Inicia sesión nuevamente.');
  }

  return response.json();
}
