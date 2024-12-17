import PropTypes from "prop-types";
import comofunciona1 from "../../assets/image/comofunciona1.png";
import comofunciona2 from "../../assets/image/comofunciona2.png";
import comofunciona3 from "../../assets/image/comofunciona3.png";

const ComoFuncionaElement = ({ title, description, imageSrc, altText }) => (
  <div className="comofunciona-element">
    <h2>{title}</h2>
    <p className="p-comofunciona">{description}</p>
    <div className="comofunciona-img-wrapper">
      <img src={imageSrc} alt={altText} />
    </div>
  </div>
);

ComoFuncionaElement.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  imageSrc: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

const ComoFuncionaHero = () => {
  const steps = [
    {
      title: "Pide un Servicio",
      description: (
        <>
          Describe la tarea en pocas palabras. Mantenlo simple para atraer a los
          mejores <span className="texto-morado">servis.</span>
        </>
      ),
      imageSrc: comofunciona1,
      altText: "Ilustración de cómo pedir un servicio",
    },
    {
      title: "Acepta una Oferta",
      description: (
        <>
          Basado en la tarea y tu presupuesto, recibirás ofertas de{" "}
          <span className="texto-morado">servis</span> locales.
        </>
      ),
      imageSrc: comofunciona2,
      altText: "Ilustración de cómo aceptar una oferta",
    },
    {
      title: "Pide un Servicio",
      description: (
        <>
          Ve perfiles y reseñas para aceptar a un{" "}
          <span className="texto-morado">servi.</span> Libera el pago cuando la
          tarea esté realizada.
        </>
      ),
      imageSrc: comofunciona3,
      altText: "Ilustración de cómo completar un servicio",
    },
  ];

  return (
    <div className="grid-container-home">
      <section className="comofunciona" aria-labelledby="comofunciona-title">
        <h1 id="comofunciona-title" className="section-title">
          Cómo Funciona
        </h1>
        <div className="comofunciona-gridcontainer">
          {steps.map((step, index) => (
            <ComoFuncionaElement
              key={index}
              title={step.title}
              description={step.description}
              imageSrc={step.imageSrc}
              altText={step.altText}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ComoFuncionaHero;
