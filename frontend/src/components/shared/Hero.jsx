import ButtonLink from "../buttons/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faLifeRing,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="grid-container-hero">
      <div className="cta-hero">
        <h1>Te damos una Mano</h1>
        <p>
          Si necesitas colgar un cuadro, pasear a tu perro, entrenar tus
          habilidades en basketball, obtener un ingreso extra, instalar aire
          acondicionado, o simplemente ser de ayuda
        </p>
        <div className="cta-hero-buttons">
          <ButtonLink to="/post-service" className="btn-primary">
            Pide un Servicio
          </ButtonLink>
          <ButtonLink to="/register" className="btn-secondary">
            Sé un Servi
          </ButtonLink>
        </div>
      </div>
      <div className="service-img-ref">
        <svg
          width="49"
          height="83"
          viewBox="0 0 49 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M47.4144 25.9658H32.0283V82.8433H47.4144V25.9658Z"
            fill="#7715FF"
          />
          <path
            d="M49.0002 10.4717C49.0002 11.8288 48.7518 13.0944 48.255 14.2838C47.7582 15.4732 47.0821 16.5101 46.2265 17.4098C45.371 18.3095 44.3636 19.0262 43.2183 19.5446C42.073 20.0783 40.8587 20.3375 39.5753 20.3375C38.292 20.3375 37.1467 20.0783 36.0566 19.5446C34.9664 19.0109 34.0005 18.3095 33.1587 17.4098C32.317 16.5101 31.6546 15.4732 31.1717 14.2838C30.6887 13.0944 30.4541 11.8288 30.4541 10.4717C30.4541 9.11452 30.6887 7.78789 31.1717 6.58324C31.6546 5.3786 32.317 4.31119 33.1587 3.39627C34.0005 2.48135 34.9664 1.76466 36.0566 1.26146C37.1467 0.743002 38.3196 0.499023 39.5753 0.499023C40.8311 0.499023 42.0868 0.758251 43.2183 1.26146C44.3636 1.77991 45.3572 2.48135 46.2265 3.39627C47.0821 4.31119 47.7582 5.3786 48.255 6.58324C48.7518 7.78789 49.0002 9.08402 49.0002 10.4717Z"
            fill="#ED1108"
          />
          <path
            d="M4.20873 66.511L9.06604 47.6331L14.2821 28.9993C14.5443 28.1606 15.0549 27.4591 15.8 26.8949C16.5452 26.3307 17.4559 26.041 18.5599 26.041H31.3655L11.4119 82.9185H0L4.20873 66.5262V66.511Z"
            fill="#7715FF"
          />
        </svg>
      </div>
      <div className="hero-stats">
        <div className="stat">
          <FontAwesomeIcon icon={faLifeRing} className="localsupport-icon" />
          <h3>Soporte Local</h3>
        </div>
        <div className="stat">
          <h3>4,8</h3>
          <FontAwesomeIcon icon={faStar} className="star-ref" />
          <h3>15.000+ reseñas</h3>
        </div>
        <div className="stat">
          <h3>Miles de servicios completados</h3>
        </div>
        <div className="stat">
          <FontAwesomeIcon icon={faCircleCheck} className="circle-check-icon" />
          <h3>Servis Verificados</h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
