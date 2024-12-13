import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ servicio }) => {
  return (
    <div className="service-card">
      <div className="service-card-main">
        <div className="ubicacion-card">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{servicio.ubicacion}</p>
        </div>
        <div className="titulo-service">
          <h4>{servicio.titulo}</h4>
          <p>
            CLP{" "}
            {servicio.presupuesto
              ? servicio.presupuesto.toLocaleString("es-CL")
              : "No disponible"}
          </p>
        </div>
      </div>
      <button className="btn-primary">Editar</button>
    </div>
  );
};

ServiceCard.propTypes = {
  servicio: PropTypes.shape({
    ubicacion: PropTypes.string.isRequired,
    titulo: PropTypes.string.isRequired,
    presupuesto: PropTypes.number,
  }).isRequired,
};

export default ServiceCard;

