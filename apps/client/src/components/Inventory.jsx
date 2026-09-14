// src/components/Inventory.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Inventory() {
  const { token, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        // Ajusta la URL según la ruta de tu API backend
        const response = await fetch('http://localhost:8080/api/plants', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          logout();
          throw new Error('Sesión expirada o no autorizada');
        }

        if (!response.ok) {
          throw new Error('Error al cargar los datos del inventario');
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [token, logout]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"></div>
        <span className="ml-3 text-sm font-medium text-slate-600">
          Cargando inventario...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header del inventario */}
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Inventario de Plantas
          </h1>
          <p className="text-sm text-slate-500">
            Gestión de existencias y catálogo actual
          </p>
        </div>
        <span className="inline-flex w-fit items-center rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          Total: {items.length} productos
        </span>
      </div>

      {/* Grid de Cards */}
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 py-12 text-center text-sm text-slate-500">
          No hay plantas registradas en este momento.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((plant) => {
            const isLowStock = plant.stock <= 5;

            return (
              <article
                key={plant.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Contenedor de Imagen */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={
                      plant.image || 'https://placehold.co/400x400?text=Planta'
                    }
                    alt={plant.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Badge de Categoría */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm">
                    {plant.category?.name || plant.category || 'General'}
                  </span>
                </div>

                {/* Contenido de la Card */}
                <div className="flex flex-1 flex-col p-4">
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h2
                      className="text-base font-semibold text-slate-900 line-clamp-1"
                      title={plant.name}
                    >
                      {plant.name}
                    </h2>
                    <span className="text-base font-bold text-emerald-600">
                      ${Number(plant.price).toLocaleString('es-CO')}
                    </span>
                  </div>

                  {/* Stock */}
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        plant.stock === 0
                          ? 'bg-red-500'
                          : isLowStock
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                      }`}
                    />
                    <span className="text-xs text-slate-600">
                      Stock:{' '}
                      <strong
                        className={
                          plant.stock === 0
                            ? 'text-red-600'
                            : isLowStock
                              ? 'text-amber-600'
                              : 'text-slate-900'
                        }
                      >
                        {plant.stock} uds.
                      </strong>
                    </span>
                  </div>

                  {/* Creado por (Footer de la Card) */}
                  <div className="mt-auto border-t border-slate-100 pt-3 text-xs text-slate-400">
                    Registrado por:{' '}
                    <span className="font-medium text-slate-600">
                      {plant.created_by?.name || plant.created_by || 'Sistema'}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
