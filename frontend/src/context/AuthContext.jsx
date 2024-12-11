/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
import * as jwtDecode from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  const fetchUserData = async () => {
    try {
      const decodedToken = jwtDecode(authToken);
      const userId = decodedToken.id;
      const response = await api.get(`/usuarios/usuario/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error('Error al obtener los datos del usuario', error);
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('usuarios/login', { email, contrasena: password });
      const { token } = response.data;
      if (token) {
        localStorage.setItem('authToken', token);
        console.log('Token guardado:', token);
        setAuthToken(token);
        fetchUserData();
      }

      return true;
    } catch (error) {
      console.error('Error al hacer login:', error.response?.data?.message || error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

const AuthContextModule = {
  AuthProvider,
  useAuth,
};

export default AuthContextModule;

