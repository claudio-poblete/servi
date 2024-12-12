import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
import PropTypes from 'prop-types';

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
    if (!authToken) {
      console.error('No se ha establecido un token de autenticación');
      return;
    }
    try {
      const tokenParts = authToken.split('.');
      const payload = tokenParts[1];
      const decodedPayload = JSON.parse(atob(payload));
      const userId = decodedPayload.id;
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
      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          localStorage.setItem('authToken', token);
          console.log('Token guardado:', token);
          setAuthToken(token);
          fetchUserData();
        } else {
          console.error('No se recibió un token de acceso');
          return false;
        }
      } else {
        console.error('Error al hacer login:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error al hacer login:', error.message);
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

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContextModule;