import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ servicio, onEdit }) => {
  const { ubicacion = "Ubicación no especificada", titulo = "Título no disponible", presupuesto = null } = servicio;

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
      <button
        className="btn-primary"
        onClick={() => onEdit(servicio)}
        aria-label={`Editar servicio: ${titulo}`}
      >
        Editar
      </button>
    </div>
  );
};

ServiceCard.propTypes = {
  servicio: PropTypes.shape({
    ubicacion: PropTypes.string,
    titulo: PropTypes.string,
    presupuesto: PropTypes.number,
  }).isRequired,
  onEdit: PropTypes.func, // Callback para manejar la edición
};

ServiceCard.defaultProps = {
  onEdit: () => {}, // Callback vacío para evitar errores si no se pasa
};

export default ServiceCard;
