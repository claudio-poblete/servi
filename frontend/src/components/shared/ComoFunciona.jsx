import ButtonLink from "../buttons/ButtonLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong
} from "@fortawesome/free-solid-svg-icons";
import comofunciona1 from "../../assets/image/comofunciona1.png";
import comofunciona2 from "../../assets/image/comofunciona2.png";
import comofunciona3 from "../../assets/image/comofunciona3.png";

const ComoFunciona = () => {
  return (
    <div className="grid-container-home">
      <section className="comofunciona">
        <h1 className="section-title"> Cómo Funciona</h1>
        <div className="comofunciona-gridcontainer">
          <div className="comofunciona-element">
            <h2>Pide un Servicio</h2>
            <p className="p-comofunciona">
              Describe la tarea en pocas palabras. Mantenlo simple para atraer a
              los mejores <span className="texto-morado">servis.</span>
            </p>
            <div className="comofunciona-img-wrapper">
              {" "}
              <img src={comofunciona1} alt="Como Funciona" />
            </div>
          </div>

          <div className="comofunciona-element">
            <h2>Acepta una Oferta</h2>
            <p className="p-comofunciona">
              Basado en la tarea y tu presupuesto, recibirás ofertas de <span className="texto-morado">servis</span> locales.
            </p>
            <div className="comofunciona-img-wrapper">
              <img src={comofunciona2} alt="Como Funciona" />
            </div>
          </div>
          <div className="comofunciona-element">
            <h2>Pide un Servicio </h2>
            <p className="p-comofunciona">
            Ve perfiles y reseñas para aceptar a un <span className="texto-morado">servi.</span> Libera el pago cuando la tarea esté realizada.
            </p>
            <div className="comofunciona-img-wrapper">
              <img src={comofunciona3} alt="Como Funciona" />
            </div>
          </div>
        </div>
        <div className="boton-comofunciona">
          <ButtonLink to="/como-funciona" className="btn-terciary">
            Aprende Más <FontAwesomeIcon icon={faArrowRightLong} />
          </ButtonLink>
        </div>
      </section>
    </div>
  );
};

export default ComoFunciona;
