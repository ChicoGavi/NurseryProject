import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export function useInventory() {
  const { token, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar el inventario (la que ya tenías)
  const fetchInventory = useCallback(async () => {
    try {
      setLoading(true);
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
      if (!response.ok) throw new Error('Error al cargar los datos');

      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, logout]);

  useEffect(() => {
    if (token) fetchInventory();
  }, [fetchInventory, token]);

  // ==========================================
  // NUEVO: Lógica para eliminar encapsulada aquí
  // ==========================================
  const deletePlant = async (plantId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/plants/${plantId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Error al eliminar la planta');

      // Actualizamos el estado internamente
      setItems((prevItems) =>
        prevItems.filter((plant) => plant.id !== plantId)
      );
      return true; // Retornamos true si fue exitoso
    } catch (error) {
      console.error(error);
      throw error; // Lanzamos el error para que el componente lo maneje (ej. mostrar un alert)
    }
  };

  const updatePlant = async (plantId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/plants/${plantId}`,
        {
          method: 'PUT', // Usa PATCH si tu backend lo requiere así
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error('Error al actualizar la planta');

      // Asumimos que el backend devuelve la planta actualizada.
      // Si no es así, puedes usar updatedData combinada con el ID.
      const updatedPlant = await response.json();

      // Magia de React: Buscamos la planta vieja en la lista y la reemplazamos con la nueva
      setItems((prevItems) =>
        prevItems.map((plant) => (plant.id === plantId ? updatedPlant : plant))
      );

      return true;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Exportamos deletePlant para que Inventory.jsx lo pueda usar
  return { items, loading, error, deletePlant, updatePlant };
}
