import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const OfferCard = ({ oferta, servicio, usuario }) => {
  return (
    <div className="offer-card">
      <div className="offer-card-title-container">
        <div className="infopersonal-offercard">
          <img
            src={oferta.fotoPerfil || "/default-profile.png"}
            alt={`Foto de perfil del usuario que realizó la oferta`}
          />
          <div>
            <div className="nombre-valoracion-ofercard">
              <h5>
                <Link to={`/perfil/${usuario.id_usuario}`}>
                  {usuario.nombre_usuario || "Usuario desconocido"}
                </Link>
              </h5>
              <span>
                {usuario.valoracion || "Sin valoración"}{" "}
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
          <p>{servicio.ubicacion || "Ubicación no especificada"}</p>
        </div>
        <h4>{servicio.titulo || "Título no disponible"}</h4>
        <h5>CLP ${oferta.oferta.toLocaleString("es-CL")}</h5>
      </div>
      <button className="btn-primary">Aceptar Oferta</button>
    </div>
  );
};

OfferCard.propTypes = {
  oferta: PropTypes.shape({
    id_oferta: PropTypes.number.isRequired,
    id_usuario: PropTypes.number.isRequired,
    nombre_usuario: PropTypes.string,
    fotoPerfil: PropTypes.string,
    valoracion: PropTypes.number,
    oferta: PropTypes.number.isRequired,
  }).isRequired,
  servicio: PropTypes.shape({
    id_servicio: PropTypes.number.isRequired,
    titulo: PropTypes.string.isRequired,
    ubicacion: PropTypes.string.isRequired,
  }).isRequired,
  usuario: PropTypes.shape({
    id_usuario: PropTypes.number.isRequired,
    nombre_usuario: PropTypes.string,
    valoracion: PropTypes.number,
  }).isRequired,
};

export default OfferCard;


