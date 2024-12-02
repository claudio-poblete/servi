import PropTypes from "prop-types"; // Importar PropTypes
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OfferCard = ({ oferta, usuario, servicio }) => {
  return (
    <div className="offer-card">
      <div className="offer-card-title-container">
        <div className="infopersonal-offercard">
          <img
            src={usuario.fotoPerfil || "foto de perfil generica"}
            alt={`Foto de perfil de ${usuario.nombre}`}
          />
          <div>
            <div className="nombre-valoracion-ofercard">
              <h5>
                <Link to={`/perfil/${usuario.id}`}>{usuario.nombre}</Link>
              </h5>
              <span>
                {usuario.valoracion}{" "}
                <FontAwesomeIcon className="star-ref" icon={faStar} />
              </span>
            </div>
          </div>
        </div>
        <h4 className="oferta-servi">
          CLP ${oferta.oferta.toLocaleString("es-CL")}
        </h4>
      </div>
      <div className="offer-card-detail-container">
        <div className="ubicacion-card">
          <FontAwesomeIcon icon={faLocationDot} />
          <p>{servicio.ubicacion}</p>
        </div>
        <h4>{servicio.titulo}</h4>
        <h5>CLP ${oferta.oferta.toLocaleString("es-CL")}</h5>
      </div>
      <button className="btn-primary">Aceptar Oferta</button>
    </div>
  );
};

// Validación de props con PropTypes
OfferCard.propTypes = {
  oferta: PropTypes.shape({
    oferta: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  usuario: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nombre: PropTypes.string.isRequired,
    fotoPerfil: PropTypes.string,
    valoracion: PropTypes.number.isRequired,
  }).isRequired,
  servicio: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    ubicacion: PropTypes.string.isRequired,
  }).isRequired,
};

export default OfferCard;
