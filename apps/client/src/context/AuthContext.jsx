// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const savedToken = localStorage.getItem('authToken');
    return savedToken && savedToken !== 'undefined' ? savedToken : null;
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('authUser');
      if (!savedUser || savedUser === 'undefined') return null;
      return JSON.parse(savedUser);
    } catch (error) {
      console.warn('Error al parsear authUser de localStorage:', error);
      localStorage.removeItem('authUser');
      return null;
    }
  });

  const login = (newToken, userData) => {
    setToken(newToken);
    setUser(userData ?? null);

    if (newToken) {
      localStorage.setItem('authToken', newToken);
    } else {
      localStorage.removeItem('authToken');
    }

    if (userData) {
      localStorage.setItem('authUser', JSON.stringify(userData));
    } else {
      localStorage.removeItem('authUser');
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  };

  const isAuthenticated = Boolean(token);

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
}
