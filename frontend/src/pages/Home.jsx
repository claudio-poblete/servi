import ComoFunciona from "../components/shared/ComoFuncionaHero";
import Hero from "../components/shared/Hero";
import BannerServiGallery from "../components/shared/BannerServiGallery";
import CarruselCategorias from "../components/shared/CarruselCategorias";
import ButtonLink from "../components/buttons/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <Hero />
      <ComoFunciona />
      <div className="boton-comofunciona">
        <ButtonLink to="/como-funciona" className="btn-terciary">
          Aprende Más <FontAwesomeIcon icon={faArrowRightLong} />
        </ButtonLink>
      </div>
      <BannerServiGallery />
      <CarruselCategorias />
    </div>
  );
};

export default Home;
