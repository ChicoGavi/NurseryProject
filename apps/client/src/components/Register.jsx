import React, { useState } from 'react';
import { registerUser } from '../services/auth.service';

export default function RegisterForm() {
  // 1. Estado para los valores de los inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  // 2. Estados de control de la petición HTTP
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: null, text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Si había un error en pantalla y el usuario edita, limpiamos la alerta
    if (statusMessage.text) setStatusMessage({ type: null, text: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage({ type: null, text: '' });

    try {
      // Invocamos nuestro servicio modular
      const res = await registerUser(formData);

      setStatusMessage({
        type: 'success',
        text: res.message || 'Registro exitoso. ¡Bienvenido!',
      });

      // Limpiamos los campos
      setFormData({ fullName: '', email: '', password: '' });
    } catch (err) {
      // Atrapamos el error que disparó nuestro servicio
      setStatusMessage({
        type: 'error',
        text: err.message,
      });
    } finally {
      // Se ejecuta tanto en éxito como en fallo para reactivar el botón
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Crear cuenta
          </h2>
        </div>

        {/* Notificaciones dinámicas de error o éxito */}
        {statusMessage.text && (
          <div
            className={`rounded-md p-3 text-sm font-medium border ${
              statusMessage.type === 'error'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-green-50 text-green-700 border-green-200'
            }`}
          >
            {statusMessage.text}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre completo
            </label>
            <input
              name="fullName"
              type="text"
              required
              disabled={isLoading}
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Juan Pérez"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              name="email"
              type="email"
              required
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              name="password"
              type="password"
              required
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? 'Enviando al servidor...' : 'Registrarme'}
          </button>
        </form>
      </div>
    </div>
  );
}
