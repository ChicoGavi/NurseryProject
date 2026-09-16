import React, { useState, useEffect } from 'react';

export default function EditPlantModal({ plant, onClose, onSave }) {
  // Estado local para manejar lo que el usuario escribe en el formulario
  const [formData, setFormData] = useState({
    common_name: '',
    scientific_name: '',
    price: '',
    stock: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  // Cuando el modal se abre, llenamos el formulario con los datos de la planta
  useEffect(() => {
    if (plant) {
      setFormData({
        common_name: plant.common_name || '',
        scientific_name: plant.scientific_name || '',
        price: plant.price || '',
        stock: plant.stock || '',
      });
    }
  }, [plant]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Convertimos a números los campos que lo requieran antes de enviarlos
    const dataToSend = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    // Llamamos a la función que nos pasará el componente padre (Inventory)
    await onSave(plant.id, dataToSend);
    setIsSaving(false);
  };

  // Si no hay planta seleccionada, no renderizamos nada
  if (!plant) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Editar Planta</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nombre Común
            </label>
            <input
              type="text"
              name="common_name"
              required
              value={formData.common_name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Nombre Científico
            </label>
            <input
              type="text"
              name="scientific_name"
              value={formData.scientific_name}
              onChange={handleChange}
              className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Precio ($)
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium text-slate-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-300 p-2 text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Botones del Modal */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
              disabled={isSaving}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
