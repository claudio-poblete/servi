import ComoFunciona from "../components/shared/ComoFuncionaHero";
import BannerServiGallery from "../components/shared/BannerServiGallery";
import CarruselCategorias from "../components/shared/CarruselCategorias";
import ButtonLink from "../components/buttons/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck, faLifeRing, faStar } from "@fortawesome/free-solid-svg-icons";
import Hero from "../components/shared/Hero";

const Home = () => {
  return (
    <main>
      <Hero
      title="Te damos una Mano"
      subtitle="Si necesitas colgar un cuadro, pasear a tu perro, entrenar tus habilidades en basketball, obtener un ingreso extra, instalar aire acondicionado, o simplemente ser de ayuda"
      ctaLinks={[
        { text: "Pide un Servicio", to: "/post-service", className: "btn-primary" },
        { text: "Sé un Servi", to: "/register", className: "btn-secondary" },
      ]}
      stats={[
        { icon: faLifeRing, text: "Soporte Local", className: "localsupport-icon" },
        { icon: faStar, text: "15.000+ reseñas", value: "4,8", className: "star-ref" },
        { text: "Miles de servicios completados" },
        { icon: faCircleCheck, text: "Servis Verificados", className: "circle-check-icon" },
      ]}
    />
      <section aria-labelledby="como-funciona">
        <ComoFunciona />
        <div className="boton-comofunciona">
          <ButtonLink to="/como-funciona" className="btn-terciary">
            Aprende Más <FontAwesomeIcon icon={faArrowRightLong} />
          </ButtonLink>
        </div>
      </section>
      <section aria-labelledby="servi-gallery">
        <h2 id="servi-gallery" className="visually-hidden">Explora Servicios</h2>
        <BannerServiGallery />
      </section>
      <section aria-labelledby="categorias-destacadas">
        <h2 id="categorias-destacadas" className="visually-hidden">Categorías Destacadas</h2>
        <CarruselCategorias />
      </section>
    </main>
  );
};

export default Home;
