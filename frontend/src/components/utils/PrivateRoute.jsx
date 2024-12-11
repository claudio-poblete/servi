import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import AuthContextModule from "../../context/AuthContext";

const PrivateRoute = ({ element }) => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

PrivateRoute.propTypes = {
  element: PropTypes.node.isRequired,
};

export default PrivateRoute;
