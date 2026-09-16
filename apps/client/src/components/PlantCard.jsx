import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function PlantCard({ plant, onEdit, onDelete }) {
  const isLowStock = plant.stock <= 5;

  // Obtenemos el usuario del contexto para verificar si es admin
  const { user } = useAuth();

  const isAdmin = user?.role.name === 'ADMIN';

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      {/* Contenedor de Imagen */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={plant.image_url || 'https://placehold.co/400x400?text=Planta'}
          alt={plant.common_name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-800 shadow-sm backdrop-blur-sm">
          {plant.category?.name || plant.category || 'General'}
        </span>
      </div>

      {/* Contenido de la Card */}
      <div className="flex flex-1 flex-col p-4">
        {/* Título y Precio */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <h2
            className="text-base font-semibold text-slate-900 line-clamp-1"
            title={plant.common_name}
          >
            {plant.common_name || 'Anónimo'}
          </h2>
          <span className="text-base font-bold text-emerald-600">
            ${Number(plant.price).toLocaleString('es-CO')}
          </span>
        </div>

        {/* Nombre científico / Descripción */}
        <p className="mb-3 text-sm text-slate-500 line-clamp-2">
          {plant.scientific_name}
        </p>

        {/* Indicador de Stock */}
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

        {/* Footer de la Card: Creador + Botones de Acción */}
        <div className="mt-auto flex items-end justify-between border-t border-slate-100 pt-4 pb-1">
          {/* Creador (Se adapta si el nombre es largo) */}
          <div className="text-xs text-slate-400">
            Registrado por:
            <br />
            <span className="font-medium text-slate-600 line-clamp-1">
              {plant.creator?.full_name || plant.created_by || 'Sistema'}
            </span>
          </div>

          {/* 🛡️ ZONA PROTEGIDA: Botones alineados a la derecha */}
          {isAdmin && (
            <div className="flex shrink-0 gap-2 ml-2">
              <button
                onClick={() => onEdit && onEdit(plant)}
                className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors duration-200 hover:bg-blue-100 hover:text-blue-900 active:bg-blue-200"
                aria-label="Editar planta"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete && onDelete(plant.id)}
                className="rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors duration-200 hover:bg-red-100 hover:text-red-900 active:bg-red-200"
                aria-label="Eliminar planta"
              >
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
