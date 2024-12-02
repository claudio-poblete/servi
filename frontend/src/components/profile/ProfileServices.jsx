import { mockData } from "../../data/mockData";
import ServiceCard from "../cards/ServiceCard";
import AuthContextModule from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfileServices = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <h4>Cargando servicios...</h4>;
  }

  // Filtrar los servicios creados por el usuario actual
  const serviciosUsuario =
    mockData.servicios?.filter((servicio) => servicio.idUsuario === user.id) ||
    [];

  return (
    <section className="services-section">
      <div className="services-title-container">
        <h4 className="heading-servicios">Mis Servicios Publicados</h4>
        <Link to="/mis-servicios" className="btn-terciary">
          Ver todos <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="services-card-container">
        {serviciosUsuario.length > 0 ? (
          serviciosUsuario.map((servicio) => (
            <ServiceCard key={servicio.id} servicio={servicio} />
          ))
        ) : (
          <h4>No tienes servicios publicados</h4>
        )}
      </div>
    </section>
  );
};

export default ProfileServices;
