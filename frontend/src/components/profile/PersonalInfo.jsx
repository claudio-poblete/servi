import { useEffect } from 'react';
import AuthContextModule from '../../context/AuthContext';

const PersonalInfo = () => {
  const { user, fetchUserData } = AuthContextModule.useAuth();

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, [user, fetchUserData]);

  if (!user) {
    return <h4>Cargando o usuario no disponible...</h4>;
  }

  return (
    <div className='info-content'>
      <p>Nombre:  <strong>{user?.nombre || 'No disponible'}</strong></p>
      <p>Correo electrónico: <strong>{user?.email || 'No disponible'}</strong></p>
      <p>Teléfono: <strong>{user?.informacionPersonal?.telefono || 'No disponible'}</strong></p>
      <p>Dirección: <strong>{user?.informacionPersonal?.direccion || 'No disponible'}</strong></p>
    </div>
  );
};

export default PersonalInfo;
