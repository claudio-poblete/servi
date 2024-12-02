import ButtonLink from "../buttons/ButtonLink";

const BannerServiGallery = () => {
  return (
    <div className="banner-register">
      <h1>Sé un Servi, y da una mano. </h1>
      <ButtonLink to="/galeria" className="btn-secondary">
        Ver en qué ayudar
      </ButtonLink>
    </div>
  );
};

export default BannerServiGallery;
