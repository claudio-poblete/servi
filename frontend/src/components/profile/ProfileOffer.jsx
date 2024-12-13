import { useEffect, useState } from "react";
import OfferCard from "../cards/OfferCard";
import AuthContextModule from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import api from "../../api";

const ProfileOffer = () => {
  const { user } = AuthContextModule.useAuth();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for user:", user.id);
        const response = await api.get(`/ofertas/usuario/${user.id}`);
        console.log("API Response:", response.data);
        const ofertasInactivas = response.data.data.filter(oferta => oferta.estado_oferta === false);
        setOfertas(ofertasInactivas);
      } catch (err) {
        console.error('Error al cargar los datos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  if (loading) {
    return <h4>Cargando ofertas...</h4>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h4>No hay ofertas para tus publicaciones</h4>
        <p>Parece que aún no hay ofertas asociadas a tus servicios. ¡Intenta publicar más servicios para atraer ofertas!</p>
      </div>
    );
  }

  return (
    <section className="ofertas-solicitudes">
      <div className="ofertas-title-container">
        <h4 className="heading-ofertas">Ofertas a mis solicitudes</h4>
        <Link to="/services" className="btn-terciary">
          Ver todas <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="ofertas-container">
        {ofertas.length > 0 ? (
            ofertas.map((oferta) => {
              console.log("Datos de la oferta:", oferta);
              return (
                <OfferCard
                  key={oferta.id_oferta}
                  oferta={oferta}
                  servicio={{
                    titulo: oferta.titulo_servicio,
                    ubicacion: oferta.ubicacion_servicio,
                  }}
                  usuario={{ nombre_usuario: oferta.nombre_usuario }}
                />
              );
            })
        ) : (
          <h4>Aún no existen ofertas para tus publicaciones</h4>
        )}
      </div>
    </section>
  );
};

export default ProfileOffer;


