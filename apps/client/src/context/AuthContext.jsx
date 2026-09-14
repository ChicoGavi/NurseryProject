// src/context/AuthContext.jsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
  TOKEN: 'authToken',
  USER: 'authUser',
};

// Helper interno seguro para leer de localStorage
const getStoredItem = (key, isJson = false) => {
  try {
    const item = localStorage.getItem(key);
    if (!item || item === 'undefined' || item === 'null') return null;
    return isJson ? JSON.parse(item) : item;
  } catch (error) {
    console.warn(`Error al leer ${key} de localStorage:`, error);
    localStorage.removeItem(key);
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredItem(STORAGE_KEYS.TOKEN));
  const [user, setUser] = useState(() =>
    getStoredItem(STORAGE_KEYS.USER, true)
  );
  const [isLoading, setIsLoading] = useState(false);

  // Sincronizar cambios entre pestañas del navegador (ej. logout en otra pestaña)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === STORAGE_KEYS.TOKEN) {
        setToken(
          event.newValue && event.newValue !== 'undefined'
            ? event.newValue
            : null
        );
      }
      if (event.key === STORAGE_KEYS.USER) {
        setUser(getStoredItem(STORAGE_KEYS.USER, true));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const login = useCallback((newToken, userData) => {
    if (!newToken) {
      console.warn('Se intentó iniciar sesión sin un token válido');
      return;
    }

    setToken(newToken);
    setUser(userData ?? null);

    localStorage.setItem(STORAGE_KEYS.TOKEN, newToken);
    if (userData) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }, []);

  // Memoizar el valor del contexto para evitar renders innecesarios en toda la app
  const contextValue = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout,
    }),
    [token, user, isLoading, login, logout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
