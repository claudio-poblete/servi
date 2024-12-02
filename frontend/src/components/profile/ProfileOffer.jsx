import OfferCard from "../cards/OfferCard";
import { mockData } from "../../data/mockData";
import AuthContextModule from "../../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProfileOffer = () => {
  const { user } = AuthContextModule.useAuth();

  if (!user) {
    return <h4>Cargando ofertas...</h4>;
  }

  const publicacionesUsuario =
    mockData.servicios?.filter(
      (servicio) => servicio.idUsuario === user.id
    ) || [];

  const ofertasUsuario =
    mockData.ofertas?.filter((oferta) =>
      publicacionesUsuario.some(
        (publicacion) => publicacion.id === oferta.idServicio
      )
    ) || [];

  return (
    <section className="ofertas-solicitudes">
      <div className="ofertas-title-container">
        <h4 className="heading-ofertas">Ofertas a mis solicitudes</h4>
        <Link to="/services" className="btn-terciary">
          Ver todas <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
      <div className="ofertas-container">
        {ofertasUsuario.length > 0 ? (
          ofertasUsuario.map((oferta) => {
            const usuarioOferta = mockData.usuarios.find(
              (u) => u.id === oferta.idUsuario
            );
            const publicacionOferta = mockData.servicios.find(
              (servicio) => servicio.id === oferta.idServicio
            );

            // Validar que usuarioOferta y publicacionOferta existan
            if (!usuarioOferta || !publicacionOferta) {
              return null;
            }

            return (
              <OfferCard
                key={oferta.id}
                oferta={oferta}
                usuario={usuarioOferta}
                servicio={publicacionOferta}
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
