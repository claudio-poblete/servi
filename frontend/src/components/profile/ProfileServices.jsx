import { useEffect, useState } from "react";
import ServiceCard from "../cards/ServiceCard";
import AuthContextModule from "../../context/AuthContext";
import api from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfileServices = () => {
  const { user } = AuthContextModule.useAuth();
  const [serviciosUsuario, setServiciosUsuario] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserServices();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchUserServices = async () => {
    try {
      const response = await api.get(`/servicios/mis-servicios/${user.id}`);
      setServiciosUsuario(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener los servicios:", err);
      setError("Error al obtener los servicios.");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando servicios...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

