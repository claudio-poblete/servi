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

        // Filtrar solo las ofertas inactivas
        const ofertasInactivas = response.data.data.filter(
          (oferta) => oferta.estado_oferta === false
        );
        setOfertas(ofertasInactivas);
      } catch (err) {
        console.error("Error al cargar los datos:", err);
        setError("Hubo un problema al cargar las ofertas. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleAcceptOffer = async (idOferta) => {
    try {
      console.log(`Aceptando oferta con ID: ${idOferta}`);
      const response = await api.post(`/ofertas/${idOferta}/aceptar`);
      console.log("Oferta aceptada:", response.data);

      // Actualizar el estado para reflejar cambios
      setOfertas((prev) => prev.filter((oferta) => oferta.id_oferta !== idOferta));
    } catch (err) {
      console.error("Error al aceptar la oferta:", err);
      setError("No se pudo aceptar la oferta. Inténtalo nuevamente.");
    }
  };

  if (loading) {
    return <h4>Cargando ofertas...</h4>;
  }

  if (error) {
    return (
      <div className="error-container">
        <h4>Error al cargar ofertas</h4>
        <p>{error}</p>
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
          ofertas.map((oferta) => (
            <OfferCard
              key={oferta.id_oferta}
              oferta={oferta}
              servicio={{
                titulo: oferta.titulo_servicio,
                ubicacion: oferta.ubicacion_servicio,
              }}
              usuario={{
                id_usuario: oferta.id_usuario,
                nombre_usuario: oferta.nombre_usuario,
                fotoPerfil: oferta.fotoPerfil,
                valoracion: oferta.valoracion,
              }}
              onAccept={handleAcceptOffer}
            />
          ))
        ) : (
          <h4>No existen ofertas disponibles para tus publicaciones</h4>
        )}
      </div>
    </section>
  );
};

export default ProfileOffer;
