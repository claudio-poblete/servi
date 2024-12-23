import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import AuthContextModule from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ servicio, onEdit }) => {
  const { user } = AuthContextModule.useAuth();
  const navigate = useNavigate();
  const {
    id_usuario,
    ubicacion = "Ubicación no especificada",
    titulo = "Título no disponible",
    presupuesto = null,
  } = servicio;

  const isOwner = user?.id === id_usuario;

  const handleOffer = () => {
    navigate(`/ofertar/${servicio.id}`);
  };

  return (
    <div className="service-card">
      <div className="service-card-main">
        <div className="ubicacion-card">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{ubicacion}</p>
        </div>
        <div className="titulo-service">
          <h4>{titulo}</h4>
          <p>
            CLP {presupuesto ? presupuesto.toLocaleString("es-CL") : "No disponible"}
          </p>
        </div>
      </div>
      {isOwner ? (
        <button
          className="btn-primary"
          onClick={() => onEdit(servicio)}
          aria-label={`Editar servicio: ${titulo}`}
        >
          Editar
        </button>
      ) : (
        <button
          className="btn-primary"
          onClick={handleOffer}
          aria-label={`Enviar oferta para: ${titulo}`}
        >
          Enviar Oferta
        </button>
      )}
    </div>
  );
};

ServiceCard.propTypes = {
  servicio: PropTypes.shape({
    id_usuario: PropTypes.number.isRequired,
    ubicacion: PropTypes.string,
    titulo: PropTypes.string,
    presupuesto: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func,
};

ServiceCard.defaultProps = {
  onEdit: () => {}, // Callback vacío para evitar errores si no se pasa
};

export default ServiceCard;
