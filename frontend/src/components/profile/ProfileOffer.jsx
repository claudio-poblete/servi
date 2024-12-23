import { useEffect, useState } from "react";
import api from "../../api";
import OfferCard from "../cards/OfferCard";

const ProfileOffer = () => {
  const [ofertas, setOfertas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/ofertas/recibidas");
        setOfertas(response.data);
      } catch (err) {
        console.error("Error al cargar las ofertas recibidas:", err);
        setError("No se pudieron cargar las ofertas recibidas.");
      }
    };

    fetchOffers();
  }, []);

  const handleAcceptOffer = async (id_oferta) => {
    try {
      const response = await api.post(`/ofertas/${id_oferta}/aceptar`);
      console.log("Oferta aceptada:", response.data);
      setOfertas((prev) => prev.filter((oferta) => oferta.id_oferta !== id_oferta));
    } catch (err) {
      console.error("Error al aceptar la oferta:", err);
    }
  };

  if (error) {
    return <div>{error}</div>;
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
              isOwner={false}
              onAccept={handleAcceptOffer}
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
