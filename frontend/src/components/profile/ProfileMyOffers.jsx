import { useEffect, useState } from "react";
import api from "../../api";
import OfferCard from "../cards/OfferCard";

const ProfileMyOffers = () => {
  const [myOffers, setMyOffers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyOffers = async () => {
      try {
        const response = await api.get("/ofertas/mis-ofertas");
        setMyOffers(response.data);
      } catch (err) {
        console.error("Error al cargar tus ofertas:", err);
        setError("No se pudieron cargar tus ofertas.");
      }
    };

    fetchMyOffers();
  }, []);

  const handleDeleteOffer = async (id_oferta) => {
    try {
      await api.delete(`/ofertas/${id_oferta}`);
      setMyOffers((prev) =>
        prev.filter((oferta) => oferta.id_oferta !== id_oferta)
      );
    } catch (err) {
      console.error("Error al eliminar la oferta:", err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="ofertas-solicitudes">
      <h4 className="heading-servicios">Ofertas Realizadas</h4>
      <div className="ofertas-container">
        {myOffers.length > 0 ? (
          myOffers.map((oferta) => (
            <OfferCard
              key={oferta.id_oferta}
              oferta={oferta}
              servicio={oferta.servicio}
              usuario={oferta.usuario}
              onDelete={() => handleDeleteOffer(oferta.id_oferta)}
            />
          ))
        ) : (
          <p>No has realizado ofertas.</p>
        )}
      </div>
    </section>
  );
};

export default ProfileMyOffers;
