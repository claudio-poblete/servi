import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      fetchUserData();
    } else {
      console.log('Esperando el token...');
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
      console.log(response.data)
      setUser (response.data);
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
          setAuthToken(token);
          console.log('Token guardado:', token);
          fetchUserData();
          return true;
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

  const register = async (nombre, email, password) => {
    try {
      const response = await api.post(`${import.meta.env.VITE_API_URL}usuarios/registro`, { nombre, email, contrasena: password });
      if (response.status === 201) {
        console.log('Registro exitoso:', response.data.message);
        return { success: true, message: response.data.message };
      } else {
        console.error('Error al hacer registro:', response.status, response.statusText);
        return { success: false, message: 'Error en el registro' };
      }
    } catch (error) {
      console.error('Error al hacer registro:', error.message);
      return { success: false, message: error.response?.data?.message || 'Error en el registro' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
    navigate('/');
  };

  const value = { user, login, logout, register };

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