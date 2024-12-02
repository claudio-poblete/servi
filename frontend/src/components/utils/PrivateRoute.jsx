import { Navigate } from 'react-router-dom';
import AuthContextModule from '../../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    // Si no hay usuario, redirige al login
    return <Navigate to="/login" />;
  }

  return element; // Si el usuario está autenticado, muestra el componente
};

export default PrivateRoute;