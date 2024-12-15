import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import AuthContextModule from "../../context/AuthContext";
import imagenPerfil from '../../assets/image/usuarios/claudio-poblete.jpg';


const ProfileInfo = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <h2>Cargando datos del usuario</h2>;
  }

  return (
    <section className="perfil-hero">
      <div className="perfil-img">
        <img
          className="img-perfil"
          src={user.fotoPerfil || imagenPerfil}
          alt={`Foto del perfil de ${user.nombre}`}
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
          <h2>{user.nombre || "Usuario anónimo"}</h2>
          <span>
            {user.valoracion !== undefined ? user.valoracion : "N/A"}
            <FontAwesomeIcon icon={faStar} style={{ color: "gold" }} />
          </span>
        </div>
        <p className="descripcion">{user.descripcion || "Sin descripción disponible"}</p>
        <div className="perfil-footer">
          <p>
            {user.serviciosCompletados !== undefined
              ? `${user.serviciosCompletados} Servicios Completados`
              : "0 Servicios Completados"}
          </p>
          <p>
            {user.solicitudesServicios !== undefined
              ? `${user.solicitudesServicios} Solicitudes disponibles`
              : "0 Solicitudes disponibles"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProfileInfo;
