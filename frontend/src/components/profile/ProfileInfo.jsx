import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AuthContextModule from "../../context/AuthContext";
import defaultProfileImage from "../../assets/image/usuarios/claudio-poblete.jpg";
import PropTypes from "prop-types";

const ProfileInfo = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <h2>Cargando datos del usuario...</h2>;
  }

  // Manejo de datos con valores por defecto
  const fotoPerfil = user.fotoPerfil || defaultProfileImage;
  const nombre = user.nombre || "Usuario anónimo";
  const descripcion = user.descripcion || "Sin descripción disponible";
  const valoracion = user.valoracion !== undefined ? user.valoracion : "N/A";
  const serviciosCompletados =
    user.serviciosCompletados !== undefined ? user.serviciosCompletados : 0;
  const solicitudesServicios =
    user.solicitudesServicios !== undefined ? user.solicitudesServicios : 0;

  return (
    <section className="perfil-hero">
      <div className="perfil-img">
        <img
          className="img-perfil"
          src={fotoPerfil}
          alt={`Foto del perfil de ${nombre}`}
        />
        <span className="verificado">
          <FontAwesomeIcon
            icon={faCheckCircle}
            style={{ color: user.isVerified ? "#007aff" : "gray" }}
          />
          {user.isVerified ? " Servi Verificado " : " No Verificado "}
        </span>
      </div>
      <div className="perfil-main">
        <div className="perfil-info">
          <h2>{nombre}</h2>
          <span>
            {valoracion}
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
          </span>
        </div>
        <p className="descripcion">{descripcion}</p>
        <div className="perfil-footer">
          <p>{`${serviciosCompletados} Servicios Completados`}</p>
          <p>{`${solicitudesServicios} Solicitudes disponibles`}</p>
        </div>
      </div>
    </section>
  );
};

ProfileInfo.propTypes = {
  user: PropTypes.shape({
    fotoPerfil: PropTypes.string,
    nombre: PropTypes.string,
    descripcion: PropTypes.string,
    valoracion: PropTypes.number,
    isVerified: PropTypes.bool,
    serviciosCompletados: PropTypes.number,
    solicitudesServicios: PropTypes.number,
  }),
};


export default ProfileInfo;
