import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import AuthContextModule from "../../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    // Si no hay usuario, redirige al login :)
    return <Navigate to="/login" replace />;
  }

  return element; // Si el usuario está logueao muestra el componente
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
