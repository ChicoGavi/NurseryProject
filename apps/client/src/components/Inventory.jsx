import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory'; // Ajusta la ruta si es necesario
import PlantCard from './PlantCard'; // Ajusta la ruta si es necesario
import { useAuth } from '../context/AuthContext'; // Necesitamos el token para borrar
import EditPlantModal from './EditPlantModal'; // 👇 Importamos el Modal

export default function Inventory() {
  const { items, loading, error, deletePlant, updatePlant } = useInventory();
  const { token } = useAuth(); // Extraemos el token para autorizar el borrado

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [plantToEdit, setPlantToEdit] = useState(null);

  // ==========================================
  // LÓGICA PARA ELIMINAR
  // ==========================================
  const handleDelete = async (plantId) => {
    const confirmar = window.confirm(
      '¿Estás seguro de que deseas eliminar esta planta?'
    );
    if (!confirmar) return;

    try {
      // Llamamos a la función limpia del hook
      await deletePlant(plantId);
      alert('Planta eliminada correctamente');
    } catch (error) {
      alert('Hubo un problema al intentar eliminar la planta.');
    }
  };

  // ==========================================
  // LÓGICA PARA EDITAR
  // ==========================================
  const handleEditClick = (plant) => {
    setPlantToEdit(plant);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (plantId, updatedData) => {
    try {
      await updatePlant(plantId, updatedData);
      alert('Planta actualizada correctamente');
      setIsEditModalOpen(false); // Cerramos el modal tras guardar
      setPlantToEdit(null);
    } catch (error) {
      alert('Hubo un error al actualizar la planta.');
    }
  };

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
      {isEditModalOpen && (
        <EditPlantModal
          plant={plantToEdit}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}

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
          {items.map((plant) => (
            <PlantCard
              key={plant.id}
              plant={plant}
              // 👇 AQUÍ CONECTAMOS TODO: Le pasamos las funciones a la tarjeta
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}
