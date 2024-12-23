import { useEffect, useState } from "react";
import OfferCard from "../cards/OfferCard";
import AuthContextModule from "../../context/AuthContext";
import api from "../../api";

const ProfileOffer = () => {
  const { user } = AuthContextModule.useAuth();
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await api.get(`/ofertas/recibidas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOfertas(response.data);
      } catch (err) {
        console.error("Error al cargar las ofertas recibidas:", err);
        setError("Hubo un problema al cargar las ofertas. Inténtalo nuevamente.");
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
        <h4>Error al cargar ofertas</h4>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="ofertas-solicitudes">
      <h4 className="heading-servicios">Ofertas Recibidas</h4>
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
                fotoPerfil: oferta.foto_perfil_usuario,
              }}
              onAccept={() => {}}
            />
          ))
        ) : (
          <h4>No hay ofertas recibidas</h4>
        )}
      </div>
    </section>
  );
};

export default ProfileOffer;
