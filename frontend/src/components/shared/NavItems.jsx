// src/components/shared/NavItems.jsx
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faCog } from "@fortawesome/free-solid-svg-icons";

const GuestNavItems = () => (
  <>
    <li>
      <Link to="/como-funciona">Cómo Funciona</Link>
    </li>
    <li>
      <Link to="/login">Conéctate</Link>
    </li>
    <li>
      <Link to="/register">Regístrate</Link>
    </li>
  </>
);

const UserNavItems = ({ user, onLogout }) => (
  <>
    <li>
      <Link to="/dashboard">¡Hola, {user.nombre}!</Link>
    </li>
    <li>
      <Link to="/" onClick={onLogout}>
        Cerrar Sesión
      </Link>
    </li>
    <li>
      <Link to="/notifications" aria-label="Notificaciones">
        <FontAwesomeIcon icon={faBell} />
      </Link>
    </li>
    <li>
      <Link to="/messages" aria-label="Mensajes">
        <FontAwesomeIcon icon={faEnvelope} />
      </Link>
    </li>
    <li>
      <Link to="/settings" aria-label="Configuración">
        <FontAwesomeIcon icon={faCog} />
      </Link>
    </li>
  </>
);

UserNavItems.propTypes = {
  user: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export { GuestNavItems, UserNavItems };
