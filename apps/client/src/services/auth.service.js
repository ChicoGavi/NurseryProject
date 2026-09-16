const BASE_URL =
  import.meta.env?.VITE_BACKEND_URL || 'http://localhost:8080/api';

export const registerUser = async (newUser) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ocurrió un error en el servidor');
    }

    return data;
  } catch (error) {
    throw new Error('No se pudo establecer conexión con el servidor', {
      cause: error,
    });
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ocurrió un error en el servidor');
    }

    return data;
  } catch (error) {
    throw new Error(
      error.message || 'No se pudo establecer conexión con el servidor',
      {
        cause: error,
      }
    );
  }
};
