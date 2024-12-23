import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import imagenPerfil from "../../assets/image/usuarios/claudio-poblete.jpg";

const OfferCard = ({ oferta, servicio, usuario, onAccept, onDelete, isOwner }) => {
  return (
    <div className="offer-card">
      <div className="offer-card-title-container">
        <div className="infopersonal-offercard">
          <img
            src={usuario.fotoPerfil || imagenPerfil}
            alt={`Foto de perfil de ${usuario.nombre_usuario || "usuario desconocido"}`}
            className="profile-image"
          />
          <div>
            <div className="nombre-valoracion-ofercard">
              <h5>
                <p>{usuario.nombre_usuario || "Usuario desconocido"}</p>
              </h5>
              <span>
                {usuario.valoracion !== undefined ? usuario.valoracion : "Sin valoración"}{" "}
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
      <div className="offer-card-actions">
        {isOwner ? (
          <button
            className="btn-danger"
            onClick={() => onDelete(oferta.id_oferta)}
            aria-label={`Eliminar oferta de ${oferta.oferta}`}
          >
            Eliminar Oferta
          </button>
        ) : (
          <button
            className="btn-success"
            onClick={() => onAccept(oferta.id_oferta)}
            aria-label={`Aceptar oferta por ${oferta.oferta}`}
          >
            Aceptar Oferta
          </button>
        )}
      </div>
    </div>
  );
};

OfferCard.propTypes = {
  oferta: PropTypes.shape({
    id_oferta: PropTypes.number.isRequired,
    oferta: PropTypes.number.isRequired,
  }).isRequired,
  servicio: PropTypes.shape({
    titulo: PropTypes.string,
    ubicacion: PropTypes.string,
  }).isRequired,
  usuario: PropTypes.shape({
    id_usuario: PropTypes.number.isRequired,
    nombre_usuario: PropTypes.string,
    fotoPerfil: PropTypes.string,
    valoracion: PropTypes.number,
  }).isRequired,
  onAccept: PropTypes.func,
  onDelete: PropTypes.func,
  isOwner: PropTypes.bool.isRequired,
};

OfferCard.defaultProps = {
  onAccept: () => {},
  onDelete: () => {},
};

export default OfferCard;
