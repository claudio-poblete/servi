import ButtonLink from "../buttons/ButtonLink";

const BannerServiGallery = () => {
  return (
    <div className="banner-register">
      <h1>Sé un Servi, y da una mano. </h1>
      <ButtonLink to="/galeria" className="btn-secondary-gallery">
        Dar una mano
      </ButtonLink>
    </div>
  );
};

export default BannerServiGallery;
